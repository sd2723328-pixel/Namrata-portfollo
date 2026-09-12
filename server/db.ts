import fs from 'fs';
import path from 'path';
import { hashPassword, generateSalt } from './auth';
import { DEFAULT_PORTFOLIO_DATA } from '../src/data/portfolioData';
import { PortfolioData, ContactMessage } from '../src/types';

interface DatabaseSchema {
  portfolio: PortfolioData;
  adminUser: {
    email: string;
    name: string;
    role: 'admin';
    salt: string;
    hash: string;
  };
  messages: (ContactMessage & { id: string })[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'portfolio_db.json');

// In-memory cache of the database
let dbCache: DatabaseSchema | null = null;

function ensureDataDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function initDatabase(): DatabaseSchema {
  ensureDataDirectory();

  if (fs.existsSync(DB_FILE)) {
    try {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      dbCache = JSON.parse(raw);
      // Ensure bca data is present in case of an older schema
      if (dbCache && !dbCache.portfolio.bca) {
        dbCache.portfolio.bca = DEFAULT_PORTFOLIO_DATA.bca;
        saveDatabase();
      }
      return dbCache!;
    } catch (e) {
      console.warn('Could not parse existing database, recreating default...', e);
    }
  }

  // Generate initial database with hashed admin password
  const defaultSalt = generateSalt();
  // Default password is set to 'NamrataDev2025!' - hashed securely with salt
  const defaultHash = hashPassword('NamrataDev2025!', defaultSalt);

  dbCache = {
    portfolio: {
      ...DEFAULT_PORTFOLIO_DATA,
      updatedAt: new Date().toISOString()
    },
    adminUser: {
      email: 'namrataghosh9832@gmail.com',
      name: 'Namrata Ghosh',
      role: 'admin',
      salt: defaultSalt,
      hash: defaultHash,
    },
    messages: [
      {
        id: 'msg-welcome-1',
        name: 'Technical Recruiter',
        email: 'recruiter@techventures.io',
        subject: 'Junior Frontend Developer Opportunity',
        message: 'Hello Namrata, We were very impressed by your responsive portfolio and clean code architecture. We would love to discuss an internship or junior developer role with our team!',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  };

  saveDatabase();
  return dbCache;
}

export function getDatabase(): DatabaseSchema {
  if (!dbCache) {
    return initDatabase();
  }
  return dbCache;
}

export function saveDatabase(): void {
  if (!dbCache) return;
  try {
    ensureDataDirectory();
    fs.writeFileSync(DB_FILE, JSON.stringify(dbCache, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write database file:', err);
  }
}

export function getPortfolio(): PortfolioData {
  return getDatabase().portfolio;
}

export function updatePortfolio(data: Partial<PortfolioData>): PortfolioData {
  const db = getDatabase();
  db.portfolio = {
    ...db.portfolio,
    ...data,
    updatedAt: new Date().toISOString()
  };
  saveDatabase();
  return db.portfolio;
}

export function resetPortfolio(): PortfolioData {
  const db = getDatabase();
  db.portfolio = {
    ...DEFAULT_PORTFOLIO_DATA,
    updatedAt: new Date().toISOString()
  };
  saveDatabase();
  return db.portfolio;
}

export function getAdminUser() {
  return getDatabase().adminUser;
}

export function updateAdminPassword(newPassword: string): boolean {
  const db = getDatabase();
  const salt = generateSalt();
  const hash = hashPassword(newPassword, salt);
  db.adminUser.salt = salt;
  db.adminUser.hash = hash;
  saveDatabase();
  return true;
}

export function addMessage(msg: Omit<ContactMessage, 'id' | 'timestamp'>): ContactMessage {
  const db = getDatabase();
  const newMsg = {
    ...msg,
    id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    timestamp: new Date().toISOString()
  };
  db.messages.unshift(newMsg);
  saveDatabase();
  return newMsg;
}

export function getMessages(): ContactMessage[] {
  return getDatabase().messages;
}

export function deleteMessage(id: string): boolean {
  const db = getDatabase();
  const index = db.messages.findIndex((m) => m.id === id);
  if (index !== -1) {
    db.messages.splice(index, 1);
    saveDatabase();
    return true;
  }
  return false;
}
