import { propertyConfig } from "@/lib/propertyData";
import { MapPin } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Location = () => {
  const { ref, isVisible } = useScrollReveal();
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${propertyConfig.location.embedQuery || '71+Morningside+Rd,+Ocean+City,+NJ'}`;

  return (
    <section id="location" className="section-padding">
      <div ref={ref} className="container mx-auto px-6 lg:px-12">
        <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Map */}
          <div className="relative h-[400px] lg:h-[500px] bg-muted">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale contrast-125"
              title="Property Location"
            />
          </div>

          {/* Content */}
          <div>
            <p className="label-uppercase mb-4">The Location</p>
            <h2 className="heading-section text-charcoal mb-6">
              Ocean City's Gardens Neighborhood
            </h2>
            <div className="divider mb-8" />

            <div className="flex items-start gap-4 mb-8">
              <MapPin className="w-5 h-5 text-charcoal mt-1 flex-shrink-0" />
              <div>
                <p className="text-lg font-serif text-charcoal">
                  {propertyConfig.name}
                </p>
                <p className="text-body">
                  {propertyConfig.location.city}, {propertyConfig.location.state}
                </p>
              </div>
            </div>

            <ul className="space-y-4">
              {propertyConfig.locationFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2.5 flex-shrink-0" />
                  <span className="text-body">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
