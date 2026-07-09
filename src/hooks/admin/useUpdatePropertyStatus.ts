import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { PropertyListItem } from "./useProperties";

export function useUpdatePropertyStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from("properties")
        .update({ status })
        .eq("id", id);
      if (error) throw error;
    },
    onMutate: async ({ id, status }) => {
      await qc.cancelQueries({ queryKey: ["admin-properties"] });
      const previous = qc.getQueryData<PropertyListItem[]>(["admin-properties"]);
      qc.setQueryData<PropertyListItem[]>(["admin-properties"], (old) =>
        (old ?? []).map((p) => (p.id === id ? { ...p, status } : p)),
      );
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) qc.setQueryData(["admin-properties"], ctx.previous);
      toast.error("Failed to update status");
    },
    onSuccess: () => toast.success("Status updated"),
    onSettled: () => qc.invalidateQueries({ queryKey: ["admin-properties"] }),
  });
}

export function useUpdatePropertyPublished() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, published }: { id: string; published: boolean }) => {
      const { error } = await supabase
        .from("properties")
        .update({ published })
        .eq("id", id);
      if (error) throw error;
    },
    onMutate: async ({ id, published }) => {
      await qc.cancelQueries({ queryKey: ["admin-properties"] });
      const previous = qc.getQueryData<PropertyListItem[]>(["admin-properties"]);
      qc.setQueryData<PropertyListItem[]>(["admin-properties"], (old) =>
        (old ?? []).map((p) => (p.id === id ? { ...p, published } : p)),
      );
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) qc.setQueryData(["admin-properties"], ctx.previous);
      toast.error("Failed to update published state");
    },
    onSuccess: () => toast.success("Updated"),
    onSettled: () => qc.invalidateQueries({ queryKey: ["admin-properties"] }),
  });
}