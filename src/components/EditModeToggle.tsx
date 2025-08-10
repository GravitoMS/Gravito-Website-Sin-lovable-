import React from 'react'
import { useInlineEdit } from '@/hooks/useInlineEdit'
import { Edit, X } from 'lucide-react'

export const EditModeToggle: React.FC = () => {
  const { isAdmin, isEditMode, toggleEditMode } = useInlineEdit()

  // Solo mostrar si es admin
  if (!isAdmin) {
    return null
  }

  return (
    <button
      onClick={toggleEditMode}
      className={`
        fixed top-4 right-4 z-50 p-3 rounded-full shadow-lg transition-all duration-200
        ${isEditMode 
          ? 'bg-red-500 hover:bg-red-600 text-white' 
          : 'bg-blue-500 hover:bg-blue-600 text-white'
        }
      `}
      title={isEditMode ? 'Desactivar modo edición' : 'Activar modo edición'}
    >
      {isEditMode ? (
        <X className="w-5 h-5" />
      ) : (
        <Edit className="w-5 h-5" />
      )}
    </button>
  )
}
