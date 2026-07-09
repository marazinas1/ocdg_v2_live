import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import GlobalNav from "@/components/GlobalNav";
import SEO from "@/components/SEO";
import GlobalFooter from "@/components/GlobalFooter";
import PropertyCarousel from "@/components/PropertyCarousel";
import subpageHero from "@/assets/subpage-hero.jpg";
import { currentProjects, getProjectLink, sortByListedDateDesc } from "@/lib/currentProjects";
import { sortedPastProjects, getPastProjectLink, formatSoldDate } from "@/lib/pastProjects";

type DevStatus = "active" | "under-contract" | "sold";

interface Development {
  title: string;
  status: DevStatus;
  statusLabel: string;
  statusColor: string;
  image: string;
  link?: string;
  location: string;
  price?: string;
  description: string;
}

const allDevelopments: Development[] = [
  ...sortByListedDateDesc(currentProjects).map((p) => ({
    title: p.title,
    status: (p.status === "Under Contract" ? "under-contract" : "active") as DevStatus,
    statusLabel: p.status,
    statusColor: p.statusColor,
    image: p.image,
    link: getProjectLink(p.slug),
    location: p.location,
    price: p.price,
    description: p.description,
  })),
  ...sortedPastProjects.map((p) => ({
    title: p.title,
    status: "sold" as DevStatus,
    statusLabel: p.isArchive || !p.soldDate ? "Sold" : `Sold ${formatSoldDate(p.soldDate)}`,
    statusColor: "bg-charcoal",
    image: p.image,
    link: getPastProjectLink(p.slug),
    location: p.location,
    price: p.soldPrice,
    description: p.description,
  })),
];

const tabs: { label: string; value: DevStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Active Listings", value: "active" },
  { label: "Under Contract", value: "under-contract" },
  { label: "Sold", value: "sold" },
];

const seeAllLinks: Record<DevStatus, { label: string; href: string }> = {
  active: { label: "See All Active Listings", href: "/developments/active-listings" },
  "under-contract": { label: "See All Under Contract", href: "/developments/under-contract" },
  sold: { label: "See All Sold", href: "/developments/sold" },
};

const DevCard = ({ dev }: { dev: Development }) => (
  <div className="card-elegant overflow-hidden group h-full flex flex-col">
    <div className="relative aspect-[4/3] overflow-hidden bg-muted flex-shrink-0">
      {dev.image ? (
        <img
          src={dev.image}
          alt={dev.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-accent">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full border-2 border-border flex items-center justify-center">
              <svg className="w-5 h-5 text-muted-slate" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
              </svg>
            </div>
            <p className="text-small">Photo Coming Soon</p>
          </div>
        </div>
      )}
      <div className="absolute top-4 left-4">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white ${dev.statusColor} backdrop-blur-sm`} style={{ borderRadius: "4px" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
          {dev.statusLabel}
        </span>
      </div>
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <p className="text-small mb-1">{dev.location}</p>
      <h3 className="heading-card text-charcoal mb-2">{dev.title}</h3>
      {dev.price && <p className="text-sm font-serif text-charcoal mb-1">{dev.price}</p>}
      <p className="text-body text-sm mb-5 flex-grow">{dev.description}</p>
      {dev.link && (
        <Link to={dev.link} className="btn-primary text-xs w-full justify-center">
          View Project
        </Link>
      )}
    </div>
  </div>
);

const Developments = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filterParam = searchParams.get("filter") || "all";
  const [activeTab, setActiveTab] = useState<string>(filterParam);

  useEffect(() => {
    setActiveTab(searchParams.get("filter") || "all");
  }, [searchParams]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ filter: value });
    }
  };

  // For "all" view, group by status and show max 3 per category
  const isAllView = activeTab === "all";

  const renderCategorySection = (status: DevStatus, items: Development[]) => {
    const info = seeAllLinks[status];
    const categoryLabels: Record<DevStatus, string> = {
      active: "Active Listings",
      "under-contract": "Under Contract",
      sold: "Sold",
    };

    return (
      <div key={status} className="mb-16 last:mb-0">
        <h2 className="heading-section text-charcoal text-xl mb-8">{categoryLabels[status]}</h2>
        <PropertyCarousel
          items={items
            .filter((dev) => Boolean(dev.link))
            .map((dev) => ({
              title: dev.title,
              image: dev.image,
              link: dev.link!,
              location: dev.location,
              description: dev.description,
              price: dev.price,
              badgeLabel: dev.statusLabel,
              badgeColor: dev.statusColor,
            }))}
        />
        {items.length > 0 && (
          <div className="text-center mt-8">
            <Link to={info.href} className="btn-outline text-xs inline-flex">
              {info.label}
            </Link>
          </div>
        )}
      </div>
    );
  };

  const filtered = activeTab === "all"
    ? allDevelopments
    : allDevelopments.filter((d) => d.status === activeTab);

  const activeDevs = allDevelopments.filter((d) => d.status === "active");
  const underContractDevs = allDevelopments.filter((d) => d.status === "under-contract");
  const soldDevs = allDevelopments.filter((d) => d.status === "sold");

  return (
    <main className="min-h-screen bg-background">
      <GlobalNav />
      <SEO title={"Developments — Ocean City Custom Homes"} description={"Browse Ocean City Development Group's portfolio: active listings, under contract, and sold luxury coastal homes."} path="/developments" />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img
          src={subpageHero}
          alt="Ocean City Development Group — Developments"
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{ transform: `translateY(${scrollY * 0.25}px)` }} loading="lazy" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        <div className="relative z-10 text-center px-4 animate-fade-in-up">
          <p className="label-uppercase text-white/70 mb-4">Our Portfolio</p>
          <h1 className="heading-display text-white">Developments</h1>
        </div>
      </section>

      {/* Filter Tabs + Grid */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => handleTabChange(tab.value)}
                className={`px-5 py-2 text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
                  activeTab === tab.value
                    ? "bg-charcoal text-white"
                    : "bg-transparent text-slate hover:text-charcoal border border-border"
                }`}
                style={{ borderRadius: "4px" }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {isAllView ? (
            <>
              {activeDevs.length > 0 && renderCategorySection("active", activeDevs)}
              {underContractDevs.length > 0 && renderCategorySection("under-contract", underContractDevs)}
              {soldDevs.length > 0 && renderCategorySection("sold", soldDevs)}
            </>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-body text-lg">No developments in this category yet.</p>
              <p className="text-small mt-2">Check back soon for updates.</p>
            </div>
          ) : (
            renderCategorySection(activeTab as DevStatus, filtered)
          )}
        </div>
      </section>

      <GlobalFooter />
    </main>
  );
};

export default Developments;
