#!/usr/bin/env node

/**
 * 🔍 CHECK RLS POLICIES - GRAVITO WEBSITE
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://expqwtvlinsudlbpjldf.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY no está configurada');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkRLSPolicies() {
  console.log('🔍 Verificando acceso con anon key...\n');

  try {
    // Probar acceso con anon key
    console.log('1. Probando acceso con anon key...');
    
    const anonSupabase = createClient(supabaseUrl, 'sb_publishable_tML1Lcese9dSNerDU9Tuag_YQ82Vlqw');
    
    // Probar acceso a admin_users
    console.log('2. Probando acceso a admin_users...');
    const { data: anonAdmin, error: anonAdminError } = await anonSupabase
      .from('admin_users')
      .select('*')
      .eq('email', 'admin@gravito.com')
      .single();

    if (anonAdminError) {
      console.log('❌ Error accediendo a admin_users con anon key:', anonAdminError.message);
    } else {
      console.log('✅ Acceso exitoso a admin_users con anon key');
    }

    // Probar acceso a page_content
    console.log('3. Probando acceso a page_content...');
    const { data: anonPage, error: anonPageError } = await anonSupabase
      .from('page_content')
      .select('*')
      .limit(1);

    if (anonPageError) {
      console.log('❌ Error accediendo a page_content con anon key:', anonPageError.message);
    } else {
      console.log('✅ Acceso exitoso a page_content con anon key');
    }

    // Probar login con anon key
    console.log('4. Probando login con anon key...');
    const { data: loginData, error: loginError } = await anonSupabase.auth.signInWithPassword({
      email: 'admin@gravito.com',
      password: 'AdminGravito2025!'
    });

    if (loginError) {
      console.log('❌ Error en login con anon key:', loginError.message);
    } else {
      console.log('✅ Login exitoso con anon key');
      console.log('   User ID:', loginData.user.id);
      console.log('   Session:', loginData.session ? 'Creada' : 'No creada');
    }

  } catch (error) {
    console.error('❌ Error verificando acceso:', error.message);
  }
}

checkRLSPolicies();
