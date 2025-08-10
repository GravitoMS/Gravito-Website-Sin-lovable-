#!/usr/bin/env node

// 🚀 SCRIPT DE COMMIT RÁPIDO Y SEGURO
// Uso: node scripts/quick-commit.cjs "Mensaje del commit"

const { execSync } = require('child_process');

function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = type === 'error' ? '🚨' : type === 'warning' ? '⚠️' : type === 'success' ? '✅' : '🚀';
  console.log(`${prefix} [${timestamp}] ${message}`);
}

function main() {
  const message = process.argv[2];
  
  if (!message) {
    console.log(`
🚀 SCRIPT DE COMMIT RÁPIDO Y SEGURO

Uso: node scripts/quick-commit.cjs "Mensaje del commit"

Ejemplos:
  node scripts/quick-commit.cjs "Agregada nueva funcionalidad"
  node scripts/quick-commit.cjs "Corregido bug en login"
  node scripts/quick-commit.cjs "Actualizada documentación"

Este script ejecuta automáticamente:
✅ Verificación de protección máxima
✅ Verificación de documentos críticos
✅ Verificación final del sistema
✅ Análisis exhaustivo
💾 Backup automático
🚀 Add + Commit + Push
✅ Verificación post-git
✅ Confirmación de integridad

GARANTÍA: NUNCA se perderá información crítica
`);
    process.exit(1);
  }
  
  log('🚀 INICIANDO COMMIT RÁPIDO Y SEGURO', 'info');
  console.log('');
  
  try {
    // Ejecutar el flujo completo de protección
    execSync(`node scripts/git-protection-workflow.cjs full-workflow "${message}"`, { 
      stdio: 'inherit',
      encoding: 'utf8'
    });
    
    log('🎉 COMMIT RÁPIDO COMPLETADO EXITOSAMENTE', 'success');
    log('🛡️ TODA LA INFORMACIÓN ESTÁ PROTEGIDA', 'success');
    
  } catch (error) {
    log('❌ ERROR EN COMMIT RÁPIDO', 'error');
    log('💡 Verifica los errores arriba y resuelve antes de continuar', 'warning');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

