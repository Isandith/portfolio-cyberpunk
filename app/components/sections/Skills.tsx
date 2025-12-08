import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import CyberReveal from '../utils/CyberReveal'; 
import CyberProcess from '../utils/CyberProcess';
import HologramCard from '../ui/HologramCard';

// --- ANIMATED CYBERPUNK BACKGROUND COMPONENTS ---

const FloatingGlitches = () => {
  const glitches = [
    { left: '10%', delay: 0, duration: 4 },
    { left: '30%', delay: 1, duration: 5 },
    { left: '50%', delay: 2, duration: 6 },
    { left: '70%', delay: 0.5, duration: 4.5 },
    { left: '90%', delay: 1.5, duration: 5.5 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {glitches.map((glitch, i) => (
        <div
          key={i}
          className="absolute w-1 h-20 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent animate-[float-up_linear_infinite]"
          style={{
            left: glitch.left,
            bottom: '-100px',
            animationDuration: `${glitch.duration}s`,
            animationDelay: `${glitch.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const HorizontalScanLines = () => {
  const lines = [
    { top: '20%', speed: 8, delay: 0 },
    { top: '50%', speed: 10, delay: 2 },
    { top: '80%', speed: 12, delay: 4 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {lines.map((line, i) => (
        <div
          key={i}
          className="absolute h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent animate-[scan-horizontal_linear_infinite]"
          style={{
            top: line.top,
            animationDuration: `${line.speed}s`,
            animationDelay: `${line.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const PulsingCircuits = () => (
  <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
    <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-cyan-500/30 rounded-full animate-[pulse-ring_3s_ease-in-out_infinite]"></div>
    <div className="absolute bottom-1/3 right-1/4 w-40 h-40 border border-fuchsia-500/20 rounded-full animate-[pulse-ring_4s_ease-in-out_infinite_reverse]"></div>
    <div className="absolute top-1/2 right-1/3 w-24 h-24 border border-cyan-500/25 rounded-full animate-[pulse-ring_3.5s_ease-in-out_infinite]"></div>
  </div>
);

const GlowingAccents = () => (
  <>
    <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px] animate-[pulse-glow_4s_ease-in-out_infinite]"></div>
    <div className="absolute bottom-20 right-10 w-80 h-80 bg-fuchsia-500/5 rounded-full blur-[120px] animate-[pulse-glow_5s_ease-in-out_infinite_reverse]"></div>
  </>
);

const ScanlineOverlay = () => (
  <div className="absolute inset-0 pointer-events-none z-[1] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] bg-repeat opacity-30"></div>
);

// --- MAIN SKILLS COMPONENT ---

interface SkillGroup {
  title: string;
  icon: React.ReactNode;
  items: string[];
}

interface SkillsProps {
  skills: { [key: string]: SkillGroup };
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  return (
    <section id="skills" className="py-24 relative bg-black overflow-hidden min-h-screen flex flex-col justify-center before:absolute before:top-0 before:left-0 before:right-0 before:h-32 before:bg-gradient-to-b before:from-black before:to-transparent before:z-10 before:pointer-events-none">
      
      {/* --- BACKGROUND ANIMATIONS & STYLES --- */}
      <style>{`
        @keyframes float-up {
          0% { 
            transform: translateY(0);
            opacity: 0;
          }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { 
            transform: translateY(-100vh);
            opacity: 0;
          }
        }
        @keyframes scan-horizontal {
          0% { 
            transform: translateX(-100%);
            opacity: 0;
          }
          50% { opacity: 1; }
          100% { 
            transform: translateX(100%);
            opacity: 0;
          }
        }
        @keyframes pulse-ring {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.3;
          }
          50% { 
            transform: scale(1.2);
            opacity: 0.6;
          }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>

      {/* --- ANIMATED CYBERPUNK BACKGROUND LAYERS --- */}
      
      {/* 1. Floating Glitch Particles */}
      <FloatingGlitches />

      {/* 3. Horizontal Scan Lines */}
      <HorizontalScanLines />

      {/* 4. Pulsing Circuit Rings */}
      <PulsingCircuits />

      {/* 5. Glowing Ambient Accents */}
      <GlowingAccents />

      {/* 6. Scanline Overlay for CRT Effect */}
      <ScanlineOverlay />

      {/* --- CONTENT --- */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <CyberReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 border-b border-gray-800 pb-6">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="h-2 w-2 bg-cyan-500 rounded-full animate-pulse"></span>
                    <span className="font-mono text-xs text-cyan-500 tracking-widest">SYSTEM_DIAGNOSTIC</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-cyber font-bold text-white tracking-tight">
                TECHNICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">PROFICIENCY</span>
                </h2>
            </div>
            
            <div className="hidden md:block text-right">
              <div className="font-mono text-gray-500 text-xs">
                 MEMORY_USAGE: 64% <br/>
                 CORES_ACTIVE: 8/8
              </div>
            </div>
          </div>
        </CyberReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {Object.entries(skills).map(([key, skillGroup], idx) => (
            <CyberProcess key={key} delay={idx * 150}>
              <HologramCard 
                delay={0}
                {...skillGroup}
              />
            </CyberProcess>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;