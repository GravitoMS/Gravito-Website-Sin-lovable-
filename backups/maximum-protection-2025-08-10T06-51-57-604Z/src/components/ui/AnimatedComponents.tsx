// Componentes de animación centralizados para Gravito
import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { ANIMATION_DURATIONS, ANIMATION_DELAYS, createStaggeredDelays } from '@/lib/animations';

// Props base para todos los componentes
interface BaseAnimationProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
}

// FadeInUp - Entrada desde abajo con fade
interface FadeInUpProps extends BaseAnimationProps {
  delay?: number;
  duration?: number;
}

const FadeInUp: React.FC<FadeInUpProps> = ({ 
  children, 
  delay = ANIMATION_DELAYS.NONE, 
  duration = ANIMATION_DURATIONS.SLOW, 
  className = "", 
  ...props 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration, delay, ease: [0.4, 0, 0.2, 1] }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// FadeInUpStaggered - Entrada escalonada desde abajo
interface FadeInUpStaggeredProps extends BaseAnimationProps {
  index: number;
  totalItems: number;
  baseDelay?: number;
}

const FadeInUpStaggered: React.FC<FadeInUpStaggeredProps> = ({ 
  children, 
  index, 
  totalItems, 
  baseDelay = ANIMATION_DELAYS.SMALL, 
  className = "", 
  ...props 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: ANIMATION_DURATIONS.SLOW, 
      delay: index * baseDelay, 
      ease: [0.4, 0, 0.2, 1] 
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// FadeInSide - Entrada desde los lados
interface FadeInSideProps extends BaseAnimationProps {
  direction: 'left' | 'right';
  delay?: number;
  duration?: number;
}

const FadeInSide: React.FC<FadeInSideProps> = ({ 
  children, 
  direction, 
  delay = ANIMATION_DELAYS.NONE, 
  duration = ANIMATION_DURATIONS.SLOW, 
  className = "", 
  ...props 
}) => (
  <motion.div
    initial={{ opacity: 0, x: direction === 'left' ? -30 : 30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration, delay, ease: [0.4, 0, 0.2, 1] }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// FadeInScale - Entrada con escala
interface FadeInScaleProps extends BaseAnimationProps {
  delay?: number;
  duration?: number;
}

const FadeInScale: React.FC<FadeInScaleProps> = ({ 
  children, 
  delay = ANIMATION_DELAYS.NONE, 
  duration = ANIMATION_DURATIONS.SLOW, 
  className = "", 
  ...props 
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration, delay, ease: [0.4, 0, 0.2, 1] }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// HoverScale - Hover con escala
interface HoverScaleProps extends BaseAnimationProps {
  scale?: number;
}

const HoverScale: React.FC<HoverScaleProps> = ({ 
  children, 
  scale = 1.05, 
  className = "", 
  ...props 
}) => (
  <motion.div
    whileHover={{ scale }}
    transition={{ duration: ANIMATION_DURATIONS.FAST, ease: [0.4, 0, 0.2, 1] }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// HoverLift - Hover con elevación
interface HoverLiftProps extends BaseAnimationProps {
  lift?: number;
}

const HoverLift: React.FC<HoverLiftProps> = ({ 
  children, 
  lift = -5, 
  className = "", 
  ...props 
}) => (
  <motion.div
    whileHover={{ y: lift }}
    transition={{ duration: ANIMATION_DURATIONS.FAST, ease: [0.4, 0, 0.2, 1] }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// HoverGlow - Hover con brillo
interface HoverGlowProps extends BaseAnimationProps {
  // Props específicas para HoverGlow (actualmente ninguna adicional)
}

const HoverGlow: React.FC<HoverGlowProps> = ({ 
  children, 
  className = "", 
  ...props 
}) => (
  <motion.div
    whileHover={{ 
      boxShadow: "0 0 20px rgba(25, 164, 118, 0.3)",
      scale: 1.02
    }}
    transition={{ duration: ANIMATION_DURATIONS.FAST, ease: [0.4, 0, 0.2, 1] }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// FadeInOnScroll - Entrada al hacer scroll
interface FadeInOnScrollProps extends BaseAnimationProps {
  delay?: number;
}

const FadeInOnScroll: React.FC<FadeInOnScrollProps> = ({ 
  children, 
  delay = ANIMATION_DELAYS.NONE, 
  className = "", 
  ...props 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ 
      duration: ANIMATION_DURATIONS.SLOW, 
      delay, 
      ease: [0.4, 0, 0.2, 1] 
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// SlideInOnScroll - Deslizamiento al hacer scroll
interface SlideInOnScrollProps extends BaseAnimationProps {
  direction: 'left' | 'right';
  delay?: number;
}

const SlideInOnScroll: React.FC<SlideInOnScrollProps> = ({ 
  children, 
  direction, 
  delay = ANIMATION_DELAYS.NONE, 
  className = "", 
  ...props 
}) => (
  <motion.div
    initial={{ opacity: 0, x: direction === 'left' ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ 
      duration: ANIMATION_DURATIONS.SLOW, 
      delay, 
      ease: [0.4, 0, 0.2, 1] 
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// LoadingPulse - Animación de pulso para loading
interface LoadingPulseProps extends BaseAnimationProps {
  // Props específicas para LoadingPulse (actualmente ninguna adicional)
}

const LoadingPulse: React.FC<LoadingPulseProps> = ({ 
  children, 
  className = "", 
  ...props 
}) => (
  <motion.div
    animate={{ scale: [1, 1.1, 1] }}
    transition={{ 
      duration: ANIMATION_DURATIONS.NORMAL, 
      repeat: Infinity, 
      ease: [0.4, 0, 0.2, 1] 
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// LoadingBounce - Animación de rebote para loading
interface LoadingBounceProps extends BaseAnimationProps {
  // Props específicas para LoadingBounce (actualmente ninguna adicional)
}

const LoadingBounce: React.FC<LoadingBounceProps> = ({ 
  children, 
  className = "", 
  ...props 
}) => (
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{ 
      duration: ANIMATION_DURATIONS.NORMAL, 
      repeat: Infinity, 
      ease: [0.4, 0, 0.2, 1] 
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// FadeInUpWithHover - Combinación de entrada y hover
interface FadeInUpWithHoverProps extends BaseAnimationProps {
  delay?: number;
  hoverEffect?: 'scale' | 'lift' | 'glow';
}

const FadeInUpWithHover: React.FC<FadeInUpWithHoverProps> = ({ 
  children, 
  delay = ANIMATION_DELAYS.NONE, 
  hoverEffect = 'scale', 
  className = "", 
  ...props 
}) => {
  const hoverProps = hoverEffect === 'scale' ? { scale: 1.05 } :
                    hoverEffect === 'lift' ? { y: -5 } :
                    { boxShadow: "0 0 20px rgba(25, 164, 118, 0.3)", scale: 1.02 };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hoverProps}
      transition={{ 
        duration: ANIMATION_DURATIONS.SLOW, 
        delay, 
        ease: [0.4, 0, 0.2, 1] 
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// StaggeredGroup - Grupo con animaciones escalonadas
interface StaggeredGroupProps extends BaseAnimationProps {
  baseDelay?: number;
}

const StaggeredGroup: React.FC<StaggeredGroupProps> = ({ 
  children, 
  baseDelay = ANIMATION_DELAYS.SMALL, 
  className = "", 
  ...props 
}) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: baseDelay
        }
      }
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// Exportación de todos los componentes
export {
  FadeInUp,
  FadeInUpStaggered,
  FadeInSide,
  FadeInScale,
  HoverScale,
  HoverLift,
  HoverGlow,
  FadeInOnScroll,
  SlideInOnScroll,
  LoadingPulse,
  LoadingBounce,
  FadeInUpWithHover,
  StaggeredGroup
};

