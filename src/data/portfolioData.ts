import { Skill, Project, EducationItem, SocialLinks } from '../types';

export const PERSONAL_INFO = {
  name: 'Namrata Ghosh',
  title: 'Aspiring Web Developer',
  email: 'namrataghosh9832@gmail.com',
  location: 'Kolkata, India',
  availability: 'Open for Internships & Junior Roles',
  tagline: 'Crafting responsive, user-friendly digital experiences with clean code and modern web technologies.',
  shortBio: "Hi, I'm Namrata Ghosh. I am an aspiring web developer with a strong foundation in modern web technologies and programming. I love turning concepts into interactive, responsive websites and am constantly driven by curiosity to explore new tools and frameworks.",
  fullAbout: "I am an enthusiastic aspiring web developer with a genuine passion for writing clean, structured code and bringing intuitive user interfaces to life. My journey began with core programming foundations in C, C++, and Python, which taught me analytical thinking and problem-solving. As I ventured into web development with HTML, CSS, and JavaScript, I discovered the creative joy of building interactive, mobile-friendly applications from scratch.\n\nI believe great software is born at the intersection of aesthetic design, responsive layouts, and performance. Whether it's organizing state in JavaScript, mastering modern flexbox and grid layouts, or tracking changes with Git & GitHub, I am dedicated to continuous improvement and excited to contribute to collaborative engineering teams."
};

export const INITIAL_SOCIAL_LINKS: SocialLinks = {
  github: 'https://github.com/namrataghosh',
  linkedin: 'https://linkedin.com/in/namrata-ghosh',
  instagram: 'https://instagram.com/namrata_dev',
  email: 'namrataghosh9832@gmail.com'
};

export const SKILLS_DATA: Skill[] = [
  {
    id: 'html',
    name: 'HTML',
    category: 'Frontend',
    level: 'Advanced',
    percentage: 92,
    description: 'Semantic HTML5 structure, accessible markup (ARIA), modern DOM APIs, and SEO optimization.',
    icon: 'FileCode2',
    tags: ['HTML5', 'Semantic Web', 'Accessibility', 'SEO']
  },
  {
    id: 'css',
    name: 'CSS',
    category: 'Frontend',
    level: 'Advanced',
    percentage: 88,
    description: 'Modern CSS3, Flexbox, CSS Grid, custom properties, animations, and fluid typography.',
    icon: 'Palette',
    tags: ['CSS3', 'Flexbox', 'CSS Grid', 'Keyframes', 'Variables']
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Frontend',
    level: 'Proficient',
    percentage: 84,
    description: 'ES6+ syntax, asynchronous programming (Promises, async/await), DOM manipulation, and event handling.',
    icon: 'Code2',
    tags: ['ES6+', 'Async/Await', 'DOM Manipulation', 'Event Loop']
  },
  {
    id: 'c',
    name: 'C',
    category: 'Programming Languages',
    level: 'Intermediate',
    percentage: 78,
    description: 'Structured programming, pointers, memory allocation, algorithms, and core system concepts.',
    icon: 'Cpu',
    tags: ['Pointers', 'Memory Management', 'Data Structures', 'Procedural']
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'Programming Languages',
    level: 'Intermediate',
    percentage: 80,
    description: 'Object-Oriented Programming (OOP), classes, inheritance, polymorphism, and STL containers.',
    icon: 'Layers',
    tags: ['OOP', 'STL', 'Templates', 'Classes & Objects']
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Programming Languages',
    level: 'Intermediate',
    percentage: 76,
    description: 'Scripting, algorithmic logic, data processing, basic automation, and clean pythonic syntax.',
    icon: 'Terminal',
    tags: ['Scripting', 'Data Processing', 'Automation', 'Functions']
  },
  {
    id: 'git-github',
    name: 'Git & GitHub',
    category: 'Tools & Version Control',
    level: 'Proficient',
    percentage: 85,
    description: 'Version control workflows, commit management, branching, pull requests, and collaborative repository hosting.',
    icon: 'GitBranch',
    tags: ['Git CLI', 'Branching', 'Pull Requests', 'Open Source']
  },
  {
    id: 'responsive-design',
    name: 'Responsive Web Design',
    category: 'Core Concepts',
    level: 'Advanced',
    percentage: 90,
    description: 'Mobile-first design principles, media queries, adaptive layouts across phone, tablet, and desktop viewports.',
    icon: 'Smartphone',
    tags: ['Mobile-First', 'Media Queries', 'Adaptive Layouts', 'Cross-Browser']
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'personal-portfolio',
    title: 'Personal Portfolio Website',
    shortDescription: 'A sleek, modern developer portfolio showcasing skills, interactive live demos, and contact integration.',
    fullDescription: 'Designed and engineered a high-performance, fully responsive personal portfolio website with dark/light themes, fluid scroll animations, interactive project mini-demos, and modular architecture.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind CSS'],
    liveDemoUrl: '#',
    githubUrl: 'https://github.com/namrataghosh/personal-portfolio',
    category: 'Web Development',
    demoType: 'portfolio',
    highlights: [
      'Interactive dark/light theme with local persistence',
      'Smooth scroll navigation and mobile drawer menu',
      'Customizable education timeline and interactive demo previewers'
    ]
  },
  {
    id: 'student-registration-form',
    title: 'Student Registration Form',
    shortDescription: 'Interactive registration portal featuring comprehensive real-time validation, dynamic preview, and storage.',
    fullDescription: 'A structured educational registration web app that validates input fields in real-time (email format, phone digits, roll number, course selection), prevents invalid submissions, and saves registered records to local storage with instant preview table.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Form Validation', 'LocalStorage'],
    liveDemoUrl: '#',
    githubUrl: 'https://github.com/namrataghosh/student-registration-form',
    category: 'Frontend',
    demoType: 'registration',
    highlights: [
      'Client-side instant field validation with custom error hints',
      'Saved student roster table with search & delete actions',
      'Accessible form controls with proper ARIA labels'
    ]
  },
  {
    id: 'todo-list',
    title: 'To-Do List Application',
    shortDescription: 'Feature-rich task manager with priority filtering, completion states, and persistent local storage.',
    fullDescription: 'A lightweight and responsive productivity application for managing daily goals. Features task creation, priority flags (High, Medium, Low), category filtering (All, Active, Completed), item counter, and local storage synchronization.',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'DOM APIs', 'LocalStorage'],
    liveDemoUrl: '#',
    githubUrl: 'https://github.com/namrataghosh/todo-list',
    category: 'JavaScript',
    demoType: 'todo',
    highlights: [
      'Add, toggle status, and delete tasks instantly',
      'Filter tasks by All, Active, and Completed categories',
      'Automatic state persistence across browser reloads'
    ]
  },
  {
    id: 'calculator',
    title: 'Interactive Web Calculator',
    shortDescription: 'Clean, modern calculator supporting arithmetic calculations, decimal precision, and keyboard events.',
    fullDescription: 'A responsive digital calculator styled with sleek glassmorphism and tactile key feedbacks. Supports standard arithmetic operations (+, -, *, /), percentage calculations, clear/backspace functions, and physical keyboard input bindings.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Event Handling', 'Math Logic'],
    liveDemoUrl: '#',
    githubUrl: 'https://github.com/namrataghosh/calculator',
    category: 'JavaScript',
    demoType: 'calculator',
    highlights: [
      'Accurate arithmetic chain operations and decimal checks',
      'Responsive keypad with active click and keyboard press feedback',
      'History ribbon showing active expression'
    ]
  },
  {
    id: 'responsive-landing-page',
    title: 'Responsive Landing Page',
    shortDescription: 'High-converting, mobile-first product landing page featuring hero showcase, feature grid, and newsletter CTA.',
    fullDescription: 'A modern marketing landing page engineered from the ground up using mobile-first CSS architecture. Incorporates fluid CSS Grid and Flexbox cards, smooth section jump links, pricing tier tables, and an interactive FAQ accordion.',
    technologies: ['HTML5', 'Modern CSS', 'Flexbox', 'CSS Grid', 'Responsive Design'],
    liveDemoUrl: '#',
    githubUrl: 'https://github.com/namrataghosh/responsive-landing-page',
    category: 'Responsive Design',
    demoType: 'landing',
    highlights: [
      '100% fluid mobile, tablet, and widescreen adaptability',
      'Accessible interactive FAQ accordions and modern CTA banner',
      'Clean CSS Grid layout with zero external layout frameworks'
    ]
  }
];

export const INITIAL_EDUCATION_DATA: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'Bachelor of Technology (B.Tech) in Computer Science',
    institution: 'University / Institute Name (Editable)',
    fieldOfStudy: 'Computer Science & Engineering',
    year: '2023 - 2027 (Expected)',
    grade: 'First Class / Distinction',
    location: 'West Bengal, India',
    description: 'Pursuing foundational coursework in Data Structures, Object-Oriented Programming, Database Management Systems, and Web Technologies. Actively participating in coding hackathons and technical projects.',
    highlights: [
      'Relevant Coursework: Data Structures & Algorithms, OOP with C++, Web Technologies',
      'Active participant in coding competitions and technical student society',
      'Building practical software projects alongside academic curriculum'
    ]
  },
  {
    id: 'edu-2',
    degree: 'Higher Secondary Education (Class XII)',
    institution: 'Higher Secondary School (Editable)',
    fieldOfStudy: 'Science Stream (Physics, Chemistry, Mathematics, Computer Science)',
    year: '2021 - 2023',
    grade: 'Passed with Distinction',
    location: 'West Bengal, India',
    description: 'Completed higher secondary education with a rigorous focus on science and mathematics, developing early interests in programming logic and computational problem solving.',
    highlights: [
      'Focused on Mathematics, Physics, and Computer Science fundamentals',
      'Developed early algorithmic problem solving and logic building skills'
    ]
  }
];
