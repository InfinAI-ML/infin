// components/HeroSection.tsx
import React from 'react';
// import NeuralNetworkBackground from './NeuralNetworkAnimation';

const HeroSection: React.FC = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Neural Network Background */}
      {/* <NeuralNetworkBackground /> */}
      
      {/* Change the overlay to be darker at the bottom for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/30" />
      
      {/* Content - improve visibility with text shadow and stronger gradient */}
      <div className="container mx-auto px-6 z-10 text-center">
      <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x drop-shadow-[0_2px_8px_rgba(101,119,231,0.4)]">
            Empowering the Future of AI & Machine Learning
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-500">AI & Machine Learning</span>
          </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            A student-driven community at IIT Madras BS, exploring the frontiers of AI/ML and its real-world applications.
          </p>
        <a 
          href="https://discord.gg/zpbTxz49"
          target="_blank" 
          rel="noopener noreferrer"
        >
          <button className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 text-lg shadow-lg">
            Join Our Community →
          </button>
        </a>
      </div>
    </div>
  );
};

export default HeroSection;