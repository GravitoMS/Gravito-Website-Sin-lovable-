-- Configuración de la base de datos para Gravito CMS
-- Ejecutar este script en el SQL Editor de Supabase

-- 1. Crear tabla de usuarios admin
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role = 'admin'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Crear tabla de contenido de páginas
CREATE TABLE IF NOT EXISTS page_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_name TEXT UNIQUE NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by UUID REFERENCES admin_users(id)
);

-- 3. Crear tabla de posts del blog
CREATE TABLE IF NOT EXISTS blog_posts (
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

-- 4. Insertar usuario admin por defecto
-- IMPORTANTE: Cambiar la contraseña después de la primera ejecución
INSERT INTO admin_users (email, role) 
VALUES ('admin@gravito.com', 'admin')
ON CONFLICT (email) DO NOTHING;

-- 5. Insertar contenido inicial de páginas
INSERT INTO page_content (page_name, content) VALUES
('home', '{"title": "Gravito Media Solutions", "subtitle": "Transformamos tu presencia digital"}'),
('estrategia', '{"title": "Impulso Estratégico", "subtitle": "El primer paso inteligente para tu presencia digital"}'),
('servicios', '{"title": "Nuestros Servicios", "subtitle": "Soluciones digitales integrales"}'),
('nosotros', '{"title": "Sobre Nosotros", "subtitle": "Conoce nuestro equipo y misión"}'),
('contacto', '{"title": "Contáctanos", "subtitle": "Estamos aquí para ayudarte"}')
ON CONFLICT (page_name) DO NOTHING;

-- 6. Configurar Row Level Security (RLS)
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- 7. Políticas de seguridad para admin_users
CREATE POLICY "Admin users can view all admin users" ON admin_users
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert admin users" ON admin_users
  FOR INSERT WITH CHECK (true);

-- 8. Políticas de seguridad para page_content
CREATE POLICY "Anyone can view page content" ON page_content
  FOR SELECT USING (true);

CREATE POLICY "Only admins can modify page content" ON page_content
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
    )
  );

-- 9. Políticas de seguridad para blog_posts
CREATE POLICY "Anyone can view published blog posts" ON blog_posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Only admins can view all blog posts" ON blog_posts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
    )
  );

CREATE POLICY "Only admins can modify blog posts" ON blog_posts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
    )
  );

-- 10. Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 11. Triggers para actualizar updated_at
CREATE TRIGGER update_admin_users_updated_at 
  BEFORE UPDATE ON admin_users 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_page_content_updated_at 
  BEFORE UPDATE ON page_content 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at 
  BEFORE UPDATE ON blog_posts 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 12. Crear usuario en auth.users (esto se hace desde el dashboard de Supabase)
-- Ir a Authentication > Users > Add User
-- Email: admin@gravito.com
-- Password: [establecer una contraseña segura]
-- Marcar como "Email confirmed"

-- Comentarios importantes:
-- 1. Después de ejecutar este script, ve a Authentication > Users en Supabase
-- 2. Crea manualmente el usuario admin@gravito.com con una contraseña segura
-- 3. Marca el email como confirmado
-- 4. El usuario podrá hacer login desde el footer del sitio web
