"use client"

import { useState } from "react"
import { FavoritesGrid, food, places } from "@/components/favorites"
import Link from "next/link"

export default function GalleryPage() {
  const [tab, setTab] = useState<'all'|'food'|'places'>('all')

  const items = tab === 'all' ? [...food, ...places] : tab === 'food' ? food : places

  return (
    <main className="px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Gallery</h1>
            <p className="text-sm text-muted-foreground">A small collection of favorites.</p>
          </div>
          <div className="hidden sm:block">
            <Link href="/" className="text-sm text-primary">Back home</Link>
          </div>
        </div>

        <div className="mb-6 flex gap-2">
          <button onClick={() => setTab('all')} className={`px-3 py-1 rounded-md ${tab==='all' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>All</button>
          <button onClick={() => setTab('food')} className={`px-3 py-1 rounded-md ${tab==='food' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>Food</button>
          <button onClick={() => setTab('places')} className={`px-3 py-1 rounded-md ${tab==='places' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>Places</button>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, idx) => (
            <div key={idx} className="group rounded-xl border border-border bg-card p-4 shadow-sm">
              <div className="h-40 mb-3 w-full rounded-md bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center text-4xl text-muted-foreground">
                🍽️
              </div>
              <h4 className="mb-1 text-sm font-semibold text-foreground">{it.title}</h4>
              {it.caption && <p className="text-xs text-muted-foreground mb-2">{it.caption}</p>}
              {it.tags && (
                <div className="flex flex-wrap gap-2">
                  {it.tags.map((t) => (
                    <span key={t} className="text-xs text-muted-foreground">#{t}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
