// Single source of truth for sold/past project cards.
// When adding a new past project, add it here — Past Projects, Gallery and other
// pages will pick up the data automatically.

import asbury2700Ext1 from "@/assets/asbury-2700-ext-01-card.jpg";
import bark209Photo01 from "@/assets/bark-209-photo-ext-01-card.jpg";
import arkansas38Photo01 from "@/assets/arkansas-38-photo-ext-08-card.jpg";
import west1651Ext01 from "@/assets/west-1651-ext-01-card.jpg";
import glenwood1901Ext01 from "@/assets/glenwood-1901-ext-01-card.jpg";
import stcharles844Ext01 from "@/assets/stcharles-844-ext-01-card.jpg";
import rosemar1909Ext01 from "@/assets/rosemar-1909-ext-01-card.jpg";
import bay5404Ext01 from "@/assets/bay-5404-ext-01-card.jpg";
import delancey918Photo01 from "@/assets/delancey-918-35-card.jpg";
import anchor109Photo01 from "@/assets/anchor-109-41-card.jpg";
import anchor111Photo01 from "@/assets/anchor-111-01-card.jpg";
import anchor113Photo01 from "@/assets/anchor-113-02-card.jpg";
import asbury5516Ext01 from "@/assets/asbury-5516-ext-01-card.jpg";

export interface PastProject {
  title: string;
  slug: string;
  image: string;
  location: string;
  listedPrice: string;
  soldPrice: string;
  soldDate: string;
  description: string;
  /**
   * Archive entries are older sold homes for which we only have address + photos.
   * When true, the card shows just "Sold" (no date) and links to a minimal
   * Archive page (Hero / Gallery / Map / CTA only — no specs or pricing).
   */
  isArchive?: boolean;
}

export const pastProjects: PastProject[] = [
  {
    title: "5516 Asbury Ave",
    slug: "5516-asbury-ave",
    image: asbury5516Ext01,
    location: "Southend, Ocean City, NJ",
    listedPrice: "$2,995,000",
    soldPrice: "$2,985,032",
    soldDate: "May 21, 2026",
    description:
      "Oceanside Southend new construction by Halliday-Leonard and Ocean City Development Group — 5 bedrooms, 4.5 baths, 3 stories, built-in fireplaces, attached garage, blocks to the beach.",
  },
  {
    title: "1651 West Ave",
    slug: "1651-west-ave",
    image: west1651Ext01,
    location: "Ocean City, NJ",
    listedPrice: "$1,795,000",
    soldPrice: "$1,764,250",
    soldDate: "2026",
    description:
      "Custom OCDG new-construction residence with Halliday Architects on Ocean City's coveted West Ave corridor — 5 bedrooms, 3.1 baths, private elevator, and a gourmet kitchen with premium appliances.",
  },
  {
    title: "2700 Asbury Ave",
    slug: "2700-asbury-ave",
    image: asbury2700Ext1,
    location: "Ocean City, NJ",
    listedPrice: "$3,295,000",
    soldPrice: "$3,264,500",
    soldDate: "January 2024",
    description:
      "Custom new-construction duplex by OCDG with Halliday Architects — 6 bedrooms, 5.5 baths, elevator, gas fireplace, and gourmet kitchen on a sought-after Asbury Ave corner lot.",
  },
  {
    title: "209 Bark Drive",
    slug: "209-bark-drive",
    image: bark209Photo01,
    location: "Ocean City, NJ",
    listedPrice: "$1,995,000",
    soldPrice: "$1,995,000",
    soldDate: "April 2026",
    description:
      "Southend single-family new construction by OCDG with Halliday Architects — 5 bedrooms, 3 baths, private elevator, and enclosed two-car garage, walking distance to the beach.",
  },
  {
    title: "38 Arkansas Ave",
    slug: "38-arkansas-ave",
    image: arkansas38Photo01,
    location: "Riviera, Ocean City, NJ",
    listedPrice: "$8,500,000",
    soldPrice: "$8,500,000",
    soldDate: "May 2026",
    description:
      "Halliday-Leonard bayfront new construction on a rare oversized 80'×106' canal lot — 7 bedrooms, 5.5 baths, 5,109 sq ft, two fireplaces, Wolf/SubZero kitchen, elevator, private dock, multiple decks, and in-ground pool.",
  },
  {
    title: "1901 Glenwood Drive",
    slug: "1901-glenwood-drive",
    image: glenwood1901Ext01,
    location: "Ocean City, NJ",
    listedPrice: "$3,250,000",
    soldPrice: "$3,184,000",
    soldDate: "2025",
    description:
      "Custom OCDG new-construction residence with Halliday Architects on a quiet Glenwood Drive cul-de-sac — 4 bedrooms, 4.1 baths, gourmet kitchen, and elevated living spaces.",
  },
  {
    title: "844 St Charles Place",
    slug: "844-st-charles-place",
    image: stcharles844Ext01,
    location: "Ocean City, NJ",
    listedPrice: "$2,495,000",
    soldPrice: "$2,457,500",
    soldDate: "2025",
    description:
      "Custom OCDG new-construction duplex residence with Halliday Architects — 6 bedrooms, 4.1 baths across four levels, designed for multi-generational shore living.",
  },
  {
    title: "1909 Rosemar Lane",
    slug: "1909-rosemar-lane",
    image: rosemar1909Ext01,
    location: "Ocean City, NJ",
    listedPrice: "$2,895,000",
    soldPrice: "$2,850,000",
    soldDate: "2025",
    description:
      "Custom OCDG new-construction residence with Halliday Architects on a quiet Rosemar Lane setting — 5 bedrooms, 4.1 baths, gourmet kitchen, and elevated living spaces.",
  },
  {
    title: "5404 Bay Avenue",
    slug: "5404-bay-ave",
    image: bay5404Ext01,
    location: "Ocean City, NJ",
    listedPrice: "$1,995,000",
    soldPrice: "$1,975,000",
    soldDate: "2025",
    description:
      "Custom OCDG new-construction residence with Halliday Architects on Ocean City's southend Bay Avenue — 5 bedrooms, 3 baths, gourmet kitchen, and elevated living spaces.",
  },
  {
    title: "918 Delancey Place",
    slug: "918-delancey-place",
    image: delancey918Photo01,
    location: "Ocean City, NJ",
    listedPrice: "",
    soldPrice: "",
    soldDate: "",
    description: "Custom new construction · Ocean City",
    isArchive: true,
  },
  {
    title: "109 Anchor Road",
    slug: "109-anchor-road",
    image: anchor109Photo01,
    location: "Ocean City, NJ",
    listedPrice: "",
    soldPrice: "",
    soldDate: "",
    description: "Custom new construction · Ocean City",
    isArchive: true,
  },
  {
    title: "111 Anchor Road",
    slug: "111-anchor-road",
    image: anchor111Photo01,
    location: "Ocean City, NJ",
    listedPrice: "",
    soldPrice: "",
    soldDate: "",
    description: "Bayfront custom new construction · Ocean City",
    isArchive: true,
  },
  {
    title: "113 Anchor Road",
    slug: "113-anchor-road",
    image: anchor113Photo01,
    location: "Ocean City, NJ",
    listedPrice: "",
    soldPrice: "",
    soldDate: "",
    description: "Bayfront custom new construction · Ocean City",
    isArchive: true,
  },
];

/** Helper: get the link path for a past project */
export const getPastProjectLink = (slug: string) => `/developments/sold/${slug}`;

/**
 * Parse a soldDate string into a sortable timestamp.
 * Supported formats — most specific wins, so newer closings always rank first:
 *   "Month Day, Year" (e.g. "May 21, 2026") → exact closing date
 *   "Month Year"      (e.g. "May 2026")     → 15th of that month
 *   "Year"            (e.g. "2025")         → Jan 1 of that year (ranks below any month-specific date in the same year)
 *   ""                                        → -Infinity (archive entries last)
 * Always use the most specific form available when you know it — this is how
 * homes auto-rank "newest sold first" across Past Projects, Developments,
 * and Sold pages.
 */
export const parseSoldDate = (soldDate: string): number => {
  if (!soldDate) return -Infinity;
  const s = soldDate.trim();

  // "Year" → Jan 1 of that year (so month-specific dates in the same year always rank above)
  const yearOnly = /^\d{4}$/.exec(s);
  if (yearOnly) return new Date(`${yearOnly[0]}-01-01`).getTime();

  // "Month Day, Year" → exact day
  const exact = Date.parse(s);
  if (!isNaN(exact) && /\d{1,2},/.test(s)) return exact;

  // "Month Year" → 15th of that month (mid-month, beats year-only)
  const midMonth = Date.parse(`15 ${s}`);
  if (!isNaN(midMonth)) return midMonth;

  return -Infinity;
};

/** Past projects sorted newest sold first; archive entries last. */
export const sortedPastProjects = [...pastProjects].sort(
  (a, b) => parseSoldDate(b.soldDate) - parseSoldDate(a.soldDate),
);

/**
 * Format a soldDate for display — strips the day so "May 21, 2026" becomes "May 2026".
 * The day is kept in data only for ranking; visitors never see exact closing days.
 */
export const formatSoldDate = (soldDate: string): string => {
  if (!soldDate) return "";
  const m = /^([A-Za-z]+)\s+\d{1,2},\s*(\d{4})$/.exec(soldDate.trim());
  if (m) return `${m[1]} ${m[2]}`;
  return soldDate;
};
