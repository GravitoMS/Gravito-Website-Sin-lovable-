// Sistema centralizado de diseño para Gravito
// TODOS los componentes, colores y estilos deben venir de aquí
// NO se permite crear estilos fuera de este sistema

// ===== COLORES CENTRALIZADOS =====
export const COLORS = {
  // Solo usar estas variables CSS, NUNCA hardcodear colores
  PRIMARY: 'hsl(var(--primary))',           // Verde principal #19a476
  SECONDARY: 'hsl(var(--secondary))',       // Naranja #ca7134
  BACKGROUND: 'hsl(var(--background))',     // Fondo principal
  FOREGROUND: 'hsl(var(--foreground))',     // Texto principal
  CARD: 'hsl(var(--card))',                 // Fondo de tarjetas
  BORDER: 'hsl(var(--border))',             // Bordes
  MUTED: 'hsl(var(--muted))',               // Texto secundario
  ACCENT: 'hsl(var(--accent))',             // Acentos
  
  // Colores específicos de Gravito (solo usar estos)
  GRAVITO_GREEN: 'hsl(162 100% 45%)',      // Verde principal
  GRAVITO_ORANGE: 'hsl(25 95% 60%)',       // Naranja secundario
  GRAVITO_DARK: 'hsl(220 20% 8%)',         // Fondo oscuro
  GRAVITO_LIGHT: 'hsl(0 0% 98%)',          // Fondo claro
  
  // Gradientes centralizados
  GRADIENTS: {
    PRIMARY: 'linear-gradient(135deg, hsl(162 100% 45%) 0%, hsl(162 100% 55%) 100%)',
    SECONDARY: 'linear-gradient(135deg, hsl(25 95% 60%) 0%, hsl(25 95% 70%) 100%)',
    DARK: 'linear-gradient(135deg, hsl(220 20% 8%) 0%, hsl(220 20% 12%) 100%)',
    CARD: 'linear-gradient(135deg, hsl(var(--card) / 0.9) 0%, hsl(var(--card) / 0.7) 100%)'
  }
} as const;

// ===== ESPACIADO CENTRALIZADO =====
export const SPACING = {
  SECTION: {
    SMALL: 'py-12',
    MEDIUM: 'py-16',
    LARGE: 'py-20',
    XLARGE: 'py-32'
  },
  CONTAINER: {
    PADDING: 'px-6',
    MAX_WIDTH: 'max-w-7xl'
  },
  COMPONENT: {
    SMALL: 'p-4',
    MEDIUM: 'p-6',
    LARGE: 'p-8',
    XLARGE: 'p-12'
  }
} as const;

// ===== TIPOGRAFÍA CENTRALIZADA =====
export const TYPOGRAPHY = {
  HEADINGS: {
    HERO: 'text-5xl lg:text-7xl font-black leading-none',
    H1: 'text-4xl lg:text-6xl font-black',
    H2: 'text-3xl lg:text-5xl font-bold',
    H3: 'text-2xl lg:text-4xl font-bold',
    H4: 'text-xl lg:text-3xl font-semibold'
  },
  BODY: {
    LARGE: 'text-xl lg:text-2xl',
    MEDIUM: 'text-lg',
    SMALL: 'text-base',
    CAPTION: 'text-sm'
  },
  WEIGHTS: {
    LIGHT: 'font-light',
    NORMAL: 'font-normal',
    MEDIUM: 'font-medium',
    SEMIBOLD: 'font-semibold',
    BOLD: 'font-bold',
    BLACK: 'font-black'
  }
} as const;

// ===== BORDES Y RADIOS CENTRALIZADOS =====
export const BORDERS = {
  RADIUS: {
    SMALL: 'rounded-lg',
    MEDIUM: 'rounded-xl',
    LARGE: 'rounded-2xl',
    XLARGE: 'rounded-3xl',
    FULL: 'rounded-full'
  },
  WIDTH: {
    THIN: 'border',
    MEDIUM: 'border-2',
    THICK: 'border-4'
  },
  STYLES: {
    SOLID: 'border-solid',
    DASHED: 'border-dashed',
    DOTTED: 'border-dotted'
  }
} as const;

// ===== SOMBRAS CENTRALIZADAS =====
export const SHADOWS = {
  SMALL: 'shadow-sm',
  MEDIUM: 'shadow-md',
  LARGE: 'shadow-lg',
  XLARGE: 'shadow-xl',
  PRIMARY: 'shadow-lg hover:shadow-xl',
  GLOW: 'shadow-[0_0_20px_hsl(var(--primary)/0.3)]',
  CUSTOM: {
    PRIMARY: '0 4px 20px hsl(var(--primary) / 0.15)',
    SECONDARY: '0 4px 20px hsl(var(--secondary) / 0.15)',
    DARK: '0 4px 20px hsl(var(--background) / 0.3)'
  }
} as const;

// ===== TRANSICIONES CENTRALIZADAS =====
export const TRANSITIONS = {
  DURATION: {
    FAST: 'duration-200',
    NORMAL: 'duration-300',
    SLOW: 'duration-500',
    VERY_SLOW: 'duration-700'
  },
  PROPERTY: {
    ALL: 'transition-all',
    COLORS: 'transition-colors',
    TRANSFORM: 'transition-transform',
    OPACITY: 'transition-opacity',
    SHADOW: 'transition-shadow'
  },
  EASING: {
    LINEAR: 'ease-linear',
    IN: 'ease-in',
    OUT: 'ease-out',
    IN_OUT: 'ease-in-out'
  }
} as const;

// ===== ESTADOS DE HOVER CENTRALIZADOS =====
export const HOVER_STATES = {
  SCALE: {
    UP: 'hover:scale-105',
    DOWN: 'hover:scale-95',
    UP_SMALL: 'hover:scale-102'
  },
  LIFT: {
    UP: 'hover:-translate-y-1',
    UP_MORE: 'hover:-translate-y-2'
  },
  GLOW: {
    PRIMARY: 'hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)]',
    SECONDARY: 'hover:shadow-[0_0_20px_hsl(var(--secondary)/0.4)]'
  },
  BORDER: {
    PRIMARY: 'hover:border-primary/40',
    SECONDARY: 'hover:border-secondary/40'
  }
} as const;

// ===== LAYOUTS CENTRALIZADOS =====
export const LAYOUTS = {
  GRID: {
    COLUMNS: {
      ONE: 'grid-cols-1',
      TWO: 'grid-cols-1 md:grid-cols-2',
      THREE: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      FOUR: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
    },
    GAP: {
      SMALL: 'gap-4',
      MEDIUM: 'gap-6',
      LARGE: 'gap-8',
      XLARGE: 'gap-12'
    }
  },
  FLEX: {
    DIRECTION: {
      ROW: 'flex-row',
      COLUMN: 'flex-col',
      ROW_RESPONSIVE: 'flex-col md:flex-row'
    },
    ALIGN: {
      CENTER: 'items-center',
      START: 'items-start',
      END: 'items-end',
      STRETCH: 'items-stretch'
    },
    JUSTIFY: {
      CENTER: 'justify-center',
      START: 'justify-start',
      END: 'justify-end',
      BETWEEN: 'justify-between',
      AROUND: 'justify-around'
    }
  }
} as const;

// ===== COMPONENTES BASE CENTRALIZADOS =====
export const COMPONENT_BASES = {
  CARD: {
    BASE: 'bg-card border border-border rounded-xl p-6',
    HOVER: 'hover:shadow-lg transition-all duration-300',
    PRIMARY: 'border-primary/20 hover:border-primary/40',
    SECONDARY: 'border-secondary/20 hover:border-secondary/40'
  },
  BUTTON: {
    BASE: 'px-6 py-3 rounded-xl font-semibold transition-all duration-300',
    PRIMARY: 'bg-primary hover:bg-primary/90 text-primary-foreground',
    SECONDARY: 'bg-secondary hover:bg-secondary/90 text-secondary-foreground',
    OUTLINE: 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground',
    GHOST: 'text-primary hover:bg-primary/10'
  },
  INPUT: {
    BASE: 'w-full px-4 py-3 border border-border rounded-lg bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors',
    ERROR: 'border-destructive focus:border-destructive focus:ring-destructive/20'
  }
} as const;

// ===== FUNCIONES HELPER =====
export const createComponentClass = (base: string, variants: string[] = []) => {
  return [base, ...variants].join(' ');
};

export const createResponsiveClass = (mobile: string, desktop: string) => {
  return `${mobile} ${desktop}`;
};

export const createHoverClass = (base: string, hover: string) => {
  return `${base} ${hover}`;
};

// ===== VALIDACIÓN =====
// Esta función verifica que solo se usen estilos del sistema centralizado
export const validateStyle = (style: string): boolean => {
  const allowedStyles = [
    ...Object.values(COLORS),
    ...Object.values(SPACING),
    ...Object.values(TYPOGRAPHY),
    ...Object.values(BORDERS),
    ...Object.values(SHADOWS),
    ...Object.values(TRANSITIONS),
    ...Object.values(HOVER_STATES),
    ...Object.values(LAYOUTS),
    ...Object.values(COMPONENT_BASES)
  ];
  
  // Verificar que el estilo esté en la lista permitida
  return allowedStyles.some(allowed => style.includes(allowed));
};

// ===== EXPORTACIÓN COMPLETA =====
// Solo exportar desde aquí, NO crear estilos en otros archivos
export default {
  COLORS,
  SPACING,
  TYPOGRAPHY,
  BORDERS,
  SHADOWS,
  TRANSITIONS,
  HOVER_STATES,
  LAYOUTS,
  COMPONENT_BASES,
  createComponentClass,
  createResponsiveClass,
  createHoverClass,
  validateStyle
};
