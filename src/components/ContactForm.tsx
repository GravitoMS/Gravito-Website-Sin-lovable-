import React, { useState, useMemo, useCallback } from 'react';
import { FadeInUp, FadeInUpStaggered, FadeInSide, FadeInScale, HoverScale, HoverLift, HoverGlow, FadeInOnScroll, SlideInOnScroll, LoadingPulse, LoadingBounce, FadeInUpWithHover, StaggeredGroup } from '@/components/ui/AnimatedComponents';
import { AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CONTACT_CATEGORIES, BASE_FIELDS, type ContactField, type ContactCategory } from '@/data/contactFormConfig';

interface ContactFormData {
  [key: string]: string | boolean;
}

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => void;
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, className = '' }) => {
  const [formData, setFormData] = useState<ContactFormData>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Memoizar la categoría seleccionada
  const currentCategory = useMemo(() => {
    return CONTACT_CATEGORIES.find(cat => cat.id === selectedCategory);
  }, [selectedCategory]);

  // Memoizar campos visibles
  const visibleFields = useMemo(() => {
    const fields = [...BASE_FIELDS];
    
    if (currentCategory) {
      currentCategory.sections.forEach(section => {
        if (expandedSections.includes(section.id)) {
          fields.push(...section.fields);
        }
      });
    }
    
    return fields;
  }, [currentCategory, expandedSections]);

  // Validar campo
  const validateField = useCallback((field: ContactField, value: string | boolean): string => {
    if (field.required && !value) {
      return `${field.label} es requerido`;
    }

    if (typeof value === 'string' && value.trim()) {
      if (field.validation?.minLength && value.length < field.validation.minLength) {
        return `${field.label} debe tener al menos ${field.validation.minLength} caracteres`;
      }
      
      if (field.validation?.maxLength && value.length > field.validation.maxLength) {
        return `${field.label} debe tener máximo ${field.validation.maxLength} caracteres`;
      }
      
      if (field.validation?.pattern && field.type === 'email') {
        const emailRegex = new RegExp(field.validation.pattern);
        if (!emailRegex.test(value)) {
          return `${field.label} debe ser un email válido`;
        }
      }
    }

    return '';
  }, []);

  // Manejar cambio de campo
  const handleFieldChange = useCallback((fieldId: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));

    // Limpiar error del campo
    if (errors[fieldId]) {
      setErrors(prev => ({
        ...prev,
        [fieldId]: ''
      }));
    }
  }, [errors]);

  // Manejar cambio de categoría
  const handleCategoryChange = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    setExpandedSections([]);
    setErrors({});
    
    // Limpiar datos de campos específicos de la categoría anterior
    if (currentCategory) {
      const fieldsToRemove = currentCategory.sections.flatMap(section => 
        section.fields.map(field => field.id)
      );
      
      setFormData(prev => {
        const newData = { ...prev };
        fieldsToRemove.forEach(fieldId => {
          delete newData[fieldId];
        });
        return newData;
      });
    }
  }, [currentCategory]);

  // Manejar expansión de sección
  const handleSectionToggle = useCallback((sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  }, []);

  // Validar formulario completo
  const validateForm = useCallback((): boolean => {
    const newErrors: { [key: string]: string } = {};
    let isValid = true;

    // Validar campos base
    BASE_FIELDS.forEach(field => {
      const error = validateField(field, formData[field.id] || '');
      if (error) {
        newErrors[field.id] = error;
        isValid = false;
      }
    });

    // Validar campos de categoría seleccionada
    if (currentCategory) {
      currentCategory.sections.forEach(section => {
        if (expandedSections.includes(section.id)) {
          section.fields.forEach(field => {
            const error = validateField(field, formData[field.id] || '');
            if (error) {
              newErrors[field.id] = error;
              isValid = false;
            }
          });
        }
      });
    }

    setErrors(newErrors);
    return isValid;
  }, [formData, currentCategory, expandedSections, validateField]);

  // Manejar envío del formulario
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simular envío
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (onSubmit) {
        onSubmit(formData);
      }
      
      // Limpiar formulario
      setFormData({});
      setSelectedCategory('');
      setExpandedSections([]);
      setErrors({});
      
    } catch (error) {
      // Error handling - form submission failed
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, onSubmit]);

  // Renderizar campo
  const renderField = useCallback((field: ContactField) => {
    const value = formData[field.id] || '';
    const error = errors[field.id];

    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="text-sm font-medium">
              {field.label}
              {field.required && <span className="text-error ml-1">*</span>}
            </Label>
            <Input
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              value={value as string}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className={error ? 'border-error' : ''}
            />
            {error && <p className="text-error text-xs">{error}</p>}
          </div>
        );

      case 'select':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="text-sm font-medium">
              {field.label}
              {field.required && <span className="text-error ml-1">*</span>}
            </Label>
            <Select
              value={value as string}
              onValueChange={(val) => handleFieldChange(field.id, val)}
            >
              <SelectTrigger className={error ? 'border-error' : ''}>
                <SelectValue placeholder={`Selecciona ${field.label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {error && <p className="text-error text-xs">{error}</p>}
          </div>
        );

      case 'textarea':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="text-sm font-medium">
              {field.label}
              {field.required && <span className="text-error ml-1">*</span>}
            </Label>
            <Textarea
              id={field.id}
              placeholder={field.placeholder}
              value={value as string}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className={error ? 'border-error' : ''}
              rows={4}
            />
            {error && <p className="text-error text-xs">{error}</p>}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.id} className="flex items-center space-x-2">
            <Checkbox
              id={field.id}
              checked={value as boolean}
              onCheckedChange={(checked) => handleFieldChange(field.id, checked as boolean)}
            />
            <Label htmlFor={field.id} className="text-sm font-medium">
              {field.label}
            </Label>
            {error && <p className="text-error text-xs">{error}</p>}
          </div>
        );

      default:
        return null;
    }
  }, [formData, errors, handleFieldChange]);

  return (
    <Card className={`w-full max-w-4xl mx-auto ${className}`}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Formulario de Contacto Inteligente
        </CardTitle>
        <p className="text-muted-foreground text-center">
          Completa la información básica y selecciona el tipo de consulta para obtener campos específicos
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campos Base */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {BASE_FIELDS.map(renderField)}
          </div>

          {/* Selector de Categoría */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Tipo de Consulta <span className="text-error">*</span>
            </Label>
            <Select
              value={selectedCategory}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el tipo de consulta" />
              </SelectTrigger>
              <SelectContent>
                {CONTACT_CATEGORIES.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{category.label}</span>
                      <span className="text-xs text-muted-foreground">{category.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Secciones de Categoría */}
          <AnimatePresence>
            {currentCategory && (
              <FadeInUp
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">
                    {currentCategory.label}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {currentCategory.description}
                  </p>
                  
                  {currentCategory.sections.map((section) => (
                    <div key={section.id} className="mb-6">
                      <button
                        type="button"
                        onClick={() => handleSectionToggle(section.id)}
                        className="w-full flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <Badge variant="secondary">
                            {expandedSections.includes(section.id) ? 'Contraer' : 'Expandir'}
                          </Badge>
                          <span className="font-medium">{section.title}</span>
                        </div>
                        {expandedSections.includes(section.id) ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      
                      <AnimatePresence>
                        {expandedSections.includes(section.id) && (
                          <FadeInUp
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 p-4 bg-background border rounded-lg space-y-4"
                          >
                            {section.fields.map(renderField)}
                          </FadeInUp>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </FadeInUp>
            )}
          </AnimatePresence>

          {/* Botón de Envío */}
          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting || !selectedCategory}
              className="min-w-[200px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Enviar Consulta
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
