"use client";

import React from 'react';
import './Footer.css';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        // Clear hash from URL
        if (window.location.hash) {
            window.history.replaceState(null, "", window.location.pathname);
        }
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">

                {/* Large Branding */}
                <div className="footer-logo">mj</div>

                {/* Navigation Layers */}
                <div className="footer-nav">

                    <div className="footer-nav-col">
                        <span className="footer-label">Navigation</span>
                        <div className="footer-links">
                            <a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); scrollToTop(); }}>Home</a>
                            <a href="#about" className="footer-link">About</a>
                            <a href="#projects" className="footer-link">Projects</a>
                        </div>
                    </div>

                    <div className="footer-nav-col">
                        <span className="footer-label">Socials</span>
                        <div className="footer-links">
                            <a href="https://www.linkedin.com/in/marc-joemil-mendoza1/" target="_blank" rel="noreferrer" className="footer-link">LinkedIn</a>
                            <a href="https://github.com/marcjoemill" target="_blank" rel="noreferrer" className="footer-link">GitHub</a>
                            <a href="https://www.facebook.com/marc.joemil" target="_blank" rel="noreferrer" className="footer-link">Facebook</a>
                            <a href="https://www.instagram.com/miljoe_/" target="_blank" rel="noreferrer" className="footer-link">Instagram</a>
                        </div>
                    </div>

                    <div className="footer-nav-col">
                        <span className="footer-label">Contact</span>
                        <div className="footer-links">
                            <a href="mailto:mpmendoza6@up.edu.ph" className="footer-link">mpmendoza6@up.edu.ph</a>
                            <span className="footer-link">Bacoor, Cavite</span>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <div className="footer-copy">
                        © {currentYear} marc joemill. all rights reserved.
                    </div>

                    <button
                        className="footer-back-to-top"
                        onClick={scrollToTop}
                        aria-label="Back to top"
                    >
                        <div className="footer-back-to-top-circle">
                            <div className="footer-back-to-top-arrow" />
                        </div>
                    </button>
                </div>

            </div>
        </footer>
    );
}
