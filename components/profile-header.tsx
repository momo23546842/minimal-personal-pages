"use client"

import Image from "next/image"
import styles from "./profile-header.module.css"
import { Caveat, Pacifico } from 'next/font/google'

const caveat = Caveat({ weight: ['400','700'], subsets: ['latin'], display: 'swap' })
const pacifico = Pacifico({ weight: '400', subsets: ['latin'], display: 'swap' })

export function ProfileHeader() {
  return (
    <section className={styles.section}>
      {/* CSS-only background accent blobs — no emoji */}
      <div className={styles.blobTopRight} aria-hidden="true" />
      <div className={styles.blobBottomLeft} aria-hidden="true" />
      <div className={styles.blobCenter} aria-hidden="true" />

      <div className={styles.container}>
        {/* Profile Photo with rough white cutout border */}
        <div className={styles.photoWrapper}>
          <div className={styles.photoOuterBorder}>
            <div className={styles.photoFrame}>
              <Image
                src="/images/profile1.jpg"
                alt="Momo profile"
                fill
                sizes="(max-width: 768px) 200px, 240px"
                priority
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          {/* Masking tape on top of photo */}
          <div className={styles.photoTape}></div>
        </div>

        {/* Name & Subtitle */}
        <div className={styles.textWrapper}>
          <h1 className={`${styles.name} ${pacifico.className}`}>Momo</h1>
          
          {/* Subtitle on torn paper strip with tape */}
          <div className={styles.subtitleWrapper}>
            <div className={styles.subtitleTape}></div>
            <p className={`${styles.subtitle} ${caveat.className}`}>
              <span className={styles.subtitleLine1}>Welcome to my page! </span>
              <span className={styles.subtitleLine2}>This is where I share my favorite things, hobbies, and adventures.</span>
              <span className={styles.subtitleLine}>Feel free to explore my journey ✈️</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
