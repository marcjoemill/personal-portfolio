"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CleaningLoader() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        backgroundColor: "#F5F0E8", // var(--cream)
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: "0.2em",
          color: "#420303", // var(--dark)
          textTransform: "uppercase",
        }}
      >
        Cleaning up {dots}
      </div>
    </motion.div>
  );
}
