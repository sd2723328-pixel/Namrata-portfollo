import crypto from 'crypto';

interface UserRecord {
  email: string;
  name: string;
  role: 'admin';
  salt: string;
  hash: string;
}

interface SessionRecord {
  token: string;
  email: string;
  createdAt: number;
  expiresAt: number;
}

// In-memory or persisted active sessions (valid for 7 days)
const SESSION_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000;
const activeSessions = new Map<string, SessionRecord>();

/**
 * Hash password securely using Node.js crypto scrypt
 */
export function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

/**
 * Generate a new random salt
 */
export function generateSalt(): string {
  return crypto.randomBytes(16).toString('hex');
}

/**
 * Verify plaintext password against stored salt and hash in constant time
 */
export function verifyPassword(password: string, salt: string, storedHash: string): boolean {
  try {
    const hash = crypto.scryptSync(password, salt, 64).toString('hex');
    const bufA = Buffer.from(hash, 'hex');
    const bufB = Buffer.from(storedHash, 'hex');
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

/**
 * Generate a cryptographically secure session token
 */
export function createSession(email: string): string {
  const token = crypto.randomBytes(32).toString('hex');
  const now = Date.now();
  activeSessions.set(token, {
    token,
    email,
    createdAt: now,
    expiresAt: now + SESSION_EXPIRY_MS,
  });
  return token;
}

/**
 * Validate a session token
 */
export function validateSession(token: string | undefined): string | null {
  if (!token) return null;
  const session = activeSessions.get(token);
  if (!session) return null;

  if (Date.now() > session.expiresAt) {
    activeSessions.delete(token);
    return null;
  }

  return session.email;
}

/**
 * Invalidate a session token
 */
export function removeSession(token: string): boolean {
  return activeSessions.delete(token);
}
