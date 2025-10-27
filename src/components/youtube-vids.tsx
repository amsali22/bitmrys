import { IconPlayerPlay, IconVideo } from '@tabler/icons-react';
import Link from 'next/link';
import Image from 'next/image';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  videoId: string;
}

async function getYouTubeVideos(): Promise<Video[]> {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || 'UCyour_channel_id';
  
  // Fallback data in case API fails or is not configured
  const fallbackVideos: Video[] = [
    {
      id: '1',
      title: 'Title 1',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      videoId: 'dQw4w9WgXcQ'
    },
    {
      id: '2',
      title: 'Title 2',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      publishedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      videoId: 'dQw4w9WgXcQ'
    },
    {
      id: '3',
      title: 'Title 3',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      publishedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      videoId: 'dQw4w9WgXcQ'
    },
    {
      id: '4',
      title: 'Title 4',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      publishedAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
      videoId: 'dQw4w9WgXcQ'
    },
    {
      id: '5',
      title: 'Title 5',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      publishedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      videoId: 'dQw4w9WgXcQ'
    }
  ];

  if (!API_KEY) {
    console.warn('YouTube API key not configured, using fallback data');
    return fallbackVideos;
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=5&type=video`,
      { 
        next: { revalidate: 3600 }, // Revalidate every hour
        cache: 'force-cache'
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('YouTube API error:', response.status, errorData);
      return fallbackVideos;
    }

    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      console.warn('No videos found in YouTube API response');
      return fallbackVideos;
    }
    
    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
      publishedAt: item.snippet.publishedAt,
      videoId: item.id.videoId
    }));
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return fallbackVideos;
  }
}

function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'TODAY';
  if (diffInDays === 1) return '1 DAY AGO';
  if (diffInDays < 30) return `${diffInDays} DAYS AGO`;
  if (diffInDays < 60) return '1 MONTH AGO';
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} MONTHS AGO`;
  return `${Math.floor(diffInDays / 365)} YEAR${Math.floor(diffInDays / 365) > 1 ? 'S' : ''} AGO`;
}

export default async function YoutubeVids() {
  const videos = await getYouTubeVideos();

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-cyan-500 rounded-lg p-2">
              <IconVideo className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">VIDEOS</h2>
          </div>
          <Link 
            href="https://www.youtube.com/@mamoniax/videos" 
            target="_blank"
                      className="btn btn-sm bg-gray-700 hover:bg-cyan-500 text-white border-none"
          >
            VIEW ALL
          </Link>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {videos.map((video) => (
            <Link
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.videoId}`}
              target="_blank"
              className="group relative bg-gray-800/50 rounded-lg overflow-hidden hover:bg-gray-800/70 transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gray-700">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"
                />
                {/* Play overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="bg-cyan-600 rounded-full p-3">
                    <IconPlayerPlay className="w-8 h-8 text-white fill-current" />
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-3">
                <h3 className="text-white font-semibold text-sm line-clamp-2 mb-2 group-hover:text-cyan-400 transition-colors">
                  {video.title}
                </h3>
                <p className="text-gray-400 text-xs">
                  {getTimeAgo(video.publishedAt)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
