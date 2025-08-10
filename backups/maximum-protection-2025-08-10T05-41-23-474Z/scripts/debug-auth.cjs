const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = 'https://expqwtvlinsudlbpjldf.supabase.co';
const supabaseAnonKey = 'sb_publishable_tML1Lcese9dSNerDU9Tuag_YQ82Vlqw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function debugAuth() {
  console.log('🔍 Debug completo del sistema de autenticación...\n');

  try {
    // 1. Verificar conexión a Supabase
    console.log('1. Verificando conexión a Supabase...');
    const { data, error } = await supabase.from('admin_users').select('count').limit(1);
    if (error) {
      console.error('❌ Error de conexión:', error);
      return;
    }
    console.log('✅ Conexión exitosa\n');

    // 2. Verificar usuarios en tabla admin_users
    console.log('2. Usuarios en tabla admin_users:');
    const { data: adminUsers, error: adminError } = await supabase
      .from('admin_users')
      .select('*');

    if (adminError) {
      console.error('❌ Error obteniendo usuarios admin:', adminError);
    } else {
      console.log(`✅ ${adminUsers.length} usuarios admin encontrados:`);
      adminUsers.forEach(user => {
        console.log(`   - ${user.email} (ID: ${user.id}, Role: ${user.role})`);
      });
    }
    console.log('');

    // 3. Verificar configuración de RLS
    console.log('3. Verificando políticas RLS...');
    try {
      const { data: rlsTest, error: rlsError } = await supabase
        .from('admin_users')
        .select('*')
        .limit(1);
      
      if (rlsError) {
        console.log('⚠️  Posible problema con RLS:', rlsError.message);
      } else {
        console.log('✅ Políticas RLS funcionando correctamente');
      }
    } catch (error) {
      console.log('⚠️  Error verificando RLS:', error.message);
    }
    console.log('');

    // 4. Probar autenticación
    console.log('4. Probando autenticación...');
    const testUsers = [
      { email: 'admin@gravito.com', password: 'AdminGravito2025!' },
      { email: 'admin1@gravitoms.com', password: 'AdminGravito2025!' }
    ];

    for (const testUser of testUsers) {
      console.log(`   Probando ${testUser.email}...`);
      try {
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email: testUser.email,
          password: testUser.password,
        });

        if (authError) {
          console.log(`   ❌ Error de login: ${authError.message}`);
        } else {
          console.log(`   ✅ Login exitoso con ${testUser.email}`);
          console.log(`   User ID: ${authData.user.id}`);
          console.log(`   Email: ${authData.user.email}`);
          
          // Verificar si está en tabla admin_users
          const { data: adminData, error: adminCheckError } = await supabase
            .from('admin_users')
            .select('*')
            .eq('email', testUser.email)
            .single();
          
          if (adminCheckError) {
            console.log(`   ⚠️  Usuario no encontrado en tabla admin_users`);
          } else {
            console.log(`   ✅ Usuario confirmado como admin`);
          }
        }
      } catch (error) {
        console.log(`   ❌ Error inesperado: ${error.message}`);
      }
      console.log('');
    }

    // 5. Verificar configuración del contexto
    console.log('5. Verificando configuración del contexto...');
    console.log('✅ Supabase URL configurada:', supabaseUrl);
    console.log('✅ Supabase Anon Key configurada:', supabaseAnonKey ? 'SÍ' : 'NO');
    console.log('');

    // 6. Recomendaciones
    console.log('📋 RECOMENDACIONES:');
    console.log('1. Ve a Supabase > Authentication > Users');
    console.log('2. Verifica que los usuarios existen y están confirmados');
    console.log('3. Verifica que las contraseñas son correctas');
    console.log('4. Revisa la consola del navegador para errores específicos');
    console.log('5. Si el problema persiste, verifica el orden de renderizado de componentes');
    console.log('');
    console.log('🔧 Si el problema persiste:');
    console.log('1. Verifica que el AuthProvider está envolviendo correctamente la aplicación');
    console.log('2. Verifica que no hay conflictos de hot reload');
    console.log('3. Verifica que el contexto se inicializa correctamente');
    console.log('4. Usa el hook useAuthSafe en lugar de useAuth para mayor robustez');

  } catch (error) {
    console.error('❌ Error general en debug:', error);
  }
}

debugAuth();
