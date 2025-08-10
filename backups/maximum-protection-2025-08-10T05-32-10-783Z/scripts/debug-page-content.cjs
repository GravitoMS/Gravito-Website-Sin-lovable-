#!/usr/bin/env node

/**
 * 🔍 DEBUG PAGE CONTENT - GRAVITO WEBSITE
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://expqwtvlinsudlbpjldf.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY no está configurada');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function debugPageContent() {
  console.log('🔍 Debuggeando contenido de page_content...\n');

  try {
    const { data, error } = await supabase
      .from('page_content')
      .select('*')
      .order('page_name');

    if (error) {
      console.error('❌ Error:', error.message);
      return;
    }

    console.log(`📄 Encontrados ${data.length} registros:\n`);

    data.forEach((page, index) => {
      console.log(`${index + 1}. ${page.page_name}:`);
      console.log(`   ID: ${page.id}`);
      console.log(`   Content type: ${typeof page.content}`);
      console.log(`   Content length: ${page.content ? page.content.length : 'null/undefined'}`);
      console.log(`   Content preview: ${typeof page.content === 'string' ? page.content.substring(0, 100) + '...' : JSON.stringify(page.content).substring(0, 100) + '...'}`);
      console.log(`   Updated by: ${page.updated_by}`);
      console.log(`   Updated at: ${page.updated_at}`);
      console.log('');
    });

  } catch (error) {
    console.error('❌ Error debuggeando:', error.message);
  }
}

debugPageContent();


