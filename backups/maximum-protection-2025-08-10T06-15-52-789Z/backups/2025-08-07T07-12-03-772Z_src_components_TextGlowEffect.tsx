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
      {children}
      {isHovering && (
        <div
          className="pointer-events-none absolute inset-0 rounded-lg transition-opacity duration-300"
          style={{
            background: `radial-gradient(800px circle at ${localMousePosition.x}px ${localMousePosition.y}px, rgba(255,255,255,0.3), transparent 50%)`,
            mixBlendMode: 'overlay',
            opacity: 1,
          }}
        />
      )}
      {isHovering && (
        <div
          className="pointer-events-none absolute inset-0 rounded-lg transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${localMousePosition.x}px ${localMousePosition.y}px, rgba(255,255,255,0.5), transparent 40%)`,
            mixBlendMode: 'soft-light',
            opacity: 0.8,
          }}
        />
      )}
      {isHovering && (
        <div
          className="pointer-events-none absolute inset-0 rounded-lg transition-opacity duration-300"
          style={{
            background: `radial-gradient(300px circle at ${localMousePosition.x}px ${localMousePosition.y}px, rgba(255,255,255,0.7), transparent 30%)`,
            mixBlendMode: 'color-dodge',
            opacity: 0.6,
          }}
        />
      )}
    </div>
  );
};

export default TextGlowEffect; 