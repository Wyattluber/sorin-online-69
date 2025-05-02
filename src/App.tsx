
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import FeaturesPage from "./pages/FeaturesPage";
import FAQPage from "./pages/FAQPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import GameDetails from "./pages/GameDetails";
import Terms from "./pages/Terms";
import GetKeyPage from "./pages/getkey";
import KeyDisplay from "./pages/KeyDisplay";
import KeyRedirect from "./pages/KeyRedirect";
import KeyGenPage from "./pages/KeyGenPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/getkey" element={<GetKeyPage />} />
          <Route path="/keygen" element={<KeyGenPage />} />
          <Route path="/keygen/:key" element={<KeyGenPage />} />
          <Route path="/keydisplay/:key" element={<KeyDisplay />} />
          <Route path="/keyredirect/:key" element={<KeyRedirect />} />
          <Route path="/game/:id" element={<GameDetails />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
