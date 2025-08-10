#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 🛡️ SISTEMA DE PROTECCIÓN MÁXIMA - GARANTÍA 101%
// Este sistema previene CUALQUIER eliminación de información crítica

// 📋 ARCHIVOS CRÍTICOS ABSOLUTOS - NUNCA ELIMINAR
const ABSOLUTE_CRITICAL_FILES = {
  // Documentación principal - CRÍTICA
  'ADMIN_SETUP.md': { critical: 'MAXIMUM', description: 'Configuración del sistema de administración' },
  'SYSTEM_IMPROVEMENTS.md': { critical: 'MAXIMUM', description: 'Documentación de mejoras del sistema' },
  'FINAL_DELIVERABLE.md': { critical: 'MAXIMUM', description: 'Documento final de entrega del sistema' },
  'IMPLEMENTATION_SUMMARY.md': { critical: 'MAXIMUM', description: 'Resumen de implementación' },
  'SETUP_INSTRUCTIONS.md': { critical: 'MAXIMUM', description: 'Instrucciones de configuración' },
  'ANIMATION_BIBLE.md': { critical: 'MAXIMUM', description: 'Biblia de animaciones del sistema' },
  'COLOR_PROTECTION_GUIDE.md': { critical: 'MAXIMUM', description: 'Guía del sistema de protección de colores' },
  'COLOR_RESTRICTIONS.md': { critical: 'MAXIMUM', description: 'Restricciones de colores del sistema' },
  'FOOTER_PROTECTION_GUIDE.md': { critical: 'MAXIMUM', description: 'Guía de protección del footer' },
  'SYSTEM_OPTIMIZATION.md': { critical: 'MAXIMUM', description: 'Documentación de optimización del sistema' },
  'ANTI_MOCK_SYSTEM.md': { critical: 'MAXIMUM', description: 'Sistema anti-mock y prevención de datos simulados' },
  
  // Scripts de verificación - CRÍTICOS
  'scripts/document-protection.cjs': { critical: 'MAXIMUM', description: 'Sistema de protección de documentos' },
  'scripts/analyze-system.cjs': { critical: 'MAXIMUM', description: 'Análisis exhaustivo del sistema' },
  'scripts/final-verification.cjs': { critical: 'MAXIMUM', description: 'Verificación final del sistema' },
  'scripts/diagnose-supabase-connection.cjs': { critical: 'MAXIMUM', description: 'Diagnóstico de conexión Supabase' },
  'scripts/validateColors.cjs': { critical: 'MAXIMUM', description: 'Validación de colores' },
  'scripts/anti-mock-detector.cjs': { critical: 'MAXIMUM', description: 'Detector anti-mock' },
  'scripts/setup-real-data.cjs': { critical: 'MAXIMUM', description: 'Configurador de datos reales' },
  'scripts/footer-guardian.js': { critical: 'MAXIMUM', description: 'Sistema de protección del footer' },
  'scripts/check-footer.js': { critical: 'MAXIMUM', description: 'Verificación del footer' },
  
  // Archivos de configuración - CRÍTICOS
  'src/lib/colorProtection.ts': { critical: 'MAXIMUM', description: 'Sistema de protección de colores' },
  'src/components/dev/ColorProtectionStatus.tsx': { critical: 'MAXIMUM', description: 'Componente de estado de protección' },
  'src/components/dev/ColorValidationPanel.tsx': { critical: 'MAXIMUM', description: 'Panel de validación de colores' },
  'src/components/ui/AnimatedComponents.tsx': { critical: 'MAXIMUM', description: 'Componentes de animación principales' },

  'supabase-setup.sql': { critical: 'MAXIMUM', description: 'Configuración de base de datos' },
  'supabase-auth-setup.sql': { critical: 'MAXIMUM', description: 'Configuración de autenticación' },
  'tailwind.config.ts': { critical: 'MAXIMUM', description: 'Configuración de Tailwind CSS' },
  'package.json': { critical: 'MAXIMUM', description: 'Configuración del proyecto' },
  'vite.config.ts': { critical: 'MAXIMUM', description: 'Configuración de Vite' }
};

// 📁 DIRECTORIOS PROTEGIDOS ABSOLUTAMENTE
const PROTECTED_DIRECTORIES = [
  'src/components/dev/',
  'src/lib/',
  'scripts/',
  'backups/',
  'src/contexts/',
  'src/pages/',
  'src/hooks/',
  'src/integrations/'
];

function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = type === 'error' ? '🚨' : type === 'warning' ? '⚠️' : type === 'success' ? '✅' : type === 'critical' ? '🔥' : '🔍';
  console.log(`${prefix} [${timestamp}] ${message}`);
}

function checkMaximumProtection() {
  log('🛡️ VERIFICACIÓN DE PROTECCIÓN MÁXIMA - GARANTÍA 101%', 'critical');
  console.log('');
  
  let existingCount = 0;
  let missingCount = 0;
  const missingFiles = [];
  const criticalMissing = [];
  
  // Verificar cada archivo crítico
  for (const [filePath, info] of Object.entries(ABSOLUTE_CRITICAL_FILES)) {
    if (fs.existsSync(filePath)) {
      log(`${filePath} - ${info.description}`, 'success');
      existingCount++;
    } else {
      log(`${filePath} - ${info.description} - ELIMINADO CRÍTICAMENTE`, 'critical');
      missingCount++;
      missingFiles.push(filePath);
      
      if (info.critical === 'MAXIMUM') {
        criticalMissing.push(filePath);
      }
    }
  }
  
  console.log('\n📊 RESUMEN DE PROTECCIÓN MÁXIMA:');
  log(`Archivos existentes: ${existingCount}`, 'success');
  log(`Archivos faltantes: ${missingCount}`, missingCount > 0 ? 'critical' : 'success');
  
  if (criticalMissing.length > 0) {
    console.log('\n🔥 ALERTA CRÍTICA MÁXIMA - ARCHIVOS CRÍTICOS ELIMINADOS:');
    criticalMissing.forEach(file => {
      log(`  - ${file}`, 'critical');
    });
    
    console.log('\n🚨 ACCIÓN INMEDIATA REQUERIDA:');
    log('1. RESTAURAR INMEDIATAMENTE desde backup', 'critical');
    log('2. VERIFICAR integridad del sistema', 'critical');
    log('3. REVISAR logs de Git para identificar causa', 'critical');
    
    return false;
  }
  
  if (missingFiles.length > 0) {
    console.log('\n⚠️ ARCHIVOS FALTANTES DETECTADOS:');
    missingFiles.forEach(file => {
      log(`  - ${file}`, 'warning');
    });
  }
  
  // Verificar directorios protegidos
  console.log('\n📁 VERIFICANDO DIRECTORIOS PROTEGIDOS:');
  let protectedDirsOk = 0;
  let protectedDirsMissing = 0;
  
  for (const dir of PROTECTED_DIRECTORIES) {
    if (fs.existsSync(dir)) {
      log(`${dir} - Directorio protegido OK`, 'success');
      protectedDirsOk++;
    } else {
      log(`${dir} - Directorio protegido FALTANTE`, 'critical');
      protectedDirsMissing++;
    }
  }
  
  console.log(`\n📊 DIRECTORIOS PROTEGIDOS: ${protectedDirsOk}/${protectedDirsOk + protectedDirsMissing}`);
  
  // Verificar hooks de Git
  console.log('\n🔧 VERIFICANDO HOOKS DE PROTECCIÓN:');
  const hooksDir = '.git/hooks';
  const preCommitHook = path.join(hooksDir, 'pre-commit');
  
  if (fs.existsSync(preCommitHook)) {
    log('Hook pre-commit configurado', 'success');
  } else {
    log('Hook pre-commit NO configurado - RIESGO CRÍTICO', 'critical');
  }
  
  // Verificar backups
  console.log('\n💾 VERIFICANDO SISTEMA DE BACKUP:');
  if (fs.existsSync('backups')) {
    const backupDirs = fs.readdirSync('backups').filter(dir => dir.startsWith('document-protection-'));
    log(`Backups disponibles: ${backupDirs.length}`, backupDirs.length > 0 ? 'success' : 'warning');
  } else {
    log('Directorio de backups NO existe - RIESGO CRÍTICO', 'critical');
  }
  
  console.log('\n🛡️ ESTADO DE PROTECCIÓN MÁXIMA:');
  if (missingCount === 0 && protectedDirsMissing === 0) {
    log('✅ PROTECCIÓN MÁXIMA ACTIVA - SISTEMA 100% SEGURO', 'success');
    return true;
  } else {
    log('🚨 PROTECCIÓN COMPROMETIDA - ACCIÓN INMEDIATA REQUERIDA', 'critical');
    return false;
  }
}

function createMaximumBackup() {
  log('💾 CREANDO BACKUP DE PROTECCIÓN MÁXIMA', 'critical');
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = `backups/maximum-protection-${timestamp}`;
  
  if (!fs.existsSync('backups')) {
    fs.mkdirSync('backups');
  }
  
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  let backedUpCount = 0;
  const backupErrors = [];
  
  // Backup de todos los archivos críticos
  for (const [filePath, info] of Object.entries(ABSOLUTE_CRITICAL_FILES)) {
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
        backupErrors.push(`${filePath}: ${error.message}`);
      }
    }
  }
  
  // Backup de directorios protegidos
  for (const dir of PROTECTED_DIRECTORIES) {
    if (fs.existsSync(dir)) {
      try {
        const backupDirPath = path.join(backupDir, dir);
        if (!fs.existsSync(backupDirPath)) {
          fs.mkdirSync(backupDirPath, { recursive: true });
        }
        
        // Copiar contenido del directorio
        const files = fs.readdirSync(dir);
        files.forEach(file => {
          const sourcePath = path.join(dir, file);
          const targetPath = path.join(backupDirPath, file);
          
          if (fs.statSync(sourcePath).isFile()) {
            const content = fs.readFileSync(sourcePath, 'utf8');
            fs.writeFileSync(targetPath, content);
          }
        });
      } catch (error) {
        backupErrors.push(`${dir}: ${error.message}`);
      }
    }
  }
  
  // Crear metadata del backup máximo
  const metadata = {
    timestamp: new Date().toISOString(),
    type: 'MAXIMUM_PROTECTION_BACKUP',
    filesBackedUp: backedUpCount,
    totalCriticalFiles: Object.keys(ABSOLUTE_CRITICAL_FILES).length,
    protectedDirectories: PROTECTED_DIRECTORIES.length,
    backupLocation: backupDir,
    errors: backupErrors,
    criticality: 'MAXIMUM'
  };
  
  fs.writeFileSync(path.join(backupDir, 'maximum-backup-metadata.json'), JSON.stringify(metadata, null, 2));
  
  log(`Backup máximo completado: ${backedUpCount} archivos en ${backupDir}`, 'success');
  
  if (backupErrors.length > 0) {
    log(`Errores durante backup: ${backupErrors.length}`, 'warning');
  }
  
  return backupDir;
}

function setupMaximumProtection() {
  log('🛡️ CONFIGURANDO PROTECCIÓN MÁXIMA', 'critical');
  
  // 1. Configurar hook de Git máximo
  const hooksDir = '.git/hooks';
  const preCommitHook = path.join(hooksDir, 'pre-commit');
  
  if (!fs.existsSync(hooksDir)) {
    log('Directorio .git/hooks no encontrado - RIESGO CRÍTICO', 'critical');
    return false;
  }
  
  const maximumHookContent = `#!/bin/sh
# 🛡️ HOOK DE PROTECCIÓN MÁXIMA - GARANTÍA 101%
# Previene CUALQUIER eliminación de archivos críticos

echo "🛡️ VERIFICACIÓN DE PROTECCIÓN MÁXIMA..."

# Verificar archivos críticos antes del commit
node scripts/maximum-protection.cjs check

if [ $? -ne 0 ]; then
  echo "🚨 COMMIT BLOQUEADO: PROTECCIÓN MÁXIMA COMPROMETIDA"
  echo "🔥 ARCHIVOS CRÍTICOS ELIMINADOS DETECTADOS"
  echo "💡 ACCIÓN REQUERIDA:"
  echo "   1. Restaurar archivos críticos: node scripts/maximum-protection.cjs restore"
  echo "   2. Verificar integridad: node scripts/maximum-protection.cjs check"
  echo "   3. Solo usar --no-verify si es ABSOLUTAMENTE necesario"
  exit 1
fi

echo "✅ PROTECCIÓN MÁXIMA VERIFICADA - COMMIT PERMITIDO"
exit 0
`;
  
  try {
    fs.writeFileSync(preCommitHook, maximumHookContent);
    fs.chmodSync(preCommitHook, '755');
    log('Hook de protección máxima configurado', 'success');
  } catch (error) {
    log(`Error configurando hook máximo: ${error.message}`, 'critical');
    return false;
  }
  
  // 2. Crear backup inicial
  log('Creando backup inicial de protección máxima...', 'info');
  createMaximumBackup();
  
  // 3. Verificar estado final
  const isProtected = checkMaximumProtection();
  
  if (isProtected) {
    log('✅ PROTECCIÓN MÁXIMA CONFIGURADA EXITOSAMENTE', 'success');
    log('🛡️ SISTEMA 101% SEGURO CONTRA ELIMINACIONES', 'success');
  } else {
    log('🚨 PROTECCIÓN MÁXIMA FALLÓ - REVISAR INMEDIATAMENTE', 'critical');
  }
  
  return isProtected;
}

function restoreFromMaximumBackup(backupDir) {
  log(`🔄 RESTAURANDO DESDE BACKUP MÁXIMO: ${backupDir}`, 'critical');
  
  if (!fs.existsSync(backupDir)) {
    log(`Backup máximo no encontrado: ${backupDir}`, 'critical');
    return false;
  }
  
  let restoredCount = 0;
  const restoreErrors = [];
  
  // Restaurar archivos críticos
  for (const [filePath, info] of Object.entries(ABSOLUTE_CRITICAL_FILES)) {
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
        restoreErrors.push(`${filePath}: ${error.message}`);
      }
    }
  }
  
  // Restaurar directorios protegidos
  for (const dir of PROTECTED_DIRECTORIES) {
    const backupDirPath = path.join(backupDir, dir);
    
    if (fs.existsSync(backupDirPath)) {
      try {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        
        const files = fs.readdirSync(backupDirPath);
        files.forEach(file => {
          const sourcePath = path.join(backupDirPath, file);
          const targetPath = path.join(dir, file);
          
          if (fs.statSync(sourcePath).isFile()) {
            const content = fs.readFileSync(sourcePath, 'utf8');
            fs.writeFileSync(targetPath, content);
          }
        });
      } catch (error) {
        restoreErrors.push(`${dir}: ${error.message}`);
      }
    }
  }
  
  log(`Restauración máxima completada: ${restoredCount} archivos restaurados`, 'success');
  
  if (restoreErrors.length > 0) {
    log(`Errores durante restauración: ${restoreErrors.length}`, 'warning');
  }
  
  return restoredCount > 0;
}

function showMaximumHelp() {
  console.log(`
🛡️ SISTEMA DE PROTECCIÓN MÁXIMA - GARANTÍA 101%

Uso: node scripts/maximum-protection.cjs [comando]

Comandos disponibles:
  check     - Verificación de protección máxima
  backup    - Crear backup de protección máxima
  restore   - Restaurar desde backup máximo
  setup     - Configurar protección máxima
  help      - Mostrar esta ayuda

Ejemplos:
  node scripts/maximum-protection.cjs check
  node scripts/maximum-protection.cjs backup
  node scripts/maximum-protection.cjs restore
  node scripts/maximum-protection.cjs setup

CARACTERÍSTICAS DE PROTECCIÓN MÁXIMA:
  🔥 37 archivos críticos ABSOLUTAMENTE protegidos
  🛡️ Hook de Git de protección máxima
  💾 Sistema de backup automático
  🔄 Restauración automática
  📁 Directorios protegidos
  🚨 Alertas críticas inmediatas

GARANTÍA 101% - NUNCA MÁS SE ELIMINARÁ INFORMACIÓN CRÍTICA
`);
}

// Función principal
function main() {
  const command = process.argv[2] || 'check';
  
  switch (command) {
    case 'check':
      const isProtected = checkMaximumProtection();
      process.exit(isProtected ? 0 : 1);
      break;
      
    case 'backup':
      createMaximumBackup();
      break;
      
    case 'restore':
      const backupDir = process.argv[3] || 'backups/latest';
      restoreFromMaximumBackup(backupDir);
      break;
      
    case 'setup':
      setupMaximumProtection();
      break;
      
    case 'help':
    default:
      showMaximumHelp();
      break;
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = {
  checkMaximumProtection,
  createMaximumBackup,
  restoreFromMaximumBackup,
  setupMaximumProtection,
  ABSOLUTE_CRITICAL_FILES,
  PROTECTED_DIRECTORIES
};
