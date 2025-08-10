# 🚨 BIBLIA ABSOLUTA DE ANIMACIONES - GRAVITO 🚨

## ⚠️ REGLA FUNDAMENTAL ⚠️
**NO SE PERMITE CREAR NINGÚN EFECTO, ANIMACIÓN O RECURSO QUE NO ESTÉ EN ESTA BIBLIA.**
**NO SE PERMITE USAR motion.div DIRECTAMENTE.**
**NO SE PERMITE USAR COLORES HARDCODED.**

---

## 📚 SISTEMA CENTRALIZADO

### 1. ARCHIVOS PRINCIPALES
- **`/src/lib/animations.ts`** - Constantes y configuraciones de animación
- **`/src/lib/designSystem.ts`** - Sistema de colores y diseño
- **`/src/components/ui/AnimatedComponents.tsx`** - Componentes de animación

### 2. IMPORTS OBLIGATORIOS
```tsx
// ✅ CORRECTO - Solo usar estos
import { FadeInUp, FadeInSide, HoverScale } from '@/components/ui/AnimatedComponents';
import { DESIGN_SYSTEM } from '@/lib/designSystem';

// ❌ INCORRECTO - NUNCA usar estos
import { motion } from 'framer-motion'; // PROHIBIDO
<motion.div> // PROHIBIDO
```

---

## 🎭 COMPONENTES DE ANIMACIÓN PERMITIDOS

### ENTRADA BÁSICA
```tsx
// ✅ Entrada desde abajo
<FadeInUp>
  <h1>Título</h1>
</FadeInUp>

// ✅ Entrada desde abajo con delay
<FadeInUp delay={0.2}>
  <p>Texto</p>
</FadeInUp>

// ✅ Entrada desde los lados
<FadeInSide direction="left">
  <div>Contenido</div>
</FadeInSide>

// ✅ Entrada con escala
<FadeInScale>
  <img src="..." />
</FadeInScale>
```

### ENTRADA ESTAGGERED (MÚLTIPLES ELEMENTOS)
```tsx
// ✅ Grupo con delays automáticos
<StaggeredGroup baseDelay={0.1}>
  {[item1, item2, item3].map((item, index) => (
    <div key={index}>{item}</div>
  ))}
</StaggeredGroup>

// ✅ Individual con índice
<FadeInUpStaggered index={0} totalItems={3}>
  <div>Primer elemento</div>
</FadeInUpStaggered>
```

### HOVER ESTÁNDAR
```tsx
// ✅ Escalar en hover
<HoverScale>
  <button>Botón</button>
</HoverScale>

// ✅ Levantar en hover
<HoverLift>
  <Card>Tarjeta</Card>
</HoverLift>

// ✅ Glow en hover
<HoverGlow>
  <div>Elemento con glow</div>
</HoverGlow>
```

### SCROLL (WHILE IN VIEW)
```tsx
// ✅ Aparecer al hacer scroll
<FadeInOnScroll>
  <section>Sección</section>
</FadeInOnScroll>

// ✅ Deslizar al hacer scroll
<SlideInOnScroll direction="right">
  <div>Contenido</div>
</SlideInOnScroll>
```

### LOADING
```tsx
// ✅ Pulsar
<LoadingPulse>
  <div>Punto de carga</div>
</LoadingPulse>

// ✅ Rebote
<LoadingBounce>
  <div>Indicador</div>
</LoadingBounce>
```

### COMPUESTOS
```tsx
// ✅ Entrada + Hover
<FadeInUpWithHover hoverEffect="scale">
  <button>Botón animado</button>
</FadeInUpWithHover>
```

---

## 🎨 SISTEMA DE COLORES PERMITIDOS

### COLORES PRINCIPALES
```tsx
// ✅ VERDE PRINCIPAL - Solo usar estos
import { DESIGN_SYSTEM } from '@/lib/designSystem';

// En CSS/Tailwind
className="bg-primary text-primary-foreground"
className="border-primary/20"

// En estilos inline
style={{ color: DESIGN_SYSTEM.colors.primary.DEFAULT }}

// ❌ PROHIBIDO - NUNCA usar estos
style={{ color: '#19a476' }}
style={{ color: '#6EE7B7' }}
className="text-green-400"
```

### COLORES SECUNDARIOS
```tsx
// ✅ NARANJA SECUNDARIO - Solo usar estos
className="bg-secondary text-secondary-foreground"
className="border-secondary/20"

// ❌ PROHIBIDO
style={{ color: '#ca7134' }}
className="text-orange-400"
```

### GRISES ESTANDARIZADOS
```tsx
// ✅ GRISES DEL SISTEMA
className="bg-gray-800"        // hsl(220 15% 20%)
className="bg-gray-900"        // hsl(220 15% 10%)
className="border-gray-300/20" // Solo para bordes sutiles

// ❌ PROHIBIDO
className="bg-black"
className="bg-white"
```

---

## ⏱️ DURACIONES Y DELAYS PERMITIDOS

### DURACIONES ESTÁNDAR
```tsx
import { ANIMATION_DURATIONS } from '@/lib/animations';

// ✅ Solo usar estas constantes
ANIMATION_DURATIONS.FAST    // 0.3s
ANIMATION_DURATIONS.NORMAL  // 0.5s
ANIMATION_DURATIONS.SLOW    // 0.8s
ANIMATION_DURATIONS.VERY_SLOW // 1.2s

// ❌ PROHIBIDO
transition={{ duration: 0.3 }}  // Usar constante
transition={{ duration: 0.8 }}  // Usar constante
```

### DELAYS ESTÁNDAR
```tsx
import { ANIMATION_DELAYS } from '@/lib/animations';

// ✅ Solo usar estas constantes
ANIMATION_DELAYS.NONE      // 0
ANIMATION_DELAYS.SMALL     // 0.1
ANIMATION_DELAYS.MEDIUM    // 0.2
ANIMATION_DELAYS.LARGE     // 0.3
ANIMATION_DELAYS.XLARGE    // 0.4
ANIMATION_DELAYS.XXLARGE   // 0.6

// ❌ PROHIBIDO
delay={0.1}  // Usar constante
delay={0.2}  // Usar constante
```

---

## 🔧 COMPONENTES DE DISEÑO ESTANDARIZADOS

### TARJETAS
```tsx
// ✅ TARJETA ESTÁNDAR
<Card className="border border-border bg-card hover:shadow-lg transition-all duration-300">
  <CardContent>
    <h3>Título</h3>
    <p>Contenido</p>
  </CardContent>
</Card>

// ✅ TARJETA CON BORDE PRIMARIO
<Card className="border border-primary/20 bg-card hover:shadow-lg transition-all duration-300">
  <CardContent>
    <h3>Título</h3>
    <p>Contenido</p>
  </CardContent>
</Card>

// ✅ TARJETA OSCURA (solo para casos específicos)
<Card className="bg-[#202225] border-gray-300/20">
  <CardContent>
    <h3>Título</h3>
    <p>Contenido</p>
  </CardContent>
</Card>
```

### BOTONES
```tsx
// ✅ BOTÓN PRIMARIO
<Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
  Acción
</Button>

// ✅ BOTÓN SECUNDARIO
<Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
  Acción
</Button>

// ✅ BOTÓN HERO
<Button variant="hero-yellow">
  Acción Principal
</Button>
```

---

## 🚫 EFECTOS PROHIBIDOS

### ANIMACIONES DUPLICADAS
```tsx
// ❌ PROHIBIDO - Duplicado de FadeInUp
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  Contenido
</motion.div>

// ✅ CORRECTO - Usar componente centralizado
<FadeInUp>
  Contenido
</FadeInUp>
```

### COLORES HARDCODED
```tsx
// ❌ PROHIBIDO
style={{ color: '#19a476' }}
style={{ backgroundColor: '#ca7134' }}
className="text-green-400"
className="bg-orange-500"

// ✅ CORRECTO
style={{ color: DESIGN_SYSTEM.colors.primary.DEFAULT }}
className="text-primary"
className="bg-secondary"
```

### TRANSICIONES DUPLICADAS
```tsx
// ❌ PROHIBIDO
transition={{ duration: 0.8 }}
transition={{ duration: 0.3 }}

// ✅ CORRECTO
transition={{ duration: ANIMATION_DURATIONS.SLOW }}
transition={{ duration: ANIMATION_DURATIONS.FAST }}
```

---

## 📋 CHECKLIST DE IMPLEMENTACIÓN

### ANTES DE CREAR NUEVA SECCIÓN
- [ ] ¿Existe un componente de animación para lo que necesito?
- [ ] ¿Estoy usando solo colores del sistema de diseño?
- [ ] ¿Estoy usando solo duraciones y delays estándar?
- [ ] ¿Estoy usando solo componentes de diseño estandarizados?

### AL IMPLEMENTAR
- [ ] Importar solo desde `@/components/ui/AnimatedComponents`
- [ ] Usar solo colores de `DESIGN_SYSTEM`
- [ ] Usar solo duraciones de `ANIMATION_DURATIONS`
- [ ] Usar solo delays de `ANIMATION_DELAYS`

### AL REVISAR
- [ ] ¿Hay algún `motion.div` directo?
- [ ] ¿Hay colores hardcoded?
- [ ] ¿Hay duraciones hardcoded?
- [ ] ¿Hay efectos duplicados?

---

## 🆘 CÓMO AGREGAR NUEVOS EFECTOS

### 1. NO CREAR EN COMPONENTES
Si necesitas un nuevo efecto, **NO** lo crees en tu componente.

### 2. AGREGAR AL SISTEMA CENTRALIZADO
```tsx
// En /src/lib/animations.ts
export const NEW_ANIMATION = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: ANIMATION_DURATIONS.SLOW }
};

// En /src/components/ui/AnimatedComponents.tsx
export const NewAnimationComponent: React.FC<Props> = ({ children, ...props }) => (
  <motion.div {...NEW_ANIMATION} {...props}>
    {children}
  </motion.div>
);
```

### 3. DOCUMENTAR EN ESTA BIBLIA
Agregar el nuevo componente a esta documentación.

---

## 🎯 EJEMPLOS DE USO CORRECTO

### SECCIÓN HERO
```tsx
<section className="min-h-screen bg-background">
  <div className="container mx-auto px-6 py-20">
    <FadeInUp>
      <h1 className="text-5xl font-black text-foreground">
        Título Principal
      </h1>
    </FadeInUp>
    
    <FadeInUp delay={ANIMATION_DELAYS.MEDIUM}>
      <p className="text-xl text-muted-foreground">
        Descripción
      </p>
    </FadeInUp>
    
    <FadeInUp delay={ANIMATION_DELAYS.LARGE}>
      <Button className="bg-primary hover:bg-primary/90">
        Acción
      </Button>
    </FadeInUp>
  </div>
</section>
```

### LISTA DE ELEMENTOS
```tsx
<StaggeredGroup baseDelay={ANIMATION_DELAYS.SMALL}>
  {items.map((item, index) => (
    <Card key={index} className="border border-border bg-card">
      <CardContent>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </CardContent>
    </Card>
  ))}
</StaggeredGroup>
```

---

## 🚨 SANCIONES POR INCUMPLIMIENTO

### PRIMERA INFRACCIÓN
- Advertencia y corrección obligatoria
- Revisión del código por el equipo

### SEGUNDA INFRACCIÓN
- Bloqueo del commit hasta corrección
- Revisión obligatoria del sistema

### TERCERA INFRACCIÓN
- Revisión completa del componente
- Refactorización obligatoria

---

## 📞 CONTACTO PARA DUDAS

Si tienes dudas sobre qué componente usar o cómo implementar algo:

1. **PRIMERO**: Revisar esta BIBLIA
2. **SEGUNDO**: Revisar `/src/components/ui/AnimatedComponents.tsx`
3. **TERCERO**: Revisar `/src/lib/animations.ts`
4. **CUARTO**: Revisar `/src/lib/designSystem.ts`
5. **ÚLTIMO**: Preguntar al equipo

---

## 🎉 BENEFICIOS DEL SISTEMA

- ✅ **Consistencia visual** en todo el sitio
- ✅ **Mantenimiento fácil** - cambios centralizados
- ✅ **Performance optimizada** - sin duplicados
- ✅ **Desarrollo rápido** - componentes reutilizables
- ✅ **Código limpio** - sin efectos residuales
- ✅ **Escalabilidad** - fácil agregar nuevas páginas

---

**RECUERDA: ESTA BIBLIA ES LA ÚNICA FUENTE DE VERDAD. RESPÉTALA.**
