import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { lazy, Suspense } from "react";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";

// Lazy-load all non-landing pages so the initial bundle stays small.
// The landing page (Index) loads eagerly because it's the most common entry.
const About = lazy(() => import("./pages/About"));
const MorningsideRoad = lazy(() => import("./pages/MorningsideRoad"));
const Developments = lazy(() => import("./pages/Developments"));
const ActiveListings = lazy(() => import("./pages/ActiveListings"));
const UnderContract = lazy(() => import("./pages/UnderContract"));
const ComingSoon = lazy(() => import("./pages/ComingSoon"));
const SoldProjects = lazy(() => import("./pages/SoldProjects"));
const Sold = lazy(() => import("./pages/Sold"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Contact = lazy(() => import("./pages/Contact"));
const TwentyEighthStreet = lazy(() => import("./pages/TwentyEighthStreet"));
const DundeePage = lazy(() => import("./pages/DundeePage"));
const AsburyAve = lazy(() => import("./pages/AsburyAve"));
const SimpsonAve = lazy(() => import("./pages/SimpsonAve"));
const Asbury4138 = lazy(() => import("./pages/Asbury4138"));
const Central1100 = lazy(() => import("./pages/Central1100"));
const BarkDrive209 = lazy(() => import("./pages/BarkDrive209"));
const Asbury5516 = lazy(() => import("./pages/Asbury5516"));
const Walnut6 = lazy(() => import("./pages/Walnut6"));
const Asbury2700 = lazy(() => import("./pages/Asbury2700"));
const Arkansas38 = lazy(() => import("./pages/Arkansas38"));
const Waverly522 = lazy(() => import("./pages/Waverly522"));
const Brighton905907 = lazy(() => import("./pages/Brighton905907"));
const Waterway13 = lazy(() => import("./pages/Waterway13"));
const Bay3112 = lazy(() => import("./pages/Bay3112"));
const Bayland3213 = lazy(() => import("./pages/Bayland3213"));
const West1651 = lazy(() => import("./pages/West1651"));
const Glenwood1901 = lazy(() => import("./pages/Glenwood1901"));
const StCharles844 = lazy(() => import("./pages/StCharles844"));
const Rosemar1909 = lazy(() => import("./pages/Rosemar1909"));
const Bay5404 = lazy(() => import("./pages/Bay5404"));
const ArchiveDelancey918 = lazy(() => import("./pages/ArchiveDelancey918"));
const ArchiveAnchor109 = lazy(() => import("./pages/ArchiveAnchor109"));
const ArchiveAnchor111 = lazy(() => import("./pages/ArchiveAnchor111"));
const ArchiveAnchor113 = lazy(() => import("./pages/ArchiveAnchor113"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const Unsubscribe = lazy(() => import("./pages/Unsubscribe"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PropertyPage = lazy(() => import("./pages/PropertyPage"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminProperties = lazy(() => import("./pages/admin/AdminProperties"));
const AdminPropertyForm = lazy(() => import("./pages/admin/AdminPropertyForm"));

const queryClient = new QueryClient();

const PageFallback = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-charcoal/20 border-t-charcoal rounded-full animate-spin" />
  </div>
);

const PastProjectsRedirect = () => {
  const { slug } = useParams();
  return <Navigate to={`/developments/sold/${slug}`} replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/developments" element={<Developments />} />
            <Route path="/developments/active-listings" element={<ActiveListings />} />
            <Route path="/developments/current-projects" element={<ActiveListings />} />
            <Route path="/developments/under-contract" element={<UnderContract />} />
            <Route path="/developments/coming-soon" element={<ComingSoon />} />
            <Route path="/developments/sold" element={<SoldProjects />} />
            <Route path="/developments/current-projects/71-morningside-road" element={<MorningsideRoad />} />
            <Route path="/developments/current-projects/201-28th-street" element={<TwentyEighthStreet />} />
            <Route path="/developments/current-projects/19-e-dundee-road" element={<DundeePage />} />
            <Route path="/developments/current-projects/2029-asbury-ave" element={<AsburyAve />} />
            <Route path="/developments/current-projects/1113-simpson-ave" element={<SimpsonAve />} />
            <Route path="/developments/current-projects/4138-asbury-ave" element={<Asbury4138 />} />
            <Route path="/developments/current-projects/1100-central-ave" element={<Central1100 />} />
            <Route
              path="/developments/current-projects/209-bark-drive"
              element={<Navigate to="/developments/sold/209-bark-drive" replace />}
            />
            <Route path="/developments/sold/209-bark-drive" element={<BarkDrive209 />} />
            <Route
              path="/developments/current-projects/5516-asbury-ave"
              element={<Navigate to="/developments/sold/5516-asbury-ave" replace />}
            />
            <Route path="/developments/sold/5516-asbury-ave" element={<Asbury5516 />} />
            <Route path="/developments/current-projects/6-walnut-road" element={<Walnut6 />} />
            <Route
              path="/developments/current-projects/38-arkansas-ave"
              element={<Navigate to="/developments/sold/38-arkansas-ave" replace />}
            />
            <Route path="/developments/sold/38-arkansas-ave" element={<Arkansas38 />} />
            <Route path="/developments/current-projects/522-waverly-blvd" element={<Waverly522 />} />
            <Route path="/developments/current-projects/905-907-brighton-place" element={<Brighton905907 />} />
            <Route path="/developments/current-projects/13-waterway-road" element={<Waterway13 />} />
            <Route path="/developments/current-projects/3112-bay-ave" element={<Bay3112 />} />
            <Route path="/developments/current-projects/3213-bayland-drive" element={<Bayland3213 />} />
            <Route path="/developments/sold/2700-asbury-ave" element={<Asbury2700 />} />
            <Route path="/developments/sold/1651-west-ave" element={<West1651 />} />
            <Route path="/developments/sold/1901-glenwood-drive" element={<Glenwood1901 />} />
            <Route path="/developments/sold/844-st-charles-place" element={<StCharles844 />} />
            <Route path="/developments/sold/1909-rosemar-lane" element={<Rosemar1909 />} />
            <Route path="/developments/sold/5404-bay-ave" element={<Bay5404 />} />
            <Route path="/developments/sold/918-delancey-place" element={<ArchiveDelancey918 />} />
            <Route path="/developments/sold/109-anchor-road" element={<ArchiveAnchor109 />} />
            <Route path="/developments/sold/111-anchor-road" element={<ArchiveAnchor111 />} />
            <Route path="/developments/sold/113-anchor-road" element={<ArchiveAnchor113 />} />
            <Route path="/developments/property/:slug" element={<PropertyPage />} />
            {/* Backward-compat aliases for old /past-projects URLs */}
            <Route path="/developments/past-projects" element={<Navigate to="/developments/sold" replace />} />
            <Route path="/developments/past-projects/:slug" element={<PastProjectsRedirect />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/sold" element={<Sold />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/unsubscribe" element={<Unsubscribe />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminProperties />} />
            <Route path="/admin/properties/new" element={<AdminPropertyForm />} />
            <Route path="/admin/properties/:id/edit" element={<AdminPropertyForm />} />
            <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
