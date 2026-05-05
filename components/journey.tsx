"use client"

import { useState } from 'react'
import { Camera } from 'lucide-react'
import { JourneyCard } from './journey-card'
import { JourneyModal } from './journey-modal'
import { journeyEntries } from '@/data/journey'
import type { JourneyEntry } from '@/data/journey'
import styles from './journey.module.css'

export function Journey() {
  const [selectedEntry, setSelectedEntry] = useState<JourneyEntry | null>(null)

  return (
    <>
      <section id="journey" className={styles.section}>
        <div className={styles.container}>
          {/* Section Header */}
          <div className={styles.header}>
            <div className={styles.titleRow}>
              <Camera className={styles.headerIcon} size={28} />
              <h2 className={styles.title}>Journey</h2>
            </div>
            <p className={styles.subtitle}>
              Memories from my adventures and everyday life
            </p>
          </div>

          {/* Journey Cards */}
          <div className={styles.cardsContainer}>
            {journeyEntries.map((entry, index) => (
              <JourneyCard
                key={entry.id}
                entry={entry}
                isReversed={index % 2 === 1}
                onClick={() => setSelectedEntry(entry)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedEntry && (
        <JourneyModal
          entry={selectedEntry}
          onClose={() => setSelectedEntry(null)}
        />
      )}
    </>
  )
}
