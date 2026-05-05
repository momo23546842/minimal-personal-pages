"use client"

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { X, Camera } from 'lucide-react'
import styles from './journey-modal.module.css'
import type { JourneyEntry } from '@/data/journey'

type JourneyModalProps = {
  entry: JourneyEntry
  onClose: () => void
}

export function JourneyModal({ entry, onClose }: JourneyModalProps) {
  const modalImage = entry.detailImage ?? entry.thumbnailImage ?? entry.image
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <div className={styles.content}>
          {/* Image Side */}
          <div className={styles.imageSection}>
            <div className={styles.imageTape} aria-hidden="true" />
            <div className={styles.imageWrapper}>
              <Image
                src={modalImage}
                alt={entry.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.image}
                priority
              />
            </div>
          </div>

          {/* Text Side */}
          <div className={styles.textSection}>
            <div className={styles.dateRow}>
              <Camera className={styles.icon} size={18} />
              <time className={styles.date}>{entry.date}</time>
            </div>

            <h2 className={styles.title}>{entry.title}</h2>

            <p className={styles.description}>{entry.fullDescription}</p>

            {entry.tags && (
              <div className={styles.tags}>
                {entry.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
