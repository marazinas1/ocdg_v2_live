import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { PropertyStatus } from "@/lib/admin/status";

export type PublicPropertyCard = {
  id: string;
  slug: string;
  title: string;
  price: string | null;
  status: PropertyStatus;
  tagline: string | null;
  description: string | null;
  location: string;
  listed_date: string | null;
  created_at: string;
  card_image_url: string | null;
};

const publicUrl = (path: string) =>
  supabase.storage.from("property-images").getPublicUrl(path).data.publicUrl;

const formatLocation = (row: {
  location_neighborhood: string | null;
  location_city: string | null;
  location_state: string | null;
}) => {
  const parts = [row.location_neighborhood, row.location_city, row.location_state].filter(
    (x): x is string => !!x && x.trim().length > 0,
  );
  return parts.join(", ");
};

/**
 * Fetches all published properties (optionally filtered by status) with a card image
 * resolved from property_images: prefer category='card', fall back to first 'hero'.
 * Sorted newest-first by listed_date (nulls last), then created_at desc.
 */
export function usePublicProperties(opts?: { status?: PropertyStatus | PropertyStatus[] }) {
  const statusFilter = opts?.status
    ? Array.isArray(opts.status)
      ? opts.status
      : [opts.status]
    : null;
  const key = ["public-properties", statusFilter ? statusFilter.join(",") : "all"];

  return useQuery({
    queryKey: key,
    queryFn: async (): Promise<PublicPropertyCard[]> => {
      let q = supabase
        .from("properties")
        .select(
          "id, slug, title, price, status, tagline, description, location_neighborhood, location_city, location_state, listed_date, created_at, published",
        )
        .eq("published", true);
      if (statusFilter) q = q.in("status", statusFilter);
      const { data: rows, error } = await q;
      if (error) throw error;

      const props = (rows ?? []) as Array<{
        id: string;
        slug: string;
        title: string;
        price: string | null;
        status: string;
        tagline: string | null;
        description: string | null;
        location_neighborhood: string | null;
        location_city: string | null;
        location_state: string | null;
        listed_date: string | null;
        created_at: string;
      }>;

      // Fetch card + hero images for these properties in one round-trip.
      const ids = props.map((p) => p.id);
      let imagesByProperty: Record<string, { card?: string; hero?: string }> = {};
      if (ids.length) {
        const { data: imgs, error: imgErr } = await supabase
          .from("property_images")
          .select("property_id, category, storage_path, sort_order")
          .in("property_id", ids)
          .in("category", ["card", "hero"])
          .order("sort_order", { ascending: true });
        if (imgErr) throw imgErr;
        for (const row of imgs ?? []) {
          const bucket = (imagesByProperty[row.property_id] ??= {});
          if (row.category === "card" && !bucket.card) bucket.card = row.storage_path;
          if (row.category === "hero" && !bucket.hero) bucket.hero = row.storage_path;
        }
      }

      const cards: PublicPropertyCard[] = props.map((p) => {
        const paths = imagesByProperty[p.id];
        const path = paths?.card ?? paths?.hero ?? null;
        return {
          id: p.id,
          slug: p.slug,
          title: p.title,
          price: p.price,
          status: p.status as PropertyStatus,
          tagline: p.tagline,
          description: p.description,
          location: formatLocation(p),
          listed_date: p.listed_date,
          created_at: p.created_at,
          card_image_url: path ? publicUrl(path) : null,
        };
      });

      cards.sort((a, b) => {
        const ta = a.listed_date ? Date.parse(a.listed_date) : -Infinity;
        const tb = b.listed_date ? Date.parse(b.listed_date) : -Infinity;
        if (ta !== tb) return tb - ta;
        return Date.parse(b.created_at) - Date.parse(a.created_at);
      });

      return cards;
    },
  });
}

/**
 * Loops within a status group to compute prev/next siblings for a given slug.
 * Wraps at ends. Returns null neighbors when the slug is alone in its group.
 */
export function usePropertyNeighbors(
  currentSlug: string | undefined,
  currentStatus: PropertyStatus | undefined,
) {
  const query = usePublicProperties(currentStatus ? { status: currentStatus } : undefined);
  const list = query.data ?? [];
  const idx = currentSlug ? list.findIndex((p) => p.slug === currentSlug) : -1;
  if (idx < 0 || list.length < 2) {
    return { prev: null, next: null, isLoading: query.isLoading };
  }
  const prev = list[(idx - 1 + list.length) % list.length];
  const next = list[(idx + 1) % list.length];
  return { prev, next, isLoading: query.isLoading };
}