import React from 'react';
import { FadeIn, HoverScale } from '@/components/ui/SimpleAnimations';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Map, Puzzle, MessageCircle } from 'lucide-react';

interface ServiceCard {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
}

const services: ServiceCard[] = [
  {
    icon: Brain,
    title: "Análisis y Decisiones Basadas en Datos",
    description: "No solo gestionamos, analizamos. Convertimos los datos de tus redes en decisiones inteligentes y estrategias comprobadas que impulsan el crecimiento real de tu negocio.",
    color: "from-info/20 to-info/10"
  },
  {
    icon: Map,
    title: "Una Hoja de Ruta Clara",
    description: "Olvídate de la incertidumbre. Te entregamos un plan de acción visual y detallado cada mes para que sepas exactamente qué haremos, por qué lo haremos y qué objetivos buscamos alcanzar.",
    color: "from-success/20 to-success/10"
  },
  {
    icon: Puzzle,
    title: "Contenido que Conecta",
    description: "Creamos contenido atractivo y relevante que resuena con tu audiencia. Desde el diseño gráfico hasta los videos UGC, nuestro objetivo es generar confianza y construir una comunidad leal.",
    color: "from-muted/20 to-muted/10"
  },
  {
    icon: MessageCircle,
    title: "Crecimiento de la Comunidad",
    description: "Transformamos a tu audiencia pasiva en una comunidad activa y comprometida. Gestionamos la interacción diaria para fortalecer la relación con tus clientes y convertir seguidores en fans.",
    color: "from-warning/20 to-warning/10"
  }
];

const ServicesCarousel: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden py-8">
      <div className="flex space-x-8 animate-[slide_42s_linear_infinite]">
        {/* Primera ronda de tarjetas */}
        {services.map((service, index) => (
          <FadeIn 
            key={index} 
            className="flex-shrink-0 w-80 ml-6"
            delay={index * 0.1}
          >
            <Card className="border border-primary/20 bg-card hover:shadow-lg transition-all duration-300 hover:border-primary/40 h-full group">
              <CardContent className="p-8 h-full flex flex-col">
                <HoverScale className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                </HoverScale>
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
        
        {/* Segunda ronda de tarjetas (para el carrusel infinito) */}
        {services.map((service, index) => (
          <FadeIn 
            key={`duplicate-${index}`} 
            className="flex-shrink-0 w-80 ml-6"
            delay={(index + services.length) * 0.1}
          >
            <Card className="border border-primary/20 bg-card hover:shadow-lg transition-all duration-300 hover:border-primary/40 h-full group">
              <CardContent className="p-8 h-full flex flex-col">
                <HoverScale className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                </HoverScale>
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>
    </div>
  );
};

export default ServicesCarousel;