import React from 'react';
import { ArrowRight, Send, Download, Sparkles, Terminal, Code2, CheckCircle2, Copy, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onViewWork: () => void;
  onContactMe: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onViewWork, onContactMe }) => {
  const [copied, setCopied] = React.useState(false);

  const codeSnippet = `const developer = {
  name: "${PERSONAL_INFO.name}",
  role: "${PERSONAL_INFO.title}",
  coreStack: ["HTML5", "CSS3", "JavaScript", "C++", "Python"],
  passion: "Building responsive, modern web experiences",
  openToWork: true
};`;

  const copySnippet = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Subtle Background Ambience Gradients */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 bg-teal-400/10 dark:bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-24 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, Subtitle, Description, Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800/60 text-teal-700 dark:text-teal-300 text-xs font-medium mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for internships & web projects</span>
            </div>

            {/* Main Greeting */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-3">
              Hi, I’m{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-500 dark:from-teal-400 dark:via-teal-300 dark:to-cyan-300">
                Namrata Ghosh
              </span>
            </h1>

            {/* Subtitle */}
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-300">
                Aspiring Web Developer
              </h2>
            </div>

            {/* Short Introduction */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mb-8 leading-relaxed">
              Passionate about building responsive, user-friendly digital experiences with clean code.
              Focused on crafting modern web applications using HTML, CSS, JavaScript, and foundational
              programming in C, C++, and Python.
            </p>

            {/* Buttons: View My Work and Contact Me */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
              <button
                type="button"
                id="hero-btn-view-work"
                onClick={onViewWork}
                className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                id="hero-btn-contact-me"
                onClick={onContactMe}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm shadow-sm transition-all duration-200"
              >
                <Send className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Contact Me</span>
              </button>
            </div>

            {/* Quick Tech Stack Badges */}
            <div className="mt-10 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-300 mr-1">Core Stack:</span>
              {['HTML5', 'CSS3', 'JavaScript', 'C/C++', 'Python', 'Git'].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Interactive Code Terminal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800/80 text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-slate-400 font-sans font-medium text-[11px]">namrata-developer.js</span>
                </div>
                <button
                  type="button"
                  onClick={copySnippet}
                  className="flex items-center gap-1 text-slate-400 hover:text-slate-200 text-xs px-2 py-1 rounded hover:bg-slate-800 transition-colors"
                  title="Copy code"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Terminal Code Content */}
              <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed text-slate-300 overflow-x-auto">
                <p className="text-slate-500 text-xs mb-2">// Welcome to my portfolio website</p>
                <div className="space-y-1">
                  <p>
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-blue-300">developer</span> = &#123;
                  </p>
                  <p className="pl-4">
                    <span className="text-slate-400">name:</span>{' '}
                    <span className="text-emerald-300">"Namrata Ghosh"</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-slate-400">role:</span>{' '}
                    <span className="text-emerald-300">"Aspiring Web Developer"</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-slate-400">learningJourney:</span> [
                  </p>
                  <p className="pl-8 text-amber-300">"HTML5", "CSS3", "JavaScript", "C++", "Python"</p>
                  <p className="pl-4">],</p>
                  <p className="pl-4">
                    <span className="text-slate-400">passion:</span>{' '}
                    <span className="text-teal-300">"Modern Web & Clean Architecture"</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-slate-400">status:</span>{' '}
                    <span className="text-sky-300">"Ready to build & collaborate"</span>
                  </p>
                  <p>&#125;;</p>
                </div>
              </div>

              {/* Terminal Bottom Highlights Bar */}
              <div className="px-5 py-3.5 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="font-medium">Clean & Semantic Code</span>
                </div>
                <span className="text-slate-500 font-mono">UTF-8</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
