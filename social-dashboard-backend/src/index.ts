import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { register, login } from './controllers/authController';
import { authenticateToken, AuthRequest } from './middleware/authMiddleware';
import { connectTwitter, twitterCallback } from './controllers/platformController';
import { getDashboardStats } from './controllers/dashboardController';
import { createPost, getScheduledPosts } from './controllers/postController';
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors()); // <--- Essential for your Frontend to work!

// --- 1. HEALTH CHECK ---
app.get('/health', async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'OK', database: 'Connected' });
  } catch (error) {
    res.status(500).json({ status: 'Error', error: 'Database connection failed' });
  }
});

// --- 2. AUTHENTICATION ROUTES ---
app.post('/auth/register', register);
app.post('/auth/login', login);

// --- 3. SOCIAL PLATFORM ROUTES ---
app.get('/auth/twitter', connectTwitter);
app.get('/auth/twitter/callback', authenticateToken, twitterCallback);

// --- 4. PROTECTED ROUTES ---
app.get('/api/me', authenticateToken, (req: AuthRequest, res) => {
  res.json({ message: 'This is protected data!', user: req.user });
});

// NEW: Dashboard Stats
app.get('/api/dashboard/stats', authenticateToken, getDashboardStats);
app.post('/api/posts', authenticateToken, createPost);
app.get('/api/posts', authenticateToken, getScheduledPosts);
// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});