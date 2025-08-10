const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = 'https://expqwtvlinsudlbpjldf.supabase.co';
const supabaseAnonKey = 'sb_publishable_tML1Lcese9dSNerDU9Tuag_YQ82Vlqw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function fixAdminUser() {
  console.log('🔧 Arreglando usuario admin...\n');

  try {
    // 1. Verificar si el usuario existe en admin_users
    console.log('1. Verificando usuario en tabla admin_users...');
    const { data: existingAdmin, error: checkError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', 'admin1@gravitoms.com')
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('❌ Error verificando usuario:', checkError);
      return;
    }

    if (existingAdmin) {
      console.log('✅ Usuario admin1@gravitoms.com ya existe en admin_users');
      console.log('   ID:', existingAdmin.id);
      console.log('   Email:', existingAdmin.email);
      console.log('   Role:', existingAdmin.role);
      return;
    }

    // 2. Insertar usuario en admin_users
    console.log('2. Insertando usuario en tabla admin_users...');
    const { data: newAdmin, error: insertError } = await supabase
      .from('admin_users')
      .insert({
        email: 'admin1@gravitoms.com',
        role: 'admin'
      })
      .select()
      .single();

    if (insertError) {
      console.error('❌ Error insertando usuario:', insertError);
      return;
    }

    console.log('✅ Usuario admin1@gravitoms.com agregado exitosamente');
    console.log('   ID:', newAdmin.id);
    console.log('   Email:', newAdmin.email);
    console.log('   Role:', newAdmin.role);

    // 3. Verificar que se puede consultar
    console.log('\n3. Verificando acceso...');
    const { data: verifyAdmin, error: verifyError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', 'admin1@gravitoms.com')
      .single();

    if (verifyError) {
      console.error('❌ Error verificando acceso:', verifyError);
    } else {
      console.log('✅ Usuario verificado correctamente');
    }

    console.log('\n🎉 Usuario admin configurado correctamente!');
    console.log('\n📋 Información de acceso:');
    console.log('Email: admin1@gravitoms.com');
    console.log('Password: [la que configuraste en Supabase Auth]');
    console.log('\n🔗 Ahora puedes hacer login desde el footer del sitio');

  } catch (error) {
    console.error('❌ Error inesperado:', error);
  }
}

fixAdminUser();
