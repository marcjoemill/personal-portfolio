"use client"

import { useEffect, useState } from "react"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid md:grid-cols-3 gap-8 mb-8 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="animate-fade-in-down">
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">About</h3>
            <p className="text-sm text-muted-foreground">
              Creative developer passionate about building beautiful web experiences.
            </p>
          </div>

          <div className="animate-fade-in-down" style={{ animationDelay: "0.1s" }}>
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "Projects", "About", "Contact"].map((link, index) => (
                <li
                  key={link}
                  className="opacity-0 animate-fade-in-down"
                  style={{ animationDelay: `${0.15 + index * 0.05}s` }}
                >
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fade-in-down" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">Legal</h3>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms of Service"].map((link, index) => (
                <li
                  key={link}
                  className="opacity-0 animate-fade-in-down"
                  style={{ animationDelay: `${0.25 + index * 0.05}s` }}
                >
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground opacity-0 animate-fade-in-down"
          style={{ animationDelay: "0.3s" }}
        >
          <p>&copy; {currentYear} Marc. All rights reserved.</p>
          <p>Designed & Built with care</p>
        </div>
      </div>
    </footer>
  )
}
