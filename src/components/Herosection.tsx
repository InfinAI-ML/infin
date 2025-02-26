import React, { useEffect, useRef } from 'react';

const HeroSection: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Add animation to elements after component mounts
    const animateElements = () => {
      if (titleRef.current) {
        titleRef.current.classList.add('animate-in');
      }
      
      setTimeout(() => {
        if (subtitleRef.current) {
          subtitleRef.current.classList.add('animate-in');
        }
      }, 400);
      
      setTimeout(() => {
        if (buttonRef.current) {
          buttonRef.current.classList.add('animate-in');
        }
      }, 800);
    };
    
    // Short delay to ensure it runs after page load
    const timer = setTimeout(animateElements, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black to-blue-900">
      {/* Particle Effect Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="particle-container" style={{position: 'absolute', width: '100%', height: '100%'}}>
          {/* Generated particles will be added here by CSS */}
        </div>
      </div>
      
      {/* Neural Network Lines - mimicking loading animation style */}
      <div className="absolute inset-0 z-0">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path 
            d="M0,30 Q50,10 100,30" 
            fill="none" 
            stroke="rgba(147, 197, 253, 0.2)" 
            strokeWidth="0.2" 
            strokeDasharray="1,1"
            className="animate-pulse-slow"
          />
          <path 
            d="M0,70 Q50,90 100,70" 
            fill="none" 
            stroke="rgba(147, 197, 253, 0.15)" 
            strokeWidth="0.2" 
            strokeDasharray="1,1"
            className="animate-pulse-slow-reverse"
          />
          <path 
            d="M0,50 Q50,30 100,50" 
            fill="none" 
            stroke="rgba(59, 130, 246, 0.1)" 
            strokeWidth="0.2" 
            strokeDasharray="1,1"
            className="animate-pulse-medium"
          />
        </svg>
      </div>
      
      {/* Orbital Element - center brain-like structure */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-30 pointer-events-none">
        <div className="absolute w-32 h-32 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 animate-pulse-slow"></div>
        <div className="absolute w-48 h-48 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/10 animate-spin-slow"></div>
        <div className="absolute w-64 h-64 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/10 animate-spin-reverse"></div>
        <div className="absolute w-80 h-80 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-200/5"></div>
      </div>
      
      {/* Content - styled to match loading animation */}
      <div className="container mx-auto px-6 z-10 text-center">
        <h1 
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold mb-8 opacity-0 transition-all duration-700 translate-y-4"
        >
          <span className="relative inline-block">
            Infin<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">A</span><span className="text-white">I</span>
            <svg className="w-12 h-6 inline-block ml-1 mt-1" viewBox="0 0 50 30">
              <path 
                d="M25,5 C15,0 5,25 15,25 C25,25 35,0 25,5 Z" 
                fill="none" 
                stroke="#5EEAD4" 
                strokeWidth="2"
                className="animate-pulse-slow" 
              />
            </svg>
          </span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-blue-50/90 opacity-0 transition-all duration-700 translate-y-4"
        >
          A student-driven community at IIT Madras BS, exploring the
          <span className="text-cyan-300"> frontiers of AI/ML </span>
          and its real-world applications.
        </p>
        
        {/* Harry Potter-style magical button */}
        <button 
          ref={buttonRef}
          className="harry-potter-button opacity-0 translate-y-4 relative py-4 px-8 text-lg font-bold text-white overflow-hidden transition-all duration-500 group rounded-md"
          onClick={() => window.open('https://discord.gg/zpbTxz49', '_blank')}
        >
          <span className="relative z-10 group-hover:text-blue-200 transition-colors duration-300">
            Join Our Community
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 inline-block group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
          <span className="magic-glow absolute inset-0 z-0"></span>
          <span className="magic-particles absolute inset-0 z-0"></span>
        </button>
      </div>
      
      {/* Add custom styles for animations */}
      <style jsx>{`
        /* Particle styling */
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(5px, -5px) rotate(120deg); }
          66% { transform: translate(-5px, 5px) rotate(240deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
        
        .particle-container::before,
        .particle-container::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
        }
        
        .particle-container::before {
          background: radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 30%),
                      radial-gradient(circle at 70% 60%, rgba(147, 197, 253, 0.1) 0%, transparent 30%);
        }
        
        .particle-container::after {
          background-image: 
            radial-gradient(circle at 10% 10%, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
            radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
            radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
            radial-gradient(circle at 90% 20%, rgba(255, 255, 255, 0.15) 1px, transparent 1px);
          background-size: 300px 300px;
          animation: float 30s linear infinite;
        }
        
        /* Animation classes */
        .animate-pulse-slow {
          animation: pulse 5s ease-in-out infinite;
        }
        
        .animate-pulse-slow-reverse {
          animation: pulse 5s ease-in-out infinite reverse;
        }
        
        .animate-pulse-medium {
          animation: pulse 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin 25s linear infinite reverse;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        /* Animation for content */
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
        /* Harry Potter Magic Button Style */
        .harry-potter-button {
          background: linear-gradient(45deg, #000 0%, #111 100%);
          border: 1px solid #3b82f6;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.3),
                      inset 0 0 5px rgba(255, 255, 255, 0.1);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
          transform-style: preserve-3d;
        }
        
        .harry-potter-button:hover {
          box-shadow: 0 0 15px rgba(0, 217, 255, 0.6),
                      0 0 30px rgba(0, 140, 255, 0.4),
                      inset 0 0 5px rgba(111, 0, 255, 0.2);
        }
        
        .harry-potter-button:active {
          transform: translateY(2px);
          box-shadow: 0 0 8px rgba(0, 110, 255, 0.4),
                      inset 0 0 5px rgba(0, 4, 255, 0.1);
        }
        
        /* Magic glow effect */
        .magic-glow {
          background: linear-gradient(45deg, 
            rgba(0, 153, 255, 0.1) 0%, 
            rgba(38, 0, 128, 0.1) 30%, 
            rgba(49, 38, 121, 0.1) 70%, 
            rgba(27, 107, 100, 0.1) 100%);
          filter: blur(5px);
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        
        .harry-potter-button:hover .magic-glow {
          opacity: 1;
          animation: colorShift 3s infinite alternate;
        }
        
        /* Magic particles effect */
        .magic-particles {
          background-image: 
            radial-gradient(circle at 10% 10%, rgba(43, 103, 131, 0.8) 1px, transparent 1px),
            radial-gradient(circle at 20% 40%, rgba(0, 140, 255, 0.6) 1px, transparent 1px),
            radial-gradient(circle at 30% 30%, rgba(0, 110, 255, 0.7) 1px, transparent 1px),
            radial-gradient(circle at 40% 60%, rgba(0, 183, 255, 0.6) 1px, transparent 1px),
            radial-gradient(circle at 60% 20%, rgba(21, 255, 0, 0.7) 1px, transparent 1px),
            radial-gradient(circle at 70% 50%, rgba(98, 0, 255, 0.8) 1px, transparent 1px),
            radial-gradient(circle at 80% 30%, rgba(0, 153, 255, 0.7) 1px, transparent 1px),
            radial-gradient(circle at 90% 70%, rgba(0, 47, 255, 0.6) 1px, transparent 1px);
          background-size: 100px 100px;
          opacity: 0;
          transform: scale(1.1);
          transition: opacity 0.3s ease, transform 0.5s ease;
        }
        
        .harry-potter-button:hover .magic-particles {
          opacity: 1;
          transform: scale(1);
          animation: float 15s linear infinite;
        }
        
        @keyframes colorShift {
          0% { filter: hue-rotate(0deg) blur(5px); }
          50% { filter: hue-rotate(90deg) blur(5px); }
          100% { filter: hue-rotate(180deg) blur(5px); }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;