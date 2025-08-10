#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Configuración de Supabase (usando las credenciales del proyecto)
const supabaseUrl = 'https://expqwtvlinsudlbpjldf.supabase.co';
const supabaseKey = 'sb_publishable_tML1Lcese9dSNerDU9Tuag_YQ82Vlqw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupBlogAndConfig() {
  console.log('🚀 Iniciando configuración de Blog y Configuración del Sistema...\n');

  try {
    // 1. Crear tabla blog_posts usando SQL directo
    console.log('📝 Creando tabla blog_posts...');
    const { error: blogTableError } = await supabase
      .from('page_content')
      .select('*')
      .limit(1)
      .then(() => {
        // Si llegamos aquí, la conexión funciona, intentemos crear la tabla
        return supabase.rpc('exec_sql', {
          sql: `
            CREATE TABLE IF NOT EXISTS blog_posts (
              id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
              title TEXT NOT NULL,
              content TEXT NOT NULL,
              excerpt TEXT,
              published BOOLEAN DEFAULT false,
              created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
              updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
          `
        });
      });

    if (blogTableError) {
      console.log('⚠️ No se pudo crear la tabla blog_posts automáticamente');
      console.log('   Esto es normal si no tienes permisos de administrador');
      console.log('   La tabla se creará cuando ejecutes el SQL manualmente');
    } else {
      console.log('✅ Tabla blog_posts creada/verificada');
    }

    // 2. Crear tabla system_config
    console.log('⚙️ Creando tabla system_config...');
    const { error: configTableError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS system_config (
          id INTEGER PRIMARY KEY DEFAULT 1,
          config JSONB NOT NULL DEFAULT '{}',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (configTableError) {
      console.log('⚠️ No se pudo crear la tabla system_config automáticamente');
      console.log('   Esto es normal si no tienes permisos de administrador');
      console.log('   La tabla se creará cuando ejecutes el SQL manualmente');
    } else {
      console.log('✅ Tabla system_config creada/verificada');
    }

    // 3. Intentar insertar configuración inicial del sistema
    console.log('⚙️ Insertando configuración inicial del sistema...');
    const { error: configInsertError } = await supabase
      .from('system_config')
      .upsert({
        id: 1,
        config: {
          site_name: 'Gravito Website',
          site_description: 'Sitio web profesional de Gravito',
          contact_email: 'contacto@gravito.com',
          maintenance_mode: false,
          analytics_enabled: true,
        },
        updated_at: new Date().toISOString(),
      });

    if (configInsertError) {
      console.log('⚠️ No se pudo insertar la configuración inicial');
      console.log('   Esto es normal si la tabla no existe aún');
      console.log('   La configuración se insertará cuando la tabla esté disponible');
    } else {
      console.log('✅ Configuración inicial del sistema insertada');
    }

    // 4. Intentar insertar posts de ejemplo del blog
    console.log('📝 Insertando posts de ejemplo del blog...');
    const { error: blogInsertError } = await supabase
      .from('blog_posts')
      .upsert([
        {
          title: 'Bienvenido a Gravito',
          content: 'Este es el primer post de nuestro blog. Aquí compartiremos noticias, actualizaciones y contenido relevante sobre nuestros servicios.',
          excerpt: 'Bienvenida al blog oficial de Gravito',
          published: true,
        },
        {
          title: 'Nuestros Servicios',
          content: 'Descubre todos los servicios que ofrecemos en Gravito. Desde desarrollo web hasta estrategia digital, estamos aquí para ayudarte.',
          excerpt: 'Conoce todos nuestros servicios profesionales',
          published: false,
        }
      ]);

    if (blogInsertError) {
      console.log('⚠️ No se pudieron insertar los posts de ejemplo');
      console.log('   Esto es normal si la tabla no existe aún');
      console.log('   Los posts se insertarán cuando la tabla esté disponible');
    } else {
      console.log('✅ Posts de ejemplo del blog insertados');
    }

    // 5. Verificar las tablas existentes
    console.log('\n🔍 Verificando tablas existentes...');
    
    const { data: blogPosts, error: blogCheckError } = await supabase
      .from('blog_posts')
      .select('*');

    if (blogCheckError) {
      console.log('⚠️ Tabla blog_posts no disponible aún');
    } else {
      console.log(`✅ blog_posts: ${blogPosts?.length || 0} posts encontrados`);
    }

    const { data: systemConfig, error: configCheckError } = await supabase
      .from('system_config')
      .select('*');

    if (configCheckError) {
      console.log('⚠️ Tabla system_config no disponible aún');
    } else {
      console.log(`✅ system_config: ${systemConfig?.length || 0} configuraciones encontradas`);
    }

    // 6. Crear archivo SQL para configuración manual
    console.log('\n📄 Creando archivo SQL para configuración manual...');
    const sqlContent = `
-- Configuración de Blog y Sistema para Gravito Website
-- Ejecuta este SQL en tu panel de Supabase

-- 1. Crear tabla blog_posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Crear tabla system_config
CREATE TABLE IF NOT EXISTS system_config (
  id INTEGER PRIMARY KEY DEFAULT 1,
  config JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Configurar RLS para blog_posts
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Admin users can manage blog posts" ON blog_posts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
    )
  );

-- 4. Configurar RLS para system_config
ALTER TABLE system_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Admin users can manage system config" ON system_config
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
    )
  );

-- 5. Insertar configuración inicial del sistema
INSERT INTO system_config (id, config, updated_at) VALUES (
  1,
  '{
    "site_name": "Gravito Website",
    "site_description": "Sitio web profesional de Gravito",
    "contact_email": "contacto@gravito.com",
    "maintenance_mode": false,
    "analytics_enabled": true
  }',
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  config = EXCLUDED.config,
  updated_at = EXCLUDED.updated_at;

-- 6. Insertar posts de ejemplo del blog
INSERT INTO blog_posts (title, content, excerpt, published) VALUES
  ('Bienvenido a Gravito', 'Este es el primer post de nuestro blog. Aquí compartiremos noticias, actualizaciones y contenido relevante sobre nuestros servicios.', 'Bienvenida al blog oficial de Gravito', true),
  ('Nuestros Servicios', 'Descubre todos los servicios que ofrecemos en Gravito. Desde desarrollo web hasta estrategia digital, estamos aquí para ayudarte.', 'Conoce todos nuestros servicios profesionales', false)
ON CONFLICT DO NOTHING;
`;

    fs.writeFileSync('setup-blog-and-config.sql', sqlContent);
    console.log('✅ Archivo setup-blog-and-config.sql creado');

    console.log('\n🎉 Script de configuración completado!');
    console.log('\n📋 Próximos pasos:');
    console.log('  1. Ve a tu panel de Supabase');
    console.log('  2. Abre el SQL Editor');
    console.log('  3. Copia y pega el contenido del archivo setup-blog-and-config.sql');
    console.log('  4. Ejecuta el SQL');
    console.log('  5. ¡Listo! Las nuevas funcionalidades estarán disponibles');
    console.log('\n🚀 Después de ejecutar el SQL, podrás usar:');
    console.log('  ✅ Editor visual para páginas');
    console.log('  ✅ Gestión completa del blog');
    console.log('  ✅ Configuración del sistema');

  } catch (error) {
    console.error('❌ Error inesperado:', error);
    process.exit(1);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  setupBlogAndConfig();
}

module.exports = { setupBlogAndConfig };
