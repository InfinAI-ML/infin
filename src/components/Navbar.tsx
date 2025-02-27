import React from 'react';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { useState } from 'react';

interface NavbarProps {
  isSignedIn: boolean;
  openSignIn: () => void;
  openSignUp: () => void;
}

const Navbar = ({ isSignedIn, openSignIn, openSignUp }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-black/30 backdrop-blur-md sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              InfinAI
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#" className="text-gray-300 hover:text-white transition">About</Link>
            <Link href="#" className="text-gray-300 hover:text-white transition">Projects</Link>
            <Link href="#" className="text-gray-300 hover:text-white transition">Events</Link>
            <Link href="#" className="text-gray-300 hover:text-white transition">Resources</Link>
          </div>
          
          <div className="flex items-center">
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  onClick={openSignIn}
                  className="text-gray-300 hover:text-white transition flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  Sign In
                </button>
                <button 
                  onClick={openSignUp}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md transition"
                >
                  Join Us
                </button>
              </div>
            )}
            
            {/* Mobile menu button */}
            <button 
              className="ml-4 md:hidden focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 flex flex-col">
            <Link href="#" className="text-gray-300 hover:text-white transition py-2">About</Link>
            <Link href="#" className="text-gray-300 hover:text-white transition py-2">Projects</Link>
            <Link href="#" className="text-gray-300 hover:text-white transition py-2">Events</Link>
            <Link href="#" className="text-gray-300 hover:text-white transition py-2">Resources</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;