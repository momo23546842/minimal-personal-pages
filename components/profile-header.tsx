"use client"

import Image from "next/image"
import styles from "./profile-header.module.css"
import { Caveat, Pacifico, Dancing_Script } from 'next/font/google'
import { Camera } from 'lucide-react'
import { useRouter } from 'next/navigation'

const caveat = Caveat({ weight: ['400','700'], subsets: ['latin'], display: 'swap' })
const pacifico = Pacifico({ weight: '400', subsets: ['latin'], display: 'swap' })
const dancingScript = Dancing_Script({ weight: ['700'], subsets: ['latin'], display: 'swap' })

export function ProfileHeader() {
  const router = useRouter()

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
          <div className={styles.nameRow}>
            <h1 className={`${styles.name} ${pacifico.className}`}>Momo</h1>

            {/* Camera button + curly hint */}
            <div className={styles.cameraArea}>
              <div className={styles.cameraGroup}>
                {/* "click here" — lower-right than before (top:14px) */}
                <span className={`${styles.hintText} ${dancingScript.className}`}>click here</span>

                {/* "click here" — lower-right */}
                <span className={`${styles.hintText} ${dancingScript.className}`}>click here</span>

                {/* FA-light style diagonal arrow bridging text → button */}
                <svg
                  className={styles.curlyArrow}
                  width="70"
                  height="68"
                  viewBox="0 0 70 68"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  {/*
                    SVG placed at left:8, top:8 in group (110x100)
                    SVG (55,5) = group (63,13) — near text (right side)
                    SVG (9,50)  = group (17,58) — 8px above button top (y=66)
                    Direction: upper-right → lower-left ~45°
                  */}
                  {/* Shorter shaft: upper-right (50,6) → lower-left (18,38) */}
                  <line x1="50" y1="6" x2="18" y2="38" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
                  {/* Arrowhead at (18,38) pointing lower-left */}
                  <polyline points="27,35 18,38 20,29" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>

                {/* Camera button — bottom-left, separated from arrow end */}
                <button
                  className={styles.cameraBtn}
                  onClick={() => router.push('/gallery')}
                  aria-label="View favorites gallery"
                >
                  <Camera size={15} strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
          
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
