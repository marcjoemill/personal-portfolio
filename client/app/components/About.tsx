"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./About.css";
import dynamic from "next/dynamic";

const Masonry = dynamic(() => import("../animations/Masonry"), { ssr: false });
const DecryptedText = dynamic(() => import("../animations/DecryptedText"), { ssr: false });

// ── PHOTOS ────────────────────────────────────────────────────────────────
const photos = [
  { id: "1", img: "/about/1.jpg", url: "#", height: 500 },
  { id: "2", img: "/about/2.jpg", url: "#", height: 300 },
  { id: "3", img: "/about/3.jpg", url: "#", height: 450 },
  { id: "4", img: "/about/4.jpg", url: "#", height: 380 },
  { id: "5", img: "/about/5.jpg", url: "#", height: 420 },
  { id: "6", img: "/about/6.jpg", url: "#", height: 310 },
  { id: "7", img: "/about/7.jpg", url: "#", height: 400 },
  { id: "8", img: "/about/8.jpg", url: "#", height: 480 },
];

// ── TECH STACK — grouped like a restaurant menu ───────────────────────────
const techMenu = [
  {
    category: "Languages",
    items: [
      { name: "JavaScript", note: "Async logic" },
      { name: "TypeScript", note: "Strict type-safety, generics" },
      { name: "Python",     note: "Automation & scripting" },
      { name: "Go",         note: "Concurrent systems & CLI" },
      { name: "Dart",       note: "Reactive mobile patterns" },
      { name: "C",          note: "Systems & memory logic" },
      { name: "Java",       note: "Object-oriented design" },
      { name: "SQL",        note: "Relational architecture" },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React",        note: "Component driven, Hooks" },
      { name: "Next.js",      note: "SSR, App Router, RSC" },
      { name: "SvelteKit",    note: "Efficient file-based apps" },
      { name: "Flutter",      note: "Native cross-platform UI" },
      { name: "Tailwind CSS", note: "Modern utility workflows" },
      { name: "HTML & CSS",   note: "High-fidelity responsive layouts" },
    ],
  },
  {
    category: "Backend & Data",
    items: [
      { name: "Node.js",    note: "Event-driven architecture" },
      { name: "Express.js", note: "RESTful API middleware" },
      { name: "MongoDB",    note: "NoSQL schema design" },
      { name: "Firebase",   note: "Real-time Auth & DB" },
      { name: "Docker",     note: "Containerized deployment" },
    ],
  },
  {
    category: "Tooling",
    items: [
      { name: "Git & GitHub", note: "Collaborative CI/CD workflows" },
      { name: "VS Code",      note: "Optimized DX & Debugging" },
      { name: "Figma",        note: "UI/UX prototypes to production" },
    ],
  },
];

export default function About() {
  const [columns, setColumns] = useState(2);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  useEffect(() => {
    const updateColumns = () => {
      if (typeof window !== "undefined") {
        setColumns(window.innerWidth <= 600 ? 1 : 2);
      }
    };
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  return (
    <div className="about-root-container">
      {/* ── Main about grid ───────────────────────────────────────── */}
      <section className="about-section" id="about">
        <div className="about-left">
          <h2 className="about-heading">
            <DecryptedText
              text="Crafting things"
              animateOn="view"
              revealDirection="start"
              parentClassName="about-heading-light"
            />
            <br />
            <DecryptedText
              text="that matter."
              animateOn="view"
              revealDirection="start"
              parentClassName="about-heading-bold"
            />
          </h2>

          <div className="about-bio">
            <p>
              Good software is something you feel before you explain it. I care
              deeply about whether a product feels right, not just if it works.
              That instinct sharpened at QE 360, where I helped ship a
              production Flutter app, learning that quality is a collaborative
              act, not an afterthought.
            </p>
            <p>
              I build for people, not portfolios. Whether it&apos;s a web app, a mobile
              experience, or a game — I start with the person holding the screen,
              trace backward to the problem they actually have, and build toward
              that. The code is just the last step.
            </p>
            <p>
              Outside the editor, I&apos;m at the gym, on the court, or chasing a good
              meal somewhere. I believe the same thing that makes a great dish
              makes great software — intention, repetition, and knowing exactly
              who you&apos;re serving.
            </p>
          </div>

          <div className="about-stats">
            <div className="about-stat">
              <span className="about-stat-number">06+</span>
              <span className="about-stat-label">Projects shipped</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-number">01+</span>
              <span className="about-stat-label">Years of experience</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-number">01+</span>
              <span className="about-stat-label">Clients worked with</span>
            </div>
          </div>
        </div>

        <div className="about-right">
          <div className="about-masonry-wrap">
            <Masonry
              items={photos}
              columns={columns}
              ease="sine.out"
              duration={0.6}
              stagger={0.04}
              animateFrom="bottom"
              scaleOnHover
              hoverScale={0.97}
              blurToFocus
              colorShiftOnHover={false}
              onItemClick={(item) => setSelectedImg(item.img)}
            />
          </div>
        </div>
      </section>

      {/* ── Tech stack — restaurant menu ──────────────────────────── */}
      <section className="about-menu-section" id="stack">
        <div className="about-menu-header">
          <div className="about-label">
            <span className="about-label-line" />
            <span className="about-label-text">Tech Stack</span>
            <span className="about-label-line" />
          </div>

          <h2 className="about-heading about-heading--center">
            <span className="about-heading-light">Tools I </span>
            <span className="about-heading-bold">work with.</span>
          </h2>

          <p className="about-menu-subtitle">
            A curated selection of languages, frameworks & tools.
          </p>
        </div>

        <div className="menu-card">
          <div className="menu-card-inner">
            {techMenu.map((section, si) => (
              <div className="menu-category" key={`section-${si}`}>
                <div className="menu-category-header">
                  <span className="menu-category-rule" />
                  <span className="menu-category-name">{section.category}</span>
                  <span className="menu-category-rule" />
                </div>

                <ul className="menu-items">
                  {section.items.map((item, ii) => (
                    <li className="menu-item" key={`item-${si}-${ii}`}>
                      <span className="menu-item-name">{item.name}</span>
                      <span className="menu-item-dots" aria-hidden="true" />
                      <span className="menu-item-note">{item.note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal Lightbox */}
      <div className="about-lightbox-container">
        <AnimatePresence>
          {selectedImg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key="about-lightbox-overlay"
              onClick={() => setSelectedImg(null)}
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.9)",
                zIndex: 1000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "zoom-out",
                padding: "40px"
              }}
            >
              <motion.img
                src={selectedImg}
                key="about-lightbox-img"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}