"use client"

import { useEffect, useState } from "react"
import { ExternalLink, Github } from "lucide-react"

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const projects = [
    {
      title: "KusinaHub",
      description:
        "A flutter mobile application that helps users plan and organize their trips, featuring itinerary management, budget tracking, and local recommendations.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS"],
      video: "/kusina-hub.mp4",
      links: { demo: "#", github: "#" },
    },
    {
      title: "Lakbayan",
      description:
        "A Filipino-inspired 2D endless runner built in Godot, where players control a growing horde that moves and jumps collectively to avoid obstacles",
      tags: ["Godot", "GDScript", "Game Development"],
      image: "/lakbayan.png",
      links: { demo: "https://graygv.itch.io/lak", github: "https://github.com/marcjoemill/pinoy_tsunami.git" },
    },
    {
      title: "Travel Buddy",
      description:
        "A flutter mobile application that helps users plan and organize their trips, featuring itinerary management, budget tracking, and local recommendations.",
      tags: ["Flutter", "Dart", "Firebase"],
      image: "/travel-buddy.png",
      links: { demo: "#", github: "https://github.com/CMSC-23/cmsc-23-project-group-repo-travelbuddies.git" },
    },
    {
      title: "Harvest",
      description: "An e-commerce web application using MERN stack, inspired by the Farm-to-table movement, connecting local farmers directly with consumers to provide fresh produce.",
      tags: ["React", "MongoDB", "Express", "Node.js"],
      image: "/harvest.png",
      links: { demo: "#", github: "https://github.com/marcjoemill/harvest.git" },
    },
    {
      title: "ANI",
      description: "A smart, AI-powered mobile assistant application using Flutter, designed to support Filipino farmers with timely, accessible, and localized agricultural information.",
      tags: ["Flutter", "Dart", "Firebase"],
      image: "/ani.png",
      links: { demo: "#", github: "#" },
    },
    {
      title: "Pick Peak Fighters",
      description: "A 2D fighting game using JavaFX, capable of moving, attacking, and blocking.",
      tags: ["JavaFX", "Java", "Game Development"],
      image: "/pick-peak-fighters.png",
      links: { demo: "#", github: "https://github.com/marcjoemill/Pick-Peak-Fighters.git" },
    },
    {
      title: "Portfolio Website",
      description: "Personal portfolio website to showcase projects, skills, and experiences with a modern and responsive design.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS"],
      image: "/portfolio-website.png",
      links: { demo: "#", github: "#" },
    },
  ]

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <h2 className="text-4xl font-bold text-foreground mb-12 animate-fade-in-down">Featured Projects</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group animate-fade-in-down"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="rounded-xl overflow-hidden bg-muted/50 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 h-full flex flex-col">
                  <div className="relative overflow-hidden h-48 bg-muted">
                    {project.video ? (
                      <video
                        src={project.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    )}

                    {/* overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 w-full">
                        <div className="flex gap-3">
                          <a
                            href={project.links.demo}
                            className="flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-all hover:scale-105"
                          >
                            <ExternalLink size={14} />
                            Demo
                          </a>
                          <a
                            href={project.links.github}
                            className="flex items-center gap-2 px-3 py-2 bg-background/80 text-foreground rounded-lg text-sm font-medium hover:bg-background transition-all hover:scale-105 border border-border"
                          >
                            <Github size={14} />
                            Code
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{project.description}</p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full transition-all duration-300 hover:bg-primary/20"
                          style={{
                            transitionDelay: hoveredProject === index ? `${tagIndex * 50}ms` : "0ms",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center space-y-4 animate-fade-in-down" style={{ animationDelay: "0.3s" }}>
            <p className="text-lg text-muted-foreground">Want to see more projects?</p>
            <a
              href="#"
              className="inline-block px-8 py-3 bg-primary/10 text-primary rounded-lg font-medium hover:bg-primary/20 transition-all hover:scale-105 active:scale-95 border border-primary/20"
            >
              View All Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
