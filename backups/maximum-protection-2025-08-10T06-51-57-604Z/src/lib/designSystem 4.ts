// Sistema centralizado de diseño para Gravito
// TODOS los colores, espaciados y estilos deben venir de aquí
// NO se permiten colores hardcoded ni estilos duplicados

export const DESIGN_SYSTEM = {
  // COLORES PRINCIPALES - SOLO USAR ESTOS
  colors: {
    // Verde principal (NO usar hsl(var(--primary)) ni variaciones)
    primary: {
      DEFAULT: 'hsl(var(--primary))', // hsl(162 100% 45%)
      light: 'hsl(162 100% 55%)',
      dark: 'hsl(162 100% 35%)',
      muted: 'hsl(162 100% 45% / 0.1)',
      border: 'hsl(162 100% 45% / 0.2)',
      glow: 'hsl(162 100% 45% / 0.3)'
    },

    // Naranja secundario (NO usar hsl(var(--secondary)) ni variaciones)
    secondary: {
      DEFAULT: 'hsl(var(--secondary))', // hsl(25 95% 60%)
      light: 'hsl(25 95% 70%)',
      dark: 'hsl(25 95% 50%)',
      muted: 'hsl(25 95% 60% / 0.1)',
      border: 'hsl(25 95% 60% / 0.2)'
    },

    // Grises estandarizados
    gray: {
      50: 'hsl(220 15% 95%)',
      100: 'hsl(220 15% 90%)',
      200: 'hsl(220 15% 80%)',
      300: 'hsl(220 15% 70%)',
      400: 'hsl(220 15% 60%)',
      500: 'hsl(220 15% 50%)',
      600: 'hsl(220 15% 40%)',
      700: 'hsl(220 15% 30%)',
      800: 'hsl(220 15% 20%)',
      900: 'hsl(220 15% 10%)',
      // Grises específicos del diseño
      card: 'hsl(220 15% 12%)',
      border: 'hsl(220 15% 20%)',
      muted: 'hsl(220 15% 20%)',
      // Grises específicos de tarjetas
      cardDark: 'hsl(var(--card-dark))', // Solo para tarjetas específicas
      cardBorder: 'rgba(209, 213, 219, 0.2)' // Solo para bordes sutiles
    },

    // Estados
    success: 'hsl(142 76% 36%)',
    warning: 'hsl(38 92% 50%)',
    error: 'hsl(0 84% 60%)',
    info: 'hsl(217 91% 60%)'
  },

  // ESPACIADOS ESTANDARIZADOS
  spacing: {
    xs: '0.5rem',    // 8px
    sm: '1rem',      // 16px
    md: '1.5rem',    // 24px
    lg: '2rem',      // 32px
    xl: '3rem',      // 48px
    '2xl': '4rem',   // 64px
    '3xl': '6rem',   // 96px
    '4xl': '8rem',   // 128px
    '5xl': '12rem',  // 192px
    '6xl': '16rem'   // 256px
  },

  // BORDES Y RADIOS ESTANDARIZADOS
  borders: {
    radius: {
      none: '0',
      sm: '0.25rem',    // 4px
      md: '0.5rem',     // 8px
      lg: '1rem',       // 16px
      xl: '1.5rem',     // 24px
      '2xl': '2rem',    // 32px
      '3xl': '3rem',    // 48px
      full: '9999px'
    },
    width: {
      none: '0',
      thin: '1px',
      normal: '2px',
      thick: '4px'
    }
  },

  // SOMBRAS ESTANDARIZADAS
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    // Sombras con color primario
    primary: {
      sm: '0 1px 3px 0 hsl(var(--primary) / 0.1)',
      md: '0 4px 6px -1px hsl(var(--primary) / 0.1)',
      lg: '0 10px 15px -3px hsl(var(--primary) / 0.1)',
      xl: '0 20px 25px -5px hsl(var(--primary) / 0.1)',
      glow: '0 0 20px hsl(var(--primary) / 0.3)'
    }
  },

  // TRANSICIONES ESTANDARIZADAS
  transitions: {
    fast: '150ms ease-in-out',
    normal: '300ms ease-in-out',
    slow: '500ms ease-in-out',
    verySlow: '800ms ease-in-out'
  },

  // Z-INDEX ESTANDARIZADOS
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
    loading: 9999
  }
} as const;

// FUNCIONES HELPER PARA APLICAR EL SISTEMA
export const applyDesignSystem = {
  // Aplicar colores del sistema
  color: (colorKey: keyof typeof DESIGN_SYSTEM.colors) => DESIGN_SYSTEM.colors[colorKey],
  
  // Aplicar espaciados del sistema
  spacing: (spacingKey: keyof typeof DESIGN_SYSTEM.spacing) => DESIGN_SYSTEM.spacing[spacingKey],
  
  // Aplicar bordes del sistema
  border: (borderKey: keyof typeof DESIGN_SYSTEM.borders.radius) => DESIGN_SYSTEM.borders.radius[borderKey],
  
  // Aplicar sombras del sistema
  shadow: (shadowKey: keyof typeof DESIGN_SYSTEM.shadows) => DESIGN_SYSTEM.shadows[shadowKey],
  
  // Aplicar transiciones del sistema
  transition: (transitionKey: keyof typeof DESIGN_SYSTEM.transitions) => DESIGN_SYSTEM.transitions[transitionKey]
};

// VALIDACIÓN: NO PERMITIR USO DE COLORES HARDCODED
export const validateColors = (color: string): boolean => {
  const allowedColors = [
    'hsl(var(--primary))',
    'hsl(var(--secondary))',
    'hsl(var(--background))',
    'hsl(var(--foreground))',
    'hsl(var(--card))',
    'hsl(var(--border))',
    'hsl(var(--muted))',
    'transparent',
    'currentColor'
  ];
  
  // Solo permitir colores del sistema o CSS variables
  return allowedColors.includes(color) || 
         color.startsWith('hsl(') || 
         color.startsWith('var(--') ||
         color === 'transparent' ||
         color === 'currentColor';
};

// ERROR si se intenta usar colores no permitidos
export const enforceColorSystem = (color: string, context: string) => {
  if (!validateColors(color)) {
    throw new Error(
      `🚨 COLOR NO PERMITIDO: "${color}" en ${context}\n` +
      `Solo usar colores del sistema de diseño centralizado.\n` +
      `Colores permitidos: ${Object.keys(DESIGN_SYSTEM.colors).join(', ')}`
    );
  }
  return color;
};
