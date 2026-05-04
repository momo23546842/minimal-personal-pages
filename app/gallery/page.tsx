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
    <main 
      className="px-3 md:px-6 py-20"
      style={{ backgroundColor: 'transparent' }}
    >
      <div className="mx-auto max-w-7xl px-2 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 
              className="text-2xl md:text-3xl font-bold"
              style={{ 
                fontFamily: "var(--font-baloo, 'Baloo 2', cursive, sans-serif)",
                color: 'var(--scrapbook-forest-dark, #5A6B4F)',
                position: 'relative',
                display: 'inline-block'
              }}
            >
              Gallery 📸
            </h1>
            <p 
              className="text-xs md:text-sm mt-1"
              style={{ color: 'var(--scrapbook-text-light, #6B6356)' }}
            >
              A small collection of favorites.
            </p>
          </div>
          <div className="hidden sm:block">
            <Link 
              href="/" 
              className="text-sm font-medium transition-colors"
              style={{ color: 'var(--scrapbook-forest, #7A9172)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--scrapbook-forest-dark, #5A6B4F)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--scrapbook-forest, #7A9172)' }}
            >
              ← Back home
            </Link>
          </div>
        </div>

        <div className="mb-8 flex gap-2 overflow-x-auto flex-nowrap scrollbar-hide pb-2">
          <button 
            onClick={() => setTab('all')} 
            className="shrink-0 px-3 py-1.5 text-xs md:text-sm rounded-lg font-medium transition-all"
            style={{
              backgroundColor: tab==='all' ? 'var(--scrapbook-forest, #7A9172)' : 'var(--scrapbook-paper-alt, #F0EBE0)',
              color: tab==='all' ? 'white' : 'var(--scrapbook-text, #3A3A3A)',
              border: `1px solid ${tab==='all' ? 'var(--scrapbook-forest-dark, #5A6B4F)' : 'var(--scrapbook-sand, #E5DCCE)'}`,
              boxShadow: tab==='all' ? '0 3px 8px rgba(122, 145, 114, 0.3)' : '0 2px 4px rgba(58, 58, 58, 0.08)',
              transform: tab==='all' ? 'translateY(-1px)' : 'translateY(0)'
            }}
          >
            All
          </button>
          <button 
            onClick={() => setTab('food')} 
            className="shrink-0 px-3 py-1.5 text-xs md:text-sm rounded-lg font-medium transition-all"
            style={{
              backgroundColor: tab==='food' ? 'var(--scrapbook-forest, #7A9172)' : 'var(--scrapbook-paper-alt, #F0EBE0)',
              color: tab==='food' ? 'white' : 'var(--scrapbook-text, #3A3A3A)',
              border: `1px solid ${tab==='food' ? 'var(--scrapbook-forest-dark, #5A6B4F)' : 'var(--scrapbook-sand, #E5DCCE)'}`,
              boxShadow: tab==='food' ? '0 3px 8px rgba(122, 145, 114, 0.3)' : '0 2px 4px rgba(58, 58, 58, 0.08)',
              transform: tab==='food' ? 'translateY(-1px)' : 'translateY(0)'
            }}
          >
            Food
          </button>
          <button 
            onClick={() => setTab('japan')} 
            className="shrink-0 px-3 py-1.5 text-xs md:text-sm rounded-lg font-medium transition-all"
            style={{
              backgroundColor: tab==='japan' ? 'var(--scrapbook-forest, #7A9172)' : 'var(--scrapbook-paper-alt, #F0EBE0)',
              color: tab==='japan' ? 'white' : 'var(--scrapbook-text, #3A3A3A)',
              border: `1px solid ${tab==='japan' ? 'var(--scrapbook-forest-dark, #5A6B4F)' : 'var(--scrapbook-sand, #E5DCCE)'}`,
              boxShadow: tab==='japan' ? '0 3px 8px rgba(122, 145, 114, 0.3)' : '0 2px 4px rgba(58, 58, 58, 0.08)',
              transform: tab==='japan' ? 'translateY(-1px)' : 'translateY(0)'
            }}
          >
            Japan
          </button>
          <button 
            onClick={() => setTab('australia')} 
            className="shrink-0 px-3 py-1.5 text-xs md:text-sm rounded-lg font-medium transition-all"
            style={{
              backgroundColor: tab==='australia' ? 'var(--scrapbook-forest, #7A9172)' : 'var(--scrapbook-paper-alt, #F0EBE0)',
              color: tab==='australia' ? 'white' : 'var(--scrapbook-text, #3A3A3A)',
              border: `1px solid ${tab==='australia' ? 'var(--scrapbook-forest-dark, #5A6B4F)' : 'var(--scrapbook-sand, #E5DCCE)'}`,
              boxShadow: tab==='australia' ? '0 3px 8px rgba(122, 145, 114, 0.3)' : '0 2px 4px rgba(58, 58, 58, 0.08)',
              transform: tab==='australia' ? 'translateY(-1px)' : 'translateY(0)'
            }}
          >
            Australia
          </button>
          <button 
            onClick={() => setTab('philippines')} 
            className="shrink-0 px-3 py-1.5 text-xs md:text-sm rounded-lg font-medium transition-all"
            style={{
              backgroundColor: tab==='philippines' ? 'var(--scrapbook-forest, #7A9172)' : 'var(--scrapbook-paper-alt, #F0EBE0)',
              color: tab==='philippines' ? 'white' : 'var(--scrapbook-text, #3A3A3A)',
              border: `1px solid ${tab==='philippines' ? 'var(--scrapbook-forest-dark, #5A6B4F)' : 'var(--scrapbook-sand, #E5DCCE)'}`,
              boxShadow: tab==='philippines' ? '0 3px 8px rgba(122, 145, 114, 0.3)' : '0 2px 4px rgba(58, 58, 58, 0.08)',
              transform: tab==='philippines' ? 'translateY(-1px)' : 'translateY(0)'
            }}
          >
            Philippines
          </button>
          <button 
            onClick={() => setTab('cafe')} 
            className="shrink-0 px-3 py-1.5 text-xs md:text-sm rounded-lg font-medium transition-all"
            style={{
              backgroundColor: tab==='cafe' ? 'var(--scrapbook-forest, #7A9172)' : 'var(--scrapbook-paper-alt, #F0EBE0)',
              color: tab==='cafe' ? 'white' : 'var(--scrapbook-text, #3A3A3A)',
              border: `1px solid ${tab==='cafe' ? 'var(--scrapbook-forest-dark, #5A6B4F)' : 'var(--scrapbook-sand, #E5DCCE)'}`,
              boxShadow: tab==='cafe' ? '0 3px 8px rgba(122, 145, 114, 0.3)' : '0 2px 4px rgba(58, 58, 58, 0.08)',
              transform: tab==='cafe' ? 'translateY(-1px)' : 'translateY(0)'
            }}
          >
            Cafe
          </button>
        </div>

        {tab === 'all' ? (
          <>
            {/* Food section */}
            <h2 
              className="mb-4 text-base md:text-lg font-semibold"
              style={{
                fontFamily: "var(--font-baloo, 'Baloo 2', cursive, sans-serif)",
                color: 'var(--scrapbook-forest-dark, #5A6B4F)'
              }}
            >
              Food 🍜
            </h2>
            <FavoritesGrid items={food} />

            {/* Divider */}
            <hr 
              className="my-10"
              style={{ 
                border: 'none',
                borderTop: '2px dashed var(--scrapbook-sand, #E5DCCE)'
              }}
            />

            {/* Japan section */}
            <h2 
              className="mb-4 text-base md:text-lg font-semibold"
              style={{
                fontFamily: "var(--font-baloo, 'Baloo 2', cursive, sans-serif)",
                color: 'var(--scrapbook-forest-dark, #5A6B4F)'
              }}
            >
              Japan 🏯
            </h2>
            <FavoritesGrid items={japan} />

            {/* Divider */}
            <hr 
              className="my-10"
              style={{ 
                border: 'none',
                borderTop: '2px dashed var(--scrapbook-sand, #E5DCCE)'
              }}
            />

            {/* Australia section */}
            <h2 
              className="mb-4 text-base md:text-lg font-semibold"
              style={{
                fontFamily: "var(--font-baloo, 'Baloo 2', cursive, sans-serif)",
                color: 'var(--scrapbook-forest-dark, #5A6B4F)'
              }}
            >
              Australia 🦘
            </h2>
            <FavoritesGrid items={australia} />

            {/* Divider */}
            <hr 
              className="my-10"
              style={{ 
                border: 'none',
                borderTop: '2px dashed var(--scrapbook-sand, #E5DCCE)'
              }}
            />

            {/* Philippines section */}
            <h2 
              className="mb-4 text-base md:text-lg font-semibold"
              style={{
                fontFamily: "var(--font-baloo, 'Baloo 2', cursive, sans-serif)",
                color: 'var(--scrapbook-forest-dark, #5A6B4F)'
              }}
            >
              Philippines 🌊
            </h2>
            <FavoritesGrid items={philippines} />

            {/* Divider */}
            <hr 
              className="my-10"
              style={{ 
                border: 'none',
                borderTop: '2px dashed var(--scrapbook-sand, #E5DCCE)'
              }}
            />

            {/* Cafe section */}
            <h2 
              className="mb-4 text-base md:text-lg font-semibold"
              style={{
                fontFamily: "var(--font-baloo, 'Baloo 2', cursive, sans-serif)",
                color: 'var(--scrapbook-forest-dark, #5A6B4F)'
              }}
            >
              Cafe ☕
            </h2>
            <FavoritesGrid items={cafe} />
          </>
        ) : (
          <FavoritesGrid items={items} />
        )}
      </div>
    </main>
  )
}
