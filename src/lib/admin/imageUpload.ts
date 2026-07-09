import { supabase } from "@/integrations/supabase/client";

export type ImageCategory =
  | "hero"
  | "card"
  | "exterior"
  | "exterior_closeup"
  | "interior"
  | "floor_plan";

const LONG_EDGE: Record<ImageCategory, number> = {
  hero: 2400,
  card: 800,
  exterior: 2400,
  exterior_closeup: 2400,
  interior: 2400,
  floor_plan: 2400,
};

const BUCKET = "property-images";

async function resizeToJpeg(file: File, maxLongEdge: number, quality = 0.8): Promise<Blob> {
  const bmp = await createImageBitmap(file);
  const { width, height } = bmp;
  const longest = Math.max(width, height);
  const scale = longest > maxLongEdge ? maxLongEdge / longest : 1;
  const targetW = Math.round(width * scale);
  const targetH = Math.round(height * scale);

  let blob: Blob;
  if (typeof OffscreenCanvas !== "undefined") {
    const canvas = new OffscreenCanvas(targetW, targetH);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context unavailable");
    ctx.drawImage(bmp, 0, 0, targetW, targetH);
    blob = await canvas.convertToBlob({ type: "image/jpeg", quality });
  } else {
    const canvas = document.createElement("canvas");
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context unavailable");
    ctx.drawImage(bmp, 0, 0, targetW, targetH);
    blob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("Canvas encode failed"))),
        "image/jpeg",
        quality,
      ),
    );
  }
  bmp.close?.();
  return blob;
}

export async function uploadImage(params: {
  file: File;
  category: ImageCategory;
  slug: string;
}): Promise<{ storage_path: string; public_url: string }> {
  const blob = await resizeToJpeg(params.file, LONG_EDGE[params.category]);
  const path = `${params.slug}/${params.category}/${crypto.randomUUID()}.jpg`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, blob, {
    cacheControl: "31536000",
    contentType: "image/jpeg",
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { storage_path: path, public_url: data.publicUrl };
}

export function getPublicUrl(storage_path: string): string {
  return supabase.storage.from(BUCKET).getPublicUrl(storage_path).data.publicUrl;
}

export async function deleteStorageObjects(paths: string[]): Promise<void> {
  if (!paths.length) return;
  const chunks: string[][] = [];
  for (let i = 0; i < paths.length; i += 100) chunks.push(paths.slice(i, i + 100));
  for (const chunk of chunks) {
    const { data, error } = await supabase.storage.from(BUCKET).remove(chunk);
    if (error) throw error;
    // Supabase Storage returns `{ data: [], error: null }` when RLS filters out
    // rows or the path doesn't exist — no error is raised. We must verify that
    // every requested path was actually removed, otherwise orphans accumulate.
    const removed = new Set((data ?? []).map((o: any) => o.name));
    const missing = chunk.filter((p) => !removed.has(p));
    if (missing.length) {
      throw new Error(
        `Storage delete failed for ${missing.length} object(s): ${missing.join(", ")}`,
      );
    }
  }
}

/**
 * List every object stored under `<slug>/` in the property-images bucket.
 *
 * Uses the admin-gated RPC `list_property_bucket_paths` — a single LIKE-prefix
 * query against storage.objects, no folder/file heuristic, no recursion, no
 * dependency on `storage.list()` semantics. Do NOT call from public code
 * paths; the RPC returns nothing for non-admins.
 */
async function listAllUnder(slug: string): Promise<string[]> {
  const clean = slug.trim().replace(/^\/+|\/+$/g, "");
  if (!clean) throw new Error("listAllUnder: empty slug");
  const { data, error } = await supabase.rpc("list_property_bucket_paths", {
    _slug: clean,
  });
  if (error) throw error;
  if (!data) throw new Error("list_property_bucket_paths returned no data");
  return (data as { name: string }[]).map((r) => r.name);
}

/**
 * Sweep every storage object under `<slug>/` and delete any that is not in
 * `referenced`. property_images is the source of truth: anything in that set
 * is preserved unconditionally. If listing fails, throws — never interprets
 * a failed list as "no references". Admin-only.
 *
 * `referenced` MUST be non-empty. An empty set would mean "delete everything"
 * — that is a distinct, dangerous operation exposed via `wipePropertyFolder`.
 * Enforcing non-empty here makes it impossible for a caller that forgot to
 * pass the just-uploaded paths to accidentally wipe a property's images.
 */
export async function sweepPropertyFolder(
  slug: string,
  referenced: Set<string>,
): Promise<{ removed: string[] }> {
  const prefix = slug.trim().replace(/^\/+|\/+$/g, "");
  if (!prefix) throw new Error("sweepPropertyFolder: empty slug");
  if (referenced.size === 0) {
    throw new Error(
      "sweepPropertyFolder: referenced set is empty. Use wipePropertyFolder(slug) to delete everything under a slug.",
    );
  }
  const all = await listAllUnder(prefix);
  // Correctness guard: every referenced path MUST appear in the listing. If
  // one is missing, the listing is incomplete (RLS gap, prefix mismatch,
  // stale RPC, etc.) and we must abort — proceeding could delete objects
  // that property_images still references.
  const allSet = new Set(all);
  const missing: string[] = [];
  for (const ref of referenced) if (!allSet.has(ref)) missing.push(ref);
  if (missing.length) {
    throw new Error(
      `sweepPropertyFolder: listing missing ${missing.length} referenced path(s); aborting to avoid deleting live images. Missing: ${missing.join(", ")}`,
    );
  }
  const orphans = all.filter((p) => !referenced.has(p));
  if (orphans.length) await deleteStorageObjects(orphans);
  return { removed: orphans };
}

/**
 * Remove every storage object under `<slug>/`. Only for property deletion —
 * do not call from any flow where property_images rows may still reference
 * these objects. Admin-only. Throws on list failure.
 */
export async function wipePropertyFolder(
  slug: string,
): Promise<{ removed: string[] }> {
  const prefix = slug.trim().replace(/^\/+|\/+$/g, "");
  if (!prefix) throw new Error("wipePropertyFolder: empty slug");
  const all = await listAllUnder(prefix);
  if (all.length) await deleteStorageObjects(all);
  return { removed: all };
}