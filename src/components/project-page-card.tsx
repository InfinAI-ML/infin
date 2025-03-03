"use client"

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  projectsData, 
  getActiveProjects, 
  getFutureProjects, 
  getResearchProjects 
} from '@/data/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingWrapper from '@/components/LoadingWrapper';
import { useAuth } from '@clerk/clerk-react';

const { isSignedIn: authStatus, userId } = useAuth();
const isSignedIn = authStatus ?? false;
const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
const [initialAuthView, setInitialAuthView] = useState<'sign-in' | 'sign-up'>('sign-in');
const openSignIn = () => {
    setInitialAuthView('sign-in');
    setIsAuthModalOpen(true);
  };
  
  const openSignUp = () => {
    setInitialAuthView('sign-up');
    setIsAuthModalOpen(true);
  };

// Define Project type interface
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  team?: string[];
  github?: string;
  demoLink?: string;
  badge?: {
    text: string;
    color: string;
  };
}

// Project Card Component
const EnhancedProjectCard = ({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gray-900/80 backdrop-blur-md rounded-lg overflow-hidden shadow-lg border border-gray-800 hover:border-blue-500 transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          width={600}
          height={300}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {project.badge && (
          <div className={`absolute top-3 right-3 bg-${project.badge.color}-600 text-white text-xs font-bold px-3 py-1 rounded-full`}>
            {project.badge.text}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
        <p className="text-gray-300 mb-4 h-20 overflow-hidden">{project.description}</p>
        
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.map((tag, i) => (
            <span key={i} className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        {project.team && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-400 mb-1">Team</h4>
            <p className="text-gray-300 text-sm">{project.team.join(', ')}</p>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <Link href={`/projects/${project.id}`} className="text-blue-400 hover:text-blue-300 font-semibold text-sm">
            View Details →
          </Link>
          
          <div className="flex space-x-2">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            )}
            
            {project.demoLink && (
              <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Filter Button Component
interface FilterButtonProps {
  active: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

const FilterButton = ({ active, onClick, children }: FilterButtonProps) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
      active
        ? "bg-blue-600 text-white" 
        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
    }`}
  >
    {children}
  </button>
);

// Main Projects Page Component
export default function ProjectsPage() {
  const [filter, setFilter] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  
  useEffect(() => {
    // Apply filtering based on the selected filter
    switch (filter) {
      case "active":
        setFilteredProjects((getActiveProjects() as any));
        break;
      case "future":
        setFilteredProjects((getFutureProjects() as any));
        break;
      case "research":
        setFilteredProjects((getResearchProjects() as any));
        break;
      default:
        setFilteredProjects((projectsData as any));
    }
  }, [filter]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <LoadingWrapper>
        <Head>
          <title>Projects | InfinAI - IITM BS AI/ML Club</title>
          <meta name="description" content="Explore innovative AI/ML projects developed by the InfinAI club at IIT Madras BS Degree Program." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <Navbar 
        isSignedIn={isSignedIn}
        openSignIn={openSignIn}
        openSignUp={openSignUp}
      />
        
        {/* Hero Section */}
        <section className="relative py-24 backdrop-blur-sm">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 to-black/80" />
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                Our <span className="text-blue-400">Projects</span> & <span className="text-purple-400">Research</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-gray-300 mb-8"
              >
                Exploring the frontiers of AI/ML through innovative research and practical applications
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap justify-center gap-3 mb-8"
              >
                <FilterButton 
                  active={filter === "all"} 
                  onClick={() => setFilter("all")}
                >
                  All Projects
                </FilterButton>
                <FilterButton 
                  active={filter === "active"} 
                  onClick={() => setFilter("active")}
                >
                  Active Projects
                </FilterButton>
                <FilterButton 
                  active={filter === "future"} 
                  onClick={() => setFilter("future")}
                >
                  Future Projects
                </FilterButton>
                <FilterButton 
                  active={filter === "research"} 
                  onClick={() => setFilter("research")}
                >
                  Research Initiatives
                </FilterButton>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Projects Grid */}
        <section className="py-12 bg-black bg-opacity-70 backdrop-blur-md">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <EnhancedProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
            
            {filteredProjects.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-400 text-xl">No projects found in this category.</p>
              </div>
            )}
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-t from-blue-900/20 to-transparent backdrop-blur-sm">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Want to Contribute?</h2>
            <p className="text-xl text-gray-300 mb-8">
              We're always looking for passionate members to join our research initiatives and project teams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/join" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 text-lg"
              >
                Join a Project Team
              </a>
              <a 
                href="/propose" 
                className="bg-transparent border-2 border-blue-600 text-blue-400 hover:bg-blue-900 hover:bg-opacity-30 font-bold py-3 px-8 rounded-lg transition duration-300 text-lg"
              >
                Propose a Project
              </a>
            </div>
          </div>
        </section>
        
        {/* Project Stats */}
        <section className="py-12 bg-black bg-opacity-70">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="bg-gray-800/40 p-6 rounded-lg border border-gray-700">
                <h3 className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                  {getActiveProjects().length}
                </h3>
                <p className="text-gray-300">Active Projects</p>
              </div>
              <div className="bg-gray-800/40 p-6 rounded-lg border border-gray-700">
                <h3 className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">
                  {getFutureProjects().length}
                </h3>
                <p className="text-gray-300">Upcoming Projects</p>
              </div>
              <div className="bg-gray-800/40 p-6 rounded-lg border border-gray-700">
                <h3 className="text-3xl md:text-4xl font-bold text-green-400 mb-2">
                  {getResearchProjects().length}
                </h3>
                <p className="text-gray-300">Research Initiatives</p>
              </div>
              <div className="bg-gray-800/40 p-6 rounded-lg border border-gray-700">
                <h3 className="text-3xl md:text-4xl font-bold text-red-400 mb-2">
                  {projectsData.reduce((acc, project) => acc + project.team?.length || 0, 0)}
                </h3>
                <p className="text-gray-300">Team Members</p>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </LoadingWrapper>
    </div>
  );
}