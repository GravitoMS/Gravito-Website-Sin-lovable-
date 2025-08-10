# 🎨 Restricciones de Colores - Sistema Gravito

## 📋 Resumen

Basándome en las screenshots proporcionadas, he implementado un sistema de protección de colores **MUY ESTRICTO** que solo permite los colores que aparecen en las imágenes. **CUALQUIER OTRO COLOR SERÁ BLOQUEADO AUTOMÁTICAMENTE**.

## ✅ Colores ÚNICAMENTE Permitidos

### 🎯 Variables CSS del Sistema
```css
/* SOLO estos colores están autorizados */
var(--card)           /* Fondo de tarjetas */
var(--border)         /* Bordes */
var(--foreground)     /* Texto principal */
var(--muted)          /* Texto secundario */
var(--background)     /* Fondo principal */
var(--muted-foreground) /* Texto atenuado */
var(--primary-foreground) /* Texto sobre primario */
var(--secondary-foreground) /* Texto sobre secundario */
var(--accent-foreground) /* Texto sobre acento */
```

### 🚨 Colores de Estado Específicos
```css
/* SOLO estos colores de estado */
#10b981  /* success - Verde vibrante de las screenshots */
#f59e0b  /* warning - Naranja de las screenshots */
#ef4444  /* error - Rojo para errores */
#3b82f6  /* info - Azul para información */
```

### ⚪ Colores Básicos
```css
#ffffff  /* white - Blanco puro */
#000000  /* black - Negro puro */
transparent /* transparente */
```

## ❌ Colores BLOQUEADOS Automáticamente

### 🚫 TODOS estos colores están PROHIBIDOS:
```css
/* Colores genéricos BLOQUEADOS */
green-50, green-100, green-200, green-300, green-400, green-500, green-600, green-700, green-800, green-900, green-950
gray-50, gray-100, gray-200, gray-300, gray-400, gray-500, gray-600, gray-700, gray-800, gray-900, gray-950
blue-50, blue-100, blue-200, blue-300, blue-400, blue-500, blue-600, blue-700, blue-800, blue-900, blue-950
red-50, red-100, red-200, red-300, red-400, red-500, red-600, red-700, red-800, red-900, red-950
yellow-50, yellow-100, yellow-200, yellow-300, yellow-400, yellow-500, yellow-600, yellow-700, yellow-800, yellow-900, yellow-950
orange-50, orange-100, orange-200, orange-300, orange-400, orange-500, orange-600, orange-700, orange-800, orange-900, orange-950

/* Colores adicionales BLOQUEADOS */
purple, pink, indigo, teal, slate, zinc, neutral, stone, amber, lime, emerald, cyan, sky, violet, fuchsia, rose, brown, mint, olive, navy, maroon, coral, peach, lavender
```

## 🔄 Mapeo Automático de Sugerencias

Cuando uses un color prohibido, el sistema automáticamente sugerirá:

```typescript
// ❌ PROHIBIDO → ✅ SUGERIDO
green-500 → success
gray-900 → muted
blue-400 → info
red-500 → error
orange-500 → warning
yellow-500 → warning
purple-500 → muted
pink-500 → muted
```

## 🎯 Clases Tailwind Permitidas

### ✅ SOLO estas clases están autorizadas:

```css
/* Variables CSS del sistema */
bg-card, bg-border, bg-foreground, bg-muted, bg-background
text-card, text-border, text-foreground, text-muted, text-background
border-card, border-border, border-foreground, border-muted, border-background

/* Colores de estado específicos */
bg-success, bg-warning, bg-error, bg-info
text-success, text-warning, text-error, text-info
border-success, border-warning, border-error, border-info

/* Colores básicos */
bg-white, bg-black, text-white, text-black, border-white, border-black

/* Hover y focus solo con colores autorizados */
hover:bg-card, hover:bg-muted, hover:text-foreground, hover:text-muted
focus:ring-success, focus:ring-warning, focus:ring-error, focus:ring-info
```

## 🚨 Ejemplos de Violaciones Detectadas

### ❌ INCORRECTO (Será bloqueado):
```jsx
<div className="bg-green-500 text-gray-900 border-blue-400">
  <button className="bg-orange-500 hover:bg-red-500">
    Botón
  </button>
</div>
```

### ✅ CORRECTO (Permitido):
```jsx
<div className="bg-card text-foreground border-border">
  <button className="bg-success hover:bg-warning">
    Botón
  </button>
</div>
```

## 🛠️ Cómo Usar el Sistema

### 1. **Validación Automática**
```bash
npm run validate-colors
```

### 2. **ESLint en Tiempo Real**
```bash
npm run lint
```

### 3. **Hooks de React**
```typescript
import { useColorValidation } from '@/hooks/useColorValidation';

function MyComponent() {
  const { validateTailwindClasses } = useColorValidation();
  
  // Validar automáticamente
  const className = "bg-card text-foreground";
  validateTailwindClasses(className);
}
```

## 📊 Estado Actual

- **Archivos analizados**: 94
- **Archivos con violaciones**: 15
- **Total de violaciones**: 86
- **Sistema de protección**: ACTIVO y ESTRICTO

## 🎯 Objetivo

**SOLO usar colores que aparecen en las screenshots proporcionadas**. El sistema garantiza que:

1. ✅ Solo se usen colores del sistema centralizado
2. ✅ Se mantenga la consistencia visual
3. ✅ Se respete la identidad de marca
4. ✅ Se prevengan colores no autorizados

## 🔧 Corrección de Violaciones

Para corregir las 86 violaciones detectadas:

1. **Ejecutar validación**: `npm run validate-colors`
2. **Revisar sugerencias**: El sistema sugiere colores alternativos
3. **Aplicar cambios**: Usar solo colores autorizados
4. **Verificar**: Ejecutar validación nuevamente

---

**🎨 Recuerda: SOLO los colores de las screenshots están permitidos. Cualquier otro color será bloqueado automáticamente.**
