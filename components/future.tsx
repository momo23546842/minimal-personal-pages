import { Check, Circle } from 'lucide-react'
import styles from './future.module.css'

const items = [
  { text: 'Visit Melbourne', done: false },
  { text: 'Ride in a hot air balloon', done: false },
  { text: 'Travel to South Korea', done: false },
  { text: 'Visit Tasmania', done: false },
  { text: 'See Uluru', done: false },
  { text: 'Travel to New Zealand', done: false },
  { text: 'Watch the stars in a place with a beautiful night sky', done: true },
  { text: 'Finish reading a full book in English', done: false },
  { text: 'Travel to all 47 prefectures of Japan', done: false },
]

export default function Future() {
  return (
    <section id="future" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.index}>03 / 04</span>
          <h2 className={styles.title}>Future</h2>
          <p className={styles.subtitle}>A list of places, ideas, and experiences still ahead.</p>
        </div>
        <div className={styles.list}>
          {items.map((item, index) => (
            <div className={styles.item} key={item.text}>
              <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
              <span className={`${styles.marker} ${item.done ? styles.done : ''}`}>
                {item.done ? <Check size={13} /> : <Circle size={10} />}
              </span>
              <span className={styles.itemText}>{item.text}</span>
              <span className={styles.status}>{item.done ? 'Complete' : 'Planned'}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
