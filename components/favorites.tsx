import React from 'react'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { foodPhotos, japanPhotos, australiaPhotos, philippinesPhotos, cafePhotos } from '@/data/gallery'

type FavItem = {
  title: string
  location?: string
  caption?: string
  tags?: string[]
  image?: string
  category?: string
}

export function FavoritesGrid({ items }: { items: FavItem[] }) {
  return (
    <div className="grid gap-2 md:gap-6 grid-cols-2 md:grid-cols-3 auto-rows-[1fr]">
      {items.map((it, idx) => (
        <div key={idx} className="group rounded-lg border border-border bg-card p-2 md:p-4 shadow-[0_1px_6px_rgba(0,0,0,0.03)] h-full flex flex-col">
          <div className="relative w-full aspect-square rounded-sm overflow-hidden">
            {it.image ? (
              <Image src={it.image} alt={it.title} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl text-muted-foreground bg-linear-to-br from-gray-200 to-gray-300">🍽️</div>
            )}
          </div>
          <div className="mt-2 flex-1 min-h-22 flex flex-col justify-between">
            <h4 className="mb-1 text-xs font-semibold text-foreground">{it.title}</h4>
            {it.location && (
              <div className="flex items-center gap-2 text-[10px] md:text-xs text-muted-foreground mb-1">
                <MapPin className="h-3 w-3" />
                <span>{it.location}</span>
              </div>
            )}
            {it.caption && <p className="hidden sm:block text-[10px] md:text-xs text-muted-foreground mb-2">{it.caption}</p>}
            {it.tags && (
              <div className="hidden sm:flex flex-wrap gap-2">
                {it.tags.map((t) => (
                  <span key={t} className="text-[10px] md:text-xs text-muted-foreground">#{t}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export const food: FavItem[] = foodPhotos

export const australia: FavItem[] = australiaPhotos

export const philippines: FavItem[] = philippinesPhotos

export const japan: FavItem[] = japanPhotos

export const cafe: FavItem[] = cafePhotos

export function Favorites() {
  return (
    <section id="favorites" className="px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-center text-sm font-medium uppercase tracking-widest text-primary">Favorites</p>
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">Gallery</h2>

        <div className="mb-10">
          <h3 className="mb-4 text-lg font-semibold">Food</h3>
          <FavoritesGrid items={food} />
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Japan</h3>
          <FavoritesGrid items={japan} />
        </div>

        <div className="mt-8">
          <h3 className="mb-4 text-lg font-semibold">Australia</h3>
          <FavoritesGrid items={australia} />
        </div>

        <div className="mt-8">
          <h3 className="mb-4 text-lg font-semibold">Philippines</h3>
          <FavoritesGrid items={philippines} />
        </div>
      </div>
    </section>
  )
}

export default Favorites
