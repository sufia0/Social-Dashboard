import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// This function simulates "going out to the internet" to get fresh stats
export const fetchAnalytics = async (userId: string) => {
  // 1. Find all social accounts for this user
  const accounts = await prisma.socialAccount.findMany({
    where: { user_id: userId },
  });

  if (accounts.length === 0) {
    return { message: 'No accounts linked' };
  }

  // 2. Loop through each account and "fetch" (mock) new data
  for (const account of accounts) {
    // Generate random numbers to simulate live data
    const mockLikes = Math.floor(Math.random() * 500);
    const mockShares = Math.floor(Math.random() * 100);
    const mockImpressions = Math.floor(Math.random() * 5000);

    // We need a dummy post to attach these stats to.
    // In a real app, you'd fetch stats for specific existing posts.
    // Here, we find OR create a dummy post just to store the analytics.
    let post = await prisma.post.findFirst({
        where: { user_id: userId }
    });

    if (!post) {
        post = await prisma.post.create({
            data: {
                user_id: userId,
                content: 'Auto-generated mock post for analytics',
                status: 'PUBLISHED'
            }
        });
    }

    // 3. Save the stats to the DB
    await prisma.analytics.create({
      data: {
        post_id: post.id,
        likes: mockLikes,
        shares: mockShares,
        impressions: mockImpressions,
      },
    });
  }

  return { message: 'Analytics updated successfully' };
};