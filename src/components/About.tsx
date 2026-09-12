import React from 'react';
import { Code, Laptop, Sparkles, BookOpen, User, Mail, MapPin, Lightbulb } from 'lucide-react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';

export const About: React.FC = () => {
  const { portfolio } = usePortfolio();
  const { personalInfo } = portfolio;

  const highlightCards = [
    {
      icon: Laptop,
      title: 'Web Development',
      description: 'Crafting responsive, clean, and interactive websites using semantic HTML, modern CSS, and JavaScript.',
      badge: 'Frontend Focus'
    },
    {
      icon: Code,
      title: 'Programming Foundations',
      description: 'Strong foundation in algorithmic thinking and problem-solving through C, C++, and Python.',
      badge: 'Logic & Code'
    },
    {
      icon: BookOpen,
      title: 'Continuous Learning',
      description: 'Driven by curiosity to explore emerging frameworks, best practices, and modern developer tooling.',
      badge: 'Growth Mindset'
    },
    {
      icon: Lightbulb,
      title: 'Attention to Detail',
      description: 'Ensuring seamless responsiveness across devices, cross-browser compatibility, and accessible UI.',
      badge: 'User Experience'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white/60 dark:bg-slate-900/40 relative scroll-mt-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-3 border border-teal-200/80 dark:border-teal-800/60">
            <User className="w-3.5 h-3.5" />
            <span>Get To Know Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            About Me
          </h2>
          <div className="w-12 h-1 bg-teal-600 dark:bg-teal-400 mx-auto mt-3 rounded-full" />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Narrative Introduction & Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-5"
          >
            {personalInfo.profilePhoto && (
              <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                <img
                  src={personalInfo.profilePhoto}
                  alt={personalInfo.name}
                  className="w-16 h-16 rounded-xl object-cover border border-teal-500/40 shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base leading-tight">
                    {personalInfo.name}
                  </h4>
                  <p className="text-xs text-teal-600 dark:text-teal-400 font-medium">
                    {personalInfo.title}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {personalInfo.location || 'India'}
                  </p>
                </div>
              </div>
            )}

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              An aspiring web developer passionate about creating meaningful digital experiences.
            </h3>

            <div className="text-slate-600 dark:text-slate-300 leading-relaxed text-base space-y-4">
              {personalInfo.fullAbout ? (
                personalInfo.fullAbout.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))
              ) : (
                <>
                  <p>
                    Hi, I’m {personalInfo.name}. My enthusiasm for technology sparked from wanting to understand how
                    interactive web experiences work behind the scenes. From writing procedural algorithms in C and C++
                    to architecting responsive web pages with HTML, CSS, and JavaScript, I find deep satisfaction in
                    transforming ideas into functional, beautifully designed software.
                  </p>
                  <p>
                    I am strongly interested in modern web development, programmatic problem solving, and continuously
                    expanding my skill set. Whether it&apos;s mastering responsive CSS layouts, understanding asynchronous
                    JavaScript, or exploring Python algorithms, I embrace every opportunity to learn and grow.
                  </p>
                </>
              )}
            </div>

            {/* Quick Contact & Info Grid */}
            <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">Name</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{personalInfo.name}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <span className="block text-xs text-slate-500 dark:text-slate-400">Email</span>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="font-semibold text-slate-800 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 truncate block text-xs"
                    title={personalInfo.email}
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Key Pillars Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {highlightCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/70 shadow-sm hover:shadow-md hover:border-teal-500/40 dark:hover:border-teal-400/40 transition-all duration-200 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700/80 text-slate-600 dark:text-slate-300">
                        {card.badge}
                      </span>
                    </div>

                    <h4 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
                      {card.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

