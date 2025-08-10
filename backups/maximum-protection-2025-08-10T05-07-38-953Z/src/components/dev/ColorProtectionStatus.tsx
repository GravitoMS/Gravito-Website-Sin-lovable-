import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, Eye, EyeOff, X } from 'lucide-react';
import { COLOR_PROTECTION_SYSTEM } from '@/lib/colorProtection';

/**
 * Componente de desarrollo que muestra el estado de protección de colores
 * Solo se muestra en modo desarrollo
 */
export function ColorProtectionStatus() {
  const [isVisible, setIsVisible] = useState(true);
  const [protectionStatus, setProtectionStatus] = useState<'ACTIVE' | 'WARNING' | 'ERROR'>('ACTIVE');
  const [lastCheck, setLastCheck] = useState<Date>(new Date());

  // Solo mostrar en desarrollo
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  // Simular verificación de estado
  useEffect(() => {
    // Solo ejecutar en desarrollo
    if (process.env.NODE_ENV !== 'development') {
      return;
    }
    const interval = setInterval(() => {
      setLastCheck(new Date());
      
      // Simular diferentes estados de protección
      const random = Math.random();
      if (random > 0.8) {
        setProtectionStatus('WARNING');
      } else if (random > 0.95) {
        setProtectionStatus('ERROR');
      } else {
        setProtectionStatus('ACTIVE');
      }
    }, 10000); // Verificar cada 10 segundos

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (protectionStatus) {
      case 'ACTIVE':
        return 'text-success border-success/30 bg-success/10';
      case 'WARNING':
        return 'text-warning border-warning/30 bg-warning/10';
      case 'ERROR':
        return 'text-error border-error/30 bg-error/10';
      default:
        return 'text-success border-success/30 bg-success/10';
    }
  };

  const getStatusIcon = () => {
    switch (protectionStatus) {
      case 'ACTIVE':
        return <CheckCircle className="h-4 w-4" />;
      case 'WARNING':
        return <AlertTriangle className="h-4 w-4" />;
      case 'ERROR':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getStatusText = () => {
    switch (protectionStatus) {
      case 'ACTIVE':
        return 'Protección Activa';
      case 'WARNING':
        return 'Advertencia Detectada';
      case 'ERROR':
        return 'Violación Crítica';
      default:
        return 'Protección Activa';
    }
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed top-4 right-4 z-50 p-2 bg-card border border-border rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
        title="Mostrar estado de protección"
      >
        <Eye className="h-4 w-4 text-muted-foreground" />
      </button>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`flex items-center space-x-3 px-4 py-2 rounded-full border ${getStatusColor()} shadow-lg backdrop-blur-sm`}>
        <div className="flex items-center space-x-2">
          <Shield className="h-4 w-4" />
          {getStatusIcon()}
          <span className="text-sm font-medium">{getStatusText()}</span>
        </div>
        
        <div className="text-xs text-muted-foreground">
          Última verificación: {lastCheck.toLocaleTimeString()}
        </div>
        
        <button
          onClick={() => setIsVisible(false)}
          className="ml-2 p-1 hover:bg-white/20 rounded-full transition-colors"
          title="Ocultar estado de protección"
        >
          <EyeOff className="h-3 w-3" />
        </button>
      </div>
      
      {/* Información adicional */}
      <div className="mt-2 bg-card border border-border rounded-lg shadow-lg p-3 max-w-xs">
        <div className="text-xs text-muted-foreground space-y-1">
          <div>🛡️ Sistema de Protección de Colores</div>
          <div>🎨 Colores autorizados: {Object.keys(COLOR_PROTECTION_SYSTEM.rules.AUTHORIZED_COLORS).length}</div>
          <div>❌ Colores prohibidos: {COLOR_PROTECTION_SYSTEM.rules.FORBIDDEN_COLORS.length}</div>
          <div>✅ Patrones permitidos: {COLOR_PROTECTION_SYSTEM.rules.ALLOWED_TAILWIND_PATTERNS.length}</div>
        </div>
      </div>
    </div>
  );
}

/**
 * Componente de desarrollo que muestra reglas de protección
 */
export function ColorProtectionRules() {
  const [isExpanded, setIsExpanded] = useState(false);

  // Solo mostrar en desarrollo
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-card border border-border rounded-lg shadow-lg p-3 hover:shadow-xl transition-all duration-200"
        title="Mostrar reglas de protección"
      >
        <Shield className="h-5 w-5 text-primary" />
      </button>
      
      {isExpanded && (
        <div className="absolute bottom-full left-0 mb-2 bg-card border border-border rounded-lg shadow-lg p-4 max-w-sm">
          <h3 className="font-semibold text-foreground mb-3">Reglas de Protección</h3>
          
          <div className="space-y-3 text-sm">
            <div>
              <h4 className="font-medium text-foreground mb-2">❌ Colores Prohibidos:</h4>
              <div className="grid grid-cols-2 gap-1 text-muted-foreground">
                {COLOR_PROTECTION_SYSTEM.rules.FORBIDDEN_COLORS.map(color => (
                  <span key={color} className="px-2 py-1 bg-muted/30 rounded text-xs">
                    {color}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-foreground mb-2">✅ Colores Autorizados:</h4>
              <div className="space-y-1 text-muted-foreground">
                {Object.entries(COLOR_PROTECTION_SYSTEM.rules.AUTHORIZED_COLORS).map(([category, colors]) => (
                  <div key={category} className="flex items-center space-x-2">
                    <span className="font-medium text-xs capitalize">{category}:</span>
                    <span className="text-xs">{colors.length} colores</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
