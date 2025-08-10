import React from 'react';
import { FadeIn } from '@/components/ui/SimpleAnimations';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubre insights, estrategias y las últimas tendencias en marketing digital
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <FadeIn className="bg-destructive text-destructive-foreground p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Página Funcionando</h2>
            <p className="text-lg">
              Esta es la página de Blog. 
              <br />
              Aquí se implementará el blog con artículos y contenido educativo.
            </p>
          </FadeIn>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Blog;