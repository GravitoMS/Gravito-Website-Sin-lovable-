import React, { useState, useMemo, lazy, Suspense } from 'react';
import { Info, Check, ArrowRight, CheckCircle } from 'lucide-react';
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

  // Datos de servicios memoizados para evitar re-creaciones
  const serviceComparisonTable = useMemo(() => ({
    levels: [
      {
        levelNumber: 1,
        name: "Presencia Esencial",
        tierTitle: "Nivel 1"
      },
      {
        levelNumber: 2,
        name: "Crecimiento y Optimización",
        tierTitle: "Nivel 2"
      },
      {
        levelNumber: 3,
        name: "Liderazgo y Expansión",
        tierTitle: "Nivel 3"
      }
    ],
    services: [
      {
        icon: "📋",
        serviceName: "Auditoría Inicial por Plataforma",
        serviceDescription: "El Primer Impulso para tu Negocio. Evaluamos la presencia digital del negocio para detectar oportunidades de mejora y establecer una base sólida. Incluye auditoría por canal. Similar a los Impulsos GMS.",
        levelDetails: [
          {
            levelNumber: 1,
            displayType: "checkmark",
            displayText: "",
            tooltipContent: "- Recopilación de datos iniciales y métricas clave por plataforma: Alcance, impresiones, engagement, clics, seguidores adquiridos.\n- Identificación de contenido con mejor y peor rendimiento\n- Observaciones generales del primer mes\n- Calificación general y meta para el mes siguiente\n- Auditoría inicial por plataforma\n- Quick Wins: áreas de oportunidad y acciones inmediatas recomendadas\n- Benchmarking inicial\n- Datos internos: objetivo SMART, insights clave, recomendaciones, etc."
          },
          {
            levelNumber: 2,
            displayType: "checkmark",
            displayText: "",
            tooltipContent: "- Recopilación de datos iniciales y métricas clave por plataforma: Alcance, impresiones, engagement, clics, seguidores adquiridos.\n- Identificación de contenido con mejor y peor rendimiento\n- Observaciones generales del primer mes\n- Calificación general y meta para el mes siguiente\n- Auditoría inicial por plataforma\n- Quick Wins: áreas de oportunidad y acciones inmediatas recomendadas\n- Benchmarking inicial\n- Datos internos: objetivo SMART, insights clave, recomendaciones, etc."
          },
          {
            levelNumber: 3,
            displayType: "checkmark",
            displayText: "",
            tooltipContent: "Todo lo de Nivel 1/2 +\n- Benchmarking exhaustivo\n- Estrategia derivada del análisis FODA (FO, DO, FA, DA)"
          }
        ]
      },
      {
        icon: "👨‍💻",
        serviceName: "Gestión de Redes sociales",
        serviceDescription: "Una Comunidad Atendida y Comprometida. Nos convertimos en la voz de tu marca, gestionando la interacción para transformar a tu audiencia pasiva en una comunidad activa y leal.",
        levelDetails: [
          {
            levelNumber: 1,
            displayType: "text",
            displayText: "Hasta 2 Plataformas a elegir.",
            tooltipContent: "Gestión integral del ciclo de vida del contenido en las plataformas seleccionadas. Plataformas a elegir: Facebook Pages, Instagram, LinkedIn, Threads, X, Pinterest."
          },
          {
            levelNumber: 2,
            displayType: "text",
            displayText: "Hasta 2 Plataformas a elegir.",
            tooltipContent: "Gestión integral del ciclo de vida del contenido en las plataformas seleccionadas. Plataformas a elegir: Facebook Pages, Instagram, LinkedIn, Threads, X, Pinterest."
          },
          {
            levelNumber: 3,
            displayType: "text",
            displayText: "Hasta 3 Plataformas a elegir.",
            tooltipContent: "Gestión integral del ciclo de vida del contenido en las plataformas seleccionadas. Plataformas a elegir: Facebook Pages, Instagram, LinkedIn, Threads, X, Pinterest."
          }
        ]
      },
      {
        icon: "⭐️",
        serviceName: "Gestión y Reviews en Google my Business Profile",
        serviceDescription: "Tu Reputación y Visibilidad en Manos de Expertos. Gestión activa del perfil de GMB, incluyendo publicaciones, respuesta a Q&A y estrategias para la generación de reseñas.",
        levelDetails: [
          {
            levelNumber: 1,
            displayType: "text",
            displayText: "Setup + Gestión + análisis",
            tooltipContent: "Incluye un análisis dedicado dentro del Diagnóstico Mensual/Inicial."
          },
          {
            levelNumber: 2,
            displayType: "text",
            displayText: "Nivel 1 + Estrategia para reseñas",
            tooltipContent: "Incluye un análisis dedicado dentro de los informes Trimestrales y Diagnósticos Mensuales/Iniciales."
          },
          {
            levelNumber: 3,
            displayType: "text",
            displayText: "Nivel 2 + Estrategia avanzada para reseñas",
            tooltipContent: "Incluye un análisis dedicado dentro de los informes Trimestrales y Diagnósticos Mensuales/Iniciales."
          }
        ]
      },
      {
        icon: "🙋‍♀️",
        serviceName: "Colaboraciones y UGC",
        serviceDescription: "Creadores para tu Marca. Creamos colaboraciones con influencers para generar contenido publicitario auténtico y relevante para tu nicho.",
        levelDetails: [
          {
            levelNumber: 1,
            displayType: "text",
            displayText: "Acceso a Red de Creadores",
            tooltipContent: "Recomendamos a los mejores creadores UGC e influencers para crear colaboraciones específicamente para el nicho y el contexto personalizado de tu negocio."
          },
          {
            levelNumber: 2,
            displayType: "text",
            displayText: "Nivel 1 + 1 Reel UGC/mes",
            tooltipContent: "1 Reel UGC/mes creado por un influencer de nuestra red."
          },
          {
            levelNumber: 3,
            displayType: "text",
            displayText: "Nivel 2 + Colaboraciones Estratégicas",
            tooltipContent: "2 Reels UGC adicionales/mes (3 en total) y 1 colaboración bimestral con un influencer recomendado."
          }
        ]
      },
      {
        icon: "📊",
        serviceName: "Informe trimestral",
        serviceDescription: "Birds View. Cada tres meses, damos un paso atrás para ver el panorama completo y entregarte una hoja de ruta estratégica para los próximos 90 días.",
        levelDetails: [
          {
            levelNumber: 1,
            displayType: "cross",
            displayText: "No incluido",
            tooltipContent: "Este servicio no está incluido en el plan Presencia Esencial."
          },
          {
            levelNumber: 2,
            displayType: "checkmark",
            displayText: "Informe Trimestral",
            tooltipContent: "Resumen general del trimestre con video-análisis Personal, principales logros, datos generales, benchmarking con competidor principal, valoración estratégica y conclusiones."
          },
          {
            levelNumber: 3,
            displayType: "checkmark",
            displayText: "Informe Trimestral GMS+",
            tooltipContent: "Todo lo de Nivel 2 + Resumen ejecutivo, análisis de objetivos SMART, análisis de pruebas A/B, análisis de sentimiento, benchmarking profundo, gap analysis y gestión de bloqueos."
          }
        ]
      }
    ]
  }), []);

  const pricingPlans = useMemo(() => [
    {
      name: "Nivel 1",
      subtitle: "Presencia Esencial",
      price: billingCycle === 'monthly' ? "$6,490" : "$5,516",
      originalPrice: billingCycle === 'monthly' ? "$6,490" : "$6,490",
      description: "Built for businesses who want to establish their digital presence.",
      features: serviceComparisonTable.services.map(service => service.levelDetails[0].displayText || "Incluido"),
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
      features: serviceComparisonTable.services.map(service => service.levelDetails[1].displayText || "Incluido"),
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
      features: serviceComparisonTable.services.map(service => service.levelDetails[2].displayText || "Incluido"),
      isPopular: false,
      cta: "COMENZAR AHORA",
      color: "border-muted"
    }
  ], [billingCycle, serviceComparisonTable.services]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-40 pb-16">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center">
            <FadeIn delay={0.1} className="text-4xl lg:text-6xl font-black text-foreground mb-8">
              SUSCRIPCIONES
            </FadeIn>
            <FadeIn delay={0.2} className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto">
              Planes mensuales escalables diseñados para acompañar tu negocio en cada etapa de su crecimiento digital.
            </FadeIn>
          </FadeIn>
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
                    {serviceComparisonTable.levels.map((level, index) => (
                      <th key={index} className={`text-center p-6 font-semibold text-foreground bg-card ${level.levelNumber === 2 ? 'bg-primary/10' : ''}`}>
                        <div className="space-y-3">
                          <div>
                            <div className="text-lg font-bold">{level.tierTitle}</div>
                            <div className="text-sm text-muted-foreground">{level.name}</div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs px-3 py-1"
                          >
                            Ver Precio
                          </Button>
                          {level.levelNumber === 2 && (
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
                  {serviceComparisonTable.services.map((service, index) => (
                    <tr key={index} className="border-b border-border hover:bg-muted/50">
                      <td className="p-6">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{service.icon}</span>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-foreground">{service.serviceName}</span>
                            <Tooltip delayDuration={300}>
                              <TooltipTrigger asChild>
                                <button className="inline-flex">
                                  <Info className="w-4 h-4 text-primary hover:text-primary/80 cursor-help transition-colors" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent className="bg-card text-foreground border border-primary max-w-xs">
                                <p>{service.serviceDescription}</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </div>
                      </td>
                      {service.levelDetails.map((detail, detailIndex) => (
                        <td key={detailIndex} className={`text-center p-6 ${detail.levelNumber === 2 ? 'bg-primary/5' : ''}`}>
                          <div className="flex items-center justify-center space-x-2">
                            {detail.displayType === "checkmark" ? (
                              <CheckCircle className="h-5 w-5 text-primary" />
                            ) : detail.displayType === "cross" ? (
                              <span className="text-red-500 font-semibold">✗</span>
                            ) : (
                              <span className="text-sm text-foreground max-w-xs mx-auto">{detail.displayText}</span>
                            )}
                            {detail.tooltipContent && (
                              <Tooltip delayDuration={300}>
                                <TooltipTrigger asChild>
                                  <button className="inline-flex">
                                    <Info className="w-4 h-4 text-primary hover:text-primary/80 cursor-help transition-colors" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent className="bg-card text-foreground border border-primary max-w-xs">
                                  <p className="whitespace-pre-line">{detail.tooltipContent}</p>
                                </TooltipContent>
                              </Tooltip>
                            )}
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