"use client";
import "./gameplay.scss";

interface GameplayProps {
  isActive?: boolean;
}

const Gameplay: React.FC<GameplayProps> = ({ isActive = false }) => {
  return (
    <div className="gameplay-earnings-wrapper">
      {/* Gameplay Section */}
      <section className={`hero-section gameplay ${isActive ? "active" : ""}`}>
        <div className="hero-content">
          <h1 className="title">GAMEPLAY</h1>
          <p className="description">
            One button. Infinite possibilities.
            <br />
            Watch your device work tirelessly to find that winning hash,
            activating a seamless mining adventure in the background.
          </p>
        </div>
      </section>

      {/* Earnings Section */}
      <section className="earnings-section">
        <h2 className="title">EARNINGS</h2>
        <p className="description">
          Maximize your potential and earn valuable crypto rewards.
          <br />
          The more you engage, the greater your earnings.
        </p>
        <div className="earnings-container">
          <div className="earning-card">
            <h3 className="earning-title">Daily Bonus</h3>
            <p className="earning-description">
              Claim free earnings every 24 hours.
            </p>
          </div>
          <div className="earning-card">
            <h3 className="earning-title">Streak Rewards</h3>
            <p className="earning-description">
              Play consistently to unlock bigger bonuses.
            </p>
          </div>
          <div className="earning-card">
            <h3 className="earning-title">Leaderboard Prizes</h3>
            <p className="earning-description">
              Compete to earn top-tier crypto incentives.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gameplay;
