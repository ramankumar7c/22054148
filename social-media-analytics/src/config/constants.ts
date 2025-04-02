export const TEST_SERVER_BASE_URL = process.env.TEST_SERVER_BASE_URL || 'http://20.244.56.144/evaluation-service';
export const CACHE_TTL = parseInt(process.env.CACHE_TTL || '30000', 10);
export const PORT = process.env.PORT || 5000;
export const ACCESS_TOKEN = process.env.ACCESS_TOKEN || '';