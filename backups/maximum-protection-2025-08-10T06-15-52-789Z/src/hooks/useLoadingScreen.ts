import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const useLoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const location = useLocation();
  const prevPathname = useRef(location.pathname);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    setTimeout(() => {
      setShowLoadingScreen(false);
    }, 500);
  }, []);

  useEffect(() => {
    // Solo mostrar loading si cambió la ruta
    if (prevPathname.current !== location.pathname) {
      // Mostrar pantalla de carga inmediatamente
      setShowLoadingScreen(true);
      setIsLoading(true);
      prevPathname.current = location.pathname;

      // Simular tiempo de carga mínimo para evitar flash
      const timer = setTimeout(() => {
        handleLoadingComplete();
      }, 900); // 0.9 segundos de carga

      return () => clearTimeout(timer);
    }
  }, [location.pathname, handleLoadingComplete]);

  return {
    isLoading,
    showLoadingScreen,
    handleLoadingComplete,
  };
};
