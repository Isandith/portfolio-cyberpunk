import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Calendar, Terminal, Shield, Cpu, ChevronRight } from 'lucide-react';

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
      role: "SENIOR_SYSTEM_ARCHITECT",
      company: "CYBERDYNE_SYSTEMS",
      period: "2023 - PRESENT",
      description: "Leading the development of neural net infrastructures and automated defense grids. Optimized core rendering engines by 400%.",
      tech: ["React", "Node.js", "WebGL", "Rust"],
      type: "full-time"
    },
    {
      id: 2,
      role: "FULL_STACK_OPERATIVE",
      company: "NEXUS_SOLUTIONS",
      period: "2021 - 2023",
      description: "Deployed secure payment gateways for underground data markets. Managed distributed teams across three time zones.",
      tech: ["TypeScript", "AWS", "Docker", "PostgreSQL"],
      type: "contract"
    },
    {
      id: 3,
      role: "JUNIOR_ENFORCER",
      company: "TYRELL_CORP",
      period: "2019 - 2021",
      description: "Maintained legacy replicant databases. Implemented first-generation AI chat interfaces for client support.",
      tech: ["JavaScript", "Python", "SQL"],
      type: "full-time"
    }
  ]
}) => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  return (
    <section id="career" className="py-24 bg-[#050505] relative overflow-hidden min-h-screen">
      
      {/* Background Matrix Rain Effect (Static CSS representation) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none career-matrix-bg"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <CyberReveal>
          <div className="mb-16 border-b border-gray-800 pb-8">
            <h2 className="text-5xl font-cyber font-bold text-white mb-4 tracking-tighter">
              CAREER <span className="text-yellow-400">TREE</span>
            </h2>
            <div className="flex items-center gap-2 text-yellow-600 font-mono text-sm">
              <Terminal size={14} />
              <span>&gt; ACCESSING_EMPLOYMENT_RECORDS...</span>
            </div>
          </div>
        </CyberReveal>

        {/* Tree Container */}
        <div className="relative">
          
          {/* Main Circuit Line (The Tree Trunk) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gray-800 transform -translate-x-1/2 hidden md:block">
            <div className="absolute inset-0 bg-yellow-400/20 blur-sm"></div>
            <div className="absolute top-0 w-full h-1/3 bg-gradient-to-b from-yellow-400 to-transparent opacity-50"></div>
          </div>
          
          {/* Mobile Line */}
          <div className="absolute left-4 top-0 bottom-0 w-1 bg-gray-800 md:hidden"></div>

          <div className="space-y-12">
            {history.map((job, index) => {
              const isRight = index % 2 === 0;
              
              return (
                <CyberReveal key={job.id} delay={index * 150} className="relative">
                  <div className={`md:flex items-center justify-between ${isRight ? 'flex-row' : 'flex-row-reverse'}`}>
                    
                    {/* Empty half for layout balance */}
                    <div className="hidden md:block w-5/12" />

                    {/* Center Node (The Circuit Joint) */}
                    <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20">
                      <div className={`w-8 h-8 bg-[#0a0a0a] border-2 rounded-full flex items-center justify-center transition-all duration-300 ${
                        hoveredNode === job.id 
                          ? 'border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.6)] scale-110' 
                          : 'border-gray-600'
                      }`}>
                        <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          hoveredNode === job.id ? 'bg-yellow-400' : 'bg-gray-600'
                        }`} />
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
                </CyberReveal>
              );
            })}
          </div>

          {/* Bottom Terminal Decoration */}
          <div className="mt-16 flex justify-center">
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

// Inject CSS for career matrix background to avoid inline styles
if (typeof window !== 'undefined') {
  const styleId = 'career-matrix-style';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
      .career-matrix-bg {
        background-image: linear-gradient(0deg, transparent 24%, rgba(32, 255, 77, .1) 25%, rgba(32, 255, 77, .1) 26%, transparent 27%, transparent 74%, rgba(32, 255, 77, .1) 75%, rgba(32, 255, 77, .1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(32, 255, 77, .1) 25%, rgba(32, 255, 77, .1) 26%, transparent 27%, transparent 74%, rgba(32, 255, 77, .1) 75%, rgba(32, 255, 77, .1) 76%, transparent 77%, transparent);
        background-size: 50px 50px;
      }
    `;
    document.head.appendChild(style);
  }
}
