import axios from 'axios';
import { SocialMediaPost, SocialMediaUser } from '../types/socialMediaTypes';
import { CACHE_TTL, TEST_SERVER_BASE_URL, ACCESS_TOKEN } from '../config/constants';
import { CacheService } from './cache.service';

export class DataService {
  private cache: CacheService;
  private axiosInstance;

  constructor() {
    this.cache = new CacheService();
    this.axiosInstance = axios.create({
      baseURL: TEST_SERVER_BASE_URL,
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      timeout: 5000
    });
  }

  private async fetchWithCache<T>(endpoint: string, cacheKey: string): Promise<T> {
    const cachedData = this.cache.get(cacheKey);
    if (cachedData) return cachedData as T;

    try {
      const response = await this.axiosInstance.get(endpoint);
      const data = response.data;
      this.cache.set(cacheKey, data, CACHE_TTL);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(`API Error (${error.response?.status}):`, error.response?.data);
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  }

  async fetchUsers(): Promise<{ user: Record<string, string> }> {
    return this.fetchWithCache('users', 'all_users');
  }

  async fetchPosts(userId: string): Promise<{ post: SocialMediaPost[] }> {
    return this.fetchWithCache(`users/${userId}/posts`, `posts_${userId}`);
  }

  async getTopUsers(): Promise<SocialMediaUser[]> {
    try {
      const usersData = await this.fetchUsers();
      return Object.entries(usersData.user).map(([id, name]) => ({ id, name }));
    } catch (error) {
      console.error('Failed to get top users:', error);
      return [];
    }
  }

  async getPopularPosts(): Promise<SocialMediaPost[]> {
    try {
      const usersData = await this.fetchUsers();
      const userIds = Object.keys(usersData.user);
      const allPosts = await Promise.all(
        userIds.map(userId => this.fetchPosts(userId))
      );
      return allPosts
        .flatMap(data => data.post)
        .sort((a, b) => parseInt(b.id) - parseInt(a.id))
        .slice(0, 5);
    } catch (error) {
      console.error('Failed to get popular posts:', error);
      return [];
    }
  }

  async getLatestPosts(): Promise<SocialMediaPost[]> {
    try {
      const usersData = await this.fetchUsers();
      const userIds = Object.keys(usersData.user);
      const allPosts = await Promise.all(
        userIds.map(userId => this.fetchPosts(userId))
      );
      return allPosts
        .flatMap(data => data.post)
        .sort((a, b) => parseInt(b.id) - parseInt(a.id))
        .slice(0, 5);
    } catch (error) {
      console.error('Failed to get latest posts:', error);
      return [];
    }
  }
}