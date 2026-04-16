import { Briefcase, Code2, ExternalLink, Github, Wrench } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Project {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  video?: string;
  links: { demo: string; github: string };
}

const projects: Project[] = [
  {
    title: 'KusinaHub',
    description:
      'A flutter mobile application that helps users plan and organize their trips, featuring itinerary management, budget tracking, and local recommendations.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    video: '/kusina-hub.mp4',
    links: { demo: '#', github: '#' },
  },
  {
    title: 'Lakbayan',
    description:
      'A Filipino-inspired 2D endless runner built in Godot, where players control a growing horde that moves and jumps collectively to avoid obstacles.',
    tags: ['Godot', 'GDScript', 'Game Development'],
    image: '/lakbayan.png',
    links: { demo: 'https://graygv.itch.io/lak', github: 'https://github.com/marcjoemill/pinoy_tsunami.git' },
  },
  {
    title: 'Travel Buddy',
    description:
      'A flutter mobile application that helps users plan and organize their trips, featuring itinerary management, budget tracking, and local recommendations.',
    tags: ['Flutter', 'Dart', 'Firebase'],
    image: '/travel-buddy.png',
    links: { demo: '#', github: 'https://github.com/CMSC-23/cmsc-23-project-group-repo-travelbuddies.git' },
  },
  {
    title: 'Harvest',
    description:
      'An e-commerce web application using MERN stack, inspired by the Farm-to-table movement, connecting local farmers directly with consumers to provide fresh produce.',
    tags: ['React', 'MongoDB', 'Express', 'Node.js'],
    image: '/harvest.png',
    links: { demo: '#', github: 'https://github.com/marcjoemill/harvest.git' },
  },
  {
    title: 'ANI',
    description:
      'A smart, AI-powered mobile assistant application using Flutter, designed to support Filipino farmers with timely, accessible, and localized agricultural information.',
    tags: ['Flutter', 'Dart', 'Firebase'],
    image: '/ani.png',
    links: { demo: '#', github: '#' },
  },
  {
    title: 'Pick Peak Fighters',
    description: 'A 2D fighting game using JavaFX, capable of moving, attacking, and blocking.',
    tags: ['JavaFX', 'Java', 'Game Development'],
    image: '/pick-peak-fighters.png',
    links: { demo: '#', github: 'https://github.com/marcjoemill/Pick-Peak-Fighters.git' },
  },
  {
    title: 'Portfolio Website',
    description:
      'Personal portfolio website to showcase projects, skills, and experiences with a modern and responsive design.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    image: '/portfolio-website.png',
    links: { demo: '#', github: '#' },
  },
];

const experiences = [
  {
    role: 'Software Engineer',
    company: 'QE 360',
    period: '2025',
    description:
      'Contractual role focused on developing, testing and debugging a production-level Flutter application deployed on app marketplaces. Fixed medium to major severity issues within the Dart/Flutter codebase and collaborated with the testing team to perform regression testing to ensure stability after each release.',
  },
];

const techStack = {
  languages: ['JavaScript', 'TypeScript', 'Python', 'C', 'Java', 'SQL', 'HTML', 'CSS', 'Go (Golang)', 'Dart'],
  frontend: ['React', 'Next.js', 'Flutter', 'SvelteKit', 'Tailwind CSS'],
  backend: ['Node.js', 'Express.js', 'MongoDB', 'MariaDB', 'Firebase', 'PocketBase'],
  tools: ['Git', 'GitHub', 'VS Code', 'Figma', 'Docker'],
};

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group border border-white/10 hover:border-white/30 transition-colors duration-300 bg-neutral-900/50 flex flex-col ${
        compact ? 'w-[260px] flex-shrink-0 snap-start' : 'w-full'
      }`}
    >
      {/* Thumbnail */}
      <div className={`relative bg-neutral-800 overflow-hidden ${compact ? 'h-36' : 'h-44'}`}>
        {project.video ? (
          <video
            src={project.video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <img
            src={project.image || '/placeholder.svg'}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="flex gap-2">
            {project.links.demo !== '#' && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-gray-900 text-xs font-medium hover:bg-gray-100 transition-all hover:scale-105"
              >
                <ExternalLink size={12} />
                Demo
              </a>
            )}
            {project.links.github !== '#' && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 text-white text-xs font-medium hover:bg-white/30 transition-all hover:scale-105 border border-white/40"
              >
                <Github size={12} />
                Code
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className={`flex flex-col gap-2 flex-1 ${compact ? 'p-4' : 'p-5 gap-3'}`}>
        <h4 className={`font-medium text-white group-hover:text-primary transition-colors ${compact ? 'text-sm' : 'text-base'}`}>
          {project.title}
        </h4>
        <p className={`text-neutral-400 leading-relaxed flex-1 ${compact ? 'text-xs' : 'text-sm'}`}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-white/5 text-neutral-300 border border-white/10">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Proof() {
  const [showAll, setShowAll] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
  };

  const handleMouseLeave = () => { isDragging.current = false; };
  const handleMouseUp = () => { isDragging.current = false; };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.2;
  };

  return (
    <section className="py-32 px-6 bg-[#0a0a0a] border-y border-white/5">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-24">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Experience & Proof
          </h2>
          <p className="text-xl text-neutral-400 max-w-3xl leading-relaxed">
            A structured overview of where I've worked, what I've built, and the tools I use.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-16 lg:gap-20">
          <div className="lg:col-span-2 space-y-20">

            {/* Work Experience */}
            <AnimatedSection>
              <div className="flex items-start gap-4 mb-8">
                <Briefcase className="w-6 h-6 text-white mt-1" />
                <h3 className="text-2xl font-medium text-white">Work Experience</h3>
              </div>
              <div className="space-y-10">
                {experiences.map((exp, index) => (
                  <div key={index} className="border-l-2 border-white/10 pl-8">
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                      <h4 className="text-xl font-medium text-white">{exp.role}</h4>
                      <span className="text-sm text-neutral-500">{exp.period}</span>
                    </div>
                    <p className="text-lg text-white mb-3">{exp.company}</p>
                    <p className="text-neutral-400 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Projects */}
            <AnimatedSection delay={200}>
              <div className="flex items-start justify-between gap-4 mb-8">
                <div className="flex items-start gap-4">
                  <Code2 className="w-6 h-6 text-white mt-1" />
                  <h3 className="text-2xl font-medium text-white">Notable Projects</h3>
                </div>
                <button
                  onClick={() => setShowAll((v) => !v)}
                  className="flex items-center gap-2 px-4 py-2 border border-white/20 text-sm text-white hover:border-white/40 hover:bg-white/5 transition-all duration-200 whitespace-nowrap mt-1"
                >
                  {showAll ? 'Scroll view ↑' : 'View all projects ↓'}
                </button>
              </div>

              {/* Horizontal scroll carousel */}
              {!showAll && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Scroll to explore</p>
                  <div
                    ref={scrollRef}
                    className="overflow-x-auto pb-3 cursor-grab active:cursor-grabbing select-none"
                    style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                  >
                    <div className="flex gap-4" style={{ width: 'max-content' }}>
                      {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} compact />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* All projects — 3 column grid */}
              {showAll && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">All projects</p>
                  <div className="grid md:grid-cols-3 gap-5">
                    {projects.map((project, index) => (
                      <ProjectCard key={index} project={project} />
                    ))}
                  </div>
                </div>
              )}
            </AnimatedSection>
          </div>

          {/* Tech Stack Sidebar */}
          <div className="lg:col-span-1">
            <AnimatedSection delay={400}>
              <div className="sticky top-8">
                <div className="flex items-start gap-4 mb-8">
                  <Wrench className="w-6 h-6 text-white mt-1" />
                  <h3 className="text-2xl font-medium text-white">Tech Stack</h3>
                </div>
                <div className="space-y-8">
                  {[
                    { label: 'Languages', items: techStack.languages },
                    { label: 'Frontend', items: techStack.frontend },
                    { label: 'Backend & Database', items: techStack.backend },
                    { label: 'Tools & Infrastructure', items: techStack.tools },
                  ].map(({ label, items }) => (
                    <div key={label}>
                      <h4 className="text-sm uppercase tracking-wider text-neutral-500 mb-3">{label}</h4>
                      <div className="flex flex-wrap gap-2">
                        {items.map((tech, i) => (
                          <span key={i} className="px-3 py-1 border border-white/10 bg-white/5 text-neutral-300 text-sm hover:border-white/30 transition-colors">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}