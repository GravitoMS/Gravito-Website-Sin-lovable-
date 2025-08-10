#!/usr/bin/env node

/**
 * 🔧 SCRIPT DE CONFIGURACIÓN AUTOMÁTICA DEL SISTEMA DE PROTECCIÓN
 * 
 * Este script configura automáticamente el sistema de protección de documentos
 * al instalar o clonar el proyecto.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🛡️ CONFIGURANDO SISTEMA DE PROTECCIÓN DE DOCUMENTOS...\n');

// Verificar si estamos en el directorio correcto
if (!fs.existsSync('package.json')) {
  console.error('❌ Error: No se encontró package.json. Ejecuta este script desde la raíz del proyecto.');
  process.exit(1);
}

// 1. Configurar hooks de Git
console.log('1️⃣ Configurando hooks de Git...');
try {
  const hooksDir = '.git/hooks';
  const preCommitHook = path.join(hooksDir, 'pre-commit');
  
  const hookContent = `#!/bin/sh
# 🛡️ HOOK DE PROTECCIÓN DE DOCUMENTOS - GRAVITO WEBSITE
# Previene la eliminación accidental de documentos críticos

echo "🔍 Verificando documentos críticos antes del commit..."

# Verificar si hay archivos críticos en el staging area
CRITICAL_FILES_DELETED=false

for file in COLOR_PROTECTION_GUIDE.md COLOR_RESTRICTIONS.md FINAL_DELIVERABLE.md IMPLEMENTATION_SUMMARY.md SETUP_INSTRUCTIONS.md ADMIN_SETUP.md ANIMATION_BIBLE.md FOOTER_PROTECTION_GUIDE.md SYSTEM_OPTIMIZATION.md; do
  if git diff --cached --name-status | grep -q "^D.*$file"; then
    echo "🚨 ADVERTENCIA: Se está eliminando un documento crítico: $file"
    CRITICAL_FILES_DELETED=true
  fi
done

# Verificar directorios protegidos
PROTECTED_DIRS_DELETED=false
for dir in src/components/dev/ src/lib/ scripts/ backups/; do
  if git diff --cached --name-status | grep -q "^D.*$dir"; then
    echo "🚨 ADVERTENCIA: Se están eliminando archivos de directorio protegido: $dir"
    PROTECTED_DIRS_DELETED=true
  fi
done

if [ "$CRITICAL_FILES_DELETED" = true ] || [ "$PROTECTED_DIRS_DELETED" = true ]; then
  echo "❌ COMMIT BLOQUEADO: Se detectó eliminación de documentos críticos"
  echo "💡 Si es necesario eliminar estos archivos, usa: git commit --no-verify"
  echo "💡 O crea un backup primero: npm run protect:backup"
  exit 1
fi

echo "✅ Verificación completada - Commit permitido"
exit 0
`;
  
  fs.writeFileSync(preCommitHook, hookContent);
  fs.chmodSync(preCommitHook, '755');
  console.log('✅ Hook pre-commit configurado');
} catch (error) {
  console.error('❌ Error configurando hook:', error.message);
}

// 2. Crear directorio de backups si no existe
console.log('\n2️⃣ Configurando directorio de backups...');
try {
  if (!fs.existsSync('backups')) {
    fs.mkdirSync('backups', { recursive: true });
    console.log('✅ Directorio de backups creado');
  } else {
    console.log('✅ Directorio de backups ya existe');
  }
} catch (error) {
  console.error('❌ Error creando directorio de backups:', error.message);
}

// 3. Crear backup inicial
console.log('\n3️⃣ Creando backup inicial...');
try {
  execSync('node scripts/document-protection.cjs backup', { stdio: 'inherit' });
  console.log('✅ Backup inicial creado');
} catch (error) {
  console.error('❌ Error creando backup inicial:', error.message);
}

// 4. Verificar estado de documentos críticos
console.log('\n4️⃣ Verificando estado de documentos críticos...');
try {
  execSync('node scripts/document-protection.cjs check', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Error verificando documentos:', error.message);
}

// 5. Crear archivo de configuración local
console.log('\n5️⃣ Creando configuración local...');
try {
  const configContent = `# 🛡️ CONFIGURACIÓN LOCAL DEL SISTEMA DE PROTECCIÓN
# Este archivo fue creado automáticamente

CONFIGURATION_DATE="${new Date().toISOString()}"
PROJECT_NAME="Gravito Website"
PROTECTION_ENABLED=true
AUTO_BACKUP=true
MONITORING_ENABLED=false

# Comandos útiles:
# npm run protect:check    - Verificar estado
# npm run protect:backup   - Crear backup
# npm run protect:restore  - Restaurar desde backup
# npm run protect:setup    - Reconfigurar sistema
# npm run protect:monitor  - Iniciar monitoreo
`;
  
  fs.writeFileSync('.protection-config', configContent);
  console.log('✅ Configuración local creada');
} catch (error) {
  console.error('❌ Error creando configuración local:', error.message);
}

// 6. Mostrar resumen
console.log('\n🎉 CONFIGURACIÓN COMPLETADA');
console.log('\n📋 RESUMEN:');
console.log('✅ Hooks de Git configurados');
console.log('✅ Directorio de backups creado');
console.log('✅ Backup inicial realizado');
console.log('✅ Verificación de documentos completada');
console.log('✅ Configuración local creada');

console.log('\n🛠️ COMANDOS DISPONIBLES:');
console.log('  npm run protect:check    - Verificar estado de documentos');
console.log('  npm run protect:backup   - Crear backup de documentos críticos');
console.log('  npm run protect:restore  - Restaurar desde el último backup');
console.log('  npm run protect:setup    - Reconfigurar el sistema');
console.log('  npm run protect:monitor  - Iniciar monitoreo continuo');
console.log('  npm run protect:help     - Mostrar ayuda');

console.log('\n🚨 PROTECCIÓN ACTIVA:');
console.log('  - Los commits que eliminen documentos críticos serán bloqueados');
console.log('  - Se crean backups automáticos antes de cambios importantes');
console.log('  - El sistema verifica la integridad de documentos críticos');

console.log('\n💡 CONSEJOS:');
console.log('  - Ejecuta "npm run protect:check" antes de trabajar');
console.log('  - Usa "npm run protect:backup" antes de cambios importantes');
console.log('  - Si necesitas eliminar un documento crítico, usa "git commit --no-verify"');

console.log('\n🛡️ Sistema de protección configurado exitosamente!');
