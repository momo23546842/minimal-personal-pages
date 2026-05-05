"use client"

import { useState } from "react"
import { PUBLIC_SAFE_MODE } from "@/lib/safeMode"
import { Mail, MapPin, Send, Check, Loader2 } from "lucide-react"

export function Contact() {
  if (PUBLIC_SAFE_MODE) return null
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.email || !form.message) return

    setStatus("sending")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Failed")
      setStatus("sent")
      setForm({ name: "", email: "", message: "" })
      setTimeout(() => setStatus("idle"), 5000)
    } catch {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 3000)
    }
  }

  return (
    <section id="contact" className="relative px-6 py-12">
      <div className="relative mx-auto max-w-6xl">
        <h2 
          className="mb-8 text-3xl font-bold tracking-tight md:text-4xl"
          style={{ 
            color: 'var(--scrapbook-forest-dark, #5A6B4F)',
            fontFamily: "var(--font-section, 'M PLUS Rounded 1c', 'Baloo 2', cursive, sans-serif)",
            position: 'relative',
            display: 'inline-block',
            paddingLeft: '2.5rem'
          }}
        >
          <span style={{ position: 'absolute', left: 0, fontSize: '2rem' }}>💌</span>
          {"Let's Connect"}
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <p 
              className="leading-relaxed"
              style={{ color: 'var(--scrapbook-text, #3A3A3A)' }}
            >
              Whether you have a project in mind, want to discuss a
              collaboration, or just want to say hello &mdash; I would love to hear from
              you.
            </p>
            <div className="flex flex-col gap-4">
              <div 
                className="flex items-center gap-3 text-sm"
                style={{ color: 'var(--scrapbook-text-light, #6B6356)' }}
              >
                <div 
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ backgroundColor: 'var(--scrapbook-forest-light, #A6B89A)' }}
                >
                  <MapPin className="h-4 w-4" style={{ color: 'white' }} />
                </div>
                <span>Sydney, Australia</span>
              </div>
              <div 
                className="flex items-center gap-3 text-sm"
                style={{ color: 'var(--scrapbook-text-light, #6B6356)' }}
              >
                <div 
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ backgroundColor: 'var(--scrapbook-forest-light, #A6B89A)' }}
                >
                  <Mail className="h-4 w-4" style={{ color: 'white' }} />
                </div>
                <span>Available via contact form</span>
              </div>
            </div>
          </div>

          <form
            className="flex flex-col gap-4 rounded-lg p-6"
            style={{
              backgroundColor: 'var(--scrapbook-cream, #F8F4ED)',
              border: '2px solid var(--scrapbook-brown, #9B8B7E)',
              boxShadow: '0 6px 18px rgba(58, 58, 58, 0.12)',
              transform: 'rotate(-0.5deg)',
              position: 'relative',
              backgroundImage: `repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                rgba(90, 107, 79, 0.01) 2px,
                rgba(90, 107, 79, 0.01) 4px
              )`
            }}
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-1.5">
              <label 
                htmlFor="name" 
                className="text-xs font-medium uppercase tracking-wide"
                style={{ color: 'var(--scrapbook-text-light, #6B6356)' }}
              >
                Name
              </label>
              <input id="name" type="text" placeholder="Your name" value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="rounded-lg px-4 py-2.5 text-sm focus:outline-none"
                style={{
                  backgroundColor: 'var(--scrapbook-paper, #FAF7F0)',
                  border: '1px solid var(--scrapbook-sand, #E5DCCE)',
                  color: 'var(--scrapbook-text, #3A3A3A)'
                }} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label 
                htmlFor="email" 
                className="text-xs font-medium uppercase tracking-wide"
                style={{ color: 'var(--scrapbook-text-light, #6B6356)' }}
              >
                Email
              </label>
              <input id="email" type="email" placeholder="your@email.com" value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="rounded-lg px-4 py-2.5 text-sm focus:outline-none"
                style={{
                  backgroundColor: 'var(--scrapbook-paper, #FAF7F0)',
                  border: '1px solid var(--scrapbook-sand, #E5DCCE)',
                  color: 'var(--scrapbook-text, #3A3A3A)'
                }} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label 
                htmlFor="message" 
                className="text-xs font-medium uppercase tracking-wide"
                style={{ color: 'var(--scrapbook-text-light, #6B6356)' }}
              >
                Message
              </label>
              <textarea id="message" rows={4} placeholder="Your message..." value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                className="resize-none rounded-lg px-4 py-2.5 text-sm focus:outline-none"
                style={{
                  backgroundColor: 'var(--scrapbook-paper, #FAF7F0)',
                  border: '1px solid var(--scrapbook-sand, #E5DCCE)',
                  color: 'var(--scrapbook-text, #3A3A3A)'
                }} />
            </div>

            {status === "sent" ? (
              <div 
                className="mt-2 flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium"
                style={{
                  backgroundColor: 'rgba(122, 145, 114, 0.15)',
                  color: 'var(--scrapbook-forest-dark, #5A6B4F)'
                }}
              >
                <Check className="h-4 w-4" /> Message sent! I will get back to you soon.
              </div>
            ) : status === "error" ? (
              <div 
                className="mt-2 rounded-lg px-4 py-2.5 text-sm font-medium"
                style={{
                  backgroundColor: 'rgba(155, 139, 126, 0.2)',
                  color: 'var(--scrapbook-brown-dark, #7A6B5D)'
                }}
              >
                Failed to send. Please try again.
              </div>
            ) : (
              <button type="submit" disabled={status === "sending" || !form.email || !form.message}
                className="mt-2 flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all disabled:opacity-40"
                style={{ backgroundColor: 'var(--scrapbook-forest, #7A9172)' }}
                onMouseEnter={(e) => { if (!(e.currentTarget as HTMLButtonElement).disabled) e.currentTarget.style.backgroundColor = 'var(--scrapbook-forest-dark, #5A6B4F)' }}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--scrapbook-forest, #7A9172)')}>
                {status === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</> : <><Send className="h-4 w-4" /> Send Message</>}
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
