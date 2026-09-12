import React, { useState } from 'react';
import { ExternalLink, Github, FolderGit2, Play, Code2, Sparkles, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectDemoModal } from './ProjectDemoModal';

export const Projects: React.FC = () => {
  const [activeDemoProject, setActiveDemoProject] = useState<Project | null>(null);

  // Visual gradients / theme accents for project card banners
  const projectThemeAccents: Record<string, { gradient: string; iconBg: string }> = {
    'personal-portfolio': {
      gradient: 'from-teal-500/20 via-cyan-500/15 to-emerald-500/20 dark:from-teal-900/40 dark:via-cyan-900/30 dark:to-emerald-900/40',
      iconBg: 'bg-teal-500/10 text-teal-600 dark:text-teal-400'
    },
    'student-registration-form': {
      gradient: 'from-blue-500/20 via-indigo-500/15 to-teal-500/20 dark:from-blue-900/40 dark:via-indigo-900/30 dark:to-teal-900/40',
      iconBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
    },
    'todo-list': {
      gradient: 'from-emerald-500/20 via-teal-500/15 to-green-500/20 dark:from-emerald-900/40 dark:via-teal-900/30 dark:to-green-900/40',
      iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
    },
    'calculator': {
      gradient: 'from-amber-500/20 via-orange-500/15 to-yellow-500/20 dark:from-amber-900/40 dark:via-orange-900/30 dark:to-yellow-900/40',
      iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
    },
    'responsive-landing-page': {
      gradient: 'from-purple-500/20 via-violet-500/15 to-indigo-500/20 dark:from-purple-900/40 dark:via-violet-900/30 dark:to-indigo-900/40',
      iconBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
    }
  };

  return (
    <section id="projects" className="py-20 bg-slate-50/70 dark:bg-slate-900/30 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-3 border border-teal-200/80 dark:border-teal-800/60">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Featured Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Projects
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            A selection of web applications and projects I’ve built to hone my development skills.
          </p>
          <div className="w-12 h-1 bg-teal-600 dark:bg-teal-400 mx-auto mt-4 rounded-full" />
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS_DATA.map((project, idx) => {
            const theme = projectThemeAccents[project.id] || {
              gradient: 'from-teal-500/20 to-cyan-500/20',
              iconBg: 'bg-teal-500/10 text-teal-600'
            };

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-teal-500/40 dark:hover:border-teal-400/40 transition-all duration-300 overflow-hidden"
              >
                {/* Visual Header Banner */}
                <div>
                  <div
                    className={`h-40 p-5 bg-gradient-to-br ${theme.gradient} border-b border-slate-200/60 dark:border-slate-800/60 flex flex-col justify-between relative overflow-hidden`}
                  >
                    {/* Decorative Code Graphic */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md bg-white/80 dark:bg-slate-950/80 text-slate-700 dark:text-slate-300 shadow-xs backdrop-blur-xs">
                        {project.category}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-white/80 dark:bg-slate-950/80 flex items-center justify-center text-slate-700 dark:text-slate-300 shadow-xs">
                        <Code2 className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                        <span>Interactive Demo Available</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-5 min-h-[4rem]">
                      {project.shortDescription}
                    </p>

                    {/* Technologies Used */}
                    <div className="mb-2">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                        Technologies
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buttons: Live Demo and GitHub */}
                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      id={`project-live-demo-${project.id}`}
                      onClick={() => setActiveDemoProject(project)}
                      className="group/btn inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-medium text-xs shadow-sm hover:shadow transition-all"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Live Demo</span>
                    </button>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`project-github-${project.id}`}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium text-xs border border-slate-200 dark:border-slate-700 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Interactive Live Demo Modal */}
      <ProjectDemoModal
        project={activeDemoProject}
        onClose={() => setActiveDemoProject(null)}
      />
    </section>
  );
};
