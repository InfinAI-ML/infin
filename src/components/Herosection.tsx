import React, { useEffect, useRef, useState } from 'react';

const HeroSection: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position for subtle parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    // Add animation to elements after component mounts - more subtle entrance
    const animateElements = () => {
      if (titleRef.current) {
        titleRef.current.classList.add('animate-in');
      }
      
      setTimeout(() => {
        if (subtitleRef.current) {
          subtitleRef.current.classList.add('animate-in');
        }
      }, 200);
      
      setTimeout(() => {
        if (buttonRef.current) {
          buttonRef.current.classList.add('animate-in');
        }
      }, 400);
    };
    
    // Short delay to ensure it runs after page load
    const timer = setTimeout(animateElements, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black to-blue-950">
      {/* Grid background - more subtle */}
      <div className="absolute inset-0 z-0 opacity-30">
        {/* <div 
          className="grid-bg"
          style={{
            transform: `translate(${(mousePosition.x - 0.5) * -10}px, ${(mousePosition.y - 0.5) * -10}px)`
          }}
        ></div> */}
      </div>
      
      {/* Subtle neural structure */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 z-0"
        style={{
          transform: `translate(-50%, -50%) rotate3d(${mousePosition.y}, ${mousePosition.x}, 0.5, ${Math.min(mousePosition.x * mousePosition.y * 15, 8)}deg)`
        }}
      >
        {/* Orbital rings - much more subtle */}
        <div className="absolute w-48 h-48 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/10 animate-spin-slow orbital-ring"></div>
        <div className="absolute w-64 h-64 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-300/10 animate-spin-reverse orbital-ring" style={{borderWidth: '1px'}}></div>
        <div className="absolute w-80 h-80 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-fuchsia-300/5 animate-spin-slow-reverse orbital-ring" style={{borderWidth: '1px'}}></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 z-10 text-center">
        <h1 
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold mb-8 opacity-0 transition-all duration-500 translate-y-4 text-white"
        >
          <span className="relative inline-block">
            Infin<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-500">A</span><span className="text-white">I</span>
          </span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-violet-50/90 opacity-0 transition-all duration-500 translate-y-4"
        >
          A student-driven community at IIT Madras BS, exploring the
          <span className="text-violet-300"> frontiers of AI/ML </span>
          and its real-world applications.
        </p>
        
        {/* Professional button */}
        <button 
          ref={buttonRef}
          className="professional-button opacity-0 translate-y-4 relative py-3 px-8 text-lg font-semibold text-white overflow-hidden transition-all duration-300 group"
          onClick={() => window.open('https://discord.gg/zpbTxz49', '_blank')}
        >
          <span className="relative z-10 group-hover:text-violet-100 transition-colors duration-300 flex items-center justify-center">
            Join Our Community
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 inline-block group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </button>
      </div>
      
      {/* Add custom styles for animations - much more subtle */}
      <style jsx>{`
        /* Base style resets and fundamentals */
        * {
          box-sizing: border-box;
        }
        
        /* Grid background */
        .grid-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(139, 92, 246, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.05) 1px, transparent 1px);
          background-size: 60px 60px;
          background-position: center center;
          transition: transform 0.3s ease-out;
        }
        
        /* Orbital animations - slowed down and more subtle */
        .orbital-ring {
          transform-style: preserve-3d;
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.05);
        }
        
        .animate-spin-slow {
          animation: spin 30s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin 40s linear infinite reverse;
        }
        
        .animate-spin-slow-reverse {
          animation: spin 50s linear infinite reverse;
        }
        
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        /* Animation for content entrance */
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
        /* Professional Button Style */
        .professional-button {
          background: linear-gradient(135deg, #4c1d95 0%, #6d28d9 100%);
          border: none;
          border-radius: 6px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
          transition: all 0.3s ease-out;
        }
        
        .professional-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
          background: linear-gradient(135deg, #6d28d9 0%, #7c3aed 100%);
        }
        
        .professional-button:active {
          transform: translateY(0);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
        }
          
      `}</style>
    </div>
  );
};

export default HeroSection;