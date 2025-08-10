# 🤝 GUÍA DE INTEGRACIÓN LOVABLE - CURSOR

## 🔄 FLUJO DE TRABAJO OPTIMIZADO

### FASE 1: DESARROLLO EN CURSOR
1. **Análisis previo**: Verificar compatibilidad con Lovable
2. **Implementación**: Seguir reglas de simplicidad radical
3. **Testing**: Verificar que Visual Edits funciona
4. **Documentación**: Actualizar guías relevantes

### FASE 2: TRANSFERENCIA A LOVABLE
1. **Push automático**: Usar webhooks configurados
2. **Verificación**: Confirmar que cambios se reflejan
3. **Testing en Lovable**: Verificar funcionalidad completa
4. **Feedback loop**: Ajustar si es necesario

## 🎯 COMPONENTES LOVABLE-READY

### COMPONENTES EDITABLES (OBLIGATORIOS):
- `EditableHeading` - Para títulos y encabezados
- `EditableText` - Para párrafos y texto
- `EditableFadeIn` - Para animaciones editables
- `EditableHoverScale` - Para efectos hover editables

### COMPONENTES NO-EDITABLES (PERMITIDOS):
- `FadeIn` - Solo para elementos decorativos
- `HoverScale` - Solo para elementos no editables
- `SlideIn` - Solo para transiciones de página

## 🚫 PROHIBICIONES ABSOLUTAS

### ANIMACIONES QUE INTERFIEREN CON LOVABLE:
- ❌ `motion.div` directo en elementos editables
- ❌ Animaciones complejas en texto editable
- ❌ Sistemas de estado que bloqueen eventos
- ❌ Iframes que capturen eventos de clic

### SISTEMAS COMPLEJOS PROHIBIDOS:
- ❌ Múltiples sistemas de animación
- ❌ Validadores de colores complejos
- ❌ Sistemas de protección innecesarios
- ❌ Componentes de desarrollo en producción

## 🔧 CONFIGURACIÓN DE WEBHOOKS

### VERCEL WEBHOOK SETUP:
1. **Dashboard de Vercel**: https://vercel.com/gravitoms-projects/gravito-website-10202-35/settings
2. **Deploy Hooks**: Crear hook para rama `main`
3. **GitHub Webhook**: Configurar para disparar en cada push
4. **Verificación**: Confirmar que deploys son automáticos

### CONFIGURACIONES HABILITADAS:
- ✅ **Pull Request Comments**: Enabled
- ✅ **Commit Comments**: Enabled
- ✅ **deployment_status Events**: Enabled
- ✅ **repository_dispatch Events**: Enabled

## 📋 CHECKLIST DE COMPATIBILIDAD

### ANTES DE CUALQUIER CAMBIO:
1. ✅ ¿El componente usa `data-editable="true"`?
2. ✅ ¿No usa `motion.div` directamente?
3. ✅ ¿No tiene animaciones complejas?
4. ✅ ¿No bloquea eventos de clic?
5. ✅ ¿Es compatible con Visual Edits?

### DESPUÉS DE CUALQUIER CAMBIO:
1. ✅ ¿Se puede editar en Lovable?
2. ✅ ¿Mantiene la apariencia visual?
3. ✅ ¿No causa errores en Visual Edits?
4. ✅ ¿Funciona el auto-deploy?
5. ✅ ¿Se refleja correctamente en Vercel?

## 🎨 MEJORES PRÁCTICAS

### PARA ELEMENTOS EDITABLES:
```tsx
// ✅ CORRECTO - Componente editable
<EditableHeading level={1} className="text-5xl font-black">
  Título Editable
</EditableHeading>

// ✅ CORRECTO - Texto editable
<EditableText className="text-xl">
  Párrafo editable
</EditableText>

// ❌ INCORRECTO - No editable
<motion.div initial={{ opacity: 0 }}>
  <h1>Título no editable</h1>
</motion.div>
```

### PARA ELEMENTOS NO-EDITABLES:
```tsx
// ✅ CORRECTO - Solo para decoración
<FadeIn>
  <div className="decorative-element">
    Elemento decorativo
  </div>
</FadeIn>

// ✅ CORRECTO - Solo para navegación
<HoverScale>
  <button>Botón de navegación</button>
</HoverScale>
```

## 🔍 SOLUCIÓN DE PROBLEMAS

### SI VISUAL EDITS NO FUNCIONA:
1. **Verificar z-index**: Elementos editables deben tener z-index alto
2. **Revisar pointer-events**: Iframes deben tener `pointer-events-none`
3. **Comprobar data-editable**: Debe estar presente en elementos editables
4. **Verificar animaciones**: No deben interferir con eventos

### SI HAY CONFLICTOS DE SINCRONIZACIÓN:
1. **Usar webhooks**: Configurar auto-deploy automático
2. **Verificar rama**: Asegurar que se trabaja en `main`
3. **Forzar deploy**: Usar `vercel --prod` si es necesario
4. **Monitorear logs**: Revisar logs de Vercel para errores

## 📊 MÉTRICAS DE INTEGRACIÓN

### OBJETIVOS:
- ⚡ **Tiempo de deploy**: < 60 segundos
- 🎯 **Compatibilidad Visual Edits**: 100%
- 🔄 **Auto-deploy**: 100% automático
- 📱 **Funcionalidad Lovable**: 100%

### INDICADORES DE PROBLEMAS:
- ⏱️ Deploy manual requerido
- ❌ Visual Edits no funciona
- 🔄 Conflictos de sincronización
- 📉 Errores en Lovable

## 🚀 OPTIMIZACIONES FUTURAS

### MEJORAS PLANIFICADAS:
1. **GitHub Actions**: Automatización completa
2. **Pre-commit hooks**: Verificación automática
3. **Linting rules**: Reglas específicas para Lovable
4. **Testing automático**: Tests de compatibilidad

### MONITOREO CONTINUO:
- 📊 Dashboard de métricas de integración
- 🔔 Alertas automáticas de problemas
- 📈 Reportes de rendimiento
- 🛠️ Herramientas de diagnóstico

---

**Esta guía asegura la integración perfecta entre Cursor y Lovable.**
