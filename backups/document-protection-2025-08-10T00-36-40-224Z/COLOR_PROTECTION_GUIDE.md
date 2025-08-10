# 🛡️ Guía del Sistema de Protección de Colores - Gravito

## 📋 Descripción General

El Sistema de Protección de Colores de Gravito es una solución integral que previene el uso de colores no autorizados fuera del sistema centralizado de diseño. Este sistema garantiza la consistencia visual y mantiene la identidad de marca en toda la aplicación.

## 🎯 Objetivos

- ✅ **Prevenir** el uso de colores no autorizados
- 🎨 **Garantizar** la consistencia del sistema de diseño
- 🚫 **Bloquear** colores genéricos (green, gray, blue, red, etc.)
- 🔍 **Detectar** violaciones en tiempo real
- 💡 **Sugerir** alternativas autorizadas
- 📊 **Reportar** el estado de protección

## 🏗️ Arquitectura del Sistema

### 1. **Sistema de Validación** (`colorValidator.ts`)
- Valida colores individuales
- Sugiere colores alternativos
- Integra con ESLint

### 2. **Sistema de Protección** (`colorProtection.ts`)
- Reglas estrictas de protección
- Validación de clases Tailwind
- Patrones permitidos

### 3. **Hooks de React** (`useColorValidation.ts`)
- Validación en tiempo de desarrollo
- Warnings en consola
- Estado de validación

### 4. **Componentes de Desarrollo**
- Panel de validación visual
- Estado de protección en tiempo real
- Reglas de protección interactivas

## 🚫 Colores Prohibidos

El sistema bloquea automáticamente estos colores genéricos:

```typescript
FORBIDDEN_COLORS = [
  'green', 'gray', 'blue', 'red', 'yellow', 
  'orange', 'purple', 'pink', 'indigo', 'teal'
]
```

## ✅ Colores Autorizados

### Colores Principales
- **Primary**: Paleta completa (50-900)
- **Secondary**: Paleta completa (50-900)
- **Accent**: Paleta completa (50-900)

### Colores de Estado
- **Success**: `#10b981`
- **Warning**: `#f59e0b`
- **Error**: `#ef4444`
- **Info**: `#3b82f6`

### Colores del Sistema
- **Card**: `var(--card)`
- **Border**: `var(--border)`
- **Foreground**: `var(--foreground)`
- **Muted**: `var(--muted)`
- **Background**: `var(--background)`

## 🎨 Patrones de Clases Permitidos

### Backgrounds
```typescript
'bg-primary', 'bg-secondary', 'bg-accent', 'bg-success', 'bg-warning', 'bg-error', 'bg-info'
'bg-card', 'bg-border', 'bg-foreground', 'bg-muted', 'bg-background'
```

### Textos
```typescript
'text-primary', 'text-secondary', 'text-accent', 'text-success', 'text-warning', 'text-error', 'text-info'
'text-card', 'text-border', 'text-foreground', 'text-muted', 'text-background'
```

### Bordes
```typescript
'border-primary', 'border-secondary', 'border-accent', 'border-success', 'border-warning', 'border-error', 'border-info'
'border-card', 'border-border', 'border-foreground', 'border-muted', 'border-background'
```

### Hover y Focus
```typescript
'hover:bg-primary', 'hover:bg-secondary', 'hover:bg-accent'
'hover:text-primary', 'hover:text-secondary', 'hover:text-accent'
'focus:ring-primary', 'focus:ring-secondary', 'focus:ring-accent'
```

## 🛠️ Uso del Sistema

### 1. **Validación Manual**
```typescript
import { COLOR_PROTECTION_SYSTEM } from '@/lib/colorProtection';

// Validar un color
const isValid = COLOR_PROTECTION_SYSTEM.isColorAuthorized('primary-500');

// Validar clases Tailwind
const validation = COLOR_PROTECTION_SYSTEM.validateTailwindClasses('bg-primary text-white');
```

### 2. **Hook de React**
```typescript
import { useColorValidation } from '@/hooks/useColorValidation';

function MyComponent() {
  const { validateColor, validateTailwindClasses, warnings } = useColorValidation();
  
  // Validar en tiempo real
  const handleColorChange = (color: string) => {
    if (!validateColor(color, 'MyComponent')) {
      console.warn('Color no autorizado detectado');
    }
  };
  
  return (
    <div>
      {warnings.length > 0 && (
        <div className="text-warning">
          {warnings.length} warning(s) de colores
        </div>
      )}
    </div>
  );
}
```

### 3. **Validación con ESLint**
```javascript
// .eslintrc.cjs
module.exports = {
  plugins: ['gravito-colors'],
  rules: {
    'gravito-colors/no-unauthorized-colors': 'error',
    'gravito-colors/use-centralized-colors': 'warn',
  },
};
```

## 📊 Scripts de Validación

### Validación Automática
```bash
# Validar todos los archivos
npm run validate-colors

# Validar con ESLint
npm run lint
```

### Validación en Desarrollo
- Los componentes de desarrollo muestran warnings en tiempo real
- La consola del navegador muestra violaciones
- El panel de validación lista todas las violaciones

## 🔧 Configuración

### 1. **Instalación de Dependencias**
```bash
npm install --save-dev glob
```

### 2. **Configuración de ESLint**
El plugin personalizado `gravito-colors` se configura automáticamente.

### 3. **Variables de Entorno**
```bash
# Solo en desarrollo
NODE_ENV=development
```

## 📈 Monitoreo y Reportes

### Estado de Protección
- **ACTIVE**: Sistema funcionando correctamente
- **WARNING**: Violaciones menores detectadas
- **ERROR**: Violaciones críticas detectadas

### Métricas
- Total de colores autorizados
- Total de colores prohibidos
- Patrones permitidos
- Última verificación

## 🚨 Manejo de Violaciones

### 1. **Detección Automática**
- ESLint detecta violaciones durante el desarrollo
- Script de validación reporta todas las violaciones
- Hooks de React muestran warnings en tiempo real

### 2. **Sugerencias Automáticas**
- El sistema sugiere colores alternativos
- Mapeo inteligente de colores prohibidos a autorizados
- Ejemplos de uso correcto

### 3. **Corrección**
```typescript
// ❌ Incorrecto
className="bg-green-500 text-white"

// ✅ Correcto
className="bg-primary-500 text-white"
```

## 🔄 Flujo de Trabajo Recomendado

### 1. **Desarrollo**
- Usar solo colores autorizados
- Validar con hooks de React
- Revisar warnings en consola

### 2. **Pre-commit**
- Ejecutar `npm run validate-colors`
- Ejecutar `npm run lint`
- Corregir violaciones antes del commit

### 3. **Revisión**
- Verificar estado de protección
- Revisar reportes de validación
- Confirmar consistencia visual

## 📚 Ejemplos Prácticos

### Botón Primario
```typescript
// ✅ Correcto
<button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg">
  Botón Primario
</button>

// ❌ Incorrecto
<button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
  Botón Primario
</button>
```

### Tarjeta de Información
```typescript
// ✅ Correcto
<div className="bg-card border border-border rounded-lg p-6 shadow-sm">
  <h3 className="text-foreground font-semibold">Título</h3>
  <p className="text-muted-foreground">Descripción</p>
</div>

// ❌ Incorrecto
<div className="bg-gray-100 border border-gray-300 rounded-lg p-6 shadow-sm">
  <h3 className="text-gray-900 font-semibold">Título</h3>
  <p className="text-gray-600">Descripción</p>
</div>
```

## 🆘 Solución de Problemas

### Error: "Color no autorizado"
1. Verificar el color usado
2. Consultar la lista de colores autorizados
3. Usar la función `getClosestAuthorizedColor()`
4. Aplicar el color sugerido

### Error: "Clase Tailwind no permitida"
1. Verificar el patrón de la clase
2. Consultar patrones permitidos
3. Usar clases del sistema centralizado
4. Validar con `validateTailwindClasses()`

### Warnings en Consola
1. Revisar el panel de validación
2. Corregir colores no autorizados
3. Usar hooks de validación
4. Ejecutar script de validación

## 🔮 Futuras Mejoras

- [ ] Integración con TypeScript para validación en tiempo de compilación
- [ ] Plugin de VS Code para validación en tiempo real
- [ ] Sistema de reportes automáticos
- [ ] Integración con CI/CD
- [ ] Dashboard de métricas de protección

## 📞 Soporte

Para dudas o problemas con el sistema de protección:

1. Revisar esta documentación
2. Consultar los comentarios en el código
3. Ejecutar scripts de validación
4. Revisar warnings en consola
5. Contactar al equipo de desarrollo

---

**🎨 Recuerda: Solo usa colores del sistema centralizado de Gravito para mantener la consistencia visual y la identidad de marca.**
