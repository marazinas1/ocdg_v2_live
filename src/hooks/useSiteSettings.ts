import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getBrandAssetUrl } from "@/lib/admin/uploadBrandAsset";
import fallbackLogo from "@/assets/ocdg-logo.png";
import fallbackHero from "@/assets/28th-ext-view2.jpg";

export const SITE_SETTINGS_KEY = ["site-settings"];

export const SITE_NAME_FALLBACK = "Ocean City Development Group";

/** Homepage hero copy the client has not overridden yet. */
export const HERO_FALLBACKS = {
  eyebrow: "Ocean City Development Group",
  headline: "Building the Future\nof Ocean City",
  subline: "Premier Residential Developments & Custom Homes",
  ctaLabel: "View Developments",
} as const;

export type SiteSettingsRow = {
  id: string;
  site_name: string;
  logo_path: string | null;
  logo_dark_path: string | null;
  favicon_path: string | null;
  hero_image_path: string | null;
  hero_eyebrow: string | null;
  hero_headline: string | null;
  hero_subline: string | null;
  hero_cta_label: string | null;
};

const COLUMNS =
  "id, site_name, logo_path, logo_dark_path, favicon_path, hero_image_path, hero_eyebrow, hero_headline, hero_subline, hero_cta_label";

const trimmed = (value: string | null | undefined, fallback: string) =>
  value && value.trim().length > 0 ? value.trim() : fallback;

export type HeroContent = {
  imageUrl: string;
  eyebrow: string;
  headline: string;
  subline: string;
  ctaLabel: string;
};

export function resolveHero(row: Partial<SiteSettingsRow> | null): HeroContent {
  return {
    imageUrl: row?.hero_image_path ? getBrandAssetUrl(row.hero_image_path) : fallbackHero,
    eyebrow: trimmed(row?.hero_eyebrow, HERO_FALLBACKS.eyebrow),
    headline: trimmed(row?.hero_headline, HERO_FALLBACKS.headline),
    subline: trimmed(row?.hero_subline, HERO_FALLBACKS.subline),
    ctaLabel: trimmed(row?.hero_cta_label, HERO_FALLBACKS.ctaLabel),
  };
}

export type SiteSettings = {
  row: SiteSettingsRow | null;
  siteName: string;
  /** Mark for light surfaces. Always resolves — falls back to the bundled logo. */
  logoUrl: string;
  /** Mark for dark surfaces. Null when no dark variant exists (caller inverts). */
  logoDarkUrl: string | null;
  faviconUrl: string | null;
  hero: HeroContent;
};

export const FALLBACK_LOGO = fallbackLogo;
export const FALLBACK_HERO = fallbackHero;

const EMPTY: SiteSettings = {
  row: null,
  siteName: SITE_NAME_FALLBACK,
  logoUrl: fallbackLogo,
  logoDarkUrl: null,
  faviconUrl: null,
  hero: resolveHero(null),
};

export function useSiteSettings() {
  const query = useQuery({
    queryKey: SITE_SETTINGS_KEY,
    staleTime: 60_000,
    queryFn: async (): Promise<SiteSettings> => {
      const { data, error } = await supabase
        .from("site_settings")
        .select(COLUMNS)
        .maybeSingle();
      if (error) throw error;
      const row = (data as SiteSettingsRow | null) ?? null;
      return {
        row,
        siteName: row?.site_name?.trim() || SITE_NAME_FALLBACK,
        logoUrl: row?.logo_path ? getBrandAssetUrl(row.logo_path) : fallbackLogo,
        logoDarkUrl: row?.logo_dark_path ? getBrandAssetUrl(row.logo_dark_path) : null,
        faviconUrl: row?.favicon_path ? getBrandAssetUrl(row.favicon_path) : null,
        hero: resolveHero(row),
      };
    },
  });

  return { ...query, settings: query.data ?? EMPTY };
}

/**
 * Swaps the document favicon at runtime when one has been uploaded. The static
 * tags in index.html remain the default for crawlers.
 */
export function useFaviconFromSettings() {
  const { settings } = useSiteSettings();
  const href = settings.faviconUrl;
  useEffect(() => {
    if (!href) return;
    const links = Array.from(
      document.querySelectorAll<HTMLLinkElement>('link[rel~="icon"]'),
    );
    const previous = links.map((l) => l.href);
    if (links.length === 0) {
      const link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/png";
      link.href = href;
      document.head.appendChild(link);
      return () => link.remove();
    }
    links.forEach((l) => {
      l.href = href;
      l.type = "image/png";
    });
    return () => {
      links.forEach((l, i) => {
        l.href = previous[i];
      });
    };
  }, [href]);
}
