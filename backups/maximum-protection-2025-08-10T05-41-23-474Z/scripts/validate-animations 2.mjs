#!/usr/bin/env node

/**
 * Script de validación para el sistema centralizado de Gravito
 * Detecta violaciones de las reglas del sistema centralizado
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración
const SRC_DIR = path.join(__dirname, '..', 'src');
const EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];

// Reglas de validación
const VALIDATION_RULES = {
  CRITICAL: {
    'Direct motion.div usage': /motion\.div/g,
    'Direct framer-motion import': /import.*framer-motion.*from/g,
    'Hardcoded hex colors': /#[0-9a-fA-F]{3,6}/g,
    'Hardcoded RGB colors': /rgb\([^)]+\)/g,
    'Hardcoded green #19a476': /#19a476/g,
    'Hardcoded orange #ca7134': /#ca7134/g
  },
  HIGH: {
    'bg-black usage': /bg-black/g,
    'bg-white usage': /bg-white/g,
    'text-black usage': /text-black/g,
    'text-white usage': /text-white/g,
    'Hardcoded durations': /duration-[0-9]+/g,
    'Hardcoded delays': /delay-[0-9]+/g
  },
  MEDIUM: {
    'Hardcoded spacing': /p-[0-9]+|m-[0-9]+|gap-[0-9]+/g,
    'Hardcoded border radius': /rounded-[0-9]+/g,
    'Hardcoded shadows': /shadow-[a-z]+/g
  }
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

function validateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const violations = {
    CRITICAL: [],
    HIGH: [],
    MEDIUM: []
  };
  
  // Validar cada regla
  for (const [severity, rules] of Object.entries(VALIDATION_RULES)) {
    for (const [ruleName, pattern] of Object.entries(rules)) {
      const matches = content.match(pattern);
      if (matches) {
        violations[severity].push({
          rule: ruleName,
          count: matches.length,
          examples: matches.slice(0, 3) // Solo mostrar los primeros 3 ejemplos
        });
      }
    }
  }
  
  return violations;
}

function main() {
  console.log('🔍 VALIDANDO SISTEMA CENTRALIZADO DE GRAVITO');
  console.log('=' .repeat(60));
  
  try {
    const files = findFiles(SRC_DIR, EXTENSIONS);
    console.log(`📁 Analizando ${files.length} archivos...\n`);
    
    let totalViolations = {
      CRITICAL: 0,
      HIGH: 0,
      MEDIUM: 0
    };
    
    const fileViolations = [];
    
    for (const file of files) {
      const violations = validateFile(file);
      const hasViolations = Object.values(violations).some(v => v.length > 0);
      
      if (hasViolations) {
        const relativePath = path.relative(process.cwd(), file);
        fileViolations.push({ file: relativePath, violations });
        
        // Contar totales
        for (const severity of Object.keys(violations)) {
          totalViolations[severity] += violations[severity].length;
        }
        
        // Mostrar violaciones del archivo
        console.log(`📄 ${relativePath}`);
        for (const [severity, rules] of Object.entries(violations)) {
          if (rules.length > 0) {
            console.log(`  ${severity === 'CRITICAL' ? '🔴' : severity === 'HIGH' ? '🟡' : '🟠'} ${severity}:`);
            for (const rule of rules) {
              console.log(`    - ${rule.rule}: ${rule.count} ocurrencias`);
              if (rule.examples.length > 0) {
                console.log(`      Ejemplos: ${rule.examples.join(', ')}`);
              }
            }
          }
        }
        console.log('');
      }
    }
    
    // Resumen final
    console.log('=' .repeat(60));
    console.log('📊 RESUMEN DE VALIDACIÓN');
    console.log('=' .repeat(60));
    
    if (totalViolations.CRITICAL > 0) {
      console.log(`🔴 CRÍTICAS: ${totalViolations.CRITICAL} violaciones`);
    }
    if (totalViolations.HIGH > 0) {
      console.log(`🟡 ALTAS: ${totalViolations.HIGH} violaciones`);
    }
    if (totalViolations.MEDIUM > 0) {
      console.log(`🟠 MEDIAS: ${totalViolations.MEDIUM} violaciones`);
    }
    
    const total = Object.values(totalViolations).reduce((sum, count) => sum + count, 0);
    
    if (total === 0) {
      console.log('\n🎉 ¡PERFECTO! No se encontraron violaciones del sistema centralizado');
      console.log('✅ El código cumple completamente con la BIBLIA de animaciones');
    } else {
      console.log(`\n⚠️  Total de violaciones: ${total}`);
      console.log('\n📋 ACCIONES REQUERIDAS:');
      
      if (totalViolations.CRITICAL > 0) {
        console.log('🔴 CRÍTICAS: Deben corregirse INMEDIATAMENTE');
        console.log('   - Eliminar motion.div directo');
        console.log('   - Eliminar imports directos de framer-motion');
        console.log('   - Reemplazar colores hardcodeados');
      }
      
      if (totalViolations.HIGH > 0) {
        console.log('🟡 ALTAS: Corregir en la próxima iteración');
        console.log('   - Usar variables del sistema de diseño');
        console.log('   - Usar constantes de animación');
      }
      
      if (totalViolations.MEDIUM > 0) {
        console.log('🟠 MEDIAS: Considerar para futuras mejoras');
        console.log('   - Usar tokens del sistema de diseño');
      }
      
      console.log('\n💡 Para corregir automáticamente, ejecutar:');
      console.log('   node scripts/migrate-to-centralized.mjs');
    }
    
  } catch (error) {
    console.error('❌ Error durante la validación:', error);
    process.exit(1);
  }
}

main();
