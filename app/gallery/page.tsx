"use client"

import { useState } from "react"
import { FavoritesGrid, food, japan, australia, philippines, cafe } from "@/components/favorites"
import Link from "next/link"

export default function GalleryPage() {
  const [tab, setTab] = useState<'all'|'food'|'japan'|'australia'|'philippines'|'cafe'>('all')

  const items =
    tab === 'all' ? [...food, ...japan, ...australia, ...philippines, ...cafe]
    : tab === 'food' ? food
    : tab === 'japan' ? japan
    : tab === 'australia' ? australia
    : tab === 'philippines' ? philippines
    : cafe

  return (
    <main className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}>Gallery</h1>
            <p className="text-sm text-muted-foreground">A small collection of favorites.</p>
          </div>
          <div className="hidden sm:block">
            <Link href="/" className="text-sm text-primary">Back home</Link>
          </div>
        </div>

        <div className="mb-6 flex gap-2">
          <button onClick={() => setTab('all')} className={`px-3 py-1 rounded-md ${tab==='all' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>All</button>
          <button onClick={() => setTab('food')} className={`px-3 py-1 rounded-md ${tab==='food' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>Food</button>
          <button onClick={() => setTab('japan')} className={`px-3 py-1 rounded-md ${tab==='japan' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>Japan</button>
          <button onClick={() => setTab('australia')} className={`px-3 py-1 rounded-md ${tab==='australia' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>Australia</button>
          <button onClick={() => setTab('philippines')} className={`px-3 py-1 rounded-md ${tab==='philippines' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>Philippines</button>
          <button onClick={() => setTab('cafe')} className={`px-3 py-1 rounded-md ${tab==='cafe' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>Cafe</button>
        </div>

        {tab === 'all' ? (
          <>
            {/* Food section */}
            <h2 className="mb-3 text-lg font-semibold text-foreground">Food</h2>
            <FavoritesGrid items={food} />

            {/* Divider */}
            <hr className="my-10 border-t border-border" />

            {/* Japan section */}
            <h2 className="mb-3 text-lg font-semibold text-foreground">Japan</h2>
            <FavoritesGrid items={japan} />

            {/* Divider */}
            <hr className="my-10 border-t border-border" />

            {/* Australia section */}
            <h2 className="mb-3 text-lg font-semibold text-foreground">Australia</h2>
            <FavoritesGrid items={australia} />

            {/* Divider */}
            <hr className="my-10 border-t border-border" />

            {/* Philippines section */}
            <h2 className="mb-3 text-lg font-semibold text-foreground">Philippines</h2>
            <FavoritesGrid items={philippines} />

            {/* Divider */}
            <hr className="my-10 border-t border-border" />

            {/* Cafe section */}
            <h2 className="mb-3 text-lg font-semibold text-foreground">Cafe</h2>
            <FavoritesGrid items={cafe} />
          </>
        ) : (
          <FavoritesGrid items={items} />
        )}
      </div>
    </main>
  )
}
