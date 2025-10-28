import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Bonus from '@/models/Bonus';

export async function GET() {
  try {
    await connectDB();

    // Fetch only active bonuses, sorted by order
    const bonuses = await Bonus.find({ active: true })
      .sort({ order: 1 })
      .lean();

    return NextResponse.json(bonuses);
  } catch (error) {
    console.error('Error fetching bonuses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bonuses' },
      { status: 500 }
    );
  }
}
