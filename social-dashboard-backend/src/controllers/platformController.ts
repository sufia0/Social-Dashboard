import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { AuthRequest } from '../middleware/authMiddleware';

const prisma = new PrismaClient();

// --- TWITTER AUTH FLOW ---

// 1. Redirect user to Twitter to approve app
export const connectTwitter = (req: Request, res: Response) => {
  const rootUrl = 'https://twitter.com/i/oauth2/authorize';
  const options = {
    response_type: 'code',
    client_id: process.env.TWITTER_CLIENT_ID,
    redirect_uri: process.env.TWITTER_CALLBACK_URL,
    scope: 'tweet.read tweet.write users.read offline.access',
    state: 'state', // In production, use a random string for security
    code_challenge: 'challenge', // In production, use real PKCE
    code_challenge_method: 'plain',
  };

  const qs = new URLSearchParams(options as any).toString();
  res.redirect(`${rootUrl}?${qs}`);
};

// 2. Handle the callback from Twitter
export const twitterCallback = async (req: AuthRequest, res: Response) => {
  const { code } = req.query;
  const userId = req.user?.userId; // We need to know WHICH user is connecting

  if (!code || !userId) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  try {
    // Exchange code for access token
    // NOTE: This will fail if you don't have real Keys. 
    // We will wrap it in a try/catch or mock it.
    
    const tokenResponse = await axios.post('https://api.twitter.com/2/oauth2/token', new URLSearchParams({
      code: code as string,
      grant_type: 'authorization_code',
      client_id: process.env.TWITTER_CLIENT_ID!,
      redirect_uri: process.env.TWITTER_CALLBACK_URL!,
      code_verifier: 'challenge',
    }).toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const { access_token, refresh_token } = tokenResponse.data as any;

    // Save to Database
    await prisma.socialAccount.upsert({
      where: {
        user_id_platform_name: {
          user_id: userId,
          platform_name: 'twitter',
        },
      },
      update: { access_token, refresh_token },
      create: {
        user_id: userId,
        platform_name: 'twitter',
        access_token,
        refresh_token,
        handle: 'unknown_handle', // You would usually fetch the profile here too
      },
    });

    res.json({ message: 'Twitter connected successfully!' });

  } catch (error) {
    console.error(error);
    // FOR TESTING WITHOUT KEYS:
    // If it fails, we assume it's a test run and manually add a dummy entry
    if (process.env.TWITTER_CLIENT_ID === 'your_twitter_client_id') {
       await prisma.socialAccount.create({
         data: {
           user_id: userId,
           platform_name: 'twitter',
           access_token: 'mock_token_123',
           handle: '@MockUser'
         }
       });
       return res.json({ message: 'MOCK Twitter connected (Dev Mode)' });
    }
    
    res.status(500).json({ error: 'Failed to connect Twitter' });
  }
};