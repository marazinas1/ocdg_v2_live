import { propertyConfig } from "@/lib/propertyData";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Vision = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="vision" className="section-padding">
      <div ref={ref} className="container mx-auto px-6 lg:px-12">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <p className="label-uppercase mb-4">The Vision</p>
            <h2 className="heading-section text-charcoal mb-6">
              Four Levels of Coastal Mastery
            </h2>
            <div className="divider mb-8" />
            
            {/* Property Highlights */}
            <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-sand border border-border-subtle">
              <div className="text-center">
                <p className="text-2xl font-serif text-charcoal">{propertyConfig.details.bedrooms}</p>
                <p className="text-xs uppercase tracking-wider text-muted-slate">Bedrooms</p>
              </div>
              <div className="text-center border-x border-border-subtle">
                <p className="text-2xl font-serif text-charcoal">
                  {propertyConfig.details.fullBaths + propertyConfig.details.halfBaths * 0.5}
                </p>
                <p className="text-xs uppercase tracking-wider text-muted-slate">Bathrooms</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-serif text-charcoal">{propertyConfig.details.totalRooms}</p>
                <p className="text-xs uppercase tracking-wider text-muted-slate">Rooms</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-body">
                <strong className="text-charcoal">Ground Level:</strong> Multi-car garage with ample storage, 
                an elegant entry foyer, and a 4-stop residential elevator with Longport interior cab finish. 
                Step outside to a private in-ground pool surrounded by IPE decking and a spa-like oasis.
              </p>
              <p className="text-body">
                <strong className="text-charcoal">First Floor:</strong> Junior Master Suite with full ensuite bath, 
                additional guest bedrooms featuring thick-set mortar tile showers and custom tile work, 
                plus a dedicated laundry room for effortless living.
              </p>
              <p className="text-body">
                <strong className="text-charcoal">Second Floor:</strong> The heart of the home — an open-concept 
                great room flowing into a gourmet kitchen appointed with a full Wolf & Sub-Zero appliance package. 
                A gas fireplace with non-combustible hearth anchors the living area, with seamless access to 
                a covered front porch and ocean breezes.
              </p>
              <p className="text-body">
                <strong className="text-charcoal">Third Floor — The Crown Jewel:</strong> An entire level 
                devoted to the Master Sanctuary. Spa-inspired Master Bath with floor-to-ceiling custom tile, 
                a bespoke walk-in closet, and a private Master Deck offering unobstructed ocean views — 
                your personal retreat above it all.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <img
                src={propertyConfig.images.lifestyle[0].src}
                alt={propertyConfig.images.lifestyle[0].alt}
                className="w-full aspect-[4/5] object-cover" loading="lazy" decoding="async" />
              <div className="absolute -bottom-6 -left-6 w-40 h-24 border border-border bg-white flex items-center justify-center p-4">
                <div className="text-center">
                  <p className="text-xs uppercase tracking-wider text-muted-slate mb-1">Beach Block</p>
                  <p className="text-sm font-serif text-charcoal">1.5 Houses to Ocean</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
