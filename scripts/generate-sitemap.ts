// Prebuild: fetch published properties from the database and write
// public/sitemap.xml so Lovable static hosting serves /sitemap.xml.
// The same list is available dynamically via the `sitemap` edge function.

import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://www.oceancitydevelopment.com";

const SUPABASE_URL =
  process.env.VITE_SUPABASE_URL ?? "https://axnosviewcbhmpzsnpco.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "";

const STATIC_PAGES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/developments", changefreq: "weekly", priority: "0.9" },
  { path: "/developments/active-listings", changefreq: "weekly", priority: "0.9" },
  { path: "/developments/under-contract", changefreq: "weekly", priority: "0.8" },
  { path: "/developments/coming-soon", changefreq: "monthly", priority: "0.6" },
  { path: "/developments/sold", changefreq: "monthly", priority: "0.7" },
  { path: "/gallery", changefreq: "monthly", priority: "0.7" },
  { path: "/testimonials", changefreq: "monthly", priority: "0.6" },
  { path: "/contact", changefreq: "monthly", priority: "0.6" },
];

const xmlEscape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const priorityForStatus = (s: string | null) =>
  s === "active"
    ? "0.85"
    : s === "under_contract"
      ? "0.8"
      : s === "coming_soon"
        ? "0.7"
        : "0.6";

async function fetchProperties(): Promise<
  Array<{ slug: string; status: string | null; updated_at: string | null }>
> {
  if (!SUPABASE_ANON_KEY) return [];
  // Only include properties with a full page. Record-only past developments
  // (has_page=false) are shown as photo cards on the Sold page but must not
  // appear as crawlable URLs.
  const url = `${SUPABASE_URL}/rest/v1/properties?select=slug,status,updated_at&published=eq.true&has_page=eq.true`;
  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });
  if (!res.ok) {
    console.warn(`[sitemap] properties fetch failed: ${res.status}`);
    return [];
  }
  return res.json();
}

async function main() {
  const properties = await fetchProperties();

  const urls: string[] = [];
  for (const p of STATIC_PAGES) {
    urls.push(
      `  <url><loc>${BASE_URL}${p.path}</loc><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`,
    );
  }
  for (const row of properties) {
    const slug = xmlEscape(String(row.slug));
    const lastmod = row.updated_at
      ? new Date(row.updated_at).toISOString().slice(0, 10)
      : null;
    urls.push(
      `  <url><loc>${BASE_URL}/developments/${slug}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}<priority>${priorityForStatus(row.status)}</priority></url>`,
    );
  }

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");

  writeFileSync(resolve("public/sitemap.xml"), xml);
  console.log(
    `sitemap.xml written (${STATIC_PAGES.length} static + ${properties.length} properties)`,
  );
}

main().catch((err) => {
  console.error("[sitemap] generation failed:", err);
  process.exit(0); // don't block the build
});