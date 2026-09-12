import React, { useState } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Play, Plus, Trash2, Check, RefreshCw, Smartphone, Tablet, Monitor } from 'lucide-react';
import { Project } from '../types';

interface ProjectDemoModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDemoModal: React.FC<ProjectDemoModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
              {project.title} — Live Interactive Demo
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Interactive Simulator */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Render interactive component based on demoType */}
          {project.demoType === 'calculator' && <CalculatorSimulator />}
          {project.demoType === 'todo' && <TodoSimulator />}
          {project.demoType === 'registration' && <RegistrationSimulator />}
          {project.demoType === 'landing' && <LandingSimulator />}
          {project.demoType === 'portfolio' && <PortfolioSimulator />}

          {/* Project Details */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              About This Project
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.fullDescription}
            </p>

            <div>
              <h5 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Technologies Used:
              </h5>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs rounded-md bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/60 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.highlights && project.highlights.length > 0 && (
              <div className="pt-2">
                <h5 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Key Features & Highlights:
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 mt-0.5 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Created by Namrata Ghosh
          </div>
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>View on GitHub</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-700 text-white shadow-sm transition-colors"
            >
              Close Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- 1. Working Interactive Calculator Simulator --- */
const CalculatorSimulator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [prevVal, setPrevVal] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const handleDigit = (digit: string) => {
    if (display === '0' || shouldResetDisplay) {
      setDisplay(digit);
      setShouldResetDisplay(false);
    } else {
      if (display.length < 12) setDisplay(display + digit);
    }
  };

  const handleDecimal = () => {
    if (shouldResetDisplay) {
      setDisplay('0.');
      setShouldResetDisplay(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperator = (op: string) => {
    const current = parseFloat(display);
    if (prevVal === null) {
      setPrevVal(current);
    } else if (operation) {
      const result = compute(prevVal, current, operation);
      setPrevVal(result);
      setDisplay(String(result));
    }
    setOperation(op);
    setShouldResetDisplay(true);
  };

  const compute = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b !== 0 ? Math.round((a / b) * 10000) / 10000 : 0;
      default: return b;
    }
  };

  const handleEqual = () => {
    if (prevVal === null || !operation) return;
    const current = parseFloat(display);
    const result = compute(prevVal, current, operation);
    setDisplay(String(result));
    setPrevVal(null);
    setOperation(null);
    setShouldResetDisplay(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevVal(null);
    setOperation(null);
    setShouldResetDisplay(false);
  };

  const handleBackspace = () => {
    if (display.length === 1) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  return (
    <div className="max-w-xs mx-auto p-4 rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-lg">
      <div className="text-right px-3 py-3 mb-3 bg-slate-950 rounded-xl border border-slate-800">
        <div className="text-[11px] text-slate-500 font-mono h-4">
          {prevVal !== null ? `${prevVal} ${operation}` : ''}
        </div>
        <div className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-teal-400 overflow-hidden text-ellipsis">
          {display}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 text-sm font-semibold">
        <button onClick={handleClear} className="p-3 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30">C</button>
        <button onClick={handleBackspace} className="p-3 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700">⌫</button>
        <button onClick={() => { setDisplay(String(parseFloat(display) / 100)); }} className="p-3 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700">%</button>
        <button onClick={() => handleOperator('÷')} className="p-3 rounded-lg bg-teal-600/30 text-teal-300 hover:bg-teal-600/40">÷</button>

        <button onClick={() => handleDigit('7')} className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700">7</button>
        <button onClick={() => handleDigit('8')} className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700">8</button>
        <button onClick={() => handleDigit('9')} className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700">9</button>
        <button onClick={() => handleOperator('×')} className="p-3 rounded-lg bg-teal-600/30 text-teal-300 hover:bg-teal-600/40">×</button>

        <button onClick={() => handleDigit('4')} className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700">4</button>
        <button onClick={() => handleDigit('5')} className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700">5</button>
        <button onClick={() => handleDigit('6')} className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700">6</button>
        <button onClick={() => handleOperator('-')} className="p-3 rounded-lg bg-teal-600/30 text-teal-300 hover:bg-teal-600/40">-</button>

        <button onClick={() => handleDigit('1')} className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700">1</button>
        <button onClick={() => handleDigit('2')} className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700">2</button>
        <button onClick={() => handleDigit('3')} className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700">3</button>
        <button onClick={() => handleOperator('+')} className="p-3 rounded-lg bg-teal-600/30 text-teal-300 hover:bg-teal-600/40">+</button>

        <button onClick={() => handleDigit('0')} className="col-span-2 p-3 rounded-lg bg-slate-800 hover:bg-slate-700">0</button>
        <button onClick={handleDecimal} className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700">.</button>
        <button onClick={handleEqual} className="p-3 rounded-lg bg-teal-600 text-white hover:bg-teal-500 font-bold">=</button>
      </div>
    </div>
  );
};

/* --- 2. Working Interactive To-Do List Simulator --- */
const TodoSimulator: React.FC = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Review Web Development Concepts', completed: true },
    { id: 2, text: 'Practice C++ Data Structures', completed: false },
    { id: 3, text: 'Build responsive portfolio layout', completed: true },
    { id: 4, text: 'Commit updates to GitHub repo', completed: false }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    setTodos([...todos, { id: Date.now(), text: inputVal.trim(), completed: false }]);
    setInputVal('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const filtered = todos.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  return (
    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200">
          Interactive Task Manager
        </h4>
        <span className="text-xs text-teal-600 dark:text-teal-400 font-medium">
          {todos.filter(t => t.completed).length} of {todos.length} Completed
        </span>
      </div>

      <form onSubmit={addTodo} className="flex gap-2 mb-3">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-3 py-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
        />
        <button
          type="submit"
          className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>
      </form>

      <div className="flex gap-1.5 mb-3 text-xs">
        {(['all', 'active', 'completed'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-2.5 py-1 rounded-md capitalize transition-colors ${
              filter === f
                ? 'bg-teal-600 text-white font-medium'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-1.5 max-h-48 overflow-y-auto">
        {filtered.map(todo => (
          <div
            key={todo.id}
            className="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-700/70 text-xs"
          >
            <button
              type="button"
              onClick={() => toggleTodo(todo.id)}
              className="flex items-center gap-2 text-left flex-1"
            >
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                  todo.completed
                    ? 'bg-teal-600 border-teal-600 text-white'
                    : 'border-slate-300 dark:border-slate-600'
                }`}
              >
                {todo.completed && <Check className="w-3 h-3" />}
              </div>
              <span className={todo.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-200'}>
                {todo.text}
              </span>
            </button>
            <button
              type="button"
              onClick={() => deleteTodo(todo.id)}
              className="text-slate-400 hover:text-rose-500 p-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

/* --- 3. Working Student Registration Form Simulator --- */
const RegistrationSimulator: React.FC = () => {
  const [records, setRecords] = useState([
    { name: 'Aarav Sharma', email: 'aarav@example.com', course: 'Computer Science', year: '2nd Year' },
    { name: 'Riya Sen', email: 'riya@example.com', course: 'Information Tech', year: '1st Year' }
  ]);
  const [formData, setFormData] = useState({ name: '', email: '', course: 'Computer Science', year: '1st Year' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setRecords([formData, ...records]);
    setFormData({ name: '', email: '', course: 'Computer Science', year: '1st Year' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs space-y-3">
        <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200">
          Student Registration Demo
        </h4>

        {submitted && (
          <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 text-emerald-700 dark:text-emerald-300 font-medium">
            Student registered successfully into the roster below!
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-600 dark:text-slate-400 mb-1">Student Full Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Priya Mukherjee"
              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-slate-600 dark:text-slate-400 mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. priya@college.edu"
              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-slate-600 dark:text-slate-400 mb-1">Course Stream</label>
            <select
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
            >
              <option value="Computer Science">Computer Science & Engineering</option>
              <option value="Information Tech">Information Technology</option>
              <option value="Data Science">Data Science</option>
              <option value="Electronics">Electronics & Communication</option>
            </select>
          </div>
          <div>
            <label className="block text-slate-600 dark:text-slate-400 mb-1">Academic Year</label>
            <select
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
            >
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition-colors"
        >
          Submit Student Registration
        </button>
      </form>

      {/* Roster Table */}
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden text-xs">
        <div className="px-3 py-2 bg-slate-100 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300">
          Live Registered Students Roster ({records.length})
        </div>
        <div className="divide-y divide-slate-200 dark:divide-slate-800 max-h-36 overflow-y-auto">
          {records.map((rec, i) => (
            <div key={i} className="px-3 py-2 flex items-center justify-between bg-white dark:bg-slate-900">
              <div>
                <span className="font-semibold text-slate-900 dark:text-white">{rec.name}</span>
                <span className="text-slate-500 text-[11px] block">{rec.email}</span>
              </div>
              <div className="text-right">
                <span className="px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-medium">
                  {rec.course}
                </span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{rec.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* --- 4. Responsive Landing Page Viewport Simulator --- */
const LandingSimulator: React.FC = () => {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const widthClass = device === 'mobile' ? 'max-w-xs' : device === 'tablet' ? 'max-w-md' : 'w-full';

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-700 dark:text-slate-300">Device Viewport Simulator:</span>
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <button
            onClick={() => setDevice('desktop')}
            className={`p-1.5 rounded ${device === 'desktop' ? 'bg-teal-600 text-white' : 'text-slate-500'}`}
            title="Desktop View"
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDevice('tablet')}
            className={`p-1.5 rounded ${device === 'tablet' ? 'bg-teal-600 text-white' : 'text-slate-500'}`}
            title="Tablet View"
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={`p-1.5 rounded ${device === 'mobile' ? 'bg-teal-600 text-white' : 'text-slate-500'}`}
            title="Mobile View"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex justify-center bg-slate-100 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 min-h-[220px]">
        <div className={`transition-all duration-300 ${widthClass} bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 p-4 shadow-sm space-y-3 text-center`}>
          <div className="inline-block px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 text-[10px] font-bold uppercase tracking-wider">
            Modern SaaS Product
          </div>
          <h5 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
            Engineered with CSS Grid & Mobile-First Flexbox
          </h5>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
            Clean fluid responsiveness scaling perfectly from 320px smartphones to 4K displays.
          </p>
          <div className="flex justify-center gap-2 pt-1">
            <button className="px-3 py-1.5 rounded bg-teal-600 text-white text-xs font-semibold">Get Started</button>
            <button className="px-3 py-1.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- 5. Portfolio Website Simulator --- */
const PortfolioSimulator: React.FC = () => {
  return (
    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
      <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold">
        <CheckCircle2 className="w-4 h-4" />
        <span>Current Application in Production</span>
      </div>
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
        You are currently experiencing Namrata Ghosh's personal portfolio website! It features:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 dark:text-slate-300 font-medium">
        <div className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200/60 dark:border-slate-700/60">
          • Dark / Light Theme with Local Storage
        </div>
        <div className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200/60 dark:border-slate-700/60">
          • Editable Education Section
        </div>
        <div className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200/60 dark:border-slate-700/60">
          • Working Project Mini-App Simulators
        </div>
        <div className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200/60 dark:border-slate-700/60">
          • Smooth Navigation & Contact Integration
        </div>
      </div>
    </div>
  );
};
