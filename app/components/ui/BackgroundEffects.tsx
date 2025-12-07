import React from 'react';

const BackgroundEffects: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Animated Perspective Grid */}
      <div className="absolute inset-0 top-1/2 bg-grid-pattern opacity-20 h-[200%] origin-top"></div>
      <div className="scanline"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.03),transparent_70%)]"></div>
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>
    </div>
  );
};

export default BackgroundEffects;
