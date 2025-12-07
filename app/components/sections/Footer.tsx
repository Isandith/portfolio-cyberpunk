import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-black border-t border-gray-900 text-center font-mono text-xs text-gray-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <p className="relative z-10">&copy; 2077 ISANDITH PERERA. ALL RIGHTS RESERVED.</p>
      <p className="mt-2 text-cyan-900 relative z-10 animate-pulse">SYSTEM STATUS: ONLINE</p>
    </footer>
  );
};

export default Footer;
