"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

type Props = {
  children: React.ReactNode
}

export default function ThemeProvider({ children }: Props) {
  // Add client-side smooth scrolling for hash navigation across routes.
  // This ensures visiting "/#about" from another page smoothly scrolls to the section.
  React.useEffect(() => {
    const scrollToHash = () => {
      try {
        const hash = window.location.hash
        if (hash) {
          const id = hash.replace('#', '')
          const el = document.getElementById(id)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
          }
        }
      } catch (e) {
        // ignore
      }
    }

    // run on mount (after navigation)
    scrollToHash()
    window.addEventListener('hashchange', scrollToHash)
    return () => window.removeEventListener('hashchange', scrollToHash)
  }, [])

  return (
    <NextThemesProvider
      attribute="class"
      enableSystem={false}
      defaultTheme="dark"
      storageKey="theme"
    >
      {children}
    </NextThemesProvider>
  )
}
