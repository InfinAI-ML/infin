import React, { useEffect, useState, useRef } from 'react';

interface DataLoadingAnimationProps {
  onComplete?: () => void;
  duration?: number;
}

const DataLoadingAnimation: React.FC<DataLoadingAnimationProps> = ({ 
  onComplete, 
  duration = 3000 
}) => {
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<SVGSVGElement>(null);
  const particlesRef = useRef<SVGGElement>(null);
  const progressRingRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const newProgress = Math.min(elapsed / duration, 1);
      setProgress(newProgress);

      // Update circular progress
      if (progressRingRef.current) {
        const circumference = 2 * Math.PI * 180;
        progressRingRef.current.style.strokeDashoffset = 
          (circumference * (1 - newProgress)).toString();
      }

      if (newProgress < 1) {
        requestAnimationFrame(animate);
      } else if (onComplete) {
        setTimeout(onComplete, 500);
      }
    };

    animate();
  }, [duration, onComplete]);

  // Generate floating binary particles
  useEffect(() => {
    const particles = particlesRef.current;
    if (!particles) return;

    const createParticle = () => {
      const particle = document.createElementNS("http://www.w3.org/2000/svg", "text");
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const value = Math.random() > 0.5 ? '0' : '1';
      const size = 8 + Math.random() * 10;
      const opacity = 0.3 + Math.random() * 0.5;
      
      particle.setAttribute("x", x.toString());
      particle.setAttribute("y", y.toString());
      particle.setAttribute("fill", `rgba(0, 243, 255, ${opacity})`);
      particle.setAttribute("font-size", `${size}px`);
      particle.textContent = value;
      
      // Animate particle
      particle.style.animation = `
        float ${8 + Math.random() * 12}s infinite linear,
        blink ${2 + Math.random() * 3}s infinite ease-in-out
      `;
      
      particles.appendChild(particle);
    };

    // Create initial particles
    for (let i = 0; i < 40; i++) createParticle();
    
    // Add particles periodically
    const interval = setInterval(() => {
      if (particles.childNodes.length < 60) createParticle();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
      <svg ref={animationRef} viewBox="0 0 512 512" className="w-64 h-64">
        <defs>
          <linearGradient id="mainGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00f3ff" />
            <stop offset="100%" stopColor="#7848ff" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Floating binary particles */}
        <g ref={particlesRef} className="particles" opacity={0.7} />

        {/* Main infinity symbol */}
        <path
          d="M256 112C166.2 112 112 166.2 112 256C112 345.8 166.2 400 256 400C345.8 400 400 345.8 400 256"
          stroke="url(#mainGradient)"
          strokeWidth="24"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="4 8"
          style={{
            animation: 'rotate 12s linear infinite',
            transformOrigin: 'center',
            filter: 'url(#glow)'
          }}
        />

        {/* Circuit diamond */}
        <path
          d="M256 176L300 256L256 336L212 256L256 176Z"
          stroke="url(#mainGradient)"
          strokeWidth="16"
          fill="none"
          strokeDasharray="200"
          strokeDashoffset={200 * (1 - progress)}
          style={{
            transition: 'stroke-dashoffset 0.5s ease-out',
            filter: 'url(#glow)'
          }}
        />

        {/* Circular progress */}
        <circle
          cx="256"
          cy="256"
          r="180"
          fill="none"
          stroke="rgba(120, 72, 255, 0.3)"
          strokeWidth="24"
        />
        <circle
          ref={progressRingRef}
          cx="256"
          cy="256"
          r="180"
          fill="none"
          stroke="url(#mainGradient)"
          strokeWidth="24"
          strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 180}
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: 'center',
            transition: 'stroke-dashoffset 0.5s ease-out'
          }}
        />

        {/* Center text */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="32"
          fill="url(#mainGradient)"
          className="font-bold"
        >
          {Math.round(progress * 100)}%
        </text>

        {/* Bottom text logo */}
        <text
          x="256"
          y="460"
          textAnchor="middle"
          fontSize="32"
          fill="url(#mainGradient)"
          className="font-bold"
        >
          Infin AI
        </text>
      </svg>

      <style jsx global>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes float {
          0% { transform: translate(0, 0); }
          25% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px); }
          50% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px); }
          75% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px); }
          100% { transform: translate(0, 0); }
        }

        @keyframes blink {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default DataLoadingAnimation;