import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './LoadingScreen';
import { useInterceptedNavigation } from '../hooks/useInterceptedNavigation';

interface NavigationContextType {
  isNavigating: boolean;
  navigateWithLoading: (to: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const { isNavigating, handleLoadingComplete, navigateWithLoading } = useInterceptedNavigation();

  // Prevenir scroll durante navegación
  useEffect(() => {
    if (isNavigating) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isNavigating]);

  return (
    <NavigationContext.Provider value={{ isNavigating, navigateWithLoading }}>
      <AnimatePresence mode="wait">
        {isNavigating && (
          <LoadingScreen 
            onLoadingComplete={handleLoadingComplete}
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence mode="wait">
        {!isNavigating && (
          <div key={window.location.pathname} style={{ opacity: isNavigating ? 0 : 1 }}>
            {children}
          </div>
        )}
      </AnimatePresence>
    </NavigationContext.Provider>
  );
};
