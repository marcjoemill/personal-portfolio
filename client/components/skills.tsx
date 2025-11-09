"use client"

import { useState, useEffect, useRef } from "react"

export default function Experiences() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const experiences = [
    {
      id: 1,
      company: "QE 360",
      role: "Flutter Quality Assurance",
      duration: "4 weeks",
      period: "October 2025 - November 2025",
      status: "Part-time",
      description:
        "Fixed bugs and tested bugfixes in the mobile application while maintaining code quality and user experience standards.",
      technologies: ["Flutter", "Dart", "Firebase", "Testing"],
      achievements: [
        "Resolved a good amount of low to critical bugs",,
        "Implemented regression tests to ensure app stability",
      ],
      color: "from-cyan-500 via-blue-600 to-indigo-700",
      accentColor: "bg-cyan-500",
    },
  ]

  return (
    <section ref={sectionRef} id="experiences" className="py-32 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="mb-16 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-12 bg-gradient-to-b from-cyan-500 to-purple-500" />
              <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">
                Experience &{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Journey
                </span>
              </h2>
            </div>
            <p className="text-xl text-slate-300 max-w-2xl font-light">
              Real-world projects and professional growth that shaped my career
            </p>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`group transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative">
                  {/* Timeline dot and line */}
                  <div className="absolute left-0 top-8 -translate-x-1/2">
                    <div
                      className={`w-4 h-4 rounded-full border-4 border-slate-950 ${exp.accentColor} transition-all duration-500 group-hover:scale-150 group-hover:shadow-2xl`}
                      style={{ boxShadow: `0 0 20px ${exp.accentColor.split("-")[1]}` }}
                    />
                  </div>
                  {index < experiences.length - 1 && (
                    <div className="absolute left-0 top-14 -translate-x-1/2 w-1 h-24 bg-gradient-to-b from-slate-600 to-slate-900" />
                  )}

                  {/* Experience card */}
                  <div className="ml-12 p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-slate-900/50 overflow-hidden relative">
                    {/* Gradient overlay on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${exp.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    ></div>

                    <div className="relative z-10 space-y-6">
                      {/* Header with company and role */}
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-500">
                              {exp.role}
                            </h3>
                            <p
                              className={`text-lg font-semibold bg-gradient-to-r ${exp.color} bg-clip-text text-transparent mt-1`}
                            >
                              {exp.company}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-mono text-cyan-400">{exp.duration}</p>
                            <p className="text-xs text-slate-400 mt-1">{exp.period}</p>
                            <span className="inline-block mt-2 px-3 py-1 bg-slate-700 text-slate-200 text-xs font-semibold rounded-full group-hover:bg-cyan-500/30 group-hover:text-cyan-300 transition-all duration-300">
                              {exp.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-slate-300 text-base leading-relaxed">{exp.description}</p>

                      {/* Achievements */}
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-slate-200 uppercase tracking-wide">Key Achievements</p>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <li
                              key={i}
                              className="flex items-center gap-3 text-slate-300 text-sm transition-all duration-300 group-hover:text-cyan-300 group-hover:translate-x-1"
                              style={{ transitionDelay: `${i * 50}ms` }}
                            >
                              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${exp.accentColor}`} />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-700">
                        {exp.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className={`px-3 py-1 bg-gradient-to-r ${exp.color} bg-opacity-10 text-cyan-300 text-xs font-semibold rounded-lg border border-slate-600 group-hover:border-slate-500 group-hover:bg-opacity-20 transition-all duration-300 transform group-hover:scale-105`}
                            style={{ transitionDelay: `${i * 30}ms` }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
