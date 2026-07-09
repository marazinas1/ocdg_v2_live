import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, ChevronLeft, ChevronRight, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import GlobalNav from "@/components/GlobalNav";
import GlobalFooter from "@/components/GlobalFooter";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export interface ArchivePropertyPageProps {
  /** Street address — used as H1 (e.g. "412 Wesley Ave") */
  name: string;
  /** "Ocean City, NJ" or similar */
  location: string;
  /** Google Maps Place embed query — e.g. "412+Wesley+Ave+Ocean+City+NJ" */
  embedQuery: string;
  /** Hero / cinematic background image */
  heroImage: string;
  /** All photos to surface in the gallery (hero may or may not be included) */
  galleryImages: string[];
  /** Optional short description shown in the Location section */
  locationDescription?: string;
  /** Optional bullet list shown in the Location section */
  locationFeatures?: string[];
  /** Optional previous / next navigation slugs for the bottom nav */
  prevLink?: { href: string; label: string };
  nextLink?: { href: string; label: string };
}

/**
 * Minimal "Archive" property template — used for older sold homes where we only
 * have an address + photos. Renders Hero (SOLD badge, no date/price) → Gallery
 * → Map → CTA → Footer. No specs, no floor plans, no pricing, no descriptions.
 */
const ArchivePropertyPage = ({
  name,
  location,
  embedQuery,
  heroImage,
  galleryImages,
  locationDescription,
  locationFeatures,
  prevLink,
  nextLink,
}: ArchivePropertyPageProps) => {
  const [scrollY, setScrollY] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { ref: galleryRef, isVisible: galleryVisible } = useScrollReveal();
  const { ref: mapRef, isVisible: mapVisible } = useScrollReveal();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal();

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openLightbox = (i: number) => {
    setCurrentIndex(i);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };
  const nextImage = () => setCurrentIndex((p) => (p + 1) % galleryImages.length);
  const prevImage = () => setCurrentIndex((p) => (p - 1 + galleryImages.length) % galleryImages.length);

  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${embedQuery}`;

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
                backgroundImage: `url(${heroImage})`,
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
            <Link
              to="/developments/sold"
              className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-[10px] font-medium tracking-[0.2em] uppercase text-white/90 border border-white/30 backdrop-blur-sm bg-white/5 transition-all duration-300 hover:bg-white/15 hover:border-white/50"
              style={{ borderRadius: "4px" }}
            >
              <span className="w-1.5 h-1.5 bg-white/80 rounded-full" />
              Sold
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-normal text-white mb-3 tracking-tight leading-tight">
              {name}
            </h1>
            <p className="text-sm sm:text-base font-light tracking-[0.2em] uppercase text-white/70 mb-8 md:mb-10">
              {location}
            </p>
            <button
              onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center justify-center px-6 md:px-8 py-2.5 md:py-3 text-xs md:text-sm font-medium tracking-wider uppercase border border-white/80 text-white bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-charcoal hover:-translate-y-0.5 hover:shadow-lg"
              style={{ borderRadius: "4px" }}
            >
              View the Property
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-10">
          <div className="w-px h-12 md:h-16 bg-white/30 relative">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-pulse" />
          </div>
        </div>
      </section>

      {/* ─── Gallery ─── */}
      <section id="gallery" className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          <div
            ref={galleryRef}
            className={`text-center max-w-2xl mx-auto mb-8 md:mb-12 transition-all duration-1000 ${
              galleryVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="label-uppercase mb-4">Photography</p>
            <h2 className="heading-section text-charcoal">A Closer Look</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {galleryImages.map((src, index) => (
              <div
                key={index}
                className="cursor-pointer overflow-hidden group"
                onClick={() => openLightbox(index)}
                style={{ borderRadius: "4px" }}
              >
                <div className="relative h-full">
                  <img
                    src={src}
                    alt={`${name} — photo ${index + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover aspect-square transition-transform duration-700 ease-out group-hover:scale-110"
                  />
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
            <button
              className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-10"
              onClick={closeLightbox}
            >
              <X className="w-8 h-8" />
            </button>
            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight className="w-10 h-10" />
            </button>
            <img
              src={galleryImages[currentIndex]}
              alt={`${name} — photo ${currentIndex + 1}`}
              className="max-w-[90vw] max-h-[85vh] object-contain"
              loading="lazy" decoding="async" onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {currentIndex + 1} / {galleryImages.length}
            </div>
          </div>
        )}
      </section>

      {/* ─── Location ─── */}
      <section id="location" className="section-padding section-sand">
        <div ref={mapRef} className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div
            className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
              mapVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative h-[400px] lg:h-[500px] bg-muted">
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale contrast-125"
                title={`${name} location`}
              />
            </div>
            <div>
              <p className="label-uppercase mb-4">The Location</p>
              <h2 className="heading-section text-charcoal mb-6">The Neighborhood</h2>
              <div className="divider mb-8" />
              <div className="flex items-start gap-4 mb-8">
                <MapPin className="w-5 h-5 text-charcoal mt-1 flex-shrink-0" />
                <div>
                  <p className="text-lg font-serif text-charcoal">{name}</p>
                  <p className="text-body">{location}</p>
                </div>
              </div>
              {locationDescription && (
                <p className="text-body mb-8">{locationDescription}</p>
              )}
              {locationFeatures && locationFeatures.length > 0 && (
                <ul className="space-y-4">
                  {locationFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2.5 flex-shrink-0" />
                      <span className="text-body">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-4xl">
          <div
            ref={ctaRef}
            className={`bg-sand border border-border-subtle p-8 md:p-12 text-center transition-all duration-1000 ${
              ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ borderRadius: "4px" }}
          >
            <CheckCircle2 className="w-10 h-10 text-charcoal mx-auto mb-4" strokeWidth={1.25} />
            <h3 className="heading-card text-charcoal mb-3">Looking for a residence like this?</h3>
            <p className="text-body max-w-xl mx-auto mb-8">
              Our active portfolio includes new-construction homes throughout Ocean City — many with the same architects, finishes, and standards behind our past work.
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

      {/* ─── Project Navigation (optional) ─── */}
      {(prevLink || nextLink) && (
        <nav className="border-t border-border py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl flex items-center justify-between">
            {prevLink ? (
              <Link to={prevLink.href} className="text-xs tracking-[0.15em] uppercase text-muted-slate hover:text-charcoal transition-colors">
                ← {prevLink.label}
              </Link>
            ) : <span />}
            <Link to="/developments" className="text-xs tracking-[0.15em] uppercase text-muted-slate hover:text-charcoal transition-colors">
              ← Back to Developments
            </Link>
            {nextLink ? (
              <Link to={nextLink.href} className="text-xs tracking-[0.15em] uppercase text-muted-slate hover:text-charcoal transition-colors">
                {nextLink.label} →
              </Link>
            ) : <span />}
          </div>
        </nav>
      )}

      <GlobalFooter />
    </main>
  );
};

export default ArchivePropertyPage;