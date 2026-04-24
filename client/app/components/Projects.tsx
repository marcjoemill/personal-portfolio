"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./Projects.css";

interface Project {
  id: number;
  name: string;
  description: string;
  tags: string[];
  link: string;
  foodType:
    | "ramen"
    | "icedtea"
    | "sushi"
    | "burger"
    | "fries"
    | "onigiri"
    | "matcha"
    | "takoyaki"
    | "boba"
    | "croissant"
    | "noodlecup"
    | "friesbag";
}

// ── REPLACE THESE WITH YOUR REAL PROJECTS ──────────────────────────────────
const PROJECTS: Project[] = [
  {
    id: 1,
    name: "BR's Diner Official Website",
    description: "Marketing website for a local diner in Pasay City with AI chatbot feature",
    tags: ["Python", "FastAPI", "NextJS", "CSS", ],
    link: "/br-diner",
    foodType: "ramen",
  },
  {
    id: 2,
    name: "SPACES",
    description: "Full-stack dorm discovery and management platform featuring SSR-ready pagination",
    tags: ["PocketBase", "Go", "SvelteKit", "Figma"],
    link: "/spaces",
    foodType: "icedtea",
  },
  {
    id: 3,
    name: "Kusina Hub",
    description: "Cloud kitchen platform using Next.js. Achieved Top 10 in a nationwide hackathon, recognized for technical execution and business viability.",
    tags: ["Next.js", "Use of AI"],
    link: "/kusina-hub",
    foodType: "sushi",
  },
  {
    id: 4,
    name: "Harvest",
    description: "E-commerce platform supporting the farm to table movement",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    link: "/harvest",
    foodType: "burger",
  },
  {
    id: 5,
    name: "Lakbayan",
    description: "A short description of what this project does and why it matters.",
    tags: ["Vue", "Firebase"],
    link: "/lakbayan",
    foodType: "fries",
  },
  {
    id: 6,
    name: "Project Six",
    description: "A short description of what this project does and why it matters.",
    tags: ["React Native", "Expo"],
    link: "#",
    foodType: "onigiri",
  },
  {
    id: 7,
    name: "Project Seven",
    description: "A short description of what this project does and why it matters.",
    tags: ["GraphQL", "Prisma"],
    link: "#",
    foodType: "matcha",
  },
  {
    id: 8,
    name: "Project Eight",
    description: "A short description of what this project does and why it matters.",
    tags: ["Svelte", "Vite"],
    link: "#",
    foodType: "takoyaki",
  },
  {
    id: 9,
    name: "Project Nine",
    description: "A short description of what this project does and why it matters.",
    tags: ["AWS", "Docker"],
    link: "#",
    foodType: "boba",
  },
  {
    id: 10,
    name: "Project Ten",
    description: "A short description of what this project does and why it matters.",
    tags: ["Figma", "UX"],
    link: "#",
    foodType: "croissant",
  },
  {
    id: 11,
    name: "Project Eleven",
    description: "A short description of what this project does and why it matters.",
    tags: ["Redis", "Postgres"],
    link: "#",
    foodType: "noodlecup",
  },
  {
    id: 12,
    name: "Project Twelve",
    description: "A short description of what this project does and why it matters.",
    tags: ["Three.js", "WebGL"],
    link: "#",
    foodType: "friesbag",
  },
];
// ───────────────────────────────────────────────────────────────────────────

const BASE = "#420303";
const HOVER_COLOR = "#893F45";

// ── FOOD SVGs ──────────────────────────────────────────────────────────────

/** Ramen Bowl — front POV, wide bowl, noodles, egg half, steam */
function RamenSVG({ on }: { on: boolean }) {
  const c = on ? HOVER_COLOR : BASE;
  return (
    <svg viewBox="0 0 120 100" fill="none" className="food-svg">
      {/* steam */}
      <path d="M44 18 Q46 10 44 4" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M60 14 Q62 6 60 0" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M76 18 Q78 10 76 4" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      {/* bowl body */}
      <path d="M14 36 Q10 72 60 78 Q110 72 106 36 Z" stroke={c} strokeWidth="2.5" strokeLinejoin="round"/>
      {/* rim ellipse */}
      <ellipse cx="60" cy="36" rx="46" ry="12" stroke={c} strokeWidth="2.5"/>
      {/* noodle squiggles */}
      <path d="M28 48 Q34 44 40 48 Q46 52 52 48 Q58 44 64 48" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M42 56 Q48 52 54 56 Q60 60 66 56 Q72 52 78 56" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      {/* egg half */}
      <ellipse cx="84" cy="50" rx="10" ry="8" stroke={c} strokeWidth="1.5"/>
      <circle cx="84" cy="50" r="4" stroke={c} strokeWidth="1.2"/>
      {/* bottom plate */}
      <ellipse cx="60" cy="78" rx="46" ry="8" stroke={c} strokeWidth="1.5"/>
    </svg>
  );
}

/** Iced Tea — tall glass, ice cubes visible, straw, lemon slice */
function IcedTeaSVG({ on }: { on: boolean }) {
  const c = on ? HOVER_COLOR : BASE;
  return (
    <svg viewBox="0 0 80 120" fill="none" className="food-svg">
      {/* glass body — slight taper */}
      <path d="M18 16 L14 100 L66 100 L62 16 Z" stroke={c} strokeWidth="2.5" strokeLinejoin="round"/>
      {/* rim */}
      <ellipse cx="40" cy="16" rx="22" ry="6" stroke={c} strokeWidth="2"/>
      {/* base ellipse */}
      <ellipse cx="40" cy="100" rx="26" ry="7" stroke={c} strokeWidth="2"/>
      {/* liquid fill line */}
      <path d="M19 30 Q40 26 61 30" stroke={c} strokeWidth="1.2" strokeLinecap="round"/>
      {/* ice cubes */}
      <rect x="22" y="38" width="14" height="14" rx="2" stroke={c} strokeWidth="1.5"/>
      <rect x="42" y="34" width="14" height="14" rx="2" stroke={c} strokeWidth="1.5"/>
      <rect x="26" y="56" width="12" height="12" rx="2" stroke={c} strokeWidth="1.5"/>
      <rect x="44" y="52" width="12" height="12" rx="2" stroke={c} strokeWidth="1.5"/>
      {/* straw */}
      <line x1="54" y1="8" x2="50" y2="100" stroke={c} strokeWidth="2" strokeLinecap="round"/>
      {/* lemon on rim */}
      <path d="M58 12 Q66 6 70 14 Q66 20 58 16 Z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/>
      <line x1="60" y1="12" x2="68" y2="16" stroke={c} strokeWidth="0.8"/>
    </svg>
  );
}

/** Sushi — 3 pieces side by side, front POV */
function SushiSVG({ on }: { on: boolean }) {
  const c = on ? HOVER_COLOR : BASE;
  const piece = (x: number) => (
    <g key={x}>
      {/* rice base */}
      <rect x={x} y="52" width="26" height="20" rx="4" stroke={c} strokeWidth="2"/>
      {/* nori band */}
      <rect x={x} y="58" width="26" height="8" stroke={c} strokeWidth="1.2"/>
      {/* topping */}
      <ellipse cx={x + 13} cy="52" rx="11" ry="6" stroke={c} strokeWidth="1.8"/>
      {/* topping detail line */}
      <path d={`M${x + 4} 50 Q${x + 13} 46 ${x + 22} 50`} stroke={c} strokeWidth="1"/>
    </g>
  );
  return (
    <svg viewBox="0 0 120 90" fill="none" className="food-svg">
      {piece(8)}
      {piece(46)}
      {piece(84)}
      {/* plate */}
      <ellipse cx="60" cy="76" rx="52" ry="8" stroke={c} strokeWidth="1.8"/>
    </svg>
  );
}

/** Burger — front/side view, stacked layers */
function BurgerSVG({ on }: { on: boolean }) {
  const c = on ? HOVER_COLOR : BASE;
  return (
    <svg viewBox="0 0 110 100" fill="none" className="food-svg">
      {/* top bun */}
      <path d="M18 46 Q16 20 55 16 Q94 20 92 46 Z" stroke={c} strokeWidth="2.5" strokeLinejoin="round"/>
      {/* sesame seeds */}
      <ellipse cx="42" cy="28" rx="4" ry="2.5" stroke={c} strokeWidth="1.2"/>
      <ellipse cx="58" cy="24" rx="4" ry="2.5" stroke={c} strokeWidth="1.2"/>
      <ellipse cx="70" cy="30" rx="3.5" ry="2" stroke={c} strokeWidth="1.2"/>
      {/* lettuce frills */}
      <path d="M14 50 Q20 44 28 50 Q36 56 44 50 Q52 44 60 50 Q68 56 76 50 Q84 44 92 50 Q98 56 96 52" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
      {/* cheese slice */}
      <path d="M16 56 L94 56 L98 62 L12 62 Z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/>
      {/* patty */}
      <rect x="14" y="64" width="82" height="12" rx="6" stroke={c} strokeWidth="2"/>
      {/* bottom bun */}
      <path d="M12 76 L98 76 Q100 90 55 92 Q10 90 12 76 Z" stroke={c} strokeWidth="2.5" strokeLinejoin="round"/>
    </svg>
  );
}

/** Fries in cup — front POV, fries sticking out top */
function FriesSVG({ on }: { on: boolean }) {
  const c = on ? HOVER_COLOR : BASE;
  return (
    <svg viewBox="0 0 90 110" fill="none" className="food-svg">
      {/* individual fries sticking up */}
      <rect x="22" y="8" width="6" height="38" rx="3" stroke={c} strokeWidth="1.8"/>
      <rect x="32" y="4" width="6" height="42" rx="3" stroke={c} strokeWidth="1.8"/>
      <rect x="42" y="2" width="6" height="44" rx="3" stroke={c} strokeWidth="1.8"/>
      <rect x="52" y="6" width="6" height="40" rx="3" stroke={c} strokeWidth="1.8"/>
      <rect x="62" y="10" width="6" height="36" rx="3" stroke={c} strokeWidth="1.8"/>
      {/* angled fries */}
      <line x1="18" y1="44" x2="26" y2="16" stroke={c} strokeWidth="5" strokeLinecap="round"/>
      <line x1="72" y1="44" x2="66" y2="18" stroke={c} strokeWidth="5" strokeLinecap="round"/>
      {/* cup body */}
      <path d="M16 46 L20 96 L70 96 L74 46 Z" stroke={c} strokeWidth="2.5" strokeLinejoin="round"/>
      {/* cup rim */}
      <rect x="14" y="42" width="62" height="8" rx="2" stroke={c} strokeWidth="2"/>
      {/* cup crease */}
      <line x1="45" y1="54" x2="43" y2="96" stroke={c} strokeWidth="1.2" strokeLinecap="round"/>
      {/* base */}
      <ellipse cx="45" cy="96" rx="26" ry="5" stroke={c} strokeWidth="1.5"/>
    </svg>
  );
}

/** Onigiri — triangle rice ball, front view, nori band */
function OnigiriSVG({ on }: { on: boolean }) {
  const c = on ? HOVER_COLOR : BASE;
  return (
    <svg viewBox="0 0 100 100" fill="none" className="food-svg">
      {/* main triangle body */}
      <path d="M50 8 Q16 60 14 82 Q14 90 50 90 Q86 90 86 82 Q84 60 50 8 Z"
        stroke={c} strokeWidth="2.5" strokeLinejoin="round"/>
      {/* nori band */}
      <path d="M22 70 Q50 66 78 70 L76 84 Q50 80 24 84 Z"
        stroke={c} strokeWidth="1.8" strokeLinejoin="round"/>
      {/* highlight curve */}
      <path d="M38 24 Q32 40 30 54" stroke={c} strokeWidth="1.2" strokeLinecap="round"/>
      {/* sesame dots */}
      <circle cx="50" cy="40" r="2" fill={c}/>
      <circle cx="44" cy="52" r="1.8" fill={c}/>
      <circle cx="56" cy="52" r="1.8" fill={c}/>
      {/* base */}
      <ellipse cx="50" cy="90" rx="36" ry="7" stroke={c} strokeWidth="1.5"/>
    </svg>
  );
}

/** Matcha Latte — ceramic cup, latte art on top, front POV */
function MatchaSVG({ on }: { on: boolean }) {
  const c = on ? HOVER_COLOR : BASE;
  return (
    <svg viewBox="0 0 100 108" fill="none" className="food-svg">
      {/* cup body */}
      <path d="M20 30 L16 88 L84 88 L80 30 Z" stroke={c} strokeWidth="2.5" strokeLinejoin="round"/>
      {/* rim ellipse */}
      <ellipse cx="50" cy="30" rx="30" ry="8" stroke={c} strokeWidth="2.5"/>
      {/* base ellipse */}
      <ellipse cx="50" cy="88" rx="34" ry="8" stroke={c} strokeWidth="2"/>
      {/* handle */}
      <path d="M80 44 Q96 44 96 58 Q96 72 80 70" stroke={c} strokeWidth="2.5"/>
      {/* latte art — leaf pattern on surface */}
      <ellipse cx="50" cy="30" rx="24" ry="5" stroke={c} strokeWidth="1"/>
      <path d="M38 30 Q50 24 62 30" stroke={c} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M42 30 Q50 27 58 30" stroke={c} strokeWidth="1" strokeLinecap="round"/>
      <line x1="50" y1="25" x2="50" y2="35" stroke={c} strokeWidth="0.8"/>
      {/* saucer */}
      <ellipse cx="50" cy="92" rx="40" ry="8" stroke={c} strokeWidth="1.8"/>
      <ellipse cx="50" cy="92" rx="26" ry="5" stroke={c} strokeWidth="1"/>
    </svg>
  );
}

/** Takoyaki — 3 balls on plate, front POV */
function TakoyakiSVG({ on }: { on: boolean }) {
  const c = on ? HOVER_COLOR : BASE;
  const ball = (cx: number, cy: number) => (
    <g key={cx}>
      <circle cx={cx} cy={cy} r="18" stroke={c} strokeWidth="2.2"/>
      {/* sauce drizzle */}
      <path d={`M${cx-8} ${cy-10} Q${cx} ${cy-14} ${cx+8} ${cy-10}`} stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      {/* mayo dot */}
      <circle cx={cx+4} cy={cy-6} r="3" stroke={c} strokeWidth="1.2"/>
      {/* bonito flake suggestion */}
      <path d={`M${cx-6} ${cy+4} Q${cx} ${cy} ${cx+6} ${cy+6}`} stroke={c} strokeWidth="1" strokeLinecap="round"/>
    </g>
  );
  return (
    <svg viewBox="0 0 120 90" fill="none" className="food-svg">
      {ball(25, 46)}
      {ball(60, 46)}
      {ball(95, 46)}
      {/* plate */}
      <ellipse cx="60" cy="66" rx="54" ry="10" stroke={c} strokeWidth="1.8"/>
      <ellipse cx="60" cy="66" rx="46" ry="7" stroke={c} strokeWidth="1"/>
    </svg>
  );
}

/** Boba — cup with pearls visible, straw, sealed lid */
function BobaSVG({ on }: { on: boolean }) {
  const c = on ? HOVER_COLOR : BASE;
  return (
    <svg viewBox="0 0 84 120" fill="none" className="food-svg">
      {/* straw above lid */}
      <rect x="38" y="0" width="7" height="24" rx="3.5" stroke={c} strokeWidth="1.8"/>
      {/* sealed dome lid */}
      <path d="M14 28 Q14 16 42 16 Q70 16 70 28 L70 36 L14 36 Z" stroke={c} strokeWidth="2.2" strokeLinejoin="round"/>
      {/* lid rim */}
      <rect x="12" y="34" width="60" height="6" rx="3" stroke={c} strokeWidth="2"/>
      {/* cup body */}
      <path d="M16 40 L20 104 L64 104 L68 40 Z" stroke={c} strokeWidth="2.5" strokeLinejoin="round"/>
      {/* liquid level */}
      <path d="M18 52 Q42 48 66 52" stroke={c} strokeWidth="1.2" strokeLinecap="round"/>
      {/* boba pearls */}
      <circle cx="28" cy="88" r="6" stroke={c} strokeWidth="1.8"/>
      <circle cx="42" cy="92" r="6" stroke={c} strokeWidth="1.8"/>
      <circle cx="56" cy="88" r="6" stroke={c} strokeWidth="1.8"/>
      <circle cx="34" cy="78" r="5" stroke={c} strokeWidth="1.5"/>
      <circle cx="50" cy="80" r="5" stroke={c} strokeWidth="1.5"/>
      {/* base */}
      <ellipse cx="42" cy="104" rx="24" ry="6" stroke={c} strokeWidth="1.8"/>
    </svg>
  );
}

/** Croissant — side/front view, curved layers */
function CroissantSVG({ on }: { on: boolean }) {
  const c = on ? HOVER_COLOR : BASE;
  return (
    <svg viewBox="0 0 120 80" fill="none" className="food-svg">
      {/* main body */}
      <path d="M10 60 Q6 36 30 22 Q50 10 60 20 Q70 10 90 22 Q114 36 110 60 Q90 68 60 66 Q30 68 10 60 Z"
        stroke={c} strokeWidth="2.5" strokeLinejoin="round"/>
      {/* layer lines */}
      <path d="M22 52 Q40 36 60 34 Q80 36 98 52" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M18 58 Q38 44 60 42 Q82 44 102 58" stroke={c} strokeWidth="1.2" strokeLinecap="round"/>
      {/* horn tips */}
      <path d="M10 60 Q2 52 8 44 Q14 38 22 44" stroke={c} strokeWidth="2" strokeLinecap="round"/>
      <path d="M110 60 Q118 52 112 44 Q106 38 98 44" stroke={c} strokeWidth="2" strokeLinecap="round"/>
      {/* center crease */}
      <path d="M44 26 Q60 20 76 26" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

/** Instant Noodle Cup — front POV, sealed cup, logo area, fork */
function NoodleCupSVG({ on }: { on: boolean }) {
  const c = on ? HOVER_COLOR : BASE;
  return (
    <svg viewBox="0 0 90 110" fill="none" className="food-svg">
      {/* cup body — slight taper wider at top */}
      <path d="M10 30 L14 96 L76 96 L80 30 Z" stroke={c} strokeWidth="2.5" strokeLinejoin="round"/>
      {/* lid */}
      <rect x="8" y="22" width="74" height="10" rx="3" stroke={c} strokeWidth="2.5"/>
      {/* rim top */}
      <rect x="6" y="18" width="78" height="6" rx="3" stroke={c} strokeWidth="2"/>
      {/* label band */}
      <rect x="14" y="44" width="62" height="28" rx="2" stroke={c} strokeWidth="1.5"/>
      {/* wavy noodle lines on label */}
      <path d="M20 52 Q26 48 32 52 Q38 56 44 52 Q50 48 56 52 Q62 56 68 52" stroke={c} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M20 60 Q26 56 32 60 Q38 64 44 60 Q50 56 56 60 Q62 64 68 60" stroke={c} strokeWidth="1.2" strokeLinecap="round"/>
      {/* fork sticking out of lid */}
      <line x1="64" y1="2" x2="64" y2="24" stroke={c} strokeWidth="2" strokeLinecap="round"/>
      <line x1="60" y1="2" x2="60" y2="12" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="68" y1="2" x2="68" y2="12" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="58" y1="12" x2="70" y2="12" stroke={c} strokeWidth="1.5"/>
      {/* base */}
      <ellipse cx="45" cy="96" rx="32" ry="6" stroke={c} strokeWidth="1.5"/>
    </svg>
  );
}

/** Fries in paper bag — McD style, front POV */
function FriesBagSVG({ on }: { on: boolean }) {
  const c = on ? HOVER_COLOR : BASE;
  return (
    <svg viewBox="0 0 96 114" fill="none" className="food-svg">
      {/* individual fries */}
      <rect x="20" y="6" width="7" height="38" rx="3.5" stroke={c} strokeWidth="1.8"/>
      <rect x="31" y="2" width="7" height="42" rx="3.5" stroke={c} strokeWidth="1.8"/>
      <rect x="42" y="0" width="7" height="44" rx="3.5" stroke={c} strokeWidth="1.8"/>
      <rect x="53" y="2" width="7" height="42" rx="3.5" stroke={c} strokeWidth="1.8"/>
      <rect x="64" y="8" width="7" height="36" rx="3.5" stroke={c} strokeWidth="1.8"/>
      {/* angled side fries */}
      <line x1="14" y1="44" x2="22" y2="14" stroke={c} strokeWidth="6" strokeLinecap="round"/>
      <line x1="78" y1="44" x2="72" y2="16" stroke={c} strokeWidth="6" strokeLinecap="round"/>
      {/* bag body */}
      <path d="M12 44 L18 100 L78 100 L84 44 Z" stroke={c} strokeWidth="2.5" strokeLinejoin="round"/>
      {/* bag top fold */}
      <path d="M12 44 Q48 38 84 44" stroke={c} strokeWidth="2" strokeLinecap="round"/>
      {/* M arch logo area */}
      <path d="M32 64 L38 80 L48 70 L58 80 L64 64" stroke={c} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
      {/* base */}
      <ellipse cx="48" cy="100" rx="32" ry="6" stroke={c} strokeWidth="1.5"/>
    </svg>
  );
}

function FoodRenderer({ type, on }: { type: Project["foodType"]; on: boolean }) {
  switch (type) {
    case "ramen":      return <RamenSVG on={on} />;
    case "icedtea":   return <IcedTeaSVG on={on} />;
    case "sushi":     return <SushiSVG on={on} />;
    case "burger":    return <BurgerSVG on={on} />;
    case "fries":     return <FriesSVG on={on} />;
    case "onigiri":   return <OnigiriSVG on={on} />;
    case "matcha":    return <MatchaSVG on={on} />;
    case "takoyaki":  return <TakoyakiSVG on={on} />;
    case "boba":      return <BobaSVG on={on} />;
    case "croissant": return <CroissantSVG on={on} />;
    case "noodlecup": return <NoodleCupSVG on={on} />;
    case "friesbag":  return <FriesBagSVG on={on} />;
  }
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function Projects() {
  const [hoveredId, setHoveredId]   = useState<number | null>(null);
  const [activeId, setActiveId]     = useState<number | null>(null);

  // 4 shelves × 3 items, 2 shelves per row
  const shelves = [
    PROJECTS.slice(0, 3),
    PROJECTS.slice(3, 6),
    PROJECTS.slice(6, 9),
    PROJECTS.slice(9, 12),
  ];

  const activeProject = PROJECTS.find((p) => p.id === activeId) ?? null;

  return (
    <main className="projects-page" id="projects">
      <div className="projects-wrap">

        {/* TOP LABEL */}
        <div className="cabinet-label">
          <span className="label-dot" />
          EACH DISH IS A PROJECT. GET A TASTE.
        </div>

        {/* 2×2 SHELF GRID */}
        <div className="shelves-grid">
          {shelves.map((shelf, si) => (
            <div className="shelf-unit" key={si}>
              <div className="food-row">
                {shelf.map((project) => {
                  const on = hoveredId === project.id || activeId === project.id;
                  return (
                    <div
                      key={project.id}
                      className={`food-item${on ? " food-on" : ""}`}
                      onMouseEnter={() => setHoveredId(project.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() =>
                        setActiveId(activeId === project.id ? null : project.id)
                      }
                      role="button"
                      tabIndex={0}
                      aria-label={project.name}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          setActiveId(activeId === project.id ? null : project.id);
                      }}
                    >
                      <FoodRenderer type={project.foodType} on={on} />
                      <span className="food-label">{project.name}</span>
                    </div>
                  );
                })}
              </div>
              {/* shelf board */}
              <div className="shelf-board" />
            </div>
          ))}
        </div>

        {/* PROJECT DETAIL CARD */}
        {activeProject && (
          <div className="project-detail">
            <button
              className="detail-close"
              onClick={() => setActiveId(null)}
              aria-label="close"
            >
              ✕
            </button>
            <p className="detail-eyebrow">PROJECT</p>
            <h2 className="detail-title">{activeProject.name}</h2>
            <p className="detail-desc">{activeProject.description}</p>
            <div className="detail-tags">
              {activeProject.tags.map((t) => (
                <span key={t} className="detail-tag">{t}</span>
              ))}
            </div>
            <Link
              href={activeProject.link}
              className="detail-link"
            >
              VIEW PROJECT →
            </Link>
          </div>
        )}

      </div>
    </main>
  );
}