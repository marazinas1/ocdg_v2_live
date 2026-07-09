import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GlobalNav from "@/components/GlobalNav";
import SEO from "@/components/SEO";
import GlobalFooter from "@/components/GlobalFooter";
import subpageHero from "@/assets/subpage-hero.jpg";
import { currentProjects, getProjectLink, sortByListedDateDesc } from "@/lib/currentProjects";

const underContractProjects = sortByListedDateDesc(
  currentProjects.filter((p) => p.status === "Under Contract"),
);

const PAGE_SIZE = 9;

const UnderContract = () => {
  const [scrollY, setScrollY] = useState(0);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const visible = underContractProjects.slice(0, visibleCount);
  const hasMore = visibleCount < underContractProjects.length;

  return (
    <main className="min-h-screen bg-background">
      <GlobalNav />
      <SEO title={"Under Contract — Ocean City Development Group"} description={"Ocean City luxury homes currently under contract by OCDG."} path="/developments/under-contract" />

      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img
          src={subpageHero}
          alt="Under Contract Residences"
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{ transform: `translateY(${scrollY * 0.25}px)` }} loading="lazy" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        <div className="relative z-10 text-center px-4 animate-fade-in-up">
          <p className="label-uppercase text-white/70 mb-4">Reserved Residences</p>
          <h1 className="heading-display text-white">Under Contract</h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visible.map((dev) => (
              <div key={dev.title} className="card-elegant overflow-hidden group h-full flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={dev.image}
                    alt={dev.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white ${dev.statusColor} backdrop-blur-sm`} style={{ borderRadius: "4px" }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                      {dev.status}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-small mb-1">{dev.location}</p>
                  <h3 className="heading-card text-charcoal mb-2">{dev.title}</h3>
                  <p className="text-sm font-serif text-charcoal mb-1">{dev.price}</p>
                  <p className="text-body text-sm mb-5 flex-grow">{dev.description}</p>
                  <Link to={getProjectLink(dev.slug)} className="btn-primary text-xs w-full justify-center">
                    View Project
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="inline-flex items-center justify-center px-8 py-3 text-xs font-medium tracking-[0.15em] uppercase border border-charcoal text-charcoal transition-all duration-300 hover:bg-charcoal hover:text-white"
                style={{ borderRadius: "4px" }}
              >
                See More
              </button>
            </div>
          )}
        </div>
      </section>

      <GlobalFooter />
    </main>
  );
};

export default UnderContract;
