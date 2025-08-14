#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 ANALIZADOR DE COMPLEJIDAD - GRAVITO WEBSITE\n');

// Configuración
const SRC_DIR = path.join(__dirname, '../src');
const MAX_DEPENDENCIES = 20;
const MAX_ANIMATION_TYPES = 5;

// Métricas
let metrics = {
  totalFiles: 0,
  duplicateFiles: 0,
  motionDivUsage: 0,
  framerMotionImports: 0,
  editableComponents: 0,
  nonEditableComponents: 0,
  issues: []
};

// Buscar archivos duplicados
function findDuplicateFiles(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  const fileNames = new Set();
  
  files.forEach(file => {
    if (file.isFile()) {
      metrics.totalFiles++;
      
      // Detectar archivos con números (duplicados)
      if (file.name.match(/\s[2-9]\./)) {
        metrics.duplicateFiles++;
        metrics.issues.push(`❌ Archivo duplicado: ${file.name}`);
      }
      
      // Detectar archivos backup
      if (file.name.includes('backup') || file.name.includes('copy')) {
        metrics.issues.push(`⚠️ Archivo backup: ${file.name}`);
      }
      
      fileNames.add(file.name);
    } else if (file.isDirectory()) {
      findDuplicateFiles(path.join(dir, file.name));
    }
  });
}

// Analizar uso de framer-motion
function analyzeFramerMotionUsage(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  files.forEach(file => {
    if (file.isFile() && file.name.endsWith('.tsx')) {
      const filePath = path.join(dir, file.name);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Contar motion.div
      const motionDivMatches = content.match(/motion\.div/g);
      if (motionDivMatches) {
        metrics.motionDivUsage += motionDivMatches.length;
        metrics.issues.push(`⚠️ motion.div usado en: ${file.name} (${motionDivMatches.length} veces)`);
      }
      
      // Contar imports de framer-motion
      if (content.includes('framer-motion')) {
        metrics.framerMotionImports++;
        metrics.issues.push(`⚠️ framer-motion importado en: ${file.name}`);
      }
      
      // Contar componentes editables
      if (content.includes('EditableHeading') || content.includes('EditableText')) {
        metrics.editableComponents++;
      }
      
      // Contar componentes no editables
      if (content.includes('FadeIn') || content.includes('HoverScale')) {
        metrics.nonEditableComponents++;
      }
    } else if (file.isDirectory()) {
      analyzeFramerMotionUsage(path.join(dir, file.name));
    }
  });
}

// Analizar dependencias
function analyzeDependencies() {
  try {
    const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
    const dependencies = Object.keys(packageJson.dependencies || {});
    const devDependencies = Object.keys(packageJson.devDependencies || {});
    
    const totalDeps = dependencies.length + devDependencies.length;
    
    if (totalDeps > MAX_DEPENDENCIES) {
      metrics.issues.push(`⚠️ Demasiadas dependencias: ${totalDeps} (máximo ${MAX_DEPENDENCIES})`);
    }
    
    console.log(`📦 Dependencias: ${dependencies.length} + ${devDependencies.length} = ${totalDeps}`);
  } catch (error) {
    console.log('❌ No se pudo analizar package.json');
  }
}

// Ejecutar análisis
console.log('📁 Analizando estructura de archivos...');
findDuplicateFiles(SRC_DIR);

console.log('⚡ Analizando uso de animaciones...');
analyzeFramerMotionUsage(SRC_DIR);

console.log('📦 Analizando dependencias...');
analyzeDependencies();

// Generar reporte
console.log('\n📊 REPORTE DE COMPLEJIDAD\n');

console.log(`📁 Archivos totales: ${metrics.totalFiles}`);
console.log(`🔄 Archivos duplicados: ${metrics.duplicateFiles}`);
console.log(`⚡ motion.div usados: ${metrics.motionDivUsage}`);
console.log(`📦 Imports framer-motion: ${metrics.framerMotionImports}`);
console.log(`✅ Componentes editables: ${metrics.editableComponents}`);
console.log(`🎭 Componentes no editables: ${metrics.nonEditableComponents}`);

// Evaluación
let score = 100;
let level = '🟢 EXCELENTE';

if (metrics.duplicateFiles > 0) {
  score -= metrics.duplicateFiles * 10;
  level = '🔴 CRÍTICO';
}

if (metrics.motionDivUsage > 5) {
  score -= (metrics.motionDivUsage - 5) * 5;
  level = '🟡 ADVERTENCIA';
}

if (metrics.framerMotionImports > 3) {
  score -= (metrics.framerMotionImports - 3) * 5;
  level = '🟡 ADVERTENCIA';
}

console.log(`\n🎯 PUNTAJE DE SIMPLICIDAD: ${score}/100 ${level}`);

// Mostrar issues
if (metrics.issues.length > 0) {
  console.log('\n🚨 PROBLEMAS DETECTADOS:');
  metrics.issues.forEach(issue => console.log(issue));
} else {
  console.log('\n✅ No se detectaron problemas de complejidad');
}

// Recomendaciones
console.log('\n💡 RECOMENDACIONES:');

if (metrics.duplicateFiles > 0) {
  console.log('🔧 Eliminar archivos duplicados');
}

if (metrics.motionDivUsage > 5) {
  console.log('🔧 Reemplazar motion.div con componentes editables');
}

if (metrics.framerMotionImports > 3) {
  console.log('🔧 Consolidar imports de framer-motion');
}

if (score >= 80) {
  console.log('✅ El proyecto mantiene buena simplicidad');
} else if (score >= 60) {
  console.log('⚠️ Considerar simplificaciones adicionales');
} else {
  console.log('🚨 Se requiere simplificación urgente');
}

console.log('\n📚 Para más información, consulta:');
console.log('- DEVELOPMENT_CONSTITUTION.md');
console.log('- SIMPLICITY_ENFORCEMENT.md');
console.log('- LOVABLE_INTEGRATION_GUIDE.md');
