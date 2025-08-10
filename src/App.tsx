import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// Pages
import Index from "./pages/Index";
import Estrategia from "./pages/Estrategia";
import Servicios from "./pages/Servicios";
import Suscripciones from "./pages/Suscripciones";
import Nosotros from "./pages/Nosotros";
import Blog from "./pages/Blog";
import Contacto from "./pages/Contacto";
import GravitoVsTemplate from "./pages/GravitoVsTemplate";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

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
          <Route path="/estrategia" element={<Estrategia />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/suscripciones" element={<Suscripciones />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/gravito-vs-template" element={<GravitoVsTemplate />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
