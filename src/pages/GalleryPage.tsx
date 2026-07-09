import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GlobalNav from "@/components/GlobalNav";
import SEO from "@/components/SEO";
import GlobalFooter from "@/components/GlobalFooter";
import subpageHero from "@/assets/subpage-hero.jpg";
import { X, ChevronLeft, ChevronRight } from "lucide-react";


import {
  type GalleryImage,
  type ProjectImages,
  type PhotoProject,
  projects,
  photoProjects,
  renderImages,
  allImages,
} from "@/lib/galleryProjects";


const PROJECTS_PER_BATCH = 2;

const GalleryTile = ({
  image,
  className,
  aspectClass,
  onClick,
}: {
  image: GalleryImage;
  className?: string;
  aspectClass: string;
  onClick: () => void;
}) => (
  <div
    className={`cursor-pointer overflow-hidden group ${className || ""}`}
    onClick={onClick}
  >
    <div className="relative h-full">
      <img
        src={image.src}
        alt={`${image.project} — ${image.alt}`}
        loading="lazy"
        decoding="async"
        className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${aspectClass}`}
      />
      <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-charcoal/70 to-transparent">
        <span className="text-white text-xs md:text-sm font-light tracking-wider uppercase">
          {image.project}
        </span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-10 h-10 border border-white rounded-full flex items-center justify-center">
          <span className="text-white text-xl">+</span>
        </div>
      </div>
    </div>
  </div>
);

/**
 * Renders a single project's 12 images in a collage layout:
 * Row 1: 1 large (2/3) + 2 stacked small (1/3)  — ext[0], ext[1], ext[2]
 * Row 2: 3 equal columns                         — ext[3], ext[4], ext[5]
 * Row 3: 1 full-width hero                       — int[0] (living room)
 * Row 4: 3 equal columns                         — int[1], int[2], int[3]
 * Row 5: 2 equal columns                         — int[4], int[5]
 */
const ProjectCollage = ({
  project,
  globalOffset,
  onImageClick,
}: {
  project: ProjectImages;
  globalOffset: number;
  onImageClick: (globalIndex: number) => void;
}) => {
  const ext = project.exterior;
  const int = project.interior;

  // Calculate global index for a given local position
  const gi = (localIndex: number) => globalOffset + localIndex;

  return (
    <div className="mb-16 last:mb-0">
      {/* Project heading */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 sm:gap-4">
        <div>
          <p className="label-uppercase mb-1">Exterior & Interior</p>
          <h2 className="heading-section text-charcoal text-xl">{project.name}</h2>
        </div>
        <Link
          to={project.link}
          className="btn-outline text-xs inline-flex flex-shrink-0"
        >
          View Project
        </Link>
      </div>

      <div className="space-y-3 md:space-y-4">
        {/* Row 1: 1 large (col-span-2, row-span-2) + 2 stacked */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          <div className="col-span-2 md:col-span-2 md:row-span-2">
            <GalleryTile image={ext[0]} aspectClass="aspect-[4/3]" onClick={() => onImageClick(gi(0))} />
          </div>
          <div>
            <GalleryTile image={ext[1]} aspectClass="aspect-[4/3]" onClick={() => onImageClick(gi(1))} />
          </div>
          <div>
            <GalleryTile image={ext[2]} aspectClass="aspect-[4/3]" onClick={() => onImageClick(gi(2))} />
          </div>
        </div>

        {/* Row 2: 3 equal close-shot exteriors */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          <div className="col-span-2 md:col-span-1">
            <GalleryTile image={ext[3]} aspectClass="aspect-[16/10] md:aspect-square" onClick={() => onImageClick(gi(3))} />
          </div>
          <GalleryTile image={ext[4]} aspectClass="aspect-square" onClick={() => onImageClick(gi(4))} />
          <GalleryTile image={ext[5]} aspectClass="aspect-square" onClick={() => onImageClick(gi(5))} />
        </div>

        {/* Row 3: Full-width interior hero (living room) */}
        <div>
          <GalleryTile image={int[0]} aspectClass="aspect-[16/10] md:aspect-[21/9]" onClick={() => onImageClick(gi(6))} />
        </div>

        {/* Row 4: 3 interior images */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          <div className="col-span-2 md:col-span-1">
            <GalleryTile image={int[1]} aspectClass="aspect-[4/3] md:aspect-[3/4]" onClick={() => onImageClick(gi(7))} />
          </div>
          <GalleryTile image={int[2]} aspectClass="aspect-[3/4]" onClick={() => onImageClick(gi(8))} />
          <GalleryTile image={int[3]} aspectClass="aspect-[3/4]" onClick={() => onImageClick(gi(9))} />
        </div>

        {/* Row 5: 2 interior images side by side */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <GalleryTile image={int[4]} aspectClass="aspect-[4/3]" onClick={() => onImageClick(gi(10))} />
          <GalleryTile image={int[5]} aspectClass="aspect-[4/3]" onClick={() => onImageClick(gi(11))} />
        </div>
      </div>
    </div>
  );
};


/**
 * Renders a sold home's 16 real photographs as a 4×4 grid (responsive).
 * Used for projects with completed photo sessions, in addition to (or instead of) renders.
 */
const PhotoGrid = ({
  project,
  globalOffset,
  onImageClick,
}: {
  project: PhotoProject;
  globalOffset: number;
  onImageClick: (globalIndex: number) => void;
}) => {
  return (
    <div className="mb-16 last:mb-0">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 sm:gap-4">
        <div>
          <p className="label-uppercase mb-1">Photography · Sold</p>
          <h2 className="heading-section text-charcoal text-xl">{project.name}</h2>
        </div>
        <Link to={project.link} className="btn-outline text-xs inline-flex flex-shrink-0">
          View Project
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
        {project.images.map((image, idx) => {
          // Mobile rhythm: every 5th image (0, 5, 10, 15) spans full width with cinematic ratio.
          // On sm+ all images are uniform squares.
          const isMobileFull = idx % 5 === 0;
          return (
            <div
              key={idx}
              className={isMobileFull ? "col-span-2 sm:col-span-1" : ""}
            >
              <GalleryTile
                image={image}
                aspectClass={
                  isMobileFull
                    ? "aspect-[16/10] sm:aspect-square"
                    : "aspect-square"
                }
                onClick={() => onImageClick(globalOffset + idx)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const GalleryPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleProjectCount, setVisibleProjectCount] = useState(PROJECTS_PER_BATCH);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Build a unified block list: render-collage + photo-grid blocks in order.
  // Render projects come first (active listings), then sold/photo homes.
  type Block =
    | { kind: "render"; project: ProjectImages; offset: number }
    | { kind: "photo"; project: PhotoProject; offset: number };
  const blocks: Block[] = [
    ...projects.map((p, i) => ({ kind: "render" as const, project: p, offset: i * 12 })),
    ...photoProjects.map((p, i) => ({ kind: "photo" as const, project: p, offset: renderImages.length + i * 16 })),
  ];
  const visibleBlocks = blocks.slice(0, visibleProjectCount);
  const hasMore = visibleProjectCount < blocks.length;

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

  const loadMore = () => {
    setVisibleProjectCount((prev) => Math.min(prev + PROJECTS_PER_BATCH, blocks.length));
  };

  return (
    <main className="min-h-screen bg-background">
      <GlobalNav />
      <SEO title={"Gallery — Ocean City Luxury Home Portfolio"} description={"Curated renderings and photography of luxury custom homes by Ocean City Development Group."} path="/gallery" />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img
          src={subpageHero}
          alt="Gallery — Ocean City Development Group"
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{ transform: `translateY(${scrollY * 0.25}px)` }}
          fetchPriority="high"
          decoding="async"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        <div className="relative z-10 text-center px-4 animate-fade-in-up">
          <p className="label-uppercase text-white/70 mb-4">Our Work</p>
          <h1 className="heading-display text-white">Gallery</h1>
                  </div>
      </section>

      {/* Gallery Collage */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          {visibleBlocks.map((block) =>
            block.kind === "render" ? (
              <ProjectCollage
                key={`render-${block.project.name}`}
                project={block.project}
                globalOffset={block.offset}
                onImageClick={openLightbox}
              />
            ) : (
              <PhotoGrid
                key={`photo-${block.project.name}`}
                project={block.project}
                globalOffset={block.offset}
                onImageClick={openLightbox}
              />
            )
          )}

          {/* Load More */}
          {hasMore && (
            <div className="text-center mt-4">
              <button onClick={loadMore} className="btn-outline text-xs inline-flex">
                See More Images
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button aria-label="Close gallery" className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-10" onClick={closeLightbox}>
            <X className="w-8 h-8" />
          </button>
          <button aria-label="Previous image" className="absolute left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors z-10" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button aria-label="Next image" className="absolute right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors z-10" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
            <ChevronRight className="w-10 h-10" />
          </button>
          <img src={allImages[currentIndex].src} alt={allImages[currentIndex].alt} className="max-w-[90vw] max-h-[85vh] object-contain" decoding="async" loading="lazy" onClick={(e) => e.stopPropagation()} />
          {/* Preload prev/next so lightbox feels instant */}
          <img src={allImages[(currentIndex + 1) % allImages.length].src} alt="" className="hidden" aria-hidden="true" loading="lazy" decoding="async" />
          <img src={allImages[(currentIndex - 1 + allImages.length) % allImages.length].src} alt="" className="hidden" aria-hidden="true" loading="lazy" decoding="async" />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <p className="text-white/80 text-sm font-medium">{allImages[currentIndex].project}</p>
            <p className="text-white/50 text-xs mt-1">{currentIndex + 1} / {allImages.length}</p>
          </div>
        </div>
      )}

      <GlobalFooter />
    </main>
  );
};

export default GalleryPage;
