import mongoose, { Schema } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    captain: { type: String, required: true, trim: true },
    members: [{ type: String, trim: true }],
    goal: { type: String, default: 'Build a strong fitness community.' },
  },
  { timestamps: true },
);

const Team = mongoose.model('Team', teamSchema);

export default Team;
