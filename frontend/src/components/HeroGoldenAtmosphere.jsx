import React, { useEffect, useRef } from 'react';

export default function HeroGoldenAtmosphere() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = (e.clientX - rect.left) / width;
      mouseRef.current.targetY = (e.clientY - rect.top) / height;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Create golden intelligence particles
    const particleCount = Math.min(65, Math.floor(width / 24));
    const particles = [];
    const colors = ['#C69A42', '#EAD6A0', '#906727', '#F2EADB'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35 - 0.1, // subtle upward drift
        alpha: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulse: Math.random() * Math.PI,
        connected: Math.random() > 0.4
      });
    }

    let t = 0;

    const render = () => {
      t += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const mx = mouseRef.current.x * width;
      const my = mouseRef.current.y * height;

      // Soft ambient golden radial light behind hero
      const radialGlow = ctx.createRadialGradient(
        mx * 0.6 + width * 0.5 * 0.4,
        my * 0.6 + height * 0.4 * 0.4,
        10,
        width * 0.5,
        height * 0.45,
        width * 0.65
      );
      radialGlow.addColorStop(0, 'rgba(234, 214, 160, 0.16)');
      radialGlow.addColorStop(0.4, 'rgba(198, 154, 66, 0.08)');
      radialGlow.addColorStop(1, 'rgba(251, 248, 240, 0)');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // Draw faint connections between close particles
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.15;
            ctx.strokeStyle = `rgba(198, 154, 66, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update & render particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        p.pulse += p.pulseSpeed;
        const currentAlpha = p.alpha + Math.sin(p.pulse) * 0.2;
        const clampedAlpha = Math.max(0.05, Math.min(0.9, currentAlpha));

        ctx.fillStyle = p.color;
        ctx.globalAlpha = clampedAlpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Occasional golden glint sparkle
        if (i % 7 === 0 && Math.sin(p.pulse) > 0.8) {
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(p.x - p.radius * 2.5, p.y);
          ctx.lineTo(p.x + p.radius * 2.5, p.y);
          ctx.moveTo(p.x, p.y - p.radius * 2.5);
          ctx.lineTo(p.x, p.y + p.radius * 2.5);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute inset-0 bg-architectural-grid opacity-60 mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
      <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none" />
    </div>
  );
}
