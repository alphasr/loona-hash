"use client";

import { useState, useEffect } from "react";
import SplineBackground from "./component/spline/spline";
import Gameplay from "./component/gameplay/gameplay";

const sections = [
  { id: "home", label: "HOME" },
  { id: "gameplay", label: "GAMEPLAY" },
  { id: "rewards", label: "REWARDS" },
  { id: "stats", label: "STATS" },
  { id: "team", label: "TEAM" },
] as const;

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

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

  return (
    <div className="page-wrapper">
      {/* Gradient Overlay */}
      <div className="gradient-overlay" />

      <SplineBackground />

      <div className="content-wrapper">
        {/* Navigation */}
        <nav className="nav">
          <div className="nav-content">
            <ul className="nav-list">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => {
                      document
                        .getElementById(section.id)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`nav-button ${
                      activeSection === section.id ? "active" : ""
                    }`}
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="main">
          {/* Home Section */}
          <section id="home" className="hero-section">
            <div className="hero-content">
              <h1 className="title gradient-text">#LOONAHASH</h1>
              <p className="description">Mining Simulation Game</p>
            </div>
          </section>

          {/* Gameplay Section */}
          <section id="gameplay" className="hero-section">
            <div className="hero-content">
              <Gameplay />
            </div>
          </section>

          {/* Rewards Section */}
          <section id="rewards" className="hero-section">
            <div className="hero-content">
              <h1 className="title">REWARDS</h1>
              <p className="description">
                Be the first to find the perfect hash.
                <br />
                Claim your rewards instantly.
              </p>
            </div>
          </section>

          {/* Stats Section */}
          <section id="stats" className="hero-section">
            <div className="hero-content">
              <h1 className="title">STATS</h1>
              <p className="description">
                Track your progress and network growth
              </p>
              <div className="stats-container">
                <StatCard value="1.8M+" label="Monthly Active Users" />
                <StatCard value="1M+" label="Community Members" />
                <StatCard value="520K+" label="Token Holders" />
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section id="team" className="hero-section">
            <div className="hero-content">
              <h1 className="title">THE TEAM</h1>
              <p className="description">14 Visionaries</p>
              <div className="stats-container">
                <StatCard value="3" label="Core Developers" />
                <StatCard value="6" label="Product Designers" />
                <StatCard value="5" label="Growth Specialists" />
              </div>
            </div>
          </section>
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
                <a href="#" className="footer-link">
                  Twitter
                </a>
                <a href="#" className="footer-link">
                  Discord
                </a>
                <a href="#" className="footer-link">
                  Telegram
                </a>
              </div>
            </div>

            <div className="footer-section">
              <h3 className="footer-title">Resources</h3>
              <div className="footer-links">
                <a href="#" className="footer-link">
                  Documentation
                </a>
                <a href="#" className="footer-link">
                  Whitepaper
                </a>
                <a href="#" className="footer-link">
                  FAQ
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 LOONAHASH. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

// Component: StatCard
function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="stat-card">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

// Add new CSS classes for gradient overlay and text
// const additionalCSS = `
// .gradient-overlay {
//   position: fixed;
//   inset: 0;
//   background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), transparent, rgba(0, 0, 0, 0.3));
//   pointer-events: none;
//   z-index: 1;
// }

// .gradient-text {
//   background: linear-gradient(to right, var(--color-purple-primary), var(--color-text-light));
//   -webkit-background-clip: text;
//   background-clip: text;
//   color: transparent;
// }
// `;
