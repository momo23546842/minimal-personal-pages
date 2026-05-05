"use client"

import { ReactNode } from "react"
import styles from "./notebook-tabs.module.css"

interface Tab {
  id: string
  label: string
  icon?: ReactNode
}

interface NotebookTabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  children: ReactNode
}

export function NotebookTabs({ tabs, activeTab, onTabChange, children }: NotebookTabsProps) {
  return (
    <div className={styles.container}>
      {/* Tab Navigation */}
      <div className={styles.tabsRow}>
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            data-tab={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : styles.tabInactive}`}
            style={{
              // Slight offset for each tab to create organic feel
              transform: `translateY(${activeTab === tab.id ? '0' : '4px'}) rotate(${-1 + index * 0.5}deg)`,
              zIndex: activeTab === tab.id ? 10 : 5 - index,
            }}
          >
            {tab.icon && <span className={styles.tabIcon}>{tab.icon}</span>}
            <span className={styles.tabLabel}>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content Area - Notebook Page */}
      <div className={styles.contentArea}>
        {/* Decorative tape pieces */}
        <div className={styles.tapeLeft}></div>
        <div className={styles.tapeRight}></div>
        
        {/* Actual content */}
        <div className={styles.contentInner}>
          {children}
        </div>
      </div>
    </div>
  )
}
