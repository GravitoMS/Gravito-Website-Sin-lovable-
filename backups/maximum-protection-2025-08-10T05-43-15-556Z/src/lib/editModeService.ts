import { supabase } from './supabase'

export interface EditableContent {
  id: string
  page: string
  section: string
  field: string
  content: string
  updated_at?: string
  updated_by?: string
}

export class EditModeService {
  // Guardar contenido editable
  static async saveContent(content: EditableContent): Promise<{ success: boolean; error?: any }> {
    try {
      console.log('💾 Guardando contenido:', content)
      
      const { data, error } = await supabase
        .from('editable_content')
        .upsert({
          id: content.id,
          page: content.page,
          section: content.section,
          field: content.field,
          content: content.content,
          updated_at: new Date().toISOString(),
          updated_by: (await supabase.auth.getUser()).data.user?.email || 'unknown'
        }, {
          onConflict: 'id'
        })

      if (error) {
        console.error('❌ Error guardando contenido:', error)
        return { success: false, error }
      }

      console.log('✅ Contenido guardado exitosamente:', data)
      return { success: true }
    } catch (error) {
      console.error('❌ Error inesperado guardando contenido:', error)
      return { success: false, error }
    }
  }

  // Cargar contenido editable por página
  static async loadContentByPage(page: string): Promise<{ success: boolean; data?: EditableContent[]; error?: any }> {
    try {
      console.log('📂 Cargando contenido para página:', page)
      
      const { data, error } = await supabase
        .from('editable_content')
        .select('*')
        .eq('page', page)
        .order('section', { ascending: true })

      if (error) {
        console.error('❌ Error cargando contenido:', error)
        return { success: false, error }
      }

      console.log('✅ Contenido cargado exitosamente:', data)
      return { success: true, data: data || [] }
    } catch (error) {
      console.error('❌ Error inesperado cargando contenido:', error)
      return { success: false, error }
    }
  }

  // Cargar contenido específico por ID
  static async loadContentById(id: string): Promise<{ success: boolean; data?: EditableContent; error?: any }> {
    try {
      console.log('📂 Cargando contenido por ID:', id)
      
      const { data, error } = await supabase
        .from('editable_content')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('❌ Error cargando contenido por ID:', error)
        return { success: false, error }
      }

      console.log('✅ Contenido cargado exitosamente:', data)
      return { success: true, data }
    } catch (error) {
      console.error('❌ Error inesperado cargando contenido por ID:', error)
      return { success: false, error }
    }
  }

  // Crear ID único para contenido
  static createContentId(page: string, section: string, field: string): string {
    return `${page}-${section}-${field}`.toLowerCase().replace(/\s+/g, '-')
  }

  // Guardar múltiples contenidos
  static async saveMultipleContents(contents: EditableContent[]): Promise<{ success: boolean; error?: any }> {
    try {
      console.log('💾 Guardando múltiples contenidos:', contents.length)
      
      const { data, error } = await supabase
        .from('editable_content')
        .upsert(
          contents.map(content => ({
            ...content,
            updated_at: new Date().toISOString(),
            updated_by: 'batch-update'
          })),
          { onConflict: 'id' }
        )

      if (error) {
        console.error('❌ Error guardando múltiples contenidos:', error)
        return { success: false, error }
      }

      console.log('✅ Múltiples contenidos guardados exitosamente')
      return { success: true }
    } catch (error) {
      console.error('❌ Error inesperado guardando múltiples contenidos:', error)
      return { success: false, error }
    }
  }

  // Verificar si la tabla editable_content existe
  static async checkTableExists(): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('editable_content')
        .select('id')
        .limit(1)

      if (error && error.code === '42P01') {
        // Tabla no existe
        return false
      }

      return true
    } catch (error) {
      console.error('❌ Error verificando tabla editable_content:', error)
      return false
    }
  }

  // Crear tabla editable_content si no existe
  static async createTableIfNotExists(): Promise<{ success: boolean; error?: any }> {
    try {
      const tableExists = await this.checkTableExists()
      
      if (tableExists) {
        console.log('✅ Tabla editable_content ya existe')
        return { success: true }
      }

      console.log('🔨 Creando tabla editable_content...')
      
      // Nota: En un entorno real, esto se haría con migraciones de Supabase
      // Por ahora, asumimos que la tabla ya existe o se crea manualmente
      console.log('⚠️ La tabla editable_content debe crearse manualmente en Supabase')
      
      return { success: false, error: 'Tabla editable_content no existe. Debe crearse manualmente.' }
    } catch (error) {
      console.error('❌ Error creando tabla editable_content:', error)
      return { success: false, error }
    }
  }
}
