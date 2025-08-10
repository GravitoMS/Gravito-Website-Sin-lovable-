import { useState, useEffect, useCallback } from 'react'
import { EditModeService, EditableContent } from '@/lib/editModeService'

interface UseEditableContentOptions {
  page: string
  autoLoad?: boolean
}

export const useEditableContent = ({ page, autoLoad = true }: UseEditableContentOptions) => {
  const [content, setContent] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Cargar contenido de la página
  const loadContent = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('📂 Cargando contenido para página:', page)
      
      const result = await EditModeService.loadContentByPage(page)
      
      if (result.success && result.data) {
        const contentMap: Record<string, string> = {}
        result.data.forEach((item: EditableContent) => {
          contentMap[item.id] = item.content
        })
        
        setContent(contentMap)
        console.log('✅ Contenido cargado:', contentMap)
      } else {
        setError(result.error?.message || 'Error cargando contenido')
        console.error('❌ Error cargando contenido:', result.error)
      }
    } catch (error) {
      setError('Error inesperado cargando contenido')
      console.error('❌ Error inesperado:', error)
    } finally {
      setLoading(false)
    }
  }, [page])

  // Obtener contenido por ID
  const getContent = useCallback((id: string, defaultValue: string = '') => {
    return content[id] || defaultValue
  }, [content])

  // Actualizar contenido local
  const updateContent = useCallback((id: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [id]: value
    }))
  }, [])

  // Guardar contenido específico
  const saveContent = useCallback(async (id: string, value: string) => {
    try {
      const [pageName, section, field] = id.split('-')
      
      const contentData: EditableContent = {
        id,
        page: pageName,
        section,
        field,
        content: value
      }
      
      const result = await EditModeService.saveContent(contentData)
      
      if (result.success) {
        updateContent(id, value)
        return { success: true }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error) {
      console.error('❌ Error guardando contenido:', error)
      return { success: false, error }
    }
  }, [updateContent])

  // Guardar múltiples contenidos
  const saveMultipleContents = useCallback(async (contents: Record<string, string>) => {
    try {
      const contentArray: EditableContent[] = Object.entries(contents).map(([id, value]) => {
        const [pageName, section, field] = id.split('-')
        return {
          id,
          page: pageName,
          section,
          field,
          content: value
        }
      })
      
      const result = await EditModeService.saveMultipleContents(contentArray)
      
      if (result.success) {
        setContent(prev => ({ ...prev, ...contents }))
        return { success: true }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error) {
      console.error('❌ Error guardando múltiples contenidos:', error)
      return { success: false, error }
    }
  }, [])

  // Recargar contenido
  const reload = useCallback(() => {
    loadContent()
  }, [loadContent])

  // Cargar contenido automáticamente al montar el componente
  useEffect(() => {
    if (autoLoad && page) {
      loadContent()
    }
  }, [page, autoLoad, loadContent])

  return {
    // Estado
    content,
    loading,
    error,
    
    // Acciones
    loadContent,
    getContent,
    updateContent,
    saveContent,
    saveMultipleContents,
    reload,
    
    // Utilidades
    hasContent: Object.keys(content).length > 0
  }
}
