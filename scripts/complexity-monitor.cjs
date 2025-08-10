#!/usr/bin/env node

/**
 * MONITOR DE COMPLEJIDAD - GRAVITO WEBSITE
 * Previene sobre-ingeniería y duplicaciones
 */

const fs = require('fs');
const path = require('path');

// Configuración
const CONFIG = {
  maxFileSize: 500, // líneas máximo por archivo
  maxDuplicates: 1, // máximo de archivos similares
  forbiddenPatterns: [
    /.*\s+2\.(tsx?|jsx?)$/,
    /.*\s+3\.(tsx?|jsx?)$/,
    /.*\s+4\.(tsx?|jsx?)$/,
    /.*backup.*/i,
    /.*old.*/i,
    /.*dev.*/i
  ],
  forbiddenFolders: [
    'backups',
    'dev',
    'old',
    'temp'
  ]
};

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

function scanDirectory(dir, issues = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Verificar carpetas prohibidas
      if (CONFIG.forbiddenFolders.includes(item)) {
        issues.push({
          type: 'FORBIDDEN_FOLDER',
          path: fullPath,
          severity: 'CRITICAL',
          message: `Carpeta prohibida: ${item}`
        });
      }
      
      // Recursión para subdirectorios
      scanDirectory(fullPath, issues);
    } else if (stat.isFile()) {
      // Verificar archivos prohibidos
      for (const pattern of CONFIG.forbiddenPatterns) {
        if (pattern.test(item)) {
          issues.push({
            type: 'FORBIDDEN_FILE',
            path: fullPath,
            severity: 'CRITICAL',
            message: `Archivo con patrón prohibido: ${item}`
          });
        }
      }
      
      // Verificar tamaño de archivo
      if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const lines = content.split('\n').length;
        
        if (lines > CONFIG.maxFileSize) {
          issues.push({
            type: 'LARGE_FILE',
            path: fullPath,
            severity: 'WARNING',
            message: `Archivo muy grande: ${lines} líneas (máximo ${CONFIG.maxFileSize})`
          });
        }
      }
    }
  }
  
  return issues;
}

function checkDuplicates(dir, issues = []) {
  const files = new Map();
  
  function collectFiles(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        collectFiles(fullPath);
      } else if (stat.isFile() && (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts'))) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const hash = content.length; // Hash simple
        
        if (!files.has(hash)) {
          files.set(hash, []);
        }
        files.get(hash).push(fullPath);
      }
    }
  }
  
  collectFiles(dir);
  
  // Verificar duplicados
  for (const [hash, fileList] of files) {
    if (fileList.length > CONFIG.maxDuplicates) {
      issues.push({
        type: 'DUPLICATE_FILES',
        files: fileList,
        severity: 'CRITICAL',
        message: `Archivos duplicados detectados: ${fileList.length} archivos similares`
      });
    }
  }
  
  return issues;
}

function generateReport(issues) {
  log('\n🚨 REPORTE DE COMPLEJIDAD - GRAVITO WEBSITE', 'bold');
  log('=' .repeat(60), 'blue');
  
  if (issues.length === 0) {
    log('✅ No se detectaron problemas de complejidad', 'green');
    return;
  }
  
  // Agrupar por severidad
  const critical = issues.filter(i => i.severity === 'CRITICAL');
  const warnings = issues.filter(i => i.severity === 'WARNING');
  
  if (critical.length > 0) {
    log(`\n❌ PROBLEMAS CRÍTICOS (${critical.length}):`, 'red');
    critical.forEach(issue => {
      log(`  • ${issue.message}`, 'red');
      if (issue.path) log(`    Ruta: ${issue.path}`, 'yellow');
      if (issue.files) {
        issue.files.forEach(file => log(`    - ${file}`, 'yellow'));
      }
    });
  }
  
  if (warnings.length > 0) {
    log(`\n⚠️  ADVERTENCIAS (${warnings.length}):`, 'yellow');
    warnings.forEach(issue => {
      log(`  • ${issue.message}`, 'yellow');
      if (issue.path) log(`    Ruta: ${issue.path}`, 'yellow');
    });
  }
  
  log('\n📋 RECOMENDACIONES:', 'blue');
  if (critical.length > 0) {
    log('  • ELIMINAR archivos duplicados inmediatamente', 'red');
    log('  • ELIMINAR carpetas prohibidas', 'red');
    log('  • REFACTORIZAR archivos grandes', 'yellow');
  } else if (warnings.length > 0) {
    log('  • Considerar refactorizar archivos grandes', 'yellow');
  } else {
    log('  • Mantener el código limpio y simple', 'green');
  }
  
  log('\n' + '=' .repeat(60), 'blue');
}

function main() {
  const srcDir = path.join(process.cwd(), 'src');
  
  if (!fs.existsSync(srcDir)) {
    log('❌ No se encontró el directorio src/', 'red');
    process.exit(1);
  }
  
  log('🔍 Escaneando complejidad del código...', 'blue');
  
  const issues = [];
  
  // Escanear directorio
  scanDirectory(srcDir, issues);
  
  // Verificar duplicados
  checkDuplicates(srcDir, issues);
  
  // Generar reporte
  generateReport(issues);
  
  // Exit code basado en problemas críticos
  const criticalIssues = issues.filter(i => i.severity === 'CRITICAL');
  process.exit(criticalIssues.length > 0 ? 1 : 0);
}

if (require.main === module) {
  main();
}

module.exports = { scanDirectory, checkDuplicates, generateReport };
