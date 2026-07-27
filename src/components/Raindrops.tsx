"use client";

import { FallingParticles, useIsActiveSeason } from "@/components/SeasonalFalling";

const RAINDROPS = [
  { left: 2, size: 10, duration: 1.6, delay: 0, opacity: 0.4 },
  { left: 8, size: 8, duration: 1.3, delay: 0.3, opacity: 0.3 },
  { left: 14, size: 11, duration: 1.8, delay: 0.6, opacity: 0.45 },
  { left: 20, size: 9, duration: 1.4, delay: 0.1, opacity: 0.35 },
  { left: 27, size: 10, duration: 1.7, delay: 0.9, opacity: 0.4 },
  { left: 34, size: 8, duration: 1.3, delay: 0.4, opacity: 0.3 },
  { left: 40, size: 12, duration: 1.9, delay: 0.7, opacity: 0.45 },
  { left: 47, size: 9, duration: 1.5, delay: 0.2, opacity: 0.35 },
  { left: 53, size: 10, duration: 1.6, delay: 1, opacity: 0.4 },
  { left: 59, size: 8, duration: 1.3, delay: 0.5, opacity: 0.3 },
  { left: 65, size: 11, duration: 1.8, delay: 0.8, opacity: 0.45 },
  { left: 71, size: 9, duration: 1.4, delay: 0.15, opacity: 0.35 },
  { left: 77, size: 10, duration: 1.7, delay: 1.1, opacity: 0.4 },
  { left: 83, size: 8, duration: 1.3, delay: 0.35, opacity: 0.3 },
  { left: 89, size: 12, duration: 1.9, delay: 0.65, opacity: 0.45 },
  { left: 95, size: 9, duration: 1.5, delay: 0.95, opacity: 0.35 },
  { left: 5, size: 8, duration: 1.4, delay: 1.3, opacity: 0.3 },
  { left: 62, size: 9, duration: 1.6, delay: 1.5, opacity: 0.3 },
];

// Rainy season only: June and July, 0-indexed months (5 = June, 6 = July).
function isRainSeason() {
  const month = new Date().getMonth();
  return month === 5 || month === 6;
}

export function Raindrops() {
  const show = useIsActiveSeason(isRainSeason);

  if (!show) return null;

  return <FallingParticles symbol="💧" particleClassName="raindrop" particles={RAINDROPS} />;
}
