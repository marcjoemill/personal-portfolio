"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-16 bg-gradient-to-br from-background via-slate-950 to-slate-900 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary glow */}
        <div
          className="absolute w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          style={{
            left: `${mousePosition.x - 192}px`,
            top: `${mousePosition.y - 192}px`,
            transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
        {/* Accent glow */}
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/15 rounded-full blur-3xl animate-float" />
        <div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div
          className={`text-center space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <div className="space-y-6">
            <div className="inline-block animate-fade-in-down">
              <span className="px-4 py-2 text-sm font-bold text-accent bg-accent/15 rounded-full border border-accent/40 hover:border-accent/80 transition-colors">
                ✨ Developing with Empathy
              </span>
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-foreground leading-tight text-balance">
              <span className="animate-fade-in-down inline-block" style={{ animationDelay: "0.1s" }}>
                Building
              </span>
              <br />
              <span className="animate-fade-in-down inline-block relative" style={{ animationDelay: "0.2s" }}>
                <span className="relative">
                  Digital
                  <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent blur-md opacity-50">
                    Digital
                  </span>
                </span>
              </span>
              <br />
              <span
                className="animate-fade-in-down inline-block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
                style={{ animationDelay: "0.3s" }}
              >
                Experiences
              </span>
            </h1>

            <p
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance animate-fade-in-down font-light leading-relaxed"
              style={{ animationDelay: "0.4s" }}
            >
              Transforming ideas into pixel-perfect, high-performing digital products. Every line of code tells a story.
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-fade-in-down"
            style={{ animationDelay: "0.5s" }}
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="group px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-primary/50 transition-all hover:scale-105 active:scale-95 relative overflow-hidden"
            >
              <span className="relative z-10">Explore My Work</span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="group px-8 py-4 border-2 border-accent text-accent rounded-lg font-bold text-lg hover:bg-accent/10 transition-all hover:scale-105 active:scale-95"
            >
              Let's Connect
            </button>
          </div>

          <div className="pt-12 animate-bounce" style={{ animationDuration: "2s" }}>
            <button
              onClick={() => scrollToSection("about")}
              className="mx-auto block text-accent hover:text-primary transition-colors hover:scale-125"
              aria-label="Scroll to next section"
            >
              <ChevronDown size={32} className="animate-glow" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
