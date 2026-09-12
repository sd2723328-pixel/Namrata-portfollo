export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Programming Languages' | 'Tools & Version Control' | 'Core Concepts';
  level: 'Advanced' | 'Proficient' | 'Intermediate' | 'Familiar';
  percentage: number;
  description: string;
  icon: string;
  tags: string[];
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  liveDemoUrl: string;
  githubUrl: string;
  category: 'Web Development' | 'JavaScript' | 'Responsive Design' | 'Frontend';
  demoType: 'portfolio' | 'registration' | 'todo' | 'calculator' | 'landing';
  highlights: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  fieldOfStudy?: string;
  year: string;
  grade?: string;
  location?: string;
  description?: string;
  highlights?: string[];
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  instagram: string;
  email: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  timestamp: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  location: string;
  availability: string;
  tagline: string;
  shortBio: string;
  fullAbout: string;
  profilePhoto?: string;
}

export interface BCALanguageTool {
  id: string;
  name: string;
  category: 'Language' | 'Database' | 'Tool' | 'Web Tech';
  role: string;
  whyUseful: string;
  recommendedSemester: string;
  iconName?: string;
}

export interface BCAResource {
  id: string;
  title: string;
  category: 'Languages & Tools' | 'Study Guidance' | 'Documentation' | 'Free Courses' | 'Practice Platforms';
  description: string;
  url?: string;
  tags: string[];
  recommendedSemester?: string;
}

export interface BCAProjectIdea {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced / Capstone';
  semester: string;
  technologies: string[];
  description: string;
  keyFeatures: string[];
  learningOutcome: string;
}

export interface BCACareerPath {
  id: string;
  role: string;
  salaryRange?: string;
  description: string;
  requiredSkills: string[];
  futureOptions: string;
}

export interface BCASectionData {
  overview: {
    title: string;
    description: string;
    keyHighlights: string[];
    coreSubjects: string[];
  };
  languagesAndTools: BCALanguageTool[];
  resources: BCAResource[];
  projectIdeas: BCAProjectIdea[];
  careerOpportunities: BCACareerPath[];
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  socialLinks: SocialLinks;
  skills: Skill[];
  projects: Project[];
  education: EducationItem[];
  bca: BCASectionData;
  updatedAt?: string;
}

export interface AuthUser {
  name: string;
  email: string;
  role: 'admin';
}

