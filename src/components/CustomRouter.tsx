import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './LoadingScreen';

interface CustomRouterProps {
  children: React.ReactNode;
}

const CustomRouter: React.FC<CustomRouterProps> = ({ children }) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Interceptar cambios de ruta
    if (location.pathname !== pendingPath) {
      setIsNavigating(true);
      setPendingPath(location.pathname);
    }
  }, [location.pathname, pendingPath]);

  const handleLoadingComplete = () => {
    setIsNavigating(false);
    setPendingPath(null);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isNavigating && (
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>
      
      <AnimatePresence mode="wait">
        {!isNavigating && (
          <div key={location.pathname}>
            {children}
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomRouter;
