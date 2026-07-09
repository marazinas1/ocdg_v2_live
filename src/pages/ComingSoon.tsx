import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GlobalNav from "@/components/GlobalNav";
import SEO from "@/components/SEO";
import GlobalFooter from "@/components/GlobalFooter";
import subpageHero from "@/assets/subpage-hero.jpg";
import extView2_28th from "@/assets/28th-ext-view2.jpg";

const comingSoonPlaceholders = [
  { title: "Project Alpha", location: "Ocean City, NJ", description: "A stunning new coastal residence coming to the heart of Ocean City." },
  { title: "Project Beta", location: "Ocean City, NJ", description: "Modern luxury meets timeless seaside charm in this upcoming development." },
  { title: "Project Gamma", location: "Ocean City, NJ", description: "An exclusive waterfront property designed for the discerning homeowner." },
];

const ComingSoon = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <GlobalNav />
      <SEO title={"Coming Soon — Ocean City Development Group"} description={"Upcoming custom luxury home developments in Ocean City, NJ."} path="/developments/coming-soon" />

      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img
          src={subpageHero}
          alt="Coming Soon Developments"
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{ transform: `translateY(${scrollY * 0.25}px)` }} loading="lazy" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        <div className="relative z-10 text-center px-4 animate-fade-in-up">
          <p className="label-uppercase text-white/70 mb-4">On the Horizon</p>
          <h1 className="heading-display text-white">Coming Soon</h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {comingSoonPlaceholders.map((dev) => (
              <div key={dev.title} className="card-elegant overflow-hidden group h-full flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={extView2_28th}
                    alt={dev.title}
                    className="w-full h-full object-cover opacity-60" loading="lazy" decoding="async" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white bg-amber-500 backdrop-blur-sm" style={{ borderRadius: "4px" }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                      Coming Soon
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-small mb-1">{dev.location}</p>
                  <h3 className="heading-card text-charcoal mb-2">{dev.title}</h3>
                  <p className="text-body text-sm mb-5 flex-grow">{dev.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GlobalFooter />
    </main>
  );
};

export default ComingSoon;
