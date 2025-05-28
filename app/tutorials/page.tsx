'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowRight,
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Rocket,
  Star,
  Brain,
  Heart,
  Sparkles,
  ChevronRight,
  Home,
  Volume2,
  VolumeX,
  Gamepad2,
  Trophy,
  Target,
  Lightbulb,
  X,
  SnowflakeIcon as Confetti,
  PartyPopper,
} from 'lucide-react';
import Link from 'next/link';

export default function TutorialPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [crazyMode, setCrazyMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [mouseTrail, setMouseTrail] = useState<
    { x: number; y: number; id: number }[]
  >([]);
  const [explosions, setExplosions] = useState<
    { x: number; y: number; id: number }[]
  >([]);
  const [memeMode, setMemeMode] = useState(false);
  const [score, setScore] = useState(0);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailIdRef = useRef(0);
  const explosionIdRef = useRef(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const tutorialSteps = [
    {
      title: 'Welcome to the CHAOS! 🎉',
      content:
        "Buckle up, space cadet! You're about to learn how to navigate the most INSANE crypto platform in the universe!",
      meme: 'This is fine. 🔥',
      icon: <Rocket className='w-8 h-8' />,
      gradient: 'from-red-500 via-yellow-500 to-orange-500',
      action: "Let's GO!",
    },
    {
      title: 'Connect Your Wallet 💰',
      content:
        "First things first - connect your wallet! Don't worry, we won't steal your lunch money... probably. 😈",
      meme: 'Wen wallet? Now wallet! 🦊',
      icon: <Zap className='w-8 h-8' />,
      gradient: 'from-purple-500 via-pink-500 to-blue-500',
      action: 'Connect Wallet',
    },
    {
      title: 'Buy $LUNA Tokens 🌙',
      content:
        "Time to get some $LUNA! Remember: Buy high, sell low... wait, that's not right! 🤪",
      meme: 'Number go UP! 📈',
      icon: <Star className='w-8 h-8' />,
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
      action: 'Buy Tokens',
    },
    {
      title: 'Stake for MEGA Rewards 🚀',
      content:
        'Stake your tokens and watch them multiply like rabbits! 420% APY is not a meme... or is it? 🐰',
      meme: 'Stonks only go UP! 📊',
      icon: <Trophy className='w-8 h-8' />,
      gradient: 'from-yellow-500 via-orange-500 to-red-500',
      action: 'Start Staking',
    },
    {
      title: 'Join the DAO 🗳️',
      content:
        'Vote on proposals and help shape the future! Your voice matters... unless you vote for pineapple on pizza. 🍕',
      meme: 'Democracy goes BRRR! 🗳️',
      icon: <Brain className='w-8 h-8' />,
      gradient: 'from-indigo-500 via-purple-500 to-pink-500',
      action: 'Vote Now',
    },
    {
      title: 'Become a LEGEND! 👑',
      content:
        "Congratulations! You're now a certified LoonaHash legend! Time to flex on Twitter! 💪",
      meme: 'We made it! 🎊',
      icon: <Heart className='w-8 h-8' />,
      gradient: 'from-pink-500 via-red-500 to-orange-500',
      action: 'Share Victory',
    },
  ];

  // Mouse trail effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newTrail = {
        x: e.clientX,
        y: e.clientY,
        id: trailIdRef.current++,
      };

      setMouseTrail((prev) => [...prev.slice(-20), newTrail]);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Clean up old trail points
    const interval = setInterval(() => {
      setMouseTrail((prev) => prev.slice(-15));
    }, 100);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      autoPlayRef.current = setTimeout(() => {
        if (currentStep < tutorialSteps.length - 1) {
          nextStep();
        } else {
          setIsPlaying(false);
        }
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [isPlaying, currentStep, tutorialSteps.length]);

  // Check for tutorial completion
  useEffect(() => {
    if (
      currentStep === tutorialSteps.length - 1 &&
      !completedSteps.includes(currentStep)
    ) {
      // Add a slight delay before showing the completion modal
      const timer = setTimeout(() => {
        setShowCompletionModal(true);
        createExplosion(window.innerWidth / 2, window.innerHeight / 2);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [currentStep, completedSteps, tutorialSteps.length]);

  // Explosion effect
  const createExplosion = (x: number, y: number) => {
    const newExplosion = {
      x,
      y,
      id: explosionIdRef.current++,
    };

    setExplosions((prev) => [...prev, newExplosion]);

    setTimeout(() => {
      setExplosions((prev) => prev.filter((exp) => exp.id !== newExplosion.id));
    }, 1000);
  };

  // Canvas animation for background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      shape: string;
      rotation: number;
      rotationSpeed: number;
    }[] = [];

    // Create particles
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        size: Math.random() * 15 + 5,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        shape: ['circle', 'square', 'triangle', 'star', 'heart'][
          Math.floor(Math.random() * 5)
        ],
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.7;

        switch (p.shape) {
          case 'circle':
            ctx.beginPath();
            ctx.arc(0, 0, p.size, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 'square':
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            break;
          case 'triangle':
            ctx.beginPath();
            ctx.moveTo(0, -p.size / 2);
            ctx.lineTo(-p.size / 2, p.size / 2);
            ctx.lineTo(p.size / 2, p.size / 2);
            ctx.closePath();
            ctx.fill();
            break;
          case 'star':
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
              const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
              const x1 = Math.cos(angle) * p.size;
              const y1 = Math.sin(angle) * p.size;
              const x2 = Math.cos(angle + Math.PI / 5) * (p.size / 2);
              const y2 = Math.sin(angle + Math.PI / 5) * (p.size / 2);

              if (i === 0) ctx.moveTo(x1, y1);
              else ctx.lineTo(x1, y1);
              ctx.lineTo(x2, y2);
            }
            ctx.closePath();
            ctx.fill();
            break;
          case 'heart':
            ctx.beginPath();
            ctx.moveTo(0, p.size / 4);
            ctx.bezierCurveTo(
              -p.size / 2,
              -p.size / 4,
              -p.size,
              p.size / 4,
              0,
              p.size
            );
            ctx.bezierCurveTo(
              p.size,
              p.size / 4,
              p.size / 2,
              -p.size / 4,
              0,
              p.size / 4
            );
            ctx.fill();
            break;
        }

        ctx.restore();

        // Update position
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Keep in bounds
        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setCompletedSteps((prev) =>
        prev.includes(currentStep) ? prev : [...prev, currentStep]
      );
      setScore(score + 100);
      createExplosion(window.innerWidth / 2, window.innerHeight / 2);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleMemeMode = () => {
    setMemeMode(!memeMode);
    setCrazyMode(!crazyMode);
  };

  const resetTutorial = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
    setScore(0);
    setShowCompletionModal(false);
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden ${
        crazyMode ? 'bg-black' : 'bg-gradient-to-br from-purple-900 to-pink-900'
      }`}
    >
      {/* Canvas Background */}
      <canvas ref={canvasRef} className='fixed inset-0 z-0 opacity-30' />

      {/* Mouse Trail */}
      {mouseTrail.map((point, index) => (
        <div
          key={point.id}
          className='fixed w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full pointer-events-none z-10'
          style={{
            left: point.x - 8,
            top: point.y - 8,
            opacity: (index + 1) / mouseTrail.length,
            transform: `scale(${(index + 1) / mouseTrail.length})`,
          }}
        />
      ))}

      {/* Explosions */}
      {explosions.map((explosion) => (
        <div
          key={explosion.id}
          className='fixed pointer-events-none z-20 animate-ping'
          style={{
            left: explosion.x - 50,
            top: explosion.y - 50,
          }}
        >
          <div className='w-24 h-24 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 rounded-full opacity-75' />
        </div>
      ))}

      {/* Header */}
      <header className='relative z-30 p-6 border-b border-gray-800'>
        <div className='max-w-7xl mx-auto flex items-center justify-between'>
          <Link href='/' className='flex items-center space-x-2 group'>
            <Home className='w-6 h-6 text-purple-400 group-hover:animate-spin' />
            <span
              className={`text-2xl font-bold ${
                crazyMode ? 'animate-rainbow-text' : 'text-white'
              }`}
            >
              Back to Chaos
            </span>
          </Link>

          <div className='flex items-center space-x-4'>
            <div
              className={`px-4 py-2 rounded-full ${
                crazyMode ? 'animate-rainbow-bg' : 'bg-purple-600'
              } text-white font-bold`}
            >
              Score: {score}
            </div>

            <Button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className='bg-gray-800 hover:bg-gray-700 text-white'
            >
              {soundEnabled ? (
                <Volume2 className='w-5 h-5' />
              ) : (
                <VolumeX className='w-5 h-5' />
              )}
            </Button>

            <Button
              onClick={toggleMemeMode}
              className={`${
                memeMode
                  ? 'animate-rainbow-bg'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600'
              } text-white`}
            >
              {memeMode ? 'Normal Mode' : 'MEME MODE'}{' '}
              <Gamepad2 className='ml-2 w-5 h-5' />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='relative z-20 px-6 py-12'>
        <div className='max-w-6xl mx-auto'>
          {/* Title */}
          <section className='text-center mb-16'>
            <h1
              className={`text-6xl md:text-8xl font-black mb-8 ${
                crazyMode ? 'animate-rainbow-text' : 'text-white'
              }`}
            >
              TUTORIAL
            </h1>
            <h2
              className={`text-3xl md:text-5xl font-bold ${
                memeMode ? 'animate-bounce' : ''
              } ${
                crazyMode
                  ? 'animate-rainbow-text-reverse'
                  : 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'
              }`}
            >
              LEARN OR GET REKT! 🚀
            </h2>
            <p className='text-xl text-gray-300 mt-4 max-w-2xl mx-auto'>
              Master the art of crypto chaos in 6 easy steps. Warning: Side
              effects may include moon addiction and diamond hands.
            </p>
          </section>

          {/* Progress Bar */}
          <section className='mb-12'>
            <div className='flex items-center justify-between mb-4'>
              <span className='text-white font-bold'>
                Progress:{' '}
                {Math.round(((currentStep + 1) / tutorialSteps.length) * 100)}%
              </span>
              <span className='text-purple-400'>
                Step {currentStep + 1} of {tutorialSteps.length}
              </span>
            </div>
            <div className='w-full bg-gray-800 rounded-full h-4 overflow-hidden'>
              <div
                className={`h-full transition-all duration-500 ${
                  crazyMode
                    ? 'animate-rainbow-bg'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500'
                }`}
                style={{
                  width: `${((currentStep + 1) / tutorialSteps.length) * 100}%`,
                }}
              />
            </div>
          </section>

          {/* Tutorial Steps Navigation */}
          <section className='mb-12'>
            <h3
              className={`text-2xl font-bold mb-6 ${
                crazyMode ? 'animate-rainbow-text' : 'text-white'
              }`}
            >
              Tutorial Steps
            </h3>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
              {tutorialSteps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    index === currentStep
                      ? crazyMode
                        ? 'animate-border-glow'
                        : 'bg-purple-600 border-2 border-purple-400'
                      : index < currentStep
                      ? 'bg-green-600 border-2 border-green-400'
                      : 'bg-gray-800 border-2 border-gray-600'
                  } ${completedSteps.includes(index) ? 'animate-pulse' : ''}`}
                >
                  <div
                    className={`text-2xl mb-2 ${
                      index <= currentStep ? 'animate-bounce' : ''
                    }`}
                  >
                    {step.icon}
                  </div>
                  <div className='text-xs font-bold text-white'>
                    Step {index + 1}
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Current Step Content */}
          <section className='mb-12'>
            <h3
              className={`text-2xl font-bold mb-6 ${
                crazyMode ? 'animate-rainbow-text' : 'text-white'
              }`}
            >
              Current Lesson
            </h3>
            <div className='grid lg:grid-cols-2 gap-12 items-start'>
              {/* Step Card */}
              <Card
                className={`${
                  crazyMode
                    ? 'animate-border-glow'
                    : 'bg-gray-900/80 border-gray-700'
                } backdrop-blur-lg transform transition-all duration-500 hover:scale-105`}
              >
                <CardHeader>
                  <div className='flex items-center justify-between'>
                    <div
                      className={`p-4 rounded-xl bg-gradient-to-r ${
                        tutorialSteps[currentStep].gradient
                      } ${
                        memeMode ? 'animate-spin' : 'group-hover:animate-spin'
                      }`}
                    >
                      {tutorialSteps[currentStep].icon}
                    </div>
                    <div
                      className={`text-right ${
                        memeMode ? 'animate-bounce' : ''
                      }`}
                    >
                      <div className='text-sm text-gray-400'>
                        Step {currentStep + 1}
                      </div>
                      <div className='text-lg font-bold text-purple-400'>
                        {Math.round(
                          ((currentStep + 1) / tutorialSteps.length) * 100
                        )}
                        % Complete
                      </div>
                    </div>
                  </div>
                  <CardTitle
                    className={`text-3xl font-bold ${
                      crazyMode ? 'animate-rainbow-text' : 'text-white'
                    } mt-4`}
                  >
                    {tutorialSteps[currentStep].title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-gray-300 text-lg mb-6 leading-relaxed'>
                    {tutorialSteps[currentStep].content}
                  </p>

                  {/* Meme Box */}
                  <div
                    className={`p-4 rounded-lg ${
                      crazyMode ? 'animate-rainbow-bg' : 'bg-yellow-400'
                    } text-black font-bold text-center mb-6 ${
                      memeMode ? 'animate-pulse text-2xl' : 'text-lg'
                    }`}
                  >
                    {tutorialSteps[currentStep].meme}
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={nextStep}
                    disabled={currentStep === tutorialSteps.length - 1}
                    className={`w-full text-lg py-6 ${
                      crazyMode
                        ? 'animate-rainbow-bg'
                        : `bg-gradient-to-r ${tutorialSteps[currentStep].gradient}`
                    } text-white font-bold transform transition-all duration-300 hover:scale-105 ${
                      memeMode ? 'animate-bounce' : ''
                    }`}
                  >
                    {currentStep === tutorialSteps.length - 1
                      ? '🎉 TUTORIAL COMPLETE! 🎉'
                      : tutorialSteps[currentStep].action}
                    {currentStep < tutorialSteps.length - 1 && (
                      <ChevronRight className='ml-2 w-6 h-6' />
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Interactive Demo Area */}
              <div className='space-y-6'>
                <h4
                  className={`text-xl font-bold mb-4 ${
                    crazyMode ? 'animate-rainbow-text' : 'text-white'
                  }`}
                >
                  Your Progress Dashboard
                </h4>
                {/* Demo Wallet */}
                <div
                  className={`p-6 rounded-2xl ${
                    crazyMode
                      ? 'animate-border-glow'
                      : 'bg-gray-900/50 border border-gray-700'
                  } backdrop-blur-lg`}
                >
                  <h3
                    className={`text-2xl font-bold mb-4 ${
                      crazyMode ? 'animate-rainbow-text' : 'text-white'
                    }`}
                  >
                    Demo Wallet 💰
                  </h3>
                  <div className='space-y-3'>
                    <div className='flex justify-between items-center'>
                      <span className='text-gray-400'>$LUNA Balance:</span>
                      <span
                        className={`font-bold text-xl ${
                          crazyMode ? 'animate-rainbow-text' : 'text-green-400'
                        }`}
                      >
                        {(currentStep + 1) * 1000} $LUNA
                      </span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-gray-400'>Staked:</span>
                      <span
                        className={`font-bold ${
                          crazyMode ? 'animate-rainbow-text' : 'text-purple-400'
                        }`}
                      >
                        {currentStep * 500} $LUNA
                      </span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-gray-400'>Rewards:</span>
                      <span
                        className={`font-bold ${
                          crazyMode ? 'animate-rainbow-text' : 'text-yellow-400'
                        }`}
                      >
                        {currentStep * 42} $LUNA
                      </span>
                    </div>
                  </div>
                </div>

                {/* Achievement Badges */}
                <div
                  className={`p-6 rounded-2xl ${
                    crazyMode
                      ? 'animate-border-glow'
                      : 'bg-gray-900/50 border border-gray-700'
                  } backdrop-blur-lg`}
                >
                  <h3
                    className={`text-2xl font-bold mb-4 ${
                      crazyMode ? 'animate-rainbow-text' : 'text-white'
                    }`}
                  >
                    Achievements 🏆
                  </h3>
                  <div className='grid grid-cols-3 gap-3'>
                    {[
                      {
                        icon: <Target className='w-6 h-6' />,
                        name: 'First Steps',
                        unlocked: currentStep >= 0,
                      },
                      {
                        icon: <Zap className='w-6 h-6' />,
                        name: 'Connected',
                        unlocked: currentStep >= 1,
                      },
                      {
                        icon: <Star className='w-6 h-6' />,
                        name: 'Hodler',
                        unlocked: currentStep >= 2,
                      },
                      {
                        icon: <Trophy className='w-6 h-6' />,
                        name: 'Staker',
                        unlocked: currentStep >= 3,
                      },
                      {
                        icon: <Brain className='w-6 h-6' />,
                        name: 'Voter',
                        unlocked: currentStep >= 4,
                      },
                      {
                        icon: <Heart className='w-6 h-6' />,
                        name: 'Legend',
                        unlocked: currentStep >= 5,
                      },
                    ].map((achievement, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg text-center transition-all duration-300 ${
                          achievement.unlocked
                            ? crazyMode
                              ? 'animate-rainbow-bg text-white'
                              : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                            : 'bg-gray-800 text-gray-500'
                        } ${
                          achievement.unlocked && memeMode
                            ? 'animate-bounce'
                            : ''
                        }`}
                      >
                        <div
                          className={`mb-1 ${
                            achievement.unlocked ? 'animate-pulse' : ''
                          }`}
                        >
                          {achievement.icon}
                        </div>
                        <div className='text-xs font-bold'>
                          {achievement.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fun Stats */}
                <div
                  className={`p-6 rounded-2xl ${
                    crazyMode
                      ? 'animate-border-glow'
                      : 'bg-gray-900/50 border border-gray-700'
                  } backdrop-blur-lg`}
                >
                  <h3
                    className={`text-2xl font-bold mb-4 ${
                      crazyMode ? 'animate-rainbow-text' : 'text-white'
                    }`}
                  >
                    Your Stats 📊
                  </h3>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='text-center'>
                      <div
                        className={`text-3xl font-black ${
                          crazyMode ? 'animate-rainbow-text' : 'text-purple-400'
                        }`}
                      >
                        {score}
                      </div>
                      <div className='text-sm text-gray-400'>Score</div>
                    </div>
                    <div className='text-center'>
                      <div
                        className={`text-3xl font-black ${
                          crazyMode ? 'animate-rainbow-text' : 'text-green-400'
                        }`}
                      >
                        {completedSteps.length}
                      </div>
                      <div className='text-sm text-gray-400'>Completed</div>
                    </div>
                    <div className='text-center'>
                      <div
                        className={`text-3xl font-black ${
                          crazyMode ? 'animate-rainbow-text' : 'text-yellow-400'
                        }`}
                      >
                        {currentStep + 1}
                      </div>
                      <div className='text-sm text-gray-400'>Current</div>
                    </div>
                    <div className='text-center'>
                      <div
                        className={`text-3xl font-black ${
                          crazyMode ? 'animate-rainbow-text' : 'text-pink-400'
                        }`}
                      >
                        {Math.round(
                          ((currentStep + 1) / tutorialSteps.length) * 100
                        )}
                        %
                      </div>
                      <div className='text-sm text-gray-400'>Progress</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation Controls */}
          <section className='flex justify-between items-center mt-12 border-t border-gray-800 pt-8'>
            <Button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`${
                crazyMode
                  ? 'animate-rainbow-border'
                  : 'bg-gray-800 hover:bg-gray-700'
              } text-white px-8 py-4 text-lg`}
            >
              <ArrowLeft className='mr-2 w-6 h-6' />
              Previous
            </Button>

            <div className='flex space-x-4'>
              <Button
                onClick={resetTutorial}
                className='bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-4'
              >
                <RotateCcw className='mr-2 w-5 h-5' />
                Restart
              </Button>

              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-4'
              >
                {isPlaying ? (
                  <Pause className='mr-2 w-5 h-5' />
                ) : (
                  <Play className='mr-2 w-5 h-5' />
                )}
                {isPlaying ? 'Pause' : 'Auto'}
              </Button>
            </div>

            <Button
              onClick={nextStep}
              disabled={currentStep === tutorialSteps.length - 1}
              className={`${
                crazyMode
                  ? 'animate-rainbow-bg'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
              } text-white px-8 py-4 text-lg`}
            >
              Next
              <ArrowRight className='ml-2 w-6 h-6' />
            </Button>
          </section>
        </div>
      </main>

      {/* Floating Action Buttons */}
      <div className='fixed bottom-8 right-8 z-30 space-y-4'>
        <Button
          onClick={() =>
            createExplosion(
              Math.random() * window.innerWidth,
              Math.random() * window.innerHeight
            )
          }
          className={`w-16 h-16 rounded-full ${
            crazyMode
              ? 'animate-rainbow-bg'
              : 'bg-gradient-to-r from-yellow-500 to-orange-500'
          } text-white shadow-2xl hover:scale-110 transition-transform`}
        >
          <Sparkles className='w-8 h-8' />
        </Button>

        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className='w-16 h-16 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-2xl hover:scale-110 transition-transform'
        >
          <Lightbulb className='w-8 h-8' />
        </Button>
      </div>

      {/* Completion Modal */}
      {showCompletionModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
          <div
            className='absolute inset-0 bg-black/70 backdrop-blur-sm'
            onClick={() => setShowCompletionModal(false)}
          />

          <div
            className={`relative ${
              crazyMode
                ? 'animate-border-glow'
                : 'bg-gradient-to-br from-purple-900 to-pink-900 border-2 border-purple-500'
            } rounded-3xl p-8 max-w-lg w-full text-center transform transition-all duration-500 animate-bounce-slow`}
          >
            <Button
              onClick={() => setShowCompletionModal(false)}
              variant='ghost'
              className='absolute top-4 right-4 text-gray-400 hover:text-white'
            >
              <X className='w-6 h-6' />
            </Button>

            <div className='flex justify-center mb-6'>
              <div
                className={`p-4 rounded-full ${
                  crazyMode
                    ? 'animate-rainbow-bg'
                    : 'bg-gradient-to-r from-yellow-500 to-red-500'
                }`}
              >
                <PartyPopper className='w-12 h-12 animate-bounce' />
              </div>
            </div>

            <h2
              className={`text-4xl font-bold mb-4 ${
                crazyMode ? 'animate-rainbow-text' : 'text-white'
              }`}
            >
              CONGRATULATIONS! 🎉
            </h2>

            <div className='mb-6'>
              <Confetti className='w-8 h-8 inline-block text-yellow-400 animate-spin-slow' />
              <span className='text-2xl font-bold text-yellow-400 mx-2'>
                +1000 BONUS POINTS!
              </span>
              <Confetti className='w-8 h-8 inline-block text-yellow-400 animate-spin-reverse' />
            </div>

            <p className='text-xl text-gray-300 mb-8'>
              You've completed the LoonaHash tutorial and are now officially a
              crypto wizard! Your final score:{' '}
              <span
                className={`font-bold ${
                  crazyMode ? 'animate-rainbow-text' : 'text-purple-400'
                }`}
              >
                {score + 1000}
              </span>
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link href='/'>
                <Button
                  className={`${
                    crazyMode
                      ? 'animate-rainbow-bg'
                      : 'bg-gradient-to-r from-green-600 to-emerald-600'
                  } text-white px-8 py-4 text-lg`}
                >
                  <Rocket className='mr-2 w-6 h-6' />
                  Launch App
                </Button>
              </Link>
              <Button
                onClick={resetTutorial}
                className='bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg'
              >
                <RotateCcw className='mr-2 w-6 h-6' />
                Do It Again!
              </Button>
            </div>

            {/* Floating confetti */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className='absolute w-2 h-2 rounded-full animate-float-confetti'
                style={{
                  backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
