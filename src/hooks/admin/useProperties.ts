import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getPublicUrl } from "@/lib/admin/imageUpload";

export type PropertyListItem = {
  id: string;
  slug: string;
  title: string;
  price: string | null;
  status: string;
  published: boolean;
  listed_date: string | null;
  card_image_url: string | null;
  updated_at: string;
};

export function useProperties() {
  return useQuery({
    queryKey: ["admin-properties"],
    queryFn: async (): Promise<PropertyListItem[]> => {
      const { data: props, error } = await supabase
        .from("properties")
        .select("id, slug, title, price, status, published, listed_date, updated_at")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      const ids = (props ?? []).map((p) => p.id);
      let imagesByProp = new Map<string, string>();
      if (ids.length) {
        const { data: imgs } = await supabase
          .from("property_images")
          .select("property_id, storage_path, sort_order")
          .eq("category", "card")
          .in("property_id", ids)
          .order("sort_order", { ascending: true });
        for (const img of imgs ?? []) {
          if (!imagesByProp.has(img.property_id)) {
            imagesByProp.set(img.property_id, getPublicUrl(img.storage_path));
          }
        }
      }
      return (props ?? []).map((p) => ({
        ...p,
        card_image_url: imagesByProp.get(p.id) ?? null,
      }));
    },
  });
}