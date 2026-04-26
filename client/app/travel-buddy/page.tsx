"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import "./Travel.css";

// SVG Icons
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="diner-icon">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="diner-icon">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default function TravelBuddyPage() {
  const [showAll, setShowAll] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const galleryImages = [
    { id: 1, src: "/travel-buddy/screen1.png", alt: "Login & Signup Flow" },
    { id: 2, src: "/travel-buddy/screen2.png", alt: "Onboarding Screens" },
    { id: 3, src: "/travel-buddy/screen3.png", alt: "User Profile & Settings" },
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
            src="/travel-buddy/hero.jpg"
            alt="Travel Buddy Hero"
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
            Travel Buddy: Your Local Companion
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
          <span className="diner-label">FLUTTER & FIREBASE MOBILE APP</span>
          <h2 className="diner-section-title">Seamless Authentication and User Onboarding for Modern Travel.</h2>
          
          <div className="diner-feature-card" style={{ textAlign: 'left', marginBottom: '40px' }}>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '24px' }}>
              <ShieldIcon />
              <UserIcon />
            </div>
            <p className="diner-desc" style={{ color: 'var(--cream)', opacity: 0.9, fontSize: '1.1rem', marginBottom: '24px' }}>
              Travel Buddy is a Flutter-based mobile application designed to simplify the journey of Filipino travelers. My focus was on engineering a robust and secure user lifecycle, from the very first interaction to a fully personalized profile experience.
            </p>
            <p className="diner-desc" style={{ color: 'var(--cream)', opacity: 0.8 }}>
              I implemented a comprehensive authentication system that supports both native account creation and Google OAuth integration through Firebase Auth. Beyond just login and signup, I developed an intuitive onboarding flow that captures user preferences and a dedicated profile management system. By leveraging Firebase for real-time data sync and secure storage, I ensured that every traveler's data is consistent across devices and easily manageable.
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
            {showAll ? "VIEW LESS" : "SEE ALL SCREENS"}
          </motion.button>

        </motion.div>
      </section>

      <footer className="diner-section" style={{ borderBottom: 'none', paddingBottom: '80px' }}>
        <div style={{ opacity: 0.4, fontSize: '0.7rem' }}>
          © {new Date().getFullYear()} MARC JOEMILL — TRAVEL BUDDY PROJECT
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
