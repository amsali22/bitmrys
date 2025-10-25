export default function ReadyToStart() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - CTA */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Start <br />
              <span className="text-cyan-400">Winning?</span>
            </h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Join players competing for massive prizes. Use code{' '}
              <span className="text-cyan-400 font-bold">&quot;MRYUSS&quot;</span>{' '}
              to unlock exclusive bonuses and start your journey to the top.
            </p>
            <button className="btn bg-cyan-500 hover:bg-cyan-600 text-white border-none font-bold px-8">
              Join the Leaderboard
            </button>
          </div>
          
          {/* Right Side - Prize Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="card bg-slate-800/60 backdrop-blur-md border border-cyan-500/30 w-full max-w-md">
              <div className="card-body text-center relative overflow-hidden">
                <h3 className="text-xl text-gray-200 mb-2">Leaderboard Prize</h3>
                <div className="text-6xl font-bold text-white mb-2">
                  $1,800<span className="text-cyan-400">+</span>
                </div>
                <p className="text-gray-300 text-sm">Leaderboard Total Prize</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
