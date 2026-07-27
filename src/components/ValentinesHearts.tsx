"use client";

import { FallingParticles, useIsActiveSeason } from "@/components/SeasonalFalling";

const HEARTS = [
  { left: 4, size: 12, duration: 14, delay: 0, opacity: 0.5 },
  { left: 11, size: 8, duration: 11, delay: 2.5, opacity: 0.4 },
  { left: 18, size: 14, duration: 17, delay: 1, opacity: 0.5 },
  { left: 25, size: 9, duration: 12, delay: 4.2, opacity: 0.6 },
  { left: 33, size: 12, duration: 15, delay: 1.8, opacity: 0.4 },
  { left: 41, size: 7, duration: 10, delay: 3.5, opacity: 0.5 },
  { left: 49, size: 15, duration: 18, delay: 0.5, opacity: 0.4 },
  { left: 57, size: 9, duration: 13, delay: 3, opacity: 0.5 },
  { left: 64, size: 8, duration: 11, delay: 5.2, opacity: 0.6 },
  { left: 72, size: 13, duration: 16, delay: 1.4, opacity: 0.4 },
  { left: 80, size: 9, duration: 12, delay: 4, opacity: 0.6 },
  { left: 87, size: 11, duration: 14, delay: 0.8, opacity: 0.5 },
  { left: 94, size: 7, duration: 10, delay: 4.8, opacity: 0.5 },
  { left: 8, size: 10, duration: 20, delay: 6.5, opacity: 0.35 },
  { left: 45, size: 8, duration: 21, delay: 7.2, opacity: 0.35 },
  { left: 78, size: 11, duration: 19, delay: 5.8, opacity: 0.35 },
];

// Valentine's season only: February 1–14 inclusive.
function isValentinesSeason() {
  const now = new Date();
  return now.getMonth() === 1 && now.getDate() <= 14;
}

export function ValentinesHearts() {
  const show = useIsActiveSeason(isValentinesSeason);

  if (!show) return null;

  return <FallingParticles symbol="❤" particleClassName="heart-particle" particles={HEARTS} />;
}
