import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GlobalNav from "@/components/GlobalNav";
import SEO from "@/components/SEO";
import GlobalFooter from "@/components/GlobalFooter";
import subpageHero from "@/assets/subpage-hero.jpg";
import { sortedPastProjects as realSoldProjects, getPastProjectLink, formatSoldDate } from "@/lib/pastProjects";
import PastDevelopmentsSection from "@/components/PastDevelopmentsSection";

const PAGE_SIZE = 9;

const SoldProjects = () => {
  const [scrollY, setScrollY] = useState(0);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Merge: featured + 2025 archive entries (clickable). Past Developments
  // (2023–24) live in their own section below.
  type SoldCard = {
    slug: string;
    title: string;
    location: string;
    image: string;
    description: string;
    badge: string;
    href: string;
    detailLine?: string;
  };

  const featuredCards: SoldCard[] = realSoldProjects.map((p) => ({
    slug: p.slug,
    title: p.title,
    location: p.location,
    image: p.image,
    description: p.description,
    badge: p.isArchive ? "Sold" : `Sold ${formatSoldDate(p.soldDate)}`,
    href: getPastProjectLink(p.slug),
    detailLine: p.isArchive
      ? undefined
      : (p.listedPrice && p.soldPrice ? `Listed ${p.listedPrice} · Sold ${p.soldPrice}` : undefined),
  }));

  const allCards = featuredCards;
  const visible = allCards.slice(0, visibleCount);
  const hasMore = visibleCount < allCards.length;

  return (
    <main className="min-h-screen bg-background">
      <GlobalNav />
      <SEO title={"Sold Portfolio — Ocean City Custom Homes"} description={"Completed and sold luxury custom homes built by Ocean City Development Group."} path="/developments/sold" />

      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img
          src={subpageHero}
          alt="Sold Projects"
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{ transform: `translateY(${scrollY * 0.25}px)` }} loading="lazy" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        <div className="relative z-10 text-center px-4 animate-fade-in-up">
          <p className="label-uppercase text-white/70 mb-4">Our Legacy</p>
          <h1 className="heading-display text-white">Sold</h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visible.map((project) => (
              <Link key={project.slug} to={project.href}>
                <div className="card-elegant overflow-hidden group h-full flex flex-col cursor-pointer">
                  <div className="relative aspect-[4/3] overflow-hidden bg-accent flex-shrink-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white bg-charcoal backdrop-blur-sm" style={{ borderRadius: "4px" }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                        {project.badge}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-small mb-1">{project.location}</p>
                    <h3 className="heading-card text-charcoal mb-2">{project.title}</h3>
                    <p className="text-body text-sm flex-grow">{project.description}</p>
                    {project.detailLine && (
                      <p className="text-xs uppercase tracking-[0.15em] text-muted-slate mt-4">
                        {project.detailLine}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
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

      <PastDevelopmentsSection />

      <GlobalFooter />
    </main>
  );
};

export default SoldProjects;
