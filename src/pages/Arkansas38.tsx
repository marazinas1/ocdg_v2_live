import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GlobalNav from "@/components/GlobalNav";
import GlobalFooter from "@/components/GlobalFooter";
import { Bed, Bath, MapPin, Phone, Mail, X, ChevronLeft, ChevronRight, Flame, Thermometer, TreePine, Sparkles, Download, CheckCircle2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import subpageHero from "@/assets/arkansas-38-ext-01.jpg";
import ext01 from "@/assets/arkansas-38-ext-01.jpg";
import ext02 from "@/assets/arkansas-38-ext-02.jpg";
import ext03 from "@/assets/arkansas-38-ext-03.jpg";
import ext04 from "@/assets/arkansas-38-ext-04.jpg";
import ext05 from "@/assets/arkansas-38-ext-05.jpg";
import ext06 from "@/assets/arkansas-38-ext-06.jpg";
import floorFirst from "@/assets/arkansas-38-floor-first.jpg";
import floorSecond from "@/assets/arkansas-38-floor-second.jpg";
import floorThird from "@/assets/arkansas-38-floor-third.jpg";
import intLiving from "@/assets/arkansas-38-int-living.jpg";
import intKitchen from "@/assets/arkansas-38-int-kitchen.jpg";
import intMaster from "@/assets/arkansas-38-int-master.jpg";
import intBath from "@/assets/arkansas-38-int-bath.jpg";
import intFoyer from "@/assets/arkansas-38-int-foyer.jpg";
import intRec from "@/assets/arkansas-38-int-rec.jpg";

// ─── Real "as built" photography (MLS) ───
import photoExt01 from "@/assets/arkansas-38-photo-ext-01.jpg";
import photoExt02 from "@/assets/arkansas-38-photo-ext-02.jpg";
import photoExt03 from "@/assets/arkansas-38-photo-ext-03.jpg";
import photoExt04 from "@/assets/arkansas-38-photo-ext-04.jpg";
import photoExt05 from "@/assets/arkansas-38-photo-ext-05.jpg";
import photoExt06 from "@/assets/arkansas-38-photo-ext-06.jpg";
import photoExt07 from "@/assets/arkansas-38-photo-ext-07.jpg";
import photoExt08 from "@/assets/arkansas-38-photo-ext-08.jpg";
import photoExt09 from "@/assets/arkansas-38-photo-ext-09.jpg";
import photoExt10 from "@/assets/arkansas-38-photo-ext-10.jpg";
import photoExt11 from "@/assets/arkansas-38-photo-ext-11.jpg";
import photoExt12 from "@/assets/arkansas-38-photo-ext-12.jpg";
import photoExt13 from "@/assets/arkansas-38-photo-ext-13.jpg";
import photoExt14 from "@/assets/arkansas-38-photo-ext-14.jpg";
import photoExt15 from "@/assets/arkansas-38-photo-ext-15.jpg";
import photoExt16 from "@/assets/arkansas-38-photo-ext-16.jpg";
import photoExt17 from "@/assets/arkansas-38-photo-ext-17.jpg";
import photoExt18 from "@/assets/arkansas-38-photo-ext-18.jpg";
import photoExt19 from "@/assets/arkansas-38-photo-ext-19.jpg";
import photoExt20 from "@/assets/arkansas-38-photo-ext-20.jpg";
import photoInt01 from "@/assets/arkansas-38-photo-int-01.jpg";
import photoInt02 from "@/assets/arkansas-38-photo-int-02.jpg";
import photoInt03 from "@/assets/arkansas-38-photo-int-03.jpg";
import photoInt04 from "@/assets/arkansas-38-photo-int-04.jpg";
import photoInt05 from "@/assets/arkansas-38-photo-int-05.jpg";
import photoInt06 from "@/assets/arkansas-38-photo-int-06.jpg";
import photoInt07 from "@/assets/arkansas-38-photo-int-07.jpg";
import photoInt08 from "@/assets/arkansas-38-photo-int-08.jpg";
import photoInt09 from "@/assets/arkansas-38-photo-int-09.jpg";
import photoInt10 from "@/assets/arkansas-38-photo-int-10.jpg";
import photoInt11 from "@/assets/arkansas-38-photo-int-11.jpg";
import photoInt12 from "@/assets/arkansas-38-photo-int-12.jpg";
import photoInt13 from "@/assets/arkansas-38-photo-int-13.jpg";
import photoInt14 from "@/assets/arkansas-38-photo-int-14.jpg";
import photoInt15 from "@/assets/arkansas-38-photo-int-15.jpg";
import photoInt16 from "@/assets/arkansas-38-photo-int-16.jpg";
import photoInt17 from "@/assets/arkansas-38-photo-int-17.jpg";
import photoInt18 from "@/assets/arkansas-38-photo-int-18.jpg";
import photoInt19 from "@/assets/arkansas-38-photo-int-19.jpg";
import photoInt20 from "@/assets/arkansas-38-photo-int-20.jpg";
import photoInt21 from "@/assets/arkansas-38-photo-int-21.jpg";
import photoInt22 from "@/assets/arkansas-38-photo-int-22.jpg";
import photoInt23 from "@/assets/arkansas-38-photo-int-23.jpg";
import photoInt24 from "@/assets/arkansas-38-photo-int-24.jpg";
import photoInt25 from "@/assets/arkansas-38-photo-int-25.jpg";
import photoInt26 from "@/assets/arkansas-38-photo-int-26.jpg";
import photoInt27 from "@/assets/arkansas-38-photo-int-27.jpg";
import photoInt28 from "@/assets/arkansas-38-photo-int-28.jpg";
import photoInt29 from "@/assets/arkansas-38-photo-int-29.jpg";
import photoInt30 from "@/assets/arkansas-38-photo-int-30.jpg";
import photoInt31 from "@/assets/arkansas-38-photo-int-31.jpg";
import photoInt32 from "@/assets/arkansas-38-photo-int-32.jpg";
import photoInt33 from "@/assets/arkansas-38-photo-int-33.jpg";
import photoInt34 from "@/assets/arkansas-38-photo-int-34.jpg";
import photoInt35 from "@/assets/arkansas-38-photo-int-35.jpg";
import photoInt36 from "@/assets/arkansas-38-photo-int-36.jpg";
import photoInt37 from "@/assets/arkansas-38-photo-int-37.jpg";
import photoInt38 from "@/assets/arkansas-38-photo-int-38.jpg";
import photoInt39 from "@/assets/arkansas-38-photo-int-39.jpg";
import photoInt40 from "@/assets/arkansas-38-photo-int-40.jpg";
import photoInt41 from "@/assets/arkansas-38-photo-int-41.jpg";
import photoInt42 from "@/assets/arkansas-38-photo-int-42.jpg";
import photoInt43 from "@/assets/arkansas-38-photo-int-43.jpg";
import photoInt44 from "@/assets/arkansas-38-photo-int-44.jpg";

const propertyData = {
  name: "38 Arkansas Ave",
  unit: "Riviera Bayfront Estate",
  headline: "An Oversized Waterfront Masterpiece",
  tagline: "A Halliday-Leonard new-construction estate on a rare oversized 80' × 106' bayfront lot — seven bedrooms, five-and-a-half baths, over 5,100 square feet, brand-new private dock, multiple decks, and an in-ground pool on the Arkansas Ave & Walnut Rd canal in the Riviera neighborhood.",
  description: "Offered by Halliday Leonard, 38 Arkansas Ave is the latest masterpiece on a rare oversized 80' × 106' waterfront lot in Ocean City's coveted Riviera neighborhood. Spanning over 5,100 square feet, this three-story residence delivers seven bedrooms, 5.5 baths, two fireplaces, a custom kitchen with massive island and Wolf/SubZero appliance package, an elevator serving all levels, a brand-new private dock on the canal, multiple decks, and an in-ground pool. Classic cedar siding evokes the generational summer cottage — finished to the highest standards inside.",
  status: "Sold · May 2026",
  price: "$8,500,000",
  listedPrice: "$8,500,000",
  soldPrice: "$8,500,000",
  closedDate: "May 2026",
  location: { city: "Ocean City", state: "NJ" },
  details: { bedrooms: 7, fullBaths: 5, halfBaths: 1, totalRooms: 18 },
  contact: {
    name: "Patrick Halliday",
    company: "Ocean City Development Group, LLC",
    phone: "(609) 602-3917",
    email: "PatrickAHalliday@gmail.com",
  },
  specs: [
    { icon: "fireplace", title: "Two Built-In Fireplaces", description: "Two gas-log fireplaces — one anchoring the living room, the second creating a private retreat in the master suite." },
    { icon: "hardwood", title: "Hardwood Floors Throughout", description: "Continuous hardwood flooring across every level — paired with custom tile in the spa-like baths." },
    { icon: "hvac", title: "Multi-Zoned Gas Heat & AC", description: "Natural-gas heating with multi-zoned central air conditioning and ceiling fans for year-round, room-by-room comfort." },
    { icon: "rooftop", title: "Wolf / SubZero Custom Kitchen", description: "A custom kitchen with massive center island, walk-in pantry, and the full Wolf and SubZero appliance package." },
  ],
  luxuryFeatures: [
    "Halliday-Leonard new construction · 2025",
    "3-story · 5,109 sq ft · oversized 80' × 106' bayfront lot",
    "Bayfront on Arkansas Ave & Walnut Rd canal · quick open-bay access",
    "Brand-new private dock & boat slip · bulkheaded",
    "In-ground pool · multiple decks · porches",
    "Custom kitchen · massive island · walk-in pantry",
    "Wolf & SubZero appliance package",
    "Two built-in gas-log fireplaces · living room & master",
    "Elevator serving all three floors",
    "Master suite with spa-like bath & walk-in closet",
    "Two ensuites + jack-and-jill on second floor",
    "Third-floor recreation room, loft, and full bath",
    "Hardwood, tile & wall-to-wall carpet flooring",
    "Multi-zoned natural-gas heat & central AC",
    "Cedar siding · stone accents · attached two-car garage",
    "Sprinkler system · sidewalks · curbs",
  ],
  locationFeatures: [
    "Ocean City's coveted Riviera neighborhood",
    "Bayfront on the Arkansas Ave & Walnut Rd canal",
    "Quick canal access to the open bay — boater's dream",
    "9th Street bridge → Bay Ave → Arkansas Ave",
    "Lot 13 · Block 1910 · 80' × 106' oversized waterfront lot",
  ],
  highlights: [
    { value: "7", label: "Bedrooms" },
    { value: "5.5", label: "Bathrooms" },
    { value: "5,109", label: "Sq Ft" },
    { value: "80'×106'", label: "Bayfront Lot" },
    { value: "Private", label: "Dock & Pool" },
  ],
  floorPlans: [
    {
      id: "first",
      name: "First Floor",
      image: floorFirst,
      description: "The main entertaining level — an open great room with built-in gas fireplace flowing into a formal dining area and a custom kitchen with massive island, walk-in pantry, and the full Wolf/SubZero appliance package. A private library/study, powder room, attached two-car garage with auto door openers, and direct deck access to the pool and dock complete the level.",
      highlights: [
        "Great Room · Built-In Gas Fireplace",
        "Custom Kitchen · Massive Island",
        "Wolf & SubZero Appliance Package",
        "Walk-In Pantry · Formal Dining",
        "Library / Study · Powder Room",
        "Attached Two-Car Garage · Elevator",
        "Direct Access to Pool, Decks & Dock",
      ],
    },
    {
      id: "second",
      name: "Second Floor",
      image: floorSecond,
      description: "The principal bedroom level — five bedrooms including an expansive master suite with built-in fireplace, spa-like bath, and walk-in closets, two additional ensuites, and two bedrooms sharing a jack-and-jill bath. Dedicated laundry and elevator access complete the floor.",
      highlights: [
        "Master Suite · Built-In Fireplace",
        "Spa-Like Bath · Soaking Tub · Walk-In Shower",
        "Dual Walk-In Closets",
        "Two Additional Ensuite Bedrooms",
        "Jack-and-Jill Shared Bath · Two Bedrooms",
        "Dedicated Laundry Room",
        "Private Master Deck · Bay Views",
      ],
    },
    {
      id: "third",
      name: "Third Floor",
      image: floorThird,
      description: "The upper retreat — two generously sized bedrooms, a full bath, and a recreation room that opens to a private deck with bay views. A large loft offers a flexible play area, home office, or fitness space.",
      highlights: [
        "Two Bedrooms · Full Bath",
        "Recreation Room · Deck Access",
        "Large Loft · Flex Space",
        "Private Bay-View Deck",
      ],
    },
  ],
};

const iconMap: Record<string, React.ComponentType<any>> = {
  fireplace: Flame,
  hardwood: TreePine,
  hvac: Thermometer,
  rooftop: Sparkles,
};

const exteriorImages = [
  { src: ext01, alt: "38 Arkansas Ave — Front Elevation" },
  { src: ext02, alt: "38 Arkansas Ave — Rear Bayfront with Pool" },
  { src: ext03, alt: "38 Arkansas Ave — Aerial Bayfront View with Dock" },
  { src: ext04, alt: "38 Arkansas Ave — Pool & Garden" },
  { src: ext05, alt: "38 Arkansas Ave — Wraparound Porch" },
  { src: ext06, alt: "38 Arkansas Ave — Front Entry & Cedar Siding" },
];

const interiorImages = [
  { src: intLiving, alt: "38 Arkansas Ave — Living Room with Stone Fireplace" },
  { src: intKitchen, alt: "38 Arkansas Ave — Custom Kitchen with Massive Island" },
  { src: intMaster, alt: "38 Arkansas Ave — Master Suite with Built-In Fireplace" },
  { src: intBath, alt: "38 Arkansas Ave — Spa-Like Master Bath" },
  { src: intFoyer, alt: "38 Arkansas Ave — Grand Foyer & Entry" },
  { src: intRec, alt: "38 Arkansas Ave — Third-Floor Recreation Room" },
];

const photoExteriorImages = [
  { src: photoExt01, alt: "38 Arkansas Ave — Bayfront Pool & Dock" },
  { src: photoExt02, alt: "38 Arkansas Ave — Covered Porch with Canal View" },
  { src: photoExt03, alt: "38 Arkansas Ave — Pool & Bay Panorama" },
  { src: photoExt04, alt: "38 Arkansas Ave — Pool & Spa from Deck" },
  { src: photoExt05, alt: "38 Arkansas Ave — Top-Floor Deck with Panoramic Bay & Canal Views" },
  { src: photoExt06, alt: "38 Arkansas Ave — Mahogany Deck with Cable Railings & Marina Views" },
  { src: photoExt07, alt: "38 Arkansas Ave — Aerial View of Private Dock & Bayfront Yard" },
  { src: photoExt08, alt: "38 Arkansas Ave — Cedar-Shingle Façade & Front Entry" },
  { src: photoExt09, alt: "38 Arkansas Ave — Street View of Shingle-Style Estate" },
  { src: photoExt10, alt: "38 Arkansas Ave — Mahogany Front Porch & Custom Wood Door" },
  { src: photoExt11, alt: "38 Arkansas Ave — Rear Elevation with Multi-Level Porches & Pool" },
  { src: photoExt12, alt: "38 Arkansas Ave — Bayfront Rear with Pool, Dock & Boat Slips" },
  { src: photoExt13, alt: "38 Arkansas Ave — Three-Story Rear Elevation with Stacked Porches & Pool" },
  { src: photoExt14, alt: "38 Arkansas Ave — Gabled Dormer with Mahogany Sundeck & Cable Railings" },
  { src: photoExt15, alt: "38 Arkansas Ave — Architectural Detail of Dormers, Balconies & Cedar Shingle" },
  { src: photoExt16, alt: "38 Arkansas Ave — Aerial Top-Down View of Pool, Dock & Roofline" },
  { src: photoExt17, alt: "38 Arkansas Ave — Drone View of Pool, Patio & Private Boat Slips" },
  { src: photoExt18, alt: "38 Arkansas Ave — Riviera Canal Aerial with Property in Context" },
  { src: photoExt19, alt: "38 Arkansas Ave — Aerial Showing Bay & Marshland Beyond Riviera" },
  { src: photoExt20, alt: "38 Arkansas Ave — Wide Aerial of Riviera Neighborhood with Atlantic City Skyline" },
];

const photoInteriorImages = [
  { src: photoInt01, alt: "38 Arkansas Ave — Open Living & Kitchen" },
  { src: photoInt02, alt: "38 Arkansas Ave — Great Room with Bay Views" },
  { src: photoInt03, alt: "38 Arkansas Ave — Kitchen & Dining" },
  { src: photoInt04, alt: "38 Arkansas Ave — Chef's Kitchen with Wolf Range" },
  { src: photoInt05, alt: "38 Arkansas Ave — Kitchen Island & Custom Cabinetry" },
  { src: photoInt06, alt: "38 Arkansas Ave — Wolf Range & Walk-In Pantry" },
  { src: photoInt07, alt: "38 Arkansas Ave — Open Plan to Bayfront Doors" },
  { src: photoInt08, alt: "38 Arkansas Ave — Butler's Pantry with Open Shelving" },
  { src: photoInt09, alt: "38 Arkansas Ave — Prep Pantry & Marble Counters" },
  { src: photoInt10, alt: "38 Arkansas Ave — Wolf Range & Marble Backsplash" },
  { src: photoInt11, alt: "38 Arkansas Ave — Custom White Oak Island Detail" },
  { src: photoInt12, alt: "38 Arkansas Ave — Great Room with Coffered Ceiling & Fireplace" },
  { src: photoInt13, alt: "38 Arkansas Ave — Butler's Pantry with Sub-Zero Wine & Glass Cabinetry" },
  { src: photoInt14, alt: "38 Arkansas Ave — Grand Foyer with Mahogany Entry & Open Stair" },
  { src: photoInt15, alt: "38 Arkansas Ave — White Oak Stair with Iron Spindles" },
  { src: photoInt16, alt: "38 Arkansas Ave — Second Floor Hall & Bedroom Wing" },
  { src: photoInt17, alt: "38 Arkansas Ave — Custom Built-In Bunk Room" },
  { src: photoInt18, alt: "38 Arkansas Ave — Bunk Suite with Storage Stair Detail" },
  { src: photoInt19, alt: "38 Arkansas Ave — Bedroom with Built-In Wardrobes" },
  { src: photoInt20, alt: "38 Arkansas Ave — Bedroom Suite with Dual Built-Ins & En-Suite Access" },
  { src: photoInt21, alt: "38 Arkansas Ave — Custom Laundry Room with Powder-Blue Cabinetry" },
  { src: photoInt22, alt: "38 Arkansas Ave — Dual Stacked Washer/Dryer & Utility Sink" },
  { src: photoInt23, alt: "38 Arkansas Ave — Bayfront Bedroom with Private Balcony Access" },
  { src: photoInt24, alt: "38 Arkansas Ave — Hallway Linen Storage & En-Suite Bath" },
  { src: photoInt25, alt: "38 Arkansas Ave — Marble En-Suite Bath with Herringbone Tile" },
  { src: photoInt26, alt: "38 Arkansas Ave — Canal-View Bedroom with Sliding Balcony Doors" },
  { src: photoInt27, alt: "38 Arkansas Ave — Light-Filled Bedroom with Built-In Wardrobe" },
  { src: photoInt28, alt: "38 Arkansas Ave — Primary Bath with Soaking Tub & Double Oak Vanity" },
  { src: photoInt29, alt: "38 Arkansas Ave — Primary Bath with Onyx Marble Shower & Basketweave Floor" },
  { src: photoInt30, alt: "38 Arkansas Ave — Dual Rainfall Shower with Brushed Brass Fixtures" },
  { src: photoInt31, alt: "38 Arkansas Ave — Wet Bar with Sub-Zero Wine Tower & Canal-View Lounge" },
  { src: photoInt32, alt: "38 Arkansas Ave — Top-Floor Lounge with Beadboard Tray Ceiling" },
  { src: photoInt33, alt: "38 Arkansas Ave — Powder Room with Brass Sconces & Herringbone Floor" },
  { src: photoInt34, alt: "38 Arkansas Ave — Guest Bath with Custom Vanity & Arched Mirror" },
  { src: photoInt35, alt: "38 Arkansas Ave — Spa Shower with Vertical Wood-Grain Tile" },
  { src: photoInt36, alt: "38 Arkansas Ave — Vaulted-Ceiling Bedroom with Coastal Light" },
  { src: photoInt37, alt: "38 Arkansas Ave — Mechanical Room with Dual Water Heaters & Light Oak Floors" },
  { src: photoInt38, alt: "38 Arkansas Ave — Upper Hallway with Open Staircase & Custom Railings" },
  { src: photoInt39, alt: "38 Arkansas Ave — Bonus Room with Built-In Window Seat & Tray Ceiling" },
  { src: photoInt40, alt: "38 Arkansas Ave — Lounge with Wet Bar, Wine Fridge & Tray Ceiling" },
  { src: photoInt41, alt: "38 Arkansas Ave — Custom White Oak Shower Floor Detail" },
  { src: photoInt42, alt: "38 Arkansas Ave — Bunk Room with Built-In Storage & Window Bench" },
  { src: photoInt43, alt: "38 Arkansas Ave — Bedroom with Floor-to-Ceiling Built-In Cabinetry" },
  { src: photoInt44, alt: "38 Arkansas Ave — Bedroom Suite with Built-In Media Wall & Ensuite Bath" },
];

const allGalleryImages = [...exteriorImages, ...interiorImages, ...photoExteriorImages, ...photoInteriorImages];

const Arkansas38 = () => {
  const [activeFloor, setActiveFloor] = useState(propertyData.floorPlans[0].id);
  const currentFloor = propertyData.floorPlans.find((f) => f.id === activeFloor);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", interest: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const { ref: highlightsRef, isVisible: highlightsVisible } = useScrollReveal(0.3);
  const { ref: visionRef, isVisible: visionVisible } = useScrollReveal();
  const { ref: specsRef, isVisible: specsVisible } = useScrollReveal();
  const { ref: floorRef, isVisible: floorVisible } = useScrollReveal();
  const { ref: galleryRef, isVisible: galleryVisible } = useScrollReveal();
  const { ref: photoGalleryRef, isVisible: photoGalleryVisible } = useScrollReveal();
  const { ref: locationRef, isVisible: locationVisible } = useScrollReveal();
  const { ref: registerRef, isVisible: registerVisible } = useScrollReveal();

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };
  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % allGalleryImages.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + allGalleryImages.length) % allGalleryImages.length);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Thank you. Our team will be in touch regarding 38 Arkansas Ave shortly.");
    setFormData({ name: "", email: "", phone: "", interest: "" });
    setIsSubmitting(false);
  };

  const scrollToVision = () => document.getElementById("vision")?.scrollIntoView({ behavior: "smooth" });

  const [stickyVisible, setStickyVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const heroBottom = window.innerHeight;
      const registerEl = document.getElementById("register");
      const registerTop = registerEl?.getBoundingClientRect().top ?? Infinity;
      setStickyVisible(window.scrollY > heroBottom && registerTop > window.innerHeight * 0.5);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen">
      <GlobalNav />

      {/* ─── Hero ─── */}
      <section className="relative h-[85vh] md:h-screen min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 will-change-transform" style={{ transform: `translateY(${scrollY * 0.15}px)` }}>
            <div
              className="absolute -inset-[15%] animate-ken-burns"
              style={{
                backgroundImage: `url(${subpageHero})`,
                backgroundSize: "cover",
                backgroundPosition: "center 40%",
                backgroundRepeat: "no-repeat",
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          <div className="max-w-3xl animate-fade-in-up">
            <Link to="/developments" className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-[10px] font-medium tracking-[0.2em] uppercase text-white/90 border border-white/30 backdrop-blur-sm bg-white/5 transition-all duration-300 hover:bg-white/15 hover:border-white/50" style={{ borderRadius: "4px" }}>
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              {propertyData.status}
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-normal text-white mb-2 tracking-tight leading-tight">
              {propertyData.name}
            </h1>
            <p className="text-sm sm:text-base font-light tracking-[0.2em] uppercase text-white/70 mb-3">
              {propertyData.unit}
            </p>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif text-white/90 mb-3">
              {propertyData.headline}
            </p>
            <p className="text-lg sm:text-xl md:text-2xl font-light text-white/80 tracking-wide mb-6">
              {propertyData.price}
            </p>
            <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-6 text-white/80">
              <div className="flex items-center gap-2">
                <Bed className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                <span className="text-xs md:text-sm">{propertyData.details.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                <span className="text-xs md:text-sm">{propertyData.details.fullBaths}.{propertyData.details.halfBaths} Bathrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                <span className="text-xs md:text-sm">Riviera · Ocean City</span>
              </div>
            </div>
            <p className="text-base md:text-lg lg:text-xl text-white/80 font-light leading-relaxed mb-8 md:mb-10 max-w-2xl">
              {propertyData.tagline}
            </p>
            <button
              onClick={scrollToVision}
              className="inline-flex items-center justify-center px-6 md:px-8 py-2.5 md:py-3 text-xs md:text-sm font-medium tracking-wider uppercase border border-white/80 text-white bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-charcoal hover:-translate-y-0.5 hover:shadow-lg"
              style={{ borderRadius: "4px" }}
            >
              View the Opportunity
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-10">
          <div className="w-px h-12 md:h-16 bg-white/30 relative">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-pulse" />
          </div>
        </div>
      </section>

      {/* ─── Highlights Bar ─── */}
      <section ref={highlightsRef} className="py-10 md:py-14 border-y border-border-subtle bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 transition-all duration-1000 ${highlightsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {propertyData.highlights.map((item, i) => (
              <div key={i} className="text-center" style={{ transitionDelay: `${i * 100}ms` }}>
                <p className="text-2xl md:text-3xl font-serif text-charcoal mb-1">{item.value}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-slate">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Vision ─── */}
      <section id="vision" className="section-padding">
        <div ref={visionRef} className="container mx-auto px-6 lg:px-12">
          <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center transition-all duration-1000 ${visionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="order-2 lg:order-1">
              <p className="label-uppercase mb-4">The Vision</p>
              <h2 className="heading-section text-charcoal mb-6">A Riviera Bayfront Estate</h2>
              <div className="divider mb-8" />
              <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-sand border border-border-subtle">
                <div className="text-center">
                  <p className="text-2xl font-serif text-charcoal">{propertyData.details.bedrooms}</p>
                  <p className="text-xs uppercase tracking-wider text-muted-slate">Bedrooms</p>
                </div>
                <div className="text-center border-x border-border-subtle">
                  <p className="text-2xl font-serif text-charcoal">{propertyData.details.fullBaths}.{propertyData.details.halfBaths}</p>
                  <p className="text-xs uppercase tracking-wider text-muted-slate">Bathrooms</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-serif text-charcoal">{propertyData.details.totalRooms}</p>
                  <p className="text-xs uppercase tracking-wider text-muted-slate">Total Rooms</p>
                </div>
              </div>
              <div className="space-y-6">
                <p className="text-body">
                  <strong className="text-charcoal">First Floor:</strong> An open great room with built-in fireplace flows into the formal dining area and a custom kitchen with massive island, walk-in pantry, and the full Wolf/SubZero appliance package. Library/study, powder room, attached two-car garage, and direct deck, pool & dock access complete the level.
                </p>
                <p className="text-body">
                  <strong className="text-charcoal">Second Floor:</strong> Five bedrooms including an expansive master suite with built-in fireplace, spa-like bath, and dual walk-in closets, two additional ensuites, and two bedrooms sharing a jack-and-jill bath. Dedicated laundry and elevator access.
                </p>
                <p className="text-body">
                  <strong className="text-charcoal">Third Floor:</strong> Two generously sized bedrooms, a full bath, a recreation room opening to a private bay-view deck, and a large loft offering flexible space for play, office, or fitness.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img
                  src={ext03}
                  alt="38 Arkansas Ave — Aerial View"
                  className="w-full aspect-[4/5] object-cover" loading="lazy" decoding="async" />
                <div className="absolute -bottom-6 -left-6 w-40 h-24 border border-border bg-white flex items-center justify-center p-4">
                  <div className="text-center">
                    <p className="text-xs uppercase tracking-wider text-muted-slate mb-1">Riviera</p>
                    <p className="text-sm font-serif text-charcoal">Bayfront Estate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Specs ─── */}
      <section id="specs" className="section-padding section-sand">
        <div ref={specsRef} className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          <div className={`text-center max-w-2xl mx-auto mb-12 md:mb-16 transition-all duration-1000 ${specsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="label-uppercase mb-4">Technical Excellence</p>
            <h2 className="heading-section text-charcoal">The Halliday-Leonard Standard</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {propertyData.specs.map((spec, index) => {
              const Icon = iconMap[spec.icon];
              return (
                <div
                  key={index}
                  className={`bg-white p-6 md:p-8 border border-border-subtle hover:border-border hover:shadow-sm hover:-translate-y-0.5 transition-all duration-700 ${specsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ borderRadius: "4px", transitionDelay: `${200 + index * 150}ms` }}
                >
                  <div className="w-12 h-12 flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-charcoal" strokeWidth={1} />
                  </div>
                  <h3 className="heading-card text-charcoal mb-3">{spec.title}</h3>
                  <p className="text-body text-sm leading-relaxed">{spec.description}</p>
                </div>
              );
            })}
          </div>
          <div className={`mt-12 md:mt-16 max-w-4xl mx-auto transition-all duration-1000 delay-700 ${specsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {propertyData.luxuryFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-charcoal rounded-full flex-shrink-0" />
                  <span className="text-body text-sm md:text-base">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-12">
            <a
              href="https://sjsr.paragonrels.com/paragonls/publink/view.mvc/?GUID=ecadbef9-c080-4ed8-a28b-33b6c9975d2c&Report=Yes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-slate hover:text-charcoal transition-colors tracking-wider uppercase inline-flex items-center gap-1.5"
            >
              Official Property Record: South Jersey MLS
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ─── Floor Plans ─── */}
      <section id="floor-plans" className="section-padding">
        <div ref={floorRef} className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          <div className={`text-center max-w-2xl mx-auto mb-8 md:mb-12 transition-all duration-1000 ${floorVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="label-uppercase mb-4">Floor Plans</p>
            <h2 className="heading-section text-charcoal">Explore Every Level</h2>
          </div>
          <div className={`flex flex-wrap justify-center gap-2 mb-8 md:mb-12 transition-all duration-1000 delay-200 ${floorVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {propertyData.floorPlans.map((floor) => (
              <button
                key={floor.id}
                onClick={() => setActiveFloor(floor.id)}
                className={`px-4 md:px-6 py-2.5 md:py-3 text-xs tracking-[0.1em] uppercase font-medium transition-all duration-300 ${
                  activeFloor === floor.id ? "bg-primary text-primary-foreground" : "bg-muted text-slate hover:bg-accent"
                }`}
              >
                {floor.name}
              </button>
            ))}
          </div>
          <div className={`grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-8 items-start transition-all duration-1000 delay-300 ${floorVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="bg-white p-3 md:p-4 border border-border min-h-[300px] sm:min-h-[400px] lg:min-h-0" style={{ borderRadius: "4px" }}>
                <img key={activeFloor} src={currentFloor?.image} alt={currentFloor?.name} className="w-full h-auto animate-fade-in" style={{ aspectRatio: "auto" }} loading="lazy" decoding="async" />
              </div>
            </div>
            <div className="bg-background-sand p-6 md:p-8 order-2 lg:order-1" style={{ borderRadius: "4px" }}>
              <h3 className="heading-card mb-4 text-charcoal">
                {currentFloor?.name}
              </h3>
              <p className="text-body text-sm md:text-base leading-relaxed mb-6">{currentFloor?.description}</p>
              <div className="divider mb-6" />
              <p className="label-uppercase mb-4">Key Features</p>
              <ul className="space-y-3 mb-8">
                {currentFloor?.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center gap-3 text-body text-sm md:text-base">
                    <span className="w-1.5 h-1.5 bg-charcoal rounded-full flex-shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-outline w-full flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Request Floor Plans PDF
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Gallery ─── */}
      <section id="gallery" className="section-padding section-sand">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          <div ref={galleryRef} className={`text-center max-w-2xl mx-auto mb-8 md:mb-12 transition-all duration-1000 ${galleryVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="label-uppercase mb-4">Gallery</p>
            <h2 className="heading-section text-charcoal">Immersive Visualizations</h2>
          </div>
          <div className="mb-12 md:mb-16">
            <p className="label-uppercase mb-6 text-center">Exterior Perspectives</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {exteriorImages.map((image, index) => (
                <div
                  key={index}
                  className={`cursor-pointer overflow-hidden group ${index === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""}`}
                  onClick={() => openLightbox(index)}
                  style={{ borderRadius: "4px" }}
                >
                  <div className="relative h-full">
                    <img src={image.src} alt={image.alt} className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${index === 0 ? "aspect-[4/3]" : "aspect-square"}`} loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 border border-white rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl">+</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {interiorImages.length > 0 && (
          <div>
            <p className="label-uppercase mb-6 text-center">Interior Design & Lifestyle</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {interiorImages.map((image, index) => (
                <div
                  key={index}
                  className={`cursor-pointer overflow-hidden group ${index === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""}`}
                  onClick={() => openLightbox(exteriorImages.length + index)}
                  style={{ borderRadius: "4px" }}
                >
                  <div className="relative h-full">
                    <img src={image.src} alt={image.alt} className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${index === 0 ? "aspect-[4/3]" : "aspect-square"}`} loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 border border-white rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl">+</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          )}
        </div>

        {lightboxOpen && (
          <div className="lightbox-overlay" onClick={closeLightbox}>
            <button className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-10" onClick={closeLightbox}>
              <X className="w-8 h-8" />
            </button>
            <button className="absolute left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors z-10" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button className="absolute right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors z-10" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
              <ChevronRight className="w-10 h-10" />
            </button>
            <img src={allGalleryImages[currentIndex].src} alt={allGalleryImages[currentIndex].alt} className="max-w-[90vw] max-h-[85vh] object-contain" loading="lazy" decoding="async" onClick={(e) => e.stopPropagation()} />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {currentIndex + 1} / {allGalleryImages.length}
            </div>
          </div>
        )}
      </section>

      {/* ─── A Closer Look (Real Photography) ─── */}
      <section id="closer-look" className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          <div ref={photoGalleryRef} className={`text-center max-w-2xl mx-auto mb-8 md:mb-12 transition-all duration-1000 ${photoGalleryVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="label-uppercase mb-4">Gallery</p>
            <h2 className="heading-section text-charcoal">A Closer Look</h2>
            <p className="text-body mt-4">Real photography from the completed residence — exterior, interior, and architectural detail.</p>
          </div>

          <div className="mb-12 md:mb-16">
            <p className="label-uppercase mb-6 text-center">Exterior</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {photoExteriorImages.map((image, index) => (
                <div
                  key={index}
                  className="cursor-pointer overflow-hidden group"
                  onClick={() => openLightbox(exteriorImages.length + interiorImages.length + index)}
                  style={{ borderRadius: "4px" }}
                >
                  <div className="relative h-full">
                    <img src={image.src} alt={image.alt} loading="lazy" className="w-full h-full aspect-square object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 border border-white rounded-full flex items-center justify-center">
                        <span className="text-white text-xl">+</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="label-uppercase mb-6 text-center">Interior & Detail</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {photoInteriorImages.map((image, index) => (
                <div
                  key={index}
                  className="cursor-pointer overflow-hidden group"
                  onClick={() => openLightbox(exteriorImages.length + interiorImages.length + photoExteriorImages.length + index)}
                  style={{ borderRadius: "4px" }}
                >
                  <div className="relative h-full">
                    <img src={image.src} alt={image.alt} loading="lazy" className="w-full h-full aspect-square object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 border border-white rounded-full flex items-center justify-center">
                        <span className="text-white text-xl">+</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Location ─── */}
      <section id="location" className="section-padding section-sand">
        <div ref={locationRef} className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${locationVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="relative h-[400px] lg:h-[500px] bg-muted">
              <iframe
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=38+Arkansas+Ave,+Ocean+City,+NJ"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale contrast-125"
                title="Property Location"
              />
            </div>
            <div>
              <p className="label-uppercase mb-4">The Location</p>
              <h2 className="heading-section text-charcoal mb-6">Life on the Riviera Canal</h2>
              <div className="divider mb-8" />
              <div className="flex items-start gap-4 mb-8">
                <MapPin className="w-5 h-5 text-charcoal mt-1 flex-shrink-0" />
                <div>
                  <p className="text-lg font-serif text-charcoal">{propertyData.name}</p>
                  <p className="text-body">{propertyData.location.city}, {propertyData.location.state}</p>
                </div>
              </div>
              <ul className="space-y-4">
                {propertyData.locationFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2.5 flex-shrink-0" />
                    <span className="text-body">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Register ─── */}
      {/* ─── Sold Story ─── */}
      <section id="sold" className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-5xl">
          <div className="text-center mb-12">
            <p className="label-uppercase mb-4">Sale Result</p>
            <h2 className="heading-section text-charcoal mb-4">Sold at Full Ask</h2>
            <p className="text-body max-w-2xl mx-auto">
              A signature Halliday-Leonard bayfront estate delivered to its end buyer through a direct Riviera canal sale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border-subtle border border-border-subtle mb-12">
            <div className="bg-white p-8 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-slate mb-3">Listed</p>
              <p className="text-3xl font-serif text-charcoal">{propertyData.listedPrice}</p>
            </div>
            <div className="bg-white p-8 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-slate mb-3">Sold</p>
              <p className="text-3xl font-serif text-charcoal">{propertyData.soldPrice}</p>
            </div>
            <div className="bg-white p-8 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-slate mb-3">Closed</p>
              <p className="text-3xl font-serif text-charcoal">{propertyData.closedDate}</p>
            </div>
          </div>

          <div className="bg-sand border border-border-subtle p-8 md:p-12 text-center" style={{ borderRadius: "4px" }}>
            <CheckCircle2 className="w-10 h-10 text-charcoal mx-auto mb-4" strokeWidth={1.25} />
            <h3 className="heading-card text-charcoal mb-3">Looking for a residence like this?</h3>
            <p className="text-body max-w-xl mx-auto mb-8">
              Our active portfolio includes new-construction homes throughout Ocean City — many with the same architects, finishes, and standards behind 38 Arkansas Ave.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/developments/current-projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-medium tracking-wider uppercase bg-charcoal text-white transition-all duration-300 hover:bg-charcoal/90"
                style={{ borderRadius: "4px" }}
              >
                View Current Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-medium tracking-wider uppercase border border-charcoal text-charcoal transition-all duration-300 hover:bg-charcoal hover:text-white"
                style={{ borderRadius: "4px" }}
              >
                Speak With OCDG
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Register ─── */}
      <section id="register" className="section-padding section-sand">
        <div ref={registerRef} className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          <div className={`max-w-xl mx-auto transition-all duration-1000 ${registerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="text-center mb-12">
              <p className="label-uppercase mb-4">Exclusive Opportunity</p>
              <h2 className="heading-section text-charcoal mb-4">Request Exclusive Information</h2>
              <p className="text-body">Register your interest to receive priority access to architectural plans, pricing details, and exclusive updates.</p>
            </div>
            <div className="bg-white border border-border-subtle p-6 mb-8" style={{ borderRadius: "4px" }}>
              <p className="text-xs uppercase tracking-wider text-muted-slate mb-4 text-center">Direct Contact</p>
              <div className="text-center mb-4">
                <p className="font-serif text-lg text-charcoal">{propertyData.contact.name}</p>
                <p className="text-sm text-muted-slate">{propertyData.contact.company}</p>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href={`tel:${propertyData.contact.phone.replace(/[^0-9]/g, "")}`} className="flex items-center justify-center gap-2 text-sm text-charcoal hover:text-muted-slate transition-colors">
                  <Phone className="w-4 h-4" strokeWidth={1.5} />
                  {propertyData.contact.phone}
                </a>
                <a href={`mailto:${propertyData.contact.email}`} className="flex items-center justify-center gap-2 text-sm text-charcoal hover:text-muted-slate transition-colors">
                  <Mail className="w-4 h-4" strokeWidth={1.5} />
                  {propertyData.contact.email}
                </a>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-wider text-muted-slate mb-2">Full Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="input-elegant" placeholder="John Smith" />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-wider text-muted-slate mb-2">Email Address</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="input-elegant" placeholder="john@example.com" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-muted-slate mb-2">Phone Number</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="input-elegant" placeholder="(555) 000-0000" />
              </div>
              <div>
                <label htmlFor="interest" className="block text-xs uppercase tracking-wider text-muted-slate mb-2">Interest Level</label>
                <select id="interest" name="interest" value={formData.interest} onChange={handleChange} required className="input-elegant appearance-none cursor-pointer">
                  <option value="">Select your interest...</option>
                  <option value="buyer">Ready to Purchase</option>
                  <option value="investor">Investment Opportunity</option>
                  <option value="exploring">Exploring Options</option>
                  <option value="agent">Real Estate Professional</option>
                </select>
              </div>
              <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed">
                {isSubmitting ? "Submitting..." : "Request Private Brochure"}
              </button>
              <p className="text-xs text-center text-muted-slate">Your information is kept strictly confidential and will never be shared.</p>
            </form>
          </div>
        </div>
      </section>

      {/* ─── Project Navigation ─── */}
      <nav className="border-t border-border py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl flex items-center justify-between">
          <Link to="/developments/sold/209-bark-drive" className="text-xs tracking-[0.15em] uppercase text-muted-slate hover:text-charcoal transition-colors">
            ← 209 Bark Drive
          </Link>
          <Link to="/developments" className="text-xs tracking-[0.15em] uppercase text-muted-slate hover:text-charcoal transition-colors">
            ← Back to Developments
          </Link>
          <Link to="/developments/sold/918-delancey-place" className="text-xs tracking-[0.15em] uppercase text-muted-slate hover:text-charcoal transition-colors">
            918 Delancey Place →
          </Link>
        </div>
      </nav>

      <GlobalFooter />

      {/* Sticky Inquire Button */}
      {stickyVisible && (
        <button
          onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 px-6 py-3 bg-charcoal text-white text-xs tracking-[0.15em] uppercase shadow-lg hover:bg-charcoal/90 transition-all duration-300"
          style={{ borderRadius: "4px" }}
        >
          Inquire
        </button>
      )}
    </main>
  );
};

export default Arkansas38;
