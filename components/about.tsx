"use client"

import { PUBLIC_SAFE_MODE } from "@/lib/safeMode"
import Image from "next/image"
import styles from "./about.module.css"
import { useEffect, useRef, useState, type ButtonHTMLAttributes, type ForwardRefExoticComponent, type HTMLAttributes, type MouseEvent, type RefAttributes, type RefObject } from "react"
import { motion, useInView } from "framer-motion"

function FilmStrip() {
  type MotionDivProps = HTMLAttributes<HTMLDivElement> & {
    initial?: unknown
    animate?: unknown
    transition?: unknown
    whileHover?: unknown
  }

  type MotionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    initial?: unknown
    animate?: unknown
    transition?: unknown
    whileHover?: unknown
  }

  const MotionViewport = motion.div as unknown as ForwardRefExoticComponent<MotionDivProps & RefAttributes<HTMLDivElement>>
  const MotionFrameButton = motion.button as unknown as ForwardRefExoticComponent<MotionButtonProps & RefAttributes<HTMLButtonElement>>
  const MotionModal = motion.div as unknown as ForwardRefExoticComponent<MotionDivProps & RefAttributes<HTMLDivElement>>

  const images = [
    { src: "/images/Journey/cairns.jpg", location: "Cairns", year: "2022", caption: "Coral morning" },
    { src: "/images/Journey/flowermarket.jpg", location: "Tokyo", year: "2021", caption: "Morning blooms" },
    { src: "/images/Journey/flowermarket2jpg.jpg", location: "Tokyo", year: "2021", caption: "Lantern stalls" },
    { src: "/images/Journey/lantern.jpg", location: "Kyoto", year: "2020", caption: "Lantern festival" },
    { src: "/images/Journey/rosebaytowatsonsbay.jpg", location: "Sydney", year: "2024", caption: "Harbour walk" },
    { src: "/images/Journey/rosebaytowatosnsbay2.jpg", location: "Sydney", year: "2024", caption: "Coastal light" },
    { src: "/images/Journey/seaturtle.jpg", location: "Great Barrier Reef", year: "2022", caption: "Close encounter" },
    { src: "/images/bondi-sunrise.jpg", location: "Bondi Beach", year: "2026", caption: "Sunrise swim" },
  ]

  const viewportRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const inView = useInView(viewportRef as RefObject<Element>, { amount: 0.4 })
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (openIndex === null) return
      if (e.key === "Escape") setOpenIndex(null)
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? null : Math.min(images.length - 1, i + 1)))
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? null : Math.max(0, i - 1)))
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [images.length, openIndex])

  // horizontal scroll with mouse wheel
  useEffect(() => {
    const el = viewportRef.current as HTMLDivElement | null
    if (el == null) return

    const container = el as HTMLDivElement

    function onWheel(e: WheelEvent) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        container.scrollBy({ left: e.deltaY, behavior: "smooth" })
      }
    }

    container.addEventListener("wheel", onWheel, { passive: false })
    return () => container.removeEventListener("wheel", onWheel)
  }, [])

  return (
    <div className={styles.filmWrap}>
      <div className={styles.filmTape} aria-hidden={!inView}>
        <MotionViewport
          ref={viewportRef}
          className={styles.filmViewportInner}
          initial={{ x: 0 }}
          animate={{ x: inView ? -24 : 0 }}
          transition={{ duration: 2.8, ease: "easeOut" }}
        >
          <div className={styles.filmStrip} ref={stripRef}>
            {images.map((img, i) => (
              <MotionFrameButton
                key={i}
                className={styles.filmFrame}
                onClick={() => setOpenIndex(i)}
                whileHover={{ scale: 1.03, y: -6 }}
                transition={{ duration: 0.3 }}
                aria-label={`${img.location} ${img.year}`}
              >
                <div className={styles.frameInner}>
                  <Image src={img.src} alt={img.caption || img.location} fill sizes="(max-width: 768px) 160px, 320px" className={styles.frameImg} />
                </div>
                <div className={styles.frameLabel}>
                  <div className={styles.frameLocation}>{img.location}</div>
                  <div className={styles.frameMeta}>{img.year} {img.caption ? `· ${img.caption}` : ''}</div>
                </div>
              </MotionFrameButton>
            ))}
          </div>
        </MotionViewport>
      </div>

      {openIndex !== null && (
        <div className={styles.modalOverlay} onClick={() => setOpenIndex(null)}>
          <MotionModal className={styles.modalContent} onClick={(event: MouseEvent<HTMLDivElement>) => event.stopPropagation()} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.25 }}>
            <button className={styles.modalNav} onClick={() => setOpenIndex((i) => (i === null ? null : Math.max(0, i - 1)))} aria-label="Previous">◀</button>
            <div className={styles.modalImageWrap}>
              <Image src={images[openIndex].src} alt={images[openIndex].caption || images[openIndex].location} fill className={styles.modalImage} />
              <div className={styles.modalCaption}>
                <strong>{images[openIndex].location}</strong>
                <div>{images[openIndex].year}{images[openIndex].caption ? ` · ${images[openIndex].caption}` : ''}</div>
              </div>
            </div>
            <button className={styles.modalNav} onClick={() => setOpenIndex((i) => (i === null ? null : Math.min(images.length - 1, i + 1)))} aria-label="Next">▶</button>
          </MotionModal>
        </div>
      )}
    </div>
  )
}

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
              <span className={`${styles.infoKey} ${styles.birthdayKey}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16" className={styles.birthdayIcon} aria-hidden="true">
                  <path d="M14.03076875 1.36615625h-1.80923125v-0.60308125c0 -0.46425 -0.5025625 -0.7544 -0.9046125 -0.522275 -0.18659375 0.107725 -0.3015375 0.30681875 -0.3015375 0.522275v0.60308125H4.9846125v-0.60308125c0 -0.46425 -0.5025625 -0.7544 -0.9046125 -0.522275 -0.18659375 0.107725 -0.3015375 0.30681875 -0.3015375 0.522275v0.60308125H1.96923125c-0.66614375 0 -1.20615625 0.5400125 -1.20615625 1.20615v12.0615375c0 0.66614375 0.5400125 1.20615625 1.20615625 1.20615625h12.0615375c0.66611875 -0.00003125 1.20615625 -0.5400375 1.20615625 -1.20615625V2.57230625c0 -0.6661625 -0.53999375 -1.20618125 -1.20615625 -1.20615ZM3.7784625 2.57230625v0.603075c0 0.46425 0.5025625 0.75440625 0.9046125 0.52228125 0.18659375 -0.107725 0.3015375 -0.30681875 0.3015375 -0.52228125v-0.603075h6.030775v0.603075c0 0.46425 0.5025625 0.75440625 0.9046125 0.52228125 0.18659375 -0.107725 0.3015375 -0.30681875 0.3015375 -0.52228125v-0.603075h1.80923125v2.41230625H1.96923125V2.57230625Zm10.25230625 12.0615375H1.96923125V6.19076875h12.0615375v8.443075Zm-5.12615625 -5.72923125c0 0.696375 -0.75384375 1.1316125 -1.35691875 0.783425 -0.60308125 -0.3481875 -0.60308125 -1.21865625 0 -1.56684375C7.6852125 8.0418 7.84120625 8 8 8c0.49960625 0 0.9046125 0.4050125 0.9046125 0.9046125Zm3.316925 0c0 0.696375 -0.75384375 1.1316125 -1.356925 0.783425 -0.603075 -0.3481875 -0.603075 -1.21865625 0 -1.56684375 0.13751875 -0.07939375 0.29351875 -0.12119375 0.4523125 -0.12119375 0.49960625 0 0.9046125 0.4050125 0.9046125 0.9046125ZM5.58769375 11.92c0 0.696375 -0.75385 1.13160625 -1.356925 0.78341875 -0.603075 -0.3481875 -0.603075 -1.21865 0 -1.5668375 0.13751875 -0.0794 0.2935125 -0.1212 0.45230625 -0.1212 0.49960625 0 0.90461875 0.4050125 0.90461875 0.90461875Zm3.31691875 0c0 0.696375 -0.75384375 1.13160625 -1.35691875 0.78341875 -0.60308125 -0.3481875 -0.60308125 -1.21865 0 -1.5668375 0.13751875 -0.0794 0.2935125 -0.1212 0.45230625 -0.1212 0.49960625 0 0.9046125 0.4050125 0.9046125 0.90461875Zm3.316925 0c0 0.696375 -0.75384375 1.13160625 -1.356925 0.78341875 -0.603075 -0.3481875 -0.603075 -1.21865 0 -1.5668375 0.13751875 -0.0794 0.29351875 -0.1212 0.4523125 -0.1212 0.49960625 0 0.9046125 0.4050125 0.9046125 0.90461875Z"></path>
                </svg>
                <span>Birthday</span>
              </span>
              <span className={styles.infoValue}>30 May</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={`${styles.infoKey} ${styles.birthdayKey}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16" className={styles.birthdayIcon} aria-hidden="true">
                  <path d="M8 3.52003125c-2.1554625 -0.00009375 -3.50260625 2.3332 -2.42495625 4.1999375 1.07764375 1.86673125 3.771975 1.86685 4.8497875 0.00021875 0.24579375 -0.4256875 0.3752 -0.908575 0.3752 -1.400125 0 -1.5464625 -1.25356875 -2.8001 -2.80003125 -2.80003125Zm0 4.48005c-1.293275 0.00005625 -2.1015625 -1.399925 -1.454975 -2.5199625 0.6465875 -1.1200375 2.2631875 -1.1201125 2.909875 -0.00013125 0.147475 0.2554125 0.22511875 0.54514375 0.22511875 0.840075 0 0.92781875 -0.7522 1.679975 -1.68001875 1.68001875ZM8 0.16c-3.40050625 0.00385625 -6.15620625 2.75955625 -6.1600625 6.1600625 0 2.19801875 1.0157125 4.52764375 2.94003125 6.73756875 0.8646625 0.99860625 1.8378375 1.89781875 2.90153125 2.681025 0.1928875 0.135125 0.4497125 0.135125 0.64260625 0 1.06173125 -0.78353125 2.0330125 -1.6827375 2.895925 -2.681025 1.92151875 -2.209925 2.94003125 -4.53955 2.94003125 -6.73756875C14.15620625 2.91955625 11.40050625 0.16385625 8 0.16Zm0 14.42014375c-1.1571125 -0.91000625 -5.04005 -4.25254375 -5.04005 -8.26008125 0 -3.87983125 4.20004375 -6.30473125 7.560075 -4.3648125 1.5594 0.90031875 2.520025 2.564175 2.520025 4.3648125 0 4.0061375 -3.8829375 7.350075 -5.04005 8.26008125Z"></path>
                </svg>
                <span>From</span>
              </span>
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
                src="/images/profilepic4.jpg"
                alt="Momo"
                fill
                sizes="280px"
                className={styles.portraitImg}
              />
            </div>
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

        
        {/* ── Countries I've Visited ── */}
        <div className={styles.travelSection}>
          {/* Title row with airplane icon */}
            <div className={styles.travelTitleRow}>
              <span className={styles.travelIconWrapper} aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="28" height="28" aria-hidden="true">
                  <path d="m12.80728125 6.6057125 2.28435625 -2.14951875 0.01333125 -0.013325c1.3656375 -1.36564375 0.7408125 -3.697525 -1.1246875 -4.19738125 -0.86578125 -0.2319875 -1.7895625 0.0155375 -2.42335625 0.6493375 0 0.0047 -0.008625 0.008625 -0.01333125 0.013325l-2.14951875 2.28435625L2.8875 0.82505625c-0.22895 -0.083275 -0.48540625 -0.02641875 -0.6577125 0.14580625L0.34836875 2.85228125C0.06875 3.132125 0.1149 3.59778125 0.44400625 3.81729375L5.4525 7.15603125l-1.161775 1.15785625h-1.6219375c-0.16610625 0.000075 -0.3254 0.06605 -0.44291875 0.1834375L0.34445 10.37874375c-0.31825 0.31746875 -0.208975 0.8568125 0.2077375 1.025375l2.8864125 1.15471875 1.15236875 2.880925 0.00470625 0.01254375c0.17313125 0.41908125 0.72008125 0.52158125 1.0332125 0.19363125l1.871225 -1.8720125c0.11825 -0.1171375 0.1850875 -0.276475 0.1857875 -0.44291875V11.7090625l1.157075 -1.15706875 3.3387375 5.00849375c0.2195125 0.32910625 0.68516875 0.37525625 0.9650125 0.0956375l1.88141875 -1.88141875c0.172225 -0.17230625 0.22908125 -0.4287625 0.14580625 -0.6577125Zm-0.0054875 7.6221 -3.33873125 -5.00770625c-0.10365 -0.15745625 -0.27263125 -0.2599375 -0.46016875 -0.27908125h-0.061925c-0.16649375 0.00008125 -0.32611875 0.06635625 -0.44370625 0.184225l-1.88141875 1.88141875c-0.117675 0.11739375 -0.1839375 0.2767 -0.18421875 0.44291875v1.6219375l-1.02459375 1.0245875 -0.9015125 -2.2545625c-0.06373125 -0.1581625 -0.18911875 -0.28354375 -0.347275 -0.34728125l-2.253 -0.9015125 1.02380625 -1.0245875h1.62115625c0.166375 0.00013125 0.3259875 -0.06585625 0.4437 -0.1834375l1.88141875 -1.881425c0.28026875 -0.27989375 0.23408125 -0.7463 -0.0956375 -0.96579375L1.771975 3.19799375l1.0583 -1.0575125 6.52381875 2.37215625c0.234925 0.08631875 0.4986875 0.02469375 0.6710375 -0.1567875l2.42546875 -2.57989375c0.69279375 -0.6725375 1.8538375 -0.3429 2.089875 0.59335 0.10635 0.4218375 -0.01348125 0.86865625 -0.3166375 1.18066875l-2.5767625 2.42468125c-0.18148125 0.17235625 -0.24310625 0.4361125 -0.1567875 0.6710375l2.37215625 6.523825Z"></path>
                </svg>
              </span>
              <h3 className={styles.travelHeading}>Countries I&apos;ve Visited</h3>
            </div>
          <div className={styles.travelDivider} />

          {/* Soft rounded container */}
          <div className={styles.travelBox}>
            {/* LEFT — world map image */}
            <div className={styles.mapSide}>
              <Image
                src="/images/map.jpg"
                alt="World map showing countries I've visited"
                width={700}
                height={420}
                className={styles.worldMap}
                priority={false}
              />
            </div>

            {/* RIGHT — country list */}
            <div className={styles.countrySide}>
              <ul className={styles.countryList}>
                {[
                  { flagSrc: "/icons/flags/japan.svg",       name: "Japan" },
                  { flagSrc: "/icons/flags/australia.svg",   name: "Australia" },
                  { flagSrc: "/icons/flags/uk.svg",          name: "UK" },
                  { flagSrc: "/icons/flags/italy.svg",       name: "Italy" },
                  { flagSrc: "/icons/flags/us.svg",          name: "US" },
                  { flagSrc: "/icons/flags/cambodia.svg",    name: "Cambodia" },
                  { flagSrc: "/icons/flags/philippines.svg", name: "The Philippines" },
                  { flagSrc: "/icons/flags/new-zealand.svg", name: "New Zealand" },
                ].map((c) => (
                  <li key={c.name} className={styles.countryItem}>
                    <Image src={c.flagSrc} alt={`${c.name} flag`} width={32} height={22} className={styles.countryFlag} />
                    <span className={styles.countryName}>{c.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

          {/* ── Favorite Moments (film strip) ── */}
          <div className={styles.momentsSection}>
            <div className={styles.travelTitleRow}>
              <span className={styles.travelIconWrapper} aria-hidden="true">02</span>
              <h3 className={styles.travelHeading}>Favorite Moments</h3>
            </div>
            <div className={styles.travelDivider} />

            <div className={styles.momentsBox}>
              <FilmStrip />
            </div>
          </div>

      </div>
    </section>
  )
}
