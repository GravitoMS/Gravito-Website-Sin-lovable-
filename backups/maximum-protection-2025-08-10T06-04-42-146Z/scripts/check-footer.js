import fs from 'fs';
import path from 'path';

console.log('🔍 Verificando Footer...');

// Verificar que el Footer component existe
const footerPath = path.join(process.cwd(), 'src/components/Footer.tsx');
if (fs.existsSync(footerPath)) {
  console.log('✅ Footer component encontrado');
} else {
  console.log('❌ Footer component NO encontrado');
}

// Verificar que la Home Page tiene el Footer
const indexPath = path.join(process.cwd(), 'src/pages/Index.tsx');
if (fs.existsSync(indexPath)) {
  const content = fs.readFileSync(indexPath, 'utf8');
  if (content.includes('import Footer from')) {
    console.log('✅ Home Page: Import del Footer encontrado');
  } else {
    console.log('❌ Home Page: Falta import del Footer');
  }
  
  if (content.includes('<Footer />')) {
    console.log('✅ Home Page: Componente Footer encontrado');
  } else {
    console.log('❌ Home Page: Falta componente Footer');
  }
} else {
  console.log('❌ Home Page no encontrada');
}

console.log('🔍 Verificación completada'); 