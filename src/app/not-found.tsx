import Link from 'next/link';
import { IconHome } from '@tabler/icons-react';

export default function NotFound() {
  return (
    <div 
      className="min-h-screen px-4"
      style={{
        backgroundImage: 'url(/images/backgrounds/404bg.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Return Home Button */}
      <Link
        href="/"
        className="fixed top-4 left-4 inline-flex items-center gap-3 px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
      >
        <IconHome className="w-5 h-5" />
        Return to Home
      </Link>
    </div>
  );
}
