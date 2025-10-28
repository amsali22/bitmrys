'use client';

import { IconTrophy, IconMedal, IconFlame } from '@tabler/icons-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface LeaderEntry {
  rank: number;
  username: string;
  wagered: number;
  profit?: number;
  avatar?: string;
}

interface LeaderboardData {
  id: string;
  name: string;
  logo: string;
  url: string;
  endDate: Date;
  prizes: {
    first: number;
    second: number;
    third: number;
    [key: string]: number; // Allow dynamic prize ranks
  };
  prizeText?: string;
  topThree: LeaderEntry[];
  challengers: LeaderEntry[];
}

function TimeRemaining({ endDate }: { endDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className="flex justify-center gap-3 mt-4">
      <div className="text-center">
        <div className="bg-slate-800/60 rounded-lg px-4 py-2 min-w-[70px]">
          <div className="text-3xl font-bold text-cyan-400">{timeLeft.days}</div>
          <div className="text-xs text-gray-400 uppercase">Days</div>
        </div>
      </div>
      <div className="text-center">
        <div className="bg-slate-800/60 rounded-lg px-4 py-2 min-w-[70px]">
          <div className="text-3xl font-bold text-cyan-400">{timeLeft.hours}</div>
          <div className="text-xs text-gray-400 uppercase">Hrs</div>
        </div>
      </div>
      <div className="text-center">
        <div className="bg-slate-800/60 rounded-lg px-4 py-2 min-w-[70px]">
          <div className="text-3xl font-bold text-cyan-400">{timeLeft.minutes}</div>
          <div className="text-xs text-gray-400 uppercase">Min</div>
        </div>
      </div>
      <div className="text-center">
        <div className="bg-slate-800/60 rounded-lg px-4 py-2 min-w-[70px]">
          <div className="text-3xl font-bold text-cyan-400">{timeLeft.seconds}</div>
          <div className="text-xs text-gray-400 uppercase">Sec</div>
        </div>
      </div>
    </div>
  );
}

export default function LeaderboardContent() {
  const [leaderboards, setLeaderboards] = useState<LeaderboardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    fetchLeaderboards();
  }, []);

  // Function to mask username (show first and last char only, hide middle)
  const maskUsername = (username: string): string => {
    if (username.length <= 2) return username;
    const firstChar = username.slice(0, 1);
    const lastChar = username.slice(-1);
    const middleLength = username.length - 2;
    const masked = '*'.repeat(middleLength);
    return `${firstChar}${masked}${lastChar}`;
  };

  // Function to get prize for a specific rank
  const getPrizeForRank = (rank: number, prizes: Record<string, number>): string => {
    if (prizes[`rank${rank}`]) {
      return `$${prizes[`rank${rank}`].toLocaleString()}`;
    }
    return '-';
  };

  const fetchLeaderboards = async () => {
    try {
      const response = await fetch('/api/leaderboards/public');
      const result = await response.json();
      if (result.success && result.data.length > 0) {
        // Map the database data to the component format
        const mappedData = result.data.map((lb: {
          _id: string;
          bonusName?: string;
          name: string;
          bonusLogo?: string;
          bonusUrl?: string;
          endDate: string;
          prizes?: Record<string, number>;
          prizeText?: string;
          topThree: LeaderEntry[];
          challengers: LeaderEntry[];
        }) => ({
          id: lb._id,
          name: lb.bonusName || lb.name,
          logo: lb.bonusLogo || '/images/logos/eldoah.png',
          url: lb.bonusUrl || '#',
          endDate: new Date(lb.endDate),
          prizes: lb.prizes || { first: 0, second: 0, third: 0 },
          prizeText: lb.prizeText || 'ALL PRIZES ARE IN CREDITS *',
          topThree: lb.topThree,
          challengers: lb.challengers.slice(0, 10), // Limit to 10 challengers
        }));
        setLeaderboards(mappedData);
      }
    } catch (error) {
      console.error('Error fetching leaderboards:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading leaderboards...</div>
      </div>
    );
  }

  if (leaderboards.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <IconTrophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <div className="text-white text-xl">No active leaderboards at the moment</div>
          <p className="text-gray-400 mt-2">Check back soon for exciting competitions!</p>
        </div>
      </div>
    );
  }

  const currentLeaderboard = leaderboards[activeTab];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            <span className="text-cyan-400">{currentLeaderboard.name}</span>
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">LEADERBOARD</h2>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <p className="text-center text-gray-400 text-sm mb-4 uppercase">
            Switch between {leaderboards.length} leaderboard{leaderboards.length !== 1 ? 's' : ''}
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            {leaderboards.map((board, index) => (
              <button
                key={board.id}
                onClick={() => setActiveTab(index)}
                className={`relative p-3 rounded-lg transition-all ${
                  activeTab === index
                    ? 'bg-cyan-500/20 border-2 border-cyan-500'
                    : 'bg-slate-800/40 border-2 border-transparent hover:border-cyan-500/30'
                }`}
              >
                <div className="w-16 h-16 flex items-center justify-center">
                  {board.logo && board.logo.startsWith('http') ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={board.logo}
                      alt={board.name}
                      className="w-full h-full object-contain"
                    />
                  ) : board.logo ? (
                    <Image
                      src={board.logo}
                      alt={board.name}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-700 rounded-lg flex items-center justify-center text-xs text-gray-400">
                      {board.name.slice(0, 2)}
                    </div>
                  )}
                </div>
                {activeTab === index && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-cyan-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
          <p className="text-center text-gray-400 text-xs mt-4">
            {currentLeaderboard.prizeText || 'ALL PRIZES ARE IN CREDITS *'}
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto items-end">
          {/* 2nd Place */}
          <div className="text-center">
            <div className="bg-slate-800/60 backdrop-blur-md border-2 border-gray-400/30 rounded-xl p-4 mb-3 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-400 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-2 flex items-center justify-center text-2xl text-gray-400">
                ?
              </div>
              <h3 className="text-white font-bold text-sm mb-2">{maskUsername(currentLeaderboard.topThree.find(p => p.rank === 2)?.username || '')}</h3>
              <div className="bg-slate-900/50 rounded p-2 text-xs">
                <p className="text-gray-400 uppercase text-[10px]">Wagered</p>
                <p className="text-green-400 font-bold">${(currentLeaderboard.topThree.find(p => p.rank === 2)?.wagered || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
            </div>
            <div className="bg-gray-400 text-black font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1">
              ${currentLeaderboard.prizes.second.toLocaleString()}
              <IconTrophy className="w-4 h-4" />
            </div>
          </div>

          {/* 1st Place */}
          <div className="text-center">
            <div className="bg-slate-800/60 backdrop-blur-md border-2 border-yellow-500/50 rounded-xl p-4 mb-3 relative shadow-lg shadow-yellow-500/20">
              <IconTrophy className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-10 h-10 text-yellow-400" />
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div className="w-20 h-20 bg-yellow-600/20 border-2 border-yellow-500 rounded-full mx-auto mb-2 flex items-center justify-center text-3xl text-yellow-400 mt-4">
                ?
              </div>
              <h3 className="text-yellow-400 font-bold text-base mb-2">{maskUsername(currentLeaderboard.topThree.find(p => p.rank === 1)?.username || '')}</h3>
              <div className="bg-slate-900/50 rounded p-2 text-xs">
                <p className="text-gray-400 uppercase text-[10px]">Wagered</p>
                <p className="text-green-400 font-bold">${(currentLeaderboard.topThree.find(p => p.rank === 1)?.wagered || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
            </div>
            <div className="bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-1 shadow-lg">
              ${currentLeaderboard.prizes.first.toLocaleString()}
              <IconTrophy className="w-4 h-4" />
            </div>
          </div>

          {/* 3rd Place */}
          <div className="text-center">
            <div className="bg-slate-800/60 backdrop-blur-md border-2 border-orange-400/30 rounded-xl p-4 mb-3 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-400 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div className="w-16 h-16 bg-orange-700/20 rounded-full mx-auto mb-2 flex items-center justify-center text-2xl text-orange-400">
                ?
              </div>
              <h3 className="text-white font-bold text-sm mb-2">{maskUsername(currentLeaderboard.topThree.find(p => p.rank === 3)?.username || '')}</h3>
              <div className="bg-slate-900/50 rounded p-2 text-xs">
                <p className="text-gray-400 uppercase text-[10px]">Wagered</p>
                <p className="text-green-400 font-bold">${(currentLeaderboard.topThree.find(p => p.rank === 3)?.wagered || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
            </div>
            <div className="bg-orange-400 text-black font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1">
              ${currentLeaderboard.prizes.third.toLocaleString()}
              <IconTrophy className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Leaderboard Ends In */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <IconFlame className="w-5 h-5 text-orange-400" />
            <span className="text-white font-bold uppercase tracking-wide">Leaderboard Ends In</span>
          </div>
          <p className="text-gray-400 text-xs mb-2">
            THE WINNER WILL BE DETERMINED WHEN THE TIME RUNS OUT, HURRY UP!
          </p>
          <TimeRemaining endDate={currentLeaderboard.endDate} />
        </div>

        {/* Challengers Table */}
        <div className="max-w-4xl mx-auto bg-slate-800/60 backdrop-blur-md border border-cyan-500/20 rounded-xl overflow-hidden">
          <div className="bg-slate-900/50 px-6 py-4 border-b border-slate-700/50">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <IconMedal className="w-5 h-5 text-cyan-400" />
              CHALLENGERS
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900/30">
                <tr className="text-gray-400 text-xs uppercase">
                  <th className="px-6 py-3 text-left font-bold">Rank</th>
                  <th className="px-6 py-3 text-left font-bold">User</th>
                  <th className="px-6 py-3 text-right font-bold">Wagered</th>
                  <th className="px-6 py-3 text-right font-bold">Profit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                {currentLeaderboard.challengers.map((entry) => (
                  <tr key={entry.rank} className="hover:bg-slate-700/20 transition-colors">
                    <td className="px-6 py-3">
                      <span className="text-gray-400 font-mono text-sm">{entry.rank}</span>
                    </td>
                    <td className="px-6 py-3">
                      <span className="text-white font-semibold">{maskUsername(entry.username)}</span>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <span className="text-green-400 font-bold">${entry.wagered.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <span className="text-cyan-400 font-bold">{getPrizeForRank(entry.rank, currentLeaderboard.prizes)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
