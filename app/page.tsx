"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ArrowRight,
  Zap,
  Shield,
  Rocket,
  Star,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  SpaceIcon as Alien,
  Dog,
  Cat,
  Coffee,
  Pizza,
  Laugh,
} from "lucide-react"

export default function LoonaHashLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [rainbowMode, setRainbowMode] = useState(false)
  const [memeIndex, setMemeIndex] = useState(0)
  const [showAstronaut, setShowAstronaut] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  const memes = [
    "TO THE MOON! 🚀",
    "HODL! 💎🙌",
    "This is the way.",
    "Such wow. Very crypto.",
    "wen lambo?",
    "Not financial advice!",
    "Sir, this is a Wendy's",
    "Stonks only go up!",
    "1 LOONA = 1 LOONA",
  ]

  // Canvas animation for confetti/particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      shape: string
    }[] = []

    const colors = ["#FF3366", "#36FF33", "#3366FF", "#FFFF33", "#33FFFF", "#FF33FF", "#FF6633", "#33FF66"]

    const shapes = ["circle", "square", "triangle", "star"]

    // Create initial particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 10 + 5,
        speedX: (Math.random() - 0.5) * 3,
        speedY: (Math.random() - 0.5) * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      })
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        ctx.fillStyle = p.color
        ctx.beginPath()

        switch (p.shape) {
          case "circle":
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
            break
          case "square":
            ctx.rect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size)
            break
          case "triangle":
            ctx.moveTo(p.x, p.y - p.size / 2)
            ctx.lineTo(p.x - p.size / 2, p.y + p.size / 2)
            ctx.lineTo(p.x + p.size / 2, p.y + p.size / 2)
            break
          case "star":
            for (let i = 0; i < 5; i++) {
              const angle = (i * Math.PI * 2) / 5 - Math.PI / 2
              const outerRadius = p.size
              const innerRadius = p.size / 2

              const x1 = p.x + Math.cos(angle) * outerRadius
              const y1 = p.y + Math.sin(angle) * outerRadius

              const nextAngle = angle + Math.PI / 5
              const x2 = p.x + Math.cos(nextAngle) * innerRadius
              const y2 = p.y + Math.sin(nextAngle) * innerRadius

              if (i === 0) {
                ctx.moveTo(x1, y1)
              } else {
                ctx.lineTo(x1, y1)
              }
              ctx.lineTo(x2, y2)
            }
            break
        }

        ctx.closePath()
        ctx.fill()

        // Update position
        p.x += p.speedX
        p.y += p.speedY

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1
      })

      animationRef.current = requestAnimationFrame(drawParticles)
    }

    drawParticles()

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    // Randomly show astronaut
    const astronautInterval = setInterval(() => {
      setShowAstronaut((prev) => !prev)
    }, 15000)

    // Cycle through memes
    const memeInterval = setInterval(() => {
      setMemeIndex((prev) => (prev + 1) % memes.length)
    }, 5000)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      clearInterval(astronautInterval)
      clearInterval(memeInterval)
    }
  }, [memes.length])

  const handleCrazyClick = () => {
    setClickCount((prev) => prev + 1)
    setRainbowMode((prev) => !prev)

    // Create explosion effect
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (ctx) {
        for (let i = 0; i < 50; i++) {
          const angle = Math.random() * Math.PI * 2
          const distance = Math.random() * 100
          const x = mousePosition.x + Math.cos(angle) * distance
          const y = mousePosition.y + Math.sin(angle) * distance

          ctx.beginPath()
          ctx.arc(x, y, Math.random() * 10 + 5, 0, Math.PI * 2)
          ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`
          ctx.fill()
        }
      }
    }
  }

  return (
    <div
      className={`min-h-screen text-white overflow-hidden relative ${rainbowMode ? "animate-rainbow-bg" : "bg-black"}`}
    >
      {/* Canvas for particles */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-40 pointer-events-none" />

      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div
          className={`absolute inset-0 ${rainbowMode ? "bg-gradient-to-br from-red-500/20 via-yellow-500/20 via-green-500/20 via-blue-500/20 to-purple-500/20 animate-gradient-x" : "bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20"}`}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.3) 0%, transparent 50%)`,
          }}
        />

        {/* Floating particles */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Astronaut */}
      {showAstronaut && (
        <div
          className="fixed z-20 w-32 h-32 animate-float-astronaut pointer-events-none"
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
          }}
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-white rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute inset-2 bg-gray-800 rounded-full flex items-center justify-center">
              <Alien className="w-16 h-16 text-cyan-400" />
            </div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-cyan-400 whitespace-nowrap font-bold">
              TO THE MOON!
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="relative z-50 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div
            className={`text-2xl font-bold ${rainbowMode ? "animate-rainbow-text" : "bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"}`}
            onClick={handleCrazyClick}
          >
            LoonaHash
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="hover:text-purple-400 transition-colors">
              Features
            </a>
            <a href="#about" className="hover:text-purple-400 transition-colors">
              About
            </a>
            <a href="#memes" className="hover:text-purple-400 transition-colors">
              Memes
            </a>
            <a href="#tokenomics" className="hover:text-purple-400 transition-colors">
              Tokenomics
            </a>
            <a href="#roadmap" className="hover:text-purple-400 transition-colors">
              Roadmap
            </a>
            <a href="#contact" className="hover:text-purple-400 transition-colors">
              Contact
            </a>
            <Button
              className={`${rainbowMode ? "animate-rainbow-border" : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"} border-0`}
              onClick={() => setRainbowMode(!rainbowMode)}
            >
              {rainbowMode ? "Normal Mode" : "Party Mode"} <Sparkles className="ml-2" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-lg p-6 z-50">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="hover:text-purple-400 transition-colors">
                Features
              </a>
              <a href="#about" className="hover:text-purple-400 transition-colors">
                About
              </a>
              <a href="#memes" className="hover:text-purple-400 transition-colors">
                Memes
              </a>
              <a href="#tokenomics" className="hover:text-purple-400 transition-colors">
                Tokenomics
              </a>
              <a href="#roadmap" className="hover:text-purple-400 transition-colors">
                Roadmap
              </a>
              <a href="#contact" className="hover:text-purple-400 transition-colors">
                Contact
              </a>
              <Button
                className={`${rainbowMode ? "animate-rainbow-border" : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"} border-0`}
                onClick={() => setRainbowMode(!rainbowMode)}
              >
                {rainbowMode ? "Normal Mode" : "Party Mode"} <Sparkles className="ml-2" />
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div
            className="transform transition-transform duration-1000"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-none">
              <span
                className={`${rainbowMode ? "animate-rainbow-text" : "bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse"}`}
              >
                LOONA
              </span>
              <br />
              <span
                className={`${rainbowMode ? "animate-rainbow-text-reverse" : "bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent"}`}
              >
                HASH
              </span>
            </h1>

            <div className="relative mb-12">
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                Revolutionary blockchain technology that breaks all boundaries. Experience the future of decentralized
                applications.
              </p>

              {/* Floating meme text */}
              <div className="absolute -top-4 right-0 transform rotate-12 bg-yellow-400 text-black px-3 py-1 rounded-lg font-bold text-sm animate-bounce-slow">
                {memes[memeIndex]}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button
                size="lg"
                className={`${rainbowMode ? "animate-rainbow-bg" : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"} border-0 text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-purple-500/25`}
              >
                Launch App <Rocket className="ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={`${rainbowMode ? "animate-rainbow-border text-white" : "border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black"} text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300`}
              >
                Watch Demo <ArrowRight className="ml-2" />
              </Button>
            </div>

            {/* Scroll Indicator */}
            <div className="animate-bounce">
              <ChevronDown className="w-8 h-8 mx-auto text-purple-400" />
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {/* Crazy rotating elements */}
        <div className="absolute top-1/3 right-1/4 animate-spin-slow">
          <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-teal-500 rounded-full opacity-70 flex items-center justify-center">
            <Pizza className="w-12 h-12 text-white" />
          </div>
        </div>

        <div className="absolute bottom-1/3 left-1/4 animate-spin-reverse">
          <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full opacity-70 flex items-center justify-center">
            <Coffee className="w-10 h-10 text-white" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2
            className={`text-5xl md:text-7xl font-black text-center mb-20 ${rainbowMode ? "animate-rainbow-text" : "bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"}`}
          >
            INSANE FEATURES
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-12 h-12" />,
                title: "Lightning Fast",
                description: "Process millions of transactions per second with our quantum-enhanced blockchain",
                gradient: "from-yellow-400 to-orange-500",
                animation: "animate-pulse",
              },
              {
                icon: <Shield className="w-12 h-12" />,
                title: "Ultra Secure",
                description: "Military-grade encryption with AI-powered threat detection and prevention",
                gradient: "from-blue-400 to-purple-500",
                animation: "animate-bounce-slow",
              },
              {
                icon: <Star className="w-12 h-12" />,
                title: "Next-Gen UI",
                description: "Revolutionary interface that adapts to your thoughts and predicts your needs",
                gradient: "from-pink-400 to-red-500",
                animation: "animate-spin-slow",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`group relative p-8 rounded-3xl ${rainbowMode ? "animate-border-glow" : "bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-lg border border-gray-700/50 hover:border-purple-500/50"} transition-all duration-500 transform hover:scale-105 hover:-translate-y-2`}
              >
                <div
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 ${rainbowMode ? feature.animation : "group-hover:animate-spin"}`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{feature.description}</p>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meme Section */}
      <section id="memes" className="relative z-10 py-32 px-6 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="max-w-7xl mx-auto">
          <h2
            className={`text-5xl md:text-7xl font-black text-center mb-20 ${rainbowMode ? "animate-rainbow-text" : "bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"}`}
          >
            MEME ZONE
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Rocket className="w-12 h-12" />, text: "TO THE MOON!" },
              { icon: <Dog className="w-12 h-12" />, text: "Such WOW" },
              { icon: <Laugh className="w-12 h-12" />, text: "NGMI" },
              { icon: <Cat className="w-12 h-12" />, text: "Wen Lambo?" },
            ].map((meme, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl ${rainbowMode ? "animate-border-glow" : "bg-gray-800/50 hover:bg-gray-700/50"} text-center transform transition-all duration-300 hover:scale-110 hover:rotate-3 cursor-pointer`}
                onClick={handleCrazyClick}
              >
                <div
                  className={`mx-auto mb-4 w-20 h-20 rounded-full flex items-center justify-center ${rainbowMode ? "animate-rainbow-bg" : "bg-gradient-to-r from-purple-500 to-pink-500"}`}
                >
                  {meme.icon}
                </div>
                <p className="font-bold text-lg">{meme.text}</p>
              </div>
            ))}
          </div>

          {/* Crazy counter */}
          <div className="mt-16 text-center">
            <p className="text-xl mb-4">
              Click counter:{" "}
              <span className={`font-bold ${rainbowMode ? "animate-rainbow-text" : "text-purple-400"}`}>
                {clickCount}
              </span>
            </p>
            <Button
              onClick={handleCrazyClick}
              className={`${rainbowMode ? "animate-rainbow-bg" : "bg-gradient-to-r from-green-500 to-blue-500"} text-white font-bold py-2 px-6 rounded-full transform transition-all duration-300 hover:scale-110`}
            >
              Click for Chaos!
            </Button>

            {clickCount > 10 && (
              <div className="mt-4 animate-bounce">
                <p className="text-yellow-400 font-bold">YOU'RE CRAZY! 🤪</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section id="tokenomics" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2
            className={`text-5xl md:text-7xl font-black text-center mb-20 ${rainbowMode ? "animate-rainbow-text" : "bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent"}`}
          >
            $LUNA TOKENOMICS
          </h2>

          {/* Token Stats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                title: "Total Supply",
                value: "1,000,000,000",
                suffix: "$LUNA",
                gradient: "from-purple-500 to-pink-500",
                icon: <Star className="w-8 h-8" />,
              },
              {
                title: "Circulating",
                value: "420,690,000",
                suffix: "$LUNA",
                gradient: "from-blue-500 to-cyan-500",
                icon: <Zap className="w-8 h-8" />,
              },
              {
                title: "Market Cap",
                value: "$69,420,000",
                suffix: "USD",
                gradient: "from-green-500 to-emerald-500",
                icon: <Rocket className="w-8 h-8" />,
              },
              {
                title: "Holders",
                value: "42,069",
                suffix: "Addresses",
                gradient: "from-orange-500 to-red-500",
                icon: <Shield className="w-8 h-8" />,
              },
            ].map((stat, index) => (
              <div
                key={index}
                className={`group relative p-6 rounded-2xl ${rainbowMode ? "animate-border-glow" : "bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-lg border border-gray-700/50 hover:border-purple-500/50"} transition-all duration-500 transform hover:scale-105 hover:-translate-y-2`}
              >
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.gradient} mb-4 group-hover:animate-spin`}
                >
                  {stat.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-400">{stat.title}</h3>
                <p className={`text-2xl font-black ${rainbowMode ? "animate-rainbow-text" : "text-white"} mb-1`}>
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500">{stat.suffix}</p>
              </div>
            ))}
          </div>

          {/* Token Distribution */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3
                className={`text-3xl md:text-4xl font-bold mb-8 ${rainbowMode ? "animate-rainbow-text" : "bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"}`}
              >
                Token Distribution
              </h3>

              <div className="space-y-6">
                {[
                  { label: "Community & Rewards", percentage: 40, color: "bg-purple-500", amount: "400M $LUNA" },
                  { label: "Liquidity Pool", percentage: 25, color: "bg-blue-500", amount: "250M $LUNA" },
                  { label: "Development", percentage: 15, color: "bg-green-500", amount: "150M $LUNA" },
                  { label: "Marketing", percentage: 10, color: "bg-yellow-500", amount: "100M $LUNA" },
                  { label: "Team (Locked)", percentage: 10, color: "bg-red-500", amount: "100M $LUNA" },
                ].map((item, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-semibold">{item.label}</span>
                      <span className="text-gray-400">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full ${item.color} transition-all duration-1000 ease-out group-hover:animate-pulse`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{item.amount}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              {/* Animated Pie Chart Representation */}
              <div className="relative w-80 h-80 mx-auto">
                <div
                  className={`absolute inset-0 rounded-full ${rainbowMode ? "animate-rainbow-bg" : "bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"} animate-spin-slow opacity-80`}
                />
                <div className="absolute inset-4 bg-black rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className={`text-4xl font-black ${rainbowMode ? "animate-rainbow-text" : "text-white"}`}>
                      $LUNA
                    </div>
                    <div className="text-gray-400">Token</div>
                  </div>
                </div>

                {/* Floating elements around the circle */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-4 h-4 bg-yellow-400 rounded-full animate-pulse"
                    style={{
                      top: `${50 + 45 * Math.sin((i * Math.PI * 2) / 8)}%`,
                      left: `${50 + 45 * Math.cos((i * Math.PI * 2) / 8)}%`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Token Utility */}
          <div className="mt-20">
            <h3
              className={`text-3xl md:text-4xl font-bold text-center mb-12 ${rainbowMode ? "animate-rainbow-text" : "bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"}`}
            >
              Token Utility
            </h3>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Staking Rewards",
                  description: "Earn up to 420% APY by staking your $LUNA tokens",
                  icon: <Star className="w-8 h-8" />,
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  title: "Governance",
                  description: "Vote on protocol upgrades and community proposals",
                  icon: <Shield className="w-8 h-8" />,
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  title: "Fee Discounts",
                  description: "Get 69% discount on all platform fees",
                  icon: <Zap className="w-8 h-8" />,
                  gradient: "from-green-500 to-emerald-500",
                },
              ].map((utility, index) => (
                <div
                  key={index}
                  className={`group p-6 rounded-2xl ${rainbowMode ? "animate-border-glow" : "bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-lg border border-gray-700/50 hover:border-purple-500/50"} transition-all duration-500 transform hover:scale-105`}
                >
                  <div
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${utility.gradient} mb-4 group-hover:animate-bounce`}
                  >
                    {utility.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-white">{utility.title}</h4>
                  <p className="text-gray-400">{utility.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="relative z-10 py-32 px-6 bg-gradient-to-r from-indigo-900/20 to-purple-900/20">
        <div className="max-w-7xl mx-auto">
          <h2
            className={`text-5xl md:text-7xl font-black text-center mb-20 ${rainbowMode ? "animate-rainbow-text" : "bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"}`}
          >
            ROADMAP TO THE MOON
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div
              className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${rainbowMode ? "bg-gradient-to-b from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500" : "bg-gradient-to-b from-purple-500 to-pink-500"} rounded-full`}
            />

            <div className="space-y-16">
              {[
                {
                  phase: "Phase 1",
                  title: "LAUNCH & IGNITION 🚀",
                  quarter: "Q1 2024",
                  status: "COMPLETED",
                  items: [
                    "Token Launch on DEX",
                    "Community Building (42K+ Members)",
                    "Initial Liquidity Pool",
                    "Meme Contest Winners",
                    "First 1000 Holders Milestone",
                  ],
                  gradient: "from-green-500 to-emerald-500",
                  position: "left",
                },
                {
                  phase: "Phase 2",
                  title: "ECOSYSTEM EXPANSION 🌟",
                  quarter: "Q2 2024",
                  status: "IN PROGRESS",
                  items: [
                    "CEX Listings (Binance, Coinbase)",
                    "Staking Platform Launch",
                    "NFT Collection Drop",
                    "Partnership with Major DeFi Protocols",
                    "Mobile App Beta Release",
                  ],
                  gradient: "from-blue-500 to-cyan-500",
                  position: "right",
                },
                {
                  phase: "Phase 3",
                  title: "DEFI DOMINATION 💎",
                  quarter: "Q3 2024",
                  status: "UPCOMING",
                  items: [
                    "Cross-Chain Bridge Implementation",
                    "Yield Farming Pools",
                    "DAO Governance Launch",
                    "Metaverse Integration",
                    "100K Holders Celebration",
                  ],
                  gradient: "from-purple-500 to-pink-500",
                  position: "left",
                },
                {
                  phase: "Phase 4",
                  title: "GALACTIC CONQUEST 🌌",
                  quarter: "Q4 2024",
                  status: "FUTURE",
                  items: [
                    "Layer 2 Solution Launch",
                    "AI Trading Bot Integration",
                    "Real-World Asset Tokenization",
                    "Space Tourism Partnership",
                    "1M Holders Moon Party",
                  ],
                  gradient: "from-orange-500 to-red-500",
                  position: "right",
                },
              ].map((phase, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${phase.position === "left" ? "justify-start" : "justify-end"}`}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 ${rainbowMode ? "animate-rainbow-bg" : `bg-gradient-to-r ${phase.gradient}`} rounded-full border-4 border-black z-10 animate-pulse`}
                  />

                  <div className={`w-5/12 ${phase.position === "left" ? "pr-8" : "pl-8"}`}>
                    <div
                      className={`group relative p-8 rounded-3xl ${rainbowMode ? "animate-border-glow" : "bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-lg border border-gray-700/50 hover:border-purple-500/50"} transition-all duration-500 transform hover:scale-105`}
                    >
                      {/* Status badge */}
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold mb-4 ${
                          phase.status === "COMPLETED"
                            ? "bg-green-500 text-white"
                            : phase.status === "IN PROGRESS"
                              ? "bg-yellow-500 text-black"
                              : phase.status === "UPCOMING"
                                ? "bg-blue-500 text-white"
                                : "bg-purple-500 text-white"
                        } ${rainbowMode ? "animate-pulse" : ""}`}
                      >
                        {phase.status}
                      </div>

                      <div
                        className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${phase.gradient} mb-4 group-hover:animate-spin`}
                      >
                        <Rocket className="w-6 h-6" />
                      </div>

                      <h3 className={`text-2xl font-bold mb-2 ${rainbowMode ? "animate-rainbow-text" : "text-white"}`}>
                        {phase.phase}
                      </h3>
                      <h4 className="text-xl font-semibold mb-2 text-purple-400">{phase.title}</h4>
                      <p className="text-gray-400 mb-4 font-semibold">{phase.quarter}</p>

                      <ul className="space-y-2">
                        {phase.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-center text-gray-300">
                            <div
                              className={`w-2 h-2 bg-gradient-to-r ${phase.gradient} rounded-full mr-3 animate-pulse`}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>

                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to action */}
          <div className="mt-20 text-center">
            <div
              className={`inline-block p-8 rounded-3xl ${rainbowMode ? "animate-border-glow" : "bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-lg border border-gray-700/50"}`}
            >
              <h3 className={`text-3xl font-bold mb-4 ${rainbowMode ? "animate-rainbow-text" : "text-white"}`}>
                Ready for Liftoff? 🚀
              </h3>
              <p className="text-gray-400 mb-6 max-w-2xl">
                Join thousands of space cadets on this incredible journey to the moon and beyond!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className={`${rainbowMode ? "animate-rainbow-bg" : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"} border-0 text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300`}
                >
                  Buy $LUNA Now <Rocket className="ml-2" />
                </Button>
                <Button
                  variant="outline"
                  className={`${rainbowMode ? "animate-rainbow-border text-white" : "border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black"} text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300`}
                >
                  Join Community <Star className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-32 px-6 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "1M+", label: "Active Users" },
              { number: "$50B+", label: "Volume Traded" },
              { number: "99.9%", label: "Uptime" },
              { number: "200+", label: "Countries" },
            ].map((stat, index) => (
              <div key={index} className="group">
                <div
                  className={`text-5xl md:text-6xl font-black ${rainbowMode ? "animate-rainbow-text" : "bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"} mb-4 group-hover:animate-pulse`}
                >
                  {stat.number}
                </div>
                <div className="text-xl text-gray-400 group-hover:text-white transition-colors">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className={`text-5xl md:text-7xl font-black mb-8 ${rainbowMode ? "animate-rainbow-text" : "bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"}`}
          >
            JOIN THE REVOLUTION
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-gray-300">
            Be part of the most groundbreaking blockchain ecosystem ever created
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-12">
            <Input
              placeholder="Enter your email"
              className={`${rainbowMode ? "animate-border-glow" : "bg-gray-900/50 border-gray-700"} text-white placeholder-gray-400 focus:border-purple-500`}
            />
            <Button
              className={`${rainbowMode ? "animate-rainbow-bg" : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"} border-0 whitespace-nowrap`}
            >
              Get Early Access
            </Button>
          </div>

          <div className="text-sm text-gray-500">Join 100,000+ early adopters already on the waitlist</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div
              className={`text-2xl font-bold ${rainbowMode ? "animate-rainbow-text" : "bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"} mb-4 md:mb-0`}
            >
              LoonaHash
            </div>
            <div className="flex space-x-8 text-gray-400">
              <a href="#" className="hover:text-purple-400 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors">
                Support
              </a>
            </div>
          </div>
          <div className="text-center text-gray-500 mt-8">
            © 2024 LoonaHash. All rights reserved. Built for the future.
          </div>
        </div>
      </footer>
    </div>
  )
}
