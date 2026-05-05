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
import { Journey } from "@/components/journey"
import { PUBLIC_SAFE_MODE } from "@/lib/safeMode"

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
    {
      id: "about",
      label: "About",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#5A3A2E">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      ),
    },
    {
      id: "journey",
      label: "Journey",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#5A3A2E">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      ),
    },
    {
      id: "future",
      label: "Future",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#5A3A2E">
          <path d="M11.5 2C6.81 2 3 5.81 3 10.5S6.81 19 11.5 19h.5v3c4.86-2.34 8-7 8-11.5C20 5.81 16.19 2 11.5 2zm1 14.5h-2v-2h2v2zm0-4h-2c0-3.25 3-3 3-5 0-1.1-.9-2-2-2s-2 .9-2 2h-2c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.5-3 2.75-3 5z"/>
        </svg>
      ),
    },
    {
      id: "contact",
      label: "Contact",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#5A3A2E">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
    },
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
              {activeTab === "journey" && <Journey />}
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

