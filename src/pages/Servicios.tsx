import React, { useState } from 'react';
import { FadeInUp, FadeInUpStaggered, FadeInSide, FadeInScale, HoverScale, HoverLift, HoverGlow, FadeInOnScroll, SlideInOnScroll, LoadingPulse, LoadingBounce, FadeInUpWithHover, StaggeredGroup } from '@/components/ui/AnimatedComponents';
import { ArrowRight, CheckCircle, ChevronDown, Star, Users, Target, Zap, Shield, TrendingUp, Globe, Smartphone, Palette, Brain, Map, Puzzle, MessageCircle, Mouse, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { ANIMATION_DURATIONS, ANIMATION_DELAYS, EASING_FUNCTIONS } from '@/lib/animations';
// Sistema centralizado importado desde @/lib

const Servicios = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Carlos Mendoza",
      title: "Fundador de TechFlow",
      rating: 5,
      quote: "Nuestro marketing estaba disperso, con baja participación en redes sociales, tráfico web deficiente y alcance por email inefectivo. Desde que nos suscribimos, hemos experimentado un **incremento del 300%** en alcance orgánico, y las interacciones con clientes han sido más significativas que nunca.",
      highlight: "incremento del 300%",
      avatar: "👨‍💼"
    },
    {
      name: "Ana Rodríguez",
      title: "Directora de Marketing en InnovateCorp",
      rating: 5,
      quote: "Antes de Gravito, perdíamos tiempo en tareas repetitivas y no teníamos una estrategia clara. Ahora hemos logrado un **aumento del 250%** en conversiones y hemos reducido nuestro tiempo de gestión en un 70%. ¡Es increíble!",
      highlight: "aumento del 250%",
      avatar: "👩‍💼"
    },
    {
      name: "Miguel Torres",
      title: "CEO de DigitalGrowth",
      rating: 5,
      quote: "Nuestra presencia digital era inconsistente y no generaba resultados. Con Gravito, hemos visto un **crecimiento del 400%** en seguidores orgánicos y un incremento del 180% en leads calificados. ¡Superaron todas nuestras expectativas!",
      highlight: "crecimiento del 400%",
      avatar: "👨‍💻"
    },
    {
      name: "Laura Sánchez",
      title: "Emprendedora Digital",
      rating: 5,
      quote: "Como emprendedora, no tenía tiempo para gestionar todo el marketing. Gravito transformó completamente nuestro negocio con un **incremento del 350%** en ventas online y una mejora del 200% en engagement. ¡Son simplemente excepcionales!",
      highlight: "incremento del 350%",
      avatar: "👩‍💻"
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
          <FadeInUp 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-6xl mx-auto"
          >
            {/* Título Principal - Declaración de Principios */}
            <FadeInUp 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl lg:text-6xl xl:text-7xl font-black text-foreground mb-8 leading-tight"
            >
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
            </FadeInUp>
            
            {/* Párrafo de Contexto */}
            <FadeInUp 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12"
            >
              En Gravito, hemos diseñado nuestros servicios para hacer esto una realidad alcanzable. A continuación, encontrarás los planes que te devolverán tu tiempo y potenciarán tu crecimiento.
            </FadeInUp>
            
            {/* Llamada a la Acción - Scroll */}
            <FadeInUp 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16"
            >
              <div className="flex flex-col items-center space-y-4">
                <FadeInUp
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-foreground font-medium text-lg"
                >
                  ▼ Compara los Planes ▼
                </FadeInUp>
                <FadeInUp
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <ChevronDown className="h-6 w-6 text-muted-foreground" />
                </FadeInUp>
              </div>
            </FadeInUp>
          </FadeInUp>
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
          <FadeInUp 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
              Nuestros Servicios Principales
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Descubre las opciones que hemos diseñado para acompañar tu crecimiento digital de manera estratégica y sin riesgo.
            </p>
          </FadeInUp>

          {/* Tarjetas de Servicios */}
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Tarjeta Impulso Estratégico */}
            <FadeInUp
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="border border-primary/20 bg-card hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-8">
                  <div className="flex-1 lg:pr-8">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-foreground mb-2">Impulso Estratégico</h3>
                      <p className="text-muted-foreground font-medium">Análisis inicial sin riesgo</p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      El punto de entrada más inteligente para tu mundo de presencia digital. Este es un análisis profundo que evalúa y busca mejorar tu presencia digital para identificar la mejor manera de acelerar el crecimiento de tu negocio. La Ventaja Clave: Su costo se descuenta al 100%.
                    </p>
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
            </FadeInUp>

            {/* Tarjeta Suscripciones */}
            <FadeInUp
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="border border-secondary/20 bg-card hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-8">
                  <div className="flex-1 lg:pr-8">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-foreground mb-2">Suscripciones</h3>
                      <p className="text-muted-foreground font-medium">Planes mensuales escalables</p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Hemos diseñado tres niveles de servicio para acompañar a tu negocio en cada etapa de su crecimiento digital. Ya sea que busques aliviar tu carga de trabajo o un socio estratégico para tu expansión, aquí encontrarás la solución perfecta.
                    </p>
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
            </FadeInUp>
          </div>
        </div>
      </section>
      
      {/* Sección de Testimonios - Carrusel */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-6">
          <FadeInUp 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
              Historias de Éxito de Nuestros Clientes Felices
            </h2>
            
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
          </FadeInUp>

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
            <FadeInScale
              key={currentTestimonial}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-card border border-border rounded-2xl p-8 lg:p-12 shadow-lg"
            >
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

      {/* Sección FAQ */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-6">
          <FadeInUp 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
              FAQ
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hemos respondido las preguntas más comunes para ayudarte a obtener claridad—rápida y confiadamente.
            </p>
          </FadeInUp>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "¿Qué servicios ofrecen?",
                answer: "Ofrecemos una gama completa de servicios digitales incluyendo marketing digital, gestión de redes sociales, diseño y branding, y consultoría estratégica. Cada servicio está diseñado para impulsar tu presencia online y maximizar tu ROI."
              },
              {
                question: "¿Cómo funciona el Impulso Estratégico?",
                answer: "El Impulso Estratégico es tu punto de entrada sin riesgo al mundo del marketing digital. Realizamos un análisis profundo de tu presencia digital actual y te proporcionamos una estrategia personalizada. El costo se descuenta 100% de tu primera factura si decides continuar con nuestros servicios."
              },
              {
                question: "¿Puedo cambiar de plan en cualquier momento?",
                answer: "Sí, ofrecemos total flexibilidad. Puedes cambiar de plan en cualquier momento, sin contratos a largo plazo. Si tu negocio crece y necesitas más servicios, puedes subir de plan fácilmente."
              },
              {
                question: "¿Qué incluyen los planes de suscripción?",
                answer: "Nuestros planes incluyen gestión de redes sociales, diseño de contenido, análisis de métricas, reportes mensuales, y soporte dedicado. Cada plan está diseñado para acompañar tu negocio en diferentes etapas de crecimiento."
              }
            ].map((faq, index) => (
              <FadeInUp
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border border-border hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer list-none">
                        <h3 className="text-lg font-semibold text-foreground group-open:text-primary transition-colors">
                          {faq.question}
                        </h3>
                        <div className="flex-shrink-0 ml-4">
                          <div className="w-6 h-6 flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-current rounded-full relative">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-2 h-0.5 bg-current transition-transform duration-fast group-open:rotate-90"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </summary>
                      <div className="mt-4 pt-4 border-t border-border">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </details>
                  </CardContent>
                </Card>
              </FadeInUp>
            ))}
          </div>
        </div>
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
              Ahorra Tiempo Dinero y Esfuerzo
            </FadeInUp>

            {/* Subtítulo - La Guía */}
            <FadeInUp 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-xl lg:text-2xl text-primary-foreground/90 mb-12 leading-relaxed"
            >
              Nuestros productos están específicamente diseñados para eliminar los dolores de cabeza que pueden llevarte a perder tiempo y dinero.
            </FadeInUp>

            {/* Botones - La Decisión Final */}
            <FadeInUp 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              {/* Botón Primario - Naranja sólido con texto oscuro */}
              <Link to="/estrategia">
                <Button 
                  size="lg" 
                  className="bg-warning hover:bg-warning text-foreground px-8 py-4 text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-fast border-0"
                >
                  Comenzar con mi Impulso Estratégico
                </Button>
              </Link>

              {/* Botón Secundario - Outline blanco con texto blanco (Ghost Mode) */}
              <Link to="/contacto">
                <Button 
                  variant="outline"
                  size="lg" 
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold rounded-2xl transition-all duration-fast bg-transparent"
                >
                  Tengo una Pregunta
                </Button>
              </Link>
            </FadeInUp>
          </FadeInUp>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Servicios; 