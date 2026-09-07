import { Router } from 'express';
import { getApiBaseUrl } from '../config/api.js';
import Workout from '../models/Workout.js';

const router = Router();

router.get('/', async (_request, response) => {
  const workouts = await Workout.find();
  response.json({ apiUrl: getApiBaseUrl(), workouts });
});

router.get('/:id', async (request, response) => {
  const workout = await Workout.findById(request.params.id);

  if (!workout) {
    response.status(404).json({ message: 'Workout not found' });
    return;
  }

  response.json({ apiUrl: getApiBaseUrl(), workout });
});

router.post('/', async (request, response) => {
  const workout = await Workout.create(request.body);
  response.status(201).json({ apiUrl: getApiBaseUrl(), workout });
});

export default router;
