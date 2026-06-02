import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Terminal, Shield } from 'lucide-react';
import CyberProcess from '../utils/CyberProcess';

// --- CAREER-THEMED CYBERPUNK BACKGROUND COMPONENTS ---

const CareerTimeline = () => {
  const lines = Array.from({ length: 5 }, (_, i) => ({
    top: `${20 + i * 15}%`,
    delay: i * 0.5,
    duration: 3 + i * 0.5
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {lines.map((line, i) => (
        <div
          key={i}
          className="absolute left-0 h-[3px] w-full bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
          style={{
            top: line.top,
            animation: `timeline-sweep ${line.duration}s ease-in-out infinite`,
            animationDelay: `${line.delay}s`,
            boxShadow: '0 0 10px rgba(6,182,212,0.5)'
          }}
        />
      ))}
    </div>
  );
};

const SkillParticles = () => {
  const [particles, setParticles] = React.useState<Array<{ left: string; top: string; delay: number; duration: number }>>([]);

  React.useEffect(() => {
    const newParticles = Array.from({ length: 8 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 2
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute w-3 h-3 bg-cyan-400/60 rounded-full blur-sm"
          style={{
            left: particle.left,
            top: particle.top,
            animation: `float-skill ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
            boxShadow: '0 0 8px rgba(6,182,212,0.6)'
          }}
        />
      ))}
    </div>
  );
};

const ExperienceNodes = () => (
  <div className="absolute inset-0 pointer-events-none z-0 opacity-30">
    {/* Node circles representing career milestones */}
    <div className="absolute top-1/4 left-1/4 w-16 h-16 border-2 border-cyan-400/50 rounded-full animate-[pulse-node_3s_ease-in-out_infinite]" style={{ boxShadow: '0 0 15px rgba(6,182,212,0.4)' }}></div>
    <div className="absolute top-1/3 right-1/5 w-12 h-12 border-2 border-fuchsia-400/50 rounded-full animate-[pulse-node_4s_ease-in-out_infinite_reverse]" style={{ boxShadow: '0 0 15px rgba(217,70,239,0.4)' }}></div>
    <div className="absolute bottom-1/4 left-1/3 w-20 h-20 border-2 border-cyan-400/40 rounded-full animate-[pulse-node_3.5s_ease-in-out_infinite]" style={{ boxShadow: '0 0 12px rgba(6,182,212,0.3)' }}></div>
  </div>
);

const ConnectionLines = () => (
  <div className="absolute inset-0 pointer-events-none z-0 opacity-25">
    {/* SVG lines connecting nodes */}
    <svg className="absolute inset-0 w-full h-full">
      <line x1="25%" y1="25%" x2="80%" y2="33%" stroke="#22d3ee" strokeWidth="2" className="animate-[dash_8s_linear_infinite]" style={{ filter: 'drop-shadow(0 0 5px rgba(6,182,212,0.5))' }} />
      <line x1="80%" y1="33%" x2="33%" y2="75%" stroke="#e879f9" strokeWidth="2" className="animate-[dash_10s_linear_infinite]" style={{ filter: 'drop-shadow(0 0 5px rgba(217,70,239,0.5))' }} />
      <circle cx="25%" cy="25%" r="5" fill="#22d3ee" opacity="0.8" style={{ filter: 'drop-shadow(0 0 6px rgba(6,182,212,0.6))' }} />
      <circle cx="80%" cy="33%" r="5" fill="#e879f9" opacity="0.8" style={{ filter: 'drop-shadow(0 0 6px rgba(217,70,239,0.6))' }} />
      <circle cx="33%" cy="75%" r="5" fill="#22d3ee" opacity="0.8" style={{ filter: 'drop-shadow(0 0 6px rgba(6,182,212,0.6))' }} />
    </svg>
  </div>
);

const CareerGlow = () => (
  <>
    <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] animate-[pulse-glow_4s_ease-in-out_infinite]"></div>
    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-[120px] animate-[pulse-glow_5s_ease-in-out_infinite_reverse]"></div>
  </>
);

const SystemStatus = () => {
  const statuses = [
    { label: "Career Status", value: "ACTIVE", color: "text-green-500", blinkIndex: 0 },
    { label: "Current Role", value: "ASSOC_SWE", color: "text-cyan-500", blinkIndex: 1 },
    { label: "Experience Level", value: "MID", color: "text-yellow-500", blinkIndex: 2 },
  ];

  return (
    <div className="absolute top-20 right-4 md:right-10 w-64 md:w-80 overflow-hidden opacity-40 pointer-events-none font-mono text-xs z-0">
      <div className="border border-cyan-500/40 bg-cyan-950/20 p-3 space-y-2" style={{ boxShadow: '0 0 15px rgba(6,182,212,0.2)' }}>
        <div className="text-cyan-400/80 text-[10px] tracking-widest">SYSTEM STATUS</div>
        {statuses.map((status, i) => (
          <div key={i} className="flex justify-between items-center text-[10px]">
            <span className="text-gray-400">{status.label}</span>
            <div className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full bg-green-500"
                style={{
                  animation: `status-blink-${status.blinkIndex} ${3 + status.blinkIndex * 2}s ease-in-out infinite`
                }}
              />
              <span className={`${status.color} animate-pulse`}>{status.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- UTILITY COMPONENTS (Included for standalone functionality) ---

const CyberReveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ 
  children, 
  delay = 0, 
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// --- DATA TYPES ---

interface CareerNode {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  tech: string[];
  type: 'contract' | 'full-time' | 'freelance';
}

interface CareerProps {
  history?: CareerNode[];
}

// --- MAIN COMPONENT ---

const Career: React.FC<CareerProps> = ({
  history = [
    {
      id: 1,
      role: "Freelance Video Editor",
      company: "Independent",
      period: "2018 - Present",
      description: "Produce and edit promotional videos, short-form content and motion graphics. Tasks include storytelling edits, color grading, audio cleanup, and export optimization for web and social platforms.",
      tech: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
      type: "freelance"
    },
    {
      id: 2,
      role: "BSc Computer Science — Undergraduate (3rd Year)",
      company: "University of Westminster",
      period: "2022 - Present",
      description: "Third-year Computer Science student focusing on software engineering, data structures, algorithms, databases and web development. Currently combining studies with an industry internship to gain practical full-stack experience.",
      tech: ["JavaScript", "TypeScript", "Python", "Data Structures", "Algorithms"],
      type: "full-time"
    },
    {
      id: 3,
      role: "Software Full Stack Intern",
      company: "Management System Pvt Ltd (MSL)",
      period: "2025 - 2026",
      description: "Worked as a full-stack intern building features for the company's management platform. Responsibilities included implementing React/Next.js frontends, Node.js backends, writing unit/integration tests, and participating in code reviews and CI/CD workflows.",
      tech: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Docker"],
      type: "contract"
    },
    {
      id: 4,
      role: "Associate Software Engineer",
      company: "Ekara Digital Partners",
      period: "May 2026 - Present",
      description: "Supporting full-stack development across backend and frontend systems. Contributing to feature development, code reviews, and architecture decisions within a collaborative engineering team.",
      tech: [".NET", "Next.js", "TypeScript", "React", "SQLServer", "REST APIs"],
      type: "full-time"
    }
  ]
}) => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  return (
    <section id="career" className="py-24 bg-black relative overflow-hidden min-h-screen">
      
      {/* --- BACKGROUND ANIMATIONS & STYLES --- */}
      <style>{`
        @keyframes timeline-sweep {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        @keyframes float-skill {
          0%, 100% { transform: translate(0, 0); opacity: 0.2; }
          50% { transform: translate(30px, -30px); opacity: 0.6; }
        }
        @keyframes pulse-node {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.3;
          }
          50% { 
            transform: scale(1.3);
            opacity: 0.6;
          }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes dash {
          0% { stroke-dashoffset: 500; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes node-activate-0 {
          0% { opacity: 0.6; box-shadow: none; }
          30% { opacity: 1; box-shadow: 0 0 15px rgba(250,204,21,0.8); }
          40% { opacity: 0.6; box-shadow: none; }
          100% { opacity: 0.6; box-shadow: none; }
        }
        @keyframes node-activate-1 {
          0% { opacity: 0.6; box-shadow: none; }
          63% { opacity: 1; box-shadow: 0 0 15px rgba(250,204,21,0.8); }
          73% { opacity: 0.6; box-shadow: none; }
          100% { opacity: 0.6; box-shadow: none; }
        }
        @keyframes node-activate-2 {
          0% { opacity: 0.6; box-shadow: none; }
          96% { opacity: 1; box-shadow: 0 0 15px rgba(250,204,21,0.8); }
          100% { opacity: 1; box-shadow: 0 0 15px rgba(250,204,21,0.8); }
        }
        @keyframes status-blink-0 {
          0% { opacity: 0.3; }
          10% { opacity: 1; }
          20% { opacity: 0.3; }
          100% { opacity: 0.3; }
        }
        @keyframes status-blink-1 {
          0% { opacity: 0.3; }
          40% { opacity: 0.3; }
          50% { opacity: 1; }
          60% { opacity: 0.3; }
          100% { opacity: 0.3; }
        }
        @keyframes status-blink-2 {
          0% { opacity: 0.3; }
          70% { opacity: 0.3; }
          80% { opacity: 1; }
          90% { opacity: 0.3; }
          100% { opacity: 0.3; }
        }
        @keyframes lightsaber-sweep {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        svg line { stroke-dasharray: 500; }
        @keyframes section-glitch {
          0% {
            clip-path: inset(10% 0 85% 0);
            transform: translate(-4px, 2px);
            opacity: 0.3;
          }
          20% {
            clip-path: inset(60% 0 20% 0);
            transform: translate(4px, -2px);
            opacity: 0.6;
          }
          40% {
            clip-path: inset(30% 0 40% 0);
            transform: translate(-2px, 4px);
            opacity: 0.8;
          }
          60% {
            clip-path: inset(5% 0 5% 0);
            transform: translate(2px, -1px);
            opacity: 0.95;
          }
          80% {
            clip-path: inset(0 0 0 0);
            transform: translate(-1px, 1px);
            opacity: 1;
          }
          100% {
            clip-path: inset(0 0 0 0);
            transform: translate(0, 0);
            opacity: 1;
          }
        }
        .glitch-section {
          animation: section-glitch 0.8s ease-out forwards;
        }
      `}</style>

      {/* --- CAREER-THEMED CYBERPUNK BACKGROUND LAYERS --- */}
      
      {/* 1. Career Timeline Lines */}
      <CareerTimeline />

      {/* 2. Skill Particles */}
      <SkillParticles />

      {/* 3. Experience Nodes */}
      <ExperienceNodes />

      {/* 4. Connection Lines between nodes */}
      <ConnectionLines />

      {/* 5. Glowing Accents */}
      <CareerGlow />

      {/* 6. System Status Panel */}
      <SystemStatus />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <CyberReveal>
          <div className="mb-16 border-b border-gray-800 pb-8">
            <h2 className="text-5xl font-cyber font-bold text-white mb-4 tracking-tighter">
              CAREER
            </h2>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-2 text-yellow-600 font-mono text-sm">
                <Terminal size={14} />
                <span>&gt; PROFESSIONAL EXPERIENCE & EDUCATION</span>
              </div>
              <div className="text-gray-400 text-sm font-mono">Updated from resume (draft) — edit entries as needed</div>
            </div>
          </div>
        </CyberReveal>

        {/* Tree Container */}
        <div className="relative">
          
          {/* Main Circuit Line (The Tree Trunk) - Desktop */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 md:bottom-32 w-1 bg-gray-800 transform -translate-x-1/2 hidden md:block">
            <div className="absolute inset-0 bg-yellow-400/20 blur-sm"></div>
            <div className="absolute top-0 w-full h-1/3 bg-gradient-to-b from-yellow-400 to-transparent opacity-50"></div>
            {/* Yellow lightsaber sweep animation through the trunk */}
            <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-yellow-300 via-yellow-400 to-transparent opacity-70 animate-[lightsaber-sweep_9s_ease-in-out_infinite]" style={{ boxShadow: '0 0 20px rgba(250,204,21,0.8)' }}></div>
          </div>
          
          {/* Mobile Line with Yellow Effects */}
          <div className="absolute left-4 top-0 bottom-0 w-1 bg-gray-800 md:hidden">
            <div className="absolute inset-0 bg-yellow-400/20 blur-sm"></div>
            <div className="absolute top-0 w-full h-1/3 bg-gradient-to-b from-yellow-400 to-transparent opacity-50"></div>
            {/* Yellow lightsaber sweep animation - Mobile */}
            <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-yellow-300 via-yellow-400 to-transparent opacity-70 animate-[lightsaber-sweep_9s_ease-in-out_infinite]" style={{ boxShadow: '0 0 15px rgba(250,204,21,0.8)' }}></div>
          </div>

          <div className="space-y-12">
            {history.map((job, index) => {
              const isRight = index % 2 === 0;
              
              return (
                <CyberProcess key={job.id} delay={index * 150} className="relative">
                  <div className={`md:flex items-center justify-between ${isRight ? 'flex-row' : 'flex-row-reverse'}`}>
                    
                    {/* Empty half for layout balance */}
                    <div className="hidden md:block w-5/12" />

                    {/* Center Node (The Circuit Joint) */}
                    <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20">
                      <div className={`w-8 h-8 bg-[#0a0a0a] border-2 rounded-full flex items-center justify-center transition-all duration-300 ${
                        hoveredNode === job.id 
                          ? 'border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.6)] scale-110' 
                          : 'border-gray-600'
                      }`}
                      style={{
                        animation: `node-activate-${index} 9s ease-in-out infinite`
                      }}>
                        <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          hoveredNode === job.id ? 'bg-yellow-400' : 'bg-yellow-500'
                        }`} style={{
                          animation: hoveredNode === job.id ? 'none' : `node-activate-${index} 9s ease-in-out infinite`,
                          boxShadow: hoveredNode !== job.id ? '0 0 8px rgba(250,204,21,0.6)' : 'none'
                        }} />
                      </div>
                    </div>

                    {/* Content Card */}
                    <div 
                      className="ml-12 md:ml-0 md:w-5/12 group cursor-default"
                      onMouseEnter={() => setHoveredNode(job.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      <div className={`
                        relative bg-gray-900/50 border p-6 transition-all duration-300
                        ${hoveredNode === job.id 
                          ? 'border-yellow-400/60 bg-gray-900/80 transform scale-[1.02]' 
                          : 'border-gray-800 hover:border-gray-700'
                        }
                      `}>
                        {/* Decorative Corners */}
                        <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t border-l border-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b border-r border-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        {/* Connector Line to Center */}
                        <div className={`hidden md:block absolute top-1/2 w-8 h-[2px] bg-gray-800 transition-colors duration-300 ${
                           isRight ? '-left-8' : '-right-8'
                        } ${hoveredNode === job.id ? 'bg-yellow-400' : ''}`}></div>

                        <div className="flex flex-col gap-4">
                          {/* Header */}
                          <div className="border-b border-gray-800 pb-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className={`font-bold font-mono text-xl transition-colors ${
                                hoveredNode === job.id ? 'text-yellow-400' : 'text-white'
                              }`}>
                                {job.role}
                              </h3>
                              <span className="text-xs font-mono text-gray-500 border border-gray-800 px-2 py-1 rounded bg-black">
                                {job.type.toUpperCase()}
                              </span>
                            </div>
                            
                            <div className="flex justify-between items-center text-sm font-mono text-gray-400">
                              <span className="flex items-center gap-2">
                                <Shield size={14} className="text-yellow-500" />
                                {job.company}
                              </span>
                              <span className="flex items-center gap-2">
                                <Calendar size={14} />
                                {job.period}
                              </span>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-gray-400 text-sm leading-relaxed">
                            {job.description}
                          </p>

                          {/* Tech Stack */}
                          <div className="flex flex-wrap gap-2 pt-2">
                            {job.tech.map((tech, i) => (
                              <span 
                                key={i}
                                className="text-xs font-mono text-yellow-500/80 bg-yellow-500/10 px-2 py-1 rounded border border-yellow-500/20"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </CyberProcess>
              );
            })}
          </div>

          {/* Bottom Terminal Decoration */}
          <div className="mt-32 flex justify-center">
            <div className="bg-black border border-gray-800 p-4 rounded text-center">
              <div className="text-gray-500 text-xs font-mono mb-2">SYSTEM STATUS</div>
              <div className="flex gap-2">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-75"></div>
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-150"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Career;