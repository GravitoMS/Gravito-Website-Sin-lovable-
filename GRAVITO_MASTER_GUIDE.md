# 🚀 GRAVITO WEBSITE - GUÍA MAESTRA

## 📋 INFORMACIÓN DEL PROYECTO

**Nombre**: Gravito Website  
**Tecnologías**: React + TypeScript + Vite + Tailwind CSS + Supabase  
**URL de Producción**: https://gravito-website-10202-35-gpbl1zuj3-gravitoms-projects.vercel.app  
**Repositorio**: https://github.com/GravitoMS/gravito-website-10202-35  

---

## 🎯 OBJETIVO PRINCIPAL

**Sitio web profesional para Gravito Media Solutions con:**
- ✅ Apariencia visual atractiva y moderna
- ✅ Botón "Visual Edits" completamente funcional
- ✅ Código simple y mantenible
- ✅ Deploy automático con Vercel

---

## 🚨 REGLAS ABSOLUTAS (NO VIOLAR)

### **1. PROHIBIDO CREAR DUPLICACIONES**
- ❌ NUNCA crear `ComponentName 2.tsx`, `ComponentName 3.tsx`
- ❌ NUNCA crear `system 2.ts`, `system 3.ts`
- ❌ NUNCA crear archivos backup con números
- ✅ SIEMPRE modificar el archivo original o crear uno nuevo con nombre único

### **2. PROHIBIDO SOBRE-INGENIERÍA**
- ❌ NUNCA crear validadores complejos para cosas simples
- ❌ NUNCA crear sistemas de protección innecesarios
- ❌ NUNCA crear hooks complejos para funcionalidades básicas
- ✅ SIEMPRE usar la solución más simple que funcione

### **3. PROHIBIDO CREAR COMPONENTES DE DESARROLLO**
- ❌ NUNCA crear `EditModeToggle.tsx`, `DevTools.tsx`
- ❌ NUNCA crear componentes solo para testing
- ❌ NUNCA crear sistemas de debug complejos
- ✅ SIEMPRE usar herramientas estándar de desarrollo

### **4. OBLIGATORIO MANTENER SIMPLICIDAD**
- ✅ SIEMPRE preguntar: "¿Es esto realmente necesario?"
- ✅ SIEMPRE priorizar apariencia visual sobre complejidad técnica
- ✅ SIEMPRE usar componentes estándar cuando sea posible
- ✅ SIEMPRE documentar cambios significativos

---

## 🎨 SISTEMA DE ANIMACIONES

### **SOLO USAR COMPONENTES CENTRALIZADOS:**
```tsx
// ✅ CORRECTO
import { FadeIn, HoverScale } from '@/components/ui/SimpleAnimations';
import { EditableHeading, EditableText } from '@/components/ui/EditableAnimations';

// ❌ PROHIBIDO
import { motion } from 'framer-motion';
<motion.div> // NUNCA usar directamente
```

### **COMPONENTES PERMITIDOS:**
- ✅ `FadeIn` - Entrada simple
- ✅ `HoverScale` - Hover con escala
- ✅ `SlideIn` - Deslizamiento simple
- ✅ `EditableHeading/EditableText` - Para Visual Edits

---

## 🎨 SISTEMA DE COLORES

### **SOLO USAR COLORES DEL SISTEMA:**
```tsx
// ✅ CORRECTO
className="bg-primary text-primary-foreground"
className="text-secondary"

// ❌ PROHIBIDO
style={{ color: '#19a476' }}
className="text-green-400"
```

### **COLORES PRINCIPALES:**
- `primary` - Verde principal (#19a476)
- `secondary` - Naranja secundario (#ca7134)
- `background` - Fondo principal
- `foreground` - Texto principal

---

## 🔧 ESTRUCTURA DEL PROYECTO

```
gravito-website-10202-35/
├── src/
│   ├── components/
│   │   ├── ui/                    # Componentes básicos
│   │   │   ├── SimpleAnimations.tsx
│   │   │   ├── EditableAnimations.tsx
│   │   │   └── button.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ServicesCarousel.tsx
│   ├── pages/                     # Páginas principales
│   │   ├── Index.tsx              # Home page
│   │   ├── Servicios.tsx
│   │   ├── Estrategia.tsx
│   │   └── ...
│   ├── lib/                       # Utilidades
│   │   ├── utils.ts
│   │   └── designSystem.ts
│   └── App.tsx
├── public/                        # Assets estáticos
├── scripts/                       # Scripts de utilidad
└── GRAVITO_MASTER_GUIDE.md        # Esta guía
```

---

## 🤝 PROTOCOLO DE COMUNICACIÓN LOVABLE ↔ CURSOR

### **DIVISIÓN DE RESPONSABILIDADES:**

#### **LOVABLE:**
- ✅ **Visual Edits** - Edición directa de contenido
- ✅ **Prototipado rápido** - Pruebas de conceptos
- ✅ **Feedback visual** - Verificación de cambios
- ✅ **Testing de UX** - Experiencia de usuario

#### **CURSOR:**
- ✅ **Desarrollo de código** - Implementación técnica
- ✅ **Optimización** - Mejoras de performance
- ✅ **Refactorización** - Limpieza de código
- ✅ **Integración** - Conexión con APIs y servicios

### **FLUJO DE TRABAJO:**
```
1. Lovable → Hacer cambios visuales
2. Lovable → Verificar que funciona
3. Lovable → Comentar en GitHub
4. Cursor → Revisar cambios
5. Cursor → Optimizar si es necesario
6. Cursor → Push a repositorio
7. Vercel → Deploy automático
```

---

## 🚀 COMANDOS ESENCIALES

### **Desarrollo:**
```bash
npm run dev              # Servidor de desarrollo
npm run build            # Build de producción
npm run preview          # Preview del build
```

### **Calidad del Código:**
```bash
npm run complexity:check # Verificar complejidad
npm run quality:check    # Verificación completa
npm run lint             # Linting del código
```

### **Deploy:**
```bash
git add .                # Agregar cambios
git commit -m "mensaje"  # Commit
git push                 # Push a GitHub
# Vercel hace deploy automático
```

---

## 🔧 CONFIGURACIÓN DE VERCEL

### **URLs de Deploy:**
- **Producción**: https://gravito-website-10202-35-gpbl1zuj3-gravitoms-projects.vercel.app
- **Dashboard**: https://vercel.com/gravitoms-projects/gravito-website-10202-35

### **Auto-Deploy:**
- ✅ Conectado a GitHub
- ✅ Deploy automático en cada push
- ⚠️ **PENDIENTE**: Configurar webhooks para deploy inmediato

---

## 🎯 FUNCIONALIDADES PRINCIPALES

### **1. Visual Edits (PRIORIDAD #1)**
- ✅ Componentes `EditableHeading` y `EditableText` implementados
- ✅ Z-index configurado para evitar conflictos con iframe de Spline
- ✅ `data-editable="true"` en elementos editables
- ✅ Clases CSS de animación definidas en Tailwind

### **2. Animaciones**
- ✅ Sistema centralizado en `SimpleAnimations.tsx`
- ✅ Componentes híbridos en `EditableAnimations.tsx`
- ✅ Animaciones CSS puras para elementos editables
- ✅ Framer Motion solo para elementos no editables

### **3. Diseño Responsivo**
- ✅ Tailwind CSS para responsive design
- ✅ Componentes adaptativos
- ✅ Breakpoints estándar (sm, md, lg, xl)

---

## 🚨 PROBLEMAS CONOCIDOS Y SOLUCIONES

### **1. Visual Edits No Funciona**
**Problema**: Botón de edición no responde
**Solución**: 
- Verificar z-index de elementos
- Asegurar `pointer-events-none` en iframe de Spline
- Confirmar `data-editable="true"` en componentes

### **2. Deploy No Automático**
**Problema**: Vercel no detecta cambios automáticamente
**Solución**: 
- Configurar webhooks de GitHub a Vercel
- Usar `vercel --prod` manualmente si es necesario

### **3. Archivos Duplicados**
**Problema**: Múltiples versiones del mismo archivo
**Solución**: 
- Ejecutar `npm run complexity:check`
- Eliminar archivos duplicados
- Seguir reglas de nomenclatura

---

## 📝 TEMPLATES DE COMUNICACIÓN

### **Para Cambios de Lovable:**
```
🎨 CAMBIO VISUAL REALIZADO
- Archivo: [archivo modificado]
- Cambio: [descripción del cambio]
- Verificado: ✅ Sí / ❌ No
- Necesita optimización: Sí / No
```

### **Para Cambios de Cursor:**
```
🔧 CAMBIO TÉCNICO REALIZADO
- Archivo: [archivo modificado]
- Cambio: [descripción técnica]
- Testeado: ✅ Sí / ❌ No
- Deploy: ✅ Exitoso / ❌ Falló
```

---

## ✅ CHECKLIST ANTES DE CADA CAMBIO

1. **¿Es realmente necesario este cambio?**
2. **¿Existe ya una solución más simple?**
3. **¿Estoy creando duplicaciones?**
4. **¿Estoy sobre-ingeniando?**
5. **¿Estoy siguiendo las reglas de animaciones?**
6. **¿Estoy usando los colores del sistema?**
7. **¿Estoy documentando cambios significativos?**

---

## 🎯 OBJETIVO FINAL

**MANTENER EL CÓDIGO SIMPLE, LIMPIO Y FUNCIONAL.**
**PRIORIZAR LA APARIENCIA VISUAL SOBRE LA COMPLEJIDAD TÉCNICA.**
**GARANTIZAR QUE VISUAL EDITS FUNCIONE PERFECTAMENTE.**

---

## 📞 CONTACTO Y SOPORTE

**Para problemas técnicos**: Revisar esta guía primero
**Para cambios de contenido**: Usar Visual Edits en Lovable
**Para optimizaciones**: Coordinar con el equipo de desarrollo

---

*Última actualización: Agosto 2024*
*Versión: 1.0*
