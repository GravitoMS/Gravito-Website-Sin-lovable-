import React, { useEffect, useMemo } from 'react';
import { FadeInUp, FadeInUpStaggered, FadeInSide, FadeInScale, HoverScale, HoverLift, HoverGlow, FadeInOnScroll, SlideInOnScroll, LoadingPulse, LoadingBounce, FadeInUpWithHover, StaggeredGroup } from '@/components/ui/AnimatedComponents';
import { AnimatePresence } from 'framer-motion';

// Sistema centralizado importado desde @/lib

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  useEffect(() => {
    const duration = 900; // 0.9 segundos total
    
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, duration);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  // Generar puntos de fondo de manera memoizada
  const backgroundDots = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
    }));
  }, []);

  return (
    <AnimatePresence mode="wait">
      <FadeInUp
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[9999] bg-muted flex items-center justify-center overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-success/10 to-transparent"></div>
          <div className="absolute inset-0">
            {backgroundDots.map((dot) => (
              <FadeInUp
                key={dot.id}
                className="absolute w-1 h-1 bg-success rounded-full"
                style={{
                  left: dot.left,
                  top: dot.top,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: dot.duration,
                  repeat: Infinity,
                  delay: dot.delay,
                }}
              >
                <span></span>
              </FadeInUp>
            ))}
          </div>
        </div>

        {/* Watermark Logo */}
        <FadeInUp
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <img 
            src="https://iili.io/FiC9Lbe.png" 
            alt="Gravito Media Solutions Logo" 
            className="h-32 w-auto object-contain opacity-10"
          />
        </FadeInUp>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          {/* Animated Dots */}
          <FadeInUp
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex space-x-2"
          >
            {[0, 1, 2].map((i) => (
              <FadeInUp
                key={i}
                className="w-2 h-2 bg-success rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                <span></span>
              </FadeInUp>
            ))}
          </FadeInUp>
        </div>

        {/* Glowing Border Effect */}
        <FadeInUp
          className="absolute inset-0 border border-success/20 rounded-none"
          animate={{
            boxShadow: [
              "0 0 20px -5px hsl(162 100% 45% / 0.3)",
              "0 0 40px -10px hsl(162 100% 45% / 0.5)",
              "0 0 20px -5px hsl(162 100% 45% / 0.3)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span></span>
        </FadeInUp>
      </FadeInUp>
    </AnimatePresence>
  );
};

export default LoadingScreen;
