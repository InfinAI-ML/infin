"use client"

import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth, useUser } from '@clerk/nextjs';

// Import components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import TestimonialCard from '../components/TestimonialCard';
import EventCard from '../components/EventCard';
import AuthModal from '@/components/AuthModal';
import { projectsData, featuredEventData, offeringsData } from '@/data/data';
import HeroSection from '@/components/Herosection';

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [initialAuthView, setInitialAuthView] = useState<'sign-in' | 'sign-up'>('sign-in');
  const { isSignedIn: authStatus, userId } = useAuth();
  const isSignedIn = authStatus ?? false;
  const { user } = useUser();
  const openSignIn = () => {
    setInitialAuthView('sign-in');
    setIsAuthModalOpen(true);
  };
  
  const openSignUp = () => {
    setInitialAuthView('sign-up');
    setIsAuthModalOpen(true);
  };
  
  return (
    <div className="min-h-screen text-white">
      <Head>
        <title>InfinAI - IITM BS AI/ML Club</title>
        <meta name="description" content="Official AI/ML club of IIT Madras BS Degree Program" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        initialView={initialAuthView}
      />
      
      {/* DataFlow animation is now handled by LoadingWrapper */}
      
      <Navbar 
        isSignedIn={isSignedIn}
        openSignIn={openSignIn}
        openSignUp={openSignUp}
      />
      
      {/* Hero Section */}
      <HeroSection/>
      
      {/* Featured Event Banner */}
      {/* Featured Event Banner */}
      <div className=" py-6 backdrop-blur-sm bg-opacity-90">
        <div className="container mx-auto px-6">
          <EventCard
        title={featuredEventData.title}
        date="Sept 15, 2023"
        time="5:00 PM IST"
        location="Virtual (Zoom)"
        description={featuredEventData.description}
        image="/images/image_copy.png"
        registrationLink={featuredEventData.buttonLink}
          />
        </div>
      </div>

      {/* Introduction Section */}
      <section className="py-16 bg-transparent z-5 backdrop-blur-sm bg-opacity-90">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 inline-block border-b-4 border-blue-500 pb-2">About InfinAI</h2>
          <div className="space-y-6">
            <p className="text-lg md:text-xl leading-relaxed">
              <span className="text-blue-400 font-semibold">InfinAI</span> is the official AI/ML club of 
              <span className="text-yellow-300 font-bold"> IIT Madras BS Degree Program</span>. We're a collective of 
              <span className="text-green-400">curious minds</span> passionate about leveraging 
              <span className="text-purple-400 font-semibold"> artificial intelligence</span> and 
              <span className="text-pink-400 font-semibold"> machine learning</span> to solve complex problems, 
              <span className="text-cyan-400"> innovate</span>, and 
              <span className="text-orange-400"> democratize AI education</span>.
            </p>
            <p className="text-lg md:text-xl leading-relaxed bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-bold">
              Whether you're a beginner or an expert, join us to learn, build, and collaborate!
            </p>
            <div className="flex flex-wrap gap-3 justify-center pt-2">
              {['Learning', 'Innovation', 'Community', 'Collaboration'].map((value, index) => (
                <span key={index} className={`px-4 py-1 rounded-full text-sm font-medium animate-pulse ${
                  index % 4 === 0 ? 'bg-blue-900/50 text-blue-300 border border-blue-500' :
                  index % 4 === 1 ? 'bg-purple-900/50 text-purple-300 border border-purple-500' :
                  index % 4 === 2 ? 'bg-green-900/50 text-green-300 border border-green-500' :
                  'bg-red-900/50 text-red-300 border border-red-500'
                }`}>
                  {value}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Sections */}
      <section className="py-16 bg-transparent z-5 backdrop-blur-sm bg-opacity-90">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {offeringsData.map((offering, index) => (
              <div key={index} className={`bg-opacity-80 backdrop-blur-md rounded-xl p-6 hover:shadow-lg hover:shadow-${offering.color}-900/20 transition duration-300 relative z-10`}>
                <div className={`flex items-center justify-center h-16 w-16 rounded-full bg-${offering.color}-600 mx-auto mb-4`}>
                  {offering.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">{offering.title}</h3>
                <p className="text-gray-300 mb-4 text-center">{offering.description}</p>
                <ul className="text-gray-400 space-y-2">
                  {offering.items.map((item, i) => (
                    <li key={i} className="flex items-center">
                      <span className="mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-black z-10 bg-transparent backdrop-blur-sm bg-opacity-90">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectsData.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                image={project.image}
                tags={project.tags}
                badgeText={project.badge?.text}
                badgeColor={project.badge?.color}
                // learnMoreLink={project.learnMoreLink}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action - Modified to include auth buttons */}
      <section className="py-16 bg-transparent z-10 backdrop-blur-sm bg-opacity-90">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Dive into AI/ML?</h2>
          <p className="text-xl text-gray-300 mb-8">No prerequisites—just curiosity! Let's shape the future of AI together.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isSignedIn ? (
              <div className="flex flex-col items-center">
                <p className="text-green-400 mb-2">Welcome, {user?.firstName || 'Member'}!</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 text-lg">
                  Access Member Area
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={openSignUp} 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 text-lg"
                >
                  Become a Member
                </button>
                <button 
                  onClick={openSignIn}
                  className="bg-transparent border-2 border-blue-600 text-blue-400 hover:bg-blue-900 hover:bg-opacity-30 font-bold py-3 px-8 rounded-full transition duration-300 text-lg"
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-transparent z-5 backdrop-blur-sm bg-opacity-90">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-gray-800/40 p-4 rounded-lg">
              <h3 className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">250+</h3>
              <p className="text-gray-400">Community Members</p>
            </div>
            <div className="bg-gray-800/40 p-4 rounded-lg">
              <h3 className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">10+</h3>
              <p className="text-gray-400">Upcoming Projects</p>
            </div>
            <div className="bg-gray-800/40 p-4 rounded-lg">
              <h3 className="text-3xl md:text-4xl font-bold text-green-400 mb-2">30+</h3>
              <p className="text-gray-400">Upcoming Workshops & ML Series</p>
            </div>
            <div className="bg-gray-800/40 p-4 rounded-lg">
              <h3 className="text-3xl md:text-4xl font-bold text-red-400 mb-2">5+</h3>
              <p className="text-gray-400">Industry Partners</p>
            </div>
          </div>
        </div>
      </section>
      
      <div className=" py-12">
      <Footer />
      </div>
    </div>
  );
}