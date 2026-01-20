import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authMiddleware';

const prisma = new PrismaClient();

// 1. Create a new Scheduled Post
export const createPost = async (req: AuthRequest, res: Response) => {
  try {
    // We expect "scheduledFor" from the frontend, but we map it to "scheduled_time"
    const { content, platform, scheduledFor } = req.body;
    const userId = req.user?.userId;

    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const newPost = await prisma.post.create({
      data: {
        content,
        // Your schema uses a string array for platforms
        platform_ids: [platform], 
        // Mapping frontend "scheduledFor" to your DB "scheduled_time"
        scheduled_time: new Date(scheduledFor), 
        status: 'SCHEDULED', // Matches your PostStatus enum
        user_id: userId // Your schema uses "user_id" (string)
      }
    });

    res.json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to schedule post" });
  }
};

// 2. Get all Scheduled Posts for the user
export const getScheduledPosts = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const posts = await prisma.post.findMany({
      where: { user_id: userId }, // Matching your schema field
      orderBy: { scheduled_time: 'asc' } // Matching your schema field
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};