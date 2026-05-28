import { useEffect, useRef, useState } from 'react';

export default function CinematicIntro({ onComplete }) {
  const canvasRef = useRef(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let raf;
    let startTime = performance.now();
    const DURATION = 3500; // 3.5s intro

    // Particle system
    const particles = Array.from({ length: 180 }, () => ({
      x: W / 2 + (Math.random() - 0.5) * 200,
      y: H / 2 + (Math.random() - 0.5) * 200,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      r: Math.random() * 2.5 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      color: Math.random() > 0.5 ? '#5227FF' : '#FF9FFC',
      trail: [],
    }));

    // Gas clouds
    const clouds = Array.from({ length: 8 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 180 + 120,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.15 + 0.05,
      color: ['#5227FF', '#FF9FFC', '#B497CF'][Math.floor(Math.random() * 3)],
    }));

    const draw = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / DURATION, 1);

      // Fade out effect
      if (progress > 0.75) {
        const fadeProgress = (progress - 0.75) / 0.25;
        ctx.globalAlpha = 1 - fadeProgress;
      } else {
        ctx.globalAlpha = 1;
      }

      // Clear with trail effect
      ctx.fillStyle = 'rgba(5,3,15,0.08)';
      ctx.fillRect(0, 0, W, H);

      // Swirl center force
      const centerX = W / 2;
      const centerY = H / 2;
      const swirlStrength = Math.sin(progress * Math.PI) * 0.8; // peaks mid-animation

      // Draw gas clouds
      clouds.forEach(cloud => {
        const dx = centerX - cloud.x;
        const dy = centerY - cloud.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        
        // Swirl + expand
        cloud.vx += Math.cos(angle + Math.PI / 2) * swirlStrength * 0.02;
        cloud.vy += Math.sin(angle + Math.PI / 2) * swirlStrength * 0.02;
        
        // Expand outward in second half
        if (progress > 0.5) {
          const expandForce = (progress - 0.5) * 2;
          cloud.vx += (dx / dist) * -0.5 * expandForce;
          cloud.vy += (dy / dist) * -0.5 * expandForce;
        }

        cloud.x += cloud.vx;
        cloud.y += cloud.vy;
        cloud.vx *= 0.98;
        cloud.vy *= 0.98;

        // Wrap
        if (cloud.x < -cloud.r) cloud.x = W + cloud.r;
        if (cloud.x > W + cloud.r) cloud.x = -cloud.r;
        if (cloud.y < -cloud.r) cloud.y = H + cloud.r;
        if (cloud.y > H + cloud.r) cloud.y = -cloud.r;

        // Draw cloud
        const grad = ctx.createRadialGradient(cloud.x, cloud.y, 0, cloud.x, cloud.y, cloud.r);
        grad.addColorStop(0, cloud.color + Math.floor(cloud.alpha * 255).toString(16).padStart(2, '0'));
        grad.addColorStop(0.5, cloud.color + '10');
        grad.addColorStop(1, cloud.color + '00');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, cloud.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw particles
      particles.forEach(p => {
        const dx = centerX - p.x;
        const dy = centerY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);

        // Swirl force
        p.vx += Math.cos(angle + Math.PI / 2) * swirlStrength * 0.15;
        p.vy += Math.sin(angle + Math.PI / 2) * swirlStrength * 0.15;

        // Expand in second half
        if (progress > 0.5) {
          const expandForce = (progress - 0.5) * 2;
          p.vx += (dx / dist) * -1.2 * expandForce;
          p.vy += (dy / dist) * -1.2 * expandForce;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy *= 0.97;

        // Trail
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 12) p.trail.shift();

        // Draw trail
        p.trail.forEach((t, i) => {
          const trailAlpha = (i / p.trail.length) * p.alpha * (1 - progress * 0.5);
          ctx.beginPath();
          ctx.arc(t.x, t.y, p.r * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = p.color + Math.floor(trailAlpha * 100).toString(16).padStart(2, '0');
          ctx.fill();
        });

        // Draw particle
        const particleAlpha = p.alpha * (1 - progress);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        const pGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2);
        pGrad.addColorStop(0, p.color + 'ff');
        pGrad.addColorStop(0.5, p.color + Math.floor(particleAlpha * 200).toString(16).padStart(2, '0'));
        pGrad.addColorStop(1, p.color + '00');
        ctx.fillStyle = pGrad;
        ctx.fill();
      });

      // Holographic center glow
      if (progress < 0.7) {
        const glowAlpha = Math.sin(progress * Math.PI) * 0.4;
        const glowSize = 300 + Math.sin(elapsed * 0.003) * 50;
        const centerGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, glowSize);
        centerGrad.addColorStop(0, `rgba(82,39,255,${glowAlpha})`);
        centerGrad.addColorStop(0.3, `rgba(255,159,252,${glowAlpha * 0.5})`);
        centerGrad.addColorStop(1, 'rgba(82,39,255,0)');
        ctx.fillStyle = centerGrad;
        ctx.fillRect(0, 0, W, H);
      }

      ctx.globalAlpha = 1;

      if (progress < 1) {
        raf = requestAnimationFrame(draw);
      } else {
        setIsComplete(true);
        setTimeout(() => onComplete && onComplete(), 300);
      }
    };

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    draw(startTime);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: '#05030f',
        opacity: isComplete ? 0 : 1,
        pointerEvents: isComplete ? 'none' : 'all',
        transition: 'opacity 0.6s ease-out',
      }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      
      {/* Loading text */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'Space Mono, monospace',
          fontSize: '0.75rem',
          letterSpacing: '0.3em',
          color: 'rgba(255,159,252,0.6)',
          textTransform: 'uppercase',
          animation: 'pulse 2s ease-in-out infinite',
          textAlign: 'center',
        }}
      >
        <div style={{ marginBottom: '12px', fontSize: '1.5rem', color: 'rgba(82,39,255,0.8)' }}>✦</div>
        <div>Initializing Experience</div>
        <div style={{ fontSize: '0.6rem', marginTop: '8px', opacity: 0.5, letterSpacing: '0.2em' }}>
          Chinmay Muddapur
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
