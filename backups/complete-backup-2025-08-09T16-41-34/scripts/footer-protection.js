import fs from 'fs';
import path from 'path';

// Configuración de protección del Footer
const FOOTER_PROTECTION_CONFIG = {
  // Archivos que deben contener el Footer
  filesWithFooter: [
    'src/pages/Index.tsx',
    'src/pages/Estrategia.tsx',
    'src/pages/Servicios.tsx',
    'src/pages/Nosotros.tsx',
    'src/pages/Blog.tsx',
    'src/pages/Contacto.tsx'
  ],
  
  // Código que debe estar presente (Footer import)
  requiredCode: [
    'import Footer from',
    '<Footer />'
  ],
  
  // Código residual que debe ser eliminado
  residualCode: [
    'footer-liquid-glass',
    'footer className="footer-liquid-glass"',
    'footer className="bg-muted"'
  ],
  
  // Backup del Footer component
  footerComponentPath: 'src/components/Footer.tsx',
  footerBackupPath: 'scripts/backups/Footer.tsx.backup'
};

// Función para crear backup del Footer
function createFooterBackup() {
  try {
    const footerPath = path.join(process.cwd(), FOOTER_PROTECTION_CONFIG.footerComponentPath);
    const backupPath = path.join(process.cwd(), FOOTER_PROTECTION_CONFIG.footerBackupPath);
    
    // Crear directorio de backup si no existe
    const backupDir = path.dirname(backupPath);
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    if (fs.existsSync(footerPath)) {
      const footerContent = fs.readFileSync(footerPath, 'utf8');
      fs.writeFileSync(backupPath, footerContent);
      console.log('✅ Backup del Footer creado exitosamente');
      return true;
    } else {
      console.log('⚠️ No se encontró el archivo Footer.tsx para crear backup');
      return false;
    }
  } catch (error) {
    console.error('❌ Error creando backup del Footer:', error.message);
    return false;
  }
}

// Función para verificar que el Footer esté presente en los archivos
function verifyFooterPresence() {
  console.log('🔍 Verificando presencia del Footer...');
  
  let allValid = true;
  
  FOOTER_PROTECTION_CONFIG.filesWithFooter.forEach(filePath => {
    try {
      const fullPath = path.join(process.cwd(), filePath);
      if (!fs.existsSync(fullPath)) {
        console.log(`⚠️ Archivo no encontrado: ${filePath}`);
        return;
      }
      
      const content = fs.readFileSync(fullPath, 'utf8');
      let fileValid = true;
      
      // Verificar que tenga el import del Footer
      if (!content.includes('import Footer from')) {
        console.log(`❌ ${filePath}: Falta import del Footer`);
        fileValid = false;
      }
      
      // Verificar que tenga el componente Footer
      if (!content.includes('<Footer />')) {
        console.log(`❌ ${filePath}: Falta componente Footer`);
        fileValid = false;
      }
      
      // Verificar que no tenga código residual
      FOOTER_PROTECTION_CONFIG.residualCode.forEach(residual => {
        if (content.includes(residual)) {
          console.log(`⚠️ ${filePath}: Código residual detectado: ${residual}`);
          fileValid = false;
        }
      });
      
      if (fileValid) {
        console.log(`✅ ${filePath}: Footer correctamente implementado`);
      } else {
        allValid = false;
      }
      
    } catch (error) {
      console.error(`❌ Error verificando ${filePath}:`, error.message);
      allValid = false;
    }
  });
  
  return allValid;
}

// Función para restaurar Footer desde backup
function restoreFooterFromBackup() {
  try {
    const backupPath = path.join(process.cwd(), FOOTER_PROTECTION_CONFIG.footerBackupPath);
    const footerPath = path.join(process.cwd(), FOOTER_PROTECTION_CONFIG.footerComponentPath);
    
    if (fs.existsSync(backupPath)) {
      const backupContent = fs.readFileSync(backupPath, 'utf8');
      fs.writeFileSync(footerPath, backupContent);
      console.log('✅ Footer restaurado desde backup');
      return true;
    } else {
      console.log('❌ No se encontró backup del Footer');
      return false;
    }
  } catch (error) {
    console.error('❌ Error restaurando Footer:', error.message);
    return false;
  }
}

// Función para limpiar código residual
function cleanResidualCode() {
  console.log('🧹 Limpiando código residual...');
  
  let cleaned = false;
  
  FOOTER_PROTECTION_CONFIG.filesWithFooter.forEach(filePath => {
    try {
      const fullPath = path.join(process.cwd(), filePath);
      if (!fs.existsSync(fullPath)) return;
      
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      // Eliminar código residual
      FOOTER_PROTECTION_CONFIG.residualCode.forEach(residual => {
        if (content.includes(residual)) {
          content = content.replace(new RegExp(residual, 'g'), '');
          console.log(`🧹 Eliminado código residual en ${filePath}: ${residual}`);
          cleaned = true;
        }
      });
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content);
        console.log(`✅ ${filePath}: Código residual limpiado`);
      }
      
    } catch (error) {
      console.error(`❌ Error limpiando ${filePath}:`, error.message);
    }
  });
  
  return cleaned;
}

// Función principal
function main() {
  const command = process.argv[2];
  
  switch (command) {
    case 'backup':
      createFooterBackup();
      break;
    case 'verify':
      const isValid = verifyFooterPresence();
      if (isValid) {
        console.log('🎉 Todos los archivos tienen el Footer correctamente implementado');
      } else {
        console.log('❌ Se detectaron problemas con el Footer');
        process.exit(1);
      }
      break;
    case 'restore':
      restoreFooterFromBackup();
      break;
    case 'clean':
      cleanResidualCode();
      break;
    case 'full-check':
      console.log('🛡️ Ejecutando verificación completa del Footer...');
      createFooterBackup();
      cleanResidualCode();
      const isValid2 = verifyFooterPresence();
      if (isValid2) {
        console.log('🎉 Footer completamente verificado y protegido');
      } else {
        console.log('❌ Se detectaron problemas con el Footer');
        process.exit(1);
      }
      break;
    default:
      console.log('🛡️ Sistema de Protección del Footer');
      console.log('');
      console.log('Comandos disponibles:');
      console.log('  backup     - Crear backup del Footer');
      console.log('  verify     - Verificar presencia del Footer');
      console.log('  restore    - Restaurar Footer desde backup');
      console.log('  clean      - Limpiar código residual');
      console.log('  full-check - Ejecutar verificación completa');
      console.log('');
      console.log('Ejemplo: node scripts/footer-protection.js full-check');
  }
}

// Ejecutar si es llamado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export {
  createFooterBackup,
  verifyFooterPresence,
  restoreFooterFromBackup,
  cleanResidualCode,
  FOOTER_PROTECTION_CONFIG
}; 