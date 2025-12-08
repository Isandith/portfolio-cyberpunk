import React, { useState, useRef, useEffect } from 'react';

interface CyberProcessProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const CyberProcess: React.FC<CyberProcessProps> = ({ children, className = '', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsProcessing(true);
            setTimeout(() => {
              setIsVisible(true);
              setIsProcessing(false);
            }, 400);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Processing Overlay */}
      {isProcessing && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-lg">
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            {/* Spinning Loader */}
            <div className="relative w-8 h-8 sm:w-12 sm:h-12">
              <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-full"></div>
              <div className="absolute inset-0 border-2 border-transparent border-t-cyan-400 rounded-full animate-spin"></div>
              <div className="absolute inset-1 sm:inset-2 border-2 border-transparent border-t-fuchsia-400 rounded-full animate-spin" style={{ animationDuration: '0.8s', animationDirection: 'reverse' }}></div>
            </div>
            {/* Processing Text */}
            <div className="font-mono text-[10px] sm:text-xs text-cyan-400 tracking-widest animate-pulse">
              LOADING<span className="animate-[blink_1s_ease-in-out_infinite]">_</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Content */}
      <div
        className={`transition-all duration-700 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-5 sm:translate-y-10 blur-sm'
        }`}
      >
        {children}
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default CyberProcess;
