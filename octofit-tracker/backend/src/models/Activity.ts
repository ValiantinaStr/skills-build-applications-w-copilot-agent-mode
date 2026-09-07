import mongoose, { Schema } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ['run', 'walk', 'cycling', 'strength', 'yoga'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, default: 0 },
    date: { type: Date, required: true },
  },
  { timestamps: true },
);

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;
