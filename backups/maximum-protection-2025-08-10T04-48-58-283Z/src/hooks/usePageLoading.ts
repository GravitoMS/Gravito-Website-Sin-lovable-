import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface PageLoadingConfig {
  [key: string]: {
    minLoadingTime: number;
    resources?: string[];
    customLoadingCheck?: () => Promise<boolean>;
  };
}

// Configuración específica por página
const PAGE_LOADING_CONFIG: PageLoadingConfig = {
  '/': {
    minLoadingTime: 3000, // 3 segundos mínimo para la home
    resources: [
      'https://my.spline.design/waveform-YSe8p0A6zP9xanzxuXbn1y8l/'
    ],
    customLoadingCheck: async () => {
      // Verificar si Spline está cargado
      return new Promise((resolve) => {
        const checkSpline = () => {
          const iframe = document.querySelector('iframe[src*="spline.design"]');
          if (iframe) {
            // Verificar si el iframe está cargado
            iframe.addEventListener('load', () => resolve(true));
            iframe.addEventListener('error', () => resolve(true)); // Fallback
            // Timeout de seguridad
            setTimeout(() => resolve(true), 2000);
          } else {
            // Si no hay iframe, esperar un poco más
            setTimeout(checkSpline, 100);
          }
        };
        checkSpline();
      });
    }
  },
  '/servicios': {
    minLoadingTime: 1500, // 1.5 segundos para servicios
  },
  '/nosotros': {
    minLoadingTime: 1000, // 1 segundo para nosotros
  },
  '/blog': {
    minLoadingTime: 1000, // 1 segundo para blog
  },
  '/contacto': {
    minLoadingTime: 1000, // 1 segundo para contacto
  },
  '/estrategia': {
    minLoadingTime: 1000, // 1 segundo para estrategia
  }
};

export const usePageLoading = () => {
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const location = useLocation();
  const isInitialMount = useRef(true);

  const startPageLoading = useCallback(async () => {
    // Evitar carga en el montaje inicial
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const config = PAGE_LOADING_CONFIG[location.pathname] || { minLoadingTime: 1000 };
    
    setIsPageLoading(true);
    setLoadingProgress(0);

    const startTime = Date.now();
    
    // Función para verificar recursos
    const checkResources = async (): Promise<boolean> => {
      if (config.customLoadingCheck) {
        try {
          return await config.customLoadingCheck();
        } catch (error) {
          console.warn('Error checking custom resources:', error);
          return true;
        }
      }
      return true;
    };

    // Función para verificar recursos externos
    const checkExternalResources = async (): Promise<boolean> => {
      if (!config.resources) return true;
      
      const promises = config.resources.map((url) => {
        return new Promise<boolean>((resolve) => {
          const img = new Image();
          img.onload = () => resolve(true);
          img.onerror = () => resolve(true); // Fallback
          img.src = url;
          // Timeout de seguridad
          setTimeout(() => resolve(true), 5000);
        });
      });

      try {
        await Promise.all(promises);
        return true;
      } catch (error) {
        console.warn('Error loading external resources:', error);
        return true;
      }
    };

    // Ejecutar verificaciones en paralelo
    const [resourcesLoaded, externalLoaded] = await Promise.all([
      checkResources(),
      checkExternalResources()
    ]);

    // Calcular tiempo restante
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, config.minLoadingTime - elapsedTime);

    // Simular progreso
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newProgress = Math.min(prev + 10, 90);
        return newProgress;
      });
    }, remainingTime / 10);

    // Esperar tiempo mínimo
    await new Promise(resolve => setTimeout(resolve, remainingTime));

    // Completar carga
    clearInterval(progressInterval);
    setLoadingProgress(100);
    
    // Pequeña pausa para mostrar 100%
    await new Promise(resolve => setTimeout(resolve, 200));

    setIsPageLoading(false);
    setLoadingProgress(0);
  }, [location.pathname]);

  return {
    isPageLoading,
    loadingProgress,
    startPageLoading
  };
};
