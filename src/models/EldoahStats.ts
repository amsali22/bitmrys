import mongoose from 'mongoose';

const EldoahStatsSchema = new mongoose.Schema({
  totalJoined: {
    type: Number,
    default: 370,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.EldoahStats || mongoose.model('EldoahStats', EldoahStatsSchema);
