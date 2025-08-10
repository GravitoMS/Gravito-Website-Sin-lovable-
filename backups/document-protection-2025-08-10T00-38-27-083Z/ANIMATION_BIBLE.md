# ANIMATION BIBLE - Sistema Centralizado de Gravito

## 🚫 REGLAS ABSOLUTAS (NO SE PUEDEN VIOLAR)

### 1. PROHIBIDO USAR DIRECTAMENTE
- ❌ `motion.div` - USAR SOLO COMPONENTES CENTRALIZADOS
- ❌ `import { motion } from 'framer-motion'` - PROHIBIDO
- ❌ Colores hardcodeados (`#19a476`, `#ca7134`, `#202225`, etc.)
- ❌ Duraciones hardcodeadas (`duration-200`, `duration-500`, etc.)
- ❌ Delays hardcodeados (`delay-100`, `delay-200`, etc.)

### 2. OBLIGATORIO USAR
- ✅ Componentes de `@/components/ui/AnimatedComponents`
- ✅ Constantes de `@/lib/animations`
- ✅ Sistema de diseño de `@/lib/designSystem`
- ✅ Variables CSS HSL para colores

## 🎯 COMPONENTES PERMITIDOS

### Entrada de Elementos
- `FadeInUp` - Entrada desde abajo con fade
- `FadeInUpStaggered` - Entrada escalonada
- `FadeInSide` - Entrada desde los lados (left/right)
- `FadeInScale` - Entrada con escala
- `FadeInUpWithHover` - Entrada + hover combinado

### Efectos de Hover
- `HoverScale` - Escala al hover
- `HoverLift` - Elevación al hover
- `HoverGlow` - Brillo al hover

### Animaciones de Scroll
- `FadeInOnScroll` - Aparece al hacer scroll
- `SlideInOnScroll` - Desliza al hacer scroll

### Loading y Estados
- `LoadingPulse` - Pulso para loading
- `LoadingBounce` - Rebote para loading

### Grupos y Contenedores
- `StaggeredGroup` - Grupo con animaciones escalonadas

## 🎨 SISTEMA DE COLORES

### Colores Principales
- `hsl(var(--primary))` - Verde principal (#19a476)
- `hsl(var(--secondary))` - Naranja secundario (#ca7134)
- `hsl(var(--card-dark))` - Fondo oscuro (#202225)

### Escala de Grises
- `hsl(var(--gray-50))` a `hsl(var(--gray-900))`
- `hsl(var(--card))` - Fondo de tarjetas
- `hsl(var(--border))` - Bordes
- `hsl(var(--muted))` - Texto atenuado

## ⏱️ DURACIONES ESTÁNDAR

### Constantes de Duración
- `ANIMATION_DURATIONS.FAST` - 0.3s
- `ANIMATION_DURATIONS.NORMAL` - 0.5s
- `ANIMATION_DURATIONS.SLOW` - 0.8s
- `ANIMATION_DURATIONS.VERY_SLOW` - 1.2s

### Constantes de Delay
- `ANIMATION_DELAYS.NONE` - 0s
- `ANIMATION_DELAYS.SMALL` - 0.1s
- `ANIMATION_DELAYS.MEDIUM` - 0.2s
- `ANIMATION_DELAYS.LARGE` - 0.3s
- `ANIMATION_DELAYS.XLARGE` - 0.4s
- `ANIMATION_DELAYS.XXLARGE` - 0.6s

## 🚫 EFECTOS PROHIBIDOS

### Efectos Eliminados
- ❌ `TextGlowEffect` - Reemplazado por `HoverGlow`
- ❌ `useMousePosition` - No se usa en el sistema centralizado
- ❌ Animaciones personalizadas con `motion.div`
- ❌ Colores hex hardcodeados
- ❌ Duraciones hardcodeadas

### Efectos Residuales Eliminados
- ❌ Variaciones de `fade-in` con diferentes valores
- ❌ Múltiples implementaciones de `hover` effects
- ❌ Animaciones de scroll duplicadas
- ❌ Sistemas de loading múltiples

## ✅ CHECKLIST DE IMPLEMENTACIÓN

### Para Nuevos Elementos
1. ✅ ¿Usa componentes centralizados?
2. ✅ ¿Usa constantes de duración/delay?
3. ✅ ¿Usa sistema de colores HSL?
4. ✅ ¿No hay `motion.div` directo?
5. ✅ ¿No hay imports de `framer-motion`?

### Para Modificaciones
1. ✅ ¿Se mantiene consistencia con el sistema?
2. ✅ ¿Se reutilizan componentes existentes?
3. ✅ ¿Se siguen las reglas de color?
4. ✅ ¿Se usan las duraciones estándar?

## 🛠️ CÓMO AGREGAR NUEVOS EFECTOS

### 1. Definir en `animations.ts`
```typescript
export const NEW_ANIMATION = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { 
    duration: ANIMATION_DURATIONS.SLOW, 
    ease: ANIMATION_EASINGS.EASE_OUT 
  }
};
```

### 2. Crear Componente en `AnimatedComponents.tsx`
```typescript
export const NewAnimationComponent: React.FC<Props> = ({ children, ...props }) => (
  <motion.div
    {...NEW_ANIMATION}
    {...props}
  >
    {children}
  </motion.div>
);
```

### 3. Documentar en `ANIMATION_BIBLE.md`
- Agregar a la lista de componentes permitidos
- Explicar cuándo y cómo usarlo
- Proporcionar ejemplos de uso

## 🚨 SANCIONES POR NO CUMPLIR

### Violaciones Críticas
- ❌ Uso directo de `motion.div` = ERROR DE COMPILACIÓN
- ❌ Colores hardcodeados = ERROR DE COMPILACIÓN
- ❌ Imports directos de framer-motion = ERROR DE COMPILACIÓN

### Violaciones Altas
- ⚠️ Duraciones hardcodeadas = WARNING
- ⚠️ Delays hardcodeados = WARNING
- ⚠️ Uso de colores no estándar = WARNING

### Violaciones Medias
- ℹ️ Espaciado hardcodeado = INFO
- ℹ️ Bordes hardcodeados = INFO
- ℹ️ Sombras hardcodeadas = INFO

## 🎯 BENEFICIOS DEL SISTEMA

### Consistencia
- ✅ Todas las animaciones siguen el mismo patrón
- ✅ Colores uniformes en toda la aplicación
- ✅ Transiciones coherentes

### Mantenibilidad
- ✅ Cambios centralizados
- ✅ Fácil debugging
- ✅ Código reutilizable

### Performance
- ✅ Optimizaciones centralizadas
- ✅ Bundle size reducido
- ✅ Lazy loading de animaciones

### Escalabilidad
- ✅ Fácil agregar nuevos efectos
- ✅ Sistema extensible
- ✅ Documentación completa

## 📚 EJEMPLOS DE USO

### Entrada Básica
```tsx
import { FadeInUp } from '@/components/ui/AnimatedComponents';

<FadeInUp delay={ANIMATION_DELAYS.SMALL}>
  <div>Contenido animado</div>
</FadeInUp>
```

### Hover con Escala
```tsx
import { HoverScale } from '@/components/ui/AnimatedComponents';

<HoverScale scale={1.1}>
  <button>Botón con hover</button>
</HoverScale>
```

### Grupo Escalonado
```tsx
import { StaggeredGroup, FadeInUpStaggered } from '@/components/ui/AnimatedComponents';

<StaggeredGroup baseDelay={ANIMATION_DELAYS.SMALL}>
  {items.map((item, index) => (
    <FadeInUpStaggered key={item.id} index={index} totalItems={items.length}>
      {item.content}
    </FadeInUpStaggered>
  ))}
</StaggeredGroup>
```

## 🔍 VALIDACIÓN AUTOMÁTICA

### Script de Validación
```bash
node scripts/validate-animations.mjs
```

### Script de Migración
```bash
node scripts/migrate-to-centralized.mjs
```

### Script de Limpieza Final
```bash
node scripts/final-cleanup.mjs
```

## 📋 ESTADO ACTUAL

### ✅ Completado
- Sistema centralizado implementado
- Componentes de animación creados
- Constantes de duración definidas
- Sistema de colores HSL implementado
- Documentación completa creada
- Scripts de validación implementados

### 🔄 En Proceso
- Migración de código existente
- Eliminación de efectos duplicados
- Validación de consistencia

### 🎯 Próximos Pasos
- Ejecutar validación final
- Verificar eliminación de duplicados
- Confirmar sistema como "Biblia" única

---

**RECUERDA: Este sistema es la BIBLIA ABSOLUTA. No se puede crear nada fuera de él.**
