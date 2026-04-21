"use client";

import "./Hero.css";
import SoftAurora from "../animations/SoftAurora";

export default function Hero() {
  return (
    <section className="hero-section">
      {/* Aurora background */}
      <SoftAurora
        speed={0.6}
        scale={1.5}
        brightness={1}
        color1="#06B6D4"
        color2="#e100ff"
        noiseFrequency={2.5}
        noiseAmplitude={1}
        bandHeight={0.5}
        bandSpread={1}
        octaveDecay={0.1}
        layerOffset={0}
        colorSpeed={1}
        enableMouseInteraction
        mouseInfluence={0}
      />

      {/* Edge vignette to ground the content */}
      <div className="hero-vignette" />

      {/* Main content */}
      <div className="hero-content">
        <h1>
          <span className="hero-name-first">Marc Joemil</span>
          <br />
          <span className="hero-name-last">Mendoza</span>
        </h1>

        <a href="#work" className="hero-cta">View my work</a>
      </div>

      {/* Scroll cue */}
      <div className="hero-scroll">
        <span className="hero-scroll-label">Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}