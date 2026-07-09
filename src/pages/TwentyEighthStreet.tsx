import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GlobalNav from "@/components/GlobalNav";
import GlobalFooter from "@/components/GlobalFooter";
import { Bed, Bath, Building2, ArrowUpFromLine, ChefHat, Sparkles, Home, X, ChevronLeft, ChevronRight, Download, Phone, Mail, MapPin } from "lucide-react";
import dundeeHero from "@/assets/dundee-ext-view1.jpg";
import { toast } from "sonner";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// Images
import extView1 from "@/assets/28th-ext-view1.jpg";
import extView2 from "@/assets/28th-ext-view2.jpg";
import extView3 from "@/assets/28th-ext-view3.jpg";
import extView4 from "@/assets/28th-ext-view4.jpg";
import extView5 from "@/assets/28th-ext-view5.jpg";
import extView6 from "@/assets/28th-ext-view6.jpg";
import intView1 from "@/assets/28th-int-01.jpg";
import intView2 from "@/assets/28th-int-02.jpg";
import intView3 from "@/assets/28th-int-03.jpg";
import intView4 from "@/assets/28th-int-04.jpg";
import intView5 from "@/assets/28th-int-05.jpg";
import intView6 from "@/assets/28th-int-06.jpg";
import floorGround from "@/assets/28th-floor-ground.jpg";
import floor1st from "@/assets/28th-floor-1st.jpg";
import floor2nd from "@/assets/28th-floor-2nd.jpg";
import floorAttic from "@/assets/28th-floor-attic.jpg";

// ─── Floor Plan Data ───
const floorPlans = [
  {
    id: "ground",
    name: "Ground Floor",
    image: floorGround,
    description: "Open-concept living and dining area, study, half bath, and a functional mudroom with direct backyard access.",
    highlights: [
      "Open-concept living & dining",
      "Private study / home office",
      "Half bath for guests",
      "Mudroom with backyard access",
      "Direct entry from garage",
    ],
  },
  {
    id: "first",
    name: "First Floor",
    image: floor1st,
    description: "Features 3 bedrooms, each with an attached private bathroom, plus a sitting area opening to a shared deck.",
    highlights: [
      "3 ensuite bedrooms",
      "Private bathrooms per bedroom",
      "Shared sitting area",
      "Deck access from sitting area",
      "Full laundry room",
    ],
  },
  {
    id: "second",
    name: "Second Floor",
    image: floor2nd,
    description: "The main entertaining level with custom kitchen, open living spaces, and seamless deck access for ocean views.",
    highlights: [
      "Custom gourmet kitchen",
      "Open living & dining areas",
      "Ocean-view deck access",
      "Powder room",
      "Butler's pantry",
    ],
  },
  {
    id: "top",
    name: "Top Floor — Primary Suite",
    image: floorAttic,
    description: "An entire floor dedicated to the Primary Suite with two walk-in closets, a large ensuite bathroom, and private deck with panoramic views.",
    highlights: [
      "Full-floor Primary Suite",
      "Two walk-in closets",
      "Large ensuite spa bathroom",
      "Private ocean-view deck",
      "Sitting area with views",
    ],
    badge: "The Crown Jewel",
  },
];

// ─── Gallery Images ───
const exteriorImages = [
  { src: extView1, alt: "201 28th Street — Primary Exterior View" },
  { src: extView2, alt: "201 28th Street — Exterior View 2" },
  { src: extView3, alt: "201 28th Street — Aerial View" },
  { src: extView4, alt: "201 28th Street — Exterior View 4" },
  { src: extView5, alt: "201 28th Street — Exterior View 5" },
  { src: extView6, alt: "201 28th Street — Exterior View 6" },
];

const interiorImages = [
  { src: intView1, alt: "201 28th Street — Living Room" },
  { src: intView2, alt: "201 28th Street — Kitchen" },
  { src: intView3, alt: "201 28th Street — Dining Area" },
  { src: intView4, alt: "201 28th Street — Primary Suite" },
  { src: intView5, alt: "201 28th Street — Bathroom" },
  { src: intView6, alt: "201 28th Street — Bedroom" },
];

const allGalleryImages = [...exteriorImages, ...interiorImages];

// ─── Specs Data ───
const specs = [
  { icon: "elevator", title: "Private Elevator", description: "Full-home elevator serving all floors for effortless living across every level." },
  { icon: "kitchen", title: "Custom Kitchen", description: "Gourmet kitchen with premium cabinetry, stone countertops, and top-tier appliances." },
  { icon: "finishes", title: "Premium Finishes", description: "Hardwood floors, custom tile work, and designer fixtures throughout every room." },
  { icon: "decks", title: "Ocean-View Decks", description: "Multiple expansive decks offering serene ocean views from every level of the home." },
];

const luxuryFeatures = [
  "Private elevator to all floors",
  "Custom gourmet kitchen",
  "Ensuite bathrooms in every bedroom",
  "Multiple ocean-view decks",
  "Two walk-in closets in Primary Suite",
  "Spa-inspired Primary Bath",
  "Mudroom with backyard access",
  "3-story coastal architecture",
  "Premium hardwood flooring",
  "Smart home pre-wiring",
];

const highlights = [
  { value: "4", label: "Bedrooms" },
  { value: "4.5", label: "Bathrooms" },
  { value: "4-Stop", label: "Elevator" },
  { value: "4", label: "Stories" },
  { value: "Ocean", label: "Views" },
];

const iconMap: Record<string, React.ComponentType<any>> = {
  elevator: ArrowUpFromLine,
  kitchen: ChefHat,
  finishes: Sparkles,
  decks: Home,
};

const TwentyEighthStreet = () => {
  const [activeFloor, setActiveFloor] = useState(floorPlans[0].id);
  const currentFloor = floorPlans.find((f) => f.id === activeFloor);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [formData, setFormData] = useState({ name: "", email: "", phone: "", interest: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  const nextImage = () => setCurrentIndex((p) => (p + 1) % allGalleryImages.length);
  const prevImage = () => setCurrentIndex((p) => (p - 1 + allGalleryImages.length) % allGalleryImages.length);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Thank you. Our team will send the 201 28th Street digital brochure to your email shortly.");
    setFormData({ name: "", email: "", phone: "", interest: "" });
    setIsSubmitting(false);
  };

  const scrollToVision = () => document.getElementById("vision")?.scrollIntoView({ behavior: "smooth" });

  // Sticky Inquire
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
              style={{ backgroundImage: `url(${extView1})`, backgroundSize: "cover", backgroundPosition: "center 40%", backgroundRepeat: "no-repeat" }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          <div className="max-w-3xl animate-fade-in-up">
            {/* Status Badge */}
            <Link to="/developments" className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-[10px] font-medium tracking-[0.2em] uppercase text-white/90 border border-white/30 backdrop-blur-sm bg-white/5 transition-all duration-300 hover:bg-white/15 hover:border-white/50" style={{ borderRadius: "4px" }}>
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              New Construction · 2026
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-normal text-white mb-2 tracking-tight leading-tight">
              201 28th Street
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif text-white/90 mb-3">
              Ocean City, NJ
            </p>
            <p className="text-lg sm:text-xl md:text-2xl font-light text-white/80 tracking-wide mb-6">
              $2,895,000
            </p>
            <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-6 text-white/80">
              <div className="flex items-center gap-2">
                <Bed className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                <span className="text-xs md:text-sm">4 Bedrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                <span className="text-xs md:text-sm">4.5 Bathrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                <span className="text-xs md:text-sm">3 Stories</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowUpFromLine className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                <span className="text-xs md:text-sm">Elevator</span>
              </div>
            </div>
            <p className="text-base md:text-lg lg:text-xl text-white/80 font-light leading-relaxed mb-8 md:mb-10 max-w-2xl">
              A masterpiece of coastal architecture designed for those who value privacy and quality.
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
            {highlights.map((item, i) => (
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
              <h2 className="heading-section text-charcoal mb-6">Coastal Architecture Reimagined</h2>
              <div className="divider mb-8" />
              <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-sand border border-border-subtle">
                <div className="text-center">
                  <p className="text-2xl font-serif text-charcoal">4</p>
                  <p className="text-xs uppercase tracking-wider text-muted-slate">Bedrooms</p>
                </div>
                <div className="text-center border-x border-border-subtle">
                  <p className="text-2xl font-serif text-charcoal">4.5</p>
                  <p className="text-xs uppercase tracking-wider text-muted-slate">Bathrooms</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-serif text-charcoal">3</p>
                  <p className="text-xs uppercase tracking-wider text-muted-slate">Stories</p>
                </div>
              </div>
              <div className="space-y-6">
                <p className="text-body">
                  A masterpiece of coastal architecture by Halliday Architects. This 3-story custom single-family home is designed for those who value privacy and quality. From expansive decks with serene views to the high-end interior finishes, every detail is crafted for lasting memories at the beach.
                </p>
                <p className="text-body">
                  <strong className="text-charcoal">Ground Floor:</strong> Open-concept living and dining area, study, half bath, and a functional mudroom with direct backyard access.
                </p>
                <p className="text-body">
                  <strong className="text-charcoal">First Floor:</strong> Features 3 bedrooms, each with an attached private bathroom, plus a sitting area opening to a shared deck.
                </p>
                <p className="text-body">
                  <strong className="text-charcoal">Second Floor:</strong> The main entertaining level with custom kitchen, open living spaces, and seamless deck access for ocean views.
                </p>
                <p className="text-body">
                  <strong className="text-charcoal">Top Floor — The Crown Jewel:</strong> An entire floor dedicated to the Primary Suite with two walk-in closets, a large ensuite bathroom, and private deck with panoramic views.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img src={extView2} alt="201 28th Street exterior" className="w-full aspect-[4/5] object-cover" loading="lazy" decoding="async" />
                <div className="absolute -bottom-6 -left-6 w-40 h-24 border border-border bg-white flex items-center justify-center p-4">
                  <div className="text-center">
                    <p className="text-xs uppercase tracking-wider text-muted-slate mb-1">Ocean City</p>
                    <p className="text-sm font-serif text-charcoal">28th Street</p>
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
            <h2 className="heading-section text-charcoal">Built for Generations</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {specs.map((spec, index) => {
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
              {luxuryFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-charcoal rounded-full flex-shrink-0" />
                  <span className="text-body text-sm md:text-base">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-12">
            <a
              href="https://sjsr.paragonrels.com/paragonls/publink/view.mvc/?GUID=73bcda98-580d-4c02-bb71-c168a8045674&Report=Yes"
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
            {floorPlans.map((floor) => (
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
              <h3 className={`heading-card mb-4 ${currentFloor?.id === "top" ? "text-primary" : "text-charcoal"}`}>
                {currentFloor?.name}
              </h3>
              {(currentFloor as any)?.badge && (
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs tracking-[0.1em] uppercase font-medium mb-4" style={{ borderRadius: "4px" }}>
                  {(currentFloor as any).badge}
                </span>
              )}
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
          {/* Exterior Perspectives */}
          <div className="mb-12 md:mb-16">
            <p className="label-uppercase mb-6 text-center">Exterior Perspectives</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {exteriorImages.map((image, index) => (
                <div
                  key={index}
                  className={`cursor-pointer overflow-hidden group ${index === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""}`}
                  onClick={() => openLightbox(index)}
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

          {/* Interior Design & Lifestyle */}
          <div>
            <p className="label-uppercase mb-6 text-center">Interior Design & Lifestyle</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {interiorImages.map((image, index) => (
                <div
                  key={index}
                  className={`cursor-pointer overflow-hidden group ${index === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""}`}
                  onClick={() => openLightbox(exteriorImages.length + index)}
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

      {/* ─── Location ─── */}
      <section id="location" className="section-padding">
        <div ref={locationRef} className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${locationVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="relative h-[400px] lg:h-[500px] bg-muted">
              <iframe
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=201+28th+St,+Ocean+City,+NJ"
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
              <h2 className="heading-section text-charcoal mb-6">28th Street, Ocean City</h2>
              <div className="divider mb-8" />
              <div className="flex items-start gap-4 mb-8">
                <MapPin className="w-5 h-5 text-charcoal mt-1 flex-shrink-0" />
                <div>
                  <p className="text-lg font-serif text-charcoal">201 28th Street</p>
                  <p className="text-body">Ocean City, NJ</p>
                </div>
              </div>
              <ul className="space-y-4">
                {[
                  "3-story coastal residence with ocean views from every level",
                  "Prime location near the beach and boardwalk",
                  "Multiple expansive decks for ocean breezes",
                  "Minutes from downtown dining and entertainment",
                ].map((feature, index) => (
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
              <h2 className="heading-section text-charcoal mb-4">Request Exclusive Pre-Sale Information</h2>
              <p className="text-body">
                Register your interest to receive priority access to architectural plans, pricing details, and exclusive pre-sale updates for 201 28th Street.
              </p>
            </div>
            <div className="bg-white border border-border-subtle p-6 mb-8" style={{ borderRadius: "4px" }}>
              <p className="text-xs uppercase tracking-wider text-muted-slate mb-4 text-center">Direct Contact</p>
              <div className="text-center mb-4">
                <p className="font-serif text-lg text-charcoal">Patrick A. Halliday</p>
                <p className="text-sm text-muted-slate">Ocean City Development Group, LLC</p>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="tel:6096023917" className="flex items-center justify-center gap-2 text-sm text-charcoal hover:text-muted-slate transition-colors">
                  <Phone className="w-4 h-4" strokeWidth={1.5} />
                  (609) 602-3917
                </a>
                <a href="mailto:PatrickAHalliday@gmail.com" className="flex items-center justify-center gap-2 text-sm text-charcoal hover:text-muted-slate transition-colors">
                  <Mail className="w-4 h-4" strokeWidth={1.5} />
                  PatrickAHalliday@gmail.com
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
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="input-elegant" placeholder="(555) 123-4567" />
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
              <p className="text-xs text-center text-muted-slate">
                Your information is kept strictly confidential and will never be shared.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ─── Project Navigation ─── */}
      <nav className="border-t border-border py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl flex items-center justify-between">
          <Link to="/developments/current-projects/71-morningside-road" className="text-xs tracking-[0.15em] uppercase text-muted-slate hover:text-charcoal transition-colors">
            ← 71 Morningside Road
          </Link>
          <Link to="/developments" className="text-xs tracking-[0.15em] uppercase text-muted-slate hover:text-charcoal transition-colors">
            ← Back to Developments
          </Link>
          <Link to="/developments/current-projects/19-e-dundee-road" className="text-xs tracking-[0.15em] uppercase text-muted-slate hover:text-charcoal transition-colors">
            19 E Dundee Road →
          </Link>
        </div>
      </nav>

      <GlobalFooter />

      {/* Sticky Inquire */}
      <button
        onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
        className={`fixed bottom-8 right-8 z-40 px-6 py-3 text-xs font-medium tracking-[0.15em] uppercase bg-charcoal text-white shadow-elegant backdrop-blur-sm transition-all duration-500 hover:bg-charcoal/90 hover:-translate-y-0.5 hover:shadow-lg ${
          stickyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        style={{ borderRadius: "4px" }}
      >
        Inquire
      </button>
    </main>
  );
};

export default TwentyEighthStreet;
