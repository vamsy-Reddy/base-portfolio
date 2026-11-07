"use client";

import { useState } from "react";

export interface DeviceProfile {
  /** Coarse pointer (touch) devices get a lighter scene. */
  isTouch: boolean;
  /** Narrow viewports. */
  isSmall: boolean;
  /** Rough low-power signal from hardware concurrency / memory. */
  isLowPower: boolean;
  /** Suggested particle count for the hero, scaled to the device. */
  particleCount: number;
  /** Suggested max device-pixel-ratio cap for the Canvas. */
  dprCap: number;
  /** True until the first client measurement resolves. */
  pending: boolean;
}

const DEFAULT: DeviceProfile = {
  isTouch: false,
  isSmall: false,
  isLowPower: false,
  particleCount: 9000,
  dprCap: 2,
  pending: true,
};

/** Measure device capability. Guarded so it's a no-op during SSR. */
function measure(): DeviceProfile {
  if (typeof window === "undefined") return DEFAULT;

  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  const isSmall = window.matchMedia("(max-width: 640px)").matches;

  const cores =
    typeof navigator.hardwareConcurrency === "number"
      ? navigator.hardwareConcurrency
      : 8;
  // `deviceMemory` is non-standard; treat as a hint only.
  const mem =
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  const isLowPower = cores <= 4 || mem <= 4;

  let particleCount = 9000;
  if (isSmall) particleCount = 3500;
  else if (isTouch || isLowPower) particleCount = 5000;

  const dprCap = isSmall || isLowPower ? 1.5 : 2;

  return { isTouch, isSmall, isLowPower, particleCount, dprCap, pending: false };
}

/**
 * Device capability profile used to size the 3D scene. The Canvas is
 * client-only (ssr:false), so this measures once on the first client render
 * via a lazy initializer — no effect, no cascading re-render.
 */
export function useDeviceProfile(): DeviceProfile {
  const [profile] = useState<DeviceProfile>(measure);
  return profile;
}
