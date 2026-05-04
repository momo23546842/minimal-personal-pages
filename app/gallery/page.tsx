"use client"

import { useState, useEffect, useCallback } from "react"
import { FavoritesGrid, food, japan, australia, philippines, cafe } from "@/components/favorites"
import type { FavItem } from "@/components/favorites"
import Link from "next/link"
import Image from "next/image"
import { MapPin, X } from "lucide-react"

function GalleryLightbox({ item, onClose }: { item: FavItem; onClose: () => void }) {
  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        backgroundColor: "rgba(30, 24, 18, 0.72)",
        backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
      }}
      onClick={onClose}
    >
      {/* Modal card */}
      <div
        style={{
          background: "#FDFAF5",
          borderRadius: "6px",
          padding: "16px 16px 32px",
          maxWidth: "520px",
          width: "100%",
          boxShadow: "0 24px 64px rgba(30, 24, 18, 0.35), 0 8px 24px rgba(30, 24, 18, 0.2)",
          border: "1px solid rgba(229, 220, 206, 0.7)",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "10px", right: "10px",
            background: "var(--scrapbook-paper-alt, #F0EBE0)",
            border: "1px solid var(--scrapbook-sand, #E5DCCE)",
            borderRadius: "50%",
            width: "30px", height: "30px",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
            color: "var(--scrapbook-forest-dark, #5A6B4F)",
            zIndex: 1,
          }}
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {/* Image */}
        {item.image && (
          <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", borderRadius: "3px", overflow: "hidden", marginBottom: "18px" }}>
            <Image src={item.image} alt={item.title} fill style={{ objectFit: "cover" }} sizes="520px" />
          </div>
        )}

        {/* Info */}
        <div style={{ paddingInline: "4px" }}>
          <h3 style={{
            fontFamily: "var(--font-baloo, 'Baloo 2', cursive, sans-serif)",
            fontSize: "1.2rem",
            fontWeight: 700,
            color: "var(--scrapbook-forest-dark, #5A6B4F)",
            marginBottom: "6px",
          }}>{item.title}</h3>

          {item.location && (
            <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "10px", color: "var(--scrapbook-text-light, #6B6356)", fontSize: "0.82rem" }}>
              <MapPin size={13} />
              <span>{item.location}</span>
            </div>
          )}

          {item.caption && (
            <p style={{ fontSize: "0.88rem", lineHeight: 1.65, color: "var(--scrapbook-text, #3A3A3A)", marginBottom: "12px" }}>
              {item.caption}
            </p>
          )}

          {item.tags && item.tags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {item.tags.map((t) => (
                <span key={t} style={{
                  fontSize: "0.72rem",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  backgroundColor: "var(--scrapbook-paper-alt, #F0EBE0)",
                  color: "var(--scrapbook-forest, #7A9172)",
                  border: "1px solid var(--scrapbook-sand, #E5DCCE)",
                }}>
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function GalleryPage() {
  const [tab, setTab] = useState<'all'|'food'|'japan'|'australia'|'philippines'|'cafe'>('all')
  const [selected, setSelected] = useState<FavItem | null>(null)
  const closeModal = useCallback(() => setSelected(null), [])

  const items =
    tab === 'all' ? [...food, ...japan, ...australia, ...philippines, ...cafe]
    : tab === 'food' ? food
    : tab === 'japan' ? japan
    : tab === 'australia' ? australia
    : tab === 'philippines' ? philippines
    : cafe

  return (
    <>
    {selected && <GalleryLightbox item={selected} onClose={closeModal} />}
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
            <FavoritesGrid items={food} onItemClick={setSelected} />

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
            <FavoritesGrid items={japan} onItemClick={setSelected} />

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
            <FavoritesGrid items={australia} onItemClick={setSelected} />

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
            <FavoritesGrid items={philippines} onItemClick={setSelected} />

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
            <FavoritesGrid items={cafe} onItemClick={setSelected} />
          </>
        ) : (
          <FavoritesGrid items={items} onItemClick={setSelected} />
        )}
      </div>
    </main>
    </>
  )
}
