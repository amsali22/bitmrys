'use client';

import { IconMaximize, IconX } from '@tabler/icons-react';
import { useState, useEffect } from 'react';

export default function KickStream() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if stream is live
    const checkLiveStatus = async () => {
      try {
        // Kick.com API endpoint to check if channel is live
        const response = await fetch(`https://kick.com/api/v2/channels/amine_12`);
        const data = await response.json();
        setIsLive(data.livestream !== null);
      } catch (error) {
        console.error('Error checking stream status:', error);
        setIsLive(false);
      } finally {
        setLoading(false);
      }
    };

    checkLiveStatus();
    
    // Check every 60 seconds
    const interval = setInterval(checkLiveStatus, 60000);

    return () => clearInterval(interval);
  }, []);

  if (isClosed) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isMinimized ? (
        // Minimized state - Just a badge
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-gray-900/95 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-4 py-3 flex items-center gap-2 hover:bg-gray-800/95 transition-all shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 ${isLive ? 'bg-red-500' : 'bg-gray-500'} rounded-full ${isLive ? 'animate-pulse' : ''}`}></div>
              <span className={`${isLive ? 'text-red-500' : 'text-gray-400'} text-xs font-bold`}>
                {loading ? 'CHECKING...' : isLive ? 'LIVE' : 'OFFLINE'}
              </span>
            </div>
            <span className="text-white text-sm font-semibold">BitMrYuss Stream</span>
          </div>
          <IconMaximize className="w-4 h-4 text-cyan-400" />
        </button>
      ) : (
        // Expanded state - Stream embed
        <div className="bg-gray-900/95 backdrop-blur-sm border border-cyan-500/30 rounded-lg overflow-hidden shadow-2xl w-[320px]">
          {/* Header */}
          <div className="bg-gray-800/90 px-3 py-2 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 ${isLive ? 'bg-green-500' : 'bg-gray-500'} rounded-full ${isLive ? 'animate-pulse' : ''}`}></div>
                <span className={`${isLive ? 'text-green-500' : 'text-gray-400'} text-xs font-bold`}>
                  {loading ? 'CHECKING...' : isLive ? 'LIVE' : 'OFFLINE'}
                </span>
              </div>
              <span className="text-white text-sm font-semibold">BitMrYuss Stream</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1 hover:bg-gray-700 rounded transition-colors"
                title="Minimize"
              >
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <button
                onClick={() => setIsClosed(true)}
                className="p-1 hover:bg-gray-700 rounded transition-colors"
                title="Close"
              >
                <IconX className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Stream Embed */}
          <div className="relative aspect-video bg-gray-950">
            <iframe
                              src="https://player.kick.com/bitmryuss" 
              className="w-full h-full"
              allowFullScreen
              allow="autoplay; encrypted-media; picture-in-picture"
            />
          </div>

          {/* Footer with Kick branding */}
          <div className="bg-gray-800/90 px-3 py-2 flex items-center justify-between border-t border-gray-700">
            <div className="flex items-center gap-2">
              {loading ? (
                <span className="text-gray-400 text-xs">Checking status...</span>
              ) : isLive ? (
                <>
                  <div className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                    LIVE
                  </div>
                  <span className="text-gray-300 text-xs">BitMrYuss is streaming</span>
                </>
              ) : (
                <>
                  <div className="bg-gray-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                    Offline
                  </div>
                  <span className="text-gray-400 text-xs">BitMrYuss is offline</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-white font-bold text-lg tracking-tight">KICK</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
