// Sistema centralizado de animaciones y efectos para Gravito
// Este archivo contiene TODAS las animaciones estandarizadas del sitio

import { Variants } from 'framer-motion';

// ============================================================================
// CONSTANTES DE DURACIÓN Y TIMING
// ============================================================================
export const ANIMATION_DURATIONS = {
  FAST: 0.3,
  NORMAL: 0.5,
  SLOW: 0.8,
  VERY_SLOW: 1.2,
} as const;

export const ANIMATION_DELAYS = {
  NONE: 0,
  SMALL: 0.1,
  MEDIUM: 0.2,
  LARGE: 0.4,
  EXTRA_LARGE: 0.6,
} as const;

export const ANIMATION_EASING = {
  EASE_OUT: 'easeOut',
  EASE_IN_OUT: 'easeInOut',
  EASE_IN: 'easeIn',
} as const;

// ============================================================================
// ANIMACIONES DE ENTRADA ESTÁNDAR
// ============================================================================

// Entrada desde abajo (Y-axis) - USO MÁS COMÚN
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

// Entrada desde arriba (Y-axis)
export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 30 },
};

// Entrada desde la izquierda (X-axis)
export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

// Entrada desde la derecha (X-axis)
export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

// Entrada con escala
export const fadeInScale: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

// ============================================================================
// ANIMACIONES DE ENTRADA ESCALONADA
// ============================================================================

// Sistema automático de delays escalonados
export const createStaggeredAnimation = (
  baseAnimation: Variants,
  staggerDelay: number = ANIMATION_DELAYS.MEDIUM
) => ({
  ...baseAnimation,
  transition: {
    ...baseAnimation.transition,
    staggerChildren: staggerDelay,
  },
});

// Entrada escalonada desde abajo (para listas)
export const staggerFadeInUp: Variants = {
  animate: {
    transition: {
      staggerChildren: ANIMATION_DELAYS.MEDIUM,
    },
  },
};

export const staggerFadeInUpItem: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

// ============================================================================
// ANIMACIONES DE HOVER Y INTERACCIÓN
// ============================================================================

export const hoverScale: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

export const hoverLift: Variants = {
  initial: { y: 0, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
  hover: { y: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' },
};

export const hoverGlow: Variants = {
  initial: { boxShadow: '0 0 0 0 rgba(25, 164, 118, 0)' },
  hover: { boxShadow: '0 0 20px 0 rgba(25, 164, 118, 0.3)' },
};

// ============================================================================
// ANIMACIONES DE PÁGINA Y TRANSICIONES
// ============================================================================

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const loadingScreen: Variants = {
  initial: { opacity: 1 },
  exit: { opacity: 0 },
};

// ============================================================================
// ANIMACIONES DE CARGA Y ESTADOS
// ============================================================================

export const loadingDots: Variants = {
  animate: {
    scale: [1, 1.5, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const pulseGlow: Variants = {
  animate: {
    boxShadow: [
      '0 0 20px -5px rgba(25, 164, 118, 0.24)',
      '0 0 30px -3px rgba(25, 164, 118, 0.4)',
      '0 0 20px -5px rgba(25, 164, 118, 0.24)',
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// ============================================================================
// UTILIDADES PARA CREAR ANIMACIONES PERSONALIZADAS
// ============================================================================

export const createCustomAnimation = (
  initial: any,
  animate: any,
  exit?: any,
  duration: number = ANIMATION_DURATIONS.NORMAL,
  delay: number = ANIMATION_DELAYS.NONE,
  ease: string = ANIMATION_EASING.EASE_OUT
) => ({
  initial,
  animate,
  exit,
  transition: {
    duration,
    delay,
    ease,
  },
});

// ============================================================================
// CONFIGURACIONES PREDEFINIDAS PARA CASOS COMUNES
// ============================================================================

export const ANIMATION_PRESETS = {
  // Hero sections
  HERO_TITLE: createCustomAnimation(
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0 },
    undefined,
    ANIMATION_DURATIONS.SLOW,
    ANIMATION_DELAYS.MEDIUM
  ),
  
  HERO_SUBTITLE: createCustomAnimation(
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0 },
    undefined,
    ANIMATION_DURATIONS.SLOW,
    ANIMATION_DELAYS.LARGE
  ),
  
  HERO_CTA: createCustomAnimation(
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0 },
    undefined,
    ANIMATION_DURATIONS.SLOW,
    ANIMATION_DELAYS.EXTRA_LARGE
  ),
  
  // Content sections
  SECTION_TITLE: createCustomAnimation(
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0 },
    undefined,
    ANIMATION_DURATIONS.SLOW,
    ANIMATION_DELAYS.NONE
  ),
  
  SECTION_CONTENT: createCustomAnimation(
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0 },
    undefined,
    ANIMATION_DURATIONS.SLOW,
    ANIMATION_DELAYS.MEDIUM
  ),
  
  // Cards and items
  CARD_ITEM: createCustomAnimation(
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0 },
    undefined,
    ANIMATION_DURATIONS.NORMAL,
    ANIMATION_DELAYS.NONE
  ),
  
  // Interactive elements
  BUTTON_HOVER: createCustomAnimation(
    { scale: 1 },
    { scale: 1.05 },
    undefined,
    ANIMATION_DURATIONS.FAST,
    ANIMATION_DELAYS.NONE
  ),
} as const;

// ============================================================================
// HOOKS Y UTILIDADES PARA USO EN COMPONENTES
// ============================================================================

export const getStaggerDelay = (index: number, baseDelay: number = ANIMATION_DELAYS.MEDIUM) => 
  index * baseDelay;

export const getAnimationProps = (preset: keyof typeof ANIMATION_PRESETS, customDelay?: number) => {
  const animation = ANIMATION_PRESETS[preset];
  if (customDelay !== undefined) {
    return {
      ...animation,
      transition: { ...animation.transition, delay: customDelay },
    };
  }
  return animation;
};
