import React, { useMemo } from 'react';
import { FadeIn, HoverScale } from '@/components/ui/SimpleAnimations';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Map, MessageCircle, Video, MapPin, Camera, Shield, 
  Users, Video as VideoIcon, Rocket, CheckCircle, CreditCard 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface ServiceCard {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  benefit: string;
  color: string;
}

// Configuración centralizada para servicios
const serviceConfig = {
  colors: ['blue', 'green', 'purple', 'orange', 'pink', 'indigo', 'teal', 'red', 'yellow', 'emerald'],
  icons: [Map, MessageCircle, Video, MapPin, Camera, Shield, Users, VideoIcon, Rocket, CheckCircle],
  data: [
    {
      title: "Estrategia Antes que Ejecución",
      description: "Decimos adiós a la improvisación. Cada mes comienza con una bitácora de ejecución, una ruta clara y lo más importante, una estrategia definida. Sabrás exactamente qué haremos, cuándo lo haremos y, lo más importante, el objetivo detrás de cada acción.",
      benefit: "Estrategia + Planeación Mensual = ☑️ Resultados Predecibles."
    },
    {
      title: "Gestión Integral de Redes Sociales",
      description: "Nos encargamos del ciclo completo día a día: creamos tus diseños, escribimos el copy, programamos el contenido y gestionamos la interacción diaria con tu comunidad. Tu presencia en redes, resuelta.",
      benefit: "Tranquilidad y Consistencia Profesional."
    },
    {
      title: "Diseño Gráfico y Edición de Video",
      description: "No solo creamos diseños para tus redes sociales. Cuando Gravito Media Solutions es tu preferencia, obtienes Social Media Graphics, diseño de Marketing/Brand Collateral, Servicio de Post Producción y más!",
      benefit: "Partner realmente FULL SERVICE"
    },
    {
      title: "Google My Business → Gestión/Optimización/SEO",
      description: "Posicionamos tu negocio para atraer a los clientes que más importan: los que están cerca de ti. Optimizamos tu perfil, gestionamos tus reseñas y aplicamos estrategias para que destaques en las búsquedas locales. Tu presencia en Google, resuelta.",
      benefit: "Más Clientes Locales."
    },
    {
      title: "Sesiones De Fotografía Profesional",
      description: "Combinamos lo profesional con lo auténtico. La mayoría de nuestros planes ya incluyen sesiones de fotografía profesional para que tu marca luzca impecable. Lo mejor es que nosotros te recomendamos a los mejores studios y fotógrafos profesionales para tu marca o negocio!",
      benefit: "Calidad Visual"
    },
    {
      title: "Aprobación De Post y Control Total",
      description: "Tú siempre tienes la última palabra. Si lo deseas, tendrás la habilidad de ingresar a nuestro portal, revisar y aprobar cada pieza de contenido antes de que se publique. Te damos el control total y la tranquilidad de que todo está 100% alineado con tu visión.",
      benefit: "Transparencia y Control Total."
    },
    {
      title: "Estrategia UGC y Colaboraciones",
      description: "Desde colaboraciones con los influencers más conocidos hasta la gestión de contenido generado por usuarios (UGC) para construir prueba social y confianza total.",
      benefit: "Credibilidad y Confianza."
    },
    {
      title: "Video-Consultoría Personal",
      description: "No solo te enviamos reportes, te los explicamos. Cada mes, tu estratega personal graba un video-análisis detallado para que entiendas tus resultados, las oportunidades clave y el plan de acción. Es una consultoría, no un simple resumen.",
      benefit: "Guía Experta y Consultoría Personal"
    },
    {
      title: "Expertos en Google y Meta Ads",
      description: "Como cliente de GMS, obtienes acceso a nuestra red de profesionales verificados en Google y Meta Ads. Te conectamos específicamente con expertos en el nicho de tu negocio para llevar tus resultados al siguiente nivel cuando tú lo decidas.",
      benefit: "Un Socio para tu Crecimiento a Largo Plazo."
    },
    {
      title: "Aprobación y Control en tus Manos",
      description: "Tú siempre tienes la última palabra. A través de nuestro portal, puedes revisar y aprobar cada pieza de contenido antes de que se publique. Te damos el control total y la tranquilidad de que todo está 100% alineado con tu visión.",
      benefit: "Transparencia, Confianza y Control Total."
    }
  ]
};

// Función helper para obtener clase de título
const getTitleClass = (title: string) => {
  const baseClass = "font-bold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight cursor-pointer hover:underline";
  const sizeClass = title.includes("Google My Business") ? "text-xs" : "text-sm";
  return `${baseClass} ${sizeClass}`;
};

// Componente memoizado para tarjeta de servicio
const ServiceCard = React.memo<{ service: ServiceCard; index: number }>(({ service, index }) => (
  <FadeIn 
    className="flex-shrink-0 w-64 ml-4"
    delay={index * 0.1}
  >
    <Card className="border border-primary/20 bg-card hover:shadow-lg transition-all duration-300 hover:border-primary/40 h-full group">
      <CardContent className="p-6 h-full flex flex-col">
        <HoverScale className="flex items-start space-x-3 mb-4">
          <div className={`p-2 rounded-lg group-hover:bg-opacity-30 transition-colors duration-300 bg-gradient-to-br ${service.color} flex-shrink-0`}>
            <service.icon className="h-5 w-5 text-primary" />
          </div>
          <Link to="/suscripciones" className="flex-1">
            <h3 className={getTitleClass(service.title)}>
              {service.title}
            </h3>
          </Link>
        </HoverScale>
        <p className="text-muted-foreground leading-relaxed flex-grow mb-3 text-xs">
          {service.description}
        </p>
        {service.benefit && (
          <div className="mt-auto">
            <p className="text-xs font-semibold text-primary bg-primary/10 p-2 rounded-lg">
              {service.benefit}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  </FadeIn>
));

// Componente memoizado para grupo de carrusel
const CarouselGroup = React.memo<{ services: ServiceCard[]; direction: 'left' | 'right' }>(({ services, direction }) => (
  <div className={`carousel-container-${direction}`}>
    {/* Renderizar servicios originales */}
    {services.map((service, index) => (
      <ServiceCard key={index} service={service} index={index} />
    ))}
    {/* Renderizar duplicados para carrusel infinito */}
    {services.map((service, index) => (
      <ServiceCard key={`duplicate-${index}`} service={service} index={index + services.length} />
    ))}
  </div>
));

const ServicesCarousel: React.FC = () => {
  // Intersection Observer para detectar cuando la sección está visible
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px'
  });

  // Memoizar servicios para evitar re-creaciones
  const services = useMemo(() => 
    serviceConfig.data.map((data, index) => ({
      ...data,
      icon: serviceConfig.icons[index],
      color: `from-${serviceConfig.colors[index]}-500/20 to-${serviceConfig.colors[index]}-600/10`
    })), []
  );

  // Dividir servicios en dos grupos
  const firstGroup = useMemo(() => services.slice(0, 5), [services]);
  const secondGroup = useMemo(() => services.slice(5), [services]);

  return (
    <div ref={elementRef} className="relative w-full overflow-hidden py-8 space-y-6">
      {/* Solo renderizar carruseles cuando estén visibles */}
      {isIntersecting && (
        <>
          {/* Primer carrusel - Izquierda a Derecha */}
          <CarouselGroup services={firstGroup} direction="left" />
          
          {/* Segundo carrusel - Derecha a Izquierda */}
          <CarouselGroup services={secondGroup} direction="right" />
        </>
      )}

      {/* Broche de Oro - Tarjeta Especial */}
      <div className="mt-12 flex justify-center">
        <FadeIn delay={0.5}>
          <Card className="border border-primary/20 bg-card hover:shadow-lg transition-all duration-300 hover:border-primary/40 max-w-md mx-auto group">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-lg group-hover:bg-opacity-30 transition-colors duration-300 bg-gradient-to-br from-primary/20 to-primary/10">
                  <CreditCard className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                Todo Esto y MÁS, Una y Otra Vez.
              </h3>
              <p className="text-muted-foreground mb-6 text-sm">
                Hemos diseñado tres planes escalables para acompañar el crecimiento de tu negocio, desde establecer una presencia sólida hasta convertirnos en tu socio estratégico.
              </p>
              <Link to="/suscripciones">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm py-3">
                  Ver Planes de Suscripción
                </Button>
              </Link>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
};

export default ServicesCarousel;