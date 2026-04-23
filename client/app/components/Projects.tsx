"use client";

import React, { useState } from "react";
import "./Projects.css";

interface Project {
    id: number;
    name: string;
    description: string;
    tags: string[];
    link: string;
    cupType: "chunky" | "dainty" | "barrel" | "geometric" | "waisted" | "goblet";
}

// ── REPLACE THESE WITH YOUR REAL PROJECTS ──────────────────────────────────
const PROJECTS: Project[] = [
    {
        id: 1,
        name: "Project One",
        description: "A short description of what this project does and why it matters.",
        tags: ["React", "TypeScript"],
        link: "#",
        cupType: "chunky",
    },
    {
        id: 2,
        name: "Project Two",
        description: "A short description of what this project does and why it matters.",
        tags: ["Next.js", "Tailwind"],
        link: "#",
        cupType: "dainty",
    },
    {
        id: 3,
        name: "Project Three",
        description: "A short description of what this project does and why it matters.",
        tags: ["Node.js", "API"],
        link: "#",
        cupType: "barrel",
    },
    {
        id: 4,
        name: "Project Four",
        description: "A short description of what this project does and why it matters.",
        tags: ["Python", "ML"],
        link: "#",
        cupType: "geometric",
    },
    {
        id: 5,
        name: "Project Five",
        description: "A short description of what this project does and why it matters.",
        tags: ["Vue", "Firebase"],
        link: "#",
        cupType: "waisted",
    },
    {
        id: 6,
        name: "Project Six",
        description: "A short description of what this project does and why it matters.",
        tags: ["React Native", "Expo"],
        link: "#",
        cupType: "goblet",
    },
];
// ───────────────────────────────────────────────────────────────────────────

const BASE = "#420303";
const HOVER_COLOR = "#893F45";

// ── UNIQUE SVG CUPS ────────────────────────────────────────────────────────

/** Chunky — squat, wide, thick double-wall rim, squared-off handle with inner bar */
function ChunkyCup({ on }: { on: boolean }) {
    const c = on ? HOVER_COLOR : BASE;
    return (
        <svg viewBox="0 0 110 100" fill="none" className="cup-svg">
            <path d="M16 30 L94 30 L89 82 L21 82 Z" stroke={c} strokeWidth="3" strokeLinejoin="round" />
            {/* double rim */}
            <rect x="12" y="22" width="86" height="9" rx="1.5" stroke={c} strokeWidth="2.5" />
            <rect x="18" y="25" width="74" height="4" rx="1" stroke={c} strokeWidth="1.2" />
            {/* squared handle with crossbar */}
            <path d="M89 42 L106 42 L106 72 L89 72" stroke={c} strokeWidth="2.5" strokeLinejoin="round" />
            <line x1="106" y1="57" x2="89" y2="57" stroke={c} strokeWidth="1.5" />
            {/* hatched side detail */}
            <line x1="30" y1="42" x2="38" y2="70" stroke={c} strokeWidth="1.2" />
            <line x1="40" y1="40" x2="48" y2="70" stroke={c} strokeWidth="1.2" />
            <line x1="50" y1="39" x2="58" y2="70" stroke={c} strokeWidth="1.2" />
        </svg>
    );
}

/** Dainty — tall fluted silhouette, ribbon loop handle, raised dot band */
function DaintyCup({ on }: { on: boolean }) {
    const c = on ? HOVER_COLOR : BASE;
    return (
        <svg viewBox="0 0 90 112" fill="none" className="cup-svg">
            {/* fluted tall body */}
            <path d="M26 18 Q18 90 45 92 Q72 90 64 18 Z" stroke={c} strokeWidth="2.5" />
            {/* flared rim */}
            <path d="M20 18 Q45 9 70 18" stroke={c} strokeWidth="2.5" strokeLinecap="round" />
            {/* saucer */}
            <ellipse cx="45" cy="95" rx="30" ry="7" stroke={c} strokeWidth="2.5" />
            <ellipse cx="45" cy="95" rx="18" ry="4" stroke={c} strokeWidth="1.2" />
            {/* ribbon handle — overlapping loops */}
            <path d="M64 34 Q84 30 86 46 Q88 60 80 68 Q74 74 64 70" stroke={c} strokeWidth="2" />
            <path d="M64 42 Q76 40 77 52 Q78 62 68 66" stroke={c} strokeWidth="1.2" strokeDasharray="3 2.5" />
            {/* raised dot band */}
            <circle cx="33" cy="28" r="2.2" fill={c} />
            <circle cx="41" cy="25" r="2.2" fill={c} />
            <circle cx="50" cy="24" r="2.2" fill={c} />
            <circle cx="59" cy="26" r="2.2" fill={c} />
        </svg>
    );
}

/** Barrel — perfect cylinder, elliptical groove rings, tiny tab handle */
function BarrelCup({ on }: { on: boolean }) {
    const c = on ? HOVER_COLOR : BASE;
    return (
        <svg viewBox="0 0 100 98" fill="none" className="cup-svg">
            <line x1="18" y1="20" x2="18" y2="84" stroke={c} strokeWidth="3" />
            <line x1="82" y1="20" x2="82" y2="84" stroke={c} strokeWidth="3" />
            <ellipse cx="50" cy="20" rx="32" ry="9" stroke={c} strokeWidth="2.5" />
            <ellipse cx="50" cy="84" rx="32" ry="9" stroke={c} strokeWidth="2.5" />
            {/* groove rings */}
            <ellipse cx="50" cy="36" rx="32" ry="6" stroke={c} strokeWidth="1.5" />
            <ellipse cx="50" cy="52" rx="32" ry="6" stroke={c} strokeWidth="1.5" />
            <ellipse cx="50" cy="68" rx="32" ry="6" stroke={c} strokeWidth="1.5" />
            {/* minimal tab */}
            <path d="M82 46 Q97 46 97 52 Q97 58 82 58" stroke={c} strokeWidth="2.5" />
        </svg>
    );
}

/** Geometric — faceted angular body like a cut gem, stepped handle */
function GeometricCup({ on }: { on: boolean }) {
    const c = on ? HOVER_COLOR : BASE;
    return (
        <svg viewBox="0 0 105 105" fill="none" className="cup-svg">
            {/* outer polygon */}
            <polygon points="50,16 74,26 82,54 74,80 26,80 18,54 26,26"
                stroke={c} strokeWidth="2.5" strokeLinejoin="round" />
            {/* inner facet structure */}
            <polygon points="50,28 64,34 68,52 62,68 38,68 32,52 36,34"
                stroke={c} strokeWidth="1.2" />
            {/* radial lines from center */}
            <line x1="50" y1="16" x2="50" y2="28" stroke={c} strokeWidth="1" />
            <line x1="74" y1="26" x2="64" y2="34" stroke={c} strokeWidth="1" />
            <line x1="82" y1="54" x2="68" y2="52" stroke={c} strokeWidth="1" />
            <line x1="74" y1="80" x2="62" y2="68" stroke={c} strokeWidth="1" />
            <line x1="26" y1="80" x2="38" y2="68" stroke={c} strokeWidth="1" />
            <line x1="18" y1="54" x2="32" y2="52" stroke={c} strokeWidth="1" />
            <line x1="26" y1="26" x2="36" y2="34" stroke={c} strokeWidth="1" />
            {/* stepped angular handle */}
            <path d="M82 36 L96 36 L96 46 L90 46 L90 62 L96 62 L96 72 L82 72"
                stroke={c} strokeWidth="2.5" strokeLinejoin="round" />
            {/* flat ground */}
            <line x1="20" y1="88" x2="80" y2="88" stroke={c} strokeWidth="2.5" />
            <line x1="26" y1="80" x2="26" y2="88" stroke={c} strokeWidth="2" />
            <line x1="74" y1="80" x2="74" y2="88" stroke={c} strokeWidth="2" />
        </svg>
    );
}

/** Waisted — pinched hourglass body, ear handle, stripe pair at waist */
function WaistedCup({ on }: { on: boolean }) {
    const c = on ? HOVER_COLOR : BASE;
    return (
        <svg viewBox="0 0 95 108" fill="none" className="cup-svg">
            {/* hourglass silhouette */}
            <path d="M22 18 C22 18 68 18 68 18 C74 36 60 48 60 54 C60 60 74 72 68 90 C68 90 22 90 22 90 C16 72 30 60 30 54 C30 48 16 36 22 18 Z"
                stroke={c} strokeWidth="2.5" strokeLinejoin="round" />
            {/* rim ellipse */}
            <ellipse cx="45" cy="18" rx="23" ry="6" stroke={c} strokeWidth="2" />
            {/* foot ring */}
            <ellipse cx="45" cy="90" rx="23" ry="6" stroke={c} strokeWidth="2" />
            <ellipse cx="45" cy="90" rx="14" ry="3.5" stroke={c} strokeWidth="1.2" />
            {/* ear handle */}
            <path d="M68 30 Q84 30 84 42 Q84 54 68 52" stroke={c} strokeWidth="2.5" />
            {/* waist stripe pair */}
            <path d="M31 54 Q45 50 59 54" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M30 59 Q45 63 60 59" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

/** Goblet — wide-bowl stemware, etched concentric arcs, footed base ring */
function GobletCup({ on }: { on: boolean }) {
    const c = on ? HOVER_COLOR : BASE;
    return (
        <svg viewBox="0 0 104 114" fill="none" className="cup-svg">
            {/* bowl */}
            <path d="M16 14 Q16 64 52 68 Q88 64 88 14 Z" stroke={c} strokeWidth="2.5" />
            {/* rim ellipse */}
            <ellipse cx="52" cy="14" rx="36" ry="9" stroke={c} strokeWidth="2.5" />
            {/* stem */}
            <line x1="52" y1="68" x2="52" y2="96" stroke={c} strokeWidth="3.5" />
            {/* foot */}
            <ellipse cx="52" cy="99" rx="26" ry="7" stroke={c} strokeWidth="2.5" />
            <ellipse cx="52" cy="99" rx="16" ry="4" stroke={c} strokeWidth="1.2" />
            {/* etched concentric arcs inside bowl */}
            <path d="M34 32 Q52 26 70 32" stroke={c} strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M28 44 Q52 36 76 44" stroke={c} strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M24 56 Q52 46 80 56" stroke={c} strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </svg>
    );
}

function CupRenderer({ type, on }: { type: Project["cupType"]; on: boolean }) {
    switch (type) {
        case "chunky": return <ChunkyCup on={on} />;
        case "dainty": return <DaintyCup on={on} />;
        case "barrel": return <BarrelCup on={on} />;
        case "geometric": return <GeometricCup on={on} />;
        case "waisted": return <WaistedCup on={on} />;
        case "goblet": return <GobletCup on={on} />;
    }
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function Projects() {
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [activeId, setActiveId] = useState<number | null>(null);

    const shelf1 = PROJECTS.slice(0, 3);
    const shelf2 = PROJECTS.slice(3, 6);

    const activeProject = PROJECTS.find((p) => p.id === activeId) ?? null;

    return (
        <main className="projects-page">
            <div className="cabinet">

                {/* TOP LABEL */}
                <div className="cabinet-label">
                    <span className="label-dot" />
                    EACH MUG IS A PROJECT. GET A TASTE.
                </div>

                {/* CABINET FRAME */}
                <div className="cabinet-frame">

                    {[shelf1, shelf2].map((shelf, si) => (
                        <div className="shelf" key={si}>
                            <div className="cups-row">
                                {shelf.map((project) => {
                                    const on = hoveredId === project.id || activeId === project.id;
                                    return (
                                        <div
                                            key={project.id}
                                            className={`cup-item${on ? " cup-on" : ""}`}
                                            onMouseEnter={() => setHoveredId(project.id)}
                                            onMouseLeave={() => setHoveredId(null)}
                                            onClick={() =>
                                                setActiveId(activeId === project.id ? null : project.id)
                                            }
                                            role="button"
                                            tabIndex={0}
                                            aria-label={project.name}
                                        >
                                            <CupRenderer type={project.cupType} on={on} />
                                            <span className="cup-label">{project.name}</span>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="shelf-board" />
                        </div>
                    ))}

                    {/* COUNTER TOP */}
                    <div className="cabinet-counter" />

                    {/* LEGS */}
                    <div className="cabinet-legs">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="cabinet-leg" />
                        ))}
                    </div>
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
                        <a
                            href={activeProject.link}
                            className="detail-link"
                            target="_blank"
                            rel="noreferrer"
                        >
                            VIEW PROJECT →
                        </a>
                    </div>
                )}

            </div>
        </main>
    );
}