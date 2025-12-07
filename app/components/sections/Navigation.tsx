import React from 'react';
import { Cpu } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, onNavigate }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#050505]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => onNavigate('home')}>
          <Cpu className="text-cyan-400 group-hover:animate-spin transition-all duration-700" />
          <span className="font-cyber font-bold text-xl tracking-widest text-white group-hover:text-cyan-400 transition-colors">
            ISANDITH<span className="text-cyan-400 group-hover:text-white">.DEV</span>
          </span>
        </div>
        
        <div className="hidden md:flex gap-8 font-mono text-sm tracking-wider">
          {['Home', 'Skills', 'Projects', 'Freelance', 'Contact'].map((item, idx) => (
            <button 
              key={item}
              onClick={() => onNavigate(item.toLowerCase())}
              className={`uppercase hover:text-cyan-400 transition-colors relative group ${activeSection === item.toLowerCase() ? 'text-cyan-400' : 'text-gray-400'} nav-delay-${idx}`}
            >
              <span className="relative z-10">{item}</span>
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-cyan-400 transform origin-left transition-transform duration-300 ${activeSection === item.toLowerCase() ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`}></span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
