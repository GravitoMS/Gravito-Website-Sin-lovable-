# 🚀 Instrucciones de Configuración - Supabase Auth

## 📋 Resumen

Este documento te guía paso a paso para configurar correctamente Supabase Auth y eliminar las contraseñas hardcodeadas del sistema.

## 🔧 Paso 1: Ejecutar Script SQL

### 1.1 Ir a Supabase Dashboard
1. Ve a tu proyecto de Supabase
2. Haz clic en **"SQL Editor"** en el menú lateral
3. Haz clic en **"New query"**

### 1.2 Ejecutar Script SQL
1. Copia todo el contenido del archivo `supabase-auth-setup.sql`
2. Pégalo en el editor SQL
3. Haz clic en **"Run"**

**Este script:**
- ✅ Crea las tablas necesarias
- ✅ Configura Row Level Security (RLS)
- ✅ Crea políticas de seguridad
- ✅ Inserta usuarios admin en la tabla `admin_users`
- ✅ Inserta contenido inicial de páginas

## 🔐 Paso 2: Configurar Usuarios en Supabase Auth

### Opción A: Automática (Recomendada)

#### 2.1 Obtener Service Role Key
1. Ve a **Settings > API** en Supabase
2. Copia la **"service_role" key** (NO la anon key)
3. Abre tu terminal y ejecuta:
```bash
export SUPABASE_SERVICE_ROLE_KEY="tu_service_role_key_aqui"
```

#### 2.2 Ejecutar Script de Configuración
```bash
cd gravito-website
node scripts/setup-supabase-auth.cjs
```

### Opción B: Manual

#### 2.1 Crear Usuarios Manualmente
1. Ve a **Authentication > Users** en Supabase
2. Haz clic en **"Add User"**
3. Crea los siguientes usuarios:

**Usuario 1:**
- Email: `admin@gravito.com`
- Password: `AdminGravito2025!`
- Marcar **"Email confirmed"**

**Usuario 2:**
- Email: `admin1@gravitoms.com`
- Password: `AdminGravito2025!`
- Marcar **"Email confirmed"**

## ✅ Paso 3: Verificar Configuración

### 3.1 Verificar Base de Datos
```bash
node scripts/test-new-auth.cjs
```

### 3.2 Verificar Autenticación
```bash
node scripts/debug-auth.cjs
```

## 🚀 Paso 4: Probar el Sistema

### 4.1 Iniciar Servidor
```bash
npm run dev
```

### 4.2 Probar Login
1. Ve a `http://localhost:8080`
2. Haz clic en **"Admin Login"** en el footer
3. Usa las credenciales:
   - Email: `admin@gravito.com`
   - Password: `AdminGravito2025!`

## 🔍 Solución de Problemas

### Problema: "Invalid login credentials"
**Causa:** Usuario no existe en Supabase Auth
**Solución:** Ejecutar el script de configuración o crear usuario manualmente

### Problema: "Usuario no autorizado como administrador"
**Causa:** Usuario existe en Auth pero no en tabla `admin_users`
**Solución:** Ejecutar el script SQL para insertar usuarios en la tabla

### Problema: Error de políticas RLS
**Causa:** Políticas de seguridad no configuradas
**Solución:** Ejecutar el script SQL completo

## 📊 Estado Esperado

### Después de la configuración deberías ver:

#### En Supabase Auth:
- ✅ 2 usuarios creados
- ✅ Emails confirmados
- ✅ Contraseñas configuradas

#### En Base de Datos:
- ✅ Tabla `admin_users` con 2 registros
- ✅ Tabla `page_content` con 5 páginas
- ✅ Políticas RLS configuradas

#### En el Sistema:
- ✅ Login funcional
- ✅ Sesión persistente
- ✅ Acceso al CMS
- ✅ Sin contraseñas hardcodeadas

## 🔒 Seguridad

### Características Implementadas:
- ✅ **Row Level Security (RLS)** habilitado
- ✅ **Políticas de acceso** configuradas
- ✅ **Verificación de roles** en cada operación
- ✅ **Autenticación segura** con Supabase Auth
- ✅ **Sin contraseñas hardcodeadas** en el código

### Políticas de Seguridad:
- Solo admins pueden modificar contenido
- Cualquier usuario puede ver contenido público
- Verificación de roles en cada operación
- Protección de rutas del CMS

## 📞 Soporte

Si encuentras problemas:

1. **Verifica los logs** en la consola del navegador
2. **Ejecuta los scripts de verificación**
3. **Revisa la configuración** en Supabase Dashboard
4. **Asegúrate** de que todos los pasos se completaron

## 🎉 Resultado Final

Después de completar todos los pasos:

- ✅ **Sistema completamente funcional**
- ✅ **Autenticación segura con Supabase Auth**
- ✅ **Sin contraseñas hardcodeadas**
- ✅ **CMS operativo**
- ✅ **Seguridad implementada**

¡El sistema estará listo para uso en producción!
