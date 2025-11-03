"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Mail, Linkedin, Github, Twitter, Send, CheckCircle } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitted(true)
    setIsSubmitting(false)

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" })
      setIsSubmitted(false)
    }, 3000)
  }

  return (
    <section id="contact" className="py-20 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -ml-48 -mb-48 pointer-events-none" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <h2 className="text-4xl font-bold text-foreground mb-4 text-center animate-fade-in-down">Get In Touch</h2>
          <p
            className="text-lg text-muted-foreground text-center mb-12 animate-fade-in-down"
            style={{ animationDelay: "0.1s" }}
          >
            Have a project in mind? Let's collaborate and create something amazing together.
          </p>

          <div className="space-y-12">
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-down" style={{ animationDelay: "0.2s" }}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitted}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 disabled:opacity-50"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitted}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 disabled:opacity-50"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitted}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none disabled:opacity-50"
                  placeholder="Your message here..."
                  required
                />
              </div>

              {isSubmitted && (
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3 animate-fade-in-down">
                  <CheckCircle className="text-green-500" size={20} />
                  <p className="text-green-600 font-medium">Message sent successfully! I'll get back to you soon.</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>

            {/* Social Links */}
            <div className="space-y-6 animate-fade-in-down" style={{ animationDelay: "0.3s" }}>
              <div className="text-center">
                <p className="text-muted-foreground mb-6">Or connect with me on social media</p>
                <div className="flex justify-center gap-4">
                  {[
                    { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
                    { icon: Linkedin, href: "#", label: "LinkedIn" },
                    { icon: Github, href: "#", label: "GitHub" },
                    { icon: Twitter, href: "#", label: "Twitter" },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="p-3 rounded-lg bg-background border border-border text-muted-foreground hover:border-primary/50 hover:text-primary transition-all hover:scale-110 hover:shadow-lg hover:shadow-primary/10"
                      aria-label={social.label}
                    >
                      <social.icon size={20} />
                    </a>
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
