"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./SectionTransition.css";

gsap.registerPlugin(ScrollTrigger);

interface SectionTransitionProps {
  line1: string;
  line2: string;
}

export default function SectionTransition({ line1, line2 }: SectionTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%", // Increased slightly for two-step reveal
          pin: true,
          scrub: 1,
        },
      });

      // Reveal Line 1
      tl.fromTo(
        line1Ref.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1 }
      );

      // Reveal Line 2
      tl.fromTo(
        line2Ref.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1 },
        "+=0.2" // slight gap between reveals
      );

      // Hold at the end
      tl.to({}, { duration: 0.5 });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="st-container" ref={containerRef}>
      <div className="st-grain" />
      
      <div className="st-content">
        <h2 className="st-line st-line--1" ref={line1Ref}>
          {line1}
        </h2>
        <h2 className="st-line st-line--2" ref={line2Ref}>
          {line2}
        </h2>
      </div>
    </section>
  );
}
