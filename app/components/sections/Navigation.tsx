import React, { useState } from 'react';
import { Cpu, Menu, X } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#050505]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => handleNavigate('home')}>
          <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 group-hover:animate-spin transition-all duration-700" />
          <span className="font-cyber font-bold text-base sm:text-xl tracking-widest text-white group-hover:text-cyan-400 transition-colors">
            ISANDITH<span className="text-cyan-400 group-hover:text-white">.DEV</span>
          </span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 lg:gap-8 font-mono text-sm tracking-wider">
          {['Home', 'Skills', 'Projects', 'Career', 'Freelance', 'Contact'].map((item, idx) => (
            <button 
              key={item}
              onClick={() => handleNavigate(item.toLowerCase())}
              className={`uppercase hover:text-cyan-400 transition-colors relative group ${activeSection === item.toLowerCase() ? 'text-cyan-400' : 'text-gray-400'} nav-delay-${idx}`}
            >
              <span className="relative z-10">{item}</span>
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-cyan-400 transform origin-left transition-transform duration-300 ${activeSection === item.toLowerCase() ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`}></span>
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-cyan-400 hover:text-cyan-300 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[#050505]/95 backdrop-blur-md border-b border-white/10 animate-[slideDown_0.3s_ease-out]">
          <div className="flex flex-col px-4 py-4 gap-4">
            {['Home', 'Skills', 'Projects', 'Career', 'Freelance', 'Contact'].map((item, idx) => (
              <button 
                key={item}
                onClick={() => handleNavigate(item.toLowerCase())}
                className={`uppercase text-left py-2 px-4 hover:bg-cyan-400/10 border-l-2 transition-all ${
                  activeSection === item.toLowerCase() 
                    ? 'text-cyan-400 border-cyan-400 bg-cyan-400/5' 
                    : 'text-gray-400 border-transparent hover:border-cyan-400/50'
                } font-mono text-sm tracking-wider`}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
};

export default Navigation;
