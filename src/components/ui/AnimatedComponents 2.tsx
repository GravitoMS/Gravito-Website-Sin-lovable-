// Componentes de animación reutilizables para Gravito
// Estos componentes usan el sistema centralizado de animaciones

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import {
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  fadeInScale,
  staggerFadeInUp,
  staggerFadeInUpItem,
  hoverScale,
  hoverLift,
  hoverGlow,
  ANIMATION_PRESETS,
  getAnimationProps,
} from '@/lib/animations';

// ============================================================================
// COMPONENTES DE ENTRADA BÁSICOS
// ============================================================================

interface AnimatedDivProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

export const FadeInUp: React.FC<AnimatedDivProps> = ({ 
  children, 
  delay = 0, 
  duration = 0.8,
  ...props 
}) => (
  <motion.div
    variants={fadeInUp}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration, delay }}
    {...props}
  >
    {children}
  </motion.div>
);

export const FadeInDown: React.FC<AnimatedDivProps> = ({ 
  children, 
  delay = 0, 
  duration = 0.8,
  ...props 
}) => (
  <motion.div
    variants={fadeInDown}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration, delay }}
    {...props}
  >
    {children}
  </motion.div>
);

export const FadeInLeft: React.FC<AnimatedDivProps> = ({ 
  children, 
  delay = 0, 
  duration = 0.8,
  ...props 
}) => (
  <motion.div
    variants={fadeInLeft}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration, delay }}
    {...props}
  >
    {children}
  </motion.div>
);

export const FadeInRight: React.FC<AnimatedDivProps> = ({ 
  children, 
  delay = 0, 
  duration = 0.8,
  ...props 
}) => (
  <motion.div
    variants={fadeInRight}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration, delay }}
    {...props}
  >
    {children}
  </motion.div>
);

export const FadeInScale: React.FC<AnimatedDivProps> = ({ 
  children, 
  delay = 0, 
  duration = 0.8,
  ...props 
}) => (
  <motion.div
    variants={fadeInScale}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration, delay }}
    {...props}
  >
    {children}
  </motion.div>
);

// ============================================================================
// COMPONENTES CON PRESETS PREDEFINIDOS
// ============================================================================

export const HeroTitle: React.FC<AnimatedDivProps> = ({ children, ...props }) => (
  <motion.div
    variants={ANIMATION_PRESETS.HERO_TITLE}
    initial="initial"
    animate="animate"
    exit="exit"
    {...props}
  >
    {children}
  </motion.div>
);

export const HeroSubtitle: React.FC<AnimatedDivProps> = ({ children, ...props }) => (
  <motion.div
    variants={ANIMATION_PRESETS.HERO_SUBTITLE}
    initial="initial"
    animate="animate"
    exit="exit"
    {...props}
  >
    {children}
  </motion.div>
);

export const HeroCTA: React.FC<AnimatedDivProps> = ({ children, ...props }) => (
  <motion.div
    variants={ANIMATION_PRESETS.HERO_CTA}
    initial="initial"
    animate="animate"
    exit="exit"
    {...props}
  >
    {children}
  </motion.div>
);

export const SectionTitle: React.FC<AnimatedDivProps> = ({ children, ...props }) => (
  <motion.div
    variants={ANIMATION_PRESETS.SECTION_TITLE}
    initial="initial"
    animate="animate"
    exit="exit"
    {...props}
  >
    {children}
  </motion.div>
);

export const SectionContent: React.FC<AnimatedDivProps> = ({ children, ...props }) => (
  <motion.div
    variants={ANIMATION_PRESETS.SECTION_CONTENT}
    initial="initial"
    animate="animate"
    exit="exit"
    {...props}
  >
    {children}
  </motion.div>
);

export const CardItem: React.FC<AnimatedDivProps> = ({ children, ...props }) => (
  <motion.div
    variants={ANIMATION_PRESETS.CARD_ITEM}
    initial="initial"
    animate="animate"
    exit="exit"
    {...props}
  >
    {children}
  </motion.div>
);

// ============================================================================
// COMPONENTES DE ENTRADA ESCALONADA
// ============================================================================

interface StaggeredContainerProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  staggerDelay?: number;
}

export const StaggeredContainer: React.FC<StaggeredContainerProps> = ({ 
  children, 
  staggerDelay = 0.2,
  ...props 
}) => (
  <motion.div
    variants={staggerFadeInUp}
    initial="initial"
    animate="animate"
    transition={{ staggerChildren: staggerDelay }}
    {...props}
  >
    {children}
  </motion.div>
);

export const StaggeredItem: React.FC<AnimatedDivProps> = ({ children, ...props }) => (
  <motion.div
    variants={staggerFadeInUpItem}
    {...props}
  >
    {children}
  </motion.div>
);

// ============================================================================
// COMPONENTES INTERACTIVOS
// ============================================================================

export const HoverScale: React.FC<AnimatedDivProps> = ({ children, ...props }) => (
  <motion.div
    variants={hoverScale}
    initial="initial"
    whileHover="hover"
    whileTap="tap"
    {...props}
  >
    {children}
  </motion.div>
);

export const HoverLift: React.FC<AnimatedDivProps> = ({ children, ...props }) => (
  <motion.div
    variants={hoverLift}
    initial="initial"
    whileHover="hover"
    {...props}
  >
    {children}
  </motion.div>
);

export const HoverGlow: React.FC<AnimatedDivProps> = ({ children, ...props }) => (
  <motion.div
    variants={hoverGlow}
    initial="initial"
    whileHover="hover"
    {...props}
  >
    {children}
  </motion.div>
);

// ============================================================================
// COMPONENTES DE VISIBILIDAD (WHILE IN VIEW)
// ============================================================================

interface WhileInViewProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  animation?: 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'fadeInScale';
  delay?: number;
  duration?: number;
  threshold?: number;
}

export const WhileInView: React.FC<WhileInViewProps> = ({ 
  children, 
  animation = 'fadeInUp',
  delay = 0,
  duration = 0.8,
  threshold = 0.1,
  ...props 
}) => {
  const getVariants = () => {
    switch (animation) {
      case 'fadeInDown': return fadeInDown;
      case 'fadeInLeft': return fadeInLeft;
      case 'fadeInRight': return fadeInRight;
      case 'fadeInScale': return fadeInScale;
      default: return fadeInUp;
    }
  };

  return (
    <motion.div
      variants={getVariants()}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, threshold }}
      transition={{ duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// COMPONENTES DE LISTA CON ANIMACIÓN ESCALONADA
// ============================================================================

interface AnimatedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function AnimatedList<T>({ 
  items, 
  renderItem, 
  staggerDelay = 0.2,
  className 
}: AnimatedListProps<T>) {
  return (
    <StaggeredContainer staggerDelay={staggerDelay} className={className}>
      {items.map((item, index) => (
        <StaggeredItem key={index}>
          {renderItem(item, index)}
        </StaggeredItem>
      ))}
    </StaggeredContainer>
  );
}

// ============================================================================
// COMPONENTES DE SECCIÓN COMPLETOS
// ============================================================================

interface AnimatedSectionProps extends HTMLMotionProps<'section'> {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  className = '',
  containerClassName = '',
  ...props 
}) => (
  <section className={className} {...props}>
    <div className={`container mx-auto px-6 ${containerClassName}`}>
      <StaggeredContainer>
        {children}
      </StaggeredContainer>
    </div>
  </section>
);

// ============================================================================
// COMPONENTES DE HERO COMPLETOS
// ============================================================================

interface AnimatedHeroProps extends HTMLMotionProps<'section'> {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export const AnimatedHero: React.FC<AnimatedHeroProps> = ({ 
  children, 
  className = '',
  containerClassName = '',
  ...props 
}) => (
  <section className={className} {...props}>
    <div className={`container mx-auto px-6 ${containerClassName}`}>
      <motion.div
        variants={staggerFadeInUp}
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.2 }}
      >
        {children}
      </motion.div>
    </div>
  </section>
);
