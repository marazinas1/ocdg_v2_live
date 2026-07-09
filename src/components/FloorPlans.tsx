import { useState } from "react";
import { propertyConfig } from "@/lib/propertyData";
import { Download } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const FloorPlans = () => {
  const [activeFloor, setActiveFloor] = useState(propertyConfig.floorPlans[0].id);
  const { ref, isVisible } = useScrollReveal();
  
  const currentFloor = propertyConfig.floorPlans.find(
    (floor) => floor.id === activeFloor
  );

  return (
    <section id="floor-plans" className="section-padding">
      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        {/* Header */}
        <div className={`text-center max-w-2xl mx-auto mb-8 md:mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="label-uppercase mb-4">Floor Plans</p>
          <h2 className="heading-section text-charcoal">
            Explore Every Level
          </h2>
        </div>

        {/* Tabs */}
        <div className={`flex flex-wrap justify-center gap-2 mb-8 md:mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {propertyConfig.floorPlans.map((floor) => (
            <button
              key={floor.id}
              onClick={() => setActiveFloor(floor.id)}
              className={`px-4 md:px-6 py-2.5 md:py-3 text-xs tracking-[0.1em] uppercase font-medium transition-all duration-300 ${
                activeFloor === floor.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-slate hover:bg-accent"
              }`}
            >
              {floor.name}
            </button>
          ))}
        </div>

        {/* Floor Plan Display */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-8 items-start transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {/* Image */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div 
              className="bg-white p-3 md:p-4 border border-border min-h-[300px] sm:min-h-[400px] lg:min-h-0"
              style={{ borderRadius: '4px' }}
            >
              <img
                key={activeFloor}
                src={currentFloor?.image}
                alt={currentFloor?.name}
                className="w-full h-auto animate-fade-in"
                style={{ aspectRatio: 'auto' }} loading="lazy" decoding="async" />
            </div>
          </div>

          {/* Details */}
          <div 
            className="bg-background-sand p-6 md:p-8 order-2 lg:order-1"
            style={{ borderRadius: '4px' }}
          >
            <h3 className={`heading-card mb-4 ${currentFloor?.id === 'third' ? 'text-primary' : 'text-charcoal'}`}>
              {currentFloor?.name}
            </h3>
            {currentFloor?.id === 'third' && (
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs tracking-[0.1em] uppercase font-medium mb-4" style={{ borderRadius: '4px' }}>
                The Crown Jewel
              </span>
            )}
            <p className="text-body text-sm md:text-base leading-relaxed mb-6">
              {(currentFloor as any)?.description}
            </p>
            <div className="divider mb-6" />
            <p className="label-uppercase mb-4">Key Features</p>
            <ul className="space-y-3 mb-8">
              {currentFloor?.highlights.map((highlight, index) => (
                <li key={index} className="flex items-center gap-3 text-body text-sm md:text-base">
                  <span className="w-1.5 h-1.5 bg-charcoal rounded-full flex-shrink-0" />
                  {highlight}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => {
                const registerSection = document.getElementById('register');
                if (registerSection) {
                  registerSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="btn-outline w-full flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Request Floor Plans PDF
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FloorPlans;
