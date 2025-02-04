"use client";

import React, { useState, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import { PickaxeIcon } from "lucide-react";
import "./spline.scss";

const SplineBackground = () => {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scenesLoaded, setScenesLoaded] = useState(0);

  useEffect(() => {
    setMounted(true);
    console.log("Component mounted, loading:", true);
  }, []);

  const handleSceneLoad = () => {
    setScenesLoaded((prev) => {
      const newCount = prev + 1;
      if (newCount >= 2) {
        setTimeout(() => setLoading(false), 1500); // Add slight delay before hiding
      }
      return newCount;
    });
  };

  if (!mounted) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="icon-wrapper">
            <PickaxeIcon className="pickaxe-icon" strokeWidth={1} />
          </div>
          <h1 className="loading-title">#LoonaHash</h1>
          <div className="loading-dots">
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {loading && mounted && (
        <div className="loading-screen">
          <div className="loading-content">
            <div className="icon-wrapper">
              <PickaxeIcon className="pickaxe-icon" strokeWidth={1} />
            </div>
            <h1 className="loading-title">#LoonaHash</h1>
            <div className="loading-dots">
              <div className={`dot ${scenesLoaded >= 0 ? "active" : ""}`} />
              <div className={`dot ${scenesLoaded >= 1 ? "active" : ""}`} />
              <div className={`dot ${scenesLoaded >= 2 ? "active" : ""}`} />
            </div>
          </div>
        </div>
      )}

      <div className="spline-container">
        <div className="spline-wrapper left">
          <Spline
            scene="https://prod.spline.design/694-metfFy-UOCEO/scene.splinecode"
            onLoad={handleSceneLoad}
          />
        </div>
        <div className="spline-wrapper right">
          <Spline
            scene="https://prod.spline.design/EzU7loQbE8tQLZSl/scene.splinecode"
            onLoad={handleSceneLoad}
          />
        </div>
      </div>
    </>
  );
};

export default SplineBackground;
