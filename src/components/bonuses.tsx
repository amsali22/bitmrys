'use client';

import Image from 'next/image';
import { IconX, IconGift, IconCopy, IconCheck, IconHelpHexagonFilled } from '@tabler/icons-react';
import { useState } from 'react';

interface Bonus {
  name: string;
  logo: string;
  website: string;
  mainBonus: string;
  features: string[];
  buttonText: string;
  info: string;
  link: string;
  howToClaim: {
    steps: string[];
    code?: string;
  };
}

export default function Bonuses() {
  const [selectedBonus, setSelectedBonus] = useState<Bonus | null>(null);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const bonuses: Bonus[] = [
    {
      name: "ELDOAH",
      logo: "eldoah.png",
      website: "ELDOAH.COM",
      mainBonus: "5% DEPOSIT BONUS",
      features: ["Free Spins"],
      buttonText: "CLAIM BONUS",
      info: "HOW TO CLAIM BONUS",
      link: "https://www.eldoah.com",
      howToClaim: {
        steps: [
          "CREATE AN ACCOUNT OR SIGN IN",
          "HEAD OVER TO DEPOSITS TO USE THE CODE",
          "USE THE CODE TO GET A BONUS + BE RUNNING IN OUR LEADERBOARDS!"
        ],
        code: "MRYUSS"
      }
    },
 /*    {
      name: "CSGOROLL",
      logo: "logo-csgoroll.png",
      website: "CSGOROLL.COM",
      mainBonus: "3 FREE BOXES",
      features: ["+$5 BALANCE"],
      buttonText: "CLAIM BONUS",
      info: "HOW TO CLAIM BONUS",
      link: "https://csgoroll.com/r/MRYUSS"
    },
    {
      name: "PackDraw",
      logo: "logo-packdraw.png",
      website: "PACKDRAW.COM",
      mainBonus: "5% UP TO $200 DAILY",
      features: ["+$10 BALANCE"],
      buttonText: "CLAIM BONUS",
      info: "HOW TO CLAIM BONUS",
      link: "https://packdraw.com/?ref=MRYUSS"
    },
    {
      name: "ROOBET",
      logo: "logo-roobet.png",
      website: "ROOBET.COM",
      mainBonus: "INSTANT MAX ROOMWARDS",
      features: ["100% MONTHLY LEADERBOARD + MORE"],
      buttonText: "CLAIM BONUS",
      info: "HOW TO CLAIM BONUS",
      link: "https://roobet.com/?ref=MRYUSS"
    },
    {
      name: "RAIN.GG",
      logo: "logo-raingg.png",
      website: "RAIN.GG",
      mainBonus: "3 FREE BOXES",
      features: ["+$15 BALANCE"],
      buttonText: "CLAIM BONUS",
      info: "HOW TO CLAIM BONUS",
      link: "https://rain.gg/?ref=MRYUSS"
    } */
  ];

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
        
        {/* Bonuses Grid - Centered */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl justify-items-center">
            {bonuses.map((bonus, index) => (
              <div 
              
                key={index}
                className="card bg-slate-800/40 backdrop-blur-md border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 w-full max-w-sm"
              > <div className="card-body">
                  {/* Header - Centered Logo and Text */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-48 h-48 flex items-center justify-center  rounded-lg ">
                      <Image 
                        src={`/images/logos/${bonus.logo}`} 
                        alt={bonus.name}
                        width={260}
                        height={260}
                        className="object-contain"
                      />
                    </div>
                    <h2 className="card-title text-lg mb-1 justify-center">{bonus.name}</h2>
                    
                  </div>
                
                  {/* Main Bonus - Dark Background */}
                  <div className="bg-slate-900/90 rounded-lg p-3 mb-3">
                    <p className="text-xs text-gray-400 text-center mb-1 uppercase tracking-wider">Main Bonus</p>
                    <p className="text-white font-bold text-center text-sm">{bonus.mainBonus}</p>
                  </div>
                  
                  {/* Features - Dark Background */}
                  <div className="space-y-2 mb-4">
                    {bonus.features.map((feature, idx) => (
                      <div key={idx} className="bg-slate-900/70 rounded-lg p-2.5">
                        <p className="text-xs text-gray-400 text-center mb-0.5 uppercase tracking-wider">Extra</p>
                        <p className="text-gray-200 text-xs text-center font-medium">{feature}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="card-actions flex-col">
                    {/* Claim Button - Light Blue/Cyan */}
                    <a 
                      href={bonus.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-block bg-cyan-400/80 hover:bg-cyan-400 text-slate-900 border-none font-bold text-sm uppercase tracking-wide"
                    >
                      {bonus.buttonText}
                    </a>
                    
                    {/* Info Link */}
                    <button 
                      onClick={() => setSelectedBonus(bonus)}
                      className="btn-ghost btn-sm w-full text-gray-400 cursor-pointer hover:text-cyan-400 text-xs normal-case p-2 "
                    >
                      <IconHelpHexagonFilled className="w-4 h-4 inline-block mr-1" />
                      {bonus.info}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

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
                {selectedBonus.howToClaim.steps.map((step, index) => (
                  <div key={index} className="flex gap-4 bg-slate-900/40 rounded-lg p-4 border border-slate-700/30">
                    <div className="shrink-0">
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                        <span className="text-white font-bold text-base">{index + 1}</span>
                      </div>
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-gray-100 text-sm leading-relaxed">
                        {step.includes('CODE') && selectedBonus.howToClaim.code ? (
                          <>
                            {step.split('CODE')[0]}
                            <span className="text-cyan-400 font-bold">CODE</span>
                            {step.split('CODE')[1]?.replace(`"${selectedBonus.howToClaim.code}"`, '')}
                            {step.includes(selectedBonus.howToClaim.code) && (
                              <span className="text-cyan-400 font-bold"> &quot;{selectedBonus.howToClaim.code}&quot;</span>
                            )}
                          </>
                        ) : (
                          step
                        )}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Code Box - Separate from steps */}
                {selectedBonus.howToClaim.code && (
                  <div className="bg-slate-900/70 border-2 border-cyan-500/30 rounded-lg p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-gray-400 text-xs uppercase tracking-wider shrink-0">Code:</span>
                      <span className="text-cyan-400 font-bold text-xl tracking-wide">{selectedBonus.howToClaim.code}</span>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(selectedBonus.howToClaim.code!)}
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
                )}
              </div>

              {/* Footer Button */}
              <div className="p-6 pt-0">
                <a
                  href={selectedBonus.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSelectedBonus(null)}
                  className="btn btn-block bg-linear-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white border-none font-bold uppercase text-base shadow-lg shadow-cyan-500/30"
                >
                  GO TO THE SITE
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
