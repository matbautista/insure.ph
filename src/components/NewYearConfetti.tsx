"use client";

import { FallingParticles, useIsActiveSeason } from "@/components/SeasonalFalling";

const GOLD = "#f59e0b";
const BLUE = "#2563eb";
const TEAL = "#14b8a6";
const SILVER = "#cbd5e1";

const CONFETTI = [
  { left: 3, size: 10, duration: 13, delay: 0, opacity: 0.5, symbol: "✦", color: GOLD },
  { left: 10, size: 8, duration: 11, delay: 2, opacity: 0.4, symbol: "●", color: BLUE },
  { left: 17, size: 11, duration: 16, delay: 0.6, opacity: 0.5, symbol: "✧", color: TEAL },
  { left: 24, size: 7, duration: 10, delay: 3.6, opacity: 0.6, symbol: "●", color: GOLD },
  { left: 31, size: 10, duration: 14, delay: 1.2, opacity: 0.4, symbol: "✦", color: SILVER },
  { left: 38, size: 8, duration: 9, delay: 4.4, opacity: 0.5, symbol: "●", color: TEAL },
  { left: 45, size: 12, duration: 17, delay: 0, opacity: 0.4, symbol: "✧", color: BLUE },
  { left: 52, size: 8, duration: 11, delay: 2.8, opacity: 0.5, symbol: "●", color: GOLD },
  { left: 59, size: 9, duration: 10, delay: 5, opacity: 0.6, symbol: "✦", color: TEAL },
  { left: 66, size: 11, duration: 15, delay: 1.6, opacity: 0.4, symbol: "●", color: SILVER },
  { left: 73, size: 7, duration: 9, delay: 3.2, opacity: 0.55, symbol: "✧", color: GOLD },
  { left: 80, size: 10, duration: 13, delay: 0.4, opacity: 0.45, symbol: "●", color: BLUE },
  { left: 87, size: 8, duration: 10, delay: 4.8, opacity: 0.5, symbol: "✦", color: TEAL },
  { left: 94, size: 11, duration: 16, delay: 2.2, opacity: 0.4, symbol: "●", color: GOLD },
  { left: 6, size: 9, duration: 19, delay: 6.2, opacity: 0.35, symbol: "✧", color: SILVER },
  { left: 55, size: 8, duration: 20, delay: 7, opacity: 0.35, symbol: "●", color: BLUE },
];

// New Year season only: all of January.
function isNewYearSeason() {
  return new Date().getMonth() === 0;
}

export function NewYearConfetti() {
  const show = useIsActiveSeason(isNewYearSeason);

  if (!show) return null;

  return <FallingParticles symbol="●" particleClassName="confetti-particle" particles={CONFETTI} />;
}
