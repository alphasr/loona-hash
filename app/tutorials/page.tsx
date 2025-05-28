'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Zap,
  Rocket,
  Bitcoin,
  Film,
  Lightbulb,
  HelpCircle,
  Dog,
} from 'lucide-react'; // Changed Doge to Dog

// Placeholder for a Doge-like icon if not available - using Dog from lucide now for simplicity in this fix
// const DogeIcon = Dog; // Or keep your custom one if preferred
const DogeIcon = () => (
  // Keeping custom for thematic consistency as per original plan
  <svg
    viewBox='0 0 24 24'
    width='24'
    height='24'
    stroke='currentColor'
    strokeWidth='2'
    fill='none'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M12 4c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'></path>
    <path d='M18.5 7c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5z'></path>
  </svg>
);

// New Component: BlinkingBorderBox
const BlinkingBorderBox = ({ children }: { children: React.ReactNode }) => (
  <div className='p-1 rounded-xl animate-crazy-border-blink my-4'>
    <div className='bg-gray-900 bg-opacity-70 p-4 rounded-lg'>{children}</div>
  </div>
);

export default function CrazyTutorialsPage() {
  // Removed bgColor state and its useEffect
  const [showConfetti, setShowConfetti] = useState(false);

  // useEffect for color change removed

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000); // Confetti lasts for 3 seconds
  };

  const VideoPlaceholder = ({
    title,
    videoId,
  }: {
    title: string;
    videoId: string;
  }) => (
    <div className='bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300'>
      <h3 className='text-2xl font-bold mb-3 text-yellow-400 flex items-center'>
        <Film className='mr-2' /> {title}
      </h3>
      <div className='aspect-w-16 aspect-h-9 rounded-md overflow-hidden border-2 border-purple-500'>
        {/*
          Ensure the videoId is correct and the video is publicly embeddable.
          If videos don't render, check browser console for errors, network connectivity,
          or browser extensions (like ad blockers) that might interfere with YouTube iframes.
          The @tailwindcss/aspect-ratio plugin should be installed and configured for this styling to work correctly.
        */}
        <iframe
          className='w-full h-full'
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      </div>
      <p className='mt-3 text-sm text-gray-300'>
        Watch this to level up your crypto game! 🚀
      </p>
    </div>
  );

  const MemeCoinCard = ({
    name,
    description,
    icon,
  }: {
    name: string;
    description: string;
    icon: React.ReactNode;
  }) => (
    <div className='bg-pink-500 bg-opacity-30 p-6 rounded-2xl shadow-2xl transform hover:rotate-3 hover:scale-110 transition-all duration-300 border-4 border-yellow-300 hover:border-lime-400'>
      <div className='flex items-center justify-center text-6xl mb-4 text-yellow-300 animate-bounce'>
        {icon}
      </div>
      <h3
        className='text-3xl font-black text-center mb-2 text-white'
        style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}
      >
        {name}
      </h3>
      <p className='text-center text-lg text-gray-200'>{description}</p>
      <Button
        onClick={triggerConfetti}
        className='mt-4 w-full bg-lime-400 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-full text-lg transform hover:skew-x-12 transition-transform duration-200'
      >
        MOON ME! 🌕
      </Button>
    </div>
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '2rem',
        // transition and backgroundColor removed, handled by className now
        color: 'white',
        fontFamily:
          '"Comic Sans MS", "Chalkduster", "Bradley Hand", cursive, sans-serif',
        overflow: 'hidden',
      }}
      className='relative animate-crazy-bg' // Added animate-crazy-bg for new background
    >
      {showConfetti && (
        <div className='absolute inset-0 pointer-events-none z-50'>
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className='absolute rounded-full animate-fall'
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * -50}%`, // Start off-screen
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                backgroundColor: `hsl(${Math.random() * 360}, 100%, 70%)`,
                animationDuration: `${Math.random() * 3 + 2}s`, // 2-5 seconds fall time
                animationDelay: `${Math.random() * 1}s`,
              }}
            />
          ))}
        </div>
      )}

      <header className='text-center mb-16'>
        <h1
          className='text-7xl md:text-9xl font-black animate-rainbow-text-fast' // Changed style to className
          // Removed inline style for textShadow
        >
          LOONA-VERSITY!
        </h1>
        <p className='text-3xl mt-4 text-yellow-300 animate-bounce'>
          Get Ready to HODL Your Brainz! 🧠💥
        </p>
      </header>

      {/* Section 1: Crypto Basics */}
      <section className='mb-20'>
        <h2 className='text-5xl font-bold text-center mb-10 text-cyan-300 underline decoration-wavy decoration-pink-500'>
          <Lightbulb className='inline-block w-12 h-12 mr-3 animate-spin' />{' '}
          Crypto 101: The Noob Zone
        </h2>
        <div className='grid md:grid-cols-2 gap-8'>
          <VideoPlaceholder
            title='What is Bitcoin? (For Dummies & Dogs)'
            videoId='s4g1XFU8Gto'
          />
          <VideoPlaceholder
            title="Blockchain Explained (Like You're 5)"
            videoId='2yJqjTiwpxM'
          />
          <VideoPlaceholder
            title='Understanding Ethereum & Smart Contracts'
            videoId='jxLkbJozKbY'
          />
          <VideoPlaceholder
            title="How to Keep Your Crypto Safe (Don't Get Rekt!)"
            videoId='Y4g_6t_v_5E'
          />
        </div>
      </section>

      {/* Section 2: Meme Coin Mania */}
      <section className='mb-20 p-8 bg-purple-700 bg-opacity-40 rounded-3xl border-4 border-dashed border-yellow-400'>
        <h2
          className='text-5xl font-black text-center mb-10 text-lime-300'
          style={{ WebkitTextStroke: '2px #FF00FF' }}
        >
          <DogeIcon /> MEME COIN MADNESS <DogeIcon />
        </h2>
        <p className='text-xl text-center mb-10 text-white'>
          Welcome to the wild west of crypto! Where memes become dreams, and
          dogs fly to the moon! 🚀🐕✨
        </p>
        <div className='grid md:grid-cols-3 gap-10'>
          <MemeCoinCard
            name='DogeCoin'
            description='Much wow. Very currency. The OG meme.'
            icon={<DogeIcon />}
          />
          <MemeCoinCard
            name='Shiba Inu'
            description='The Doge killer? Or just another good boy?'
            icon={<Zap />}
          />
          <MemeCoinCard
            name='LoonaCoin (Soon™)'
            description='Our very own ticket to the moon! Get ready!'
            icon={<Rocket />}
          />
        </div>
      </section>

      {/* Section 3: LoonaHash Deep Dive */}
      <section className='mb-12'>
        <h2 className='text-5xl font-bold text-center mb-10 text-orange-400 flex items-center justify-center'>
          <HelpCircle className='inline-block w-12 h-12 mr-3 animate-ping' />{' '}
          LoonaHash Academy
        </h2>
        <BlinkingBorderBox>
          {' '}
          {/* Used the new BlinkingBorderBox component */}
          <div className='space-y-6 bg-gray-900 bg-opacity-60 p-8 rounded-lg'>
            <div className='p-4 bg-teal-500 bg-opacity-30 rounded-md hover:bg-opacity-50 transition-all'>
              <h3 className='text-2xl font-semibold text-yellow-200'>
                How LoonaHash Works (The Magic Explained)
              </h3>
              <p className='text-gray-300'>
                Learn the secrets behind our revolutionary hashing algorithm.
                It's not actually magic... or is it? 😉
              </p>
            </div>
            <div className='p-4 bg-indigo-500 bg-opacity-30 rounded-md hover:bg-opacity-50 transition-all'>
              <h3 className='text-2xl font-semibold text-yellow-200'>
                Maximizing Your LoonaHash Gains 📈
              </h3>
              <p className='text-gray-300'>
                Tips and tricks to boost your (simulated) mining power and climb
                the leaderboards!
              </p>
            </div>
            <div className='p-4 bg-red-500 bg-opacity-30 rounded-md hover:bg-opacity-50 transition-all'>
              <h3 className='text-2xl font-semibold text-yellow-200'>
                Understanding LoonaTokenomics (Future!)
              </h3>
              <p className='text-gray-300'>
                Get a sneak peek into the future token that will power the
                LoonaVerse!
              </p>
            </div>
          </div>
        </BlinkingBorderBox>{' '}
        {/* Closing the new BlinkingBorderBox component */}
      </section>

      <footer className='text-center mt-20 pt-10 border-t-4 border-dashed border-cyan-400'>
        <p className='text-xl text-gray-300'>
          Remember: Invest responsibly. Meme coins are fun but volatile. DYOR!
          (Do Your Own Research)
        </p>
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          variant='outline'
          className='mt-8 text-xl py-3 px-8 border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300 animate-pulse hover:animate-none'
        >
          Back to Top 🚀
        </Button>
      </footer>
      <style jsx global>{`
        .animate-fall {
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite; // Keep falling for effect, or set to 1 for one-shot
        }
        @keyframes fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(360deg); // Fall past the bottom
            opacity: 0;
          }
        }
        .animate-rainbow-text-fast {
          animation: rainbow-text-keys-fast 2s linear infinite;
        }
        @keyframes rainbow-text-keys-fast {
          0% {
            color: #ff0000;
          }
          15% {
            color: #ff7f00;
          }
          30% {
            color: #ffff00;
          }
          45% {
            color: #00ff00;
          }
          60% {
            color: #0000ff;
          }
          75% {
            color: #4b0082;
          }
          90% {
            color: #8b00ff;
          }
          100% {
            color: #ff0000;
          }
        }
        /* New CSS for background and blinking border */
        @keyframes crazyBackgroundShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-crazy-bg {
          background: linear-gradient(
            45deg,
            #0f0c29,
            #302b63,
            #24243e,
            #570530,
            #290249,
            #000000
          );
          background-size: 400% 400%;
          animation: crazyBackgroundShift 20s ease infinite;
        }
        @keyframes crazyBorderBlink {
          0%,
          100% {
            border-color: #ff00ff;
            box-shadow: 0 0 10px #ff00ff;
          }
          25% {
            border-color: #00ffff;
            box-shadow: 0 0 10px #00ffff;
          }
          50% {
            border-color: #ffff00;
            box-shadow: 0 0 10px #ffff00;
          }
          75% {
            border-color: #00ff00;
            box-shadow: 0 0 10px #00ff00;
          }
        }
        .animate-crazy-border-blink {
          border: 3px solid;
          animation: crazyBorderBlink 1.5s linear infinite;
        }
      `}</style>
    </div>
  );
}
