import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Mouse } from "lucide-react";
const Index = () => {
  return <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with Spline Background */}
      <section className="relative overflow-hidden bg-black">
        {/* Spline Background */}
        <div className="absolute inset-0 w-full h-full">
          <iframe src="https://my.spline.design/waveform-YSe8p0A6zP9xanzxuXbn1y8l/" frameBorder="0" width="100%" height="100%" className="absolute inset-0" style={{
          border: 'none'
        }} />
          {/* Subtle blur overlay to reduce competition with text */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="container mx-auto px-6 py-20 lg:py-32">
            <div className="flex flex-col items-center text-center gap-12">
              <div className="max-w-4xl">
                <h1 className="text-5xl lg:text-7xl font-black text-foreground mb-8 leading-none">
                  GESTIÓN
                  <br />
                  INTEGRAL DE TU
                  <br />
                  <span className="text-primary">PRESENCIA DIGITAL</span>
                </h1>
                <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-5xl mx-auto">Nos encargamos de todo. Obtienes más tiempo para  tu negocio, mientras sembramos tu crecimiento digital</p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <Button variant="hero-yellow" size="lg" className="text-lg px-10 py-8">
                    Descubre tu Estrategia
                  </Button>
                  <Button variant="hero-green" size="lg" className="text-lg px-10 py-8">
                    Ver Nuestros Servicios
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
            <div className="flex flex-col items-center animate-bounce">
              <Mouse className="w-8 h-8 text-muted-foreground animate-pulse" />
            </div>
          </div>
        </div>
        
        {/* Smooth gradient transition to normal background */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/60 to-transparent z-20 pointer-events-none"></div>
      </section>

      {/* Who We Are Section - Normal Background */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-6xl lg:text-8xl font-black text-foreground mb-8 leading-none">
                ¿QUIÉNES
                <br />
                SOMOS?
              </h2>
              <div className="space-y-6 mb-12 max-w-xl">
                <p className="text-xl lg:text-2xl text-muted-foreground">
                  Somos la agencia de consultoría y marketing digital que actúa como tu departamento de marketing externo.
                </p>
                
                <div className="flex justify-center">
                  <div className="w-16 h-px bg-border"></div>
                </div>
                
                <p className="text-xl lg:text-2xl text-muted-foreground">
                  Vamos más allá de solo la gestión de redes sociales; integramos nuestros servicios de valor con consultorías, análisis de datos y nuestra propia tecnología de IA para entregar no solo contenido, sino una hoja de ruta clara para el crecimiento económico y digital de tu negocio.
                </p>
              </div>
              <Button size="lg" className="text-lg px-10 py-8 rounded-full border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background transition-all duration-300">
                Más Sobre Nosotros
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="stats-card highlight-primary">
                <h3 className="text-lg font-semibold mb-2">Negocios Impulsados</h3>
                <div className="text-6xl font-black">+27</div>
              </div>
              
              <div className="stats-card">
                <h3 className="text-lg font-semibold mb-2 text-muted-foreground">Experiencia Combinada</h3>
                <div className="text-6xl font-black">7 años</div>
              </div>
              
              <div className="stats-card highlight-secondary">
                <h3 className="text-lg font-semibold mb-2">Mentes por Cliente</h3>
                <div className="text-6xl font-black">+4</div>
              </div>
              
              <div className="stats-card">
                <h3 className="text-lg font-semibold mb-2 text-muted-foreground">Tasa de Retención</h3>
                <div className="text-6xl font-black">97%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-4xl lg:text-6xl font-black text-center mb-16 relative inline-block w-full">
          <span className="relative overflow-hidden">
            LO QUE HACEMOS POR TI
            <span className="absolute bottom-0 left-0 h-1 bg-secondary rounded-full animate-carousel-slide-precise" style={{width: '100%'}}></span>
          </span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[{
          title: "Decisiones Basadas en Datos",
          description: "Monitoreamos y analizamos constantemente el rendimiento de tus redes sociales para tomar decisiones inteligentes, no suposiciones."
        }, {
          title: "Una Hoja de Ruta Clara",
          description: "Convertimos esos datos en una estrategia personalizada y comprobada para tu negocio, entregándote el plan de acción que seguiremos de una manera visual y fácil de entender cada mes."
        }, {
          title: "Contenido que Conecta",
          description: "Utilizando los servicios Gravito, creamos contenido atractivo y relevante que resuena con tu audiencia, diseñado para generar confianza, iniciar conversaciones y construir una comunidad alrededor de tu negocio."
        }, {
          title: "Crecimiento de la Comunidad",
          description: "Gestionamos la interacción diaria con tus clientes y seguidores, convirtiendo a tu audiencia pasiva en una comunidad activa y comprometida con tu marca."
        }].map((service, index) => <div key={index} className="stats-card">
              <h3 className="text-2xl font-bold mb-6">{service.title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">{service.description}</p>
            </div>)}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-8xl lg:text-[12rem] font-black mb-12 relative inline-block w-full overflow-hidden whitespace-nowrap">
            <span className="animate-carousel-glow inline-block">
              TU MARKETING EN MANOS DE EXPERTOS
            </span>
          </h2>
          <Button variant="hero-yellow" size="lg" className="text-lg px-10 py-8 mb-12">
            Descubre tu Estrategia
          </Button>
          <p className="text-xl lg:text-2xl max-w-3xl mx-auto opacity-90">
            Enfócate en tu negocio mientras nosotros nos encargamos de hacer crecer tu presencia digital
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <span>© 2025</span>
              <span>Gravito Marketing Solutions</span>
              <span>All Rights Reserved.</span>
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="/privacy-policy" 
                className="underline hover:text-foreground transition-colors duration-200"
              >
                Privacy Policy & GDPR
              </a>
              <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
              <a 
                href="/terms-of-service" 
                className="underline hover:text-foreground transition-colors duration-200"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;