import Hero from './hero';
import HowToWin from './how-to-win';
import Bonuses from './bonuses';
import ReadyToStart from './ready-to-start';
import YoutubeVids from './youtube-vids';

export default function Homepage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <HowToWin />
      <Bonuses />
      <ReadyToStart />
      <YoutubeVids />
    </div>
  );
}
