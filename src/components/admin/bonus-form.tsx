'use client';

import { useState } from 'react';
import { IconX, IconPlus, IconTrash } from '@tabler/icons-react';

interface Bonus {
  _id?: string;
  name: string;
  logo: string;
  url: string;
  bonusCode: string;
  bonusAmount: string;
  extraBonus?: string;
  steps: string[];
  active: boolean;
}

interface BonusFormProps {
  onClose: () => void;
  onSuccess: () => void;
  editBonus?: Bonus;
}

export default function BonusForm({ onClose, onSuccess, editBonus }: BonusFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: editBonus?.name || '',
    logo: editBonus?.logo || '',
    url: editBonus?.url || '',
    bonusCode: editBonus?.bonusCode || '',
    bonusAmount: editBonus?.bonusAmount || '',
    extraBonus: editBonus?.extraBonus || '',
    steps: editBonus?.steps || [''],
    active: editBonus?.active ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const url = editBonus 
        ? `/api/bonuses/${editBonus._id}`
        : '/api/bonuses';
      
      const method = editBonus ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          steps: formData.steps.filter((step: string) => step.trim() !== ''),
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to save bonus');
      }

      onSuccess();
      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save bonus');
      setIsSubmitting(false);
    }
  };

  const addStep = () => {
    setFormData({ ...formData, steps: [...formData.steps, ''] });
  };

  const removeStep = (index: number) => {
    const newSteps = formData.steps.filter((step: string, i: number) => i !== index);
    setFormData({ ...formData, steps: newSteps });
  };

  const updateStep = (index: number, value: string) => {
    const newSteps = [...formData.steps];
    newSteps[index] = value;
    setFormData({ ...formData, steps: newSteps });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-xl border border-cyan-500/20 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-slate-800 border-b border-cyan-500/20 px-6 py-4 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-white">
            {editBonus ? 'Edit Bonus' : 'Create New Bonus'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <IconX className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Basic Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">Basic Information</h4>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Casino Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="e.g., CSGOGEM, CSGOROLL"
              />
            </div>

            {/* Logo Path */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Logo Image *
              </label>
              <input
                type="text"
                required
                value={formData.logo}
                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="https://example.com/logo.png or /images/logos/logo.png"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter a full URL (https://...) or upload to /public/images/logos/ and enter the path
              </p>
            </div>

            {/* URL */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Casino URL *
              </label>
              <input
                type="url"
                required
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="https://csgogem.com"
              />
            </div>
          </div>

          {/* Bonus Details */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">Bonus Details</h4>

            {/* Bonus Code */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Bonus Code *
              </label>
              <input
                type="text"
                required
                value={formData.bonusCode}
                onChange={(e) => setFormData({ ...formData, bonusCode: e.target.value.toUpperCase() })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                placeholder="BITMRYS"
              />
            </div>

            {/* Main Bonus */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Main Bonus Amount *
              </label>
              <input
                type="text"
                required
                value={formData.bonusAmount}
                onChange={(e) => setFormData({ ...formData, bonusAmount: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="$500"
              />
              <p className="text-xs text-gray-500 mt-1">
                The main bonus amount (e.g., $500, 100% up to $1000)
              </p>
            </div>

            {/* Extra Bonus - Optional */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Extra Bonus <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <input
                type="text"
                value={formData.extraBonus}
                onChange={(e) => setFormData({ ...formData, extraBonus: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="3 FREE CASES"
              />
              <p className="text-xs text-gray-500 mt-1">
                Additional bonus or rewards (e.g., free spins, free cases)
              </p>
            </div>
          </div>

          {/* How to Claim Steps */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-bold text-white">How to Claim Bonus</h4>
              <button
                type="button"
                onClick={addStep}
                className="flex items-center gap-2 px-3 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg text-sm transition-colors"
              >
                <IconPlus className="w-4 h-4" />
                Add Step
              </button>
            </div>

            {formData.steps.map((step: string, index: number) => (
              <div key={index} className="flex gap-2">
                <div className="shrink-0 w-8 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400 font-bold">
                  {index + 1}
                </div>
                <input
                  type="text"
                  value={step}
                  onChange={(e) => updateStep(index, e.target.value)}
                  className="flex-1 px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder={`Step ${index + 1} description`}
                />
                {formData.steps.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeStep(index)}
                    className="shrink-0 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                  >
                    <IconTrash className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Status */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">Status</h4>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="w-5 h-5 rounded border-slate-600 text-cyan-500 focus:ring-2 focus:ring-cyan-500 bg-slate-900"
              />
              <div>
                <span className="text-white font-medium">Active</span>
                <p className="text-xs text-gray-400">
                  Active bonuses will be displayed on the website
                </p>
              </div>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-bold transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-bold transition-colors disabled:opacity-50 shadow-lg shadow-cyan-500/30"
            >
              {isSubmitting ? 'Saving...' : editBonus ? 'Update Bonus' : 'Create Bonus'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
