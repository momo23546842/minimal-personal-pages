import { PUBLIC_SAFE_MODE } from "@/lib/safeMode"
import Image from "next/image"
import styles from "./about.module.css"

export function About() {
  if (PUBLIC_SAFE_MODE) return null

  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <p className={styles.label}>About</p>
        <h2 className={styles.heading}>About Me</h2>

        {/* 3-column layout: left info | portrait | right info */}
        <div className={styles.profileLayout}>

          {/* LEFT: individual text blocks, no card */}
          <div className={styles.leftCol}>
            <div className={styles.infoBlock}>
              <span className={styles.infoKey}>Birthday</span>
              <span className={styles.infoValue}>30 May</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoKey}>From</span>
              <span className={styles.infoValue}>Japan</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoKey}>Favorite Food</span>
              <span className={styles.infoValue}>Sushi</span>
            </div>
          </div>

          {/* CENTER: circular portrait */}
          <div className={styles.portraitWrap}>
            <div className={styles.portraitRing}>
              <Image
                src="/images/Australia/royalnationalpark-sydney.jpg"
                alt="Momo"
                fill
                sizes="280px"
                className={styles.portraitImg}
              />
            </div>
            <p className={styles.portraitName}>Momo</p>
          </div>

          {/* RIGHT: individual text blocks, no card */}
          <div className={styles.rightCol}>
            <div className={styles.infoBlock}>
              <span className={styles.infoKey}>Hobbies</span>
              <ul className={styles.hobbyList}>
                {["Travel", "Hiking", "Gym", "Eating delicious food"].map((h) => (
                  <li key={h} className={styles.hobbyItem}>{h}</li>
                ))}
              </ul>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoKey}>Favorite Color</span>
              <span className={styles.infoValue}>Gray 🩶</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoKey}>Favorite Animals</span>
              <span className={styles.infoValue}>Birds &amp; Seals</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
