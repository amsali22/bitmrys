import Link from 'next/link';
import { IconTrophyFilled, IconArrowLeft } from '@tabler/icons-react';

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Trophy Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-32 h-32 rounded-full bg-cyan-500/20 flex items-center justify-center border-4 border-cyan-500/50">
            <IconTrophyFilled className="w-16 h-16 text-cyan-400" />
          </div>
        </div>

        {/* Coming Soon Text */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
          Coming Soon
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-6">
          Leaderboard
        </h2>

        {/* Description */}
        <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
          We&apos;re working hard to bring you an exciting leaderboard experience! 
          Compete with the best players, climb the ranks, and win amazing prizes.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <p className="text-gray-400 text-sm">
            Stay tuned for updates and be ready to compete!
          </p>
        </div>

        {/* Back to Home Button */}
        <Link 
          href="/"
          className="btn btn-lg bg-cyan-500 hover:bg-cyan-600 text-white border-none font-bold px-8 inline-flex items-center gap-2"
        >
          <IconArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        {/* Decorative Elements */}
        <div className="mt-12 flex justify-center gap-4">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}
