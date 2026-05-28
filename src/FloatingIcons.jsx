import { useEffect, useRef } from 'react';

const ICONS = ['⚡', '🤖', '🔧', '💻', '📡', '🌐', '🧠', '⚙️'];

export default function FloatingIcons({ count = 8 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const icons = Array.from({ length: count }, (_, i) => {
      const icon = document.createElement('div');
      icon.textContent = ICONS[i % ICONS.length];
      icon.style.position = 'absolute';
      icon.style.fontSize = `${Math.random() * 20 + 20}px`;
      icon.style.opacity = `${Math.random() * 0.15 + 0.05}`;
      icon.style.left = `${Math.random() * 100}%`;
      icon.style.top = `${Math.random() * 100}%`;
      icon.style.pointerEvents = 'none';
      icon.style.userSelect = 'none';
      
      const duration = Math.random() * 20 + 15;
      const delay = Math.random() * -20;
      icon.style.animation = `floatIcon ${duration}s ${delay}s ease-in-out infinite`;
      
      container.appendChild(icon);
      return icon;
    });

    return () => {
      icons.forEach(icon => icon.remove());
    };
  }, [count]);

  return (
    <>
      <div
        ref={containerRef}
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          overflow: 'hidden',
        }}
      />
      <style>{`
        @keyframes floatIcon {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(30px, -40px) rotate(5deg);
          }
          50% {
            transform: translate(-20px, -80px) rotate(-5deg);
          }
          75% {
            transform: translate(40px, -40px) rotate(3deg);
          }
        }
      `}</style>
    </>
  );
}
