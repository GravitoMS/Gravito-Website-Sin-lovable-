#!/usr/bin/env node

/**
 * Script de limpieza final para el sistema centralizado de Gravito
 * Corrige las violaciones críticas y altas restantes
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración
const SRC_DIR = path.join(__dirname, '..', 'src');
const EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];

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

function findFiles(dir, extensions) {
  const files = [];
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        traverse(fullPath);
      } else if (stat.isFile() && extensions.some(ext => item.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

function cleanupFile(filePath) {
  console.log(`\n🧹 Limpiando: ${path.relative(process.cwd(), filePath)}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let hasChanges = false;
  
  // Limpiar violaciones críticas
  for (const [oldValue, newValue] of Object.entries(CRITICAL_REPLACEMENTS)) {
    if (content.includes(oldValue)) {
      const regex = new RegExp(oldValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      content = content.replace(regex, newValue);
      hasChanges = true;
      console.log(`  🔴 Reemplazado: ${oldValue} → ${newValue}`);
    }
  }
  
  // Limpiar violaciones de alta prioridad
  for (const [oldValue, newValue] of Object.entries(HIGH_PRIORITY_REPLACEMENTS)) {
    if (content.includes(oldValue)) {
      const regex = new RegExp(`\\b${oldValue}\\b`, 'g');
      content = content.replace(regex, newValue);
      hasChanges = true;
      console.log(`  🟡 Reemplazado: ${oldValue} → ${newValue}`);
    }
  }
  
  if (hasChanges) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✅ Limpieza completada`);
  } else {
    console.log(`  ⏭️  Sin cambios necesarios`);
  }
  
  return hasChanges;
}

function main() {
  console.log('🧹 LIMPIEZA FINAL DEL SISTEMA CENTRALIZADO DE GRAVITO');
  console.log('=' .repeat(60));
  
  try {
    const files = findFiles(SRC_DIR, EXTENSIONS);
    console.log(`📁 Encontrados ${files.length} archivos para revisar`);
    
    let totalCleaned = 0;
    
    for (const file of files) {
      if (cleanupFile(file)) {
        totalCleaned++;
      }
    }
    
    console.log('\n' + '=' .repeat(60));
    console.log(`🎉 LIMPIEZA FINAL COMPLETADA`);
    console.log(`📊 Total de archivos limpiados: ${totalCleaned}/${files.length}`);
    
    if (totalCleaned > 0) {
      console.log('\n📋 PRÓXIMOS PASOS:');
      console.log('1. Ejecutar: node scripts/validate-animations.mjs');
      console.log('2. Verificar que las violaciones críticas se hayan eliminado');
      console.log('3. Probar la funcionalidad del sitio');
    }
    
  } catch (error) {
    console.error('❌ Error durante la limpieza:', error);
    process.exit(1);
  }
}

main();
