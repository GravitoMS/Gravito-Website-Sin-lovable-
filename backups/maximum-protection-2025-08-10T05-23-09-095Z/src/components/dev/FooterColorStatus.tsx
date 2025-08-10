import React from 'react';
import { Shield, CheckCircle } from 'lucide-react';

/**
 * Componente pequeño para mostrar el estado de protección de colores en el footer
 * Solo se muestra en modo desarrollo
 */
export function FooterColorStatus() {
  // Solo mostrar en desarrollo
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-2 left-2 z-40">
      <div className="flex items-center space-x-2 bg-card/80 backdrop-blur-sm border border-border/50 rounded-full px-3 py-1.5 shadow-sm">
        <Shield className="h-3 w-3 text-success" />
        <CheckCircle className="h-3 w-3 text-success" />
        <span className="text-xs text-muted-foreground font-medium">
          Protección Activa
        </span>
      </div>
    </div>
  );
}
