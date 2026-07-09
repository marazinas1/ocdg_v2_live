import { propertyConfig } from "@/lib/propertyData";
import { ArrowUpFromLine, ChefHat, Sparkles, ShieldCheck } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const iconMap = {
  elevator: ArrowUpFromLine,
  appliances: ChefHat,
  floors: Sparkles,
  resilience: ShieldCheck,
};

const Specs = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="specs" className="section-padding section-sand">
      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        {/* Header */}
        <div className={`text-center max-w-2xl mx-auto mb-12 md:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="label-uppercase mb-4">Technical Excellence</p>
          <h2 className="heading-section text-charcoal">
            Built for Generations
          </h2>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {propertyConfig.specs.map((spec, index) => {
            const Icon = iconMap[spec.icon as keyof typeof iconMap];
            return (
              <div
                key={index}
                className={`bg-white p-6 md:p-8 border border-border-subtle hover:border-border hover:shadow-sm hover:-translate-y-0.5 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ borderRadius: '4px', transitionDelay: `${200 + index * 150}ms` }}
              >
                <div className="w-12 h-12 flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-charcoal" strokeWidth={1} />
                </div>
                <h3 className="heading-card text-charcoal mb-3">
                  {spec.title}
                </h3>
                <p className="text-body text-sm leading-relaxed">
                  {spec.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Luxury Features List */}
        <div className={`mt-12 md:mt-16 max-w-4xl mx-auto transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {propertyConfig.luxuryFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-charcoal rounded-full flex-shrink-0" />
                <span className="text-body text-sm md:text-base">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-12">
          <a
            href="https://sjsr.paragonrels.com/paragonls/publink/view.mvc/?GUID=73bcda98-580d-4c02-bb71-c168a8045674&Report=Yes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-slate hover:text-charcoal transition-colors tracking-wider uppercase inline-flex items-center gap-1.5"
          >
            Official Property Record: South Jersey MLS
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Specs;
