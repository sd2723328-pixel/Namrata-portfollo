import React, { useState } from 'react';
import { X, Check, Link2, Github, Linkedin, Instagram } from 'lucide-react';
import { SocialLinks } from '../types';

interface EditLinksModalProps {
  isOpen: boolean;
  onClose: () => void;
  socialLinks: SocialLinks;
  onSave: (links: SocialLinks) => void;
}

export const EditLinksModal: React.FC<EditLinksModalProps> = ({
  isOpen,
  onClose,
  socialLinks,
  onSave
}) => {
  const [formData, setFormData] = useState<SocialLinks>(socialLinks);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
          <div className="flex items-center gap-2">
            <Link2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              Edit Social Media Links
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              <Github className="w-4 h-4" />
              <span>GitHub Profile URL</span>
            </label>
            <input
              type="url"
              required
              value={formData.github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              placeholder="https://github.com/your-username"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              <Linkedin className="w-4 h-4 text-blue-600" />
              <span>LinkedIn Profile URL</span>
            </label>
            <input
              type="url"
              required
              value={formData.linkedin}
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              placeholder="https://linkedin.com/in/your-profile"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              <Instagram className="w-4 h-4 text-pink-500" />
              <span>Instagram Profile URL</span>
            </label>
            <input
              type="url"
              required
              value={formData.instagram}
              onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
              placeholder="https://instagram.com/your-handle"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Save Links</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
