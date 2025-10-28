'use client';

import Image from 'next/image';
import { IconX, IconGift, IconCopy, IconCheck, IconHelpHexagonFilled } from '@tabler/icons-react';
import { useState, useEffect } from 'react';

interface Bonus {
  _id: string;
  name: string;
  logo: string;
  url: string;
  bonusCode: string;
  bonusAmount: string;
  steps: string[];
  active: boolean;
}

export default function Bonuses() {
  const [bonuses, setBonuses] = useState<Bonus[]>([]);
  const [selectedBonus, setSelectedBonus] = useState<Bonus | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBonuses();
  }, []);

  const fetchBonuses = async () => {
    try {
      const response = await fetch('/api/bonuses/public');
      if (response.ok) {
        const data = await response.json();
        setBonuses(data);
      }
    } catch (error) {
      console.error('Error fetching bonuses:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="bonuses" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Bonuses
          </h2>
          <p className="text-gray-400 text-sm uppercase tracking-wide">CLAIM INSTANTLY & ENJOY</p>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : bonuses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No bonuses available at the moment.</p>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl justify-items-center">
              {bonuses.map((bonus) => (
                <div 
                  key={bonus._id}
                  className="card bg-slate-800/40 backdrop-blur-md border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 w-full max-w-sm"
                >
                  <div className="card-body">
                    {/* Header - Centered Logo and Text */}
                    <div className="flex flex-col items-center text-center">
                      <div className="w-48 h-48 flex items-center justify-center rounded-lg">
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
                            width={260}
                            height={260}
                            className="object-contain"
                          />
                        )}
                      </div>
                      <h2 className="card-title text-lg mb-1 justify-center">{bonus.name}</h2>
                    </div>
                  
                    {/* Main Bonus */}
                    <div className="bg-slate-900/90 rounded-lg p-3 mb-4">
                      <p className="text-xs text-gray-400 text-center mb-1 uppercase tracking-wider">Main Bonus</p>
                      <p className="text-white font-bold text-center text-sm">{bonus.bonusAmount}</p>
                    </div>
                    
                    {/* Claim Button */}
                    <div className="card-actions">
                      <a
                        href={bonus.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary w-full bg-cyan-500 hover:bg-cyan-600 border-none text-sm font-bold"
                      >
                        CLAIM BONUS
                      </a>
                    </div>

                    {/* Info Button */}
                    <div className="card-actions mt-2">
                      <button
                        onClick={() => setSelectedBonus(bonus)}
                        className="btn btn-ghost w-full border border-cyan-500/30 hover:border-cyan-500 hover:bg-cyan-500/10 text-cyan-400 text-xs font-bold flex items-center justify-center gap-2"
                      >
                        <IconHelpHexagonFilled className="w-4 h-4" />
                        HOW TO CLAIM BONUS
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal for How to Claim Bonus */}
        {selectedBonus && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={() => setSelectedBonus(null)}
          >
            <div 
              className="bg-slate-800/90 backdrop-blur-xl border-2 border-cyan-500/40 rounded-xl max-w-lg w-full relative shadow-2xl shadow-cyan-500/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedBonus(null)}
                className="absolute top-4 right-4 p-2 hover:bg-slate-700/50 rounded-lg transition-all z-10 group cursor-pointer"
              >
                <IconX className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
              </button>

              {/* Header */}
              <div className="text-center pt-8 pb-6 px-6 border-b border-slate-700/50">
                <div className="flex justify-center mb-4">
                  <div className="bg-linear-to-br from-cyan-500 to-cyan-600 p-4 rounded-full shadow-lg shadow-cyan-500/30">
                    <IconGift className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">HOW TO CLAIM BONUS</h3>
                <div className="inline-flex items-center justify-center gap-2 bg-slate-900/50 rounded-lg py-2 px-4">
                  <span className="text-cyan-400 font-bold text-lg">{selectedBonus.name}</span>
                </div>
              </div>

              {/* Steps */}
              <div className="p-6 space-y-5">
                {selectedBonus.steps.map((step, index) => (
                  <div key={index} className="flex gap-4 bg-slate-900/40 rounded-lg p-4 border border-slate-700/30">
                    <div className="shrink-0">
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                        <span className="text-white font-bold text-base">{index + 1}</span>
                      </div>
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-gray-200 text-sm leading-relaxed font-medium">{step}</p>
                    </div>
                  </div>
                ))}

                {/* Code Box */}
                <div className="bg-slate-900/70 border-2 border-cyan-500/30 rounded-lg p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-gray-400 text-xs uppercase tracking-wider shrink-0">Code:</span>
                    <span className="text-cyan-400 font-bold text-xl tracking-wide">{selectedBonus.bonusCode}</span>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(selectedBonus.bonusCode)}
                    className="btn btn-sm bg-cyan-500 hover:bg-cyan-600 text-white border-none text-xs font-bold px-4 shadow-lg shadow-cyan-500/30 flex items-center gap-2 shrink-0"
                  >
                    {copied ? (
                      <>
                        <IconCheck className="w-4 h-4" />
                        COPIED
                      </>
                    ) : (
                      <>
                        <IconCopy className="w-4 h-4" />
                        COPY
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Footer with Visit Button */}
              <div className="p-6 pt-0">
                <a
                  href={selectedBonus.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-block bg-cyan-500 hover:bg-cyan-600 text-white border-none font-bold shadow-lg shadow-cyan-500/30"
                >
                  VISIT {selectedBonus.name}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
