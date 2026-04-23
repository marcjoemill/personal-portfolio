  "use client";

  import { useEffect, useRef } from "react";
  import "./Hero.css";

  /* ─────────────────────────────────────────────
    SVG decorative assets — all drawn in maroon
    via stroke-dashoffset animation on mount
  ───────────────────────────────────────────── */

  /** Large loose botanical sprig — top-left corner */
  function BotanicalLeft() {
    return (
      <svg className="hero-svg hero-svg--botanical-left" viewBox="0 0 260 420" fill="none">
        {/* main stem */}
        <path className="draw" d="M130 410 C128 340 120 280 110 210 C100 140 95 90 115 30" strokeWidth="2" />
        {/* branch left 1 */}
        <path className="draw" d="M120 320 C90 300 55 290 20 295" strokeWidth="1.5" />
        <path className="draw" d="M20 295 C35 280 50 275 55 260 C60 245 50 235 40 240" strokeWidth="1.5" />
        {/* leaf left 1 */}
        <path className="draw" d="M55 260 C40 240 25 248 20 265 C15 280 30 290 55 260Z" strokeWidth="1.5" />
        {/* branch right 1 */}
        <path className="draw" d="M115 250 C145 230 175 218 210 222" strokeWidth="1.5" />
        <path className="draw" d="M210 222 C195 205 178 200 172 185 C166 170 176 160 188 167" strokeWidth="1.5" />
        {/* leaf right 1 */}
        <path className="draw" d="M172 185 C188 162 205 170 210 188 C215 206 198 218 172 185Z" strokeWidth="1.5" />
        {/* branch left 2 */}
        <path className="draw" d="M112 175 C80 158 48 155 18 165" strokeWidth="1.5" />
        <path className="draw" d="M18 165 C38 148 58 148 65 132 C72 116 60 105 48 112" strokeWidth="1.5" />
        {/* leaf left 2 */}
        <path className="draw" d="M65 132 C48 108 30 118 28 138 C26 158 46 166 65 132Z" strokeWidth="1.5" />
        {/* branch right 2 */}
        <path className="draw" d="M113 110 C138 92 165 82 196 80" strokeWidth="1.5" />
        {/* small leaf cluster right 2 */}
        <path className="draw" d="M196 80 C180 65 165 68 160 80 C155 92 168 102 196 80Z" strokeWidth="1.5" />
        <path className="draw" d="M196 80 C210 62 225 68 224 82 C223 96 208 100 196 80Z" strokeWidth="1.5" />
        {/* top tendril */}
        <path className="draw" d="M115 30 C108 18 118 8 126 14 C134 20 128 32 120 36" strokeWidth="1.5" />
      </svg>
    );
  }

  /** Delicate cup outline — right side decorative */
  function CupSketch() {
    return (
      <svg className="hero-svg hero-svg--cup" viewBox="0 0 180 200" fill="none">
        {/* waisted body */}
        <path className="draw" d="M40 30 C40 30 120 30 140 30 C148 55 132 75 128 95 C148 115 145 148 138 175 C138 175 42 175 42 175 C35 148 32 115 52 95 C48 75 32 55 40 30Z" strokeWidth="2" />
        {/* rim ellipse */}
        <ellipse className="draw" cx="90" cy="30" rx="50" ry="12" strokeWidth="2" />
        {/* foot */}
        <ellipse className="draw" cx="90" cy="175" rx="48" ry="10" strokeWidth="2" />
        <ellipse className="draw" cx="90" cy="175" rx="30" ry="6" strokeWidth="1.2" />
        {/* handle */}
        <path className="draw" d="M138 55 Q168 55 170 75 Q172 95 168 110 Q164 125 138 120" strokeWidth="2" />
        <path className="draw" d="M138 68 Q155 68 156 80 Q157 95 150 105" strokeWidth="1.2" strokeDasharray="4 3" />
        {/* waist detail lines */}
        <path className="draw" d="M54 95 Q90 88 126 95" strokeWidth="1.2" />
        <path className="draw" d="M52 102 Q90 110 128 102" strokeWidth="1.2" />
        {/* steam wisps */}
        <path className="draw" d="M68 14 Q72 4 68 -6" strokeWidth="1.5" strokeLinecap="round" />
        <path className="draw" d="M90 10 Q94 0 90 -10" strokeWidth="1.5" strokeLinecap="round" />
        <path className="draw" d="M112 14 Q116 4 112 -6" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  /** Scattered small asterisk/star marks */
  function StarMarks() {
    const marks = [
      { cx: 30, cy: 80, r: 6, delay: 0.8 },
      { cx: 220, cy: 150, r: 8, delay: 1.2 },
      { cx: 60, cy: 300, r: 5, delay: 1.5 },
      { cx: 310, cy: 60, r: 6, delay: 0.6 },
      { cx: 280, cy: 340, r: 7, delay: 1.8 },
      { cx: 80, cy: 420, r: 5, delay: 2.0 },
    ];

    return (
      <svg className="hero-svg hero-svg--stars" viewBox="0 0 340 460" fill="none">
        {marks.map((m, i) => (
          <g key={i} style={{ animationDelay: `${m.delay}s` }} className="star-mark">
            <line x1={m.cx - m.r} y1={m.cy} x2={m.cx + m.r} y2={m.cy} strokeWidth="1.5" />
            <line x1={m.cx} y1={m.cy - m.r} x2={m.cx} y2={m.cy + m.r} strokeWidth="1.5" />
            <line x1={m.cx - m.r * 0.7} y1={m.cy - m.r * 0.7} x2={m.cx + m.r * 0.7} y2={m.cy + m.r * 0.7} strokeWidth="1" />
            <line x1={m.cx + m.r * 0.7} y1={m.cy - m.r * 0.7} x2={m.cx - m.r * 0.7} y2={m.cy + m.r * 0.7} strokeWidth="1" />
          </g>
        ))}
      </svg>
    );
  }

  /** Bottom-right corner arch decoration */
  function ArchDecor() {
    return (
      <svg className="hero-svg hero-svg--arch" viewBox="0 0 200 200" fill="none">
        <path className="draw" d="M200 200 A160 160 0 0 0 40 200" strokeWidth="1.5" />
        <path className="draw" d="M200 200 A120 120 0 0 0 80 200" strokeWidth="1.5" />
        <path className="draw" d="M200 200 A80 80 0 0 0 120 200" strokeWidth="1.5" />
        <path className="draw" d="M200 200 A40 40 0 0 0 160 200" strokeWidth="1.5" />
      </svg>
    );
  }

  /** Drifting cloud shape — burnt maroon #420303, outline only */
  function CloudSvg() {
    return (
      <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M170 85 C182 85 192 76 192 64 C192 52 182 44 170 44 C169 44 168 44 167 44 C165 34 158 26 148 24 C146 17 139 12 131 12 C125 12 120 15 117 19 C113 16 108 14 102 14 C88 14 76 24 75 38 C66 40 60 48 60 58 C60 72 72 83 85 83 L170 85Z"
          fill="none"
          stroke="#420303"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  /* ─────────────────────────────────────────────
    Main Hero component
  ───────────────────────────────────────────── */
  export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLHeadingElement>(null);
    const taglineRef = useRef<HTMLParagraphElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);

    /* ── GSAP entrance + parallax ── */
    useEffect(() => {
      let gsap: typeof import("gsap").gsap;
      let ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;

      const init = async () => {
        const gsapMod = await import("gsap");
        const stMod = await import("gsap/ScrollTrigger");
        gsap = gsapMod.gsap;
        ScrollTrigger = stMod.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        /* ── draw SVG paths ── */
        const paths = document.querySelectorAll<SVGPathElement | SVGEllipseElement>(
          ".hero-svg .draw"
        );
        paths.forEach(el => {
          if (el instanceof SVGPathElement) {
            const len = el.getTotalLength?.() ?? 300;
            gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
          } else {
            /* ellipses */
            gsap.set(el, { strokeDasharray: 600, strokeDashoffset: 600 });
          }
        });

        tl
          .to(paths, {
            strokeDashoffset: 0,
            duration: 2.2,
            stagger: 0.04,
            ease: "power2.inOut",
          }, 0)
          /* ── name reveal ── */
          .fromTo(
            nameRef.current,
            { yPercent: 120, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1.1, ease: "expo.out" },
            0.3
          )
          /* ── tagline ── */
          .fromTo(
            taglineRef.current,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9 },
            0.7
          )
          /* ── links ── */
          .fromTo(
            linksRef.current,
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7 },
            0.95
          )
          /* ── scroll cue ── */
          .fromTo(
            scrollRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.6 },
            1.2
          );

        /* ── parallax on scroll ── */
        gsap.to(".hero-svg--botanical-left", {
          yPercent: -30,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1.5 },
        });
        gsap.to(".hero-svg--cup", {
          yPercent: -20,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 2 },
        });
        gsap.to(contentRef.current, {
          yPercent: 18,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1 },
        });
      };

      init();
    }, []);

    return (
      <section className="hero-section" ref={sectionRef}>

        {/* grain overlay */}
        <div className="hero-grain" aria-hidden />

        {/* ── drifting clouds ── */}
        <div className="hero-clouds" aria-hidden>
          <div className="hero-cloud hero-cloud--1"><CloudSvg /></div>
          <div className="hero-cloud hero-cloud--2"><CloudSvg /></div>
          <div className="hero-cloud hero-cloud--3"><CloudSvg /></div>
          <div className="hero-cloud hero-cloud--4"><CloudSvg /></div>
        </div>


        {/* ── horizontal rule top ── */}

        {/* ── horizontal rule top ── */}

        {/* ── main content ── */}
        <div className="hero-content" ref={contentRef}>
          <div className="hero-name-wrap">
            <h1 className="hero-name" ref={nameRef}>mj</h1>
          </div>

        </div>

      </section>
    );
  }