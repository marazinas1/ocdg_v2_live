import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import GlobalNav from "@/components/GlobalNav";
import SEO from "@/components/SEO";
import GlobalFooter from "@/components/GlobalFooter";
import subpageHero from "@/assets/subpage-hero.jpg";

const testimonials = [
  {
    author: "Patti & Ralph Melfi",
    paragraphs: [
      "Patti and I are very happy that we chose Scott Halliday to build our Ocean City dream home.",
      "It is an emotional and financial commitment to build a home and we certainly wanted to work with someone we can trust.",
      "Scott Halliday is a person of integrity that builds quality homes at a great value.",
      "Our experience with Scott began when we found a location and lot that we were interested in perusing as a future home build project. Prior to purchasing the lot, which had a house that would need to be demolished, we also had to be sure that we could build a home we had in mind and stay within our budget.",
      "Time is of the essence when buying and Scott immediately inspected the property, looked at an example of a home we wanted to build, checked into the zoning parameters, and confirmed that we could in fact build this home on that lot, and within our budget.",
      "Scott reviewed the path forward and what steps were necessary in the process. He outlined the standard materials that he uses in his base price and they were of a higher quality than other builders. Some of the most important factors in our decision was Scott's long term experience building in Ocean City and his financial stability, which is NOT a given in today's building market.",
      "Nothing was an issue for Scott — no problems with permits, schedules or budgets! The only additions or changes were at our request, and the costs were always fair.",
      "We HIGHLY recommend Scott Halliday to build your dream home!",
    ],
  },
  {
    author: "Ken and Trudie O'Neill",
    paragraphs: [
      "What a wonderful experience it was working with Patrick Halliday! He was so extremely helpful and patient during the whole process of purchasing our new Halliday-Leonard home.",
      "We received excellent customer service. He is dedicated and very professional. Patrick went the extra mile for us and we so appreciate all his hard work. He returned our calls and e-mails immediately and made sure all our questions were answered. He made settlement a breeze. Our Halliday-Leonard home is beautiful.",
      "We have nothing but praise for Patrick Halliday. Thank you for everything, Patrick.",
    ],
    signoff: "Warm regards, Ken and Trudie O'Neill",
  },
  {
    author: "Mara and Jack LaVoice",
    paragraphs: [
      "My wife and I would just like to express our appreciation for your excellent customer service as we enjoy the 1yr. anniversary of our new home.",
      "From the first day we toured our new Halliday-Leonard home under construction, you have provided wise counsel on all aspects of the construction phase, settlement, and indeed even helpful hints on \"best practices\" for summer rental. Your high level of personal customer service and attention, promptness of communication reply, and dedication to satisfaction of our requests have been extraordinary. Your passion and knowledge of the Ocean City home market have resulted in a wonderful family \"escape\" home and solid investment as well.",
      "Our new Halliday-Leonard home on 4th street is simply gorgeous. The high quality of build and attention to detail is evident in every aspect of our home. The Halliday-Leonard construction team has promptly addressed our one year \"punch list\" of minor repairs, and even provided several \"free of charge\" extra's.",
      "It is refreshing to see the pride your construction team takes in going the extra mile for your customers.",
      "All of our visiting friends comment on the \"family friendly\" and cozy great room/kitchen design, as well as the delight of sitting on any one of our three outside decks.",
      "Again, thank you for making our special vacation home dream come to life. We look forward to many years of happy family memories in Ocean City.",
    ],
    signoff: "Warm regards, Mara and Jack LaVoice",
  },
];

const Testimonials = () => {
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Embla carousel with loop and peek
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  // Handle hash anchor — scroll to specific testimonial slide
  useEffect(() => {
    if (!emblaApi || !location.hash) return;
    const hashMap: Record<string, number> = { "#melfi": 0, "#oneill": 1, "#lavoice": 2 };
    const idx = hashMap[location.hash];
    if (idx !== undefined) {
      setTimeout(() => emblaApi.scrollTo(idx), 300);
    }
  }, [emblaApi, location.hash]);

  return (
    <main className="min-h-screen bg-background">
      <GlobalNav />
      <SEO
        title={"Testimonials — Ocean City Development Group"}
        description={"What clients say about building their dream coastal homes with Ocean City Development Group."}
        path="/testimonials"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "HomeAndConstructionBusiness",
          "@id": "https://oceancitydevelopment.com/#organization",
          name: "Ocean City Development Group",
          url: "https://oceancitydevelopment.com/testimonials",
          review: testimonials.map((t) => ({
            "@type": "Review",
            author: { "@type": "Person", name: t.author },
            reviewBody: t.paragraphs.join(" "),
          })),
        }}
      />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img
          src={subpageHero}
          alt="Ocean City Development Group — Testimonials"
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{ transform: `translateY(${scrollY * 0.25}px)` }} loading="lazy" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        <div className="relative z-10 text-center px-4 animate-fade-in-up">
          <p className="label-uppercase text-white/70 mb-4">What Our Clients Say</p>
          <h1 className="heading-display text-white">Testimonials</h1>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="section-padding overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          <div className="relative">
            {/* Navigation arrows */}
            <button
              onClick={scrollPrev}
              aria-label="Previous testimonial"
              className="absolute -left-2 lg:left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-border shadow-md flex items-center justify-center hover:bg-charcoal hover:text-white transition-all duration-300"
              style={{ borderRadius: "50%" }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              aria-label="Next testimonial"
              className="absolute -right-2 lg:right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-border shadow-md flex items-center justify-center hover:bg-charcoal hover:text-white transition-all duration-300"
              style={{ borderRadius: "50%" }}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Carousel */}
            <div ref={emblaRef} className="overflow-hidden mx-8 lg:mx-14">
              <div className="flex">
                {testimonials.map((t, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 px-4"
                    style={{ flex: "0 0 100%", minWidth: 0 }}
                  >
                    <div className="card-elegant p-8 md:p-12 transition-all duration-500">
                      <svg className="w-8 h-8 mb-6 text-muted-slate opacity-30" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.3 2.5c-1.4.7-2.5 1.6-3.4 2.7C6.9 6.3 6.3 7.5 5.9 8.9c-.4 1.3-.5 2.8-.3 4.3h.1c.5-.5 1.2-.8 2-.8 1 0 1.9.4 2.6 1.1.7.7 1.1 1.6 1.1 2.7 0 1-.4 1.9-1.1 2.6-.7.7-1.6 1.1-2.7 1.1-1.2 0-2.2-.5-3-1.4-.8-1-1.2-2.2-1.2-3.8 0-2 .4-3.8 1.2-5.5.8-1.7 1.9-3.1 3.3-4.2 1.4-1.1 2.9-1.9 4.5-2.3l-.1-.2zm10 0c-1.4.7-2.5 1.6-3.4 2.7-1 1.1-1.6 2.3-2 3.7-.4 1.3-.5 2.8-.3 4.3h.1c.5-.5 1.2-.8 2-.8 1 0 1.9.4 2.6 1.1.7.7 1.1 1.6 1.1 2.7 0 1-.4 1.9-1.1 2.6-.7.7-1.6 1.1-2.7 1.1-1.2 0-2.2-.5-3-1.4-.8-1-1.2-2.2-1.2-3.8 0-2 .4-3.8 1.2-5.5.8-1.7 1.9-3.1 3.3-4.2 1.4-1.1 2.9-1.9 4.5-2.3l-.1-.2z" />
                      </svg>
                      <div className="space-y-4 mb-8 pr-2">
                        {t.paragraphs.map((p, j) => (
                          <p key={j} className="text-body text-base leading-relaxed">
                            {p}
                          </p>
                        ))}
                      </div>
                      <div className="divider mb-4" />
                      <p className="text-sm font-medium text-charcoal">
                        {(t as any).signoff || t.author}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => emblaApi?.scrollTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === selectedIndex ? "bg-charcoal w-6" : "bg-border hover:bg-muted-slate"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="section-padding section-sand">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-3xl text-center">
          <p className="label-uppercase mb-4">Ready to Build?</p>
          <h2 className="heading-section text-charcoal mb-6">Start Your Journey</h2>
          <div className="divider mx-auto mb-8" />
          <p className="text-body text-lg leading-relaxed mb-8">
            Contact us today to discuss your dream home in Ocean City.
          </p>
          <a href="/contact" className="btn-primary">
            Get In Touch
          </a>
        </div>
      </section>

      <GlobalFooter />
    </main>
  );
};

export default Testimonials;
