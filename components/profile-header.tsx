"use client"

import Image from "next/image"
import styles from "./profile-header.module.css"
import { ArrowUpRight, Camera } from "lucide-react"
import { useRouter } from "next/navigation"

export function ProfileHeader() {
  const router = useRouter()

  return (
    <section className={styles.section}>
        <div className={styles.rule} aria-hidden="true" />
        <div className={styles.container}>
          <div className={styles.intro}>
            <p className={styles.kicker}>Independent digital portfolio <span>— 2026</span></p>
            <div className={styles.titleBlock}>
              <p className={styles.eyebrow}>Hello, I&apos;m</p>
              <h1 className={styles.name}>Momo<span className={styles.dot}>.</span></h1>
            </div>
            <p className={styles.description}>
              A curious mind collecting ideas, places, and little details that make everyday life interesting.
            </p>
            <div className={styles.actions}>
              <button className={styles.primaryAction} onClick={() => router.push("/gallery")}>
                <Camera size={15} strokeWidth={1.8} />
                View my world
                <ArrowUpRight size={15} strokeWidth={1.8} />
              </button>
              <span className={styles.availability}><i /> Open to new conversations</span>
            </div>
          </div>

          <div className={styles.visual}>
            <div className={styles.imageFrame}>
              <Image
                src="/images/profilepic3.jpg"
                alt="Momo"
                fill
                sizes="(max-width: 767px) 82vw, 42vw"
                priority
                style={{ objectFit: "cover" }}
              />
            </div>
            <p className={styles.imageLabel}>01 / Momo, somewhere in the city</p>
            <span className={styles.verticalLabel}>PERSONAL ARCHIVE</span>
          </div>
        </div>
        <div className={styles.bottomMeta}>
          <span>Scroll to explore</span>
          <span className={styles.metaLine} />
          <span>01 — 04</span>
        </div>
    </section>
  )
}
