const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Configuración de Supabase
const supabaseUrl = 'https://expqwtvlinsudlbpjldf.supabase.co';
const supabaseAnonKey = 'sb_publishable_tML1Lcese9dSNerDU9Tuag_YQ82Vlqw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function analyzeSystem() {
  console.log('🔍 ANÁLISIS EXHAUSTIVO DEL SISTEMA\n');
  
  const issues = [];
  const warnings = [];
  const recommendations = [];

  try {
    // 1. Análisis de Base de Datos
    console.log('1. 🔍 ANALIZANDO BASE DE DATOS...');
    
    // Verificar conexión
    const { data: connectionTest, error: connectionError } = await supabase
      .from('admin_users')
      .select('count')
      .limit(1);
    
    if (connectionError) {
      issues.push('❌ Error de conexión a Supabase: ' + connectionError.message);
    } else {
      console.log('✅ Conexión a Supabase establecida');
    }

    // Verificar tablas críticas
    const criticalTables = ['admin_users', 'page_content'];
    for (const table of criticalTables) {
      try {
        const { data, error } = await supabase.from(table).select('count').limit(1);
        if (error) {
          issues.push(`❌ Tabla ${table} no accesible: ${error.message}`);
        } else {
          console.log(`✅ Tabla ${table} accesible`);
        }
      } catch (error) {
        issues.push(`❌ Error verificando tabla ${table}: ${error.message}`);
      }
    }

    // Verificar datos críticos
    const { data: adminUsers, error: adminError } = await supabase
      .from('admin_users')
      .select('*');
    
    if (adminError) {
      issues.push('❌ Error obteniendo usuarios admin: ' + adminError.message);
    } else if (!adminUsers || adminUsers.length === 0) {
      warnings.push('⚠️ No hay usuarios admin configurados');
    } else {
      console.log(`✅ ${adminUsers.length} usuarios admin encontrados`);
    }

    // 2. Análisis de Autenticación
    console.log('\n2. 🔐 ANALIZANDO SISTEMA DE AUTENTICACIÓN...');
    
    // Probar login
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: 'admin@gravito.com',
      password: 'AdminGravito2025!'
    });

    if (authError) {
      issues.push('❌ Error de autenticación: ' + authError.message);
    } else {
      console.log('✅ Autenticación funcionando correctamente');
      
      // Verificar sesión
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        console.log('✅ Sesión activa después del login');
      } else {
        warnings.push('⚠️ No hay sesión activa después del login');
      }
    }

    // 3. Análisis de Archivos
    console.log('\n3. 📁 ANALIZANDO ESTRUCTURA DE ARCHIVOS...');
    
    const criticalFiles = [
      'src/contexts/AuthContext.tsx',
      'src/components/AdminCMS.tsx',
      'src/pages/Admin.tsx',
      'src/lib/supabase.ts',
      'src/components/AdminLoginModal.tsx'
    ];

    for (const file of criticalFiles) {
      if (fs.existsSync(file)) {
        console.log(`✅ ${file} existe`);
        
        // Verificar si hay imports problemáticos
        const content = fs.readFileSync(file, 'utf8');
        if (content.includes('useAuth') && !content.includes('useAuthSafe')) {
          warnings.push(`⚠️ ${file} usa useAuth en lugar de useAuthSafe`);
        }
      } else {
        issues.push(`❌ Archivo crítico faltante: ${file}`);
      }
    }

    // Verificar archivos duplicados
    const srcDir = 'src';
    const files = getAllFiles(srcDir);
    const duplicates = findDuplicateFiles(files);
    
    if (duplicates.length > 0) {
      warnings.push('⚠️ Archivos duplicados encontrados: ' + duplicates.join(', '));
    }

    // 4. Análisis de Configuración
    console.log('\n4. ⚙️ ANALIZANDO CONFIGURACIÓN...');
    
    const configFiles = ['package.json', 'vite.config.ts', 'tailwind.config.ts'];
    for (const file of configFiles) {
      if (fs.existsSync(file)) {
        console.log(`✅ ${file} existe`);
      } else {
        warnings.push(`⚠️ Archivo de configuración faltante: ${file}`);
      }
    }

    // 5. Análisis de Dependencias
    console.log('\n5. 📦 ANALIZANDO DEPENDENCIAS...');
    
    if (fs.existsSync('package.json')) {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      const criticalDeps = ['@supabase/supabase-js', 'react', 'react-dom'];
      
      for (const dep of criticalDeps) {
        if (packageJson.dependencies && packageJson.dependencies[dep]) {
          console.log(`✅ ${dep} instalado (${packageJson.dependencies[dep]})`);
        } else if (packageJson.devDependencies && packageJson.devDependencies[dep]) {
          console.log(`✅ ${dep} instalado como dev dependency`);
        } else {
          warnings.push(`⚠️ Dependencia crítica faltante: ${dep}`);
        }
      }
    }

    // 6. Análisis de Seguridad
    console.log('\n6. 🔒 ANALIZANDO SEGURIDAD...');
    
    // Verificar que no hay credenciales hardcodeadas
    const filesToCheck = getAllFiles('src');
    for (const file of filesToCheck) {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        const content = fs.readFileSync(file, 'utf8');
        if (content.includes('AdminGravito2025!')) {
          warnings.push(`⚠️ Contraseña hardcodeada encontrada en ${file}`);
        }
      }
    }

    // 7. Generar Recomendaciones
    console.log('\n7. 💡 GENERANDO RECOMENDACIONES...');
    
    if (issues.length === 0 && warnings.length === 0) {
      recommendations.push('✅ Sistema en buen estado - No se requieren acciones inmediatas');
    }
    
    if (warnings.length > 0) {
      recommendations.push('🔧 Considerar resolver las advertencias para mejorar la robustez');
    }
    
    if (issues.length > 0) {
      recommendations.push('🚨 Resolver los problemas críticos antes de continuar');
    }

    // 8. Resumen Final
    console.log('\n📊 RESUMEN DEL ANÁLISIS:');
    console.log(`   Problemas críticos: ${issues.length}`);
    console.log(`   Advertencias: ${warnings.length}`);
    console.log(`   Recomendaciones: ${recommendations.length}`);
    
    if (issues.length > 0) {
      console.log('\n❌ PROBLEMAS CRÍTICOS:');
      issues.forEach(issue => console.log(`   ${issue}`));
    }
    
    if (warnings.length > 0) {
      console.log('\n⚠️ ADVERTENCIAS:');
      warnings.forEach(warning => console.log(`   ${warning}`));
    }
    
    if (recommendations.length > 0) {
      console.log('\n💡 RECOMENDACIONES:');
      recommendations.forEach(rec => console.log(`   ${rec}`));
    }

  } catch (error) {
    console.error('❌ Error durante el análisis:', error);
  }
}

function getAllFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getAllFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  
  return files;
}

function findDuplicateFiles(files) {
  const duplicates = [];
  const seen = new Set();
  
  for (const file of files) {
    const basename = path.basename(file);
    if (seen.has(basename)) {
      duplicates.push(basename);
    } else {
      seen.add(basename);
    }
  }
  
  return duplicates;
}

analyzeSystem();
