import { useState, useMemo } from "react";
import { pastDevelopments } from "@/lib/pastDevelopments";

const PAGE_SIZE = 8;

const PastDevelopmentsSection = () => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sorted = useMemo(() => {
    const parsePrice = (p: string) => Number(p.replace(/[^0-9.]/g, "")) || 0;
    return [...pastDevelopments].sort(
      (a, b) => b.year - a.year || parsePrice(b.soldPrice) - parsePrice(a.soldPrice),
    );
  }, []);
  const visible = sorted.slice(0, visibleCount);
  const hasMore = visibleCount < sorted.length;

  return (
    <section className="section-padding border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        <div className="text-center mb-12">
          <p className="label-uppercase text-muted-slate mb-3">Our Track Record</p>
          <h2 className="heading-section text-charcoal mb-3">Past Developments</h2>
          <p className="text-body max-w-2xl mx-auto">
            A selection of additional homes previously built and sold by Ocean City Development Group.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visible.map((p) => (
            <div
              key={p.mls}
              className="overflow-hidden border border-border/50 bg-card flex flex-col"
              style={{ borderRadius: "4px" }}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-accent">
                <img
                  src={p.image}
                  alt={p.address}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white bg-charcoal/85 backdrop-blur-sm"
                    style={{ borderRadius: "3px" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                    Sold {p.year}
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-display text-lg text-charcoal leading-snug mb-1">
                  {p.address}
                </h3>
                <p className="text-xs text-muted-slate">{p.description}</p>
                {p.soldPrice && (
                  <p className="text-xs uppercase tracking-[0.15em] text-muted-slate mt-3">
                    Sold {p.soldPrice}
                  </p>
                )}
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
              Show More Past Developments
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PastDevelopmentsSection;