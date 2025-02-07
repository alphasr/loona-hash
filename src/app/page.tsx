"use client";

import { useState, useEffect } from "react";
import SplineBackground from "./component/spline/spline";
import Gameplay from "./component/gameplay/gameplay";
import {
  ScrollProgressBar,
  ParallaxSection,
  AnimatedText,
  Card3D,
  FloatingElement,
  MagneticButton,
  PageTransition,
  LoadingSpinner,
} from "./component/animated/animations";

const sections = [
  { id: "home", label: "HOME" },
  { id: "gameplay", label: "GAMEPLAY" },
  { id: "rewards", label: "REWARDS" },
  { id: "stats", label: "STATS" },
  { id: "team", label: "TEAM" },
] as const;

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initial loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px",
        threshold: 0,
      }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Close mobile menu on section change
  const handleSectionClick = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  if (isLoading) {
    return (
      <div className="page-wrapper flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="page-wrapper">
        <ScrollProgressBar />
        <div className="gradient-overlay" />
        <SplineBackground />

        <div className="content-wrapper">
          {/* Navigation */}
          <nav className="nav">
            <div className="nav-content">
              {/* Logo Section */}
              <div className="nav-logo">
                <FloatingElement delay={0.1}>
                  <MagneticButton>
                    <a href="#home" className="logo-link">
                      <img
                        src="/assets/logo.png"
                        alt="LoonaHash Logo"
                        className="logo"
                      />
                    </a>
                  </MagneticButton>
                </FloatingElement>
              </div>

              {/* Desktop Navigation */}
              <ul className="nav-list desktop-nav">
                {sections.map((section) => (
                  <li key={section.id}>
                    <MagneticButton>
                      <span
                        onClick={() => handleSectionClick(section.id)}
                        className={`nav-button ${
                          activeSection === section.id ? "active" : ""
                        }`}
                      >
                        {section.label}
                      </span>
                    </MagneticButton>
                  </li>
                ))}
              </ul>

              {/* Mobile Menu Button */}
              <button
                className="mobile-menu-button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </button>

              {/* Mobile Navigation */}
              {isMobileMenuOpen && (
                <div className="mobile-nav">
                  <ul className="mobile-nav-list">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <MagneticButton>
                          <span
                            onClick={() => handleSectionClick(section.id)}
                            className={`nav-button ${
                              activeSection === section.id ? "active" : ""
                            }`}
                          >
                            {section.label}
                          </span>
                        </MagneticButton>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </nav>

          {/* Main Content */}
          <main className="main">
            {/* Home Section */}
            <ParallaxSection>
              <section id="home" className="hero-section">
                <div className="hero-content">
                  <AnimatedText
                    text="#LOONAHASH"
                    className="title gradient-text"
                  />
                  <FloatingElement>
                    <p className="description">Mining Simulation Game</p>
                  </FloatingElement>
                </div>
              </section>
            </ParallaxSection>

            {/* Gameplay Section */}
            <ParallaxSection>
              <section id="gameplay" className="hero-section">
                <div className="hero-content">
                  <Gameplay />
                </div>
              </section>
            </ParallaxSection>

            {/* Rewards Section */}
            <ParallaxSection>
              <section id="rewards" className="hero-section">
                <div className="hero-content">
                  <AnimatedText text="REWARDS" className="title" />
                  <FloatingElement delay={0.2}>
                    <p className="description">
                      Be the first to find the perfect hash.
                      <br />
                      Claim your rewards instantly.
                    </p>
                  </FloatingElement>
                </div>
              </section>
            </ParallaxSection>

            {/* Stats Section */}
            <ParallaxSection>
              <section id="stats" className="hero-section">
                <div className="hero-content">
                  <AnimatedText text="STATS" className="title" />
                  <FloatingElement delay={0.2}>
                    <p className="description">
                      Track your progress and network growth
                    </p>
                  </FloatingElement>
                  <div className="stats-container">
                    <AnimatedStatCard
                      value="1.8M+"
                      label="Monthly Active Users"
                    />
                    <AnimatedStatCard value="1M+" label="Community Members" />
                    <AnimatedStatCard value="520K+" label="Token Holders" />
                  </div>
                </div>
              </section>
            </ParallaxSection>

            {/* Team Section */}
            <ParallaxSection>
              <section id="team" className="hero-section">
                <div className="hero-content">
                  <AnimatedText text="THE TEAM" className="title" />
                  <FloatingElement delay={0.2}>
                    <p className="description">14 Visionaries</p>
                  </FloatingElement>
                  <div className="stats-container">
                    <AnimatedStatCard value="3" label="Core Developers" />
                    <AnimatedStatCard value="6" label="Product Designers" />
                    <AnimatedStatCard value="5" label="Growth Specialists" />
                  </div>
                </div>
              </section>
            </ParallaxSection>
          </main>

          {/* Footer */}
          <footer className="footer">
            <div className="footer-content">
              <div className="footer-section">
                <h3 className="footer-title">About</h3>
                <p>Discover the future of mining simulation</p>
              </div>

              <div className="footer-section">
                <h3 className="footer-title">Connect</h3>
                <div className="footer-links">
                  <MagneticButton>
                    <a href="#" className="footer-link">
                      Twitter
                    </a>
                  </MagneticButton>
                  <MagneticButton>
                    <a
                      href="https://www.instagram.com/loonahash/"
                      className="footer-link"
                      target="_blank"
                    >
                      Instagram
                    </a>
                  </MagneticButton>
                  <MagneticButton>
                    <a href="#" className="footer-link">
                      Telegram
                    </a>
                  </MagneticButton>
                </div>
              </div>

              <div className="footer-section">
                <h3 className="footer-title">Resources</h3>
                <div className="footer-links">
                  <MagneticButton>
                    <a href="#" className="footer-link">
                      Documentation
                    </a>
                  </MagneticButton>
                  <MagneticButton>
                    <a href="#" className="footer-link">
                      Whitepaper
                    </a>
                  </MagneticButton>
                  <MagneticButton>
                    <a href="#" className="footer-link">
                      FAQ
                    </a>
                  </MagneticButton>
                </div>
              </div>
            </div>

            <div className="footer-bottom">
              <p>&copy; 2025 LOONAHASH. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </div>
    </PageTransition>
  );
}

// Animated StatCard Component
function AnimatedStatCard({ value, label }: { value: string; label: string }) {
  return (
    <Card3D>
      <div className="stat-card">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
    </Card3D>
  );
}
