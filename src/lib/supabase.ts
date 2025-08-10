import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://expqwtvlinsudlbpjldf.supabase.co'
const supabaseAnonKey = 'sb_publishable_tML1Lcese9dSNerDU9Tuag_YQ82Vlqw'

// Configuración mejorada de Supabase con retry y mejor manejo de errores
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  },
  global: {
    headers: {
      'X-Client-Info': 'gravito-website'
    }
  }
})

// Función de retry para operaciones de Supabase
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: any;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      // Retry attempt failed
      
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }
  }
  
  throw lastError;
}

// Función para verificar conectividad
export async function checkSupabaseConnection(): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('page_content')
      .select('count')
      .limit(1);
    
    return !error;
  } catch {
    return false;
  }
}

// Función para obtener datos con retry automático
export async function fetchWithRetry<T>(
  query: () => Promise<{ data: T | null; error: any }>,
  maxRetries: number = 3
): Promise<{ data: T | null; error: any }> {
  return withRetry(async () => {
    const result = await query();
    if (result.error) {
      throw result.error;
    }
    return result;
  }, maxRetries);
}

// Tipos para TypeScript
export interface AdminUser {
  id: string
  email: string
  role: 'admin'
  created_at: string
  updated_at: string
}

export interface PageContent {
  id: string
  page_name: string
  content: any // Puede ser string, objeto JSON, o cualquier tipo
  created_at: string
  updated_at: string
  updated_by?: string // Opcional según el diagnóstico
}

