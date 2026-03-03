import React from 'react'

type FavItem = {
  title: string
  caption?: string
  tags?: string[]
}

function FavoritesGrid({ items }: { items: FavItem[] }) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it, idx) => (
        <div key={idx} className="group rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="h-40 mb-3 w-full rounded-md bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-4xl text-muted-foreground">
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
  )
}

export function Favorites() {
  const food: FavItem[] = [
    { title: 'Sushi', caption: 'Fresh fish and rice', tags: ['sushi', 'seafood'] },
    { title: 'Fruit', caption: 'Seasonal sweet fruits', tags: ['fruit'] },
    { title: 'Lindt Chocolate', caption: 'Smooth dark chocolate', tags: ['chocolate'] },
    { title: 'Cheese Kimbap', caption: 'Korean cheesy roll', tags: ['kimbap', 'korean'] },
    { title: 'Fried Chicken', caption: 'Crispy and juicy', tags: ['chicken'] },
    { title: 'Pajeon', caption: 'Savory pancake', tags: ['pajeon'] },
    { title: 'Ramen', caption: 'Comfort bowl', tags: ['ramen'] },
    { title: 'Tempura', caption: 'Lightly fried', tags: ['tempura'] },
    { title: 'Mochi', caption: 'Chewy sweets', tags: ['mochi'] },
  ]

  const places: FavItem[] = [
    { title: 'Perth', caption: 'Lovely coastal city', tags: ['australia'] },
    { title: 'Quokka Spot', caption: 'Met friendly quokkas', tags: ['wildlife'] },
    { title: 'Korea', caption: 'Want to visit again', tags: ['travel'] },
    { title: 'Finland', caption: 'Aurora dreams', tags: ['aurora'] },
    { title: 'Hiking Trails', caption: 'Nature walks', tags: ['hiking'] },
    { title: 'Hot Air Balloon', caption: 'Bucket list', tags: ['adventure'] },
    { title: 'Solo Trips', caption: 'I love solo travel', tags: ['travel'] },
    { title: 'Perth Beaches', caption: 'Sun and sand', tags: ['beach'] },
    { title: 'Nature Walks', caption: 'Evening strolls', tags: ['walking'] },
  ]

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
          <h3 className="mb-4 text-lg font-semibold">Places</h3>
          <FavoritesGrid items={places} />
        </div>
      </div>
    </section>
  )
}

export default Favorites
