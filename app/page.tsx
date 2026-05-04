"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { ProfileHeader } from "@/components/profile-header"
import { NotebookTabs } from "@/components/notebook-tabs"
import { AiAssistant } from "@/components/ai-assistant"
import { About } from "@/components/about"
import Future from "@/components/future"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { PUBLIC_SAFE_MODE } from "@/lib/safeMode"
import Image from "next/image"

const VALID_TABS = ["about", "journey", "future", "contact"]

function tabFromHash(hash: string): string {
  const id = hash.replace("#", "")
  return VALID_TABS.includes(id) ? id : "about"
}

export default function Page() {
  const [activeTab, setActiveTab] = useState("about")

  // Sync activeTab with URL hash — works on initial load and when the
  // user navigates from another page (e.g. /gallery → /#journey).
  useEffect(() => {
    const activateTab = (tabId: string) => {
      setActiveTab(tabId)
      setTimeout(() => {
        const el = document.getElementById("notebook")
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 50)
    }

    // Handle browser hash changes (back/forward, cross-page navigation)
    const syncHash = () => {
      const tab = tabFromHash(window.location.hash)
      if (VALID_TABS.includes(tab)) activateTab(tab)
    }

    // Handle same-page header clicks via custom event
    const onSwitchTab = (e: Event) => {
      const tabId = (e as CustomEvent<string>).detail
      if (VALID_TABS.includes(tabId)) {
        history.replaceState(null, "", `#${tabId}`)
        activateTab(tabId)
      }
    }

    syncHash() // read current hash on mount
    window.addEventListener("hashchange", syncHash)
    window.addEventListener("switch-tab", onSwitchTab)
    return () => {
      window.removeEventListener("hashchange", syncHash)
      window.removeEventListener("switch-tab", onSwitchTab)
    }
  }, [])

  // Also update the URL hash whenever the tab changes via the notebook UI,
  // so the back button and header links stay in sync.
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    history.replaceState(null, "", `#${tabId}`)
  }

  const tabs = [
    { id: "about", label: "About", icon: "✨" },
    { id: "journey", label: "Journey", icon: "📸" },
    { id: "future", label: "Future", icon: "🌟" },
    { id: "contact", label: "Contact", icon: "💌" },
  ]

  // Journey content - photo gallery
  const journeyPhotos = [
    { alt: "Sydney, Australia", src: "/images/Australia/operahouseandhabourbridge-sydney.jpg" },
    { alt: "Kumamoto, Japan", src: "/images/Japan/kumamotojyo.jpg" },
    { alt: "Korankei, Aichi", src: "/images/Japan/korankei-aichi.jpg" },
    { alt: "Art Gallery, Sydney", src: "/images/Australia/Art-Gallery-sydney.jpg" },
    { alt: "Enoshima, Japan", src: "/images/Japan/enoshima.jpg" },
    { alt: "Quokka, Perth", src: "/images/Australia/quokka-perth.jpg" },
    { alt: "Parasailing, Cebu", src: "/images/Philippines/Parasailing-cebu.jpg" },
    { alt: "Blue Mountains", src: "/images/Australia/bluemountain-sydney.jpg" },
    { alt: "Bondi, Australia", src: "/images/Australia/sculpturebythesea-bondi.jpg" },
    { alt: "Miyazaki, Japan", src: "/images/Japan/miyazaki-moai.jpg" },
  ]

  return (
    <>
      <Header />
      <main style={{ backgroundColor: 'transparent' }}>
        {/* Profile Section */}
        <ProfileHeader />

        {/* Tabbed Content Section */}
        <div id="notebook" style={{ padding: '2rem 0 4rem' }}>
          {!PUBLIC_SAFE_MODE && (
            <NotebookTabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange}>
              {/* Tab Content */}
              {activeTab === "about" && <About />}
              {activeTab === "journey" && (
                <div style={{ padding: '1rem 0' }}>
                  <h2 style={{ 
                    fontFamily: "var(--font-baloo, 'Baloo 2', cursive, sans-serif)",
                    fontSize: 'clamp(1.75rem, 6vw, 2.5rem)',
                    color: 'var(--scrapbook-forest-dark, #5A6B4F)',
                    marginBottom: '1rem',
                    transform: 'rotate(-1deg)',
                    display: 'inline-block',
                    position: 'relative'
                  }}>
                    My Journey 📸✨
                  </h2>
                  <p style={{ 
                    marginBottom: '1.5rem', 
                    color: 'var(--scrapbook-text, #3A3A3A)', 
                    lineHeight: 1.7,
                    fontSize: 'clamp(0.9rem, 2.5vw, 1rem)'
                  }}>
                    Here are some snapshots from my adventures around the world!
                  </p>
                  

                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: '2rem',
                    position: 'relative'
                  }} className="journey-grid">
                    {journeyPhotos.map((photo, idx) => (
                      <div
                        key={photo.alt}
                        style={{
                          position: 'relative',
                          background: '#FFFFFF',
                          padding: '12px 12px 35px',
                          borderRadius: '4px',
                          boxShadow: '0 8px 24px rgba(58, 58, 58, 0.15), 0 4px 12px rgba(58, 58, 58, 0.1)',
                          transform: `rotate(${idx % 3 === 0 ? '-3' : idx % 3 === 1 ? '2' : '-1'}deg)`,
                          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = `scale(1.05) rotate(0deg)`
                          e.currentTarget.style.boxShadow = '0 12px 32px rgba(58, 58, 58, 0.25), 0 6px 16px rgba(58, 58, 58, 0.18)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = `rotate(${idx % 3 === 0 ? '-3' : idx % 3 === 1 ? '2' : '-1'}deg)`
                          e.currentTarget.style.boxShadow = '0 8px 24px rgba(58, 58, 58, 0.15), 0 4px 12px rgba(58, 58, 58, 0.1)'
                        }}
                      >
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          width={280}
                          height={280}
                          sizes="(max-width: 768px) 50vw, 25vw"
                          style={{ 
                            objectFit: 'cover',
                            width: '100%',
                            height: 'auto',
                            aspectRatio: '1 / 1',
                            borderRadius: '2px'
                          }}
                        />
                        {/* Polaroid caption area */}
                        <div style={{
                          position: 'absolute',
                          bottom: '8px',
                          left: '12px',
                          right: '12px',
                          textAlign: 'center',
                          fontSize: '0.75rem',
                          color: 'var(--scrapbook-text-light, #6B6356)',
                          fontWeight: 500
                        }}>
                          {photo.alt}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === "future" && <Future />}
              {activeTab === "contact" && <Contact />}
            </NotebookTabs>
          )}
        </div>

        {/* AI Assistant Section (outside tabs) */}
        <AiAssistant />
      </main>
      <Footer />
    </>
  )
}

