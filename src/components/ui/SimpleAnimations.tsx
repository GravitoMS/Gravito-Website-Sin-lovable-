import React from 'react';
import { motion } from 'framer-motion';

// Sistema de animaciones ultra-simple y confiable
export const FadeIn: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  delay?: number; 
  style?: React.CSSProperties;
}> = ({ 
  children, 
  className = '', 
  delay = 0,
  style 
}) => (
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

export const HoverScale: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.2 }}
    className={className}
  >
    {children}
  </motion.div>
);

export const SlideIn: React.FC<{ children: React.ReactNode; className?: string; direction?: 'left' | 'right' }> = ({ 
  children, 
  className = '', 
  direction = 'left' 
}) => (
  <motion.div
    initial={{ opacity: 0, x: direction === 'left' ? -50 : 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
    className={className}
  >
    {children}
  </motion.div>
);

export const SimpleSpinner: React.FC<{ className?: string }> = ({ className = '' }) => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    className={`w-6 h-6 border-2 border-primary border-t-transparent rounded-full ${className}`}
  />
);

// Basic scale animation for when we need something simple
export const FadeInScale: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
}> = ({ 
  children, 
  className = '', 
  delay = 0 
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3, delay }}
    className={className}
  >
    {children}
  </motion.div>
);