import React from 'react';
import CyberReveal from '../utils/CyberReveal';
import HologramCard from '../ui/HologramCard';

interface SkillGroup {
  title: string;
  icon: React.ReactNode;
  items: string[];
}

interface SkillsProps {
  skills: { [key: string]: SkillGroup };
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  return (
    <section id="skills" className="py-20 relative bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        <CyberReveal>
          <div className="flex items-end gap-4 mb-12 border-b border-gray-800 pb-4">
            <h2 className="text-4xl font-cyber font-bold text-white">
              WHAT I BRING TO THE <span className="text-cyan-400">TABLE</span>
            </h2>
            <div className="hidden md:block font-mono text-gray-500 text-sm mb-2">
              // MODULES_LOADED
            </div>
          </div>
        </CyberReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {Object.entries(skills).map(([key, skillGroup], idx) => (
            <HologramCard 
              key={key}
              delay={idx * 100}
              {...skillGroup}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
