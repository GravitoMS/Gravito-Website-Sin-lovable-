import React from 'react';
import { motion } from 'framer-motion';

// Componentes híbridos que mantienen animaciones pero son editables por Visual Edits
export const EditableFadeIn: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  delay?: number; 
  style?: React.CSSProperties;
  editable?: boolean;
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}> = ({ 
  children, 
  className = '', 
  delay = 0,
  style,
  editable = false,
  as = 'div'
}) => {
  // Si es editable, usamos un elemento estático con clases de animación CSS
  if (editable) {
    const Component = as;
    return (
      <Component
        className={`animate-fade-in ${className}`}
        style={{
          ...style,
          animationDelay: `${delay}s`,
          animationFillMode: 'both'
        }}
        data-editable="true"
      >
        {children}
      </Component>
    );
  }

  // Para elementos no editables, mantenemos framer-motion
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

export const EditableHoverScale: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
  editable?: boolean;
}> = ({ 
  children, 
  className = '',
  editable = false
}) => {
  // Si es editable, usamos hover scale con CSS
  if (editable) {
    return (
      <div
        className={`hover-scale ${className}`}
        data-editable="true"
      >
        {children}
      </div>
    );
  }

  // Para elementos no editables, mantenemos framer-motion
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const EditableSlideIn: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  direction?: 'left' | 'right';
  editable?: boolean;
}> = ({ 
  children, 
  className = '', 
  direction = 'left',
  editable = false
}) => {
  // Si es editable, usamos slide in con CSS
  if (editable) {
    return (
      <div
        className={`${direction === 'left' ? 'animate-slide-in-left' : 'animate-slide-in-right'} ${className}`}
        data-editable="true"
      >
        {children}
      </div>
    );
  }

  // Para elementos no editables, mantenemos framer-motion
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === 'left' ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Shortcut components para elementos comunes editables
export const EditableHeading: React.FC<{
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ level, children, className = '', delay = 0 }) => {
  const getHeadingTag = (level: number): 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' => {
    return `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  };
  
  return (
    <EditableFadeIn 
      as={getHeadingTag(level)} 
      editable={true} 
      className={className}
      delay={delay}
    >
      {children}
    </EditableFadeIn>
  );
};

export const EditableText: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: 'p' | 'span' | 'div';
}> = ({ children, className = '', delay = 0, as = 'p' }) => {
  return (
    <EditableFadeIn 
      as={as} 
      editable={true} 
      className={className}
      delay={delay}
    >
      {children}
    </EditableFadeIn>
  );
};