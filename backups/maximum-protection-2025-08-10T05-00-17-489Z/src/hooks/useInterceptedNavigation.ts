import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useInterceptedNavigation = () => {
  const [isNavigating, setIsNavigating] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const prevPathname = useRef(location.pathname);
  const isInitialMount = useRef(true);

  const handleLoadingComplete = useCallback(() => {
    setIsNavigating(false);
    setPendingPath(null);
  }, []);

  useEffect(() => {
    // Evitar activación en el montaje inicial
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Solo activar si cambió la ruta
    if (prevPathname.current !== location.pathname) {
      setIsNavigating(true);
      setPendingPath(location.pathname);
      prevPathname.current = location.pathname;
    }
  }, [location.pathname]);

  // Interceptar navegación del browser (back/forward)
  useEffect(() => {
    const handleBeforeUnload = () => {
      setIsNavigating(true);
    };

    const handlePopState = () => {
      setIsNavigating(true);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigateWithLoading = useCallback((to: string) => {
    setIsNavigating(true);
    setPendingPath(to);
    navigate(to);
  }, [navigate]);

  return {
    isNavigating,
    pendingPath,
    handleLoadingComplete,
    navigateWithLoading
  };
};
