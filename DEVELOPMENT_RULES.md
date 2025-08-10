# 🚨 REGLAS ABSOLUTAS DE DESARROLLO - GRAVITO WEBSITE

## ⚠️ REGLAS FUNDAMENTALES (NO SE PUEDEN VIOLAR)

### 1. **PROHIBIDO CREAR DUPLICACIONES**
- ❌ NUNCA crear `ComponentName 2.tsx`, `ComponentName 3.tsx`
- ❌ NUNCA crear `system 2.ts`, `system 3.ts`
- ❌ NUNCA crear archivos backup con números
- ✅ SIEMPRE modificar el archivo original o crear uno nuevo con nombre único

### 2. **PROHIBIDO SOBRE-INGENIERÍA**
- ❌ NUNCA crear validadores complejos para cosas simples
- ❌ NUNCA crear sistemas de protección innecesarios
- ❌ NUNCA crear hooks complejos para funcionalidades básicas
- ✅ SIEMPRE usar la solución más simple que funcione

### 3. **PROHIBIDO CREAR COMPONENTES DE DESARROLLO**
- ❌ NUNCA crear `EditModeToggle.tsx`, `DevTools.tsx`
- ❌ NUNCA crear componentes solo para testing
- ❌ NUNCA crear sistemas de debug complejos
- ✅ SIEMPRE usar herramientas estándar de desarrollo

### 4. **OBLIGATORIO MANTENER SIMPLICIDAD**
- ✅ SIEMPRE preguntar: "¿Es esto realmente necesario?"
- ✅ SIEMPRE priorizar apariencia visual sobre complejidad técnica
- ✅ SIEMPRE usar componentes estándar cuando sea posible
- ✅ SIEMPRE documentar cambios significativos

## 🎯 REGLAS DE ANIMACIONES

### **SOLO USAR COMPONENTES CENTRALIZADOS:**
```tsx
// ✅ CORRECTO
import { FadeIn, HoverScale } from '@/components/ui/SimpleAnimations';
import { EditableHeading, EditableText } from '@/components/ui/EditableAnimations';

// ❌ PROHIBIDO
import { motion } from 'framer-motion';
<motion.div> // NUNCA usar directamente
```

### **SOLO USAR ANIMACIONES BÁSICAS:**
- ✅ `FadeIn` - Entrada simple
- ✅ `HoverScale` - Hover con escala
- ✅ `SlideIn` - Deslizamiento simple
- ✅ `EditableHeading/EditableText` - Para Visual Edits

## 🎨 REGLAS DE DISEÑO

### **SOLO USAR COLORES DEL SISTEMA:**
```tsx
// ✅ CORRECTO
className="bg-primary text-primary-foreground"
className="text-secondary"

// ❌ PROHIBIDO
style={{ color: '#19a476' }}
className="text-green-400"
```

### **SOLO USAR COMPONENTES ESTÁNDAR:**
- ✅ `Button` con variantes predefinidas
- ✅ `Card` con estilos estándar
- ✅ `Input` con validación básica

## 🔧 REGLAS DE ARQUITECTURA

### **ESTRUCTURA OBLIGATORIA:**
```
src/
├── components/
│   ├── ui/           # Solo componentes básicos
│   └── [feature]/    # Componentes específicos
├── pages/            # Solo páginas principales
├── lib/              # Solo utilidades esenciales
└── hooks/            # Solo hooks básicos
```

### **ARCHIVOS PROHIBIDOS:**
- ❌ `backups/` (carpeta completa)
- ❌ `dev/` (carpeta completa)
- ❌ `* 2.tsx`, `* 3.tsx`, `* 4.tsx`
- ❌ `* backup.*`, `* old.*`

## 📝 REGLAS DE DOCUMENTACIÓN

### **OBLIGATORIO DOCUMENTAR:**
- ✅ Cambios significativos en `CHANGELOG.md`
- ✅ Nuevos componentes en `COMPONENTS.md`
- ✅ Reglas de negocio en `BUSINESS_RULES.md`

### **PROHIBIDO:**
- ❌ Documentación excesiva para cosas simples
- ❌ Guías complejas para funcionalidades básicas

## 🚨 SANCIONES POR VIOLACIÓN

### **Violaciones Críticas:**
- ❌ Crear duplicaciones = ELIMINACIÓN INMEDIATA
- ❌ Sobre-ingeniería = REFACTORIZACIÓN OBLIGATORIA
- ❌ Componentes de desarrollo = ELIMINACIÓN INMEDIATA

### **Violaciones Graves:**
- ⚠️ Usar motion.div directamente = WARNING + REFACTORIZACIÓN
- ⚠️ Colores hardcodeados = WARNING + CORRECCIÓN
- ⚠️ Estructura incorrecta = WARNING + REORGANIZACIÓN

## ✅ CHECKLIST ANTES DE CADA CAMBIO

1. **¿Es realmente necesario este cambio?**
2. **¿Existe ya una solución más simple?**
3. **¿Estoy creando duplicaciones?**
4. **¿Estoy sobre-ingeniando?**
5. **¿Estoy siguiendo las reglas de animaciones?**
6. **¿Estoy usando los colores del sistema?**
7. **¿Estoy documentando cambios significativos?**

## 🎯 OBJETIVO PRINCIPAL

**MANTENER EL CÓDIGO SIMPLE, LIMPIO Y FUNCIONAL.**
**PRIORIZAR LA APARIENCIA VISUAL SOBRE LA COMPLEJIDAD TÉCNICA.**
**GARANTIZAR QUE VISUAL EDITS FUNCIONE PERFECTAMENTE.**
