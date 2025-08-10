#!/usr/bin/env node

/**
 * GESTOR DE DOCUMENTACIÓN CENTRALIZADA - GRAVITO WEBSITE
 * Maneja toda la documentación del proyecto en formato JSON
 */

const fs = require('fs');
const path = require('path');

// Configuración
const DOC_FILE = path.join(process.cwd(), 'project-documentation.json');

// Colores para output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function loadDocumentation() {
  try {
    const content = fs.readFileSync(DOC_FILE, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    log('❌ Error cargando documentación:', 'red');
    log(error.message, 'red');
    process.exit(1);
  }
}

function saveDocumentation(doc) {
  try {
    fs.writeFileSync(DOC_FILE, JSON.stringify(doc, null, 2));
    log('✅ Documentación guardada exitosamente', 'green');
  } catch (error) {
    log('❌ Error guardando documentación:', 'red');
    log(error.message, 'red');
    process.exit(1);
  }
}

function showSection(doc, section) {
  log(`\n📋 ${section.toUpperCase()}:`, 'bold');
  log('=' .repeat(50), 'blue');
  
  const data = doc[section];
  if (!data) {
    log(`❌ Sección '${section}' no encontrada`, 'red');
    return;
  }
  
  console.log(JSON.stringify(data, null, 2));
}

function searchDocumentation(doc, query) {
  log(`\n🔍 Buscando: "${query}"`, 'bold');
  log('=' .repeat(50), 'blue');
  
  const results = [];
  
  function searchInObject(obj, path = '') {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = path ? `${path}.${key}` : key;
      
      if (typeof value === 'string' && value.toLowerCase().includes(query.toLowerCase())) {
        results.push({ path: currentPath, value });
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (typeof item === 'string' && item.toLowerCase().includes(query.toLowerCase())) {
            results.push({ path: `${currentPath}[${index}]`, value: item });
          }
        });
      } else if (typeof value === 'object' && value !== null) {
        searchInObject(value, currentPath);
      }
    }
  }
  
  searchInObject(doc);
  
  if (results.length === 0) {
    log('❌ No se encontraron resultados', 'yellow');
    return;
  }
  
  results.forEach((result, index) => {
    log(`${index + 1}. ${result.path}:`, 'cyan');
    log(`   ${result.value}`, 'reset');
  });
}

function updateSection(doc, section, updates) {
  if (!doc[section]) {
    log(`❌ Sección '${section}' no existe`, 'red');
    return doc;
  }
  
  doc[section] = { ...doc[section], ...updates };
  log(`✅ Sección '${section}' actualizada`, 'green');
  return doc;
}

function addEntry(doc, section, key, value) {
  if (!doc[section]) {
    doc[section] = {};
  }
  
  if (Array.isArray(doc[section])) {
    doc[section].push(value);
  } else {
    doc[section][key] = value;
  }
  
  log(`✅ Entrada agregada a '${section}'`, 'green');
  return doc;
}

function validateDocumentation(doc) {
  log('\n🔍 Validando documentación...', 'blue');
  
  const requiredSections = [
    'project', 'technologies', 'development_rules', 
    'communication_protocol', 'file_structure'
  ];
  
  const missing = requiredSections.filter(section => !doc[section]);
  
  if (missing.length > 0) {
    log('❌ Secciones faltantes:', 'red');
    missing.forEach(section => log(`  - ${section}`, 'red'));
    return false;
  }
  
  log('✅ Documentación válida', 'green');
  return true;
}

function showHelp() {
  log('\n📚 GESTOR DE DOCUMENTACIÓN - GRAVITO WEBSITE', 'bold');
  log('=' .repeat(60), 'blue');
  
  log('\n📖 Comandos disponibles:', 'cyan');
  log('  show <section>     - Mostrar una sección específica');
  log('  search <query>     - Buscar en toda la documentación');
  log('  update <section>   - Actualizar una sección');
  log('  add <section>      - Agregar entrada a una sección');
  log('  validate           - Validar estructura de documentación');
  log('  help               - Mostrar esta ayuda');
  
  log('\n📋 Secciones disponibles:', 'cyan');
  log('  project            - Información del proyecto');
  log('  technologies       - Stack tecnológico');
  log('  development_rules  - Reglas de desarrollo');
  log('  communication_protocol - Protocolo de comunicación');
  log('  file_structure     - Estructura de archivos');
  log('  scripts            - Scripts disponibles');
  log('  visual_edits       - Configuración de Visual Edits');
  log('  deployment         - Configuración de deployment');
  log('  color_system       - Sistema de colores');
  log('  animation_system   - Sistema de animaciones');
  log('  troubleshooting    - Solución de problemas');
  log('  maintenance        - Mantenimiento');
  log('  contact            - Enlaces de contacto');
  
  log('\n💡 Ejemplos:', 'yellow');
  log('  node scripts/documentation-manager.cjs show project');
  log('  node scripts/documentation-manager.cjs search "visual edits"');
  log('  node scripts/documentation-manager.cjs validate');
}

function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (!command || command === 'help') {
    showHelp();
    return;
  }
  
  const doc = loadDocumentation();
  
  switch (command) {
    case 'show':
      const section = args[1];
      if (!section) {
        log('❌ Especifica una sección: show <section>', 'red');
        return;
      }
      showSection(doc, section);
      break;
      
    case 'search':
      const query = args[1];
      if (!query) {
        log('❌ Especifica una búsqueda: search <query>', 'red');
        return;
      }
      searchDocumentation(doc, query);
      break;
      
    case 'update':
      const updateSection = args[1];
      if (!updateSection) {
        log('❌ Especifica una sección: update <section>', 'red');
        return;
      }
      // Para actualizaciones complejas, se puede implementar un editor interactivo
      log('⚠️  Función de actualización en desarrollo', 'yellow');
      break;
      
    case 'add':
      const addSection = args[1];
      if (!addSection) {
        log('❌ Especifica una sección: add <section>', 'red');
        return;
      }
      // Para agregar entradas, se puede implementar un editor interactivo
      log('⚠️  Función de agregar en desarrollo', 'yellow');
      break;
      
    case 'validate':
      if (validateDocumentation(doc)) {
        log('\n✅ La documentación está completa y válida', 'green');
      } else {
        log('\n❌ La documentación tiene problemas', 'red');
        process.exit(1);
      }
      break;
      
    default:
      log(`❌ Comando desconocido: ${command}`, 'red');
      showHelp();
      process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { 
  loadDocumentation, 
  saveDocumentation, 
  showSection, 
  searchDocumentation,
  validateDocumentation 
};
