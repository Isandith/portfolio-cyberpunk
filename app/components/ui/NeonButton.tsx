import React from 'react';

type NeonButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  color?: 'cyan' | 'magenta' | 'yellow';
  className?: string;
};

const NeonButton: React.FC<NeonButtonProps> = ({ children, onClick, color = 'cyan', className = '' }) => {
  const colorClasses: Record<'cyan' | 'magenta' | 'yellow', string> = {
    cyan: 'border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]',
    magenta: 'border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500/10 hover:shadow-[0_0_20px_rgba(217,70,239,0.4)]',
    yellow: 'border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 hover:shadow-[0_0_20px_rgba(250,204,21,0.4)]'
  };

  return (
    <button
      onClick={onClick}
      className={`
        relative px-6 py-3 font-mono font-bold tracking-widest uppercase transition-all duration-300
        border-2 clip-path-polygon overflow-hidden group ${colorClasses[color]} ${className}
      `}
    >
      <span className="relative z-10">{children}</span>
      {/* Button Glitch Hover Effect */}
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
    </button>
  );
};

export default NeonButton;
