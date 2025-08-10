const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = 'https://expqwtvlinsudlbpjldf.supabase.co';
const supabaseAnonKey = 'sb_publishable_tML1Lcese9dSNerDU9Tuag_YQ82Vlqw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function debugAdminAccess() {
  console.log('🔍 DEBUG DE ACCESO AL ADMIN\n');

  try {
    // 1. Verificar estado inicial
    console.log('1. 🔍 VERIFICANDO ESTADO INICIAL...');
    const { data: { session: initialSession } } = await supabase.auth.getSession();
    
    if (initialSession) {
      console.log('✅ Sesión activa encontrada');
      console.log('   Usuario:', initialSession.user.email);
      console.log('   ID:', initialSession.user.id);
    } else {
      console.log('ℹ️ No hay sesión activa');
    }
    console.log('');

    // 2. Probar login completo
    console.log('2. 🔐 PROBANDO LOGIN COMPLETO...');
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
    console.log('   ID:', authData.user.id);
    console.log('');

    // 3. Verificar sesión después del login
    console.log('3. 🔍 VERIFICANDO SESIÓN DESPUÉS DEL LOGIN...');
    const { data: { session: newSession } } = await supabase.auth.getSession();
    
    if (newSession) {
      console.log('✅ Sesión activa después del login');
      console.log('   Usuario:', newSession.user.email);
      console.log('   ID:', newSession.user.id);
    } else {
      console.log('❌ No hay sesión después del login');
    }
    console.log('');

    // 4. Verificar usuario en tabla admin_users
    console.log('4. 👤 VERIFICANDO USUARIO EN TABLA ADMIN_USERS...');
    const { data: adminUser, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', authData.user.email)
      .single();

    if (adminError) {
      console.log('❌ Error obteniendo usuario admin:', adminError.message);
      console.log('   Código:', adminError.code);
    } else {
      console.log('✅ Usuario encontrado en tabla admin_users');
      console.log('   ID:', adminUser.id);
      console.log('   Email:', adminUser.email);
      console.log('   Role:', adminUser.role);
    }
    console.log('');

    // 5. Verificar políticas RLS
    console.log('5. 🛡️ VERIFICANDO POLÍTICAS RLS...');
    
    // Intentar leer desde admin_users
    const { data: adminUsers, error: rlsError } = await supabase
      .from('admin_users')
      .select('*');

    if (rlsError) {
      console.log('❌ Error de RLS al leer admin_users:', rlsError.message);
      console.log('   Código:', rlsError.code);
    } else {
      console.log('✅ Políticas RLS funcionando correctamente');
      console.log('   Usuarios admin encontrados:', adminUsers.length);
    }
    console.log('');

    // 6. Verificar acceso a page_content
    console.log('6. 📝 VERIFICANDO ACCESO A PAGE_CONTENT...');
    const { data: pageContent, error: contentError } = await supabase
      .from('page_content')
      .select('*')
      .limit(1);

    if (contentError) {
      console.log('❌ Error accediendo a page_content:', contentError.message);
      console.log('   Código:', contentError.code);
    } else {
      console.log('✅ Acceso a page_content exitoso');
      console.log('   Páginas disponibles:', pageContent.length);
    }
    console.log('');

    // 7. Simular operación de escritura
    console.log('7. ✍️ PROBANDO OPERACIÓN DE ESCRITURA...');
    const testContent = {
      title: 'Test',
      content: 'Test content'
    };

    const { data: insertData, error: insertError } = await supabase
      .from('page_content')
      .update({ content: testContent })
      .eq('page_name', 'home')
      .select();

    if (insertError) {
      console.log('❌ Error en operación de escritura:', insertError.message);
      console.log('   Código:', insertError.code);
    } else {
      console.log('✅ Operación de escritura exitosa');
      console.log('   Datos actualizados:', insertData.length);
    }
    console.log('');

    // 8. Verificar permisos de usuario
    console.log('8. 🔑 VERIFICANDO PERMISOS DE USUARIO...');
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      console.log('✅ Usuario autenticado');
      console.log('   Email:', user.email);
      console.log('   Email confirmado:', user.email_confirmed_at ? 'Sí' : 'No');
      console.log('   Último sign in:', user.last_sign_in_at);
      console.log('   Metadata:', user.user_metadata);
    } else {
      console.log('❌ No se pudo obtener información del usuario');
    }
    console.log('');

    // 9. Logout para limpiar
    console.log('9. 🚪 REALIZANDO LOGOUT...');
    const { error: logoutError } = await supabase.auth.signOut();
    
    if (logoutError) {
      console.log('❌ Error en logout:', logoutError.message);
    } else {
      console.log('✅ Logout exitoso');
    }
    console.log('');

    // 10. Resumen y diagnóstico
    console.log('📊 RESUMEN DEL DIAGNÓSTICO:');
    console.log('');
    
    const issues = [];
    const successes = [];

    if (authError) issues.push('❌ Error de autenticación');
    else successes.push('✅ Autenticación exitosa');

    if (adminError) issues.push('❌ Usuario no encontrado en admin_users');
    else successes.push('✅ Usuario confirmado como admin');

    if (rlsError) issues.push('❌ Problema con políticas RLS');
    else successes.push('✅ Políticas RLS funcionando');

    if (contentError) issues.push('❌ Error accediendo a page_content');
    else successes.push('✅ Acceso a page_content OK');

    if (insertError) issues.push('❌ Error en operaciones de escritura');
    else successes.push('✅ Operaciones de escritura OK');

    console.log('✅ ÉXITOS:');
    successes.forEach(success => console.log(`   ${success}`));
    
    if (issues.length > 0) {
      console.log('\n❌ PROBLEMAS:');
      issues.forEach(issue => console.log(`   ${issue}`));
    }

    console.log('\n💡 RECOMENDACIONES:');
    
    if (issues.length === 0) {
      console.log('✅ Sistema completamente funcional');
      console.log('✅ El problema puede estar en el frontend');
      console.log('🔧 Verificar:');
      console.log('   - Estado del AuthContext');
      console.log('   - Componente Admin.tsx');
      console.log('   - Redirecciones de React Router');
    } else {
      console.log('🔧 Resolver los problemas identificados antes de continuar');
    }

  } catch (error) {
    console.error('❌ Error general en debug:', error);
  }
}

debugAdminAccess();
