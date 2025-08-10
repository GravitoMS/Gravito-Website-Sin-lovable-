// Sistema de diseño unificado para Gravito
// Este archivo contiene TODAS las constantes de diseño del sitio

// ============================================================================
// PALETA DE COLORES UNIFICADA
// ============================================================================

export const COLORS = {
  // Colores principales (SOLO usar estos)
  PRIMARY: {
    DEFAULT: 'hsl(162 100% 45%)', // Verde principal
    LIGHT: 'hsl(162 100% 55%)',
    DARK: 'hsl(162 100% 35%)',
    MUTED: 'hsl(162 100% 45% / 0.1)',
    BORDER: 'hsl(162 100% 45% / 0.2)',
  },
  
  SECONDARY: {
    DEFAULT: 'hsl(25 95% 60%)', // Naranja secundario
    LIGHT: 'hsl(25 95% 70%)',
    DARK: 'hsl(25 95% 50%)',
    MUTED: 'hsl(25 95% 60% / 0.1)',
    BORDER: 'hsl(25 95% 60% / 0.2)',
  },
  
  // Colores de fondo
  BACKGROUND: {
    DEFAULT: 'hsl(220 20% 8%)',
    CARD: 'hsl(220 15% 12%)',
    MUTED: 'hsl(220 15% 20%)',
    ACCENT: 'hsl(220 15% 15%)',
  },
  
  // Colores de texto
  TEXT: {
    PRIMARY: 'hsl(0 0% 98%)',
    SECONDARY: 'hsl(0 0% 65%)',
    MUTED: 'hsl(0 0% 45%)',
  },
  
  // Colores de borde
  BORDER: {
    DEFAULT: 'hsl(220 15% 20%)',
    LIGHT: 'hsl(220 15% 30%)',
    MUTED: 'hsl(220 15% 15%)',
  },
  
  // Colores de estado
  STATE: {
    SUCCESS: 'hsl(142 76% 36%)',
    WARNING: 'hsl(38 92% 50%)',
    ERROR: 'hsl(0 84% 60%)',
    INFO: 'hsl(217 91% 60%)',
  },
} as const;

// ============================================================================
// ESPACIADOS Y DIMENSIONES
// ============================================================================

export const SPACING = {
  // Espaciado base
  XS: '0.5rem',    // 8px
  SM: '1rem',      // 16px
  MD: '1.5rem',    // 24px
  LG: '2rem',      // 32px
  XL: '3rem',      // 48px
  '2XL': '4rem',   // 64px
  '3XL': '6rem',   // 96px
  '4XL': '8rem',   // 128px
  
  // Espaciado de secciones
  SECTION: {
    SMALL: 'py-12',    // 48px vertical
    MEDIUM: 'py-20',   // 80px vertical
    LARGE: 'py-32',    // 128px vertical
  },
  
  // Espaciado de contenedores
  CONTAINER: {
    PADDING: 'px-6',
    MAX_WIDTH: 'max-w-7xl',
  },
} as const;

// ============================================================================
// BORDES Y RADIOS
// ============================================================================

export const BORDERS = {
  // Radios de borde
  RADIUS: {
    SM: '0.375rem',    // 6px
    MD: '0.5rem',      // 8px
    LG: '0.75rem',     // 12px
    XL: '1rem',        // 16px
    '2XL': '1.5rem',   // 24px
    '3XL': '2rem',     // 32px
    FULL: '9999px',
  },
  
  // Estilos de borde
  STYLES: {
    DEFAULT: '1px solid',
    THICK: '2px solid',
    THIN: '0.5px solid',
  },
  
  // Opacidades de borde
  OPACITY: {
    LIGHT: '0.1',
    MEDIUM: '0.2',
    STRONG: '0.3',
  },
} as const;

// ============================================================================
// SOMBRAS Y EFECTOS
// ============================================================================

export const SHADOWS = {
  // Sombras básicas
  SM: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  MD: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  LG: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  XL: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  
  // Sombras con color
  PRIMARY: {
    SM: '0 1px 3px 0 rgba(25, 164, 118, 0.1)',
    MD: '0 4px 6px -1px rgba(25, 164, 118, 0.2)',
    LG: '0 10px 15px -3px rgba(25, 164, 118, 0.3)',
    XL: '0 20px 25px -5px rgba(25, 164, 118, 0.4)',
  },
  
  SECONDARY: {
    SM: '0 1px 3px 0 rgba(202, 113, 52, 0.1)',
    MD: '0 4px 6px -1px rgba(202, 113, 52, 0.2)',
    LG: '0 10px 15px -3px rgba(202, 113, 52, 0.3)',
    XL: '0 20px 25px -5px rgba(202, 113, 52, 0.4)',
  },
  
  // Efectos de glow
  GLOW: {
    PRIMARY: '0 0 20px rgba(25, 164, 118, 0.3)',
    SECONDARY: '0 0 20px rgba(202, 113, 52, 0.3)',
    WHITE: '0 0 20px rgba(255, 255, 255, 0.1)',
  },
} as const;

// ============================================================================
// TIPOGRAFÍA
// ============================================================================

export const TYPOGRAPHY = {
  // Tamaños de fuente
  SIZES: {
    XS: 'text-xs',      // 12px
    SM: 'text-sm',      // 14px
    BASE: 'text-base',  // 16px
    LG: 'text-lg',      // 18px
    XL: 'text-xl',      // 20px
    '2XL': 'text-2xl',  // 24px
    '3XL': 'text-3xl',  // 30px
    '4XL': 'text-4xl',  // 36px
    '5XL': 'text-5xl',  // 48px
    '6XL': 'text-6xl',  // 60px
    '7XL': 'text-7xl',  // 72px
    '8XL': 'text-8xl',  // 96px
    '9XL': 'text-9xl',  // 128px
  },
  
  // Pesos de fuente
  WEIGHTS: {
    THIN: 'font-thin',      // 100
    LIGHT: 'font-light',    // 300
    NORMAL: 'font-normal',  // 400
    MEDIUM: 'font-medium',  // 500
    SEMIBOLD: 'font-semibold', // 600
    BOLD: 'font-bold',      // 700
    EXTRABOLD: 'font-extrabold', // 800
    BLACK: 'font-black',    // 900
  },
  
  // Alturas de línea
  LINE_HEIGHTS: {
    TIGHT: 'leading-tight',    // 1.25
    SNUG: 'leading-snug',      // 1.375
    NORMAL: 'leading-normal',  // 1.5
    RELAXED: 'leading-relaxed', // 1.625
    LOOSE: 'leading-loose',    // 2
  },
} as const;

// ============================================================================
// COMPONENTES DE DISEÑO UNIFICADOS
// ============================================================================

export const COMPONENTS = {
  // Tarjetas
  CARD: {
    BASE: 'bg-card border border-border rounded-xl shadow-md',
    HOVER: 'hover:shadow-lg hover:border-primary/30 transition-all duration-300',
    PRIMARY: 'bg-primary/10 border-primary/20 text-primary-foreground',
    SECONDARY: 'bg-secondary/10 border-secondary/20 text-secondary-foreground',
    ELEVATED: 'shadow-lg hover:shadow-xl',
  },
  
  // Botones
  BUTTON: {
    BASE: 'px-6 py-3 rounded-xl font-semibold transition-all duration-300',
    PRIMARY: 'bg-primary hover:bg-primary/90 text-primary-foreground',
    SECONDARY: 'bg-secondary hover:bg-secondary/90 text-secondary-foreground',
    OUTLINE: 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground',
    GHOST: 'text-primary hover:bg-primary/10',
    LARGE: 'px-8 py-4 text-lg',
    SMALL: 'px-4 py-2 text-sm',
  },
  
  // Inputs
  INPUT: {
    BASE: 'w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors',
    ERROR: 'border-destructive focus:ring-destructive/20 focus:border-destructive',
  },
  
  // Badges
  BADGE: {
    BASE: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
    PRIMARY: 'bg-primary/10 text-primary border border-primary/20',
    SECONDARY: 'bg-secondary/10 text-secondary border border-secondary/20',
    SUCCESS: 'bg-success/10 text-success border border-success/20',
    WARNING: 'bg-warning/10 text-warning border border-warning/20',
    ERROR: 'bg-error/10 text-error border border-error/20',
  },
} as const;

// ============================================================================
// GRADIENTES UNIFICADOS
// ============================================================================

export const GRADIENTS = {
  // Gradientes principales
  PRIMARY: {
    DEFAULT: 'linear-gradient(135deg, hsl(162 100% 45%) 0%, hsl(162 100% 55%) 100%)',
    REVERSE: 'linear-gradient(135deg, hsl(162 100% 55%) 0%, hsl(162 100% 45%) 100%)',
    RADIAL: 'radial-gradient(circle, hsl(162 100% 45%) 0%, hsl(162 100% 35%) 100%)',
  },
  
  SECONDARY: {
    DEFAULT: 'linear-gradient(135deg, hsl(25 95% 60%) 0%, hsl(25 95% 70%) 100%)',
    REVERSE: 'linear-gradient(135deg, hsl(25 95% 70%) 0%, hsl(25 95% 60%) 100%)',
    RADIAL: 'radial-gradient(circle, hsl(25 95% 60%) 0%, hsl(25 95% 50%) 100%)',
  },
  
  // Gradientes de fondo
  BACKGROUND: {
    DARK: 'linear-gradient(135deg, hsl(220 20% 8%) 0%, hsl(220 15% 12%) 100%)',
    CARD: 'linear-gradient(135deg, hsl(220 15% 12%) 0%, hsl(220 15% 15%) 100%)',
    GLASS: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
  },
} as const;

// ============================================================================
// UTILIDADES Y HELPERS
// ============================================================================

export const UTILS = {
  // Clases de transición
  TRANSITIONS: {
    ALL: 'transition-all duration-300',
    COLORS: 'transition-colors duration-200',
    TRANSFORM: 'transition-transform duration-200',
    OPACITY: 'transition-opacity duration-200',
    SHADOW: 'transition-shadow duration-200',
  },
  
  // Clases de hover
  HOVER: {
    SCALE: 'hover:scale-105',
    LIFT: 'hover:-translate-y-1',
    GLOW: 'hover:shadow-lg',
    BORDER: 'hover:border-primary/50',
  },
  
  // Clases de focus
  FOCUS: {
    RING: 'focus:ring-2 focus:ring-primary/20 focus:outline-none',
    BORDER: 'focus:border-primary',
  },
} as const;

// ============================================================================
// FUNCIONES UTILITARIAS
// ============================================================================

export const getColorClass = (color: keyof typeof COLORS, variant?: string) => {
  if (variant) {
    return COLORS[color][variant as keyof typeof COLORS[typeof color]];
  }
  return COLORS[color].DEFAULT;
};

export const getComponentClass = (component: keyof typeof COMPONENTS, variant?: string) => {
  if (variant) {
    return COMPONENTS[component][variant as keyof typeof COMPONENTS[typeof component]];
  }
  return COMPONENTS[component].BASE;
};

export const combineClasses = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};
