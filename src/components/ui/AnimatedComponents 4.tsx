// Componentes de animación centralizados para Gravito
// SOLO usar estos componentes - NO crear FadeInUp nuevos
// Importar desde: import { FadeInUp, FadeInLeft, etc. } from '@/components/ui/AnimatedComponents'

import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { 

import { FadeInUp, FadeInUpStaggered, FadeInSide, FadeInScale, HoverScale, HoverLift, HoverGlow, FadeInOnScroll, SlideInOnScroll, LoadingPulse, LoadingBounce, FadeInUpWithHover, StaggeredGroup } from '@/components/ui/AnimatedComponents';
  ENTRY_ANIMATIONS, 
  HOVER_ANIMATIONS, 
  SCROLL_ANIMATIONS,
  ANIMATION_DURATIONS,
  ANIMATION_DELAYS,
  createStaggeredDelays,
  combineAnimations
} from '@/lib/animations';

// ===== COMPONENTES DE ENTRADA ESTÁNDAR =====

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
  <FadeInUp
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration, delay }}
    className={className}
    {...props}
  >
    {children}
  </FadeInUp>
);

interface FadeInUpStaggeredProps extends MotionProps {
  children: React.ReactNode;
  index: number;
  totalItems: number;
  baseDelay?: number;
  className?: string;
}

export const FadeInUpStaggered: React.FC<FadeInUpStaggeredProps> = ({ 
  children, 
  index, 
  totalItems, 
  baseDelay = ANIMATION_DELAYS.SMALL,
  className = "",
  ...props 
}) => {
  const delays = createStaggeredDelays(totalItems, baseDelay);
  return (
    <FadeInUp
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: ANIMATION_DURATIONS.SLOW, delay: delays[index] }}
      className={className}
      {...props}
    >
      {children}
    </FadeInUp>
  );
};

interface FadeInSideProps extends MotionProps {
  children: React.ReactNode;
  direction: 'left' | 'right';
  delay?: number;
  duration?: number;
  className?: string;
}

export const FadeInSide: React.FC<FadeInSideProps> = ({ 
  children, 
  direction, 
  delay = ANIMATION_DELAYS.NONE,
  duration = ANIMATION_DURATIONS.SLOW,
  className = "",
  ...props 
}) => (
  <FadeInUp
    initial={{ opacity: 0, x: direction === 'left' ? -50 : 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration, delay }}
    className={className}
    {...props}
  >
    {children}
  </FadeInUp>
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
  <FadeInUp
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration, delay }}
    className={className}
    {...props}
  >
    {children}
  </FadeInUp>
);

// ===== COMPONENTES CON HOVER ESTÁNDAR =====

interface HoverScaleProps extends MotionProps {
  children: React.ReactNode;
  scale?: number;
  className?: string;
}

export const HoverScale: React.FC<HoverScaleProps> = ({ 
  children, 
  scale = 1.05,
  className = "",
  ...props 
}) => (
  <FadeInUp
    whileHover={{ scale }}
    transition={{ duration: ANIMATION_DURATIONS.FAST }}
    className={className}
    {...props}
  >
    {children}
  </FadeInUp>
);

interface HoverLiftProps extends MotionProps {
  children: React.ReactNode;
  lift?: number;
  className?: string;
}

export const HoverLift: React.FC<HoverLiftProps> = ({ 
  children, 
  lift = -5,
  className = "",
  ...props 
}) => (
  <FadeInUp
    whileHover={{ y: lift }}
    transition={{ duration: ANIMATION_DURATIONS.FAST }}
    className={className}
    {...props}
  >
    {children}
  </FadeInUp>
);

interface HoverGlowProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
}

export const HoverGlow: React.FC<HoverGlowProps> = ({ 
  children, 
  className = "",
  ...props 
}) => (
  <FadeInUp
    whileHover={{ 
      boxShadow: "0 0 20px hsl(var(--primary) / 0.3)",
      scale: 1.02
    }}
    transition={{ duration: ANIMATION_DURATIONS.FAST }}
    className={className}
    {...props}
  >
    {children}
  </FadeInUp>
);

// ===== COMPONENTES DE SCROLL ESTÁNDAR =====

interface FadeInOnScrollProps extends MotionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const FadeInOnScroll: React.FC<FadeInOnScrollProps> = ({ 
  children, 
  delay = ANIMATION_DELAYS.NONE,
  className = "",
  ...props 
}) => (
  <FadeInUp
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: ANIMATION_DURATIONS.SLOW, delay }}
    className={className}
    {...props}
  >
    {children}
  </FadeInUp>
);

interface SlideInOnScrollProps extends MotionProps {
  children: React.ReactNode;
  direction: 'left' | 'right';
  delay?: number;
  className?: string;
}

export const SlideInOnScroll: React.FC<SlideInOnScrollProps> = ({ 
  children, 
  direction, 
  delay = ANIMATION_DELAYS.NONE,
  className = "",
  ...props 
}) => (
  <FadeInUp
    initial={{ opacity: 0, x: direction === 'left' ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: ANIMATION_DURATIONS.SLOW, delay }}
    className={className}
    {...props}
  >
    {children}
  </FadeInUp>
);

// ===== COMPONENTES DE LOADING ESTÁNDAR =====

interface LoadingPulseProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
}

export const LoadingPulse: React.FC<LoadingPulseProps> = ({ 
  children, 
  className = "",
  ...props 
}) => (
  <FadeInUp
    animate={{
      opacity: [0.2, 1, 0.2],
      scale: [0.5, 1, 0.5]
    }}
    transition={{
      duration: 2,
      repeat: Infinity
    }}
    className={className}
    {...props}
  >
    {children}
  </FadeInUp>
);

interface LoadingBounceProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
}

export const LoadingBounce: React.FC<LoadingBounceProps> = ({ 
  children, 
  className = "",
  ...props 
}) => (
  <FadeInUp
    animate={{ y: [0, -10, 0] }}
    transition={{
      duration: 1,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className={className}
    {...props}
  >
    {children}
  </FadeInUp>
);

// ===== COMPONENTES COMPUESTOS ESTÁNDAR =====

interface FadeInUpWithHoverProps extends MotionProps {
  children: React.ReactNode;
  delay?: number;
  hoverEffect?: 'scale' | 'lift' | 'glow';
  className?: string;
}

export const FadeInUpWithHover: React.FC<FadeInUpWithHoverProps> = ({ 
  children, 
  delay = ANIMATION_DELAYS.NONE,
  hoverEffect = 'scale',
  className = "",
  ...props 
}) => {
  const hoverAnimation = hoverEffect === 'scale' ? HOVER_ANIMATIONS.SCALE_UP :
                        hoverEffect === 'lift' ? HOVER_ANIMATIONS.LIFT_UP :
                        HOVER_ANIMATIONS.GLOW;

  return (
    <FadeInUp
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: ANIMATION_DURATIONS.SLOW, delay }}
      whileHover={hoverAnimation.whileHover}
      transition={hoverAnimation.transition}
      className={className}
      {...props}
    >
      {children}
    </FadeInUp>
  );
};

// ===== COMPONENTE DE GRUPO ESTAGGERED =====

interface StaggeredGroupProps extends MotionProps {
  children: React.ReactNode[];
  baseDelay?: number;
  className?: string;
}

export const StaggeredGroup: React.FC<StaggeredGroupProps> = ({ 
  children, 
  baseDelay = ANIMATION_DELAYS.SMALL,
  className = "",
  ...props 
}) => {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <FadeInUpStaggered
          key={index}
          index={index}
          totalItems={children.length}
          baseDelay={baseDelay}
        >
          {child}
        </FadeInUpStaggered>
      ))}
    </div>
  );
};

// ===== EXPORTACIÓN DE TODOS LOS COMPONENTES =====

export {
  // Componentes básicos
  FadeInUp,
  FadeInUpStaggered,
  FadeInSide,
  FadeInScale,
  
  // Componentes con hover
  HoverScale,
  HoverLift,
  HoverGlow,
  
  // Componentes de scroll
  FadeInOnScroll,
  SlideInOnScroll,
  
  // Componentes de loading
  LoadingPulse,
  LoadingBounce,
  
  // Componentes compuestos
  FadeInUpWithHover,
  StaggeredGroup
};
