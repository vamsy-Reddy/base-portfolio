"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { strandVertexShader, strandFragmentShader } from "./shaders/strands";

const EXTENT_X = 7;
const EXTENT_Y = 4;

function hexToVec3(hex: string): THREE.Vector3 {
  const c = new THREE.Color(hex);
  return new THREE.Vector3(c.r, c.g, c.b);
}

/** Deterministic PRNG (mulberry32) so the field is stable across renders. */
function makeRng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Divergence-free curl field (analytic potentials, finite-difference curl).
 * Smooth and organic, so integrating it traces flowing, non-crossing strands.
 */
function pot(x: number, y: number, z: number): number {
  return (
    Math.sin(x * 0.5 + z * 0.4) +
    Math.cos(y * 0.45 - z * 0.35) +
    0.5 * Math.sin(x * 1.1 - y * 0.8 + z * 0.6) +
    0.25 * Math.cos(y * 1.9 + x * 1.3)
  );
}
function curl(x: number, y: number, z: number): [number, number, number] {
  const e = 0.15;
  const p1 = (X: number, Y: number, Z: number) => pot(X, Y, Z);
  const p2 = (X: number, Y: number, Z: number) => pot(X + 31.4, Y - 17.2, Z + 5.1);
  const p3 = (X: number, Y: number, Z: number) => pot(X - 9.7, Y + 42.3, Z - 23.8);

  const dP3dy = (p3(x, y + e, z) - p3(x, y - e, z)) / (2 * e);
  const dP2dz = (p2(x, y, z + e) - p2(x, y, z - e)) / (2 * e);
  const dP1dz = (p1(x, y, z + e) - p1(x, y, z - e)) / (2 * e);
  const dP3dx = (p3(x + e, y, z) - p3(x - e, y, z)) / (2 * e);
  const dP2dx = (p2(x + e, y, z) - p2(x - e, y, z)) / (2 * e);
  const dP1dy = (p1(x, y + e, z) - p1(x, y - e, z)) / (2 * e);

  return [dP3dy - dP2dz, dP1dz - dP3dx, dP2dx - dP1dy];
}

export interface LightFieldProps {
  strandCount: number;
  pointsPerStrand: number;
  colorA?: string;
  colorB?: string;
  colorC?: string;
}

export default function LightField({
  strandCount,
  pointsPerStrand,
  colorA = "#6ee7ff",
  colorB = "#a9dcff",
  colorC = "#a78bfa",
}: LightFieldProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { gl } = useThree();

  const mouse = useRef(new THREE.Vector2(0, 0));
  const intensity = useRef(0);
  const active = useRef(false);

  useEffect(() => {
    const el = gl.domElement;
    const on = () => {
      active.current = true;
    };
    const off = () => {
      active.current = false;
    };
    el.addEventListener("pointerenter", on);
    el.addEventListener("pointermove", on);
    el.addEventListener("pointerleave", off);
    window.addEventListener("blur", off);
    return () => {
      el.removeEventListener("pointerenter", on);
      el.removeEventListener("pointermove", on);
      el.removeEventListener("pointerleave", off);
      window.removeEventListener("blur", off);
    };
  }, [gl]);

  // Build the strand geometry once. Each strand is a curl-flow polyline; we emit
  // it as GL line segments (two verts per segment) in one buffer -> one draw.
  const geometry = useMemo(() => {
    const P = pointsPerStrand;
    const segsPerStrand = P - 1;
    const vertsPerStrand = segsPerStrand * 2;
    const total = strandCount * vertsPerStrand;

    const positions = new Float32Array(total * 3);
    const seeds = new Float32Array(total);
    const ts = new Float32Array(total);
    const depths = new Float32Array(total);

    const rng = makeRng(0x1a2b3c ^ (strandCount * 131 + P));
    const step = 0.2;
    const pts: number[] = new Array(P * 3);

    let v = 0; // vertex cursor
    for (let s = 0; s < strandCount; s++) {
      const seed = rng() * 100;
      // Origins biased toward the right so the left (headline) stays open.
      let x = -5 + Math.pow(rng(), 0.6) * 13;
      let y = (rng() * 2 - 1) * (EXTENT_Y + 0.6);
      let z = -3.6 + rng() * 5.1;
      const depth = Math.min(1, Math.max(0, (z + 3.6) / 5.1));

      // Integrate the curl field to trace the strand.
      for (let i = 0; i < P; i++) {
        pts[i * 3] = x;
        pts[i * 3 + 1] = y;
        pts[i * 3 + 2] = z;
        const [vx, vy, vz] = curl(x, y, z);
        const len = Math.hypot(vx, vy, vz) || 1;
        x += (vx / len) * step;
        y += (vy / len) * step;
        z += (vz / len) * step;
      }

      // Emit segments.
      for (let i = 0; i < segsPerStrand; i++) {
        for (let k = 0; k < 2; k++) {
          const idx = i + k;
          positions[v * 3] = pts[idx * 3];
          positions[v * 3 + 1] = pts[idx * 3 + 1];
          positions[v * 3 + 2] = pts[idx * 3 + 2];
          seeds[v] = seed;
          ts[v] = idx / (P - 1);
          depths[v] = depth;
          v++;
        }
      }
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    g.setAttribute("aT", new THREE.BufferAttribute(ts, 1));
    g.setAttribute("aDepth", new THREE.BufferAttribute(depths, 1));
    return g;
  }, [strandCount, pointsPerStrand]);

  // Dispose the geometry when it is replaced or unmounted.
  useEffect(() => () => geometry.dispose(), [geometry]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uIntensity: { value: 0 },
      uColorA: { value: hexToVec3(colorA) },
      uColorB: { value: hexToVec3(colorB) },
      uColorC: { value: hexToVec3(colorC) },
    }),
    [colorA, colorB, colorC],
  );

  useFrame((state, delta) => {
    const mat = materialRef.current;
    if (!mat) return;

    const targetX = state.pointer.x * EXTENT_X;
    const targetY = state.pointer.y * EXTENT_Y;
    const k = Math.min(1, delta * 5);
    mouse.current.x += (targetX - mouse.current.x) * k;
    mouse.current.y += (targetY - mouse.current.y) * k;

    const target = active.current ? 1 : 0;
    intensity.current += (target - intensity.current) * Math.min(1, delta * 3.5);

    mat.uniforms.uTime.value = state.clock.elapsedTime;
    mat.uniforms.uMouse.value.copy(mouse.current);
    mat.uniforms.uIntensity.value = intensity.current;
  });

  return (
    <lineSegments geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={strandVertexShader}
        fragmentShader={strandFragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}
