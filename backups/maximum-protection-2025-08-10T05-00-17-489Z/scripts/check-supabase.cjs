const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = 'https://expqwtvlinsudlbpjldf.supabase.co';
const supabaseAnonKey = 'sb_publishable_tML1Lcese9dSNerDU9Tuag_YQ82Vlqw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkSupabaseSetup() {
  console.log('🔍 Verificando configuración de Supabase...\n');

  try {
    // 1. Verificar conexión básica
    console.log('1. Verificando conexión...');
    const { data, error } = await supabase.from('admin_users').select('count').limit(1);
    
    if (error) {
      console.log('❌ Error de conexión:', error.message);
      console.log('\n📝 Pasos para solucionar:');
      console.log('1. Ve a tu proyecto de Supabase > SQL Editor');
      console.log('2. Ejecuta el script: supabase-setup.sql');
      console.log('3. Verifica que las tablas se crearon correctamente');
      return;
    }
    
    console.log('✅ Conexión exitosa');

    // 2. Verificar tablas
    console.log('\n2. Verificando tablas...');
    
    const tables = ['admin_users', 'page_content', 'blog_posts'];
    for (const table of tables) {
      try {
        const { error } = await supabase.from(table).select('*').limit(1);
        if (error) {
          console.log(`❌ Tabla ${table}: ${error.message}`);
        } else {
          console.log(`✅ Tabla ${table}: OK`);
        }
      } catch (err) {
        console.log(`❌ Tabla ${table}: Error`);
      }
    }

    // 3. Verificar usuario admin
    console.log('\n3. Verificando usuario admin...');
    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', 'admin@gravito.com')
      .single();

    if (adminError) {
      console.log('❌ Usuario admin no encontrado');
      console.log('📝 Para crear el usuario admin:');
      console.log('1. Ve a Supabase > Authentication > Users');
      console.log('2. Crea un usuario con email: admin@gravito.com');
      console.log('3. Ejecuta el script setup-admin.js');
    } else {
      console.log('✅ Usuario admin encontrado');
    }

    // 4. Verificar contenido inicial
    console.log('\n4. Verificando contenido inicial...');
    const { data: contentData, error: contentError } = await supabase
      .from('page_content')
      .select('*');

    if (contentError) {
      console.log('❌ Error verificando contenido:', contentError.message);
    } else {
      console.log(`✅ ${contentData?.length || 0} páginas de contenido encontradas`);
      if (contentData?.length > 0) {
        contentData.forEach(page => {
          console.log(`   - ${page.page_name}`);
        });
      }
    }

    console.log('\n🎉 Verificación completada!');
    console.log('\n📋 Próximos pasos:');
    console.log('1. Si hay errores, ejecuta el script SQL en Supabase');
    console.log('2. Crea el usuario admin en Authentication > Users');
    console.log('3. Ejecuta: node scripts/setup-admin.js');
    console.log('4. Inicia el servidor: npm run dev');
    console.log('5. Ve al footer y haz clic en "Admin Login"');

  } catch (error) {
    console.error('❌ Error inesperado:', error);
  }
}

checkSupabaseSetup();
