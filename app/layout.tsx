import type { Metadata } from "next";
import { PUBLIC_SAFE_MODE } from '@/lib/safeMode'
import { Playfair_Display, Poppins } from "next/font/google";
import { Header } from '@/components/header'
import "./globals.css";
import ThemeProvider from "@/components/theme-provider";
import Script from 'next/script'

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
})

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
})

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
        className={`${poppins.variable} ${playfair.variable} antialiased`}
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
