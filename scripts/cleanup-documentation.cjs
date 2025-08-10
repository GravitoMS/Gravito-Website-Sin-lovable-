#!/usr/bin/env node

/**
 * LIMPIEZA DE DOCUMENTACIÓN - GRAVITO WEBSITE
 * Elimina documentación duplicada y mantiene solo la guía maestra
 */

const fs = require('fs');
const path = require('path');

// Archivos a ELIMINAR (documentación duplicada/obsoleta)
const FILES_TO_DELETE = [
  // Documentación duplicada
  'ANIMATION_BIBLE 2.md',
  'PROTECTION_SYSTEM_SUMMARY 2.md',
  'PROTECTION_README 2.md',
  'DOUBLE_CHECK_REPORT 2.md',
  'ADMIN_SETUP 2.md',
  '.document-protection-ignore 2',
  
  // Documentación obsoleta
  'ANIMATION_BIBLE.md',
  'PROTECTION_SYSTEM_SUMMARY.md',
  'PROTECTION_README.md',
  'DOUBLE_CHECK_REPORT.md',
  'ADMIN_SETUP.md',
  'COMPLETE_SYSTEM_GUIDE.md',
  'SYSTEM_IMPROVEMENTS.md',
  'SYSTEM_OPTIMIZATION.md',
  'IMPLEMENTATION_SUMMARY.md',
  'FINAL_DELIVERABLE.md',
  'PHASE1_CLEANUP_SUMMARY.md',
  'PHASE2_RADICAL_CLEANUP_SUMMARY.md',
  'PROCEDURE_GUIDE.md',
  'SETUP_INSTRUCTIONS.md',
  'COLOR_PROTECTION_GUIDE.md',
  'COLOR_RESTRICTIONS.md',
  'DOCUMENT_PROTECTION_CONFIG.md',
  'FOOTER_PROTECTION.md',
  'FOOTER_PROTECTION_GUIDE.md',
  'ANTI_MOCK_SYSTEM.md',
  
  // Archivos de configuración obsoletos
  '.document-protection-ignore',
  '.footer-protection',
  '.protection-config',
  
  // Scripts obsoletos
  'fix-animations.sh',
  'eslint-plugin-gravito-colors.js',
  
  // Documentación de prevención (ya integrada en guía maestra)
  'DEVELOPMENT_RULES.md',
  'COMMUNICATION_PROTOCOL.md',
  'PREVENTION_SUMMARY.md'
];

// Archivos a MANTENER (esenciales)
const FILES_TO_KEEP = [
  'GRAVITO_MASTER_GUIDE.md',    // Guía maestra
  'README.md',                  // README básico
  'package.json',               // Configuración del proyecto
  'tailwind.config.ts',         // Configuración de Tailwind
  'vite.config.ts',             // Configuración de Vite
  'tsconfig.json',              // Configuración de TypeScript
  'eslint.config.js',           // Configuración de ESLint
  'postcss.config.js',          // Configuración de PostCSS
  'components.json',            // Configuración de shadcn/ui
  'index.html',                 // HTML principal
  '.gitignore',                 // Git ignore
  'scripts/complexity-monitor.cjs', // Script de monitoreo
  'scripts/validateColors.cjs',     // Script de validación de colores
  'supabase-setup.sql',         // Setup de Supabase
  'supabase-auth-setup.sql'     // Setup de autenticación
];

// Colores para output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function deleteFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

function cleanupDocumentation() {
  log('\n🧹 LIMPIEZA DE DOCUMENTACIÓN - GRAVITO WEBSITE', 'bold');
  log('=' .repeat(60), 'blue');
  
  let deletedCount = 0;
  let skippedCount = 0;
  
  log('\n📋 Archivos a eliminar:', 'yellow');
  
  for (const file of FILES_TO_DELETE) {
    const filePath = path.join(process.cwd(), file);
    
    if (fs.existsSync(filePath)) {
      if (deleteFile(filePath)) {
        log(`  ✅ Eliminado: ${file}`, 'green');
        deletedCount++;
      } else {
        log(`  ❌ Error eliminando: ${file}`, 'red');
      }
    } else {
      log(`  ⏭️  No existe: ${file}`, 'yellow');
      skippedCount++;
    }
  }
  
  log('\n📋 Archivos mantenidos:', 'blue');
  for (const file of FILES_TO_KEEP) {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      log(`  ✅ Mantenido: ${file}`, 'green');
    } else {
      log(`  ⚠️  No encontrado: ${file}`, 'yellow');
    }
  }
  
  log('\n📊 RESUMEN:', 'bold');
  log(`  • Archivos eliminados: ${deletedCount}`, 'green');
  log(`  • Archivos saltados: ${skippedCount}`, 'yellow');
  log(`  • Archivos mantenidos: ${FILES_TO_KEEP.length}`, 'blue');
  
  log('\n🎯 RESULTADO:', 'bold');
  log('  ✅ Documentación centralizada en GRAVITO_MASTER_GUIDE.md', 'green');
  log('  ✅ Eliminada documentación duplicada y obsoleta', 'green');
  log('  ✅ Mantenidos solo archivos esenciales', 'green');
  
  log('\n📝 PRÓXIMOS PASOS:', 'blue');
  log('  1. Revisar GRAVITO_MASTER_GUIDE.md', 'yellow');
  log('  2. Actualizar README.md si es necesario', 'yellow');
  log('  3. Hacer commit de los cambios', 'yellow');
  
  log('\n' + '=' .repeat(60), 'blue');
}

function main() {
  // Verificar si estamos en el directorio correcto
  if (!fs.existsSync('package.json')) {
    log('❌ No se encontró package.json. Ejecuta desde el directorio raíz del proyecto.', 'red');
    process.exit(1);
  }
  
  // Confirmar antes de eliminar
  log('⚠️  ADVERTENCIA: Este script eliminará archivos de documentación duplicada.', 'yellow');
  log('¿Continuar? (y/N): ', 'yellow');
  
  // Para automatización, asumir 'y'
  const shouldContinue = process.argv.includes('--force') || process.argv.includes('-f');
  
  if (shouldContinue) {
    cleanupDocumentation();
  } else {
    log('❌ Operación cancelada. Usa --force para ejecutar automáticamente.', 'red');
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}

module.exports = { cleanupDocumentation, FILES_TO_DELETE, FILES_TO_KEEP };
