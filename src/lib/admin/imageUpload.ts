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
 * Recursively list every object under `prefix/` in the property-images bucket.
 * Requires the authenticated admin SELECT policy on storage.objects — do NOT
 * call from public code paths. Throws on any list error (caller must abort).
 */
async function listAllUnder(prefix: string): Promise<string[]> {
  const results: string[] = [];
  const stack: string[] = [prefix];
  while (stack.length) {
    const dir = stack.pop()!;
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .list(dir, { limit: 1000 });
    if (error) throw error;
    if (!data) throw new Error(`storage.list('${dir}') returned no data`);
    for (const entry of data) {
      const path = `${dir}/${entry.name}`;
      // The JS client marks folder placeholders with id === null and no metadata.
      const isFolder = (entry as any).id === null || (entry as any).metadata == null;
      if (isFolder) {
        stack.push(path);
      } else {
        results.push(path);
      }
    }
  }
  return results;
}

/**
 * Sweep every storage object under `<slug>/` and delete any that is not in
 * `referenced`. property_images is the source of truth: anything in that set
 * is preserved unconditionally. If listing fails, throws — never interprets
 * a failed list as "no references". Admin-only.
 */
export async function sweepPropertyFolder(
  slug: string,
  referenced: Set<string>,
): Promise<{ removed: string[] }> {
  const prefix = slug.trim().replace(/^\/+|\/+$/g, "");
  if (!prefix) throw new Error("sweepPropertyFolder: empty slug");
  const all = await listAllUnder(prefix);
  const orphans = all.filter((p) => !referenced.has(p));
  if (orphans.length) await deleteStorageObjects(orphans);
  return { removed: orphans };
}