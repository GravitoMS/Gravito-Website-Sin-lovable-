import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  isAdmin: boolean
  loading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  clearError: () => void
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

  // Refs para controlar el ciclo de vida y prevenir bucles infinitos
  const mountedRef = useRef(true)
  const initializedRef = useRef(false)

  // Función para limpiar errores
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Función para verificar estado de admin con timeout de seguridad
  const checkAdminStatus = useCallback(async (userEmail: string): Promise<boolean> => {
    if (!userEmail) return false

    try {
      console.log('🔍 Verificando admin status para:', userEmail)
      
      // Timeout de seguridad: máximo 10 segundos (aumentado)
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Timeout verificando admin status')), 10000)
      })

      const adminCheckPromise = supabase
        .from('admin_users')
        .select('email')
        .eq('email', userEmail)
        .maybeSingle()

      const result = await Promise.race([adminCheckPromise, timeoutPromise])
      
      if (result.error) {
        console.warn('⚠️ Error verificando admin:', result.error)
        return false
      }
      
      const isAdminUser = !!result.data
      console.log('✅ Admin status verificado:', isAdminUser)
      return isAdminUser
    } catch (error) {
      console.warn('⚠️ Error en checkAdminStatus:', error)
      // En caso de timeout, intentar una vez más sin timeout
      try {
        console.log('🔄 Reintentando verificación de admin sin timeout...')
        const retryResult = await supabase
          .from('admin_users')
          .select('email')
          .eq('email', userEmail)
          .maybeSingle()
        
        if (retryResult.error) {
          console.warn('⚠️ Error en reintento de admin:', retryResult.error)
          return false
        }
        
        const isAdminUser = !!retryResult.data
        console.log('✅ Admin status verificado (reintento):', isAdminUser)
        return isAdminUser
      } catch (retryError) {
        console.warn('⚠️ Error en reintento de admin:', retryError)
        return false
      }
    }
  }, [])

  // Función para actualizar estado de autenticación
  const updateAuthState = useCallback(async (session: any) => {
    if (!mountedRef.current) return

    console.log('🔄 Actualizando estado de autenticación...')
    
    if (session?.user) {
      setUser(session.user)
      const adminStatus = await checkAdminStatus(session.user.email)
      if (mountedRef.current) {
        setIsAdmin(adminStatus)
      }
    } else {
      setUser(null)
      setIsAdmin(false)
    }
    
    if (mountedRef.current) {
      setLoading(false)
      setError(null)
    }
  }, [checkAdminStatus])

  useEffect(() => {
    mountedRef.current = true
    initializedRef.current = false

    console.log('🔍 Inicializando AuthContext...')

    // Verificar sesión inicial
    const getInitialSession = async () => {
      if (initializedRef.current) return
      initializedRef.current = true

      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          console.error('❌ Error obteniendo sesión inicial:', sessionError)
          if (mountedRef.current) {
            setError('Error al verificar sesión')
            setLoading(false)
          }
          return
        }
        
        await updateAuthState(session)
      } catch (error) {
        console.error('❌ Error en getInitialSession:', error)
        if (mountedRef.current) {
          setError('Error al inicializar autenticación')
          setLoading(false)
        }
      }
    }

    getInitialSession()

    // Escuchar cambios en la autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Evento de autenticación:', event)
        
        if (!mountedRef.current) return
        
        // Evitar procesar eventos duplicados
        if (event === 'INITIAL_SESSION' && initializedRef.current) {
          console.log('⏭️ Saltando evento INITIAL_SESSION duplicado')
          return
        }
        
        await updateAuthState(session)
      }
    )

    return () => {
      mountedRef.current = false
      subscription.unsubscribe()
    }
  }, [updateAuthState])

  const signIn = async (email: string, password: string) => {
    if (!email || !password) {
      return { error: { message: 'Email y contraseña son requeridos' } }
    }

    try {
      console.log('🔐 Intentando login con:', email)
      setLoading(true)
      setError(null)
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log('📊 Respuesta de signInWithPassword:', { data, error })

      if (error) {
        console.error('❌ Error de autenticación:', error)
        setError(error.message)
        return { error }
      }

      if (data.user) {
        console.log('✅ Usuario autenticado:', data.user.email)
        
        // Verificar si es admin
        const adminStatus = await checkAdminStatus(data.user.email)
        
        if (adminStatus) {
          console.log('✅ Usuario confirmado como admin')
          if (mountedRef.current) {
            setUser(data.user)
            setIsAdmin(true)
          }
        } else {
          console.log('❌ Usuario no autorizado como admin')
          await supabase.auth.signOut()
          setError('Usuario no autorizado como administrador')
          return { error: { message: 'Usuario no autorizado como administrador' } }
        }
      }

      console.log('✅ Login completado exitosamente')
      return { error: null }
    } catch (error) {
      console.error('❌ Error inesperado en signIn:', error)
      setError('Error inesperado durante el login')
      return { error }
    } finally {
      if (mountedRef.current) {
        setLoading(false)
      }
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      if (mountedRef.current) {
        setUser(null)
        setIsAdmin(false)
        setError(null)
      }
      console.log('✅ Usuario deslogueado')
    } catch (error) {
      console.error('❌ Error en signOut:', error)
    }
  }

  const value = {
    user,
    isAdmin,
    loading,
    error,
    signIn,
    signOut,
    clearError,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook seguro para usar el contexto
export const useAuthSafe = () => {
  try {
    return useAuth()
  } catch (error) {
    console.warn('⚠️ AuthContext no disponible, usando valores por defecto')
    return {
      user: null,
      isAdmin: false,
      loading: false,
      error: null,
      signIn: async () => ({ error: { message: 'Contexto de autenticación no disponible' } }),
      signOut: async () => {},
      clearError: () => {},
    }
  }
}
