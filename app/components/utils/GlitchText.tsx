import React from 'react';

type GlitchTextProps = {
  text: string;
  as?: React.ElementType;
  className?: string;
};

const GlitchText: React.FC<GlitchTextProps> = ({ text, as: Component = 'span', className = '' }) => {
  const Tag = Component as any;
  return (
    <Tag className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-0 group-hover:opacity-70 group-hover:animate-glitch-1 translate-x-[2px]">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-blue-500 opacity-0 group-hover:opacity-70 group-hover:animate-glitch-2 -translate-x-[2px]">
        {text}
      </span>
    </Tag>
  );
};

export default GlitchText;
