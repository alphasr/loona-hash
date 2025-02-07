"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, ReactNode, KeyboardEvent } from "react";

interface ParallaxSectionProps {
  children: ReactNode;
  offset?: number;
}

interface AnimatedTextProps {
  text: string;
  className?: string;
}

interface Card3DProps {
  children: ReactNode;
}

interface FloatingElementProps {
  children: ReactNode;
  delay?: number;
}

interface ScrollToSectionProps {
  targetId: string;
  children: ReactNode;
}

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

// Enhanced scroll progress indicator
export const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-purple-500 origin-left z-50"
      style={{ scaleX }}
    />
  );
};

// Enhanced section transition with parallax
export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  offset = 50,
}) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, offset]);

  return (
    <motion.div style={{ y }} className="relative">
      {children}
    </motion.div>
  );
};

// Animated text that reveals character by character
export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = "",
}) => {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.h1
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ display: "inline-block" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h1>
  );
};

// Enhanced card with 3D hover effect
export const Card3D: React.FC<Card3DProps> = ({ children }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotateX(-rotateX);
    setRotateY(rotateY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className="relative preserve-3d"
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {children}
    </motion.div>
  );
};

// Floating animation for elements
export const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  delay = 0,
}) => (
  <motion.div
    animate={{
      y: [0, -10, 0],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      delay,
    }}
  >
    {children}
  </motion.div>
);

// Smooth scroll to section with progress indicator
export const ScrollToSection: React.FC<ScrollToSectionProps> = ({
  targetId,
  children,
}) => {
  const handleClick = () => {
    const target = document.getElementById(targetId);
    if (target) {
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return <MagneticButton onClick={handleClick}>{children}</MagneticButton>;
};

// Loading spinner with smooth transitions
export const LoadingSpinner = () => (
  <motion.div
    className="w-12 h-12 rounded-full border-4 border-purple-500 border-t-transparent"
    animate={{ rotate: 360 }}
    transition={{
      duration: 1,
      ease: "linear",
      repeat: Infinity,
    }}
  />
);

// Page transition wrapper
export const PageTransition: React.FC<{ children: ReactNode }> = ({
  children,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{
      type: "spring",
      stiffness: 100,
      damping: 20,
    }}
  >
    {children}
  </motion.div>
);

// Magnetic button component
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = "",
  onClick,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    setPosition({ x: x * 0.2, y: y * 0.2 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      onClick?.();
    }
  };

  return (
    <motion.div
      className={`magnetic-wrapper ${className}`}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {children}
    </motion.div>
  );
};
