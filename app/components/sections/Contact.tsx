import React, { useState, useEffect } from 'react';
import { User, Mail, Send, Terminal, Cpu, ShieldCheck } from 'lucide-react';

// --- UTILITY COMPONENTS (Inlined for portability) ---

// 1. Moving Grid Background
const CyberGrid = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-black perspective-1000">
    {/* Grid Floor */}
    <div className="absolute inset-0 opacity-25 sm:opacity-35 transform rotate-x-60 scale-150 origin-top animate-grid-flow"
         style={{
           backgroundImage: `
             linear-gradient(to right, rgba(34,211,238,0.5) 1px, transparent 1px),
             linear-gradient(to bottom, rgba(34,211,238,0.5) 1px, transparent 1px)
           `,
           backgroundSize: '30px 30px',
           height: '200%',
           filter: 'drop-shadow(0 0 5px rgba(6,182,212,0.3))'
         }}
    />
    {/* Horizon Glow */}
    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black via-black/80 to-transparent z-10"></div>
    <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
  </div>
);

// 2. Glitch Text Component
const GlitchText = ({ text, color = "cyan" }: { text: string, color?: "cyan" | "fuchsia" }) => {
  const baseColor = color === "cyan" ? "text-cyan-400" : "text-fuchsia-400";
  
  return (
    <div className="relative inline-block group">
      <span className={`relative z-10 ${baseColor} font-bold tracking-wider sm:tracking-widest text-sm sm:text-base`}>{text}</span>
      <span className={`hidden sm:block absolute top-0 left-0 -z-10 w-full text-red-500 opacity-0 group-hover:opacity-70 animate-glitch-1`}>{text}</span>
      <span className={`hidden sm:block absolute top-0 left-0 -z-10 w-full text-blue-500 opacity-0 group-hover:opacity-70 animate-glitch-2`}>{text}</span>
    </div>
  );
};

// --- MAIN FORM COMPONENTS ---

interface CyberInputProps {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  label: string;
  type?: string;
  placeholder: string;
  color?: 'cyan' | 'fuchsia';
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
}

const CyberInput = ({ icon: Icon, label, type = "text", placeholder, color = "cyan", name, value, onChange, required = false }: CyberInputProps) => {
  const [focused, setFocused] = useState(false);
  
  const borderColor = focused 
    ? (color === "cyan" ? "border-cyan-400" : "border-fuchsia-400") 
    : "border-gray-800";
    
  const shadowClass = focused 
    ? (color === "cyan" ? "shadow-[0_0_15px_rgba(34,211,238,0.3)]" : "shadow-[0_0_15px_rgba(217,70,239,0.3)]") 
    : "";

  return (
    <div className="group space-y-2 relative">
      <label className={`text-xs font-mono tracking-widest transition-colors duration-300 ${focused ? `text-${color}-400` : 'text-gray-500'}`}>
        {`//${label}_`}
      </label>
      <div className={`relative bg-black/80 border-2 ${borderColor} transition-all duration-300 ${shadowClass}`}>
        {/* Decorative corner markers */}
        <div className={`absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 ${focused ? `border-${color}-400` : 'border-transparent'} transition-all`} />
        <div className={`absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 ${focused ? `border-${color}-400` : 'border-transparent'} transition-all`} />
        
        <div className="flex items-center px-4 py-3">
          <Icon className={`w-5 h-5 mr-3 transition-colors ${focused ? `text-${color}-400` : 'text-gray-600'}`} />
          {type === 'textarea' ? (
             <textarea 
               name={name}
               value={value}
               onChange={onChange}
               required={required}
               rows={4}
               className="w-full bg-transparent border-none focus:outline-none text-gray-100 font-mono placeholder-gray-700 resize-none"
               placeholder={placeholder}
               onFocus={() => setFocused(true)}
               onBlur={() => setFocused(false)}
             />
          ) : (
            <input 
              type={type}
              name={name}
              value={value}
              onChange={onChange}
              required={required}
              className="w-full bg-transparent border-none focus:outline-none text-gray-100 font-mono placeholder-gray-700"
              placeholder={placeholder}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
          )}
        </div>
        
        {/* Animated Loading Bar on Focus */}
        <div className={`absolute bottom-0 left-0 h-0.5 bg-${color}-500 transition-all duration-500 ease-out ${focused ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
      </div>
    </div>
  );
};

const Contact = () => {
  const [isHoveringSubmit, setIsHoveringSubmit] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen bg-black text-gray-100 font-mono relative overflow-hidden selection:bg-cyan-500/30 selection:text-cyan-200" ref={containerRef}>
      
      {/* GLOBAL STYLES & ANIMATIONS */}
      <style>{`
        @keyframes grid-flow {
          0% { transform: perspective(500px) rotateX(60deg) translateY(0); }
          100% { transform: perspective(500px) rotateX(60deg) translateY(40px); }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes glitch-1 {
          0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
          20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
          40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
          60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
          80% { clip-path: inset(10% 0 60% 0); transform: translate(-1px, 1px); }
          100% { clip-path: inset(30% 0 30% 0); transform: translate(1px, -1px); }
        }
        @keyframes glitch-2 {
          0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -1px); }
          20% { clip-path: inset(80% 0 5% 0); transform: translate(-2px, 2px); }
          40% { clip-path: inset(30% 0 20% 0); transform: translate(2px, 1px); }
          60% { clip-path: inset(15% 0 80% 0); transform: translate(-1px, -2px); }
          80% { clip-path: inset(55% 0 10% 0); transform: translate(1px, 2px); }
          100% { clip-path: inset(40% 0 30% 0); transform: translate(-2px, 1px); }
        }
        .animate-grid-flow { animation: ${isVisible ? 'grid-flow 2s linear infinite' : 'none'}; }
        .animate-scanline { animation: ${isVisible ? 'scanline 8s linear infinite' : 'none'}; }
        .animate-glitch-1 { animation: ${isVisible ? 'glitch-1 2.5s infinite linear alternate-reverse' : 'none'}; }
        .animate-glitch-2 { animation: ${isVisible ? 'glitch-2 3s infinite linear alternate-reverse' : 'none'}; }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { bg: #000; }
        ::-webkit-scrollbar-thumb { bg: #22d3ee; border-radius: 4px; }
      `}</style>

      {/* BACKGROUND LAYERS */}
      <CyberGrid />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 md:p-8">
        
        {/* MAIN CONTAINER: "THE TERMINAL" */}
        <div 
          className={`
            w-full max-w-4xl transition-all duration-1000 ease-out transform
            ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
        >
          {/* Header Section */}
          <div className="mb-8 flex flex-col md:flex-row items-start md:items-end justify-between border-b border-gray-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                <Terminal size={14} className="animate-pulse text-cyan-500" />
                <span>SYS.ROOT.ACCESS_GRANTED</span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-6xl font-black uppercase">
                <GlitchText text="INITIALIZE" color="cyan" /> <span className="text-gray-700">/</span> <GlitchText text="UPLINK" color="fuchsia" />
              </h1>
            </div>
            <div className="mt-4 md:mt-0 text-right hidden md:block">
              <div className="text-xs text-cyan-500 mb-1">SECURE_CONNECTION</div>
              <div className="flex gap-1 justify-end">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-8 h-2 bg-cyan-900/40 border border-cyan-500/20" />
                ))}
              </div>
            </div>
          </div>

          {/* Form Container */}
          <div className="relative group perspective-1000">
            {/* Holographic Border Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-cyan-500 opacity-30 blur-md group-hover:opacity-50 transition-opacity duration-500 rounded-lg"></div>
            
            <div className="relative bg-black/90 border border-gray-800 p-8 md:p-12 rounded-lg backdrop-blur-sm overflow-hidden">
              
              {/* Decorative Interior Lines */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" style={{ boxShadow: '0 0 10px rgba(6,182,212,0.5)' }}></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-fuchsia-400/70 to-transparent" style={{ boxShadow: '0 0 10px rgba(217,70,239,0.5)' }}></div>
              
              <div className="grid md:grid-cols-12 gap-12">
                
                {/* Left Column: Info */}
                <div className="md:col-span-4 space-y-8 border-r border-gray-800/50 pr-8 hidden md:block">
                   <div className="space-y-4">
                     <h3 className="text-cyan-400 text-sm font-bold tracking-widest flex items-center gap-2">
                       <Cpu size={16} /> SYSTEM_STATUS
                     </h3>
                     <p className="text-xs text-gray-500 leading-relaxed">
                       Neural interface ready for data transmission. All packets are encrypted using standard military-grade protocols. Expect latency 0.04ms.
                     </p>
                   </div>

                   <div className="space-y-4">
                     <h3 className="text-fuchsia-400 text-sm font-bold tracking-widest flex items-center gap-2">
                       <ShieldCheck size={16} /> PROTOCOLS
                     </h3>
                     <ul className="text-xs text-gray-500 space-y-2">
                       <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> PORT_22: OPEN</li>
                       <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse delay-75"></span> PROXY: ACTIVE</li>
                       <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse delay-150"></span> FIREWALL: ACTIVE</li>
                     </ul>
                   </div>
                </div>

                {/* Right Column: Form */}
                <form onSubmit={handleSubmit} className="md:col-span-8 space-y-8">
                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="bg-green-500/10 border border-green-500 p-4 rounded font-mono text-sm text-green-400 animate-pulse">
                      ✓ TRANSMISSION_SUCCESSFUL. MESSAGE_RECEIVED.
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="bg-red-500/10 border border-red-500 p-4 rounded font-mono text-sm text-red-400">
                      ✗ TRANSMISSION_FAILED. RETRY_PROTOCOL.
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CyberInput 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      label="MSG_HEADER"
                      placeholder="SUBJECT_LINE_PROTOCOL" 
                      icon={User} 
                      color="cyan"
                    />
                    <CyberInput 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      label="COMM_LINK"
                      placeholder="EMAIL_ADDRESS" 
                      type="email"
                      icon={Mail} 
                      color="fuchsia"
                    />
                  </div>

                  <CyberInput 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    label="MSG_BODY"
                    placeholder="ENTER_TRANSMISSION_BODY_DATA..." 
                    type="textarea"
                    icon={Terminal} 
                    color="cyan"
                  />

                  <div className="pt-4 flex items-center justify-between">
                    <div className="text-xs text-gray-600 font-mono">
                      {`// ${isSubmitting ? 'TRANSMITTING...' : 'READY_TO_TRANSMIT'}`}
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      onMouseEnter={() => setIsHoveringSubmit(true)}
                      onMouseLeave={() => setIsHoveringSubmit(false)}
                      className={`relative overflow-hidden bg-transparent group/btn ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {/* Button Background & Border */}
                      <div className={`absolute inset-0 bg-cyan-500/10 transition-transform duration-300 origin-left ${isHoveringSubmit ? 'scale-x-100' : 'scale-x-0'}`}></div>
                      <div className="border border-cyan-500 px-8 py-3 relative z-10 flex items-center gap-3 transition-colors duration-300 hover:bg-cyan-500/10">
                        <span className="font-bold tracking-wider text-cyan-400 group-hover/btn:text-white transition-colors">
                          {isSubmitting ? 'SENDING...' : 'EXECUTE'}
                        </span>
                        <Send size={16} className={`text-cyan-400 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all duration-300 ${isHoveringSubmit || isSubmitting ? 'rotate-45' : ''} ${isSubmitting ? 'animate-pulse' : ''}`} />
                      </div>
                      
                      {/* Button Corner Accents */}
                      <div className="absolute top-0 left-0 w-2 h-2 bg-cyan-500 transition-all duration-300 group-hover/btn:w-full group-hover/btn:h-0.5"></div>
                      <div className="absolute bottom-0 right-0 w-2 h-2 bg-cyan-500 transition-all duration-300 group-hover/btn:w-full group-hover/btn:h-0.5"></div>
                    </button>
                  </div>
                </form>

              </div>
            </div>
            
            {/* Bottom Bar Code Decoration */}
            <div className="mt-2 flex justify-between items-center opacity-50">
               <div className="h-2 w-32 bg-gray-800 relative overflow-hidden">
                 <div className="absolute inset-0 bg-cyan-500/50 w-full animate-[loading_2s_ease-in-out_infinite]"></div>
               </div>
               <div className="text-[10px] text-gray-600">V.2.0.4.5_BETA</div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;