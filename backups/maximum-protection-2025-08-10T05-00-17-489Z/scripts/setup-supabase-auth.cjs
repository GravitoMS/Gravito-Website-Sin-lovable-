const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = 'https://expqwtvlinsudlbpjldf.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY no está configurada');
  console.log('\n📝 Para configurar:');
  console.log('1. Ve a tu proyecto de Supabase > Settings > API');
  console.log('2. Copia la "service_role" key (NO la anon key)');
  console.log('3. Ejecuta: export SUPABASE_SERVICE_ROLE_KEY="tu_service_role_key"');
  console.log('4. Ejecuta este script nuevamente');
  console.log('\n🔗 Alternativa manual:');
  console.log('1. Ve a Supabase > Authentication > Users');
  console.log('2. Crea usuarios manualmente con las credenciales proporcionadas');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupSupabaseAuth() {
  console.log('🔧 Configurando Supabase Auth con service role...\n');

  try {
    // 1. Crear usuario admin@gravito.com
    console.log('1. Creando usuario admin@gravito.com...');
    const { data: authUser1, error: authError1 } = await supabase.auth.admin.createUser({
      email: 'admin@gravito.com',
      password: 'AdminGravito2025!',
      email_confirm: true,
      user_metadata: { role: 'admin' }
    });

    if (authError1) {
      if (authError1.message.includes('already registered')) {
        console.log('⚠️  Usuario admin@gravito.com ya existe en Auth');
        console.log('📝 Actualizando contraseña...');
        
        // Buscar el usuario existente
        const { data: existingUsers } = await supabase.auth.admin.listUsers();
        const existingUser = existingUsers.users.find(u => u.email === 'admin@gravito.com');
        
        if (existingUser) {
          const { error: updateError } = await supabase.auth.admin.updateUserById(
            existingUser.id,
            { password: 'AdminGravito2025!' }
          );
          
          if (updateError) {
            console.log('⚠️  No se pudo actualizar la contraseña automáticamente');
            console.log('📝 Actualiza manualmente en Supabase Auth');
          } else {
            console.log('✅ Contraseña actualizada correctamente');
          }
        }
      } else {
        console.error('❌ Error creando usuario:', authError1);
      }
    } else {
      console.log('✅ Usuario admin@gravito.com creado en Auth');
      console.log('   ID:', authUser1.user.id);
    }

    // 2. Crear usuario admin1@gravitoms.com
    console.log('\n2. Creando usuario admin1@gravitoms.com...');
    const { data: authUser2, error: authError2 } = await supabase.auth.admin.createUser({
      email: 'admin1@gravitoms.com',
      password: 'AdminGravito2025!',
      email_confirm: true,
      user_metadata: { role: 'admin' }
    });

    if (authError2) {
      if (authError2.message.includes('already registered')) {
        console.log('⚠️  Usuario admin1@gravitoms.com ya existe en Auth');
        console.log('📝 Actualizando contraseña...');
        
        // Buscar el usuario existente
        const { data: existingUsers } = await supabase.auth.admin.listUsers();
        const existingUser = existingUsers.users.find(u => u.email === 'admin1@gravitoms.com');
        
        if (existingUser) {
          const { error: updateError } = await supabase.auth.admin.updateUserById(
            existingUser.id,
            { password: 'AdminGravito2025!' }
          );
          
          if (updateError) {
            console.log('⚠️  No se pudo actualizar la contraseña automáticamente');
            console.log('📝 Actualiza manualmente en Supabase Auth');
          } else {
            console.log('✅ Contraseña actualizada correctamente');
          }
        }
      } else {
        console.error('❌ Error creando usuario:', authError2);
      }
    } else {
      console.log('✅ Usuario admin1@gravitoms.com creado en Auth');
      console.log('   ID:', authUser2.user.id);
    }

    // 3. Verificar usuarios en Auth
    console.log('\n3. Verificando usuarios en Auth...');
    const { data: authUsers, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) {
      console.error('❌ Error listando usuarios:', listError);
    } else {
      console.log(`✅ ${authUsers.users.length} usuarios en Auth:`);
      authUsers.users.forEach(user => {
        console.log(`   - ${user.email} (ID: ${user.id}, Confirmado: ${user.email_confirmed_at ? 'Sí' : 'No'})`);
      });
    }

    // 4. Verificar usuarios en admin_users
    console.log('\n4. Verificando usuarios en admin_users...');
    const { data: adminUsers, error: adminError } = await supabase
      .from('admin_users')
      .select('*');

    if (adminError) {
      console.error('❌ Error verificando admin_users:', adminError);
    } else {
      console.log(`✅ ${adminUsers.length} usuarios en admin_users:`);
      adminUsers.forEach(user => {
        console.log(`   - ${user.email} (ID: ${user.id}, Role: ${user.role})`);
      });
    }

    console.log('\n🎉 Configuración de Supabase Auth completada!');
    console.log('\n📋 Credenciales de acceso:');
    console.log('Email: admin@gravito.com');
    console.log('Password: AdminGravito2025!');
    console.log('\nO');
    console.log('Email: admin1@gravitoms.com');
    console.log('Password: AdminGravito2025!');
    console.log('\n🔗 Ahora puedes hacer login desde el sitio web');

  } catch (error) {
    console.error('❌ Error inesperado:', error);
  }
}

setupSupabaseAuth();
