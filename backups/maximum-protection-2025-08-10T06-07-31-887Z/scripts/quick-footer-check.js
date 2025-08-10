import fs from 'fs';
import path from 'path';

console.log('🔍 Verificación Rápida del Footer...\n');

// Verificar Footer component
const footerPath = path.join(process.cwd(), 'src/components/Footer.tsx');
if (fs.existsSync(footerPath)) {
  console.log('✅ Footer component: PRESENTE');
  
  const content = fs.readFileSync(footerPath, 'utf8');
  const hasReact = content.includes('import React');
  const hasFooter = content.includes('const Footer');
  const hasGravitoVS = content.includes('GRAVITO VS');
  const hasToggle = content.includes('Ver más');
  
  console.log(`   - React import: ${hasReact ? '✅' : '❌'}`);
  console.log(`   - Footer component: ${hasFooter ? '✅' : '❌'}`);
  console.log(`   - GRAVITO VS section: ${hasGravitoVS ? '✅' : '❌'}`);
  console.log(`   - Toggle functionality: ${hasToggle ? '✅' : '❌'}`);
} else {
  console.log('❌ Footer component: NO ENCONTRADO');
  console.log('🚨 Ejecutar: node scripts/footer-guardian.js emergency');
}

// Verificar Home Page
const indexPath = path.join(process.cwd(), 'src/pages/Index.tsx');
if (fs.existsSync(indexPath)) {
  const content = fs.readFileSync(indexPath, 'utf8');
  const hasImport = content.includes('import Footer from');
  const hasUsage = content.includes('<Footer />');
  
  console.log(`\n✅ Home Page: PRESENTE`);
  console.log(`   - Footer import: ${hasImport ? '✅' : '❌'}`);
  console.log(`   - Footer usage: ${hasUsage ? '✅' : '❌'}`);
} else {
  console.log('\n❌ Home Page: NO ENCONTRADA');
}

// Verificar archivo de protección
const protectionPath = path.join(process.cwd(), '.footer-protection');
if (fs.existsSync(protectionPath)) {
  console.log('\n✅ Archivo de protección: PRESENTE');
} else {
  console.log('\n⚠️ Archivo de protección: NO ENCONTRADO');
}

console.log('\n🛡️ Sistema de Protección:');
console.log('   - Guardian script: scripts/footer-guardian.js');
console.log('   - Quick check: scripts/quick-footer-check.js');
console.log('   - Emergency restore: node scripts/footer-guardian.js emergency');

console.log('\n📋 Comandos útiles:');
console.log('   - node scripts/footer-guardian.js check');
console.log('   - node scripts/footer-guardian.js monitor');
console.log('   - node scripts/footer-guardian.js backup');

console.log('\n🔍 Verificación completada'); 