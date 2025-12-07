import React from 'react';
import CyberReveal from '../utils/CyberReveal';
import GlitchText from '../utils/GlitchText';
import ScrambleTitle from '../utils/ScrambleTitle';
import NeonButton from '../ui/NeonButton';
import { User } from 'lucide-react';

interface HeroProps {
  onNavigate: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section id="home" className="relative pt-32 pb-20 min-h-screen flex items-center justify-center overflow-hidden">
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

        {/* Cyberpunk Portrait Placeholder */}
        <CyberReveal delay={400} className="w-full flex justify-center lg:justify-end">
          <div className="relative group w-full max-w-md">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-fuchsia-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <div className="relative aspect-square w-full bg-black border border-white/10 flex items-center justify-center overflow-hidden clip-path-polygon group-hover:border-cyan-400/50 transition-colors">
               
               {/* Rotating Rings Background */}
               <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <div className="w-[80%] h-[80%] border border-cyan-500 rounded-full animate-[spin_10s_linear_infinite]"></div>
                  <div className="absolute w-[60%] h-[60%] border border-fuchsia-500 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
               </div>

               <User className="w-32 h-32 text-gray-700 relative z-10" />
               
               <div className="absolute bottom-4 left-4 bg-black/80 border border-cyan-500 px-3 py-1 font-mono text-xs text-cyan-400">
                 ID: <ScrambleTitle text="ISANDITH_P" />
               </div>
               
               {/* HUD Elements */}
               <div className="absolute top-4 right-4 flex flex-col gap-1">
                 <div className="w-16 h-1 bg-cyan-500/50 animate-pulse"></div>
                 <div className="w-10 h-1 bg-cyan-500/30"></div>
                 <div className="w-4 h-1 bg-cyan-500/10"></div>
               </div>
            </div>
          </div>
        </CyberReveal>

      </div>
    </section>
  );
};

export default Hero;
