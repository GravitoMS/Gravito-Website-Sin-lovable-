import React, { useRef, useEffect, useState } from 'react';
import { useMousePosition } from '../hooks/useMousePosition';

interface TextGlowEffectProps {
  children: React.ReactNode;
  className?: string;
}

const TextGlowEffect: React.FC<TextGlowEffectProps> = ({ children, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);
  const [localMousePosition, setLocalMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (containerRef.current && isHovering) {
      const rect = containerRef.current.getBoundingClientRect();
      const localX = x - rect.left;
      const localY = y - rect.top;
      setLocalMousePosition({ x: localX, y: localY });
    }
  }, [x, y, isHovering]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering && (
        <div
          className="pointer-events-none absolute inset-0 rounded-lg transition-all duration-300 z-0"
          style={{
            background: `radial-gradient(800px circle at ${localMousePosition.x}px ${localMousePosition.y}px, rgba(0,0,0,0.95), transparent 70%)`,
            mixBlendMode: 'multiply',
            opacity: 1,
          }}
        />
      )}
      {isHovering && (
        <div
          className="pointer-events-none absolute inset-0 rounded-lg transition-all duration-300 z-0"
          style={{
            background: `radial-gradient(600px circle at ${localMousePosition.x}px ${localMousePosition.y}px, rgba(255,255,255,0.9), transparent 60%)`,
            mixBlendMode: 'difference',
            opacity: 0.95,
          }}
        />
      )}
      {isHovering && (
        <div
          className="pointer-events-none absolute inset-0 rounded-lg transition-all duration-300 z-0"
          style={{
            background: `radial-gradient(400px circle at ${localMousePosition.x}px ${localMousePosition.y}px, rgba(255,255,255,1), transparent 50%)`,
            mixBlendMode: 'exclusion',
            opacity: 0.8,
          }}
        />
      )}
      {children}
    </div>
  );
};

export default TextGlowEffect; 