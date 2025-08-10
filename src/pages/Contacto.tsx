import React, { useMemo } from 'react';
import { FadeIn } from '@/components/ui/SimpleAnimations';
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-40 pb-16">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center">
            <h1 className="text-4xl lg:text-6xl font-black text-foreground mb-8">
              CONTACTO
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto">
              Ponte en contacto con nosotros para comenzar a transformar tu presencia digital.
            </p>
          </FadeIn>
        </div>
      </section>
      
      {/* Información de Contacto */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <FadeIn key={info.title} delay={index * 0.1}>
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
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Formulario de Contacto */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Formulario de Contacto
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Completa el formulario para obtener tu cotización gratuita.
            </p>
          </FadeIn>
          
          <ContactForm />
        </div>
      </section>

      {/* Información Adicional */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <h3 className="text-2xl lg:text-3xl font-bold mb-6">
                ¿Por qué elegir Gravito Media Solutions?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Respuesta rápida:</strong> Nos comprometemos a responder en menos de 24 horas
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Consulta gratuita:</strong> Tu primera consulta no tiene costo
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Experiencia personalizada:</strong> Adaptamos cada solución a tus necesidades
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Soporte continuo:</strong> Te acompañamos durante todo el proceso
                  </div>
                </li>
              </ul>
            </FadeIn>
            
            <FadeIn className="text-center lg:text-left" delay={0.2}>
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
            </FadeIn>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contacto;