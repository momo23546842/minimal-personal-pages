import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { AiAssistant } from "@/components/ai-assistant"
import { About } from "@/components/about"
// Favorites moved to a dedicated /gallery page
import Future from "@/components/future"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { PUBLIC_SAFE_MODE } from "@/lib/safeMode"

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AiAssistant />
        {!PUBLIC_SAFE_MODE && (
          <>
            <About />
            <Future />
            <Contact />
            {/* Gallery moved to /gallery */}
          </>
        )}

        {/* Contact display removed from homepage */}
      </main>
      <Footer />
    </>
  )
}
