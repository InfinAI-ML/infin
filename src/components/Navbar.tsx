import React, { useState, useEffect, Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { AiOutlineClose } from 'react-icons/ai';
import { RiMenu4Line } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlitch } from "react-powerglitch";
import { Menu, Transition } from "@headlessui/react";
import NavLogo from '../../public/images/logo.svg';
import { itemsdes1, itemsdes2 } from '@/lib/config';
import NavItem from './NavItem';

interface NavbarProps {
  isSignedIn: boolean;
  openSignIn: () => void;
  openSignUp: () => void;
}

const Navbar = ({ isSignedIn, openSignIn, openSignUp }: NavbarProps) => {
  const [nav, setNav] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  const glitch = useGlitch({
    playMode: "hover",
    createContainers: true,
    hideOverflow: false,
    timing: {
      duration: 250,
      iterations: 1,
    },
    glitchTimeSpan: {
      start: 0,
      end: 1,
    },
    shake: {
      velocity: 15,
      amplitudeX: 0.2,
      amplitudeY: 0.2,
    },
    slice: {
      count: 6,
      velocity: 15,
      minHeight: 0.02,
      maxHeight: 0.15,
      hueRotate: true,
    },
    pulse: false,
  });

  // Check for dark mode preference on client side only
  useEffect(() => {
    setIsDarkMode(window?.matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);

  // Clerk styling
  useEffect(() => {
    if (isSignedIn) {
      const style = document.createElement('style');
      style.innerHTML = `
        /* Hide Clerk branding */
        .cl-userButtonPopoverFooter,
        .cl-internal-1hp5nqm,
        div[id^="cl-internal"] > div:has(> a[href*="clerk.com"]) {
          display: none !important;
        }
        .cl-internal-1baqzr {
          background-color: #1F2937 !important;
        }
        /* Improve dark theme styling for popup */
        .cl-userButtonPopover, .cl-userButtonPopoverCard {
          background-color: #1F2937 !important;
          border-color: #374151 !important;
        }
        
        /* Fix text colors in popover */
        .cl-userButtonPopoverActionButton, 
        .cl-userButtonPopoverActionButtonText,
        .cl-userPreviewTextContainer p,
        .cl-userPreviewMainIdentifier,
        .cl-userPreviewSecondaryIdentifier {
          color:rgb(231, 217, 217) !important;
          background-color: #1F2937 !important;
        }
        
        /* Style hover states for buttons */
        .cl-userButtonPopoverActionButton:hover {
          background-color: #374151 !important;
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, [isSignedIn]);

  const clerkAppearance = {
    baseTheme: isDarkMode ? 'dark' : 'light',
    layout: {
      logoPlacement: "none",  // Removes the Clerk logo
      socialButtonsVariant: "blockButton",
    },
  };

  const handleNav = () => {
    setNav(!nav);
  };

  const closeMobileMenu = () => {
    setNav(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY >= 90) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };

    // Subscribe to scroll events
    window.addEventListener('scroll', handleScroll);

    // Unsubscribe when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={shadow ? 'fixed w-full h-[60px] shadow-xl shadow-black z-[100] ease-in-out duration-300' : 'fixed w-full h-[60px] z-[100]'}>
      <div className='flex justify-between items-center w-full h-full px-2 2xl:px-16 backdrop-filter backdrop-blur-xl bg-opacity-50'>
        <Link href='/'>
          <div ref={glitch.ref}>
            <Image 
              src={NavLogo} 
              alt='/' 
              className='cursor-pointer ml-4 w-[85px] sm:w-[70px] md:w-[75px] lg:w-[80px]' 
            />
          </div>
        </Link>
        <div>
          <ul className='hidden md:flex text-white font-pixelate mr-11'>
            <ul className='flex gap-2'>
              {itemsdes1.map((itemsdes1) => (
                <NavItem key={itemsdes1.name} name={itemsdes1.name} link={itemsdes1.link} isActive={false} />
              ))}
              
              {/* Replace "More" with Sign In/Join Us buttons */}
              {isSignedIn ? (
                <li className="mt-[14px]">
                  <UserButton afterSignOutUrl="/" appearance={(clerkAppearance as any)} />
                </li>
              ) : (
                <div className="flex items-center gap-4 mt-[14px]">
                  <button 
                    ref={glitch.ref}
                    onClick={openSignIn}
                    className="text-white text-md hover:font-bold hover:text-white flex items-center gap-1"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={openSignUp}
                    className="bg-green-950 hover:bg-green-900 text-white px-4 py-1 rounded-md transition shadow-md shadow-green-700"
                  >
                    Join Us
                  </button>
                </div>
              )}
            </ul>
          </ul>
          <div style={{ color: 'white' }} onClick={handleNav} className='md:hidden text-white'>
            <div className='text-white mr-2'>
              {nav ? (
                <div
                  onClick={handleNav}
                  className='rounded-full shadow-lg shadow-green-700 bg-green-950 text-white font-bold p-3 cursor-pointer opacity-0'
                >
                  <AiOutlineClose size={22} />
                </div>
              ) : (
                <motion.div
                  whileTap={{ scale: 0.6, rotate: 90 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <RiMenu4Line size={32} />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={nav ? 'md:hidden fixed left-0 top-0 w-full h-screen bg-black/70 backdrop-filter backdrop-blur-sm bg-opacity-50' : ''}>
        <AnimatePresence>
          {nav && (
            <motion.div
              initial={{ left: '-100%' }}
              animate={{ left: 0 }}
              exit={{ left: '-100%' }}
              transition={{ ease: 'easeInOut', duration: 0.5 }}
              className='md:hidden fixed left-0 top-0 w-full h-screen bg-green-950 backdrop-filter backdrop-blur-md bg-opacity-50 shadow-green-700 shadow-lg p-10'
              style={{ backdropFilter: nav ? 'blur(10px)' : 'none' }}
            >
              <div>
                <div className='flex w-full items-center justify-between'>
                  <Link href='/'>
                    <div>
                      <Image 
                        src={NavLogo} 
                        alt='/' 
                        width={65}
                        height={30}
                        className="w-[125px]"
                      />
                    </div>
                  </Link>  
                  <motion.div
                    initial={{opacity:1}}
                    whileTap={{ scale: 0.6, rotate: -90, opacity:0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <div
                      onClick={handleNav}
                      className='rounded-full shadow-md shadow-green-700 font-extrabold text-white p-3 cursor-pointer'
                    >
                      <AiOutlineClose size={22} />
                    </div>
                  </motion.div>
                </div>
              </div>
              <div className='py-4 flex flex-col'>
                <ul className='uppercase font-pixelate text-white'>
                  <ul className='relative flex flex-col items-center gap-2 justify-around'>
                    {itemsdes1.map((item: { name: string; link: string; }) => (
                      <NavItem key={item.name} name={item.name} link={item.link} isActive={false} closeMobileMenu={closeMobileMenu} />
                    ))}
                    {itemsdes2.map((item: { name: string; link: string; }) => (
                      <NavItem key={item.name} name={item.name} link={item.link} isActive={false} closeMobileMenu={closeMobileMenu} />
                    ))}
                    
                    {/* Add sign in/join buttons to mobile menu */}
                    {!isSignedIn && (
                      <div className="flex flex-col items-center w-full mt-6 gap-4">
                        <button 
                          onClick={() => {
                            openSignIn();
                            closeMobileMenu();
                          }}
                          className="text-white text-md hover:font-bold transition flex items-center gap-1 w-full justify-center py-2"
                        >
                          Sign In
                        </button>
                        <button 
                          onClick={() => {
                            openSignUp();
                            closeMobileMenu();
                          }}
                          className="bg-green-900 hover:bg-green-800 text-white px-4 py-2 rounded-md transition shadow-md shadow-green-700 w-full"
                        >
                          Join Us
                        </button>
                      </div>
                    )}
                  </ul>
                </ul>
                <div className='pt-40'></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;