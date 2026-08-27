import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Testimonial = {
  id: string;
  quote: string;
  author_name: string;
  author_detail: string | null;
  anchor: string | null;
};

export const TESTIMONIALS_KEY = ["testimonials"];

/** Published testimonials only — the page hides the carousel when there are none. */
export function useTestimonials() {
  return useQuery({
    queryKey: TESTIMONIALS_KEY,
    staleTime: 60_000,
    queryFn: async (): Promise<Testimonial[]> => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("id, quote, author_name, author_detail, anchor")
        .eq("published", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });
}

/** Splits a stored quote into paragraphs on blank lines / line breaks. */
export function quoteParagraphs(quote: string): string[] {
  return quote
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}
