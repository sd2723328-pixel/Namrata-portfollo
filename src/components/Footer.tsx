import React, { useState } from 'react';
import { Github, Linkedin, Instagram, Mail, Edit3, ArrowUp } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SocialLinks } from '../types';
import { EditLinksModal } from './EditLinksModal';

interface FooterProps {
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop }) => {
  const { portfolio, updateSocialLinks, isAuthenticated } = usePortfolio();
  const socialLinks = portfolio.socialLinks;
  const personalInfo = portfolio.personalInfo;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveLinks = async (newLinks: SocialLinks) => {
    await updateSocialLinks(newLinks);
  };

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'BCA Hub', href: '#bca-students' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/80 py-12 text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200/60 dark:border-slate-800/60">
          {/* Brand & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center font-mono text-xs font-bold">
                &lt;NG/&gt;
              </span>
              <span className="font-bold text-slate-900 dark:text-white text-base">
                {personalInfo.name}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
              {personalInfo.title} dedicated to writing clean code and crafting responsive user experiences.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap justify-center gap-5 text-xs font-medium">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Social Media Icons with editable links button */}
          <div className="flex items-center gap-3">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:scale-110 transition-all border border-slate-200/80 dark:border-slate-800"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-blue-600 hover:scale-110 transition-all border border-slate-200/80 dark:border-slate-800"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram profile"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-pink-600 hover:scale-110 transition-all border border-slate-200/80 dark:border-slate-800"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${socialLinks.email}`}
              aria-label="Email Namrata"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-teal-600 hover:scale-110 transition-all border border-slate-200/80 dark:border-slate-800"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            {isAuthenticated && (
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/60 transition-colors border border-teal-200/60 dark:border-teal-800/60"
                title="Edit Social Media Links"
                aria-label="Edit social links"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Bottom Bar with exact required copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p id="footer-copyright" className="text-center sm:text-left font-medium">
            © 2026 {personalInfo.name}. All Rights Reserved.
          </p>

          <button
            type="button"
            onClick={onScrollToTop}
            className="inline-flex items-center gap-1.5 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <EditLinksModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        socialLinks={socialLinks}
        onSave={handleSaveLinks}
      />
    </footer>
  );
};

