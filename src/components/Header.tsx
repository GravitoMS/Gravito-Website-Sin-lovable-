
import React from 'react';
import CustomLink from './CustomLink';

import { ANIMATION_DURATIONS, ANIMATION_DELAYS, EASING_FUNCTIONS } from '@/lib/animations';

const Header = () => {
  return (
    <header className="fixed top-1 left-6 right-6 z-50">
      <div className="backdrop-blur-sm bg-background/20 border border-border/85 shadow-lg rounded-full px-6 py-3 transition-all duration-fast" style={{
        boxShadow: '0 0 20px -5px hsl(var(--hero-green) / 0.2)',
        willChange: 'transform, box-shadow'
      }}>
        <div className="flex items-center justify-between">
          {/* Logo y nombre de la marca - Lado izquierdo */}
          <div className="flex items-center space-x-3">
            <CustomLink to="/" className="flex items-center">
              <img 
                src="https://iili.io/FiC9Lbe.png" 
                alt="Gravito Media Solutions Logo" 
                className="h-6 w-auto object-contain"
              />
            </CustomLink>
            <CustomLink to="/" className="text-foreground relative hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-fast font-medium text-sm">
              Gravito Media Solutions
            </CustomLink>
          </div>

          {/* Navegación centrada */}
          <nav className="hidden md:flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
            <CustomLink to="/servicios" className="text-foreground relative hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-fast text-sm">
              Servicios
            </CustomLink>
            <CustomLink to="/nosotros" className="text-foreground relative hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-fast text-sm">
              Nosotros
            </CustomLink>
            <CustomLink to="/blog" className="text-foreground relative hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-fast text-sm">
              Blog GMS
            </CustomLink>
            <CustomLink to="/contacto" className="text-foreground relative hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-fast text-sm">
              Contacto
            </CustomLink>
          </nav>

          {/* Espacio vacío del lado derecho para mantener el balance */}
          <div className="flex items-center space-x-3 invisible">
            <div className="h-6 w-auto"></div>
            <div className="text-sm">Gravito Media Solutions</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
