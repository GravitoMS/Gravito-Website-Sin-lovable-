import { useState, useCallback, useEffect } from 'react'
import { useAuthSafe } from '@/contexts/AuthContext'
import { EditModeService, EditableContent } from '@/lib/editModeService'

interface EditModeState {
  isEditMode: boolean
  isEditing: boolean
  currentEditId: string | null
  pendingChanges: Record<string, any>
}

export const useEditMode = () => {
  const { isAdmin } = useAuthSafe()
  const [editState, setEditState] = useState<EditModeState>({
    isEditMode: false,
    isEditing: false,
    currentEditId: null,
    pendingChanges: {}
  })

  // Solo permitir modo de edición si es admin
  const toggleEditMode = useCallback(() => {
    if (!isAdmin) {
      console.warn('⚠️ Intento de activar modo edición sin permisos de admin')
      return
    }
    
    console.log('🔄 Alternando modo de edición:', !editState.isEditMode)
    
    setEditState(prev => ({
      ...prev,
      isEditMode: !prev.isEditMode,
      isEditing: false,
      currentEditId: null,
      pendingChanges: {}
    }))
  }, [isAdmin, editState.isEditMode])

  // Activar modo de edición
  const enableEditMode = useCallback(() => {
    if (!isAdmin) {
      console.warn('⚠️ Intento de activar modo edición sin permisos de admin')
      return
    }
    
    console.log('🔄 Activando modo de edición')
    
    setEditState(prev => ({
      ...prev,
      isEditMode: true,
      isEditing: false,
      currentEditId: null,
      pendingChanges: {}
    }))
  }, [isAdmin])

  // Desactivar modo de edición
  const disableEditMode = useCallback(() => {
    setEditState({
      isEditMode: false,
      isEditing: false,
      currentEditId: null,
      pendingChanges: {}
    })
  }, [])

  // Iniciar edición de un elemento
  const startEditing = useCallback((elementId: string, initialValue: any) => {
    if (!editState.isEditMode) return
    
    setEditState(prev => ({
      ...prev,
      isEditing: true,
      currentEditId: elementId,
      pendingChanges: {
        ...prev.pendingChanges,
        [elementId]: initialValue
      }
    }))
  }, [editState.isEditMode])

  // Cancelar edición
  const cancelEditing = useCallback(() => {
    setEditState(prev => ({
      ...prev,
      isEditing: false,
      currentEditId: null
    }))
  }, [])

  // Guardar cambios
  const saveChanges = useCallback(async (elementId: string, newValue: any) => {
    try {
      console.log('💾 Guardando cambios:', { elementId, newValue })
      
      // Extraer información del ID (formato: page-section-field)
      const [page, section, field] = elementId.split('-')
      
      const content: EditableContent = {
        id: elementId,
        page,
        section,
        field,
        content: newValue
      }
      
      const result = await EditModeService.saveContent(content)
      
      if (result.success) {
        setEditState(prev => ({
          ...prev,
          isEditing: false,
          currentEditId: null,
          pendingChanges: {
            ...prev.pendingChanges,
            [elementId]: newValue
          }
        }))
      }
      
      return result
    } catch (error) {
      console.error('❌ Error guardando cambios:', error)
      return { success: false, error }
    }
  }, [])

  // Verificar si un elemento está siendo editado
  const isElementEditing = useCallback((elementId: string) => {
    return editState.isEditing && editState.currentEditId === elementId
  }, [editState.isEditing, editState.currentEditId])

  // Obtener valor pendiente de un elemento
  const getPendingValue = useCallback((elementId: string) => {
    return editState.pendingChanges[elementId]
  }, [editState.pendingChanges])

  // Limpiar cambios pendientes
  const clearPendingChanges = useCallback(() => {
    setEditState(prev => ({
      ...prev,
      pendingChanges: {}
    }))
  }, [])

  // Desactivar modo de edición cuando el usuario no es admin
  useEffect(() => {
    if (!isAdmin && editState.isEditMode) {
      disableEditMode()
    }
  }, [isAdmin, editState.isEditMode, disableEditMode])

  return {
    // Estado
    isEditMode: editState.isEditMode && isAdmin,
    isEditing: editState.isEditing,
    currentEditId: editState.currentEditId,
    pendingChanges: editState.pendingChanges,
    
    // Acciones
    toggleEditMode,
    enableEditMode,
    disableEditMode,
    startEditing,
    cancelEditing,
    saveChanges,
    isElementEditing,
    getPendingValue,
    clearPendingChanges,
    
    // Utilidades
    canEdit: isAdmin
  }
}
