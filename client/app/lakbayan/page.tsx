"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import "./Lakbayan.css";

// SVG Icons
const GameIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="diner-icon">
    <path d="M6 12L3 9L6 6M18 12L21 9L18 6M6 18H18" />
  </svg>
);

const TrophyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="diner-icon">
    <path d="M6 9V2h12v7M6 9a5 5 0 1 1 0 10V9zm12 0a5 5 0 1 0 0 10V9zM8 20h8M12 17v3" />
  </svg>
);

export default function LakbayanPage() {
  const [showAll, setShowAll] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const galleryImages = [
    { id: 1, src: "/lakbayan/screen1.png", alt: "Gameplay Screen 1" },
    { id: 2, src: "/lakbayan/screen2.png", alt: "Gameplay Screen 2" },
    { id: 3, src: "/lakbayan/screen3.png", alt: "Gameplay Screen 3" },
    { id: 4, src: "/lakbayan/screen4.png", alt: "Gameplay Screen 4" },
  ];

  const visibleImages = showAll ? galleryImages : galleryImages.slice(0, 3);
  
  // Parallax Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Background slides down slightly (parallax)
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  // Content slides up and fades out as we scroll
  const yText = useTransform(scrollYProgress, [0, 1], ["0px", "-150px"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="diner-page">
      <motion.nav
        className="diner-nav"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Link href="/#projects" className="diner-back-link">
          <div className="diner-back-arrow" />
          BACK TO PORTFOLIO
        </Link>
      </motion.nav>

      <section ref={containerRef} className="diner-hero">
        <motion.div
          className="diner-hero-bg"
          style={{ y: yBg }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1.05 }}
          transition={{ duration: 1.5 }}
        >
          <img
            src="/lakbayan/hero.png"
            alt="Lakbayan Hero"
            className="diner-hero-img"
          />
          <div className="diner-hero-overlay" />
        </motion.div>

        <motion.div 
          className="diner-hero-content"
          style={{ y: yText, opacity: opacityText }}
        >
          <motion.h1
            className="diner-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Lakbayan: The Endless Heritage
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="diner-stack"
          >
          </motion.div>
        </motion.div>
      </section>

      <section className="diner-section diner-section--full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ maxWidth: '900px', margin: '0 auto' }}
        >
          <span className="diner-label">GAME JAM LOS BAÑOS 2025 Submission</span>
          <h2 className="diner-section-title">Ranked 10th out of 47: A Journey Through Filipino Folklore.</h2>
          
          <div className="diner-feature-card" style={{ textAlign: 'left', marginBottom: '40px' }}>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '24px' }}>
              <TrophyIcon />
              <GameIcon />
            </div>
            <p className="diner-desc" style={{ color: 'var(--cream)', opacity: 0.9, fontSize: '1.1rem', marginBottom: '24px' }}>
              Lakbayan is a Filipino-inspired 2D endless runner co-engineered in Godot for the Game Jam Los Baños 2025. The project was a deep dive into creating a culturally resonant gaming experience while maintaining the high-performance standards required for competitive jam environments.
            </p>
            <p className="diner-desc" style={{ color: 'var(--cream)', opacity: 0.8 }}>
              My technical contributions focused on the core game engine logic. I implemented the jumping physics and collision detection systems from scratch using GDScript, ensuring responsive and fluid movement that is critical for the endless runner genre. By optimizing the game's state machines and asset loading, we were able to deliver a polished experience that secured a top 10 finish among 47 talented submissions.
            </p>
          </div>
        </motion.div>
      </section>

      <section className="diner-section diner-section--full diner-gallery-section" style={{ paddingTop: '0' }}>
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <span className="diner-label">PROJECT GALLERY</span>
          <div className="diner-gallery">
            <AnimatePresence mode="popLayout">
              {visibleImages.map((image) => (
                <motion.div 
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="diner-gallery-item"
                  onClick={() => setSelectedImg(image.src)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={image.src} alt={image.alt} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.button 
            className="diner-gallery-toggle"
            onClick={() => setShowAll(!showAll)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showAll ? "VIEW LESS" : "SEE ALL PROJECTS"}
          </motion.button>

        </motion.div>
      </section>

      <footer className="diner-section" style={{ borderBottom: 'none', paddingBottom: '80px' }}>
        <div style={{ opacity: 0.4, fontSize: '0.7rem' }}>
          © {new Date().getFullYear()} MARC JOEMILL — LAKBAYAN PROJECT
        </div>
      </footer>

      {/* Image Modal Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.9)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'zoom-out',
              padding: '40px'
            }}
          >
            <motion.img
              src={selectedImg}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
