"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import SplineBackground from "./component/spline/spline";
import Gameplay from "./component/gameplay/gameplay";
import RewardsPage from "./component/rewards/rewardsPage"; // New Rewards component
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

// Types
type Section = {
  id: string;
  label: string;
};

type StatCardProps = {
  value: string;
  label: string;
};

const sections: Section[] = [
  { id: "home", label: "HOME" },
  { id: "gameplay", label: "GAMEPLAY" },
  { id: "rewards", label: "REWARDS" },
  { id: "stats", label: "STATS" },
  { id: "team", label: "TEAM" },
];

const socialLinks = [
  { name: "Twitter", url: "#", id: "twitter" },
  {
    name: "Instagram",
    url: "https://www.instagram.com/loonahash/",
    id: "instagram",
  },
  { name: "Telegram", url: "https://t.me/LoonaHash_bot", id: "telegram" },
];

const resourceLinks = [
  { name: "Documentation", url: "#", id: "docs" },
  { name: "Whitepaper", url: "#", id: "whitepaper" },
  { name: "FAQ", url: "#", id: "faq" },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>("home");

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

  const handleSectionClick = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
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
                <MagneticButton>
                  <a href="#home" className="logo-link">
                    <Image
                      src="/assets/logo.png"
                      alt="LoonaHash Logo"
                      width={32}
                      height={32}
                      className="logo"
                      priority
                    />
                  </a>
                </MagneticButton>
              </div>

              {/* Navigation Links */}
              <ul className="nav-list">
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
                    <p className="description">
                      Experience the next evolution in mining simulation on
                      Telegram. With LoonaHash, you can start for free and
                      unlock a suite of powerful boosts. Complete daily tasks,
                      earn valuable points, and watch your mining efforts pay
                      off.
                    </p>
                    <p className="description">
                      Our app combines a fun, competitive mining simulation with
                      quarterly reward redistribution based on leaderboard
                      performance—so every bit of effort counts.
                    </p>
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

            {/* Rewards Section using new RewardsPage component */}
            <ParallaxSection>
              <section id="rewards" className="hero-section">
                <RewardsPage />
              </section>
            </ParallaxSection>

            {/* Stats Section */}
            <ParallaxSection>
              <section id="stats" className="hero-section">
                <div className="hero-content">
                  <AnimatedText text="STATS" className="title" />
                  <FloatingElement delay={0.2}>
                    <p className="description">
                      Monitor your progress in real time—track monthly active
                      users, community growth, and token holdings. These
                      transparent metrics allow you to see how the LoonaHash
                      ecosystem is expanding, and where you stand in the
                      competitive mining landscape.
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
              <section id="team" className="hero-section team-section">
                <div className="hero-content">
                  <AnimatedText text="THE TEAM" className="title" />
                  <FloatingElement delay={0.2}>
                    <p className="description">
                      Meet the 14 visionaries behind LoonaHash—a blend of core
                      developers, product designers, and growth specialists, all
                      committed to redefining simulation mining. With years of
                      combined experience, our team is dedicated to innovation
                      and community success.
                    </p>
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
                <p>Discover the future of mining simulation with LoonaHash.</p>
              </div>

              <div className="footer-section">
                <h3 className="footer-title">Connect</h3>
                <div className="footer-links">
                  {socialLinks.map((link) => (
                    <MagneticButton key={link.id}>
                      <a
                        href={link.url}
                        className="footer-link"
                        target={
                          link.url.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          link.url.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {link.name}
                      </a>
                    </MagneticButton>
                  ))}
                </div>
              </div>

              <div className="footer-section">
                <h3 className="footer-title">Resources</h3>
                <div className="footer-links">
                  {resourceLinks.map((link) => (
                    <MagneticButton key={link.id}>
                      <a href={link.url} className="footer-link">
                        {link.name}
                      </a>
                    </MagneticButton>
                  ))}
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
function AnimatedStatCard({ value, label }: StatCardProps) {
  return (
    <Card3D>
      <div className="stat-card">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
    </Card3D>
  );
}
