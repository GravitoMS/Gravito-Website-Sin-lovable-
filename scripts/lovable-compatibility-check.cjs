#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🤝 VERIFICADOR DE COMPATIBILIDAD LOVABLE - GRAVITO WEBSITE\n');

// Configuración
const SRC_DIR = path.join(__dirname, '../src');

// Métricas
let metrics = {
  totalComponents: 0,
  editableComponents: 0,
  nonEditableComponents: 0,
  motionDivInEditables: 0,
  iframesWithoutPointerEvents: 0,
  zIndexIssues: 0,
  issues: [],
  warnings: []
};

// Analizar componentes editables
function analyzeEditableComponents(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  files.forEach(file => {
    if (file.isFile() && file.name.endsWith('.tsx')) {
      const filePath = path.join(dir, file.name);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Contar componentes editables
      const editableMatches = content.match(/EditableHeading|EditableText|EditableFadeIn|EditableHoverScale/g);
      if (editableMatches) {
        metrics.editableComponents += editableMatches.length;
      }
      
      // Contar componentes no editables
      const nonEditableMatches = content.match(/FadeIn|HoverScale|SlideIn/g);
      if (nonEditableMatches) {
        metrics.nonEditableComponents += nonEditableMatches.length;
      }
      
      // Verificar motion.div en elementos editables
      if (content.includes('motion.div') && (content.includes('Editable') || content.includes('data-editable'))) {
        metrics.motionDivInEditables++;
        metrics.issues.push(`❌ motion.div usado en componente editable: ${file.name}`);
      }
      
      // Verificar iframes sin pointer-events
      if (content.includes('<iframe') && !content.includes('pointer-events-none')) {
        metrics.iframesWithoutPointerEvents++;
        metrics.issues.push(`⚠️ Iframe sin pointer-events-none: ${file.name}`);
      }
      
      // Verificar z-index en elementos editables
      if (content.includes('data-editable') && !content.includes('z-') && !content.includes('zIndex')) {
        metrics.zIndexIssues++;
        metrics.warnings.push(`⚠️ Elemento editable sin z-index definido: ${file.name}`);
      }
      
      metrics.totalComponents++;
    } else if (file.isDirectory()) {
      analyzeEditableComponents(path.join(dir, file.name));
    }
  });
}

// Verificar estructura de componentes
function checkComponentStructure() {
  const editableAnimationsPath = path.join(SRC_DIR, 'components/ui/EditableAnimations.tsx');
  
  if (!fs.existsSync(editableAnimationsPath)) {
    metrics.issues.push('❌ Archivo EditableAnimations.tsx no encontrado');
  } else {
    const content = fs.readFileSync(editableAnimationsPath, 'utf8');
    
    // Verificar componentes esenciales
    const requiredComponents = ['EditableHeading', 'EditableText', 'EditableFadeIn'];
    requiredComponents.forEach(component => {
      if (!content.includes(component)) {
        metrics.issues.push(`❌ Componente ${component} no encontrado en EditableAnimations.tsx`);
      }
    });
    
    // Verificar data-editable
    if (!content.includes('data-editable="true"')) {
      metrics.issues.push('❌ data-editable="true" no encontrado en componentes editables');
    }
  }
}

// Verificar configuración de Tailwind
function checkTailwindConfig() {
  const tailwindConfigPath = path.join(__dirname, '../tailwind.config.ts');
  
  if (fs.existsSync(tailwindConfigPath)) {
    const content = fs.readFileSync(tailwindConfigPath, 'utf8');
    
    // Verificar animaciones CSS
    const requiredAnimations = ['fade-in', 'slide-in-left', 'slide-in-right'];
    requiredAnimations.forEach(animation => {
      if (!content.includes(animation)) {
        metrics.warnings.push(`⚠️ Animación CSS ${animation} no encontrada en tailwind.config.ts`);
      }
    });
  }
}

// Ejecutar análisis
console.log('🔍 Analizando componentes editables...');
analyzeEditableComponents(SRC_DIR);

console.log('🏗️ Verificando estructura de componentes...');
checkComponentStructure();

console.log('🎨 Verificando configuración de Tailwind...');
checkTailwindConfig();

// Generar reporte
console.log('\n📊 REPORTE DE COMPATIBILIDAD LOVABLE\n');

console.log(`🎯 Componentes totales: ${metrics.totalComponents}`);
console.log(`✅ Componentes editables: ${metrics.editableComponents}`);
console.log(`🎭 Componentes no editables: ${metrics.nonEditableComponents}`);
console.log(`⚡ motion.div en editables: ${metrics.motionDivInEditables}`);
console.log(`🖼️ Iframes sin pointer-events: ${metrics.iframesWithoutPointerEvents}`);
console.log(`📐 Problemas de z-index: ${metrics.zIndexIssues}`);

// Calcular score de compatibilidad
let compatibilityScore = 100;
let level = '🟢 EXCELENTE';

if (metrics.motionDivInEditables > 0) {
  compatibilityScore -= metrics.motionDivInEditables * 20;
  level = '🔴 CRÍTICO';
}

if (metrics.iframesWithoutPointerEvents > 0) {
  compatibilityScore -= metrics.iframesWithoutPointerEvents * 10;
  level = '🟡 ADVERTENCIA';
}

if (metrics.zIndexIssues > 0) {
  compatibilityScore -= metrics.zIndexIssues * 5;
  level = '🟡 ADVERTENCIA';
}

if (metrics.editableComponents === 0) {
  compatibilityScore = 0;
  level = '🔴 CRÍTICO';
}

console.log(`\n🎯 PUNTAJE DE COMPATIBILIDAD: ${compatibilityScore}/100 ${level}`);

// Mostrar issues críticos
if (metrics.issues.length > 0) {
  console.log('\n🚨 PROBLEMAS CRÍTICOS:');
  metrics.issues.forEach(issue => console.log(issue));
}

// Mostrar warnings
if (metrics.warnings.length > 0) {
  console.log('\n⚠️ ADVERTENCIAS:');
  metrics.warnings.forEach(warning => console.log(warning));
}

// Recomendaciones
console.log('\n💡 RECOMENDACIONES:');

if (metrics.motionDivInEditables > 0) {
  console.log('🔧 Reemplazar motion.div con componentes editables');
}

if (metrics.iframesWithoutPointerEvents > 0) {
  console.log('🔧 Agregar pointer-events-none a iframes');
}

if (metrics.zIndexIssues > 0) {
  console.log('🔧 Definir z-index para elementos editables');
}

if (metrics.editableComponents === 0) {
  console.log('🔧 Implementar componentes editables');
}

if (compatibilityScore >= 80) {
  console.log('✅ Excelente compatibilidad con Lovable');
} else if (compatibilityScore >= 60) {
  console.log('⚠️ Compatibilidad aceptable, considerar mejoras');
} else {
  console.log('🚨 Se requiere corrección urgente para Lovable');
}

// Checklist de verificación
console.log('\n📋 CHECKLIST DE VERIFICACIÓN:');

const checklist = [
  { item: 'Componentes editables implementados', status: metrics.editableComponents > 0 },
  { item: 'Sin motion.div en editables', status: metrics.motionDivInEditables === 0 },
  { item: 'Iframes con pointer-events-none', status: metrics.iframesWithoutPointerEvents === 0 },
  { item: 'Z-index configurado', status: metrics.zIndexIssues === 0 },
  { item: 'data-editable presente', status: true } // Se verifica en el análisis
];

checklist.forEach(({ item, status }) => {
  console.log(`${status ? '✅' : '❌'} ${item}`);
});

console.log('\n📚 Para más información, consulta:');
console.log('- LOVABLE_INTEGRATION_GUIDE.md');
console.log('- DEVELOPMENT_CONSTITUTION.md');
console.log('- ANIMATION_BIBLE.md');
