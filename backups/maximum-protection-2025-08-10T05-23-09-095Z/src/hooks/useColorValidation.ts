import { useEffect, useState } from 'react';
import { isColorAuthorized, getClosestAuthorizedColor } from '@/lib/colorValidator';

/**
 * Hook personalizado para validar colores en tiempo de desarrollo
 * Este hook detecta colores no autorizados y sugiere alternativas
 */
export function useColorValidation() {
  const [warnings, setWarnings] = useState<string[]>([]);

  // Función para validar un color
  const validateColor = (color: string, context: string = 'unknown'): boolean => {
    if (!isColorAuthorized(color)) {
      const closestColor = getClosestAuthorizedColor(color);
      const warning = `Color no autorizado "${color}" en ${context}. Sugerido: "${closestColor}"`;
      
      if (process.env.NODE_ENV === 'development') {
        console.warn(`🎨 [Color Validation] ${warning}`);
        setWarnings(prev => [...prev, warning]);
      }
      
      return false;
    }
    return true;
  };

  // Función para validar clases de Tailwind
  const validateTailwindClasses = (classes: string, context: string = 'unknown'): boolean => {
    const classList = classes.split(' ');
    let hasUnauthorizedColors = false;

    classList.forEach(className => {
      if (className.includes('-')) {
        const [prefix, color] = className.split('-');
        if (prefix && color && !isColorAuthorized(className)) {
          hasUnauthorizedColors = true;
          const closestColor = getClosestAuthorizedColor(className);
          const warning = `Clase Tailwind no autorizada "${className}" en ${context}. Sugerido: "${closestColor}"`;
          
          if (process.env.NODE_ENV === 'development') {
            console.warn(`🎨 [Color Validation] ${warning}`);
            setWarnings(prev => [...prev, warning]);
          }
        }
      }
    });

    return !hasUnauthorizedColors;
  };

  // Función para limpiar warnings
  const clearWarnings = () => {
    setWarnings([]);
  };

  // Función para obtener sugerencias de colores
  const getColorSuggestions = (unauthorizedColor: string): string[] => {
    const suggestions: string[] = [];
    
    // Sugerencias basadas en el tipo de color
    if (unauthorizedColor.includes('green')) {
      suggestions.push('primary-500', 'primary-600', 'primary-700', 'primary-800');
    } else if (unauthorizedColor.includes('gray')) {
      suggestions.push('secondary-500', 'secondary-600', 'secondary-700', 'secondary-800');
    } else if (unauthorizedColor.includes('blue')) {
      suggestions.push('accent-500', 'accent-600', 'accent-700');
    } else if (unauthorizedColor.includes('red')) {
      suggestions.push('error');
    } else if (unauthorizedColor.includes('yellow') || unauthorizedColor.includes('orange')) {
      suggestions.push('warning');
    }
    
    return suggestions;
  };

  // Limpiar warnings cuando el componente se desmonte
  useEffect(() => {
    return () => {
      clearWarnings();
    };
  }, []);

  return {
    validateColor,
    validateTailwindClasses,
    warnings,
    clearWarnings,
    getColorSuggestions,
    hasWarnings: warnings.length > 0,
  };
}

/**
 * Hook para validar colores en componentes específicos
 */
export function useComponentColorValidation(componentName: string) {
  const { validateColor, validateTailwindClasses, warnings, clearWarnings } = useColorValidation();

  const validateComponentColor = (color: string): boolean => {
    return validateColor(color, componentName);
  };

  const validateComponentTailwindClasses = (classes: string): boolean => {
    return validateTailwindClasses(classes, componentName);
  };

  return {
    validateColor: validateComponentColor,
    validateTailwindClasses: validateComponentTailwindClasses,
    warnings,
    clearWarnings,
  };
}
