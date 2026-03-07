"use client"

import { ArrowDown } from "lucide-react"
import Image from "next/image"
import styles from "./hero.module.css"

export function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.grid}>
        {/* Left — text */}
        <div className={styles.textSide}>
          <p className={styles.label}>Personal Page</p>
          <h1 className={styles.title}>Momo</h1>
          <p className={styles.subtitle}>
            Welcome to my personal page.{"\n"}
            If you want to know something about me, just use the chat!
            You can ask about my hobbies, favorite foods, and more.
          </p>
          <a href="#assistant" className={styles.cta}>
            Open Assistant
          </a>
        </div>

        {/* Right — large photo */}
        <div className={styles.photoSide}>
          <div className={styles.photoFrame}>
            <Image
              src="/images/profilepic.jpg"
              alt="Momo profile"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollDown}>
        <a href="#assistant" aria-label="Scroll to content">
          <ArrowDown size={20} />
        </a>
      </div>
    </section>
  )
}
