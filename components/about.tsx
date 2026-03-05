import { PUBLIC_SAFE_MODE } from "@/lib/safeMode"
import Image from "next/image"
import { MapPin, Palette, Camera, Coffee } from "lucide-react"
import styles from "./about.module.css"

export function About() {
  if (PUBLIC_SAFE_MODE) return null

  const destinations = [
    { name: "Sydney, Australia", src: "/images/Australia/operahouseandhabourbridge-sydney.jpg" },
    { name: "Kumamoto, Japan", src: "/images/Japan/kumamotojyo.jpg" },
    { name: "Cebu, Philippines", src: "/images/Philippines/canyoning-kawasan-cebu.jpg" },
  ]

  const skills = [
    { label: "Web Design", color: "var(--color-pink)" },
    { label: "UX / UI Design", color: "var(--color-green)" },
    { label: "Photography & Editing", color: "var(--color-blue)" },
    { label: "Travel Planning", color: "var(--color-yellow)" },
  ]

  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <p className={styles.label}>About</p>
        <h2 className={styles.heading}>About Me</h2>
        <p className={styles.tagline}>Creative / Design / Travel</p>

        {/* Top: hero photo + intro card */}
        <div className={styles.topGrid}>
          <div className={styles.heroPhoto}>
            <Image
              src="/images/Australia/royalnationalpark-sydney.jpg"
              alt="Momo - lifestyle"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className={styles.introCard}>
            <h3 className={styles.introTitle}>Hello! I&apos;m Momo</h3>
            <p className={styles.introText}>
              Welcome to my page!
            </p>
            <p className={styles.introText}>
              This is a small space where I keep the things I like.
              Food I enjoy, places I&apos;ve been, places I want to go someday.
              And a chat where you can just talk to me.
            </p>
            <p className={styles.introText}>
              There&apos;s nothing particularly special here, but somehow, it feels like me.
            </p>
          </div>
        </div>

        {/* Icon cards */}
        <div className={styles.iconCards}>
          <div className={styles.iconCard}>
            <div className={styles.iconCircle} style={{ backgroundColor: 'var(--color-yellow)' }}>
              <Palette size={24} color="var(--color-heading)" />
            </div>
            <span className={styles.iconCardTitle}>What I Do</span>
            <span className={styles.iconCardSub}>Design &amp; Development</span>
          </div>

          <div className={styles.iconCard}>
            <div className={styles.iconCircle} style={{ backgroundColor: 'var(--color-green)' }}>
              <Camera size={24} color="var(--color-heading)" />
            </div>
            <span className={styles.iconCardTitle}>My Hobbies</span>
            <span className={styles.iconCardSub}>Photography &amp; Travel</span>
          </div>

          <div className={styles.iconCard}>
            <div className={styles.iconCircle} style={{ backgroundColor: 'var(--color-pink)' }}>
              <Coffee size={24} color="var(--color-heading)" />
            </div>
            <span className={styles.iconCardTitle}>Fun Facts</span>
            <span className={styles.iconCardSub}>Coffee Lover &amp; Night Owl</span>
          </div>
        </div>

        {/* Bottom: lifestyle photo + skills */}
        <div className={styles.bottomGrid}>
          <div className={styles.lifestylePhoto}>
            <Image
              src="/images/Japan/kumamoto-aso.jpg"
              alt="Landscape"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className={styles.skillsCard}>
            <h3 className={styles.skillsTitle}>Skills &amp; Expertise</h3>
            <ul className={styles.skillsList}>
              {skills.map((s) => (
                <li key={s.label} className={styles.skillItem}>
                  <span className={styles.skillDot} style={{ backgroundColor: s.color }} />
                  {s.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Favorite Destinations */}
        <div className={styles.destSection}>
          <h3 className={styles.destTitle}>Favorite Destinations</h3>
          <div className={styles.destGrid}>
            {destinations.map((d) => (
              <div key={d.name} className={styles.destCard}>
                <Image
                  src={d.src}
                  alt={d.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className={styles.destOverlay}>
                  <MapPin size={16} className={styles.destPin} />
                  <span className={styles.destName}>{d.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
