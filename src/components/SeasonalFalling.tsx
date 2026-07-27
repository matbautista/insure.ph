"use client";

import { useSyncExternalStore } from "react";

export interface FallingParticle {
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  // Per-particle overrides, for effects (like confetti) that mix symbols/colors
  // rather than using one symbol/color for every particle.
  symbol?: string;
  color?: string;
}

function subscribe() {
  return () => {};
}

// The visitor's local date can legitimately differ from the server's (across
// timezones, or right at a season boundary) — useSyncExternalStore is React's
// sanctioned tool for exactly this: it renders the server snapshot (false)
// during SSR/hydration, then swaps to the client's real snapshot right after,
// with no hydration-mismatch warning and no extra effect-driven re-render.
export function useIsActiveSeason(check: () => boolean) {
  return useSyncExternalStore(subscribe, check, () => false);
}

export function FallingParticles({
  symbol,
  particleClassName,
  particles,
}: {
  symbol: string;
  particleClassName: string;
  particles: FallingParticle[];
}) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {particles.map((particle, i) => (
        <span
          key={i}
          className={`${particleClassName} absolute top-0 select-none`}
          style={{
            left: `${particle.left}%`,
            fontSize: `${particle.size}px`,
            opacity: particle.opacity,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            ...(particle.color ? { color: particle.color } : {}),
          }}
        >
          {particle.symbol ?? symbol}
        </span>
      ))}
    </div>
  );
}
