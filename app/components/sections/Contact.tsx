import React from 'react';
import CyberReveal from '../utils/CyberReveal';
import NeonButton from '../ui/NeonButton';
import { ExternalLink, User, Mail } from 'lucide-react';

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-3xl mx-auto px-6">
        <CyberReveal>
          <div className="bg-black/80 backdrop-blur-xl border border-white/10 p-8 md:p-12 relative overflow-hidden group">
            {/* Neon Border Effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent group-hover:h-1.5 transition-all"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent group-hover:h-1.5 transition-all"></div>
            
            <h2 className="text-4xl font-cyber font-bold text-center mb-8 text-white">
              INITIALIZE <span className="text-cyan-400">CONTACT</span>
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2 group/input">
                  <label className="text-xs font-mono text-cyan-500 group-focus-within/input:text-cyan-300 transition-colors">USER_ID</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-gray-600 w-5 h-5 group-focus-within/input:text-cyan-400 transition-colors" />
                    <input 
                      type="text" 
                      className="w-full bg-black/50 border-b border-gray-700 text-white pl-10 pr-4 py-2 focus:outline-none focus:border-cyan-500 focus:bg-cyan-900/10 transition-all font-mono"
                      placeholder="ENTER NAME"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2 group/input">
                  <label className="text-xs font-mono text-cyan-500 group-focus-within/input:text-cyan-300 transition-colors">COMM_LINK</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-600 w-5 h-5 group-focus-within/input:text-cyan-400 transition-colors" />
                    <input 
                      type="email" 
                      className="w-full bg-black/50 border-b border-gray-700 text-white pl-10 pr-4 py-2 focus:outline-none focus:border-cyan-500 focus:bg-cyan-900/10 transition-all font-mono"
                      placeholder="ENTER EMAIL"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2 group/input">
                <label className="text-xs font-mono text-cyan-500 group-focus-within/input:text-cyan-300 transition-colors">DATA_PACKET</label>
                <textarea 
                  rows={4}
                  className="w-full bg-black/50 border-b border-gray-700 text-white p-4 focus:outline-none focus:border-cyan-500 focus:bg-cyan-900/10 transition-all font-mono"
                  placeholder="TRANSMIT MESSAGE..."
                  required
                ></textarea>
              </div>

              <div className="flex justify-between items-center pt-4">
                <button 
                  type="button" 
                  className="text-gray-500 hover:text-white font-mono text-sm underline decoration-gray-700 hover:decoration-white transition-all flex items-center gap-2 group/btn"
                  onClick={() => window.open('/cv.pdf', '_blank')}
                >
                  <ExternalLink size={14} className="group-hover/btn:rotate-45 transition-transform" /> DOWNLOAD CV_V1.PDF
                </button>

                <NeonButton color="cyan" className="px-10" onClick={() => {}}>
                  SEND
                </NeonButton>
              </div>
            </form>
          </div>
        </CyberReveal>
      </div>
    </section>
  );
};

export default Contact;
