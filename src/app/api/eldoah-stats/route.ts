import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import connectDB from '@/lib/mongodb';
import EldoahStats from '@/models/EldoahStats';

// In-memory cache for the count (expires after 30 seconds)
let cachedCount: { value: number; timestamp: number } | null = null;
const CACHE_DURATION = 30000; // 30 seconds

// In-memory rate limiting (per IP)
const clickTracker = new Map<string, number>();
const RATE_LIMIT_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Clean up old entries every hour
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamp] of clickTracker.entries()) {
    if (now - timestamp > RATE_LIMIT_DURATION) {
      clickTracker.delete(ip);
    }
  }
}, 60 * 60 * 1000); // Run every hour

// GET - Fetch the current count (with caching)
export async function GET() {
  try {
    // Check if cached value is still valid
    if (cachedCount && Date.now() - cachedCount.timestamp < CACHE_DURATION) {
      return NextResponse.json({ totalJoined: cachedCount.value }, { status: 200 });
    }
    
    await connectDB();
    
    let stats = await EldoahStats.findOne();
    
    // If no stats exist, create initial record
    if (!stats) {
      stats = await EldoahStats.create({ totalJoined: 370 });
    }
    
    // Update cache
    cachedCount = {
      value: stats.totalJoined,
      timestamp: Date.now(),
    };
    
    return NextResponse.json({ totalJoined: stats.totalJoined }, { status: 200 });
  } catch (error) {
    console.error('Error fetching Eldoah stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}

// POST - Increment the count (with rate limiting)
export async function POST() {
  try {
    // Get client IP address
    const headersList = await headers();
    const forwarded = headersList.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : headersList.get('x-real-ip') || 'unknown';
    
    // Check if this IP has clicked recently (within 24 hours)
    const lastClickTime = clickTracker.get(ip);
    const now = Date.now();
    
    if (lastClickTime && now - lastClickTime < RATE_LIMIT_DURATION) {
      // Already clicked within 24 hours - return current count without incrementing
      await connectDB();
      const stats = await EldoahStats.findOne();
      return NextResponse.json(
        { 
          totalJoined: stats?.totalJoined || 370,
          alreadyCounted: true,
          message: 'You have already been counted today'
        },
        { status: 200 }
      );
    }
    
    // Connect to database and increment
    await connectDB();
    
    let stats = await EldoahStats.findOne();
    
    // If no stats exist, create initial record
    if (!stats) {
      stats = await EldoahStats.create({ totalJoined: 371 });
    } else {
      // Increment the count
      stats.totalJoined += 1;
      stats.lastUpdated = new Date();
      await stats.save();
    }
    
    // Update rate limiter
    clickTracker.set(ip, now);
    
    // Invalidate cache
    cachedCount = null;
    
    return NextResponse.json({ totalJoined: stats.totalJoined }, { status: 200 });
  } catch (error) {
    console.error('Error incrementing Eldoah stats:', error);
    return NextResponse.json({ error: 'Failed to increment stats' }, { status: 500 });
  }
}
