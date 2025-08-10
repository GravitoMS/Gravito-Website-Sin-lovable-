export interface ContactField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea' | 'number' | 'checkbox';
  required: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
  };
  conditional?: {
    dependsOn: string;
    value: string | string[];
  };
}

export interface ContactSection {
  id: string;
  title: string;
  description?: string;
  fields: ContactField[];
}

export interface ContactCategory {
  id: string;
  label: string;
  description: string;
  sections: ContactSection[];
}

export const CONTACT_CATEGORIES: ContactCategory[] = [
  {
    id: 'servicios',
    label: 'Servicios y Consultas',
    description: 'Consulta sobre nuestros servicios y planes',
    sections: [
      {
        id: 'servicios-generales',
        title: 'Información General de Servicios',
        fields: [
          {
            id: 'servicio-interes',
            label: 'Servicio de Interés',
            type: 'select',
            required: true,
            options: [
              { value: 'auditoria', label: 'Auditoría Inicial' },
              { value: 'redes-sociales', label: 'Gestión de Redes Sociales' },
              { value: 'google-my-business', label: 'Gestión de Google My Business' },
              { value: 'ugc', label: 'Contenido Generado por Usuario (UGC)' },
              { value: 'post-produccion', label: 'Servicio de Post-Producción' },
              { value: 'brand-collateral', label: 'Diseños de Brand Collateral' },
              { value: 'social-graphics', label: 'Diseños de Social Media Graphics' },
              { value: 'todos', label: 'Todos los Servicios' }
            ]
          },
          {
            id: 'nivel-interes',
            label: 'Nivel de Interés',
            type: 'select',
            required: true,
            options: [
              { value: 'nivel-1', label: 'Nivel 1: Presencia Esencial' },
              { value: 'nivel-2', label: 'Nivel 2: Crecimiento y Optimización' },
              { value: 'nivel-3', label: 'Nivel 3: Liderazgo y Expansión' },
              { value: 'enterprise', label: 'Enterprise' },
              { value: 'no-se', label: 'No sé, necesito asesoría' }
            ]
          },
          {
            id: 'presupuesto',
            label: 'Rango de Presupuesto Mensual',
            type: 'select',
            required: false,
            options: [
              { value: 'menos-1000', label: 'Menos de $1,000 MXN' },
              { value: '1000-3000', label: '$1,000 - $3,000 MXN' },
              { value: '3000-5000', label: '$3,000 - $5,000 MXN' },
              { value: '5000-10000', label: '$5,000 - $10,000 MXN' },
              { value: 'mas-10000', label: 'Más de $10,000 MXN' },
              { value: 'no-se', label: 'No sé, necesito asesoría' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'precios',
    label: 'Precios y Facturación',
    description: 'Consulta sobre precios, facturación y métodos de pago',
    sections: [
      {
        id: 'facturacion',
        title: 'Información de Facturación',
        fields: [
          {
            id: 'tipo-facturacion',
            label: 'Tipo de Facturación Preferida',
            type: 'select',
            required: true,
            options: [
              { value: 'mensual', label: 'Facturación Mensual' },
              { value: 'anual', label: 'Facturación Anual (15% descuento)' },
              { value: 'no-se', label: 'No sé, necesito asesoría' }
            ]
          },
          {
            id: 'metodo-pago',
            label: 'Método de Pago Preferido',
            type: 'select',
            required: false,
            options: [
              { value: 'transferencia', label: 'Transferencia Bancaria' },
              { value: 'tarjeta', label: 'Tarjeta de Crédito/Débito' },
              { value: 'paypal', label: 'PayPal' },
              { value: 'no-se', label: 'No sé, necesito asesoría' }
            ]
          },
          {
            id: 'requiere-factura',
            label: '¿Requiere factura fiscal?',
            type: 'checkbox',
            required: false
          }
        ]
      }
    ]
  },
  {
    id: 'proceso',
    label: 'Proceso y Metodología',
    description: 'Conoce nuestro proceso de trabajo y metodología',
    sections: [
      {
        id: 'proceso-trabajo',
        title: 'Proceso de Trabajo',
        fields: [
          {
            id: 'tiempo-implementacion',
            label: '¿En cuánto tiempo necesita comenzar?',
            type: 'select',
            required: true,
            options: [
              { value: 'inmediato', label: 'Inmediato (1-2 semanas)' },
              { value: '1-mes', label: 'En 1 mes' },
              { value: '2-3-meses', label: 'En 2-3 meses' },
              { value: 'no-urgente', label: 'No es urgente, solo explorando opciones' }
            ]
          },
          {
            id: 'frecuencia-reuniones',
            label: 'Frecuencia de Reuniones Preferida',
            type: 'select',
            required: false,
            options: [
              { value: 'semanal', label: 'Semanal' },
              { value: 'quincenal', label: 'Quincenal' },
              { value: 'mensual', label: 'Mensual' },
              { value: 'según-necesidad', label: 'Según necesidad' }
            ]
          },
          {
            id: 'plataformas-actuales',
            label: 'Plataformas que usa actualmente',
            type: 'textarea',
            required: false,
            placeholder: 'Ej: Instagram, Facebook, TikTok, Google My Business...'
          }
        ]
      }
    ]
  },
  {
    id: 'soporte',
    label: 'Soporte y Atención',
    description: 'Soporte técnico, cambios y atención al cliente',
    sections: [
      {
        id: 'soporte-tecnico',
        title: 'Soporte Técnico',
        fields: [
          {
            id: 'tipo-problema',
            label: 'Tipo de Problema',
            type: 'select',
            required: true,
            options: [
              { value: 'tecnico', label: 'Problema Técnico' },
              { value: 'cambio-plan', label: 'Solicitud de Cambio de Plan' },
              { value: 'facturacion', label: 'Problema de Facturación' },
              { value: 'comunicacion', label: 'Problema de Comunicación' },
              { value: 'otro', label: 'Otro' }
            ]
          },
          {
            id: 'descripcion-problema',
            label: 'Descripción del Problema',
            type: 'textarea',
            required: true,
            placeholder: 'Describe detalladamente el problema que estás experimentando...'
          },
          {
            id: 'urgencia',
            label: 'Nivel de Urgencia',
            type: 'select',
            required: true,
            options: [
              { value: 'baja', label: 'Baja - Puede esperar' },
              { value: 'media', label: 'Media - Necesita atención pronto' },
              { value: 'alta', label: 'Alta - Necesita atención inmediata' },
              { value: 'critica', label: 'Crítica - Urgente' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'informacion',
    label: 'Información y Recursos',
    description: 'Solicita información adicional, recursos y materiales',
    sections: [
      {
        id: 'recursos',
        title: 'Recursos Solicitados',
        fields: [
          {
            id: 'tipo-recurso',
            label: 'Tipo de Recurso',
            type: 'select',
            required: true,
            options: [
              { value: 'case-studies', label: 'Case Studies' },
              { value: 'testimonios', label: 'Testimonios de Clientes' },
              { value: 'guias', label: 'Guías y Ebooks' },
              { value: 'webinars', label: 'Webinars y Talleres' },
              { value: 'blog', label: 'Contenido del Blog' },
              { value: 'otro', label: 'Otro Recurso' }
            ]
          },
          {
            id: 'industria',
            label: 'Industria de Interés',
            type: 'select',
            required: false,
            options: [
              { value: 'restaurantes', label: 'Restaurantes y Gastronomía' },
              { value: 'salud', label: 'Salud y Bienestar' },
              { value: 'educacion', label: 'Educación' },
              { value: 'tecnologia', label: 'Tecnología' },
              { value: 'retail', label: 'Retail y E-commerce' },
              { value: 'servicios', label: 'Servicios Profesionales' },
              { value: 'otro', label: 'Otra Industria' }
            ]
          },
          {
            id: 'descripcion-recurso',
            label: 'Descripción del Recurso Necesario',
            type: 'textarea',
            required: false,
            placeholder: 'Describe qué tipo de información o recurso específico necesitas...'
          }
        ]
      }
    ]
  },
  {
    id: 'otros',
    label: 'Otros',
    description: 'Otras consultas, alianzas, colaboraciones y oportunidades',
    sections: [
      {
        id: 'otros-temas',
        title: 'Otros Temas',
        fields: [
          {
            id: 'tipo-consulta',
            label: 'Tipo de Consulta',
            type: 'select',
            required: true,
            options: [
              { value: 'alianza', label: 'Alianza Comercial' },
              { value: 'colaboracion', label: 'Colaboración' },
              { value: 'trabajo', label: 'Oportunidad de Trabajo' },
              { value: 'inversion', label: 'Consulta de Inversión' },
              { value: 'franquicia', label: 'Consulta sobre Franquicias' },
              { value: 'otro', label: 'Otro' }
            ]
          },
          {
            id: 'descripcion-consulta',
            label: 'Descripción de la Consulta',
            type: 'textarea',
            required: true,
            placeholder: 'Describe detalladamente tu consulta...'
          }
        ]
      }
    ]
  }
];

export const BASE_FIELDS: ContactField[] = [
  {
    id: 'nombre',
    label: 'Nombre Completo',
    type: 'text',
    required: true,
    placeholder: 'Tu nombre completo',
    validation: {
      minLength: 2,
      maxLength: 100
    }
  },
  {
    id: 'email',
    label: 'Correo Electrónico',
    type: 'email',
    required: true,
    placeholder: 'tu@email.com',
    validation: {
      pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'
    }
  },
  {
    id: 'telefono',
    label: 'Teléfono',
    type: 'tel',
    required: false,
    placeholder: '+52 (55) 1234-5678',
    validation: {
      minLength: 10,
      maxLength: 15
    }
  }
];
