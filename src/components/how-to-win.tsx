import Image from 'next/image';

export default function HowToWin() {
  const steps = [
    {
      number: "Number1.svg",
      title: "Sign Up Under Code",
      description: (
        <>
          Create an account using the exclusive code <span className="text-cyan-400 font-bold">&quot;MRYUSS&quot;</span> on our partner casino websites.
        </>
      )
    },
    {
      number: "Number2.svg",
      title: "Join the Leaderboard",
      description: "Automatically enter the global leaderboard and start competing with players."
    },
    {
      number: "Number3.svg",
      title: "Climb & Win Prizes",
      description: "Rise through the ranks by playing and win amazing prizes on the leaderboard."
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How to <span className="text-cyan-400">Win Rewards</span>
          </h2>
          <p className="text-gray-300">Simple steps, massive rewards</p>
        </div>
        
        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div 
              key={step.number}
              className="card bg-linear-to-b from-cyan-900/20 to-blue-900/20 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="card-body items-center text-center">
                {/* Number Icon */}
                <div className="relative mb-6">
                          <div className="w-32 h-32">
                    <Image 
                      src={`/images/icons/${step.number}`} 
                      alt={step.title}
                      width={120}
                      height={120}
                    />
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="card-title text-white text-xl mb-3">
                  {step.title}
                </h3>
                      <p className=".text-gray-200 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
