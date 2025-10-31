import PartnershipEldoah from '@/components/partnershipeldoah';
import Navbar from '@/components/navbar';
import FooterPartnership from '@/components/footerpartnership';
export default function EldoahPage() {
   return (
      <>
        <Navbar />
        <main className="min-h-screen">
          <PartnershipEldoah />
        </main>
        <FooterPartnership />
      </>
    );
}

