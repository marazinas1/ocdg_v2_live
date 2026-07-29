import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type GalleryImage = { src: string; alt: string; project: string };

export type GalleryBlock = {
  slug: string;
  name: string;
  link: string;
  exterior: GalleryImage[];
  interior: GalleryImage[];
  all: GalleryImage[];
};

const publicUrl = (path: string) =>
  supabase.storage.from("property-images").getPublicUrl(path).data.publicUrl;

/**
 * Loads gallery-eligible images for every published property, grouped by property.
 * Exterior bucket = exterior. Interior bucket = interior.
 * Properties are ordered newest listed first (nulls last, then created_at desc).
 */
export function usePublicGallery() {
  return useQuery({
    queryKey: ["public-gallery"],
    queryFn: async (): Promise<GalleryBlock[]> => {
      const { data: props, error } = await supabase
        .from("properties")
        .select("id, slug, title, listed_date, created_at")
        .eq("published", true);
      if (error) throw error;
      const properties = (props ?? []) as Array<{
        id: string;
        slug: string;
        title: string;
        listed_date: string | null;
        created_at: string;
      }>;
      if (!properties.length) return [];

      const { data: imgs, error: imgErr } = await supabase
        .from("property_images")
        .select("property_id, category, storage_path, alt_text, sort_order")
        .in("property_id", properties.map((p) => p.id))
        .in("category", ["exterior", "interior"])
        .order("sort_order", { ascending: true });
      if (imgErr) throw imgErr;

      const byProperty = new Map<string, { ext: GalleryImage[]; int: GalleryImage[] }>();
      for (const p of properties) byProperty.set(p.id, { ext: [], int: [] });
      for (const row of imgs ?? []) {
        const b = byProperty.get(row.property_id);
        if (!b) continue;
        const prop = properties.find((p) => p.id === row.property_id)!;
        const img: GalleryImage = {
          src: publicUrl(row.storage_path),
          alt: row.alt_text ?? prop.title,
          project: prop.title,
        };
        if (row.category === "interior") b.int.push(img);
        else b.ext.push(img);
      }

      const blocks = properties
        .map((p) => {
          const buckets = byProperty.get(p.id)!;
          const all = [...buckets.ext, ...buckets.int];
          if (all.length === 0) return null;
          const block: GalleryBlock = {
            slug: p.slug,
            name: p.title,
            link: `/developments/${p.slug}`,
            exterior: buckets.ext,
            interior: buckets.int,
            all,
          };
          return { block, listed_date: p.listed_date, created_at: p.created_at };
        })
        .filter((x): x is { block: GalleryBlock; listed_date: string | null; created_at: string } => x !== null);

      blocks.sort((a, b) => {
        const ta = a.listed_date ? Date.parse(a.listed_date) : -Infinity;
        const tb = b.listed_date ? Date.parse(b.listed_date) : -Infinity;
        if (ta !== tb) return tb - ta;
        return Date.parse(b.created_at) - Date.parse(a.created_at);
      });

      return blocks.map((b) => b.block);
    },
  });
}