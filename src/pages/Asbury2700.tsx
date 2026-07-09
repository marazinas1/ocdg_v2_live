import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GlobalNav from "@/components/GlobalNav";
import GlobalFooter from "@/components/GlobalFooter";
import { Bed, Bath, MapPin, X, ChevronLeft, ChevronRight, Flame, Thermometer, TreePine, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import subpageHero from "@/assets/asbury-2700-ext-01.jpg";
import ext01 from "@/assets/asbury-2700-ext-01.jpg";
import ext02 from "@/assets/asbury-2700-ext-02.jpg";
import ext03 from "@/assets/asbury-2700-ext-03.jpg";
import ext04 from "@/assets/asbury-2700-ext-04.jpg";
import ext05 from "@/assets/asbury-2700-ext-05.jpg";
import ext06 from "@/assets/asbury-2700-ext-06.jpg";
import ext07 from "@/assets/asbury-2700-ext-07.jpg";
import ext08 from "@/assets/asbury-2700-ext-08.jpg";
import int01 from "@/assets/asbury-2700-int-01.jpg";
import int02 from "@/assets/asbury-2700-int-02.jpg";
import int03 from "@/assets/asbury-2700-int-03.jpg";
import int04 from "@/assets/asbury-2700-int-04.jpg";
import int05 from "@/assets/asbury-2700-int-05.jpg";
import int06 from "@/assets/asbury-2700-int-06.jpg";
import int07 from "@/assets/asbury-2700-int-07.jpg";
import int08 from "@/assets/asbury-2700-int-08.jpg";
import int09 from "@/assets/asbury-2700-int-09.jpg";
import int10 from "@/assets/asbury-2700-int-10.jpg";
import int11 from "@/assets/asbury-2700-int-11.jpg";
import int12 from "@/assets/asbury-2700-int-12.jpg";
import int13 from "@/assets/asbury-2700-int-13.jpg";
import int14 from "@/assets/asbury-2700-int-14.jpg";
import int15 from "@/assets/asbury-2700-int-15.jpg";
import int16 from "@/assets/asbury-2700-int-16.jpg";
import int17 from "@/assets/asbury-2700-int-17.jpg";
import int18 from "@/assets/asbury-2700-int-18.jpg";
import ext09 from "@/assets/asbury-2700-ext-09.jpg";
import int19 from "@/assets/asbury-2700-int-19.jpg";
import int20 from "@/assets/asbury-2700-int-20.jpg";

const propertyData = {
  name: "2700 Asbury Ave",
  unit: "Custom Single-Family Duplex",
  headline: "A Defining Asbury Avenue Residence",
  tagline:
    "A custom-built duplex on a prominent Asbury Avenue corner — six bedrooms, five-and-a-half baths, private elevator, gas fireplace, and a gourmet kitchen with the finest finishes throughout.",
  status: "Sold · January 2024",
  listedPrice: "$3,295,000",
  soldPrice: "$3,264,500",
  closedDate: "January 31, 2024",
  location: { city: "Ocean City", state: "NJ" },
  details: { bedrooms: 6, fullBaths: 5, halfBaths: 1, totalRooms: 16 },
  specs: [
    { icon: "fireplace", title: "Built-In Gas Fireplace", description: "A built-in gas log fireplace anchors the living room — a refined focal point for evenings at the shore." },
    { icon: "hardwood", title: "Wide-Plank Hardwood", description: "Wide-plank hardwood floors throughout, paired with custom tile in the spa-like bathrooms." },
    { icon: "hvac", title: "Multi-Zoned Gas Heat & AC", description: "Forced-air natural-gas heating with multi-zoned central air conditioning for room-by-room comfort." },
    { icon: "rooftop", title: "Gourmet Kitchen", description: "A gourmet kitchen with center island, upgraded cabinetry, and a full stainless appliance package." },
  ],
  luxuryFeatures: [
    "Custom new-construction duplex by OCDG",
    "3-story home · 40 × 100 corner lot",
    "Wide-plank hardwood floors throughout",
    "Gourmet kitchen · center island · upgraded cabinetry",
    "Custom-tiled spa-like bathrooms · walk-in closets",
    "Private elevator · all levels",
    "Built-in gas log fireplace · living room",
    "Multi-zoned forced-air gas heat & central AC",
    "Den / TV room · formal dining room",
    "Detached one-car garage · parking pad",
    "Concrete siding & driveway",
    "Upgraded trimwork throughout",
  ],
  locationFeatures: [
    "Prominent Asbury Avenue corner at 27th Street",
    "Steps from boutique shopping and dining",
    "Short walk to the beach and boardwalk",
    "Lot 12 · Block 2703 · 40 × 100",
  ],
  highlights: [
    { value: "6", label: "Bedrooms" },
    { value: "5.5", label: "Bathrooms" },
    { value: "16", label: "Total Rooms" },
    { value: "Corner", label: "Lot · 40×100" },
    { value: "Sold", label: "$3.26M" },
  ],
};

const iconMap: Record<string, React.ComponentType<any>> = {
  fireplace: Flame,
  hardwood: TreePine,
  hvac: Thermometer,
  rooftop: Sparkles,
};

const exteriorImages = [
  { src: ext01, alt: "2700 Asbury Ave — Front Exterior" },
  { src: ext02, alt: "2700 Asbury Ave — Corner View" },
  { src: ext03, alt: "2700 Asbury Ave — Side Elevation" },
  { src: ext04, alt: "2700 Asbury Ave — Front Porch" },
  { src: ext05, alt: "2700 Asbury Ave — Rear View" },
  { src: ext06, alt: "2700 Asbury Ave — Detached Garage" },
  { src: ext07, alt: "2700 Asbury Ave — Architectural Detail" },
  { src: ext08, alt: "2700 Asbury Ave — Street Perspective" },
  { src: ext09, alt: "2700 Asbury Ave — Rear Deck with Cable Railing" },
];

const interiorImages = [
  { src: int01, alt: "2700 Asbury Ave — Open Great Room with Coffered Ceiling" },
  { src: int02, alt: "2700 Asbury Ave — Living Room with Gas Fireplace" },
  { src: int03, alt: "2700 Asbury Ave — Gourmet Kitchen Island" },
  { src: int04, alt: "2700 Asbury Ave — Chef's Kitchen Detail" },
  { src: int05, alt: "2700 Asbury Ave — Wet Bar & Sitting Area" },
  { src: int06, alt: "2700 Asbury Ave — Bedroom with Wide-Plank Hardwood" },
  { src: int07, alt: "2700 Asbury Ave — Spa-Like Tiled Bathroom" },
  { src: int08, alt: "2700 Asbury Ave — Guest Bath with Walk-In Shower" },
  { src: int09, alt: "2700 Asbury Ave — Outdoor Kitchen & Grill Deck" },
  { src: int10, alt: "2700 Asbury Ave — Front Porch Entry" },
  { src: int11, alt: "2700 Asbury Ave — Bedroom with Private Balcony" },
  { src: int12, alt: "2700 Asbury Ave — Upper Level Sitting Room" },
  { src: int13, alt: "2700 Asbury Ave — Double Vanity Bath" },
  { src: int14, alt: "2700 Asbury Ave — Marble Walk-In Shower" },
  { src: int15, alt: "2700 Asbury Ave — Built-In Vanity Nook" },
  { src: int16, alt: "2700 Asbury Ave — Custom Walk-In Closet" },
  { src: int17, alt: "2700 Asbury Ave — Laundry Room with Custom Cabinetry" },
  { src: int18, alt: "2700 Asbury Ave — Mudroom & Utility Sink" },
  { src: int19, alt: "2700 Asbury Ave — Butler's Pantry with Wolf Wall Ovens" },
  { src: int20, alt: "2700 Asbury Ave — Custom Walk-In Master Closet" },
];

const allGalleryImages = [...exteriorImages, ...interiorImages];

const Asbury2700 = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const { ref: highlightsRef, isVisible: highlightsVisible } = useScrollReveal(0.3);
  const { ref: visionRef, isVisible: visionVisible } = useScrollReveal();
  const { ref: specsRef, isVisible: specsVisible } = useScrollReveal();
  const { ref: galleryRef, isVisible: galleryVisible } = useScrollReveal();
  const { ref: locationRef, isVisible: locationVisible } = useScrollReveal();
  const { ref: soldRef, isVisible: soldVisible } = useScrollReveal();

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

  const scrollToVision = () => document.getElementById("vision")?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
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
              Listed {propertyData.listedPrice} · Sold {propertyData.soldPrice}
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
                <span className="text-xs md:text-sm">Asbury Ave · Ocean City</span>
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
              View the Story
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
              <p className="label-uppercase mb-4">The Story</p>
              <h2 className="heading-section text-charcoal mb-6">A Custom Build on the Asbury Corner</h2>
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
                  Designed by Halliday Architects and built by Ocean City Development Group, 2700 Asbury Ave was conceived as a custom three-story duplex on one of the most prominent corners in the heart of Ocean City — Asbury Avenue at 27th Street.
                </p>
                <p className="text-body">
                  The home was finished with the studio's signature attention to detail: wide-plank hardwood floors, upgraded cabinetry, custom-tiled spa-like bathrooms, upgraded trimwork throughout, a gourmet kitchen with center island, and a built-in gas log fireplace anchoring the open living room.
                </p>
                <p className="text-body">
                  Closed in <strong className="text-charcoal">January 2024</strong> at <strong className="text-charcoal">{propertyData.soldPrice}</strong> — within $30,500 of the original asking price — this residence is a defining example of OCDG's Ocean City portfolio.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img
                  src={ext02}
                  alt="2700 Asbury Ave — Corner View"
                  loading="lazy"
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="absolute -bottom-6 -left-6 w-44 h-24 border border-border bg-white flex items-center justify-center p-4">
                  <div className="text-center">
                    <p className="text-xs uppercase tracking-wider text-muted-slate mb-1">Sold</p>
                    <p className="text-sm font-serif text-charcoal">{propertyData.closedDate}</p>
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
            <p className="label-uppercase mb-4">The Finishes</p>
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

      {/* ─── Gallery ─── */}
      <section id="gallery" className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          <div ref={galleryRef} className={`text-center max-w-2xl mx-auto mb-8 md:mb-12 transition-all duration-1000 ${galleryVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="label-uppercase mb-4">Gallery</p>
            <h2 className="heading-section text-charcoal">A Closer Look</h2>
            <p className="text-body mt-4">Real photography from the completed residence — exterior, interior, and architectural detail.</p>
          </div>

          <div className="mb-12 md:mb-16">
            <p className="label-uppercase mb-6 text-center">Exterior</p>
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

          <div>
            <p className="label-uppercase mb-6 text-center">Interior & Detail</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {interiorImages.map((image, index) => (
                <div
                  key={index}
                  className="cursor-pointer overflow-hidden group"
                  onClick={() => openLightbox(exteriorImages.length + index)}
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

      {/* ─── Location ─── */}
      <section id="location" className="section-padding section-sand">
        <div ref={locationRef} className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${locationVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="relative h-[400px] lg:h-[500px] bg-muted">
              <iframe
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=2700+Asbury+Ave,+Ocean+City,+NJ"
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
              <h2 className="heading-section text-charcoal mb-6">The Asbury Avenue Corner</h2>
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
        <div ref={soldRef} className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-5xl">
          <div className={`transition-all duration-1000 ${soldVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="text-center mb-12">
              <p className="label-uppercase mb-4">Sale Result</p>
              <h2 className="heading-section text-charcoal mb-4">Sold Within $30,500 of Ask</h2>
              <p className="text-body max-w-2xl mx-auto">
                A custom OCDG residence delivered to its end buyer through a competitive Asbury Avenue sale.
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
                Our active portfolio includes new-construction homes throughout Ocean City — many with the same architects, finishes, and standards behind 2700 Asbury Ave.
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
          <Link to="/developments/sold/5404-bay-ave" className="text-xs tracking-[0.15em] uppercase text-muted-slate hover:text-charcoal transition-colors">
            ← 5404 Bay Avenue
          </Link>
          <Link to="/developments" className="text-xs tracking-[0.15em] uppercase text-muted-slate hover:text-charcoal transition-colors">
            ← Back to Developments
          </Link>
          <Link to="/developments/sold/209-bark-drive" className="text-xs tracking-[0.15em] uppercase text-muted-slate hover:text-charcoal transition-colors">
            209 Bark Drive →
          </Link>
        </div>
      </nav>

      <GlobalFooter />
    </main>
  );
};

export default Asbury2700;
