import React, { useState, useRef } from 'react';
import {
  X,
  Save,
  RotateCcw,
  LogOut,
  User,
  Code2,
  FolderGit2,
  GraduationCap,
  Share2,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Upload,
  Image as ImageIcon,
  KeyRound,
  Inbox,
  Sparkles,
  CloudCheck,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Skill,
  Project,
  EducationItem,
  BCAResource,
  BCAProjectIdea,
  BCACareerPath,
} from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  initialTab = 'profile',
}) => {
  const {
    portfolio,
    user,
    logout,
    savePortfolio,
    resetToDefault,
    syncStatus,
    lastSaved,
    messages,
    deleteMessage,
    changePassword,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);
  const [saveErrorNotice, setSaveErrorNotice] = useState<string | null>(null);

  // Form states initialized from portfolio
  const [formData, setFormData] = useState(portfolio);

  // Update internal formData when portfolio updates
  React.useEffect(() => {
    setFormData(portfolio);
  }, [portfolio]);

  // Photo upload handling
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB. Please choose a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            profilePhoto: reader.result as string,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save changes to cloud
  const handleCloudSave = async () => {
    setSaveErrorNotice(null);
    const res = await savePortfolio(formData);
    if (res.success) {
      setSaveSuccessNotice(true);
      setTimeout(() => setSaveSuccessNotice(false), 3000);
    } else {
      setSaveErrorNotice(res.error || 'Failed to sync with cloud.');
    }
  };

  // Reset to default
  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset all portfolio data to defaults? This will erase custom edits.')) {
      const ok = await resetToDefault();
      if (ok) {
        alert('Portfolio reset to default state.');
      }
    }
  };

  // Change Password State
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passNotice, setPassNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassNotice(null);
    const res = await changePassword(currentPass, newPass);
    if (res.success) {
      setPassNotice({ type: 'success', text: 'Password successfully updated!' });
      setCurrentPass('');
      setNewPass('');
    } else {
      setPassNotice({ type: 'error', text: res.error || 'Failed to update password.' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/80 backdrop-blur-md overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative w-full max-w-5xl h-[92vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden"
      >
        {/* Top Header Bar */}
        <div className="px-4 sm:px-6 py-3.5 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-sm">
              &lt;NG/&gt;
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900 dark:text-white leading-none">
                  Admin Dashboard
                </h2>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300">
                  Cloud Synced
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Logged in as <span className="font-medium text-slate-700 dark:text-slate-300">{user?.email}</span>
                {lastSaved && ` • Synced at ${new Date(lastSaved).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              id="admin-save-cloud-btn"
              onClick={handleCloudSave}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
            >
              {saveSuccessNotice ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Saved to Cloud!</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save to Cloud</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleReset}
              title="Reset to default template"
              className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                logout();
                onClose();
              }}
              title="Log out"
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Status Alerts */}
        {saveSuccessNotice && (
          <div className="px-6 py-2 bg-emerald-500 text-white text-xs font-medium flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>All changes saved to cloud database and synced across your devices.</span>
            </div>
            <span className="text-[10px] opacity-80">Synced</span>
          </div>
        )}
        {saveErrorNotice && (
          <div className="px-6 py-2 bg-red-600 text-white text-xs font-medium flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4" />
            <span>{saveErrorNotice}</span>
          </div>
        )}

        {/* Dashboard Body: Sidebar Tabs + Main Content */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Navigation Tabs (Horizontal on mobile, vertical sidebar on desktop) */}
          <div className="w-full md:w-56 shrink-0 bg-slate-50/70 dark:bg-slate-800/40 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 p-2 md:p-3 overflow-x-auto md:overflow-y-auto no-scrollbar flex md:flex-col gap-1">
            {[
              { id: 'profile', label: 'About & Profile', icon: User },
              { id: 'skills', label: 'Skills', icon: Code2, count: formData.skills.length },
              { id: 'projects', label: 'Projects', icon: FolderGit2, count: formData.projects.length },
              { id: 'education', label: 'Education', icon: GraduationCap, count: formData.education.length },
              { id: 'bca', label: 'BCA Students Hub', icon: GraduationCap, highlight: true },
              { id: 'social', label: 'Contact & Links', icon: Share2 },
              { id: 'messages', label: 'Messages Inbox', icon: Inbox, badge: messages.length },
              { id: 'security', label: 'Account Security', icon: KeyRound },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  id={`admin-nav-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap md:whitespace-normal transition-all ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        isActive ? 'bg-white text-teal-700' : 'bg-teal-500 text-white'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Tab Content Panel */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-white dark:bg-slate-900">
            {/* 1. Profile & About Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Personal Information & About Me
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Update your introduction, role title, bio, and profile photo.
                  </p>
                </div>

                {/* Profile Photo Upload */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Profile Picture
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-teal-100 dark:bg-teal-950/80 border-2 border-teal-500 overflow-hidden flex items-center justify-center shrink-0 shadow-inner">
                      {formData.personalInfo.profilePhoto ? (
                        <img
                          src={formData.personalInfo.profilePhoto}
                          alt={formData.personalInfo.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="font-bold text-2xl text-teal-700 dark:text-teal-300">
                          NG
                        </span>
                      )}
                    </div>

                    <div className="flex-1 space-y-2 w-full">
                      <div className="flex gap-2">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handlePhotoUpload}
                          accept="image/*"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium shadow-sm transition-colors"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Photo</span>
                        </button>
                        {formData.personalInfo.profilePhoto && (
                          <button
                            type="button"
                            onClick={() =>
                              setFormData((p) => ({
                                ...p,
                                personalInfo: { ...p.personalInfo, profilePhoto: '' },
                              }))
                            }
                            className="px-3 py-2 rounded-lg border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 text-xs font-medium hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <input
                        type="url"
                        value={formData.personalInfo.profilePhoto || ''}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            personalInfo: { ...p.personalInfo, profilePhoto: e.target.value },
                          }))
                        }
                        placeholder="Or paste an image URL here..."
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.personalInfo.name}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          personalInfo: { ...p.personalInfo, name: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Title / Role
                    </label>
                    <input
                      type="text"
                      value={formData.personalInfo.title}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          personalInfo: { ...p.personalInfo, title: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={formData.personalInfo.email}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          personalInfo: { ...p.personalInfo, email: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.personalInfo.location}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          personalInfo: { ...p.personalInfo, location: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Availability / Status
                  </label>
                  <input
                    type="text"
                    value={formData.personalInfo.availability}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        personalInfo: { ...p.personalInfo, availability: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Hero Tagline
                  </label>
                  <input
                    type="text"
                    value={formData.personalInfo.tagline}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        personalInfo: { ...p.personalInfo, tagline: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Short Bio (Hero section)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.personalInfo.shortBio}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        personalInfo: { ...p.personalInfo, shortBio: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Full Narrative (About Me section)
                  </label>
                  <textarea
                    rows={5}
                    value={formData.personalInfo.fullAbout}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        personalInfo: { ...p.personalInfo, fullAbout: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  />
                </div>
              </div>
            )}

            {/* 2. Skills Manager Tab */}
            {activeTab === 'skills' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Skills</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Manage skills, category tags, proficiency levels and percentages.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newSkill: Skill = {
                        id: 'skill-' + Date.now(),
                        name: 'New Skill',
                        category: 'Frontend',
                        level: 'Intermediate',
                        percentage: 75,
                        description: 'Description of the skill.',
                        icon: 'Code2',
                        tags: ['SkillTag'],
                      };
                      setFormData((p) => ({ ...p, skills: [...p.skills, newSkill] }));
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Skill</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.skills.map((skill, index) => (
                    <div
                      key={skill.id}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 flex-1">
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => {
                              const updated = [...formData.skills];
                              updated[index] = { ...skill, name: e.target.value };
                              setFormData((p) => ({ ...p, skills: updated }));
                            }}
                            className="font-bold text-sm bg-white dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700"
                            placeholder="Skill Name"
                          />
                          <select
                            value={skill.category}
                            onChange={(e) => {
                              const updated = [...formData.skills];
                              updated[index] = { ...skill, category: e.target.value as any };
                              setFormData((p) => ({ ...p, skills: updated }));
                            }}
                            className="text-xs bg-white dark:bg-slate-800 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700"
                          >
                            <option value="Frontend">Frontend</option>
                            <option value="Programming Languages">Programming Languages</option>
                            <option value="Tools & Version Control">Tools & Version Control</option>
                            <option value="Core Concepts">Core Concepts</option>
                          </select>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((p) => ({
                              ...p,
                              skills: p.skills.filter((s) => s.id !== skill.id),
                            }));
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] text-slate-500 mb-1">
                            Proficiency Level & Percentage ({skill.percentage}%)
                          </label>
                          <div className="flex items-center gap-3">
                            <select
                              value={skill.level}
                              onChange={(e) => {
                                const updated = [...formData.skills];
                                updated[index] = { ...skill, level: e.target.value as any };
                                setFormData((p) => ({ ...p, skills: updated }));
                              }}
                              className="text-xs bg-white dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700"
                            >
                              <option value="Advanced">Advanced</option>
                              <option value="Proficient">Proficient</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Familiar">Familiar</option>
                            </select>
                            <input
                              type="range"
                              min="10"
                              max="100"
                              value={skill.percentage}
                              onChange={(e) => {
                                const updated = [...formData.skills];
                                updated[index] = { ...skill, percentage: Number(e.target.value) };
                                setFormData((p) => ({ ...p, skills: updated }));
                              }}
                              className="flex-1 accent-teal-600"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] text-slate-500 mb-1">
                            Tags (comma separated)
                          </label>
                          <input
                            type="text"
                            value={skill.tags.join(', ')}
                            onChange={(e) => {
                              const updated = [...formData.skills];
                              updated[index] = {
                                ...skill,
                                tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                              };
                              setFormData((p) => ({ ...p, skills: updated }));
                            }}
                            className="w-full text-xs bg-white dark:bg-slate-800 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700"
                          />
                        </div>
                      </div>

                      <div>
                        <input
                          type="text"
                          value={skill.description}
                          onChange={(e) => {
                            const updated = [...formData.skills];
                            updated[index] = { ...skill, description: e.target.value };
                            setFormData((p) => ({ ...p, skills: updated }));
                          }}
                          placeholder="Skill description..."
                          className="w-full text-xs bg-white dark:bg-slate-800 px-2.5 py-1.5 rounded border border-slate-200 dark:border-slate-700"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Projects Manager Tab */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Projects</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Showcase your live portfolio works, repositories, and interactive demos.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newProj: Project = {
                        id: 'proj-' + Date.now(),
                        title: 'New Web Project',
                        shortDescription: 'Brief summary of what this project does.',
                        fullDescription: 'Comprehensive details on implementation and design.',
                        technologies: ['HTML5', 'CSS3', 'JavaScript'],
                        liveDemoUrl: '#',
                        githubUrl: 'https://github.com/namrataghosh',
                        category: 'Web Development',
                        demoType: 'portfolio',
                        highlights: ['Responsive design', 'Clean modern code'],
                      };
                      setFormData((p) => ({ ...p, projects: [...p.projects, newProj] }));
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Project</span>
                  </button>
                </div>

                <div className="space-y-5">
                  {formData.projects.map((project, index) => (
                    <div
                      key={project.id}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => {
                            const updated = [...formData.projects];
                            updated[index] = { ...project, title: e.target.value };
                            setFormData((p) => ({ ...p, projects: updated }));
                          }}
                          className="font-bold text-sm bg-white dark:bg-slate-800 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 flex-1"
                          placeholder="Project Title"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((p) => ({
                              ...p,
                              projects: p.projects.filter((pr) => pr.id !== project.id),
                            }));
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] text-slate-500 mb-1">Category</label>
                          <input
                            type="text"
                            value={project.category}
                            onChange={(e) => {
                              const updated = [...formData.projects];
                              updated[index] = { ...project, category: e.target.value as any };
                              setFormData((p) => ({ ...p, projects: updated }));
                            }}
                            className="w-full text-xs bg-white dark:bg-slate-800 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-500 mb-1">Demo Type</label>
                          <select
                            value={project.demoType}
                            onChange={(e) => {
                              const updated = [...formData.projects];
                              updated[index] = { ...project, demoType: e.target.value as any };
                              setFormData((p) => ({ ...p, projects: updated }));
                            }}
                            className="w-full text-xs bg-white dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700"
                          >
                            <option value="portfolio">Portfolio Demo</option>
                            <option value="registration">Registration Demo</option>
                            <option value="todo">To-Do Demo</option>
                            <option value="calculator">Calculator Demo</option>
                            <option value="landing">Landing Page Demo</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-500 mb-1">GitHub URL</label>
                          <input
                            type="url"
                            value={project.githubUrl}
                            onChange={(e) => {
                              const updated = [...formData.projects];
                              updated[index] = { ...project, githubUrl: e.target.value };
                              setFormData((p) => ({ ...p, projects: updated }));
                            }}
                            className="w-full text-xs bg-white dark:bg-slate-800 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] text-slate-500 mb-1">
                          Short Summary
                        </label>
                        <input
                          type="text"
                          value={project.shortDescription}
                          onChange={(e) => {
                            const updated = [...formData.projects];
                            updated[index] = { ...project, shortDescription: e.target.value };
                            setFormData((p) => ({ ...p, projects: updated }));
                          }}
                          className="w-full text-xs bg-white dark:bg-slate-800 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-slate-500 mb-1">
                          Technologies (comma separated)
                        </label>
                        <input
                          type="text"
                          value={project.technologies.join(', ')}
                          onChange={(e) => {
                            const updated = [...formData.projects];
                            updated[index] = {
                              ...project,
                              technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                            };
                            setFormData((p) => ({ ...p, projects: updated }));
                          }}
                          className="w-full text-xs bg-white dark:bg-slate-800 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Education Manager Tab */}
            {activeTab === 'education' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Education</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Manage degrees, academic timeline, institutions, and grades.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newEdu: EducationItem = {
                        id: 'edu-' + Date.now(),
                        degree: 'Degree or Diploma Name',
                        institution: 'Institute Name',
                        fieldOfStudy: 'Specialization',
                        year: '2024 - Present',
                        grade: 'Distinction',
                        location: 'West Bengal, India',
                        description: 'Academic highlights and coursework.',
                        highlights: ['Core subjects studied'],
                      };
                      setFormData((p) => ({ ...p, education: [...p.education, newEdu] }));
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Education</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.education.map((edu, index) => (
                    <div
                      key={edu.id}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => {
                            const updated = [...formData.education];
                            updated[index] = { ...edu, degree: e.target.value };
                            setFormData((p) => ({ ...p, education: updated }));
                          }}
                          className="font-bold text-sm bg-white dark:bg-slate-800 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 flex-1"
                          placeholder="Degree Name"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((p) => ({
                              ...p,
                              education: p.education.filter((e) => e.id !== edu.id),
                            }));
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] text-slate-500 mb-1">
                            Institution
                          </label>
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => {
                              const updated = [...formData.education];
                              updated[index] = { ...edu, institution: e.target.value };
                              setFormData((p) => ({ ...p, education: updated }));
                            }}
                            className="w-full text-xs bg-white dark:bg-slate-800 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-500 mb-1">
                            Duration / Years
                          </label>
                          <input
                            type="text"
                            value={edu.year}
                            onChange={(e) => {
                              const updated = [...formData.education];
                              updated[index] = { ...edu, year: e.target.value };
                              setFormData((p) => ({ ...p, education: updated }));
                            }}
                            className="w-full text-xs bg-white dark:bg-slate-800 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] text-slate-500 mb-1">
                          Description & Key Learnings
                        </label>
                        <textarea
                          rows={2}
                          value={edu.description || ''}
                          onChange={(e) => {
                            const updated = [...formData.education];
                            updated[index] = { ...edu, description: e.target.value };
                            setFormData((p) => ({ ...p, education: updated }));
                          }}
                          className="w-full text-xs bg-white dark:bg-slate-800 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. BCA Students Hub Manager Tab */}
            {activeTab === 'bca' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    BCA Students Section Manager
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Add, edit, or delete BCA learning resources, project ideas, and career guidance.
                  </p>
                </div>

                {/* Sub-section: Resources */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      1. Study Resources & Learning Guides ({formData.bca.resources.length})
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        const newRes: BCAResource = {
                          id: 'bca-res-' + Date.now(),
                          title: 'New Study Resource',
                          category: 'Free Courses',
                          description: 'Resource details and study focus.',
                          url: 'https://',
                          tags: ['Resource', 'BCA'],
                          recommendedSemester: 'Semester 1 - 2',
                        };
                        setFormData((p) => ({
                          ...p,
                          bca: {
                            ...p.bca,
                            resources: [...p.bca.resources, newRes],
                          },
                        }));
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-teal-600 text-white text-xs font-medium"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Resource</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formData.bca.resources.map((res, rIdx) => (
                      <div
                        key={res.id}
                        className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <input
                            type="text"
                            value={res.title}
                            onChange={(e) => {
                              const updated = [...formData.bca.resources];
                              updated[rIdx] = { ...res, title: e.target.value };
                              setFormData((p) => ({
                                ...p,
                                bca: { ...p.bca, resources: updated },
                              }));
                            }}
                            className="font-semibold text-xs px-2 py-1 rounded border border-slate-200 dark:border-slate-700 flex-1"
                            placeholder="Resource Title"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setFormData((p) => ({
                                ...p,
                                bca: {
                                  ...p.bca,
                                  resources: p.bca.resources.filter((r) => r.id !== res.id),
                                },
                              }));
                            }}
                            className="text-slate-400 hover:text-red-600 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={res.url || ''}
                            onChange={(e) => {
                              const updated = [...formData.bca.resources];
                              updated[rIdx] = { ...res, url: e.target.value };
                              setFormData((p) => ({
                                ...p,
                                bca: { ...p.bca, resources: updated },
                              }));
                            }}
                            placeholder="Resource URL (e.g. https://...)"
                            className="text-xs px-2 py-1 rounded border border-slate-200 dark:border-slate-700"
                          />
                          <input
                            type="text"
                            value={res.recommendedSemester || ''}
                            onChange={(e) => {
                              const updated = [...formData.bca.resources];
                              updated[rIdx] = { ...res, recommendedSemester: e.target.value };
                              setFormData((p) => ({
                                ...p,
                                bca: { ...p.bca, resources: updated },
                              }));
                            }}
                            placeholder="Recommended Semester"
                            className="text-xs px-2 py-1 rounded border border-slate-200 dark:border-slate-700"
                          />
                        </div>

                        <textarea
                          rows={2}
                          value={res.description}
                          onChange={(e) => {
                            const updated = [...formData.bca.resources];
                            updated[rIdx] = { ...res, description: e.target.value };
                            setFormData((p) => ({
                              ...p,
                              bca: { ...p.bca, resources: updated },
                            }));
                          }}
                          placeholder="Brief description..."
                          className="w-full text-xs px-2 py-1 rounded border border-slate-200 dark:border-slate-700"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sub-section: Project Ideas */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      2. Recommended Project Ideas ({formData.bca.projectIdeas.length})
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        const newIdea: BCAProjectIdea = {
                          id: 'bca-proj-' + Date.now(),
                          title: 'New Project Idea',
                          difficulty: 'Beginner',
                          semester: 'Semester 1 - 2',
                          technologies: ['C / C++', 'File Handling'],
                          description: 'Description of the recommended project.',
                          keyFeatures: ['Feature 1', 'Feature 2'],
                          learningOutcome: 'Outcome of completing this project.',
                        };
                        setFormData((p) => ({
                          ...p,
                          bca: {
                            ...p.bca,
                            projectIdeas: [...p.bca.projectIdeas, newIdea],
                          },
                        }));
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-teal-600 text-white text-xs font-medium"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Project Idea</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formData.bca.projectIdeas.map((idea, iIdx) => (
                      <div
                        key={idea.id}
                        className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <input
                            type="text"
                            value={idea.title}
                            onChange={(e) => {
                              const updated = [...formData.bca.projectIdeas];
                              updated[iIdx] = { ...idea, title: e.target.value };
                              setFormData((p) => ({
                                ...p,
                                bca: { ...p.bca, projectIdeas: updated },
                              }));
                            }}
                            className="font-semibold text-xs px-2 py-1 rounded border border-slate-200 dark:border-slate-700 flex-1"
                            placeholder="Project Title"
                          />
                          <select
                            value={idea.difficulty}
                            onChange={(e) => {
                              const updated = [...formData.bca.projectIdeas];
                              updated[iIdx] = { ...idea, difficulty: e.target.value as any };
                              setFormData((p) => ({
                                ...p,
                                bca: { ...p.bca, projectIdeas: updated },
                              }));
                            }}
                            className="text-xs px-2 py-1 rounded border border-slate-200 dark:border-slate-700"
                          >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced / Capstone">Advanced / Capstone</option>
                          </select>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData((p) => ({
                                ...p,
                                bca: {
                                  ...p.bca,
                                  projectIdeas: p.bca.projectIdeas.filter((i) => i.id !== idea.id),
                                },
                              }));
                            }}
                            className="text-slate-400 hover:text-red-600 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={idea.semester}
                            onChange={(e) => {
                              const updated = [...formData.bca.projectIdeas];
                              updated[iIdx] = { ...idea, semester: e.target.value };
                              setFormData((p) => ({
                                ...p,
                                bca: { ...p.bca, projectIdeas: updated },
                              }));
                            }}
                            placeholder="Semester (e.g. Semester 2 - 3)"
                            className="text-xs px-2 py-1 rounded border border-slate-200 dark:border-slate-700"
                          />
                          <input
                            type="text"
                            value={idea.technologies.join(', ')}
                            onChange={(e) => {
                              const updated = [...formData.bca.projectIdeas];
                              updated[iIdx] = {
                                ...idea,
                                technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                              };
                              setFormData((p) => ({
                                ...p,
                                bca: { ...p.bca, projectIdeas: updated },
                              }));
                            }}
                            placeholder="Technologies (comma-separated)"
                            className="text-xs px-2 py-1 rounded border border-slate-200 dark:border-slate-700"
                          />
                        </div>

                        <textarea
                          rows={2}
                          value={idea.description}
                          onChange={(e) => {
                            const updated = [...formData.bca.projectIdeas];
                            updated[iIdx] = { ...idea, description: e.target.value };
                            setFormData((p) => ({
                              ...p,
                              bca: { ...p.bca, projectIdeas: updated },
                            }));
                          }}
                          placeholder="Project description..."
                          className="w-full text-xs px-2 py-1 rounded border border-slate-200 dark:border-slate-700"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sub-section: Career Opportunities */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      3. Career Opportunities & Higher Education ({formData.bca.careerOpportunities.length})
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        const newCareer: BCACareerPath = {
                          id: 'bca-career-' + Date.now(),
                          role: 'New Career Opportunity',
                          salaryRange: '₹4 LPA - ₹7 LPA',
                          description: 'Overview of role responsibilities and industry scope.',
                          requiredSkills: ['Core Programming', 'Database', 'Git'],
                          futureOptions: 'Next milestone in this track',
                        };
                        setFormData((p) => ({
                          ...p,
                          bca: {
                            ...p.bca,
                            careerOpportunities: [...p.bca.careerOpportunities, newCareer],
                          },
                        }));
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-teal-600 text-white text-xs font-medium"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Career Path</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formData.bca.careerOpportunities.map((career, cIdx) => (
                      <div
                        key={career.id}
                        className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <input
                            type="text"
                            value={career.role}
                            onChange={(e) => {
                              const updated = [...formData.bca.careerOpportunities];
                              updated[cIdx] = { ...career, role: e.target.value };
                              setFormData((p) => ({
                                ...p,
                                bca: { ...p.bca, careerOpportunities: updated },
                              }));
                            }}
                            className="font-semibold text-xs px-2 py-1 rounded border border-slate-200 dark:border-slate-700 flex-1"
                            placeholder="Career Role"
                          />
                          <input
                            type="text"
                            value={career.salaryRange || ''}
                            onChange={(e) => {
                              const updated = [...formData.bca.careerOpportunities];
                              updated[cIdx] = { ...career, salaryRange: e.target.value };
                              setFormData((p) => ({
                                ...p,
                                bca: { ...p.bca, careerOpportunities: updated },
                              }));
                            }}
                            placeholder="Salary range"
                            className="text-xs px-2 py-1 rounded border border-slate-200 dark:border-slate-700 w-36"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setFormData((p) => ({
                                ...p,
                                bca: {
                                  ...p.bca,
                                  careerOpportunities: p.bca.careerOpportunities.filter((c) => c.id !== career.id),
                                },
                              }));
                            }}
                            className="text-slate-400 hover:text-red-600 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <textarea
                          rows={2}
                          value={career.description}
                          onChange={(e) => {
                            const updated = [...formData.bca.careerOpportunities];
                            updated[cIdx] = { ...career, description: e.target.value };
                            setFormData((p) => ({
                              ...p,
                              bca: { ...p.bca, careerOpportunities: updated },
                            }));
                          }}
                          placeholder="Career description..."
                          className="w-full text-xs px-2 py-1 rounded border border-slate-200 dark:border-slate-700"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 6. Social Links Tab */}
            {activeTab === 'social' && (
              <div className="space-y-6 max-w-xl">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Contact & Social Profiles
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Update links to your GitHub, LinkedIn, Instagram and contact email.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      GitHub Profile URL
                    </label>
                    <input
                      type="url"
                      value={formData.socialLinks.github}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          socialLinks: { ...p.socialLinks, github: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      LinkedIn Profile URL
                    </label>
                    <input
                      type="url"
                      value={formData.socialLinks.linkedin}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          socialLinks: { ...p.socialLinks, linkedin: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Instagram Profile URL
                    </label>
                    <input
                      type="url"
                      value={formData.socialLinks.instagram}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          socialLinks: { ...p.socialLinks, instagram: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.socialLinks.email}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          socialLinks: { ...p.socialLinks, email: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 7. Inbox / Messages Tab */}
            {activeTab === 'messages' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Contact Form Messages Inbox ({messages.length})
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Review inquiries sent by recruiters, students, and visitors from the website contact form.
                  </p>
                </div>

                {messages.length === 0 ? (
                  <div className="p-8 text-center rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-400">
                    <Inbox className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-xs">No incoming messages in the inbox yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <span className="font-bold text-sm text-slate-900 dark:text-white">
                              {msg.name}
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
                              &lt;{msg.email}&gt;
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-[11px] text-slate-400">
                              {new Date(msg.timestamp).toLocaleDateString()}
                            </span>
                            {msg.id && (
                              <button
                                type="button"
                                onClick={() => msg.id && deleteMessage(msg.id)}
                                className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                                title="Delete message"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        {msg.subject && (
                          <div className="text-xs font-semibold text-teal-700 dark:text-teal-400">
                            Subject: {msg.subject}
                          </div>
                        )}

                        <p className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                          {msg.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 8. Account Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6 max-w-md">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Account Security & Password
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Change your admin credentials to secure your cross-device login.
                  </p>
                </div>

                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  {passNotice && (
                    <div
                      className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                        passNotice.type === 'success'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}
                    >
                      {passNotice.type === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 shrink-0" />
                      )}
                      <span>{passNotice.text}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      required
                      value={currentPass}
                      onChange={(e) => setCurrentPass(e.target.value)}
                      placeholder="Current password"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      New Password (minimum 6 characters)
                    </label>
                    <input
                      type="password"
                      required
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="New strong password"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="py-2 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-sm transition-all"
                  >
                    Update Password
                  </button>
                </form>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  <span className="font-semibold text-slate-900 dark:text-white block">
                    Cloud Database Security Note:
                  </span>
                  <p>
                    Passwords are never stored in frontend code. They are salted and hashed with PBKDF2/scrypt cryptographic algorithms on the backend server.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
