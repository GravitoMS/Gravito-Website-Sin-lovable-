import React, { useState } from 'react';
import { FadeIn, HoverScale, FadeInScale } from '@/components/ui/SimpleAnimations';
import { EditableHeading, EditableText } from '@/components/ui/EditableAnimations';
import { ArrowRight, CheckCircle, ChevronDown, Star, Users, Target, Zap, Shield, TrendingUp, Globe, Smartphone, Palette, Brain, Map, Puzzle, MessageCircle, Mouse, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Servicios = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Carlos Méndez",
      title: "Dueño, La Mesa Dorada, Restaurante",
      rating: 4,
      quote: "Antes de Gravito, teníamos nuestras redes sociales super descuidadas y no teníamos presencia en Google Maps para nada. Cuando recién nos suscribimos, nos recomendaron actualizar todo el material antiguo que teníamos y específicamente gracias a las sesiones de fotografía que coordinaron e implementaron, nuestro perfil de Google está siempre lleno de reviews de clientes nuevos y las reservas han subido bastante. Literalmente no nos cuesta la suscripción!",
      highlight: "reservas han subido bastante",
      avatar: "👨‍💼"
    },
    {
      name: "Sofía Chen",
      title: "Fundadora, Le Chen Chic, Boutique",
      rating: 5,
      quote: "Digo, como es común, nosotras también teníamos horas de video relacionadas con nuestro negocio como eventos o pasarelas que se quedaron guardadas en el fondo de mi compu volviendolas inútiles. Pero si hubo algo que me encantó, fue el servicio de post-producción de Gravito, ósea nos salvó. Tomaron nuestro material en crudo y lo convirtieron en Reels y contenido semanal como el que se ve en instagram o tiktok. Nuestro engagement se disparó y ya no tengo que pasar mis fines buscando que sí y que no puedo utilizar. ¡Recomendado al 1000!",
      highlight: "engagement se disparó",
      avatar: "👩‍💼"
    },
    {
      name: "Dr. Alejandro Vega",
      title: "Profesionista, ¿Estoy Bien?, Psicología y Bienestar",
      rating: 5,
      quote: "Mira, en su tiempo yo mismo hacía los diseños para mi consultorio y la verdad es que sí se notaba. El problema es que mi marca no proyectaba esa confianza que necesito en mi campo. Ahora tengo todo, o sea desde mantener mi instagram profesional y tener diseños para mi consultorio hasta tener buena presencia y reviews en Google Maps.",
      highlight: "buena presencia y reviews en Google Maps",
      avatar: "👨‍⚕️"
    },
    {
      name: "Laura Torres",
      title: "Gerente, LogiListo, Servicios de Logística",
      rating: 4,
      quote: "Cuando recién inicié, lo que hacíamos era publicar por publicar, no teníamos rumbo fijo y tampoco sabíamos si servía de algo. No estaba muy convencida, pero probamos el 'Impulso GMS' y por primera vez, entendimos qué estábamos haciendo y por qué. Ahora los documentos que nos entregan prácticamente se convirtieron en nuestro norte y de verdad que ya son parte de nuestro equipo.",
      highlight: "se convirtieron en nuestro norte",
      avatar: "👩‍💼"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
  };

  const currentTestimonialData = testimonials[currentTestimonial];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section - Declaración de Principios */}
      <section className="pt-40 pb-20 relative overflow-hidden min-h-screen flex items-center">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center max-w-6xl mx-auto">
            {/* Título Principal - Declaración de Principios */}
            <EditableHeading level={1} delay={0.1} className="text-4xl lg:text-6xl xl:text-7xl font-black text-foreground mb-8 leading-tight">
              Tu{' '}
              <span className="text-primary" style={{
                background: 'linear-gradient(135deg, hsl(162 100% 45%) 0%, hsl(162 100% 55%) 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 20px hsl(162 100% 45% / 0.3)'
              }}>
                crecimiento
              </span>{' '}
              no debería depender de tu tiempo.
            </EditableHeading>
            
            {/* Párrafo de Contexto */}
            <EditableText delay={0.2} className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
              En Gravito, hemos diseñado nuestros servicios para hacer esto una realidad alcanzable. A continuación, encontrarás los planes que te devolverán tu tiempo y potenciarán tu crecimiento.
            </EditableText>
            
            {/* Llamada a la Acción - Scroll */}
            <FadeIn delay={0.3} className="mt-16">
              <div className="flex flex-col items-center space-y-4">
                <div className="text-foreground font-medium text-lg">
                  ▼ Compara los Planes ▼
                </div>
                <ChevronDown className="h-6 w-6 text-muted-foreground" />
              </div>
            </FadeIn>
          </FadeIn>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <div className="flex flex-col items-center animate-bounce" style={{ animationDuration: '2s' }}>
            <Mouse className="w-8 h-8 text-muted-foreground animate-pulse" style={{ animationDuration: '3s' }} />
          </div>
        </div>
      </section>

      {/* Sección Get Started con Tarjetas */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center max-w-4xl mx-auto mb-16">
            <EditableHeading level={2} className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
              Nuestros Servicios Principales
            </EditableHeading>
            <EditableText className="text-lg text-muted-foreground mb-8">
              Descubre las opciones que hemos diseñado para acompañar tu crecimiento digital de manera estratégica y sin riesgo.
            </EditableText>
          </FadeIn>

          {/* Tarjetas de Servicios */}
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Tarjeta Impulso Estratégico */}
            <FadeIn>
              <Card className="border border-primary/20 bg-card hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-8">
                  <div className="flex-1 lg:pr-8">
                    <div className="mb-4">
                      <EditableHeading level={3} className="text-2xl font-bold text-foreground mb-2">Impulso Estratégico</EditableHeading>
                      <EditableText className="text-muted-foreground font-medium">Análisis inicial sin riesgo</EditableText>
                    </div>
                    <EditableText className="text-muted-foreground leading-relaxed mb-6">
                      El punto de entrada más inteligente para tu mundo de presencia digital. Este es un análisis profundo que evalúa y busca mejorar tu presencia digital para identificar la mejor manera de acelerar el crecimiento de tu negocio. La Ventaja Clave: Su costo se descuenta al 100%.
                    </EditableText>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Análisis profundo de tu presencia digital</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">100% Descontable</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Estrategia personalizada</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Recomendación de plan ideal</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 mt-6 lg:mt-0">
                    <Link to="/estrategia">
                      <Button 
                        size="lg" 
                        className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-fast"
                      >
                        Comenzar Impulso Estratégico
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </FadeIn>

            {/* Tarjeta Suscripciones */}
            <FadeIn>
              <Card className="border border-secondary/20 bg-card hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-8">
                  <div className="flex-1 lg:pr-8">
                    <div className="mb-4">
                      <EditableHeading level={3} className="text-2xl font-bold text-foreground mb-2">Suscripciones</EditableHeading>
                      <EditableText className="text-muted-foreground font-medium">Planes mensuales escalables</EditableText>
                    </div>
                    <EditableText className="text-muted-foreground leading-relaxed mb-6">
                      Hemos diseñado tres niveles de servicio para acompañar a tu negocio en cada etapa de su crecimiento digital. Ya sea que busques aliviar tu carga de trabajo o un socio estratégico para tu expansión, aquí encontrarás la solución perfecta.
                    </EditableText>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Nivel 1: Presencia Esencial</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Nivel 2: Crecimiento y Optimización</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Nivel 3: Liderazgo y Expansión</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 mt-6 lg:mt-0">
                    <Link to="/suscripciones">
                      <Button 
                        size="lg" 
                        className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-fast"
                      >
                        Ver Planes de Suscripción
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>
      
      {/* Sección de Testimonios - Carrusel */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <EditableHeading level={2} className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
              La Tranquilidad de Nuestros Clientes
            </EditableHeading>
            
            {/* Sistema de Calificación con Estrellas */}
            <div className="flex justify-center items-center space-x-1 mb-8">
              {[...Array(5)].map((_, index) => (
                <Star 
                  key={index}
                  className={`h-6 w-6 ${
                    index < currentTestimonialData.rating 
                      ? 'text-warning fill-current' 
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
          </FadeIn>

          {/* Carrusel de Testimonios */}
          <div className="max-w-4xl mx-auto relative">
            {/* Navegación con Flechas */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-lg"
            >
              <ChevronLeft className="h-6 w-6 text-foreground" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-lg"
            >
              <ChevronRight className="h-6 w-6 text-foreground" />
            </button>

            {/* Contenido del Testimonio */}
            <FadeInScale key={currentTestimonial} className="bg-card border border-border rounded-2xl p-8 lg:p-12 shadow-lg">
              {/* Testimonio */}
              <div className="text-center mb-8">
                <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  {currentTestimonialData.quote.split('**').map((part, index) => 
                    index % 2 === 1 ? (
                      <span key={index} className="text-info font-semibold">
                        {part}
                      </span>
                    ) : (
                      part
                    )
                  )}
                </p>
              </div>

              {/* Información del Cliente */}
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-2xl">
                  {currentTestimonialData.avatar}
                </div>
                <div className="text-center lg:text-left">
                  <h3 className="font-bold text-foreground text-lg">
                    {currentTestimonialData.name}
                  </h3>
                  <p className="text-muted-foreground">
                    {currentTestimonialData.title}
                  </p>
                </div>
              </div>
            </FadeInScale>

            {/* Puntos de Navegación */}
            <div className="flex justify-center items-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial 
                      ? 'bg-info' 
                      : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center max-w-4xl mx-auto">
            <EditableHeading level={2} className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-6">
              ¿Listo para transformar tu presencia digital?
            </EditableHeading>
            <EditableText className="text-xl lg:text-2xl text-primary-foreground/90 mb-12 leading-relaxed">
              Comienza con nuestro Impulso Estratégico y descubre el poder de una estrategia digital bien estructurada.
            </EditableText>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/estrategia">
                <Button variant="hero-yellow" size="lg" className="text-lg px-10 py-8">
                  Descubre tu Estrategia
                </Button>
              </Link>
                              <Link to="/contacto">
                  <Button variant="outline" size="lg" className="text-lg px-10 py-8 border-hero-yellow text-hero-yellow hover:bg-hero-yellow hover:text-hero-yellow-foreground transition-all duration-fast">
                    Habla con Nosotros
                  </Button>
                </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Servicios;