import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  Code2,
  FolderGit2,
  Briefcase,
  ExternalLink,
  ChevronRight,
  Layers,
  Cpu,
  Coffee,
  Terminal,
  Globe,
  Database,
  GitBranch,
  TerminalSquare,
  Sparkles,
  CheckCircle2,
  Award,
  ArrowUpRight,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { BCAResource, BCAProjectIdea, BCACareerPath } from '../types';

interface BCAStudentsProps {
  onOpenDashboard?: (tab?: string) => void;
}

export const BCAStudents: React.FC<BCAStudentsProps> = ({ onOpenDashboard }) => {
  const { portfolio, isAuthenticated } = usePortfolio();
  const bca = portfolio.bca;

  const [activeTab, setActiveTab] = useState<'overview' | 'tools' | 'resources' | 'projects' | 'careers'>('overview');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getLanguageIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'c language':
      case 'c':
        return <Cpu className="w-5 h-5 text-indigo-500" />;
      case 'c++':
        return <Layers className="w-5 h-5 text-blue-500" />;
      case 'java':
        return <Coffee className="w-5 h-5 text-amber-600" />;
      case 'python':
        return <Terminal className="w-5 h-5 text-emerald-500" />;
      case 'html, css & javascript':
      case 'web tech':
        return <Globe className="w-5 h-5 text-teal-500" />;
      case 'sql / mysql / postgresql':
      case 'sql':
        return <Database className="w-5 h-5 text-cyan-500" />;
      case 'git & github':
        return <GitBranch className="w-5 h-5 text-orange-500" />;
      default:
        return <TerminalSquare className="w-5 h-5 text-slate-500" />;
    }
  };

  const filteredResources = bca.resources.filter((res) => {
    if (selectedCategory === 'all') return true;
    return res.category === selectedCategory;
  });

  const filteredProjects = bca.projectIdeas.filter((proj) => {
    if (selectedDifficulty === 'all') return true;
    return proj.difficulty.toLowerCase().includes(selectedDifficulty.toLowerCase());
  });

  const resourceCategories = [
    'all',
    'Free Courses',
    'Documentation',
    'Study Guidance',
    'Practice Platforms',
  ];

  return (
    <section id="bca-students" className="py-20 bg-slate-50 dark:bg-slate-900/60 relative scroll-mt-14">
      {/* Background Ambience */}
      <div className="absolute top-12 right-0 w-80 h-80 bg-teal-500/5 dark:bg-teal-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-cyan-500/5 dark:bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-3 border border-teal-200/80 dark:border-teal-800/60">
            <GraduationCap className="w-4 h-4" />
            <span>Dedicated Academic Hub</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            BCA Students Corner
          </h2>
          <div className="w-12 h-1 bg-teal-600 dark:bg-teal-400 mx-auto mt-3 rounded-full" />

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Curated roadmap, core programming languages, study guidance, hands-on project ideas, and career opportunities designed specifically for Bachelor of Computer Applications students.
          </p>

          {isAuthenticated && (
            <div className="mt-4 inline-flex items-center gap-2">
              <button
                type="button"
                onClick={() => onOpenDashboard && onOpenDashboard('bca')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 text-xs font-medium border border-teal-300 dark:border-teal-800 hover:bg-teal-200 transition-colors"
              >
                <Settings className="w-3.5 h-3.5" />
                Manage BCA Section in Dashboard
              </button>
            </div>
          )}
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-3 mb-10 no-scrollbar gap-2 px-1">
          {[
            { id: 'overview', label: 'Program Overview', icon: BookOpen },
            { id: 'tools', label: 'Languages & Tools', icon: Code2 },
            { id: 'resources', label: 'Study Resources', icon: GraduationCap },
            { id: 'projects', label: 'Project Ideas', icon: FolderGit2 },
            { id: 'careers', label: 'Career Pathways', icon: Briefcase },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                id={`bca-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/20'
                    : 'bg-white dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-teal-600 dark:text-teal-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Program Overview */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-slate-800/80 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-700/60">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                    Curriculum & Scope
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                    {bca.overview.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800/60 w-fit">
                  <span>3-Year Degree</span>
                  <span>•</span>
                  <span>6 Semesters</span>
                </div>
              </div>

              <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed mb-8">
                {bca.overview.description}
              </p>

              {/* Key Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {bca.overview.keyHighlights.map((hl, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800"
                  >
                    <CheckCircle2 className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                      {hl}
                    </span>
                  </div>
                ))}
              </div>

              {/* Core Syllabus Subjects */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Core Technical Subjects in BCA
                </h4>
                <div className="flex flex-wrap gap-2">
                  {bca.overview.coreSubjects.map((sub, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-teal-50/80 dark:bg-teal-950/40 text-teal-800 dark:text-teal-200 text-xs font-medium border border-teal-200/60 dark:border-teal-800/40"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Semester Roadmap Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-800/80 rounded-xl p-6 border border-slate-200/80 dark:border-slate-700/80">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm mb-4">
                  1st Year
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                  Foundations & Programming
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Focus on C language, mathematical logic, digital electronics, and basic data structures. Build simple CLI projects and master basic syntax.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800/80 rounded-xl p-6 border border-slate-200/80 dark:border-slate-700/80">
                <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-sm mb-4">
                  2nd Year
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                  Core OOP, DBMS & Web
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Master C++, Java, Database Management Systems (SQL), Operating Systems, and modern HTML/CSS/JavaScript web engineering.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800/80 rounded-xl p-6 border border-slate-200/80 dark:border-slate-700/80">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm mb-4">
                  3rd Year
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                  Full Stack, Capstone & Placement
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Build full-stack database-backed major projects, study software testing, cloud concepts, prepare for NIMCET (MCA) or corporate IT placements.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Useful Languages & Tools */}
        {activeTab === 'tools' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {bca.languagesAndTools.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-800/80 rounded-xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-700/60">
                        {getLanguageIcon(item.name)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-base">
                          {item.name}
                        </h4>
                        <span className="text-xs text-teal-600 dark:text-teal-400 font-medium">
                          {item.role}
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      {item.recommendedSemester}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                    {item.whyUseful}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-medium">Category: {item.category}</span>
                  <span className="text-teal-600 dark:text-teal-400 font-semibold">Recommended</span>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Tab 3: Study Guidance & Learning Resources */}
        {activeTab === 'resources' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {resourceCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                    selectedCategory === cat
                      ? 'bg-teal-600 text-white'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredResources.map((res) => (
                <div
                  key={res.id}
                  className="bg-white dark:bg-slate-800/80 rounded-xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">
                        {res.title}
                      </h4>
                      {res.url && (
                        <a
                          href={res.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                          title="Open resource in new tab"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/60">
                        {res.category}
                      </span>
                      {res.recommendedSemester && (
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          {res.recommendedSemester}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {res.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-700/60">
                      {res.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 text-[11px] rounded bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tab 4: Recommended Project Ideas */}
        {activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Filter by difficulty */}
            <div className="flex flex-wrap gap-2">
              {['all', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
                <button
                  key={diff}
                  type="button"
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                    selectedDifficulty === diff
                      ? 'bg-teal-600 text-white'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {diff === 'all' ? 'All Projects' : `${diff} Level`}
                </button>
              ))}
            </div>

            {/* Projects List Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-white dark:bg-slate-800/80 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                        {proj.semester}
                      </span>
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                          proj.difficulty === 'Beginner'
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60'
                            : proj.difficulty === 'Intermediate'
                            ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60'
                            : 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60'
                        }`}
                      >
                        {proj.difficulty}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {proj.title}
                    </h4>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {proj.description}
                    </p>

                    {/* Key features checklist */}
                    <div className="space-y-1.5 mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Key Features:
                      </span>
                      {proj.keyFeatures.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    {/* Learning outcome banner */}
                    <div className="p-3 rounded-lg bg-teal-50/60 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50 mb-4">
                      <span className="text-[11px] font-semibold text-teal-800 dark:text-teal-300 block mb-0.5">
                        Learning Outcome:
                      </span>
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        {proj.learningOutcome}
                      </p>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-700/60">
                      {proj.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 text-[11px] rounded bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-200 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tab 5: Career Pathways & Higher Studies */}
        {activeTab === 'careers' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {bca.careerOpportunities.map((career) => (
              <div
                key={career.id}
                className="bg-white dark:bg-slate-800/80 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      {career.role}
                    </h4>
                    {career.salaryRange && (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/60">
                        {career.salaryRange}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {career.description}
                  </p>

                  <div className="mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2">
                      Required Skills & Competencies:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {career.requiredSkills.map((sk, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-200"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60">
                  <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 block mb-0.5">
                    Growth & Progression Options:
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {career.futureOptions}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};
