import { useState, useEffect, useCallback } from 'react';
import { checkSupabaseConnection } from '@/lib/supabase';

export interface ConnectionStatus {
  isConnected: boolean;
  isChecking: boolean;
  lastCheck: Date | null;
  error: string | null;
  retryCount: number;
}

export function useConnectionStatus() {
  const [status, setStatus] = useState<ConnectionStatus>({
    isConnected: true, // Asumir conectado inicialmente
    isChecking: false,
    lastCheck: null,
    error: null,
    retryCount: 0
  });

  const checkConnection = useCallback(async () => {
    setStatus(prev => ({ ...prev, isChecking: true, error: null }));
    
    try {
      const isConnected = await checkSupabaseConnection();
      
      setStatus(prev => ({
        ...prev,
        isConnected,
        isChecking: false,
        lastCheck: new Date(),
        error: isConnected ? null : 'No se pudo conectar con Supabase',
        retryCount: isConnected ? 0 : prev.retryCount + 1
      }));
    } catch (error) {
      setStatus(prev => ({
        ...prev,
        isConnected: false,
        isChecking: false,
        lastCheck: new Date(),
        error: error instanceof Error ? error.message : 'Error desconocido',
        retryCount: prev.retryCount + 1
      }));
    }
  }, []);

  // Verificar conexión al montar el hook
  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  // Verificar conexión periódicamente
  useEffect(() => {
    const interval = setInterval(() => {
      if (!status.isConnected) {
        checkConnection();
      }
    }, 30000); // Verificar cada 30 segundos si no está conectado

    return () => clearInterval(interval);
  }, [status.isConnected, checkConnection]);

  // Verificar conexión cuando la ventana recupera el foco
  useEffect(() => {
    const handleFocus = () => {
      if (!status.isConnected) {
        checkConnection();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [status.isConnected, checkConnection]);

  return {
    ...status,
    checkConnection,
    retry: checkConnection
  };
}
