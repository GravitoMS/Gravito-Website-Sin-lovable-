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