import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { deleteStorageObjects } from "@/lib/admin/imageUpload";
import { toast } from "sonner";

export function useDeleteProperty() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data: imgs, error: imgErr } = await supabase
        .from("property_images")
        .select("storage_path")
        .eq("property_id", id);
      if (imgErr) throw imgErr;
      const paths = (imgs ?? []).map((i) => i.storage_path);
      // Delete storage objects first — if this fails, the DB row is preserved.
      await deleteStorageObjects(paths);
      const { error: delErr } = await supabase.from("properties").delete().eq("id", id);
      if (delErr) throw delErr;
    },
    onSuccess: () => {
      toast.success("Property deleted");
      qc.invalidateQueries({ queryKey: ["admin-properties"] });
    },
    onError: (err: any) => {
      toast.error(`Delete failed: ${err?.message ?? "unknown error"}`);
    },
  });
}