#!/usr/bin/env node

/**
 * 🔧 CONFIGURADOR DE DATOS REALES CORREGIDO - GRAVITO WEBSITE
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://expqwtvlinsudlbpjldf.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY no está configurada');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// 📝 DATOS REALES DE GRAVITO - CORREGIDOS PARA LA ESTRUCTURA ACTUAL
const REAL_PAGE_CONTENT = [
  {
    page_name: 'Inicio',
    content: `# Gravito Media Solutions

## Transformamos tu presencia digital

Somos una agencia de marketing digital especializada en crear estrategias personalizadas que generan resultados reales para tu negocio.

### Nuestros Servicios

- **Marketing Digital**: Estrategias integrales de marketing online
- **Diseño Web**: Sitios web modernos y responsivos
- **SEO**: Optimización para motores de búsqueda
- **Publicidad Digital**: Campañas publicitarias efectivas
- **Redes Sociales**: Gestión profesional de redes sociales

### ¿Por qué elegirnos?

- Más de 5 años de experiencia
- Resultados medibles y comprobables
- Atención personalizada
- Tecnología de vanguardia
- Soporte continuo

[Contacta con nosotros](#contacto) para comenzar a transformar tu presencia digital.`,
    updated_by: 'admin@gravito.com'
  },
  {
    page_name: 'Servicios',
    content: `# Nuestros Servicios

## Soluciones integrales de marketing digital

### Marketing Digital
Desarrollamos estrategias personalizadas que se adaptan a las necesidades específicas de tu negocio, utilizando las últimas tendencias y tecnologías del mercado.

### Diseño Web
Creamos sitios web modernos, responsivos y optimizados para conversión, que reflejan la identidad de tu marca y proporcionan una excelente experiencia de usuario.

### SEO (Optimización para Motores de Búsqueda)
Mejoramos la visibilidad de tu sitio web en los motores de búsqueda, aumentando el tráfico orgánico y las conversiones.

### Publicidad Digital
Gestionamos campañas publicitarias en Google Ads, Facebook Ads e Instagram Ads, maximizando el retorno de inversión.

### Gestión de Redes Sociales
Desarrollamos contenido atractivo y gestionamos tus redes sociales para aumentar el engagement y la presencia de tu marca.

### Análisis y Reportes
Proporcionamos reportes detallados y análisis de rendimiento para que puedas tomar decisiones informadas sobre tu estrategia digital.`,
    updated_by: 'admin@gravito.com'
  },
  {
    page_name: 'Nosotros',
    content: `# Sobre Gravito Media Solutions

## Nuestra Historia

Gravito Media Solutions nació de la pasión por el marketing digital y la tecnología. Desde nuestros inicios, nos hemos dedicado a ayudar a empresas de todos los tamaños a alcanzar su máximo potencial en el mundo digital.

## Nuestra Misión

Transformar la presencia digital de nuestros clientes a través de estrategias innovadoras y resultados medibles, contribuyendo al crecimiento y éxito de sus negocios.

## Nuestros Valores

- **Innovación**: Siempre buscamos las mejores prácticas y tecnologías
- **Transparencia**: Comunicación clara y honesta con nuestros clientes
- **Resultados**: Nos enfocamos en generar valor real y medible
- **Excelencia**: Calidad en cada proyecto que emprendemos
- **Colaboración**: Trabajamos en equipo con nuestros clientes

## Nuestro Equipo

Contamos con un equipo de profesionales apasionados por el marketing digital, con amplia experiencia en diferentes industrias y tecnologías.

## Experiencia

- Más de 50 proyectos exitosos
- Clientes en múltiples industrias
- Resultados comprobables y medibles
- Tecnologías de vanguardia`,
    updated_by: 'admin@gravito.com'
  },
  {
    page_name: 'Contacto',
    content: `# Contáctanos

## ¿Listo para transformar tu presencia digital?

Estamos aquí para ayudarte a alcanzar tus objetivos de marketing digital. Contáctanos y descubre cómo podemos hacer crecer tu negocio.

### Información de Contacto

- **Email**: info@gravitoms.com
- **Teléfono**: +52 (55) 1234-5678
- **Horario**: Lunes a Viernes, 9:00 AM - 6:00 PM

### Ubicación

Ciudad de México, México

### Redes Sociales

- Instagram: @gravitoms
- Facebook: Gravito Media Solutions
- LinkedIn: Gravito Media Solutions

### Formulario de Contacto

Completa el formulario y nos pondremos en contacto contigo en menos de 24 horas.

### ¿Por qué contactarnos?

- Consulta gratuita
- Análisis personalizado de tu negocio
- Propuesta a medida
- Seguimiento continuo
- Resultados garantizados`,
    updated_by: 'admin@gravito.com'
  }
];

/**
 * Actualizar contenido de páginas existentes
 */
async function updatePageContent() {
  try {
    console.log('📄 Actualizando contenido de páginas...');
    
    for (const page of REAL_PAGE_CONTENT) {
      const { error } = await supabase
        .from('page_content')
        .update({
          content: page.content,
          updated_by: page.updated_by,
          updated_at: new Date().toISOString()
        })
        .eq('page_name', page.page_name);

      if (error) {
        console.log(`⚠️  Error actualizando ${page.page_name}:`, error.message);
      } else {
        console.log(`✅ ${page.page_name} actualizada`);
      }
    }

    console.log('✅ Contenido de páginas actualizado');
  } catch (error) {
    console.error('❌ Error actualizando páginas:', error.message);
  }
}

/**
 * Verificar estado actual
 */
async function checkCurrentStatus() {
  try {
    console.log('🔍 Verificando estado actual...\n');
    
    // Verificar usuarios admin
    const { data: adminUsers } = await supabase
      .from('admin_users')
      .select('*');
    
    console.log('👥 Usuarios administradores:');
    adminUsers?.forEach(user => {
      console.log(`   - ${user.email} (${user.role})`);
    });

    // Verificar páginas
    const { data: pages } = await supabase
      .from('page_content')
      .select('*');
    
    console.log('\n📄 Páginas disponibles:');
    pages?.forEach(page => {
      console.log(`   - ${page.page_name} (actualizada: ${new Date(page.updated_at).toLocaleDateString()})`);
    });

    // Verificar posts del blog
    const { data: blogPosts } = await supabase
      .from('blog_posts')
      .select('*');
    
    console.log(`\n📝 Posts del blog: ${blogPosts?.length || 0} posts`);

  } catch (error) {
    console.error('❌ Error verificando estado:', error.message);
  }
}

/**
 * Función principal
 */
async function main() {
  console.log('🔧 CONFIGURANDO DATOS REALES DE GRAVITO (CORREGIDO)...\n');
  
  try {
    await checkCurrentStatus();
    console.log('\n' + '='.repeat(50) + '\n');
    await updatePageContent();
    
    console.log('\n✅ CONFIGURACIÓN COMPLETADA');
    console.log('🎉 El sistema está listo con datos reales');
    console.log('\n📋 Credenciales de acceso:');
    console.log('   Email: admin@gravito.com');
    console.log('   Password: AdminGravito2025!');
    console.log('\n   O');
    console.log('   Email: admin1@gravitoms.com');
    console.log('   Password: AdminGravito2025!');
    
  } catch (error) {
    console.error('\n❌ Error en la configuración:', error.message);
    process.exit(1);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  main();
}

module.exports = {
  updatePageContent,
  checkCurrentStatus
};


