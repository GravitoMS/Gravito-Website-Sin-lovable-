import React from 'react';
import { motion } from 'framer-motion';
import { FadeInUp } from '@/components/ui/AnimatedComponents';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { SimpleBlogCMS } from '../components/SimpleBlogCMS';
import { useAuth } from '../contexts/AuthContext';

const Blog = () => {
  const { isAdmin } = useAuth()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto px-6">
          <FadeInUp 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubre insights, estrategias y las últimas tendencias en marketing digital
            </p>
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