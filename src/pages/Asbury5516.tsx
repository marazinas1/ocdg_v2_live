import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GlobalNav from "@/components/GlobalNav";
import GlobalFooter from "@/components/GlobalFooter";
import { Bed, Bath, MapPin, Phone, Mail, X, ChevronLeft, ChevronRight, Flame, Thermometer, TreePine, Sparkles, Download } from "lucide-react";
import { toast } from "sonner";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import subpageHero from "@/assets/asbury-5516-ext-01.jpg";
import ext01 from "@/assets/asbury-5516-ext-01.jpg";
import ext02 from "@/assets/asbury-5516-ext-02.jpg";
import ext03 from "@/assets/asbury-5516-ext-03.jpg";
import ext04 from "@/assets/asbury-5516-ext-04.jpg";
import ext05 from "@/assets/asbury-5516-ext-05.jpg";
import ext06 from "@/assets/asbury-5516-ext-06.jpg";
import floorGround from "@/assets/asbury-5516-floor-ground.jpg";
import floorFirst from "@/assets/asbury-5516-floor-first.jpg";
import floorSecond from "@/assets/asbury-5516-floor-second.jpg";
import intLiving from "@/assets/asbury-5516-int-living.jpg";
import intKitchen from "@/assets/asbury-5516-int-kitchen.jpg";
import intDining from "@/assets/asbury-5516-int-dining.jpg";
import intMaster from "@/assets/asbury-5516-int-master.jpg";
import intBath from "@/assets/asbury-5516-int-bath.jpg";
import intGuest from "@/assets/asbury-5516-int-guest.jpg";

// ─── Real "as built" photography ───
import photoExt01 from "@/assets/asbury-5516-photo-ext-01.jpg";
import photoExt02 from "@/assets/asbury-5516-photo-ext-02.jpg";
import photoExt03 from "@/assets/asbury-5516-photo-ext-03.jpg";
import photoExt04 from "@/assets/asbury-5516-photo-ext-04.jpg";
import photoExt05 from "@/assets/asbury-5516-photo-ext-05.jpg";
import photoExt06 from "@/assets/asbury-5516-photo-ext-06.jpg";
import photoExt07 from "@/assets/asbury-5516-photo-ext-07.jpg";
import photoExt08 from "@/assets/asbury-5516-photo-ext-08.jpg";
import photoInt01 from "@/assets/asbury-5516-photo-int-01.jpg";
import photoInt02 from "@/assets/asbury-5516-photo-int-02.jpg";
import photoInt03 from "@/assets/asbury-5516-photo-int-03.jpg";
import photoInt04 from "@/assets/asbury-5516-photo-int-04.jpg";
import photoInt05 from "@/assets/asbury-5516-photo-int-05.jpg";
import photoInt06 from "@/assets/asbury-5516-photo-int-06.jpg";
import photoInt07 from "@/assets/asbury-5516-photo-int-07.jpg";
import photoInt08 from "@/assets/asbury-5516-photo-int-08.jpg";
import photoInt09 from "@/assets/asbury-5516-photo-int-09.jpg";
import photoInt10 from "@/assets/asbury-5516-photo-int-10.jpg";
import photoInt11 from "@/assets/asbury-5516-photo-int-11.jpg";
import photoInt12 from "@/assets/asbury-5516-photo-int-12.jpg";

const propertyData = {
  name: "5516 Asbury Ave",
  unit: "Single-Family Southend Oasis",
  headline: "Oceanside Southend Living",
  tagline: "A new-construction single-family home in Ocean City's desirable Southend beach neighborhood — five bedrooms, four-and-a-half baths, a built-in fireplace, and a one-car attached garage on a 30 × 100 lot just blocks from the sand.",
  description: "Crafted by Ocean City Development Group with Halliday Leonard General Contractors, 5516 Asbury Ave is a three-story new-construction residence designed for effortless coastal living. Five bedrooms, four full baths plus a powder room, an eat-in gourmet kitchen with center island, hardwood floors throughout, a built-in fireplace anchoring both the living and family rooms, multi-zoned natural-gas heat with central air, an attached one-car garage, and an enclosed outside shower define a refined Southend home — moments from the beach.",
  status: "Sold · May 2026",
  price: "Sold $2,985,032 · Listed $2,995,000",
  location: { city: "Ocean City", state: "NJ" },
  details: { bedrooms: 5, fullBaths: 4, halfBaths: 1, totalRooms: 13 },
  contact: {
    name: "Patrick Halliday",
    company: "Ocean City Development Group, LLC",
    phone: "(609) 602-3917",
    email: "PatrickAHalliday@gmail.com",
  },
  specs: [
    { icon: "fireplace", title: "Built-In Fireplace", description: "A built-in fireplace anchors both the living room and family room — a refined centerpiece for shore evenings." },
    { icon: "hardwood", title: "Hardwood Floors Throughout", description: "Continuous hardwood flooring runs through every level for a clean, elevated coastal aesthetic." },
    { icon: "hvac", title: "Multi-Zoned Gas Heat & AC", description: "Forced-air natural-gas heating with multi-zoned central air conditioning for year-round, room-by-room comfort." },
    { icon: "rooftop", title: "Eat-In Gourmet Kitchen", description: "A gourmet kitchen with center island, full appliance package, and dedicated dining room flowing to a covered porch." },
  ],
  luxuryFeatures: [
    "OCDG single-family new construction · Halliday Leonard built",
    "3-story home · 30 × 100 Southend lot",
    "Hardwood floors throughout",
    "Eat-in gourmet kitchen · center island",
    "Built-in fireplace · living & family rooms",
    "Multi-zoned forced-air gas heat & central AC",
    "Attached one-car garage · concrete driveway",
    "Decks · covered porch · sprinkler system",
    "Enclosed outside shower",
    "Den/TV room · formal dining room",
  ],
  locationFeatures: [
    "Ocean City's desirable Southend beach neighborhood",
    "West side of Asbury between 55th and 56th Street",
    "Steps from restaurants, shops, and the boardwalk",
    "Lot 15 · Block 5503 · 30 × 100",
  ],
  highlights: [
    { value: "5", label: "Bedrooms" },
    { value: "4.5", label: "Bathrooms" },
    { value: "13", label: "Total Rooms" },
    { value: "3", label: "Stories" },
    { value: "1-Car", label: "Garage" },
  ],
  floorPlans: [
    {
      id: "ground",
      name: "Ground Level",
      image: floorGround,
      description: "The arrival level — an attached one-car garage with auto door opener and concrete driveway, a finished foyer, and crawl-space construction engineered for the coastal flood zone. An enclosed outside shower welcomes you home from the sand.",
      highlights: [
        "Attached One-Car Garage · Auto Opener",
        "Concrete Driveway · Two-Car Parking",
        "Finished Foyer & Stair",
        "Enclosed Outside Shower",
      ],
    },
    {
      id: "first",
      name: "First Floor",
      image: floorFirst,
      description: "The main living level — an open living room with built-in fireplace, formal dining room, and an eat-in gourmet kitchen with center island and full appliance package. Hardwood floors throughout and a covered porch complete the level.",
      highlights: [
        "Open Living Room · Built-In Fireplace",
        "Eat-In Gourmet Kitchen · Center Island",
        "Formal Dining Room",
        "Den / TV Room",
        "Covered Porch · Deck Access",
        "Powder Room",
      ],
    },
    {
      id: "second",
      name: "Second Floor",
      image: floorSecond,
      description: "The bedroom level — a master suite with private bath, four additional bedrooms, full hall baths, and a dedicated laundry. A second built-in fireplace anchors the upper family room.",
      highlights: [
        "Master Suite with Private Bath",
        "Four Additional Bedrooms",
        "Family Room · Built-In Fireplace",
        "Dedicated Laundry · Linen Storage",
        "Custom-Tiled Bathrooms",
        "Private Deck Access",
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
  { src: ext01, alt: "5516 Asbury Ave — Front Exterior" },
  { src: ext02, alt: "5516 Asbury Ave — Side View" },
  { src: ext03, alt: "5516 Asbury Ave — Aerial Perspective" },
  { src: ext04, alt: "5516 Asbury Ave — Rear Exterior" },
  { src: ext05, alt: "5516 Asbury Ave — Covered Porch" },
  { src: ext06, alt: "5516 Asbury Ave — Driveway & Garage" },
];

const interiorImages = [
  { src: intLiving, alt: "5516 Asbury Ave — Living Room" },
  { src: intKitchen, alt: "5516 Asbury Ave — Gourmet Kitchen" },
  { src: intDining, alt: "5516 Asbury Ave — Dining Room" },
  { src: intMaster, alt: "5516 Asbury Ave — Master Suite" },
  { src: intBath, alt: "5516 Asbury Ave — Custom Tile Bath" },
  { src: intGuest, alt: "5516 Asbury Ave — Guest Bedroom" },
];

const photoExteriorImages = [
  { src: photoExt01, alt: "5516 Asbury Ave — Front Elevation with Porch & Steps" },
  { src: photoExt02, alt: "5516 Asbury Ave — Aerial View Above the Roofline" },
  { src: photoExt03, alt: "5516 Asbury Ave — Aerial Looking Toward the Ocean" },
  { src: photoExt04, alt: "5516 Asbury Ave — Drone Perspective of the Southend Block" },
  { src: photoExt05, alt: "5516 Asbury Ave — Street View of Shingle-Style Façade" },
  { src: photoExt06, alt: "5516 Asbury Ave — Covered Deck with Mahogany Ceiling" },
  { src: photoExt07, alt: "5516 Asbury Ave — Rooftop Deck with Ocean City Views" },
  { src: photoExt08, alt: "5516 Asbury Ave — Covered Porch Looking Out" },
];

const photoInteriorImages = [
  { src: photoInt01, alt: "5516 Asbury Ave — Open Great Room with Hardwood Floors" },
  { src: photoInt02, alt: "5516 Asbury Ave — Living Room Flowing to Kitchen" },
  { src: photoInt03, alt: "5516 Asbury Ave — Gourmet Kitchen with Center Island" },
  { src: photoInt04, alt: "5516 Asbury Ave — Kitchen Island & Pendant Lighting" },
  { src: photoInt05, alt: "5516 Asbury Ave — Dining Area Open to Kitchen" },
  { src: photoInt06, alt: "5516 Asbury Ave — Bedroom with Vaulted Ceiling" },
  { src: photoInt07, alt: "5516 Asbury Ave — Bedroom with Hardwood Floors" },
  { src: photoInt08, alt: "5516 Asbury Ave — Primary Bath with Custom Vanity" },
  { src: photoInt09, alt: "5516 Asbury Ave — Double Vanity with Marble Counters" },
  { src: photoInt10, alt: "5516 Asbury Ave — Spa Shower with Custom Tile" },
  { src: photoInt11, alt: "5516 Asbury Ave — Hallway & Hardwood Detail" },
  { src: photoInt12, alt: "5516 Asbury Ave — Interior Detail" },
];

const allGalleryImages = [
  ...exteriorImages,
  ...interiorImages,
  ...photoExteriorImages,
  ...photoInteriorImages,
];

const Asbury5516 = () => {
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
    toast.success("Thank you. Our team will be in touch regarding 5516 Asbury Ave shortly.");
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
              <span className="w-1.5 h-1.5 bg-white/80 rounded-full" />
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
                <span className="text-xs md:text-sm">Southend · Oceanside</span>
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
              <h2 className="heading-section text-charcoal mb-6">An Oceanside Southend Oasis</h2>
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
                  <strong className="text-charcoal">Ground Level:</strong> An attached one-car garage with auto door opener and concrete driveway, a finished foyer, and crawl-space construction engineered for the coastal flood zone. An enclosed outside shower welcomes you home from the sand.
                </p>
                <p className="text-body">
                  <strong className="text-charcoal">First Floor:</strong> An open living room with built-in fireplace flows into the formal dining room and an eat-in gourmet kitchen with center island and full appliance package — wrapped in hardwood floors with a covered porch and powder room.
                </p>
                <p className="text-body">
                  <strong className="text-charcoal">Second Floor:</strong> A master suite with custom-tiled bath, four additional bedrooms, full hall baths, a dedicated laundry, and a second built-in fireplace anchoring the upper family room.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img
                  src={ext03}
                  alt="5516 Asbury Ave — Aerial View"
                  className="w-full aspect-[4/5] object-cover" loading="lazy" decoding="async" />
                <div className="absolute -bottom-6 -left-6 w-40 h-24 border border-border bg-white flex items-center justify-center p-4">
                  <div className="text-center">
                    <p className="text-xs uppercase tracking-wider text-muted-slate mb-1">Southend</p>
                    <p className="text-sm font-serif text-charcoal">Oceanside Oasis</p>
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
            <h2 className="heading-section text-charcoal">The OCDG Standard</h2>
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
                    <img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="w-full h-full aspect-square object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
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
                    <img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="w-full h-full aspect-square object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
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
      <section id="location" className="section-padding">
        <div ref={locationRef} className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${locationVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="relative h-[400px] lg:h-[500px] bg-muted">
              <iframe
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=5516+Asbury+Ave,+Ocean+City,+NJ"
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
              <h2 className="heading-section text-charcoal mb-6">Life on Asbury Ave</h2>
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
          <Link to="/developments/current-projects/209-bark-drive" className="text-xs tracking-[0.15em] uppercase text-muted-slate hover:text-charcoal transition-colors">
            ← 209 Bark Drive
          </Link>
          <Link to="/developments" className="text-xs tracking-[0.15em] uppercase text-muted-slate hover:text-charcoal transition-colors">
            ← Back to Developments
          </Link>
          <Link to="/developments/current-projects/6-walnut-road" className="text-xs tracking-[0.15em] uppercase text-muted-slate hover:text-charcoal transition-colors">
            6 Walnut Road →
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

export default Asbury5516;
