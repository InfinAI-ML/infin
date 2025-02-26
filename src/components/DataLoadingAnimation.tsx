import React, { useEffect, useState, useRef } from 'react';

interface DataLoadingAnimationProps {
  onComplete?: () => void;
  duration?: number; // Duration in ms
}

const DataLoadingAnimation: React.FC<DataLoadingAnimationProps> = ({ 
  onComplete, 
  duration = 3000 
}) => {
  const [progress, setProgress] = useState(0);
  const [particlesGenerated, setParticlesGenerated] = useState(false);
  const animationRef = useRef<SVGSVGElement>(null);
  const particlesRef = useRef<SVGGElement>(null);
  const letterRefs = useRef<(SVGPathElement | null)[]>([]);
  
  // Generate particles for the background effect
  useEffect(() => {
    if (particlesRef.current && !particlesGenerated) {
      const particlesGroup = particlesRef.current;
      const particleCount = 50;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        const size = 1 + Math.random() * 3;
        const x = Math.random() * 400;
        const y = Math.random() * 400;
        const opacity = 0.2 + Math.random() * 0.5;
        const hue = 220 + Math.random() * 60; // Blue range
        
        particle.setAttribute("cx", x.toString());
        particle.setAttribute("cy", y.toString());
        particle.setAttribute("r", size.toString());
        particle.setAttribute("fill", `hsla(${hue}, 100%, 70%, ${opacity})`);
        
        // Add animation with CSS
        particle.style.animation = `float ${5 + Math.random() * 10}s linear infinite`;
        particle.style.transform = `translate(0, 0)`;
        particle.style.transformOrigin = `${x}px ${y}px`;
        
        particlesGroup.appendChild(particle);
      }
      
      setParticlesGenerated(true);
    }
  }, [particlesGenerated]);
  
  // Main animation effect
  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration;
    
    // Add global animation styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0% { transform: translate(0, 0) rotate(0deg); }
        33% { transform: translate(${Math.random() * 10}px, ${Math.random() * -10}px) rotate(120deg); }
        66% { transform: translate(${Math.random() * -10}px, ${Math.random() * 10}px) rotate(240deg); }
        100% { transform: translate(0, 0) rotate(360deg); }
      }
      
      @keyframes pulse {
        0% { opacity: 0.7; }
        50% { opacity: 1; }
        100% { opacity: 0.7; }
      }
      
      @keyframes dash {
        to { stroke-dashoffset: 0; }
      }
      
      @keyframes dataFlow {
        0% { stroke-dashoffset: 0; }
        100% { stroke-dashoffset: -300; }
      }
    `;
    document.head.appendChild(style);
    
    // Initialize letter animations
    if (letterRefs.current.length > 0) {
      letterRefs.current.forEach((letter, i) => {
        if (letter) {
          const length = letter.getTotalLength();
          letter.style.strokeDasharray = length.toString();
          letter.style.strokeDashoffset = length.toString();
        }
      });
    }
    
    // Animate progress and elements
    const animateProgress = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const newProgress = Math.min(elapsed / duration, 1);
      setProgress(newProgress);
      
      // Animate letters appearing sequentially
      if (letterRefs.current.length > 0) {
        // Start letter animations when progress reaches 0.1
        if (newProgress > 0.1) {
          const lettersProgress = (newProgress - 0.1) / 0.5; // Complete by 60% of total animation
          const letterIndex = Math.min(
            Math.floor(lettersProgress * letterRefs.current.length), 
            letterRefs.current.length
          );
          
          for (let i = 0; i < letterIndex; i++) {
            if (letterRefs.current[i]) {
              letterRefs.current[i]!.style.animation = `dash 0.8s ease forwards`;
              letterRefs.current[i]!.style.animationDelay = `${i * 0.1}s`;
            }
          }
        }
      }
      
      if (newProgress < 1) {
        requestAnimationFrame(animateProgress);
      } else if (onComplete) {
        setTimeout(onComplete, 500); // Slight delay before transition
      }
    };
    
    requestAnimationFrame(animateProgress);
    
    return () => {
      document.head.removeChild(style);
    };
  }, [duration, onComplete]);
  
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-black to-blue-900">
      {/* Increased size from w-80 h-80 to w-[500px] h-[500px] */}
      <div className="w-[500px] h-[500px] relative">
        <svg ref={animationRef} viewBox="0 0 400 400" className="w-full h-full">
          {/* Background particles */}
          <g ref={particlesRef} className="particles"></g>
          
          {/* Data flow paths - Always visible with continuous animation */}
          <g className="data-flows" opacity={Math.min(progress * 2, 1)} style={{ transition: 'opacity 0.8s ease-in-out' }}>
            {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((angle, i) => {
              const radian = angle * Math.PI / 180;
              const startX = 200 + 150 * Math.cos(radian);
              const startY = 200 + 150 * Math.sin(radian);
              
              return (
                <path 
                  key={i}
                  d={`M${startX},${startY} Q200,200 ${200 - (startX - 200) * 0.7},${200 - (startY - 200) * 0.7}`}
                  fill="none" 
                  stroke={`hsla(${220 + i * 5}, 100%, 70%, 0.6)`}
                  strokeWidth="1"
                  strokeDasharray="4,4"
                  style={{ 
                    animation: `dataFlow ${8 + i * 0.5}s linear infinite`,
                    transition: 'opacity 0.8s ease-in-out'
                  }}
                />
              );
            })}
          </g>
          
          {/* Neural network central brain visualization */}
          <g className="brain" opacity={Math.min(progress * 3, 1)} style={{ transition: 'opacity 0.8s ease-in-out' }}>
            <circle cx="200" cy="200" r="70" fill="rgba(23, 37, 84, 0.7)" />
            <circle cx="200" cy="200" r="50" fill="rgba(30, 58, 138, 0.8)" />
            
            {/* Pulsing core */}
            <circle 
              cx="200" 
              cy="200" 
              r="30" 
              fill="rgba(59, 130, 246, 0.9)" 
              style={{ animation: 'pulse 2s infinite' }}
            />
            
            {/* Orbit circles */}
            <g className="orbits">
              <circle 
                cx="200" 
                cy="200" 
                r="100" 
                fill="none" 
                stroke="rgba(147, 197, 253, 0.3)" 
                strokeWidth="1" 
                strokeDasharray="5,5"
                style={{ 
                  transformOrigin: '200px 200px',
                  animation: 'float 30s linear infinite' 
                }}
              />
              <circle 
                cx="200" 
                cy="200" 
                r="130" 
                fill="none" 
                stroke="rgba(147, 197, 253, 0.2)" 
                strokeWidth="1" 
                strokeDasharray="3,3"
                style={{ 
                  transformOrigin: '200px 200px',
                  animation: 'float 40s linear infinite reverse' 
                }}
              />
            </g>
            
            {/* Data nodes on orbit */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const radian = angle * Math.PI / 180;
              const radius = 100;
              const x = 200 + radius * Math.cos(radian);
              const y = 200 + radius * Math.sin(radian);
              const delay = i * 0.1;
              const opacity = progress > 0.3 + delay ? 1 : 0;
              
              return (
                <g key={i} opacity={opacity} style={{ transition: 'opacity 0.8s ease-in-out' }}>
                  <circle 
                    cx={x} 
                    cy={y} 
                    r="4" 
                    fill="rgba(255, 255, 255, 0.8)"
                  />
                  <line 
                    x1={x} 
                    y1={y} 
                    x2="200" 
                    y2="200"
                    stroke="rgba(147, 197, 253, 0.5)"
                    strokeWidth="1"
                  />
                </g>
              );
            })}
          </g>
          
          {/* InfinAI Logo Text */}
          <g transform="translate(100, 200)" opacity={Math.min((progress - 0.1) * 3, 1)} style={{ transition: 'opacity 0.8s ease-in-out' }}>
            {/* I */}
            <path
              ref={el => letterRefs.current[0] = el as any}
              d="M0,0 V-40"
              stroke="#fff"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            {/* n */}
            <path
              ref={el => letterRefs.current[1] = el as any}
              d="M10,-40 V0 C10,-15 30,-15 30,0 V0"
              stroke="#fff"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            {/* f */}
            <path
              ref={el => letterRefs.current[2] = el as any}
              d="M40,-60 V0 M30,-30 H50"
              stroke="#fff"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            {/* i */}
            <path
              ref={el => letterRefs.current[3] = el as any}
              d="M60,-40 V0 M60,-50 V-52"
              stroke="#fff"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            {/* n */}
            <path
              ref={el => letterRefs.current[4] = el as any}
              d="M70,-40 V0 C70,-15 90,-15 90,0 V0"
              stroke="#fff"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            {/* A */}
            <path
              ref={el => letterRefs.current[5] = el as any}
              d="M105,-40 L120,-0 L135,-40 M110,-20 H130"
              stroke="#fff"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            {/* I */}
            <path
              ref={el => letterRefs.current[6] = el as any}
              d="M145,0 V-40"
              stroke="#fff"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            {/* Infinity Symbol */}
            <path
              ref={el => letterRefs.current[7] = el as any}
              d="M180,-30 C160,-50 130,-10 150,10 C170,30 200,-10 180,-30 Z"
              stroke="#5EEAD4"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </g>
          
          {/* Progress bar */}
          <g transform="translate(0, 50)" opacity={Math.min(progress * 3, 1)} style={{ transition: 'opacity 0.8s ease-in-out' }}>
            <rect 
              x="100" 
              y="250" 
              width="200" 
              height="4" 
              rx="2" 
              fill="rgba(30, 58, 138, 0.5)" 
            />
            <rect 
              x="100" 
              y="250" 
              width={progress * 200} 
              height="4" 
              rx="2" 
              fill="rgba(147, 197, 253, 0.9)" 
              className="transition-all duration-500"
            />
            
            {/* Text */}
            <text 
              x="200" 
              y="280" 
              fontSize="12" 
              fill="white" 
              textAnchor="middle"
              className="font-medium"
            >
              {progress < 1 ? 'INITIALIZING...' : 'READY'}
            </text>
            <text 
              x="200" 
              y="300" 
              fontSize="10" 
              fill="rgba(255, 255, 255, 0.7)" 
              textAnchor="middle"
            >
              {Math.round(progress * 100)}%
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default DataLoadingAnimation;