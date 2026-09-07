import { Router } from 'express';
import { getApiBaseUrl } from '../config/api.js';
import Team from '../models/Team.js';

const router = Router();

router.get('/', async (_request, response) => {
  const teams = await Team.find();
  response.json({ apiUrl: getApiBaseUrl(), teams });
});

router.get('/:id', async (request, response) => {
  const team = await Team.findById(request.params.id);

  if (!team) {
    response.status(404).json({ message: 'Team not found' });
    return;
  }

  response.json({ apiUrl: getApiBaseUrl(), team });
});

router.post('/', async (request, response) => {
  const team = await Team.create(request.body);
  response.status(201).json({ apiUrl: getApiBaseUrl(), team });
});

export default router;
