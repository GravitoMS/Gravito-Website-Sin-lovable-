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
import { NavigationProvider } from "./components/NavigationProvider";
import { FooterColorStatus } from "./components/dev/FooterColorStatus";
import { EditModeToggle } from "./components/EditModeToggle";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const AppContent = () => {
  return (
    <NavigationProvider>
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
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {/* Botón de modo de edición (solo visible para admins) */}
      <EditModeToggle />
      
      {/* Estado de protección de colores (solo en desarrollo) */}
      <FooterColorStatus />
    </NavigationProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
