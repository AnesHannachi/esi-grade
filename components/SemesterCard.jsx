"use client"

import { useState } from "react"

const years = [
  {
    id: 1,
    label: "1ère Année",
    desc: "Fondamentaux & découverte",
  },
  {
    id: 2,
    label: "2ème Année",
    desc: "Algorithmique & réseaux",
  },
  {
    id: 3,
    label: "3ème Année",
    desc: "IA & Cloud Computing",
  },
  {
    id: 4,
    label: "4ème Année",
    desc: "Projet professionnel",
  },
]

const semesters = [
  {
    id: 1,
    label: "Semestre 1",
    desc: "Septembre à janvier",
  },
  {
    id: 2,
    label: "Semestre 2",
    desc: "Février à juin",
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

      <div style={{ maxWidth: "900px", width: "100%", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div className="animate-slide-up" style={{ textAlign: "center", marginBottom: "48px" }}>
          <div className="badge" style={{ marginBottom: "20px", display: "inline-flex" }}>
            Étape 1 sur 3
          </div>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.2, color: "#f0f4ff", marginBottom: "12px" }}>
            Choisissez votre <span className="accent-text">profil académique</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
            Sélectionnez votre année et votre semestre pour commencer
          </p>
        </div>

        {/* Year selection */}
        <div className="animate-slide-up-delay-1" style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div className="section-marker" aria-hidden="true" />
            <h2 id="year-heading" style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-secondary)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Année académique
            </h2>
          </div>
          <div className="selection-grid selection-grid-years" role="group" aria-labelledby="year-heading">
            {years.map((year) => {
              const isSelected = selectedYear === year.id
              return (
                <button
                  key={year.id}
                  onClick={() => setSelectedYear(year.id)}
                  aria-pressed={isSelected}
                  className={`selection-card year-card${isSelected ? " is-selected" : ""}`}
                  style={{
                    background: "var(--surface-card)",
                    border: `1px solid ${isSelected ? "var(--accent-cyan)" : "var(--border-strong)"}`,
                    borderRadius: "16px",
                    padding: "20px 16px",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                    textAlign: "left",
                    boxShadow: isSelected ? "0 0 0 1px var(--accent-cyan)" : "none",
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: "1rem", color: "#f0f4ff", marginBottom: "4px" }}>{year.label}</div>
                  <div style={{ fontSize: "0.84rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{year.desc}</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Semester selection */}
        <div className="animate-slide-up-delay-2" style={{ marginBottom: "36px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div className="section-marker" aria-hidden="true" />
            <h2 id="semester-heading" style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-secondary)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Semestre
            </h2>
          </div>
          <div className="selection-grid selection-grid-semesters" role="group" aria-labelledby="semester-heading">
            {semesters.map((sem) => {
              const isSelected = selectedSemester === sem.id
              return (
                <button
                  key={sem.id}
                  onClick={() => setSelectedSemester(sem.id)}
                  aria-pressed={isSelected}
                  className={`selection-card semester-card${isSelected ? " is-selected" : ""}`}
                  style={{
                    background: "var(--surface-card)",
                    border: `1px solid ${isSelected ? "var(--accent-cyan)" : "var(--border-strong)"}`,
                    borderRadius: "16px",
                    padding: "22px 24px",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    boxShadow: isSelected ? "0 0 0 1px var(--accent-cyan)" : "none",
                  }}
                >
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "#f0f4ff", marginBottom: "2px" }}>{sem.label}</div>
                    <div style={{ fontSize: "0.86rem", color: "var(--text-secondary)" }}>{sem.desc}</div>
                  </div>
                  {isSelected && (
                    <div
                      style={{
                        marginLeft: "auto",
                        width: "22px",
                        height: "22px",
                        borderRadius: "6px",
                        background: "var(--accent-cyan)",
                        padding: "4px 8px",
                        color: "#061323",
                        fontWeight: 800,
                        fontSize: "0.72rem",
                      }}
                    >
                      <span aria-hidden="true">✓</span>
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
            className="btn-primary selection-continue"
            style={{ flex: 1, minWidth: "200px", fontSize: "1rem", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}
          >
            <span>Continuer pour saisir les notes</span>
            <span aria-hidden="true">→</span>
          </button>
          <button
            onClick={() => { setSelectedYear(null); setSelectedSemester(null) }}
            disabled={!selectedYear && !selectedSemester}
            className="btn-secondary"
            style={{ padding: "16px 24px", display: "flex", alignItems: "center", gap: "8px" }}
          >
            <span aria-hidden="true">↺</span> Réinitialiser
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
              background: "#102d49",
              border: "1px solid #4d789d",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "0.9rem",
              color: "var(--text-secondary)",
            }}
            role="status"
            aria-live="polite"
          >
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
