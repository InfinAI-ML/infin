import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const GlowingCard = ({ category, index }: { category: any; index: number }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  // Extract dominant color from gradient for glow
  const dominantColor = category.gradientFrom.includes('from-') 
    ? category.gradientFrom.replace('from-', '') 
    : 'blue';

interface GlowPosition {
    x: number;
    y: number;
}

const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setGlowPosition({ x, y });
};

  return (
    <div 
      ref={cardRef}
      className="relative group z-14"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Glow effect */}
      <div 
        className={`absolute inset-0 rounded-xl transition-opacity duration-300 z-0 blur-xl ${
          isHovering ? 'opacity-70' : 'opacity-0'
        }`}
        style={{
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, var(--color-${dominantColor}-500) 0%, transparent 70%)`,
          transform: 'translateZ(0)'
        }}
      />
      
      {/* Card content */}
      <Link href={category.url}>
        <div className="group bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden transition-all duration-300 
                      hover:shadow-lg hover:shadow-blue-500/20 hover:border-blue-500/50 h-full 
                      transform hover:-translate-y-1 relative z-10">
          <div className="relative h-48 w-full overflow-hidden">
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${category.gradientFrom} ${category.gradientTo} opacity-60 z-10 
              group-hover:opacity-40 transition-opacity duration-300`}></div>
            
            {/* Image */}
            {category.image ? (
              <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
                <Image 
                  src={category.image} 
                  alt={category.title} 
                  fill 
                  className="object-cover"
                />
              </div>
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${category.gradientFrom} ${category.gradientTo}`}></div>
            )}
            
            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
              <h3 className="text-xl font-bold mb-1 text-white drop-shadow-lg">{category.title}</h3>
            </div>
          </div>
          
          <div className="p-5">
            <p className="text-xs text-white-200 italic opacity-80">{category.animeReference}</p>
            <p className="text-gray-300 mb-4">{category.description}</p>
            <div className="flex justify-end">
              <span className="inline-flex items-center text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                Explore
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

// Updated Explore section with glowing cards
interface CategoryData {
  image?: string;
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  url: string;
  animeReference?: string;
}

const ExploreSection = ({ categoriesData }: { categoriesData: CategoryData[] }) => {
  return (
    <section className="py-16 z-14 backdrop-blur-lg bg-black bg-opacity-30" id="explore">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4 text-center">Explore InfinAI</h2>
        <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
          Embark on your AI/ML journey through our anime-inspired universe of knowledge, tools, and community.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesData.map((category, index) => (
            <GlowingCard key={index} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;