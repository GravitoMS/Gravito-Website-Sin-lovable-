#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuración de archivos críticos
const CRITICAL_FILES = {
  // Documentación principal
  'ADMIN_SETUP.md': 'Configuración del sistema de administración',
  'SYSTEM_IMPROVEMENTS.md': 'Documentación de mejoras del sistema',
  'FINAL_DELIVERABLE.md': 'Documento final de entrega del sistema',
  'IMPLEMENTATION_SUMMARY.md': 'Resumen de implementación',
  'SETUP_INSTRUCTIONS.md': 'Instrucciones de configuración',
  'ANIMATION_BIBLE.md': 'Biblia de animaciones del sistema',
  'COLOR_PROTECTION_GUIDE.md': 'Guía del sistema de protección de colores',
  'COLOR_RESTRICTIONS.md': 'Restricciones de colores del sistema',
  'FOOTER_PROTECTION_GUIDE.md': 'Guía de protección del footer',
  'SYSTEM_OPTIMIZATION.md': 'Documentación de optimización del sistema',
  'ANTI_MOCK_SYSTEM.md': 'Sistema anti-mock y prevención de datos simulados',
  
  // Scripts críticos de verificación y diagnóstico
  'scripts/document-protection.cjs': 'Sistema de protección de documentos',
  'scripts/analyze-system.cjs': 'Análisis exhaustivo del sistema',
  'scripts/final-verification.cjs': 'Verificación final del sistema',
  'scripts/diagnose-supabase-connection.cjs': 'Diagnóstico de conexión Supabase',
  'scripts/validateColors.cjs': 'Validación de colores',
  'scripts/anti-mock-detector.cjs': 'Detector anti-mock',
  'scripts/setup-real-data.cjs': 'Configurador de datos reales',
  'scripts/footer-guardian.js': 'Sistema de protección del footer',
  'scripts/check-footer.js': 'Verificación del footer',
  
  // Archivos de configuración críticos
  'src/lib/colorProtection.ts': 'Sistema de protección de colores',
  'src/components/dev/ColorProtectionStatus.tsx': 'Componente de estado de protección',
  'src/components/dev/ColorValidationPanel.tsx': 'Panel de validación de colores',
  'src/components/ui/AnimatedComponents.tsx': 'Componentes de animación principales',
  'src/components/SplineBackground.tsx': 'Componente robusto para manejo de WebGL',
  'src/lib/webglUtils.ts': 'Utilidades para detección y manejo de WebGL',
  'src/pages/Index.tsx': 'Página principal con arreglos de errores',
  'src/hooks/usePageLoading.ts': 'Hook optimizado de carga de páginas',
  'src/App.tsx': 'Aplicación principal con flags de React Router v7',
  'src/main.tsx': 'Punto de entrada con Sentry deshabilitado',
  'index.html': 'HTML principal con favicon configurado',
  'src/components/Header.tsx': 'Header con navegación centrada',
  'src/components/CustomLink.tsx': 'Componente de enlaces personalizados',

  'supabase-setup.sql': 'Configuración de base de datos',
  'supabase-auth-setup.sql': 'Configuración de autenticación',
  'tailwind.config.ts': 'Configuración de Tailwind CSS',
  'package.json': 'Configuración del proyecto',
  'vite.config.ts': 'Configuración de Vite'
};

// Archivos que NUNCA deben eliminarse
const NEVER_DELETE_FILES = [
  'ADMIN_SETUP.md',
  'SYSTEM_IMPROVEMENTS.md',
  'FINAL_DELIVERABLE.md',
  'scripts/document-protection.cjs',
  'scripts/analyze-system.cjs',
  'scripts/final-verification.cjs'
];

function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = type === 'error' ? '❌' : type === 'warning' ? '⚠️' : type === 'success' ? '✅' : '🔍';
  console.log(`${prefix} [${timestamp}] ${message}`);
}

function checkCriticalFiles() {
  log('Verificando estado de documentos críticos...');
  
  let existingCount = 0;
  let missingCount = 0;
  const missingFiles = [];
  
  for (const [filePath, description] of Object.entries(CRITICAL_FILES)) {
    if (fs.existsSync(filePath)) {
      log(`${filePath} - ${description}`, 'success');
      existingCount++;
    } else {
      log(`${filePath} - ${description}`, 'error');
      missingCount++;
      missingFiles.push(filePath);
    }
  }
  
  console.log('\n📊 RESUMEN:');
  log(`Archivos existentes: ${existingCount}`, 'success');
  log(`Archivos faltantes: ${missingCount}`, missingCount > 0 ? 'error' : 'success');
  
  if (missingFiles.length > 0) {
    console.log('\n🚨 ARCHIVOS FALTANTES CRÍTICOS:');
    missingFiles.forEach(file => {
      log(`  - ${file}`, 'error');
    });
    
    // Verificar si hay archivos críticos que nunca deben eliminarse
    const criticalMissing = missingFiles.filter(file => NEVER_DELETE_FILES.includes(file));
    if (criticalMissing.length > 0) {
      console.log('\n🔥 ARCHIVOS CRÍTICOS ELIMINADOS (NUNCA DEBEN ELIMINARSE):');
      criticalMissing.forEach(file => {
        log(`  - ${file}`, 'error');
      });
      return false;
    }
  }
  
  return missingCount === 0;
}

function createBackup() {
  log('Creando backup de documentos críticos...');
  
  const backupDir = `backups/document-protection-${new Date().toISOString().replace(/[:.]/g, '-')}`;
  
  if (!fs.existsSync('backups')) {
    fs.mkdirSync('backups');
  }
  
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  let backedUpCount = 0;
  
  for (const filePath of Object.keys(CRITICAL_FILES)) {
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const backupPath = path.join(backupDir, filePath);
        
        // Crear directorios necesarios
        const backupDirPath = path.dirname(backupPath);
        if (!fs.existsSync(backupDirPath)) {
          fs.mkdirSync(backupDirPath, { recursive: true });
        }
        
        fs.writeFileSync(backupPath, content);
        backedUpCount++;
      } catch (error) {
        log(`Error creando backup de ${filePath}: ${error.message}`, 'error');
      }
    }
  }
  
  // Crear metadata del backup
  const metadata = {
    timestamp: new Date().toISOString(),
    filesBackedUp: backedUpCount,
    totalCriticalFiles: Object.keys(CRITICAL_FILES).length,
    backupLocation: backupDir
  };
  
  fs.writeFileSync(path.join(backupDir, 'backup-metadata.json'), JSON.stringify(metadata, null, 2));
  
  log(`Backup completado: ${backedUpCount} archivos en ${backupDir}`, 'success');
  return backupDir;
}

function restoreFromBackup(backupDir) {
  log(`Restaurando desde backup: ${backupDir}`);
  
  if (!fs.existsSync(backupDir)) {
    log(`Backup no encontrado: ${backupDir}`, 'error');
    return false;
  }
  
  let restoredCount = 0;
  
  for (const filePath of Object.keys(CRITICAL_FILES)) {
    const backupPath = path.join(backupDir, filePath);
    
    if (fs.existsSync(backupPath)) {
      try {
        const content = fs.readFileSync(backupPath, 'utf8');
        
        // Crear directorios necesarios
        const targetDir = path.dirname(filePath);
        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true });
        }
        
        fs.writeFileSync(filePath, content);
        log(`Restaurado: ${filePath}`, 'success');
        restoredCount++;
      } catch (error) {
        log(`Error restaurando ${filePath}: ${error.message}`, 'error');
      }
    }
  }
  
  log(`Restauración completada: ${restoredCount} archivos restaurados`, 'success');
  return restoredCount > 0;
}

function setupGitHooks() {
  log('Configurando hooks de Git para protección automática...');
  
  const hooksDir = '.git/hooks';
  const preCommitHook = path.join(hooksDir, 'pre-commit');
  
  if (!fs.existsSync(hooksDir)) {
    log('Directorio .git/hooks no encontrado. Asegúrate de estar en un repositorio Git.', 'error');
    return false;
  }
  
  const hookContent = `#!/bin/sh
# Hook de pre-commit para protección de documentos críticos
echo "🔍 Verificando documentos críticos antes del commit..."

# Ejecutar verificación de documentos
node scripts/document-protection.cjs check

if [ $? -ne 0 ]; then
  echo "❌ COMMIT BLOQUEADO: Se detectaron documentos críticos faltantes"
  echo "💡 Si es necesario eliminar estos archivos, usa: git commit --no-verify"
  echo "💡 O crea un backup primero: npm run protect:backup"
  exit 1
fi

echo "✅ Verificación de documentos completada"
exit 0
`;
  
  try {
    fs.writeFileSync(preCommitHook, hookContent);
    fs.chmodSync(preCommitHook, '755');
    log('Hook pre-commit configurado exitosamente', 'success');
    return true;
  } catch (error) {
    log(`Error configurando hook: ${error.message}`, 'error');
    return false;
  }
}

function monitorChanges() {
  log('Iniciando monitoreo continuo de cambios...');
  log('Presiona Ctrl+C para detener el monitoreo');
  
  let lastCheck = Date.now();
  
  const interval = setInterval(() => {
    const now = Date.now();
    if (now - lastCheck > 5000) { // Verificar cada 5 segundos
      lastCheck = now;
      
      if (!checkCriticalFiles()) {
        log('🚨 CAMBIO DETECTADO: Archivos críticos modificados o eliminados', 'error');
        log('Ejecutando backup automático...', 'warning');
        createBackup();
      }
    }
  }, 1000);
  
  process.on('SIGINT', () => {
    clearInterval(interval);
    log('Monitoreo detenido', 'info');
    process.exit(0);
  });
}

function showHelp() {
  console.log(`
🛡️ SISTEMA DE PROTECCIÓN DE DOCUMENTOS - GRAVITO WEBSITE

Uso: node scripts/document-protection.cjs [comando]

Comandos disponibles:
  check     - Verificar estado de documentos críticos
  backup    - Crear backup de documentos críticos
  restore   - Restaurar desde el último backup
  setup     - Configurar hooks de Git
  monitor   - Iniciar monitoreo continuo
  help      - Mostrar esta ayuda

Ejemplos:
  node scripts/document-protection.cjs check
  node scripts/document-protection.cjs backup
  node scripts/document-protection.cjs restore
  node scripts/document-protection.cjs setup
  node scripts/document-protection.cjs monitor

ARCHIVOS CRÍTICOS PROTEGIDOS:
  - Documentación del sistema (ADMIN_SETUP.md, SYSTEM_IMPROVEMENTS.md, etc.)
  - Scripts de verificación y diagnóstico
  - Archivos de configuración críticos
  - Componentes de protección del sistema

ARCHIVOS QUE NUNCA DEBEN ELIMINARSE:
  - ADMIN_SETUP.md
  - SYSTEM_IMPROVEMENTS.md
  - Scripts de verificación críticos
  - Documentación de entrega final
`);
}

// Función principal
function main() {
  const command = process.argv[2] || 'check';
  
  switch (command) {
    case 'check':
      const isOk = checkCriticalFiles();
      process.exit(isOk ? 0 : 1);
      break;
      
    case 'backup':
      createBackup();
      break;
      
    case 'restore':
      const backupDir = process.argv[3] || 'backups/latest';
      restoreFromBackup(backupDir);
      break;
      
    case 'setup':
      setupGitHooks();
      break;
      
    case 'monitor':
      monitorChanges();
      break;
      
    case 'help':
    default:
      showHelp();
      break;
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = {
  checkCriticalFiles,
  createBackup,
  restoreFromBackup,
  setupGitHooks,
  CRITICAL_FILES,
  NEVER_DELETE_FILES
};
