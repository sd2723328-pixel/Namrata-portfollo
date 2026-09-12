import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';

export default function App() {
  // Theme state: default to light theme (clean, sophisticated) with user toggle support
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem('namrata_portfolio_theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Synchronize 'dark' class on <html> root element
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('namrata_portfolio_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('namrata_portfolio_theme', 'light');
    }
  }, [darkMode]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 selection:bg-teal-500/20 selection:text-teal-700 dark:selection:text-teal-300">
      {/* Sticky Navigation Bar */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="relative">
        {/* 1. Hero Section */}
        <Hero
          onViewWork={() => scrollToSection('projects')}
          onContactMe={() => scrollToSection('contact')}
        />

        {/* 2. About Me Section */}
        <About />

        {/* 3. Skills Section */}
        <Skills />

        {/* 4. Projects Section */}
        <Projects />

        {/* 5. Education Section */}
        <Education />

        {/* 6. Contact Section */}
        <Contact />
      </main>

      {/* 7. Footer Section */}
      <Footer onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />

      {/* Floating Back to Top Button */}
      <BackToTop />
    </div>
  );
}
