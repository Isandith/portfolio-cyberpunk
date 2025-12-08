import React from 'react';
import { Phone, Linkedin, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-black border-t border-cyan-900/30 font-mono text-xs text-gray-600 relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0 animate-pulse"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(6,182,212,0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(6,182,212,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Contact Info */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-6">
          
          {/* Phone */}
          <a 
            href="tel:+94741198772"
            className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-colors duration-300 group text-xs sm:text-sm"
          >
            <Phone className="w-3 h-3 sm:w-4 sm:h-4 group-hover:animate-pulse flex-shrink-0" />
            <span className="tracking-wider">+94 741198772</span>
          </a>

          {/* Divider */}
          <div className="hidden md:block w-px h-4 bg-cyan-900/50"></div>

          {/* LinkedIn */}
          <a 
            href="https://www.linkedin.com/in/isandith-perera-1b55b7294/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-colors duration-300 group text-xs sm:text-sm"
          >
            <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 group-hover:animate-pulse flex-shrink-0" />
            <span className="tracking-wider">LINKEDIN</span>
          </a>

          {/* Divider */}
          <div className="hidden md:block w-px h-4 bg-cyan-900/50"></div>

          {/* Address */}
          <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm text-center md:text-left">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="tracking-wider">316/3, THALANGAMA NORTH, BATTARAMULLA</span>
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-900/50 to-transparent mb-4"></div>

        {/* Copyright & Status */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-center md:text-left text-xs">
          <p className="text-gray-700 tracking-wider text-[10px] sm:text-xs">
            &copy; 2025 ISANDITH PERERA. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-500 rounded-full animate-pulse"></div>
            <span className="text-cyan-900 tracking-wider text-[10px] sm:text-xs">SYSTEM_ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
