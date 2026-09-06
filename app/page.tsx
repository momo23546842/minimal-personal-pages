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
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" width="18" height="18" aria-hidden="true">
          <g>
            <path stroke="#5A3A2E" strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5v2c0 0.2652 -0.1054 0.5196 -0.2929 0.7071s-0.4419 0.2929 -0.7071 0.2929h-2" strokeWidth="1" />
            <path stroke="#5A3A2E" strokeLinecap="round" strokeLinejoin="round" d="M10.5 0.5h2c0.2652 0 0.5196 0.105357 0.7071 0.292893 0.1875 0.187537 0.2929 0.441887 0.2929 0.707107v2" strokeWidth="1" />
            <path stroke="#5A3A2E" strokeLinecap="round" strokeLinejoin="round" d="M0.5 3.5v-2c0 -0.26522 0.105357 -0.51957 0.292893 -0.707107C0.98043 0.605357 1.23478 0.5 1.5 0.5h2" strokeWidth="1" />
            <path stroke="#5A3A2E" strokeLinecap="round" strokeLinejoin="round" d="M3.5 13.5h-2c-0.26522 0 -0.51957 -0.1054 -0.707107 -0.2929C0.605357 13.0196 0.5 12.7652 0.5 12.5v-2" strokeWidth="1" />
            <path stroke="#5A3A2E" strokeLinecap="round" strokeLinejoin="round" d="M6.99975 6.49998c1.10456 0 1.99999 -0.89543 1.99999 -1.99999S8.10431 2.5 6.99975 2.5c-1.10457 0 -1.99999 0.89543 -1.99999 1.99999s0.89542 1.99999 1.99999 1.99999Z" strokeWidth="1" />
            <path stroke="#5A3A2E" strokeLinecap="round" strokeLinejoin="round" d="M10.8034 11.0001c-0.2584 -0.8057 -0.7659 -1.50842 -1.44938 -2.00701 -0.68349 -0.4986 -1.50767 -0.76726 -2.3537 -0.76726 -0.84603 0 -1.6702 0.26866 -2.3537 0.76726 -0.6835 0.49859 -1.191 1.20131 -1.44935 2.00701h7.60613Z" strokeWidth="1" />
          </g>
        </svg>
      ),
    },
    {
      id: "journey",
      label: "Journey",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="18" height="18" aria-hidden="true">
          <path d="M8 0.16c-6.0352375 0 -9.80725625 6.53333125 -6.7896375 11.76 3.0176125 5.22666875 10.56165625 5.22666875 13.579275 0C15.47774375 10.72816875 15.84 9.37620625 15.84 8 15.83543125 3.67198125 12.32801875 0.164575 8 0.16ZM14.63384375 8c0.0006625 0.851075 -0.1631625 1.69425625 -0.48245625 2.48316875l-3.36969375 -2.072325c-0.143275 -0.08840625 -0.30354375 -0.14568125 -0.4704 -0.16810625l-1.72028125 -0.23218125c-0.48465 -0.0632 -0.9599625 0.1703 -1.20615 0.59251875h-0.65735625l-0.2864625 -0.59251875c-0.1604875 -0.33435625 -0.46663125 -0.57565 -0.829225 -0.6535875l-0.60308125 -0.1304125 0.58950625 -1.0357875h1.25968125c0.20383125 -0.0004 0.40426875 -0.05225625 0.58271875 -0.15076875l0.9234625 -0.5096c0.08113125 -0.045225 0.15698125 -0.09933125 0.22615625 -0.161325l2.0286 -1.8348625c0.4189625 -0.3754625 0.52110625 -0.9914625 0.24575 -1.48205625l-0.0271375 -0.049C13.154375 3.10175 14.632 5.4358375 14.63384375 8ZM9.1541375 1.46716875l0.65509375 1.1729875 -2.0286 1.83485625 -0.92270625 0.5096H5.59824375c-0.43155 -0.00063125 -0.8305625 0.22934375 -1.0463375 0.60308125l-0.65810625 1.14810625 -0.76515625 -2.0384 0.8247125 -1.9502c1.4760625 -1.14050625 3.3645875 -1.6058 5.2015375 -1.2815375ZM1.36615625 8c-0.0010125 -0.98601875 0.218975 -1.959725 0.64378125 -2.8495375l0.8548625 2.28189375c0.1447625 0.3839125 0.4747625 0.6679125 0.87596875 0.75384375l1.61549375 0.347525 0.2872125 0.59704375c0.20333125 0.41423125 0.6241 0.67720625 1.0855375 0.6784625h0.111575l-0.54503125 1.22349375c-0.1962875 0.4403375 -0.11150625 0.9552625 0.2156 1.30943125l0.01055 0.01055L8 13.875475l-0.14624375 0.75385C4.25086875 14.54548125 1.37213125 11.60385625 1.36615625 8Zm7.73295 6.541875 0.0851875 -0.43798125c0.07099375 -0.377325 -0.04085 -0.765975 -0.30154375 -1.04785 -0.0037 -0.003325 -0.007225 -0.00685 -0.01055 -0.01055l-1.475275 -1.52201875 1.03276875 -2.31731875 1.720275 0.23218125 3.4465875 2.11981875c-1.009775 1.5858 -2.643825 2.669875 -4.49745 2.98371875Z" />
        </svg>
      ),
    },
    {
      id: "future",
      label: "Future",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="18" height="18" aria-hidden="true">
          <path d="M8 0.16c-3.400475 0.00385625 -6.15614375 2.759525 -6.16 6.16 0 1.6401 0.658 3.4594 1.7591 4.865 0.8456 1.0787 1.855 1.82 2.9337 2.1763L5.8055 15.0595c-0.1582375 0.3694125 0.112625 0.7803125 0.5145 0.7805h3.36c0.401875 -0.0001875 0.6727375 -0.4110875 0.5145 -0.7805l-0.7245 -1.6982c1.078 -0.3549 2.0881 -1.0976 2.9337 -2.1763 1.0983 -1.4056 1.7563 -3.2249 1.7563 -4.865 -0.00385625 -3.400475 -2.759525 -6.15614375 -6.16 -6.16Zm0.8309 14.56h-1.6618l0.4858 -1.1333c0.1148 0.0084 0.2296 0.0133 0.3451 0.0133s0.2303 -0.0049 0.3451 -0.0133Zm2.688 -4.2259C10.5158 11.7751 9.2663 12.48 8 12.48s-2.5158 -0.7049 -3.5189 -1.9859C3.5284 9.2789 2.96 7.72 2.96 6.32c0 -3.87979375 4.2 -6.3046625 7.56 -4.36476875 1.55938125 0.9003125 2.52 2.56415 2.52 4.36476875 0 1.4 -0.5684 2.9589 -1.5211 4.1741Zm-0.07 -4.1818c-0.0294 0.00478125 -0.05911875 0.00735625 -0.0889 0.0077 -0.27335 -0.00035625 -0.5065 -0.198 -0.5516 -0.4676 -0.21208125 -1.19360625 -1.14649375 -2.12801875 -2.3401 -2.3401 -0.42581875 -0.0671875 -0.619225 -0.57014375 -0.348125 -0.90531875 0.12815 -0.15844375 0.33225625 -0.23476875 0.532925 -0.19928125 1.66295625 0.29506875 2.96483125 1.59694375 3.2599 3.2599 0.05099375 0.30525625 -0.15529375 0.59399375 -0.4606 0.6447Z" />
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

