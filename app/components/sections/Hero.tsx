"use client";

import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';

// --- MOCK UTILS & UI COMPONENTS (Simulating your external files) ---

interface CyberRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const CyberReveal: React.FC<CyberRevealProps> = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </div>
  );
};

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = "" }) => {
  return (
    <span className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -ml-0.5 translate-x-[2px] text-red-500 opacity-0 group-hover:opacity-70 animate-pulse">{text}</span>
      <span className="absolute top-0 left-0 -ml-0.5 -translate-x-[2px] text-cyan-500 opacity-0 group-hover:opacity-70 animate-pulse delay-75">{text}</span>
    </span>
  );
};

interface ScrambleTitleProps { text: string }

const ScrambleTitle: React.FC<ScrambleTitleProps> = ({ text }) => {
  const [display, setDisplay] = useState<string>(text);
  const chars = "!@#$%^&*()_+~`|{}[]:;?><,./-=";

  useEffect(() => {
    let interval: number | null = null;
    let iteration = 0;

    const runScramble = () => {
      if (interval !== null) window.clearInterval(interval);
      interval = window.setInterval(() => {
        setDisplay(
          text
            .split("")
            .map((letter: string, index: number) => {
              if (index < iteration) return text[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= text.length && interval !== null) {
          window.clearInterval(interval);
        }

        iteration += 1 / 3;
      }, 30);
    };

    runScramble();

    // Re-run occasionally for effect
    const loop = window.setInterval(() => {
      iteration = 0;
      runScramble();
    }, 5000);

    return () => {
      if (interval !== null) window.clearInterval(interval);
      if (loop) window.clearInterval(loop);
    };
  }, [text]);

  return <span>{display}</span>;
};

interface NeonButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  color?: 'cyan' | 'magenta' | 'yellow' | 'pink';
}

const NeonButton: React.FC<NeonButtonProps> = ({ children, onClick, color = 'cyan' }) => {
  const baseClasses = "relative px-6 py-3 font-mono font-bold uppercase transition-all duration-300 border-2 overflow-hidden group";
  const colorClasses = color === 'magenta' 
    ? "border-fuchsia-500 text-fuchsia-500 hover:text-white hover:bg-fuchsia-500 hover:shadow-[0_0_20px_rgba(217,70,239,0.6)]" 
    : "border-cyan-500 text-cyan-500 hover:text-black hover:bg-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]";

  return (
    <button onClick={onClick} className={`${baseClasses} ${colorClasses}`}>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};

// --- MAIN HERO COMPONENT ---

interface HeroProps {
  onNavigate: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section id="home" className="relative pt-32 pb-20 min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        <div className="space-y-6">
          <CyberReveal>
            <div className="inline-block px-3 py-1 border border-cyan-500/30 bg-cyan-950/30 text-cyan-400 font-mono text-xs mb-2 animate-pulse">
              SYSTEM_READY_V.2.0.77
            </div>
          </CyberReveal>
          
          <h1 className="text-5xl md:text-7xl font-cyber font-black text-white leading-tight">
            <div className="overflow-hidden">
               <GlitchText text="ISANDITH" className="animate-in slide-in-from-left duration-700" />
            </div>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              <ScrambleTitle text="PERERA" />
            </div>
          </h1>
          
          <CyberReveal delay={300}>
            <h2 className="text-xl md:text-2xl font-mono text-gray-400 border-l-4 border-cyan-500 pl-4">
              Aspiring Software Developer & <br/>
              Freelance Video Editor
            </h2>
          </CyberReveal>
          
          <CyberReveal delay={500}>
            <p className="max-w-md text-gray-500 leading-relaxed">
              Injecting futuristic code into modern web solutions. 
              Building the digital infrastructure of tomorrow, today.
            </p>
          </CyberReveal>
          
          <CyberReveal delay={700}>
            <div className="flex flex-wrap gap-4 pt-4">
              <NeonButton onClick={() => onNavigate('projects')}>
                View Projects
              </NeonButton>
              <NeonButton color="magenta" onClick={() => onNavigate('contact')}>
                Contact Me
              </NeonButton>
            </div>
          </CyberReveal>
        </div>

        {/* Cyberpunk Portrait Section (Updated Avatar) */}
        <CyberReveal delay={400} className="w-full flex justify-center lg:justify-end perspective-1000">
          <div className="relative group w-full max-w-md">
            
            {/* Outer Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-fuchsia-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            
            {/* Main Container */}
            <div className="relative aspect-square w-full bg-slate-900 border border-slate-700 flex items-center justify-center overflow-hidden rounded-xl group-hover:border-cyan-400/50 transition-colors shadow-2xl">
               
               {/* Animated Background Elements inside frame */}
               <div className="absolute inset-0 overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-[scan_3s_linear_infinite]"></div>
                 <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,#06b6d4_1px,transparent_1px)] bg-[length:20px_20px]">
                 </div>
               </div>

               {/* Rotating Rings Background */}
               <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                  <div className="w-[90%] h-[90%] border border-cyan-500/40 rounded-full animate-[spin_20s_linear_infinite] border-dashed"></div>
                  <div className="absolute w-[70%] h-[70%] border border-fuchsia-500/40 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
               </div>

               {/* THE NEW AVATAR IMAGE */}
               <img 
                 src="/CyberUser.jpeg" 
                 alt="Isandith Perera Cyber Avatar" 
                 className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full relative z-10 border-4 border-slate-900/50 shadow-[0_0_30px_rgba(6,182,212,0.3)] group-hover:scale-105 transition-transform duration-500" 
               />
               
               {/* ID Tag */}
               <div className="absolute bottom-6 left-6 bg-black/90 border border-cyan-500/50 px-3 py-1 font-mono text-xs text-cyan-400 backdrop-blur-sm">
                 ID: <span className="font-bold"><ScrambleTitle text="ISANDITH_P" /></span>
               </div>
               
               {/* HUD Elements */}
               <div className="absolute top-6 right-6 flex flex-col gap-1 items-end">
                 <div className="w-16 h-1 bg-cyan-500 animate-pulse"></div>
                 <div className="w-8 h-1 bg-cyan-500/50"></div>
                 <div className="w-2 h-1 bg-cyan-500/20"></div>
                 <div className="mt-2 text-[10px] text-cyan-500 font-mono">STATUS: ONLINE</div>
               </div>

               {/* Corner Accents */}
               <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500 rounded-tl-xl"></div>
               <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-fuchsia-500 rounded-br-xl"></div>
            </div>
          </div>
        </CyberReveal>

      </div>
    </section>
  );
};

export default Hero;