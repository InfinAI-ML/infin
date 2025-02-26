
import React from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  badgeText?: string;
  badgeColor?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  image, 
  tags, 
  badgeText = "PROJECT", 
  badgeColor = "blue" 
}) => {
  const getBadgeColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: "bg-blue-600",
      purple: "bg-purple-600",
      green: "bg-green-600",
      red: "bg-red-600",
      yellow: "bg-yellow-500",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="rounded-xl overflow-hidden">
      <div className="h-48 bg-gray-700 relative">
        <div className="absolute inset-0 bg-cover bg-center opacity-60" 
             style={{backgroundImage: `url('${image}')`}} />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <span className={`${getBadgeColor(badgeColor)} text-white px-3 py-1 rounded-full text-xs font-bold`}>
            {badgeText}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span key={index} className="bg-opacity-40 text-blue-300 px-3 py-1 rounded text-xs">
              {tag}
            </span>
          ))}
        </div>
        <button className="text-blue-400 hover:text-blue-300 text-sm font-bold flex items-center">
          <span>Learn more</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;