import express from 'express';
import { getTopUsers, getPosts } from './controllers/analytics.controller';
import { PORT } from './config/constants';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users', (req, res) => getTopUsers(req, res));
app.get('/posts', (req, res) => getPosts(req, res));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;