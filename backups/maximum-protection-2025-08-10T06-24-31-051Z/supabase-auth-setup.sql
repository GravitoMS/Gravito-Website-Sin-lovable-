-- Script SQL para configurar Supabase Auth correctamente
-- Ejecutar este script en el SQL Editor de Supabase

-- 1. Verificar que las tablas existen
DO $$
BEGIN
    -- Verificar tabla admin_users
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'admin_users') THEN
        CREATE TABLE admin_users (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            role TEXT DEFAULT 'admin' CHECK (role = 'admin'),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        RAISE NOTICE 'Tabla admin_users creada';
    ELSE
        RAISE NOTICE 'Tabla admin_users ya existe';
    END IF;

    -- Verificar tabla page_content
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'page_content') THEN
        CREATE TABLE page_content (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            page_name TEXT UNIQUE NOT NULL,
            content JSONB NOT NULL DEFAULT '{}',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_by UUID REFERENCES admin_users(id)
        );
        RAISE NOTICE 'Tabla page_content creada';
    ELSE
        RAISE NOTICE 'Tabla page_content ya existe';
    END IF;

    -- Verificar tabla blog_posts
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'blog_posts') THEN
        CREATE TABLE blog_posts (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            title TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            content TEXT NOT NULL,
            excerpt TEXT,
            featured_image TEXT,
            status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
            published_at TIMESTAMP WITH TIME ZONE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            created_by UUID REFERENCES admin_users(id),
            updated_by UUID REFERENCES admin_users(id)
        );
        RAISE NOTICE 'Tabla blog_posts creada';
    ELSE
        RAISE NOTICE 'Tabla blog_posts ya existe';
    END IF;
END $$;

-- 2. Insertar usuarios admin por defecto
INSERT INTO admin_users (email, role) VALUES
('admin@gravito.com', 'admin'),
('admin1@gravitoms.com', 'admin')
ON CONFLICT (email) DO NOTHING;

-- 3. Insertar contenido inicial de páginas
INSERT INTO page_content (page_name, content) VALUES
('home', '{"title": "Gravito Media Solutions", "subtitle": "Transformamos tu presencia digital"}'),
('estrategia', '{"title": "Impulso Estratégico", "subtitle": "El primer paso inteligente para tu presencia digital"}'),
('servicios', '{"title": "Nuestros Servicios", "subtitle": "Soluciones digitales integrales"}'),
('nosotros', '{"title": "Sobre Nosotros", "subtitle": "Conoce nuestro equipo y misión"}'),
('contacto', '{"title": "Contáctanos", "subtitle": "Estamos aquí para ayudarte"}')
ON CONFLICT (page_name) DO NOTHING;

-- 4. Configurar Row Level Security (RLS)
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- 5. Eliminar políticas existentes si las hay
DROP POLICY IF EXISTS "Admin users can view all admin users" ON admin_users;
DROP POLICY IF EXISTS "Only admins can insert admin users" ON admin_users;
DROP POLICY IF EXISTS "Anyone can view page content" ON page_content;
DROP POLICY IF EXISTS "Only admins can modify page content" ON page_content;
DROP POLICY IF EXISTS "Anyone can view published blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Only admins can view all blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Only admins can modify blog posts" ON blog_posts;

-- 6. Crear nuevas políticas de seguridad
-- Políticas para admin_users
CREATE POLICY "Admin users can view all admin users" ON admin_users
    FOR SELECT USING (true);

CREATE POLICY "Only admins can insert admin users" ON admin_users
    FOR INSERT WITH CHECK (true);

-- Políticas para page_content
CREATE POLICY "Anyone can view page content" ON page_content
    FOR SELECT USING (true);

CREATE POLICY "Only authenticated admins can modify page content" ON page_content
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE admin_users.email = auth.jwt() ->> 'email'
        )
    );

-- Políticas para blog_posts
CREATE POLICY "Anyone can view published blog posts" ON blog_posts
    FOR SELECT USING (status = 'published');

CREATE POLICY "Only authenticated admins can view all blog posts" ON blog_posts
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE admin_users.email = auth.jwt() ->> 'email'
        )
    );

CREATE POLICY "Only authenticated admins can modify blog posts" ON blog_posts
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE admin_users.email = auth.jwt() ->> 'email'
        )
    );

-- 7. Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 8. Crear triggers para actualizar updated_at
DROP TRIGGER IF EXISTS update_admin_users_updated_at ON admin_users;
CREATE TRIGGER update_admin_users_updated_at 
    BEFORE UPDATE ON admin_users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_page_content_updated_at ON page_content;
CREATE TRIGGER update_page_content_updated_at 
    BEFORE UPDATE ON page_content 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at 
    BEFORE UPDATE ON blog_posts 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 9. Verificar configuración
SELECT 'Configuración completada' as status;

-- Mostrar usuarios admin creados
SELECT email, role, created_at FROM admin_users;

-- Mostrar páginas de contenido
SELECT page_name, created_at FROM page_content;
