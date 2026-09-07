import mongoose, { Schema } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    score: { type: Number, required: true, default: 0 },
    streak: { type: Number, default: 0 },
    badge: { type: String, default: 'Rising Star' },
  },
  { timestamps: true },
);

const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardEntrySchema);

export default LeaderboardEntry;
