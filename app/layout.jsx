import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata = {
  title: "ESI-Grade — Calculez vos moyennes",
  description: "Votre assistant intelligent pour calculer vos moyennes et suivre votre progression à l'ESI.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body style={{ fontFamily: "var(--font-inter, 'Inter', system-ui, sans-serif)" }}>
        {children}
      </body>
    </html>
  )
}
