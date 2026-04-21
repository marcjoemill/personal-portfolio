"use client";

import "./About.css";
import dynamic from "next/dynamic";
import DomeGallery from "../animations/DomeGallery";

const Masonry = dynamic(() => import("../animations/Masonry"), { ssr: false });

const photos = [
  { id: "1",  img: "https://picsum.photos/id/1015/600/900?grayscale",  url: "#", height: 500 },
  { id: "2",  img: "https://picsum.photos/id/1011/600/400?grayscale",  url: "#", height: 300 },
  { id: "3",  img: "https://picsum.photos/id/1020/600/800?grayscale",  url: "#", height: 450 },
  { id: "4",  img: "https://picsum.photos/id/1035/600/500?grayscale",  url: "#", height: 380 },
  { id: "5",  img: "https://picsum.photos/id/1043/600/700?grayscale",  url: "#", height: 420 },
  { id: "6",  img: "https://picsum.photos/id/1050/600/400?grayscale",  url: "#", height: 310 },
  { id: "7",  img: "https://picsum.photos/id/1060/600/600?grayscale",  url: "#", height: 400 },
  { id: "8",  img: "https://picsum.photos/id/1074/600/800?grayscale",  url: "#", height: 480 },
];

// Devicon CDN logos — swap for local /public/logos/*.svg if you prefer
const techLogos = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", alt: "JavaScript" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", alt: "TypeScript" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",         alt: "Python" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",                   alt: "C" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",             alt: "Java" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",           alt: "SQL" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",           alt: "HTML" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",             alt: "CSS" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",                 alt: "Go" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",             alt: "Dart" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",           alt: "React" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",         alt: "Next.js" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",       alt: "Flutter" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",         alt: "SvelteKit" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", alt: "Tailwind CSS" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",         alt: "Node.js" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",       alt: "Express.js" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",       alt: "MongoDB" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",        alt: "Firebase" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",         alt: "Docker" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",               alt: "Git" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",         alt: "GitHub" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",         alt: "VS Code" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",           alt: "Figma" },
];

export default function About() {
  return (
    <>
      {/* ── Main about grid ───────────────────────────────────────── */}
      <section className="about-section" id="about">

        {/* Left panel — identity */}
        <div className="about-left">

          <div className="about-label">
            <span className="about-label-line" />
            <span className="about-label-text">About</span>
          </div>

          <h2 className="about-heading">
            <span className="about-heading-light">Crafting things</span>
            <br />
            <span className="about-heading-bold">that matter.</span>
          </h2>

          <div className="about-bio">
            <p>
              Replace this with a short punchy intro — who you are, what you do,
              and what drives your work. Keep it two to three sentences. Make it
              sound like you.
            </p>
            <p>
              Second paragraph. Talk about your craft, your process, or what
              makes your perspective unique. This is the part visitors remember.
            </p>
          </div>

          <div className="about-stats">
            <div className="about-stat">
              <span className="about-stat-number">03+</span>
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

        {/* Right panel — photo dump */}
        <div className="about-right">
          <div className="about-masonry-wrap">
            <Masonry
              items={photos}
              columns={2}
              ease="sine.out"
              duration={0.6}
              stagger={0.04}
              animateFrom="bottom"
              scaleOnHover
              hoverScale={0.97}
              blurToFocus
              colorShiftOnHover={false}
            />
          </div>
        </div>

      </section>

      {/* ── Tech stack dome ───────────────────────────────────────── */}
      <section className="about-dome-section">

        <div className="about-dome-header">
          <div className="about-label">
            <span className="about-label-line" />
            <span className="about-label-text">Tech Stack</span>
          </div>
          <h2 className="about-heading about-heading--center">
            <span className="about-heading-light">Tools I </span>
            <span className="about-heading-bold">work with.</span>
          </h2>
          <p className="about-dome-hint">Drag to explore · Click to zoom</p>
        </div>

        <div className="about-dome-wrap">
          <DomeGallery
            images={techLogos}
            fit={0.5}
            overlayBlurColor="#080808"
            grayscale={false}
            imageBorderRadius="16px"
            openedImageBorderRadius="20px"
            openedImageWidth="200px"
            openedImageHeight="200px"
            dragSensitivity={18}
            segments={30}
          />
        </div>

      </section>
    </>
  );
}