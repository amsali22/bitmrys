import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import EldoahStats from '@/models/EldoahStats';

// This endpoint will be called every 3 hours to auto-increment the counter
export async function GET() {
  try {
    await connectDB();
    
    let stats = await EldoahStats.findOne();
    
    if (!stats) {
      stats = await EldoahStats.create({ totalJoined: 370 });
    }
    
    // Generate random increment between 2 and 5
    const increment = Math.floor(Math.random() * 4) + 2; // Random number between 2-5
    
    // Increment the count
    stats.totalJoined += increment;
    stats.lastUpdated = new Date();
    await stats.save();
    
    return NextResponse.json({ 
      success: true,
      increment,
      totalJoined: stats.totalJoined,
      message: `Counter incremented by ${increment}`
    }, { status: 200 });
  } catch (error) {
    console.error('Error auto-incrementing Eldoah stats:', error);
    return NextResponse.json({ error: 'Failed to auto-increment stats' }, { status: 500 });
  }
}
