import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Causes from "./pages/Causes";
import Blog from "./pages/Blog";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Donation from "./pages/Donation";
import Volunteers from "./pages/Volunteers";
import Fundraise from "./pages/Fundraise";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/causes" element={<Causes />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/volunteers" element={<Volunteers />} />
          <Route path="/fundraise" element={<Fundraise />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
