import React from 'react'

const items = [
  { text: 'Visit Melbourne', done: false },
  { text: 'Ride in a hot air balloon', done: false },
  { text: 'Travel to South Korea', done: false },
  { text: 'Visit Tasmania', done: false },
  { text: 'See Uluru', done: false },
  { text: 'Travel to New Zealand', done: false },
  { text: 'Watch the stars in a place with a beautiful night sky', done: false },
  { text: 'Finish reading a full book in English', done: false },
  { text: 'Travel to all 47 prefectures of Japan', done: false },
]

export default function Future() {
  return (
    <section id="future" className="px-6 py-20" style={{ backgroundColor: 'var(--color-off-white-alt)' }}>
      <div className="mx-auto max-w-4xl">
        <p className="mb-2 text-center text-sm font-medium uppercase tracking-widest" style={{ color: 'var(--color-heading)' }}>Future</p>
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">Bucket List</h2>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-md shadow-foreground/5">
          <ul className="space-y-3">
            {items.map((it, i) => (
              <li key={i} className="flex items-start gap-3">
                {/* colorful dot: cycle through palette */}
                {(() => {
                  const palette = ['--color-pink','--color-green','--color-blue','--color-yellow']
                  const varName = palette[i % palette.length]
                  const color = `var(${varName})`
                  return (
                    <div className="mt-1 h-4 w-4 shrink-0 rounded-full flex items-center justify-center">
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '9999px',
                          backgroundColor: color,
                          opacity: it.done ? 1 : 0.18,
                          border: it.done ? 'none' : `2px solid ${color}`,
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                  )
                })()}
                <div>
                  <p className="text-sm font-medium text-foreground">{it.text}</p>
                  <p className="text-xs text-muted-foreground">{it.done ? 'Done' : 'Planned'}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
