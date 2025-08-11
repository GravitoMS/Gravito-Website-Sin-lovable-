import React from 'react';
import { ArrowRight, CheckCircle, Target, TrendingUp, Users, Zap, Info, ChevronDown, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
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

  // Datos para la tabla de comparación
  const impulsoPlans = [
    {
      name: "Impulso GMS",
      subtitle: "Impulso Básico",
      isPopular: true
    },
    {
      name: "Impulso Estratégico GMS +",
      subtitle: "Impulso Avanzado",
      isPopular: false
    }
  ];

  const impulsoServices = [
    {
      name: "Auditoría Inicial",
      icon: "🔍",
      basic: "Análisis de métricas clave, contenido y competidores principales. Incluye \"Quick Wins\" y definición de objetivos.",
      advanced: "Nivel Básico + Análisis FODA completo y estrategia derivada. Benchmarking con un mayor número de competidores."
    },
    {
      name: "Planeación Estratégica",
      icon: "📋",
      basic: "Entrega de una Línea del Tiempo visual y completa con el plan de acción detallado para el primer mes.",
      advanced: "Entrega de una Línea del Tiempo visual y completa con el plan de acción detallado para el primer mes."
    },
    {
      name: "Video-Consultoría Personal",
      icon: "🎥",
      basic: "Sistema de Dos Videos Personales (Loom): 1. Video-análisis del Diagnóstico. 2. Video-explicación de la Línea del Tiempo.",
      advanced: "Sistema de Dos Videos Personales (Loom): 1. Video-análisis del Diagnóstico Avanzado. 2. Video-explicación de la Línea del Tiempo."
    },
    {
      name: "Reunión de Arranque",
      icon: "🤝",
      basic: "Incluye la comunicación y reuniones necesarias para completar el briefing y presentar los resultados.",
      advanced: "Incluye la comunicación y reuniones necesarias para completar el briefing y presentar los resultados."
    },
    {
      name: "Beneficio Clave",
      icon: "💎",
      basic: "El costo de este servicio se descuenta íntegramente de tu primer mes de suscripción.",
      advanced: "El costo de este servicio se descuenta íntegramente de tu primer mes de suscripción."
    },
    {
      name: "Costo (Sin IVA)",
      icon: "💰",
      basic: "$1,899 (Pago Único)",
      advanced: "$2,790 (Pago Único)"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-40 pb-32">
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
              Este es el primer paso inteligente para tu precencia digital. Recibirás un análisis completo de tu negocio y una hoja de ruta estratégica y lo mejor de todo es que es 100% descontable.
            </FadeIn>
            <FadeIn 
              delay={0.3}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link to="/contacto?servicio=impulso-estrategico">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl">
                  Solicítalo Ahora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/servicios">
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold rounded-xl">
                  Ver Todos los Servicios
                </Button>
              </Link>
            </FadeIn>
          </FadeIn>
        </div>
      </section>

      {/* Degradado de transición suave */}
      <div className="h-32 bg-gradient-to-b from-background via-background/80 to-muted/30"></div>

      {/* ¿Qué es el Impulso Estratégico? */}
      <section className="py-16 bg-muted/30">
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
              className="text-3xl lg:text-4xl font-bold text-foreground mb-6"
              style={{
                textShadow: '0 0 20px hsl(162 100% 45% / 0.3), 0 0 40px hsl(162 100% 45% / 0.2)',
                willChange: 'text-shadow'
              }}
            >
              Compara Nuestros Niveles de Impulso Estratégico
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Esta tabla contiene exactamente lo que incluye cada nivel de Impulso Estratégico para que puedas comparar y tomar la mejor decisión para tu negocio.
            </p>
          </FadeIn>

          <div className="bg-card rounded-lg shadow-lg overflow-x-auto">
            <TooltipProvider>
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
                              <TooltipContent className="bg-card text-foreground border border-primary max-w-xs">
                                <p>{service.name === "Costo (Sin IVA)" ? "Precios sin impuestos incluidos" : "Información detallada del servicio"}</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-6 bg-primary/5">
                        <div className="text-sm text-foreground max-w-xs mx-auto">
                          {service.basic}
                        </div>
                      </td>
                      <td className="text-center p-6">
                        <div className="text-sm text-foreground max-w-xs mx-auto">
                          {service.advanced}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TooltipProvider>
          </div>
        </div>
      </section>

      {/* Tarjetas de Resumen de Impulsos */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Resumen de Nuestros Impulsos
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre cuál es el impulso perfecto para tu negocio y comienza tu transformación digital.
            </p>
          </FadeIn>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Tarjeta Impulso GMS (Básico) */}
              <FadeIn delay={0.1}>
                <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="text-center pb-4">
                    <div className="mb-4">
                      <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                        Impulso GMS
                      </h3>
                      <p className="text-muted-foreground font-medium">
                        Impulso Básico
                      </p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Análisis inicial sin riesgo. Recibirás un análisis completo de tu negocio y una hoja de ruta estratégica. Su costo se descuenta al 100%.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">Análisis profundo de tu presencia digital</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">Estrategia personalizada</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">100% Descontable</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">Recomendación de plan ideal</span>
                      </div>
                    </div>
                    <div className="pt-4">
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
                <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="text-center pb-4">
                    <div className="mb-4">
                      <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                        Impulso Estratégico GMS +
                      </h3>
                      <p className="text-muted-foreground font-medium">
                        Impulso Avanzado
                      </p>
                      <Badge className="bg-primary text-primary-foreground mt-2">
                        Recomendado
                      </Badge>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Análisis avanzado con FODA completo. Incluye benchmarking extendido y estrategia derivada. Su costo se descuenta al 100%.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">Análisis FODA completo</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">Benchmarking extendido</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">Estrategia derivada avanzada</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">100% Descontable</span>
                      </div>
                    </div>
                    <div className="pt-4">
                      <Link to="/contacto?servicio=impulso-estrategico">
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

      <Footer />
    </div>
  );
};

export default Estrategia;