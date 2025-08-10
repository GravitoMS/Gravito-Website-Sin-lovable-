#!/usr/bin/env node

/**
 * 🔍 VERIFICADOR DE ESTRUCTURA DE TABLAS - GRAVITO WEBSITE
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://expqwtvlinsudlbpjldf.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY no está configurada');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkTableStructure() {
  console.log('🔍 Verificando estructura de tablas...\n');

  try {
    // Verificar tabla admin_users
    console.log('📋 Tabla admin_users:');
    const { data: adminUsers, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .limit(1);
    
    if (adminError) {
      console.log('❌ Error:', adminError.message);
    } else {
      console.log('✅ Estructura correcta');
      if (adminUsers && adminUsers.length > 0) {
        console.log('   Columnas:', Object.keys(adminUsers[0]));
      }
    }

    // Verificar tabla page_content
    console.log('\n📋 Tabla page_content:');
    const { data: pageContent, error: pageError } = await supabase
      .from('page_content')
      .select('*')
      .limit(1);
    
    if (pageError) {
      console.log('❌ Error:', pageError.message);
    } else {
      console.log('✅ Estructura correcta');
      if (pageContent && pageContent.length > 0) {
        console.log('   Columnas:', Object.keys(pageContent[0]));
      }
    }

    // Verificar tabla blog_posts
    console.log('\n📋 Tabla blog_posts:');
    const { data: blogPosts, error: blogError } = await supabase
      .from('blog_posts')
      .select('*')
      .limit(1);
    
    if (blogError) {
      console.log('❌ Error:', blogError.message);
    } else {
      console.log('✅ Estructura correcta');
      if (blogPosts && blogPosts.length > 0) {
        console.log('   Columnas:', Object.keys(blogPosts[0]));
      }
    }

    // Mostrar contenido actual
    console.log('\n📊 Contenido actual:');
    
    const { data: adminCount } = await supabase
      .from('admin_users')
      .select('*', { count: 'exact' });
    console.log(`   admin_users: ${adminCount?.length || 0} registros`);
    
    const { data: pageCount } = await supabase
      .from('page_content')
      .select('*', { count: 'exact' });
    console.log(`   page_content: ${pageCount?.length || 0} registros`);
    
    const { data: blogCount } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact' });
    console.log(`   blog_posts: ${blogCount?.length || 0} registros`);

  } catch (error) {
    console.error('❌ Error verificando estructura:', error.message);
  }
}

checkTableStructure();


