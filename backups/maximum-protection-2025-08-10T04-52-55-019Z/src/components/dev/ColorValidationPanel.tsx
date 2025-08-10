import React from 'react';
import { AlertTriangle, X, Palette, CheckCircle } from 'lucide-react';
import { useColorValidation } from '@/hooks/useColorValidation';

/**
 * Panel de desarrollo para mostrar warnings de validación de colores
 * Solo se muestra en modo desarrollo
 */
export function ColorValidationPanel() {
  const { warnings, clearWarnings, hasWarnings } = useColorValidation();

  // Solo mostrar en desarrollo
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  if (!hasWarnings) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <div className="bg-card border border-border rounded-lg shadow-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Palette className="h-5 w-5 text-warning" />
            <h3 className="font-semibold text-foreground">
              Validación de Colores
            </h3>
          </div>
          <button
            onClick={clearWarnings}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {warnings.map((warning, index) => (
            <div
              key={index}
              className="flex items-start space-x-2 p-2 bg-muted/30 rounded border border-border/50"
            >
              <AlertTriangle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                {warning}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-3 pt-3 border-t border-border/50">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <CheckCircle className="h-3 w-3" />
            <span>
              {warnings.length} warning{warnings.length !== 1 ? 's' : ''} de colores
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Componente de desarrollo para mostrar el estado de validación de colores
 */
export function ColorValidationStatus() {
  const { hasWarnings } = useColorValidation();

  // Solo mostrar en desarrollo
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center space-x-2">
        {hasWarnings ? (
          <div className="flex items-center space-x-2 bg-warning/20 text-warning px-3 py-2 rounded-full border border-warning/30">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm font-medium">Colores no autorizados</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2 bg-success/20 text-success px-3 py-2 rounded-full border border-success/30">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Colores válidos</span>
          </div>
        )}
      </div>
    </div>
  );
}
