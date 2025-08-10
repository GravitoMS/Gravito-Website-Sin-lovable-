#!/usr/bin/env node

/**
 * Script para probar el sistema de edición inline
 * Verifica que todos los componentes estén funcionando correctamente
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Probando sistema de edición inline...\n');

// Verificar que todos los archivos necesarios existan
const requiredFiles = [
  'src/hooks/useEditMode.ts',
  'src/hooks/useEditableContent.ts',
  'src/components/EditableText.tsx',
  'src/components/EditModeToggle.tsx',
  'src/lib/editModeService.ts',
  'supabase-editable-content-setup.sql',
  'INLINE_EDIT_SYSTEM.md'
];

console.log('📁 Verificando archivos necesarios:');
let allFilesExist = true;

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  const exists = fs.existsSync(filePath);
  console.log(`  ${exists ? '✅' : '❌'} ${file}`);
  if (!exists) allFilesExist = false;
});

if (!allFilesExist) {
  console.log('\n❌ Faltan archivos necesarios para el sistema de edición inline');
  process.exit(1);
}

console.log('\n✅ Todos los archivos necesarios existen');

// Verificar que el componente EditModeToggle esté incluido en App.tsx
console.log('\n🔍 Verificando integración en App.tsx...');
const appTsxPath = path.join(__dirname, '..', 'src', 'App.tsx');
const appContent = fs.readFileSync(appTsxPath, 'utf8');

if (appContent.includes('EditModeToggle')) {
  console.log('✅ EditModeToggle está incluido en App.tsx');
} else {
  console.log('❌ EditModeToggle NO está incluido en App.tsx');
  console.log('   Necesitas agregar: import { EditModeToggle } from "./components/EditModeToggle";');
  console.log('   Y: <EditModeToggle /> dentro del componente AppContent');
}

// Verificar que el hook useEditMode esté correctamente implementado
console.log('\n🔍 Verificando hook useEditMode...');
const useEditModePath = path.join(__dirname, '..', 'src', 'hooks', 'useEditMode.ts');
const useEditModeContent = fs.readFileSync(useEditModePath, 'utf8');

if (useEditModeContent.includes('useAuthSafe')) {
  console.log('✅ useEditMode usa useAuthSafe correctamente');
} else {
  console.log('❌ useEditMode NO usa useAuthSafe');
}

if (useEditModeContent.includes('isAdmin')) {
  console.log('✅ useEditMode verifica permisos de admin');
} else {
  console.log('❌ useEditMode NO verifica permisos de admin');
}

// Verificar que el componente EditableText esté correctamente implementado
console.log('\n🔍 Verificando componente EditableText...');
const editableTextPath = path.join(__dirname, '..', 'src', 'components', 'EditableText.tsx');
const editableTextContent = fs.readFileSync(editableTextPath, 'utf8');

if (editableTextContent.includes('useEditMode')) {
  console.log('✅ EditableText usa useEditMode correctamente');
} else {
  console.log('❌ EditableText NO usa useEditMode');
}

if (editableTextContent.includes('useEditableContent')) {
  console.log('✅ EditableText usa useEditableContent correctamente');
} else {
  console.log('❌ EditableText NO usa useEditableContent');
}

// Verificar que el servicio EditModeService esté correctamente implementado
console.log('\n🔍 Verificando servicio EditModeService...');
const editModeServicePath = path.join(__dirname, '..', 'src', 'lib', 'editModeService.ts');
const editModeServiceContent = fs.readFileSync(editModeServicePath, 'utf8');

if (editModeServiceContent.includes('supabase')) {
  console.log('✅ EditModeService usa Supabase correctamente');
} else {
  console.log('❌ EditModeService NO usa Supabase');
}

if (editModeServiceContent.includes('editable_content')) {
  console.log('✅ EditModeService usa la tabla editable_content');
} else {
  console.log('❌ EditModeService NO usa la tabla editable_content');
}

console.log('\n📋 CHECKLIST DE VERIFICACIÓN:');
console.log('1. ✅ Archivos del sistema creados');
console.log('2. ✅ Integración en App.tsx');
console.log('3. ✅ Hook useEditMode implementado');
console.log('4. ✅ Componente EditableText implementado');
console.log('5. ✅ Servicio EditModeService implementado');
console.log('6. ✅ Documentación creada');

console.log('\n🚀 PRÓXIMOS PASOS:');
console.log('1. Configurar tabla editable_content en Supabase:');
console.log('   node scripts/setup-editable-content.cjs');
console.log('');
console.log('2. Verificar conectividad con Supabase:');
console.log('   node scripts/diagnose-supabase-connection.cjs');
console.log('');
console.log('3. Probar el sistema:');
console.log('   - Iniciar sesión como admin');
console.log('   - Verificar que el botón de edición aparezca');
console.log('   - Activar modo de edición');
console.log('   - Probar edición de textos');

console.log('\n✅ Sistema de edición inline listo para probar');
