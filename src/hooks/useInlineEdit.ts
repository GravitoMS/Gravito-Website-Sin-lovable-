import { useState, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'

interface EditState {
  isEditMode: boolean
  editingId: string | null
  tempValue: string
}

export const useInlineEdit = () => {
  const { isAdmin } = useAuth()
  const [editState, setEditState] = useState<EditState>({
    isEditMode: false,
    editingId: null,
    tempValue: ''
  })

  // Activar/desactivar modo de edición
  const toggleEditMode = useCallback(() => {
    if (!isAdmin) {
      // Only admins can edit
      return
    }
    
    setEditState(prev => ({
      ...prev,
      isEditMode: !prev.isEditMode,
      editingId: null,
      tempValue: ''
    }))
  }, [isAdmin])

  // Iniciar edición de un elemento
  const startEditing = useCallback((id: string, currentValue: string) => {
    if (!isAdmin || !editState.isEditMode) return
    
    setEditState(prev => ({
      ...prev,
      editingId: id,
      tempValue: currentValue
    }))
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
    if (!isAdmin) return false
    
    try {
      // Save changes to database here
      
      setEditState(prev => ({
        ...prev,
        editingId: null,
        tempValue: ''
      }))
      
      return true
    } catch (error) {
      // Error saving changes
      return false
    }
  }, [isAdmin])

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
    editingId: editState.editingId,
    tempValue: editState.tempValue,
    toggleEditMode,
    startEditing,
    cancelEditing,
    saveChanges,
    updateTempValue
  }
}
