"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import "./Kusina.css";

// SVG Icons
const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="diner-icon">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="diner-icon">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default function KusinaHubPage() {
  const [showAll, setShowAll] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const galleryImages = [
    { id: 2, src: "/kusina-hub/screen2.jpg", alt: "Screen 2" },
    { id: 3, src: "/kusina-hub/screen3.jpg", alt: "Screen 3" },
    { id: 4, src: "/kusina-hub/screen4.jpg", alt: "Screen 4" },
    { id: 5, src: "/kusina-hub/screen5.jpg", alt: "Screen 5" },
    { id: 6, src: "/kusina-hub/screen6.jpg", alt: "Screen 6" }
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
            src="/kusina-hub/screen1.jpg"
            alt="Kusina Hub Hero"
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
            Kusina Hub: One Kitchen, Every Channel
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
          <h2 className="diner-section-title">Solving for Fragmentation in the Modern Cloud Kitchen.</h2>
          <p className="diner-desc" style={{ marginBottom: '24px' }}>
            Small food businesses operating across multiple channels — in-store, Grab, and Foodpanda — face a silent operational crisis. Orders arrive from three different sources with no unified view, making it nearly impossible to reconcile daily sales, identify top-performing menu items, or track ingredient consumption accurately. At the end of a shift, owners are left stitching together receipts and gut feelings instead of making data-driven decisions.
          </p>
          <p className="diner-desc">
            We approached this as a fragmentation problem, not just a dashboard design task. The real pain wasn't the lack of data — it was the lack of a single source of truth. Our goal was to build a platform that collapses all order channels into one coherent operational view, giving both cashiers and owners exactly what they need without the noise.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="diner-feature-card"
        >
          <ChatIcon />
          <div>
            <span className="diner-label" style={{ color: 'rgba(245,240,232,0.6)', marginBottom: '12px' }}>SOLUTION CONCEPT</span>
            <h3 className="diner-section-title" style={{ marginBottom: '16px', color: 'var(--cream)' }}>The Unified Kiosk</h3>
            <p className="diner-desc" style={{ color: 'var(--cream)', opacity: 0.8, marginBottom: '16px' }}>
              We designed Kusina Hub as a dual-view kiosk platform — a single interface that serves two very different roles. The Cashier View acts as the frontline terminal, handling all order types from one screen regardless of whether the customer walked in, ordered via Grab, or came through Foodpanda. No more tab-switching or separate receipts across platforms.
            </p>
            <p className="diner-desc" style={{ color: 'var(--cream)', opacity: 0.8 }}>
              The Owner View sits behind the scenes, surfacing consolidated sales analytics, best-selling items, and inventory health — all derived from the same unified order data. We also integrated AI-powered tools from RevLabs to assist with ingredient tracking and business analysis, adding a layer of intelligence to what would otherwise be manual, error-prone work.
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
            A dual-view kiosk platform built for operational clarity, powered by a scalable MongoDB backend and a responsive Next.js frontend.
          </h2>
          <div className="diner-feature-card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
            <div className="diner-stack" style={{ marginTop: '0', marginBottom: '24px', justifyContent: 'flex-start' }}>
              <span className="diner-tag" style={{ color: 'var(--cream)', borderColor: 'rgba(245,240,232,0.2)' }}>Next.js</span>
              <span className="diner-tag" style={{ color: 'var(--cream)', borderColor: 'rgba(245,240,232,0.2)' }}>MongoDB</span>
              <span className="diner-tag" style={{ color: 'var(--cream)', borderColor: 'rgba(245,240,232,0.2)' }}>Ideation</span>
            </div>
            <p className="diner-desc" style={{ color: 'var(--cream)', opacity: 0.8 }}>
              My core contribution was engineering the backend data flow that makes the unified experience possible. I built the order management system responsible for ingesting and reconciling orders across all three channels — in-store, Grab, and Foodpanda — into a single, consistent data structure in MongoDB. I developed the joint receipt tally and tracking system that ensures every transaction, regardless of origin, is properly logged and attributable.
            </p>
            <p className="diner-desc" style={{ color: 'var(--cream)', opacity: 0.8, marginTop: '16px' }}>
              I also built the Owner Dashboard, translating raw order data into meaningful business statistics — daily revenue, per-channel breakdowns, and menu performance — giving owners a clear operational picture at a glance. The flexible document-based nature of MongoDB was central to this: the dashboard reflects live order activity without requiring manual refreshes, keeping both the cashier and the owner always in sync.
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
          © {new Date().getFullYear()} MARC JOEMILL — KUSINA HUB PROJECT
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
