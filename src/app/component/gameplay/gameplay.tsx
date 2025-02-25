"use client";
import React, { useState, useEffect } from "react";
import "./gameplay.scss";

const Gameplay: React.FC = () => {
  const [animateIn, setAnimateIn] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  // Animation on mount
  useEffect(() => {
    setAnimateIn(true);
  }, []);

  // Tab data configuration for different gameplay modes
  const tabData = {
    basic: {
      title: "Basic Mode",
      description:
        "Perfect for beginners. Start with minimal complexity and learn the basics.",
      rewards: "Earn up to 50 points per day",
    },
    advanced: {
      title: "Advanced Mode",
      description:
        "For experienced players who are ready for more complex gameplay.",
      rewards: "Earn up to 120 points per day",
    },
    expert: {
      title: "Expert Mode",
      description:
        "Maximum challenge with the highest rewards. Not for the faint of heart.",
      rewards: "Earn up to 200 points per day",
    },
  };

  return (
    <div className={`gameplay-page ${animateIn ? "animate-in" : ""} `}>
      <div className="content-wrapper">
        {/* Header Section */}
        <header className="gameplay-header">
          <div className="header-content">
            <div className="text-content">
              <h1 className="title">GAMEPLAY</h1>
              <p className="description">
                One button. Infinite possibilities. Watch your device work
                tirelessly to find that winning hash, activating a seamless
                mining adventure in the background.
              </p>
            </div>

            <div className="mode-display">
              <span className="mode-value">
                {tabData[activeTab as keyof typeof tabData].title}
              </span>
              <span className="mode-label">CURRENT MODE</span>
            </div>
          </div>

          {/* Mode Selection */}
          <div className="mode-selection">
            <div className="progress-container">
              <div className="progress-label">
                <span>
                  {tabData[activeTab as keyof typeof tabData].rewards}
                </span>
                <span>
                  Difficulty:{" "}
                  {activeTab === "basic"
                    ? "Low"
                    : activeTab === "advanced"
                    ? "Medium"
                    : "High"}
                </span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width:
                      activeTab === "basic"
                        ? "33%"
                        : activeTab === "advanced"
                        ? "66%"
                        : "100%",
                    background:
                      activeTab === "basic"
                        ? "linear-gradient(90deg, #9061f9 0%, #a855f7 100%)"
                        : activeTab === "advanced"
                        ? "linear-gradient(90deg, #a855f7 0%, #d946ef 100%)"
                        : "linear-gradient(90deg, #d946ef 0%, #ec4899 100%)",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </header>

        {/* Game Mode Navigation */}
        <nav className="gameplay-nav">
          <ul>
            <li className={activeTab === "basic" ? "active" : ""}>
              <button onClick={() => setActiveTab("basic")}>Basic Mode</button>
            </li>
            <li className={activeTab === "advanced" ? "active" : ""}>
              <button onClick={() => setActiveTab("advanced")}>
                Advanced Mode
              </button>
            </li>
            <li className={activeTab === "expert" ? "active" : ""}>
              <button onClick={() => setActiveTab("expert")}>
                Expert Mode
              </button>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="gameplay-main">
          <div className="gameplay-container">
            <div className="gameplay-card">
              <h3 className="gameplay-card-title">
                {tabData[activeTab as keyof typeof tabData].title}
              </h3>
              <p className="gameplay-card-description">
                {tabData[activeTab as keyof typeof tabData].description}
              </p>
              <button className="cta-button">Start Mining</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Gameplay;
