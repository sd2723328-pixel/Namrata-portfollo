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
  name: string;
  email: string;
  subject?: string;
  message: string;
  timestamp: string;
}
