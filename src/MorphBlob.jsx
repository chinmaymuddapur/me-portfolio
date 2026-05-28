import { useEffect, useRef } from 'react';

function blobPoint(angle, t, seed) {
  const noise =
    Math.sin(angle * 3 + t * 0.7 + seed) * 0.12 +
    Math.sin(angle * 5 - t * 0.5 + seed * 2) * 0.07 +
    Math.sin(angle * 7 + t * 1.1 + seed * 0.5) * 0.04;
  return 1 + noise;
}

export default function MorphBlob({ size = 600, color1 = '#5227FF', color2 = '#FF9FFC' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = size;
    canvas.height = size;
    let raf;
    let t = 0;
    const cx = size / 2, cy = size / 2;
    const baseR = size * 0.38;
    const POINTS = 120;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      t += 0.008;

      ctx.beginPath();
      for (let i = 0; i <= POINTS; i++) {
        const angle = (i / POINTS) * Math.PI * 2;
        const r = baseR * blobPoint(angle, t, 1.23);
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseR * 1.2);
      grad.addColorStop(0, color1);
      grad.addColorStop(1, color2);
      ctx.fillStyle = grad;
      ctx.fill();

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, [size, color1, color2]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size, display: 'block' }}
    />
  );
}
