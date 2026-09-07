import mongoose, { Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['strength', 'cardio', 'mobility', 'recovery'],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 10 },
    focus: { type: String, default: 'Full body' },
  },
  { timestamps: true },
);

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;
