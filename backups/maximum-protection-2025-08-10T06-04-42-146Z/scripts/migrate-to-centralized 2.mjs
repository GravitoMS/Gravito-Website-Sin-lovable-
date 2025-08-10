#!/usr/bin/env node

/**
 * Script de migración automática para el sistema centralizado de Gravito
 * Reemplaza efectos duplicados y hardcodeados con el nuevo sistema centralizado
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración
const SRC_DIR = path.join(__dirname, '..', 'src');
const EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];

// Patrones a reemplazar
const REPLACEMENTS = {
  // Hardcoded colors
  'bg-black': 'bg-gray-900',
  'bg-white': 'bg-white',
  'text-black': 'text-gray-900',
  'text-white': 'text-white',
  'border-black': 'border-gray-900',
  'border-white': 'border-white',
  
  // Hardcoded durations
  'duration-300': 'duration-fast',
  'duration-500': 'duration-normal',
  'duration-700': 'duration-slow',
  'duration-1000': 'duration-verySlow',
  
  // Hardcoded delays
  'delay-100': 'delay-small',
  'delay-200': 'delay-medium',
  'delay-300': 'delay-large',
  'delay-500': 'delay-xlarge'
};

// Imports necesarios
const REQUIRED_IMPORTS = {
  components: "import { FadeInUp, FadeInUpStaggered, FadeInSide, FadeInScale, HoverScale, HoverLift, HoverGlow, FadeInOnScroll, SlideInOnScroll, LoadingPulse, LoadingBounce, FadeInUpWithHover, StaggeredGroup } from '@/components/ui/AnimatedComponents';",
  constants: "import { ANIMATION_DURATIONS, ANIMATION_DELAYS, ANIMATION_EASINGS } from '@/lib/animations';",
  design: "import { DESIGN_SYSTEM, applyDesignSystem } from '@/lib/designSystem';"
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

function migrateFile(filePath) {
  console.log(`\n🔧 Migrando: ${path.relative(process.cwd(), filePath)}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let hasChanges = false;
  let importsAdded = {
    components: false,
    constants: false,
    design: false
  };
  
  // Reemplazar motion.div patterns más agresivamente
  // Patrón 1: motion.div con props de animación
  const motionDivWithPropsRegex = /motion\.div\s*(\{[^}]*\})\s*([^>]*>)/g;
  content = content.replace(motionDivWithPropsRegex, (match, props, rest) => {
    // Detectar el tipo de animación basado en las props
    if (props.includes('opacity: 0') && props.includes('y: 30')) {
      hasChanges = true;
      if (!importsAdded.components) importsAdded.components = true;
      return `FadeInUp${props}${rest}`;
    } else if (props.includes('opacity: 0') && (props.includes('x: -30') || props.includes('x: 30'))) {
      hasChanges = true;
      if (!importsAdded.components) importsAdded.components = true;
      const direction = props.includes('x: -30') ? 'left' : 'right';
      return `FadeInSide direction="${direction}"${props}${rest}`;
    } else if (props.includes('opacity: 0') && props.includes('scale: 0.8')) {
      hasChanges = true;
      if (!importsAdded.components) importsAdded.components = true;
      return `FadeInScale${props}${rest}`;
    }
    return match;
  });
  
  // Patrón 2: motion.div simple (reemplazar con FadeInUp por defecto)
  const simpleMotionDivRegex = /motion\.div/g;
  if (simpleMotionDivRegex.test(content)) {
    content = content.replace(simpleMotionDivRegex, 'FadeInUp');
    hasChanges = true;
    if (!importsAdded.components) importsAdded.components = true;
  }
  
  // Patrón 3: motion.div con className
  const motionDivWithClassNameRegex = /motion\.div\s+className=/g;
  if (motionDivWithClassNameRegex.test(content)) {
    content = content.replace(motionDivWithClassNameRegex, 'FadeInUp className=');
    hasChanges = true;
    if (!importsAdded.components) importsAdded.components = true;
  }
  
  // Patrón 4: motion.div con children
  const motionDivWithChildrenRegex = /motion\.div\s*>\s*([^<]+)/g;
  if (motionDivWithChildrenRegex.test(content)) {
    content = content.replace(motionDivWithChildrenRegex, 'FadeInUp>$1');
    hasChanges = true;
    if (!importsAdded.components) importsAdded.components = true;
  }
  
  // Reemplazar valores hardcodeados
  for (const [oldValue, newValue] of Object.entries(REPLACEMENTS)) {
    if (typeof newValue === 'string') {
      const regex = new RegExp(`\\b${oldValue}\\b`, 'g');
      if (regex.test(content)) {
        content = content.replace(regex, newValue);
        hasChanges = true;
        
        // Agregar imports necesarios según el tipo de cambio
        if (oldValue.startsWith('bg-') || oldValue.startsWith('text-') || oldValue.startsWith('border-')) {
          if (!importsAdded.design) importsAdded.design = true;
        }
        if (oldValue.startsWith('duration-') || oldValue.startsWith('delay-')) {
          if (!importsAdded.constants) importsAdded.constants = true;
        }
      }
    }
  }
  
  // Agregar imports necesarios
  if (hasChanges) {
    const importSection = [];
    
    if (importsAdded.components) {
      importSection.push(REQUIRED_IMPORTS.components);
    }
    if (importsAdded.constants) {
      importSection.push(REQUIRED_IMPORTS.constants);
    }
    if (importsAdded.design) {
      importSection.push(REQUIRED_IMPORTS.design);
    }
    
    if (importSection.length > 0) {
      // Buscar la última línea de import
      const lines = content.split('\n');
      let lastImportIndex = -1;
      
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim().startsWith('import ')) {
          lastImportIndex = i;
        }
      }
      
      if (lastImportIndex !== -1) {
        // Insertar después del último import
        lines.splice(lastImportIndex + 1, 0, '', ...importSection);
        content = lines.join('\n');
      } else {
        // Si no hay imports, agregar al inicio
        content = importSection.join('\n') + '\n\n' + content;
      }
    }
    
    // Guardar el archivo
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Migrado exitosamente`);
  } else {
    console.log(`⏭️  Sin cambios necesarios`);
  }
  
  return hasChanges;
}

function main() {
  console.log('🚀 INICIANDO MIGRACIÓN AL SISTEMA CENTRALIZADO DE GRAVITO');
  console.log('=' .repeat(60));
  
  try {
    const files = findFiles(SRC_DIR, EXTENSIONS);
    console.log(`📁 Encontrados ${files.length} archivos para revisar`);
    
    let totalMigrated = 0;
    
    for (const file of files) {
      if (migrateFile(file)) {
        totalMigrated++;
      }
    }
    
    console.log('\n' + '=' .repeat(60));
    console.log(`🎉 MIGRACIÓN COMPLETADA`);
    console.log(`📊 Total de archivos migrados: ${totalMigrated}/${files.length}`);
    
    if (totalMigrated > 0) {
      console.log('\n📋 PRÓXIMOS PASOS:');
      console.log('1. Ejecutar: node scripts/validate-animations.mjs');
      console.log('2. Revisar que no haya errores de sintaxis');
      console.log('3. Probar la funcionalidad del sitio');
    }
    
  } catch (error) {
    console.error('❌ Error durante la migración:', error);
    process.exit(1);
  }
}

main();
