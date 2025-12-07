"use client";
/* eslint-disable */
import React, { useState } from 'react';
import Navigation from './components/sections/Navigation';
import Hero from './components/sections/Hero';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Freelance from './components/sections/Freelance';
import Career from './components/sections/Career';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import BackgroundEffects from './components/ui/BackgroundEffects';
import { Code, Layers, Database, PenTool } from 'lucide-react';

// --- TYPES ---

interface SkillGroup {
  title: string;
  icon: React.ReactNode;
  items: string[];
}

interface Review {
  client: string;
  text: string;
  rating: number;
  image?: string;
}

interface Project {
  id: string | number;
  title: string;
  tech: string;
  desc: string;
  details: string;
  image?: string;
  url?: string;
}

// --- DATA ---

const SKILLS: { [key: string]: SkillGroup } = {
  programming: {
    title: "PROGRAMMING_LANGS",
    icon: <Code className="w-6 h-6" />,
    items: ["Java", "Python", "Kotlin", "JavaScript", "HTML", "CSS"]
  },
  frameworks: {
    title: "FRAMEWORKS_LIBS",
    icon: <Layers className="w-6 h-6" />,
    items: ["SpringBoot", "Angular", "Flutter", "Bootstrap", "Jetpack Compose"]
  },
  database: {
    title: "DATABASE_TECH",
    icon: <Database className="w-6 h-6" />,
    items: ["SQL", "MySQL"]
  },
  design: {
    title: "MULTIMEDIA_DESIGN",
    icon: <PenTool className="w-6 h-6" />,
    items: ["Adobe Photoshop (Pro)", "Adobe Premiere Pro (Pro)", "Adobe After Effects (Pro)", "Figma", "Axure"]
  }
};

const REVIEWS: Review[] = [
  {
    client: "Client A",
    text: "Isandith delivered the video edit faster than expected. The cyberpunk effects were exactly what I needed for my stream intro.",
    rating: 5,
    image: "/client-images/clientA.jpg"
  },
  {
    client: "Client B",
    text: "Great communication and excellent coding skills. Fixed my Java bugs in record time.",
    rating: 5,
    image: "/client-images/clientB.jpg"
  },
  {
    client: "Client C",
    text: "Highly professional. The UI design provided in Figma was pixel perfect.",
    rating: 5,
    image: "/client-images/clientC.jpg"
  }
];

// --- MAIN APP COMPONENT ---

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Scroll logic for "pages"
  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      
      {/* --- CSS INJECTIONS FOR ANIMATIONS --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Rajdhani:wght@300;500;700&family=Share+Tech+Mono&display=swap');
        
        body { font-family: 'Rajdhani', sans-serif; }
        .font-cyber { font-family: 'Orbitron', sans-serif; }
        .font-mono { font-family: 'Share Tech Mono', monospace; }
        
        /* CRT Scanline Effect */
        .scanline {
          width: 100%;
          height: 100px;
          z-index: 10;
          background: linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(34, 211, 238, 0.03) 50%, rgba(0,0,0,0) 100%);
          opacity: 0.1;
          position: fixed;
          bottom: 100%;
          animation: scanline 10s linear infinite;
          pointer-events: none;
        }

        /* CyberReveal delay classes */
        .cyber-delay-0 { transition-delay: 0ms; }
        .cyber-delay-100 { transition-delay: 100ms; }
        .cyber-delay-150 { transition-delay: 150ms; }
        .cyber-delay-200 { transition-delay: 200ms; }
        .cyber-delay-300 { transition-delay: 300ms; }
        .cyber-delay-400 { transition-delay: 400ms; }
        .cyber-delay-500 { transition-delay: 500ms; }
        .cyber-delay-700 { transition-delay: 700ms; }
        .cyber-delay-1000 { transition-delay: 1000ms; }

        /* Nav button animation delays */
        .nav-delay-0 { animation-delay: 0ms; }
        .nav-delay-1 { animation-delay: 100ms; }
        .nav-delay-2 { animation-delay: 200ms; }
        .nav-delay-3 { animation-delay: 300ms; }
        .nav-delay-4 { animation-delay: 400ms; }

        /* Glitch Keyframes */
        @keyframes glitch-1 {
          0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
          20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
          40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
          60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
          80% { clip-path: inset(10% 0 60% 0); transform: translate(-1px, 1px); }
          100% { clip-path: inset(30% 0 40% 0); transform: translate(1px, -1px); }
        }

        @keyframes glitch-2 {
          0% { clip-path: inset(10% 0 90% 0); transform: translate(2px, -1px); }
          20% { clip-path: inset(80% 0 10% 0); transform: translate(-2px, 1px); }
          40% { clip-path: inset(30% 0 20% 0); transform: translate(2px, 2px); }
          60% { clip-path: inset(10% 0 80% 0); transform: translate(-2px, -2px); }
          80% { clip-path: inset(40% 0 40% 0); transform: translate(1px, -1px); }
          100% { clip-path: inset(50% 0 30% 0); transform: translate(-1px, 1px); }
        }

        .clip-path-polygon {
           clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
        }
        
        /* Modal Open Animation */
        @keyframes modal-in {
          0% { opacity: 0; transform: scaleX(0) scaleY(0.01); }
          50% { opacity: 1; transform: scaleX(1) scaleY(0.01); }
          100% { opacity: 1; transform: scaleX(1) scaleY(1); }
        }
        
        .animate-modal-in {
          animation: modal-in 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
        }

        /* Moving Grid Background */
        .bg-grid-pattern {
          background-image: linear-gradient(to right, #111 1px, transparent 1px),
          linear-gradient(to bottom, #111 1px, transparent 1px);
          background-size: 40px 40px;
          animation: grid-move 20s linear infinite;
        }
        
        @keyframes grid-move {
          0% { transform: perspective(500px) rotateX(60deg) translateY(0); }
          100% { transform: perspective(500px) rotateX(60deg) translateY(40px); }
        }

        @keyframes scanline {
          0% { bottom: 100%; }
          100% { bottom: -100%; }
        }

        .progress-fill { width: var(--review-progress, 0%); }

        /* Cyberpunk Neon Scrollbar */
        ::-webkit-scrollbar {
          width: 14px;
        }

        ::-webkit-scrollbar-track {
          background: #0a0a0a;
          border-left: 2px solid rgba(34, 211, 238, 0.2);
          box-shadow: inset 0 0 15px rgba(34, 211, 238, 0.05);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #00ffff, #00ff88, #ffff00);
          border-radius: 8px;
          box-shadow: 
            0 0 15px rgba(0, 255, 255, 0.8),
            0 0 30px rgba(0, 255, 136, 0.6),
            0 0 45px rgba(0, 255, 255, 0.4),
            inset 0 0 10px rgba(255, 255, 255, 0.3);
          border: 1px solid rgba(0, 255, 255, 0.7);
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #00ffff, #ff00ff, #ffff00);
          box-shadow: 
            0 0 20px rgba(0, 255, 255, 1),
            0 0 40px rgba(255, 0, 255, 0.8),
            0 0 60px rgba(0, 255, 255, 0.6),
            inset 0 0 15px rgba(255, 255, 255, 0.5);
          border: 1px solid rgba(0, 255, 255, 0.9);
        }

        ::-webkit-scrollbar-thumb:active {
          background: linear-gradient(135deg, #00ffff, #ff00ff, #00ff88, #ffff00);
          box-shadow: 
            0 0 25px rgba(0, 255, 255, 1),
            0 0 50px rgba(255, 0, 255, 1),
            0 0 75px rgba(0, 255, 136, 0.8);
        }

        /* Firefox Scrollbar */
        * {
          scrollbar-color: #00ffff #0a0a0a;
          scrollbar-width: thin;
        }
      `}</style>

      {/* --- BACKGROUND FX --- */}
      <BackgroundEffects />

      {/* --- NAVIGATION --- */}
      <Navigation activeSection={activeSection} onNavigate={scrollTo} />

      {/* --- HERO SECTION --- */}
      <Hero onNavigate={scrollTo} />

      {/* --- SKILLS SECTION --- */}
      <Skills skills={SKILLS} />


      {/* --- PROJECTS SECTION --- */}
      <Projects selectedProject={selectedProject} onSelectProject={setSelectedProject} />

      {/* --- CAREER SECTION --- */}
      <Career />

      {/* --- FREELANCE SECTION --- */}
      <Freelance reviews={REVIEWS} />

      {/* --- CONTACT SECTION --- */}
      <Contact />

      {/* --- FOOTER --- */}
      <Footer />
    </div>
  );
}