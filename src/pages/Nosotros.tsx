import React from 'react';
import { FadeIn } from '@/components/ui/SimpleAnimations';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Nosotros = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Mini Hero Section */}
      <section className="pt-40 pb-16">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center">
            <FadeIn delay={0.1} className="text-4xl lg:text-6xl font-black text-foreground mb-8">
              NOSOTROS
            </FadeIn>
            <FadeIn delay={0.2} className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto">
              Conoce más sobre nuestro equipo y nuestra misión de transformar tu presencia digital.
            </FadeIn>
          </FadeIn>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <FadeIn className="bg-destructive text-destructive-foreground p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Página Funcionando</h2>
            <p className="text-lg">
              Esta es la página de Nosotros. 
              <br />
              Aquí se implementará información sobre el equipo y la empresa.
            </p>
          </FadeIn>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Nosotros; 