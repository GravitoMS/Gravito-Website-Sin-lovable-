import React, { useState, useMemo, lazy, Suspense } from 'react';
import { Info, Check, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ANIMATION_DURATIONS, ANIMATION_DELAYS, EASING_FUNCTIONS } from '@/lib/animations';
// Sistema centralizado importado desde @/lib
import { FadeInUp, FadeInUpStaggered, FadeInSide, FadeInScale, HoverScale, HoverLift, HoverGlow, FadeInOnScroll, SlideInOnScroll, LoadingPulse, LoadingBounce, FadeInUpWithHover, StaggeredGroup } from '@/components/ui/AnimatedComponents';

// Lazy load components
const FAQ = lazy(() => import('../components/FAQ'));
const EnterpriseSection = lazy(() => import('../components/EnterpriseSection'));

const Suscripciones = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

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
    },
    {
      name: "Gestión de Google My Business",
      icon: "⭐️",
      generalDescription: "Gestión activa del perfil de GMB, incluyendo publicaciones, actualización de información, respuesta a Q&A y estrategias para generación de reseñas orgánicas.",
      levels: {
        "Nivel 1": "Gestión básica del perfil y análisis inicial.",
        "Nivel 2": "Nivel 1 + Estrategia para generar reseñas orgánicas.",
        "Nivel 3": "Nivel 2 + Estrategia avanzada para generar reseñas y fomentar la interacción (engagement).",
        "Enterprise": "Personalizado según necesidades específicas."
      }
    },
    {
      name: "Contenido Generado por Usuario (UGC)",
      icon: "🙋‍♀️",
      generalDescription: "Creación de colaboraciones con youtubers o influencers relacionados con el nicho del negocio y Reels UGC a través de los creadores de contenido recomendados.",
      levels: {
        "Nivel 1": "Recomendación de influencers y creadores UGC",
        "Nivel 2": "Nivel 1 + 1 Reel UGC creado por nuestro equipo al mes.",
        "Nivel 3": "Nivel 2 + 2 Reels UGC adicionales al mes (3 en total) o 1 colaboración con influencer cada 2 meses",
        "Enterprise": "Personalizado según necesidades específicas."
      }
    },
    {
      name: "Servicio de Post-Producción",
      icon: "✍️",
      generalDescription: "Servicio de post-producción para material en crudo entregado por el cliente. Incluye: Clipping, Subtítulos, Transiciones y efectos, Branding, Formato y Destacar.",
      levels: {
        "Nivel 1": "Hasta 10 archivos por mes",
        "Nivel 2": "Hasta 15 archivos/mes",
        "Nivel 3": "Hasta 25 archivos/mes",
        "Enterprise": "Personalizado según necesidades específicas."
      }
    },
    {
      name: "Diseños de Brand Collateral",
      icon: "🗃️",
      generalDescription: "Diseño de materiales visuales impresos o digitales que una empresa utiliza para comunicarse con clientes y fortalecer su identidad de marca.",
      levels: {
        "Nivel 1": "1 diseño personalizado al mes (flyers, menús, etc.).",
        "Nivel 2": "2 diseños personalizados al mes.",
        "Nivel 3": "5 diseños personalizados al mes.",
        "Enterprise": "Personalizado según necesidades específicas."
      }
    },
    {
      name: "Diseños de Social Media Graphics",
      icon: "🎨",
      generalDescription: "Diseños visuales creados específicamente para comunicarse de manera atractiva y rápida a través de redes sociales, con el objetivo de captar la atención del usuario e impulsar interacción o engagement.",
      levels: {
        "Nivel 1": "Hasta 4 diseños para redes al mes (1 por semana).",
        "Nivel 2": "Hasta 8 diseños para redes al mes (2 por semana).",
        "Nivel 3": "Diseños para redes ilimitados.",
        "Enterprise": "Personalizado según necesidades específicas."
      }
    },
    {
      name: "Cola de Diseños Activos",
      icon: "🔄",
      generalDescription: "El \"proyecto activo\" indica que se trabaja en una solicitud a la vez.",
      levels: {
        "Nivel 1": "1 proyecto de diseño activo a la vez.",
        "Nivel 2": "1 proyecto de diseño activo a la vez.",
        "Nivel 3": "1 proyecto de diseño activo a la vez.",
        "Enterprise": "Personalizado según necesidades específicas."
      }
    },
    {
      name: "Sesiones de Fotografía",
      icon: "📸",
      generalDescription: "Acceso una lista recomendada de los mejores studios y fotógrafos especializados en tu negocio, en los niveles más elevados, nosotros te incluimos horas de sesión junto con tu suscripción.",
      levels: {
        "Nivel 1": "Acceso a nuestra red recomendada de fotógrafos y estudios.",
        "Nivel 2": "Nivel 1 + 2 horas de sesión fotográfica profesional al mes.",
        "Nivel 3": "Nivel 1 + 4 horas de sesión fotográfica profesional al mes.",
        "Enterprise": "Personalizado según necesidades específicas."
      }
    },
    {
      name: "Creación de Eventos",
      icon: "🎤",
      generalDescription: "Este servicio se realiza a través de la elección de propuestas realizadas por tu Social Media Manager Personal las cuales están diseñadas para involucrar directamente a la audiencia mediante experiencias participativas.",
      levels: {
        "Nivel 1": "Propuesta y diseño de eventos y activaciones sencillas.",
        "Nivel 2": "Nivel 1 + Guía de ejecución para las propuestas.",
        "Nivel 3": "Nivel 2 + Diseño de eventos complejos e integrales con análisis post-evento.",
        "Enterprise": "Personalizado según necesidades específicas."
      }
    },
    {
      name: "Acceso a Expertos en Ads",
      icon: "💻",
      generalDescription: "Tu suscripción te da el acceso a los mejores profesionales que puedas encontrar específicamente para el contexto de tu negocio.",
      levels: {
        "Nivel 1": "Acceso a nuestra red de profesionales en Google y Meta Ads.",
        "Nivel 2": "Acceso a nuestra red de profesionales.",
        "Nivel 3": "Acceso a nuestra red de profesionales con mejores tarifas.",
        "Enterprise": "Personalizado según necesidades específicas."
      }
    },
    {
      name: "Diagnóstico Mensual",
      icon: "🗓️",
      generalDescription: "El diagnóstico mensual de Gravito Media Solutions analiza y optimiza la presencia digital del negocio de forma escalonada.",
      levels: {
        "Nivel 1": "Informe con métricas clave, análisis de rendimiento y metas para el siguiente mes.",
        "Nivel 2": "Nivel 1 + Análisis de sentimiento de la comunidad y radar competitivo.",
        "Nivel 3": "Nivel 2 + Propuestas de pruebas A/B y seguimiento detallado de pendientes.",
        "Enterprise": "Personalizado según necesidades específicas."
      }
    },
    {
      name: "Informe de Gestión (Proof of Work)",
      icon: "📈",
      generalDescription: "El informe de gestión mensual de Gravito Media Solutions es una herramienta escalonada que documenta, analiza y optimiza la estrategia digital de cada cliente.",
      levels: {
        "Nivel 1": "Registro de publicaciones y resumen de campañas y objetivos.",
        "Nivel 2": "Nivel 1 + Análisis de métricas post-publicación (48h) por cada contenido.",
        "Nivel 3": "Nivel 2 + Análisis estratégico profundo de resultados, inversión y resumen ejecutivo.",
        "Enterprise": "Personalizado según necesidades específicas."
      }
    },
    {
      name: "Informe Trimestral",
      icon: "📊",
      generalDescription: "La revisión trimestral de Gravito Media Solutions es una herramienta estratégica que analiza el desempeño acumulado de las acciones digitales del cliente.",
      levels: {
        "Nivel 1": "No incluido.",
        "Nivel 2": "Informe de logros, tendencias, benchmarking competitivo y plan de acción trimestral.",
        "Nivel 3": "Nivel 2 + Análisis estratégico profundo y recomendaciones personalizadas.",
        "Enterprise": "Personalizado según necesidades específicas."
      }
    },
    {
      name: "Video Explicación de Informes",
      icon: "🎥",
      generalDescription: "Video explicativo que acompaña cada informe entregado mensualmente con el objetivo de fácilmente comunicar y explicar los hallazgos clave de cada documento.",
      levels: {
        "Nivel 1": "Video Personal (Loom) para Diagnóstico Inicial. Videos por GAIA para Diagnósticos Mensuales y Líneas del Tiempo.",
        "Nivel 2": "Video Personal (Loom) para Diagnóstico Inicial e Informe Trimestral. Videos por GAIA para Diagnósticos Mensuales y Líneas del Tiempo.",
        "Nivel 3": "Video Personal (Loom) para TODOS los entregables (Iniciales, Mensuales y Trimestrales).",
        "Enterprise": "Personalizado según necesidades específicas."
      }
    },
    {
      name: "Planeación Recurrente",
      icon: "🗺️",
      generalDescription: "Traducción del Diagnóstico Estratégico (Inicial, Mensual o Trimestral) a una hoja de ruta visual y accionable para que el SMM la ejecute.",
      levels: {
        "Nivel 1": "Línea de tiempo visual mensual con la estrategia y objetivos.",
        "Nivel 2": "Línea de tiempo visual mensual con estrategia detallada.",
        "Nivel 3": "Línea de tiempo visual mensual con estrategia detallada.",
        "Enterprise": "Personalizado según necesidades específicas."
      }
    },
    {
      name: "Canales de Comunicación",
      icon: "📲",
      generalDescription: "Estas son las plataformas que utilizamos para garantizar una comunicación directa y ágil contigo.",
      levels: {
        "Nivel 1": "Comunicación Estándar vía Chat y Zoom en horarios laborales.",
        "Nivel 2": "Soporte Prioritario con llamadas para urgencias.",
        "Nivel 3": "Nivel 2 + Soporte dedicado para urgencias.",
        "Enterprise": "Personalizado según necesidades específicas."
      }
    },
    {
      name: "Reuniones y Soporte",
      icon: "🤝",
      generalDescription: "Reuniones en linea o presenciales bajo demanda del cliente para revisar progreso y si es necesario, se realizan ajustes a diseños o publicaciones según las necesidades.",
      levels: {
        "Nivel 1": "Reuniones ilimitadas bajo demanda y atención por WhatsApp.",
        "Nivel 2": "Reuniones ilimitadas bajo demanda y atención por WhatsApp.",
        "Nivel 3": "Nivel 2 + Soporte dedicado para urgencias.",
        "Enterprise": "Personalizado según necesidades específicas."
      }
    },
    {
      name: "Aprobación de Post",
      icon: "✅",
      generalDescription: "Acceso al portal de cliente dedicado de GMS para supervisar y aprobar el contenido que nosotros programaremos.",
      levels: {
        "Nivel 1": "1 ronda de revisión y aprobación de contenido por semana.",
        "Nivel 2": "2 rondas de revisión y aprobación de contenido por semana.",
        "Nivel 3": "2 rondas de revisión y aprobación de contenido por semana.",
        "Enterprise": "Personalizado según necesidades específicas."
      }
    },
    {
      name: "Facturación",
      icon: "🧾",
      generalDescription: "Sabemos que para muchos negocios formales o especializados, contar con facturación puede ser la diferencia entre contratar o no un servicio.",
      levels: {
        "Nivel 1": "Incluida después de 3 meses de servicio.",
        "Nivel 2": "Incluida después de 2 meses de servicio.",
        "Nivel 3": "Incluida desde el inicio del servicio.",
        "Enterprise": "Personalizado según necesidades específicas."
      }
    }
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

  const enterprisePlan = {
    name: "Enterprise",
    subtitle: "Personalizado",
    description: "For enterprises who want to go above and beyond pre-made plans and need custom solutions. Includes API Access and Single Sign-On (SSO).",
    features: [
      "Custom Accounts",
      "Unlimited Users",
      "Unlimited AI Credits",
      "Unlimited Clients",
      "Dedicated Account Manager",
      "Migration & Onboarding",
      "Single Sign-On (SSO)",
      "API Access"
    ],
    cta: "CONTACTAR VENTAS"
  };

  const getTooltipContent = (service: any, level?: string) => {
    if (level) {
      return service.levels[level];
    }
    return service.generalDescription;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-40 pb-16">
        <div className="container mx-auto px-6">
          <FadeInUp 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <FadeInUp 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl lg:text-6xl font-black text-foreground mb-8"
            >
              SUSCRIPCIONES
            </FadeInUp>
            <FadeInUp 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto"
            >
              Planes mensuales escalables diseñados para acompañar tu negocio en cada etapa de su crecimiento digital.
            </FadeInUp>
          </FadeInUp>
        </div>
      </section>

      {/* Features Table */}
      <section className="py-20">
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
                            onClick={() => {
                              const ctaSection = document.getElementById('cta-section');
                              if (ctaSection) {
                                ctaSection.scrollIntoView({ 
                                  behavior: 'smooth',
                                  block: 'center'
                                });
                              }
                            }}
                          >
                            Pruebalo Ahora
                          </Button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {services.map((service, index) => (
                    <tr 
                      key={index} 
                      className="border-b border-border hover:bg-muted/50"
                    >
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
                              <TooltipContent className="bg-muted text-white border border-primary max-w-xs">
                                <p>{service.generalDescription}</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </div>
                      </td>
                      {pricingPlans.map((plan, planIndex) => (
                        <td key={planIndex} className={`text-center p-6 ${plan.isPopular ? 'bg-primary/5' : ''}`}>
                          <div className="flex items-center justify-center space-x-2">
                            <span className="text-sm text-foreground">{service.levels[plan.name]}</span>
                            <Tooltip delayDuration={300}>
                              <TooltipTrigger asChild>
                                <button className="inline-flex">
                                  <Info className="w-4 h-4 text-primary hover:text-primary/80 cursor-help transition-colors" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent className="bg-muted text-white border border-primary max-w-xs">
                                <p>{getTooltipContent(service, plan.name)}</p>
                              </TooltipContent>
                            </Tooltip>
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

      {/* CTA Section */}
      <section className="py-2">
        <div className="container mx-auto px-6 text-center">
          <h2 id="cta-section" className="text-6xl lg:text-8xl font-black text-foreground mb-1 relative inline-block" style={{
            textShadow: '0 0 20px hsl(162 100% 45% / 0.3), 0 0 40px hsl(162 100% 45% / 0.2)',
            willChange: 'text-shadow'
          }}>
            Obtén Tu Tranquilidad Ahora
          </h2>
          <p className="text-sm text-muted-foreground max-w-3xl mx-auto mb-2">
            Descubre el plan perfecto para tu negocio y comienza a transformar tu presencia digital hoy mismo.
          </p>
        </div>
      </section>

      {/* Pricing Toggle */}
      <section className="py-0.5">
        <div className="container mx-auto px-6">
          <div className="flex justify-center items-center mb-1">
            <div className="flex bg-muted rounded-lg p-1 relative overflow-hidden">
              <div 
                className={`absolute top-1 bottom-1 bg-primary rounded-md transition-all duration-fast ease-in-out ${
                  billingCycle === 'monthly' ? 'left-1 w-[calc(50%-0.25rem)]' : 'left-[calc(50%+0.125rem)] w-[calc(50%-0.25rem)]'
                }`}
                style={{
                  backgroundColor: 'hsl(162 100% 45%)',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
              />
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all duration-fast text-sm relative z-10`}
                style={{
                  color: billingCycle === 'monthly' ? 'hsl(0 0% 0%)' : 'hsl(0 0% 63.9%)',
                }}
              >
                Mensual
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all duration-fast text-sm relative z-10`}
                style={{
                  color: billingCycle === 'yearly' ? 'hsl(0 0% 0%)' : 'hsl(0 0% 63.9%)',
                }}
              >
                <div className="text-center">
                  <div>Anual</div>
                  <div className="text-xs opacity-80">(15% off)</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards - Main Levels */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.isPopular ? 'border-primary shadow-lg' : plan.color} min-h-[700px] flex flex-col ${
                plan.isPopular ? 'shadow-lg' : ''
              }`}>
                {plan.isPopular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    Recomendado
                  </Badge>
                )}
                <CardHeader className="text-center flex-shrink-0">
                  <CardTitle className="text-xl font-bold mb-3">{plan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mb-6">{plan.subtitle}</p>

                  {/* Image Container */}
                  <div className="mb-6">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 rounded-lg flex items-center justify-center shadow-lg overflow-hidden relative">
                      {plan.name === "Nivel 1" && (
                        <img
                          src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=400&fit=crop&crop=center"
                          alt="Nivel 1 - Presencia Esencial"
                          className="w-full h-full object-cover rounded-lg transition-opacity duration-fast"
                          loading="lazy"
                          onLoad={(e) => {
                            e.currentTarget.style.opacity = '1';
                          }}
                          style={{ opacity: 0 }}
                        />
                      )}
                      {plan.name === "Nivel 2" && (
                        <img
                          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop&crop=center"
                          alt="Nivel 2 - Crecimiento y Optimización"
                          className="w-full h-full object-cover rounded-lg transition-opacity duration-fast"
                          loading="lazy"
                          onLoad={(e) => {
                            e.currentTarget.style.opacity = '1';
                          }}
                          style={{ opacity: 0 }}
                        />
                      )}
                      {plan.name === "Nivel 3" && (
                        <img
                          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop&crop=center"
                          alt="Nivel 3 - Liderazgo y Expansión"
                          className="w-full h-full object-cover rounded-lg transition-opacity duration-fast"
                          loading="lazy"
                          onLoad={(e) => {
                            e.currentTarget.style.opacity = '1';
                          }}
                          style={{ opacity: 0 }}
                        />
                      )}
                    </div>
                  </div>

                  <div className="mb-0">
                    <div className="flex items-center justify-center space-x-1">
                      <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-sm text-muted-foreground">/mes</span>
                    </div>
                    <div className="h-8 flex items-center justify-center">
                      {plan.originalPrice && plan.originalPrice !== plan.price && (
                        <div className="flex items-center justify-center space-x-2">
                          <span className="text-sm text-muted-foreground line-through">
                            {plan.originalPrice}
                          </span>
                          {billingCycle === 'yearly' && (
                            <span className="text-xs text-muted-foreground" style={{
                              textDecoration: 'underline',
                              textDecorationColor: 'hsl(25 95% 53%)',
                              textDecorationThickness: '1px',
                              textUnderlineOffset: '2px'
                            }}>
                              (Ahorra 15%)
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="h-4 flex items-center justify-center">
                      {billingCycle === 'yearly' && (
                        <p className="text-xs text-muted-foreground">
                          Facturado anualmente
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Description Section */}
                  <div className="px-6 py-0">
                    <div className="p-4 bg-muted/20 rounded-lg w-full">
                      <p className="text-base text-muted-foreground leading-relaxed text-center">
                        {plan.name === "Nivel 1" && 
                          "Ideal para negocios que buscan establecer su presencia digital. Incluye servicios esenciales para comenzar con el pie derecho en el mundo digital."
                        }
                        {plan.name === "Nivel 2" && 
                          "Perfecto para negocios en crecimiento que necesitan optimización y escalabilidad. Nuestro plan más popular con el mejor balance de servicios y precio."
                        }
                        {plan.name === "Nivel 3" && 
                          "Para negocios establecidos que buscan liderar su industria. Servicios completos y estratégicos para maximizar el ROI de tu presencia digital."
                        }
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="text-center flex-shrink-0 pt-8">
                  <Link to="/contacto">
                    <Button 
                      size="lg" 
                      className="w-full mb-2 rounded-full border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background transition-all duration-fast"
                    >
                      Agendar una llamada
                    </Button>
                  </Link>
                  <p className="text-xs text-muted-foreground mb-2">y/o</p>
                  <Link to={`/contacto?plan=${plan.name.toLowerCase().replace(' ', '-')}`}>
                    <Button
                      size="lg"
                      className={`w-full rounded-full border-2 transition-all duration-fast ${
                        plan.isPopular
                          ? 'border-warning bg-transparent text-warning hover:bg-warning hover:text-white'
                          : 'border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground'
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                  <p className="text-xs text-muted-foreground mt-2">Aceptamos múltiples métodos de pago</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Section - Lazy Loaded */}
      <Suspense fallback={
        <section className="py-8">
          <div className="container mx-auto px-6">
            <div className="animate-pulse">
              <div className="h-32 bg-muted rounded-lg"></div>
            </div>
          </div>
        </section>
      }>
        <EnterpriseSection enterprisePlan={enterprisePlan} />
      </Suspense>

      {/* FAQ Section - Lazy Loaded */}
      <Suspense fallback={
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-1/3 mx-auto"></div>
              <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </section>
      }>
        <FAQ />
      </Suspense>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-6xl font-black mb-12">
            TU MARKETING EN MANOS DE EXPERTOS
          </h2>
          <Button variant="secondary" size="lg" className="text-lg px-10 py-8 mb-12">
            Descubre tu Estrategia
          </Button>
          <p className="text-xl lg:text-2xl max-w-3xl mx-auto opacity-90">
            Enfócate en tu negocio mientras nosotros nos encargamos de hacer crecer tu presencia digital
          </p>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Suscripciones;
