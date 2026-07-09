import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { isValidSlug } from "@/lib/admin/slug";

export type SlugState =
  | { status: "idle" }
  | { status: "invalid" }
  | { status: "checking" }
  | { status: "available" }
  | { status: "taken" };

export function useSlugAvailability(slug: string, excludeId?: string): SlugState {
  const [state, setState] = useState<SlugState>({ status: "idle" });

  useEffect(() => {
    if (!slug) {
      setState({ status: "idle" });
      return;
    }
    if (!isValidSlug(slug)) {
      setState({ status: "invalid" });
      return;
    }
    setState({ status: "checking" });
    const handle = setTimeout(async () => {
      let query = supabase.from("properties").select("id").eq("slug", slug).limit(1);
      const { data, error } = await query;
      if (error) return;
      const conflict = (data ?? []).find((r) => r.id !== excludeId);
      setState({ status: conflict ? "taken" : "available" });
    }, 300);
    return () => clearTimeout(handle);
  }, [slug, excludeId]);

  return state;
}