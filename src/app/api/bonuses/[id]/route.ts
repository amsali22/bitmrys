import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Bonus from '@/models/Bonus';

// GET - Fetch single bonus
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const bonus = await Bonus.findById(id);

    if (!bonus) {
      return NextResponse.json(
        { success: false, error: 'Bonus not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, bonus });
  } catch (error) {
    console.error('Error fetching bonus:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bonus' },
      { status: 500 }
    );
  }
}

// PATCH - Update bonus (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    await connectDB();

    const data = await request.json();
    const bonus = await Bonus.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!bonus) {
      return NextResponse.json(
        { success: false, error: 'Bonus not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, bonus });
  } catch (error) {
    console.error('Error updating bonus:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to update bonus';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// DELETE - Delete bonus (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    await connectDB();

    const bonus = await Bonus.findByIdAndDelete(id);

    if (!bonus) {
      return NextResponse.json(
        { success: false, error: 'Bonus not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Bonus deleted successfully' });
  } catch (error) {
    console.error('Error deleting bonus:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete bonus' },
      { status: 500 }
    );
  }
}
