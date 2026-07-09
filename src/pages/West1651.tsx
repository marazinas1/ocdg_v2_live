import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GlobalNav from "@/components/GlobalNav";
import GlobalFooter from "@/components/GlobalFooter";
import { Bed, Bath, MapPin, X, ChevronLeft, ChevronRight, Flame, Thermometer, TreePine, Sparkles, Download, CheckCircle2, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import ext01 from "@/assets/west-1651-ext-01.jpg";
import ext02 from "@/assets/west-1651-ext-02.jpg";
import ext03 from "@/assets/west-1651-ext-03.jpg";
import floor1 from "@/assets/west-1651-floor-1.jpg";
import floor2 from "@/assets/west-1651-floor-2.jpg";
import floor3 from "@/assets/west-1651-floor-3.jpg";

const propertyData = {
  name: "1651 West Ave",
  unit: "Custom New-Construction Residence",
  headline: "Refined Coastal Living on West Ave",
  tagline: "A custom new-construction residence by Ocean City Development Group with Halliday Architects — five bedrooms, three full and one half bath, gourmet kitchen, and elevated living spaces designed for the modern shore family.",
  status: "Sold · 2026",
  listedPrice: "$1,795,000",
  soldPrice: "$1,764,250",
  closedDate: "2026",
  price: "$1,764,250",
  location: { city: "Ocean City", state: "NJ" },
  details: { bedrooms: 5, fullBaths: 3, halfBaths: 1, totalRooms: 11 },
  highlights: [
    { value: "5", label: "Bedrooms" },
    { value: "3.1", label: "Bathrooms" },
    { value: "3", label: "Levels" },
    { value: "Elev.", label: "Private" },
    { value: "MLS", label: "#594775" },
  ],
  specs: [
    { icon: "fireplace", title: "Built-In Gas Fireplace", description: "An elegant gas fireplace anchors the open family room — warmth and ambience for shore evenings." },
    { icon: "hardwood", title: "Hardwood Floors Throughout", description: "Light oak hardwood flowing through every level of the residence for a refined coastal aesthetic." },
    { icon: "hvac", title: "Multi-Zone Heat & Central AC", description: "Natural gas heating paired with central air conditioning for true year-round comfort." },
    { icon: "rooftop", title: "Private Residential Elevator", description: "An accredited residential elevator serves every level — effortless living from ground to bedrooms." },
  ],
  luxuryFeatures: [
    "OCDG custom new construction",
    "Halliday Architects design · 3 levels",
    "Private residential elevator",
    "Light oak hardwood floors throughout",
    "Gourmet kitchen · island · premium appliance package",
    "Custom-tiled bathrooms · designer fixtures",
    "Built-in gas fireplace · open family room",
    "Multiple decks · covered porch",
    "Off-street parking · enclosed outside shower",
    "NuCedar siding · architectural roofline",
  ],
  locationFeatures: [
    "Coveted West Ave corridor in central Ocean City",
    "Walking distance to the beach and boardwalk",
    "Steps from restaurants, shops, and parks",
    "Easy access to bayfront marinas",
  ],
  floorPlans: [
    {
      id: "first",
      name: "First Floor",
      image: floor1,
      description: "The arrival level — a welcoming foyer with the elevator landing, a full guest suite with private bath, two-car off-street parking access, and a generous outside shower for return trips from the sand.",
      highlights: [
        "Foyer · Elevator Landing",
        "Guest Bedroom Suite · Full Bath",
        "Mudroom · Storage",
        "Enclosed Outside Shower",
      ],
    },
    {
      id: "second",
      name: "Second Floor",
      image: floor2,
      description: "The main living level — an open family room with built-in gas fireplace, an eat-in gourmet kitchen with island, a formal dining area, and a powder room. Hardwood floors throughout and a generous deck for shore-side entertaining.",
      highlights: [
        "Open Family Room · Gas Fireplace",
        "Gourmet Kitchen · Island · Premium Appliances",
        "Dining Area · Powder Room",
        "Deck · Outdoor Living",
        "Elevator Landing",
      ],
    },
    {
      id: "third",
      name: "Third Floor",
      image: floor3,
      description: "The bedroom level — a master suite with private bath and walk-in closet, three additional bedrooms, two full hall baths, and a dedicated laundry. Every level served by the private residential elevator.",
      highlights: [
        "Master Suite · Private Bath · Walk-In Closet",
        "Three Additional Bedrooms",
        "Two Full Hall Baths",
        "Dedicated Laundry",
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
  { src: ext01, alt: "1651 West Ave — Front Exterior" },
  { src: ext02, alt: "1651 West Ave — Side Perspective" },
  { src: ext03, alt: "1651 West Ave — Architectural View" },
];

const West1651 = () => {
  const [activeFloor, setActiveFloor] = useState(propertyData.floorPlans[0].id);
  const currentFloor = propertyData.floorPlans.find((f) => f.id === activeFloor);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const { ref: highlightsRef, isVisible: highlightsVisible } = useScrollReveal(0.3);
  const { ref: visionRef, isVisible: visionVisible } = useScrollReveal();
  const { ref: specsRef, isVisible: specsVisible } = useScrollReveal();
  const { ref: floorRef, isVisible: floorVisible } = useScrollReveal();
  const { ref: galleryRef, isVisible: galleryVisible } = useScrollReveal();
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
  const nextImage = () => setCurrentIndex((p) => (p + 1) % exteriorImages.length);
  const prevImage = () => setCurrentIndex((p) => (p - 1 + exteriorImages.length) % exteriorImages.length);

  const scrollToVision = () => document.getElementById("vision")?.scrollIntoView({ behavior: "smooth" });

  const [stickyVisible, setStickyVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const heroBottom = window.innerHeight;
      const registerEl = document.getElementById("sold");
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
                backgroundImage: `url(${ext01})`,
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
            <Link to="/developments/sold" className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-[10px] font-medium tracking-[0.2em] uppercase text-white/90 border border-white/30 backdrop-blur-sm bg-white/5 transition-all duration-300 hover:bg-white/15 hover:border-white/50" style={{ borderRadius: "4px" }}>
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
              Sold {propertyData.price}
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
                <span className="text-xs md:text-sm">West Ave · Walk to Beach</span>
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
              View the Residence
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-10">
          <div className="w-px h-12 md:h-16 bg-white/30 relative">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-pulse" />
          </div>
        </div>
      </section>

      {/* ─── Highlights ─── */}
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
              <h2 className="heading-section text-charcoal mb-6">A West Ave Family Residence</h2>
              <div className="divider mb-8" />
              <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-sand border border-border-subtle">
                <div className="text-center">
                  <p className="text-2xl font-serif text-charcoal">{propertyData.details.bedrooms}</p>
                  <p className="text-xs uppercase tracking-wider text-muted-slate">Bedrooms</p>
                </div>
                <div className="text-center border-x border-border-subtle">
                  <p className="text-2xl font-serif text-charcoal">3.1</p>
                  <p className="text-xs uppercase tracking-wider text-muted-slate">Bathrooms</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-serif text-charcoal">3</p>
                  <p className="text-xs uppercase tracking-wider text-muted-slate">Levels</p>
                </div>
              </div>
              <div className="space-y-6">
                <p className="text-body">
                  <strong className="text-charcoal">First Floor:</strong> A welcoming foyer with elevator landing, full guest suite, mudroom, and an enclosed outside shower for the return from the beach.
                </p>
                <p className="text-body">
                  <strong className="text-charcoal">Second Floor:</strong> The main living level — an open family room anchored by a built-in gas fireplace flowing into the dining area and gourmet kitchen with island and premium appliances, all wrapped in light oak hardwood with deck access.
                </p>
                <p className="text-body">
                  <strong className="text-charcoal">Third Floor:</strong> A master suite with private bath and walk-in closet, three additional bedrooms, two full hall baths, and dedicated laundry — every level served by a private residential elevator.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img src={ext02} alt="1651 West Ave — Architectural View" className="w-full aspect-[4/5] object-cover" loading="lazy" decoding="async" />
                <div className="absolute -bottom-6 -left-6 w-40 h-24 border border-border bg-white flex items-center justify-center p-4">
                  <div className="text-center">
                    <p className="text-xs uppercase tracking-wider text-muted-slate mb-1">West Ave</p>
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
                <img key={activeFloor} src={currentFloor?.image} alt={currentFloor?.name} className="w-full h-auto animate-fade-in" loading="lazy" decoding="async" />
              </div>
            </div>
            <div className="bg-background-sand p-6 md:p-8 order-2 lg:order-1" style={{ borderRadius: "4px" }}>
              <h3 className="heading-card mb-4 text-charcoal">{currentFloor?.name}</h3>
              <p className="text-body text-sm md:text-base leading-relaxed mb-6">{currentFloor?.description}</p>
              <div className="divider mb-6" />
              <p className="label-uppercase mb-4">Key Features</p>
              <ul className="space-y-3 mb-2">
                {currentFloor?.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center gap-3 text-body text-sm md:text-base">
                    <span className="w-1.5 h-1.5 bg-charcoal rounded-full flex-shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Gallery ─── */}
      <section id="gallery" className="section-padding section-sand">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          <div ref={galleryRef} className={`text-center max-w-2xl mx-auto mb-8 md:mb-12 transition-all duration-1000 ${galleryVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="label-uppercase mb-4">Photography</p>
            <h2 className="heading-section text-charcoal">Architectural Renderings</h2>
            <p className="text-body mt-4">A selection of architectural renderings of the completed residence.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {exteriorImages.map((image, index) => (
              <div
                key={index}
                className={`cursor-pointer overflow-hidden group ${index === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""}`}
                onClick={() => openLightbox(index)}
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
            <img src={exteriorImages[currentIndex].src} alt={exteriorImages[currentIndex].alt} className="max-w-[90vw] max-h-[85vh] object-contain" loading="lazy" decoding="async" onClick={(e) => e.stopPropagation()} />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {currentIndex + 1} / {exteriorImages.length}
            </div>
          </div>
        )}
      </section>

      {/* ─── Location ─── */}
      <section id="location" className="section-padding">
        <div ref={locationRef} className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${locationVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="relative h-[400px] lg:h-[500px] bg-muted">
              <iframe
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=1651+West+Ave,+Ocean+City,+NJ"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale contrast-125"
                title="1651 West Ave Location"
              />
            </div>
            <div>
              <p className="label-uppercase mb-4">The Location</p>
              <h2 className="heading-section text-charcoal mb-6">Life on West Ave</h2>
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
      <section id="sold" className="section-padding section-sand">
        <div ref={registerRef} className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-5xl">
          <div className={`transition-all duration-1000 ${registerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="text-center mb-12">
              <p className="label-uppercase mb-4">Sale Result</p>
              <h2 className="heading-section text-charcoal mb-4">Delivered to its End Buyer</h2>
              <p className="text-body max-w-2xl mx-auto">
                A custom OCDG residence on Ocean City's coveted West Ave corridor — sold and successfully delivered in 2026.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border-subtle border border-border-subtle mb-12">
              <div className="bg-white p-8 text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-slate mb-3">Sold Price</p>
                <p className="text-3xl font-serif text-charcoal">{propertyData.soldPrice}</p>
              </div>
              <div className="bg-white p-8 text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-slate mb-3">Closed</p>
                <p className="text-3xl font-serif text-charcoal">{propertyData.closedDate}</p>
              </div>
              <div className="bg-white p-8 text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-slate mb-3">MLS</p>
                <p className="text-3xl font-serif text-charcoal">#594775</p>
              </div>
            </div>

            <div className="bg-white border border-border-subtle p-8 md:p-12 text-center" style={{ borderRadius: "4px" }}>
              <CheckCircle2 className="w-10 h-10 text-charcoal mx-auto mb-4" strokeWidth={1.25} />
              <h3 className="heading-card text-charcoal mb-3">Looking for a residence like this?</h3>
              <p className="text-body max-w-xl mx-auto mb-8">
                Our active portfolio includes new-construction homes throughout Ocean City — many with the same architects, finishes, and standards behind 1651 West Ave.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/developments/active-listings"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-medium tracking-wider uppercase bg-charcoal text-white transition-all duration-300 hover:bg-charcoal/90"
                  style={{ borderRadius: "4px" }}
                >
                  View Active Listings
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
          <Link to="/developments/sold/38-arkansas-ave" className="text-xs tracking-[0.15em] uppercase text-muted-slate hover:text-charcoal transition-colors">
            ← 38 Arkansas Ave
          </Link>
          <Link to="/developments" className="text-xs tracking-[0.15em] uppercase text-muted-slate hover:text-charcoal transition-colors">
            ← Back to Developments
          </Link>
          <Link to="/developments/sold/1901-glenwood-drive" className="text-xs tracking-[0.15em] uppercase text-muted-slate hover:text-charcoal transition-colors">
            1901 Glenwood Drive →
          </Link>
        </div>
      </nav>

      <GlobalFooter />

      {stickyVisible && (
        <button
          onClick={() => document.getElementById("sold")?.scrollIntoView({ behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 px-6 py-3 bg-charcoal text-white text-xs tracking-[0.15em] uppercase shadow-lg hover:bg-charcoal/90 transition-all duration-300"
          style={{ borderRadius: "4px" }}
        >
          Inquire
        </button>
      )}
    </main>
  );
};

export default West1651;