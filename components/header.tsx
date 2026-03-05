"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { Menu, X, Sun, Moon, MessageCircle, Phone, Camera } from "lucide-react"
import { PUBLIC_SAFE_MODE } from "@/lib/safeMode"
import { useTheme } from "next-themes"

export function Header() {
  const anchorLinks = PUBLIC_SAFE_MODE
    ? []
    : [
        { label: "About", href: "/#about" },
        { label: "Future", href: "/#future" },
        { label: "Contact", href: "/#contact" },
      ]

  const favoritesLink = PUBLIC_SAFE_MODE ? null : { label: "Favorites", href: "/gallery" }

  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToAssistant = (tab: "chat" | "call") => {
    const el = document.getElementById("assistant")
    const doScroll = () => {
      const target = document.getElementById("assistant")
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("switch-assistant-tab", { detail: tab }))
        }, 400)
      }
    }

    if (el) {
      doScroll()
    } else {
      // If assistant isn't present on the current route, navigate home then scroll
      router.push("/")
      // give Next a moment to render the home content, then attempt to scroll
      setTimeout(doScroll, 600)
    }

    setMobileOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#hero"
          className="text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-primary"
        >
          {PUBLIC_SAFE_MODE ? "AI" : "MK"}
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {/* Left: anchor links */}
          <div className="flex items-center gap-6">
            {anchorLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Favorites pill + Chat/Call buttons */}
          <div className="flex items-center gap-2 ml-4">
            {favoritesLink && (
              <Link
                href={favoritesLink.href}
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
                style={{ backgroundColor: '#E4C7C7', color: '#5A6670' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#D7BABA'; e.currentTarget.style.color = '#5A6670'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#E4C7C7'; e.currentTarget.style.color = '#5A6670'; }}
              >
                <Camera className="h-4 w-4" />
                {favoritesLink.label}
              </Link>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollToAssistant("chat")}
                className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium text-white shadow-sm transition-colors"
                style={{ backgroundColor: '#6F7F89' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#5F6F79')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#6F7F89')}
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Chat
              </button>
              {!PUBLIC_SAFE_MODE && (
                <button
                  onClick={() => scrollToAssistant("call")}
                  className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium text-white shadow-sm transition-colors"
                  style={{ backgroundColor: '#6F7F89' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#5F6F79')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#6F7F89')}
                >
                  <Phone className="h-3.5 w-3.5" />
                  Call
                </button>
              )}
            </div>

            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
              >
                {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            )}
          </div>
        </nav>

        {/* Mobile right-side actions: Favorites → Chat → Call → Theme → Menu */}
        <div className="flex items-center gap-2 md:hidden">
          {/* 1. Favorites pill with text */}
          {favoritesLink && (
            <Link
              href={favoritesLink.href}
              aria-label="Favorites"
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors"
              style={{ backgroundColor: '#E4C7C7', color: '#5A6670' }}
            >
              <Camera className="h-3.5 w-3.5" />
              <span className="whitespace-nowrap">Favorites</span>
            </Link>
          )}

          {/* 2. Chat */}
          <button
            onClick={() => scrollToAssistant("chat")}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white shadow-sm transition-colors"
            style={{ backgroundColor: '#6F7F89' }}
            aria-label="Chat"
          >
            <MessageCircle className="h-4 w-4" />
          </button>

          {/* 3. Call */}
          {!PUBLIC_SAFE_MODE && (
            <button
              onClick={() => scrollToAssistant("call")}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white shadow-sm transition-colors"
              style={{ backgroundColor: '#6F7F89' }}
              aria-label="Call"
            >
              <Phone className="h-4 w-4" />
            </button>
          )}

          {/* 4. Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}

          {/* 5. Hamburger menu */}
          <button
            className="text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-b border-border bg-background/95 backdrop-blur-lg md:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-1 px-6 pb-6">
            {anchorLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}

            {favoritesLink && (
              <Link
                href={favoritesLink.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors"
                style={{ backgroundColor: '#E4C7C7', color: '#5A6670' }}
              >
                <Camera className="h-4 w-4" />
                {favoritesLink.label}
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}
