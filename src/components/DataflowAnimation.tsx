import React, { useEffect, useRef } from 'react';

interface DataFlowAnimationProps {
  primaryColor?: string;
  secondaryColor?: string;
  particleDensity?: number;
}

export const DataFlowAnimation: React.FC<DataFlowAnimationProps> = ({ 
  primaryColor = "rgba(56, 189, 248, 0.8)", // Default to cyan/blue
  secondaryColor = "rgba(96, 165, 250, 0.7)", // Default to lighter blue
  particleDensity = 1.0 // Multiplier for particle count
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, radius: 180 });

  interface Particle {
    x: number;
    y: number;
    dx: number;
    dy: number;
    radius: number;
    baseX: number;
    baseY: number;
    color: string;
    type: 'circle' | 'square' | 'diamond';
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = event.x;
      mouseRef.current.y = event.y;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Check if device is mobile based on screen width
    const isMobile = window.innerWidth < 768;
    
    // Particle settings
    const particles: Particle[] = [];
    const baseParticleCount = isMobile ? 70 : 150;
    const particleCount = Math.floor(baseParticleCount * particleDensity);
    const connectionDistance = 160;
    
    // Professional and consistent colors
    const colors = [
      primaryColor,
      secondaryColor,
      "rgba(14, 165, 233, 0.7)", // sky blue
      "rgba(6, 182, 212, 0.6)", // cyan
      "rgba(2, 132, 199, 0.65)", // darker blue
    ];
    
    // Particle types
    const types: Array<'circle' | 'square' | 'diamond'> = ['circle', 'square', 'diamond'];
    
    // Create particles with base positions and velocities
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const type = types[Math.floor(Math.random() * 3)];
      
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        dx: (Math.random() - 0.5) * 0.3, // Slower for more professional look
        dy: (Math.random() - 0.5) * 0.3,
        radius: 1.5 + Math.random() * 1.2, // Smaller particles for cleaner look
        color: colors[Math.floor(Math.random() * colors.length)],
        type
      });
    }

    // Draw different particle shapes
    const drawParticle = (particle: Particle) => {
      const { x, y, radius, color, type } = particle;
      
      ctx.fillStyle = color;
      
      switch (type) {
        case 'circle':
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
          break;
          
        case 'square':
          ctx.fillRect(x - radius * 0.8, y - radius * 0.8, radius * 1.6, radius * 1.6);
          break;
          
        case 'diamond':
          ctx.beginPath();
          ctx.moveTo(x, y - radius);
          ctx.lineTo(x + radius, y);
          ctx.lineTo(x, y + radius);
          ctx.lineTo(x - radius, y);
          ctx.closePath();
          ctx.fill();
          break;
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach((particle, i) => {
        // Base movement
        particle.x += particle.dx;
        particle.y += particle.dy;

        // Mouse interaction - subtle attraction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseRef.current.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouseRef.current.radius - distance) / mouseRef.current.radius;
          const maxPush = 1.0; // Limit the maximum force for more controlled movement
          particle.x += forceDirectionX * force * maxPush;
          particle.y += forceDirectionY * force * maxPush;
        }

        // Bounce off walls with velocity preservation
        if (particle.x <= 0 || particle.x >= canvas.width) {
          particle.dx *= -1;
          particle.x = particle.x <= 0 ? 0 : canvas.width;
        }
        if (particle.y <= 0 || particle.y >= canvas.height) {
          particle.dy *= -1;
          particle.y = particle.y <= 0 ? 0 : canvas.height;
        }

        // Draw the particle
        drawParticle(particle);

        // Connect particles with gradient lines - optimization: only connect to nearby particles
        particles.slice(i + 1).forEach(otherParticle => {
          const pdx = particle.x - otherParticle.x;
          const pdy = particle.y - otherParticle.y;
          const particleDistance = Math.sqrt(pdx * pdx + pdy * pdy);

          if (particleDistance < connectionDistance) {
            // Opacity based on distance - more subtle for professional look
            const opacity = 0.2 * (1 - particleDistance/connectionDistance);
            
            // Subtle highlight when mouse is near
            const midpointX = (particle.x + otherParticle.x) / 2;
            const midpointY = (particle.y + otherParticle.y) / 2;
            const mouseDistance = Math.sqrt(
              (mouseRef.current.x - midpointX) ** 2 + 
              (mouseRef.current.y - midpointY) ** 2
            );
            const highlightFactor = mouseDistance < mouseRef.current.radius ? 1.5 : 1;
            
            // Create gradient for connecting lines
            const gradient = ctx.createLinearGradient(
              particle.x, 
              particle.y, 
              otherParticle.x, 
              otherParticle.y
            );
            
            // Helper function to extract RGB and create a valid rgba color
            const getColorWithOpacity = (color: string, opacity: number) => {
              const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/i);
              if (rgbMatch) {
                const r = rgbMatch[1];
                const g = rgbMatch[2];
                const b = rgbMatch[3];
                return `rgba(${r}, ${g}, ${b}, ${opacity * highlightFactor})`;
              }
              return color;
            };
            
            gradient.addColorStop(0, getColorWithOpacity(particle.color, opacity));
            gradient.addColorStop(1, getColorWithOpacity(otherParticle.color, opacity));
            
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.8; // Thinner lines for cleaner look
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [primaryColor, secondaryColor, particleDensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0"
      style={{
        background: 'transparent',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
};