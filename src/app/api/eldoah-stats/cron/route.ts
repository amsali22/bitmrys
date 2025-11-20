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
    
    // Generate random increment between 10 and 20
    const increment = Math.floor(Math.random() * 11) + 10; // Random number between 10-20
    
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
