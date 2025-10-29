import Partnership from '@/components/partnership';
import Navbar from '@/components/navbar';
import FooterPartnership from '@/components/footerpartnership';

export const metadata = {
  title: 'Betify Partnership - BitMrYuss',
  description: 'Official partnership with Betify. Experience the ultimate gaming with instant payouts, exclusive bonuses, and 24/7 support.',
};

export default function BetifyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Partnership /> 
      </main>
          <FooterPartnership />
    </>
  );
}
