import { useState, useCallback } from 'react'
import { useAuthSafe } from '@/contexts/AuthContext'

interface EditState {
  isEditMode: boolean
  editingId: string | null
  tempValue: string
}

export const useSimpleEdit = () => {
  const { isAdmin } = useAuthSafe()
  const [editState, setEditState] = useState<EditState>({
    isEditMode: false,
    editingId: null,
    tempValue: ''
  })

  // Activar/desactivar modo de edición
  const toggleEditMode = useCallback(() => {
    if (!isAdmin) {
      console.warn('⚠️ Solo admins pueden editar')
      return
    }
    
    setEditState(prev => ({
      ...prev,
      isEditMode: !prev.isEditMode,
      editingId: null,
      tempValue: ''
    }))
    
    console.log('🔄 Modo edición:', !editState.isEditMode)
  }, [isAdmin, editState.isEditMode])

  // Iniciar edición de un elemento
  const startEditing = useCallback((id: string, currentValue: string) => {
    if (!isAdmin || !editState.isEditMode) return
    
    setEditState(prev => ({
      ...prev,
      editingId: id,
      tempValue: currentValue
    }))
    
    console.log('✏️ Editando:', id)
  }, [isAdmin, editState.isEditMode])

  // Cancelar edición
  const cancelEditing = useCallback(() => {
    setEditState(prev => ({
      ...prev,
      editingId: null,
      tempValue: ''
    }))
  }, [])

  // Guardar cambios
  const saveChanges = useCallback(async (id: string, newValue: string) => {
    try {
      console.log('💾 Guardando:', id, newValue)
      
      // Aquí guardarías en la base de datos
      // Por ahora solo simulamos el guardado
      
      setEditState(prev => ({
        ...prev,
        editingId: null,
        tempValue: ''
      }))
      
      return { success: true }
    } catch (error) {
      console.error('❌ Error guardando:', error)
      return { success: false, error }
    }
  }, [])

  // Actualizar valor temporal
  const updateTempValue = useCallback((value: string) => {
    setEditState(prev => ({
      ...prev,
      tempValue: value
    }))
  }, [])

  return {
    isAdmin,
    isEditMode: editState.isEditMode,
    isEditing: !!editState.editingId,
    editingId: editState.editingId,
    tempValue: editState.tempValue,
    toggleEditMode,
    startEditing,
    cancelEditing,
    saveChanges,
    updateTempValue
  }
}
