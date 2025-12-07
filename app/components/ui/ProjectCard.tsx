import React from 'react';
import { Monitor, ChevronRight, ExternalLink } from 'lucide-react';
import CyberReveal from '../utils/CyberReveal';
import { projectConfig } from '../../config/projectConfig';

type ProjectCardProps = {
  project: {
    id: string | number;
    title: string;
    tech: string;
    desc: string;
    details: string;
    image?: string;
    url?: string;
  };
  onClick?: (p: any) => void;
  index: number;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, index }) => {
  // Merge config overrides with API data
  const config = projectConfig[project.title] || {};
  const customizedProject = {
    ...project,
    desc: config.description || project.desc,
    image: config.image || project.image,
    details: config.details || project.details
  };

  return (
    <CyberReveal delay={index * 150}>
    <div
      onClick={() => onClick && onClick(customizedProject)}
      className="group relative cursor-pointer overflow-hidden border border-fuchsia-500/30 bg-black hover:border-fuchsia-500 transition-all duration-300 hover:shadow-[0_0_25px_rgba(217,70,239,0.2)]"
    >
      {/* Scanline Overlay on Hover */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-20 z-30 transition-opacity"></div>
      {/* Image Placeholder with Overlay */}
      <div className="h-48 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
        {customizedProject.image ? (
          <img src={customizedProject.image} alt={customizedProject.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        ) : (
          <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-600 group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out">
            <Monitor size={48} className="group-hover:text-fuchsia-500 transition-colors duration-500" />
          </div>
        )}
        <div className="absolute top-2 right-2 z-20 bg-black/80 border border-fuchsia-500 text-fuchsia-500 text-xs px-2 py-1 font-mono transform skew-x-12">
          {customizedProject.tech}
        </div>
      </div>
      <div className="p-4 relative z-20 bg-black">
        <h3 className="text-xl font-bold text-fuchsia-100 font-mono mb-2 group-hover:text-fuchsia-400 transition-colors flex items-center gap-2">
          {customizedProject.title}
        </h3>
        <p className="text-sm text-gray-400 font-mono line-clamp-2">{customizedProject.desc}</p>
        <div className="mt-4 flex items-center text-xs text-fuchsia-500 font-mono gap-1 overflow-hidden">
          <span className="transform translate-x-0 group-hover:translate-x-full transition-transform duration-500">INITIALIZE_VIEW</span>
          <span className="absolute transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 text-white">ACCESS_DATA...</span>
          <ChevronRight size={14} className="animate-pulse ml-auto" />
        </div>
        {customizedProject.url && (
          <a href={customizedProject.url} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center gap-2 text-fuchsia-400 hover:text-white transition-colors text-xs font-bold">
            <ExternalLink size={14} /> View on GitHub
          </a>
        )}
      </div>
    </div>
  </CyberReveal>
  );
};

export default ProjectCard;
