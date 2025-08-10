#!/usr/bin/env node

/**
 * 🔍 DEBUG LOGIN - GRAVITO WEBSITE
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://expqwtvlinsudlbpjldf.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY no está configurada');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function debugLogin() {
  console.log('🔍 Debuggeando proceso de login...\n');

  const email = 'admin@gravito.com';
  const password = 'AdminGravito2025!';

  try {
    console.log('1. Verificando usuario en Supabase Auth...');
    
    // Listar usuarios en Auth
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      console.error('❌ Error listando usuarios:', authError.message);
    } else {
      const adminUser = authUsers.users.find(u => u.email === email);
      if (adminUser) {
        console.log('✅ Usuario encontrado en Auth:');
        console.log(`   ID: ${adminUser.id}`);
        console.log(`   Email: ${adminUser.email}`);
        console.log(`   Confirmado: ${adminUser.email_confirmed_at ? 'Sí' : 'No'}`);
        console.log(`   Último sign in: ${adminUser.last_sign_in_at || 'Nunca'}`);
      } else {
        console.log('❌ Usuario no encontrado en Auth');
      }
    }

    console.log('\n2. Verificando usuario en tabla admin_users...');
    
    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .single();

    if (adminError) {
      console.error('❌ Error verificando admin_users:', adminError.message);
    } else {
      console.log('✅ Usuario encontrado en admin_users:');
      console.log(`   ID: ${adminData.id}`);
      console.log(`   Email: ${adminData.email}`);
      console.log(`   Role: ${adminData.role}`);
    }

    console.log('\n3. Intentando login con signInWithPassword...');
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('❌ Error en signInWithPassword:', error.message);
      console.error('   Código:', error.status);
    } else {
      console.log('✅ Login exitoso:');
      console.log(`   User ID: ${data.user.id}`);
      console.log(`   Email: ${data.user.email}`);
      console.log(`   Session: ${data.session ? 'Creada' : 'No creada'}`);
    }

    console.log('\n4. Verificando sesión actual...');
    
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      console.log('✅ Sesión activa:');
      console.log(`   User ID: ${session.user.id}`);
      console.log(`   Email: ${session.user.email}`);
      console.log(`   Expires: ${session.expires_at}`);
    } else {
      console.log('❌ No hay sesión activa');
    }

  } catch (error) {
    console.error('❌ Error inesperado:', error.message);
  }
}

debugLogin();

