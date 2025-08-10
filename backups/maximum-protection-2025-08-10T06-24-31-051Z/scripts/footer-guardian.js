import fs from 'fs';
import path from 'path';

// Configuración del Guardian del Footer
const FOOTER_GUARDIAN_CONFIG = {
  footerPath: 'src/components/Footer.tsx',
  backupPath: 'scripts/backups/Footer.tsx.backup',
  homePagePath: 'src/pages/Index.tsx',
  checkInterval: 5000, // 5 segundos
  maxBackups: 10
};

// Contenido del Footer como string para restauración
const FOOTER_CONTENT = `import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
              {/* Opciones siempre visibles (solo 2) */}
              <li className="hover:text-white transition-colors cursor-pointer">
                Gravito Vs ClickFunnels
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Gravito Vs HubSpot
              </li>
              
              {/* Opciones ocultas con animación suave */}
              <div className="overflow-hidden">
                <div 
                  className={\`transition-all duration-500 ease-out \${expandedSections.includes('gravito-vs') ? 'max-h-32 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'}\`}
                  style={{
                    transitionProperty: 'max-height, opacity, transform',
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <li className="hover:text-white transition-colors cursor-pointer py-1">
                    Gravito Vs ActiveCampaign
                  </li>
                  <li className="hover:text-white transition-colors cursor-pointer py-1">
                    Gravito Vs Kartra
                  </li>
                </div>
              </div>
              
              {/* Botón toggle con animación suave */}
              <li>
                <button 
                  onClick={() => toggleSection('gravito-vs')}
                  className="flex items-center justify-between w-full text-left hover:text-white transition-all duration-300 text-sm font-medium group"
                >
                  <span className="transition-all duration-300 ease-out">
                    {expandedSections.includes('gravito-vs') ? 'Ver menos' : 'Ver más'}
                  </span>
                  <div 
                    className={\`transition-all duration-500 ease-out \${expandedSections.includes('gravito-vs') ? 'rotate-180' : 'rotate-0'}\`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
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

export default Footer;`;

// Función para crear backup del Footer
function createBackup() {
  try {
    const footerPath = path.join(process.cwd(), FOOTER_GUARDIAN_CONFIG.footerPath);
    const backupDir = path.dirname(path.join(process.cwd(), FOOTER_GUARDIAN_CONFIG.backupPath));
    
    // Crear directorio de backup si no existe
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    if (fs.existsSync(footerPath)) {
      const footerContent = fs.readFileSync(footerPath, 'utf8');
      fs.writeFileSync(path.join(process.cwd(), FOOTER_GUARDIAN_CONFIG.backupPath), footerContent);
      console.log('🛡️ Backup del Footer creado');
      return true;
    }
  } catch (error) {
    console.error('❌ Error creando backup:', error.message);
  }
  return false;
}

// Función para restaurar Footer desde backup
function restoreFromBackup() {
  try {
    const backupPath = path.join(process.cwd(), FOOTER_GUARDIAN_CONFIG.backupPath);
    const footerPath = path.join(process.cwd(), FOOTER_GUARDIAN_CONFIG.footerPath);
    
    if (fs.existsSync(backupPath)) {
      const backupContent = fs.readFileSync(backupPath, 'utf8');
      fs.writeFileSync(footerPath, backupContent);
      console.log('🔄 Footer restaurado desde backup');
      return true;
    }
  } catch (error) {
    console.error('❌ Error restaurando desde backup:', error.message);
  }
  return false;
}

// Función para restaurar Footer desde contenido hardcodeado
function restoreFromHardcoded() {
  try {
    const footerPath = path.join(process.cwd(), FOOTER_GUARDIAN_CONFIG.footerPath);
    const footerDir = path.dirname(footerPath);
    
    // Crear directorio si no existe
    if (!fs.existsSync(footerDir)) {
      fs.mkdirSync(footerDir, { recursive: true });
    }
    
    fs.writeFileSync(footerPath, FOOTER_CONTENT);
    console.log('🛠️ Footer restaurado desde contenido hardcodeado');
    return true;
  } catch (error) {
    console.error('❌ Error restaurando desde hardcoded:', error.message);
  }
  return false;
}

// Función para verificar si el Footer existe y está correcto
function checkFooter() {
  try {
    const footerPath = path.join(process.cwd(), FOOTER_GUARDIAN_CONFIG.footerPath);
    
    if (!fs.existsSync(footerPath)) {
      console.log('🚨 ALERTA: Footer component NO encontrado');
      return false;
    }
    
    const content = fs.readFileSync(footerPath, 'utf8');
    
    // Verificar que tenga elementos esenciales
    const essentialElements = [
      'import React',
      'const Footer',
      'bg-slate-900',
      'GRAVITO VS',
      'ChevronDown'
    ];
    
    for (const element of essentialElements) {
      if (!content.includes(element)) {
        console.log(`🚨 ALERTA: Footer corrupto - falta: ${element}`);
        return false;
      }
    }
    
    console.log('✅ Footer verificado correctamente');
    return true;
  } catch (error) {
    console.error('❌ Error verificando Footer:', error.message);
    return false;
  }
}

// Función para verificar que la Home Page tenga el Footer
function checkHomePage() {
  try {
    const indexPath = path.join(process.cwd(), FOOTER_GUARDIAN_CONFIG.homePagePath);
    
    if (!fs.existsSync(indexPath)) {
      console.log('🚨 ALERTA: Home Page no encontrada');
      return false;
    }
    
    const content = fs.readFileSync(indexPath, 'utf8');
    
    if (!content.includes('import Footer from')) {
      console.log('🚨 ALERTA: Home Page no importa Footer');
      return false;
    }
    
    if (!content.includes('<Footer />')) {
      console.log('🚨 ALERTA: Home Page no usa Footer');
      return false;
    }
    
    console.log('✅ Home Page verificado correctamente');
    return true;
  } catch (error) {
    console.error('❌ Error verificando Home Page:', error.message);
    return false;
  }
}

// Función principal de monitoreo
function monitorFooter() {
  console.log('🛡️ Iniciando Guardian del Footer...');
  
  // Crear backup inicial
  createBackup();
  
  // Verificar estado actual
  const footerOk = checkFooter();
  const homePageOk = checkHomePage();
  
  if (!footerOk) {
    console.log('🚨 Footer corrupto o faltante - iniciando restauración...');
    
    // Intentar restaurar desde backup
    if (!restoreFromBackup()) {
      console.log('🛠️ Restaurando desde contenido hardcodeado...');
      restoreFromHardcoded();
    }
    
    // Verificar restauración
    if (checkFooter()) {
      console.log('✅ Footer restaurado exitosamente');
    } else {
      console.log('❌ Error en restauración del Footer');
    }
  }
  
  if (!homePageOk) {
    console.log('🚨 Home Page no tiene Footer - verificar manualmente');
  }
  
  console.log('🛡️ Guardian del Footer completado');
}

// Función para ejecutar como comando
function main() {
  const command = process.argv[2];
  
  switch (command) {
    case 'monitor':
      monitorFooter();
      break;
    case 'check':
      const footerOk = checkFooter();
      const homePageOk = checkHomePage();
      if (footerOk && homePageOk) {
        console.log('🎉 Todo está correcto');
      } else {
        console.log('❌ Se detectaron problemas');
        process.exit(1);
      }
      break;
    case 'backup':
      createBackup();
      break;
    case 'restore':
      if (!restoreFromBackup()) {
        restoreFromHardcoded();
      }
      break;
    case 'emergency':
      console.log('🚨 RESTAURACIÓN DE EMERGENCIA');
      restoreFromHardcoded();
      break;
    default:
      console.log('🛡️ Footer Guardian - Sistema de Protección');
      console.log('');
      console.log('Comandos disponibles:');
      console.log('  monitor   - Verificar y restaurar Footer si es necesario');
      console.log('  check     - Verificar estado del Footer');
      console.log('  backup    - Crear backup del Footer');
      console.log('  restore   - Restaurar Footer desde backup');
      console.log('  emergency - Restauración de emergencia desde hardcoded');
      console.log('');
      console.log('Ejemplo: node scripts/footer-guardian.js monitor');
  }
}

// Ejecutar si es llamado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export {
  monitorFooter,
  checkFooter,
  checkHomePage,
  createBackup,
  restoreFromBackup,
  restoreFromHardcoded,
  FOOTER_GUARDIAN_CONFIG
}; 