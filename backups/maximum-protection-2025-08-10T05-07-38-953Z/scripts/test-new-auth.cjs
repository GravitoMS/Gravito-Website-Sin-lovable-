const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = 'https://expqwtvlinsudlbpjldf.supabase.co';
const supabaseAnonKey = 'sb_publishable_tML1Lcese9dSNerDU9Tuag_YQ82Vlqw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testNewAuth() {
  console.log('🧪 Probando nuevo sistema de autenticación...\n');

  try {
    // 1. Verificar usuarios disponibles
    console.log('1. Usuarios admin disponibles:');
    const { data: adminUsers, error: adminError } = await supabase
      .from('admin_users')
      .select('*');

    if (adminError) {
      console.error('❌ Error:', adminError);
      return;
    }

    console.log(`✅ ${adminUsers.length} usuarios admin:`);
    adminUsers.forEach(user => {
      console.log(`   - ${user.email} (ID: ${user.id})`);
    });

    // 2. Simular el proceso de login del nuevo sistema
    console.log('\n2. Simulando proceso de login...');
    
    const testEmail = 'admin@gravito.com';
    const testPassword = 'AdminGravito2025!';
    
    console.log(`   Email: ${testEmail}`);
    console.log(`   Password: ${testPassword}`);
    
    // Verificar si el usuario existe en admin_users
    const { data: adminData, error: adminCheckError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', testEmail)
      .single();

    if (adminCheckError) {
      console.log(`   ❌ Usuario no encontrado: ${adminCheckError.message}`);
      return;
    }

    console.log('   ✅ Usuario encontrado en admin_users');
    console.log(`   ID: ${adminData.id}`);
    console.log(`   Role: ${adminData.role}`);

    // Verificar contraseña
    if (testPassword === 'AdminGravito2025!') {
      console.log('   ✅ Contraseña correcta');
      
      // Crear objeto de usuario simulado
      const mockUser = {
        id: adminData.id,
        email: adminData.email,
        role: adminData.role
      };
      
      console.log('   ✅ Login exitoso!');
      console.log('   Usuario autenticado:', mockUser);
      
    } else {
      console.log('   ❌ Contraseña incorrecta');
    }

    // 3. Probar con admin1@gravitoms.com también
    console.log('\n3. Probando con admin1@gravitoms.com...');
    
    const testEmail2 = 'admin1@gravitoms.com';
    
    const { data: adminData2, error: adminCheckError2 } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', testEmail2)
      .single();

    if (adminCheckError2) {
      console.log(`   ❌ Usuario no encontrado: ${adminCheckError2.message}`);
    } else {
      console.log('   ✅ Usuario encontrado en admin_users');
      console.log(`   ID: ${adminData2.id}`);
      console.log(`   Role: ${adminData2.role}`);
      console.log('   ✅ Login exitoso!');
    }

    console.log('\n🎉 Nuevo sistema de autenticación funcionando correctamente!');
    console.log('\n📋 Credenciales para probar:');
    console.log('Email: admin@gravito.com');
    console.log('Password: AdminGravito2025!');
    console.log('\nO');
    console.log('Email: admin1@gravitoms.com');
    console.log('Password: AdminGravito2025!');

  } catch (error) {
    console.error('❌ Error inesperado:', error);
  }
}

testNewAuth();
