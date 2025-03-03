import React, { useState, useEffect } from 'react';
import DataLoadingAnimation from './DataLoadingAnimation';
import { DataFlowAnimation } from './DataflowAnimation';
import { flushAllTraces } from 'next/dist/trace';

interface LoadingWrapperProps {
  children: React.ReactNode;
  showLoadingScreen?: boolean; // Can be controlled externally
  duration?: number;
  alwaysShowAnimation?: boolean; // Option to show animation on every visit
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ 
  children, 
  showLoadingScreen: externalShowLoadingScreen, 
  duration = 3000,
  alwaysShowAnimation = false
}) => {
  // Use local state for loading screen if not controlled externally
  const [internalShowLoadingScreen, setInternalShowLoadingScreen] = useState(true);
  const [contentRendered, setContentRendered] = useState(false);
  const [fadeOutLoading, setFadeOutLoading] = useState(false);
  
  // Determine if we should show the loading screen
  const showLoadingScreen = 
    externalShowLoadingScreen !== undefined ? externalShowLoadingScreen : internalShowLoadingScreen;
  
  useEffect(() => {
    // Add a flag to localStorage to indicate if this is the first visit of the session
    const firstVisitThisSession = !localStorage.getItem('hasVisitedBefore');
    
    if (!firstVisitThisSession && !alwaysShowAnimation) {
      // Skip animation if not first visit (unless configured to always show)
      setInternalShowLoadingScreen(false);
      setContentRendered(true);
    } else {
      // Mark that the user has visited
      localStorage.setItem('hasVisitedBefore', 'true');
      
      // Auto-hide loading after timeout (backup in case animation complete fails)
      const timer = setTimeout(() => {
        handleLoadingComplete();
      }, duration + 800); // Add extra buffer time for the animation
      
      return () => clearTimeout(timer);
    }
  }, [duration, alwaysShowAnimation]);
  
  // Handle animation complete with smoother transitions
  const handleLoadingComplete = () => {
    // First fade out the loading animation
    setFadeOutLoading(true);
    
    // After the fade out animation starts, begin showing content underneath
    setTimeout(() => {
      setContentRendered(true);
      
      // After content is visible but loading still fading out, finally remove loading screen
      setTimeout(() => {
        setInternalShowLoadingScreen(false);
      }, 800);
    }, 400);
  };
  
  return (
    <>
      {/* Shared background continuous DataFlow animation that persists through transition */}
      <div className="fixed inset-0 z-0">
        <DataFlowAnimation 
          primaryColor="rgba(59, 130, 246, 0.6)" 
          secondaryColor="rgba(147, 197, 253, 0.4)"
        />
      </div>

      {/* Add a semi-transparent overlay to maintain consistent brightness */}
      <div className="fixed inset-0 z-1 bg-black bg-opacity-30 pointer-events-none"></div>
      
      {showLoadingScreen && (
        <div 
          className={`transition-opacity duration-1000 ease-in-out fixed inset-0 z-50 ${
            fadeOutLoading ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <DataLoadingAnimation 
            onComplete={handleLoadingComplete} 
            duration={duration} 
          />
        </div>
      )}
      
      <div 
        className={`transition-opacity duration-1000 ease-in-out ${
          contentRendered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ minHeight: '100vh' }}
      >
        {children}
      </div>
    </>
  );
};

export default LoadingWrapper;