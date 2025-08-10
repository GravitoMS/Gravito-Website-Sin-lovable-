import React from 'react';
import { FadeInUp, FadeInUpStaggered, FadeInSide, FadeInScale, HoverScale, HoverLift, HoverGlow, FadeInOnScroll, SlideInOnScroll, LoadingPulse, LoadingBounce, FadeInUpWithHover, StaggeredGroup } from '@/components/ui/AnimatedComponents';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { SimpleBlogCMS } from '../components/SimpleBlogCMS';
import { useAuthSafe } from '../contexts/AuthContext';

const Blog = () => {
  const { isAdmin } = useAuthSafe()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Mini Hero Section */}
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
              BLOG
            </FadeInUp>
            <FadeInUp 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto"
            >
              Descubre insights valiosos sobre marketing digital y estrategias de crecimiento.
            </FadeInUp>
          </FadeInUp>
        </div>
      </section>
      
      {/* Main Content */}
      {isAdmin ? (
        <SimpleBlogCMS />
      ) : (
        <section className="py-16">
          <div className="container mx-auto px-6">
            <FadeInUp 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-destructive text-destructive-foreground p-8 rounded-lg text-center"
            >
              <h2 className="text-2xl font-bold mb-4">Página Funcionando</h2>
              <p className="text-lg">
                Esta es la página de Blog. 
                <br />
                Aquí se implementará el blog con artículos y contenido educativo.
              </p>
            </FadeInUp>
          </div>
        </section>
      )}
      
      <Footer />
    </div>
  );
};

export default Blog; 