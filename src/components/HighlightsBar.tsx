import { useScrollReveal } from "@/hooks/useScrollReveal";

const highlights = [
  { value: "6", label: "Bedrooms" },
  { value: "4.5", label: "Bathrooms" },
  { value: "4-Stop", label: "Elevator" },
  { value: "14", label: "Rooms" },
  { value: "Private", label: "Pool & Spa" },
];

const HighlightsBar = () => {
  const { ref, isVisible } = useScrollReveal(0.3);

  return (
    <section ref={ref} className="py-10 md:py-14 border-y border-border-subtle bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {highlights.map((item, i) => (
            <div
              key={i}
              className="text-center"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <p className="text-2xl md:text-3xl font-serif text-charcoal mb-1">{item.value}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-slate">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightsBar;
