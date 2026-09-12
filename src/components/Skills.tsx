import React, { useState } from 'react';
import {
  FileCode2,
  Palette,
  Code2,
  Cpu,
  Layers,
  Terminal,
  GitBranch,
  Smartphone,
  Wrench,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { SKILLS_DATA } from '../data/portfolioData';
import { Skill } from '../types';

export const Skills: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  // Map icon strings to Lucide components
  const iconMap: Record<string, React.ElementType> = {
    FileCode2,
    Palette,
    Code2,
    Cpu,
    Layers,
    Terminal,
    GitBranch,
    Smartphone
  };

  const categories = ['All', 'Frontend', 'Programming Languages', 'Tools & Version Control', 'Core Concepts'];

  const filteredSkills = selectedFilter === 'All'
    ? SKILLS_DATA
    : SKILLS_DATA.filter((skill) => skill.category === selectedFilter);

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-3 border border-teal-200/80 dark:border-teal-800/60">
            <Wrench className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Skills & Expertise
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Technologies and programming languages I work with to build responsive web applications.
          </p>
          <div className="w-12 h-1 bg-teal-600 dark:bg-teal-400 mx-auto mt-4 rounded-full" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 ${
                selectedFilter === cat
                  ? 'bg-teal-600 text-white shadow-sm shadow-teal-500/20'
                  : 'bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {filteredSkills.map((skill: Skill, idx: number) => {
            const IconComponent = iconMap[skill.icon] || Code2;
            return (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="group relative p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-teal-500/50 dark:hover:border-teal-400/50 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Icon & Level Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-100 dark:border-teal-900/40 text-teal-600 dark:text-teal-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
                      {skill.level}
                    </span>
                  </div>

                  {/* Skill Name & Category */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight mb-1">
                    {skill.name}
                  </h3>
                  <p className="text-[11px] font-medium text-teal-600 dark:text-teal-400 mb-2.5">
                    {skill.category}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {skill.description}
                  </p>
                </div>

                <div>
                  {/* Progress Indicator */}
                  <div className="mb-3">
                    <div className="flex justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                      <span>Proficiency</span>
                      <span>{skill.percentage}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full transition-all duration-500"
                        style={{ width: `${skill.percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Micro Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
