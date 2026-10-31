import Link from "next/link"

const features = [
  {
    number: "01",
    title: "Choisissez votre année",
    desc: "Sélectionnez votre année académique et votre semestre d'étude",
  },
  {
    number: "02",
    title: "Saisissez vos notes",
    desc: "Entrez vos notes de CI, CF, TP pour chaque module",
  },
  {
    number: "03",
    title: "Obtenez vos résultats",
    desc: "Visualisez instantanément votre moyenne semestrielle",
  },
]

export default function WelcomeCard() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 24px", position: "relative", overflow: "hidden" }}>

      {/* Main content */}
      <div style={{ maxWidth: "900px", width: "100%", position: "relative", zIndex: 1 }}>

        {/* Badge */}
        <div className="animate-slide-up" style={{ display: "flex", justifyContent: "center", marginBottom: "28px" }}>
          <div className="badge">École Supérieure d'Informatique</div>
        </div>

        {/* Headline */}
        <div className="animate-slide-up-delay-1" style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1 className="welcome-title" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.03em", color: "#f0f4ff", marginBottom: "4px" }}>
            Prenez le contrôle de <span className="accent-text">votre parcours académique</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="animate-slide-up-delay-2" style={{ textAlign: "center", marginBottom: "52px" }}>
          <p style={{ fontSize: "1.15rem", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "600px", margin: "0 auto" }}>
            Bienvenue sur <strong style={{ color: "#f0f4ff" }}>ESI-Grade</strong> - votre assistant intelligent pour
            calculer vos moyennes et suivre votre progression tout au long de votre scolarité.
          </p>
        </div>

        {/* Feature cards */}
        <div
          className="animate-slide-up-delay-3"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
            marginBottom: "48px",
          }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              className="glass-card"
              style={{ padding: "28px 24px", cursor: "default" }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  background: "var(--accent-blue)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.9rem",
                  fontWeight: 800,
                  color: "white",
                  marginBottom: "16px",
                }}
              >
                {f.number}
              </div>
              <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#f0f4ff", marginBottom: "8px" }}>{f.title}</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="animate-slide-up-delay-4" style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
          <Link
            href="/semesters"
            className="btn-primary"
            style={{ fontSize: "1.1rem", padding: "16px 48px", display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
          >
            <span>Commencer le calcul</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Stats strip */}
        <div
          className="animate-slide-up-delay-4"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            marginTop: "48px",
            padding: "20px",
            borderTop: "1px solid #38516c",
            flexWrap: "wrap",
          }}
        >
          {[
            { value: "4", label: "Années" },
            { value: "8", label: "Semestres" },
            { value: "32+", label: "Modules" },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div className="accent-text" style={{ fontSize: "1.8rem", fontWeight: 900, lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px", letterSpacing: "0.06em", textTransform: "uppercase" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
