import React from 'react';
import Header from '../components/Header';

const Contacto = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Mini Hero Section */}
      <section className="pt-40 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-black text-foreground mb-8">
              CONTACTO
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto">
              Ponte en contacto con nosotros para comenzar a transformar tu presencia digital.
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
        
                  <div className="bg-destructive text-destructive-foreground p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Página Funcionando</h2>
            <p className="text-lg">
              Esta es la página de Contacto. 
              <br />
              Aquí se implementará el formulario de contacto y información de contacto.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacto; 