import React, { useState, useEffect } from 'react';
import CyberReveal from '../utils/CyberReveal';
import ProjectCard from '../ui/ProjectCard';

interface Project {
  id: string | number;
  title: string;
  tech: string;
  desc: string;
  details: string;
  image?: string;
  url?: string;
}

interface ProjectsProps {
  selectedProject: Project | null;
  onSelectProject: (project: Project | null) => void;
}

const Projects: React.FC<ProjectsProps> = ({ selectedProject, onSelectProject }) => {
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/Isandith/repos')
      .then(res => res.json())
      .then(data => {
        setRepos(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch repos:', err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <section id="projects" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <CyberReveal>
            <h2 className="text-4xl font-cyber font-bold text-white mb-2">
              WHAT I'VE <span className="text-fuchsia-500">BUILT</span>
            </h2>
            <p className="font-mono text-gray-500 mb-12">Auto-loaded from GitHub. Click data cards for expanded view.</p>
          </CyberReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="text-gray-500 font-mono">Loading projects from GitHub...</div>
            ) : repos.length === 0 ? (
              <div className="text-gray-500 font-mono">No projects found.</div>
            ) : (
              repos.map((repo, index) => (
                <ProjectCard
                  key={repo.id}
                  project={{
                    id: repo.id,
                    title: repo.name,
                    tech: repo.language || 'Unknown',
                    desc: repo.description || 'No description provided.',
                    details: `Stars: ${repo.stargazers_count} | Forks: ${repo.forks_count}`,
                    image: undefined,
                    url: repo.html_url
                  }}
                  onClick={onSelectProject}
                  index={index}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* --- PROJECT MODAL --- */}
      {selectedProject && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-[#0a0a0f] border border-fuchsia-500 shadow-[0_0_30px_rgba(217,70,239,0.2)] animate-modal-in overflow-hidden">
             {/* CRT Scan line for modal */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent h-[10px] w-full animate-[scanline_2s_linear_infinite] opacity-10 pointer-events-none"></div>

            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-fuchsia-500/30 bg-fuchsia-950/20">
              <h3 className="font-cyber text-2xl text-white">
                {selectedProject.title}
              </h3>
              <button 
                onClick={() => onSelectProject(null)}
                aria-label="Close project modal"
                className="text-fuchsia-500 hover:text-white transition-colors hover:rotate-90 duration-300"
              >
                ✕
              </button>
            </div>
            
            <div className="p-8 grid md:grid-cols-2 gap-8">
              {/* Fake Image View */}
              <div className="aspect-video bg-gray-900 border border-gray-700 flex items-center justify-center relative group overflow-hidden">
                 <div className="absolute inset-0 bg-fuchsia-500/10 group-hover:bg-transparent transition-colors"></div>
                 <div className="text-gray-700 w-16 h-16 group-hover:text-fuchsia-400 transition-colors">📊</div>
                 {/* Corner markers */}
                 <div className="absolute top-2 left-2 w-2 h-2 bg-fuchsia-500"></div>
                 <div className="absolute bottom-2 right-2 w-2 h-2 bg-fuchsia-500"></div>
              </div>
              
              <div className="font-mono space-y-4">
                 <div className="inline-block px-2 py-1 bg-fuchsia-900/30 text-fuchsia-400 text-xs border border-fuchsia-500/30">
                   {selectedProject.tech}
                 </div>
                 
                 <p className="text-gray-300 leading-relaxed">
                   {selectedProject.desc}
                 </p>
                 
                 <div className="border-l-2 border-fuchsia-500 pl-4 text-sm text-gray-400 italic">
                   "{selectedProject.details}"
                 </div>

                 <div className="pt-6">
                    <a href={selectedProject.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-fuchsia-400 hover:text-white transition-colors uppercase text-sm font-bold tracking-wider group">
                      🔗 Access Repository
                    </a>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;
