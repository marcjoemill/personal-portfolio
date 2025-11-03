// "use client"

// import { useEffect, useState } from "react"

// export default function About() {
//   const [isVisible, setIsVisible] = useState(false)

//   useEffect(() => {
//     setIsVisible(true)
//   }, [])

//   return (
//     <section id="about" className="py-20 bg-background">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className={`transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
//           {/* Title */}
//           <div className="text-center mb-16">
//             <h2 className="text-5xl font-bold text-foreground mb-4 animate-fade-in-down" style={{ animationDelay: "0.1s" }}>
//               About Me
//             </h2>
//             <div className="w-24 h-1 bg-primary mx-auto rounded-full animate-scale-in" style={{ animationDelay: "0.3s" }}></div>
//           </div>

//           <div className="grid lg:grid-cols-5 gap-12 items-start">
//             {/* Profile Picture */}
//             <div className="lg:col-span-2 flex justify-center animate-scale-in" style={{ animationDelay: "0.4s" }}>
//               <div className="relative group">
//                 <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-2xl blur opacity-25 group-hover:opacity-60 transition duration-500"></div>
//                 <div className="relative w-full max-w-sm aspect-square bg-muted rounded-2xl overflow-hidden border-4 border-background shadow-2xl">
//                   <img
//                     src="/marc.jpg"
//                     alt="Marc's profile picture"
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Content */}
//             <div className="lg:col-span-3 space-y-6">
//               <div className="space-y-5">
//                 {[
//                   "Hi, I'm <span class='text-primary font-bold'>Marc</span> — a passionate BS Computer Science student with a drive for building meaningful digital experiences.",
//                   "I love turning ideas into real projects, whether it's web apps, mobile apps, AI experiments, or interactive games.",
//                   "I thrive on learning new technologies, solving problems creatively, and pushing the boundaries of what software can do. Every project I work on is an opportunity to grow, innovate, and make an impact.",
//                   "When I'm not coding, you'll find me exploring tech trends, tinkering with small side projects, or planning the next big thing to build.",
//                   "Let's create something amazing together!"
//                 ].map((text, i) => (
//                   <p
//                     key={i}
//                     className={`leading-relaxed animate-fade-in-up ${
//                       i === 0 || i === 4 ? "text-xl font-medium text-foreground" : "text-muted-foreground"
//                     } ${i === 4 ? "font-semibold pt-2" : ""}`}
//                     style={{ animationDelay: `${0.5 + i * 0.15}s` }}
//                     dangerouslySetInnerHTML={{ __html: text }}
//                   />
//                 ))}
//               </div>

//               {/* Interest Tags */}
//               <div className="pt-6">
//                 <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 animate-fade-in-up" style={{ animationDelay: "1.2s" }}>
//                   What I Love Building
//                 </h3>
//                 <div className="flex flex-wrap gap-3">
//                   {["Web Apps", "Mobile Apps", "Games", "APIs", "UI/UX"].map((tag, i) => (
//                     <span
//                       key={tag}
//                       className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-all duration-300 cursor-default animate-pop-in shadow-sm hover:shadow-md hover:-translate-y-0.5"
//                       style={{ animationDelay: `${1.3 + i * 0.08}s` }}
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// Checkpoint!

"use client"

import { useEffect, useRef, useState } from "react"

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const [typedText, setTypedText] = useState("")
  const sectionRef = useRef<HTMLElement>(null)
  
  const fullText = "a passionate BS Computer Science student with a drive for building meaningful digital experiences."

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2, rootMargin: "0px 0px -80px 0px" }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let index = 0
    let isDeleting = false
    let timeout: NodeJS.Timeout

    const type = () => {
      if (!isDeleting) {
        if (index < fullText.length) {
          setTypedText(fullText.substring(0, index + 1))
          index++
          timeout = setTimeout(type, 50)
        } else {
          timeout = setTimeout(() => {
            isDeleting = true
            type()
          }, 2000)
        }
      } else {
        if (index > 0) {
          setTypedText(fullText.substring(0, index - 1))
          index--
          timeout = setTimeout(type, 30)
        } else {
          isDeleting = false
          timeout = setTimeout(type, 500)
        }
      }
    }

    timeout = setTimeout(type, 1000)
    return () => clearTimeout(timeout)
  }, [isVisible])

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-opacity duration-800 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          {/* Title */}
          <div className="text-center mb-16">
            <h2
              className="text-5xl font-bold text-foreground mb-4 animate-fade-in-down"
              style={{ animationDelay: isVisible ? "0.8s" : "0s" }}
            >
              About Me
            </h2>
            <div
              className="w-24 h-1 bg-primary mx-auto rounded-full animate-scale-in"
              style={{ animationDelay: isVisible ? "1.0s" : "0s" }}
            />
          </div>

          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Profile Picture */}
            <div
              className="lg:col-span-2 flex justify-center animate-slide-in-left"
              style={{ animationDelay: isVisible ? "1.2s" : "0s" }}
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-2xl blur opacity-25 group-hover:opacity-60 transition duration-500" />
                <div className="relative w-full max-w-sm aspect-square bg-muted rounded-2xl overflow-hidden border-4 border-background shadow-2xl">
                  <img
                    src="/marc.jpg"
                    alt="Marc's profile picture"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3 space-y-6">
              <div className="space-y-5">
                {/* === TYPING ANIMATION === */}
                <p className="text-xl font-medium text-foreground leading-relaxed">
                  Hi, I&apos;m <span className="text-primary font-bold">Marc</span> —{" "}
                  <span className="typing-text-infinite">{typedText}</span>
                </p>

                {/* Rest of paragraphs */}
                {[
                  "I love turning ideas into real projects, whether it's web apps, mobile apps, AI experiments, or interactive games.",
                  "I thrive on learning new technologies, solving problems creatively, and pushing the boundaries of what software can do. Every project I work on is an opportunity to grow, innovate, and make an impact.",
                  "When I'm not coding, you'll find me exploring tech trends, tinkering with small side projects, or planning the next big thing to build.",
                  "Let's create something amazing together"
                ].map((text, i) => (
                  <p
                    key={i}
                    className={`
                      leading-relaxed animate-fade-in-up text-muted-foreground
                      ${i === 3 ? "text-xl font-medium text-foreground font-semibold pt-2" : ""}
                    `}
                    style={{ animationDelay: isVisible ? `${2.0 + i * 0.2}s` : "0s" }}
                    dangerouslySetInnerHTML={{ __html: text }}
                  />
                ))}
              </div>

              {/* Interest Tags */}
              <div className="pt-6">
                <h3
                  className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 animate-fade-in-up"
                  style={{ animationDelay: isVisible ? "3.0s" : "0s" }}
                >
                  What I Love Building
                </h3>
                <div className="flex flex-wrap gap-3">
                  {["Web Apps", "Mobile Apps", "AI Projects", "Games", "APIs", "UI/UX"].map((tag, i) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-all duration-300 cursor-default animate-pop-in shadow-sm hover:shadow-md hover:-translate-y-0.5"
                      style={{ animationDelay: isVisible ? `${3.1 + i * 0.1}s` : "0s" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}