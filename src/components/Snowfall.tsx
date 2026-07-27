"use client";

import { FallingParticles, useIsActiveSeason } from "@/components/SeasonalFalling";

const FLAKES = [
  { left: 2, size: 12, duration: 13, delay: 0, opacity: 0.7 },
  { left: 8, size: 8, duration: 10, delay: 2.2, opacity: 0.5 },
  { left: 14, size: 15, duration: 16, delay: 0.8, opacity: 0.6 },
  { left: 20, size: 9, duration: 11, delay: 4, opacity: 0.8 },
  { left: 27, size: 13, duration: 14, delay: 1.5, opacity: 0.5 },
  { left: 34, size: 7, duration: 9, delay: 3.2, opacity: 0.7 },
  { left: 40, size: 16, duration: 17, delay: 0, opacity: 0.5 },
  { left: 47, size: 10, duration: 12, delay: 2.8, opacity: 0.6 },
  { left: 53, size: 8, duration: 10, delay: 5, opacity: 0.7 },
  { left: 59, size: 14, duration: 15, delay: 1.2, opacity: 0.5 },
  { left: 65, size: 9, duration: 11, delay: 3.6, opacity: 0.8 },
  { left: 71, size: 12, duration: 13, delay: 0.5, opacity: 0.6 },
  { left: 77, size: 7, duration: 9, delay: 4.4, opacity: 0.7 },
  { left: 83, size: 15, duration: 16, delay: 2, opacity: 0.5 },
  { left: 89, size: 10, duration: 12, delay: 3, opacity: 0.6 },
  { left: 95, size: 13, duration: 14, delay: 1, opacity: 0.7 },
  { left: 5, size: 9, duration: 18, delay: 6, opacity: 0.4 },
  { left: 30, size: 11, duration: 19, delay: 7, opacity: 0.4 },
  { left: 62, size: 8, duration: 20, delay: 5.5, opacity: 0.4 },
  { left: 91, size: 12, duration: 18, delay: 8, opacity: 0.4 },
];

// Holiday season only: October (9) through December (11), 0-indexed months.
function isSnowSeason() {
  const month = new Date().getMonth();
  return month >= 9 && month <= 11;
}

export function Snowfall() {
  const show = useIsActiveSeason(isSnowSeason);

  if (!show) return null;

  return <FallingParticles symbol="❄" particleClassName="snowflake" particles={FLAKES} />;
}
