import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mouse, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { FadeInUp, FadeInUpStaggered, FadeInSide, FadeInScale, HoverScale, HoverLift, HoverGlow, FadeInOnScroll, SlideInOnScroll, LoadingPulse, LoadingBounce, FadeInUpWithHover, StaggeredGroup } from "@/components/ui/AnimatedComponents";
import ServicesCarousel from "@/components/ServicesCarousel";

import { ANIMATION_DURATIONS, ANIMATION_DELAYS, EASING_FUNCTIONS } from '@/lib/animations';
// Sistema centralizado importado desde @/lib

const Index = () => {
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
                  GESTIÓN
                  <br />
                  INTEGRAL DE TU
                  <br />
                  <span className="text-primary">PRESENCIA DIGITAL</span>
                </FadeInUp>
                <FadeInUp 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-5xl mx-auto"
                >
                  Ahorras tiempo y dinero para tu negocio, mientras nosotros nos encargamos de todo.
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
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
            <div className="flex flex-col items-center animate-bounce" style={{ animationDuration: '2s' }}>
              <Mouse className="w-8 h-8 text-muted-foreground animate-pulse" style={{ animationDuration: '3s' }} />
            </div>
          </div>
        </div>
        
        {/* Smooth gradient transition to normal background */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/60 to-transparent z-20 pointer-events-none"></div>
      </section>

      {/* Who We Are Section - Normal Background */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeInUp
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-6xl lg:text-8xl font-black text-foreground mb-8 leading-none">
                ¿QUIÉNES
                <br />
                SOMOS?
              </h2>
              <div className="space-y-6 mb-12 max-w-xl">
                <p className="text-xl lg:text-2xl text-muted-foreground">Somos la agencia de consultoría y gestión digital que actúa como tu departamento de marketing externo.</p>
                
                <div className="flex justify-center">
                  <div className="w-16 h-px bg-border"></div>
                </div>
                
                <p className="text-xl lg:text-2xl text-muted-foreground">No solo gestionamos tus redes. Integramos nuestra consultoría estratégica con un ecosistema de servicios de valor y tecnología de IA, para ejecutar y entregar una hoja de ruta clara que impulse el crecimiento de tu negocio.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/nosotros">
                  <Button size="lg" className="text-lg px-10 py-8 border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background transition-all duration-fast">
                    Más Sobre Nosotros
                  </Button>
                </Link>
                <Link to="/servicios">
                  <Button variant="hero-green" size="lg" className="text-lg px-10 py-8">
                    Ver Nuestros Servicios
                  </Button>
                </Link>
              </div>
            </FadeInUp>
            
            <FadeInUp 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <FadeInUp 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="stats-card highlight-primary"
              >
                <h3 className="text-lg font-semibold mb-2">Retención del 2024</h3>
                <div className="text-6xl font-black">87%</div>
              </FadeInUp>
              
              <FadeInUp 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="stats-card"
              >
                <h3 className="text-lg font-semibold mb-2 text-muted-foreground">Experiencia Combinada</h3>
                <div className="text-6xl font-black">16 años</div>
              </FadeInUp>
              
              <FadeInUp 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="stats-card highlight-secondary"
              >
                <h3 className="text-lg font-semibold mb-2">Servicios Incluidos</h3>
                <div className="text-6xl font-black">+18</div>
              </FadeInUp>
              
              <FadeInUp 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="stats-card"
              >
                <h3 className="text-lg font-semibold mb-2 text-muted-foreground">Expertos por Cliente</h3>
                <div className="text-6xl font-black">+4</div>
              </FadeInUp>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-6 py-20">
        <FadeInUp 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl lg:text-6xl font-black text-center mb-16"
        >
          LO QUE HACEMOS POR TI
          <div className="w-32 h-1 bg-secondary rounded-full mx-auto mt-4"></div>
        </FadeInUp>
        <ServicesCarousel />
      </section>

      {/* Sección CTA Final - Cerrador de Ventas Experto */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6">
          <FadeInUp 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Encabezado - El Reaseguro */}
            <FadeInUp 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-6"
            >
              Comienza sin Riesgo
            </FadeInUp>

            {/* Subtítulo - La Guía */}
            <FadeInUp 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-xl lg:text-2xl text-primary-foreground/90 mb-12 leading-relaxed"
            >
              Sabemos que es mucha información. Por eso diseñamos la manera perfecta y sin riesgo para que obtengas eso que tanto te hace falta: <span className="font-bold">Tranquilidad</span>
            </FadeInUp>

            {/* Botón Único - Clon del Hero Section */}
            <FadeInUp 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <Link to="/estrategia">
                <Button variant="hero-yellow" size="lg" className="text-lg px-10 py-8">
                  Descubre tu Estrategia
                </Button>
              </Link>
            </FadeInUp>
          </FadeInUp>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>;
};
export default Index;