const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = 'https://expqwtvlinsudlbpjldf.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Necesitas agregar esta variable de entorno

if (!supabaseServiceKey) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY no está configurada');
  console.log('📝 Para configurar:');
  console.log('1. Ve a tu proyecto de Supabase > Settings > API');
  console.log('2. Copia la "service_role" key');
  console.log('3. Ejecuta: export SUPABASE_SERVICE_ROLE_KEY="tu_service_role_key"');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupAdmin() {
  try {
    console.log('🚀 Configurando usuario admin...');
    
    // 1. Crear usuario en auth.users
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: 'admin@gravito.com',
      password: 'AdminGravito2025!', // Cambiar esta contraseña
      email_confirm: true,
      user_metadata: { role: 'admin' }
    });

    if (authError) {
      if (authError.message.includes('already registered')) {
        console.log('✅ Usuario admin ya existe en auth.users');
      } else {
        console.error('❌ Error creando usuario en auth:', authError);
        return;
      }
    } else {
      console.log('✅ Usuario admin creado en auth.users');
    }

    // 2. Insertar en tabla admin_users
    const { data: adminUser, error: adminError } = await supabase
      .from('admin_users')
      .upsert({
        email: 'admin@gravito.com',
        role: 'admin'
      }, {
        onConflict: 'email'
      });

    if (adminError) {
      console.error('❌ Error insertando en admin_users:', adminError);
      return;
    }

    console.log('✅ Usuario admin configurado en admin_users');

    // 3. Verificar que las tablas existen
    const { data: tables, error: tablesError } = await supabase
      .from('admin_users')
      .select('*')
      .limit(1);

    if (tablesError) {
      console.error('❌ Error verificando tablas:', tablesError);
      console.log('📝 Asegúrate de ejecutar el script SQL en Supabase primero');
      return;
    }

    console.log('✅ Tablas verificadas correctamente');

    // 4. Mostrar información de acceso
    console.log('\n🎉 Configuración completada exitosamente!');
    console.log('\n📋 Información de acceso:');
    console.log('Email: admin@gravito.com');
    console.log('Password: AdminGravito2025!');
    console.log('\n⚠️  IMPORTANTE: Cambia la contraseña después del primer login');
    console.log('\n🔗 Para cambiar la contraseña:');
    console.log('1. Inicia sesión en el footer del sitio');
    console.log('2. Ve a Supabase Dashboard > Authentication > Users');
    console.log('3. Encuentra admin@gravito.com y cambia la contraseña');

  } catch (error) {
    console.error('❌ Error inesperado:', error);
  }
}

setupAdmin();
