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
import { FadeInUp, FadeInUpStaggered, FadeInSide, FadeInScale, HoverScale, HoverLift, HoverGlow, FadeInOnScroll, SlideInOnScroll, LoadingPulse, LoadingBounce, FadeInUpWithHover, StaggeredGroup } from '@/components/ui/AnimatedComponents';

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
              style={{
                textShadow: '0 0 20px hsl(162 100% 45% / 0.3), 0 0 40px hsl(162 100% 45% / 0.2)',
                willChange: 'text-shadow'
              }}
            >
              IMPULSO ESTRATÉGICO
            </FadeInUp>
            <FadeInUp 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8"
            >
              Este es el primer paso inteligente para tu precencia digital. Recibirás un análisis completo de tu negocio y una hoja de ruta estratégica y lo mejor de todo es que es 100% descontable.
            </FadeInUp>
            <FadeInUp 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
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
            </FadeInUp>
          </FadeInUp>
        </div>
      </section>

      {/* Degradado de transición suave */}
      <div className="h-32 bg-gradient-to-b from-background via-background/80 to-muted/30"></div>

      {/* ¿Qué es el Impulso Estratégico? */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <FadeInUp 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
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
            </FadeInUp>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FadeInUp
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
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
              </FadeInUp>
              
              <FadeInUp
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
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
              </FadeInUp>
            </div>
          </div>
        </div>
      </section>

      {/* Degradado de transición hacia la tabla */}
      <div className="h-20 bg-gradient-to-b from-muted/30 to-background"></div>

      {/* Tabla de Comparación */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <FadeInUp 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
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
          </FadeInUp>

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
      
      {/* Proceso del Impulso Estratégico */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <FadeInUp 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Proceso del Impulso Estratégico
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Un proceso estructurado de 4 pasos que te dará claridad total sobre tu estrategia digital.
            </p>
          </FadeInUp>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FadeInUp
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Diagnóstico Inicial</h3>
                <p className="text-muted-foreground">
                  Evaluamos tu presencia digital actual, métricas clave y competencia directa.
                </p>
              </FadeInUp>
              
              <FadeInUp
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Análisis FODA</h3>
                <p className="text-muted-foreground">
                  Identificamos fortalezas, oportunidades, debilidades y amenazas de tu negocio.
                </p>
              </FadeInUp>
              
              <FadeInUp
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Estrategia Personalizada</h3>
                <p className="text-muted-foreground">
                  Desarrollamos una hoja de ruta clara y accionable para tu crecimiento digital.
                </p>
              </FadeInUp>
              
              <FadeInUp
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">4</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Recomendación de Plan</h3>
                <p className="text-muted-foreground">
                  Te recomendamos el plan de suscripción ideal para tu negocio y objetivos.
                </p>
              </FadeInUp>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios Section - Unificada */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <FadeInUp 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Beneficios del Impulso Estratégico
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              El "Impulso Estratégico" no es solo un servicio de consultoría. Es una consultoría completa, una hoja de ruta precisa para el crecimiento de tu negocio y una inversión 100% segura.
            </p>
          </FadeInUp>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Lado Izquierdo - Visual */}
              <FadeInUp 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8 text-center">
                  <div className="bg-primary/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">¿Por Qué Elegirnos?</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    Porque entendemos que tu éxito es nuestro éxito. No somos solo consultores, somos socios estratégicos.
                  </p>
                  <div className="text-4xl font-bold text-primary">+150</div>
                  <p className="text-muted-foreground">Clientes Satisfechos</p>
                </div>
                
                {/* Elementos gráficos superpuestos */}
                <div className="absolute -top-4 -left-4 bg-white rounded-xl p-3 shadow-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-info to-info rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-lg">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">+70%</div>
                    <div className="text-sm text-muted-foreground">CRECIMIENTO</div>
                  </div>
                </div>
              </FadeInUp>
              
                            {/* Lado Derecho - Lista de Beneficios Desplegables */}
              <FadeInUp 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-3"
              >
                {/* Beneficio 1: Claridad Total */}
                <div className="bg-card rounded-xl border border-primary/50 shadow-lg overflow-hidden">
                  <button
                    onClick={() => toggleBenefit(0)}
                    className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/20 rounded-full p-2 border border-primary/30">
                        <Target className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg text-foreground">Claridad Total</h3>
                    </div>
                    {expandedBenefits.includes(0) ? (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                  <FadeInUp
                    initial={false}
                    animate={{ height: expandedBenefits.includes(0) ? 'auto' : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Sabrás exactamente dónde está tu negocio digitalmente y qué necesitas para crecer.
                      </p>
                    </div>
                  </FadeInUp>
                </div>
                
                {/* Beneficio 2: Sin Riesgo */}
                <div className="bg-card rounded-xl border border-primary/50 shadow-lg overflow-hidden">
                  <button
                    onClick={() => toggleBenefit(1)}
                    className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/20 rounded-full p-2 border border-primary/30">
                        <TrendingUp className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg text-foreground">Sin Riesgo</h3>
                    </div>
                    {expandedBenefits.includes(1) ? (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                  <FadeInUp
                    initial={false}
                    animate={{ height: expandedBenefits.includes(1) ? 'auto' : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4">
                      <p className="text-muted-foreground leading-relaxed">
                        El costo se descuenta 100% de tu primera factura si continúas con nosotros.
                      </p>
                    </div>
                  </FadeInUp>
                </div>
                
                {/* Beneficio 3: Plan Personalizado */}
                <div className="bg-card rounded-xl border border-primary/50 shadow-lg overflow-hidden">
                  <button
                    onClick={() => toggleBenefit(2)}
                    className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/20 rounded-full p-2 border border-primary/30">
                        <CheckCircle className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg text-foreground">Plan Personalizado</h3>
                    </div>
                    {expandedBenefits.includes(2) ? (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                  <FadeInUp
                    initial={false}
                    animate={{ height: expandedBenefits.includes(2) ? 'auto' : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Recibirás recomendaciones específicas para tu negocio y objetivos.
                      </p>
                    </div>
                  </FadeInUp>
                </div>
                
                {/* Beneficio 4: Quick Wins */}
                <div className="bg-card rounded-xl border border-primary/50 shadow-lg overflow-hidden">
                  <button
                    onClick={() => toggleBenefit(3)}
                    className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/20 rounded-full p-2 border border-primary/30">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg text-foreground">Quick Wins</h3>
                    </div>
                    {expandedBenefits.includes(3) ? (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                  <FadeInUp
                    initial={false}
                    animate={{ height: expandedBenefits.includes(3) ? 'auto' : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Identificamos oportunidades de mejora inmediata que puedes implementar ya.
                      </p>
                    </div>
                  </FadeInUp>
                </div>
                
                {/* Información adicional integrada */}
                <div className="bg-card rounded-xl border border-primary/50 p-6 shadow-lg">
                  <div className="text-center">
                    <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                      Si decides continuar con nosotros, el costo se descuenta íntegramente de tu primer mes de suscripción. Si no, te quedas con el plan de acción completo y detallado que hemos desarrollado para tu negocio.
                    </p>
                    <p className="text-muted-foreground">
                      Es la forma más inteligente de empezar: obtienes valor inmediato, construyes confianza en nuestro trabajo y tomas la decisión correcta para tu negocio con total seguridad.
                    </p>
                  </div>
                </div>
              </FadeInUp>
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            ¿Listo para Transformar tu Presencia Digital?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Comienza con el Impulso Estratégico y descubre exactamente qué necesita tu negocio para crecer digitalmente.
          </p>
          <Link to="/contacto?servicio=impulso-estrategico">
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold rounded-xl"
            >
              Solicítalo Ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Estrategia; 