import { Router } from 'express';
import { getApiBaseUrl } from '../config/api.js';
import LeaderboardEntry from '../models/LeaderboardEntry.js';

const router = Router();

router.get('/', async (_request, response) => {
  const leaderboard = await LeaderboardEntry.find().sort({ score: -1 });
  response.json({ apiUrl: getApiBaseUrl(), leaderboard });
});

router.get('/:username', async (request, response) => {
  const entry = await LeaderboardEntry.findOne({ username: request.params.username });

  if (!entry) {
    response.status(404).json({ message: 'Leaderboard entry not found' });
    return;
  }

  response.json({ apiUrl: getApiBaseUrl(), entry });
});

export default router;
