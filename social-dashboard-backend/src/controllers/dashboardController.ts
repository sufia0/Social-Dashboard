import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { fetchAnalytics } from '../services/analyticsService';
import { AuthRequest } from '../middleware/authMiddleware';

const prisma = new PrismaClient();

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(400).json({ error: 'User ID missing' });
  }

  try {
    // OPTIONAL: Trigger a fresh fetch every time we load the dashboard
    // (In production, this would be a background job, not here)
    await fetchAnalytics(userId);

    // 1. Get all analytics for this user's posts
    // We join User -> Posts -> Analytics
    const userStats = await prisma.analytics.aggregate({
      where: {
        post: {
          user_id: userId
        }
      },
      _sum: {
        likes: true,
        shares: true,
        impressions: true,
        comments: true
      }
    });

    // 2. Mock "Total Followers" (Since we didn't store follower count in DB yet)
    // We will assume each linked account has ~1000 followers for this demo
    const accountCount = await prisma.socialAccount.count({
        where: { user_id: userId }
    });
    const totalFollowers = accountCount * 1250; // Mock number

    // 3. Return the summary
    res.json({
      totalFollowers,
      totalLikes: userStats._sum.likes || 0,
      totalShares: userStats._sum.shares || 0,
      totalImpressions: userStats._sum.impressions || 0,
      engagementRate: '4.5%' // Mock hardcoded rate
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
};