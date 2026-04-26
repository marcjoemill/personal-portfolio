"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import "./Harvest.css";

// SVG Icons
const ShoppingBagIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="diner-icon">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

export default function HarvestPage() {
  const [showAll, setShowAll] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const galleryImages = [
    { id: 1, src: "/harvest/harvest.png", alt: "Harvest Platform Interface" },
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
            src="/harvest/harvest_hero.jpg"
            alt="Harvest Hero"
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
            Harvest: Field to Fork
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

      <section className="diner-section">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="diner-label">PROBLEM FRAMING & THOUGHT PROCESS</span>
          <h2 className="diner-section-title">Solving for a Broken Supply Chain, Field to Fork.</h2>
          <p className="diner-desc" style={{ marginBottom: '24px' }}>
            The farm-to-table movement has a visibility problem. Farmers lack a direct channel to reach consumers who actually want locally-sourced produce, while consumers have no reliable way to discover and trust what they're buying. In between, middlemen absorb margins that should be going back to the people doing the actual growing — creating a system that's inefficient for everyone except those in the middle.
          </p>
          <p className="diner-desc">
            The solution wasn't just building a storefront — it was designing a platform that could responsibly bridge the trust gap between producer and consumer, with a human-in-the-loop admin layer ensuring that every product listed on Harvest is legitimate, traceable, and fairly represented.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="diner-feature-card"
        >
          <ShoppingBagIcon />
          <div>
            <span className="diner-label" style={{ color: 'rgba(245,240,232,0.6)', marginBottom: '12px' }}>SOLUTION CONCEPT</span>
            <h3 className="diner-section-title" style={{ marginBottom: '16px', color: 'var(--cream)' }}>The Curated Marketplace</h3>
            <p className="diner-desc" style={{ color: 'var(--cream)', opacity: 0.8, marginBottom: '16px' }}>
              Harvest operates on a two-role model: an Admin who reviews and lists products on behalf of producers — acting as the trusted curator bridging the farming community with the platform — and Customers who browse and purchase with confidence knowing every item has been vetted.
            </p>
            <p className="diner-desc" style={{ color: 'var(--cream)', opacity: 0.8 }}>
              This isn't a free-for-all marketplace. The deliberate admin approval layer is what separates Harvest from generic e-commerce — it enforces quality, authenticity, and accountability at every listing, making the farm-to-table promise more than just a label.
            </p>
          </div>
        </motion.div>
      </section>

      <section className="diner-section diner-section--full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="diner-label">TECHNICAL EXECUTION</span>
          <h2 className="diner-section-title" style={{ maxWidth: '800px', margin: '0 auto 40px' }}>
            A full-stack e-commerce platform built for traceability and scale, engineered on the MERN stack with services designed to grow alongside the producer network.
          </h2>
          <div className="diner-feature-card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
            <div className="diner-stack" style={{ marginTop: '0', marginBottom: '24px', justifyContent: 'flex-start' }}>
              <span className="diner-tag" style={{ color: 'var(--cream)', borderColor: 'rgba(245,240,232,0.2)' }}>MongoDB</span>
              <span className="diner-tag" style={{ color: 'var(--cream)', borderColor: 'rgba(245,240,232,0.2)' }}>Express.js</span>
              <span className="diner-tag" style={{ color: 'var(--cream)', borderColor: 'rgba(245,240,232,0.2)' }}>React</span>
              <span className="diner-tag" style={{ color: 'var(--cream)', borderColor: 'rgba(245,240,232,0.2)' }}>Node.js</span>
              <span className="diner-tag" style={{ color: 'var(--cream)', borderColor: 'rgba(245,240,232,0.2)' }}>Product Management</span>
              <span className="diner-tag" style={{ color: 'var(--cream)', borderColor: 'rgba(245,240,232,0.2)' }}>Transactional Workflows</span>
            </div>
            <p className="diner-desc" style={{ color: 'var(--cream)', opacity: 0.8 }}>
              As the lead full-stack developer, I owned the architecture and implementation of the core platform end to end. I created and maintained the MongoDB Atlas cluster that serves as the platform's data backbone, and designed scalable services covering product management, user account systems, and transactional workflows — ensuring that the data flowing between customer orders and admin-curated listings remained consistent and reliable at every step.

            </p>
            <p className="diner-desc" style={{ color: 'var(--cream)', opacity: 0.8, marginTop: '16px' }}>
              The backend was structured to support the platform's two-role model cleanly, with clear separation between customer-facing commerce flows and admin-side curation and approval pipelines. The goal was a codebase that could scale alongside a growing network of producers without becoming a maintenance burden — built right from the start, not patched together after.
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
          © {new Date().getFullYear()} MARC JOEMILL — HARVEST PROJECT
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
