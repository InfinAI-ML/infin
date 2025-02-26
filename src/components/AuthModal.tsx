import { useState, useEffect } from 'react';
import { SignIn, SignUp } from '@clerk/nextjs';
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'sign-in' | 'sign-up';
}

const AuthModal = ({ isOpen, onClose, initialView = 'sign-in' }: AuthModalProps) => {
  const [view, setView] = useState<'sign-in' | 'sign-up'>(initialView);
  
  // Update view when initialView prop changes
  useEffect(() => {
    setView(initialView);
  }, [initialView]);
  
  // Add custom style to hide the Clerk branding element
  useEffect(() => {
    if (isOpen) {
      // Create a style element to target the specific Clerk element
      const style = document.createElement('style');
      style.innerHTML = `
        .cl-internal-1dauvpw, 
        div[id^="cl-internal"] > div:has(> a[href*="clerk.com"]),
        .cl-internal-b68vbk, 
        .cl-footerAction {
          display: none !important;
          visibility: hidden !important;
          height: 0 !important;
          width: 0 !important;
          overflow: hidden !important;
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, [isOpen]);
  
  if (!isOpen) return null;

  // Custom appearance for Clerk components
  const clerkAppearance = {
    baseTheme: window?.matchMedia('(prefers-color-scheme: dark)').matches ? ('dark' as any) : ('light' as any),
    layout: {
      logoPlacement: "none",  // Removes the Clerk logo
      socialButtonsVariant: "blockButton",
    },
    variables: {
      colorPrimary: '#3B82F6', // Blue 500
      colorText: '#F9FAFB', // Gray 50
      colorTextSecondary: '#D1D5DB', // Gray 300
      colorBackground: '#1F2937', // Gray 800
      colorInputBackground: '#374151', // Gray 700
      colorInputText: '#F9FAFB', // Gray 50
      colorAlphaShade: 'rgba(17, 24, 39, 0.4)', // Gray 900 with opacity
      fontFamily: `var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif`,
      fontFamilyCode: `var(--font-geist-mono), ui-monospace, monospace`,
    },
    elements: {
      card: {
        backgroundColor: '#1F2937', // Gray 800
        borderRadius: '0.5rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      formButtonPrimary: {
        backgroundColor: '#3B82F6', // Blue 500
        '&:hover': {
          backgroundColor: '#2563EB', // Blue 600
        },
        fontWeight: 600,
        textTransform: 'none',
        borderRadius: '0.375rem', // Rounded-md
      },
      formFieldInput: {
        borderRadius: '0.375rem', // Rounded-md
        backgroundColor: '#374151', // Gray 700
        borderColor: '#4B5563', // Gray 600
        '&:focus': {
          borderColor: '#60A5FA', // Blue 400
          boxShadow: '0 0 0 2px rgba(96, 165, 250, 0.2)', 
        },
      },
      footer: {
        '& a': {
          color: '#60A5FA', // Blue 400
        }
      },
      identityPreviewEditButton: {
        color: '#60A5FA', // Blue 400
      },
      formFieldAction: {
        color: '#60A5FA', // Blue 400
      },
      formFieldLabel: {
        color: '#D1D5DB', // Gray 300
      },
      headerTitle: {
        color: '#F9FAFB', // Gray 50
        fontWeight: 700,
      },
      headerSubtitle: {
        color: '#D1D5DB', // Gray 300
      },
      socialButtonsIconButton: {
        backgroundColor: '#374151', // Gray 700
        '&:hover': {
          backgroundColor: '#4B5563', // Gray 600
        }
      },
      socialButtonsBlockButton: {
        backgroundColor: '#374151', // Gray 700
        color: '#F9FAFB', // Ensuring the text is white
        '&:hover': {
          backgroundColor: '#4B5563', // Gray 600
        },
        span: {
          color: '#F9FAFB', // Making sure the text is white
        }
      },
      dividerLine: {
        backgroundColor: '#4B5563', // Gray 600
      },
      dividerText: {
        color: '#D1D5DB', // Gray 300
      },
      logoBox: {
        display: 'none', // Hide the Clerk logo
      }
    }
  };

  // Tabs styles for switching between sign-in and sign-up
  const tabBaseClass = "pb-2 px-4 font-medium transition-colors";
  const activeTabClass = "border-b-2 border-blue-600 text-blue-500";
  const inactiveTabClass = "text-gray-400 hover:text-gray-300";

  return (
    <ClerkProvider>
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
        <div className="bg-gray-900 rounded-lg w-full max-w-md p-6 relative shadow-xl">
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="mb-6 flex justify-center space-x-6 text-white">
            <button
              className={`${tabBaseClass} ${view === 'sign-in' ? activeTabClass : inactiveTabClass}`}
              onClick={() => setView('sign-in')}
            >
              Sign In
            </button>
            <button
              className={`${tabBaseClass} ${view === 'sign-up' ? activeTabClass : inactiveTabClass}`}
              onClick={() => setView('sign-up')}
            >
              Sign Up
            </button>
          </div>

          {view === 'sign-in' ? (
            <SignIn 
              appearance={(clerkAppearance as any)}
              routing="hash"
              signUpUrl="#"
              afterSignInUrl="/"
              redirectUrl="/"
            />
          ) : (
            <SignUp 
              appearance={(clerkAppearance as any)}
              routing="hash"
              signInUrl="#" 
              afterSignUpUrl="/"
              redirectUrl="/"
            />
          )}
        </div>
      </div>
    </ClerkProvider>
  );
};

export default AuthModal;