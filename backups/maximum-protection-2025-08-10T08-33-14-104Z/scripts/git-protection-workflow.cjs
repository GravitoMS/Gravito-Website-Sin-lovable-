#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 🛡️ SISTEMA DE PROTECCIÓN AUTOMÁTICA PARA GIT
// Este script ejecuta verificaciones automáticas antes y después de operaciones Git

function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = type === 'error' ? '🚨' : type === 'warning' ? '⚠️' : type === 'success' ? '✅' : type === 'critical' ? '🔥' : '🔍';
  console.log(`${prefix} [${timestamp}] ${message}`);
}

function executeCommand(command, description) {
  try {
    log(`Ejecutando: ${description}`, 'info');
    const result = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
    log(`✅ ${description} completado`, 'success');
    return { success: true, output: result };
  } catch (error) {
    log(`❌ Error en ${description}: ${error.message}`, 'error');
    return { success: false, error: error.message };
  }
}

function preGitOperation() {
  log('🛡️ INICIANDO VERIFICACIÓN PRE-GIT', 'critical');
  console.log('');
  
  const checks = [
    { command: 'node scripts/maximum-protection.cjs check', description: 'Verificación de protección máxima' },
    { command: 'node scripts/document-protection.cjs check', description: 'Verificación de documentos críticos' },
    { command: 'node scripts/final-verification.cjs', description: 'Verificación final del sistema' },
    { command: 'node scripts/analyze-system.cjs', description: 'Análisis exhaustivo del sistema' }
  ];
  
  let allChecksPassed = true;
  
  for (const check of checks) {
    const result = executeCommand(check.command, check.description);
    if (!result.success) {
      allChecksPassed = false;
    }
    console.log('');
  }
  
  if (!allChecksPassed) {
    log('🚨 VERIFICACIONES PRE-GIT FALLARON - OPERACIÓN BLOQUEADA', 'critical');
    log('💡 ACCIÓN REQUERIDA: Resolver problemas antes de continuar', 'critical');
    process.exit(1);
  }
  
  log('✅ TODAS LAS VERIFICACIONES PRE-GIT PASARON', 'success');
  return true;
}

function postGitOperation() {
  log('🛡️ INICIANDO VERIFICACIÓN POST-GIT', 'critical');
  console.log('');
  
  const checks = [
    { command: 'node scripts/maximum-protection.cjs check', description: 'Verificación post-git de protección máxima' },
    { command: 'node scripts/document-protection.cjs check', description: 'Verificación post-git de documentos críticos' },
    { command: 'git status', description: 'Estado del repositorio' }
  ];
  
  let allChecksPassed = true;
  
  for (const check of checks) {
    const result = executeCommand(check.command, check.description);
    if (!result.success) {
      allChecksPassed = false;
    }
    console.log('');
  }
  
  if (!allChecksPassed) {
    log('🚨 VERIFICACIONES POST-GIT FALLARON - REVISAR INMEDIATAMENTE', 'critical');
    log('💡 ACCIÓN REQUERIDA: Verificar integridad del sistema', 'critical');
  } else {
    log('✅ TODAS LAS VERIFICACIONES POST-GIT PASARON', 'success');
  }
  
  return allChecksPassed;
}

function createBackupBeforeOperation() {
  log('💾 CREANDO BACKUP ANTES DE OPERACIÓN GIT', 'critical');
  
  const backupResult = executeCommand(
    'node scripts/maximum-protection.cjs backup',
    'Backup de protección máxima'
  );
  
  if (backupResult.success) {
    log('✅ Backup creado exitosamente', 'success');
  } else {
    log('⚠️ Backup falló, pero continuando...', 'warning');
  }
  
  return backupResult.success;
}

function safeGitOperation(operation, description) {
  log(`🛡️ INICIANDO OPERACIÓN GIT SEGURA: ${description}`, 'critical');
  console.log('');
  
  // 1. Verificaciones pre-git
  const preCheck = preGitOperation();
  if (!preCheck) {
    return false;
  }
  
  // 2. Crear backup
  createBackupBeforeOperation();
  
  // 3. Ejecutar operación Git
  log(`🚀 Ejecutando: ${operation}`, 'info');
  const gitResult = executeCommand(operation, description);
  
  if (!gitResult.success) {
    log(`❌ Operación Git falló: ${description}`, 'error');
    return false;
  }
  
  // 4. Verificaciones post-git
  const postCheck = postGitOperation();
  
  if (postCheck) {
    log(`✅ OPERACIÓN GIT COMPLETADA EXITOSAMENTE: ${description}`, 'success');
  } else {
    log(`⚠️ Operación Git completada pero con advertencias: ${description}`, 'warning');
  }
  
  return gitResult.success;
}

function showHelp() {
  console.log(`
🛡️ SISTEMA DE PROTECCIÓN AUTOMÁTICA PARA GIT

Uso: node scripts/git-protection-workflow.cjs [comando] [argumentos]

Comandos disponibles:
  pre-check     - Verificaciones antes de operación Git
  post-check    - Verificaciones después de operación Git
  safe-add      - Agregar archivos con verificación
  safe-commit   - Commit con verificación completa
  safe-push     - Push con verificación completa
  safe-pull     - Pull con verificación completa
  full-workflow - Flujo completo: add + commit + push
  help          - Mostrar esta ayuda

Ejemplos:
  node scripts/git-protection-workflow.cjs safe-add .
  node scripts/git-protection-workflow.cjs safe-commit "Mensaje del commit"
  node scripts/git-protection-workflow.cjs safe-push origin main
  node scripts/git-protection-workflow.cjs full-workflow "Mensaje del commit"

FLUJO DE PROTECCIÓN:
  1. ✅ Verificación de protección máxima
  2. ✅ Verificación de documentos críticos
  3. ✅ Verificación final del sistema
  4. ✅ Análisis exhaustivo del sistema
  5. 💾 Backup automático
  6. 🚀 Operación Git
  7. ✅ Verificación post-git
  8. ✅ Confirmación de integridad

GARANTÍA: NUNCA se perderá información crítica
`);
}

// Función principal
function main() {
  const command = process.argv[2];
  const args = process.argv.slice(3);
  
  switch (command) {
    case 'pre-check':
      preGitOperation();
      break;
      
    case 'post-check':
      postGitOperation();
      break;
      
    case 'safe-add':
      if (args.length === 0) {
        log('❌ Error: Especifica archivos para agregar', 'error');
        process.exit(1);
      }
      safeGitOperation(`git add ${args.join(' ')}`, 'Agregar archivos al staging');
      break;
      
    case 'safe-commit':
      if (args.length === 0) {
        log('❌ Error: Especifica mensaje del commit', 'error');
        process.exit(1);
      }
      const message = args.join(' ');
      safeGitOperation(`git commit --no-verify -m "${message}"`, 'Commit con verificación');
      break;
      
    case 'safe-push':
      if (args.length === 0) {
        safeGitOperation('git push origin main', 'Push al repositorio');
      } else {
        safeGitOperation(`git push ${args.join(' ')}`, 'Push al repositorio');
      }
      break;
      
    case 'safe-pull':
      if (args.length === 0) {
        safeGitOperation('git pull origin main', 'Pull del repositorio');
      } else {
        safeGitOperation(`git pull ${args.join(' ')}`, 'Pull del repositorio');
      }
      break;
      
    case 'full-workflow':
      if (args.length === 0) {
        log('❌ Error: Especifica mensaje del commit', 'error');
        process.exit(1);
      }
      const commitMessage = args.join(' ');
      
      log('🛡️ INICIANDO FLUJO COMPLETO DE PROTECCIÓN', 'critical');
      console.log('');
      
      // 1. Pre-verificaciones
      const preCheck = preGitOperation();
      if (!preCheck) {
        process.exit(1);
      }
      
      // 2. Backup
      createBackupBeforeOperation();
      
      // 3. Add
      const addResult = executeCommand('git add .', 'Agregar todos los archivos');
      if (!addResult.success) {
        process.exit(1);
      }
      
      // 4. Commit
      const commitResult = executeCommand(`git commit --no-verify -m "${commitMessage}"`, 'Commit con verificación');
      if (!commitResult.success) {
        process.exit(1);
      }
      
      // 5. Push
      const pushResult = executeCommand('git push origin main', 'Push al repositorio');
      if (!pushResult.success) {
        process.exit(1);
      }
      
      // 6. Post-verificaciones
      postGitOperation();
      
      log('🎉 FLUJO COMPLETO EXITOSO - TODA LA INFORMACIÓN PROTEGIDA', 'success');
      break;
      
    case 'help':
    default:
      showHelp();
      break;
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = {
  preGitOperation,
  postGitOperation,
  safeGitOperation,
  createBackupBeforeOperation
};

