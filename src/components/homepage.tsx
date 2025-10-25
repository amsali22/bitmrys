import Hero from './hero';
import HowToWin from './how-to-win';
import Bonuses from './bonuses';
import ReadyToStart from './ready-to-start';

export default function Homepage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <HowToWin />
      <Bonuses />
      <ReadyToStart />
    </div>
  );
}
