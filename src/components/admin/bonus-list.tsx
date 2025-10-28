'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { IconEdit, IconTrash, IconEye, IconEyeOff, IconGift, IconExternalLink } from '@tabler/icons-react';
import BonusForm from './bonus-form';

interface Bonus {
  _id: string;
  name: string;
  logo: string;
  url: string;
  bonusCode: string;
  bonusAmount: string;
  extraBonus?: string;
  steps: string[];
  active: boolean;
  order: number;
  createdAt: string;
}

export default function BonusList() {
  const [bonuses, setBonuses] = useState<Bonus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBonus, setEditingBonus] = useState<Bonus | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchBonuses = async () => {
    try {
      const response = await fetch('/api/bonuses');
      const result = await response.json();
      if (result.success && result.data) {
        setBonuses(result.data);
      }
    } catch (error) {
      console.error('Error fetching bonuses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBonuses();
  }, []);

  const handleToggleActive = async (bonus: Bonus) => {
    try {
      const response = await fetch(`/api/bonuses/${bonus._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !bonus.active }),
      });

      const data = await response.json();
      if (data.success) {
        fetchBonuses();
      }
    } catch (error) {
      console.error('Error toggling bonus:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this bonus? This action cannot be undone.')) {
      return;
    }

    setDeletingId(id);
    try {
      const response = await fetch(`/api/bonuses/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        fetchBonuses();
      }
    } catch (error) {
      console.error('Error deleting bonus:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (bonus: Bonus) => {
    setEditingBonus(bonus);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingBonus(null);
  };

  const handleFormSuccess = () => {
    fetchBonuses();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {bonuses.length === 0 ? (
        <div className="bg-slate-900/50 rounded-lg p-8 text-center">
          <IconGift className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">No bonuses yet. Click &quot;Add New Bonus&quot; to create one.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bonuses.map((bonus) => (
            <div
              key={bonus._id}
              className={`bg-slate-900/50 border rounded-xl p-6 transition-all ${
                bonus.active 
                  ? 'border-cyan-500/30 hover:border-cyan-500/50' 
                  : 'border-slate-700/50 opacity-60'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Logo */}
                <div className="shrink-0 w-20 h-20 bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden">
                  {bonus.logo.startsWith('http') ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={bonus.logo}
                      alt={bonus.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Image
                      src={bonus.logo}
                      alt={bonus.name}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{bonus.name}</h3>
                      <a
                        href={bonus.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                      >
                        {bonus.url}
                        <IconExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-2">
                      {bonus.active ? (
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold">
                          ACTIVE
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-gray-500/20 text-gray-400 rounded-full text-xs font-bold">
                          INACTIVE
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bonus Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <p className="text-xs text-gray-400 uppercase mb-1">Bonus Code</p>
                      <p className="text-cyan-400 font-bold font-mono">{bonus.bonusCode}</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <p className="text-xs text-gray-400 uppercase mb-1">Main Bonus</p>
                      <p className="text-white font-bold">{bonus.bonusAmount}</p>
                    </div>
                    {bonus.extraBonus && (
                      <div className="bg-slate-800/50 rounded-lg p-3">
                        <p className="text-xs text-gray-400 uppercase mb-1">Extra</p>
                        <p className="text-green-400 font-bold">{bonus.extraBonus}</p>
                      </div>
                    )}
                  </div>

                  {/* Steps */}
                  {bonus.steps.length > 0 && (
                    <div className="bg-slate-800/50 rounded-lg p-3 mb-4">
                      <p className="text-xs text-gray-400 uppercase mb-2">How to Claim</p>
                      <ol className="space-y-1">
                        {bonus.steps.map((step, index) => (
                          <li key={index} className="text-sm text-gray-300 flex gap-2">
                            <span className="text-cyan-400 font-bold">{index + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleActive(bonus)}
                      className={`px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${
                        bonus.active
                          ? 'bg-orange-500/20 hover:bg-orange-500/30 text-orange-400'
                          : 'bg-green-500/20 hover:bg-green-500/30 text-green-400'
                      }`}
                    >
                      {bonus.active ? (
                        <>
                          <IconEyeOff className="w-4 h-4" />
                          Disable
                        </>
                      ) : (
                        <>
                          <IconEye className="w-4 h-4" />
                          Enable
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleEdit(bonus)}
                      className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg font-bold text-sm transition-all flex items-center gap-2"
                    >
                      <IconEdit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(bonus._id)}
                      disabled={deletingId === bonus._id}
                      className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg font-bold text-sm transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      <IconTrash className="w-4 h-4" />
                      {deletingId === bonus._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <BonusForm
          onClose={handleCloseForm}
          onSuccess={handleFormSuccess}
          editBonus={editingBonus || undefined}
        />
      )}
    </>
  );
}
