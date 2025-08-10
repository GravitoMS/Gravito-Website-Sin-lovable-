import React, { useState, useRef, useEffect } from 'react'
import { useInlineEdit } from '@/hooks/useInlineEdit'

interface InlineEditableTextProps {
  id: string
  initialValue: string
  className?: string
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  placeholder?: string
}

export const InlineEditableText: React.FC<InlineEditableTextProps> = ({
  id,
  initialValue,
  className = '',
  tag = 'p',
  placeholder = 'Escribe aquí...'
}) => {
  const {
    isAdmin,
    isEditMode,
    editingId,
    tempValue,
    startEditing,
    cancelEditing,
    saveChanges,
    updateTempValue
  } = useInlineEdit()

  const [value, setValue] = useState(initialValue)
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Manejar clic para iniciar edición
  const handleClick = () => {
    if (isAdmin && isEditMode && !isEditing) {
      startEditing(id, value)
      setIsEditing(true)
    }
  }

  // Manejar guardar cambios
  const handleSave = async () => {
    const success = await saveChanges(id, tempValue)
    if (success) {
      setValue(tempValue)
    }
    setIsEditing(false)
  }

  // Manejar cancelar edición
  const handleCancel = () => {
    cancelEditing()
    setIsEditing(false)
  }

  // Manejar teclas
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSave()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      handleCancel()
    }
  }

  // Focus en el input cuando se inicia edición
  useEffect(() => {
    if (isEditing && editingId === id) {
      if (inputRef.current) {
        inputRef.current.focus()
        inputRef.current.select()
      } else if (textareaRef.current) {
        textareaRef.current.focus()
        textareaRef.current.select()
      }
    }
  }, [isEditing, editingId, id])

  // Si está editando, mostrar input/textarea
  if (isEditing && editingId === id) {
    const isLongText = value.length > 100
    
    if (isLongText) {
      return (
        <div className={`inline-block ${className}`}>
          <textarea
            ref={textareaRef}
            value={tempValue}
            onChange={(e) => updateTempValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            placeholder={placeholder}
            className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
          <div className="mt-2 text-xs text-gray-500">
            Enter para guardar, Escape para cancelar
          </div>
        </div>
      )
    }

    return (
      <div className={`inline-block ${className}`}>
        <input
          ref={inputRef}
          type="text"
          value={tempValue}
          onChange={(e) => updateTempValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          placeholder={placeholder}
          className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="mt-1 text-xs text-gray-500">
          Enter para guardar, Escape para cancelar
        </div>
      </div>
    )
  }

  // Renderizar texto normal
  const Tag = tag as keyof JSX.IntrinsicElements
  return (
    <Tag
      className={`${className} ${isAdmin && isEditMode ? 'cursor-pointer hover:bg-blue-50 hover:border hover:border-blue-200 rounded px-1' : ''}`}
      onClick={handleClick}
    >
      {value}
    </Tag>
  )
}
