import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import CyberReveal from '../utils/CyberReveal';
import CyberProcess from '../utils/CyberProcess';
import ProjectCard from '../ui/ProjectCard';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
}

// --- HACKING/CYBERWARE THEMED BACKGROUND COMPONENTS ---

const BinaryRain = ({ speed, delay, left }: { speed: number; delay: number; left: string }) => {
  const generate = () => Array.from({ length: 25 }, () => Math.random() > 0.5 ? '1' : '0');
  const [chars, setChars] = useState<string[]>([]);
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChars(generate());
    
    const interval = setInterval(() => setChars(generate()), 100);
    return () => clearInterval(interval);
  }, []);

  // Don't render until chars are populated on client
  if (chars.length === 0) return null;

  return (
    <div 
      className="absolute top-0 text-[14px] font-mono leading-tight text-fuchsia-400/60 select-none animate-hack-rain"
      style={{ 
        left, 
        animationDuration: `${speed}s`, 
        animationDelay: `${delay}s`,
        textShadow: '0 0 10px rgba(217,70,239,0.8), 0 0 15px rgba(217,70,239,0.5)'
      }}
    >
      {chars.map((char, i) => (
        <div key={i} className="opacity-85">
          {char}
        </div>
      ))}
    </div>
  );
};

const HackingTerminal = () => {
  const commands = [
    "> ssh root@target.sys",
    "> BREACH_INITIATED...",
    "> UPLOADING_MALWARE.exe",
    "> BYPASSING_ICE_PROTOCOL",
    "> ACCESS_GRANTED",
    "> EXTRACTING_DATA...",
    "> CYBERWARE_IMPLANT_ACTIVE",
    "> NEURAL_LINK_ESTABLISHED",
  ];

  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-10 w-48 md:w-72 h-40 overflow-hidden opacity-40 pointer-events-none font-mono text-xs text-fuchsia-400/90 z-0" style={{ textShadow: '0 0 8px rgba(217,70,239,0.6)' }}>
      <div className="flex flex-col gap-1 animate-[scroll-up_12s_linear_infinite]">
        {[...commands, ...commands, ...commands].map((cmd, i) => (
          <div key={i} className="whitespace-nowrap text-[10px] md:text-xs">
            {cmd}
          </div>
        ))}
      </div>
    </div>
  );
};

const CyberwareHUD = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-35">
    {/* Corner brackets - hacking interface style */}
    <div className="absolute top-10 left-10 w-20 h-20 border-l-2 border-t-2 border-fuchsia-400/70" style={{ boxShadow: '0 0 10px rgba(217,70,239,0.4)' }}></div>
    <div className="absolute top-10 right-10 w-20 h-20 border-r-2 border-t-2 border-fuchsia-400/70" style={{ boxShadow: '0 0 10px rgba(217,70,239,0.4)' }}></div>
    <div className="absolute bottom-10 left-10 w-20 h-20 border-l-2 border-b-2 border-fuchsia-400/70" style={{ boxShadow: '0 0 10px rgba(217,70,239,0.4)' }}></div>
    <div className="absolute bottom-10 right-10 w-20 h-20 border-r-2 border-b-2 border-fuchsia-400/70" style={{ boxShadow: '0 0 10px rgba(217,70,239,0.4)' }}></div>
    
    {/* Scanning lines */}
    <div className="absolute top-1/4 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-fuchsia-400/60 to-transparent animate-[scan-line_6s_ease-in-out_infinite]" style={{ boxShadow: '0 0 12px rgba(217,70,239,0.6)' }}></div>
    <div className="absolute top-3/4 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-fuchsia-400/60 to-transparent animate-[scan-line_8s_ease-in-out_infinite_reverse]" style={{ boxShadow: '0 0 12px rgba(217,70,239,0.6)' }}></div>
  </div>
);

const GlitchOverlay = () => (
  <div className="absolute inset-0 pointer-events-none z-[1] opacity-20">
    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(217,70,239,0.08)_2px,rgba(217,70,239,0.08)_4px)]"></div>
  </div>
);

const PulsingCircuits = () => (
  <div className="absolute inset-0 pointer-events-none z-0 opacity-30">
    <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-fuchsia-400/50 rounded-full animate-[pulse-ring_3s_ease-in-out_infinite]" style={{ boxShadow: '0 0 15px rgba(217,70,239,0.4)' }}></div>
    <div className="absolute bottom-1/3 right-1/4 w-40 h-40 border-2 border-fuchsia-400/40 rounded-full animate-[pulse-ring_4s_ease-in-out_infinite_reverse]" style={{ boxShadow: '0 0 15px rgba(217,70,239,0.3)' }}></div>
    <div className="absolute top-1/2 right-1/3 w-24 h-24 border-2 border-fuchsia-400/45 rounded-full animate-[pulse-ring_3.5s_ease-in-out_infinite]" style={{ boxShadow: '0 0 12px rgba(217,70,239,0.3)' }}></div>
  </div>
);

const GlowingAccents = () => (
  <>
    <div className="absolute top-20 left-10 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-[100px] animate-[pulse-glow_4s_ease-in-out_infinite]"></div>
    <div className="absolute bottom-20 right-10 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-[120px] animate-[pulse-glow_5s_ease-in-out_infinite_reverse]"></div>
  </>
);

// --- MAIN PROJECTS COMPONENT ---

interface Project {
  id: string | number;
  title: string;
  tech: string;
  desc: string;
  details: string;
  image?: string;
  url?: string;
}

interface ProjectsProps {
  selectedProject: Project | null;
  onSelectProject: (project: Project | null) => void;
}

const Projects: React.FC<ProjectsProps> = ({ selectedProject, onSelectProject }) => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/Isandith/repos')
      .then(res => res.json())
      .then(data => {
        setRepos(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch repos:', err);
        setLoading(false);
      });
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  return (
    <>
      <section id="projects" className="py-20 relative bg-black overflow-hidden">
        
        {/* --- BACKGROUND ANIMATIONS & STYLES --- */}
        <style>{`
          @keyframes hack-rain {
            0% { transform: translateY(-100%); opacity: 0; }
            10% { opacity: 0.8; }
            90% { opacity: 0.8; }
            100% { transform: translateY(100vh); opacity: 0; }
          }
          @keyframes scroll-up {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
          @keyframes scan-line {
            0%, 100% { transform: translateX(-100%); opacity: 0; }
            50% { transform: translateX(0); opacity: 1; }
          }
          @keyframes data-transfer {
            0% { transform: translateX(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateX(100vw); opacity: 0; }
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

        {/* --- HACKING/CYBERWARE THEMED BACKGROUND LAYERS --- */}
        
        {/* 1. Binary Rain (Matrix-style with green theme) */}
        <div className="hidden md:block absolute inset-0 z-0 overflow-hidden">
          <BinaryRain speed={6} delay={0} left="8%" />
          <BinaryRain speed={8} delay={1} left="20%" />
          <BinaryRain speed={7} delay={2} left="35%" />
          <BinaryRain speed={9} delay={0.5} left="50%" />
          <BinaryRain speed={6.5} delay={1.5} left="65%" />
          <BinaryRain speed={8.5} delay={3} left="80%" />
          <BinaryRain speed={7.5} delay={2.5} left="92%" />
        </div>

        {/* 2. Hacking Terminal Commands */}
        <HackingTerminal />

        {/* 3. Cyberware HUD Elements */}
        <CyberwareHUD />
        {/* 5. Pulsing Circuit Rings */}
        <PulsingCircuits />

        {/* 6. Glowing Accents */}
        <GlowingAccents />

        {/* 7. Glitch Overlay */}
        <GlitchOverlay />

        {/* --- CONTENT --- */}
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <CyberReveal>
            <h2 className="text-4xl font-cyber font-bold text-white mb-2">
              WHAT I&apos;VE <span className="text-fuchsia-500">BUILT</span>
            </h2>
            <p className="font-mono text-gray-500 mb-12">Auto-loaded from GitHub. Click data cards for expanded view.</p>
          </CyberReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <>
                <style>{`
                  @keyframes skel-shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(200%); }
                  }
                  @keyframes skel-pulse-border {
                    0%, 100% { border-color: rgba(217,70,239,0.15); box-shadow: none; }
                    50% { border-color: rgba(217,70,239,0.5); box-shadow: 0 0 18px rgba(217,70,239,0.15); }
                  }
                `}</style>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="border bg-black overflow-hidden"
                    style={{
                      animation: `skel-pulse-border 2s ease-in-out ${i * 0.2}s infinite`,
                      borderColor: 'rgba(217,70,239,0.15)'
                    }}
                  >
                    {/* Image placeholder */}
                    <div className="h-48 bg-gray-900 relative overflow-hidden">
                      <div
                        className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-fuchsia-500/10 to-transparent"
                        style={{ animation: `skel-shimmer 1.8s linear ${i * 0.15}s infinite` }}
                      ></div>
                      {/* Tech tag placeholder */}
                      <div className="absolute top-2 right-2 w-14 h-5 bg-fuchsia-900/30 border border-fuchsia-500/20"></div>
                      {/* Corner markers */}
                      <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-fuchsia-500/40"></div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-fuchsia-500/40"></div>
                    </div>
                    {/* Content placeholder */}
                    <div className="p-4 space-y-3 bg-black min-h-[180px]">
                      <div className="h-4 bg-fuchsia-900/25 w-3/4 relative overflow-hidden">
                        <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-fuchsia-400/15 to-transparent" style={{ animation: `skel-shimmer 1.8s linear ${i * 0.15 + 0.3}s infinite` }}></div>
                      </div>
                      <div className="h-3 bg-gray-800/80 w-full relative overflow-hidden">
                        <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent" style={{ animation: `skel-shimmer 1.8s linear ${i * 0.15 + 0.5}s infinite` }}></div>
                      </div>
                      <div className="h-3 bg-gray-800/80 w-5/6 relative overflow-hidden">
                        <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent" style={{ animation: `skel-shimmer 1.8s linear ${i * 0.15 + 0.6}s infinite` }}></div>
                      </div>
                      <div className="h-3 bg-gray-800/60 w-2/3 relative overflow-hidden">
                        <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent" style={{ animation: `skel-shimmer 1.8s linear ${i * 0.15 + 0.7}s infinite` }}></div>
                      </div>
                      <div className="pt-3 flex items-center gap-2">
                        <div className="h-3 bg-fuchsia-900/30 w-24 relative overflow-hidden">
                          <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-fuchsia-400/15 to-transparent" style={{ animation: `skel-shimmer 1.8s linear ${i * 0.15 + 0.9}s infinite` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : repos.length === 0 ? (
              <div className="text-gray-500 font-mono">No projects found.</div>
            ) : (
              repos.map((repo, index) => (
                <CyberProcess key={repo.id} delay={index * 100}>
                  <ProjectCard
                    project={{
                      id: repo.id,
                      title: repo.name,
                      tech: repo.language || 'Unknown',
                      desc: repo.description || 'No description provided.',
                      details: `Stars: ${repo.stargazers_count} | Forks: ${repo.forks_count}`,
                      image: undefined,
                      url: repo.html_url
                    }}
                    onClick={onSelectProject}
                    index={index}
                  />
                </CyberProcess>
              ))
            )}
          </div>
        </div>
      </section>

      {/* --- PROJECT MODAL --- */}
      {selectedProject && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-[50] bg-black/90 backdrop-blur-md"
            onClick={() => onSelectProject(null)}
          />
          
          {/* Modal Container */}
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
            <div className="relative w-full max-w-3xl bg-[#0a0a0f] border border-fuchsia-500 shadow-[0_0_30px_rgba(217,70,239,0.2)] animate-modal-in overflow-hidden max-h-[90vh] flex flex-col pointer-events-auto">
               {/* CRT Scan line for modal */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent h-[10px] w-full animate-[scanline_2s_linear_infinite] opacity-10 pointer-events-none"></div>

              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-fuchsia-500/30 bg-fuchsia-950/20 flex-shrink-0">
                <h3 className="font-cyber text-2xl text-white">
                  {selectedProject.title}
                </h3>
                <button 
                  onClick={() => onSelectProject(null)}
                  aria-label="Close project modal"
                  className="text-fuchsia-500 hover:text-white transition-colors hover:rotate-90 duration-300 flex-shrink-0 text-2xl"
                >
                  ✕
                </button>
              </div>
              
              {/* Content */}
              <div className="p-8 grid md:grid-cols-2 gap-8 overflow-y-auto">
                {/* Project Image View */}
                <div className="aspect-video bg-gray-900 border border-gray-700 flex items-center justify-center relative group overflow-hidden flex-shrink-0">
                   <div className="absolute inset-0 bg-fuchsia-500/10 group-hover:bg-transparent transition-colors"></div>
                   {selectedProject.image ? (
                     <Image 
                       src={selectedProject.image} 
                       alt={selectedProject.title}
                       fill
                       className="object-cover group-hover:scale-110 transition-transform duration-500"
                     />
                   ) : (
                     <div className="text-gray-700 w-16 h-16 group-hover:text-fuchsia-400 transition-colors">📊</div>
                   )}
                   {/* Corner markers */}
                   <div className="absolute top-2 left-2 w-2 h-2 bg-fuchsia-500"></div>
                   <div className="absolute bottom-2 right-2 w-2 h-2 bg-fuchsia-500"></div>
                </div>
                
                <div className="font-mono space-y-4">
                   <div className="inline-block px-2 py-1 bg-fuchsia-900/30 text-fuchsia-400 text-xs border border-fuchsia-500/30">
                     {selectedProject.tech}
                   </div>
                   
                   <p className="text-gray-300 leading-relaxed">
                     {selectedProject.desc}
                   </p>
                   
                   <div className="border-l-2 border-fuchsia-500 pl-4 text-sm text-gray-400 italic">
                     &quot;{selectedProject.details}&quot;
                   </div>

                   <div className="pt-6 flex flex-col gap-3">
                      <a href={selectedProject.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-fuchsia-400 hover:text-white transition-colors uppercase text-sm font-bold tracking-wider group">
                        🔗 Access Repository
                      </a>
                      <button
                        onClick={() => onSelectProject(null)}
                        className="flex items-center gap-2 text-fuchsia-400 hover:text-white transition-colors uppercase text-sm font-bold tracking-wider border border-fuchsia-400 px-4 py-2 hover:bg-fuchsia-500/10"
                      >
                        Close Modal
                      </button>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Projects;