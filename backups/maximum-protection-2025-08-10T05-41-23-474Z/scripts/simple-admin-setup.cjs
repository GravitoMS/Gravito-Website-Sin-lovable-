const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = 'https://expqwtvlinsudlbpjldf.supabase.co';
const supabaseAnonKey = 'sb_publishable_tML1Lcese9dSNerDU9Tuag_YQ82Vlqw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function simpleAdminSetup() {
  console.log('🔧 Configuración simple de usuario admin...\n');

  try {
    // 1. Verificar si el usuario existe en admin_users
    console.log('1. Verificando usuarios admin existentes...');
    const { data: existingAdmins, error: checkError } = await supabase
      .from('admin_users')
      .select('*');

    if (checkError) {
      console.error('❌ Error verificando admin_users:', checkError);
      return;
    }

    console.log(`✅ Encontrados ${existingAdmins.length} usuarios admin:`);
    existingAdmins.forEach(admin => {
      console.log(`   - ${admin.email} (${admin.role})`);
    });

    // 2. Agregar usuario admin@gravito.com si no existe
    const adminEmail = 'admin@gravito.com';
    const existingAdmin = existingAdmins.find(admin => admin.email === adminEmail);

    if (!existingAdmin) {
      console.log(`\n2. Agregando usuario ${adminEmail}...`);
      const { data: newAdmin, error: insertError } = await supabase
        .from('admin_users')
        .insert({
          email: adminEmail,
          role: 'admin'
        })
        .select()
        .single();

      if (insertError) {
        console.error('❌ Error insertando admin:', insertError);
        return;
      }

      console.log('✅ Usuario admin agregado exitosamente');
      console.log('   ID:', newAdmin.id);
      console.log('   Email:', newAdmin.email);
      console.log('   Role:', newAdmin.role);
    } else {
      console.log(`\n✅ Usuario ${adminEmail} ya existe en admin_users`);
    }

    // 3. Verificar contenido de páginas
    console.log('\n3. Verificando contenido de páginas...');
    const { data: pages, error: pagesError } = await supabase
      .from('page_content')
      .select('*');

    if (pagesError) {
      console.error('❌ Error verificando páginas:', pagesError);
    } else {
      console.log(`✅ ${pages.length} páginas de contenido disponibles:`);
      pages.forEach(page => {
        console.log(`   - ${page.page_name}`);
      });
    }

    console.log('\n🎉 Configuración completada!');
    console.log('\n📋 Próximos pasos:');
    console.log('1. Ve a Supabase > Authentication > Users');
    console.log('2. Crea un usuario con email: admin@gravito.com');
    console.log('3. Establece una contraseña (ej: AdminGravito2025!)');
    console.log('4. Marca "Email confirmed"');
    console.log('5. Prueba el login desde el sitio web');

    console.log('\n📋 Credenciales sugeridas:');
    console.log('Email: admin@gravito.com');
    console.log('Password: AdminGravito2025!');

  } catch (error) {
    console.error('❌ Error inesperado:', error);
  }
}

simpleAdminSetup();
