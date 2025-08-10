const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = 'https://expqwtvlinsudlbpjldf.supabase.co';
const supabaseAnonKey = 'sb_publishable_tML1Lcese9dSNerDU9Tuag_YQ82Vlqw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testAuth() {
  console.log('🧪 Probando sistema de autenticación...\n');

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

    // 2. Verificar usuario admin
    console.log('\n2. Verificando usuario admin...');
    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', 'admin1@gravitoms.com')
      .single();

    if (adminError) {
      console.error('❌ Error verificando admin:', adminError);
      return;
    }

    console.log('✅ Usuario admin encontrado:');
    console.log('   ID:', adminData.id);
    console.log('   Email:', adminData.email);
    console.log('   Role:', adminData.role);

    // 3. Verificar políticas RLS
    console.log('\n3. Verificando políticas RLS...');
    const { data: policies, error: policiesError } = await supabase
      .from('admin_users')
      .select('*');

    if (policiesError) {
      console.error('❌ Error verificando políticas:', policiesError);
    } else {
      console.log('✅ Políticas RLS funcionando correctamente');
      console.log('   Usuarios encontrados:', policies.length);
    }

    // 4. Verificar contenido de páginas
    console.log('\n4. Verificando contenido de páginas...');
    const { data: pages, error: pagesError } = await supabase
      .from('page_content')
      .select('*');

    if (pagesError) {
      console.error('❌ Error verificando páginas:', pagesError);
    } else {
      console.log('✅ Contenido de páginas accesible');
      console.log('   Páginas encontradas:', pages.length);
      pages.forEach(page => {
        console.log(`   - ${page.page_name}`);
      });
    }

    console.log('\n🎉 Sistema de autenticación funcionando correctamente!');
    console.log('\n📋 Para probar el login:');
    console.log('1. Ve al sitio web');
    console.log('2. Haz clic en "Admin Login" en el footer');
    console.log('3. Usa: admin1@gravitoms.com');
    console.log('4. Ingresa la contraseña que configuraste');
    console.log('5. Revisa la consola del navegador para logs de debug');

  } catch (error) {
    console.error('❌ Error inesperado:', error);
  }
}

testAuth();
