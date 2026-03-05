"use client"

import { ArrowDown } from "lucide-react"
import Image from "next/image"
import styles from "./hero.module.css"

export function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      {/* ---- Background blob decorations ---- */}
      <div className={styles.blobLayer}>
        {/* Large blobs */}
        <div className={`${styles.blob} ${styles.blobPink}`} />
        <div className={`${styles.blob} ${styles.blobGreen}`} />
        <div className={`${styles.blob} ${styles.blobYellow}`} />
        <div className={`${styles.blob} ${styles.blobBlue}`} />
        {/* Small accent dots */}
        <div className={`${styles.blob} ${styles.blobPinkSmall}`} />
        <div className={`${styles.blob} ${styles.blobGreenSmall}`} />
        <div className={`${styles.blob} ${styles.blobYellowSmall}`} />
        <div className={`${styles.blob} ${styles.blobBlueSmall}`} />
      </div>

      {/* ---- Main content ---- */}
      <div className={styles.content}>
        {/* Profile image */}
        <div className={styles.profileWrap}>
          <Image
            src="/images/profilepic.jpg"
            alt="Momo profile"
            fill
            sizes="(max-width: 768px) 140px, 200px"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Text block */}
        <div className={styles.textBlock}>
          <h1 className={styles.title}>
            Momo
          </h1>
          <p className={styles.subtitle}>
            This is my personal intro page. If you want to know something about me, just use the chat!
            You can ask about my hobbies, favorite foods, and more.
          </p>
          <a href="#assistant" className={styles.cta}>
            Open Assistant
          </a>
        </div>
      </div>

      {/* ---- Scroll indicator ---- */}
      <div className={styles.scrollDown}>
        <a href="#assistant" aria-label="Scroll to content">
          <ArrowDown size={20} />
        </a>
      </div>
    </section>
  )
}
