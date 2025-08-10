# 🚫 SISTEMA ANTI-MOCK - GRAVITO WEBSITE

## 📋 OBJETIVO

Este sistema previene el uso de datos mock en el código, asegurando que solo se usen datos reales de Supabase. **NUNCA** se deben usar datos mock - solo datos reales del negocio.

## 🔍 DETECTOR ANTI-MOCK

### Comando de Verificación

```bash
npm run no-mock
```

Este comando escanea todo el proyecto en busca de:
- Variables con nombres sospechosos (mock, demo, fake, etc.)
- Arrays y objetos hardcodeados con datos de ejemplo
- Textos con "..." que indican contenido incompleto
- Comentarios que mencionan datos mock
- Datos hardcodeados sospechosos

### Patrones Detectados

El detector busca estos patrones prohibidos:

```javascript
// ❌ PROHIBIDO - Datos mock
const mockData = [...];
const demoContent = {...};
const fakeUser = {...};

// ❌ PROHIBIDO - Textos con "..."
'Contenido en desarrollo...'
'Datos temporales...'

// ❌ PROHIBIDO - Comentarios sobre mock
// Datos mock para desarrollo
/* Contenido temporal */

// ❌ PROHIBIDO - Datos hardcodeados sospechosos
'admin@example.com'
'password123'
```

## ✅ PATRONES PERMITIDOS

```javascript
// ✅ PERMITIDO - Datos reales de Supabase
const { data, error } = await supabase.from('table').select('*');

// ✅ PERMITIDO - Estados de UI legítimos
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

// ✅ PERMITIDO - Placeholders de UI
placeholder="Ingresa tu email"
placeholder="Describe tu proyecto"

// ✅ PERMITIDO - Comentarios explicativos
// Cargar datos desde Supabase
// Verificar autenticación
```

## 🛠️ CONFIGURACIÓN DE DATOS REALES

### Script de Configuración

```bash
npm run setup-real-data
```

Este script:
1. Crea el usuario administrador en Supabase Auth
2. Inserta contenido real de páginas del sitio
3. Crea posts del blog con contenido real
4. Configura las tablas necesarias

### Datos Reales Incluidos

- **Páginas del sitio**: Inicio, Servicios, Nosotros, Contacto
- **Posts del blog**: Tendencias de marketing, SEO, etc.
- **Usuario admin**: admin@gravito.com
- **Contenido real**: Información real de Gravito Media Solutions

## 📊 MONITOREO DEL SISTEMA

### Componente SystemStatus

El componente `SystemStatus` muestra:
- Estado de conexión con Supabase
- Tablas existentes en la base de datos
- Cantidad de contenido (páginas, posts, usuarios)
- Acciones requeridas para completar la configuración

### Ubicación

```tsx
// En el panel de administración
<SystemStatus />
```

## 🚨 VIOLACIONES COMUNES

### 1. Datos Mock en Componentes

```javascript
// ❌ INCORRECTO
const mockPages = [
  { id: '1', title: 'Página de ejemplo...' }
];

// ✅ CORRECTO
const [pages, setPages] = useState([]);
useEffect(() => {
  loadPagesFromSupabase();
}, []);
```

### 2. Estados Temporales

```javascript
// ❌ INCORRECTO
const [user] = useState({ id: '1', name: 'Admin' });

// ✅ CORRECTO
const { user, loading } = useAuth();
```

### 3. Contenido Hardcodeado

```javascript
// ❌ INCORRECTO
const content = 'Contenido en desarrollo...';

// ✅ CORRECTO
const { content, loading } = usePageContent('page-name');
```

## 🔧 CORRECCIÓN DE VIOLACIONES

### Paso 1: Identificar la Violación

```bash
npm run no-mock
```

### Paso 2: Eliminar Datos Mock

Reemplazar datos mock con:
- Llamadas a Supabase
- Estados de carga
- Manejo de errores
- Contenido real del negocio

### Paso 3: Verificar

```bash
npm run no-mock
```

## 📋 CHECKLIST DE IMPLEMENTACIÓN

- [ ] Ejecutar `npm run no-mock` antes de cada commit
- [ ] No usar variables con nombres "mock", "demo", "fake"
- [ ] No hardcodear datos de ejemplo
- [ ] Usar solo datos de Supabase
- [ ] Implementar estados de carga y error
- [ ] Usar contenido real del negocio
- [ ] Documentar fuentes de datos

## 🎯 BENEFICIOS

1. **Identificación de Brechas**: Muestra claramente qué funcionalidades faltan
2. **Datos Reales**: Asegura que el sistema use información real del negocio
3. **Calidad**: Previene la implementación de funcionalidades "falsas"
4. **Mantenimiento**: Facilita el mantenimiento del código
5. **Escalabilidad**: Permite identificar áreas que necesitan desarrollo

## 🚀 PRÓXIMOS PASOS

1. Ejecutar `npm run setup-real-data` para configurar datos reales
2. Implementar funcionalidades faltantes identificadas por el detector
3. Usar el componente `SystemStatus` para monitorear el progreso
4. Ejecutar `npm run no-mock` regularmente durante el desarrollo

---

**Recuerda**: NUNCA uses datos mock. Solo datos reales de Supabase. 🚫

