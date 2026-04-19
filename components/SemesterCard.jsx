"use client"

import { useState } from "react"

const years = [
  {
    id: 1,
    label: "1ère Année",
    icon: "🌱",
    color: "linear-gradient(135deg, #3B82F6, #5EA6FF)",
    glow: "rgba(59,130,246,0.35)",
    border: "rgba(59,130,246,0.5)",
    desc: "Fondamentaux & découverte",
  },
  {
    id: 2,
    label: "2ème Année",
    icon: "🚀",
    color: "linear-gradient(135deg, #22c55e, #75e59c)",
    glow: "rgba(34,197,94,0.35)",
    border: "rgba(34,197,94,0.5)",
    desc: "Algorithmique & réseaux",
  },
  {
    id: 3,
    label: "3ème Année",
    icon: "⚡",
    color: "linear-gradient(135deg, #a855f7, #cea2ff)",
    glow: "rgba(168,85,247,0.35)",
    border: "rgba(168,85,247,0.5)",
    desc: "IA & Cloud Computing",
  },
  {
    id: 4,
    label: "4ème Année",
    icon: "🎓",
    color: "linear-gradient(135deg, #ef4444, #ff8a8a)",
    glow: "rgba(239,68,68,0.35)",
    border: "rgba(239,68,68,0.5)",
    desc: "Projet professionnel",
  },
]

const semesters = [
  {
    id: 1,
    label: "Semestre 1",
    icon: "🍂",
    desc: "Septembre → Janvier",
    color: "linear-gradient(135deg, #4f8ef7, #22d3ee)",
    glow: "rgba(79,142,247,0.3)",
  },
  {
    id: 2,
    label: "Semestre 2",
    icon: "🌸",
    desc: "Février → Juin",
    color: "linear-gradient(135deg, #34d399, #06b6d4)",
    glow: "rgba(52,211,153,0.3)",
  },
]

export default function SemesterCard({ onContinue }) {
  const [selectedYear, setSelectedYear] = useState(null)
  const [selectedSemester, setSelectedSemester] = useState(null)

  const handleClick = () => {
    if (selectedYear && selectedSemester) {
      onContinue(selectedYear, selectedSemester)
    }
  }

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Orbs */}
      <div className="orb orb-blue" style={{ width: "400px", height: "400px", top: "-100px", right: "-100px", opacity: 0.25, animationDelay: "1s" }} />
      <div className="orb orb-purple" style={{ width: "350px", height: "350px", bottom: "-50px", left: "-80px", opacity: 0.15, animationDelay: "3s" }} />

      <div style={{ maxWidth: "900px", width: "100%", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div className="animate-slide-up" style={{ textAlign: "center", marginBottom: "48px" }}>
          <div className="badge" style={{ marginBottom: "20px", display: "inline-flex" }}>
            Étape 1 sur 2
          </div>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.2, color: "#f0f4ff", marginBottom: "12px" }}>
            Choisissez votre <span className="gradient-text">profil académique</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
            Sélectionnez votre année et votre semestre pour commencer
          </p>
        </div>

        {/* Year selection */}
        <div className="animate-slide-up-delay-1" style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ width: "4px", height: "20px", borderRadius: "2px", background: "linear-gradient(135deg, #4f8ef7, #22d3ee)" }} />
            <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-secondary)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Année académique
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px" }}>
            {years.map((year) => {
              const isSelected = selectedYear === year.id
              return (
                <button
                  key={year.id}
                  onClick={() => setSelectedYear(year.id)}
                  style={{
                    background: isSelected ? year.color : "rgba(255,255,255,0.04)",
                    border: `1px solid ${isSelected ? year.border : "rgba(255,255,255,0.1)"}`,
                    borderRadius: "16px",
                    padding: "20px 16px",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                    textAlign: "left",
                    boxShadow: isSelected ? `0 8px 32px ${year.glow}, inset 0 1px 0 rgba(255,255,255,0.2)` : "0 2px 8px rgba(0,0,0,0.2)",
                    transform: isSelected ? "translateY(-3px) scale(1.02)" : "translateY(0) scale(1)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    outline: isSelected ? `2px solid ${year.border}` : "none",
                    outlineOffset: "2px",
                  }}
                >
                  <div style={{ fontSize: "1.8rem", marginBottom: "8px" }}>{year.icon}</div>
                  <div style={{ fontWeight: 800, fontSize: "1rem", color: "#f0f4ff", marginBottom: "4px" }}>{year.label}</div>
                  <div style={{ fontSize: "0.78rem", color: isSelected ? "rgba(255,255,255,0.75)" : "var(--text-muted)", lineHeight: 1.4 }}>{year.desc}</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Semester selection */}
        <div className="animate-slide-up-delay-2" style={{ marginBottom: "36px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ width: "4px", height: "20px", borderRadius: "2px", background: "linear-gradient(135deg, #34d399, #06b6d4)" }} />
            <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-secondary)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Semestre
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px" }}>
            {semesters.map((sem) => {
              const isSelected = selectedSemester === sem.id
              return (
                <button
                  key={sem.id}
                  onClick={() => setSelectedSemester(sem.id)}
                  style={{
                    background: isSelected ? sem.color : "rgba(255,255,255,0.04)",
                    border: `1px solid ${isSelected ? "rgba(79,142,247,0.6)" : "rgba(255,255,255,0.1)"}`,
                    borderRadius: "16px",
                    padding: "22px 24px",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    boxShadow: isSelected ? `0 8px 32px ${sem.glow}, inset 0 1px 0 rgba(255,255,255,0.2)` : "0 2px 8px rgba(0,0,0,0.2)",
                    transform: isSelected ? "translateY(-3px)" : "translateY(0)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    outline: isSelected ? "2px solid rgba(79,142,247,0.5)" : "none",
                    outlineOffset: "2px",
                  }}
                >
                  <div style={{ fontSize: "2rem" }}>{sem.icon}</div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "#f0f4ff", marginBottom: "2px" }}>{sem.label}</div>
                    <div style={{ fontSize: "0.82rem", color: isSelected ? "rgba(255,255,255,0.75)" : "var(--text-muted)" }}>{sem.desc}</div>
                  </div>
                  {isSelected && (
                    <div
                      style={{
                        marginLeft: "auto",
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        color: "white",
                        fontWeight: 700,
                      }}
                    >
                      ✓
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="animate-slide-up-delay-3" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button
            onClick={handleClick}
            disabled={!selectedYear || !selectedSemester}
            className="btn-primary"
            style={{ flex: 1, minWidth: "200px", fontSize: "1rem", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}
          >
            <span>Continuer pour saisir les notes</span>
            <span>→</span>
          </button>
          <button
            onClick={() => { setSelectedYear(null); setSelectedSemester(null) }}
            className="btn-secondary"
            style={{ padding: "16px 24px", display: "flex", alignItems: "center", gap: "8px" }}
          >
            <span>↺</span> Réinitialiser
          </button>
        </div>

        {/* Selection summary */}
        {(selectedYear || selectedSemester) && (
          <div
            className="animate-fade-in"
            style={{
              marginTop: "20px",
              padding: "14px 20px",
              borderRadius: "12px",
              background: "rgba(79,142,247,0.08)",
              border: "1px solid rgba(79,142,247,0.2)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "0.9rem",
              color: "var(--text-secondary)",
            }}
          >
            <span style={{ color: "var(--accent-blue)", fontSize: "1rem" }}>ℹ</span>
            <span>
              Sélection :{" "}
              {selectedYear && <strong style={{ color: "#f0f4ff" }}>{years.find((y) => y.id === selectedYear)?.label}</strong>}
              {selectedYear && selectedSemester && <span style={{ margin: "0 6px" }}>·</span>}
              {selectedSemester && <strong style={{ color: "#f0f4ff" }}>{semesters.find((s) => s.id === selectedSemester)?.label}</strong>}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
