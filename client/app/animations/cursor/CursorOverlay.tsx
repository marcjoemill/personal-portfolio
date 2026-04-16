"use client";

import dynamic from 'next/dynamic';
import type { ComponentProps } from 'react';

type CursorProps = {
  count?: number;
  magnetRadius?: number;
  ringRadius?: number;
  waveSpeed?: number;
  waveAmplitude?: number;
  particleSize?: number;
  lerpSpeed?: number;
  color?: string;
  autoAnimate?: boolean;
  particleVariance?: number;
  rotationSpeed?: number;
  depthFactor?: number;
  pulseSpeed?: number;
  particleShape?: 'capsule' | 'sphere' | 'box' | 'tetrahedron';
  fieldStrength?: number;
};

// Loaded client-side only — Canvas requires browser APIs
const Antigravity = dynamic<CursorProps>(
  () => import('./cursor'),
  { ssr: false }
);

export default function CursorOverlay() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <Antigravity
        count={260}
        magnetRadius={9}
        ringRadius={7}
        waveSpeed={0.4}
        waveAmplitude={1}
        particleSize={0.38}
        lerpSpeed={0.07}
        color="#A855F7"
        autoAnimate={false}
        particleVariance={1}
        rotationSpeed={0}
        depthFactor={1}
        pulseSpeed={3}
        particleShape="capsule"
        fieldStrength={10}
      />
    </div>
  );
}
