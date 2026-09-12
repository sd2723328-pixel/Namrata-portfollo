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

export const INITIAL_BCA_DATA = {
  overview: {
    title: 'Bachelor of Computer Applications (BCA)',
    description: 'The Bachelor of Computer Applications is a 3-year undergraduate degree designed to develop comprehensive technical competencies in computer programming, software engineering, web technologies, database architecture, and networking. It bridges theoretical computational principles with direct, hands-on software development skills desired by modern IT employers.',
    keyHighlights: [
      '3-Year full-time program across 6 balanced semesters',
      'Comprehensive balance of programming, mathematics, and software design',
      'Strong industry relevance with direct placement prospects in IT/Software companies',
      'Direct stepping stone to Master of Computer Applications (MCA) and global tech certifications'
    ],
    coreSubjects: [
      'C & C++ Programming',
      'Data Structures & Algorithms',
      'Database Management Systems (DBMS)',
      'Web Technologies (HTML, CSS, JS)',
      'Operating Systems & Linux',
      'Computer Networks & Security',
      'Software Engineering & Testing',
      'Java & Python Development'
    ]
  },
  languagesAndTools: [
    {
      id: 'bca-lang-1',
      name: 'C Language',
      category: 'Language' as const,
      role: 'Procedural Programming Foundation',
      whyUseful: 'Crucial for mastering memory allocation, pointers, compiler mechanisms, and low-level algorithmic logic in Semester 1 & 2.',
      recommendedSemester: 'Semester 1 - 2',
      iconName: 'Cpu'
    },
    {
      id: 'bca-lang-2',
      name: 'C++',
      category: 'Language' as const,
      role: 'Object-Oriented Programming (OOP)',
      whyUseful: 'Introduces core OOP principles (inheritance, polymorphism, encapsulation) and the Standard Template Library (STL) for fast problem solving.',
      recommendedSemester: 'Semester 2 - 3',
      iconName: 'Layers'
    },
    {
      id: 'bca-lang-3',
      name: 'Java',
      category: 'Language' as const,
      role: 'Enterprise & Platform Independence',
      whyUseful: 'Powers desktop, Android, and enterprise backend systems with robust exception handling, multithreading, and JDBC database connectivity.',
      recommendedSemester: 'Semester 3 - 4',
      iconName: 'Coffee'
    },
    {
      id: 'bca-lang-4',
      name: 'Python',
      category: 'Language' as const,
      role: 'Rapid Development & Scripting',
      whyUseful: 'Versatile for automation, web APIs (Flask/FastAPI), data analysis, and getting started with machine learning.',
      recommendedSemester: 'Semester 4 - 5',
      iconName: 'Terminal'
    },
    {
      id: 'bca-lang-5',
      name: 'HTML, CSS & JavaScript',
      category: 'Web Tech' as const,
      role: 'Modern Web Engineering',
      whyUseful: 'The universal language of the Internet. Enables building responsive client-side apps, dynamic single-page applications, and interactive user experiences.',
      recommendedSemester: 'Semester 2 - 4',
      iconName: 'Globe'
    },
    {
      id: 'bca-lang-6',
      name: 'SQL / MySQL / PostgreSQL',
      category: 'Database' as const,
      role: 'Relational Database Management (RDBMS)',
      whyUseful: 'Essential for designing schemas, writing normalized relational queries, ACID transactions, and connecting backends with persistent data.',
      recommendedSemester: 'Semester 3 - 4',
      iconName: 'Database'
    },
    {
      id: 'bca-lang-7',
      name: 'Git & GitHub',
      category: 'Tool' as const,
      role: 'Version Control & Team Collaboration',
      whyUseful: 'Industry standard for code versioning, branch management, code reviews, and maintaining a verifiable public portfolio for recruiters.',
      recommendedSemester: 'Semester 1 - 6 (All)',
      iconName: 'GitBranch'
    },
    {
      id: 'bca-lang-8',
      name: 'Linux / Terminal',
      category: 'Tool' as const,
      role: 'Operating System & Shell Essentials',
      whyUseful: 'Fundamental for web servers, Docker containers, cloud hosting, and shell scripting in modern DevOps workflows.',
      recommendedSemester: 'Semester 2 - 4',
      iconName: 'TerminalSquare'
    }
  ],
  resources: [
    {
      id: 'bca-res-1',
      title: 'freeCodeCamp - Web Development & JavaScript',
      category: 'Free Courses' as const,
      description: 'Comprehensive, project-based interactive curriculum covering Responsive Web Design, JavaScript Algorithms, and Full Stack development.',
      url: 'https://www.freecodecamp.org',
      tags: ['Free', 'Interactive', 'Certificates', 'Beginner Friendly'],
      recommendedSemester: 'Semester 2 - 4'
    },
    {
      id: 'bca-res-2',
      title: 'MDN Web Docs (Mozilla Developer Network)',
      category: 'Documentation' as const,
      description: 'The gold standard reference for HTML5, CSS3, and JavaScript APIs with live interactive examples and best practice guidelines.',
      url: 'https://developer.mozilla.org',
      tags: ['Reference', 'HTML/CSS/JS', 'Standards'],
      recommendedSemester: 'All Semesters'
    },
    {
      id: 'bca-res-3',
      title: 'GeeksforGeeks - Data Structures & Algorithms',
      category: 'Study Guidance' as const,
      description: 'Detailed topic-wise tutorials, visual diagrams, and code snippets in C, C++, and Java mapped directly to university BCA syllabus topics.',
      url: 'https://www.geeksforgeeks.org',
      tags: ['Syllabus Topics', 'C/C++', 'DSA', 'Exam Prep'],
      recommendedSemester: 'Semester 2 - 5'
    },
    {
      id: 'bca-res-4',
      title: 'CS50: Introduction to Computer Science (Harvard)',
      category: 'Free Courses' as const,
      description: 'A world-class foundational course covering C, Python, SQL, algorithms, and computational thinking taught by David J. Malan.',
      url: 'https://cs50.harvard.edu',
      tags: ['Harvard', 'Free Video Lectures', 'Logic Building'],
      recommendedSemester: 'Semester 1 - 2'
    },
    {
      id: 'bca-res-5',
      title: 'roadmap.sh - Developer Roadmaps',
      category: 'Study Guidance' as const,
      description: 'Step-by-step visual pathways for Frontend, Backend, DevOps, and Computer Science fundamentals.',
      url: 'https://roadmap.sh',
      tags: ['Career Roadmaps', 'Visual Guide', 'Up-to-Date'],
      recommendedSemester: 'All Semesters'
    },
    {
      id: 'bca-res-6',
      title: 'HackerRank & LeetCode (Beginner Tracks)',
      category: 'Practice Platforms' as const,
      description: 'Practice programming problem sets in C, C++, and Python to prepare for coding rounds and campus placement tests.',
      url: 'https://www.hackerrank.com',
      tags: ['Coding Practice', 'Problem Solving', 'Placement Prep'],
      recommendedSemester: 'Semester 3 - 6'
    }
  ],
  projectIdeas: [
    {
      id: 'bca-proj-1',
      title: 'Student Record Management System',
      difficulty: 'Beginner' as const,
      semester: 'Semester 1 - 2',
      technologies: ['C / C++', 'File Handling (fstream)', 'Data Structures'],
      description: 'A structured command-line application that allows administrators to add students, search by roll number, update marks, and calculate GPAs with persistent file storage.',
      keyFeatures: [
        'Add, edit, search, and delete student academic records',
        'Text file / binary file persistence using file streams',
        'Automatic grade computation and tabular report generation'
      ],
      learningOutcome: 'Deep understanding of pointers, structs/classes, file I/O, and structured menu navigation.'
    },
    {
      id: 'bca-proj-2',
      title: 'Interactive Personal Portfolio & Resume Website',
      difficulty: 'Beginner' as const,
      semester: 'Semester 2 - 3',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
      description: 'A modern, mobile-friendly personal portfolio showcasing projects, academic credentials, skills, and interactive contact forms.',
      keyFeatures: [
        'Responsive layout adjusting to phones, tablets, and desktops',
        'Dark and light mode theme toggle with local persistence',
        'Interactive project demo modals and contact submission validation'
      ],
      learningOutcome: 'Hands-on mastery of semantic HTML, Flexbox, CSS Grid, media queries, and DOM event handling.'
    },
    {
      id: 'bca-proj-3',
      title: 'College Library Management Portal',
      difficulty: 'Intermediate' as const,
      semester: 'Semester 3 - 4',
      technologies: ['HTML/CSS/JS', 'Node.js / Express or PHP', 'MySQL Database'],
      description: 'A web portal for cataloging books, tracking issue/return dates, calculating late fines, and generating member borrowing history.',
      keyFeatures: [
        'Relational database schema with normalized tables (Books, Members, Loans)',
        'Automated fine calculation based on due date difference',
        'Search books by ISBN, author name, or subject tag'
      ],
      learningOutcome: 'Understanding client-server communication, SQL queries (JOINs, GROUP BY), and session authentication.'
    },
    {
      id: 'bca-proj-4',
      title: 'Campus Placement & Recruitment Portal',
      difficulty: 'Advanced / Capstone' as const,
      semester: 'Semester 5 - 6',
      technologies: ['React', 'Express / Node.js', 'PostgreSQL or MongoDB', 'JWT Auth'],
      description: 'A full-fledged final year capstone project bridging campus students, training & placement officers (TPO), and recruiting companies.',
      keyFeatures: [
        'Role-Based Access Control: Student, Placement Officer, and Company Recruiter',
        'Job vacancy postings with minimum CGPA and skill eligibility filters',
        'Resume upload and one-click job application with status tracking'
      ],
      learningOutcome: 'Full-stack software architecture, RESTful API design, database indexing, and user authentication workflows.'
    }
  ],
  careerOpportunities: [
    {
      id: 'bca-career-1',
      role: 'Frontend / Web Developer',
      salaryRange: '₹3.5 LPA - ₹7 LPA (Entry Level)',
      description: 'Designs and builds responsive, interactive client interfaces for websites and SaaS platforms using HTML, CSS, JavaScript, and modern frameworks.',
      requiredSkills: ['HTML5/CSS3', 'JavaScript (ES6+)', 'Responsive Design', 'React / Vue', 'Git & GitHub'],
      futureOptions: 'Lead Frontend Engineer, UI/UX Architect, Full Stack Developer'
    },
    {
      id: 'bca-career-2',
      role: 'Software Engineer / Application Developer',
      salaryRange: '₹4 LPA - ₹8 LPA (Entry Level)',
      description: 'Develops robust software applications, implements business logic, writes algorithms, and maintains enterprise codebases.',
      requiredSkills: ['C++ / Java / Python', 'Data Structures & Algorithms', 'OOP Principles', 'Database Design', 'Debugging'],
      futureOptions: 'Senior Software Engineer, Tech Lead, Systems Architect'
    },
    {
      id: 'bca-career-3',
      role: 'Database Administrator (DBA) / SQL Developer',
      salaryRange: '₹3.5 LPA - ₹6.5 LPA (Entry Level)',
      description: 'Manages relational databases, writes complex analytical queries, ensures database integrity, backups, and security.',
      requiredSkills: ['SQL (MySQL / PostgreSQL / Oracle)', 'Normalization', 'Indexing & Performance Tuning', 'Data Modeling'],
      futureOptions: 'Data Engineer, Cloud Database Specialist, BI Analyst'
    },
    {
      id: 'bca-career-4',
      role: 'Higher Studies (MCA / M.Sc Computer Science)',
      salaryRange: 'Post-MCA: ₹7 LPA - ₹16+ LPA',
      description: 'Pursuing Master of Computer Applications (MCA) via prestigious national entrance exams like NIMCET or state entrances opens top-tier tech placements at MNCs and product companies.',
      requiredSkills: ['Mathematics Fundamentals', 'Analytical Reasoning', 'Computer Science Core', 'C / C++ / Java'],
      futureOptions: 'Tier-1 Product Companies, Software Architect, Research & AI Roles'
    }
  ]
};

export const DEFAULT_PORTFOLIO_DATA = {
  personalInfo: {
    ...PERSONAL_INFO,
    profilePhoto: ''
  },
  socialLinks: INITIAL_SOCIAL_LINKS,
  skills: SKILLS_DATA,
  projects: PROJECTS_DATA,
  education: INITIAL_EDUCATION_DATA,
  bca: INITIAL_BCA_DATA
};

