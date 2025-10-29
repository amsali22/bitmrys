import Link from 'next/link';
import Image from 'next/image';
import { IconBrandXFilled, IconInfoTriangleFilled, IconBrandDiscordFilled, IconBrandKickFilled, IconHomeFilled, IconGiftFilled, IconInfoSquareRoundedFilled, IconTrophyFilled } from '@tabler/icons-react';

export default function FooterPartnership() {
  return (
    <footer className="bg-[#102B20]/90 backdrop-blur-sm  ">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Brand */}
          <div>
            <div className="mb-4">
              <Image 
                src="/images/logos/footerlogo.png" 
                alt="BitMrYuss" 
                width={180} 
                height={50}
                className="h-auto"
              />
            </div>
            <p className="text-gray-400 text-sm">
              Take your game to the next level with exclusive bonuses and rewards.
            </p>
          </div>
          
          {/* Navigation */}
          <div>
            <h3 className="text-white font-bold mb-4">NAVIGATION</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-green-400 transition-colors flex items-center gap-2">
                <IconHomeFilled className="w-4 h-4" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-gray-400 hover:text-green-400 transition-colors flex items-center gap-2">
                <IconTrophyFilled className="w-4 h-4" />
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="#bonuses" className="text-gray-400 hover:text-green-400 transition-colors flex items-center gap-2">
                <IconGiftFilled className="w-4 h-4" />
                  Claim Bonus
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="text-white font-bold mb-4">SUPPORT</h3>
            <ul className="space-y-2">
              <li>
                <Link href="https://www.gambleaware.org" className="text-gray-400 hover:text-green-400 transition-colors flex items-center gap-2">
                <IconInfoSquareRoundedFilled className="w-4 h-4" />
                  GambleAware
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Responsible Gaming Notice */}
        <div className="bg-slate-800/50 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-3">
            <IconInfoTriangleFilled className="w-16 h-16 text-yellow-400 mt-1" />
            <div>
              <h4 className="text-white font-bold mb-2">Responsible Gaming</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                All content and services provided on BITMRYUSS.com are for players 18+ years old. 
                Our platform partners with trusted and licensed gambling sites. Always play responsibly. 
                If you believe you or someone you know has a gambling problem, please contact your local 
                gambling addiction support organization.
              </p>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white">
          <p className="text-gray-300 text-sm mb-4 md:mb-0">
            © COPYRIGHT 2025 BITMRYUSS.COM
          </p>
          
          {/* Social Links */}
          <div className="flex gap-4">
            <a 
              href="https://discord.gg/vxuTWdCzRH" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-800 hover:bg-green-500 flex items-center justify-center text-white transition-all"
              aria-label="Discord"
            >
              <IconBrandDiscordFilled className="w-5 h-5" />
            </a>
            <a 
              href="https://kick.com/bitmryuss" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-800 hover:bg-green-500 flex items-center justify-center text-white transition-all"
              aria-label="Kick"
            >
              <IconBrandKickFilled className="w-5 h-5" />
            </a>
            <a 
              href="https://twitter.com/bitmryuss" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-800 hover:bg-green-500 flex items-center justify-center text-white transition-all"
              aria-label="Twitter"
            >
            <IconBrandXFilled className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
