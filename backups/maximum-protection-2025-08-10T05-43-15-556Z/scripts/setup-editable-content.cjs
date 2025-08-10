#!/usr/bin/env node

/**
 * Script para configurar la tabla editable_content en Supabase
 * Ejecuta el SQL necesario para el sistema de edición inline
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Configurando tabla editable_content para el sistema de edición inline...\n');

// Leer el archivo SQL
const sqlFilePath = path.join(__dirname, '..', 'supabase-editable-content-setup.sql');

if (!fs.existsSync(sqlFilePath)) {
  console.error('❌ Error: No se encontró el archivo supabase-editable-content-setup.sql');
  console.log('📁 Buscando en:', sqlFilePath);
  process.exit(1);
}

try {
  const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
  
  console.log('✅ Archivo SQL encontrado');
  console.log('📊 Contenido del archivo:');
  console.log('─'.repeat(80));
  console.log(sqlContent);
  console.log('─'.repeat(80));
  
  console.log('\n📋 INSTRUCCIONES PARA CONFIGURAR SUPABASE:');
  console.log('1. Ve a tu dashboard de Supabase');
  console.log('2. Navega a SQL Editor');
  console.log('3. Crea una nueva consulta');
  console.log('4. Copia y pega el contenido del archivo supabase-editable-content-setup.sql');
  console.log('5. Ejecuta la consulta');
  
  console.log('\n📁 Archivo SQL ubicado en:');
  console.log(`   ${sqlFilePath}`);
  
  console.log('\n🔍 VERIFICACIÓN POST-CONFIGURACIÓN:');
  console.log('Después de ejecutar el SQL, puedes verificar que todo esté funcionando con:');
  console.log('   node scripts/check-table-structure.cjs');
  
  console.log('\n🎯 FUNCIONALIDADES QUE SE CONFIGURAN:');
  console.log('✅ Tabla editable_content con RLS habilitado');
  console.log('✅ Políticas de seguridad para usuarios admin');
  console.log('✅ Índices para mejor rendimiento');
  console.log('✅ Trigger para actualizar automáticamente updated_at');
  console.log('✅ Contenido de ejemplo para las páginas principales');
  
  console.log('\n🚀 PRÓXIMOS PASOS:');
  console.log('1. Ejecuta el SQL en Supabase');
  console.log('2. Verifica la configuración con el script de verificación');
  console.log('3. Prueba el sistema de edición inline en el sitio web');
  
  console.log('\n✅ Configuración lista para implementar');
  
} catch (error) {
  console.error('❌ Error leyendo el archivo SQL:', error.message);
  process.exit(1);
}
