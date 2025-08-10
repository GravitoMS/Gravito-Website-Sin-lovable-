import fs from 'fs';
import path from 'path';

// Configuración de backup completo
const BACKUP_CONFIG = {
  // Directorio de backup
  backupDir: 'backups',
  
  // Archivos críticos a respaldar
  criticalFiles: [
    // Páginas principales
    'src/pages/Index.tsx',
    'src/pages/Estrategia.tsx',
    'src/pages/Servicios.tsx',
    'src/pages/Nosotros.tsx',
    'src/pages/Blog.tsx',
    'src/pages/Contacto.tsx',
    
    // Componentes principales
    'src/components/Header.tsx',
    'src/components/Footer.tsx',
    'src/App.tsx',
    
    // Configuraciones
    'tailwind.config.ts',
    'package.json',
    'vite.config.ts',
    
    // Estilos
    'src/index.css',
    
    // Scripts de protección
    'scripts/footer-protection.js',
    'scripts/check-footer.js',
    'FOOTER_PROTECTION.md'
  ],
  
  // Directorios completos a respaldar
  criticalDirectories: [
    'src/components/ui',
    'src/hooks',
    'src/lib',
    'src/integrations'
  ]
};

// Función para crear timestamp
function getTimestamp() {
  const now = new Date();
  return now.toISOString().replace(/[:.]/g, '-').slice(0, -5);
}

// Función para crear backup completo
function createCompleteBackup() {
  const timestamp = getTimestamp();
  const backupName = `complete-backup-${timestamp}`;
  const backupPath = path.join(process.cwd(), BACKUP_CONFIG.backupDir, backupName);
  
  console.log(`🔄 Creando backup completo: ${backupName}`);
  
  try {
    // Crear directorio de backup
    if (!fs.existsSync(path.dirname(backupPath))) {
      fs.mkdirSync(path.dirname(backupPath), { recursive: true });
    }
    fs.mkdirSync(backupPath, { recursive: true });
    
    // Crear estructura de directorios
    const dirs = ['src', 'src/pages', 'src/components', 'src/components/ui', 'src/hooks', 'src/lib', 'src/integrations', 'scripts'];
    dirs.forEach(dir => {
      const dirPath = path.join(backupPath, dir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
    });
    
    // Backup de archivos críticos
    let backedUpFiles = 0;
    BACKUP_CONFIG.criticalFiles.forEach(filePath => {
      try {
        const sourcePath = path.join(process.cwd(), filePath);
        const destPath = path.join(backupPath, filePath);
        
        if (fs.existsSync(sourcePath)) {
          // Crear directorio de destino si no existe
          const destDir = path.dirname(destPath);
          if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
          }
          
          // Copiar archivo
          const content = fs.readFileSync(sourcePath, 'utf8');
          fs.writeFileSync(destPath, content);
          backedUpFiles++;
          console.log(`✅ Backup: ${filePath}`);
        } else {
          console.log(`⚠️ Archivo no encontrado: ${filePath}`);
        }
      } catch (error) {
        console.error(`❌ Error respaldando ${filePath}:`, error.message);
      }
    });
    
    // Backup de directorios completos
    BACKUP_CONFIG.criticalDirectories.forEach(dirPath => {
      try {
        const sourceDir = path.join(process.cwd(), dirPath);
        const destDir = path.join(backupPath, dirPath);
        
        if (fs.existsSync(sourceDir)) {
          copyDirectoryRecursive(sourceDir, destDir);
          console.log(`✅ Backup directorio: ${dirPath}`);
        } else {
          console.log(`⚠️ Directorio no encontrado: ${dirPath}`);
        }
      } catch (error) {
        console.error(`❌ Error respaldando directorio ${dirPath}:`, error.message);
      }
    });
    
    // Crear archivo de metadatos del backup
    const metadata = {
      timestamp: timestamp,
      backupName: backupName,
      filesBackedUp: backedUpFiles,
      description: 'Backup completo del proyecto Gravito Media Solutions',
      version: '1.0.0',
      criticalFiles: BACKUP_CONFIG.criticalFiles,
      criticalDirectories: BACKUP_CONFIG.criticalDirectories
    };
    
    fs.writeFileSync(
      path.join(backupPath, 'backup-metadata.json'),
      JSON.stringify(metadata, null, 2)
    );
    
    console.log(`\n🎉 Backup completo creado exitosamente!`);
    console.log(`📁 Ubicación: ${backupPath}`);
    console.log(`📊 Archivos respaldados: ${backedUpFiles}`);
    console.log(`⏰ Timestamp: ${timestamp}`);
    
    return backupPath;
    
  } catch (error) {
    console.error('❌ Error creando backup completo:', error.message);
    return null;
  }
}

// Función para copiar directorio recursivamente
function copyDirectoryRecursive(source, destination) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }
  
  const files = fs.readdirSync(source);
  
  files.forEach(file => {
    const sourcePath = path.join(source, file);
    const destPath = path.join(destination, file);
    
    if (fs.statSync(sourcePath).isDirectory()) {
      copyDirectoryRecursive(sourcePath, destPath);
    } else {
      fs.copyFileSync(sourcePath, destPath);
    }
  });
}

// Función para listar backups disponibles
function listBackups() {
  const backupDir = path.join(process.cwd(), BACKUP_CONFIG.backupDir);
  
  if (!fs.existsSync(backupDir)) {
    console.log('❌ No se encontraron backups');
    return [];
  }
  
  const backups = fs.readdirSync(backupDir)
    .filter(item => fs.statSync(path.join(backupDir, item)).isDirectory())
    .sort()
    .reverse();
  
  console.log('📋 Backups disponibles:');
  backups.forEach((backup, index) => {
    const backupPath = path.join(backupDir, backup);
    const metadataPath = path.join(backupPath, 'backup-metadata.json');
    
    if (fs.existsSync(metadataPath)) {
      const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
      console.log(`${index + 1}. ${backup} (${metadata.timestamp}) - ${metadata.filesBackedUp} archivos`);
    } else {
      console.log(`${index + 1}. ${backup} (sin metadata)`);
    }
  });
  
  return backups;
}

// Función para restaurar desde backup
function restoreFromBackup(backupName) {
  const backupPath = path.join(process.cwd(), BACKUP_CONFIG.backupDir, backupName);
  
  if (!fs.existsSync(backupPath)) {
    console.log(`❌ Backup no encontrado: ${backupName}`);
    return false;
  }
  
  console.log(`🔄 Restaurando desde backup: ${backupName}`);
  
  try {
    // Leer metadata del backup
    const metadataPath = path.join(backupPath, 'backup-metadata.json');
    if (fs.existsSync(metadataPath)) {
      const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
      console.log(`📊 Restaurando ${metadata.filesBackedUp} archivos...`);
    }
    
    // Restaurar archivos críticos
    let restoredFiles = 0;
    BACKUP_CONFIG.criticalFiles.forEach(filePath => {
      try {
        const sourcePath = path.join(backupPath, filePath);
        const destPath = path.join(process.cwd(), filePath);
        
        if (fs.existsSync(sourcePath)) {
          // Crear directorio de destino si no existe
          const destDir = path.dirname(destPath);
          if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
          }
          
          // Restaurar archivo
          const content = fs.readFileSync(sourcePath, 'utf8');
          fs.writeFileSync(destPath, content);
          restoredFiles++;
          console.log(`✅ Restaurado: ${filePath}`);
        }
      } catch (error) {
        console.error(`❌ Error restaurando ${filePath}:`, error.message);
      }
    });
    
    // Restaurar directorios completos
    BACKUP_CONFIG.criticalDirectories.forEach(dirPath => {
      try {
        const sourceDir = path.join(backupPath, dirPath);
        const destDir = path.join(process.cwd(), dirPath);
        
        if (fs.existsSync(sourceDir)) {
          // Eliminar directorio de destino si existe
          if (fs.existsSync(destDir)) {
            fs.rmSync(destDir, { recursive: true, force: true });
          }
          
          // Copiar directorio completo
          copyDirectoryRecursive(sourceDir, destDir);
          console.log(`✅ Restaurado directorio: ${dirPath}`);
        }
      } catch (error) {
        console.error(`❌ Error restaurando directorio ${dirPath}:`, error.message);
      }
    });
    
    console.log(`\n🎉 Restauración completada exitosamente!`);
    console.log(`📊 Archivos restaurados: ${restoredFiles}`);
    
    return true;
    
  } catch (error) {
    console.error('❌ Error restaurando backup:', error.message);
    return false;
  }
}

// Función principal
function main() {
  const command = process.argv[2];
  const backupName = process.argv[3];
  
  switch (command) {
    case 'create':
      createCompleteBackup();
      break;
    case 'list':
      listBackups();
      break;
    case 'restore':
      if (!backupName) {
        console.log('❌ Debes especificar el nombre del backup');
        console.log('Ejemplo: node scripts/complete-backup.js restore complete-backup-2025-01-07T12-30-45');
        return;
      }
      restoreFromBackup(backupName);
      break;
    case 'latest':
      const backups = listBackups();
      if (backups.length > 0) {
        console.log(`\n🔄 Restaurando desde el backup más reciente: ${backups[0]}`);
        restoreFromBackup(backups[0]);
      }
      break;
    default:
      console.log('🛡️ Sistema de Backup Completo');
      console.log('');
      console.log('Comandos disponibles:');
      console.log('  create  - Crear backup completo del proyecto');
      console.log('  list    - Listar backups disponibles');
      console.log('  restore <nombre> - Restaurar desde backup específico');
      console.log('  latest  - Restaurar desde el backup más reciente');
      console.log('');
      console.log('Ejemplos:');
      console.log('  node scripts/complete-backup.js create');
      console.log('  node scripts/complete-backup.js list');
      console.log('  node scripts/complete-backup.js restore complete-backup-2025-01-07T12-30-45');
      console.log('  node scripts/complete-backup.js latest');
  }
}

// Ejecutar si es llamado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export {
  createCompleteBackup,
  listBackups,
  restoreFromBackup,
  BACKUP_CONFIG
}; 