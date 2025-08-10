// Sistema de animaciones centralizado para Gravito
// Este archivo contiene todas las constantes y utilidades de animación

// ============================================================================
// DURACIONES DE ANIMACIÓN
// ============================================================================
export const ANIMATION_DURATIONS = {
  INSTANT: 0,
  FAST: 0.15,      // 150ms
  NORMAL: 0.3,     // 300ms
  SLOW: 0.5,       // 500ms
  VERY_SLOW: 1,    // 1000ms
} as const;

// ============================================================================
// DELAYS DE ANIMACIÓN
// ============================================================================
export const ANIMATION_DELAYS = {
  NONE: 0,
  SMALL: 0.1,      // 100ms
  MEDIUM: 0.2,     // 200ms
  LARGE: 0.3,      // 300ms
  EXTRA_LARGE: 0.5, // 500ms
} as const;

// ============================================================================
// FUNCIONES DE EASING
// ============================================================================
export const EASING_FUNCTIONS = {
  // Easing estándar
  LINEAR: 'linear',
  
  // Easing suave
  SMOOTH: [0.4, 0, 0.2, 1],
  
  // Easing con rebote
  BOUNCE: [0.68, -0.55, 0.265, 1.55],
  
  // Easing de salida
  EASE_OUT: [0, 0, 0.2, 1],
  
  // Easing de entrada
  EASE_IN: [0.4, 0, 1, 1],
  
  // Easing de entrada y salida
  EASE_IN_OUT: [0.4, 0, 0.2, 1],
} as const;

// ============================================================================
// CONFIGURACIONES DE ANIMACIÓN PREDEFINIDAS
// ============================================================================
export const ANIMATION_PRESETS = {
  // Entrada suave desde abajo
  FADE_IN_UP: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: ANIMATION_DURATIONS.SLOW,
      ease: EASING_FUNCTIONS.SMOOTH,
    },
  },
  
  // Entrada suave desde los lados
  FADE_IN_SIDE: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: {
      duration: ANIMATION_DURATIONS.SLOW,
      ease: EASING_FUNCTIONS.SMOOTH,
    },
  },
  
  // Entrada con escala
  FADE_IN_SCALE: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      duration: ANIMATION_DURATIONS.SLOW,
      ease: EASING_FUNCTIONS.SMOOTH,
    },
  },
  
  // Hover con escala
  HOVER_SCALE: {
    whileHover: { scale: 1.05 },
    transition: {
      duration: ANIMATION_DURATIONS.FAST,
      ease: EASING_FUNCTIONS.SMOOTH,
    },
  },
  
  // Hover con elevación
  HOVER_LIFT: {
    whileHover: { y: -5 },
    transition: {
      duration: ANIMATION_DURATIONS.FAST,
      ease: EASING_FUNCTIONS.SMOOTH,
    },
  },
  
  // Hover con brillo
  HOVER_GLOW: {
    whileHover: {
      boxShadow: "0 0 20px rgba(25, 164, 118, 0.3)",
      scale: 1.02,
    },
    transition: {
      duration: ANIMATION_DURATIONS.FAST,
      ease: EASING_FUNCTIONS.SMOOTH,
    },
  },
  
  // Entrada al hacer scroll
  SCROLL_FADE_IN: {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: {
      duration: ANIMATION_DURATIONS.SLOW,
      ease: EASING_FUNCTIONS.SMOOTH,
    },
  },
  
  // Deslizamiento al hacer scroll
  SCROLL_SLIDE_IN: {
    initial: { opacity: 0, x: 50 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: {
      duration: ANIMATION_DURATIONS.SLOW,
      ease: EASING_FUNCTIONS.SMOOTH,
    },
  },
  
  // Animación de pulso
  PULSE: {
    animate: { scale: [1, 1.1, 1] },
    transition: {
      duration: ANIMATION_DURATIONS.NORMAL,
      repeat: Infinity,
      ease: EASING_FUNCTIONS.SMOOTH,
    },
  },
  
  // Animación de rebote
  BOUNCE: {
    animate: { y: [0, -10, 0] },
    transition: {
      duration: ANIMATION_DURATIONS.NORMAL,
      repeat: Infinity,
      ease: EASING_FUNCTIONS.SMOOTH,
    },
  },
} as const;

// ============================================================================
// FUNCIONES UTILITARIAS
// ============================================================================

/**
 * Crea delays escalonados para animaciones en secuencia
 * @param baseDelay - Delay base entre elementos
 * @param index - Índice del elemento actual
 * @returns Delay calculado para el elemento
 */
export const createStaggeredDelay = (baseDelay: number, index: number): number => {
  return index * baseDelay;
};

/**
 * Crea delays escalonados para un grupo de elementos
 * @param baseDelay - Delay base entre elementos
 * @param totalItems - Número total de elementos
 * @returns Array de delays para cada elemento
 */
export const createStaggeredDelays = (baseDelay: number, totalItems: number): number[] => {
  return Array.from({ length: totalItems }, (_, index) => index * baseDelay);
};

/**
 * Calcula la duración de animación basada en la complejidad
 * @param complexity - Nivel de complejidad ('simple', 'medium', 'complex')
 * @returns Duración de animación en segundos
 */
export const getAnimationDuration = (complexity: 'simple' | 'medium' | 'complex'): number => {
  switch (complexity) {
    case 'simple':
      return ANIMATION_DURATIONS.FAST;
    case 'medium':
      return ANIMATION_DURATIONS.NORMAL;
    case 'complex':
      return ANIMATION_DURATIONS.SLOW;
    default:
      return ANIMATION_DURATIONS.NORMAL;
  }
};

/**
 * Crea una transición personalizada
 * @param duration - Duración de la animación
 * @param delay - Delay de la animación
 * @param ease - Función de easing
 * @returns Objeto de transición
 */
export const createTransition = (
  duration: number = ANIMATION_DURATIONS.NORMAL,
  delay: number = ANIMATION_DELAYS.NONE,
  ease: readonly number[] = EASING_FUNCTIONS.SMOOTH
) => ({
  duration,
  delay,
  ease,
});

// ============================================================================
// EXPORTACIÓN PRINCIPAL
// ============================================================================
export const ANIMATION_SYSTEM = {
  durations: ANIMATION_DURATIONS,
  delays: ANIMATION_DELAYS,
  easing: EASING_FUNCTIONS,
  presets: ANIMATION_PRESETS,
} as const;

// Exportación por defecto para compatibilidad
export default ANIMATION_SYSTEM;
