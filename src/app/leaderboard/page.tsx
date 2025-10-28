import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import LeaderboardContent from '@/components/leaderboard-content';

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <LeaderboardContent />
      </main>
      <Footer />
    </div>
  );
}
