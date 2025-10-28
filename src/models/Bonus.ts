import mongoose, { Schema, Document } from 'mongoose';

export interface IBonus extends Document {
  name: string;
  logo: string;
  url: string;
  bonusCode: string;
  bonusAmount: string;
  extraBonus?: string; // Optional extra bonus
  steps: string[];
  active: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const BonusSchema = new Schema<IBonus>(
  {
    name: {
      type: String,
      required: [true, 'Bonus name is required'],
      trim: true,
    },
    logo: {
      type: String,
      required: [true, 'Logo path is required'],
      trim: true,
    },
    url: {
      type: String,
      required: [true, 'URL is required'],
      trim: true,
    },
    bonusCode: {
      type: String,
      required: [true, 'Bonus code is required'],
      trim: true,
      uppercase: true,
    },
    bonusAmount: {
      type: String,
      required: [true, 'Bonus amount is required'],
      trim: true,
    },
    extraBonus: {
      type: String,
      trim: true,
    },
    steps: {
      type: [String],
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

export default mongoose.models.Bonus || mongoose.model<IBonus>('Bonus', BonusSchema);
