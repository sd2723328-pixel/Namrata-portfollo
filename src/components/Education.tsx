import React, { useState, useEffect } from 'react';
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Plus, Trash2, Edit3, Check, RotateCcw, Building2 } from 'lucide-react';
import { motion } from 'motion/react';
import { INITIAL_EDUCATION_DATA } from '../data/portfolioData';
import { EducationItem } from '../types';

export const Education: React.FC = () => {
  const [educationList, setEducationList] = useState<EducationItem[]>(() => {
    try {
      const saved = localStorage.getItem('namrata_portfolio_education');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_EDUCATION_DATA;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<EducationItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // New item draft template
  const emptyEducation: EducationItem = {
    id: `edu-${Date.now()}`,
    degree: '',
    institution: '',
    fieldOfStudy: '',
    year: '',
    grade: '',
    location: 'West Bengal, India',
    description: '',
    highlights: []
  };

  const [formData, setFormData] = useState<EducationItem>(emptyEducation);

  // Persist to localStorage whenever changed
  useEffect(() => {
    try {
      localStorage.setItem('namrata_portfolio_education', JSON.stringify(educationList));
    } catch (e) {
      console.error(e);
    }
  }, [educationList]);

  const handleStartEdit = (item: EducationItem) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsAddingNew(false);
    setIsEditing(true);
  };

  const handleStartAdd = () => {
    setEditingItem(null);
    setFormData({ ...emptyEducation, id: `edu-${Date.now()}` });
    setIsAddingNew(true);
    setIsEditing(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.degree.trim() || !formData.institution.trim()) return;

    if (isAddingNew) {
      setEducationList([...educationList, formData]);
    } else if (editingItem) {
      setEducationList(educationList.map((item) => (item.id === editingItem.id ? formData : item)));
    }

    setIsEditing(false);
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this education entry?')) {
      setEducationList(educationList.filter((item) => item.id !== id));
    }
  };

  const handleResetDefaults = () => {
    if (confirm('Reset education timeline back to default sample template?')) {
      setEducationList(INITIAL_EDUCATION_DATA);
      setIsEditing(false);
    }
  };

  return (
    <section id="education" className="py-20 bg-white/60 dark:bg-slate-900/40 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-3 border border-teal-200/80 dark:border-teal-800/60">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Education
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Academic milestones and foundational qualifications.
          </p>
          <div className="w-12 h-1 bg-teal-600 dark:bg-teal-400 mx-auto mt-4 rounded-full" />
        </div>

        {/* Education Editor Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
          <div className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-500" />
            <span>
              Namrata can customize her college, degree, and year directly anytime.
            </span>
          </div>
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <>
                <button
                  type="button"
                  id="add-education-btn"
                  onClick={handleStartAdd}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Milestone</span>
                </button>
                <button
                  type="button"
                  id="reset-education-btn"
                  onClick={handleResetDefaults}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs transition-colors"
                  title="Reset to defaults"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </div>

        {/* Inline Edit / Add Modal Form */}
        {isEditing && (
          <motion.form
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSaveForm}
            className="mb-10 p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-teal-500/50 shadow-xl space-y-4 text-xs"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-teal-600" />
                <span>{isAddingNew ? 'Add Education Milestone' : 'Edit Education Details'}</span>
              </h4>
              <span className="text-[11px] text-teal-600 font-medium">Auto-saves to browser</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Degree / Certificate *
                </label>
                <input
                  type="text"
                  required
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  placeholder="e.g. Bachelor of Technology in CSE"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  College / Institution Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  placeholder="e.g. Heritage Institute of Technology"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Field / Department
                </label>
                <input
                  type="text"
                  value={formData.fieldOfStudy || ''}
                  onChange={(e) => setFormData({ ...formData, fieldOfStudy: e.target.value })}
                  placeholder="e.g. Computer Science & Engineering"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Academic Years
                </label>
                <input
                  type="text"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="e.g. 2023 - 2027"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Grade / Score (Optional)
                </label>
                <input
                  type="text"
                  value={formData.grade || ''}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  placeholder="e.g. CGPA: 8.8 / 10"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Kolkata, West Bengal"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Description / Highlights
              </label>
              <textarea
                rows={3}
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of coursework, academic projects, or societies..."
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Save Milestone</span>
              </button>
            </div>
          </motion.form>
        )}

        {/* Timeline View */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-teal-500/30 dark:border-teal-500/20 space-y-10 my-4">
          {educationList.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-2 border-teal-600 text-teal-600 flex items-center justify-center shadow-xs">
                <GraduationCap className="w-3.5 h-3.5" />
              </div>

              {/* Education Card */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-teal-500/40 dark:hover:border-teal-400/40 transition-all duration-200">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                      {item.degree}
                    </h3>
                    <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-medium text-sm mt-0.5">
                      <Building2 className="w-4 h-4 shrink-0" />
                      <span>{item.institution}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/60">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.year}
                    </span>

                    {/* Quick Edit Actions */}
                    <button
                      type="button"
                      onClick={() => handleStartEdit(item)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-teal-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Edit this entry"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    {educationList.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Delete entry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Field & Location */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-3">
                  {item.fieldOfStudy && (
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                      {item.fieldOfStudy}
                    </span>
                  )}
                  {item.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {item.location}
                    </span>
                  )}
                  {item.grade && (
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                      <Award className="w-3.5 h-3.5" />
                      {item.grade}
                    </span>
                  )}
                </div>

                {/* Description */}
                {item.description && (
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-3">
                    {item.description}
                  </p>
                )}

                {/* Highlights */}
                {item.highlights && item.highlights.length > 0 && (
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
                    {item.highlights.map((h, i) => (
                      <div key={i} className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
