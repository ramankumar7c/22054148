import { Request, Response } from 'express';
import { DataService } from '../services/data.service';

const dataService = new DataService();

export const getTopUsers = async (req: Request, res: Response) => {
  try {
    const topUsers = await dataService.getTopUsers();
    res.json(topUsers);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch top users',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  const type = req.query.type as string;
  
  if (!type || !['popular', 'latest'].includes(type)) {
    return res.status(400).json({ 
      error: 'Invalid type parameter',
      validValues: ['popular', 'latest']
    });
  }

  try {
    const posts = type === 'popular' 
      ? await dataService.getPopularPosts()
      : await dataService.getLatestPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ 
      error: `Failed to fetch ${type} posts`,
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};