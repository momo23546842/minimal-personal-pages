import React from 'react'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { foodPhotos, japanPhotos, australiaPhotos, philippinesPhotos, cafePhotos } from '@/data/gallery'

export type FavItem = {
  title: string
  location?: string
  caption?: string
  tags?: string[]
  image?: string
  category?: string
}

export function FavoritesGrid({ items, onItemClick }: { items: FavItem[], onItemClick?: (item: FavItem) => void }) {
  return (
    <div className="favorites-grid grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((it, idx) => (
        <div 
          key={idx} 
          className="group h-full"
          style={{
            background: '#FFFFFF',
            padding: '12px 12px 36px',
            borderRadius: '4px',
            boxShadow: '0 6px 16px rgba(58, 58, 58, 0.10), 0 3px 8px rgba(58, 58, 58, 0.06)',
            transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
            border: '1px solid rgba(229, 220, 206, 0.5)',
            cursor: onItemClick ? 'pointer' : 'default',
          }}
          onClick={() => onItemClick?.(it)}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(58, 58, 58, 0.14), 0 4px 10px rgba(58, 58, 58, 0.08)'
            e.currentTarget.style.borderColor = 'rgba(122, 145, 114, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(58, 58, 58, 0.10), 0 3px 8px rgba(58, 58, 58, 0.06)'
            e.currentTarget.style.borderColor = 'rgba(229, 220, 206, 0.5)'
          }}
        >
          <div className="relative w-full aspect-square rounded-sm overflow-hidden mb-3">
            {it.image ? (
              <Image src={it.image} alt={it.title} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl bg-linear-to-br from-gray-200 to-gray-300" style={{ color: 'var(--scrapbook-text-light, #6B6356)' }}>🍽️</div>
            )}
          </div>
          <div className="px-1">
            <h4 
              className="mb-1.5 text-xs md:text-sm font-bold leading-tight"
              style={{ 
                fontFamily: 'var(--font-sans)',
                color: 'var(--scrapbook-forest-dark, #5A6B4F)'
              }}
            >{it.title}</h4>
            {it.location && (
              <div className="flex items-center gap-1.5 text-[10px] md:text-xs mb-1.5" style={{ color: 'var(--scrapbook-text-light, #6B6356)' }}>
                <MapPin className="h-3 w-3 shrink-0" />
                <span className="line-clamp-1">{it.location}</span>
              </div>
            )}
            {it.caption && (
              <p className="text-[9px] md:text-[10px] leading-relaxed line-clamp-2" style={{ color: 'var(--scrapbook-text, #3A3A3A)', opacity: 0.75 }}>
                {it.caption}
              </p>
            )}
            {it.tags && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {it.tags.slice(0, 3).map((t) => (
                  <span 
                    key={t} 
                    className="text-[9px] md:text-[10px] px-1.5 py-0.5 rounded"
                    style={{ 
                      backgroundColor: 'var(--scrapbook-paper-alt, #F0EBE0)',
                      color: 'var(--scrapbook-forest, #7A9172)',
                      border: '1px solid var(--scrapbook-sand, #E5DCCE)'
                    }}
                  >
                    #{t}
                  </span>
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
