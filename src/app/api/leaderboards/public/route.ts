import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Leaderboard from '@/models/Leaderboard';

// GET - Get all active leaderboards (public endpoint)
export async function GET() {
  try {
    await connectDB();

    const now = new Date();

    // Get active leaderboards that haven't ended yet
    const leaderboards = await Leaderboard.find({
      active: true,
      endDate: { $gte: now }
    }).sort({ order: 1, createdAt: -1 });

    return NextResponse.json({ success: true, data: leaderboards });
  } catch (error) {
    console.error('Error fetching public leaderboards:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leaderboards' },
      { status: 500 }
    );
  }
}
