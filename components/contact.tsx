"use client"

import { useState } from "react"
import { PUBLIC_SAFE_MODE } from "@/lib/safeMode"
import { Mail, MapPin, Send, Check, Loader2 } from "lucide-react"
import styles from "./contact.module.css"

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  if (PUBLIC_SAFE_MODE) return null

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!form.email || !form.message) return
    setStatus("sending")
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
      if (!response.ok) throw new Error("Failed")
      setStatus("sent")
      setForm({ name: "", email: "", message: "" })
      setTimeout(() => setStatus("idle"), 5000)
    } catch {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 3000)
    }
  }

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.index}>04 / 04</span>
          <h2 className={styles.title}>Contact</h2>
          <p className={styles.subtitle}>Have a thought, project, or hello to share?</p>
        </div>
        <div className={styles.layout}>
          <div className={styles.details}>
            <p>Whether you have a project in mind, want to discuss a collaboration, or just want to say hello, I would love to hear from you.</p>
            <div className={styles.detail}><MapPin size={16} /><span>Sydney, Australia</span></div>
            <div className={styles.detail}><Mail size={16} /><span>Available via contact form</span></div>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label>Name<input type="text" placeholder="Your name" value={form.name} onChange={event => setForm(current => ({ ...current, name: event.target.value }))} /></label>
            <label>Email<input type="email" placeholder="your@email.com" value={form.email} onChange={event => setForm(current => ({ ...current, email: event.target.value }))} /></label>
            <label>Message<textarea rows={4} placeholder="Your message..." value={form.message} onChange={event => setForm(current => ({ ...current, message: event.target.value }))} /></label>
            {status === "sent" ? <div className={styles.notice}><Check size={15} /> Message sent. I will get back to you soon.</div> : status === "error" ? <div className={styles.notice}>Failed to send. Please try again.</div> : <button className={styles.submit} type="submit" disabled={status === "sending" || !form.email || !form.message}>{status === "sending" ? <><Loader2 size={15} className={styles.spin} /> Sending</> : <><Send size={15} /> Send message</>}</button>}
          </form>
        </div>
      </div>
    </section>
  )
}
