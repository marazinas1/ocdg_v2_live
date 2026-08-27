import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type ContentCounts = {
  publishedProperties: number;
  draftProperties: number;
  activeProperties: number;
  soldProperties: number;
};

async function countProperties(
  build: (q: any) => any = (q) => q,
): Promise<number> {
  const query = build(supabase.from("properties").select("id", { count: "exact", head: true }));
  const { count, error } = await query;
  if (error) throw error;
  return (count as number | null) ?? 0;
}

export function useContentCounts() {
  return useQuery({
    queryKey: ["admin", "dashboard", "counts"],
    staleTime: 30_000,
    queryFn: async (): Promise<ContentCounts> => {
      const [publishedProperties, draftProperties, activeProperties, soldProperties] =
        await Promise.all([
          countProperties((q) => q.eq("published", true)),
          countProperties((q) => q.eq("published", false)),
          countProperties((q) => q.in("status", ["active", "under_contract", "coming_soon"])),
          countProperties((q) => q.eq("status", "sold")),
        ]);
      return { publishedProperties, draftProperties, activeProperties, soldProperties };
    },
  });
}

export type ActivityItem = {
  id: string;
  title: string;
  href: string;
  at: string;
  created: boolean;
};

/** Last edits across properties. */
export function useRecentActivity(limit = 6) {
  return useQuery({
    queryKey: ["admin", "dashboard", "activity", limit],
    staleTime: 30_000,
    queryFn: async (): Promise<ActivityItem[]> => {
      const { data, error } = await supabase
        .from("properties")
        .select("id, title, created_at, updated_at")
        .order("updated_at", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return (data ?? []).map((p) => ({
        id: p.id,
        title: p.title,
        href: `/admin/properties/${p.id}/edit`,
        at: p.updated_at ?? p.created_at,
        created: sameMoment(p.created_at, p.updated_at),
      }));
    },
  });
}

/** A row untouched since insert reads as "created" rather than "edited". */
function sameMoment(created: string | null, updated: string | null) {
  if (!created || !updated) return true;
  return Math.abs(new Date(updated).getTime() - new Date(created).getTime()) < 2000;
}

export function relativeTime(iso: string) {
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  return new Date(iso).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
