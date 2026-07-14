// One-shot re-migration endpoint. Wipes storage + property_images rows for a
// single property slug and inserts the provided images. Guarded by a shared
// secret header. Intended to be deleted after use.
import { createClient } from "npm:@supabase/supabase-js@2";

const MIGRATION_TOKEN = Deno.env.get("REMIGRATE_TOKEN") ?? "";

type ImageEntry = {
  category: "hero" | "card" | "exterior" | "interior" | "vision" | "floor_plan";
  sort_order: number;
  alt_text: string;
  floor_plan_id?: string | null;
  // storage: either a filename in `files` map to upload, or reuse another
  // entry's storage_path (shared-path pattern for vision -> exterior[0]).
  file?: string;
  reuse_from?: { category: string; sort_order: number };
};

type Payload = {
  slug: string;
  images: ImageEntry[];
  files: Record<string, string>; // filename -> base64
};

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-migration-token, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  const token = req.headers.get("x-migration-token") ?? "";
  if (!MIGRATION_TOKEN || token !== MIGRATION_TOKEN) {
    return new Response(JSON.stringify({ error: "forbidden" }), { status: 403, headers: { ...cors, "content-type": "application/json" } });
  }

  const url = Deno.env.get("SUPABASE_URL")!;
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const sb = createClient(url, key, { auth: { persistSession: false } });

  const body = (await req.json()) as Payload;
  const slug = body.slug;
  if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
    return new Response(JSON.stringify({ error: "invalid slug" }), { status: 400, headers: { ...cors, "content-type": "application/json" } });
  }

  // Resolve property_id
  const { data: prop, error: propErr } = await sb.from("properties").select("id").eq("slug", slug).single();
  if (propErr || !prop) return new Response(JSON.stringify({ error: "property not found", detail: propErr?.message }), { status: 404, headers: { ...cors, "content-type": "application/json" } });
  const property_id = prop.id as string;

  // 1. Wipe existing DB rows
  const { error: delRowsErr } = await sb.from("property_images").delete().eq("property_id", property_id);
  if (delRowsErr) return new Response(JSON.stringify({ step: "delete rows", error: delRowsErr.message }), { status: 500, headers: { ...cors, "content-type": "application/json" } });

  // 2. Wipe storage under slug/
  const collected: string[] = [];
  async function collect(prefix: string) {
    const { data, error } = await sb.storage.from("property-images").list(prefix, { limit: 1000 });
    if (error) throw error;
    for (const entry of data ?? []) {
      const path = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.id === null || entry.metadata === null) {
        // folder
        await collect(path);
      } else {
        collected.push(path);
      }
    }
  }
  try {
    await collect(slug);
  } catch (e) {
    return new Response(JSON.stringify({ step: "list", error: (e as Error).message }), { status: 500, headers: { ...cors, "content-type": "application/json" } });
  }
  if (collected.length) {
    const { error: rmErr } = await sb.storage.from("property-images").remove(collected);
    if (rmErr) return new Response(JSON.stringify({ step: "remove storage", error: rmErr.message }), { status: 500, headers: { ...cors, "content-type": "application/json" } });
  }

  // 3. Upload new files + insert rows
  const pathByKey = new Map<string, string>(); // `${cat}#${sort}` -> path
  const uploaded: string[] = [];
  const rows: any[] = [];

  for (const img of body.images) {
    let storage_path: string;
    if (img.reuse_from) {
      const key = `${img.reuse_from.category}#${img.reuse_from.sort_order}`;
      const src = pathByKey.get(key);
      if (!src) return new Response(JSON.stringify({ error: `reuse_from missing: ${key}` }), { status: 400, headers: { ...cors, "content-type": "application/json" } });
      storage_path = src;
    } else {
      if (!img.file) return new Response(JSON.stringify({ error: "image needs file or reuse_from" }), { status: 400, headers: { ...cors, "content-type": "application/json" } });
      const b64 = body.files[img.file];
      if (!b64) return new Response(JSON.stringify({ error: `missing file: ${img.file}` }), { status: 400, headers: { ...cors, "content-type": "application/json" } });
      const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
      const uuid = crypto.randomUUID();
      storage_path = `${slug}/${img.category}/${uuid}.jpg`;
      const { error: upErr } = await sb.storage.from("property-images").upload(storage_path, bytes, {
        contentType: "image/jpeg",
        cacheControl: "31536000",
        upsert: false,
      });
      if (upErr) return new Response(JSON.stringify({ step: "upload", file: img.file, error: upErr.message }), { status: 500, headers: { ...cors, "content-type": "application/json" } });
      uploaded.push(storage_path);
    }
    pathByKey.set(`${img.category}#${img.sort_order}`, storage_path);
    rows.push({
      property_id,
      category: img.category,
      sort_order: img.sort_order,
      alt_text: img.alt_text,
      floor_plan_id: img.floor_plan_id ?? null,
      storage_path,
    });
  }

  const { error: insErr } = await sb.from("property_images").insert(rows);
  if (insErr) return new Response(JSON.stringify({ step: "insert rows", error: insErr.message }), { status: 500, headers: { ...cors, "content-type": "application/json" } });

  return new Response(JSON.stringify({
    ok: true,
    property_id,
    wiped_storage: collected.length,
    uploaded_objects: uploaded.length,
    inserted_rows: rows.length,
  }), { headers: { ...cors, "content-type": "application/json" } });
});