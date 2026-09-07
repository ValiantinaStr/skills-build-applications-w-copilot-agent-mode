import { Router } from 'express';
import { getApiBaseUrl } from '../config/api.js';
import Activity from '../models/Activity.js';

const router = Router();

router.get('/', async (_request, response) => {
  const activities = await Activity.find();
  response.json({ apiUrl: getApiBaseUrl(), activities });
});

router.get('/:id', async (request, response) => {
  const activity = await Activity.findById(request.params.id);

  if (!activity) {
    response.status(404).json({ message: 'Activity not found' });
    return;
  }

  response.json({ apiUrl: getApiBaseUrl(), activity });
});

router.post('/', async (request, response) => {
  const activity = await Activity.create(request.body);
  response.status(201).json({ apiUrl: getApiBaseUrl(), activity });
});

export default router;
