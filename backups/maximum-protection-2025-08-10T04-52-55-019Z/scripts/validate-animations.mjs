#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración
const PROJECT_ROOT = path.resolve(__dirname, '..');
const EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];
const IGNORE_DIRS = ['node_modules', '.git', 'dist', 'build', 'backups'];

// Patrones de violación
const VIOLATIONS = {
  CRITICAL: {
    'motion.div': 'Uso directo de motion.div (PROHIBIDO)',
    'import.*motion.*from.*framer-motion': 'Import directo de framer-motion (PROHIBIDO)',
    '#19a476': 'Color verde hardcodeado (PROHIBIDO)',
    '#ca7134': 'Color naranja hardcodeado (PROHIBIDO)',
    '#202225': 'Color fondo oscuro hardcodeado (PROHIBIDO)',
    '#[0-9a-fA-F]{6}': 'Color hex hardcodeado (PROHIBIDO)',
    'rgb\\([^)]+\\)': 'Color RGB hardcodeado (PROHIBIDO)'
  },
  HIGH: {
    'bg-white': 'Uso de bg-white (debe usar sistema centralizado)',
    'text-white': 'Uso de text-white (debe usar sistema centralizado)',
    'duration-200': 'Duración hardcodeada (debe usar ANIMATION_DURATIONS.FAST)',
    'duration-300': 'Duración hardcodeada (debe usar ANIMATION_DURATIONS.FAST)',
    'duration-500': 'Duración hardcodeada (debe usar ANIMATION_DURATIONS.NORMAL)',
    'duration-700': 'Duración hardcodeada (debe usar ANIMATION_DURATIONS.SLOW)',
    'duration-1000': 'Duración hardcodeada (debe usar ANIMATION_DURATIONS.VERY_SLOW)',
    'delay-100': 'Delay hardcodeado (debe usar ANIMATION_DELAYS.SMALL)',
    'delay-200': 'Delay hardcodeado (debe usar ANIMATION_DELAYS.MEDIUM)',
    'delay-300': 'Delay hardcodeado (debe usar ANIMATION_DELAYS.LARGE)'
  },
  MEDIUM: {
    'p-\\d+': 'Espaciado hardcodeado (debe usar sistema centralizado)',
    'm-\\d+': 'Margen hardcodeado (debe usar sistema centralizado)',
    'rounded-\\w+': 'Border radius hardcodeado (debe usar sistema centralizado)',
    'shadow-\\w+': 'Sombra hardcodeada (debe usar sistema centralizado)',
    'border-\\w+': 'Borde hardcodeado (debe usar sistema centralizado)'
  }
};

// Estadísticas
let stats = {
  totalFiles: 0,
  filesWithViolations: 0,
  totalViolations: 0,
  critical: 0,
  high: 0,
  medium: 0,
  violationsByFile: {}
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
      analyzeFile(fullPath);
    }
  }
}

// Función para analizar archivo
function analyzeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(PROJECT_ROOT, filePath);
    let fileViolations = [];
    
    // Verificar cada tipo de violación
    for (const [severity, patterns] of Object.entries(VIOLATIONS)) {
      for (const [pattern, description] of Object.entries(patterns)) {
        const regex = new RegExp(pattern, 'g');
        const matches = content.match(regex);
        
        if (matches) {
          const count = matches.length;
          fileViolations.push({
            severity,
            description,
            count,
            pattern
          });
          
          // Actualizar estadísticas globales
          stats.totalViolations += count;
          stats[severity] += count;
        }
      }
    }
    
    if (fileViolations.length > 0) {
      stats.filesWithViolations++;
      stats.violationsByFile[relativePath] = fileViolations;
    }
    
  } catch (error) {
    console.error(`Error analizando archivo ${filePath}:`, error.message);
  }
}

// Función para mostrar resultados
function displayResults() {
  console.log('\n🔍 VALIDACIÓN DEL SISTEMA CENTRALIZADO DE GRAVITO\n');
  console.log('=' .repeat(60));
  
  // Estadísticas generales
  console.log(`📊 ESTADÍSTICAS GENERALES:`);
  console.log(`   Archivos analizados: ${stats.totalFiles}`);
  console.log(`   Archivos con violaciones: ${stats.filesWithViolations}`);
  console.log(`   Total de violaciones: ${stats.totalViolations}\n`);
  
  // Resumen por severidad
  console.log(`🚨 VIOLACIONES POR SEVERIDAD:`);
  console.log(`   CRÍTICAS: ${stats.critical} (ERROR DE COMPILACIÓN)`);
  console.log(`   ALTAS: ${stats.high} (WARNING)`);
  console.log(`   MEDIAS: ${stats.medium} (INFO)\n`);
  
  // Detalles por archivo
  if (Object.keys(stats.violationsByFile).length > 0) {
    console.log(`📁 DETALLES POR ARCHIVO:`);
    console.log('=' .repeat(60));
    
    for (const [filePath, violations] of Object.entries(stats.violationsByFile)) {
      console.log(`\n📄 ${filePath}`);
      
      // Agrupar por severidad
      const bySeverity = violations.reduce((acc, v) => {
        if (!acc[v.severity]) acc[v.severity] = [];
        acc[v.severity].push(v);
        return acc;
      }, {});
      
      for (const [severity, items] of Object.entries(bySeverity)) {
        const icon = severity === 'CRITICAL' ? '❌' : severity === 'HIGH' ? '⚠️' : 'ℹ️';
        console.log(`   ${icon} ${severity}:`);
        
        for (const item of items) {
          console.log(`      • ${item.description}: ${item.count} ocurrencias`);
        }
      }
    }
  } else {
    console.log(`✅ ¡PERFECTO! No se encontraron violaciones.`);
    console.log(`   El sistema centralizado está funcionando correctamente.`);
  }
  
  // Recomendaciones
  if (stats.critical > 0) {
    console.log(`\n🚨 ACCIÓN INMEDIATA REQUERIDA:`);
    console.log(`   Ejecutar: node scripts/migrate-to-centralized.mjs`);
    console.log(`   Luego: node scripts/final-cleanup.mjs`);
  } else if (stats.high > 0) {
    console.log(`\n⚠️ LIMPIEZA RECOMENDADA:`);
    console.log(`   Ejecutar: node scripts/final-cleanup.mjs`);
  }
  
  console.log('\n' + '=' .repeat(60));
}

// Función principal
function main() {
  console.log('🔍 Iniciando validación del sistema centralizado...\n');
  
  try {
    findFiles(PROJECT_ROOT);
    displayResults();
    
    // Código de salida basado en violaciones críticas
    process.exit(stats.critical > 0 ? 1 : 0);
    
  } catch (error) {
    console.error('❌ Error durante la validación:', error.message);
    process.exit(1);
  }
}

// Ejecutar si es llamado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
