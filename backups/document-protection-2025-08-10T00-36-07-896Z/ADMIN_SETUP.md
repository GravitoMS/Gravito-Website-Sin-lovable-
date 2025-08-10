# 🚀 Sistema de Administración - Gravito Website

## 📋 Resumen

Este sistema permite que un administrador pueda editar el contenido del sitio web a través de un CMS integrado. Solo los usuarios autorizados pueden acceder al sistema de administración.

## 🛠️ Configuración Inicial

### 1. Configurar Supabase

1. **Ejecutar el script SQL:**
   - Ve a tu proyecto de Supabase > SQL Editor
   - Copia y ejecuta el contenido de `supabase-setup.sql`
   - Esto creará las tablas necesarias y las políticas de seguridad

2. **Crear usuario admin:**
   - Ve a Supabase > Authentication > Users
   - Haz clic en "Add User"
   - Email: `admin@gravito.com`
   - Password: `AdminGravito2025!` (cambiar después del primer login)
   - Marca "Email confirmed"

### 2. Verificar la configuración

```bash
# Verificar que todo esté configurado correctamente
node scripts/check-supabase.cjs
```

### 3. Configurar usuario admin (opcional)

```bash
# Si necesitas la service role key para automatizar la creación
export SUPABASE_SERVICE_ROLE_KEY="tu_service_role_key"
node scripts/setup-admin.cjs
```

## 🔐 Sistema de Autenticación

### Características:
- ✅ Login seguro con Supabase Auth
- ✅ Verificación de roles de administrador
- ✅ Protección de rutas
- ✅ Sesión persistente
- ✅ Logout seguro

### Flujo de autenticación:
1. Usuario hace clic en "Admin Login" en el footer
2. Se abre un modal con formulario de login
3. Se verifica credenciales contra Supabase Auth
4. Se verifica si el usuario está en la tabla `admin_users`
5. Si es válido, se establece la sesión y se muestra el enlace "CMS"

## 📝 CMS (Content Management System)

### Características:
- ✅ Edición de contenido de páginas
- ✅ Interfaz intuitiva con tabs
- ✅ Guardado automático
- ✅ Validación de permisos
- ✅ Historial de cambios

### Páginas editables:
- `home` - Página principal
- `estrategia` - Página de estrategia
- `servicios` - Página de servicios
- `nosotros` - Página sobre nosotros
- `contacto` - Página de contacto

### Estructura del contenido:
```json
{
  "title": "Título de la página",
  "subtitle": "Subtítulo",
  "description": "Descripción detallada",
  "sections": {
    "hero": "Contenido del hero",
    "features": "Lista de características"
  }
}
```

## 🛡️ Seguridad

### Políticas implementadas:
- ✅ Row Level Security (RLS) habilitado
- ✅ Solo admins pueden modificar contenido
- ✅ Cualquier usuario puede ver contenido público
- ✅ Verificación de roles en cada operación
- ✅ Protección de rutas del CMS

### Rutas protegidas:
- `/admin` - Solo accesible para administradores
- Todas las operaciones de escritura requieren autenticación

## 📁 Estructura de Archivos

```
src/
├── components/
│   ├── AdminLoginModal.tsx    # Modal de login
│   └── AdminCMS.tsx          # Componente principal del CMS
├── contexts/
│   └── AuthContext.tsx       # Contexto de autenticación
├── hooks/
│   └── usePageContent.ts     # Hook para manejar contenido
├── pages/
│   └── Admin.tsx            # Página del CMS
└── lib/
    └── supabase.ts          # Configuración de Supabase
```

## 🚀 Uso del Sistema

### Para administradores:

1. **Acceder al CMS:**
   - Ve al footer del sitio web
   - Haz clic en "Admin Login"
   - Ingresa credenciales: `admin@gravito.com` / `AdminGravito2025!`
   - Haz clic en "CMS" para acceder al panel

2. **Editar contenido:**
   - Selecciona la página que quieres editar
   - Haz clic en "Editar"
   - Modifica el contenido
   - Haz clic en "Guardar"

3. **Cerrar sesión:**
   - Haz clic en "Cerrar Sesión" en el footer

### Para desarrolladores:

1. **Agregar nuevas páginas editables:**
   ```sql
   INSERT INTO page_content (page_name, content) 
   VALUES ('nueva-pagina', '{"title": "Nueva Página", "content": "..."}');
   ```

2. **Modificar estructura de contenido:**
   - Actualiza el componente `AdminCMS.tsx`
   - Modifica el hook `usePageContent.ts` si es necesario

## 🔧 Troubleshooting

### Problemas comunes:

1. **Error de conexión a Supabase:**
   - Verifica las credenciales en `src/lib/supabase.ts`
   - Asegúrate de que el proyecto esté activo

2. **Usuario admin no puede hacer login:**
   - Verifica que el usuario existe en Authentication > Users
   - Confirma que está en la tabla `admin_users`
   - Verifica que el email esté confirmado

3. **No se puede editar contenido:**
   - Verifica que las políticas RLS estén configuradas
   - Confirma que el usuario tiene permisos de admin

4. **Errores de CORS:**
   - Verifica la configuración de CORS en Supabase
   - Asegúrate de que el dominio esté en la lista blanca

### Comandos útiles:

```bash
# Verificar configuración
node scripts/check-supabase.cjs

# Crear usuario admin
node scripts/setup-admin.cjs

# Ver logs de desarrollo
npm run dev
```

## 📞 Soporte

Si encuentras problemas:

1. Revisa los logs del navegador (F12 > Console)
2. Verifica la configuración de Supabase
3. Ejecuta el script de verificación
4. Revisa que todas las tablas y políticas estén creadas

## 🔄 Próximas Mejoras

- [ ] Sistema de versionado de contenido
- [ ] Editor WYSIWYG
- [ ] Gestión de imágenes
- [ ] Sistema de blog completo
- [ ] Notificaciones de cambios
- [ ] Backup automático de contenido
