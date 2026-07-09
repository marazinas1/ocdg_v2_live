import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { propertyConfig } from "@/lib/propertyData";
import { Bed, Bath, MapPin } from "lucide-react";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToVision = () => {
    const element = document.querySelector("#vision");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-[85vh] md:h-screen min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image with Ken Burns + Parallax */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 will-change-transform" style={{ transform: `translateY(${scrollY * 0.15}px)` }}>
          <div 
            className="absolute -inset-[15%] animate-ken-burns"
            style={{ 
              backgroundImage: `url(${propertyConfig.images.hero})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 40%',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>
        {/* Deep cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        <div className="max-w-3xl animate-fade-in-up">
          {/* Status Badge */}
          <Link to="/developments" className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-[10px] font-medium tracking-[0.2em] uppercase text-white/90 border border-white/30 backdrop-blur-sm bg-white/5 transition-all duration-300 hover:bg-white/15 hover:border-white/50"
            style={{ borderRadius: '4px' }}
          >
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            New Construction · 2026
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-normal text-white mb-2 tracking-tight leading-tight">
            {propertyConfig.name}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif text-white/90 mb-3">
            {propertyConfig.headline}
          </p>
          
          {/* Price */}
          <p className="text-lg sm:text-xl md:text-2xl font-light text-white/80 tracking-wide mb-6">
            {propertyConfig.price}
          </p>
          
          {/* Property Stats */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-6 text-white/80">
            <div className="flex items-center gap-2">
              <Bed className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
              <span className="text-xs md:text-sm">6 Bedrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
              <span className="text-xs md:text-sm">4.5 Bathrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
              <span className="text-xs md:text-sm">Beach Block · Gardens</span>
            </div>
          </div>
          
          <p className="text-base md:text-lg lg:text-xl text-white/80 font-light leading-relaxed mb-8 md:mb-10 max-w-2xl">
            {propertyConfig.tagline}
          </p>
          <button 
            onClick={scrollToVision} 
            className="inline-flex items-center justify-center px-6 md:px-8 py-2.5 md:py-3 text-xs md:text-sm font-medium tracking-wider uppercase border border-white/80 text-white bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-charcoal hover:-translate-y-0.5 hover:shadow-lg"
            style={{ borderRadius: '4px' }}
          >
            View the Opportunity
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-10">
        <div className="w-px h-12 md:h-16 bg-white/30 relative">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
