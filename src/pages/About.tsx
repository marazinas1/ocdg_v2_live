import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GlobalNav from "@/components/GlobalNav";
import SEO from "@/components/SEO";
import GlobalFooter from "@/components/GlobalFooter";
import subpageHero from "@/assets/subpage-hero.jpg";
import hallidayLogo from "@/assets/halliday-logo.png";
import ocdgLogo from "@/assets/ocdg-logo.png";
import hallidayLeonardLogo from "@/assets/partner-halliday-leonard.jpg";
import approachImage from "@/assets/28th-approach-v4.jpg";

import patrickPhoto from "@/assets/patrick-halliday.png";

const About = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <GlobalNav />
      <SEO title={"About Ocean City Development Group"} description={"45+ years building luxury coastal homes in Ocean City, NJ. Meet Patrick Halliday and our partners at Halliday Architects."} path="/about" />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img
          src={subpageHero}
          alt="About Ocean City Development Group"
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{ transform: `translateY(${scrollY * 0.25}px)` }} loading="lazy" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        <div className="relative z-10 text-center px-4 animate-fade-in-up">
          <p className="label-uppercase text-white/70 mb-4">Who We Are</p>
          <h1 className="heading-display text-white">About Ocean City Development Group</h1>
        </div>
      </section>

      {/* Our Story — Staggered Layout */}
      <section className="section-padding section-sand">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <div>
              <p className="label-uppercase mb-4">Our Story</p>
              <h2 className="heading-section text-charcoal mb-6">Defining Coastal Luxury</h2>
              <div className="divider mb-8" />
              <p className="text-body text-lg leading-relaxed mb-6">
                Ocean City Development Group takes great pride in providing our customers with an unmatched level of customer service. As a full-service development company, we strive to build long-lasting relationships with our clients and fulfill all their new construction needs.
              </p>
              <p className="text-body text-lg leading-relaxed mb-8">
                With over 45 years of real estate development experience, the partners of Ocean City Development Group take pride in our work and look forward to creating the new home you've always dreamed of.
              </p>
              {/* Signature-style element */}
              <div className="border-l-2 border-charcoal/20 pl-6 mt-8">
                <p className="font-serif italic text-charcoal/70 text-lg mb-2">
                  "Building dreams, one home at a time."
                </p>
                <div className="w-24 h-px bg-charcoal/30 mb-2" />
                <p className="text-xs uppercase tracking-widest text-muted-slate">
                  The Halliday-Leonard Family
                </p>
              </div>
            </div>
            {/* Image */}
            <div className="relative overflow-hidden" style={{ borderRadius: "4px" }}>
              <img
                src={approachImage}
                alt="Ocean City Development Group — Craftsmanship"
                className="w-full object-cover object-center aspect-[3/4] lg:max-h-[550px] lg:aspect-auto lg:h-[60vh] lg:min-h-[400px]" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Promise — Zig-Zag: Image Left, Text Right */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="flex flex-col items-center">
              <div className="w-60 mx-auto">
                <img
                  src={patrickPhoto}
                  alt="Patrick Halliday — Managing Partner"
                  className="w-full h-auto" loading="lazy" decoding="async" />
              </div>
              <p className="mt-5 text-sm tracking-wide text-charcoal font-medium">Patrick Halliday</p>
              <p className="text-xs uppercase tracking-widest text-muted-slate">Managing Partner</p>
            </div>
            {/* Text */}
            <div>
              <p className="label-uppercase mb-4">Our Promise</p>
              <h2 className="heading-section text-charcoal mb-6">Timeless Design. Superior Craftsmanship.</h2>
              <div className="divider mb-8" />
              <p className="text-body text-lg leading-relaxed">
                Our attention to detail allows you to sit back, relax, and step into the reality you've always dreamed of. We have been involved in thousands of custom homes and developments throughout Ocean City, NJ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section Divider ─── */}
      <div className="w-full h-px bg-border" />

      {/* Our Partners */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-5xl text-center">
          <p className="label-uppercase mb-4">Our Partners</p>
          <h2 className="heading-section text-charcoal mb-6">Trusted Collaborators</h2>
          <div className="divider mx-auto mb-12" />

          <div className="grid md:grid-cols-2 gap-12 md:gap-16 text-left">
            {/* Halliday Architects */}
            <div className="flex flex-col items-center text-center">
              <div className="h-20 flex items-center justify-center mb-6">
                <img src={hallidayLogo} alt="Halliday Architects" className="max-h-16 w-auto object-contain" loading="lazy" decoding="async" />
              </div>
              <h3 className="font-serif text-2xl text-charcoal mb-4">Halliday Architects</h3>
              <p className="text-body leading-relaxed">
                Every Ocean City Development Group project is brought to life in collaboration with Halliday Architects, whose award-winning designs blend coastal elegance with modern functionality.
              </p>
            </div>

            {/* Halliday-Leonard General Contractors */}
            <div className="flex flex-col items-center text-center">
              <div className="h-20 flex items-center justify-center mb-6">
                <img src={hallidayLeonardLogo} alt="Halliday-Leonard Custom Home Builders" className="max-h-20 w-auto object-contain" loading="lazy" decoding="async" />
              </div>
              <h3 className="font-serif text-2xl text-charcoal mb-4">Halliday-Leonard Custom Home Builders</h3>
              <p className="text-body leading-relaxed">
                Our trusted construction partner, Halliday-Leonard delivers master-level craftsmanship on every residence — combining decades of building expertise with an unwavering commitment to quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      <GlobalFooter />
    </main>
  );
};

export default About;
