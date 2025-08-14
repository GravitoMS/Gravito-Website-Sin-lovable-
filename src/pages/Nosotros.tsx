import React from 'react';
import { FadeIn, HoverScale } from '@/components/ui/SimpleAnimations';
import { ArrowRight, Target, Zap, Eye, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Nosotros = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center max-w-6xl mx-auto">
            <FadeIn delay={0.1} className="text-4xl lg:text-6xl xl:text-7xl font-black text-foreground mb-8 leading-tight">
              Liberamos a los negocios de la{' '}
              <span className="text-primary" style={{
                background: 'linear-gradient(135deg, hsl(162 100% 45%) 0%, hsl(162 100% 55%) 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 20px hsl(162 100% 45% / 0.3)'
              }}>
                carga digital
              </span>.
            </FadeIn>
            <FadeIn delay={0.2} className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Para los dueños de negocios locales, mantener una presencia digital a menudo se siente como una segunda jornada laboral. Gravito Media Solutions nació para cambiar eso. Siguiendo nuestra visión de actuar como tu propio departamento de consultoría y gestión digital externo, manejamos la complejidad digital para que tú puedas enfocarte en lo que realmente importa: dirigir tu negocio.
            </FadeIn>
          </FadeIn>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <div className="flex flex-col items-center animate-bounce" style={{ animationDuration: '2s' }}>
            <div className="text-muted-foreground font-medium text-lg animate-bounce" style={{ animationDuration: '2s' }}>
              Desliza para continuar
            </div>
          </div>
        </div>
      </section>

      {/* Difuminado de transición */}
      <div className="h-16 bg-gradient-to-b from-background to-muted/20"></div>

      {/* Nuestra Filosofía */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6" style={{
              textShadow: '0 0 20px hsl(162 100% 45% / 0.3), 0 0 40px hsl(162 100% 45% / 0.2)',
              willChange: 'text-shadow'
            }}>
              Nuestra Forma de Trabajar
            </h2>
          </FadeIn>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Columna 1 */}
              <FadeIn delay={0.1}>
                <HoverScale>
                  <Card className="border-primary/20 bg-card/50 backdrop-blur-sm h-full">
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Target className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl lg:text-2xl font-bold text-foreground">
                        Creemos en la Estrategia, no en la Suerte
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        Nunca publicamos por publicar. Cada acción que tomamos se basa en un Diagnóstico Estratégico y una Línea del Tiempo clara. Siempre sabrás qué haremos y, lo más importante, por qué lo haremos.
                      </p>
                    </CardContent>
                  </Card>
                </HoverScale>
              </FadeIn>

              {/* Columna 2 */}
              <FadeIn delay={0.2}>
                <HoverScale>
                  <Card className="border-hero-yellow/20 bg-card/50 backdrop-blur-sm h-full">
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 bg-hero-yellow/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Zap className="h-8 w-8 text-hero-yellow" />
                      </div>
                      <CardTitle className="text-xl lg:text-2xl font-bold text-foreground">
                        Creemos en la Ejecución, no en las Excusas
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        Una gran estrategia no sirve de nada sin una ejecución impecable. Nuestro equipo se encarga de todo el ciclo de producción, desde el diseño gráfico y la redacción de copy hasta la gestión diaria de la comunidad con un estándar de calidad profesional.
                      </p>
                    </CardContent>
                  </Card>
                </HoverScale>
              </FadeIn>

              {/* Columna 3 */}
              <FadeIn delay={0.3}>
                <HoverScale>
                  <Card className="border-primary/20 bg-card/50 backdrop-blur-sm h-full">
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Eye className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl lg:text-2xl font-bold text-foreground">
                        Creemos en la Transparencia, no en la Confusión
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        Creemos que debes estar siempre informado. Por eso, cada entregable estratégico viene acompañado de una Video-Consultoría personal. Te explicamos los resultados y el plan de una manera clara y directa, asegurando que siempre tengas el control.
                      </p>
                    </CardContent>
                  </Card>
                </HoverScale>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Difuminado de transición */}
      <div className="h-16 bg-gradient-to-b from-muted/20 to-background"></div>

      {/* El Fundador */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6" style={{
              textShadow: '0 0 20px hsl(162 100% 45% / 0.3), 0 0 40px hsl(162 100% 45% / 0.2)',
              willChange: 'text-shadow'
            }}>
              Conoce a Nuestro Fundador
            </h2>
          </FadeIn>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Columna Izquierda - Imagen */}
              <FadeIn delay={0.1} className="text-center lg:text-left">
                <div className="bg-gradient-to-br from-primary/10 to-hero-yellow/10 rounded-2xl p-8 border border-primary/20">
                  <div className="w-64 h-64 bg-muted/30 rounded-full mx-auto lg:mx-0 flex items-center justify-center">
                    <span className="text-6xl">👨‍💼</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    [Imagen del fundador se agregará aquí]
                  </p>
                </div>
              </FadeIn>

              {/* Columna Derecha - Contenido */}
              <FadeIn delay={0.2}>
                <div className="space-y-6">
                  <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
                    [Tu Nombre] - Fundador y Estratega Principal
                  </h3>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    "Fundé Gravito Media Solutions con una misión: crear el servicio de marketing que yo mismo querría contratar. Un sistema que combina la estrategia profunda con una ejecución impecable, todo envuelto en una comunicación transparente y humana. Mi objetivo no es ser tu 'proveedor', es ser el socio estratégico que te da la tranquilidad para crecer."
                  </p>
                  
                  <div className="bg-hero-yellow/10 border border-hero-yellow/20 rounded-lg p-6">
                    <div className="flex items-start space-x-3">
                      <Quote className="h-6 w-6 text-hero-yellow flex-shrink-0 mt-1" />
                      <blockquote className="text-lg font-semibold text-foreground italic">
                        "Mi filosofía es simple: ser tan valioso para tu negocio que el precio se vuelva secundario."
                      </blockquote>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Difuminado de transición */}
      <div className="h-16 bg-gradient-to-b from-background to-primary"></div>

      {/* Llamado a la Acción Final */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-6">
              ¿Listo para transformar tu marketing?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/suscripciones">
                <Button size="lg" className="bg-hero-yellow hover:bg-hero-yellow/90 text-hero-yellow-foreground px-10 py-4 text-lg font-semibold rounded-xl">
                  Descubre Nuestros Planes
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/estrategia">
                <Button variant="ghost" size="lg" className="px-10 py-4 text-lg font-semibold rounded-xl text-hero-yellow border-2 border-hero-yellow hover:bg-hero-yellow hover:text-hero-yellow-foreground transition-all duration-300">
                  Conoce nuestro Impulso Estratégico
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

export default Nosotros; 