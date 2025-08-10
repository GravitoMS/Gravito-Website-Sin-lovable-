import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

interface SystemStatus {
  supabase: {
    connected: boolean;
    error?: string;
  };
  database: {
    tables: {
      admin_users: boolean;
      page_content: boolean;
      blog_posts: boolean;
    };
    content: {
      pages: number;
      blog_posts: number;
      admin_users: number;
    };
  };
  auth: {
    configured: boolean;
    users: number;
  };
}

const SystemStatus: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();

  useEffect(() => {
    checkSystemStatus();
  }, []);

  const checkSystemStatus = async () => {
    try {
      setLoading(true);
      
      const systemStatus: SystemStatus = {
        supabase: { connected: false },
        database: {
          tables: {
            admin_users: false,
            page_content: false,
            blog_posts: false,
          },
          content: {
            pages: 0,
            blog_posts: 0,
            admin_users: 0,
          },
        },
        auth: {
          configured: false,
          users: 0,
        },
      };

      // Verificar conexión a Supabase
      try {
        const { data, error } = await supabase.from('admin_users').select('count').limit(1);
        systemStatus.supabase.connected = !error;
        if (error) {
          systemStatus.supabase.error = error.message;
        }
      } catch (error) {
        systemStatus.supabase.error = 'Error de conexión';
      }

      // Verificar tablas
      try {
        const { data: adminUsers } = await supabase.from('admin_users').select('*');
        systemStatus.database.tables.admin_users = true;
        systemStatus.database.content.admin_users = adminUsers?.length || 0;
      } catch (error) {
        console.log('Tabla admin_users no existe');
      }

      try {
        const { data: pageContent } = await supabase.from('page_content').select('*');
        systemStatus.database.tables.page_content = true;
        systemStatus.database.content.pages = pageContent?.length || 0;
      } catch (error) {
        console.log('Tabla page_content no existe');
      }

      try {
        const { data: blogPosts } = await supabase.from('blog_posts').select('*');
        systemStatus.database.tables.blog_posts = true;
        systemStatus.database.content.blog_posts = blogPosts?.length || 0;
      } catch (error) {
        console.log('Tabla blog_posts no existe');
      }

      // Verificar autenticación
      systemStatus.auth.configured = systemStatus.database.tables.admin_users;

      setStatus(systemStatus);
    } catch (error) {
      console.error('Error verificando estado del sistema:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return null;
  }

  if (loading) {
    return (
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        </CardContent>
      </Card>
    );
  }

  if (!status) {
    return (
      <Card className="mb-6">
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">Error cargando estado del sistema</p>
        </CardContent>
      </Card>
    );
  }

  const getStatusBadge = (condition: boolean) => {
    return condition ? (
      <Badge variant="default" className="bg-green-500">✅ Funcional</Badge>
    ) : (
      <Badge variant="destructive">❌ No configurado</Badge>
    );
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Estado del Sistema
          <Button onClick={checkSystemStatus} size="sm" variant="outline">
            Actualizar
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Conexión Supabase */}
        <div className="flex items-center justify-between">
          <span>Conexión Supabase:</span>
          {getStatusBadge(status.supabase.connected)}
        </div>

        {status.supabase.error && (
          <div className="text-sm text-red-500 bg-red-50 p-2 rounded">
            Error: {status.supabase.error}
          </div>
        )}

        {/* Tablas de Base de Datos */}
        <div className="space-y-2">
          <h4 className="font-medium">Tablas de Base de Datos:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="flex items-center justify-between">
              <span>admin_users:</span>
              {getStatusBadge(status.database.tables.admin_users)}
            </div>
            <div className="flex items-center justify-between">
              <span>page_content:</span>
              {getStatusBadge(status.database.tables.page_content)}
            </div>
            <div className="flex items-center justify-between">
              <span>blog_posts:</span>
              {getStatusBadge(status.database.tables.blog_posts)}
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="space-y-2">
          <h4 className="font-medium">Contenido:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="flex items-center justify-between">
              <span>Usuarios admin:</span>
              <Badge variant="outline">{status.database.content.admin_users}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Páginas:</span>
              <Badge variant="outline">{status.database.content.pages}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Posts del blog:</span>
              <Badge variant="outline">{status.database.content.blog_posts}</Badge>
            </div>
          </div>
        </div>

        {/* Acciones Requeridas */}
        {(!status.database.tables.admin_users || !status.database.tables.page_content) && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2">Acciones Requeridas:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              {!status.database.tables.admin_users && (
                <li>• Ejecutar script de configuración de Supabase</li>
              )}
              {!status.database.tables.page_content && (
                <li>• Crear tabla page_content en Supabase</li>
              )}
              {status.database.content.admin_users === 0 && (
                <li>• Crear usuario administrador</li>
              )}
              {status.database.content.pages === 0 && (
                <li>• Agregar contenido inicial de páginas</li>
              )}
            </ul>
            <div className="mt-3">
              <code className="block p-2 bg-yellow-100 rounded text-sm">
                node scripts/setup-supabase-auth.cjs
              </code>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SystemStatus;

