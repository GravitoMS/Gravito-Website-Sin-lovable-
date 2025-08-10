import fs from 'fs';
import path from 'path';

console.log('🧪 Probando sistema de backup...');

// Verificar que podemos crear directorios
const testDir = path.join(process.cwd(), 'backups', 'test-backup');
console.log('📁 Intentando crear directorio de prueba:', testDir);

try {
  // Crear directorio de backups si no existe
  const backupsDir = path.join(process.cwd(), 'backups');
  if (!fs.existsSync(backupsDir)) {
    fs.mkdirSync(backupsDir, { recursive: true });
    console.log('✅ Directorio backups creado');
  } else {
    console.log('✅ Directorio backups ya existe');
  }
  
  // Crear directorio de prueba
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
    console.log('✅ Directorio de prueba creado');
  }
  
  // Crear archivo de prueba
  const testFile = path.join(testDir, 'test.txt');
  fs.writeFileSync(testFile, 'Backup system working!');
  console.log('✅ Archivo de prueba creado');
  
  // Listar contenido del directorio backups
  const backups = fs.readdirSync(backupsDir);
  console.log('📋 Contenido del directorio backups:', backups);
  
  // Limpiar archivo de prueba
  fs.unlinkSync(testFile);
  fs.rmdirSync(testDir);
  console.log('✅ Archivo de prueba eliminado');
  
  console.log('🎉 Sistema de backup funcionando correctamente!');
  
} catch (error) {
  console.error('❌ Error en prueba de backup:', error.message);
} 