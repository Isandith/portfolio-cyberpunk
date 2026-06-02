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
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm overflow-hidden">
          {/* Circuit grid background */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(34,211,238,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.3)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

          {/* Corner brackets */}
          <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400" style={{ boxShadow: '0 0 8px rgba(34,211,238,0.6)' }}></div>
          <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyan-400" style={{ boxShadow: '0 0 8px rgba(34,211,238,0.6)' }}></div>
          <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyan-400" style={{ boxShadow: '0 0 8px rgba(34,211,238,0.6)' }}></div>
          <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400" style={{ boxShadow: '0 0 8px rgba(34,211,238,0.6)' }}></div>

          <div className="flex flex-col items-center gap-3 relative z-10">
            {/* Multi-ring spinner */}
            <div className="relative w-14 h-14">
              {/* Outer static ring */}
              <div className="absolute inset-0 border border-cyan-500/20 rounded-full"></div>
              {/* Outer spinning ring */}
              <div
                className="absolute inset-0 border-2 border-transparent border-t-cyan-400 border-r-cyan-400/40 rounded-full animate-spin"
                style={{ animationDuration: '1.4s', boxShadow: '0 0 10px rgba(34,211,238,0.5)' }}
              ></div>
              {/* Middle static ring */}
              <div className="absolute inset-[6px] border border-fuchsia-500/20 rounded-full"></div>
              {/* Middle spinning ring */}
              <div
                className="absolute inset-[6px] border-2 border-transparent border-t-fuchsia-400 border-l-fuchsia-400/40 rounded-full animate-spin"
                style={{ animationDuration: '0.9s', animationDirection: 'reverse', boxShadow: '0 0 8px rgba(217,70,239,0.5)' }}
              ></div>
              {/* Inner spinning ring */}
              <div
                className="absolute inset-[12px] border-2 border-transparent border-t-cyan-300 rounded-full animate-spin"
                style={{ animationDuration: '0.55s' }}
              ></div>
              {/* Center pulse dot */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" style={{ boxShadow: '0 0 6px rgba(34,211,238,0.9)' }}></div>
              </div>
            </div>

            {/* Progress shimmer bar */}
            <div className="w-20 h-[2px] bg-gray-800 overflow-hidden relative">
              <div
                className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-[cp-shimmer_1s_ease-in-out_infinite]"
              ></div>
            </div>

            {/* Label */}
            <div className="font-mono text-[10px] tracking-[0.3em] text-cyan-400" style={{ textShadow: '0 0 8px rgba(34,211,238,0.7)' }}>
              INIT<span className="animate-[cp-blink_0.6s_step-end_infinite]">_</span>
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
        @keyframes cp-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes cp-shimmer {
          0% { transform: translateX(-32px); }
          100% { transform: translateX(80px); }
        }
      `}</style>
    </div>
  );
};

export default CyberProcess;
