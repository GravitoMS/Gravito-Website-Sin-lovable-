const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = 'https://expqwtvlinsudlbpjldf.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY no está configurada');
  console.log('📝 Para configurar:');
  console.log('1. Ve a tu proyecto de Supabase > Settings > API');
  console.log('2. Copia la "service_role" key');
  console.log('3. Ejecuta: export SUPABASE_SERVICE_ROLE_KEY="tu_service_role_key"');
  console.log('\n🔗 Alternativa: Crea el usuario manualmente en Supabase Auth');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAdminUser() {
  console.log('🔧 Creando usuario admin completamente nuevo...\n');

  try {
    // 1. Crear usuario en auth.users
    console.log('1. Creando usuario en Supabase Auth...');
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: 'admin@gravito.com',
      password: 'AdminGravito2025!',
      email_confirm: true,
      user_metadata: { role: 'admin' }
    });

    if (authError) {
      if (authError.message.includes('already registered')) {
        console.log('⚠️  Usuario admin@gravito.com ya existe en auth.users');
        console.log('📝 Actualizando contraseña...');
        
        // Actualizar contraseña del usuario existente
        const { error: updateError } = await supabase.auth.admin.updateUserById(
          authUser?.user?.id || 'existing-user-id',
          { password: 'AdminGravito2025!' }
        );
        
        if (updateError) {
          console.log('⚠️  No se pudo actualizar la contraseña automáticamente');
          console.log('📝 Por favor, actualiza la contraseña manualmente en Supabase Auth');
        } else {
          console.log('✅ Contraseña actualizada correctamente');
        }
      } else {
        console.error('❌ Error creando usuario en auth:', authError);
        return;
      }
    } else {
      console.log('✅ Usuario admin@gravito.com creado en auth.users');
      console.log('   ID:', authUser.user.id);
    }

    // 2. Insertar en tabla admin_users
    console.log('\n2. Configurando usuario en tabla admin_users...');
    const { data: adminUser, error: adminError } = await supabase
      .from('admin_users')
      .upsert({
        email: 'admin@gravito.com',
        role: 'admin'
      }, {
        onConflict: 'email'
      })
      .select()
      .single();

    if (adminError) {
      console.error('❌ Error insertando en admin_users:', adminError);
      return;
    }

    console.log('✅ Usuario configurado en admin_users');
    console.log('   ID:', adminUser.id);
    console.log('   Email:', adminUser.email);
    console.log('   Role:', adminUser.role);

    // 3. Verificar que se puede consultar
    console.log('\n3. Verificando acceso...');
    const { data: verifyAdmin, error: verifyError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', 'admin@gravito.com')
      .single();

    if (verifyError) {
      console.error('❌ Error verificando acceso:', verifyError);
    } else {
      console.log('✅ Usuario verificado correctamente');
    }

    console.log('\n🎉 Usuario admin configurado correctamente!');
    console.log('\n📋 Información de acceso:');
    console.log('Email: admin@gravito.com');
    console.log('Password: AdminGravito2025!');
    console.log('\n⚠️  IMPORTANTE:');
    console.log('1. Si el usuario ya existía, actualiza la contraseña manualmente');
    console.log('2. Ve a Supabase > Authentication > Users');
    console.log('3. Encuentra admin@gravito.com y cambia la contraseña');
    console.log('4. O usa las credenciales proporcionadas arriba');

  } catch (error) {
    console.error('❌ Error inesperado:', error);
  }
}

createAdminUser();
