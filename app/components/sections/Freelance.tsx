import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Monitor, 
  Maximize2, 
  X, 
  Terminal, 
  Cpu, 
  Wifi, 
  Zap,
  Globe,
  ShieldCheck
} from 'lucide-react';

// --- FREELANCE CYBERPUNK BACKGROUND COMPONENTS ---

const FloatingParticles = () => {
  const [particles, setParticles] = useState<Array<{ left: string; delay: number; duration: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 6 }, (_, i) => ({
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-yellow-400/50 rounded-full blur-sm"
          style={{
            left: p.left,
            top: '10%',
            animation: `float-particle ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`
          }}
        />
      ))}
    </div>
  );
};

const NeonBeams = () => {
  const beams = Array.from({ length: 4 }, (_, i) => ({
    left: `${20 + i * 20}%`,
    delay: i * 0.5,
    duration: 4 + i * 0.3
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {beams.map((beam, i) => (
        <div
          key={i}
          className="absolute w-1 h-16 bg-gradient-to-b from-yellow-500 to-transparent opacity-60"
          style={{
            left: beam.left,
            animation: `beam-sweep ${beam.duration}s ease-in-out infinite`,
            animationDelay: `${beam.delay}s`,
            boxShadow: '0 0 10px rgba(250,204,21,0.8)'
          }}
        />
      ))}
    </div>
  );
};

const CyberSquares = () => (
  <div className="absolute inset-0 pointer-events-none z-0 opacity-15">
    <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-yellow-500/30 animate-[neon-pulse_3s_ease-in-out_infinite]"></div>
    <div className="absolute top-1/3 right-1/4 w-40 h-40 border-2 border-yellow-500/20 animate-[neon-pulse_4s_ease-in-out_infinite_reverse]"></div>
    <div className="absolute bottom-1/4 left-1/3 w-24 h-24 border-2 border-yellow-500/25 animate-[neon-pulse_3.5s_ease-in-out_infinite]"></div>
  </div>
);

const FreelanceGlow = () => (
  <>
    <div className="absolute top-20 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-[100px] animate-[pulse-glow_4s_ease-in-out_infinite]"></div>
    <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-yellow-500/5 rounded-full blur-[120px] animate-[pulse-glow_5s_ease-in-out_infinite_reverse]"></div>
  </>
);
const GlitchText: React.FC<{ text: string; className?: string; speed?: number }> = ({ 
  text, 
  className = "", 
  speed = 30 
}) => {
  const [display, setDisplay] = useState(text);
  const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~01';

  const scramble = useCallback(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text.split('').map((char, index) => {
          if (char === ' ' || char === '\n') return char; // Preserve spaces/newlines
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 2;
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  useEffect(() => { scramble(); }, [scramble]);

  return (
    <span 
      onMouseEnter={scramble} 
      className={`relative inline-block cursor-default font-mono ${className}`}
    >
      <span className="opacity-0 pointer-events-none">{text}</span>
      <span className="absolute top-0 left-0 w-full h-full">
        {display}
      </span>
    </span>
  );
};

// 2. CyberButton: High-tech button with angled corners
const CyberButton: React.FC<{ 
  children: React.ReactNode; 
  onClick?: () => void; 
  active?: boolean 
}> = ({ children, onClick, active = false }) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative px-6 py-3 font-mono font-bold uppercase tracking-wider transition-all duration-300 group w-full sm:w-auto
        clip-corner
        ${active 
          ? 'bg-yellow-400 text-black shadow-[0_0_20px_rgba(250,204,21,0.5)]' 
          : 'bg-transparent text-yellow-400 border border-yellow-500/30 hover:bg-yellow-400/10 hover:border-yellow-400'
        }
      `}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      
      {!active && (
        <>
          <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-yellow-400 transition-all group-hover:w-full group-hover:h-full"></span>
          <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-yellow-400 transition-all group-hover:w-full group-hover:h-full"></span>
        </>
      )}
    </button>
  );
};

// --- MODAL COMPONENT (The "Popup") ---

const TacticalModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  index: number;
}> = ({ isOpen, onClose, imageSrc, index }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 md:p-4 animate-in fade-in duration-200">
      <style>{`
        @keyframes modal-glitch-open {
          0% {
            clip-path: inset(10% 0 85% 0);
            transform: translate(-4px, 2px);
            opacity: 0;
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
        .modal-glitch-open {
          animation: modal-glitch-open 0.6s ease-out forwards;
        }
      `}</style>
      <div 
        className="w-full max-w-6xl h-[90dvh] md:h-[85vh] relative bg-black border border-yellow-500/50 flex flex-col shadow-[0_0_50px_rgba(250,204,21,0.15)] clip-corner-top overflow-hidden modal-glitch-open"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CRT Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none z-20 opacity-10 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%]"></div>
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-3 md:p-4 bg-yellow-500/10 border-b border-yellow-500/30 z-30 shrink-0">
          <div className="flex items-center gap-2 md:gap-3 text-yellow-400 font-mono text-xs md:text-base">
            <Terminal size={18} />
            <span className="tracking-widest">VISUAL_DB // IMG_{String(index).padStart(3, '0')}</span>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-red-500/20 p-2 rounded transition-colors"
            aria-label="Close image viewer"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Content Grid - Responsive switch from Flex Col (Mobile) to Grid (Desktop) */}
        <div className="flex-1 flex flex-col lg:grid lg:grid-cols-[1fr_300px] overflow-hidden">
          
          {/* Left: Image Canvas */}
          <div className="relative bg-[#050505] flex items-center justify-center p-4 md:p-8 group border-b lg:border-b-0 lg:border-r border-yellow-500/20 h-1/2 lg:h-auto min-h-[250px]">
             {/* Grid Background */}
             <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(250,204,21,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(250,204,21,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
             
             <img 
               src={imageSrc} 
               alt="Full Detail" 
               className="max-h-full max-w-full object-contain shadow-2xl relative z-10 border border-gray-800"
             />
             
             {/* Decorative reticle - Hidden on very small screens */}
             <div className="absolute inset-0 pointer-events-none border border-yellow-500/0 group-hover:border-yellow-500/30 transition-all duration-500 m-4 md:m-8 hidden sm:block">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-500"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-500"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-500"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-500"></div>
             </div>
          </div>

          {/* Right: Sidebar Metadata */}
          <div className="bg-[#0a0a0a] p-4 md:p-6 font-mono text-sm border-l-0 lg:border-l border-yellow-500/20 flex flex-col gap-6 z-30 overflow-y-auto h-1/2 lg:h-auto">
            
            <div className="space-y-2">
              <h4 className="text-gray-500 uppercase text-xs tracking-widest mb-4 border-b border-gray-800 pb-2">File Properties</h4>
              <div className="flex justify-between text-gray-400">
                <span>Status:</span>
                <span className="text-green-400">RENDERED</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Resolution:</span>
                <span className="text-yellow-400">1920x1080</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Format:</span>
                <span className="text-yellow-400">PNG / LOSSLESS</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Encryption:</span>
                <span className="text-red-400">NONE</span>
              </div>
            </div>

            <div className="p-4 bg-yellow-400/5 border border-yellow-500/20 mt-auto">
              <div className="flex items-center gap-2 text-yellow-400 mb-2">
                <ShieldCheck size={16} />
                <span className="font-bold">SYSTEM VERIFIED</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                This project file has been verified by the automated build system. No errors detected in the render pipeline.
              </p>
            </div>

            <button 
                onClick={onClose}
                className="w-full py-3 mt-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold uppercase tracking-wider transition-colors clip-corner shrink-0"
            >
                Close Viewer
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---

const Freelance: React.FC = () => {
  // Use placeholder images if none provided
  const projects = [
    "/Reviews/1.png",
    "/Reviews/2.png",
    "/Reviews/3.png",
    "/Reviews/4.png",
    "/Reviews/5.png",
    "/Reviews/6.png",
    "/Reviews/7.png",
    "/Reviews/8.png",

  ];
  
  const [activeProject, setActiveProject] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Project cycling logic
  useEffect(() => {
    if (isModalOpen) return; // Pause auto-cycle when modal is open
    const interval = setInterval(() => {
      handleProjectChange((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [projects.length, isModalOpen]);

  const handleProjectChange = (nextIndex: number | ((prev: number) => number)) => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 400); // 400ms glitch duration
    
    if (typeof nextIndex === 'function') {
        setActiveProject(nextIndex);
    } else {
        const next = nextIndex < 0 ? projects.length - 1 : nextIndex >= projects.length ? 0 : nextIndex;
        setActiveProject(next);
    }
  };

  return (
    <section id="freelance" className="min-h-screen bg-black text-gray-200 font-sans selection:bg-yellow-500/30 selection:text-yellow-200 overflow-x-hidden relative">
      
      {/* --- FREELANCE CYBERPUNK BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Floating Particles */}
        <FloatingParticles />
        
        {/* Neon Beams */}
        <NeonBeams />
        
        {/* Cyber Squares */}
        <CyberSquares />
        
        {/* Glowing Accents */}
        <FreelanceGlow />
      </div>

      <div className="relative z-10 py-10 md:py-20 px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* --- SCOPED STYLES FOR FREELANCE SECTION --- */}
        <style>{`
          @keyframes neon-pulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
          @keyframes float-particle {
            0%, 100% { transform: translate(0, 0); opacity: 0.3; }
            50% { transform: translate(20px, -20px); opacity: 0.8; }
          }
          @keyframes beam-sweep {
            0% { top: -100%; opacity: 0; }
            10% { opacity: 0.8; }
            90% { opacity: 0.8; }
            100% { top: 100%; opacity: 0; }
          }
          @keyframes pulse-glow {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          @keyframes scanline {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
          .scanline-anim {
            animation: scanline 2s linear infinite;
          }
          @keyframes glitch-anim-1 {
            0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
            20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
            40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
            60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
            80% { clip-path: inset(10% 0 70% 0); transform: translate(-1px, 1px); }
            100% { clip-path: inset(30% 0 50% 0); transform: translate(1px, -1px); }
          }
          .glitch-active {
            animation: glitch-anim-1 0.3s infinite linear alternate-reverse;
          }
          .clip-corner {
            clip-path: polygon(
              0 0, 
              100% 0, 
              100% calc(100% - 20px), 
              calc(100% - 20px) 100%, 
              0 100%
            );
          }
          .clip-corner-top {
            clip-path: polygon(
              20px 0, 
              100% 0, 
              100% 100%, 
              0 100%, 
              0 20px
            );
          }
          .scrollbar-hide::-webkit-scrollbar {
              display: none;
          }
          .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
          }
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
        
        {/* --- HEADER SECTION --- */}
        <header className="mb-10 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-800 pb-8">
            <div>
                <div className="flex items-center gap-2 text-yellow-500 mb-2 text-xs md:text-sm tracking-widest">
                    <Wifi size={14} className="animate-pulse" />
                    <span>CONNECTION_SECURE</span>
                </div>
                {/* Responsive Font Size */}
                <h2 className="text-3xl md:text-5xl font-cyber font-bold text-white tracking-tighter mb-2">
                    FREELANCE <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">HUB</span>
                </h2>
                <div className="h-1 w-24 bg-yellow-500 mt-2"></div>
            </div>
            
            <div className="text-left md:text-right text-xs md:text-sm text-gray-500 font-mono">
                <p>SYSTEM: IZEE_EDITZ_TERMINAL</p>
                <p>UPTIME: 99.9%</p>
            </div>
        </header>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* --- LEFT COLUMN: STATS & INFO (4 cols) --- */}
            <div className="lg:col-span-4 flex flex-col gap-6 md:gap-8 order-2 lg:order-1">
                
                {/* Profile Module */}
                <div className="bg-[#0a0a0a] border border-gray-800 p-4 md:p-6 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150"></div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1 break-words overflow-hidden">
                        <GlitchText text="IZEE_EDITZ" />
                    </h3>
                    <p className="text-yellow-500 text-xs mb-6 break-words overflow-hidden">
                        <GlitchText text="VIDEO_ENGINEER // LVL.50" />
                    </p>
                    
                    <div className="space-y-4 text-sm text-gray-400">
                        <div className="leading-relaxed whitespace-pre-wrap">
                            <GlitchText text="Specialized in high-octane gaming&#10;montages. 200+ confirmed&#10;deployments. 100% satisfaction&#10;rating." />
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="bg-gray-900 p-3 border-l-2 border-yellow-500">
                            <div className="text-xl md:text-2xl font-bold text-white">200+</div>
                            <div className="text-[10px] uppercase tracking-wider text-gray-500">Projects</div>
                        </div>
                        <div className="bg-gray-900 p-3 border-l-2 border-yellow-500">
                            <div className="text-xl md:text-2xl font-bold text-white">5.0</div>
                            <div className="text-[10px] uppercase tracking-wider text-gray-500">Rating</div>
                        </div>
                    </div>
                </div>

                {/* Fiverr CTA */}
                <div className="bg-yellow-400/5 border border-yellow-400/20 p-4 md:p-6 relative">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-yellow-400 text-black p-1 px-2 md:p-2 font-bold font-mono text-[10px] md:text-xs">NEW</div>
                        <h4 className="font-bold text-yellow-100 text-sm md:text-base">COMMISSIONS OPEN</h4>
                    </div>
                    <p className="text-xs md:text-sm text-gray-400 mb-6">
                        Secure a slot in the render queue. Priority handling for Fiverr Direct clients.
                    </p>
                    <CyberButton onClick={() => window.open('https://fiverr.com/izee_editz', '_blank')}>
                        <span className="flex items-center gap-2 text-xs md:text-sm">
                           <Globe size={16} /> Access Network
                        </span>
                    </CyberButton>
                </div>

                {/* System Stats (Decorative) */}
                <div className="font-mono text-[10px] text-gray-600 space-y-1 mt-auto opacity-50 hidden md:block">
                    <div className="flex justify-between"><span>CPU_LOAD</span><span>12%</span></div>
                    <div className="flex justify-between"><span>MEM_USAGE</span><span>3402MB</span></div>
                    <div className="flex justify-between"><span>NET_SPEED</span><span>1.2GB/s</span></div>
                    <div className="w-full bg-gray-900 h-1 mt-1"><div className="bg-gray-600 h-full w-[12%]"></div></div>
                </div>

            </div>


            {/* --- RIGHT COLUMN: INTERACTIVE VISUALIZER (8 cols) --- */}
            <div className="lg:col-span-8 relative order-1 lg:order-2">
                
                {/* Main Viewport Container */}
                <div className="relative aspect-video bg-black border border-gray-700 shadow-2xl group overflow-hidden">
                    
                    {/* Header Bar of Viewport */}
                    <div className="absolute top-0 left-0 right-0 h-8 md:h-10 bg-gray-900/90 border-b border-gray-700 flex items-center justify-between px-3 md:px-4 z-20 backdrop-blur">
                        <div className="flex items-center gap-4">
                            {/* Hide traffic lights on mobile */}
                            <div className="hidden sm:flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                            </div>
                            <div className="text-[10px] md:text-xs font-mono text-gray-400 flex items-center gap-2">
                                <Monitor size={12} />
                                <span>PLAYBACK_MONITOR</span>
                            </div>
                        </div>
                        <div className="text-[10px] md:text-xs font-mono text-yellow-600 animate-pulse">
                            REC ●
                        </div>
                    </div>

                    {/* Image Display Area */}
                    <div 
                        className="w-full h-full relative overflow-hidden cursor-pointer"
                        onClick={() => setIsModalOpen(true)}
                    >
                        {/* The Image */}
                        <img 
                            src={projects[activeProject]} 
                            alt="Project" 
                            className={`
                                w-full h-full object-contain transition-all duration-300
                                ${isGlitching ? 'glitch-active filter contrast-150 brightness-110' : 'opacity-90 hover:opacity-100'}
                            `}
                        />
                        
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>

                        {/* Center "Click to Expand" Prompt */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                            <div className="bg-black/70 backdrop-blur px-4 py-2 md:px-6 md:py-3 border border-yellow-400 text-yellow-400 font-mono text-xs md:text-sm tracking-widest flex items-center gap-2 clip-corner scale-90 md:scale-100">
                                <Maximize2 size={16} /> <span className="hidden sm:inline">INSPECT_VISUAL</span><span className="sm:hidden">VIEW</span>
                            </div>
                        </div>

                        {/* Scanline Effect */}
                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[size:100%_4px] z-10 opacity-50"></div>
                        
                        {/* Glitch Overlay blocks */}
                        {isGlitching && (
                            <div className="absolute inset-0 z-20 bg-yellow-400/10 mix-blend-color-dodge"></div>
                        )}
                    </div>

                    {/* Navigation Buttons (Absolute) - Smaller touch targets on mobile */}
                    <button 
                        onClick={(e) => { e.stopPropagation(); handleProjectChange(p => p - 1); }}
                        className="absolute left-0 top-10 bottom-0 w-12 md:w-16 bg-gradient-to-r from-black/60 to-transparent z-20 flex items-center justify-center transition-opacity hover:from-black/80"
                        aria-label="Previous review"
                    >
                        <ChevronLeft className="text-white/70 hover:text-yellow-400 transition-colors" size={24} />
                    </button>
                    <button 
                        onClick={(e) => { e.stopPropagation(); handleProjectChange(p => p + 1); }}
                        className="absolute right-0 top-10 bottom-0 w-12 md:w-16 bg-gradient-to-l from-black/60 to-transparent z-20 flex items-center justify-center transition-opacity hover:from-black/80"
                        aria-label="Next review"
                    >
                        <ChevronRight className="text-white/70 hover:text-yellow-400 transition-colors" size={24} />
                    </button>

                    {/* Bottom Info Bar inside Viewport */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur border-t border-gray-700 p-3 md:p-4 flex items-center justify-between z-20">
                        <div className="flex items-center gap-3 md:gap-4">
                            <div className="font-mono text-yellow-400 text-lg md:text-xl font-bold">
                                {String(activeProject + 1).padStart(2, '0')}
                            </div>
                            <div className="h-6 md:h-8 w-px bg-gray-700 hidden sm:block"></div>
                            <div className="hidden sm:block">
                                <div className="text-xs text-gray-400 uppercase tracking-wider">Project ID</div>
                                <div className="text-white font-mono text-sm">PRJ_GAMING_{8402 + activeProject}</div>
                            </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="flex items-center gap-2 md:gap-3">
                            <div className="w-20 md:w-32 h-1 bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-yellow-400 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(250,204,21,0.8)]"
                                    style={{ width: ((activeProject + 1) / projects.length) * 100 + '%' }}
                                ></div>
                            </div>
                            <Cpu size={14} className="text-gray-500" />
                        </div>
                    </div>
                </div>

                {/* Thumbnails Row - Swipeable on mobile */}
                <div className="flex gap-3 md:gap-4 mt-4 md:mt-6 overflow-x-auto pb-4 scrollbar-hide snap-x">
                    {projects.map((src, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleProjectChange(idx)}
                            className={`
                                relative h-16 w-24 md:h-20 md:w-32 flex-shrink-0 border transition-all duration-300 overflow-hidden snap-start
                                ${activeProject === idx 
                                    ? 'border-yellow-400 opacity-100 scale-105' 
                                    : 'border-gray-800 opacity-50 hover:opacity-80 hover:border-gray-600'
                                }
                            `}
                        >
                            <img src={src} alt="" className="w-full h-full object-cover" />
                            {activeProject === idx && (
                                <div className="absolute inset-0 bg-yellow-400/10 animate-pulse"></div>
                            )}
                        </button>
                    ))}
                </div>

            </div>
        </div>

      </div>

      {/* --- POPUP COMPONENT --- */}
      <TacticalModal 
         isOpen={isModalOpen} 
         onClose={() => setIsModalOpen(false)} 
         imageSrc={projects[activeProject]}
         index={activeProject + 1}
      />

    </section>
  );
};

export default Freelance;