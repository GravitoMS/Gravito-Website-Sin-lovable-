import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface PageContent {
  id: string;
  page_name: string;
  content: Record<string, any>;
  updated_at: string;
}

export const usePageContent = (pageName: string) => {
  const [content, setContent] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('page_content')
          .select('*')
          .eq('page_name', pageName)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            // No se encontró contenido, usar valores por defecto
            setContent({
              title: 'Gravito Media Solutions',
              subtitle: 'Transformamos tu presencia digital',
              description: 'Contenido en desarrollo...'
            });
          } else {
            throw error;
          }
        } else {
          setContent(data.content || {});
        }
      } catch (err) {
        console.error('Error cargando contenido de página:', err);
        setError('Error cargando contenido');
        // Usar valores por defecto en caso de error
        setContent({
          title: 'Gravito Media Solutions',
          subtitle: 'Transformamos tu presencia digital',
          description: 'Contenido temporal...'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [pageName]);

  const updateContent = async (newContent: Record<string, any>) => {
    try {
      const { error } = await supabase
        .from('page_content')
        .upsert({
          page_name: pageName,
          content: newContent
        }, {
          onConflict: 'page_name'
        });

      if (error) throw error;
      
      setContent(newContent);
      return { success: true };
    } catch (err) {
      console.error('Error actualizando contenido:', err);
      return { success: false, error: err };
    }
  };

  return {
    content,
    loading,
    error,
    updateContent
  };
};
