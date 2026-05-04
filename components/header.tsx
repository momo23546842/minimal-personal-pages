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
        { label: "Journey", href: "/#journey" },
        { label: "Future", href: "/#future" },
        { label: "Contact", href: "/#contact" },
      ]

  const favoritesLink = PUBLIC_SAFE_MODE ? null : { label: "Favorites", href: "/gallery" }

  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  // Navigate to a tab: fires a custom event when already on home page
  // (avoids hashchange reliability issues), router.push from other pages.
  const navigateToTab = (tabId: string) => {
    setMobileOpen(false)
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      window.dispatchEvent(new CustomEvent("switch-tab", { detail: tabId }))
    } else {
      router.push(`/#${tabId}`)
    }
  }

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
        scrolled ? "backdrop-blur-lg border-b" : ""
      }`}
      style={{
        backgroundColor: scrolled ? 'rgba(245, 241, 232, 0.95)' : 'transparent',
        borderBottomColor: scrolled ? 'var(--scrapbook-sand, #E5DCCE)' : 'transparent'
      }}
    >
      <div className="mx-auto flex max-w-330 items-center justify-between px-8 py-4">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight transition-colors"
          style={{
            color: 'var(--scrapbook-forest-dark, #5A6B4F)',
            fontFamily: "var(--font-baloo, 'Baloo 2', cursive, sans-serif)"
          }}
        >
          {PUBLIC_SAFE_MODE ? "AI" : "Momo's Page"}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {/* Left: anchor links */}
          <div className="flex items-center gap-6">
            {anchorLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => navigateToTab(link.href.replace("/#", ""))}
                className="text-sm font-medium transition-colors bg-transparent border-none cursor-pointer p-0"
                style={{ color: 'var(--scrapbook-text-light, #6B6356)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--scrapbook-forest-dark, #5A6B4F)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--scrapbook-text-light, #6B6356)' }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right: Favorites pill + Chat/Call buttons */}
          <div className="flex items-center gap-2 ml-4">
            {favoritesLink && (
              <Link
                href={favoritesLink.href}
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all"
                style={{ 
                  backgroundColor: 'var(--scrapbook-tab-cream, #E8E0D5)', 
                  color: 'var(--scrapbook-text, #3A3A3A)',
                  border: '1px solid var(--scrapbook-sand, #E5DCCE)',
                  boxShadow: '0 2px 6px rgba(58, 58, 58, 0.08)'
                }}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.backgroundColor = 'var(--scrapbook-sand, #E5DCCE)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                  e.currentTarget.style.boxShadow = '0 4px 10px rgba(58, 58, 58, 0.12)'
                }}
                onMouseLeave={(e) => { 
                  e.currentTarget.style.backgroundColor = 'var(--scrapbook-tab-cream, #E8E0D5)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 2px 6px rgba(58, 58, 58, 0.08)'
                }}
              >
                <Camera className="h-4 w-4" />
                {favoritesLink.label}
              </Link>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollToAssistant("chat")}
                className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium text-white shadow-sm transition-all"
                style={{ 
                  backgroundColor: 'var(--scrapbook-forest, #7A9172)',
                  boxShadow: '0 2px 6px rgba(122, 145, 114, 0.3)'
                }}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.backgroundColor = 'var(--scrapbook-forest-dark, #5A6B4F)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                  e.currentTarget.style.boxShadow = '0 4px 10px rgba(122, 145, 114, 0.4)'
                }}
                onMouseLeave={(e) => { 
                  e.currentTarget.style.backgroundColor = 'var(--scrapbook-forest, #7A9172)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 2px 6px rgba(122, 145, 114, 0.3)'
                }}
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Chat
              </button>
              {!PUBLIC_SAFE_MODE && (
                <button
                  onClick={() => scrollToAssistant("call")}
                  className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium text-white shadow-sm transition-all"
                  style={{ 
                    backgroundColor: 'var(--scrapbook-leaf, #8FA582)',
                    boxShadow: '0 2px 6px rgba(143, 165, 130, 0.3)'
                  }}
                  onMouseEnter={(e) => { 
                    e.currentTarget.style.backgroundColor = 'var(--scrapbook-forest, #7A9172)'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                    e.currentTarget.style.boxShadow = '0 4px 10px rgba(143, 165, 130, 0.4)'
                  }}
                  onMouseLeave={(e) => { 
                    e.currentTarget.style.backgroundColor = 'var(--scrapbook-leaf, #8FA582)'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 2px 6px rgba(143, 165, 130, 0.3)'
                  }}
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
                className="flex h-8 w-8 items-center justify-center rounded-full transition-all"
                style={{
                  backgroundColor: 'var(--scrapbook-cream, #F8F4ED)',
                  color: 'var(--scrapbook-forest-dark, #5A6B4F)',
                  border: '1px solid var(--scrapbook-sand, #E5DCCE)'
                }}
                aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--scrapbook-sand, #E5DCCE)' }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--scrapbook-cream, #F8F4ED)' }}
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
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all"
              style={{ 
                backgroundColor: 'var(--scrapbook-tab-cream, #E8E0D5)', 
                color: 'var(--scrapbook-text, #3A3A3A)',
                border: '1px solid var(--scrapbook-sand, #E5DCCE)'
              }}
            >
              <Camera className="h-3.5 w-3.5" />
              <span className="mobile-fav-text whitespace-nowrap">Favorites</span>
            </Link>
          )}

          {/* 2. Chat */}
          <button
            onClick={() => scrollToAssistant("chat")}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white shadow-sm transition-colors"
            style={{ backgroundColor: 'var(--scrapbook-forest, #7A9172)' }}
            aria-label="Chat"
          >
            <MessageCircle className="h-4 w-4" />
          </button>

          {/* 3. Call */}
          {!PUBLIC_SAFE_MODE && (
            <button
              onClick={() => scrollToAssistant("call")}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white shadow-sm transition-colors"
              style={{ backgroundColor: 'var(--scrapbook-leaf, #8FA582)' }}
              aria-label="Call"
            >
              <Phone className="h-4 w-4" />
            </button>
          )}

          {/* 4. Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors"
              style={{
                backgroundColor: 'var(--scrapbook-cream, #F8F4ED)',
                color: 'var(--scrapbook-forest-dark, #5A6B4F)',
                border: '1px solid var(--scrapbook-sand, #E5DCCE)'
              }}
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}

          {/* 5. Hamburger menu */}
          <button
            className="transition-colors"
            style={{ color: 'var(--scrapbook-forest-dark, #5A6B4F)' }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav 
          className="md:hidden" 
          aria-label="Mobile navigation"
          style={{
            backgroundColor: 'rgba(245, 241, 232, 0.98)',
            backdropFilter: 'blur(12px)',
            borderBottom: '2px solid var(--scrapbook-sand, #E5DCCE)'
          }}
        >
          <div className="flex flex-col gap-1 px-6 pb-6">
            {anchorLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => navigateToTab(link.href.replace("/#", ""))}
                className="rounded-md px-3 py-2 text-sm font-medium transition-colors bg-transparent border-none cursor-pointer w-full text-left"
                style={{ color: 'var(--scrapbook-text-light, #6B6356)' }}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.backgroundColor = 'var(--scrapbook-cream, #F8F4ED)'
                  e.currentTarget.style.color = 'var(--scrapbook-forest-dark, #5A6B4F)'
                }}
                onMouseLeave={(e) => { 
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = 'var(--scrapbook-text-light, #6B6356)'
                }}
              >
                {link.label}
              </button>
            ))}

            {favoritesLink && (
              <Link
                href={favoritesLink.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors"
                style={{ 
                  backgroundColor: 'var(--scrapbook-tab-cream, #E8E0D5)', 
                  color: 'var(--scrapbook-text, #3A3A3A)',
                  border: '1px solid var(--scrapbook-sand, #E5DCCE)'
                }}
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
