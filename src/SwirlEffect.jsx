import { useEffect, useRef } from 'react';

// Colors from the LiquidEther theme
const COLORS = ['#5227FF', '#FF9FFC', '#B497CF'];

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

export default function SwirlEffect() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const timeRef = useRef(0);
  const opacityRef = useRef(0); // fade in/out

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove);

    const draw = () => {
      const { width, height } = canvas;
      const cx = width / 2;
      const cy = height / 2;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Distance from cursor to centre (normalised 0–1, 1 = fully at centre)
      const dist = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2);
      const triggerRadius = Math.min(width, height) * 0.22; // 22% of smallest dimension
      const proximity = Math.max(0, 1 - dist / triggerRadius); // 0 far, 1 at centre

      // Smooth fade
      const target = proximity > 0.05 ? proximity : 0;
      opacityRef.current += (target - opacityRef.current) * 0.08;

      ctx.clearRect(0, 0, width, height);

      if (opacityRef.current > 0.01) {
        timeRef.current += 0.04; // spin speed
        const t = timeRef.current;
        const alpha = opacityRef.current;

        const ARMS = 3;          // spiral arms
        const TURNS = 2.8;       // how many full rotations per arm
        const POINTS = 120;      // resolution per arm
        const MAX_R = triggerRadius * 0.85;

        for (let arm = 0; arm < ARMS; arm++) {
          const armOffset = (arm / ARMS) * Math.PI * 2;
          const color = hexToRgb(COLORS[arm % COLORS.length]);

          ctx.beginPath();
          for (let i = 0; i <= POINTS; i++) {
            const frac = i / POINTS;
            const angle = frac * TURNS * Math.PI * 2 + armOffset + t;
            const r = frac * MAX_R;
            const px = cx + Math.cos(angle) * r;
            const py = cy + Math.sin(angle) * r;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }

          // Gradient along the arm: inner bright → outer fades
          const grad = ctx.createLinearGradient(cx, cy, cx + MAX_R, cy);
          grad.addColorStop(0, `rgba(${color.r},${color.g},${color.b},0)`);
          grad.addColorStop(0.3, `rgba(${color.r},${color.g},${color.b},${alpha * 0.9})`);
          grad.addColorStop(1, `rgba(${color.r},${color.g},${color.b},0)`);

          ctx.strokeStyle = grad;
          ctx.lineWidth = 2.5;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.globalAlpha = 1;
          ctx.stroke();
        }

        // Glowing centre dot
        const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, MAX_R * 0.18);
        glow.addColorStop(0, `rgba(255,255,255,${alpha * 0.9})`);
        glow.addColorStop(0.3, `rgba(178,151,207,${alpha * 0.5})`);
        glow.addColorStop(1, `rgba(82,39,255,0)`);
        ctx.beginPath();
        ctx.arc(cx, cy, MAX_R * 0.18, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    />
  );
}
