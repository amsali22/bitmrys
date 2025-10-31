'use client';

import Image from 'next/image';
import { IconSquareRoundedArrowDown } from '@tabler/icons-react';
import { useState, useEffect } from 'react';

export default function PartnershipEldoah() {
  const [totalJoined, setTotalJoined] = useState(370);
  const [hasClicked, setHasClicked] = useState(false);

  // Fetch the current count from the API on mount
  useEffect(() => {
    fetchCount();
    // Check if user has already clicked (localStorage)
    const clicked = localStorage.getItem('eldoahClicked');
    if (clicked) {
      setHasClicked(true);
    }
  }, []);

  const fetchCount = async () => {
    try {
      const response = await fetch('/api/eldoah-stats');
      if (response.ok) {
        const data = await response.json();
        setTotalJoined(data.totalJoined);
      }
    } catch (error) {
      console.error('Error fetching count:', error);
    }
  };

  // Handle button click - increment count in database
  const handleJoinClick = async () => {
    // Check localStorage first
    if (hasClicked) {
      return;
    }

    try {
      const response = await fetch('/api/eldoah-stats', {
        method: 'POST',
      });
      
      if (response.ok) {
        const data = await response.json();
        setTotalJoined(data.totalJoined);
        
        if (!data.alreadyCounted) {
          // Mark as clicked in localStorage
          localStorage.setItem('eldoahClicked', 'true');
          localStorage.setItem('eldoahClickedTime', Date.now().toString());
          setHasClicked(true);
        }
      }
    } catch (error) {
      console.error('Error incrementing count:', error);
    }
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/backgrounds/eldoahbg.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 space-y-24">
        
        {/* Hero Section - Partnership Logos */}
        <div className="text-center pt-12 min-h-[85vh] flex flex-col justify-center items-center">
          <div className="flex items-center justify-center gap-8 md:gap-12 mb-10 flex-wrap">
            {/* BitMrYuss Logo */}
            <Image
              src="/images/logos/Biglogo.png"
              alt="BitMrYuss Logo"
              width={475}
              height={208}
              className="w-[475px] h-52"
            />
            
            {/* X Symbol */}
            <span className="text-5xl md:text-6xl lg:text-7xl font-black text-white">X</span>
            
            {/* Eldoah Logo */}
            <Image
              src="/images/logos/eldoahbiglogo.svg"
              alt="Eldoah Logo"
              width={549}
              height={320}
              className="w-[549.45px] h-80"
            />
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            A new era begins!
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto mb-8 px-4 leading-relaxed">
            BitMryuss and Eldoah have joined forces to elevate your gaming journey.
            <br />
            Compete, earn, and win like never before, with exclusive bonuses, VIP rewards, and next-level opportunities for every player.
          </p>

          {/* Learn More About Eldoah Button */}
          <div className="flex flex-col items-center gap-6">
            <a
              href="#casino-section"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('casino-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-8 py-3.5 rounded shadow-[0px_4px_0px_0px_rgba(234,101,0,1.00)] outline-1 -outline-offset-1 outline-orange-500 cursor-pointer transition-all duration-300 text-sm md:text-base uppercase"
            >
              LEARN MORE ABOUT ELDOAH
            </a>

            {/* Scroll Down Circle Icon */}
            <div className="mt-12">
              <div className="w-12 h-12  flex items-center justify-center animate-bounce">
                <IconSquareRoundedArrowDown className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Enjoy Ultimate Live Casino Section */}
        <div id="casino-section" className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden ">
            <Image
              src="/images/enjoy_the_ultimate_live_casino.svg"
              alt="Enjoy The Ultimate Live Casino Experience"
              width={1200}
              height={500}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Why ELDOAH Section */}
        <div id="why-eldoah" className="max-w-5xl mx-auto space-y-12">
          <h2 className="text-3xl md:text-4xl font-black text-white">
            WHY ELDOAH?
          </h2>
                  <p className="text-sm md:text-base text-white-400 leading-relaxed">
            Partnering With ELDOAH Means Joining Forces With One Of The Most Trusted And Successful Names In Online Gaming. With Over 250 Live Tables From Providers Like Evolution, ELDOAH Offers An Unmatched Live Casino Experience Backed By Dual Gaming Licenses For Proven Security And Fairness. Their Record-Breaking Payer Wins, Instant Deposits And Withdrawals, And Exclusive VIP Program Make It The Go-To Platform For Serious Players Worldwide.
          </p>

          <h2 className="text-3xl md:text-4xl font-black text-white pt-4">
            WHAT MAKES ELDOAH UNIQUE?
          </h2>
                  <p className="text-sm md:text-base text-white-400 leading-relaxed">
            ELDOAH Stands Out With Its Smart Money Management System, Giving Players Full Control Over Their Funds. Through The Platform&apos;s Intuitive Dashboard, Players Can Instantly Move Money Between Game Wallets, Manage Their Bankroll With Precision, And Enjoy Seamless Play Across All Live Casino Platforms — All With Instant Processing And No Limits.
          </p>
          <p className="text-sm md:text-base text-white-400 leading-relaxed">
            Adding To The Excitement, ELDOAH&apos;s Lucky Wheel Offers A Unique Chance To Multiply Earned Rebates Up To 10x Instantly, Turning Loyalty Rewards Into Thrilling Wins.
          </p>
                  <p className="text-sm md:text-base text-white-400 leading-relaxed">
            Combined With Over 250 Live Tables, Industry-Leading Security, And An Elite VIP Program, ELDOAH Delivers A Gaming Experience That&apos;s Not Just Secure And Reputable — It&apos;s Built For Winners.
          </p>
        </div>

        {/* Money Management & Lucky Wheel Section */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#D9813D] rounded-3xl   p-8 md:p-12 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Money Management */}
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-black text-white text-center">
                  Money Management
                </h3>
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl flex items-center justify-center p-4">
                  <Image
                    src="/images/steps/moneymanagmentimage.png"
                    alt="Money Management System"
                    width={320}
                    height={384}
                    className="w-80 h-96 rounded-xl object-cover"
                  />
                </div>
              </div>

              {/* Lucky Wheel */}
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-black text-white text-center">
                  Lucky Wheel
                </h3>
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl flex items-center justify-center p-4">
                  <Image
                    src="/images/steps/luckywheelimage.png"
                    alt="Lucky Wheel"
                    width={620}
                    height={96}
                    className="w-[620px] h-96 rounded-xl object-fill"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Software Providers Section */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
            TOP SOFTWARE PROVIDERS.
          </h2>
                  <p className="text-sm md:text-base text-white-400 leading-relaxed mb-8">
            ELDOAH Is Partnered With A Host Of 48 Software Providers, Offering Over 3,000 Games, And Their Game Selection Is Continuously Updated With New Additions!
          </p>
          
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl">
            <Image
              src="/images/steps/softwareprovidersimage.png"
              alt="Software Providers"
              width={1200}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Ready to Start Section */}
        <div className="max-w-6xl mx-auto pb-16">
          <div className=" rounded-2xl p-8 md:p-12 lg:p-16">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left Side - CTA */}
              <div className="text-white space-y-6">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
                  Ready to Start <br />
                  <span className="text-orange-400">Winning?</span>
                </h2>
                              <p className="text-sm md:text-base text-white-400 leading-relaxed">
                  Join thousands of players taking life-changing wins at ELDOAH.
                  <br /><br />
                  Sign up today to claim exclusive rewards, enjoy instant payouts, and experience the ultimate live casino.
                  <br /><br />
                  Your path to success starts here.
                </p>
                <a
                  href="https://www.eldoah.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleJoinClick}
                  className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-8 py-3.5 rounded shadow-[0px_4px_0px_0px_rgba(234,101,0,1.00)] outline-1 -outline-offset-1 outline-orange-500 cursor-pointer transition-all duration-300 text-base md:text-lg"
                >
                  Join Eldoah
                </a>
                
                {/* Already Counted Message */}
                {/* {showMessage && (
                  <div className="mt-2 text-sm text-yellow-300 bg-yellow-900/50 px-4 py-2 rounded-lg animate-pulse">
                    ✓ You've already been counted today!
                  </div>
                )} */}
              </div>

              {/* Right Side - Stats */}
              <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-8">
                <p className="text-lg md:text-xl text-white/90 mb-3">Total Joined</p>
                <div className="text-5xl md:text-6xl lg:text-7xl font-black text-orange-400 mb-3">
                  {totalJoined}+
                </div>
                <p className="text-sm md:text-base text-white/70">
                  Total Players Joined by clicking this link
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
