import React from 'react';

interface TestimonialCardProps {
  text: string;
  name: string;
  role: string;
  color?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  text, 
  name, 
  role, 
  color = "blue" 
}) => {
  const getColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: "text-blue-500",
      purple: "text-purple-500",
      green: "text-green-500",
      red: "text-red-500",
    };
    
    const bgColors: Record<string, string> = {
      blue: "bg-blue-500",
      purple: "bg-purple-500",
      green: "bg-green-500",
      red: "bg-red-500",
    };
    
    return { text: colors[color] || colors.blue, bg: bgColors[color] || bgColors.blue };
  };
  
  const colorClasses = getColor(color);

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl relative">
      <div className={`absolute -top-4 -left-4 text-5xl ${colorClasses.text} opacity-50`}>"</div>
      <p className="text-gray-300 mb-4 z-10 relative">{text}</p>
      <div className="flex items-center">
        <div className={`w-10 h-10 ${colorClasses.bg} rounded-full mr-3`}></div>
        <div>
          <h4 className="font-bold">{name}</h4>
          <p className="text-gray-400 text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;