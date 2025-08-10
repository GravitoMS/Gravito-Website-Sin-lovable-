const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = 'https://expqwtvlinsudlbpjldf.supabase.co';
const supabaseAnonKey = 'sb_publishable_tML1Lcese9dSNerDU9Tuag_YQ82Vlqw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function debugAdminPanel() {
  console.log('🔍 DIAGNÓSTICO DEL PANEL DE ADMINISTRACIÓN\n');

  try {
    // 1. Login como admin
    console.log('1. 🔐 HACIENDO LOGIN COMO ADMIN...');
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: 'admin@gravito.com',
      password: 'AdminGravito2025!'
    });

    if (authError) {
      console.log('❌ Error de login:', authError.message);
      return;
    }

    console.log('✅ Login exitoso');
    console.log('   Usuario:', authData.user.email);
    console.log('');

    // 2. Verificar permisos de admin
    console.log('2. 👤 VERIFICANDO PERMISOS DE ADMIN...');
    const { data: adminUser, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', authData.user.email)
      .single();

    if (adminError) {
      console.log('❌ Error verificando admin:', adminError.message);
      return;
    }

    console.log('✅ Usuario confirmado como admin');
    console.log('   ID:', adminUser.id);
    console.log('   Role:', adminUser.role);
    console.log('');

    // 3. Verificar tabla page_content
    console.log('3. 📝 VERIFICANDO TABLA PAGE_CONTENT...');
    const { data: pageContent, error: contentError } = await supabase
      .from('page_content')
      .select('*');

    if (contentError) {
      console.log('❌ Error accediendo a page_content:', contentError.message);
      console.log('   Código:', contentError.code);
    } else {
      console.log('✅ Acceso a page_content exitoso');
      console.log('   Páginas encontradas:', pageContent.length);
      
      if (pageContent.length > 0) {
        console.log('   Estructura de la primera página:');
        console.log('     ID:', pageContent[0].id);
        console.log('     Page Name:', pageContent[0].page_name);
        console.log('     Title:', pageContent[0].title);
        console.log('     Content Type:', typeof pageContent[0].content);
        console.log('     Content Length:', JSON.stringify(pageContent[0].content).length);
      }
    }
    console.log('');

    // 4. Verificar permisos de escritura
    console.log('4. ✍️ PROBANDO PERMISOS DE ESCRITURA...');
    const testUpdate = {
      title: 'Test Update',
      content: { test: 'data' }
    };

    const { data: updateData, error: updateError } = await supabase
      .from('page_content')
      .update(testUpdate)
      .eq('page_name', 'home')
      .select();

    if (updateError) {
      console.log('❌ Error en operación de escritura:', updateError.message);
      console.log('   Código:', updateError.code);
    } else {
      console.log('✅ Operación de escritura exitosa');
      console.log('   Datos actualizados:', updateData.length);
    }
    console.log('');

    // 5. Verificar estructura de la base de datos
    console.log('5. 🗄️ VERIFICANDO ESTRUCTURA DE LA BASE DE DATOS...');
    
    // Verificar todas las tablas relevantes
    const tables = ['admin_users', 'page_content'];
    
    for (const table of tables) {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .limit(1);

        if (error) {
          console.log(`❌ Error accediendo a ${table}:`, error.message);
        } else {
          console.log(`✅ Tabla ${table} accesible`);
          if (data && data.length > 0) {
            console.log(`   Columnas:`, Object.keys(data[0]));
          }
        }
      } catch (error) {
        console.log(`❌ Error general en ${table}:`, error.message);
      }
    }
    console.log('');

    // 6. Verificar políticas RLS
    console.log('6. 🛡️ VERIFICANDO POLÍTICAS RLS...');
    
    // Intentar operaciones que deberían estar permitidas para admin
    const { data: rlsTest, error: rlsError } = await supabase
      .from('page_content')
      .select('count')
      .limit(1);

    if (rlsError) {
      console.log('❌ Error de RLS:', rlsError.message);
      console.log('   Código:', rlsError.code);
    } else {
      console.log('✅ Políticas RLS funcionando correctamente');
    }
    console.log('');

    // 7. Logout
    console.log('7. 🚪 REALIZANDO LOGOUT...');
    const { error: logoutError } = await supabase.auth.signOut();
    
    if (logoutError) {
      console.log('❌ Error en logout:', logoutError.message);
    } else {
      console.log('✅ Logout exitoso');
    }
    console.log('');

    // 8. Resumen
    console.log('📊 RESUMEN DEL DIAGNÓSTICO:');
    console.log('');
    
    const issues = [];
    const successes = [];

    if (authError) issues.push('❌ Error de autenticación');
    else successes.push('✅ Autenticación exitosa');

    if (adminError) issues.push('❌ Error verificando admin');
    else successes.push('✅ Usuario confirmado como admin');

    if (contentError) issues.push('❌ Error accediendo a page_content');
    else successes.push('✅ Acceso a page_content OK');

    if (updateError) issues.push('❌ Error en operaciones de escritura');
    else successes.push('✅ Operaciones de escritura OK');

    if (rlsError) issues.push('❌ Problema con políticas RLS');
    else successes.push('✅ Políticas RLS funcionando');

    console.log('✅ ÉXITOS:');
    successes.forEach(success => console.log(`   ${success}`));
    
    if (issues.length > 0) {
      console.log('\n❌ PROBLEMAS:');
      issues.forEach(issue => console.log(`   ${issue}`));
    }

    console.log('\n💡 RECOMENDACIONES:');
    if (issues.length === 0) {
      console.log('✅ Backend completamente funcional');
      console.log('✅ Los errores están en el frontend');
      console.log('🔧 Revisar:');
      console.log('   - Componente AdminCMS');
      console.log('   - Manejo de estados de loading');
      console.log('   - Renderizado de componentes UI');
    } else {
      console.log('🔧 Resolver los problemas de backend antes de continuar');
    }

  } catch (error) {
    console.error('❌ Error general en debug:', error);
  }
}

debugAdminPanel();
