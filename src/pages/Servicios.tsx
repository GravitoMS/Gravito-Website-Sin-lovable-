import React, { useState } from 'react';
import { FadeIn, HoverScale, FadeInScale } from '@/components/ui/SimpleAnimations';
import { EditableHeading, EditableText } from '@/components/ui/EditableAnimations';
import { ArrowRight, CheckCircle, ChevronDown, Star, Users, Target, Zap, Shield, TrendingUp, Globe, Smartphone, Palette, Brain, Map, Puzzle, MessageCircle, ChevronLeft, ChevronRight, Heart, Eye, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Servicios = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

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

  const faqData = [
    {
      question: "¿Cómo funciona el Impulso Estratégico?",
      answer: "El Impulso Estratégico es un análisis profundo de tu presencia digital que incluye diagnóstico de tus redes sociales, análisis de competencia, auditoría de contenido y una hoja de ruta personalizada. Recibes un informe detallado y una video-consultoría personal donde te explicamos todo. El costo es 100% descontable si decides continuar con nosotros."
    },
    {
      question: "¿Puedo cambiar de plan de suscripción?",
      answer: "Sí, puedes cambiar de plan en cualquier momento. Si subes de nivel, se te cobrará la diferencia proporcional. Si bajas de nivel, el cambio se aplicará en el siguiente ciclo de facturación. Nuestro equipo te ayudará con la transición para asegurar que no pierdas ningún servicio importante."
    },
    {
      question: "¿Qué tipo de negocios atienden?",
      answer: "Atendemos a todo tipo de negocios locales y profesionales: restaurantes, boutiques, consultorios médicos, servicios profesionales, comercios, y más. Nuestros servicios se adaptan a las necesidades específicas de cada industria y tamaño de negocio."
    },
    {
      question: "¿Cómo se mide el éxito?",
      answer: "Medimos el éxito a través de métricas específicas como crecimiento de seguidores, engagement, alcance, conversiones, y más importante, el tiempo que recuperas para enfocarte en tu negocio. Cada mes recibes un reporte detallado con todos los resultados y las mejoras implementadas."
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

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
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
            

          </FadeIn>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <div className="flex flex-col items-center animate-bounce" style={{ animationDuration: '2s' }}>
            <div className="text-muted-foreground font-medium text-lg animate-bounce" style={{ animationDuration: '2s' }}>
              Desliza para continuar
            </div>
          </div>
        </div>
      </section>

      {/* Difuminado de transición */}
      <div className="h-16 bg-gradient-to-b from-background to-muted/20"></div>

      {/* Sección: Impulso Estratégico - PRIORIZADO */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <EditableHeading level={2} className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Tu Primer Paso Hacia la Tranquilidad Digital
            </EditableHeading>
            <EditableText className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto">
              El Impulso Estratégico. Descubre cómo podemos transformar tu presencia online con un análisis profundo y personalizado, sin compromiso. El costo es 100% descontable si decides avanzar con nosotros.
            </EditableText>
          </FadeIn>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Beneficio 1: Diagnóstico */}
              <FadeIn delay={0.1}>
                <HoverScale>
                  <Card className="border-primary/20 bg-card/50 backdrop-blur-sm h-full">
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Target className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl font-bold text-foreground">
                        Diagnóstico Profundo
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        Analizamos tu presencia digital actual, identificamos oportunidades y evaluamos tu competencia para crear una estrategia personalizada.
                      </p>
                    </CardContent>
                  </Card>
                </HoverScale>
              </FadeIn>

              {/* Beneficio 2: Hoja de Ruta */}
              <FadeIn delay={0.2}>
                <HoverScale>
                  <Card className="border-hero-yellow/20 bg-card/50 backdrop-blur-sm h-full">
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 bg-hero-yellow/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Map className="h-8 w-8 text-hero-yellow" />
                      </div>
                      <CardTitle className="text-xl font-bold text-foreground">
                        Hoja de Ruta Clara
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        Recibes un plan de acción detallado con pasos específicos, cronograma y métricas de éxito para tu negocio.
                      </p>
                    </CardContent>
                  </Card>
                </HoverScale>
              </FadeIn>

              {/* Beneficio 3: Recomendación */}
              <FadeIn delay={0.3}>
                <HoverScale>
                  <Card className="border-primary/20 bg-card/50 backdrop-blur-sm h-full">
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Brain className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl font-bold text-foreground">
                        Estrategia Personalizada
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        Desarrollamos una estrategia única para tu negocio, con recomendación del plan ideal y video-consultoría personal.
                      </p>
                    </CardContent>
                  </Card>
                </HoverScale>
              </FadeIn>
            </div>

            <FadeIn delay={0.4} className="text-center mt-12">
              <Link to="/estrategia">
                <Button variant="hero-yellow" size="lg" className="text-lg px-10 py-6">
                  Comienza con tu Impulso Estratégico
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Difuminado de transición */}
      <div className="h-16 bg-gradient-to-b from-muted/20 to-background"></div>

      {/* Sección: Atención Humana */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <EditableHeading level={2} className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Más que Automatización, Somos tu Equipo
            </EditableHeading>
            <EditableText className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto">
              Mientras otros ofrecen soluciones automatizadas, nosotros te damos un equipo humano dedicado a tu éxito.
            </EditableText>
          </FadeIn>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Soporte Personalizado */}
              <FadeIn delay={0.1}>
                <HoverScale>
                  <Card className="border-primary/20 bg-card/50 backdrop-blur-sm h-full text-center">
                    <CardHeader className="pb-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl font-bold text-foreground">
                        Soporte Personalizado
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        Acceso directo a nuestro equipo de expertos. No más chatbots o respuestas automatizadas.
                      </p>
                    </CardContent>
                  </Card>
                </HoverScale>
              </FadeIn>

              {/* Consultoría Directa */}
              <FadeIn delay={0.2}>
                <HoverScale>
                  <Card className="border-hero-yellow/20 bg-card/50 backdrop-blur-sm h-full text-center">
                    <CardHeader className="pb-4">
                      <div className="w-16 h-16 bg-hero-yellow/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageCircle className="h-8 w-8 text-hero-yellow" />
                      </div>
                      <CardTitle className="text-xl font-bold text-foreground">
                        Consultoría Directa
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        Video-consultorías personalizadas donde te explicamos estrategias y resultados de manera clara.
                      </p>
                    </CardContent>
                  </Card>
                </HoverScale>
              </FadeIn>

              {/* Comunicación Transparente */}
              <FadeIn delay={0.3}>
                <HoverScale>
                  <Card className="border-primary/20 bg-card/50 backdrop-blur-sm h-full text-center">
                    <CardHeader className="pb-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Eye className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl font-bold text-foreground">
                        Comunicación Transparente
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        Siempre sabrás qué estamos haciendo, por qué y cómo te beneficia cada acción.
                      </p>
                    </CardContent>
                  </Card>
                </HoverScale>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Difuminado de transición */}
      <div className="h-16 bg-gradient-to-b from-background to-muted/30"></div>

      {/* Sección: Nuestros Servicios Principales */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <EditableHeading level={2} className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Nuestros Servicios Principales
            </EditableHeading>
            <EditableText className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto">
              Planes diseñados para devolverte tu tiempo y potenciar tu presencia digital con el respaldo de nuestro equipo humano.
            </EditableText>
          </FadeIn>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Servicio 1 */}
              <FadeIn delay={0.1}>
                <HoverScale>
                  <Card className="border-primary/20 bg-card/50 backdrop-blur-sm h-full">
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Globe className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl font-bold text-foreground">
                        Gestión de Redes Sociales
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        Gestionamos tu presencia en redes sociales con estrategia personalizada y el respaldo de nuestro equipo de expertos dedicados a tu marca.
                      </p>
                    </CardContent>
                  </Card>
                </HoverScale>
              </FadeIn>

              {/* Servicio 2 */}
              <FadeIn delay={0.2}>
                <HoverScale>
                  <Card className="border-hero-yellow/20 bg-card/50 backdrop-blur-sm h-full">
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 bg-hero-yellow/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Palette className="h-8 w-8 text-hero-yellow" />
                      </div>
                      <CardTitle className="text-xl font-bold text-foreground">
                        Diseño y Contenido
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                                             <p className="text-muted-foreground leading-relaxed">
                         Creamos contenido visual impactante y copy persuasivo, acompañado de consultoría personalizada y soporte prioritario.
                       </p>
                     </CardContent>
                  </Card>
                </HoverScale>
              </FadeIn>

              {/* Servicio 3 */}
              <FadeIn delay={0.3}>
                <HoverScale>
                  <Card className="border-primary/20 bg-card/50 backdrop-blur-sm h-full">
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl font-bold text-foreground">
                        Análisis y Optimización
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        Analizamos resultados y optimizamos estrategias con acceso directo a nuestro equipo de especialistas.
                      </p>
                    </CardContent>
                  </Card>
                </HoverScale>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Difuminado de transición */}
      <div className="h-16 bg-gradient-to-b from-muted/30 to-background"></div>

      {/* Sección: La Tranquilidad de Nuestros Clientes */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <EditableHeading level={2} className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              La Tranquilidad de Nuestros Clientes
            </EditableHeading>
            <EditableText className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto">
              Escucha directamente de quienes han recuperado su tiempo y transformado su presencia digital.
            </EditableText>
          </FadeIn>
          
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-4">{currentTestimonialData.avatar}</div>
                    <div className="flex justify-center mb-2">
                      {[...Array(currentTestimonialData.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-hero-yellow fill-current" />
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{currentTestimonialData.name}</h3>
                    <p className="text-muted-foreground">{currentTestimonialData.title}</p>
                  </div>
                  
                  <blockquote className="text-lg text-muted-foreground leading-relaxed text-center italic mb-6">
                    "{currentTestimonialData.quote}"
                  </blockquote>
                  
                  <div className="text-center">
                    <p className="text-primary font-semibold">
                      Destacado: "{currentTestimonialData.highlight}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
            
            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
            
            {/* Navigation Arrows */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Difuminado de transición */}
      <div className="h-16 bg-gradient-to-b from-background to-muted/30"></div>

      {/* Sección: Preguntas Frecuentes */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <EditableHeading level={2} className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Preguntas Frecuentes
            </EditableHeading>
            <EditableText className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto">
              Resolvemos las dudas más comunes sobre nuestros servicios y el proceso de trabajo.
            </EditableText>
          </FadeIn>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg lg:text-xl font-semibold text-foreground pr-4">
                          {faq.question}
                        </h3>
                        <div className="flex-shrink-0">
                          <ChevronDown 
                            className={`h-5 w-5 text-primary transition-transform duration-500 ease-out ${
                              expandedFAQ === index ? 'rotate-180' : ''
                            }`}
                          />
                        </div>
                      </div>
                    </button>
                    
                    <div 
                      className={`overflow-hidden transition-all duration-500 ease-out ${
                        expandedFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-6 pb-6">
                        <div className="border-t border-border/50 pt-4">
                          <p className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
          
          {/* CTA Final */}
          <FadeIn delay={0.6} className="text-center mt-12">
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/estrategia">
                <Button variant="hero-yellow" size="lg" className="text-lg px-10 py-6">
                  Comienza con tu Impulso Estratégico
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contacto">
                <Button variant="ghost" size="lg" className="text-lg px-10 py-6 text-primary border-2 border-primary hover:bg-primary/10">
                  Contáctanos
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