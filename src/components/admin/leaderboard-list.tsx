'use client';

import { useState, useEffect } from 'react';
import { IconEye, IconEyeOff, IconEdit, IconTrash, IconClock, IconTrophy, IconUsers } from '@tabler/icons-react';
import LeaderboardForm from './leaderboard-form';

interface PlayerData {
  player_uid: string;
  wins_base: number;
  rank: number;
  username: string;
  wagered: number;
  [key: string]: unknown;
}

interface Leaderboard {
  _id: string;
  bonusId: string;
  bonusName: string;
  name: string;
  duration: number;
  startDate: string;
  endDate: string;
  prizes: {
    first: number;
    second: number;
    third: number;
    [key: string]: number;
  };
  prizeText?: string;
  playerData: PlayerData[];
  topThree: PlayerData[];
  challengers: PlayerData[];
  active: boolean;
  order: number;
}

export default function LeaderboardList() {
  const [leaderboards, setLeaderboards] = useState<Leaderboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState<Leaderboard | null>(null);

  useEffect(() => {
    fetchLeaderboards();
  }, []);

  const fetchLeaderboards = async () => {
    try {
      const response = await fetch('/api/leaderboards');
      const result = await response.json();
      if (result.success) {
        setLeaderboards(result.data);
      }
    } catch (error) {
      console.error('Error fetching leaderboards:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/leaderboards/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !currentStatus }),
      });

      if (response.ok) {
        fetchLeaderboards();
      }
    } catch (error) {
      console.error('Error toggling leaderboard status:', error);
    }
  };

  const handleEdit = (leaderboard: Leaderboard) => {
    setEditData(leaderboard);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete &quot;${name}&quot;?`)) return;

    try {
      const response = await fetch(`/api/leaderboards/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchLeaderboards();
      }
    } catch (error) {
      console.error('Error deleting leaderboard:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getTimeRemaining = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();

    if (diff <= 0) return 'Ended';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days}d ${hours}h remaining`;
    return `${hours}h remaining`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white">Loading leaderboards...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Leaderboards</h2>
        <button
          onClick={() => {
            setEditData(null);
            setIsFormOpen(true);
          }}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold"
        >
          + Create Leaderboard
        </button>
      </div>

      {leaderboards.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          No leaderboards created yet. Click &quot;Create Leaderboard&quot; to get started.
        </div>
      ) : (
        <div className="grid gap-4">
          {leaderboards.map((leaderboard) => (
            <div
              key={leaderboard._id}
              className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-cyan-500/30 transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Leaderboard Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-white">{leaderboard.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          leaderboard.active 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {leaderboard.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-sm text-cyan-400">
                        Attached to: {leaderboard.bonusName}
                      </p>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <IconClock size={18} className="text-gray-400" />
                      <div>
                        <div className="text-gray-400">Duration</div>
                        <div className="text-white font-semibold">{leaderboard.duration} days</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <IconUsers size={18} className="text-gray-400" />
                      <div>
                        <div className="text-gray-400">Players</div>
                        <div className="text-white font-semibold">{leaderboard.playerData.length}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <IconTrophy size={18} className="text-gray-400" />
                      <div>
                        <div className="text-gray-400">Prize Pool</div>
                        <div className="text-white font-semibold">
                          ${(leaderboard.prizes.first + leaderboard.prizes.second + leaderboard.prizes.third).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <IconClock size={18} className="text-gray-400" />
                      <div>
                        <div className="text-gray-400">Status</div>
                        <div className="text-white font-semibold">
                          {getTimeRemaining(leaderboard.endDate)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Date Range */}
                  <div className="text-sm text-gray-400">
                    <span className="font-semibold text-white">Start:</span> {formatDate(leaderboard.startDate)}
                    {' → '}
                    <span className="font-semibold text-white">End:</span> {formatDate(leaderboard.endDate)}
                  </div>

                  {/* Top 3 Preview */}
                  {leaderboard.topThree.length > 0 && (
                    <div className="flex gap-2">
                      <span className="text-xs text-gray-400">Top 3:</span>
                      <div className="flex gap-3">
                        {leaderboard.topThree.map((player, idx) => (
                          <span key={idx} className="text-xs text-white">
                            #{player.rank} {player.username} (${player.wagered.toLocaleString()})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex lg:flex-col gap-2">
                  <button
                    onClick={() => toggleActive(leaderboard._id, leaderboard.active)}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                      leaderboard.active
                        ? 'bg-yellow-600 hover:bg-yellow-700'
                        : 'bg-green-600 hover:bg-green-700'
                    } text-white`}
                    title={leaderboard.active ? 'Disable' : 'Enable'}
                  >
                    {leaderboard.active ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                    {leaderboard.active ? 'Disable' : 'Enable'}
                  </button>

                  <button
                    onClick={() => handleEdit(leaderboard)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
                    title="Edit"
                  >
                    <IconEdit size={18} />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(leaderboard._id, leaderboard.name)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2"
                    title="Delete"
                  >
                    <IconTrash size={18} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <LeaderboardForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditData(null);
        }}
        onSuccess={fetchLeaderboards}
        editData={editData || undefined}
      />
    </div>
  );
}
