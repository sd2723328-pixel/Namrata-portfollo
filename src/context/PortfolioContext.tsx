import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  PortfolioData,
  PersonalInfo,
  SocialLinks,
  Skill,
  Project,
  EducationItem,
  BCAResource,
  BCAProjectIdea,
  BCACareerPath,
  BCASectionData,
  ContactMessage,
  AuthUser,
} from '../types';
import { DEFAULT_PORTFOLIO_DATA } from '../data/portfolioData';

interface PortfolioContextType {
  portfolio: PortfolioData;
  isLoading: boolean;
  isSaving: boolean;
  syncStatus: 'synced' | 'saving' | 'error' | 'local';
  lastSaved: string | null;
  errorMessage: string | null;

  // Authentication
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  changePassword: (currentPass: string, newPass: string) => Promise<{ success: boolean; error?: string }>;

  // Cloud persistence
  savePortfolio: (data?: Partial<PortfolioData>) => Promise<{ success: boolean; error?: string }>;
  resetToDefault: () => Promise<boolean>;

  // Admin section updates
  updatePersonalInfo: (info: Partial<PersonalInfo>) => Promise<boolean>;
  updateSocialLinks: (links: Partial<SocialLinks>) => Promise<boolean>;
  
  // Skills
  addSkill: (skill: Omit<Skill, 'id'>) => Promise<boolean>;
  updateSkill: (skill: Skill) => Promise<boolean>;
  deleteSkill: (id: string) => Promise<boolean>;

  // Projects
  addProject: (project: Omit<Project, 'id'>) => Promise<boolean>;
  updateProject: (project: Project) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;

  // Education
  addEducation: (edu: Omit<EducationItem, 'id'>) => Promise<boolean>;
  updateEducation: (edu: EducationItem) => Promise<boolean>;
  deleteEducation: (id: string) => Promise<boolean>;

  // BCA Student Resources
  updateBCAOverview: (overview: BCASectionData['overview']) => Promise<boolean>;
  addBCAResource: (res: Omit<BCAResource, 'id'>) => Promise<boolean>;
  updateBCAResource: (res: BCAResource) => Promise<boolean>;
  deleteBCAResource: (id: string) => Promise<boolean>;

  addBCAProjectIdea: (idea: Omit<BCAProjectIdea, 'id'>) => Promise<boolean>;
  updateBCAProjectIdea: (idea: BCAProjectIdea) => Promise<boolean>;
  deleteBCAProjectIdea: (id: string) => Promise<boolean>;

  addBCACareerPath: (career: Omit<BCACareerPath, 'id'>) => Promise<boolean>;
  updateBCACareerPath: (career: BCACareerPath) => Promise<boolean>;
  deleteBCACareerPath: (id: string) => Promise<boolean>;

  // Contact messages
  messages: ContactMessage[];
  fetchMessages: () => Promise<void>;
  deleteMessage: (id: string) => Promise<boolean>;
  submitContactMessage: (msg: { name: string; email: string; subject?: string; message: string }) => Promise<{ success: boolean; message: string }>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const TOKEN_STORAGE_KEY = 'namrata_auth_token';

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [portfolio, setPortfolio] = useState<PortfolioData>(DEFAULT_PORTFOLIO_DATA);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'saving' | 'error' | 'local'>('local');
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Auth State
  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem(TOKEN_STORAGE_KEY);
    } catch {
      return null;
    }
  });
  const [user, setUser] = useState<AuthUser | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  // 1. Initial Load: Fetch portfolio from Cloud API
  const fetchPortfolio = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/portfolio');
      if (res.ok) {
        const data = await res.json();
        setPortfolio(data);
        setSyncStatus('synced');
        setLastSaved(data.updatedAt || new Date().toISOString());
      } else {
        console.warn('API fetch returned non-200, using local defaults');
        setSyncStatus('local');
      }
    } catch (err) {
      console.warn('Network error fetching portfolio, fallback to local', err);
      setSyncStatus('local');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 2. Validate session token if present
  const checkAuth = useCallback(async () => {
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated && data.user) {
          setUser(data.user);
        } else {
          setToken(null);
          localStorage.removeItem(TOKEN_STORAGE_KEY);
        }
      } else {
        setToken(null);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
      }
    } catch {
      // offline or server restarting
    }
  }, [token]);

  useEffect(() => {
    fetchPortfolio();
    checkAuth();
  }, [fetchPortfolio, checkAuth]);

  // Fetch messages if user is authenticated
  const fetchMessages = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/contact/messages', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error('Failed to fetch messages', err);
    }
  }, [token]);

  useEffect(() => {
    if (user && token) {
      fetchMessages();
    }
  }, [user, token, fetchMessages]);

  // Authentication: Login
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setErrorMessage(null);
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Invalid credentials' };
      }

      setToken(data.token);
      setUser(data.user);
      try {
        localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
      } catch {}
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network connection failed' };
    }
  };

  // Authentication: Logout
  const logout = async () => {
    if (token) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch {}
    }
    setToken(null);
    setUser(null);
    try {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    } catch {}
  };

  // Authentication: Change Password
  const changePassword = async (currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
    if (!token) return { success: false, error: 'Not authenticated' };
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Failed to update password' };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error' };
    }
  };

  // Cloud Save Portfolio
  const savePortfolio = async (partialData?: Partial<PortfolioData>): Promise<{ success: boolean; error?: string }> => {
    const dataToSave: PortfolioData = {
      ...portfolio,
      ...(partialData || {}),
    };

    // Optimistic UI update
    setPortfolio(dataToSave);
    setIsSaving(true);
    setSyncStatus('saving');

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch('/api/portfolio', {
        method: 'PUT',
        headers,
        body: JSON.stringify(dataToSave),
      });

      if (res.ok) {
        const responseData = await res.json();
        setPortfolio(responseData.portfolio || dataToSave);
        setSyncStatus('synced');
        setLastSaved(new Date().toISOString());
        setIsSaving(false);
        return { success: true };
      } else {
        const errData = await res.json();
        setSyncStatus('error');
        setIsSaving(false);
        return { success: false, error: errData.error || 'Failed to save to cloud' };
      }
    } catch (err: any) {
      console.warn('Network error saving to cloud', err);
      setSyncStatus('local');
      setIsSaving(false);
      return { success: false, error: 'Network error: Saved locally only' };
    }
  };

  // Reset to Default
  const resetToDefault = async (): Promise<boolean> => {
    try {
      if (!token) return false;
      const res = await fetch('/api/portfolio/reset', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setPortfolio(data.portfolio || DEFAULT_PORTFOLIO_DATA);
        setSyncStatus('synced');
        setLastSaved(new Date().toISOString());
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // Granular Section Helpers
  const updatePersonalInfo = async (info: Partial<PersonalInfo>): Promise<boolean> => {
    const updated: PortfolioData = {
      ...portfolio,
      personalInfo: {
        ...portfolio.personalInfo,
        ...info,
      },
    };
    const res = await savePortfolio(updated);
    return res.success;
  };

  const updateSocialLinks = async (links: Partial<SocialLinks>): Promise<boolean> => {
    const updated: PortfolioData = {
      ...portfolio,
      socialLinks: {
        ...portfolio.socialLinks,
        ...links,
      },
    };
    const res = await savePortfolio(updated);
    return res.success;
  };

  // Skills
  const addSkill = async (skillData: Omit<Skill, 'id'>): Promise<boolean> => {
    const newSkill: Skill = {
      ...skillData,
      id: 'skill-' + Date.now(),
    };
    const updated: PortfolioData = {
      ...portfolio,
      skills: [...portfolio.skills, newSkill],
    };
    const res = await savePortfolio(updated);
    return res.success;
  };

  const updateSkill = async (skill: Skill): Promise<boolean> => {
    const updated: PortfolioData = {
      ...portfolio,
      skills: portfolio.skills.map((s) => (s.id === skill.id ? skill : s)),
    };
    const res = await savePortfolio(updated);
    return res.success;
  };

  const deleteSkill = async (id: string): Promise<boolean> => {
    const updated: PortfolioData = {
      ...portfolio,
      skills: portfolio.skills.filter((s) => s.id !== id),
    };
    const res = await savePortfolio(updated);
    return res.success;
  };

  // Projects
  const addProject = async (projData: Omit<Project, 'id'>): Promise<boolean> => {
    const newProject: Project = {
      ...projData,
      id: 'proj-' + Date.now(),
    };
    const updated: PortfolioData = {
      ...portfolio,
      projects: [...portfolio.projects, newProject],
    };
    const res = await savePortfolio(updated);
    return res.success;
  };

  const updateProject = async (project: Project): Promise<boolean> => {
    const updated: PortfolioData = {
      ...portfolio,
      projects: portfolio.projects.map((p) => (p.id === project.id ? project : p)),
    };
    const res = await savePortfolio(updated);
    return res.success;
  };

  const deleteProject = async (id: string): Promise<boolean> => {
    const updated: PortfolioData = {
      ...portfolio,
      projects: portfolio.projects.filter((p) => p.id !== id),
    };
    const res = await savePortfolio(updated);
    return res.success;
  };

  // Education
  const addEducation = async (eduData: Omit<EducationItem, 'id'>): Promise<boolean> => {
    const newEdu: EducationItem = {
      ...eduData,
      id: 'edu-' + Date.now(),
    };
    const updated: PortfolioData = {
      ...portfolio,
      education: [...portfolio.education, newEdu],
    };
    const res = await savePortfolio(updated);
    return res.success;
  };

  const updateEducation = async (edu: EducationItem): Promise<boolean> => {
    const updated: PortfolioData = {
      ...portfolio,
      education: portfolio.education.map((e) => (e.id === edu.id ? edu : e)),
    };
    const res = await savePortfolio(updated);
    return res.success;
  };

  const deleteEducation = async (id: string): Promise<boolean> => {
    const updated: PortfolioData = {
      ...portfolio,
      education: portfolio.education.filter((e) => e.id !== id),
    };
    const res = await savePortfolio(updated);
    return res.success;
  };

  // BCA Student Resources
  const updateBCAOverview = async (overview: BCASectionData['overview']): Promise<boolean> => {
    const updated: PortfolioData = {
      ...portfolio,
      bca: {
        ...portfolio.bca,
        overview,
      },
    };
    const res = await savePortfolio(updated);
    return res.success;
  };

  const addBCAResource = async (resData: Omit<BCAResource, 'id'>): Promise<boolean> => {
    const newRes: BCAResource = {
      ...resData,
      id: 'bca-res-' + Date.now(),
    };
    const updated: PortfolioData = {
      ...portfolio,
      bca: {
        ...portfolio.bca,
        resources: [...portfolio.bca.resources, newRes],
      },
    };
    const res = await savePortfolio(updated);
    return res.success;
  };

  const updateBCAResource = async (resourceItem: BCAResource): Promise<boolean> => {
    const updated: PortfolioData = {
      ...portfolio,
      bca: {
        ...portfolio.bca,
        resources: portfolio.bca.resources.map((r) => (r.id === resourceItem.id ? resourceItem : r)),
      },
    };
    const saveResult = await savePortfolio(updated);
    return saveResult.success;
  };

  const deleteBCAResource = async (id: string): Promise<boolean> => {
    const updated: PortfolioData = {
      ...portfolio,
      bca: {
        ...portfolio.bca,
        resources: portfolio.bca.resources.filter((r) => r.id !== id),
      },
    };
    const res = await savePortfolio(updated);
    return res.success;
  };

  const addBCAProjectIdea = async (ideaData: Omit<BCAProjectIdea, 'id'>): Promise<boolean> => {
    const newIdea: BCAProjectIdea = {
      ...ideaData,
      id: 'bca-proj-' + Date.now(),
    };
    const updated: PortfolioData = {
      ...portfolio,
      bca: {
        ...portfolio.bca,
        projectIdeas: [...portfolio.bca.projectIdeas, newIdea],
      },
    };
    const res = await savePortfolio(updated);
    return res.success;
  };

  const updateBCAProjectIdea = async (idea: BCAProjectIdea): Promise<boolean> => {
    const updated: PortfolioData = {
      ...portfolio,
      bca: {
        ...portfolio.bca,
        projectIdeas: portfolio.bca.projectIdeas.map((p) => (p.id === idea.id ? idea : p)),
      },
    };
    const res = await savePortfolio(updated);
    return res.success;
  };

  const deleteBCAProjectIdea = async (id: string): Promise<boolean> => {
    const updated: PortfolioData = {
      ...portfolio,
      bca: {
        ...portfolio.bca,
        projectIdeas: portfolio.bca.projectIdeas.filter((p) => p.id !== id),
      },
    };
    const res = await savePortfolio(updated);
    return res.success;
  };

  const addBCACareerPath = async (careerData: Omit<BCACareerPath, 'id'>): Promise<boolean> => {
    const newCareer: BCACareerPath = {
      ...careerData,
      id: 'bca-career-' + Date.now(),
    };
    const updated: PortfolioData = {
      ...portfolio,
      bca: {
        ...portfolio.bca,
        careerOpportunities: [...portfolio.bca.careerOpportunities, newCareer],
      },
    };
    const res = await savePortfolio(updated);
    return res.success;
  };

  const updateBCACareerPath = async (career: BCACareerPath): Promise<boolean> => {
    const updated: PortfolioData = {
      ...portfolio,
      bca: {
        ...portfolio.bca,
        careerOpportunities: portfolio.bca.careerOpportunities.map((c) => (c.id === career.id ? career : c)),
      },
    };
    const res = await savePortfolio(updated);
    return res.success;
  };

  const deleteBCACareerPath = async (id: string): Promise<boolean> => {
    const updated: PortfolioData = {
      ...portfolio,
      bca: {
        ...portfolio.bca,
        careerOpportunities: portfolio.bca.careerOpportunities.filter((c) => c.id !== id),
      },
    };
    const res = await savePortfolio(updated);
    return res.success;
  };

  // Contact form submission
  const submitContactMessage = async (msg: {
    name: string;
    email: string;
    subject?: string;
    message: string;
  }): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msg),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        return { success: true, message: data.message || 'Message sent successfully!' };
      }
      return { success: false, message: data.error || 'Failed to submit message' };
    } catch {
      return { success: false, message: 'Network error sending message. Please try again.' };
    }
  };

  const deleteMessage = async (id: string): Promise<boolean> => {
    if (!token) return false;
    try {
      const res = await fetch(`/api/contact/messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        isLoading,
        isSaving,
        syncStatus,
        lastSaved,
        errorMessage,
        user,
        token,
        isAuthenticated: !!user,
        login,
        logout,
        changePassword,
        savePortfolio,
        resetToDefault,
        updatePersonalInfo,
        updateSocialLinks,
        addSkill,
        updateSkill,
        deleteSkill,
        addProject,
        updateProject,
        deleteProject,
        addEducation,
        updateEducation,
        deleteEducation,
        updateBCAOverview,
        addBCAResource,
        updateBCAResource,
        deleteBCAResource,
        addBCAProjectIdea,
        updateBCAProjectIdea,
        deleteBCAProjectIdea,
        addBCACareerPath,
        updateBCACareerPath,
        deleteBCACareerPath,
        messages,
        fetchMessages,
        deleteMessage,
        submitContactMessage,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export function usePortfolio(): PortfolioContextType {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
