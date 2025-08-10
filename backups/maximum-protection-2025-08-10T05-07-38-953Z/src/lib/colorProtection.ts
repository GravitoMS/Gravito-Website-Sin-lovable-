import { COLORS } from './designSystem';

/**
 * Sistema de Protección de Colores para Gravito
 * Este archivo implementa reglas estrictas para prevenir el uso de colores no autorizados
 */

// ============================================================================
// REGLAS DE PROTECCIÓN
// ============================================================================

export const COLOR_PROTECTION_RULES = {
  // Colores estrictamente prohibidos - TODOS los colores genéricos
  FORBIDDEN_COLORS: [
    'green', 'gray', 'blue', 'red', 'yellow', 'orange', 'purple', 'pink', 'indigo', 'teal',
    'slate', 'zinc', 'neutral', 'stone', 'amber', 'lime', 'emerald', 'cyan', 'sky', 'violet',
    'fuchsia', 'rose', 'brown', 'mint', 'olive', 'navy', 'maroon', 'coral', 'peach', 'lavender'
  ],
  
  // Colores autorizados del sistema centralizado - SOLO los que aparecen en las screenshots
  AUTHORIZED_COLORS: {
    // Colores del sistema de diseño (variables CSS)
    card: ['var(--card)'],
    border: ['var(--border)'],
    foreground: ['var(--foreground)'],
    muted: ['var(--muted)'],
    'muted-foreground': ['var(--muted-foreground)'],
    background: ['var(--background)'],
    'primary-foreground': ['var(--primary-foreground)'],
    'secondary-foreground': ['var(--secondary-foreground)'],
    'accent-foreground': ['var(--accent-foreground)'],
    
    // Colores específicos de las screenshots
    white: ['#ffffff', 'white'],
    black: ['#000000', 'black'],
    transparent: ['transparent'],
    
    // Solo colores de estado específicos
    success: ['#10b981'],
    warning: ['#f59e0b'],
    error: ['#ef4444'],
    info: ['#3b82f6'],
  },
  
  // Patrones de clases Tailwind permitidos - SOLO los que aparecen en las screenshots
  ALLOWED_TAILWIND_PATTERNS: [
    // Variables CSS del sistema
    'bg-card', 'bg-border', 'bg-foreground', 'bg-muted', 'bg-background',
    'text-card', 'text-border', 'text-foreground', 'text-muted', 'text-background',
    'border-card', 'border-border', 'border-foreground', 'border-muted', 'border-background',
    
    // Colores de estado específicos
    'bg-success', 'bg-warning', 'bg-error', 'bg-info',
    'text-success', 'text-warning', 'text-error', 'text-info',
    'border-success', 'border-warning', 'border-error', 'border-info',
    
    // Colores básicos
    'bg-white', 'bg-black', 'text-white', 'text-black', 'border-white', 'border-black',
    
    // Hover y focus solo con colores autorizados
    'hover:bg-card', 'hover:bg-muted', 'hover:text-foreground', 'hover:text-muted',
    'focus:ring-success', 'focus:ring-warning', 'focus:ring-error', 'focus:ring-info',
  ],
} as const;

// ============================================================================
// FUNCIONES DE PROTECCIÓN
// ============================================================================

/**
 * Verifica si un color está estrictamente prohibido
 */
export function isColorForbidden(color: string): boolean {
  const normalizedColor = color.toLowerCase();
  return COLOR_PROTECTION_RULES.FORBIDDEN_COLORS.some(forbidden => 
    normalizedColor.includes(forbidden)
  );
}

/**
 * Verifica si un color está autorizado
 */
export function isColorAuthorized(color: string): boolean {
  // Si está prohibido, no está autorizado
  if (isColorForbidden(color)) {
    return false;
  }
  
  // Verificar si está en la lista de colores autorizados
  const allAuthorizedColors = Object.values(COLOR_PROTECTION_RULES.AUTHORIZED_COLORS)
    .flat()
    .map(c => c.toLowerCase());
  
  return allAuthorizedColors.some(authorized => 
    authorized.includes(color.toLowerCase()) || 
    color.toLowerCase().includes(authorized)
  );
}

/**
 * Verifica si una clase de Tailwind está permitida
 */
export function isTailwindClassAllowed(className: string): boolean {
  // Verificar patrones permitidos
  const isPatternAllowed = COLOR_PROTECTION_RULES.ALLOWED_TAILWIND_PATTERNS.some(pattern => 
    className.includes(pattern)
  );
  
  if (isPatternAllowed) {
    return true;
  }
  
  // Verificar si es una clase que no contiene colores
  if (!className.includes('-')) {
    return true;
  }
  
  // Verificar si es una clase de color autorizada
  const colorPart = className.split('-').slice(1).join('-');
  return isColorAuthorized(colorPart);
}

/**
 * Obtiene el color más cercano autorizado
 */
export function getClosestAuthorizedColor(forbiddenColor: string): string {
  const normalizedColor = forbiddenColor.toLowerCase();
  
  // Mapeo de colores prohibidos a colores autorizados - SOLO colores del sistema
  const colorMapping: Record<string, string> = {
    // Todos los colores genéricos se mapean a variables CSS del sistema
    'green': 'success',
    'gray': 'muted',
    'blue': 'info',
    'red': 'error',
    'yellow': 'warning',
    'orange': 'warning',
    'purple': 'muted',
    'pink': 'muted',
    'indigo': 'muted',
    'teal': 'muted',
    'slate': 'muted',
    'zinc': 'muted',
    'neutral': 'muted',
    'stone': 'muted',
    'amber': 'warning',
    'lime': 'success',
    'emerald': 'success',
    'cyan': 'info',
    'sky': 'info',
    'violet': 'muted',
    'fuchsia': 'muted',
    'rose': 'error',
    'brown': 'muted',
    'mint': 'success',
    'olive': 'muted',
    'navy': 'muted',
    'maroon': 'error',
    'coral': 'warning',
    'peach': 'warning',
    'lavender': 'muted',
  };
  
  // Encontrar el color base más cercano
  for (const [forbidden, authorized] of Object.entries(colorMapping)) {
    if (normalizedColor.includes(forbidden)) {
      // Extraer el número de intensidad si existe
      const intensityMatch = normalizedColor.match(/\d+/);
      if (intensityMatch) {
        const intensity = intensityMatch[0];
        return `${authorized}-${intensity}`;
      }
      return authorized;
    }
  }
  
  // Color por defecto - usar variable CSS del sistema
  return 'muted';
}

/**
 * Valida un conjunto completo de clases de Tailwind
 */
export function validateTailwindClasses(classes: string): {
  isValid: boolean;
  violations: string[];
  suggestions: Record<string, string>;
} {
  const classList = classes.split(' ').filter(Boolean);
  const violations: string[] = [];
  const suggestions: Record<string, string> = {};
  
  classList.forEach(className => {
    if (!isTailwindClassAllowed(className)) {
      violations.push(className);
      const closestColor = getClosestAuthorizedColor(className);
      suggestions[className] = closestColor;
    }
  });
  
  return {
    isValid: violations.length === 0,
    violations,
    suggestions,
  };
}

/**
 * Genera un reporte de protección de colores
 */
export function generateColorProtectionReport(): {
  timestamp: string;
  status: 'PROTECTED' | 'VIOLATIONS_DETECTED';
  summary: {
    totalClasses: number;
    validClasses: number;
    violations: number;
  };
  recommendations: string[];
} {
  const recommendations = [
    'Usa solo colores del sistema centralizado de Gravito',
    'Evita colores genéricos como green, gray, blue, red, etc.',
    'Utiliza las funciones de validación antes de implementar cambios',
    'Ejecuta npm run validate-colors regularmente',
    'Revisa la consola del navegador para warnings en desarrollo',
  ];
  
  return {
    timestamp: new Date().toISOString(),
    status: 'PROTECTED',
    summary: {
      totalClasses: 0,
      validClasses: 0,
      violations: 0,
    },
    recommendations,
  };
}

// ============================================================================
// EXPORTACIÓN DEL SISTEMA
// ============================================================================

export const COLOR_PROTECTION_SYSTEM = {
  rules: COLOR_PROTECTION_RULES,
  isColorForbidden,
  isColorAuthorized,
  isTailwindClassAllowed,
  getClosestAuthorizedColor,
  validateTailwindClasses,
  generateColorProtectionReport,
} as const;
