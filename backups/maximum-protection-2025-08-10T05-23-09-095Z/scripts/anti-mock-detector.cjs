#!/usr/bin/env node

/**
 * 🚫 DETECTOR ANTI-MOCK - GRAVITO WEBSITE
 * 
 * Este script detecta y previene el uso de datos mock en el código.
 * NUNCA se deben usar datos mock - solo datos reales de Supabase.
 */

const fs = require('fs');
const path = require('path');

// 🚫 PATRONES PROHIBIDOS - DATOS MOCK
const MOCK_PATTERNS = [
  // Datos mock específicos del negocio
  /mock[A-Z][a-zA-Z]*\s*=\s*\[/, // Variables mock con arrays
  /const\s+.*[Mm]ock.*\s*=\s*\[/, // Arrays mock
  /const\s+.*[Dd]emo.*\s*=\s*\[/, // Arrays demo
  /const\s+.*[Ff]ake.*\s*=\s*\[/, // Arrays fake
  
  // Datos de ejemplo en contenido de negocio
  /'[^']*\.\.\.'/, // Textos con "..." (solo en contenido de negocio)
  /"[^"]*\.\.\."/, // Textos con "..." (solo en contenido de negocio)
  /'[^']*demo[^']*'/i, // Textos con "demo"
  /"[^"]*demo[^"]*"/i, // Textos con "demo"
  /'[^']*example[^']*'/i, // Textos con "example"
  /"[^"]*example[^"]*"/i, // Textos con "example"
  /'[^']*sample[^']*'/i, // Textos con "sample"
  /"[^"]*sample[^"]*"/i, // Textos con "sample"
  /'[^']*temporary[^']*'/i, // Textos con "temporary"
  /"[^"]*temporary[^"]*"/i, // Textos con "temporary"
  /'[^']*fake[^']*'/i, // Textos con "fake"
  /"[^"]*fake[^"]*"/i, // Textos con "fake"
  /'[^']*dummy[^']*'/i, // Textos con "dummy"
  /"[^"]*dummy[^"]*"/i, // Textos con "dummy"
  
  // Comentarios que indican datos mock
  /\/\/.*mock/i,
  /\/\*.*mock.*\*\//i,
  /\/\/.*temporary/i,
  /\/\*.*temporary.*\*\//i,
  /\/\/.*fake/i,
  /\/\*.*fake.*\*\//i,
  /\/\/.*demo/i,
  /\/\*.*demo.*\*\//i,
  
  // Variables con nombres sospechosos
  /const\s+.*[Mm]ock.*\s*=/,
  /let\s+.*[Mm]ock.*\s*=/,
  /var\s+.*[Mm]ock.*\s*=/,
  /const\s+.*[Dd]emo.*\s*=/,
  /let\s+.*[Dd]emo.*\s*=/,
  /var\s+.*[Dd]emo.*\s*=/,
  /const\s+.*[Ff]ake.*\s*=/,
  /let\s+.*[Ff]ake.*\s*=/,
  /var\s+.*[Ff]ake.*\s*=/,
  
  // Datos hardcodeados sospechosos
  /'admin@[^']*'/,
  /"admin@[^"]*"/,
  /'password[^']*'/,
  /"password[^"]*"/,
  /'123[^']*'/,
  /"123[^"]*"/,
  
  // Arrays y objetos con datos de ejemplo
  /\[\s*\{[^}]*'[^']*\.\.\.'[^}]*\}/,
  /\[\s*\{[^}]*"[^"]*\.\.\."\s*[^}]*\}/,
  /\[\s*\{[^}]*'[^']*demo[^']*'[^}]*\}/i,
  /\[\s*\{[^}]*"[^"]*demo[^"]*"[^}]*\}/i,
];

// 📁 ARCHIVOS A ESCANEAR
const SCAN_PATTERNS = [
  'src/**/*.tsx',
  'src/**/*.ts',
  'src/**/*.js',
  'src/**/*.jsx'
];

// 📁 ARCHIVOS A IGNORAR
const IGNORE_PATTERNS = [
  'node_modules/**',
  'dist/**',
  'build/**',
  '.git/**',
  '*.test.*',
  '*.spec.*',
  'src/components/ui/**', // Componentes de UI tienen placeholders legítimos
  'src/hooks/use-toast.ts', // Hook de toast tiene arrays legítimos
  'src/lib/colorProtection.ts', // Sistema de protección tiene arrays legítimos
  'src/lib/designSystem*.ts', // Sistema de diseño tiene arrays legítimos
  'src/data/contactFormConfig.ts', // Configuración de formularios tiene placeholders legítimos
  'src/components/AdminLoginModal.tsx', // Tiene placeholders y tipos legítimos
  'src/components/AdminCMS.tsx', // Tiene placeholders legítimos
  'src/hooks/usePageContent.ts' // Tiene comentarios explicativos legítimos
];

/**
 * Verifica si un archivo debe ser ignorado
 */
function shouldIgnoreFile(filePath) {
  return IGNORE_PATTERNS.some(pattern => {
    const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'));
    return regex.test(filePath);
  });
}

/**
 * Escanea un archivo en busca de datos mock
 */
function scanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const violations = [];

    lines.forEach((line, index) => {
      MOCK_PATTERNS.forEach(pattern => {
        if (pattern.test(line)) {
          violations.push({
            line: index + 1,
            content: line.trim(),
            pattern: pattern.toString()
          });
        }
      });
    });

    return violations;
  } catch (error) {
    console.error(`❌ Error leyendo archivo ${filePath}:`, error.message);
    return [];
  }
}

/**
 * Escanea todos los archivos del proyecto
 */
function scanProject() {
  console.log('🔍 ESCANEANDO PROYECTO EN BUSCA DE DATOS MOCK...\n');
  
  const allViolations = [];
  
  // Escanear archivos TypeScript/JavaScript
  const srcDir = path.join(process.cwd(), 'src');
  
  function scanDirectory(dir) {
    if (!fs.existsSync(dir)) return;
    
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (stat.isFile() && /\.(ts|tsx|js|jsx)$/.test(item)) {
        if (!shouldIgnoreFile(fullPath)) {
          const violations = scanFile(fullPath);
          if (violations.length > 0) {
            allViolations.push({
              file: fullPath,
              violations
            });
          }
        }
      }
    });
  }
  
  scanDirectory(srcDir);
  
  return allViolations;
}

/**
 * Muestra el reporte de violaciones
 */
function showReport(violations) {
  if (violations.length === 0) {
    console.log('✅ NO SE ENCONTRARON DATOS MOCK EN EL PROYECTO');
    console.log('🎉 El código está libre de datos simulados');
    return true;
  }
  
  console.log('🚨 VIOLACIONES DETECTADAS - DATOS MOCK ENCONTRADOS:\n');
  
  violations.forEach(({ file, violations: fileViolations }) => {
    console.log(`📁 ${file}:`);
    fileViolations.forEach(violation => {
      console.log(`   Línea ${violation.line}: ${violation.content}`);
      console.log(`   Patrón detectado: ${violation.pattern}\n`);
    });
  });
  
  console.log('🚫 ACCIONES REQUERIDAS:');
  console.log('   1. Elimina TODOS los datos mock encontrados');
  console.log('   2. Reemplaza con datos reales de Supabase');
  console.log('   3. Implementa las funcionalidades faltantes');
  console.log('   4. Ejecuta este script nuevamente para verificar\n');
  
  console.log('💡 RECUERDA: NUNCA uses datos mock. Solo datos reales.');
  
  return false;
}

/**
 * Función principal
 */
function main() {
  const violations = scanProject();
  const isClean = showReport(violations);
  
  if (!isClean) {
    process.exit(1);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  main();
}

module.exports = {
  scanProject,
  showReport,
  MOCK_PATTERNS
};
