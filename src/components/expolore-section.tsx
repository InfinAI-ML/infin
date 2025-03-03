import React, { useState, useRef, useEffect } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';

// Define interfaces
interface GlowPosition {
  x: number;
  y: number;
}

interface CategoryData {
  image?: string;
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  url: string;
  animeReference?: string;
}

// Complete color mapping system with all Tailwind colors and shades
const colorMap: Record<string, string> = {
  // Blues
  blue: '#3b82f6',
  'blue-50': '#eff6ff',
  'blue-100': '#dbeafe',
  'blue-200': '#bfdbfe',
  'blue-300': '#93c5fd',
  'blue-400': '#60a5fa',
  'blue-500': '#3b82f6',
  'blue-600': '#2563eb',
  'blue-700': '#1d4ed8',
  'blue-800': '#1e40af',
  'blue-900': '#1e3a8a',
  'blue-950': '#172554',
  
  // Reds
  red: '#ef4444',
  'red-50': '#fef2f2',
  'red-100': '#fee2e2',
  'red-200': '#fecaca',
  'red-300': '#fca5a5',
  'red-400': '#f87171',
  'red-500': '#ef4444',
  'red-600': '#dc2626',
  'red-700': '#b91c1c',
  'red-800': '#991b1b',
  'red-900': '#7f1d1d',
  'red-950': '#450a0a',
  
  // Greens
  green: '#10b981',
  'green-50': '#f0fdf4',
  'green-100': '#dcfce7',
  'green-200': '#bbf7d0',
  'green-300': '#86efac',
  'green-400': '#4ade80',
  'green-500': '#22c55e',
  'green-600': '#16a34a',
  'green-700': '#15803d',
  'green-800': '#166534',
  'green-900': '#14532d',
  'green-950': '#052e16',
  
  // Purples
  purple: '#8b5cf6',
  'purple-50': '#faf5ff',
  'purple-100': '#f3e8ff',
  'purple-200': '#e9d5ff',
  'purple-300': '#d8b4fe',
  'purple-400': '#c084fc',
  'purple-500': '#a855f7',
  'purple-600': '#9333ea',
  'purple-700': '#7e22ce',
  'purple-800': '#6b21a8',
  'purple-900': '#581c87',
  'purple-950': '#3b0764',
  
  // Additional colors
  yellow: '#f59e0b',
  'yellow-500': '#eab308',
  'yellow-600': '#ca8a04',
  'yellow-700': '#a16207',
  'yellow-800': '#854d0e',
  'yellow-900': '#713f12',
  
  pink: '#ec4899',
  'pink-500': '#ec4899',
  'pink-600': '#db2777',
  'pink-700': '#be185d',
  'pink-800': '#9d174d',
  'pink-900': '#831843',
  
  indigo: '#6366f1',
  'indigo-500': '#6366f1',
  'indigo-600': '#4f46e5',
  'indigo-700': '#4338ca',
  'indigo-800': '#3730a3',
  'indigo-900': '#312e81',
  
  orange: '#f97316',
  'orange-500': '#f97316',
  'orange-600': '#ea580c',
  'orange-700': '#c2410c',
  'orange-800': '#9a3412',
  'orange-900': '#7c2d12',
  
  teal: '#14b8a6',
  'teal-500': '#14b8a6',
  'teal-600': '#0891b2',
  'teal-700': '#0e7490',
  'teal-800': '#155e75',
  'teal-900': '#134e4a',
  
  cyan: '#06b6d4',
  'cyan-500': '#06b6d4',
  'cyan-600': '#0891b2',
  'cyan-700': '#0e7490',
  'cyan-800': '#155e75',
  'cyan-900': '#164e63',
  
  gray: '#6b7280',
  'gray-500': '#6b7280',
  'gray-600': '#4b5563',
  'gray-700': '#374151',
  'gray-800': '#1f2937',
  'gray-900': '#111827',
};

const GlowingCard = ({ category, index }: { category: CategoryData; index: number }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const [glowPosition, setGlowPosition] = useState<GlowPosition>({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const [dominantColor, setDominantColor] = useState<string>('#3b82f6');
  
  // Enhanced color extraction with image support and vibrance detection
  useEffect(() => {
    // Extract color from Tailwind class
    const extractColorFromTailwind = (className: string): string => {
      // Match color patterns like "from-blue-500" or "to-red-700"
      const colorMatch = className.match(/(?:from|via|to)-([a-z]+(?:-\d+)?)/i);
      const colorKey = colorMatch?.[1] || 'blue-500';
      
      // Look up actual hex value
      return colorMap[colorKey] || colorMap[colorKey.split('-')[0]] || '#3b82f6';
    };
    
    // Calculate color vibrance (higher = more vibrant)
    const getColorVibrance = (hex: string): number => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const delta = max - min;
      
      // If max and min are the same, it's a gray tone without saturation
      if (delta === 0) return 0;
      
      const l = (max + min) / 2; // lightness
      
      // Calculate saturation based on lightness
      const s = l > 0.5 
        ? delta / (2 - max - min) 
        : delta / (max + min);
      
      // Vibrance score: higher saturation and moderate lightness have higher scores
      return s * (1 - Math.abs(l - 0.5) * 2);
    };
    
    // Extract colors from gradient classes
    const fromColor = extractColorFromTailwind(category.gradientFrom);
    const toColor = extractColorFromTailwind(category.gradientTo);
    
    // Compare vibrance to select the more visually impactful color
    const fromVibrance = getColorVibrance(fromColor);
    const toVibrance = getColorVibrance(toColor);
    
    // Select the more vibrant gradient color
    const bestGradientColor = fromVibrance > toVibrance ? fromColor : toColor;
    
    // If category has an image, try to extract color from it when loaded
    if (category.image && typeof window !== 'undefined') {
      // Use gradient color initially
      setDominantColor(bestGradientColor);
      
      // Create a new image to analyze
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = category.image;
      
      img.onload = () => {
        try {
          // Create a canvas to analyze the image
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          if (!context) return;
          
          // Use a small size for performance
          const size = 24;
          canvas.width = size;
          canvas.height = size;
          
          // Draw and scale down image
          context.drawImage(img, 0, 0, size, size);
          
          // Sample colors from key areas of the image
          const samples = [
            {x: size/4, y: size/4},       // upper left quadrant
            {x: size*3/4, y: size/4},     // upper right quadrant
            {x: size/2, y: size/2},       // center
            {x: size/4, y: size*3/4},     // lower left quadrant
            {x: size*3/4, y: size*3/4}    // lower right quadrant
          ];
          
          // Collect and analyze color samples
          const colors = samples.map(({x, y}) => {
            const data = context.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
            const hex = `#${data[0].toString(16).padStart(2, '0')}${data[1].toString(16).padStart(2, '0')}${data[2].toString(16).padStart(2, '0')}`;
            
            return {
              hex,
              vibrance: getColorVibrance(hex),
              brightness: (data[0] + data[1] + data[2]) / 3
            };
          });
          
          // Filter out colors that are too dark or too light
          const validColors = colors.filter(c => c.brightness > 40 && c.brightness < 215);
          
          if (validColors.length > 0) {
            // Find the most vibrant color
            const mostVibrant = validColors.reduce(
              (prev, curr) => (curr.vibrance > prev.vibrance ? curr : prev)
            );
            
            setDominantColor(mostVibrant.hex);
          } else {
            // If no good colors found in image, use the gradient color
            setDominantColor(bestGradientColor);
          }
        } catch (e) {
          // Fallback to gradient color if any error occurs
          setDominantColor(bestGradientColor);
        }
      };
      
      img.onerror = () => {
        // Use gradient color if image fails to load
        setDominantColor(bestGradientColor);
      };
    } else {
      // No image, use best gradient color
      setDominantColor(bestGradientColor);
    }
  }, [category]);

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
      className="relative group cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Enhanced glow effect with improved positioning and intensity */}
      <div 
        className={`absolute -inset-0.5 rounded-xl transition-all duration-300 ${
          isHovering ? 'opacity-70' : 'opacity-0'
        }`}
        style={{
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${dominantColor} 0%, transparent 75%)`,
          filter: 'blur(15px)',
          zIndex: 0,
          transform: 'translateZ(0)', // GPU acceleration for smoother effect
        }}
      />
      
      {/* Card content with relative positioning for proper stacking context */}
      <div className="relative z-10">
        <Link href={category.url}>
          <div 
            className="group bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden transition-all duration-300 
                     h-full transform hover:-translate-y-1"
            style={{ 
              boxShadow: isHovering ? `0 8px 24px -6px ${dominantColor}50` : 'none',
              borderColor: isHovering ? dominantColor : '',
              borderWidth: isHovering ? '1.5px' : '1px'
            }}
          >
            <div className="relative h-48 w-full overflow-hidden" ref={imageRef}>
              {/* Gradient overlay */}
              <div 
                className={`absolute inset-0 bg-gradient-to-t ${category.gradientFrom} ${category.gradientTo} opacity-60 z-10 
                  group-hover:opacity-40 transition-opacity duration-300`}
              ></div>
              
              {/* Image with improved hover effect */}
              {category.image ? (
                <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
                  <NextImage
                    src={category.image} 
                    alt={category.title} 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${category.gradientFrom} ${category.gradientTo}`}></div>
              )}
              
              {/* Enhanced title overlay with improved readability */}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <h3 className="text-xl font-bold mb-1 text-white drop-shadow-lg">{category.title}</h3>
              </div>
            </div>
            
            <div className="p-5">
              <p className="text-xs text-gray-300 italic opacity-80">{category.animeReference}</p>
              <p className="text-gray-300 mb-4">{category.description}</p>
              <div className="flex justify-end">
                <span 
                  className="inline-flex items-center transition-colors duration-300"
                  style={{ color: dominantColor }}
                >
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
    </div>
  );
};

const ExploreSection = ({ categoriesData }: { categoriesData: CategoryData[] }) => {
  return (
    <section className="py-16 z-10 backdrop-blur-lg bg-black bg-opacity-30" id="explore">
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