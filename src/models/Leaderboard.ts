import mongoose, { Schema, Document } from 'mongoose';

interface LeaderEntry {
  rank: number;
  username: string;
  wagered: number;
  profit?: number;
  avatar?: string;
}

interface PlayerData {
  player_uid: string;
  wins_base: number;
  week?: string;
  brand_name?: string;
  player_registered_at?: string;
  commission_base?: number;
  ngr_base?: number;
  bets_base?: number;
  deposit_qty?: number;
  deposits_base?: number;
}

export interface ILeaderboard extends Document {
  bonusId: string; // Reference to bonus
  bonusName: string;
  bonusLogo: string; // Bonus logo
  bonusUrl: string; // Bonus URL
  name: string; // Leaderboard name
  duration: number; // Duration in days
  startDate: Date;
  endDate: Date;
  prizes: {
    first: number;
    second: number;
    third: number;
    [key: string]: number; // Allow dynamic prize ranks (rank4, rank5, etc.)
  };
  prizeText?: string; // Custom prize description text
  playerData: PlayerData[]; // Raw player data uploaded
  topThree: LeaderEntry[]; // Top 3 players (auto-calculated)
  challengers: LeaderEntry[]; // Rest of players (auto-calculated)
  active: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const LeaderEntrySchema = new Schema({
  rank: { type: Number, required: true },
  username: { type: String, required: true },
  wagered: { type: Number, required: true },
  profit: { type: Number },
  avatar: { type: String },
}, { _id: false });

const PlayerDataSchema = new Schema({
  player_uid: { type: String, required: true },
  wins_base: { type: Number, required: true },
  week: { type: String },
  brand_name: { type: String },
  player_registered_at: { type: String },
  commission_base: { type: Number },
  ngr_base: { type: Number },
  bets_base: { type: Number },
  deposit_qty: { type: Number },
  deposits_base: { type: Number },
}, { _id: false });

const LeaderboardSchema = new Schema<ILeaderboard>(
  {
    bonusId: {
      type: String,
      required: [true, 'Bonus ID is required'],
      trim: true,
    },
    bonusName: {
      type: String,
      required: [true, 'Bonus name is required'],
      trim: true,
    },
    bonusLogo: {
      type: String,
      trim: true,
    },
    bonusUrl: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Leaderboard name is required'],
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
      min: 1,
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
    },
    prizes: {
      type: Schema.Types.Mixed, // Allow dynamic prize structure
      default: { first: 0, second: 0, third: 0 },
    },
    prizeText: {
      type: String,
      default: 'ALL PRIZES ARE IN CREDITS *',
    },
    playerData: {
      type: [PlayerDataSchema],
      default: [],
    },
    topThree: {
      type: [LeaderEntrySchema],
      default: [],
    },
    challengers: {
      type: [LeaderEntrySchema],
      default: [],
    },
    active: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Leaderboard || mongoose.model<ILeaderboard>('Leaderboard', LeaderboardSchema);
