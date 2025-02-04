"use client";
import "./gameplay.scss";

interface GameplayProps {
  isActive?: boolean;
}

const Gameplay: React.FC<GameplayProps> = ({ isActive = false }) => {
  return (
    <section className={`hero-section gameplay ${isActive ? "active" : ""}`}>
      <div className="hero-content">
        <h1 className="title">GAMEPLAY</h1>
        <p className="description">
          One button. Infinite possibilities.
          <br />
          Watch as your device searches for the perfect hash.
        </p>
      </div>
    </section>
  );
};

export default Gameplay;
