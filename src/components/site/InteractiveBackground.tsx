import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
}

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 160,
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const particleCount = Math.min(Math.floor((width * height) / 16000), 85);
    let particles: Particle[] = [];

    const colors = [
      "rgba(217, 119, 6, 0.65)",   // Amber
      "rgba(139, 92, 246, 0.6)",   // Violet
      "rgba(6, 182, 212, 0.6)",    // Cyan
      "rgba(16, 185, 129, 0.55)",  // Emerald
    ];

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 2.2 + 0.8;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius,
          baseRadius: radius,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    initParticles();

    // Render 60fps loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Gravitational reaction to cursor
        const dx = mouse.x - p1.x;
        const dy = mouse.y - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p1.x -= (dx / dist) * force * 2;
          p1.y -= (dy / dist) * force * 2;
          p1.radius = p1.baseRadius * (1 + force * 2);
        } else {
          p1.radius = p1.baseRadius;
        }

        // Draw glowing particle dot
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p1.color;
        ctx.fill();

        // Connect with nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distBetween = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (distBetween < 125) {
            const alpha = (1 - distBetween / 125) * 0.35;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(160, 160, 210, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.shadowBlur = 0;
            ctx.stroke();
          }
        }

        // Connect particle to mouse if within distance
        if (dist < mouse.radius) {
          const alpha = (1 - dist / mouse.radius) * 0.45;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      {/* 1. Cyber Geometric Blueprint Grid */}
      <div
        className="absolute inset-0 opacity-40 dark:opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(120, 120, 160, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(120, 120, 160, 0.08) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 85%)",
        }}
      />

      {/* 2. Floating Animated Aurora Orbs */}
      {/* Orb 1: Violet & Indigo */}
      <div
        className="animate-float-slow absolute -top-24 left-1/4 h-[650px] w-[650px] rounded-full blur-[140px] opacity-70 dark:opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.28) 0%, rgba(99, 102, 241, 0.18) 45%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Orb 2: Electric Cyan & Sky */}
      <div
        className="absolute top-1/3 -right-32 h-[600px] w-[600px] rounded-full blur-[150px] opacity-60 dark:opacity-50"
        style={{
          background:
            "radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, rgba(14, 165, 233, 0.15) 50%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Orb 3: Warm Sunset Amber */}
      <div
        className="absolute bottom-10 -left-28 h-[550px] w-[550px] rounded-full blur-[150px] opacity-55 dark:opacity-45"
        style={{
          background:
            "radial-gradient(circle, rgba(245, 158, 11, 0.22) 0%, rgba(217, 119, 6, 0.12) 50%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* 3. Interactive Starfield Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
    </div>
  );
}
