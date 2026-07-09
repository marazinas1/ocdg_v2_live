import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { deleteStorageObjects, sweepPropertyFolder } from "@/lib/admin/imageUpload";
import { toast } from "sonner";

export function useDeleteProperty() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      // Fetch slug + DB-referenced paths before we touch anything.
      const { data: prop, error: propErr } = await supabase
        .from("properties")
        .select("slug")
        .eq("id", id)
        .single();
      if (propErr) throw propErr;
      const slug = prop?.slug as string | undefined;

      const { data: imgs, error: imgErr } = await supabase
        .from("property_images")
        .select("storage_path")
        .eq("property_id", id);
      if (imgErr) throw imgErr;
      const paths = (imgs ?? []).map((i) => i.storage_path);

      // 1. Delete DB-referenced storage objects. If this fails, DB row is preserved.
      await deleteStorageObjects(paths);

      // 2. Delete the property row (cascades property_images rows).
      const { error: delErr } = await supabase.from("properties").delete().eq("id", id);
      if (delErr) throw delErr;

      // 3. Sweep the entire <slug>/ folder for orphans (no references remain).
      //    If list fails, this throws — we surface the error rather than
     //    silently leaving orphans behind. The DB row is already gone at this
     //    point, which is acceptable: the user sees an error and can retry
     //    the sweep via a subsequent action.
      if (slug) {
        await sweepPropertyFolder(slug, new Set());
      }
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