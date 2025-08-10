import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mouse, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { FadeInUp, FadeInUpStaggered, FadeInSide, FadeInScale, HoverScale, HoverLift, HoverGlow, FadeInOnScroll, SlideInOnScroll, LoadingPulse, LoadingBounce, FadeInUpWithHover, StaggeredGroup } from "@/components/ui/AnimatedComponents";
import { EditableText } from "@/components/EditableText";
import { useEditableContent } from "@/hooks/useEditableContent";

import { ANIMATION_DURATIONS, ANIMATION_DELAYS, EASING_FUNCTIONS } from '@/lib/animations';

const IndexWithEdit = () => {
  const { getContent } = useEditableContent({ page: 'index' });

  // Memoizar los datos de servicios para evitar re-creaciones
  const services = useMemo(() => [{
    title: "Decisiones Basadas en Datos",
    description: "Monitoreamos y analizamos constantemente el rendimiento de tus redes sociales para tomar decisiones inteligentes, no suposiciones."
  }, {
    title: "Una Hoja de Ruta Clara",
    description: "Convertimos esos datos en una estrategia personalizada y comprobada para tu negocio, entregándote el plan de acción que seguiremos de una manera visual y fácil de entender cada mes."
  }, {
    title: "Contenido que Conecta",
    description: "Basados en la estrategia, creamos contenido atractivo y relevante que resuena para tu audiencia diseñada para generar confianza, iniciar conversaciones y construir una comunidad alrededor de tu negocio."
  }, {
    title: "Crecimiento de la Comunidad",
    description: "Gestionamos la interacción diaria con tus clientes y seguidores, convirtiendo a tu audiencia pasiva en una comunidad activa y comprometida con tu marca."
  }], []);

  return <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with Spline Background */}
      <section className="relative overflow-hidden bg-muted">
        {/* Spline Background */}
        <div className="absolute inset-0 w-full h-full">
          <iframe 
            src="https://my.spline.design/waveform-YSe8p0A6zP9xanzxuXbn1y8l/" 
            frameBorder="0" 
            width="100%" 
            height="100%" 
            className="absolute inset-0" 
            style={{
              border: 'none'
            }} 
          />
          {/* Subtle blur overlay to reduce competition with text */}
          <div className="absolute inset-0 bg-muted/20 backdrop-blur-[1px]"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="container mx-auto px-6 py-20 lg:py-32">
            <FadeInUp 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center gap-12"
            >
              <div className="max-w-4xl">
                <FadeInUp 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-5xl lg:text-7xl font-black text-foreground mb-8 leading-none"
                >
                  <EditableText
                    id="index-hero-title"
                    initialValue="GESTIÓN INTEGRAL DE TU PRESENCIA DIGITAL"
                    tag="div"
                    page="index"
                    className="text-5xl lg:text-7xl font-black text-foreground leading-none"
                  />
                </FadeInUp>
                <FadeInUp 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-5xl mx-auto"
                >
                  <EditableText
                    id="index-hero-subtitle"
                    initialValue="Ahorras tiempo y dinero para tu negocio, mientras nosotros nos encargamos de todo."
                    tag="div"
                    page="index"
                    className="text-xl lg:text-2xl text-muted-foreground"
                  />
                </FadeInUp>
                <FadeInUp 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-col sm:flex-row justify-center gap-6"
                >
                  <Link to="/estrategia">
                    <Button variant="hero-yellow" size="lg" className="text-lg px-10 py-8">
                      Descubre tu Estrategia
                    </Button>
                  </Link>
                  <Link to="/servicios">
                    <Button variant="hero-green" size="lg" className="text-lg px-10 py-8">
                      Ver Nuestros Servicios
                    </Button>
                  </Link>
                </FadeInUp>
              </div>
            </FadeInUp>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <FadeInUp 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col items-center gap-2 text-muted-foreground"
            >
              <span className="text-sm">Desliza para explorar</span>
              <Mouse className="w-6 h-6 animate-bounce" />
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-6">
          <FadeInUp 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <EditableText
              id="index-services-title"
              initialValue="Nuestros Servicios"
              tag="h2"
              page="index"
              className="text-4xl lg:text-6xl font-black text-foreground mb-6"
            />
            <EditableText
              id="index-services-subtitle"
              initialValue="Todo lo que necesitas para tu presencia digital"
              tag="p"
              page="index"
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            />
          </FadeInUp>

          <FadeInUpStaggered
            items={services}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            renderItem={(service, index) => (
              <FadeInScale
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: EASING_FUNCTIONS.easeOutBack
                }}
                className="group"
              >
                <HoverLift className="bg-card border border-border rounded-2xl p-8 h-full">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </HoverLift>
              </FadeInScale>
            )}
          />
        </div>
      </section>

      <Footer />
    </div>;
};

export default IndexWithEdit;
