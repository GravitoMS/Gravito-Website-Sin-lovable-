
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-6 left-6 right-6 z-50">
      <div className="backdrop-blur-md bg-background/20 border border-border/85 shadow-lg rounded-full px-8 py-4 hover:animate-glow-rotate transition-all duration-300" style={{boxShadow: '0 0 40px -5px hsl(var(--hero-green) / 0.25), 0 0 20px -3px hsl(var(--hero-green) / 0.18), 0 0 60px -10px hsl(var(--hero-green) / 0.11)'}}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center">
              <img 
                src="https://iili.io/FiC9Lbe.png" 
                alt="Gravito Media Solutions Logo" 
                className="h-10 w-auto object-contain"
              />
            </Link>
            <Link to="/" className="text-foreground relative hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 font-medium">
              Gravito Media Solutions
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/estrategia" className="text-foreground relative hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300">
              Impulso GMS
            </Link>
            <Link to="/servicios" className="text-foreground relative hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300">
              Servicios
            </Link>
            <Link to="/nosotros" className="text-foreground relative hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300">
              Nosotros
            </Link>
            <Link to="/blog" className="text-foreground relative hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300">
              Blog GMS
            </Link>
            <Link to="/contacto" className="text-foreground relative hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300">
              Contacto
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
