import React, { useState } from 'react';
import { ChevronDown, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminLoginModal from './AdminLoginModal';

import { ANIMATION_DURATIONS, ANIMATION_DELAYS, EASING_FUNCTIONS } from '@/lib/animations';
// Sistema centralizado importado desde @/lib
const Footer = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // Usar el hook de autenticación
  const { isAdmin, signOut } = useAuth();
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]);
  };
  return (
    <footer className="relative bg-muted text-white overflow-hidden">
      {/* Glowing Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
      
      {/* Main Footer Container with Glowing Effect */}
      <div className="relative z-10">
        <div className="backdrop-blur-sm bg-muted/20 border border-muted/50 shadow-2xl rounded-3xl mx-6 my-8 transition-all duration-normal" 
             style={{
               boxShadow: '0 0 20px -5px hsl(var(--hero-green) / 0.2)',
               willChange: 'transform, box-shadow'
             }}>
          
          {/* Top Section - Four Columns */}
          <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* GRAVITO VS Column */}
              <div>
                <h3 className="text-lg font-bold mb-4">GRAVITO vs</h3>
                <ul className="space-y-2 text-muted-foreground">
                  {/* Opción principal */}
                  <li className="hover:text-white transition-colors cursor-pointer">
                    <Link to="/gravito-vs-template" className="block w-full">
                      <span className="relative hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-fast">
                        Gravito vs Template
                      </span>
                    </Link>
                  </li>
                  
                  {/* Contenedor para opciones futuras con animación suave */}
                  <div className="overflow-hidden">
                    <div className={`transition-all duration-normal ease-out ${expandedSections.includes('gravito-vs') ? 'max-h-32 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'}`} style={{
                    transitionProperty: 'max-height, opacity, transform',
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                  }}>
                      {/* Aquí se pueden agregar más opciones en el futuro */}
                      {/* Ejemplo de estructura para futuras opciones:
                      <li className="hover:text-white transition-colors cursor-pointer py-1">
                        <span className="relative hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-fast">
                          Nueva Opción
                        </span>
                      </li>
                      */}
                    </div>
                  </div>
                  
                  {/* Botón toggle con animación suave - Mantenido para uso futuro */}
                  <li>
                    <button onClick={() => toggleSection('gravito-vs')} className="flex items-center justify-between w-full text-left hover:text-white transition-all duration-fast text-sm font-medium group">
                      <span className="transition-all duration-fast ease-out">
                        {expandedSections.includes('gravito-vs') ? 'Ver menos' : 'Ver más'}
                      </span>
                      <div className={`transition-all duration-normal ease-out ${expandedSections.includes('gravito-vs') ? 'rotate-180' : 'rotate-0'}`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>
                  </li>
                </ul>
              </div>

              {/* SOBRE GRAVITO Column */}
              <div>
                <h3 className="text-lg font-bold mb-4">SOBRE GRAVITO</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="hover:text-white transition-colors cursor-pointer">
                    <Link to="/nosotros" className="block w-full">
                      <span className="relative hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-fast">
                        Nosotros
                      </span>
                    </Link>
                  </li>
                  <li className="hover:text-white transition-colors cursor-pointer">
                    <Link to="/blog" className="block w-full">
                      <span className="relative hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-fast">
                        Blog GMS
                      </span>
                    </Link>
                  </li>
                  <li className="hover:text-white transition-colors cursor-pointer">
                    <Link to="/contacto" className="block w-full">
                      <span className="relative hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-fast">
                        Contacto
                      </span>
                    </Link>
                  </li>
                  <li className="hover:text-white transition-colors cursor-pointer">
                    <Link to="/estrategia" className="block w-full">
                      <span className="relative hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-fast">
                        Impulso GMS
                      </span>
                    </Link>
                  </li>
                  <li className="hover:text-white transition-colors cursor-pointer">
                    <Link to="/suscripciones" className="block w-full">
                      <span className="relative hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-fast">
                        Suscripciones
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* CONTÁCTANOS Column */}
              <div>
                <h3 className="text-lg font-bold mb-4">CONTÁCTANOS</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p className="font-semibold">Oficina Principal</p>
                  <p>Ciudad de México, Mex</p>
                  <p>Email: contacto@gravitoms.com</p>
                  <p>Tel: +52 55 1234 5678</p>
                  <p>Horario: Lun-Vie 9:00-18:00</p>
                </div>
              </div>

              {/* REDES SOCIALES Column */}
              <div>
                <h3 className="text-lg font-bold mb-4">REDES SOCIALES</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-muted-foreground hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Separator Line */}
          <div className="border-t border-muted/50 mx-6"></div>

          {/* Bottom Section - Ahora dentro del contenedor con glow */}
          <div className="bg-muted text-white rounded-b-3xl">
            <div className="container mx-auto px-6 py-6">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                
                {/* Admin Login/Logout */}
                <div className="text-muted-foreground text-sm flex items-center gap-4">
                  {isAdmin ? (
                    <>
                      <Link 
                        to="/admin"
                        className="hover:text-white transition-colors cursor-pointer font-medium"
                      >
                        CMS
                      </Link>
                      <button 
                        className="hover:text-white transition-colors cursor-pointer font-medium flex items-center gap-2"
                        onClick={signOut}
                      >
                        <LogOut className="w-4 h-4" />
                        Cerrar Sesión
                      </button>
                    </>
                  ) : (
                    <button 
                      className="hover:text-white transition-colors cursor-pointer font-medium"
                      onClick={() => setShowLoginModal(true)}
                    >
                      Admin Login
                    </button>
                  )}
                </div>

                {/* Copyright - Ahora centrado */}
                <div className="text-center text-muted-foreground text-sm flex-1">
                  <p>© 2025 Gravito Media Solutions | Todos los Derechos Reservados</p>
                </div>

                {/* Legal Links */}
                <div className="text-muted-foreground text-sm">
                  <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
                  <span className="mx-2">|</span>
                  <a href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Admin Login Modal */}
      <AdminLoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </footer>
  );
};

export default Footer;