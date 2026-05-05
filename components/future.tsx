import React from 'react'

const items = [
  { text: 'Visit Melbourne', done: false },
  { text: 'Ride in a hot air balloon', done: false },
  { text: 'Travel to South Korea', done: false },
  { text: 'Visit Tasmania', done: false },
  { text: 'See Uluru', done: false },
  { text: 'Travel to New Zealand', done: false },
  { text: 'Watch the stars in a place with a beautiful night sky', done: true },
  { text: 'Finish reading a full book in English', done: false },
  { text: 'Travel to all 47 prefectures of Japan', done: false },
]

export default function Future() {
  return (
    <section id="future" className="px-6 py-6" style={{ backgroundColor: 'transparent' }}>
      <div className="mx-auto max-w-6xl">
        <h2 
          className="mb-6 text-2xl font-bold tracking-tight md:text-3xl"
          style={{
            fontFamily: "var(--font-section, 'M PLUS Rounded 1c', 'Baloo 2', cursive, sans-serif)",
            color: 'var(--scrapbook-forest-dark, #5A6B4F)',
            position: 'relative',
            display: 'inline-block',
            paddingLeft: '2.5rem'
          }}
        >
          <span style={{ position: 'absolute', left: 0, fontSize: '1.8rem' }}>🌟</span>
          Bucket List
        </h2>

        <div 
          className="rounded-2xl p-6 shadow-md"
          style={{
            backgroundColor: 'var(--scrapbook-cream, #F8F4ED)',
            border: '2px solid var(--scrapbook-brown, #9B8B7E)',
            boxShadow: '0 6px 18px rgba(58, 58, 58, 0.12)',
            transform: 'rotate(0.5deg)',
            position: 'relative',
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(90, 107, 79, 0.01) 2px,
              rgba(90, 107, 79, 0.01) 4px
            )`
          }}
        >
          <ul className="space-y-3">
            {items.map((it, i) => (
              <li key={i} className="flex items-start gap-3">
                {/* Nature-themed colorful dots */}
                {(() => {
                  const palette = [
                    'var(--scrapbook-forest, #7A9172)',
                    'var(--scrapbook-leaf, #8FA582)',
                    'var(--scrapbook-brown, #9B8B7E)',
                    'var(--scrapbook-forest-light, #A6B89A)'
                  ]
                  const color = palette[i % palette.length]
                  return (
                    <div className="mt-1 h-4 w-4 shrink-0 rounded-full flex items-center justify-center">
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '9999px',
                          backgroundColor: it.done ? color : 'transparent',
                          opacity: it.done ? 1 : 0.9,
                          border: `2px solid ${color}`,
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                  )
                })()}
                <div>
                  <p 
                    className="text-sm font-medium"
                    style={{ color: 'var(--scrapbook-text, #3A3A3A)' }}
                  >
                    {it.text}
                  </p>
                  <p 
                    className="text-xs"
                    style={{ color: 'var(--scrapbook-text-light, #6B6356)' }}
                  >
                    {it.done ? 'Done' : 'Planned'}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
