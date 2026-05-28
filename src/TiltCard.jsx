import { useRef } from 'react';

export default function TiltCard({ children, className = '', intensity = 12 }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale(1.02)`;
    // Shine
    const shine = el.querySelector('.tilt-shine');
    if (shine) {
      shine.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.08) 0%, transparent 60%)`;
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)';
    const shine = el.querySelector('.tilt-shine');
    if (shine) shine.style.background = 'none';
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: 'transform 0.1s', transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      <div className="tilt-shine" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 20, borderRadius: 'inherit' }} />
      {children}
    </div>
  );
}
