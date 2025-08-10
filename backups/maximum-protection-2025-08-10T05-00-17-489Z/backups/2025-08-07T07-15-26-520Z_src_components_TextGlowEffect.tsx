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
          className="pointer-events-none absolute inset-0 rounded-lg transition-all duration-300"
          style={{
            background: `radial-gradient(600px circle at ${localMousePosition.x}px ${localMousePosition.y}px, rgba(0,0,0,0.9), transparent 60%)`,
            mixBlendMode: 'multiply',
            opacity: 1,
          }}
        />
      )}
      {isHovering && (
        <div
          className="pointer-events-none absolute inset-0 rounded-lg transition-all duration-300"
          style={{
            background: `radial-gradient(400px circle at ${localMousePosition.x}px ${localMousePosition.y}px, rgba(255,255,255,0.8), transparent 50%)`,
            mixBlendMode: 'difference',
            opacity: 0.9,
          }}
        />
      )}
      {isHovering && (
        <div
          className="pointer-events-none absolute inset-0 rounded-lg transition-all duration-300"
          style={{
            background: `radial-gradient(300px circle at ${localMousePosition.x}px ${localMousePosition.y}px, rgba(255,255,255,1), transparent 40%)`,
            mixBlendMode: 'exclusion',
            opacity: 0.7,
          }}
        />
      )}
    </div>
  );
};

export default TextGlowEffect; 