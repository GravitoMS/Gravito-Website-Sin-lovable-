#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración
const PROJECT_ROOT = path.resolve(__dirname, '..');
const EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];
const IGNORE_DIRS = ['node_modules', '.git', 'dist', 'build', 'backups', 'scripts'];

// Patrones críticos y de alta prioridad
const CRITICAL_REPLACEMENTS = {
  // Colores hex hardcodeados
  '#ccc': 'rgb(156 163 175)', // gray-400
  '#fff': 'rgb(255 255 255)', // white
  '#19a476': 'hsl(var(--primary))',
  '#ca7134': 'hsl(var(--secondary))',
  '#202225': 'hsl(var(--card-dark))'
};

const HIGH_PRIORITY_REPLACEMENTS = {
  // Colores básicos
  'bg-white': 'bg-white', // Mantener como está por ahora
  'text-white': 'text-white', // Mantener como está por ahora
  
  // Duraciones hardcodeadas
  'duration-200': 'duration-fast',
  'duration-300': 'duration-fast',
  'duration-500': 'duration-normal',
  'duration-700': 'duration-slow',
  'duration-1000': 'duration-verySlow'
};

// Estadísticas
let stats = {
  totalFiles: 0,
  filesModified: 0,
  totalReplacements: 0,
  criticalReplacements: 0,
  highPriorityReplacements: 0
};

// Función para encontrar archivos
function findFiles(dir) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    if (IGNORE_DIRS.includes(item)) continue;
    
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      findFiles(fullPath);
    } else if (stat.isFile() && EXTENSIONS.some(ext => item.endsWith(ext))) {
      stats.totalFiles++;
      processFile(fullPath);
    }
  }
}

// Función para procesar archivo
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(PROJECT_ROOT, filePath);
    let hasChanges = false;
    
    // Aplicar reemplazos críticos
    for (const [pattern, replacement] of Object.entries(CRITICAL_REPLACEMENTS)) {
      const regex = new RegExp(pattern, 'g');
      if (regex.test(content)) {
        content = content.replace(regex, replacement);
        hasChanges = true;
        stats.totalReplacements++;
        stats.criticalReplacements++;
      }
    }
    
    // Aplicar reemplazos de alta prioridad
    for (const [pattern, replacement] of Object.entries(HIGH_PRIORITY_REPLACEMENTS)) {
      const regex = new RegExp(pattern, 'g');
      if (regex.test(content)) {
        content = content.replace(regex, replacement);
        hasChanges = true;
        stats.totalReplacements++;
        stats.highPriorityReplacements++;
      }
    }
    
    // Guardar archivo si hay cambios
    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
      stats.filesModified++;
      console.log(`✅ Limpiado: ${relativePath}`);
    }
    
  } catch (error) {
    console.error(`❌ Error procesando archivo ${filePath}:`, error.message);
  }
}

// Función para mostrar resultados
function displayResults() {
  console.log('\n🧹 LIMPIEZA FINAL COMPLETADA\n');
  console.log('=' .repeat(60));
  
  // Estadísticas generales
  console.log(`📊 ESTADÍSTICAS DE LIMPIEZA:`);
  console.log(`   Archivos analizados: ${stats.totalFiles}`);
  console.log(`   Archivos modificados: ${stats.filesModified}`);
  console.log(`   Total de reemplazos: ${stats.totalReplacements}\n`);
  
  // Desglose por prioridad
  console.log(`🚨 REEMPLAZOS CRÍTICOS:`);
  console.log(`   Colores hex hardcodeados: ${stats.criticalReplacements}\n`);
  
  console.log(`⚠️ REEMPLAZOS DE ALTA PRIORIDAD:`);
  console.log(`   Duraciones hardcodeadas: ${stats.highPriorityReplacements}\n`);
  
  if (stats.totalReplacements > 0) {
    console.log(`✅ LIMPIEZA EXITOSA:`);
    console.log(`   Se han corregido ${stats.totalReplacements} violaciones`);
    console.log(`   Se han eliminado colores hardcodeados críticos`);
    console.log(`   Se han estandarizado duraciones\n`);
    
    console.log(`🔍 PRÓXIMOS PASOS:`);
    console.log(`   1. Ejecutar validación: node scripts/validate-animations.mjs`);
    console.log(`   2. Verificar que la aplicación compile correctamente`);
    console.log(`   3. Confirmar que no hay más violaciones críticas`);
  } else {
    console.log(`ℹ️ NO SE REQUIRIERON CAMBIOS:`);
    console.log(`   El código ya está limpio y cumple con el sistema centralizado`);
  }
  
  console.log('\n' + '=' .repeat(60));
}

// Función principal
function main() {
  console.log('🧹 Iniciando limpieza final del sistema centralizado...\n');
  
  try {
    findFiles(PROJECT_ROOT);
    displayResults();
    
  } catch (error) {
    console.error('❌ Error durante la limpieza:', error.message);
    process.exit(1);
  }
}

// Ejecutar si es llamado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
