'use client';

import React, { useRef, useEffect } from 'react';

interface HeroParticlesProps {
  glowColor?: string;
}

const HeroParticles = ({ glowColor }: HeroParticlesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      canvas: HTMLCanvasElement;
      ctx: CanvasRenderingContext2D;

      constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;

        const colors = glowColor
          ? [glowColor, 'rgba(255, 255, 255, 0.4)']
          : ['rgba(248, 87, 39, 0.4)', 'rgba(59, 130, 246, 0.4)'];

        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(mouse: { x: number; y: number; radius: number }) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > this.canvas.width) this.x = 0;
        if (this.x < 0) this.x = this.canvas.width;
        if (this.y > this.canvas.height) this.y = 0;
        if (this.y < 0) this.y = this.canvas.height;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius && distance > 0) {
          const force = (mouse.radius - distance) / mouse.radius;
          this.x -= (dx / distance) * force * 4.5;
          this.y -= (dy / distance) * force * 4.5;
        }
      }

      draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
      }
    }

    let animationFrameId: number;
    let particles: Particle[] = [];
    let mouse = { x: -1000, y: -1000, radius: 180 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    function initParticles() {
      particles = [];
      const numberOfParticles = (canvas!.width * canvas!.height) / 8000;
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle(canvas!, ctx!));
      }
    }

    function connect() {
      const maxDistance = 120;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.12;
            ctx!.strokeStyle = `rgba(255,255,255,${opacity})`;
            ctx!.lineWidth = 0.5;
            ctx!.beginPath();
            ctx!.moveTo(particles[a].x, particles[a].y);
            ctx!.lineTo(particles[b].x, particles[b].y);
            ctx!.stroke();
          }
        }
      }
    }

    const animate = () => {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      particles.forEach((p) => { p.update(mouse); p.draw(); });
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        initParticles();
      }
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [glowColor]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Neon radial glow confined to hero */}
      {glowColor && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '80%',
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            opacity: 0.15,
            filter: 'blur(60px)',
            zIndex: -1,
          }}
        />
      )}
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          opacity: 0.8,
        }}
      />
    </div>
  );
};

export default HeroParticles;
