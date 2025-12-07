import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Monitor } from 'lucide-react';

// --- UTILITY COMPONENTS (Re-implemented for Single File) ---

// 1. CyberReveal: Handles scroll reveal animations
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

// 2. ScrambleTitle: Matrix-style text decoding effect
const ScrambleTitle: React.FC<{ text: string }> = ({ text }) => {
  const [display, setDisplay] = useState(text);
  const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~';

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span>{display}</span>;
};

// 3. NeonButton: Cyberpunk styled button
const NeonButton: React.FC<{ 
  children: React.ReactNode; 
  color?: 'yellow' | 'cyan' | 'pink'; 
  onClick?: () => void 
}> = ({ children, color = 'yellow', onClick }) => {
  const colorClasses = {
    yellow: 'border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 shadow-[0_0_10px_rgba(250,204,21,0.3)] hover:shadow-[0_0_20px_rgba(250,204,21,0.6)]',
    cyan: 'border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 shadow-[0_0_10px_rgba(34,211,238,0.3)] hover:shadow-[0_0_20px_rgba(34,211,238,0.6)]',
    pink: 'border-pink-400 text-pink-400 hover:bg-pink-400/10 shadow-[0_0_10px_rgba(244,114,182,0.3)] hover:shadow-[0_0_20px_rgba(244,114,182,0.6)]',
  };

  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 border font-mono font-bold uppercase tracking-wider transition-all duration-300 ${colorClasses[color]}`}
    >
      {children}
    </button>
  );
};

// --- MAIN FREELANCE COMPONENT ---

interface Review {
  client: string;
  text: string;
  rating: number;
}

interface FreelanceProps {
  reviews: Review[];
  projects?: string[];
}

const Freelance: React.FC<FreelanceProps> = ({ 
  reviews = [], 
  projects = [
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1515630278258-407f66498911?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=800"
  ] 
}) => {
  const [activeProject, setActiveProject] = useState<number>(0);
  const [isGlitching, setIsGlitching] = useState(false);

  // --- PROJECT AUTO-CYCLE ---
  useEffect(() => {
    if (projects.length === 0) return;
    const interval = setInterval(() => {
      handleProjectChange((prev) => (prev + 1) % projects.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [projects.length]);

  // --- Manual Project Navigation ---
  const handleProjectChange = (nextIndex: number | ((prev: number) => number)) => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 300);
    
    if (typeof nextIndex === 'function') {
        setActiveProject(nextIndex);
    } else {
        const next = nextIndex < 0 ? projects.length - 1 : nextIndex >= projects.length ? 0 : nextIndex;
        setActiveProject(next);
    }
  };

  return (
    <section id="freelance" className="py-20 bg-[#080808] border-y border-gray-800 relative overflow-hidden">
      
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,0)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 relative z-10">
        
        {/* LEFT COLUMN: Info */}
        <div className="flex flex-col justify-center gap-8">
          <CyberReveal>
            <h2 className="text-4xl font-cyber font-bold text-white mb-6 tracking-tighter">
              FREELANCE <span className="text-yellow-400">NETWORK</span>
            </h2>
            
            <div className="font-mono text-gray-400 mb-8 leading-relaxed">
              <p>
                Operating as a high-level specialist on global networks. 
                Delivering precision edits and code patches to clients worldwide.
              </p>
            </div>

            <div className="p-6 border-l-4 border-yellow-400 bg-yellow-400/5 mb-10 hover:bg-yellow-400/10 transition-colors duration-300">
              <h3 className="text-yellow-400 font-bold text-xl mb-2 flex items-center gap-2 tracking-widest">
                FIVERR GIGS <span className="animate-pulse w-2 h-2 rounded-full bg-yellow-400 inline-block"></span>
              </h3>
              <p className="text-sm text-gray-400 mb-4 font-mono">
                Available for contract work. Video editing, Bug fixing, and UI Implementation.
              </p>
              <NeonButton color="yellow" onClick={() => window.open('https://fiverr.com', '_blank')}>
                Visit Fiverr Profile
              </NeonButton>
            </div>
          </CyberReveal>
        </div>

        {/* RIGHT COLUMN: Visual Archive (Replaces Reviews) */}
        <div className="flex flex-col justify-center">
          {projects.length > 0 && (
            <CyberReveal delay={200} className="relative h-full">
              <div className="absolute -top-4 -left-4 font-mono text-xs text-yellow-600">
                // CLIENT_LOGS_DECRYPTED :: VISUAL_ARCHIVE
              </div>
              
              <div className="h-full flex items-center">
                <div className="w-full relative bg-gray-900/50 border border-yellow-500/30 p-2 min-h-[350px] flex flex-col justify-center overflow-hidden">
                    {/* Header for Slideshow */}
                    <div className="flex justify-between items-center bg-gray-900/80 p-2 border-b border-gray-700/50 mb-2">
                        <div className="text-xs font-mono text-yellow-500 flex items-center gap-2">
                            <Monitor size={14} />
                            WORK_LOG_V.0.9
                        </div>
                        <div className="text-xs font-mono text-gray-500">
                            {String(activeProject + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                        </div>
                    </div>

                    {/* Main Image Viewport */}
                    <div className="relative flex-grow w-full overflow-hidden group border border-yellow-900/30 bg-black">
                        {/* Scanline Overlay */}
                        <div className="absolute inset-0 z-20 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none opacity-20"></div>
                        <div className="absolute inset-0 z-20 pointer-events-none bg-yellow-400/5 mix-blend-overlay"></div>
                        
                        {/* The Image */}
                        <img 
                            src={projects[activeProject]} 
                            alt="Project Showcase" 
                            className={`w-full h-full object-cover transition-all duration-300 ${
                                isGlitching ? 'opacity-50 scale-105 grayscale' : 'opacity-90 hover:opacity-100 grayscale-0'
                            }`}
                        />

                        {/* Glitch Overlay (Active only on change) */}
                        {isGlitching && (
                            <div className="absolute inset-0 z-30 bg-yellow-400/20 mix-blend-hard-light animate-pulse"></div>
                        )}

                        {/* Navigation Overlays */}
                        <button 
                          onClick={() => handleProjectChange((p) => p - 1)}
                          className="absolute left-0 top-0 bottom-0 w-12 z-30 flex items-center justify-center bg-black/0 hover:bg-black/50 transition-colors group/nav cursor-pointer"
                          aria-label="Previous project"
                          title="Previous project"
                        >
                          <ChevronLeft className="text-yellow-400 opacity-0 group-hover/nav:opacity-100 transition-opacity" />
                        </button>
                        <button 
                          onClick={() => handleProjectChange((p) => p + 1)}
                          className="absolute right-0 top-0 bottom-0 w-12 z-30 flex items-center justify-center bg-black/0 hover:bg-black/50 transition-colors group/nav cursor-pointer"
                          aria-label="Next project"
                          title="Next project"
                        >
                          <ChevronRight className="text-yellow-400 opacity-0 group-hover/nav:opacity-100 transition-opacity" />
                        </button>
                    </div>

                    {/* Footer Info */}
                    <div className="flex items-center gap-2 pt-3 border-t border-gray-800 mt-2">
                         <div className="w-2 h-2 bg-yellow-500 animate-pulse rounded-full"></div>
                         <div className="text-xs text-gray-400 font-mono uppercase tracking-widest">
                            Rendering Project...
                         </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="absolute bottom-0 left-0 h-1 bg-yellow-400/20 w-full">
                      <div 
                         className={`h-full bg-yellow-400 transition-all duration-500 ease-linear shadow-[0_0_10px_rgba(250,204,21,0.5)] progress-bar-width`}
                         data-progress={((activeProject + 1) / projects.length) * 100}
                      ></div>
                    </div>
                </div>
              </div>
            </CyberReveal>
          )}
        </div>

      </div>
    </section>
  );
};

export default Freelance;

// Add style for progress bar width using data-progress attribute
if (typeof window !== 'undefined') {
  const styleId = 'freelance-progress-bar-style';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
      .progress-bar-width {
        width: 0%;
        transition: width 0.5s linear;
      }
      .progress-bar-width[data-progress] {
        width: attr(data-progress '%');
      }
    `;
    document.head.appendChild(style);
  }
}