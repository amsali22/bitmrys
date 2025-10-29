'use client';

import Image from 'next/image';
import { IconGiftFilled, IconTrophyFilled } from '@tabler/icons-react';

export default function Partnership() {
  return (
    <section className="relative w-full min-h-screen py-12 px-4 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/backgrounds/betifybg.webp)',
          backgroundSize: 'fill',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto space-y-20">
        
        {/* Hero Section - Partnership Logos */}
        <div className="text-center pt-18 min-h-[90vh] flex flex-col justify-center">
          <div className="flex items-center justify-center gap-6 md:gap-10 mb-12 flex-wrap">
            {/* BitMrYuss Logo */}
            <Image
              src="/images/logos/Biglogo.png"
              alt="BitMrYuss Logo"
              width={450}
              height={120}
                className="h-18 md:h-18 lg:h-32 w-auto rotate-[-4deg]"
            />
            
            {/* X Symbol */}
            <span className="text-6xl md:text-6xl lg:text-7xl font-black text-white/80">X</span>
            
            {/* Betify Logo */}
            <Image
              src="/images/logos/betifylogo.svg"
              alt="Betify Logo"
                width={450}
              height={120}
              className="h-18 md:h-24 lg:h-26 w-auto rotate-4"
            />
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            A new era begins!
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-10 px-4">
                      <span className="text-[#00B5C8] font-bold"> BitMryuss</span> and <span className="text-[#1ED760] font-bold">Betify</span> have joined forces to elevate your gaming journey.
            <br />
            Compete, earn, and win like never before, with exclusive bonuses, VIP rewards, and next-level opportunities for every player.
          </p>

          {/* Claim Bonuses Button */}
          <div className="flex flex-col items-center gap-4">
            <a
              href="https://record.betify.partners/_6tSjqjOZ8FtfWQTENI37dGNd7ZgqdRLk/1/"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('bonuses')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black font-bold px-5 py-2.5 rounded-md cursor-pointer transition-all duration-300 text-sm"
            >
              <IconGiftFilled className="w-4 h-4" />
              CLAIM BONUSES
            </a>

            {/* Learn More */}
            <p className="text-white/70 hover:text-white text-sm mt-20">Learn More</p>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white/70 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        {/* Betify Brand of Legends Section */}
        <div className="text-center space-y-8">
          {/* Heading with green "Brand OF" */}
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Betify the <span className="text-green-400">Brand OF</span>
            </h2>
            <div className="flex justify-center">
              <Image
                src="/images/logos/legends_0.webp"
                alt="Legends"
                width={800}
                height={200}
                className="w-full max-w-4xl h-auto"
              />
            </div>
          </div>

          {/* Celebrity Images */}
          <div className="relative max-w-5xl mx-auto">
            <Image
              src="/images/logos/ronaldinho_floyd_rakic-1-1.webp"
              alt="Legends - Ronaldinho, Floyd Mayweather, and more"
              width={1200}
              height={600}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>

        {/* Bonus Card Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative bg-linear-to-br from-green-600/90 to-green-800/90 backdrop-blur-sm border-2 border-green-400/50 rounded-md p-8 md:p-12 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left Side - Bonus Info */}
              <div className="text-white space-y-4">
                <Image
                  src="/images/logos/betifylogo.svg"
                  alt="Betify"
                  width={150}
                  height={40}
                  className="h-10 w-auto mb-4"
                />
                
                <div>
                  <p className="text-sm md:text-base mb-2">Enjoy a Welcome</p>
                  <span className="inline-block bg-green-500 text-white px-4 py-1 rounded text-sm font-bold mb-3">
                    Casino Bonus
                  </span>
                  
                  <div className="text-6xl md:text-7xl font-black text-white mb-2">
                    100%
                  </div>
                  <p className="text-xl md:text-2xl font-bold">Up to 500$</p>
                </div>

                <div className="pt-4">
                  <p className="text-sm md:text-base mb-2">Promocode</p>
                  <div className="inline-block bg-green-500 text-black px-6 py-2 rounded-lg text-xl font-black">
                    MRYUSS
                  </div>
                </div>
              </div>

              {/* Right Side - Casino Chips Image */}
              <div className="flex justify-center items-center">
                <Image
                  src="/images/icons/casino3ddesign.svg"
                  alt="Casino Chips"
                  width={300}
                  height={300}
                  className="w-full max-w-xs h-auto drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* How to Claim Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white text-center mb-12">
            How to <span className="text-green-400">Claim Your Bonus</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white/5 backdrop-blur-sm border-2 border-green-400/30 rounded-xl p-6 text-center space-y-4 hover:border-green-400/60 transition-all duration-300">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-black text-black">1</span>
              </div>
              
              <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-green-400/20">
                <Image
                                  src="https://kappa.lol/KOSvqB.png"
                  alt="Step 1 - Register Button"
                  fill
                  className="object-cover"
                />
              </div>
              
              <p className="text-white font-semibold text-lg">Click on the Register Button</p>
            </div>

            {/* Step 2 */}
            <div className="bg-white/5 backdrop-blur-sm border-2 border-green-400/30 rounded-xl p-6 text-center space-y-4 hover:border-green-400/60 transition-all duration-300">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-black text-black">2</span>
              </div>
              
              <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-green-400/20">
                <Image
                                  src="https://kappa.lol/2wRXus.png"
                  alt="Step 2 - Fill Information"
                  fill
                  className="object-cover"
                />
              </div>
              
              <p className="text-white font-semibold text-lg">
                Fill the information and use the <span className="text-green-400 font-black">MRYUSS</span> promocode on registration
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white/5 backdrop-blur-sm border-2 border-green-400/30 rounded-xl p-6 text-center space-y-4 hover:border-green-400/60 transition-all duration-300">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-black text-black">3</span>
              </div>
              
              <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-green-400/20 flex items-center justify-center bg-gradient-to-br from-green-600/20 to-green-800/20">
                <IconTrophyFilled className="w-32 h-32 text-green-400" />
              </div>
              
              <p className="text-white font-semibold text-lg">
                Enjoy Your <span className="text-green-400 font-black">Bonus!</span>
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
