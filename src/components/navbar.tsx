import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="/images/logos/smalllogo.png" 
                alt="BitMrYuss Logo" 
                width={150} 
                height={40}
                priority
              />
            </Link>
          </div>
          
          {/* Center Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <ul className="flex gap-8">
              <li>
                <Link href="/" className="text-white hover:text-cyan-400 font-medium text-sm transition-colors">
                  HOME
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-white hover:text-cyan-400 font-medium text-sm transition-colors">
                  LEADERBOARD
                </Link>
              </li>
              <li>
                <Link href="/claim-bonus" className="text-white hover:text-cyan-400 font-medium text-sm transition-colors">
                  CLAIM BONUS
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Right side - CTA Button */}
          <div className="flex items-center gap-4">
            <button className="hidden sm:block btn btn-md bg-cyan-400 hover:bg-cyan-500 text-white border-none font-bold px-6">
              JOIN THE SERVER
            </button>
            
            {/* Mobile menu */}
            <div className="dropdown dropdown-end lg:hidden">
              <label tabIndex={0} className="btn btn-ghost btn-circle text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-slate-800 rounded-box w-52">
                <li><Link href="/">HOME</Link></li>
                <li><Link href="/leaderboard">LEADERBOARD</Link></li>
                <li><Link href="/claim-bonus">CLAIM BONUS</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
