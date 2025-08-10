# 🛡️ GUÍA COMPLETA DE PROCEDIMIENTOS - GRAVITO WEBSITE

## 📋 ÍNDICE
1. [Procedimientos Diarios](#procedimientos-diarios)
2. [Procedimientos de Git Seguro](#procedimientos-de-git-seguro)
3. [Procedimientos de Emergencia](#procedimientos-de-emergencia)
4. [Procedimientos de Verificación](#procedimientos-de-verificación)
5. [Procedimientos de Restauración](#procedimientos-de-restauración)
6. [Comandos Rápidos](#comandos-rápidos)

---

## 🔄 PROCEDIMIENTOS DIARIOS

### ✅ Al Iniciar el Día
```bash
# 1. Verificar estado del sistema
node scripts/maximum-protection.cjs check

# 2. Verificar conectividad con Supabase
node scripts/diagnose-supabase-connection.cjs

# 3. Verificar estado del repositorio
git status
```

### ✅ Antes de Hacer Cambios
```bash
# 1. Crear backup de seguridad
node scripts/maximum-protection.cjs backup

# 2. Verificar que no hay archivos críticos modificados
node scripts/document-protection.cjs check
```

### ✅ Al Finalizar el Día
```bash
# 1. Verificación completa del sistema
node scripts/final-verification.cjs

# 2. Análisis exhaustivo
node scripts/analyze-system.cjs

# 3. Commit seguro con todos los cambios
node scripts/git-protection-workflow.cjs full-workflow "Cambios del día - [fecha]"
```

---

## 🛡️ PROCEDIMIENTOS DE GIT SEGURO

### ⚠️ NUNCA USAR COMANDOS GIT DIRECTOS
**❌ INCORRECTO:**
```bash
git add .
git commit -m "mensaje"
git push
```

**✅ CORRECTO:**
```bash
# Flujo completo seguro (RECOMENDADO)
node scripts/git-protection-workflow.cjs full-workflow "Mensaje del commit"

# O paso a paso seguro
node scripts/git-protection-workflow.cjs safe-add .
node scripts/git-protection-workflow.cjs safe-commit "Mensaje del commit"
node scripts/git-protection-workflow.cjs safe-push origin main
```

### 📝 Procedimiento de Commit Seguro
1. **Verificar estado actual:**
   ```bash
   node scripts/maximum-protection.cjs check
   ```

2. **Crear backup:**
   ```bash
   node scripts/maximum-protection.cjs backup
   ```

3. **Ejecutar flujo completo:**
   ```bash
   node scripts/git-protection-workflow.cjs full-workflow "Descripción detallada de los cambios"
   ```

### 🔄 Procedimiento de Pull Seguro
```bash
node scripts/git-protection-workflow.cjs safe-pull origin main
```

---

## 🚨 PROCEDIMIENTOS DE EMERGENCIA

### 🚨 Si Se Detectan Archivos Faltantes
1. **NO HACER NADA MÁS** hasta resolver
2. **Ejecutar verificación inmediata:**
   ```bash
   node scripts/maximum-protection.cjs check
   ```

3. **Si hay archivos críticos faltantes:**
   ```bash
   # Restaurar desde el último backup
   node scripts/maximum-protection.cjs restore
   
   # Verificar restauración
   node scripts/maximum-protection.cjs check
   ```

4. **Si la restauración falla:**
   ```bash
   # Buscar backups disponibles
   ls backups/
   
   # Restaurar desde backup específico
   node scripts/maximum-protection.cjs restore backups/[nombre-del-backup]
   ```

### 🚨 Si Git Bloquea un Commit
1. **NO USAR --no-verify** sin verificar
2. **Ejecutar verificación manual:**
   ```bash
   node scripts/maximum-protection.cjs check
   node scripts/document-protection.cjs check
   ```

3. **Si hay problemas, resolver antes de continuar**
4. **Solo usar --no-verify si es ABSOLUTAMENTE necesario**

### 🚨 Si El Sistema No Funciona
1. **Verificar conectividad:**
   ```bash
   node scripts/diagnose-supabase-connection.cjs
   ```

2. **Verificar autenticación:**
   ```bash
   node scripts/debug-login.cjs
   ```

3. **Verificar acceso admin:**
   ```bash
   node scripts/debug-admin-access.cjs
   ```

---

## 🔍 PROCEDIMIENTOS DE VERIFICACIÓN

### 🔍 Verificación Completa del Sistema
```bash
# 1. Protección máxima
node scripts/maximum-protection.cjs check

# 2. Documentos críticos
node scripts/document-protection.cjs check

# 3. Verificación final
node scripts/final-verification.cjs

# 4. Análisis exhaustivo
node scripts/analyze-system.cjs

# 5. Conectividad Supabase
node scripts/diagnose-supabase-connection.cjs
```

### 🔍 Verificación de Funcionalidad
```bash
# 1. Login y autenticación
node scripts/debug-login.cjs

# 2. Acceso administrativo
node scripts/debug-admin-access.cjs

# 3. Panel administrativo
node scripts/debug-admin-panel.cjs

# 4. Flujo de redirección
node scripts/test-redirect-flow.cjs
```

### 🔍 Verificación de Base de Datos
```bash
# 1. Conectividad
node scripts/check-supabase-connectivity.cjs

# 2. Consultas admin
node scripts/test-admin-query.cjs

# 3. Estructura de tablas
node scripts/check-table-structure.cjs
```

---

## 🔄 PROCEDIMIENTOS DE RESTAURACIÓN

### 🔄 Restauración Completa del Sistema
1. **Identificar backup más reciente:**
   ```bash
   ls backups/ | grep maximum-protection
   ```

2. **Restaurar desde backup:**
   ```bash
   node scripts/maximum-protection.cjs restore backups/[nombre-del-backup]
   ```

3. **Verificar restauración:**
   ```bash
   node scripts/maximum-protection.cjs check
   node scripts/final-verification.cjs
   ```

### 🔄 Restauración de Archivos Específicos
```bash
# Restaurar desde Git (si está en el historial)
git checkout HEAD~1 -- [ruta-del-archivo]

# Restaurar desde backup específico
node scripts/maximum-protection.cjs restore backups/[backup]/[ruta-del-archivo]
```

---

## ⚡ COMANDOS RÁPIDOS

### 🚀 Flujo Completo Diario
```bash
# Un solo comando para todo el flujo seguro
node scripts/git-protection-workflow.cjs full-workflow "Cambios del día - $(date)"
```

### 🔍 Verificación Rápida
```bash
# Verificación completa en un comando
node scripts/maximum-protection.cjs check && node scripts/final-verification.cjs
```

### 💾 Backup Rápido
```bash
# Backup inmediato
node scripts/maximum-protection.cjs backup
```

### 🛡️ Protección Rápida
```bash
# Configurar protección máxima
node scripts/maximum-protection.cjs setup
```

---

## 📋 CHECKLIST DIARIO

### ✅ Al Iniciar
- [ ] `node scripts/maximum-protection.cjs check`
- [ ] `node scripts/diagnose-supabase-connection.cjs`
- [ ] `git status`

### ✅ Antes de Cambios
- [ ] `node scripts/maximum-protection.cjs backup`
- [ ] `node scripts/document-protection.cjs check`

### ✅ Al Finalizar
- [ ] `node scripts/final-verification.cjs`
- [ ] `node scripts/analyze-system.cjs`
- [ ] `node scripts/git-protection-workflow.cjs full-workflow "Mensaje"`

---

## 🚨 REGLAS CRÍTICAS

### ❌ NUNCA HACER
1. **Usar comandos Git directos** sin verificación
2. **Usar --no-verify** sin verificar archivos críticos
3. **Eliminar archivos** sin verificar si son críticos
4. **Hacer push** sin verificación previa
5. **Ignorar errores** de verificación

### ✅ SIEMPRE HACER
1. **Usar scripts de protección** para operaciones Git
2. **Verificar antes y después** de cada operación
3. **Crear backups** antes de cambios importantes
4. **Documentar cambios** con mensajes descriptivos
5. **Verificar integridad** después de cada operación

---

## 📞 CONTACTO DE EMERGENCIA

Si algo sale mal y no puedes resolverlo:

1. **NO HACER MÁS CAMBIOS**
2. **Ejecutar verificación completa:**
   ```bash
   node scripts/maximum-protection.cjs check
   node scripts/final-verification.cjs
   ```
3. **Crear backup de emergencia:**
   ```bash
   node scripts/maximum-protection.cjs backup
   ```
4. **Documentar el problema** con logs y mensajes de error
5. **Contactar al equipo** con toda la información

---

## 🎯 RESUMEN

**RECUERDA: NUNCA USAR COMANDOS GIT DIRECTOS. SIEMPRE USAR LOS SCRIPTS DE PROTECCIÓN.**

**COMANDO PRINCIPAL PARA TODO:**
```bash
node scripts/git-protection-workflow.cjs full-workflow "Descripción de cambios"
```

**Este comando hace TODO automáticamente:**
1. ✅ Verificación de protección máxima
2. ✅ Verificación de documentos críticos
3. ✅ Verificación final del sistema
4. ✅ Análisis exhaustivo
5. 💾 Backup automático
6. 🚀 Add + Commit + Push
7. ✅ Verificación post-git
8. ✅ Confirmación de integridad

**GARANTÍA: Con estos procedimientos, NUNCA se perderá información crítica.**

