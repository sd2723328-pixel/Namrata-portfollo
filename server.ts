import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import {
  initDatabase,
  getPortfolio,
  updatePortfolio,
  resetPortfolio,
  getAdminUser,
  updateAdminPassword,
  addMessage,
  getMessages,
  deleteMessage,
} from './server/db';
import {
  verifyPassword,
  createSession,
  validateSession,
  removeSession,
} from './server/auth';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize persistent database
  initDatabase();

  // Allow JSON payloads up to 10MB (supports base64 profile image uploads)
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Request logger for API calls
  app.use('/api', (req, _res, next) => {
    console.log(`[API] ${req.method} ${req.path}`);
    next();
  });

  // Auth Middleware
  const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
    }
    const token = authHeader.split(' ')[1];
    const email = validateSession(token);
    if (!email) {
      return res.status(401).json({ error: 'Unauthorized: Session expired or invalid' });
    }
    (req as any).userEmail = email;
    next();
  };

  // --- API ROUTES ---

  // Health check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Public: Get Portfolio Data
  app.get('/api/portfolio', (_req: Request, res: Response) => {
    try {
      const data = getPortfolio();
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to retrieve portfolio data', details: err.message });
    }
  });

  // Protected: Update Portfolio Data
  app.put('/api/portfolio', requireAuth, (req: Request, res: Response) => {
    try {
      const updated = updatePortfolio(req.body);
      res.json({ success: true, portfolio: updated, message: 'Portfolio saved to cloud successfully!' });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to save portfolio to cloud', details: err.message });
    }
  });

  // Protected: Reset Portfolio to Default
  app.post('/api/portfolio/reset', requireAuth, (_req: Request, res: Response) => {
    try {
      const reset = resetPortfolio();
      res.json({ success: true, portfolio: reset, message: 'Portfolio reset to default state' });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to reset portfolio', details: err.message });
    }
  });

  // Auth: Login
  app.post('/api/auth/login', (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const admin = getAdminUser();
      if (email.trim().toLowerCase() !== admin.email.toLowerCase()) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const isValid = verifyPassword(password, admin.salt, admin.hash);
      if (!isValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = createSession(admin.email);
      res.json({
        success: true,
        token,
        user: {
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
        message: 'Logged in successfully',
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Login error', details: err.message });
    }
  });

  // Auth: Verify current session
  app.get('/api/auth/me', (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ authenticated: false });
    }
    const token = authHeader.split(' ')[1];
    const email = validateSession(token);
    if (!email) {
      return res.status(401).json({ authenticated: false });
    }

    const admin = getAdminUser();
    res.json({
      authenticated: true,
      user: {
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  });

  // Auth: Logout
  app.post('/api/auth/logout', (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      removeSession(token);
    }
    res.json({ success: true, message: 'Logged out successfully' });
  });

  // Auth: Change password
  app.post('/api/auth/change-password', requireAuth, (req: Request, res: Response) => {
    try {
      const { currentPassword, newPassword } = req.body;
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: 'Current password and new password are required' });
      }
      if (newPassword.length < 6) {
        return res.status(400).json({ error: 'New password must be at least 6 characters long' });
      }

      const admin = getAdminUser();
      const isValid = verifyPassword(currentPassword, admin.salt, admin.hash);
      if (!isValid) {
        return res.status(400).json({ error: 'Incorrect current password' });
      }

      updateAdminPassword(newPassword);
      res.json({ success: true, message: 'Password updated successfully' });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to update password', details: err.message });
    }
  });

  // Public: Submit contact message
  app.post('/api/contact', (req: Request, res: Response) => {
    try {
      const { name, email, subject, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required' });
      }

      const savedMsg = addMessage({
        name: name.trim(),
        email: email.trim(),
        subject: subject ? subject.trim() : 'General Inquiry',
        message: message.trim(),
      });

      res.status(201).json({
        success: true,
        message: 'Thank you! Your message has been sent successfully.',
        data: savedMsg,
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to send message', details: err.message });
    }
  });

  // Protected: View messages
  app.get('/api/contact/messages', requireAuth, (_req: Request, res: Response) => {
    try {
      const msgs = getMessages();
      res.json(msgs);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to retrieve messages', details: err.message });
    }
  });

  // Protected: Delete a message
  app.delete('/api/contact/messages/:id', requireAuth, (req: Request, res: Response) => {
    try {
      const success = deleteMessage(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'Message not found' });
      }
      res.json({ success: true, message: 'Message deleted' });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to delete message', details: err.message });
    }
  });

  // --- VITE MIDDLEWARE / STATIC ASSETS ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Namrata Ghosh Portfolio Server running on http://localhost:${PORT}`);
  });
}

startServer();
