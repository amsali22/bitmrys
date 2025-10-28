import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Leaderboard from '@/models/Leaderboard';

interface PlayerData {
  player_uid: string;
  wins_base: number;
  [key: string]: unknown;
}

// Helper function to process player data and calculate leaderboard
function processPlayerData(playerData: PlayerData[]) {
  const playerMap = new Map<string, PlayerData>();
  
  playerData.forEach(entry => {
    const playerId = entry.player_uid;
    const wager = entry.wins_base || 0;
    
    if (!playerMap.has(playerId) || (playerMap.get(playerId)!.wins_base < wager)) {
      playerMap.set(playerId, entry);
    }
  });

  const sortedPlayers = Array.from(playerMap.values())
    .sort((a, b) => (b.wins_base || 0) - (a.wins_base || 0));

  const leaderEntries = sortedPlayers.map((player, index) => ({
    rank: index + 1,
    username: player.player_uid,
    wagered: player.wins_base || 0,
  }));

  return {
    topThree: leaderEntries.slice(0, 3),
    challengers: leaderEntries.slice(3),
    processedData: sortedPlayers,
  };
}

// GET - Get single leaderboard
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    const leaderboard = await Leaderboard.findById(id);

    if (!leaderboard) {
      return NextResponse.json(
        { success: false, error: 'Leaderboard not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: leaderboard });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}

// PATCH - Update leaderboard (admin only)
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

    const body = await request.json();
    const data: Record<string, unknown> = {};

    // Handle basic fields
    if (body.name !== undefined) data.name = body.name;
    if (body.duration !== undefined) {
      data.duration = parseInt(body.duration);
      // Recalculate end date if duration changes
      const leaderboard = await Leaderboard.findById(id);
      if (leaderboard) {
        const end = new Date(leaderboard.startDate);
        end.setDate(end.getDate() + parseInt(body.duration));
        data.endDate = end;
      }
    }
    if (body.startDate !== undefined) {
      data.startDate = new Date(body.startDate);
      // Recalculate end date based on duration
      const leaderboard = await Leaderboard.findById(id);
      if (leaderboard) {
        const end = new Date(body.startDate);
        end.setDate(end.getDate() + leaderboard.duration);
        data.endDate = end;
      }
    }
    if (body.prizes !== undefined) data.prizes = body.prizes;
    if (body.prizeText !== undefined) data.prizeText = body.prizeText;
    if (body.active !== undefined) data.active = body.active;
    if (body.order !== undefined) data.order = body.order;

    // Handle player data update
    if (body.playerData !== undefined) {
      const processed = processPlayerData(body.playerData);
      data.playerData = processed.processedData;
      data.topThree = processed.topThree;
      data.challengers = processed.challengers;
    }

    const leaderboard = await Leaderboard.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!leaderboard) {
      return NextResponse.json(
        { success: false, error: 'Leaderboard not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data: leaderboard,
      message: 'Leaderboard updated successfully' 
    });
  } catch (error) {
    console.error('Error updating leaderboard:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update leaderboard' },
      { status: 500 }
    );
  }
}

// DELETE - Delete leaderboard (admin only)
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

    const leaderboard = await Leaderboard.findByIdAndDelete(id);

    if (!leaderboard) {
      return NextResponse.json(
        { success: false, error: 'Leaderboard not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Leaderboard deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting leaderboard:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete leaderboard' },
      { status: 500 }
    );
  }
}
