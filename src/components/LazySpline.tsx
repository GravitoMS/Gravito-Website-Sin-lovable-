import React, { useState } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface LazySplineProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}

const LazySpline: React.FC<LazySplineProps> = ({ 
  src, 
  className = "", 
  style = {} 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { elementRef, isIntersecting, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px' // Cargar 50px antes de que sea visible
  });

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div 
      ref={elementRef} 
      className={`relative ${className}`}
      style={style}
    >
      {/* Placeholder mientras no está visible */}
      {!hasIntersected && (
        <div className="absolute inset-0 bg-muted/20 backdrop-blur-[1px] animate-pulse">
          <div className="flex items-center justify-center h-full">
            <div className="text-muted-foreground text-sm">Cargando animación...</div>
          </div>
        </div>
      )}

      {/* Spline iframe - solo renderizar cuando ha sido visible */}
      {hasIntersected && (
        <iframe 
          src={src}
          frameBorder="0" 
          width="100%" 
          height="100%" 
          className={`absolute inset-0 transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            border: 'none',
            ...style
          }}
          onLoad={handleLoad}
          loading="lazy"
        />
      )}

      {/* Overlay de blur siempre presente */}
      <div className="absolute inset-0 bg-muted/20 backdrop-blur-[1px] pointer-events-none"></div>
    </div>
  );
};

export default LazySpline;

