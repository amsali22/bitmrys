import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Bonus from '@/models/Bonus';

// GET - Fetch all bonuses (public - for frontend display)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('active') === 'true';

    const query = activeOnly ? { active: true } : {};
    const bonuses = await Bonus.find(query).sort({ order: 1, createdAt: -1 });

    return NextResponse.json({ success: true, data: bonuses });
  } catch (error) {
    console.error('Error fetching bonuses:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bonuses' },
      { status: 500 }
    );
  }
}

// POST - Create new bonus (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const data = await request.json();
    
    // Validate required fields
    const { name, logo, url, bonusCode, bonusAmount } = data;
    
    if (!name || !logo || !url || !bonusCode || !bonusAmount) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get the highest order number and add 1
    const maxOrder = await Bonus.findOne().sort({ order: -1 }).select('order');
    const order = maxOrder ? maxOrder.order + 1 : 0;

    const bonus = await Bonus.create({
      ...data,
      order,
    });

    return NextResponse.json({ success: true, bonus }, { status: 201 });
  } catch (error) {
    console.error('Error creating bonus:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create bonus';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
