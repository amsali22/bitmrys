import { NextResponse, NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Leaderboard from '@/models/Leaderboard';
import Bonus from '@/models/Bonus';

interface PlayerData {
  player_uid: string;
  wins_base: number;
  [key: string]: unknown;
}

// Helper function to process player data and calculate leaderboard
function processPlayerData(playerData: PlayerData[]) {
  // Group by player_uid and keep only the best wins_base for each player
  const playerMap = new Map<string, PlayerData>();
  
  playerData.forEach(entry => {
    const playerId = entry.player_uid;
    const wager = entry.wins_base || 0;
    
    if (!playerMap.has(playerId) || (playerMap.get(playerId)!.wins_base < wager)) {
      playerMap.set(playerId, entry);
    }
  });

  // Convert to array and sort by wins_base descending
  const sortedPlayers = Array.from(playerMap.values())
    .sort((a, b) => (b.wins_base || 0) - (a.wins_base || 0));

  // Create leaderboard entries with rank
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

// GET - Get all leaderboards
export async function GET() {
  try {
    await connectDB();

    const leaderboards = await Leaderboard.find({})
      .sort({ order: 1, createdAt: -1 });

    return NextResponse.json({ success: true, data: leaderboards });
  } catch (error) {
    console.error('Error fetching leaderboards:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leaderboards' },
      { status: 500 }
    );
  }
}

// POST - Create new leaderboard (admin only)
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

    const body = await request.json();
    const { 
      bonusId, 
      name, 
      duration, 
      startDate,
      prizes,
      prizeText,
      playerData 
    } = body;

    // Validate required fields
    if (!bonusId || !name || !duration || !startDate) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify bonus exists
    const bonus = await Bonus.findById(bonusId);
    if (!bonus) {
      return NextResponse.json(
        { success: false, error: 'Bonus not found' },
        { status: 404 }
      );
    }

    // Calculate end date based on duration (use current time if no specific time provided)
    const start = startDate.includes('T') ? new Date(startDate) : new Date();
    const end = new Date(start);
    end.setHours(end.getHours() + (parseInt(duration) * 24));

    // Process player data if provided
    let topThree: Array<{ rank: number; username: string; wagered: number }> = [];
    let challengers: Array<{ rank: number; username: string; wagered: number }> = [];
    let processedData: PlayerData[] = playerData || [];

    if (playerData && playerData.length > 0) {
      const processed = processPlayerData(playerData);
      topThree = processed.topThree;
      challengers = processed.challengers;
      processedData = processed.processedData;
    }

    // Get the highest order number
    const highestOrder = await Leaderboard.findOne({}).sort({ order: -1 });
    const newOrder = highestOrder ? highestOrder.order + 1 : 0;

    const leaderboard = await Leaderboard.create({
      bonusId,
      bonusName: bonus.name,
      bonusLogo: bonus.logo,
      bonusUrl: bonus.url,
      name,
      duration: parseInt(duration),
      startDate: start,
      endDate: end,
      prizes: prizes || { first: 0, second: 0, third: 0 },
      prizeText: prizeText || 'ALL PRIZES ARE IN CREDITS *',
      playerData: processedData,
      topThree,
      challengers,
      active: true,
      order: newOrder,
    });

    return NextResponse.json({ 
      success: true, 
      data: leaderboard,
      message: 'Leaderboard created successfully' 
    });
  } catch (error) {
    console.error('Error creating leaderboard:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create leaderboard' },
      { status: 500 }
    );
  }
}
