# 🤝 PROTOCOLO DE COMUNICACIÓN LOVABLE ↔ CURSOR

## 🎯 OBJETIVO
**Evitar conflictos de sincronización y mantener un flujo de trabajo coherente entre Lovable y Cursor.**

## 📋 REGLAS FUNDAMENTALES

### **1. DIVISIÓN DE RESPONSABILIDADES**

#### **LOVABLE (Responsabilidades):**
- ✅ **Visual Edits** - Edición directa de contenido
- ✅ **Prototipado rápido** - Pruebas de conceptos
- ✅ **Feedback visual** - Verificación de cambios
- ✅ **Testing de UX** - Experiencia de usuario

#### **CURSOR (Responsabilidades):**
- ✅ **Desarrollo de código** - Implementación técnica
- ✅ **Optimización** - Mejoras de performance
- ✅ **Refactorización** - Limpieza de código
- ✅ **Integración** - Conexión con APIs y servicios

### **2. FLUJO DE TRABAJO ESTÁNDAR**

#### **Para Cambios de Contenido:**
```
1. Lovable → Hacer cambios visuales
2. Lovable → Verificar que funciona
3. Lovable → Comentar en GitHub
4. Cursor → Revisar cambios
5. Cursor → Optimizar si es necesario
6. Cursor → Push a repositorio
7. Vercel → Deploy automático
```

#### **Para Cambios Técnicos:**
```
1. Cursor → Desarrollar funcionalidad
2. Cursor → Test local
3. Cursor → Push a repositorio
4. Vercel → Deploy automático
5. Lovable → Verificar en producción
6. Lovable → Feedback si hay problemas
```

### **3. PROTOCOLO DE SINCRONIZACIÓN**

#### **Antes de Hacer Cambios:**
- ✅ **Verificar estado actual** del repositorio
- ✅ **Comunicar intenciones** en GitHub Issues
- ✅ **Coordinar horarios** si es necesario

#### **Durante el Desarrollo:**
- ✅ **Usar branches** para cambios grandes
- ✅ **Hacer commits frecuentes** con mensajes claros
- ✅ **No trabajar en el mismo archivo** simultáneamente

#### **Después de los Cambios:**
- ✅ **Verificar que el deploy funciona**
- ✅ **Comunicar cambios realizados**
- ✅ **Documentar modificaciones importantes**

## 🚨 REGLAS DE EMERGENCIA

### **Si Hay Conflictos:**
1. **NO hacer force push**
2. **Crear issue en GitHub** explicando el problema
3. **Coordinar resolución** antes de continuar
4. **Usar git stash** si es necesario

### **Si Se Pierden Cambios:**
1. **Revisar git log** para recuperar commits
2. **Usar git reflog** si es necesario
3. **Comunicar inmediatamente** el problema
4. **Restaurar desde backup** si es crítico

## 📝 TEMPLATES DE COMUNICACIÓN

### **Template para Cambios de Lovable:**
```
🎨 CAMBIO VISUAL REALIZADO
- Archivo: [archivo modificado]
- Cambio: [descripción del cambio]
- Verificado: ✅ Sí / ❌ No
- Necesita optimización: Sí / No
```

### **Template para Cambios de Cursor:**
```
🔧 CAMBIO TÉCNICO REALIZADO
- Archivo: [archivo modificado]
- Cambio: [descripción técnica]
- Testeado: ✅ Sí / ❌ No
- Deploy: ✅ Exitoso / ❌ Falló
```

### **Template para Coordinación:**
```
🤝 COORDINACIÓN NECESARIA
- Tipo: Contenido / Técnico / Emergencia
- Archivos involucrados: [lista]
- Tiempo estimado: [duración]
- Prioridad: Alta / Media / Baja
```

## 🎯 MEJORES PRÁCTICAS

### **Para Lovable:**
- ✅ **Hacer cambios pequeños** y frecuentes
- ✅ **Verificar antes de confirmar**
- ✅ **Usar Visual Edits** cuando sea posible
- ✅ **Comunicar problemas inmediatamente**

### **Para Cursor:**
- ✅ **Seguir las reglas de desarrollo**
- ✅ **Hacer commits descriptivos**
- ✅ **Testear antes de push**
- ✅ **Documentar cambios complejos**

### **Para Ambos:**
- ✅ **Respetar el flujo de trabajo**
- ✅ **Comunicar proactivamente**
- ✅ **Usar el sistema de issues**
- ✅ **Mantener el código limpio**

## 🔄 PROCESO DE VERIFICACIÓN

### **Checklist Diario:**
1. ✅ **Verificar estado del repositorio**
2. ✅ **Revisar deploys recientes**
3. ✅ **Comunicar cambios pendientes**
4. ✅ **Coordinar próximos pasos**

### **Checklist Semanal:**
1. ✅ **Revisar issues abiertos**
2. ✅ **Limpiar código innecesario**
3. ✅ **Actualizar documentación**
4. ✅ **Planificar mejoras**

## 🎯 RESULTADO ESPERADO

**Flujo de trabajo fluido, sin conflictos, con comunicación clara y desarrollo eficiente.**
