# 🎯 SISTEMA DE ADMINISTRACIÓN SIMPLE

## 📋 RESUMEN

Sistema de administración simple y funcional para el sitio web Gravito.

### ✅ FUNCIONALIDADES IMPLEMENTADAS:
- **Login simple** con email/password
- **Verificación de admin** en tabla `admin_users`
- **Edición inline** de textos en cualquier página
- **CMS básico** para blog posts

### 🗑️ ELIMINADO:
- Sistema complejo anterior
- Componentes innecesarios
- Hooks complejos
- Documentación excesiva

## 🔧 CONFIGURACIÓN

### 1. Base de Datos Supabase

#### Tabla `admin_users`:
```sql
CREATE TABLE admin_users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar admin
INSERT INTO admin_users (email) VALUES ('admin@gravito.com');
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
   - Password: (configurado en Supabase)

### Edición Inline:
1. Iniciar sesión como admin
2. Activar "Modo Edición" (botón en esquina superior derecha)
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
- `src/hooks/useEditMode.ts` - Hook para modo de edición
- `src/components/EditableText.tsx` - Componente de texto editable
- `src/components/EditToggle.tsx` - Botón de toggle

### CMS de Blog:
- `src/components/BlogCMS.tsx` - CMS simple para blog posts

## 🔒 SEGURIDAD

- Solo usuarios en tabla `admin_users` pueden acceder
- Verificación de admin en cada operación
- Sin redirecciones automáticas
- Sistema simple y directo

## 🎯 OBJETIVO

Sistema simple que hace exactamente lo necesario:
1. ✅ Login funcional
2. ✅ Edición inline
3. ✅ CMS de blog
4. ✅ Sin complicaciones

---

**¡Sistema simple, funcional y directo!** 🚀
