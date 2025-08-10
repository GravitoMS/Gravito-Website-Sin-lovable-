import React from 'react';
import Header from '../components/Header';

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Mini Hero Section */}
      <section className="pt-40 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-black text-foreground mb-8">
              BLOG GMS
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto">
              Descubre insights, estrategias y tendencias del marketing digital que transformarán tu negocio.
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
        
                  <div className="bg-accent text-accent-foreground p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">✅ Página Funcionando</h2>
            <p className="text-lg">
              Esta es la página del Blog GMS. 
              <br />
              Aquí se implementará el contenido específico del blog con artículos y recursos.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog; 