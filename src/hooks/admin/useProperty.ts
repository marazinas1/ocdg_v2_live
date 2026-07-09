import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useProperty(id: string | undefined) {
  return useQuery({
    queryKey: ["admin-property", id],
    enabled: !!id,
    queryFn: async () => {
      if (!id) throw new Error("no id");
      const { data: property, error: propErr } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();
      if (propErr) throw propErr;
      const { data: images, error: imgErr } = await supabase
        .from("property_images")
        .select("*")
        .eq("property_id", id)
        .order("sort_order", { ascending: true });
      if (imgErr) throw imgErr;
      return { property, images: images ?? [] };
    },
  });
}