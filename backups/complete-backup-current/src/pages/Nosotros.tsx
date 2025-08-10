import React from 'react';
import Header from '../components/Header';

const Nosotros = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Mini Hero Section */}
      <section className="pt-40 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-black text-foreground mb-8">
              NOSOTROS
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto">
              Conoce nuestro equipo y la pasión que ponemos en cada proyecto para hacer crecer tu negocio.
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
        
                  <div className="bg-muted text-muted-foreground p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Página Funcionando</h2>
            <p className="text-lg">
              Esta es la página de Nosotros. 
              <br />
              Aquí se implementará el contenido específico sobre nuestro equipo.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nosotros; 