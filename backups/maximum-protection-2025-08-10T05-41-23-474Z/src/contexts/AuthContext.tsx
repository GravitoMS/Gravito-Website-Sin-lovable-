import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  isAdmin: boolean
  loading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true;
    
    // Verificar sesión actual
    const getSession = async () => {
      try {
        console.log('🔍 Inicializando AuthContext...');
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          console.error('❌ Error obteniendo sesión:', sessionError);
          if (mounted) {
            setError('Error al verificar sesión');
            setLoading(false);
          }
          return;
        }
        
        if (mounted) {
          setUser(session?.user ?? null)
          
          if (session?.user) {
            console.log('👤 Usuario encontrado en sesión:', session.user.email);
            // Verificar si es admin
            try {
              const { data: adminData, error: adminError } = await supabase
                .from('admin_users')
                .select('*')
                .eq('email', session.user.email)
                .single()
              
              if (adminError) {
                console.warn('⚠️ Error verificando admin:', adminError);
                setIsAdmin(false);
              } else {
                setIsAdmin(!!adminData);
                console.log('✅ Estado admin actualizado:', !!adminData);
              }
            } catch (adminError) {
              console.warn('⚠️ Error en verificación admin:', adminError);
              setIsAdmin(false);
            }
          } else {
            setIsAdmin(false);
          }
        }
      } catch (error) {
        console.error('❌ Error verificando sesión:', error)
        if (mounted) {
          setError('Error al inicializar autenticación');
        }
      } finally {
        if (mounted) {
          setLoading(false);
          console.log('✅ AuthContext inicializado');
        }
      }
    }

    getSession()

    // Escuchar cambios en la autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Cambio de estado de autenticación:', event);
        
        if (!mounted) return;
        
        setUser(session?.user ?? null)
        
        if (session?.user) {
          try {
            const { data: adminData, error: adminError } = await supabase
              .from('admin_users')
              .select('*')
              .eq('email', session.user.email)
              .single()
            
            if (adminError) {
              console.warn('⚠️ Error verificando admin en cambio de estado:', adminError);
              setIsAdmin(false);
            } else {
              setIsAdmin(!!adminData);
              console.log('✅ Estado admin actualizado en cambio:', !!adminData);
            }
          } catch (error) {
            console.warn('⚠️ Error en verificación admin en cambio de estado:', error);
            setIsAdmin(false);
          }
        } else {
          setIsAdmin(false);
        }
        
        setLoading(false);
        setError(null);
      }
    )

    return () => {
      mounted = false;
      subscription.unsubscribe();
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔐 Intentando login con:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log('📊 Respuesta de signInWithPassword:', { data, error });

      if (error) {
        console.error('❌ Error de autenticación:', error);
        return { error }
      }

      if (data.user) {
        console.log('✅ Usuario autenticado:', data.user.email);
        
        // Verificar si es admin
        console.log('🔍 Verificando si es admin...');
        const { data: adminData, error: adminError } = await supabase
          .from('admin_users')
          .select('*')
          .eq('email', data.user.email)
          .single()

        console.log('📊 Respuesta de verificación admin:', { adminData, adminError });

        if (adminError) {
          console.error('❌ Error verificando admin:', adminError);
          return { error: { message: 'Usuario no autorizado como administrador' } }
        }

        if (adminData) {
          console.log('✅ Usuario confirmado como admin');
          setUser(data.user);
          setIsAdmin(true);
          console.log('🎯 Estados actualizados: user =', data.user, 'isAdmin =', true);
        } else {
          console.log('❌ Usuario no encontrado en tabla admin_users');
          return { error: { message: 'Usuario no autorizado como administrador' } }
        }
      }

      console.log('✅ Login completado exitosamente');
      return { error: null }
    } catch (error) {
      console.error('❌ Error inesperado en signIn:', error);
      return { error }
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setIsAdmin(false)
    console.log('✅ Usuario deslogueado')
  }

  const value = {
    user,
    isAdmin,
    loading,
    error,
    signIn,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Componente de protección para usar el contexto de forma segura
export const useAuthSafe = () => {
  try {
    return useAuth();
  } catch (error) {
    console.warn('⚠️ AuthContext no disponible, usando valores por defecto');
    return {
      user: null,
      isAdmin: false,
      loading: false,
      error: null,
      signIn: async () => ({ error: { message: 'Contexto de autenticación no disponible' } }),
      signOut: async () => {},
    };
  }
};
