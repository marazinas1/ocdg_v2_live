import { useState } from "react";
import { propertyConfig } from "@/lib/propertyData";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const BentoGrid = ({
  images,
  indexOffset,
  onImageClick,
}: {
  images: { src: string; alt: string }[];
  indexOffset: number;
  onImageClick: (globalIndex: number) => void;
}) => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      {images.map((image, index) => (
        <div
          key={index}
          className={`cursor-pointer overflow-hidden group transition-all duration-700 ${
            index === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""
          } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: `${index * 100}ms` }}
          onClick={() => onImageClick(indexOffset + index)}
        >
          <div className="relative h-full">
            <img
              src={image.src}
              alt={image.alt}
              className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${
                index === 0 ? "aspect-[4/3]" : "aspect-square"
              }`} loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-12 h-12 border border-white rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">+</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();

  const exteriorImages = [...propertyConfig.images.exterior, ...propertyConfig.images.lifestyle];
  const interiorImages = propertyConfig.images.interior;
  const allImages = [...exteriorImages, ...interiorImages];

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % allImages.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);

  return (
    <section id="gallery" className="section-padding section-sand">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        {/* Header */}
        <div ref={headerRef} className={`text-center max-w-2xl mx-auto mb-8 md:mb-12 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="label-uppercase mb-4">Gallery</p>
          <h2 className="heading-section text-charcoal">Immersive Visualizations</h2>
        </div>

        {/* Exterior Perspectives */}
        <div className="mb-12 md:mb-16">
          <p className="label-uppercase mb-6 text-center">Exterior Perspectives</p>
          <BentoGrid images={exteriorImages} indexOffset={0} onImageClick={openLightbox} />
        </div>

        {/* Interior Design & Lifestyle */}
        <div>
          <p className="label-uppercase mb-6 text-center">Interior Design & Lifestyle</p>
          <BentoGrid images={interiorImages} indexOffset={exteriorImages.length} onImageClick={openLightbox} />
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-10" onClick={closeLightbox}>
            <X className="w-8 h-8" />
          </button>
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
          >
            <ChevronRight className="w-10 h-10" />
          </button>
          <img
            src={allImages[currentIndex].src}
            alt={allImages[currentIndex].alt}
            className="max-w-[90vw] max-h-[85vh] object-contain"
            loading="lazy" decoding="async" onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {currentIndex + 1} / {allImages.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
