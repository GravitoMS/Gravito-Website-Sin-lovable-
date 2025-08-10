import React, { useMemo } from 'react';
import { FadeInUp, FadeInUpStaggered, FadeInSide, FadeInScale, HoverScale, HoverLift, HoverGlow, FadeInOnScroll, SlideInOnScroll, LoadingPulse, LoadingBounce, FadeInUpWithHover, StaggeredGroup } from '@/components/ui/AnimatedComponents';
import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Contacto = () => {
  // Memoizar información de contacto
  const contactInfo = useMemo(() => [
    {
      icon: Mail,
      title: 'Email',
      content: 'hola@gravitomedia.com',
      description: 'Envíanos un correo electrónico'
    },
    {
      icon: Phone,
      title: 'Teléfono',
      content: '+52 (55) 1234-5678',
      description: 'Llámanos directamente'
    },
    {
      icon: MapPin,
      title: 'Ubicación',
      content: 'Ciudad de México, México',
      description: 'Oficina principal'
    },
    {
      icon: Clock,
      title: 'Horarios',
      content: 'Lun - Vie: 9:00 - 18:00',
      description: 'Horario de atención'
    }
  ], []);

  const handleFormSubmit = (data: any) => {
    console.log('Formulario enviado:', data);
    // Aquí se implementaría la lógica de envío
    alert('¡Gracias por tu consulta! Te contactaremos pronto.');
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
              CONTACTO
            </FadeInUp>
            <FadeInUp 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto"
            >
              Ponte en contacto con nosotros para comenzar a transformar tu presencia digital.
            </FadeInUp>
          </FadeInUp>
        </div>
      </section>
      
      {/* Información de Contacto */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <FadeInUp
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-foreground">{info.content}</p>
                    <p className="text-sm text-muted-foreground mt-2">{info.description}</p>
                  </CardContent>
                </Card>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* Formulario de Contacto */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <FadeInUp 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Formulario de Contacto Inteligente
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Completa la información básica y selecciona el tipo de consulta para obtener campos específicos 
              que nos ayuden a brindarte la mejor atención posible.
            </p>
          </FadeInUp>
          
          <ContactForm onSubmit={handleFormSubmit} />
        </div>
      </section>

      {/* Información Adicional */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeInUp
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl lg:text-3xl font-bold mb-6">
                ¿Por qué elegir nuestro formulario inteligente?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Campos específicos:</strong> Solo mostramos los campos relevantes para tu consulta
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Respuesta rápida:</strong> Nos ayuda a categorizar y responder tu consulta más eficientemente
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Experiencia personalizada:</strong> Adaptamos la información según tus necesidades específicas
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Proceso optimizado:</strong> Reducimos el tiempo de respuesta y mejoramos la calidad de atención
                  </div>
                </li>
              </ul>
            </FadeInUp>
            
            <FadeInUp
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center lg:text-left"
            >
              <Card className="p-8">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">¿Prefieres otro método?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Si prefieres contactarnos de otra manera, también puedes:
                  </p>
                  <ul className="space-y-2 text-left">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Enviarnos un WhatsApp directo</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Agendar una llamada en nuestro calendario</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Contactarnos por redes sociales</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </FadeInUp>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contacto; 