import mongoose from 'mongoose';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Activity from '../models/Activity.js';
import LeaderboardEntry from '../models/LeaderboardEntry.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await LeaderboardEntry.deleteMany({});
    await Workout.deleteMany({});

    const users = await User.insertMany([
      {
        username: 'alex',
        email: 'alex@example.com',
        name: 'Alex Rivera',
        team: 'Alpha Crew',
        fitnessLevel: 'advanced',
      },
      {
        username: 'sam',
        email: 'sam@example.com',
        name: 'Sam Chen',
        team: 'Beta Storm',
        fitnessLevel: 'intermediate',
      },
      {
        username: 'mia',
        email: 'mia@example.com',
        name: 'Mia Patel',
        team: 'Alpha Crew',
        fitnessLevel: 'advanced',
      },
    ]);

    await Team.insertMany([
      {
        name: 'Alpha Crew',
        captain: 'alex',
        members: ['alex', 'mia'],
        goal: 'Push for a weekly 100k step challenge.',
      },
      {
        name: 'Beta Storm',
        captain: 'sam',
        members: ['sam'],
        goal: 'Complete a 4-week endurance cycle.',
      },
    ]);

    await Activity.insertMany([
      {
        user: 'alex',
        type: 'run',
        durationMinutes: 35,
        caloriesBurned: 420,
        date: new Date('2026-09-01T06:30:00Z'),
      },
      {
        user: 'sam',
        type: 'cycling',
        durationMinutes: 50,
        caloriesBurned: 510,
        date: new Date('2026-09-02T18:00:00Z'),
      },
      {
        user: 'mia',
        type: 'strength',
        durationMinutes: 40,
        caloriesBurned: 380,
        date: new Date('2026-09-03T17:00:00Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      { username: 'alex', score: 980, streak: 12, badge: 'Marathon Mind' },
      { username: 'sam', score: 940, streak: 8, badge: 'Speed Sprint' },
      { username: 'mia', score: 910, streak: 10, badge: 'Power Pulse' },
    ]);

    await Workout.insertMany([
      {
        name: 'HIIT Burn',
        category: 'cardio',
        difficulty: 'advanced',
        durationMinutes: 25,
        focus: 'Full body conditioning',
      },
      {
        name: 'Core Stability',
        category: 'strength',
        difficulty: 'intermediate',
        durationMinutes: 20,
        focus: 'Core and posture',
      },
      {
        name: 'Mobility Flow',
        category: 'mobility',
        difficulty: 'beginner',
        durationMinutes: 18,
        focus: 'Recovery and flexibility',
      },
    ]);

    console.log('Database seeding complete');
    console.log('Seeded users:', users.length);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
