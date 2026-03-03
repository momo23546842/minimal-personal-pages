"use client"

import { ArrowDown } from "lucide-react"
import { PUBLIC_SAFE_MODE } from "@/lib/safeMode"

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[60vh] items-center justify-center px-6 pt-24 sm:pt-28 md:pt-6"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col-reverse items-center gap-8 md:flex-row md:gap-16">
        <div className="flex-1 text-center md:text-left">
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
            <span className="text-balance">Momo</span>
          </h1>
          <p className="mx-auto mb-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:mx-0">
            Hi, I'm Momo. Just talk to me. (Personal details are off limits 😉)
          </p>
          <a
            href="#assistant"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 hover:brightness-110"
          >
            Open Assistant
          </a>
        </div>
        <div className="flex shrink-0 items-center justify-center">
          <div className="h-44 w-44 flex items-center justify-center overflow-hidden rounded-full border-4 border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 md:h-56 md:w-56">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
              <circle cx="12" cy="8" r="3.5" fill="#a7f3d0" />
              <path d="M4 20c0-3.3 4-5 8-5s8 1.7 8 5" stroke="#7dd3c6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#assistant" aria-label="Scroll to content">
          <ArrowDown className="h-5 w-5 text-muted-foreground" />
        </a>
      </div>
    </section>
  )
}
