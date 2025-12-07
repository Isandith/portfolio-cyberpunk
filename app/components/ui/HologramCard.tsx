import React from 'react';
import CyberReveal from '../utils/CyberReveal';

interface HologramCardProps {
  title: string;
  icon: React.ReactNode;
  items: string[];
  delay?: number;
}

const HologramCard: React.FC<HologramCardProps> = ({ title, icon, items, delay = 0 }) => (
  <CyberReveal delay={delay}>
    <div
      className="relative group border border-cyan-500/30 bg-black/40 backdrop-blur-sm p-6 hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.15)] overflow-hidden"
    >
      {/* Scanning Line Effect */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400/50 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-cyan-400 transition-all duration-300 group-hover:w-4 group-hover:h-4"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-cyan-400 transition-all duration-300 group-hover:w-4 group-hover:h-4"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-cyan-400 transition-all duration-300 group-hover:w-4 group-hover:h-4"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-cyan-400 transition-all duration-300 group-hover:w-4 group-hover:h-4"></div>
      <div className="flex items-center gap-3 mb-4 text-cyan-400 group-hover:text-cyan-300 transition-colors">
        <div className="group-hover:animate-bounce">{icon}</div>
        <h3 className="font-mono text-lg font-bold tracking-wider">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item, idx) => (
          <span
            key={idx}
            className="px-2 py-1 text-xs font-mono text-cyan-100 bg-cyan-900/30 border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-400 cursor-crosshair transition-all hover:scale-105"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  </CyberReveal>
);

export default HologramCard;
