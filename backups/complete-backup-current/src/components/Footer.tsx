import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Footer = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  return (
    <footer className="bg-slate-900 text-white">
      {/* Top Section - Four Columns */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* GRAVITO VS Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">GRAVITO VS</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button 
                  onClick={() => toggleSection('clickfunnels')}
                  className="flex items-center justify-between w-full text-left hover:text-white transition-colors"
                >
                  Gravito Vs ClickFunnels
                  {expandedSections.includes('clickfunnels') ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {expandedSections.includes('clickfunnels') && (
                  <div className="mt-2 ml-4 text-sm text-gray-400">
                    <p>Comparación detallada de funcionalidades y beneficios</p>
                  </div>
                )}
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Gravito Vs HubSpot
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Gravito Vs ActiveCampaign
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Gravito Vs Kartra
              </li>
            </ul>
          </div>

          {/* SOBRE GRAVITO Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">SOBRE GRAVITO</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-white transition-colors cursor-pointer">
                Blogs
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Casos de Éxito
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Recursos
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Metodología
              </li>
            </ul>
          </div>

          {/* CONTÁCTANOS Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">CONTÁCTANOS</h3>
            <div className="space-y-2 text-gray-300">
              <p className="font-semibold">Oficina Principal</p>
              <p>Ciudad de México, México</p>
              <p>Email: contacto@gravitoms.com</p>
              <p>Tel: +52 55 1234 5678</p>
              <p>Horario: Lun-Vie 9:00-18:00</p>
            </div>
          </div>

          {/* REDES SOCIALES Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">REDES SOCIALES</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Separator Line */}
      <div className="border-t border-gray-700"></div>

      {/* Bottom Section */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          
          {/* Logo */}
          <div className="flex items-center space-x-2">
            {/* TODO: Replace with actual logo URL */}
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-white font-semibold">Gravito Media Solutions</span>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-300 text-sm">
            <p>© 2025 Gravito Media Solutions | Todos los Derechos Reservados</p>
            <p>No Vender ni Compartir Mi Información</p>
          </div>

          {/* Legal Links */}
          <div className="text-gray-300 text-sm">
            <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="mx-2">|</span>
            <a href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 