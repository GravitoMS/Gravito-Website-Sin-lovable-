const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = 'https://expqwtvlinsudlbpjldf.supabase.co';
const supabaseAnonKey = 'sb_publishable_tML1Lcese9dSNerDU9Tuag_YQ82Vlqw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkSupabaseConnectivity() {
  console.log('🔍 VERIFICANDO CONECTIVIDAD CON SUPABASE\n');

  try {
    // 1. Verificar configuración
    console.log('1. ⚙️ VERIFICANDO CONFIGURACIÓN...');
    console.log('   URL:', supabaseUrl);
    console.log('   Key:', supabaseAnonKey.substring(0, 20) + '...');
    console.log('');

    // 2. Probar conexión básica
    console.log('2. 🌐 PROBANDO CONEXIÓN BÁSICA...');
    try {
      const { data, error } = await supabase
        .from('page_content')
        .select('count')
        .limit(1);

      if (error) {
        console.log('❌ Error de conexión:', error.message);
        console.log('   Código:', error.code);
        console.log('   Detalles:', error.details);
      } else {
        console.log('✅ Conexión exitosa');
        console.log('   Respuesta:', data);
      }
    } catch (error) {
      console.log('❌ Error de red:', error.message);
    }
    console.log('');

    // 3. Probar autenticación
    console.log('3. 🔐 PROBANDO AUTENTICACIÓN...');
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: 'admin@gravito.com',
        password: 'AdminGravito2025!'
      });

      if (authError) {
        console.log('❌ Error de autenticación:', authError.message);
      } else {
        console.log('✅ Autenticación exitosa');
        console.log('   Usuario:', authData.user.email);
      }
    } catch (error) {
      console.log('❌ Error en autenticación:', error.message);
    }
    console.log('');

    // 4. Probar consulta con autenticación
    console.log('4. 📝 PROBANDO CONSULTA AUTENTICADA...');
    try {
      const { data: pageData, error: pageError } = await supabase
        .from('page_content')
        .select('*')
        .limit(1);

      if (pageError) {
        console.log('❌ Error en consulta:', pageError.message);
        console.log('   Código:', pageError.code);
      } else {
        console.log('✅ Consulta exitosa');
        console.log('   Datos obtenidos:', pageData?.length || 0);
      }
    } catch (error) {
      console.log('❌ Error en consulta:', error.message);
    }
    console.log('');

    // 5. Verificar políticas RLS
    console.log('5. 🛡️ VERIFICANDO POLÍTICAS RLS...');
    try {
      const { data: rlsData, error: rlsError } = await supabase
        .from('admin_users')
        .select('*');

      if (rlsError) {
        console.log('❌ Error de RLS:', rlsError.message);
        console.log('   Código:', rlsError.code);
      } else {
        console.log('✅ Políticas RLS funcionando');
        console.log('   Usuarios admin:', rlsData?.length || 0);
      }
    } catch (error) {
      console.log('❌ Error de RLS:', error.message);
    }
    console.log('');

    // 6. Logout
    console.log('6. 🚪 REALIZANDO LOGOUT...');
    try {
      const { error: logoutError } = await supabase.auth.signOut();
      if (logoutError) {
        console.log('❌ Error en logout:', logoutError.message);
      } else {
        console.log('✅ Logout exitoso');
      }
    } catch (error) {
      console.log('❌ Error en logout:', error.message);
    }
    console.log('');

    // 7. Resumen
    console.log('📊 RESUMEN DE CONECTIVIDAD:');
    console.log('');
    console.log('✅ CONFIGURACIÓN:');
    console.log('   - URL de Supabase configurada');
    console.log('   - Clave anónima configurada');
    console.log('');
    console.log('🔧 RECOMENDACIONES:');
    console.log('   - Si hay errores de "Failed to fetch", verificar:');
    console.log('     * Conexión a internet');
    console.log('     * Bloqueadores de anuncios');
    console.log('     * Configuración de CORS');
    console.log('     * Firewall o proxy');
    console.log('');
    console.log('💡 SOLUCIONES:');
    console.log('   - Recargar la página');
    console.log('   - Limpiar caché del navegador');
    console.log('   - Verificar conexión a internet');
    console.log('   - Deshabilitar bloqueadores temporalmente');

  } catch (error) {
    console.error('❌ Error general en verificación:', error);
  }
}

checkSupabaseConnectivity();
