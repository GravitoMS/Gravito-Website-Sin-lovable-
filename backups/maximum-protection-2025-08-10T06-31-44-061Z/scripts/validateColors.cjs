#!/usr/bin/env node

/**
 * Script de validación de colores para Gravito
 * Este script detecta el uso de colores no autorizados fuera del sistema centralizado
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Colores autorizados del sistema centralizado
const AUTHORIZED_COLORS = [
  // Colores del sistema centralizado
  'primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info',
  'card', 'border', 'foreground', 'muted', 'background', 'white', 'black', 'transparent',
  
  // Variaciones autorizadas
  'primary-50', 'primary-100', 'primary-200', 'primary-300', 'primary-400',
  'primary-500', 'primary-600', 'primary-700', 'primary-800', 'primary-900', 'primary-950',
  
  'secondary-50', 'secondary-100', 'secondary-200', 'secondary-300', 'secondary-400',
  'secondary-500', 'secondary-600', 'secondary-700', 'secondary-800', 'secondary-900', 'secondary-950',
  
  'accent-50', 'accent-100', 'accent-200', 'accent-300', 'accent-400',
  'accent-500', 'accent-600', 'accent-700', 'accent-800', 'accent-900', 'accent-950',
];

// Colores NO autorizados que deben ser reemplazados
const UNAUTHORIZED_COLORS = [
  'green-50', 'green-100', 'green-200', 'green-300', 'green-400',
  'green-500', 'green-600', 'green-700', 'green-800', 'green-900', 'green-950',
  
  'gray-50', 'gray-100', 'gray-200', 'gray-300', 'gray-400',
  'gray-500', 'gray-600', 'gray-700', 'gray-800', 'gray-900', 'gray-950',
  
  'blue-50', 'blue-100', 'blue-200', 'blue-300', 'blue-400',
  'blue-500', 'blue-600', 'blue-700', 'blue-800', 'blue-900', 'blue-950',
  
  'red-50', 'red-100', 'red-200', 'red-300', 'red-400',
  'red-500', 'red-600', 'red-700', 'red-800', 'red-900', 'red-950',
  
  'yellow-50', 'yellow-100', 'yellow-200', 'yellow-300', 'yellow-400',
  'yellow-500', 'yellow-600', 'yellow-700', 'yellow-800', 'yellow-900', 'yellow-950',
  
  'orange-50', 'orange-100', 'orange-200', 'orange-300', 'orange-400',
  'orange-500', 'orange-600', 'orange-700', 'orange-800', 'orange-900', 'orange-950',
];

// Mapeo de colores no autorizados a colores autorizados
const COLOR_MAPPING = {
  'green-800': 'primary-800',
  'green-700': 'primary-700',
  'green-600': 'primary-600',
  'green-500': 'primary-500',
  'green-400': 'primary-400',
  'green-300': 'primary-300',
  'green-200': 'primary-200',
  'green-100': 'primary-100',
  'green-50': 'primary-50',
  
  'gray-900': 'secondary-900',
  'gray-800': 'secondary-800',
  'gray-700': 'secondary-700',
  'gray-600': 'secondary-600',
  'gray-500': 'secondary-500',
  'gray-400': 'secondary-400',
  'gray-300': 'secondary-300',
  'gray-200': 'secondary-200',
  'gray-100': 'secondary-100',
  'gray-50': 'secondary-50',
  
  'blue-600': 'accent-600',
  'blue-500': 'accent-500',
  'blue-400': 'accent-400',
  
  'orange-400': 'warning',
  'orange-500': 'warning',
};

// Función para validar un archivo
function validateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const violations = [];
  
  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    
    // Buscar colores no autorizados
    UNAUTHORIZED_COLORS.forEach(unauthorizedColor => {
      if (line.includes(unauthorizedColor)) {
        const suggestedColor = COLOR_MAPPING[unauthorizedColor] || 'primary-500';
        violations.push({
          line: lineNumber,
          color: unauthorizedColor,
          suggested: suggestedColor,
          content: line.trim(),
        });
      }
    });
  });
  
  return violations;
}

// Función principal
function main() {
  console.log('🎨 Validando colores del sistema centralizado de Gravito...\n');
  
  // Buscar archivos TypeScript/React
  const files = glob.sync('src/**/*.{ts,tsx}', {
    ignore: ['src/lib/designSystem.ts', 'src/lib/colorValidator.ts', 'src/lib/animations.ts', 'src/lib/index.ts']
  });
  
  let totalViolations = 0;
  let filesWithViolations = 0;
  
  files.forEach(file => {
    const violations = validateFile(file);
    
    if (violations.length > 0) {
      filesWithViolations++;
      totalViolations += violations.length;
      
      console.log(`❌ ${file} (${violations.length} violaciones):`);
      
      violations.forEach(violation => {
        console.log(`   Línea ${violation.line}: "${violation.color}" → Sugerido: "${violation.suggested}"`);
        console.log(`   ${violation.content}`);
        console.log('');
      });
    }
  });
  
  console.log('📊 Resumen de validación:');
  console.log(`   Archivos revisados: ${files.length}`);
  console.log(`   Archivos con violaciones: ${filesWithViolations}`);
  console.log(`   Total de violaciones: ${totalViolations}`);
  
  if (totalViolations === 0) {
    console.log('\n✅ ¡Excelente! Todos los colores están usando el sistema centralizado.');
    process.exit(0);
  } else {
    console.log('\n❌ Se encontraron colores no autorizados.');
    console.log('💡 Recomendaciones:');
    console.log('   1. Reemplaza los colores no autorizados con colores del sistema centralizado');
    console.log('   2. Usa las funciones del validador de colores para generar variaciones');
    console.log('   3. Ejecuta este script regularmente para mantener la consistencia');
    process.exit(1);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  main();
}

module.exports = {
  validateFile,
  AUTHORIZED_COLORS,
  UNAUTHORIZED_COLORS,
  COLOR_MAPPING,
};
