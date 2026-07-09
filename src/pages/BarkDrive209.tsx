import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GlobalNav from "@/components/GlobalNav";
import GlobalFooter from "@/components/GlobalFooter";
import { Bed, Bath, MapPin, X, ChevronLeft, ChevronRight, Flame, Thermometer, TreePine, Sparkles, Download, CheckCircle2, ArrowRight, Phone, Mail } from "lucide-react";
import { toast } from "sonner";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import subpageHero from "@/assets/bark-209-ext-01.jpg";
import ext01 from "@/assets/bark-209-ext-01.jpg";
import ext02 from "@/assets/bark-209-ext-02.jpg";
import ext03 from "@/assets/bark-209-ext-03.jpg";
import ext04 from "@/assets/bark-209-ext-04.jpg";
import ext05 from "@/assets/bark-209-ext-05.jpg";
import ext06 from "@/assets/bark-209-ext-06.jpg";
import floorGround from "@/assets/bark-209-floor-ground.jpg";
import floorFirst from "@/assets/bark-209-floor-first.jpg";
import floorSecond from "@/assets/bark-209-floor-second.jpg";
import intLiving from "@/assets/bark-209-int-living.jpg";
import intKitchen from "@/assets/bark-209-int-kitchen.jpg";
import intDining from "@/assets/bark-209-int-dining.jpg";
import intMaster from "@/assets/bark-209-int-master.jpg";
import intBath from "@/assets/bark-209-int-bath.jpg";
import intGuest from "@/assets/bark-209-int-guest.jpg";

// ─── Real "as built" photography ───
import photoExt01 from "@/assets/bark-209-photo-ext-01.jpg";
import photoExt02 from "@/assets/bark-209-photo-ext-02.jpg";
import photoExt03 from "@/assets/bark-209-photo-ext-03.jpg";
import photoExt04 from "@/assets/bark-209-photo-ext-04.jpg";
import photoExt05 from "@/assets/bark-209-photo-ext-05.jpg";
import photoExt06 from "@/assets/bark-209-photo-ext-06.jpg";
import photoExt07 from "@/assets/bark-209-photo-ext-07.jpg";
import photoExt08 from "@/assets/bark-209-photo-ext-08.jpg";
import photoExt09 from "@/assets/bark-209-photo-ext-09.jpg";
import photoInt01 from "@/assets/bark-209-photo-int-01.jpg";
import photoInt02 from "@/assets/bark-209-photo-int-02.jpg";
import photoInt03 from "@/assets/bark-209-photo-int-03.jpg";
import photoInt04 from "@/assets/bark-209-photo-int-04.jpg";
import photoInt05 from "@/assets/bark-209-photo-int-05.jpg";
import photoInt06 from "@/assets/bark-209-photo-int-06.jpg";
import photoInt07 from "@/assets/bark-209-photo-int-07.jpg";
import photoInt08 from "@/assets/bark-209-photo-int-08.jpg";
import photoInt09 from "@/assets/bark-209-photo-int-09.jpg";
import photoInt10 from "@/assets/bark-209-photo-int-10.jpg";
import photoInt11 from "@/assets/bark-209-photo-int-11.jpg";
import photoInt12 from "@/assets/bark-209-photo-int-12.jpg";
import photoInt13 from "@/assets/bark-209-photo-int-13.jpg";
import photoInt14 from "@/assets/bark-209-photo-int-14.jpg";
import photoInt15 from "@/assets/bark-209-photo-int-15.jpg";
import photoInt16 from "@/assets/bark-209-photo-int-16.jpg";
import photoInt17 from "@/assets/bark-209-photo-int-17.jpg";
import photoInt18 from "@/assets/bark-209-photo-int-18.jpg";
import photoInt19 from "@/assets/bark-209-photo-int-19.jpg";
import photoInt20 from "@/assets/bark-209-photo-int-20.jpg";
import photoInt21 from "@/assets/bark-209-photo-int-21.jpg";
import photoInt22 from "@/assets/bark-209-photo-int-22.jpg";
import photoInt23 from "@/assets/bark-209-photo-int-23.jpg";
import photoInt24 from "@/assets/bark-209-photo-int-24.jpg";
import photoInt25 from "@/assets/bark-209-photo-int-25.jpg";
import photoInt26 from "@/assets/bark-209-photo-int-26.jpg";
import photoInt27 from "@/assets/bark-209-photo-int-27.jpg";
import photoInt28 from "@/assets/bark-209-photo-int-28.jpg";
import photoInt29 from "@/assets/bark-209-photo-int-29.jpg";
import photoInt30 from "@/assets/bark-209-photo-int-30.jpg";
import photoInt31 from "@/assets/bark-209-photo-int-31.jpg";
import photoInt32 from "@/assets/bark-209-photo-int-32.jpg";

const propertyData = {
  name: "209 Bark Drive",
  unit: "Single-Family Southend Home",
  headline: "Southend Coastal Living",
  tagline: "A new-construction single-family home in Ocean City's charming Southend — five bedrooms, three baths, a private elevator, and an enclosed two-car garage, all within walking distance of the beach, playground, restaurants, and shops.",
  description: "Crafted by Ocean City Development Group with Halliday Leonard General Contractors and designed by Halliday Architects, 209 Bark Drive is a two-story new-construction residence on a quiet Southend street. Five bedrooms, three full baths, a gourmet kitchen with GE Monogram appliances, hardwood floors throughout, custom-tiled bathrooms, an enclosed two-car garage, large decks, and a private elevator define an effortlessly elevated coastal home — moments from the sand.",
  status: "Sold · April 2026",
  listedPrice: "$1,995,000",
  soldPrice: "$1,995,000",
  closedDate: "April 20, 2026",
  price: "$1,995,000",
  contact: {
    name: "Ocean City Development Group",
    company: "Sales Inquiries",
    phone: "(609) 365-9050",
    email: "info@oceancitydevelopmentgroup.com",
  },
  location: { city: "Ocean City", state: "NJ" },
  details: { bedrooms: 5, fullBaths: 3, halfBaths: 0, totalRooms: 12 },
  specs: [
    { icon: "fireplace", title: "Built-In Gas Log Fireplace", description: "A built-in gas log fireplace anchors the family room — a warm centerpiece for cool shore evenings." },
    { icon: "hardwood", title: "Hardwood Floors Throughout", description: "Continuous hardwood flooring runs through both levels for a clean, refined coastal aesthetic." },
    { icon: "hvac", title: "Natural Gas Heat & Central AC", description: "Natural-gas heating paired with central air conditioning and ceiling fans for year-round comfort." },
    { icon: "rooftop", title: "Private Residential Elevator", description: "An accredited residential elevator serves every level — effortless living from garage to bedrooms." },
  ],
  luxuryFeatures: [
    "OCDG single-family new construction · Halliday Leonard built",
    "Halliday Architects design · 2 stories",
    "Private residential elevator",
    "Hardwood floors throughout",
    "Gourmet kitchen · center island · GE Monogram appliances",
    "Custom-tiled bathrooms",
    "Built-in gas log fireplace · family room",
    "Enclosed two-car garage · concrete driveway",
    "Large decks · covered porch · sprinkler system",
    "Enclosed outside shower · sidewalks · curbs",
  ],
  locationFeatures: [
    "Ocean City's charming Southend neighborhood",
    "Walking distance to the beach",
    "Steps from the playground, restaurants, and shops",
    "54 × 94 lot · Block 5408 · Lot 8",
  ],
  highlights: [
    { value: "5", label: "Bedrooms" },
    { value: "3", label: "Bathrooms" },
    { value: "12", label: "Total Rooms" },
    { value: "Elev.", label: "Private" },
    { value: "2-Car", label: "Garage" },
  ],
  floorPlans: [
    {
      id: "ground",
      name: "Ground Level",
      image: floorGround,
      description: "The arrival level — a generous enclosed two-car garage (~987 sf) with concrete driveway, a finished foyer (~181 sf) with the elevator landing, and crawl-space construction with engineered flood vents per the coastal flood zone.",
      highlights: [
        "Enclosed Two-Car Garage · Concrete Driveway",
        "Foyer & Stair · Elevator Landing",
        "Engineered Flood Vents · Crawl-Space Construction",
        "Enclosed Outside Shower",
      ],
    },
    {
      id: "first",
      name: "First Floor",
      image: floorFirst,
      description: "The main living level — an open family room with a built-in gas log fireplace, a formal dining room, and an eat-in gourmet kitchen with center island and GE Monogram appliances. Hardwood floors throughout and a covered front porch complete the level.",
      highlights: [
        "Open Family Room · Built-In Gas Fireplace",
        "Gourmet Eat-In Kitchen · Center Island",
        "GE Monogram Appliance Package",
        "Formal Dining Room",
        "Covered Front Porch · Rear Deck",
        "Elevator Landing",
      ],
    },
    {
      id: "second",
      name: "Second Floor",
      image: floorSecond,
      description: "The bedroom level — a master suite with private bath, four additional bedrooms, two full hall baths, and a dedicated laundry. Storage closets and an attic-mounted HVAC unit on a waterproof pan complete the level.",
      highlights: [
        "Master Suite with Private Bath",
        "Four Additional Bedrooms",
        "Two Full Hall Baths",
        "Dedicated Laundry · Linen Storage",
        "Private Deck Access",
        "Elevator Landing",
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
  { src: ext01, alt: "209 Bark Drive — Front Exterior" },
  { src: ext02, alt: "209 Bark Drive — Side View" },
  { src: ext03, alt: "209 Bark Drive — Aerial Perspective" },
  { src: ext04, alt: "209 Bark Drive — Rear Exterior" },
  { src: ext05, alt: "209 Bark Drive — Covered Porch" },
  { src: ext06, alt: "209 Bark Drive — Driveway & Garage" },
];

const interiorImages = [
  { src: intLiving, alt: "209 Bark Drive — Family Room" },
  { src: intKitchen, alt: "209 Bark Drive — Gourmet Kitchen" },
  { src: intDining, alt: "209 Bark Drive — Dining Room" },
  { src: intMaster, alt: "209 Bark Drive — Master Suite" },
  { src: intBath, alt: "209 Bark Drive — Custom Tile Bath" },
  { src: intGuest, alt: "209 Bark Drive — Guest Bedroom" },
];

const photoExteriorImages = [
  { src: photoExt01, alt: "209 Bark Drive — Exterior Photo 1" },
  { src: photoExt02, alt: "209 Bark Drive — Exterior Photo 2" },
  { src: photoExt03, alt: "209 Bark Drive — Exterior Photo 3" },
  { src: photoExt04, alt: "209 Bark Drive — Exterior Photo 4" },
  { src: photoExt05, alt: "209 Bark Drive — Exterior Photo 5" },
  { src: photoExt06, alt: "209 Bark Drive — Exterior Photo 6" },
  { src: photoExt07, alt: "209 Bark Drive — Exterior Photo 7" },
  { src: photoExt08, alt: "209 Bark Drive — Exterior Photo 8" },
  { src: photoExt09, alt: "209 Bark Drive — Exterior Photo 9" },
];

const photoInteriorImages = [
  { src: photoInt01, alt: "209 Bark Drive — Interior Photo 1" },
  { src: photoInt02, alt: "209 Bark Drive — Interior Photo 2" },
  { src: photoInt03, alt: "209 Bark Drive — Interior Photo 3" },
  { src: photoInt04, alt: "209 Bark Drive — Interior Photo 4" },
  { src: photoInt05, alt: "209 Bark Drive — Interior Photo 5" },
  { src: photoInt06, alt: "209 Bark Drive — Interior Photo 6" },
  { src: photoInt07, alt: "209 Bark Drive — Interior Photo 7" },
  { src: photoInt08, alt: "209 Bark Drive — Interior Photo 8" },
  { src: photoInt09, alt: "209 Bark Drive — Interior Photo 9" },
  { src: photoInt10, alt: "209 Bark Drive — Interior Photo 10" },
  { src: photoInt11, alt: "209 Bark Drive — Interior Photo 11" },
  { src: photoInt12, alt: "209 Bark Drive — Interior Photo 12" },
  { src: photoInt13, alt: "209 Bark Drive — Interior Photo 13" },
  { src: photoInt14, alt: "209 Bark Drive — Interior Photo 14" },
  { src: photoInt15, alt: "209 Bark Drive — Interior Photo 15" },
  { src: photoInt16, alt: "209 Bark Drive — Interior Photo 16" },
  { src: photoInt17, alt: "209 Bark Drive — Interior Photo 17" },
  { src: photoInt18, alt: "209 Bark Drive — Interior Photo 18" },
  { src: photoInt19, alt: "209 Bark Drive — Interior Photo 19" },
  { src: photoInt20, alt: "209 Bark Drive — Interior Photo 20" },
  { src: photoInt21, alt: "209 Bark Drive — Interior Photo 21" },
  { src: photoInt22, alt: "209 Bark Drive — Interior Photo 22" },
  { src: photoInt23, alt: "209 Bark Drive — Interior Photo 23" },
  { src: photoInt24, alt: "209 Bark Drive — Interior Photo 24" },
  { src: photoInt25, alt: "209 Bark Drive — Interior Photo 25" },
  { src: photoInt26, alt: "209 Bark Drive — Interior Photo 26" },
  { src: photoInt27, alt: "209 Bark Drive — Interior Photo 27" },
  { src: photoInt28, alt: "209 Bark Drive — Interior Photo 28" },
  { src: photoInt29, alt: "209 Bark Drive — Interior Photo 29" },
  { src: photoInt30, alt: "209 Bark Drive — Interior Photo 30" },
  { src: photoInt31, alt: "209 Bark Drive — Interior Photo 31" },
  { src: photoInt32, alt: "209 Bark Drive — Interior Photo 32" },
];

const allGalleryImages = [...exteriorImages, ...interiorImages, ...photoExteriorImages, ...photoInteriorImages];

const BarkDrive209 = () => {
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
    toast.success("Thank you. Our team will be in touch regarding 209 Bark Drive shortly.");
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
                <span className="text-xs md:text-sm">{propertyData.details.fullBaths} Bathrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                <span className="text-xs md:text-sm">Southend · Walk to Beach</span>
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
              <h2 className="heading-section text-charcoal mb-6">A Southend Family Retreat</h2>
              <div className="divider mb-8" />
              <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-sand border border-border-subtle">
                <div className="text-center">
                  <p className="text-2xl font-serif text-charcoal">{propertyData.details.bedrooms}</p>
                  <p className="text-xs uppercase tracking-wider text-muted-slate">Bedrooms</p>
                </div>
                <div className="text-center border-x border-border-subtle">
                  <p className="text-2xl font-serif text-charcoal">{propertyData.details.fullBaths}</p>
                  <p className="text-xs uppercase tracking-wider text-muted-slate">Bathrooms</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-serif text-charcoal">{propertyData.details.totalRooms}</p>
                  <p className="text-xs uppercase tracking-wider text-muted-slate">Total Rooms</p>
                </div>
              </div>
              <div className="space-y-6">
                <p className="text-body">
                  <strong className="text-charcoal">Ground Level:</strong> An enclosed two-car garage with concrete driveway, finished foyer with the elevator landing, and crawl-space construction engineered with flood vents for the coastal flood zone. An enclosed outside shower welcomes you home from the sand.
                </p>
                <p className="text-body">
                  <strong className="text-charcoal">First Floor:</strong> An open family room with a built-in gas log fireplace flows into the formal dining room and an eat-in gourmet kitchen with center island and full GE Monogram appliance package — wrapped in hardwood floors with a covered front porch and rear deck.
                </p>
                <p className="text-body">
                  <strong className="text-charcoal">Second Floor:</strong> A master suite with custom-tiled bath, four additional bedrooms, two full hall baths, and a dedicated laundry — every level served by a private residential elevator.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img
                  src={ext03}
                  alt="209 Bark Drive — Aerial View"
                  className="w-full aspect-[4/5] object-cover" loading="lazy" decoding="async" />
                <div className="absolute -bottom-6 -left-6 w-40 h-24 border border-border bg-white flex items-center justify-center p-4">
                  <div className="text-center">
                    <p className="text-xs uppercase tracking-wider text-muted-slate mb-1">Southend</p>
                    <p className="text-sm font-serif text-charcoal">Walk to Sand</p>
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
            <p className="label-uppercase mb-4">Photography</p>
            <h2 className="heading-section text-charcoal">Captured On-Site</h2>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {photoExteriorImages.map((image, index) => (
                <div
                  key={index}
                  className={`cursor-pointer overflow-hidden group ${index === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""}`}
                  onClick={() => openLightbox(exteriorImages.length + interiorImages.length + index)}
                  style={{ borderRadius: "4px" }}
                >
                  <div className="relative h-full">
                    <img src={image.src} alt={image.alt} loading="lazy" className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${index === 0 ? "aspect-[4/3]" : "aspect-square"}`} />
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
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=209+Bark+Dr,+Ocean+City,+NJ"
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
              <h2 className="heading-section text-charcoal mb-6">Life on Bark Drive</h2>
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

      {/* ─── Sold Story ─── */}
      <section id="sold" className="section-padding">
        <div ref={registerRef} className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-5xl">
          <div className={`transition-all duration-1000 ${registerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="text-center mb-12">
              <p className="label-uppercase mb-4">Sale Result</p>
              <h2 className="heading-section text-charcoal mb-4">Sold at Full Ask</h2>
              <p className="text-body max-w-2xl mx-auto">
                A custom OCDG residence delivered to its end buyer through a direct Bark Drive sale.
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
                Our active portfolio includes new-construction homes throughout Ocean City — many with the same architects, finishes, and standards behind 209 Bark Drive.
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
        </div>
      </section>

      {/* ─── Project Navigation ─── */}
      <nav className="border-t border-border py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl flex items-center justify-between">
          <Link to="/developments/sold/2700-asbury-ave" className="text-xs tracking-[0.15em] uppercase text-muted-slate hover:text-charcoal transition-colors">
            ← 2700 Asbury Ave
          </Link>
          <Link to="/developments" className="text-xs tracking-[0.15em] uppercase text-muted-slate hover:text-charcoal transition-colors">
            ← Back to Developments
          </Link>
          <Link to="/developments/sold/38-arkansas-ave" className="text-xs tracking-[0.15em] uppercase text-muted-slate hover:text-charcoal transition-colors">
            38 Arkansas Ave →
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

export default BarkDrive209;