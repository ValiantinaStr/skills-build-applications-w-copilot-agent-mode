import { Router } from 'express';
import { getApiBaseUrl } from '../config/api.js';
import User from '../models/User.js';

const router = Router();

router.get('/', async (_request, response) => {
  const users = await User.find();
  response.json({ apiUrl: getApiBaseUrl(), users });
});

router.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id);

  if (!user) {
    response.status(404).json({ message: 'User not found' });
    return;
  }

  response.json({ apiUrl: getApiBaseUrl(), user });
});

router.post('/', async (request, response) => {
  const user = await User.create(request.body);
  response.status(201).json({ apiUrl: getApiBaseUrl(), user });
});

export default router;
