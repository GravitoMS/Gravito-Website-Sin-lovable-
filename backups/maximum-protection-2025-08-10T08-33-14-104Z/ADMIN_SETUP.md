# 🎯 SISTEMA DE ADMINISTRACIÓN SIMPLE

## 📋 RESUMEN

Sistema de administración simple y funcional para el sitio web Gravito, implementado con funcionalidades básicas y user-friendly.

### ✅ FUNCIONALIDADES IMPLEMENTADAS:
- **Login simple** con email/password
- **Verificación de admin** en tabla `admin_users`
- **Edición inline** de textos en cualquier página
- **CMS básico** para blog posts (agregar, editar, eliminar)

### 🎯 OBJETIVO CUMPLIDO:
- ✅ Sistema simple que hace exactamente lo necesario
- ✅ Edición inline mientras navegas como usuario normal
- ✅ CMS dedicado únicamente para blog posts
- ✅ Sin complicaciones ni funcionalidades innecesarias

## 🔧 CONFIGURACIÓN OBLIGATORIA

### ⚠️ IMPORTANTE: Limpiar Sistema Anterior

**Antes de usar el nuevo sistema, DEBES limpiar las tablas residuales del sistema anterior:**

1. **Ir a Supabase Dashboard**
2. **SQL Editor**
3. **Ejecutar el script:** `cleanup-and-setup.sql`

Este script:
- ✅ Elimina tablas residuales (`editable_content`, `page_content`)
- ✅ Configura tablas nuevas (`admin_users`, `blog_posts`)
- ✅ Configura RLS (Row Level Security)
- ✅ Inserta datos de ejemplo

### 1. Configurar Supabase

#### Paso 1: Ejecutar Script de Limpieza
```sql
-- Copiar y ejecutar en Supabase SQL Editor
-- El contenido completo está en: cleanup-and-setup.sql
```

#### Paso 2: Crear Usuario Admin
1. Ir a **Authentication > Users**
2. Hacer clic en **"Add User"**
3. Crear usuario:
   - **Email:** `admin@gravito.com`
   - **Password:** `AdminGravito2025!`
   - **Email Confirm:** ✅ (marcar)

#### Paso 3: Verificar Configuración
```bash
# Ejecutar en terminal
node scripts/verify-simple-system.cjs
```

### 2. Variables de Entorno

En `.env`:
```
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anonima
```

## 🚀 USO

### Login de Admin:
1. Ir al footer del sitio
2. Hacer clic en "Admin Login"
3. Ingresar credenciales:
   - Email: `admin@gravito.com`
   - Password: `AdminGravito2025!`

### Edición Inline:
1. Iniciar sesión como admin
2. Activar "Modo Edición" (botón azul en esquina superior derecha)
3. Hacer clic en cualquier texto editable
4. Editar directamente
5. Enter para guardar, Escape para cancelar

### CMS de Blog:
1. Iniciar sesión como admin
2. Ir a `/blog`
3. Ver CMS completo para gestionar posts
4. Crear, editar, eliminar posts

## 📁 ARCHIVOS PRINCIPALES

### Autenticación:
- `src/contexts/AuthContext.tsx` - Contexto de autenticación simple

### Edición Inline:
- `src/hooks/useInlineEdit.ts` - Hook para modo de edición
- `src/components/InlineEditableText.tsx` - Componente de texto editable
- `src/components/EditModeToggle.tsx` - Botón de toggle

### CMS de Blog:
- `src/components/SimpleBlogCMS.tsx` - CMS simple para blog posts

### Configuración:
- `cleanup-and-setup.sql` - Script de limpieza y configuración
- `scripts/verify-simple-system.cjs` - Verificación del sistema

## 🔒 SEGURIDAD

- Solo usuarios en tabla `admin_users` pueden acceder
- Verificación de admin en cada operación
- RLS (Row Level Security) configurado en Supabase
- Sistema simple y directo

## 🎯 FUNCIONALIDADES

### 1. Edición Inline
- ✅ Botón flotante solo visible para admins
- ✅ Hacer clic en cualquier texto para editar
- ✅ Input/textarea automático según longitud
- ✅ Guardar con Enter, cancelar con Escape
- ✅ Indicadores visuales claros

### 2. CMS de Blog
- ✅ Crear nuevos posts
- ✅ Editar posts existentes
- ✅ Eliminar posts con confirmación
- ✅ Campos: título, extracto, contenido, imagen
- ✅ Interfaz simple y intuitiva

## 🚀 IMPLEMENTACIÓN COMPLETA

### Pasos para Activar el Sistema:

1. **🔧 Configurar Supabase:**
   ```bash
   # 1. Ejecutar script de limpieza en Supabase SQL Editor
   # 2. Crear usuario admin en Authentication
   # 3. Verificar configuración
   node scripts/verify-simple-system.cjs
   ```

2. **🚀 Iniciar Aplicación:**
   ```bash
   npm run dev
   ```

3. **👤 Login como Admin:**
   - Footer → "Admin Login"
   - Email: `admin@gravito.com`
   - Password: `AdminGravito2025!`

4. **✏️ Usar Edición Inline:**
   - Botón flotante → Activar modo edición
   - Clic en texto → Editar
   - Enter → Guardar

5. **📝 Usar CMS de Blog:**
   - Ir a `/blog`
   - Crear/editar/eliminar posts

## ⚠️ TROUBLESHOOTING

### Error: "Tabla no existe"
- Ejecutar `cleanup-and-setup.sql` en Supabase

### Error: "Usuario no autorizado"
- Verificar que el usuario esté en tabla `admin_users`
- Verificar credenciales en Authentication

### Error: "No se pueden guardar cambios"
- Verificar RLS (Row Level Security)
- Verificar políticas de Supabase

---

**¡Sistema simple, funcional y directo!** 🚀
