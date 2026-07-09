import { Link } from "react-router-dom";
import GlobalNav from "@/components/GlobalNav";
import Hero from "@/components/Hero";
import HighlightsBar from "@/components/HighlightsBar";
import Vision from "@/components/Vision";
import Specs from "@/components/Specs";
import FloorPlans from "@/components/FloorPlans";
import Gallery from "@/components/Gallery";
import Location from "@/components/Location";
import Register from "@/components/Register";
import GlobalFooter from "@/components/GlobalFooter";
import StickyInquire from "@/components/StickyInquire";


const MorningsideRoad = () => {
  return (
    <main className="min-h-screen">
      <GlobalNav />
      <Hero />
      <HighlightsBar />
      <Vision />
      <Specs />
      <FloorPlans />
      <Gallery />
      <Location />
      <Register />

      {/* ─── Project Navigation ─── */}
      <nav className="border-t border-border py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl flex items-center justify-between">
          <Link to="/developments/current-projects/905-907-brighton-place" className="text-xs tracking-[0.15em] uppercase text-muted-slate hover:text-charcoal transition-colors">
            ← 905-907 Brighton Place
          </Link>
          <Link to="/developments" className="text-xs tracking-[0.15em] uppercase text-muted-slate hover:text-charcoal transition-colors">
            ← Back to Developments
          </Link>
          <Link to="/developments/current-projects/201-28th-street" className="text-xs tracking-[0.15em] uppercase text-muted-slate hover:text-charcoal transition-colors">
            201 28th Street →
          </Link>
        </div>
      </nav>

      <GlobalFooter />
      <StickyInquire />
    </main>
  );
};

export default MorningsideRoad;
