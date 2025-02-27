"use client"

import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth, useUser } from '@clerk/nextjs';

// Import components
import { DataFlowAnimation } from '@/components/DataflowAnimation';
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
    <div className="min-h-screen b text-white">
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
      
      <div className='absolute inset-0 z-2'>
        <DataFlowAnimation/>
      </div>

      <Navbar 
        isSignedIn={isSignedIn}
        openSignIn={openSignIn}
        openSignUp={openSignUp}
      />
      
      {/* Hero Section */}
      <HeroSection/>

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

      {/* Testimonials Section
      <section className="py-16 ">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">What Our Members Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonialData.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                // quote={testimonial.quote}
                name={testimonial.name}
                role={testimonial.role}
                // avatarColor={testimonial.avatarColor}
              />
            ))}
          </div>
        </div>
      </section> */}

      {/* Featured Speaker */}
      {/* <section className="py-16 bg-gradient-to-r from-blue-900 to-indigo-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/3 flex justify-center">
              <div className="w-64 h-64 rounded-full bg-blue-800 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-800 to-indigo-800 opacity-80"></div>
                <div className="relative z-10 text-center">
                  <div className="mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-sm text-blue-200">IBM EXPERT</div>
                </div>
              </div>
            </div>
            <div className="lg:w-2/3">
              <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold mb-4 inline-block">FEATURED SPEAKER</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Amit Shah</h2>
              <h3 className="text-xl text-blue-300 mb-6">CS Manager & WatsonX Architect at IBM</h3>
              <p className="text-gray-200 mb-6 leading-relaxed">
                We're thrilled to announce that Amit Shah will be our special guest speaker! With 28 years of industry experience at IBM, he'll be sharing invaluable insights on AI architecture, cloud solutions, and career growth in the tech industry.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-blue-900 hover:bg-gray-100 font-bold py-2 px-6 rounded-lg">
                  Register for the Talk
                </button>
                <button className="border border-white text-white hover:bg-white hover:bg-opacity-10 font-bold py-2 px-6 rounded-lg">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section> */}

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
              <h3 className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">500+</h3>
              <p className="text-gray-400">Community Members</p>
            </div>
            <div className="bg-gray-800/40 p-4 rounded-lg">
              <h3 className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">20+</h3>
              <p className="text-gray-400">Projects Completed</p>
            </div>
            <div className="bg-gray-800/40 p-4 rounded-lg">
              <h3 className="text-3xl md:text-4xl font-bold text-green-400 mb-2">30+</h3>
              <p className="text-gray-400">Workshops Conducted</p>
            </div>
            <div className="bg-gray-800/40 p-4 rounded-lg">
              <h3 className="text-3xl md:text-4xl font-bold text-red-400 mb-2">8+</h3>
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