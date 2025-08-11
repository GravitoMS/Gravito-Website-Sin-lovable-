import React from 'react';
import { ArrowRight, CheckCircle, Target, TrendingUp, Users, Zap, Info, ChevronDown, ChevronRight, Mouse } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { COLORS } from '@/lib/designSystem';
import { FadeIn, HoverScale } from '@/components/ui/SimpleAnimations';

const Estrategia = () => {
  // Estado para manejar los dropdowns de beneficios
  const [expandedBenefits, setExpandedBenefits] = React.useState<number[]>([]);

  const toggleBenefit = (index: number) => {
    setExpandedBenefits(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // Estado para manejar los acordeones de FAQ
  const [expandedFAQ, setExpandedFAQ] = React.useState<number>(0);

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? -1 : index);
  };

  // Datos para la tabla de comparación
  const impulsoPlans = [
    {
      name: "Impulso GMS",
      subtitle: "Impulso Básico",
      isPopular: false
    },
    {
      name: "Impulso Estratégico GMS +",
      subtitle: "Impulso Avanzado",
      isPopular: true
    }
  ];

  const impulsoServices = [
    {
      name: "Auditoría Inicial",
      basic: "Análisis GMS",
      advanced: "Nivel Básico + Análisis GMS Avanzado"
    },
    {
      name: "Planeación Estratégica",
      basic: "Planeación en forma de Línea del Tiempo",
      advanced: "Planeación y Estrategia en forma de Línea del Tiempo"
    },
    {
      name: "Video-Consultoría Personal",
      basic: "Explicación con Videos Personales (Loom)",
      advanced: "Explicación con Videos Personales (Loom)"
    },
    {
      name: "Reunión de Arranque",
      basic: "[Icono de Check Mark]",
      advanced: "[Icono de Check Mark]"
    },
    {
      name: "Recomendación de Suscripción Ideal",
      basic: "[Icono de Check Mark]",
      advanced: "[Icono de Check Mark]"
    },
    {
      name: "Beneficio Clave",
      basic: "[Icono de Check Mark]",
      advanced: "[Icono de Check Mark]"
    }
  ];

  // Datos para las preguntas frecuentes
  const faqData = [
    {
      question: "¿Qué recibo exactamente con el Impulso Estratégico?",
      answer: "Recibes dos entregables principales: un Diagnóstico Inicial completo de tu negocio y una Línea del Tiempo con la hoja de ruta estratégica para tu primer mes. Ambos van acompañados del \"Sistema de Dos Videos Personales (Loom)\" de Gravito Media Solutions (GMS), donde un estratega de GMS te explica personalmente los hallazgos y el plan de acción para tu negocio. Es una consultoría completa, no solo un simple reporte."
    },
    {
      question: "El descuento del 100%, ¿cómo funciona en la práctica?",
      answer: "Es muy simple. El costo total (sin IVA) que pagas por tu Impulso Estratégico se acredita como descuento directo en el primer pago mensual si decides suscribirte a cualquiera de nuestros planes de suscripción mensual. Por ejemplo, si adquieres el Impulso Estratégico GMS (Gravito Media Solutions) por $2,790 y decides suscribirte al Plan Nivel 1 ($6,490, que ya incluye IVA), tu primer pago mensual será solo de $3,700 (ya incluye IVA)."
    },
    {
      question: "¿Estoy obligado a contratar una suscripción mensual después?",
      answer: "Para nada. Esa es la belleza del Impulso Estratégico. Está diseñado para ser una inversión 100% segura para ti. Si decides continuar con nosotros, perfecto, el costo se acredita a tu primer mes. Y si decides que no es el momento, te quedas con un plan de inmenso valor que puedes implementar por tu cuenta. En ambos escenarios, ganas."
    },
    {
      question: "¿Cuánto tiempo tardan en entregar el análisis?",
      answer: "Una vez que completas nuestro briefing inicial (donde nos proporcionas contexto sobre tu negocio), nuestro equipo de estrategas comienza a trabajar. Recibirás tu Impulso Estratégico completo, incluyendo videos personales, en 3 a 5 días hábiles."
    },
    {
      question: "¿Es esto solo un reporte automatizado o genérico?",
      answer: "Todo lo contrario. Tu análisis es realizado personalmente por un Estratega de GMS (Gravito Media Solutions). No utilizamos plantillas genéricas. Cada recomendación e insight se basa en un análisis manual de tu negocio, tus competidores y tus objetivos. La video-consultoría es prueba de que un experto humano está detrás de cada palabra."
    },
    {
      question: "¿Qué necesitan de mí para empezar?",
      answer: "El proceso es muy simple. Una vez que adquieres tu Impulso, te enviaremos un enlace a nuestro briefing inicial. Es un formulario guiado donde nos contarás sobre los objetivos de tu negocio, tu público objetivo, tus competidores y nos darás acceso a tus perfiles. Con esa información, nuestro equipo tiene todo lo necesario para comenzar."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-40 pb-32 relative">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center">
            <FadeIn 
              delay={0.1}
              className="text-4xl lg:text-6xl font-black text-foreground mb-8"
              style={{
                textShadow: '0 0 20px hsl(162 100% 45% / 0.3), 0 0 40px hsl(162 100% 45% / 0.2)',
                willChange: 'text-shadow'
              }}
            >
              IMPULSO ESTRATÉGICO
            </FadeIn>
            <FadeIn 
              delay={0.2}
              className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8"
            >
              Este es el primer paso inteligente para tu presencia digital. Recibirás un análisis completo de tu negocio y una hoja de ruta estratégica. Y lo mejor de todo: Es 100% descontable.
            </FadeIn>
            <FadeIn 
              delay={0.3}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Button 
                onClick={() => {
                  const paraQuienSection = document.querySelector('[data-section="para-quien-impulso"]');
                  if (paraQuienSection) {
                    paraQuienSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl"
              >
                Solicítalo Ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link to="/servicios">
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold rounded-xl">
                  Ver Todos los Servicios
                </Button>
              </Link>
            </FadeIn>
          </FadeIn>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
            <div className="flex flex-col items-center animate-bounce" style={{ animationDuration: '2s' }}>
              <Mouse className="w-8 h-8 text-muted-foreground animate-pulse" style={{ animationDuration: '3s' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Degradado de transición suave */}
      <div className="h-32 bg-gradient-to-b from-background via-background/80 to-muted/30"></div>

      {/* ¿Qué es el Impulso Estratégico? */}
      <section className="py-16 bg-muted/30" data-section="para-quien-impulso">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                ¿Para Quién es el Impulso Estratégico?
              </h2>
              <div className="bg-primary/10 rounded-lg p-6 border border-primary/20 mb-8">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Para todos los negocios que quieren ver y probar nuestro valor estratégico y aún no estan seguros de comprometerse con una suscripción mensual. Es la forma más inteligente y segura de empezar.
                </p>
              </div>
              
              <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                ¿Qué es lo que te entregamos?
              </h3>
              <div className="bg-primary/10 rounded-lg p-6 border border-primary/20">
                <p className="text-muted-foreground">
                  Te entregamos un valor inmenso por adelantado que podemos utilizar para tomar la mejor decisión para tu negocio, con total confianza en nuestra capacidad para generar resultados.
                </p>
              </div>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FadeIn>
                <Card className="border-primary/20">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Target className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">Análisis Profundo</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Identificamos oportunidades de mejora y establecemos una base estratégica.
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
              
              <FadeIn>
                <Card className="border-primary/20">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">Sin Riesgo</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Tu pago es 100% descontable del precio de nuestros productos.
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Degradado de transición hacia la tabla */}
      <div className="h-20 bg-gradient-to-b from-muted/30 to-background"></div>

      {/* Tabla de Comparación */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <h2 
              className="text-5xl lg:text-7xl xl:text-8xl font-black text-foreground mb-6"
              style={{
                textShadow: '0 0 20px hsl(162 100% 45% / 0.3), 0 0 40px hsl(162 100% 45% / 0.2)',
                willChange: 'text-shadow'
              }}
            >
              Nuestros Niveles de Impulso
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Esta tabla contiene exactamente lo que incluye cada nivel de Impulso Estratégico para que puedas comparar y tomar la mejor decisión para tu negocio.
            </p>
          </FadeIn>

          <div className="bg-card rounded-lg shadow-lg overflow-x-auto">
            <table className="w-full">
                <thead className="sticky top-0 bg-card z-10 shadow-sm">
                  <tr className="border-b border-border">
                    <th className="text-center p-6 font-semibold text-foreground bg-card">
                      <span>Servicio Incluido</span>
                    </th>
                    {impulsoPlans.map((plan, index) => (
                      <th key={index} className={`text-center p-6 font-semibold text-foreground bg-card ${plan.isPopular ? 'bg-primary/10' : ''}`}>
                        <div className="space-y-3">
                          <div>
                            <div className="text-lg font-bold">{plan.name}</div>
                            <div className="text-sm text-muted-foreground">{plan.subtitle}</div>
                          </div>
                          {plan.isPopular && (
                            <Badge className="bg-primary text-primary-foreground">
                              Recomendado
                            </Badge>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {impulsoServices.map((service, index) => (
                    <tr 
                      key={index} 
                      className={`${service.name === "Beneficio Clave" ? "border-b-2 border-primary/20 bg-primary/5" : "border-b border-border"} hover:bg-muted/50`}
                    >
                      <td className="p-6">
                        <span className="font-medium text-foreground">{service.name}</span>
                      </td>
                      <td className="text-center p-6">
                        <div className="text-sm text-foreground max-w-xs mx-auto">
                          {service.basic}
                        </div>
                      </td>
                      <td className="text-center p-6 bg-primary/5">
                        <div className="text-sm text-foreground max-w-xs mx-auto">
                          {service.advanced}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
        </div>
      </section>

      {/* Tarjetas de Resumen de Impulsos */}
      <section className="py-20 bg-muted/30" data-section="nuestros-impulsos">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <FadeIn 
              delay={0.1}
              className="text-4xl lg:text-6xl xl:text-7xl font-black text-foreground mb-6"
              style={{
                textShadow: '0 0 20px hsl(162 100% 45% / 0.3), 0 0 40px hsl(162 100% 45% / 0.2)',
                willChange: 'text-shadow'
              }}
            >
              Nuestros Impulsos
            </FadeIn>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre cuál es el impulso perfecto para tu negocio y comienza tu transformación digital.
            </p>
          </FadeIn>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Tarjeta Impulso GMS (Básico) */}
              <FadeIn delay={0.1}>
                <Card className="border-primary/20 bg-card/50 backdrop-blur-sm h-full flex flex-col">
                  <CardHeader className="text-center pb-4">
                    <div className="mb-4">
                      <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                        Análisis inicial básico
                      </h3>
                      <Badge className="bg-primary text-primary-foreground mb-4">
                        Básico
                      </Badge>
                      <div className="mb-4">
                        <div className="text-xl lg:text-2xl font-bold text-foreground">
                          $1,899 Pago Único
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Precio sin IVA
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Para los dueños de negocios que necesitan recibir un análisis de la presencia digital de su negocio y una manera sencilla para probar nuestros servicios. Descontable al 100%.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1 flex flex-col">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">Diagnóstico Inicial Completo</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">Planeación en forma de Línea del Tiempo</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">Explicación con Videos Personales (Loom)</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">Recomendación de Plan de Suscripción Ideal</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">100% Descontable del costo de nuestras suscripciones</span>
                      </div>
                    </div>
                    <div className="pt-4 mt-auto">
                      <Link to="/contacto?servicio=impulso-gms">
                        <Button 
                          size="lg" 
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl"
                        >
                          Descubre tu Estrategia
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Tarjeta Impulso Estratégico GMS + (Avanzado) */}
              <FadeIn delay={0.2}>
                <Card className="border-hero-yellow/20 bg-card/50 backdrop-blur-sm h-full flex flex-col">
                  <CardHeader className="text-center pb-4">
                    <div className="mb-4">
                      <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                        Análisis Avanzado
                      </h3>
                      <Badge className="bg-hero-yellow text-hero-yellow-foreground mt-2">
                        Recomendado
                      </Badge>
                      <div className="mb-4 mt-4">
                        <div className="text-xl lg:text-2xl font-bold text-foreground">
                          $2,790 Pago Único
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Precio sin IVA
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Para dueños de negocio que necesitan una ventaja competitiva desde el día uno. Descontable al 100%.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1 flex flex-col">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-hero-yellow flex-shrink-0" />
                        <span className="text-foreground">Todo lo de Impulso GMS Más:</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-hero-yellow flex-shrink-0" />
                        <span className="text-foreground">Análisis FODA y Estrategia Derivada</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-hero-yellow flex-shrink-0" />
                        <span className="text-foreground">Benchmarking con Múltiples Competidores</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-hero-yellow flex-shrink-0" />
                        <span className="text-foreground">100% Descontable del costo de nuestras suscripciones</span>
                      </div>
                    </div>
                    <div className="pt-4 mt-auto">
                      <Link to="/contacto?servicio=impulso-estrategico">
                        <Button 
                          size="lg" 
                          className="w-full bg-hero-yellow hover:bg-hero-yellow/90 text-hero-yellow-foreground px-8 py-4 text-lg font-semibold rounded-xl"
                        >
                          Descubre tu Estrategia
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
      
      {/* Proceso del Impulso Estratégico */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Proceso del Impulso Estratégico
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Un proceso estructurado de 4 pasos que te dará claridad total sobre tu estrategia digital.
            </p>
          </FadeIn>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FadeIn delay={0.1} className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Diagnóstico Inicial</h3>
                <p className="text-muted-foreground">
                  Evaluamos tu presencia digital actual, métricas clave y competencia directa.
                </p>
              </FadeIn>
              
              <FadeIn delay={0.2} className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Análisis FODA</h3>
                <p className="text-muted-foreground">
                  Identificamos fortalezas, oportunidades, debilidades y amenazas de tu negocio.
                </p>
              </FadeIn>
              
              <FadeIn delay={0.3} className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Estrategia Personalizada</h3>
                <p className="text-muted-foreground">
                  Desarrollamos una hoja de ruta clara y accionable para tu crecimiento digital.
                </p>
              </FadeIn>
              
              <FadeIn delay={0.4} className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">4</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Recomendación de Plan</h3>
                <p className="text-muted-foreground">
                  Te sugerimos el plan perfecto basado en tu análisis y objetivos específicos.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Preguntas Frecuentes */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Preguntas Frecuentes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Resolvemos las dudas más comunes sobre nuestros servicios y el Impulso Estratégico.
            </p>
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
          
          {/* Botones de acción al final de FAQ */}
          <FadeIn delay={0.6} className="text-center mt-12">
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button
                onClick={() => {
                  const impulsosSection = document.querySelector('[data-section="nuestros-impulsos"]');
                  if (impulsosSection) {
                    impulsosSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 text-lg font-semibold rounded-xl w-full sm:w-56"
              >
                Solicítalo Ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link to="/contacto" className="w-full sm:w-56">
                <Button variant="ghost" size="lg" className="px-10 py-4 text-lg font-semibold rounded-xl w-full text-primary border border-primary hover:bg-primary/10">
                  Tengo Otra Pregunta
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

export default Estrategia;