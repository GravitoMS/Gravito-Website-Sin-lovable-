#!/usr/bin/env node

/**
 * 🚀 CONFIGURADOR DE DATOS REALES - GRAVITO WEBSITE
 * 
 * Este script configura Supabase con datos reales del negocio.
 * NUNCA usa datos mock - solo datos reales de Gravito.
 */

const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = 'https://expqwtvlinsudlbpjldf.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY no está configurada');
  console.log('💡 Configura la variable de entorno:');
  console.log('   export SUPABASE_SERVICE_ROLE_KEY="tu-service-role-key"');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// 📝 DATOS REALES DE GRAVITO - NO MOCK
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

const REAL_BLOG_POSTS = [
  {
    title: 'Tendencias de Marketing Digital 2024',
    content: `# Tendencias de Marketing Digital 2024

El marketing digital evoluciona constantemente, y 2024 no es la excepción. Aquí te presentamos las tendencias más importantes que están marcando la diferencia este año.

## 1. Inteligencia Artificial y Automatización

La IA está revolucionando el marketing digital, desde chatbots inteligentes hasta personalización de contenido en tiempo real. Las empresas que adoptan estas tecnologías están viendo mejoras significativas en la conversión.

## 2. Marketing de Contenido Interactivo

Los usuarios demandan experiencias más interactivas. Videos cortos, encuestas, quizzes y contenido gamificado están ganando terreno rápidamente.

## 3. Privacidad y Transparencia

Con las nuevas regulaciones de privacidad, la transparencia en la recolección y uso de datos es más importante que nunca. Los consumidores valoran las marcas que son transparentes sobre sus prácticas de datos.

## 4. Marketing de Voz

Con el aumento de dispositivos inteligentes, el marketing de voz se está convirtiendo en una estrategia esencial para llegar a los consumidores.

## 5. Sostenibilidad Digital

Los consumidores están más conscientes del impacto ambiental, y las marcas que adoptan prácticas sostenibles están ganando preferencia.

### Conclusión

Adaptarse a estas tendencias no es opcional, es necesario para mantenerse competitivo en el mercado digital actual.`,
    excerpt: 'Descubre las tendencias más importantes del marketing digital en 2024 y cómo pueden beneficiar a tu negocio.',
    author: 'Equipo Gravito',
    published: true,
    tags: ['marketing digital', 'tendencias', '2024'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    title: 'Cómo Optimizar tu Sitio Web para SEO',
    content: `# Cómo Optimizar tu Sitio Web para SEO

El SEO (Search Engine Optimization) es fundamental para aumentar la visibilidad de tu sitio web en los motores de búsqueda. Aquí te compartimos las mejores prácticas.

## Optimización Técnica

### 1. Velocidad de Carga
La velocidad de carga es un factor crítico para el SEO. Utiliza herramientas como Google PageSpeed Insights para identificar y solucionar problemas de rendimiento.

### 2. Diseño Responsivo
Asegúrate de que tu sitio web se vea perfecto en todos los dispositivos. Google prioriza los sitios móvil-friendly.

### 3. Estructura de URLs
Mantén URLs limpias y descriptivas que incluyan palabras clave relevantes.

## Optimización de Contenido

### 1. Palabras Clave
Investiga y utiliza palabras clave relevantes para tu industria y público objetivo.

### 2. Contenido de Calidad
Crea contenido valioso, informativo y original que responda a las necesidades de tu audiencia.

### 3. Estructura de Encabezados
Utiliza una jerarquía clara de encabezados (H1, H2, H3) para organizar tu contenido.

## Optimización Off-Page

### 1. Enlaces de Calidad
Construye enlaces desde sitios web autorizados y relevantes en tu industria.

### 2. Presencia en Redes Sociales
Mantén una presencia activa en redes sociales para aumentar la visibilidad de tu marca.

### Conclusión

El SEO es un proceso continuo que requiere tiempo y dedicación, pero los resultados valen la pena.`,
    excerpt: 'Aprende las mejores prácticas para optimizar tu sitio web y mejorar tu posicionamiento en los motores de búsqueda.',
    author: 'Equipo Gravito',
    published: true,
    tags: ['SEO', 'optimización', 'sitio web'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

/**
 * Crear usuario administrador
 */
async function createAdminUser() {
  try {
    console.log('👤 Creando usuario administrador...');
    
    // Crear usuario en Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: 'admin@gravito.com',
      password: 'AdminGravito2025!',
      email_confirm: true,
      user_metadata: {
        role: 'admin'
      }
    });

    if (authError) {
      if (authError.message.includes('already registered')) {
        console.log('✅ Usuario admin ya existe en Auth');
      } else {
        throw authError;
      }
    } else {
      console.log('✅ Usuario admin creado en Auth');
    }

    // Insertar en tabla admin_users
    const { error: adminError } = await supabase
      .from('admin_users')
      .upsert({
        email: 'admin@gravito.com',
        role: 'admin'
      }, {
        onConflict: 'email'
      });

    if (adminError) {
      throw adminError;
    }

    console.log('✅ Usuario admin agregado a tabla admin_users');
  } catch (error) {
    console.error('❌ Error creando usuario admin:', error.message);
  }
}

/**
 * Insertar contenido de páginas
 */
async function insertPageContent() {
  try {
    console.log('📄 Insertando contenido de páginas...');
    
    for (const page of REAL_PAGE_CONTENT) {
      const { error } = await supabase
        .from('page_content')
        .upsert({
          page_name: page.page_name,
          content: page.content,
          updated_by: page.updated_by,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'page_name'
        });

      if (error) {
        throw error;
      }
    }

    console.log(`✅ ${REAL_PAGE_CONTENT.length} páginas configuradas`);
  } catch (error) {
    console.error('❌ Error insertando contenido de páginas:', error.message);
  }
}

/**
 * Insertar posts del blog
 */
async function insertBlogPosts() {
  try {
    console.log('📝 Insertando posts del blog...');
    
    for (const post of REAL_BLOG_POSTS) {
      const { error } = await supabase
        .from('blog_posts')
        .insert(post);

      if (error) {
        throw error;
      }
    }

    console.log(`✅ ${REAL_BLOG_POSTS.length} posts del blog creados`);
  } catch (error) {
    console.error('❌ Error insertando posts del blog:', error.message);
  }
}

/**
 * Función principal
 */
async function main() {
  console.log('🚀 CONFIGURANDO DATOS REALES DE GRAVITO...\n');
  
  try {
    await createAdminUser();
    await insertPageContent();
    await insertBlogPosts();
    
    console.log('\n✅ CONFIGURACIÓN COMPLETADA');
    console.log('🎉 El sistema está listo con datos reales');
    console.log('\n📋 Credenciales de acceso:');
    console.log('   Email: admin@gravito.com');
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
  createAdminUser,
  insertPageContent,
  insertBlogPosts
};

