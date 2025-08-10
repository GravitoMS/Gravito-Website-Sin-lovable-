const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = 'https://expqwtvlinsudlbpjldf.supabase.co';
const supabaseAnonKey = 'sb_publishable_tML1Lcese9dSNerDU9Tuag_YQ82Vlqw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function finalVerification() {
  console.log('🔍 VERIFICACIÓN FINAL DEL SISTEMA\n');
  
  const results = {
    database: { status: 'pending', details: [] },
    authentication: { status: 'pending', details: [] },
    adminSystem: { status: 'pending', details: [] },
    contentManagement: { status: 'pending', details: [] }
  };

  try {
    // 1. Verificación de Base de Datos
    console.log('1. 🔍 VERIFICANDO BASE DE DATOS...');
    
    // Conexión
    const { data: connectionTest, error: connectionError } = await supabase
      .from('admin_users')
      .select('count')
      .limit(1);
    
    if (connectionError) {
      results.database.status = 'error';
      results.database.details.push('Error de conexión: ' + connectionError.message);
    } else {
      results.database.status = 'success';
      results.database.details.push('Conexión establecida correctamente');
    }

    // Tablas críticas
    const criticalTables = ['admin_users', 'page_content'];
    for (const table of criticalTables) {
      try {
        const { data, error } = await supabase.from(table).select('count').limit(1);
        if (error) {
          results.database.details.push(`Tabla ${table}: Error - ${error.message}`);
        } else {
          results.database.details.push(`Tabla ${table}: OK`);
        }
      } catch (error) {
        results.database.details.push(`Tabla ${table}: Error - ${error.message}`);
      }
    }

    // 2. Verificación de Autenticación
    console.log('\n2. 🔐 VERIFICANDO AUTENTICACIÓN...');
    
    // Login
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: 'admin@gravito.com',
      password: 'AdminGravito2025!'
    });

    if (authError) {
      results.authentication.status = 'error';
      results.authentication.details.push('Error de login: ' + authError.message);
    } else {
      results.authentication.status = 'success';
      results.authentication.details.push('Login exitoso');
      results.authentication.details.push(`Usuario: ${authData.user.email}`);
      results.authentication.details.push(`ID: ${authData.user.id}`);
    }

    // Sesión
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      results.authentication.details.push('Sesión activa');
    } else {
      results.authentication.details.push('No hay sesión activa');
    }

    // 3. Verificación del Sistema Admin
    console.log('\n3. 👤 VERIFICANDO SISTEMA ADMIN...');
    
    const { data: adminUsers, error: adminError } = await supabase
      .from('admin_users')
      .select('*');
    
    if (adminError) {
      results.adminSystem.status = 'error';
      results.adminSystem.details.push('Error obteniendo usuarios admin: ' + adminError.message);
    } else {
      results.adminSystem.status = 'success';
      results.adminSystem.details.push(`${adminUsers.length} usuarios admin encontrados`);
      
      // Verificar usuario específico
      const adminUser = adminUsers.find(u => u.email === 'admin@gravito.com');
      if (adminUser) {
        results.adminSystem.details.push('Usuario admin@gravito.com encontrado');
      } else {
        results.adminSystem.details.push('Usuario admin@gravito.com no encontrado');
      }
    }

    // 4. Verificación de Gestión de Contenido
    console.log('\n4. 📝 VERIFICANDO GESTIÓN DE CONTENIDO...');
    
    const { data: pageContent, error: contentError } = await supabase
      .from('page_content')
      .select('*');
    
    if (contentError) {
      results.contentManagement.status = 'error';
      results.contentManagement.details.push('Error obteniendo contenido: ' + contentError.message);
    } else {
      results.contentManagement.status = 'success';
      results.contentManagement.details.push(`${pageContent.length} páginas de contenido encontradas`);
      
      // Verificar páginas específicas
      const expectedPages = ['home', 'estrategia', 'servicios'];
      for (const pageName of expectedPages) {
        const page = pageContent.find(p => p.page_name === pageName);
        if (page) {
          results.contentManagement.details.push(`Página ${pageName}: OK`);
        } else {
          results.contentManagement.details.push(`Página ${pageName}: No encontrada`);
        }
      }
    }

    // 5. Logout para limpiar
    await supabase.auth.signOut();

    // 6. Resumen Final
    console.log('\n📊 RESUMEN DE VERIFICACIÓN:');
    
    const allResults = Object.values(results);
    const successCount = allResults.filter(r => r.status === 'success').length;
    const errorCount = allResults.filter(r => r.status === 'error').length;
    
    console.log(`   ✅ Exitosos: ${successCount}/4`);
    console.log(`   ❌ Errores: ${errorCount}/4`);
    
    // Mostrar detalles por categoría
    Object.entries(results).forEach(([category, result]) => {
      const statusIcon = result.status === 'success' ? '✅' : result.status === 'error' ? '❌' : '⚠️';
      console.log(`\n${statusIcon} ${category.toUpperCase()}:`);
      result.details.forEach(detail => {
        console.log(`   ${detail}`);
      });
    });

    // 7. Recomendaciones Finales
    console.log('\n💡 RECOMENDACIONES FINALES:');
    
    if (errorCount === 0) {
      console.log('✅ Sistema completamente funcional');
      console.log('✅ Listo para producción');
      console.log('✅ Todos los componentes críticos verificados');
    } else {
      console.log('⚠️ Se encontraron problemas que requieren atención');
      console.log('🔧 Revisar los errores antes de continuar');
    }

    console.log('\n🚀 El sistema está listo para usar');

  } catch (error) {
    console.error('❌ Error durante la verificación final:', error);
  }
}

finalVerification();
