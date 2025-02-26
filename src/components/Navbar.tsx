import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-transparent z-5 backdrop-blur-sm bg-opacity-90 bg-opacity-95 py-4 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-white font-bold text-xl flex items-center">
              <span className="text-blue-500">Infin</span>
              <span className="text-white">AI</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-blue-400 transition duration-300">Home</Link>
            <Link href="/events" className="text-white hover:text-blue-400 transition duration-300">Events</Link>
            <Link href="/projects" className="text-white hover:text-blue-400 transition duration-300">Projects</Link>
            <Link href="/resources" className="text-white hover:text-blue-400 transition duration-300">Resources</Link>
            <Link href="/team" className="text-white hover:text-blue-400 transition duration-300">Team</Link>
            <Link href="/contact" className="text-white hover:text-blue-400 transition duration-300">Contact</Link>
            <Link href="/join" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-bold transition duration-300">Join Us</Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              className="text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 flex flex-col">
            <Link href="/" className="text-white hover:text-blue-400 transition duration-300 py-2">Home</Link>
            <Link href="/events" className="text-white hover:text-blue-400 transition duration-300 py-2">Events</Link>
            <Link href="/projects" className="text-white hover:text-blue-400 transition duration-300 py-2">Projects</Link>
            <Link href="/resources" className="text-white hover:text-blue-400 transition duration-300 py-2">Resources</Link>
            <Link href="/team" className="text-white hover:text-blue-400 transition duration-300 py-2">Team</Link>
            <Link href="/contact" className="text-white hover:text-blue-400 transition duration-300 py-2">Contact</Link>
            <Link href="/join" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-bold transition duration-300 w-fit">Join Us</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;