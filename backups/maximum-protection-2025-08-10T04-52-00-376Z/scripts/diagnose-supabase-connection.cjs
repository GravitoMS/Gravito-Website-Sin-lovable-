const { createClient } = require('@supabase/supabase-js');
const https = require('https');
const http = require('http');

// Configuración de Supabase
const supabaseUrl = 'https://expqwtvlinsudlbpjldf.supabase.co';
const supabaseAnonKey = 'sb_publishable_tML1Lcese9dSNerDU9Tuag_YQ82Vlqw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Función para verificar conectividad de red
function checkNetworkConnectivity(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https:') ? https : http;
    const req = protocol.get(url, (res) => {
      resolve({
        success: true,
        statusCode: res.statusCode,
        headers: res.headers
      });
    });
    
    req.on('error', (error) => {
      resolve({
        success: false,
        error: error.message
      });
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        success: false,
        error: 'Timeout'
      });
    });
  });
}

async function diagnoseSupabaseConnection() {
  console.log('🔍 DIAGNÓSTICO COMPLETO DE CONECTIVIDAD CON SUPABASE\n');

  const results = {
    network: {},
    supabase: {},
    authentication: {},
    database: {},
    recommendations: []
  };

  try {
    // 1. Verificar conectividad de red básica
    console.log('1. 🌐 VERIFICANDO CONECTIVIDAD DE RED...');
    
    const networkTests = [
      { name: 'Google DNS', url: 'https://8.8.8.8' },
      { name: 'Cloudflare DNS', url: 'https://1.1.1.1' },
      { name: 'Supabase URL', url: supabaseUrl }
    ];

    for (const test of networkTests) {
      console.log(`   Probando ${test.name}...`);
      const result = await checkNetworkConnectivity(test.url);
      results.network[test.name] = result;
      
      if (result.success) {
        console.log(`   ✅ ${test.name}: Conectividad OK (${result.statusCode})`);
      } else {
        console.log(`   ❌ ${test.name}: ${result.error}`);
        results.recommendations.push(`Problema de red con ${test.name}: ${result.error}`);
      }
    }
    console.log('');

    // 2. Verificar configuración de Supabase
    console.log('2. ⚙️ VERIFICANDO CONFIGURACIÓN DE SUPABASE...');
    console.log('   URL:', supabaseUrl);
    console.log('   Key:', supabaseAnonKey.substring(0, 20) + '...');
    
    if (!supabaseUrl.includes('supabase.co')) {
      results.recommendations.push('URL de Supabase parece incorrecta');
    }
    
    if (!supabaseAnonKey.startsWith('sb_publishable_')) {
      results.recommendations.push('Clave de Supabase parece incorrecta');
    }
    console.log('');

    // 3. Probar conexión básica a Supabase
    console.log('3. 🔌 PROBANDO CONEXIÓN BÁSICA A SUPABASE...');
    try {
      const { data, error } = await supabase
        .from('page_content')
        .select('count')
        .limit(1);

      if (error) {
        console.log('   ❌ Error de conexión:', error.message);
        console.log('   Código:', error.code);
        console.log('   Detalles:', error.details);
        results.supabase.connection = { success: false, error };
        results.recommendations.push(`Error de conexión Supabase: ${error.message}`);
      } else {
        console.log('   ✅ Conexión básica exitosa');
        results.supabase.connection = { success: true, data };
      }
    } catch (error) {
      console.log('   ❌ Error de red:', error.message);
      results.supabase.connection = { success: false, error: error.message };
      results.recommendations.push(`Error de red: ${error.message}`);
    }
    console.log('');

    // 4. Probar autenticación
    console.log('4. 🔐 PROBANDO AUTENTICACIÓN...');
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: 'admin@gravito.com',
        password: 'AdminGravito2025!'
      });

      if (authError) {
        console.log('   ❌ Error de autenticación:', authError.message);
        results.authentication.login = { success: false, error: authError };
        results.recommendations.push(`Error de autenticación: ${authError.message}`);
      } else {
        console.log('   ✅ Autenticación exitosa');
        console.log('   Usuario:', authData.user.email);
        results.authentication.login = { success: true, user: authData.user };
      }
    } catch (error) {
      console.log('   ❌ Error en autenticación:', error.message);
      results.authentication.login = { success: false, error: error.message };
      results.recommendations.push(`Error en autenticación: ${error.message}`);
    }
    console.log('');

    // 5. Probar consultas de base de datos
    console.log('5. 📊 PROBANDO CONSULTAS DE BASE DE DATOS...');
    
    const dbTests = [
      { name: 'page_content', query: () => supabase.from('page_content').select('*').limit(1) },
      { name: 'admin_users', query: () => supabase.from('admin_users').select('*').limit(1) }
    ];

    for (const test of dbTests) {
      try {
        console.log(`   Probando tabla ${test.name}...`);
        const { data, error } = await test.query();

        if (error) {
          console.log(`   ❌ Error en ${test.name}:`, error.message);
          results.database[test.name] = { success: false, error };
          results.recommendations.push(`Error en tabla ${test.name}: ${error.message}`);
        } else {
          console.log(`   ✅ ${test.name}: ${data?.length || 0} registros`);
          results.database[test.name] = { success: true, count: data?.length || 0 };
        }
      } catch (error) {
        console.log(`   ❌ Error general en ${test.name}:`, error.message);
        results.database[test.name] = { success: false, error: error.message };
      }
    }
    console.log('');

    // 6. Verificar políticas RLS
    console.log('6. 🛡️ VERIFICANDO POLÍTICAS RLS...');
    try {
      const { data: rlsData, error: rlsError } = await supabase
        .from('page_content')
        .select('count')
        .limit(1);

      if (rlsError) {
        console.log('   ❌ Error de RLS:', rlsError.message);
        console.log('   Código:', rlsError.code);
        results.database.rls = { success: false, error: rlsError };
        results.recommendations.push(`Error de RLS: ${rlsError.message}`);
      } else {
        console.log('   ✅ Políticas RLS funcionando');
        results.database.rls = { success: true };
      }
    } catch (error) {
      console.log('   ❌ Error de RLS:', error.message);
      results.database.rls = { success: false, error: error.message };
    }
    console.log('');

    // 7. Logout
    console.log('7. 🚪 REALIZANDO LOGOUT...');
    try {
      const { error: logoutError } = await supabase.auth.signOut();
      if (logoutError) {
        console.log('   ❌ Error en logout:', logoutError.message);
      } else {
        console.log('   ✅ Logout exitoso');
      }
    } catch (error) {
      console.log('   ❌ Error en logout:', error.message);
    }
    console.log('');

    // 8. Resumen y recomendaciones
    console.log('📊 RESUMEN DEL DIAGNÓSTICO:');
    console.log('');
    
    const allTests = [
      ...Object.values(results.network),
      results.supabase.connection,
      results.authentication.login,
      ...Object.values(results.database)
    ];
    
    const successfulTests = allTests.filter(test => test?.success).length;
    const totalTests = allTests.length;
    
    console.log(`✅ Pruebas exitosas: ${successfulTests}/${totalTests}`);
    console.log('');
    
    if (results.recommendations.length > 0) {
      console.log('🔧 RECOMENDACIONES:');
      results.recommendations.forEach((rec, index) => {
        console.log(`   ${index + 1}. ${rec}`);
      });
      console.log('');
    }

    // 9. Soluciones permanentes
    console.log('💡 SOLUCIONES PERMANENTES:');
    
    if (results.network['Supabase URL']?.success === false) {
      console.log('   1. 🔧 Problema de conectividad con Supabase:');
      console.log('      - Verificar configuración de firewall');
      console.log('      - Verificar configuración de proxy');
      console.log('      - Contactar al proveedor de internet');
      console.log('');
    }
    
    if (results.supabase.connection?.success === false) {
      console.log('   2. 🔧 Problema de configuración de Supabase:');
      console.log('      - Verificar URL y clave en variables de entorno');
      console.log('      - Verificar configuración de CORS en Supabase');
      console.log('      - Verificar políticas de seguridad');
      console.log('');
    }
    
    if (results.authentication.login?.success === false) {
      console.log('   3. 🔧 Problema de autenticación:');
      console.log('      - Verificar credenciales de usuario');
      console.log('      - Verificar configuración de autenticación en Supabase');
      console.log('      - Verificar políticas de RLS');
      console.log('');
    }
    
    console.log('   4. 🔧 Mejoras generales:');
    console.log('      - Implementar retry automático en el frontend');
    console.log('      - Agregar indicadores de estado de conexión');
    console.log('      - Implementar fallback offline');
    console.log('      - Agregar logging detallado de errores de red');

  } catch (error) {
    console.error('❌ Error general en diagnóstico:', error);
  }
}

diagnoseSupabaseConnection();
