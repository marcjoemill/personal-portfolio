"use client";

import React, { useState, useEffect } from "react";
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Bill from './components/Bill';
import Footer from './components/Footer';
import SectionTransition from './components/SectionTransition';
import CleaningLoader from './components/CleaningLoader';
import { AnimatePresence, motion } from "framer-motion";

export default function App() {
  const [isCleaning, setIsCleaning] = useState(true);

  useEffect(() => {
    // 1. Force browser to ignore previous scroll positions on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 2. Start AT THE TOP on every fresh mount/refresh
    window.scrollTo(0, 0);

    const hasHash = window.location.hash === "#projects";
    const loadTime = hasHash ? 1100 : 800;
    
    const timer = setTimeout(() => {
      if (hasHash) {
        const el = document.getElementById("projects");
        if (el) {
          const targetPos = el.getBoundingClientRect().top + window.scrollY - 150;
          window.scrollTo(0, targetPos);
          // Clean hash so subsequent refreshes start at the top
          window.history.replaceState(null, "", window.location.pathname);
        }
      }
      setIsCleaning(false);
    }, loadTime);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <main>
      <AnimatePresence>
        {isCleaning && <CleaningLoader key="loader" />}
      </AnimatePresence>

      {/* Content always exists in the DOM so we can scroll to it, but stays hidden while cleaning */}
      <motion.div
        key="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: isCleaning ? 0 : 1 }}
        transition={{ duration: 0.6, delay: isCleaning ? 0 : 0.2 }}
        style={{ pointerEvents: isCleaning ? "none" : "auto" }}
      >
        <Hero />
        <SectionTransition 
          line1="We’ve started cooking" 
          line2="While it simmers, here’s my story"
        />
        <About />
        <SectionTransition 
          line1="Every project is plated with purpose" 
          line2="Take a bite, and explore the flavor of my work"
        />
        <Projects />
        <Bill />
        <Footer />
      </motion.div>
    </main>
  );
}