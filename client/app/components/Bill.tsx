"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import "./Bill.css";

export default function Bill() {
  const [mounted, setMounted] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isPrinted, setIsPrinted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    setMounted(true);
  }, []);

  const orderItems = [
    { qty: "6×", item: "Projects Delivered",     price: "✓" },
    { qty: "1×", item: "Communication Skills", price: "✓" },
    { qty: "1×", item: "Teamplayer", price: "✓" },
    { qty: "∞×", item: "Great ideas",             price: "✓" },
  ];

  const handleBillOut = () => {
    if (isPrinting || isPrinted) return;
    setIsPrinting(true);

    // Simulate a brief "printing" delay, then trigger download
    setTimeout(() => {
      setIsPrinting(false);
      setIsPrinted(true);

      const link = document.createElement("a");
      link.href = "/resume.pdf";
      link.download = "Marc_Joemil_Mendoza_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Reset after a moment so it can be used again
      setTimeout(() => setIsPrinted(false), 4000);
    }, 1200);
  };

  return (
    <section className="bill-section" ref={sectionRef}>
      {/* Separator perforated line */}
      <div className="bill-perforation" />

      <motion.div
        className="bill-wrapper"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Receipt header */}
        <div className="bill-header">
          <p className="bill-establishment">MJ&apos;s Portfolio</p>
          <p className="bill-tagline">Thank you for dining with us.</p>
          <div className="bill-divider" />
          <p className="bill-date">
            {mounted ? new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "October 24, 2024"}
          </p>
        </div>

        {/* Order items */}
        <ul className="bill-items">
          {orderItems.map((row, i) => (
            <motion.li
              key={i}
              className="bill-item"
              initial={{ opacity: 0, x: -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
            >
              <span className="bill-item-qty">{row.qty}</span>
              <span className="bill-item-name">{row.item}</span>
              <span className="bill-item-dots" aria-hidden="true" />
              <span className="bill-item-price">{row.price}</span>
            </motion.li>
          ))}
        </ul>

        <div className="bill-divider bill-divider--dashed" />

        {/* Total */}
        <div className="bill-total">
          <span className="bill-total-label">TOTAL EXPERIENCE</span>
          <span className="bill-total-value">Priceless</span>
        </div>

        <div className="bill-divider" />

        {/* CTA */}
        <motion.button
          className={`bill-btn ${isPrinting ? "bill-btn--printing" : ""} ${isPrinted ? "bill-btn--printed" : ""}`}
          onClick={handleBillOut}
          whileHover={!isPrinting && !isPrinted ? { scale: 1.02 } : {}}
          whileTap={!isPrinting && !isPrinted ? { scale: 0.97 } : {}}
          aria-label="Download Resume"
        >
          <span className="bill-btn-icon">
            {isPrinting ? (
              <span className="bill-btn-spinner" />
            ) : isPrinted ? (
              "✓"
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            )}
          </span>
          <span className="bill-btn-text">
            {isPrinting ? "Printing..." : isPrinted ? "Received." : "REQUEST THE BILL"}
          </span>
        </motion.button>

        {/* Footer receipt text */}
        <p className="bill-footer-note">* resume prints without judgment</p>
        <div className="bill-barcode">
          {Array.from({ length: 32 }).map((_, i) => (
            <div
              key={i}
              className="bill-barcode-bar"
              style={{ height: `${(8 + Math.sin(i * 1.7) * 8).toFixed(2)}px` }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
