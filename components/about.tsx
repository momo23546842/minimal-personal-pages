import { PUBLIC_SAFE_MODE } from "@/lib/safeMode"

export function About() {
  if (PUBLIC_SAFE_MODE) return null

  return (
    <section id="about" className="px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <p className="mb-2 text-center text-sm font-medium uppercase tracking-widest text-primary">About</p>
        <div className="prose mx-auto text-center text-foreground/90">
          <p>About this page</p>

          <p>
            This is a small space where I keep the things I like.
          </p>

          <p>
            Food I enjoy,
            places I’ve been,
            places I want to go someday.
          </p>

          <p>
            And a chat where you can just talk to me.
          </p>

          <p>
            There’s nothing particularly special here,
            but somehow,
            it feels like me.
          </p>
        </div>
      </div>
    </section>
  )
}
