import Image from 'next/image';

export default function Bonuses() {
  const bonuses = [
    {
      name: "ELDOAH",
      logo: "eldoah.png",
      website: "ELDOAH.COM",
      mainBonus: "5% DEPOSIT BONUS",
      features: ["Free Spins"],
      buttonText: "CLAIM BONUS",
      info: "HOW TO CLAIM BONUS",
      link: "https://www.eldoah.com"
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
        
        {/* Bonuses Grid - 3 on top, 2 on bottom centered */}
        <div className="flex flex-col items-center gap-6">
          {/* First row - 3 cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-8xl">
            {bonuses.slice(0, 3).map((bonus, index) => (
              <div 
                key={index}
                className="card bg-slate-800/40 backdrop-blur-md border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="card-body">
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
                    <button className="btn-ghost btn-sm w-full text-gray-400 cursor-pointer hover:text-cyan-400 text-xs normal-case p-2 ">
                      {bonus.info}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Second row - 2 cards centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
            {bonuses.slice(3, 5).map((bonus, index) => (
              <div 
                key={index + 3}
                className="card bg-slate-800/40 backdrop-blur-md border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300"
                >
                
                <div className="card-body">
                  {/* Header - Centered Logo and Text */}
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-32 h-32 flex items-center justify-center rounded-lg p-2 mb-2">
                      <Image 
                        src={`/images/logos/${bonus.logo}`} 
                        alt={bonus.name}
                        width={120}
                        height={120}
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
                    <button className="btn-ghost btn-sm w-full text-gray-400 hover:text-cyan-400 text-xs normal-case cursor-pointer p-2">
                      {bonus.info}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
