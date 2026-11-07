"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import LightField from "./LightField";
import HeroFallback from "./HeroFallback";
import { useDeviceProfile } from "@/lib/useDeviceProfile";

/** One-time WebGL capability probe (client-only; this component never SSRs). */
function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") || canvas.getContext("webgl"),
    );
  } catch {
    return false;
  }
}

function useWebGLSupported(): boolean {
  // Lazy initializer runs once on the first client render — no effect needed.
  const [ok] = useState<boolean>(detectWebGL);
  return ok;
}

/**
 * The live R3F scene. Pauses rendering when the hero scrolls off-screen or the
 * tab is hidden (frameloop toggles to "never"), and caps DPR / particle count
 * to the device. Falls back to a static backdrop without WebGL.
 */
export default function HeroCanvas() {
  const profile = useDeviceProfile();
  const webgl = useWebGLSupported();
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  // Pause when off-screen or tab hidden — saves GPU/battery.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let onScreen = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        setActive(onScreen && document.visibilityState === "visible");
      },
      { threshold: 0.01 },
    );
    io.observe(el);

    const onVisibility = () =>
      setActive(onScreen && document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  if (!webgl) {
    return <HeroFallback />;
  }

  const enableBloom = !profile.isLowPower && !profile.isSmall;

  // Strand budget scaled to the device. Fine lines are cheap, but we still cap
  // the count and segment resolution on small / low-power hardware.
  const strandCount = profile.isSmall
    ? 450
    : profile.isTouch || profile.isLowPower
      ? 750
      : 1200;
  const pointsPerStrand = profile.isSmall ? 16 : profile.isLowPower ? 18 : 22;

  // Fine additive lines are fillrate-bound, so cap the hero's DPR below the
  // device max (crispness gain past ~1.5 isn't worth the frame cost here).
  const dprCap = Math.min(profile.dprCap, 1.5);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, dprCap]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <LightField
          strandCount={strandCount}
          pointsPerStrand={pointsPerStrand}
        />
        {enableBloom && (
          <EffectComposer>
            <Bloom
              intensity={0.45}
              luminanceThreshold={0.25}
              luminanceSmoothing={0.4}
              mipmapBlur
            />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
