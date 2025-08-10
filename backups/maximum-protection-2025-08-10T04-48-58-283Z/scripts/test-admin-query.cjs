const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = 'https://expqwtvlinsudlbpjldf.supabase.co';
const supabaseAnonKey = 'sb_publishable_tML1Lcese9dSNerDU9Tuag_YQ82Vlqw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testAdminQuery() {
  console.log('🔍 PRUEBA ESPECÍFICA DE CONSULTA ADMIN_USERS\n');

  try {
    // 1. Login primero
    console.log('1. 🔐 HACIENDO LOGIN...');
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: 'admin@gravito.com',
      password: 'AdminGravito2025!'
    });

    if (authError) {
      console.log('❌ Error de login:', authError.message);
      return;
    }

    console.log('✅ Login exitoso');
    console.log('   Usuario:', authData.user.email);
    console.log('   ID:', authData.user.id);
    console.log('');

    // 2. Probar consulta original (la que estaba fallando)
    console.log('2. 🔍 PROBANDO CONSULTA ORIGINAL...');
    try {
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', authData.user.email)
        .single();

      console.log('📊 Resultado consulta original:');
      console.log('   Data:', adminData);
      console.log('   Error:', adminError);
      console.log('   Has Data:', !!adminData);
      console.log('');
    } catch (error) {
      console.log('❌ Error en consulta original:', error.message);
      console.log('');
    }

    // 3. Probar consulta nueva (la que implementamos)
    console.log('3. 🔍 PROBANDO CONSULTA NUEVA...');
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('email')
        .eq('email', authData.user.email)
        .maybeSingle();

      console.log('📊 Resultado consulta nueva:');
      console.log('   Data:', data);
      console.log('   Error:', error);
      console.log('   Has Data:', !!data);
      console.log('');
    } catch (error) {
      console.log('❌ Error en consulta nueva:', error.message);
      console.log('');
    }

    // 4. Probar consulta simple sin filtros
    console.log('4. 🔍 PROBANDO CONSULTA SIN FILTROS...');
    try {
      const { data: allAdmins, error: allError } = await supabase
        .from('admin_users')
        .select('*');

      console.log('📊 Resultado consulta sin filtros:');
      console.log('   Data:', allAdmins);
      console.log('   Error:', allError);
      console.log('   Cantidad:', allAdmins?.length || 0);
      console.log('');
    } catch (error) {
      console.log('❌ Error en consulta sin filtros:', error.message);
      console.log('');
    }

    // 5. Verificar estructura de la tabla
    console.log('5. 🔍 VERIFICANDO ESTRUCTURA DE TABLA...');
    try {
      const { data: structure, error: structureError } = await supabase
        .from('admin_users')
        .select('*')
        .limit(1);

      if (structure && structure.length > 0) {
        console.log('📊 Estructura de la tabla:');
        console.log('   Columnas:', Object.keys(structure[0]));
        console.log('   Ejemplo de registro:', structure[0]);
      } else {
        console.log('⚠️ No hay datos en la tabla admin_users');
      }
      console.log('');
    } catch (error) {
      console.log('❌ Error verificando estructura:', error.message);
      console.log('');
    }

    // 6. Logout
    console.log('6. 🚪 REALIZANDO LOGOUT...');
    const { error: logoutError } = await supabase.auth.signOut();
    
    if (logoutError) {
      console.log('❌ Error en logout:', logoutError.message);
    } else {
      console.log('✅ Logout exitoso');
    }
    console.log('');

    // 7. Resumen
    console.log('📊 RESUMEN DE LA PRUEBA:');
    console.log('✅ Login exitoso');
    console.log('✅ Consultas ejecutadas');
    console.log('✅ Estructura verificada');
    console.log('');
    console.log('💡 RECOMENDACIONES:');
    console.log('- Si la consulta original falla pero la nueva funciona, el problema está resuelto');
    console.log('- Si ambas fallan, hay un problema con la tabla o permisos');
    console.log('- Si no hay datos, necesitamos insertar el usuario admin');

  } catch (error) {
    console.error('❌ Error general en prueba:', error);
  }
}

testAdminQuery();
