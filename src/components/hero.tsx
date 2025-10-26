'use client';

import { IconGiftFilled, IconTrophyFilled } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden"
    >
      {/* Floating Icons - Scattered */}
      {/* Desktop Version */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        {/* Top Left - 1000x */}
        <div className="absolute top-[25%] left-[20%] animate-bounce" style={{ animationDuration: '3s', animationDelay: '0s' }}>
          <Image
            src="/images/icons/1000x.png"
            alt="1000x"
            width={160}
            height={160}
            unoptimized={false}
            className="opacity-80"
          />
        </div>
        {/* top center - lebandit */}
        <div className="absolute top-[18%] left-[40%] animate-bounce" style={{ animationDuration: '3s', animationDelay: '0s' }}>
          <Image
            src="/images/icons/lebandit.png"
            alt="Lebandit"
            width={130}
            height={130}
            unoptimized={false}
            className="opacity-80"
          />
        </div>

        {/* Top Right - Wanted */}
        <div className="absolute top-[22%] right-[20%] animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}>
          <Image
            src="/images/icons/wanted.png"
            alt="Wanted"
            width={160}
            height={160}
            unoptimized={false}
            className="opacity-80"
          />
        </div>

        {/* Middle Left - Casino Chip */}
        <div className="absolute top-[42%] left-[20%] animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }}>
          <Image
            src="/images/icons/casino-chip.png"
            alt="Casino Chip"
            width={220}
            height={220}
            unoptimized={false}
            className="opacity-80"
          />
        </div>

        {/* Middle Right - Lollipop */}
        <div className="absolute top-[35%] right-[23%] animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '0.8s' }}>
          <Image
            src="/images/icons/lolipop.png"
            alt="Lollipop"
            width={160}
            height={160}
            unoptimized={false}
            className="opacity-80"
          />
        </div>

        {/* Bottom Left - Scatter */}
        <div className="absolute top-[68%] left-[18%] animate-bounce" style={{ animationDuration: '3.8s', animationDelay: '0.3s' }}>
          <Image
            src="/images/icons/scatter.png"
            alt="Scatter"
            width={200}
            height={200}
            unoptimized={false}
            className="opacity-80 rotate-12"
          />
        </div>

        {/* Bottom Right - Blackjack */}
        <div className="absolute top-[53%] right-[22%] animate-bounce" style={{ animationDuration: '4.2s', animationDelay: '1.2s' }}>
          <Image
            src="/images/icons/blackjack.png"
            alt="Blackjack"
            width={160}
            height={160}
            unoptimized={false}
            className="opacity-80"
          />
        </div>
        {/* Bottom Right - quack */}
        <div className="absolute top-[76%] right-[30%] animate-bounce" style={{ animationDuration: '4.2s', animationDelay: '1.2s' }}>
          <Image
            src="/images/icons/quack.png"
            alt="Quack"
            width={360}
            height={360}
            unoptimized={false}
            className="opacity-80 -rotate-12"
          />
        </div>
      </div>

      {/* Mobile Version - Smaller icons, better positioned */}
      <div className="absolute inset-0 pointer-events-none block md:hidden">
        {/* Top Left - 1000x */}
        <div className="absolute top-[12%] left-[5%] animate-bounce" style={{ animationDuration: '3s', animationDelay: '0s' }}>
          <Image
            src="/images/icons/1000x.png"
            alt="1000x"
            width={60}
            height={60}
            unoptimized={false}
            className="opacity-70"
          />
        </div>

        {/* Top Right - Wanted */}
        <div className="absolute top-[15%] right-[5%] animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}>
          <Image
            src="/images/icons/wanted.png"
            alt="Wanted"
            width={70}
            height={70}
            unoptimized={false}
            className="opacity-70"
          />
        </div>

        {/* Middle Left - Casino Chip */}
        <div className="absolute top-[40%] left-[2%] animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }}>
          <Image
            src="/images/icons/casino-chip.png"
            alt="Casino Chip"
            width={80}
            height={80}
            unoptimized={false}
            className="opacity-70"
          />
        </div>

        {/* Middle Right - Lollipop */}
        <div className="absolute top-[38%] right-[3%] animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '0.8s' }}>
          <Image
            src="/images/icons/lolipop.png"
            alt="Lollipop"
            width={70}
            height={70}
            unoptimized={false}
            className="opacity-70"
          />
        </div>

        {/* Bottom Left - Scatter */}
        <div className="absolute top-[70%] left-[8%] animate-bounce" style={{ animationDuration: '3.8s', animationDelay: '0.3s' }}>
          <Image
            src="/images/icons/scatter.png"
            alt="Scatter"
            width={75}
            height={75}
            unoptimized={false}
            className="opacity-70 rotate-12"
          />
        </div>

        {/* Bottom Right - Blackjack */}
        <div className="absolute top-[72%] right-[5%] animate-bounce" style={{ animationDuration: '4.2s', animationDelay: '1.2s' }}>
          <Image
            src="/images/icons/blackjack.png"
            alt="Blackjack"
            width={80}
            height={80}
            unoptimized={false}
            className="opacity-70"
          />
        </div>
      </div>

      <div className="text-center max-w-4xl mx-auto relative z-10">
        {/* Big Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/images/logos/Biglogo.png"
            alt="BitMrYuss"
            width={600}
            height={200}
            quality={100}
            priority
            className="w-full max-w-2xl h-auto"
          />
        </div>

        {/* Tagline */}
        <h2 className="text-2xl md:text-3xl text-white font-bold mb-4">
          Take your game to the next level!
        </h2>

        {/* Description */}
        <p className="text-gray-200 mb-8 max-w-2xl mx-auto text-sm md:text-base">
          Compete with the best, climb the leaderboards, and claim huge prizes from our trusted partners.
          Play using the code <span className="text-cyan-400 font-bold">&quot;MRYUSS&quot;</span> to enjoy exciting daily rewards, VIP perks, and exclusive bonuses every day!
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#bonuses"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('bonuses')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn btn-lg bg-cyan-500 hover:bg-cyan-600 text-white border-none font-bold px-8 cursor-pointer"
          >
            <IconGiftFilled className="w-5 h-5" />
            CLAIM BONUSES
          </a>
          <Link href="/leaderboard" className="btn btn-lg bg-gray-700 hover:bg-gray-800 text-white border-none font-bold px-8">
            <IconTrophyFilled className="w-5 h-5" />
            LEADERBOARDS
          </Link>
        </div>


        {/* Scroll indicator */}
        <div className="mt-16">
          <p className="text-gray-200 text-md pb-2">
            START EARNING <span className="text-cyan-400">REWARDS</span>
          </p>
          <div className="flex justify-center">
            <div className="w-8 h-12 border-2 border-gray-200 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-gray-200 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
