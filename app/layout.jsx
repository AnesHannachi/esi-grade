import "./globals.css"

export const metadata = {
  title: "ESI-Grade — Calculez vos moyennes",
  description: "Votre assistant intelligent pour calculer vos moyennes et suivre votre progression à l'ESI.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  )
}
