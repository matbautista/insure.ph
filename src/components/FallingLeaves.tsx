"use client";

import { FallingParticles, useIsActiveSeason } from "@/components/SeasonalFalling";

const LEAVES = [
  { left: 4, size: 14, duration: 15, delay: 0, opacity: 0.5, symbol: "🍁" },
  { left: 11, size: 10, duration: 12, delay: 2.4, opacity: 0.4, symbol: "🍂" },
  { left: 18, size: 16, duration: 18, delay: 0.8, opacity: 0.5, symbol: "🍁" },
  { left: 25, size: 11, duration: 13, delay: 4.2, opacity: 0.55, symbol: "🍂" },
  { left: 33, size: 14, duration: 16, delay: 1.6, opacity: 0.4, symbol: "🍁" },
  { left: 41, size: 10, duration: 11, delay: 3.6, opacity: 0.5, symbol: "🍂" },
  { left: 49, size: 15, duration: 19, delay: 0.4, opacity: 0.4, symbol: "🍁" },
  { left: 57, size: 11, duration: 13, delay: 3, opacity: 0.55, symbol: "🍂" },
  { left: 65, size: 10, duration: 12, delay: 5, opacity: 0.5, symbol: "🍁" },
  { left: 73, size: 14, duration: 17, delay: 1.2, opacity: 0.4, symbol: "🍂" },
  { left: 81, size: 10, duration: 12, delay: 3.8, opacity: 0.55, symbol: "🍁" },
  { left: 89, size: 13, duration: 15, delay: 0.6, opacity: 0.45, symbol: "🍂" },
  { left: 96, size: 9, duration: 11, delay: 4.6, opacity: 0.5, symbol: "🍁" },
  { left: 7, size: 12, duration: 21, delay: 6.4, opacity: 0.35, symbol: "🍂" },
  { left: 47, size: 9, duration: 22, delay: 7.2, opacity: 0.35, symbol: "🍁" },
  { left: 84, size: 12, duration: 20, delay: 6, opacity: 0.35, symbol: "🍂" },
];

// March through May inclusive, 0-indexed months (2 = March, 4 = May).
function isLeafSeason() {
  const month = new Date().getMonth();
  return month >= 2 && month <= 4;
}

export function FallingLeaves() {
  const show = useIsActiveSeason(isLeafSeason);

  if (!show) return null;

  return <FallingParticles symbol="🍁" particleClassName="leaf-particle" particles={LEAVES} />;
}
