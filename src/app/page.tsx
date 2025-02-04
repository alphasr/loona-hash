"use client";

import { useState } from "react";
import SplineBackground from "./component/spline/spline";
import Gameplay from "./component/gameplay/gameplay";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

  const sections = [
    { id: "home", label: "HOME" },
    { id: "gameplay", label: "GAMEPLAY" },
    { id: "rewards", label: "REWARDS" },
    { id: "stats", label: "STATS" },
    { id: "team", label: "TEAM" },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return (
          <>
            <h1 className="title">#LOONAHASH</h1>
            <p className="description">Mining Simulation Game</p>
          </>
        );

      case "gameplay":
        return <Gameplay />;

      case "rewards":
        return (
          <>
            <h1 className="title">REWARDS</h1>
            <p className="description">
              Be the first to find the perfect hash.
              <br />
              Claim your rewards instantly.
            </p>
          </>
        );

      case "stats":
        return (
          <>
            <h1 className="title">STATS</h1>
            <p className="description">
              Track your progress and network growth
            </p>
            <div className="stats-container">
              <StatCard value="1.8M+" label="Monthly Active Users" />
              <StatCard value="1M+" label="Community Members" />
              <StatCard value="520K+" label="Token Holders" />
            </div>
          </>
        );

      case "team":
        return (
          <>
            <h1 className="title">THE TEAM</h1>
            <p className="description">14 Visionaries</p>
            <div className="stats-container">
              <StatCard value="3" label="Core Developers" />
              <StatCard value="6" label="Product Designers" />
              <StatCard value="5" label="Growth Specialists" />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="page-wrapper">
      <SplineBackground />
      <div className="content-wrapper">
        {/* Navigation */}
        <nav className="nav">
          <div className="nav-content">
            <ul className="nav-list">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => setActiveSection(section.id)}
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
          <section className={`hero-section ${activeSection}`}>
            <div className="hero-content">{renderContent()}</div>
          </section>
        </main>
      </div>

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
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="stat-card">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
