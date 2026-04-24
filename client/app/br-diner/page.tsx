"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import "./Diner.css";

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

export default function BrDinerPage() {
  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const galleryImages = [
    { id: 1, src: "/br/screen1.png", alt: "Screen 1" },
    { id: 2, src: "/br/screen2.png", alt: "Screen 2" },
    { id: 3, src: "/br/screen3.png", alt: "Screen 3" },
    { id: 4, src: "/br/screen4.png", alt: "Screen 4" },
    // { id: 5, src: "/br/br_img1.jpg", alt: "Screen 5" },
    // { id: 6, src: "/br/br_img1.jpg", alt: "Screen 6" }
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
            src="/br/br_img1.jpg"
            alt="BR's Diner Interior"
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
            BR’s Diner: Automated Hospitality
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
          <h2 className="diner-section-title">Solving for Trust in a Digital-First World.</h2>
          <p className="diner-desc" style={{ marginBottom: '24px' }}>
            New diners often struggle to convert online visitors into actual customers. While most restaurant websites only display information, they fail to engage the visitor.
          </p>
          <p className="diner-desc">
            I approached this as a <strong>conversion problem</strong>, not just a UI design task. Instead of static content, I explored how conversation could build trust and excitement before a visit.
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
            <h3 className="diner-section-title" style={{ marginBottom: '16px', color: 'var(--cream)' }}>The Brand Concierge</h3>
            <p className="diner-desc" style={{ color: 'var(--cream)', opacity: 0.8, marginBottom: '16px' }}>
              I designed a conversational concierge that transforms the website from a static brochure into an active staff member.
            </p>
            <p className="diner-desc" style={{ color: 'var(--cream)', opacity: 0.8 }}>
              Instead of just browsing, users interact with the diner as if they are speaking to a host. This personal touch removes friction and transforms passive visitors into engaged, hungry customers.
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
            A synchronized marketing platform built for engagement and discovery, powered by a high-performance FastAPI backend and a responsive Next.js frontend.
          </h2>
          <div className="diner-feature-card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
            <div className="diner-stack" style={{ marginTop: '0', marginBottom: '24px', justifyContent: 'flex-start' }}>
              <span className="diner-tag" style={{ color: 'var(--cream)', borderColor: 'rgba(245,240,232,0.2)' }}>FastAPI</span>
              <span className="diner-tag" style={{ color: 'var(--cream)', borderColor: 'rgba(245,240,232,0.2)' }}>Next.js 15</span>
              <span className="diner-tag" style={{ color: 'var(--cream)', borderColor: 'rgba(245,240,232,0.2)' }}>Gemini AI</span>
              <span className="diner-tag" style={{ color: 'var(--cream)', borderColor: 'rgba(245,240,232,0.2)' }}>SEO Schema</span>
            </div>
            <p className="diner-desc" style={{ color: 'var(--cream)', opacity: 0.8 }}>
              This is more than a website. It’s a customer acquisition tool. By combining <strong>FastAPI</strong> speed with <strong>Gemini AI’s</strong> natural conversation, I bridged the gap between a Google search and a table reservation. I implemented advanced <strong>JSON-LD SEO</strong> to ensure the business is discoverable, while the clean UI ensures the experience is unforgettable.
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
          © {new Date().getFullYear()} MARC JOEMILL — BR’S DINER PROJECT
        </div>
      </footer>
    </div>
  );
}
