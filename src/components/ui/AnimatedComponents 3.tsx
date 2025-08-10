// Componentes animados centralizados para Gravito
// TODOS los motion.div deben usar estos componentes
// NO se permite crear motion.div fuera de aquí

import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { 
  ENTRY_ANIMATIONS, 
  HOVER_ANIMATIONS, 
  SCROLL_ANIMATIONS,
  ANIMATION_DURATIONS,
  ANIMATION_DELAYS,
  createStaggeredDelays
} from '@/lib/animations';

// ===== COMPONENTES DE ENTRADA =====

interface FadeInUpProps extends MotionProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const FadeInUp: React.FC<FadeInUpProps> = ({ 
  children, 
  delay = ANIMATION_DELAYS.NONE,
  duration = ANIMATION_DURATIONS.SLOW,
  className = "",
  ...props 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration, delay }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

interface FadeInSideProps extends MotionProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  delay?: number;
  duration?: number;
  className?: string;
}

export const FadeInSide: React.FC<FadeInSideProps> = ({ 
  children, 
  direction = 'left',
  delay = ANIMATION_DELAYS.NONE,
  duration = ANIMATION_DURATIONS.SLOW,
  className = "",
  ...props 
}) => (
  <motion.div
    initial={{ opacity: 0, x: direction === 'left' ? -50 : 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration, delay }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

interface FadeInScaleProps extends MotionProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const FadeInScale: React.FC<FadeInScaleProps> = ({ 
  children, 
  delay = ANIMATION_DELAYS.NONE,
  duration = ANIMATION_DURATIONS.SLOW,
  className = "",
  ...props 
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration, delay }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// ===== COMPONENTES CON HOVER =====

interface HoverScaleProps extends MotionProps {
  children: React.ReactNode;
  scale?: number;
  duration?: number;
  className?: string;
}

export const HoverScale: React.FC<HoverScaleProps> = ({ 
  children, 
  scale = 1.05,
  duration = ANIMATION_DURATIONS.FAST,
  className = "",
  ...props 
}) => (
  <motion.div
    whileHover={{ scale }}
    transition={{ duration }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

interface HoverLiftProps extends MotionProps {
  children: React.ReactNode;
  lift?: number;
  duration?: number;
  className?: string;
}

export const HoverLift: React.FC<HoverLiftProps> = ({ 
  children, 
  lift = -5,
  duration = ANIMATION_DURATIONS.FAST,
  className = "",
  ...props 
}) => (
  <motion.div
    whileHover={{ y: lift }}
    transition={{ duration }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

interface HoverGlowProps extends MotionProps {
  children: React.ReactNode;
  duration?: number;
  className?: string;
}

export const HoverGlow: React.FC<HoverGlowProps> = ({ 
  children, 
  duration = ANIMATION_DURATIONS.FAST,
  className = "",
  ...props 
}) => (
  <motion.div
    whileHover={{ 
      boxShadow: "0 0 20px hsl(var(--primary) / 0.3)",
      scale: 1.02
    }}
    transition={{ duration }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// ===== COMPONENTES DE SCROLL =====

interface FadeInOnScrollProps extends MotionProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const FadeInOnScroll: React.FC<FadeInOnScrollProps> = ({ 
  children, 
  delay = ANIMATION_DELAYS.NONE,
  duration = ANIMATION_DURATIONS.SLOW,
  className = "",
  ...props 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration, delay }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

interface SlideInOnScrollProps extends MotionProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  delay?: number;
  duration?: number;
  className?: string;
}

export const SlideInOnScroll: React.FC<SlideInOnScrollProps> = ({ 
  children, 
  direction = 'left',
  delay = ANIMATION_DELAYS.NONE,
  duration = ANIMATION_DURATIONS.SLOW,
  className = "",
  ...props 
}) => (
  <motion.div
    initial={{ opacity: 0, x: direction === 'left' ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration, delay }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// ===== COMPONENTES DE SECUENCIA =====

interface StaggeredContainerProps extends MotionProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export const StaggeredContainer: React.FC<StaggeredContainerProps> = ({ 
  children, 
  staggerDelay = ANIMATION_DELAYS.SMALL,
  className = "",
  ...props 
}) => {
  const childrenArray = React.Children.toArray(children);
  const delays = createStaggeredDelays(childrenArray.length, staggerDelay);
  
  return (
    <>
      {React.Children.map(children, (child, index) => (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: ANIMATION_DURATIONS.SLOW, 
            delay: delays[index] 
          }}
          className={className}
          {...props}
        >
          {child}
        </motion.div>
      ))}
    </>
  );
};

// ===== COMPONENTES ESPECIALES =====

interface LoadingDotsProps {
  count?: number;
  className?: string;
}

export const LoadingDots: React.FC<LoadingDotsProps> = ({ 
  count = 3,
  className = "" 
}) => (
  <div className={`flex space-x-2 ${className}`}>
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        className="w-2 h-2 bg-primary rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: i * 0.2,
        }}
      />
    ))}
  </div>
);

interface InfiniteScrollProps extends MotionProps {
  children: React.ReactNode;
  duration?: number;
  className?: string;
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ 
  children, 
  duration = 42,
  className = "",
  ...props 
}) => (
  <motion.div
    className={className}
    animate={{ x: [0, -1000, 0] }}
    transition={{ 
      duration, 
      repeat: Infinity, 
      ease: "linear" 
    }}
    {...props}
  >
    {children}
  </motion.div>
);

// ===== COMPONENTE DE PÁGINA =====

interface PageTransitionProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  className = "",
  ...props 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ 
      duration: ANIMATION_DURATIONS.FAST, 
      ease: 'easeInOut' 
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// ===== EXPORTACIÓN COMPLETA =====
// Solo usar estos componentes, NO crear motion.div en otros archivos
export {
  FadeInUp,
  FadeInSide,
  FadeInScale,
  HoverScale,
  HoverLift,
  HoverGlow,
  FadeInOnScroll,
  SlideInOnScroll,
  StaggeredContainer,
  LoadingDots,
  InfiniteScroll,
  PageTransition
};
