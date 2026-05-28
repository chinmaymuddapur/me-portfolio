import { useEffect, useRef } from 'react';

export default function MouseGlow() {
  const glowRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;

      glow.style.left = pos.current.x + 'px';
      glow.style.top = pos.current.y + 'px';

      raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    loop();

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      style={{
        position: 'fixed',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(82,39,255,0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 1,
        transform: 'translate(-50%, -50%)',
        transition: 'opacity 0.3s',
        mixBlendMode: 'screen',
      }}
    />
  );
}
