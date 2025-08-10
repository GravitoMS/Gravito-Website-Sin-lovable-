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

// Patrones de reemplazo
const REPLACEMENTS = {
  // Reemplazos críticos - motion elements
  'motion.div': 'FadeInUp',
  'motion.h1': 'FadeInUp',
  'motion.h2': 'FadeInUp',
  'motion.h3': 'FadeInUp',
  'motion.p': 'FadeInUp',
  'motion.span': 'FadeInUp',
  'motion.a': 'FadeInUp',
  'motion.button': 'FadeInUp',
  'motion.section': 'FadeInUp',
  'motion.article': 'FadeInUp',
  'motion.header': 'FadeInUp',
  'motion.footer': 'FadeInUp',
  'motion.nav': 'FadeInUp',
  'motion.ul': 'FadeInUp',
  'motion.li': 'FadeInUp',
  'motion.img': 'FadeInUp',
  'motion.svg': 'FadeInUp',
  
  // Imports de framer-motion
  'import { motion } from \'framer-motion\'': 'import { FadeInUp, FadeInUpStaggered, FadeInSide, FadeInScale, HoverScale, HoverLift, HoverGlow, FadeInOnScroll, SlideInOnScroll, LoadingPulse, LoadingBounce, FadeInUpWithHover, StaggeredGroup } from \'@/components/ui/AnimatedComponents\'',
  'import { motion } from "framer-motion"': 'import { FadeInUp, FadeInUpStaggered, FadeInSide, FadeInScale, HoverScale, HoverLift, HoverGlow, FadeInOnScroll, SlideInOnScroll, LoadingPulse, LoadingBounce, FadeInUpWithHover, StaggeredGroup } from "@/components/ui/AnimatedComponents"',
  
  // Colores hardcodeados
  '#19a476': 'hsl(var(--primary))',
  '#ca7134': 'hsl(var(--secondary))',
  '#202225': 'hsl(var(--card-dark))',
  
  // Duraciones hardcodeadas
  'duration-200': 'duration-fast',
  'duration-300': 'duration-fast',
  'duration-500': 'duration-normal',
  'duration-700': 'duration-slow',
  'duration-1000': 'duration-verySlow',
  
  // Delays hardcodeados
  'delay-100': 'delay-small',
  'delay-200': 'delay-medium',
  'delay-300': 'delay-large'
};

// Imports necesarios
const REQUIRED_IMPORTS = {
  animations: 'import { ANIMATION_DURATIONS, ANIMATION_DELAYS, ANIMATION_EASINGS } from \'@/lib/animations\'',
  designSystem: 'import { DESIGN_SYSTEM, applyDesignSystem } from \'@/lib/designSystem\'',
  animatedComponents: 'import { FadeInUp, FadeInUpStaggered, FadeInSide, FadeInScale, HoverScale, HoverLift, HoverGlow, FadeInOnScroll, SlideInOnScroll, LoadingPulse, LoadingBounce, FadeInUpWithHover, StaggeredGroup } from \'@/components/ui/AnimatedComponents\''
};

// Estadísticas
let stats = {
  totalFiles: 0,
  filesModified: 0,
  totalReplacements: 0,
  importsAdded: {
    animations: 0,
    designSystem: 0,
    animatedComponents: 0
  }
};

// Función para encontrar archivos
function findFiles(dir) {
  console.log(`🔍 Explorando directorio: ${dir}`);
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    if (IGNORE_DIRS.includes(item)) {
      console.log(`   ⏭️  Ignorando: ${item}`);
      continue;
    }
    
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      console.log(`   📁 Directorio: ${item}`);
      findFiles(fullPath);
    } else if (stat.isFile() && EXTENSIONS.some(ext => item.endsWith(ext))) {
      console.log(`   📄 Archivo: ${item}`);
      stats.totalFiles++;
      processFile(fullPath);
    } else {
      console.log(`   ⏭️  Ignorando archivo: ${item}`);
    }
  }
}

// Función para procesar archivo
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(PROJECT_ROOT, filePath);
    let hasChanges = false;
    let importsAdded = {
      animations: false,
      designSystem: false,
      animatedComponents: false
    };
    
    // Verificar imports existentes
    const hasAnimationsImport = content.includes('@/lib/animations');
    const hasDesignSystemImport = content.includes('@/lib/designSystem');
    const hasAnimatedComponentsImport = content.includes('@/components/ui/AnimatedComponents');
    
    // Aplicar reemplazos básicos
    for (const [pattern, replacement] of Object.entries(REPLACEMENTS)) {
      const regex = new RegExp(pattern, 'g');
      if (regex.test(content)) {
        content = content.replace(regex, replacement);
        hasChanges = true;
        stats.totalReplacements++;
        
        // Marcar imports necesarios
        if (pattern.includes('motion.div') || pattern.includes('framer-motion')) {
          importsAdded.animatedComponents = true;
        }
        if (pattern.includes('duration-') || pattern.includes('delay-')) {
          importsAdded.animations = true;
        }
        if (pattern.includes('#')) {
          importsAdded.designSystem = true;
        }
      }
    }
    
    // Reemplazar elementos motion.* con expresiones regulares más sofisticadas
    // Patrón para motion.h1, motion.h2, motion.h3, motion.p, motion.span, motion.a, motion.button
    const motionElementRegex = /<motion\.(h1|h2|h3|p|span|a|button|section|article|header|footer|nav|ul|li|img|svg)([^>]*)>/g;
    content = content.replace(motionElementRegex, (match, elementType, attributes) => {
      hasChanges = true;
      stats.totalReplacements++;
      importsAdded.animatedComponents = true;
      return `<FadeInUp${attributes}>`;
    });
    
    // Patrón para cierre de elementos motion
    const motionCloseRegex = /<\/motion\.(h1|h2|h3|p|span|a|button|section|article|header|footer|nav|ul|li|img|svg)>/g;
    content = content.replace(motionCloseRegex, (match, elementType) => {
      hasChanges = true;
      stats.totalReplacements++;
      return `</FadeInUp>`;
    });
    
    // Reemplazar motion.div patterns más agresivamente
    // Patrón 1: motion.div con props de animación
    const motionDivWithPropsRegex = /motion\.div\s*(\{[^}]*\})\s*([^>]*>)/g;
    content = content.replace(motionDivWithPropsRegex, (match, props, rest) => {
      hasChanges = true;
      stats.totalReplacements++;
      importsAdded.animatedComponents = true;
      return `FadeInUp ${props}${rest}`;
    });
    
    // Patrón 2: motion.div simple
    const motionDivSimpleRegex = /<motion\.div([^>]*)>/g;
    content = content.replace(motionDivSimpleRegex, (match, attributes) => {
      hasChanges = true;
      stats.totalReplacements++;
      importsAdded.animatedComponents = true;
      return `<FadeInUp${attributes}>`;
    });
    
    // Patrón 3: cierre de motion.div
    const motionDivCloseRegex = /<\/motion\.div>/g;
    content = content.replace(motionDivCloseRegex, () => {
      hasChanges = true;
      stats.totalReplacements++;
      return '</FadeInUp>';
    });
    
    // Agregar imports necesarios si no existen
    if (importsAdded.animations && !hasAnimationsImport) {
      content = addImport(content, REQUIRED_IMPORTS.animations);
      stats.importsAdded.animations++;
    }
    
    if (importsAdded.designSystem && !hasDesignSystemImport) {
      content = addImport(content, REQUIRED_IMPORTS.designSystem);
      stats.importsAdded.designSystem++;
    }
    
    if (importsAdded.animatedComponents && !hasAnimatedComponentsImport) {
      content = addImport(content, REQUIRED_IMPORTS.animatedComponents);
      stats.importsAdded.animatedComponents++;
    }
    
    // Guardar archivo si hubo cambios
    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
      stats.filesModified++;
      console.log(`✅ ${relativePath} - ${stats.totalReplacements} reemplazos`);
    }
    
  } catch (error) {
    console.error(`❌ Error procesando ${filePath}:`, error.message);
  }
}

// Función para agregar import
function addImport(content, importStatement) {
  // Buscar la última línea de import
  const lines = content.split('\n');
  let lastImportIndex = -1;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('import ')) {
      lastImportIndex = i;
    }
  }
  
  if (lastImportIndex >= 0) {
    // Insertar después del último import
    lines.splice(lastImportIndex + 1, 0, importStatement);
  } else {
    // Si no hay imports, insertar al principio
    lines.unshift(importStatement);
  }
  
  return lines.join('\n');
}

// Función para mostrar resultados
function displayResults() {
  console.log('\n🔄 MIGRACIÓN AL SISTEMA CENTRALIZADO COMPLETADA\n');
  console.log('=' .repeat(60));
  
  // Estadísticas generales
  console.log(`📊 ESTADÍSTICAS DE MIGRACIÓN:`);
  console.log(`   Archivos analizados: ${stats.totalFiles}`);
  console.log(`   Archivos modificados: ${stats.filesModified}`);
  console.log(`   Total de reemplazos: ${stats.totalReplacements}\n`);
  
  // Imports agregados
  console.log(`📥 IMPORTS AGREGADOS:`);
  console.log(`   Animaciones: ${stats.importsAdded.animations}`);
  console.log(`   Sistema de diseño: ${stats.importsAdded.designSystem}`);
  console.log(`   Componentes animados: ${stats.importsAdded.animatedComponents}\n`);
  
  if (stats.totalReplacements > 0) {
    console.log(`✅ MIGRACIÓN EXITOSA:`);
    console.log(`   Se han reemplazado ${stats.totalReplacements} patrones antiguos`);
    console.log(`   Se han agregado los imports necesarios`);
    console.log(`   El código ahora usa el sistema centralizado\n`);
    
    console.log(`🔍 PRÓXIMOS PASOS:`);
    console.log(`   1. Ejecutar validación: node scripts/validate-animations.mjs`);
    console.log(`   2. Si hay violaciones críticas, ejecutar: node scripts/final-cleanup.mjs`);
    console.log(`   3. Verificar que la aplicación compile correctamente`);
  } else {
    console.log(`ℹ️ NO SE REQUIRIERON CAMBIOS:`);
    console.log(`   El código ya está usando el sistema centralizado`);
  }
  
  console.log('\n' + '=' .repeat(60));
}

// Función principal
function main() {
  console.log('🔄 Iniciando migración al sistema centralizado...\n');
  
  try {
    findFiles(PROJECT_ROOT);
    displayResults();
    
  } catch (error) {
    console.error('❌ Error durante la migración:', error.message);
    process.exit(1);
  }
}

// Ejecutar si es llamado directamente
console.log('🔍 Verificando condición de ejecución...');
console.log('import.meta.url:', import.meta.url);
console.log('process.argv[1]:', process.argv[1]);
console.log('Condición cumplida:', import.meta.url === `file://${process.argv[1]}`);

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('✅ Ejecutando main()...');
  main();
} else {
  console.log('❌ Condición no cumplida, ejecutando main() de todas formas...');
  main();
}

    console.log(`   El código ya está usando el sistema centralizado`);
  }
  
  console.log('\n' + '=' .repeat(60));
}

// Función principal
function main() {
  console.log('🔄 Iniciando migración al sistema centralizado...\n');
  
  try {
    findFiles(PROJECT_ROOT);
    displayResults();
    
  } catch (error) {
    console.error('❌ Error durante la migración:', error.message);
    process.exit(1);
  }
}

// Ejecutar si es llamado directamente
console.log('🔍 Verificando condición de ejecución...');
console.log('import.meta.url:', import.meta.url);
console.log('process.argv[1]:', process.argv[1]);
console.log('Condición cumplida:', import.meta.url === `file://${process.argv[1]}`);

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('✅ Ejecutando main()...');
  main();
} else {
  console.log('❌ Condición no cumplida, ejecutando main() de todas formas...');
  main();
}
