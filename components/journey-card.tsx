"use client"

import Image from 'next/image'
import { Camera } from 'lucide-react'
import styles from './journey-card.module.css'
import type { JourneyEntry } from '@/data/journey'

type JourneyCardProps = {
  entry: JourneyEntry
  isReversed: boolean
  onClick: () => void
}

export function JourneyCard({ entry, isReversed, onClick }: JourneyCardProps) {
  const cardImage = entry.thumbnailImage ?? entry.image
  return (
    <article
      className={`${styles.card} ${isReversed ? styles.reversed : ''}`}
      onClick={onClick}
    >
      {/* Image side */}
      <div className={styles.imageWrapper}>
        <div className={styles.imageTape} aria-hidden="true" />
        <div className={styles.imageFrame}>
          <Image
            src={cardImage}
            alt={entry.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={styles.image}
            style={entry.thumbnailPosition ? { objectPosition: entry.thumbnailPosition } : undefined}
          />
        </div>
      </div>

      {/* Content side */}
      <div className={styles.content}>
        <div className={styles.dateRow}>
          <Camera className={styles.icon} size={16} />
          <time className={styles.date}>{entry.date}</time>
        </div>
        <h3 className={styles.title}>{entry.title}</h3>
        <p className={styles.description}>{entry.description}</p>
        {entry.tags && (
          <div className={styles.tags}>
            {entry.tags.slice(0, 3).map((tag) => (
              <span key={tag} className={styles.tag}>
                #{tag}
              </span>
            ))}
          </div>
        )}
        <div className={styles.readMoreRow}>
          <span className={styles.readMore}>Read more →</span>
        </div>
      </div>
    </article>
  )
}
