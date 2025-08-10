const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = 'https://expqwtvlinsudlbpjldf.supabase.co';
const supabaseAnonKey = 'sb_publishable_tML1Lcese9dSNerDU9Tuag_YQ82Vlqw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function debugAuth() {
  console.log('🔍 Debug completo del sistema de autenticación...\n');

  try {
    // 1. Verificar conexión básica
    console.log('1. Verificando conexión a Supabase...');
    const { data: testData, error: testError } = await supabase
      .from('admin_users')
      .select('count')
      .limit(1);

    if (testError) {
      console.error('❌ Error de conexión:', testError);
      return;
    }
    console.log('✅ Conexión exitosa');

    // 2. Listar todos los usuarios admin
    console.log('\n2. Usuarios en tabla admin_users:');
    const { data: adminUsers, error: adminError } = await supabase
      .from('admin_users')
      .select('*');

    if (adminError) {
      console.error('❌ Error listando admin_users:', adminError);
      return;
    }

    console.log(`✅ ${adminUsers.length} usuarios admin encontrados:`);
    adminUsers.forEach(user => {
      console.log(`   - ${user.email} (ID: ${user.id}, Role: ${user.role})`);
    });

    // 3. Verificar usuarios en Supabase Auth (esto requiere service role)
    console.log('\n3. Verificando usuarios en Supabase Auth...');
    console.log('⚠️  Para verificar usuarios en Auth, necesitas:');
    console.log('   - Ir a Supabase > Authentication > Users');
    console.log('   - Verificar que el usuario existe y está confirmado');

    // 4. Probar autenticación con credenciales conocidas
    console.log('\n4. Probando autenticación...');
    
    // Intentar con admin@gravito.com
    console.log('   Probando admin@gravito.com...');
    const { data: authData1, error: authError1 } = await supabase.auth.signInWithPassword({
      email: 'admin@gravito.com',
      password: 'AdminGravito2025!'
    });

    if (authError1) {
      console.log(`   ❌ Error con admin@gravito.com: ${authError1.message}`);
    } else {
      console.log('   ✅ Login exitoso con admin@gravito.com');
      console.log(`   User ID: ${authData1.user.id}`);
      console.log(`   Email: ${authData1.user.email}`);
    }

    // Intentar con admin1@gravitoms.com
    console.log('   Probando admin1@gravitoms.com...');
    const { data: authData2, error: authError2 } = await supabase.auth.signInWithPassword({
      email: 'admin1@gravitoms.com',
      password: 'AdminGravito2025!'
    });

    if (authError2) {
      console.log(`   ❌ Error con admin1@gravitoms.com: ${authError2.message}`);
    } else {
      console.log('   ✅ Login exitoso con admin1@gravitoms.com');
      console.log(`   User ID: ${authData2.user.id}`);
      console.log(`   Email: ${authData2.user.email}`);
    }

    // 5. Verificar políticas RLS
    console.log('\n5. Verificando políticas RLS...');
    const { data: rlsTest, error: rlsError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', 'admin@gravito.com');

    if (rlsError) {
      console.log(`   ❌ Error RLS: ${rlsError.message}`);
    } else {
      console.log('   ✅ Políticas RLS funcionando correctamente');
    }

    // 6. Recomendaciones
    console.log('\n📋 RECOMENDACIONES:');
    console.log('1. Ve a Supabase > Authentication > Users');
    console.log('2. Crea un usuario con email: admin@gravito.com');
    console.log('3. Establece password: AdminGravito2025!');
    console.log('4. Marca "Email confirmed"');
    console.log('5. Prueba el login desde el sitio web');

    console.log('\n🔧 Si el problema persiste:');
    console.log('1. Verifica que el usuario existe en Auth');
    console.log('2. Verifica que la contraseña es correcta');
    console.log('3. Verifica que el email está confirmado');
    console.log('4. Revisa la consola del navegador para errores específicos');

  } catch (error) {
    console.error('❌ Error inesperado:', error);
  }
}

debugAuth();
