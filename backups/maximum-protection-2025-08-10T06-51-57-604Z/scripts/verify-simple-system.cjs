#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Variables de entorno de Supabase no configuradas');
  console.log('📝 Asegúrate de tener en tu archivo .env:');
  console.log('   VITE_SUPABASE_URL=tu_url_de_supabase');
  console.log('   VITE_SUPABASE_ANON_KEY=tu_clave_anonima');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifySimpleSystem() {
  console.log('🔍 Verificando sistema simple...\n');

  try {
    // 1. Verificar conexión
    console.log('1. 🔌 Verificando conexión...');
    const { data, error } = await supabase.from('admin_users').select('count').limit(1);
    if (error) throw error;
    console.log('✅ Conexión exitosa\n');

    // 2. Verificar tabla admin_users
    console.log('2. 👤 Verificando tabla admin_users...');
    const { data: adminUsers, error: adminError } = await supabase
      .from('admin_users')
      .select('*');
    
    if (adminError) {
      console.log('❌ Error:', adminError.message);
      console.log('📝 Ejecuta el script cleanup-and-setup.sql en Supabase');
    } else {
      console.log(`✅ ${adminUsers.length} usuarios admin encontrados`);
      adminUsers.forEach(user => {
        console.log(`   - ${user.email}`);
      });
    }
    console.log('');

    // 3. Verificar tabla blog_posts
    console.log('3. 📝 Verificando tabla blog_posts...');
    const { data: blogPosts, error: blogError } = await supabase
      .from('blog_posts')
      .select('*');
    
    if (blogError) {
      console.log('❌ Error:', blogError.message);
      console.log('📝 Ejecuta el script cleanup-and-setup.sql en Supabase');
    } else {
      console.log(`✅ ${blogPosts.length} posts encontrados`);
      blogPosts.forEach(post => {
        console.log(`   - ${post.title}`);
      });
    }
    console.log('');

    // 4. Verificar que no existan tablas residuales
    console.log('4. 🧹 Verificando limpieza de tablas residuales...');
    const { data: editableContent, error: ecError } = await supabase
      .from('editable_content')
      .select('count')
      .limit(1);
    
    if (!ecError) {
      console.log('⚠️  Tabla editable_content aún existe (residual del sistema anterior)');
    } else {
      console.log('✅ Tabla editable_content eliminada correctamente');
    }

    const { data: pageContent, error: pcError } = await supabase
      .from('page_content')
      .select('count')
      .limit(1);
    
    if (!pcError) {
      console.log('⚠️  Tabla page_content aún existe (residual del sistema anterior)');
    } else {
      console.log('✅ Tabla page_content eliminada correctamente');
    }
    console.log('');

    // 5. Resumen final
    console.log('📋 RESUMEN DEL SISTEMA:');
    console.log('✅ Conexión a Supabase: OK');
    console.log(`✅ Usuarios admin: ${adminUsers?.length || 0}`);
    console.log(`✅ Posts del blog: ${blogPosts?.length || 0}`);
    console.log('✅ Sistema simple configurado');
    console.log('');

    if (adminUsers?.length > 0 && blogPosts?.length > 0) {
      console.log('🎉 ¡SISTEMA LISTO PARA USAR!');
      console.log('');
      console.log('📝 Próximos pasos:');
      console.log('1. Inicia el servidor: npm run dev');
      console.log('2. Ve al footer y haz clic en "Admin Login"');
      console.log('3. Usa las credenciales de admin');
      console.log('4. Activa el modo de edición con el botón flotante');
      console.log('5. Ve a /blog para usar el CMS');
    } else {
      console.log('⚠️  Necesitas ejecutar el script de configuración');
      console.log('📝 Ejecuta cleanup-and-setup.sql en Supabase SQL Editor');
    }

  } catch (error) {
    console.error('❌ Error durante la verificación:', error.message);
    console.log('');
    console.log('🔧 Solución:');
    console.log('1. Verifica que las variables de entorno estén configuradas');
    console.log('2. Ejecuta cleanup-and-setup.sql en Supabase');
    console.log('3. Crea el usuario admin en Authentication > Users');
  }
}

verifySimpleSystem();
