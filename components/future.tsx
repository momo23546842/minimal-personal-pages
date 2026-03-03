import React from 'react'

const items = [
  { text: 'Ride a hot air balloon', done: false },
  { text: 'See the aurora in Finland', done: false },
  { text: 'Visit Korea', done: true },
  { text: 'Travel to more countries', done: false },
  { text: 'Explore more quiet nature places', done: true },
  { text: 'Build something meaningful', done: false },
]

export default function Future() {
  return (
    <section id="future" className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <p className="mb-2 text-center text-sm font-medium uppercase tracking-widest text-primary">Future</p>
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">Bucket List</h2>

        <div className="rounded-2xl border border-border bg-card p-6">
          <ul className="space-y-3">
            {items.map((it, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className={`mt-1 h-4 w-4 shrink-0 rounded-full ${it.done ? 'bg-primary' : 'border border-border bg-background'}`} />
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
