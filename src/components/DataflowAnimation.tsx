import React, { useEffect, useRef } from 'react';

interface DataFlowAnimationProps {
  primaryColor?: string;
  secondaryColor?: string;
}

export const DataFlowAnimation: React.FC<DataFlowAnimationProps> = ({ 
  primaryColor = "rgba(234, 118, 203, 0.8)", // Default to pink
  secondaryColor = "rgba(114, 135, 253, 0.5)" // Default to lavender
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, radius: 200 });

  interface Particle {
    x: number;
    y: number;
    dx: number;
    dy: number;
    radius: number;
    baseX: number;
    baseY: number;
    color: string;
    isPaw: boolean;
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
    const particleCount = isMobile ? 70 : 200; // 70 for mobile, 200 for desktop
    const connectionDistance = 180;
    
    // Enhanced Catppuccin colors with higher opacity
    const colors = [
      primaryColor.replace(/[0-9.]+\)$/, "0.9)"),
      secondaryColor.replace(/[0-9.]+\)$/, "0.8)"),
      "rgba(220, 138, 120, 0.9)", // rosewater
      "rgba(221, 120, 120, 0.9)", // flamingo
      "rgba(136, 57, 239, 0.8)", // mauve
      "rgba(32, 159, 181, 0.9)", // sapphire
    ];
    
    // Create particles with base positions and velocities
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const isPaw = Math.random() < 0.05; // 5% chance for a particle to be a paw
      
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        dx: (Math.random() - 0.5) * 0.4, // Slightly slower for more elegance
        dy: (Math.random() - 0.5) * 0.4,
        radius: isPaw ? 4 : 2 + Math.random() * 1.5, // Varied sizes for more visual interest
        color: colors[Math.floor(Math.random() * colors.length)],
        isPaw
      });
    }

    // Draw a cat paw
    const drawPaw = (x: number, y: number, size: number, color: string) => {
      ctx.fillStyle = color;
      
      // Main pad
      ctx.beginPath();
      ctx.ellipse(x, y, size, size * 0.8, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Toe pads - 3 small circles above the main pad
      const toeSize = size * 0.5;
      const toeOffset = size * 0.8;
      
      // Left toe
      ctx.beginPath();
      ctx.arc(x - toeSize, y - toeOffset, toeSize, 0, Math.PI * 2);
      ctx.fill();
      
      // Middle toe
      ctx.beginPath();
      ctx.arc(x, y - toeOffset - toeSize * 0.3, toeSize, 0, Math.PI * 2);
      ctx.fill();
      
      // Right toe
      ctx.beginPath();
      ctx.arc(x + toeSize, y - toeOffset, toeSize, 0, Math.PI * 2);
      ctx.fill();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach((particle, i) => {
        // Base movement
        particle.x += particle.dx;
        particle.y += particle.dy;

        // Mouse interaction - gentle attraction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseRef.current.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouseRef.current.radius - distance) / mouseRef.current.radius;
          particle.x += forceDirectionX * force * 1.5; // Gentler force
          particle.y += forceDirectionY * force * 1.5;
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

        // Draw slightly larger particles
        if (particle.isPaw) {
          drawPaw(particle.x, particle.y, particle.radius * 1.5, particle.color);
        } else {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius * 1.2, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
        }

        // Connect particles with gradient lines
        particles.slice(i + 1).forEach(otherParticle => {
          const pdx = particle.x - otherParticle.x;
          const pdy = particle.y - otherParticle.y;
          const particleDistance = Math.sqrt(pdx * pdx + pdy * pdy);

          if (particleDistance < connectionDistance) {
            const opacity = 0.5 * (1 - particleDistance/connectionDistance); // Increased opacity
            
            // Check if mouse is near the connection
            const mouseDistance = Math.sqrt(
              Math.pow(mouseRef.current.x - (particle.x + otherParticle.x)/2, 2) +
              Math.pow(mouseRef.current.y - (particle.y + otherParticle.y)/2, 2)
            );
            const highlightFactor = mouseDistance < mouseRef.current.radius ? 2.5 : 1;
            
            // Create gradient for connecting lines
            const gradient = ctx.createLinearGradient(
              particle.x, 
              particle.y, 
              otherParticle.x, 
              otherParticle.y
            );
            
            // Helper function to extract RGB and create a valid rgba color
            const getColorWithOpacity = (color: string, opacity: number) => {
              // Extract RGB values from color string (rgba or rgb)
              const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/i);
              if (rgbMatch) {
                const r = rgbMatch[1];
                const g = rgbMatch[2];
                const b = rgbMatch[3];
                return `rgba(${r}, ${g}, ${b}, ${opacity * highlightFactor})`;
              }
              return color; // Fallback to original color
            };
            
            gradient.addColorStop(0, getColorWithOpacity(particle.color, opacity));
            gradient.addColorStop(1, getColorWithOpacity(otherParticle.color, opacity));
            
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.5; // Slightly thicker lines
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
  }, [primaryColor, secondaryColor]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0"
      style={{
        background: 'transparent',
        zIndex: 0, // Make sure this is set correctly
        pointerEvents: 'none' // Allow interaction with elements behind it
      }}
    />
  );
};