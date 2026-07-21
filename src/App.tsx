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
const Developments = lazy(() => import("./pages/Developments"));
const ActiveListings = lazy(() => import("./pages/ActiveListings"));
const UnderContract = lazy(() => import("./pages/UnderContract"));
const ComingSoon = lazy(() => import("./pages/ComingSoon"));
const SoldProjects = lazy(() => import("./pages/SoldProjects"));
const Sold = lazy(() => import("./pages/Sold"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Contact = lazy(() => import("./pages/Contact"));
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

// All legacy slugged URLs collapse to /developments/:slug (canonical).
const SlugToCanonical = () => {
  const { slug } = useParams();
  return <Navigate to={`/developments/${slug}`} replace />;
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
            {/* Category pages — must come BEFORE /developments/:slug so the
                dynamic slug route never swallows category segments. */}
            <Route path="/developments" element={<Developments />} />
            <Route path="/developments/active-listings" element={<ActiveListings />} />
            <Route
              path="/developments/current-projects"
              element={<Navigate to="/developments/active-listings" replace />}
            />
            <Route path="/developments/under-contract" element={<UnderContract />} />
            <Route path="/developments/coming-soon" element={<ComingSoon />} />
            <Route path="/developments/sold" element={<SoldProjects />} />
            {/* Legacy slugged URLs → canonical /developments/:slug (301-style). */}
            <Route path="/developments/current-projects/:slug" element={<SlugToCanonical />} />
            <Route path="/developments/sold/:slug" element={<SlugToCanonical />} />
            <Route
              path="/developments/past-projects"
              element={<Navigate to="/developments/sold" replace />}
            />
            <Route path="/developments/past-projects/:slug" element={<SlugToCanonical />} />
            <Route path="/developments/property/:slug" element={<SlugToCanonical />} />
            {/* Canonical dynamic property page — MUST be last under /developments. */}
            <Route path="/developments/:slug" element={<PropertyPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/sold" element={<Sold />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/unsubscribe" element={<Unsubscribe />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminProperties />} />
            <Route path="/admin/properties/new" element={<AdminPropertyForm />} />
            <Route path="/admin/properties/:id/edit" element={<AdminPropertyForm />} />
            <Route path="/admin/preview" element={<PropertyPage />} />
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
