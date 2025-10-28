'use client';

import { useState, useEffect } from 'react';
import { IconX, IconUpload, IconTrash } from '@tabler/icons-react';

interface Bonus {
  _id: string;
  name: string;
  bonusCode: string;
}

interface PlayerData {
  player_uid: string;
  wins_base: number;
  [key: string]: unknown;
}

interface Prizes {
  first: number;
  second: number;
  third: number;
  [key: string]: number;
}

interface EditData {
  _id?: string;
  bonusId?: string;
  name?: string;
  duration?: number;
  startDate?: string;
  prizes?: Prizes;
  prizeText?: string;
  playerData?: PlayerData[];
}

interface LeaderboardFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editData?: EditData;
}

export default function LeaderboardForm({ isOpen, onClose, onSuccess, editData }: LeaderboardFormProps) {
  const [bonuses, setBonuses] = useState<Bonus[]>([]);
  const [formData, setFormData] = useState({
    bonusId: '',
    name: '',
    duration: '7',
    startDate: new Date().toISOString().split('T')[0],
    prizes: {
      first: 0,
      second: 0,
      third: 0,
    } as Prizes,
    prizeText: 'ALL PRIZES ARE IN CREDITS *',
    additionalPrizes: [] as { rank: number; amount: number }[],
    playerData: [] as PlayerData[],
  });
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchBonuses();
      if (editData) {
        const additionalPrizes: { rank: number; amount: number }[] = [];
        const basePrizes = { first: 0, second: 0, third: 0 };
        
        if (editData.prizes) {
          basePrizes.first = editData.prizes.first || 0;
          basePrizes.second = editData.prizes.second || 0;
          basePrizes.third = editData.prizes.third || 0;
          
          // Extract additional prizes (rank4, rank5, etc.)
          if (editData.prizes) {
            Object.keys(editData.prizes).forEach(key => {
              if (key.startsWith('rank') && editData.prizes) {
                const rank = parseInt(key.replace('rank', ''));
                additionalPrizes.push({ rank, amount: editData.prizes[key] });
              }
            });
          }
        }
        
        setFormData({
          bonusId: editData.bonusId || '',
          name: editData.name || '',
          duration: editData.duration?.toString() || '7',
          startDate: editData.startDate ? new Date(editData.startDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          prizes: basePrizes,
          prizeText: editData.prizeText || 'ALL PRIZES ARE IN CREDITS *',
          additionalPrizes: additionalPrizes.sort((a, b) => a.rank - b.rank),
          playerData: editData.playerData || [],
        });
        if (editData.playerData && editData.playerData.length > 0) {
          setJsonInput(JSON.stringify(editData.playerData, null, 2));
        }
      } else {
        resetForm();
      }
    }
  }, [isOpen, editData]);

  const fetchBonuses = async () => {
    try {
      console.log('Fetching bonuses...');
      const response = await fetch('/api/bonuses');
      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Result:', result);
      
      if (result.success && result.data && Array.isArray(result.data)) {
        const activeBonuses = result.data.filter((b: Bonus) => b._id);
        console.log('Active bonuses:', activeBonuses);
        setBonuses(activeBonuses);
      } else {
        console.error('Invalid response format:', result);
        setBonuses([]);
      }
    } catch (error) {
      console.error('Error fetching bonuses:', error);
      setBonuses([]);
    }
  };

  const resetForm = () => {
    setFormData({
      bonusId: '',
      name: '',
      duration: '7',
      startDate: new Date().toISOString().split('T')[0],
      prizes: { first: 0, second: 0, third: 0 },
      prizeText: 'ALL PRIZES ARE IN CREDITS *',
      additionalPrizes: [],
      playerData: [],
    });
    setJsonInput('');
    setError('');
  };

  const handleJsonUpload = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const dataArray = Array.isArray(parsed) ? parsed : [parsed];
      
      // Validate that each entry has player_uid and wins_base
      const isValid = dataArray.every((entry: PlayerData) => 
        entry.player_uid !== undefined && entry.wins_base !== undefined
      );

      if (!isValid) {
        setError('Invalid JSON: Each entry must have player_uid and wins_base');
        return;
      }

      setFormData(prev => ({ ...prev, playerData: dataArray }));
      setError('');
      alert(`Successfully loaded ${dataArray.length} player entries`);
    } catch {
      setError('Invalid JSON format. Please check your input.');
    }
  };

  const addAdditionalPrize = () => {
    const nextRank = formData.additionalPrizes.length > 0 
      ? Math.max(...formData.additionalPrizes.map(p => p.rank)) + 1 
      : 4;
    setFormData(prev => ({
      ...prev,
      additionalPrizes: [...prev.additionalPrizes, { rank: nextRank, amount: 0 }]
    }));
  };

  const removeAdditionalPrize = (index: number) => {
    setFormData(prev => ({
      ...prev,
      additionalPrizes: prev.additionalPrizes.filter((_, i) => i !== index)
    }));
  };

  const updateAdditionalPrize = (index: number, field: 'rank' | 'amount', value: number) => {
    setFormData(prev => ({
      ...prev,
      additionalPrizes: prev.additionalPrizes.map((prize, i) => 
        i === index ? { ...prize, [field]: value } : prize
      )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = editData ? `/api/leaderboards/${editData._id}` : '/api/leaderboards';
      const method = editData ? 'PATCH' : 'POST';

      // Merge base prizes with additional prizes
      const allPrizes = { ...formData.prizes };
      formData.additionalPrizes.forEach(prize => {
        allPrizes[`rank${prize.rank}`] = prize.amount;
      });

      const payload = {
        ...formData,
        prizes: allPrizes,
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        onSuccess();
        onClose();
        resetForm();
      } else {
        setError(result.error || 'Failed to save leaderboard');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-slate-900 rounded-xl border border-cyan-500/20 p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {editData ? 'Edit Leaderboard' : 'Create Leaderboard'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <IconX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Bonus Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select Bonus *
            </label>
            <select
              required
              value={formData.bonusId}
              onChange={(e) => setFormData({ ...formData, bonusId: e.target.value })}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              disabled={!!editData}
            >
              <option value="">Select a bonus...</option>
              {bonuses.map((bonus) => (
                <option key={bonus._id} value={bonus._id}>
                  {bonus.name} ({bonus.bonusCode})
                </option>
              ))}
            </select>
          </div>

          {/* Leaderboard Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Leaderboard Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              placeholder="e.g., October Weekly Challenge"
            />
          </div>

          {/* Duration and Start Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Duration (days) *
              </label>
              <select
                required
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="1">1 Day</option>
                <option value="3">3 Days</option>
                <option value="7">7 Days</option>
                <option value="14">14 Days</option>
                <option value="30">30 Days</option>
                <option value="custom">Custom</option>
              </select>
              {formData.duration === 'custom' && (
                <input
                  type="number"
                  min="1"
                  required
                  placeholder="Enter days"
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full mt-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Start Date *
              </label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Prizes */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Prize Pool (Top 3)
            </label>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">1st Place ($)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.prizes.first}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    prizes: { ...formData.prizes, first: parseFloat(e.target.value) || 0 }
                  })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">2nd Place ($)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.prizes.second}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    prizes: { ...formData.prizes, second: parseFloat(e.target.value) || 0 }
                  })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">3rd Place ($)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.prizes.third}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    prizes: { ...formData.prizes, third: parseFloat(e.target.value) || 0 }
                  })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Additional Prizes */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-300">
                  Additional Prizes (Rank 4+)
                </label>
                <button
                  type="button"
                  onClick={addAdditionalPrize}
                  className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 text-white text-sm rounded-lg"
                >
                  + Add Prize
                </button>
              </div>
              {formData.additionalPrizes.map((prize, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <div className="flex-1">
                    <input
                      type="number"
                      min="4"
                      value={prize.rank}
                      onChange={(e) => updateAdditionalPrize(index, 'rank', parseInt(e.target.value) || 4)}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                      placeholder="Rank"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={prize.amount}
                      onChange={(e) => updateAdditionalPrize(index, 'amount', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                      placeholder="Prize amount ($)"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAdditionalPrize(index)}
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                  >
                    <IconTrash size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Prize Text */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Prize Description Text
              </label>
              <input
                type="text"
                value={formData.prizeText}
                onChange={(e) => setFormData({ ...formData, prizeText: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                placeholder="ALL PRIZES ARE IN CREDITS *"
              />
              <p className="text-xs text-gray-400 mt-1">
                This text will be displayed below the leaderboard tabs
              </p>
            </div>
          </div>

          {/* Player Data JSON Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Player Data (JSON)
            </label>
            <div className="space-y-2">
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 font-mono text-sm"
                rows={10}
                placeholder='[{"player_uid": "player123", "wins_base": 52344.85, "week": "2025-10-06", ...}]'
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleJsonUpload}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
                >
                  <IconUpload size={18} />
                  Load Player Data
                </button>
                {formData.playerData.length > 0 && (
                  <>
                    <span className="px-4 py-2 bg-green-600/20 text-green-400 rounded-lg">
                      {formData.playerData.length} players loaded
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, playerData: [] });
                        setJsonInput('');
                      }}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2"
                    >
                      <IconTrash size={18} />
                      Clear Data
                    </button>
                  </>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Paste JSON array with player_uid and wins_base. Duplicate players will be automatically merged (keeping highest wager).
            </p>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500">
              {error}
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 text-white rounded-lg font-semibold"
            >
              {loading ? 'Saving...' : editData ? 'Update Leaderboard' : 'Create Leaderboard'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
