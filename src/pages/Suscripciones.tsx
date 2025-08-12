import React, { useState, useMemo, lazy, Suspense } from 'react';
import { Info, Check, ArrowRight, CheckCircle, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { FadeIn, HoverScale, FadeInScale } from '@/components/ui/SimpleAnimations';

// Lazy load components
const FAQ = lazy(() => import('../components/FAQ'));
const EnterpriseSection = lazy(() => import('../components/EnterpriseSection'));

const Suscripciones = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  // Datos para las preguntas frecuentes de suscripciones
  const faqData = [
    {
      question: "¿Qué incluye exactamente cada nivel de suscripción?",
      answer: "Cada nivel incluye una combinación específica de servicios. El Nivel 1 (Presencia Esencial) incluye servicios básicos como auditoría inicial, gestión de hasta 2 plataformas sociales, y diagnósticos mensuales. El Nivel 2 (Crecimiento y Optimización) añade más plataformas, informes trimestrales, y estrategias avanzadas. El Nivel 3 (Liderazgo y Expansión) incluye todo lo anterior más servicios ilimitados, prioridad de agenda, y análisis más profundos."
    },
    {
      question: "¿Puedo cambiar de nivel durante mi suscripción?",
      answer: "Sí, puedes cambiar de nivel en cualquier momento. Si subes de nivel, se te cobrará la diferencia proporcional. Si bajas de nivel, el cambio se aplicará en el siguiente ciclo de facturación. Nuestro equipo te ayudará con la transición para asegurar que no pierdas ningún servicio importante."
    },
    {
      question: "¿Qué pasa si no estoy satisfecho con el servicio?",
      answer: "Ofrecemos una garantía de satisfacción. Si en los primeros 30 días no estás completamente satisfecho con nuestro servicio, te devolvemos tu dinero sin preguntas. Además, puedes cancelar tu suscripción en cualquier momento con un aviso de 30 días."
    },
    {
      question: "¿Los precios incluyen IVA?",
      answer: "Los precios mostrados son sin IVA. El IVA se aplicará según la legislación fiscal mexicana. Te proporcionaremos facturas detalladas con el desglose correspondiente para que puedas deducir los gastos si aplica."
    },
    {
      question: "¿Cuánto tiempo tardan en responder a mis solicitudes?",
      answer: "Nuestros tiempos de respuesta varían según el nivel de suscripción. En el Nivel 1, respondemos en horarios laborables. En el Nivel 2, ofrecemos soporte prioritario. En el Nivel 3, tienes soporte total con atención prioritaria y extendida para urgencias."
    },
    {
      question: "¿Puedo pausar mi suscripción temporalmente?",
      answer: "Sí, puedes pausar tu suscripción por hasta 2 meses consecutivos. Durante la pausa, no se te cobrará, pero tampoco se realizarán publicaciones ni análisis. Para reactivar, simplemente avísanos y continuaremos desde donde lo dejamos."
    }
  ];

  // Datos de servicios memoizados para evitar re-creaciones
  const services = useMemo(() => [
    {
      name: "Auditoría Inicial",
      icon: "📋",
      generalDescription: "Diagnóstico inicial para evaluar la presencia digital, detectar oportunidades y establecer la línea base estratégica.",
      levels: {
        "Nivel 1": "Análisis de métricas clave, contenido y competidores principales. Incluye \"Quick Wins\" y definición de objetivos.",
        "Nivel 2": "Igual que el Nivel 1.",
        "Nivel 3": "Nivel 2 + Análisis FODA completo y estrategia derivada. Benchmarking con un mayor número de competidores.",
        "Enterprise": "Personalizado según necesidades específicas."
      }
    },
    {
      name: "Gestión de Redes Sociales",
      icon: "👨‍💻",
      generalDescription: "Gestión integral del ciclo de vida del contenido y la comunidad en las plataformas seleccionadas.",
      levels: {
        "Nivel 1": "Hasta 2 plataformas a elegir.",
        "Nivel 2": "Hasta 2 plataformas a elegir.",
        "Nivel 3": "Hasta 3 plataformas a elegir.",
        "Enterprise": "Personalizado según necesidades específicas."
      }
    }
    // ... resto de servicios simplificados para evitar problemas
  ], []);

  const pricingPlans = useMemo(() => [
    {
      name: "Nivel 1",
      subtitle: "Presencia Esencial",
      price: billingCycle === 'monthly' ? "$6,490" : "$5,516",
      originalPrice: billingCycle === 'monthly' ? "$6,490" : "$6,490",
      description: "Built for businesses who want to establish their digital presence.",
      features: services.map(service => service.levels["Nivel 1"]),
      isPopular: false,
      cta: "COMENZAR AHORA",
      color: "border-muted"
    },
    {
      name: "Nivel 2",
      subtitle: "Crecimiento y Optimización",
      price: billingCycle === 'monthly' ? "$12,395" : "$10,536",
      originalPrice: billingCycle === 'monthly' ? "$12,395" : "$12,395",
      description: "Designed to empower growing businesses and small teams.",
      features: services.map(service => service.levels["Nivel 2"]),
      isPopular: true,
      cta: "COMENZAR AHORA",
      color: "border-primary"
    },
    {
      name: "Nivel 3",
      subtitle: "Liderazgo y Expansión",
      price: billingCycle === 'monthly' ? "$15,780" : "$13,413",
      originalPrice: billingCycle === 'monthly' ? "$15,780" : "$15,780",
      description: "Capabilities built for established businesses who want to scale.",
      features: services.map(service => service.levels["Nivel 3"]),
      isPopular: false,
      cta: "COMENZAR AHORA",
      color: "border-muted"
    }
  ], [billingCycle, services]);

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
              SUSCRIPCIONES
            </FadeIn>
            <FadeIn 
              delay={0.2}
              className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8"
            >
              Planes mensuales escalables diseñados para acompañar tu negocio en cada etapa de su crecimiento digital. Desde presencia esencial hasta liderazgo total en el mercado.
            </FadeIn>
            <FadeIn 
              delay={0.3}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Button 
                onClick={() => {
                  const tableSection = document.querySelector('[data-section="comparison-table"]');
                  if (tableSection) {
                    tableSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl"
              >
                Comparar Planes
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link to="/estrategia">
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold rounded-xl">
                  Solicitar Impulso Estratégico
                </Button>
              </Link>
            </FadeIn>
          </FadeIn>
        </div>
      </section>

      {/* Features Table */}
      <section className="py-20" data-section="comparison-table">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Compara Características Entre Planes
            </h2>
          </div>

          <div className="bg-card rounded-lg shadow-lg overflow-x-auto">
            <TooltipProvider>
              <table className="w-full">
                <thead className="sticky top-0 bg-card z-10 shadow-sm">
                  <tr className="border-b border-border">
                    <th className="text-center p-6 font-semibold text-foreground bg-card">
                      <span>Características</span>
                    </th>
                    {pricingPlans.map((plan, index) => (
                      <th key={index} className={`text-center p-6 font-semibold text-foreground bg-card ${plan.isPopular ? 'bg-primary/10' : ''}`}>
                        <div className="space-y-3">
                          <div>
                            <div className="text-lg font-bold">{plan.name}</div>
                            <div className="text-sm text-muted-foreground">{plan.subtitle}</div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs px-3 py-1"
                          >
                            Ver Precio
                          </Button>
                          {plan.isPopular && (
                            <Badge className="bg-primary text-primary-foreground">
                              Más Popular
                            </Badge>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {services.map((service, index) => (
                    <tr key={index} className="border-b border-border hover:bg-muted/50">
                      <td className="p-6">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{service.icon}</span>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-foreground">{service.name}</span>
                            <Tooltip delayDuration={300}>
                              <TooltipTrigger asChild>
                                <button className="inline-flex">
                                  <Info className="w-4 h-4 text-primary hover:text-primary/80 cursor-help transition-colors" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent className="bg-card text-foreground border border-primary max-w-xs">
                                <p>{service.generalDescription}</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </div>
                      </td>
                      {pricingPlans.map((plan, planIndex) => (
                        <td key={planIndex} className={`text-center p-6 ${plan.isPopular ? 'bg-primary/5' : ''}`}>
                          <div className="text-sm text-foreground max-w-xs mx-auto">
                            {service.levels[plan.name]}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </TooltipProvider>
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
                          Precio en MXN sin IVA
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
                          Precio en MXN sin IVA
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Para negocios que buscan un análisis profundo y estratégico de su presencia digital, incluyendo análisis FODA completo y benchmarking exhaustivo. Descontable al 100%.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1 flex flex-col">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">Todo del Impulso GMS Básico</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">Análisis FODA Completo y Estrategia Derivada</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">Benchmarking Exhaustivo con Competidores</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">Estrategia Avanzada de Crecimiento</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
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

      {/* Sección de Preguntas Frecuentes */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Preguntas Frecuentes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Resolvemos las dudas más comunes sobre nuestros planes de suscripción y servicios.
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
                  const tableSection = document.querySelector('[data-section="comparison-table"]');
                  if (tableSection) {
                    tableSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 text-lg font-semibold rounded-xl w-full sm:w-56"
              >
                Comparar Planes
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

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Comienza tu Transformación Digital Hoy
            </h2>
            <p className="text-xl lg:text-2xl text-primary-foreground/90 mb-12 leading-relaxed">
              No dejes que el tiempo siga siendo un obstáculo para tu crecimiento. Solicita tu Impulso Estratégico y descubre cómo podemos ayudarte.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/estrategia">
                <Button variant="hero-yellow" size="lg" className="text-lg px-10 py-8">
                  Solicitar Impulso Estratégico
                </Button>
              </Link>
              <Link to="/contacto">
                <Button variant="outline" size="lg" className="text-lg px-10 py-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Contactar Ahora
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

export default Suscripciones;