import React, { useState, useEffect } from "react";
import "./rewardsPage.scss";
import {
  LoadingSpinner,
  PageTransition,
  ScrollProgressBar,
  AnimatedText,
  FloatingElement,
} from "../animated/animations";

// New component for reward card to improve reusability
interface RewardCardProps {
  title: string;
  description: string;
  buttonText: string;
  icon: string;
}

const RewardCard: React.FC<RewardCardProps> = ({
  title,
  description,
  buttonText,
  icon,
}) => (
  <div className="reward-card">
    <div className="reward-icon">
      <i className={`icon ${icon}`}></i>
    </div>
    <h3 className="reward-title">{title}</h3>
    <p className="reward-description">{description}</p>
    <button className="cta-button">{buttonText}</button>
  </div>
);

// Progress component for visually showing user's progress
interface ProgressBarProps {
  percentage: number;
  label: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, label }) => (
  <div className="progress-container">
    <div className="progress-label">
      <span>{label}</span>
      <span>{percentage}%</span>
    </div>
    <div className="progress-track">
      <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
    </div>
  </div>
);

const RewardsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("daily");
  const userPoints = 1250;

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Mock rewards data for each category
  const rewardsData = {
    daily: [
      {
        title: "Daily Login",
        description: "Claim 50 points for logging in today",
        buttonText: "Claim Now",
        icon: "calendar-check",
        onButtonClick: () => alert("Daily bonus claimed!"),
      },
      {
        title: "Complete Challenge",
        description: "Solve today's mining puzzle for 150 bonus points",
        buttonText: "Start Challenge",
        icon: "puzzle-piece",
        onButtonClick: () => alert("Challenge started!"),
      },
    ],
    streaks: [
      {
        title: "7-Day Streak",
        description: "You're on day 5 of 7. Keep going!",
        buttonText: "View Progress",
        icon: "fire",
        onButtonClick: () => alert("Streak details"),
      },
      {
        title: "Monthly Dedication",
        description: "Login for 25 days in a month for a massive bonus",
        buttonText: "Track Progress",
        icon: "calendar",
        onButtonClick: () => alert("Monthly progress"),
      },
    ],
    leaderboard: [
      {
        title: "Top 10 Miners",
        description: "Currently ranked #8. 250 points to reach #7",
        buttonText: "View Leaderboard",
        icon: "trophy",
        onButtonClick: () => alert("Leaderboard opened"),
      },
      {
        title: "Team Competition",
        description: "Join a team to earn collective rewards",
        buttonText: "Join a Team",
        icon: "users",
        onButtonClick: () => alert("Team selection"),
      },
    ],
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
      <div className="page-wrapper rewards-page">
        <ScrollProgressBar />

        <div className="content-wrapper">
          {/* Header Section with Points Display */}
          <header className="rewards-header">
            <div className="header-content">
              <div className="text-content">
                <AnimatedText text="REWARDS CENTER" className="title" />
                <FloatingElement delay={0.2}>
                  <p className="description">
                    Earn points and rewards as you engage with our platform.
                    Discover instant rewards when your device uncovers the
                    winning hash and climb the leaderboard rankings.
                  </p>
                </FloatingElement>
              </div>

              <div className="points-counter">
                <span className="points-value">{userPoints}</span>
                <span className="points-label">POINTS</span>
              </div>
            </div>

            {/* User Progress Section */}
            <div className="user-progress">
              <ProgressBar percentage={68} label="Level Progress (Level 4)" />
              <div className="next-reward">
                <span>Next Reward: 550 points away</span>
                <button className="small-button">View Rewards Path</button>
              </div>
            </div>
          </header>

          {/* Rewards Navigation */}
          <nav className="rewards-nav">
            <ul>
              <li className={activeTab === "daily" ? "active" : ""}>
                <button onClick={() => setActiveTab("daily")}>
                  Daily Rewards
                </button>
              </li>
              <li className={activeTab === "streaks" ? "active" : ""}>
                <button onClick={() => setActiveTab("streaks")}>
                  Streak Bonuses
                </button>
              </li>
              <li className={activeTab === "leaderboard" ? "active" : ""}>
                <button onClick={() => setActiveTab("leaderboard")}>
                  Competitions
                </button>
              </li>
            </ul>
          </nav>

          {/* Rewards Cards Section */}
          <main className="rewards-main">
            <div className="rewards-container">
              {rewardsData[activeTab as keyof typeof rewardsData].map(
                (reward, index) => (
                  <RewardCard
                    key={`${activeTab}-reward-${index}`}
                    title={reward.title}
                    description={reward.description}
                    buttonText={reward.buttonText}
                    icon={reward.icon}
                  />
                )
              )}
            </div>
          </main>
        </div>
      </div>
    </PageTransition>
  );
};

export default RewardsPage;
