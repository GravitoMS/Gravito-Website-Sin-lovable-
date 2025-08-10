// Sistema de validación de colores para Gravito
// Este archivo previene el uso de colores no autorizados fuera del sistema centralizado

import { COLORS } from './designSystem';

// ============================================================================
// VALIDACIÓN DE COLORES AUTORIZADOS
// ============================================================================

// Colores autorizados del sistema centralizado
export const AUTHORIZED_COLORS = {
  // Colores primarios del sistema
  primary: COLORS.primary,
  secondary: COLORS.secondary,
  accent: COLORS.accent,
  
  // Colores de estado
  success: COLORS.success,
  warning: COLORS.warning,
  error: COLORS.error,
  info: COLORS.info,
  
  // Colores neutros
  white: COLORS.white,
  black: COLORS.black,
  transparent: COLORS.transparent,
  
  // Colores del sistema de diseño (CSS variables)
  card: 'var(--card)',
  border: 'var(--border)',
  foreground: 'var(--foreground)',
  muted: 'var(--muted)',
  'muted-foreground': 'var(--muted-foreground)',
  background: 'var(--background)',
  'primary-foreground': 'var(--primary-foreground)',
  'secondary-foreground': 'var(--secondary-foreground)',
  'accent-foreground': 'var(--accent-foreground)',
} as const;

// Función para validar si un color está autorizado
export function isColorAuthorized(color: string): boolean {
  // Verificar si es un color del sistema centralizado
  const allColors = Object.values(AUTHORIZED_COLORS).flat();
  if (allColors.includes(color)) {
    return true;
  }
  
  // Verificar si es una variación autorizada (ej: primary/20, muted/30)
  const baseColor = color.split('/')[0];
  if (baseColor in AUTHORIZED_COLORS) {
    return true;
  }
  
  // Verificar si es una variable CSS del sistema
  if (color.startsWith('var(--') && color.endsWith(')')) {
    const cssVar = color.slice(6, -1);
    if (cssVar in AUTHORIZED_COLORS) {
      return true;
    }
  }
  
  return false;
}

// Función para obtener colores autorizados por categoría
export function getAuthorizedColorsByCategory(category: keyof typeof AUTHORIZED_COLORS) {
  return AUTHORIZED_COLORS[category];
}

// Función para generar variaciones autorizadas de un color
export function generateColorVariation(baseColor: string, opacity: number): string {
  if (!isColorAuthorized(baseColor)) {
    throw new Error(`Color no autorizado: ${baseColor}`);
  }
  
  if (opacity < 0 || opacity > 1) {
    throw new Error(`Opacidad debe estar entre 0 y 1, recibido: ${opacity}`);
  }
  
  return `${baseColor}/${Math.round(opacity * 100)}`;
}

// Función para validar clases de Tailwind que usen colores
export function validateTailwindColorClass(className: string): boolean {
  // Patrones de colores de Tailwind
  const colorPatterns = [
    /bg-(primary|secondary|accent|success|warning|error|info|card|border|foreground|muted|background|white|black|transparent)(-\d+)?(\/\d+)?/,
    /text-(primary|secondary|accent|success|warning|error|info|card|border|foreground|muted|background|white|black|transparent)(-\d+)?(\/\d+)?/,
    /border-(primary|secondary|accent|success|warning|error|info|card|border|foreground|muted|background|white|black|transparent)(-\d+)?(\/\d+)?/,
  ];
  
  return colorPatterns.some(pattern => pattern.test(className));
}

// Función para obtener el color más cercano autorizado
export function getClosestAuthorizedColor(color: string): string {
  // Si ya está autorizado, devolverlo
  if (isColorAuthorized(color)) {
    return color;
  }
  
  // Mapear colores comunes de Tailwind a colores autorizados
  const colorMapping: Record<string, string> = {
    'green-700': 'primary.700',
    'green-600': 'primary.600',
    'green-500': 'primary.500',
    'green-400': 'primary.400',
    'green-300': 'primary.300',
    'green-200': 'primary.200',
    'green-100': 'primary.100',
    'green-50': 'primary.50',
    
    'gray-900': 'secondary.900',
    'gray-800': 'secondary.800',
    'gray-700': 'secondary.700',
    'gray-600': 'secondary.600',
    'gray-500': 'secondary.500',
    'gray-400': 'secondary.400',
    'gray-300': 'secondary.300',
    'gray-200': 'secondary.200',
    'gray-100': 'secondary.100',
    'gray-50': 'secondary.50',
    
    'blue-600': 'accent.600',
    'blue-500': 'accent.500',
    'blue-400': 'accent.400',
  };
  
  return colorMapping[color] || 'primary.500'; // Color por defecto
}

// Exportar el sistema de validación
export const COLOR_VALIDATOR = {
  isColorAuthorized,
  getAuthorizedColorsByCategory,
  generateColorVariation,
  validateTailwindColorClass,
  getClosestAuthorizedColor,
  AUTHORIZED_COLORS,
} as const;
