import { useState, useEffect } from "react";
import { propertyConfig } from "@/lib/propertyData";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#vision", label: "The Vision" },
    { href: "#specs", label: "Specs" },
    { href: "#floor-plans", label: "Floor Plans" },
    { href: "#gallery", label: "Gallery" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top gradient overlay for header visibility - only when not scrolled */}
      {!isScrolled && (
        <div className="fixed top-0 left-0 right-0 h-32 z-40 pointer-events-none bg-gradient-to-b from-black/50 via-black/25 to-transparent" />
      )}
      
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "glass-nav shadow-sm" : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo with enhanced visibility */}
            <a
              href="#"
              className="flex items-center flex-shrink-0"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <img 
                src={propertyConfig.logo} 
                alt={propertyConfig.developer}
                className={`h-7 sm:h-8 md:h-10 w-auto max-h-[50px] object-contain transition-all duration-300 ${
                  !isScrolled ? "brightness-0 invert drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" : ""
                }`} loading="lazy" decoding="async" />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={`inline-flex items-center justify-center px-4 py-2 text-xs tracking-[0.12em] uppercase font-medium transition-all duration-300 ${
                    isScrolled 
                      ? "text-slate hover:text-charcoal" 
                      : "text-white hover:text-white/80"
                  }`}
                  style={{ textShadow: !isScrolled ? '0 1px 3px rgba(0,0,0,0.4)' : 'none' }}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("#register")}
                className={`text-xs py-2.5 px-6 font-medium tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                  isScrolled 
                    ? "bg-charcoal text-white" 
                    : "bg-white/20 backdrop-blur-sm border border-white/40 text-white hover:bg-white hover:text-charcoal"
                }`}
                style={{ borderRadius: '4px' }}
              >
                Inquire Now
              </button>
            </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`w-full h-0.5 transition-all duration-300 ${
                  isScrolled ? "bg-charcoal" : "bg-white"
                } ${isMobileMenuOpen ? "rotate-45 translate-y-2 bg-charcoal" : ""}`}
              />
              <span
                className={`w-full h-0.5 transition-all duration-300 ${
                  isScrolled ? "bg-charcoal" : "bg-white"
                } ${isMobileMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`w-full h-0.5 transition-all duration-300 ${
                  isScrolled ? "bg-charcoal" : "bg-white"
                } ${isMobileMenuOpen ? "-rotate-45 -translate-y-2 bg-charcoal" : ""}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-80 pb-6" : "max-h-0"
          }`}
        >
          <div className={`flex flex-col gap-4 pt-4 border-t ${isScrolled ? "border-border" : "border-white/20"}`}>
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`text-left text-sm tracking-wider uppercase transition-colors ${
                  isScrolled 
                    ? "text-slate hover:text-charcoal" 
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("#register")}
              className={`text-xs mt-2 w-fit py-2.5 px-6 font-medium tracking-wider uppercase transition-all duration-300 ${
                isScrolled 
                  ? "bg-charcoal text-white" 
                  : "bg-white text-charcoal"
              }`}
              style={{ borderRadius: '4px' }}
            >
              Inquire Now
            </button>
          </div>
        </div>
      </nav>
    </header>
    </>
  );
};

export default Navigation;
