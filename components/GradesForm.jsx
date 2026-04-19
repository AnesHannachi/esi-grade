"use client"

import { useState } from "react"
import { coursesData } from "@/lib/coursesData"

export default function GradesForm({ year, semester, onSubmit }) {
  const modules = coursesData[Number(year)]?.[Number(semester)] || []

  const [gradesData, setGradesData] = useState(
    modules.map((m) => ({
      id: m.id,
      name: m.name,
      note1Value: "",
      note1Name: m.note1,
      note1Percent: m.percent1,
      note2Value: "",
      note2Name: m.note2,
      note2Percent: m.percent2,
    })),
  )

  const handleNoteChange = (id, field, value) => {
    setGradesData(gradesData.map((g) => (g.id === id ? { ...g, [field]: value } : g)))
  }

  const handleSubmit = () => {
    const finalData = gradesData.map((g) => ({
      name: g.name,
      note1: { name: g.note1Name, value: Number.parseFloat(g.note1Value) || 0, percent: g.note1Percent },
      note2: { name: g.note2Name, value: Number.parseFloat(g.note2Value) || 0, percent: g.note2Percent },
      average:
        ((Number.parseFloat(g.note1Value) || 0) * g.note1Percent +
          (Number.parseFloat(g.note2Value) || 0) * g.note2Percent) /
        100,
    }))
    onSubmit(finalData)
  }

  const completedCount = gradesData.filter((g) => g.note1Value !== "" && g.note2Value !== "").length
  const isComplete = completedCount === gradesData.length
  const progress = gradesData.length > 0 ? (completedCount / gradesData.length) * 100 : 0

  const getModulePreview = (g) => {
    const v1 = Number.parseFloat(g.note1Value)
    const v2 = Number.parseFloat(g.note2Value)
    if (!g.note1Value && !g.note2Value) return null
    const avg = ((v1 || 0) * g.note1Percent + (v2 || 0) * g.note2Percent) / 100
    return avg.toFixed(2)
  }

  const getScoreColor = (score) => {
    if (score >= 16) return "#34d399"
    if (score >= 14) return "#4f8ef7"
    if (score >= 10) return "#fb923c"
    return "#ef4444"
  }

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "40px 24px", position: "relative", overflow: "hidden" }}>
      {/* Orbs */}
      <div className="orb orb-blue" style={{ width: "350px", height: "350px", top: "-80px", right: "-80px", opacity: 0.2 }} />
      <div className="orb orb-purple" style={{ width: "300px", height: "300px", bottom: "0", left: "-60px", opacity: 0.12 }} />

      <div style={{ maxWidth: "860px", width: "100%", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div className="animate-slide-up" style={{ marginBottom: "32px" }}>
          <div className="badge" style={{ marginBottom: "16px", display: "inline-flex" }}>
            Étape 2 sur 2
          </div>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "#f0f4ff", marginBottom: "8px" }}>
            Saisir vos <span className="gradient-text">notes</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
            Année {year} · Semestre {semester} · {modules.length} modules
          </p>
        </div>

        {/* Progress bar */}
        <div className="animate-slide-up-delay-1 glass-card" style={{ padding: "20px 24px", marginBottom: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-secondary)" }}>
              Progression
            </span>
            <span style={{ fontSize: "0.875rem", fontWeight: 700, color: isComplete ? "var(--accent-green)" : "var(--accent-blue)" }}>
              {completedCount} / {gradesData.length} modules complétés
            </span>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${progress}%`, background: isComplete ? "linear-gradient(135deg, #34d399, #06b6d4)" : undefined }} />
          </div>
        </div>

        {/* Modules */}
        <div className="animate-slide-up-delay-2" style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
          {gradesData.map((module, idx) => {
            const preview = getModulePreview(module)
            const previewNum = preview ? Number(preview) : null
            const filled1 = module.note1Value !== ""
            const filled2 = module.note2Value !== ""
            const bothFilled = filled1 && filled2

            return (
              <div
                key={module.id}
                className="glass-card animate-slide-up"
                style={{
                  padding: "22px 24px",
                  animationDelay: `${idx * 0.07}s`,
                  borderColor: bothFilled ? "rgba(79,142,247,0.25)" : "rgba(255,255,255,0.08)",
                  background: bothFilled ? "rgba(79,142,247,0.06)" : "rgba(255,255,255,0.04)",
                  cursor: "default",
                  transform: "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", gap: "12px", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        background: bothFilled ? "linear-gradient(135deg, #4f8ef7, #22d3ee)" : "rgba(255,255,255,0.07)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.8rem",
                        fontWeight: 800,
                        color: bothFilled ? "white" : "var(--text-muted)",
                        flexShrink: 0,
                        transition: "all 0.3s",
                      }}
                    >
                      {bothFilled ? "✓" : `M${module.id}`}
                    </div>
                    <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#f0f4ff" }}>{module.name}</h3>
                  </div>
                  {preview !== null && (
                    <div
                      style={{
                        padding: "6px 14px",
                        borderRadius: "100px",
                        background: `${getScoreColor(previewNum)}22`,
                        border: `1px solid ${getScoreColor(previewNum)}44`,
                        color: getScoreColor(previewNum),
                        fontWeight: 800,
                        fontSize: "0.9rem",
                        transition: "all 0.3s",
                      }}
                    >
                      Moy: {preview}/20
                    </div>
                  )}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  {/* Note 1 */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "8px", letterSpacing: "0.02em" }}>
                      {module.note1Name}
                      <span style={{ marginLeft: "6px", color: "var(--accent-blue)", background: "rgba(79,142,247,0.15)", borderRadius: "6px", padding: "2px 6px", fontSize: "0.72rem" }}>
                        {module.note1Percent}%
                      </span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      step="0.25"
                      value={module.note1Value}
                      onChange={(e) => handleNoteChange(module.id, "note1Value", e.target.value)}
                      placeholder="0 – 20"
                      className="grade-input"
                      style={{ borderColor: filled1 ? "rgba(79,142,247,0.4)" : undefined }}
                    />
                  </div>
                  {/* Note 2 */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "8px", letterSpacing: "0.02em" }}>
                      {module.note2Name}
                      <span style={{ marginLeft: "6px", color: "var(--accent-cyan)", background: "rgba(34,211,238,0.12)", borderRadius: "6px", padding: "2px 6px", fontSize: "0.72rem" }}>
                        {module.note2Percent}%
                      </span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      step="0.25"
                      value={module.note2Value}
                      onChange={(e) => handleNoteChange(module.id, "note2Value", e.target.value)}
                      placeholder="0 – 20"
                      className="grade-input"
                      style={{ borderColor: filled2 ? "rgba(34,211,238,0.4)" : undefined }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Submit */}
        <div className="animate-slide-up-delay-3">
          <button
            onClick={handleSubmit}
            disabled={!isComplete}
            className="btn-primary"
            style={{
              width: "100%",
              fontSize: "1.05rem",
              padding: "18px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {isComplete ? (
              <>
                <span>📊</span>
                <span>Voir mon tableau de résultats</span>
                <span>→</span>
              </>
            ) : (
              <span>Complétez toutes les notes pour continuer ({completedCount}/{gradesData.length})</span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
