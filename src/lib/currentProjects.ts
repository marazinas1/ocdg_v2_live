// Single source of truth for all current project cards.
// When adding a new project, add it here — all pages (Index, ActiveListings, Gallery, etc.)
// will automatically pick up the price, hero image, and details.

import exteriorFront from "@/assets/exterior-front-card.jpg";
import extView1_28th from "@/assets/28th-ext-view1-card.jpg";
import dundeeExt1 from "@/assets/dundee-ext-view1-card.jpg";
import asburyExt1 from "@/assets/asbury-ext-01-card.jpg";
import simpsonExt1 from "@/assets/simpson-ext-01-card.jpg";
import asbury4138Ext1 from "@/assets/asbury-4138-ext-01-card.jpg";
import central1100Ext1 from "@/assets/central-1100-ext-01-card.jpg";
import walnut6Ext1 from "@/assets/walnut-6-ext-01-card.jpg";
import waverly522Ext1 from "@/assets/waverly-522-ext-01-card.jpg";
import brighton905Ext1 from "@/assets/brighton-905-ext-01-card.jpg";
import waterway13Ext1 from "@/assets/waterway-13-ext-01-card.jpg";
import bay3112Ext1 from "@/assets/bay-3112-ext-01-card.jpg";
import bayland3213Ext1 from "@/assets/bayland-3213-ext-01-card.jpg";

export interface CurrentProject {
  title: string;
  slug: string;
  image: string;
  location: string;
  price: string;
  description: string;
  status: string;
  statusColor: string;
  /** ISO date "YYYY-MM-DD" — when this listing went live. Used for newest-first sorting. */
  listedDate?: string;
}

export const currentProjects: CurrentProject[] = [
  {
    title: "3213 Bayland Drive",
    slug: "3213-bayland-drive",
    image: bayland3213Ext1,
    location: "Baylandings, Ocean City, NJ",
    price: "$2,995,000",
    description: "Custom new-construction single-family in Ocean City's exclusive Baylandings neighborhood — 5 bedrooms, 5.5 baths, private elevator, GE Monogram gourmet kitchen, gas log fireplace, and a private in-ground pool with breathtaking water and sunset views.",
    status: "Active Listing",
    statusColor: "bg-emerald-500",
    listedDate: "2026-06-02",
  },
  {
    title: "3112 Bay Ave",
    slug: "3112-bay-ave",
    image: bay3112Ext1,
    location: "Bay Area, Ocean City, NJ",
    price: "$2,495,000",
    description: "Custom new-construction single-family by OCDG & Halliday Architects — 5 bedrooms, 4 baths, private elevator, gas log fireplace, and attached two-car garage on Ocean City's Bay Avenue.",
    status: "Under Contract",
    statusColor: "bg-amber-600",
    listedDate: "2026-05-26",
  },
  {
    title: "71 Morningside Road",
    slug: "71-morningside-road",
    image: exteriorFront,
    location: "Ocean City, NJ",
    price: "$5,995,000",
    description: "A four-level architectural masterpiece crafted for generations of coastal living.",
    status: "Active Listing",
    statusColor: "bg-emerald-500",
    listedDate: "2026-05-01",
  },
  {
    title: "201 28th Street",
    slug: "201-28th-street",
    image: extView1_28th,
    location: "Ocean City, NJ",
    price: "$2,895,000",
    description: "A masterpiece of coastal architecture — 4 bedrooms, 4.5 baths, 3 stories with private elevator.",
    status: "Active Listing",
    statusColor: "bg-emerald-500",
    listedDate: "2026-04-20",
  },
  {
    title: "19 E Dundee Road",
    slug: "19-e-dundee-road",
    image: dundeeExt1,
    location: "The Gardens, Ocean City, NJ",
    price: "$3,995,000",
    description: "A Halliday Architects masterpiece — 5 bedrooms, 3.5 baths, private pool, in the prestigious Gardens.",
    status: "Active Listing",
    statusColor: "bg-emerald-500",
    listedDate: "2026-04-10",
  },
  {
    title: "1113 Simpson Ave",
    slug: "1113-simpson-ave",
    image: simpsonExt1,
    location: "Ocean City, NJ",
    price: "$1,995,000",
    description: "Custom upside-down style new construction — 5 bedrooms, 3.5 baths, elevator, and built-in gas fireplace in the center of the island.",
    status: "Active Listing",
    statusColor: "bg-emerald-500",
    listedDate: "2026-03-25",
  },
  {
    title: "522 Waverly Blvd",
    slug: "522-waverly-blvd",
    image: waverly522Ext1,
    location: "The Gardens, Ocean City, NJ",
    price: "$4,995,000",
    description: "Halliday Architects new construction in the East-side Gardens — 5 bedrooms, 4.5 baths, 3 stories, elevator, in-ground pool, detached garage, and a backyard oasis.",
    status: "Active Listing",
    statusColor: "bg-emerald-500",
    listedDate: "2026-03-10",
  },
  {
    title: "905-907 Brighton Place",
    slug: "905-907-brighton-place",
    image: brighton905Ext1,
    location: "North End, Ocean City, NJ",
    price: "From $1,995,000",
    description: "Halliday Architects coastal duplex — two new-construction luxury condominiums in Ocean City's North End, steps to the beach and boardwalk. Available individually or as a duplex.",
    status: "Under Contract",
    statusColor: "bg-amber-600",
    listedDate: "2026-02-25",
  },
  {
    title: "13 Waterway Road",
    slug: "13-waterway-road",
    image: waterway13Ext1,
    location: "Baylandings, Ocean City, NJ",
    price: "$2,795,000",
    description: "Custom new construction in the sought-after Baylandings neighborhood — 5 bedrooms, 5.5 baths, 3 stories, GE Monogram gourmet kitchen, gas fireplace, and a private in-ground pool.",
    status: "Active Listing",
    statusColor: "bg-emerald-500",
    listedDate: "2026-02-10",
  },
  // ───── Under Contract (reserved) ─────
  {
    title: "2029 Asbury Ave",
    slug: "2029-asbury-ave",
    image: asburyExt1,
    location: "Ocean City, NJ",
    price: "$3,195,000",
    description: "Gold Coast new construction — 5 bedrooms, 4.5 baths, elevator, and five expansive decks.",
    status: "Under Contract",
    statusColor: "bg-amber-600",
    listedDate: "2026-04-15",
  },
  {
    title: "4138 Asbury Ave",
    slug: "4138-asbury-ave",
    image: asbury4138Ext1,
    location: "Ocean City, NJ",
    price: "$1,495,000",
    description: "Upscale Southend new construction by Halliday-Leonard — 3 bedrooms, 2 baths, top-floor unit with private roof deck, one block to the beach.",
    status: "Under Contract",
    statusColor: "bg-amber-600",
    listedDate: "2026-04-01",
  },
  {
    title: "1100 Central Ave",
    slug: "1100-central-ave",
    image: central1100Ext1,
    location: "Ocean City, NJ",
    price: "$2,595,000",
    description: "Single-family new construction on a Central Avenue corner lot — 4 bedrooms, 2.5 baths, 3-stop elevator, rooftop deck, three blocks to the beach.",
    status: "Under Contract",
    statusColor: "bg-amber-600",
    listedDate: "2026-03-15",
  },
  {
    title: "6 Walnut Road",
    slug: "6-walnut-road",
    image: walnut6Ext1,
    location: "Ocean City, NJ",
    price: "$3,295,000",
    description: "Riviera new construction by OCDG — 4 bedrooms, 4.5 baths, gourmet kitchen with quartz & GE Monogram, elevator, in-ground pool, and detached 2-car garage.",
    status: "Under Contract",
    statusColor: "bg-amber-600",
    listedDate: "2026-02-15",
  },
];

/** Helper: get the link path for a current project */
export const getProjectLink = (slug: string) => `/developments/current-projects/${slug}`;

/** Sort by listedDate descending (newest first); undated entries go last. */
export const sortByListedDateDesc = <T extends { listedDate?: string }>(arr: T[]): T[] =>
  [...arr].sort((a, b) => {
    const ta = a.listedDate ? Date.parse(a.listedDate) : -Infinity;
    const tb = b.listedDate ? Date.parse(b.listedDate) : -Infinity;
    return tb - ta;
  });
