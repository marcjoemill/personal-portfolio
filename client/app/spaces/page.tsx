"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import "./Spaces.css";

// SVG Icons
const HomeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="diner-icon">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);

const UserIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="diner-icon">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

export default function SpacesPage() {
    const [showAll, setShowAll] = useState(false);
    const [selectedImg, setSelectedImg] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const galleryImages = [
        { id: 1, src: "/spaces/screen1.png", alt: "Room Management" },
        { id: 2, src: "/spaces/screen2.png", alt: "Student Dashboard" },
        { id: 3, src: "/spaces/screen3.png", alt: "Application Status" },
        { id: 4, src: "/spaces/team.jpg", alt: "Spaces Team" },
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
                        src="/spaces/spaces.png"
                        alt="University Housing Background"
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
                        SPACES: Housing Redefined
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
                    <span className="diner-label">PROBLEM FRAMING & BRAINSTORMING</span>
                    <h2 className="diner-section-title">Solving for Fragmentation in Student Living.</h2>
                    <p className="diner-desc" style={{ marginBottom: '24px' }}>
                        As a student at UPLB, I experienced firsthand the friction of finding a place to stay through the mainstream Facebook group used for dorm hunting. The process was exhausting: endless scrolling through outdated posts and constant uncertainty over availability. While keyword searching was possible, the lack of structured filtering for specific amenities or policies meant every result still required tedious, manual verification. We recognized that this wasn't just a discovery hurdle—it was a systemic administrative failure. Student housing management was a chaotic mosaic of spreadsheets, manual forms, and disconnected email threads that made the daily workload for administrators gruesome and error-prone.
                    </p>
                    <p className="diner-desc">
                        We approached this as an <strong>ecosystem problem</strong>. Through collective brainstorming, we designed a centralized platform to <strong>digitize</strong> the entire accommodation lifecycle, significantly reducing the manual burden on housing staff while providing students with a transparent, digital-first journey.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="diner-feature-card"
                >
                    <HomeIcon />
                    <div>
                        <span className="diner-label" style={{ color: 'rgba(245,240,232,0.6)', marginBottom: '12px' }}>THE SOLUTION</span>
                        <h3 className="diner-section-title" style={{ marginBottom: '16px', color: 'var(--cream)' }}>Streamlining the "Gruesome" Manual Work</h3>
                        <p className="diner-desc" style={{ color: 'var(--cream)', opacity: 0.8, marginBottom: '16px' }}>
                            We prioritized tools that unblock administrative bottlenecks. By <strong>streamlining</strong> multi-level review workflows, occupancy management, and billing cycles, we aimed to make housing management far more efficient.
                        </p>
                        <p className="diner-desc" style={{ color: 'var(--cream)', opacity: 0.8 }}>
                            Administrators receive high-level oversight and real-time occupancy tools that replace the need for manual tracking, while managers can focus on the community rather than clerical data entry.
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
                    <span className="diner-label">TECHNICAL EXECUTION & MY ROLE</span>
                    <h2 className="diner-section-title" style={{ maxWidth: '800px', margin: '0 auto 40px' }}>
                        A full-stack architecture optimized for low latency via SSR Pagination, bridging a secure PocketBase/Go backend with a responsive SvelteKit frontend.
                    </h2>
                    <div className="diner-feature-card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
                        <div className="diner-stack" style={{ marginTop: '0', marginBottom: '24px', justifyContent: 'flex-start' }}>
                            <span className="diner-tag" style={{ color: 'var(--cream)', borderColor: 'rgba(245,240,232,0.2)' }}>PocketBase</span>
                            <span className="diner-tag" style={{ color: 'var(--cream)', borderColor: 'rgba(245,240,232,0.2)' }}>Go</span>
                            <span className="diner-tag" style={{ color: 'var(--cream)', borderColor: 'rgba(245,240,232,0.2)' }}>SvelteKit</span>
                            <span className="diner-tag" style={{ color: 'var(--cream)', borderColor: 'rgba(245,240,232,0.2)' }}>SSR Pagination</span>
                            <span className="diner-tag" style={{ color: 'var(--cream)', borderColor: 'rgba(245,240,232,0.2)' }}>System Design</span>
                        </div>
                        <p className="diner-desc" style={{ color: 'var(--cream)', opacity: 0.8 }}>
                            As a full-stack developer on the team, I built and maintained backend services and APIs, including <strong>SSR-ready pagination endpoints</strong> to ensure efficient data delivery and minimal latency. I was responsible for resolving complex UI–database integration issues to maintain data consistency. Additionally, I contributed to early-stage UI/UX by translating wireframes into functional interfaces, ensuring the platform was both technically robust and user-friendly from day one.
                        </p>
                    </div>
                </motion.div>
            </section>

            <section className="diner-section">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="diner-feature-card"
                >
                    <UserIcon />
                    <div>
                        <span className="diner-label" style={{ color: 'rgba(245,240,232,0.6)', marginBottom: '12px' }}>COMMUNITY DRIVEN</span>
                        <h3 className="diner-section-title" style={{ marginBottom: '16px', color: 'var(--cream)' }}>Transparent Resident Feedback</h3>
                        <p className="diner-desc" style={{ color: 'var(--cream)', opacity: 0.8, marginBottom: '16px' }}>
                            We integrated an anonymous rating and review system to foster transparency within the student community.
                        </p>
                        <p className="diner-desc" style={{ color: 'var(--cream)', opacity: 0.8 }}>
                            Prospective residents can read objective feedback from previous occupants, ensuring they make informed decisions while incentivizing dormitory managers to maintain high-quality living standards.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                >
                    <span className="diner-label">USER-CENTRIC DESIGN</span>
                    <h2 className="diner-section-title">Bridging the Gap Between Administration and Comfort.</h2>
                    <p className="diner-desc" style={{ marginBottom: '24px' }}>
                        The platform roles—Student, Dorm Manager, and Administrator — are meticulously designed to serve their unique needs without compromising on speed or simplicity.
                    </p>
                    <p className="diner-desc">
                        By prioritizing the <strong>Student experience</strong> while simultaneously unburdening the <strong>Administrator</strong>, SPACES transforms an often stressful application process into a seamless, digital-first journey.
                    </p>
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
                    © {new Date().getFullYear()} MARC JOEMILL — SPACES PROJECT
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
