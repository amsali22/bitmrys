import type { Metadata } from "next";
import { Golos_Text } from "next/font/google";
import "./globals.css";
import KickStream from "@/components/kick-stream";
import { Analytics } from "@vercel/analytics/next";

const golosText = Golos_Text({
  variable: "--font-golos-text",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "BitMrYuss - Take your game to the next level!",
  description: "Compete with the best, climb the leaderboards, and claim huge prizes from our trusted partners.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" >
      <body
        className={`${golosText.variable} antialiased`}
        style={{
          backgroundImage: 'url(/images/backgrounds/bgwebp.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          fontFamily: 'var(--font-golos-text)'
        }}
      >
        {children}
        <KickStream />
        <Analytics />
      </body>
    </html>
  );
}
