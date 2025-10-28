'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { IconLogout, IconGift, IconTrophy, IconUser } from '@tabler/icons-react';
import BonusList from './bonus-list';
import BonusForm from './bonus-form';
import LeaderboardList from './leaderboard-list';

interface DashboardClientProps {
  user: {
    name: string;
    email: string;
    role: string;
  };
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'bonuses' | 'leaderboards'>('bonuses');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showBonusForm, setShowBonusForm] = useState(false);
  const [refreshBonuses, setRefreshBonuses] = useState(0);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut({ redirect: false });
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/60 backdrop-blur-md border-b border-cyan-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  Bit<span className="text-cyan-400">MRYS</span>
                </h1>
                <p className="text-xs text-gray-400">Admin Panel</p>
              </div>
            </div>

            {/* User Info & Logout */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 bg-slate-700/50 px-4 py-2 rounded-lg">
                <IconUser className="w-4 h-4 text-cyan-400" />
                <div className="text-sm">
                  <p className="text-white font-medium">{user.name}</p>
                  <p className="text-gray-400 text-xs">{user.role}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all disabled:opacity-50"
              >
                <IconLogout className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome back, <span className="text-cyan-400">{user.name}</span>
          </h2>
          <p className="text-gray-400">Manage your bonuses and leaderboards from here</p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="inline-flex gap-2 bg-slate-800/60 backdrop-blur-md border border-cyan-500/20 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('bonuses')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all ${
                activeTab === 'bonuses'
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <IconGift className="w-5 h-5" />
              Bonuses
            </button>
            <button
              onClick={() => setActiveTab('leaderboards')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all ${
                activeTab === 'leaderboards'
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <IconTrophy className="w-5 h-5" />
              Leaderboards
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-slate-800/60 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 min-h-[600px]">
          {activeTab === 'bonuses' ? (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Manage Bonuses</h3>
                  <p className="text-gray-400 text-sm">Create, edit, and manage casino bonuses</p>
                </div>
                <button 
                  onClick={() => setShowBonusForm(true)}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/30"
                >
                  <IconGift className="w-5 h-5" />
                  Add New Bonus
                </button>
              </div>

              {/* Bonuses List */}
              <BonusList key={refreshBonuses} />
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Manage Leaderboards</h3>
                <p className="text-gray-400 text-sm">Create and manage partner leaderboards</p>
              </div>

              {/* Leaderboards List */}
              <LeaderboardList />
            </div>
          )}
        </div>
      </main>

      {/* Bonus Form Modal */}
      {showBonusForm && (
        <BonusForm
          onClose={() => setShowBonusForm(false)}
          onSuccess={() => {
            setRefreshBonuses(prev => prev + 1);
          }}
        />
      )}
    </div>
  );
}
