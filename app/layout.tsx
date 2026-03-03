import type { Metadata } from "next";
import { PUBLIC_SAFE_MODE } from '@/lib/safeMode'
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from '@/components/header'
import "./globals.css";
import ThemeProvider from "@/components/theme-provider";
import Script from 'next/script'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Momo — Digital Twin Chat',
  description: 'Momo digital twin chat interface',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html:
              `(function(){try{const t=localStorage.getItem('theme');if(t){document.documentElement.classList.remove('light','dark');document.documentElement.classList.add(t);document.documentElement.style.colorScheme = t === 'dark' ? 'dark' : 'light';}}catch(e){}})();`,
          }}
        />
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
