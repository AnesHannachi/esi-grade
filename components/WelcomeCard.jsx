"use client"

import { useRouter } from "next/navigation"

const features = [
  {
    icon: "📅",
    title: "Choisissez votre année",
    desc: "Sélectionnez votre année académique et votre semestre d'étude",
    color: "linear-gradient(135deg, #4f8ef7, #22d3ee)",
    glow: "rgba(79,142,247,0.2)",
  },
  {
    icon: "✏️",
    title: "Saisissez vos notes",
    desc: "Entrez vos notes de CI, CF, TP pour chaque module",
    color: "linear-gradient(135deg, #a78bfa, #ec4899)",
    glow: "rgba(167,139,250,0.2)",
  },
  {
    icon: "📊",
    title: "Obtenez vos résultats",
    desc: "Visualisez instantanément votre moyenne semestrielle",
    color: "linear-gradient(135deg, #34d399, #06b6d4)",
    glow: "rgba(52,211,153,0.2)",
  },
]

export default function WelcomeCard() {
  const router = useRouter()

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 24px", position: "relative", overflow: "hidden" }}>
      {/* Decorative orbs */}
      <div className="orb orb-blue" style={{ width: "500px", height: "500px", top: "-200px", left: "-150px", opacity: 0.3, animationDelay: "0s" }} />
      <div className="orb orb-cyan" style={{ width: "400px", height: "400px", bottom: "-100px", right: "-100px", opacity: 0.2, animationDelay: "2s" }} />
      <div className="orb orb-purple" style={{ width: "300px", height: "300px", top: "30%", right: "10%", opacity: 0.15, animationDelay: "1s" }} />

      {/* Main content */}
      <div style={{ maxWidth: "900px", width: "100%", position: "relative", zIndex: 1 }}>

        {/* Badge */}
        <div className="animate-slide-up" style={{ display: "flex", justifyContent: "center", marginBottom: "28px" }}>
          <div className="badge animate-bounce-subtle">
            <span>🎓</span>
            École Supérieure d'Informatique
          </div>
        </div>

        {/* Headline */}
        <div className="animate-slide-up-delay-1" style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.03em", color: "#f0f4ff", marginBottom: "4px" }}>
            Prenez le contrôle de{" "}
          </h1>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            <span className="gradient-text">votre parcours académique</span>{" "}🚀
          </h1>
        </div>

        {/* Subtitle */}
        <div className="animate-slide-up-delay-2" style={{ textAlign: "center", marginBottom: "52px" }}>
          <p style={{ fontSize: "1.15rem", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "600px", margin: "0 auto" }}>
            Bienvenue sur <strong style={{ color: "#f0f4ff" }}>ESI-Moyenne</strong> — votre assistant intelligent pour
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
                  background: f.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  marginBottom: "16px",
                  boxShadow: `0 8px 24px ${f.glow}`,
                }}
              >
                {f.icon}
              </div>
              <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#f0f4ff", marginBottom: "8px" }}>{f.title}</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="animate-slide-up-delay-4" style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
          <button
            onClick={() => router.push("/semesters")}
            className="btn-primary"
            style={{ fontSize: "1.1rem", padding: "16px 48px", display: "flex", alignItems: "center", gap: "10px" }}
          >
            <span>Commencer le calcul</span>
            <span style={{ fontSize: "1.2rem" }}>→</span>
          </button>
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
            borderTop: "1px solid rgba(255,255,255,0.06)",
            flexWrap: "wrap",
          }}
        >
          {[
            { value: "4", label: "Années" },
            { value: "8", label: "Semestres" },
            { value: "32+", label: "Modules" },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div className="gradient-text" style={{ fontSize: "1.8rem", fontWeight: 900, lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px", letterSpacing: "0.06em", textTransform: "uppercase" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
