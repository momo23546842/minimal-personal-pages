import { PUBLIC_SAFE_MODE } from "@/lib/safeMode"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/60 px-6 py-8">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-xs text-muted-foreground">© 2026 Momo</p>
        {!PUBLIC_SAFE_MODE && (
          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              GitHub
            </a>
          </div>
        )}
      </div>
    </footer>
  )
}
