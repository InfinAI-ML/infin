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

    // Function to create particle
    const createParticle = () => {
      const particle = document.createElementNS("http://www.w3.org/2000/svg", "text");
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const value = Math.random() > 0.85 ? (Math.random() > 0.5 ? '10' : '01') : (Math.random() > 0.5 ? '0' : '1');
      const size = 8 + Math.random() * 10;
      const opacity = 0.3 + Math.random() * 0.5;
      const duration = 8 + Math.random() * 12;
      
      particle.setAttribute("x", x.toString());
      particle.setAttribute("y", y.toString());
      particle.setAttribute("fill", Math.random() > 0.8 ? `rgba(120, 72, 255, ${opacity})` : `rgba(0, 243, 255, ${opacity})`);
      particle.setAttribute("font-size", `${size}px`);
      particle.setAttribute("font-family", "monospace");
      particle.textContent = value;
      
      // Animate particle
      particle.style.animation = `
        float${Math.floor(Math.random() * 4) + 1} ${duration}s infinite ease-in-out,
        blink ${2 + Math.random() * 3}s infinite ease-in-out
      `;
      
      particles.appendChild(particle);
      
      // Remove particle after some time to prevent clutter
      setTimeout(() => {
        if (particle.parentNode === particles) {
          const fadeOut = () => {
            let opacity = parseFloat(particle.style.opacity || "1");
            if (opacity > 0) {
              opacity -= 0.05;
              particle.style.opacity = opacity.toString();
              requestAnimationFrame(fadeOut);
            } else {
              particles.removeChild(particle);
            }
          };
          fadeOut();
        }
      }, (duration * 1000) - 2000);
    };

    // Create initial particles
    for (let i = 0; i < 40; i++) createParticle();
    
    // Add particles periodically
    const interval = setInterval(() => {
      if (particles.childNodes.length < 70) createParticle();
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-95">
      <div className="relative">
        <svg ref={animationRef} viewBox="0 0 512 512" className="w-64 h-64 md:w-80 md:h-80">
          <defs>
            <linearGradient id="mainGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00f3ff" />
              <stop offset="100%" stopColor="#7848ff" />
            </linearGradient>
            
            <linearGradient id="reverseGradient" x1="1" y1="1" x2="0" y2="0">
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
            
            <radialGradient id="centerGlow" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
              <stop offset="0%" stopColor="rgba(0, 243, 255, 0.3)" />
              <stop offset="100%" stopColor="rgba(0, 243, 255, 0)" />
            </radialGradient>
          </defs>

          {/* Glowing center */}
          <circle 
            cx="256" 
            cy="256" 
            r="120" 
            fill="url(#centerGlow)" 
            opacity={0.4 + progress * 0.4}
            style={{
              animation: 'pulse 3s infinite ease-in-out',
              transformOrigin: 'center',
              transform: 'scale(1)',
            }}
          />

          {/* Floating binary particles */}
          <g ref={particlesRef} className="particles" opacity={0.7} />

          {/* Outer tech ring */}
          <circle
            cx="256"
            cy="256"
            r="210"
            fill="none"
            stroke="rgba(0, 243, 255, 0.15)"
            strokeWidth="2"
            strokeDasharray="3 6"
            style={{
              animation: 'rotate-reverse 30s linear infinite',
              transformOrigin: 'center',
            }}
          />

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
          
          {/* Circuit connector lines */}
          <line 
            x1="256" y1="336" x2="256" y2="400" 
            stroke={`rgba(0, 243, 255, ${progress > 0.5 ? progress : 0})`}
            strokeWidth="4" 
            strokeDasharray="6 4"
          />
          <line 
            x1="256" y1="176" x2="256" y2="112" 
            stroke={`rgba(120, 72, 255, ${progress > 0.5 ? progress : 0})`}
            strokeWidth="4" 
            strokeDasharray="6 4"
          />

          {/* Circular progress background */}
          <circle
            cx="256"
            cy="256"
            r="180"
            fill="none"
            stroke="rgba(120, 72, 255, 0.15)"
            strokeWidth="24"
          />
          
          {/* Circular progress */}
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
              transition: 'stroke-dashoffset 0.5s ease-out',
              filter: 'url(#glow)'
            }}
          />

          {/* Center text */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="42"
            fill="url(#mainGradient)"
            className="font-bold"
            style={{
              filter: 'url(#glow)',
              textShadow: '0 0 8px rgba(0, 0, 0, 0.8)'
            }}
          >
            {Math.round(progress * 100)}%
          </text>
          
          {/* Adding a background highlight for better contrast */}
          <circle
            cx="256"
            cy="256"
            r="60"
            fill="rgba(0, 0, 0, 0.6)"
            style={{
              filter: 'blur(6px)',
            }}
          />
          
          {/* Center text with high contrast */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="42"
            stroke="#000000"
            strokeWidth="3"
            strokeOpacity="0.6"
            className="font-bold"
          >
            {Math.round(progress * 100)}%
          </text>
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="42"
            fill="white"
            className="font-bold"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))'
            }}
          >
            {Math.round(progress * 100)}%
          </text>
          
          {/* Data processing text */}
          <text
            x="256"
            y="290"
            textAnchor="middle"
            fontSize="14"
            fill="white"
            opacity="0.7"
            className="font-mono"
          >
            PROCESSING DATA
          </text>

          {/* Bottom text logo */}
          <text
            x="256"
            y="460"
            textAnchor="middle"
            fontSize="32"
            fill="url(#mainGradient)"
            className="font-bold"
            style={{filter: 'url(#glow)'}}
          >
            Infin AI
          </text>
        </svg>
      </div>

      <style jsx global>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes rotate-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        @keyframes float1 {
          0% { transform: translate(0, 0); }
          25% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 30 - 15}px); }
          50% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 20 - 10}px); }
          75% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 40 - 20}px); }
          100% { transform: translate(0, 0); }
        }
        
        @keyframes float2 {
          0% { transform: translate(0, 0); }
          33% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 20 - 10}px); }
          66% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 30 - 15}px); }
          100% { transform: translate(0, 0); }
        }
        
        @keyframes float3 {
          0% { transform: translate(0, 0); }
          50% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px); }
          100% { transform: translate(0, 0); }
        }
        
        @keyframes float4 {
          0% { transform: translate(0, 0); }
          20% { transform: translate(${Math.random() * 25 - 12}px, ${Math.random() * 15 - 7}px); }
          40% { transform: translate(${Math.random() * 15 - 7}px, ${Math.random() * 25 - 12}px); }
          60% { transform: translate(${Math.random() * 25 - 12}px, ${Math.random() * 15 - 7}px); }
          80% { transform: translate(${Math.random() * 15 - 7}px, ${Math.random() * 25 - 12}px); }
          100% { transform: translate(0, 0); }
        }

        @keyframes blink {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default DataLoadingAnimation;