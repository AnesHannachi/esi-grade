"use client"

import { useState, useCallback } from "react"
import { coursesData } from "@/lib/coursesData"

// ─── Constants ─────────────────────────────────────────────────────────────────
const CONTROL_TYPES = [
  { key: "CI", label: "Contrôle Intermédiaire", abbr: "CI",  color: "#a78bfa", bg: "rgba(167,139,250,0.15)" },
  { key: "CC", label: "Contrôle Continu",        abbr: "CC",  color: "#4f8ef7", bg: "rgba(79,142,247,0.15)" },
  { key: "CF", label: "Contrôle Final",           abbr: "CF",  color: "#22d3ee", bg: "rgba(34,211,238,0.15)" },
  { key: "TP", label: "Travaux Pratiques",        abbr: "TP",  color: "#34d399", bg: "rgba(52,211,153,0.15)" },
  { key: "TD", label: "Travaux Dirigés",          abbr: "TD",  color: "#fb923c", bg: "rgba(251,146,60,0.15)" },
  { key: "EX", label: "Examen Final",             abbr: "EX",  color: "#f472b6", bg: "rgba(244,114,182,0.15)" },
]

// Each module uses its own defaultControls from coursesData (see lib/coursesData.jsx)
// UUIDs are added at runtime to ensure each control row has a unique React key
const makeControls = (defs) =>
  defs.map((d) => ({ ...d, id: crypto.randomUUID() }))

const getTypeInfo = (key) => CONTROL_TYPES.find((t) => t.key === key) || CONTROL_TYPES[0]

// ─── Helper ─────────────────────────────────────────────────────────────────────
const computeAverage = (controls) => {
  const totalPercent = controls.reduce((s, c) => s + c.percent, 0)
  if (totalPercent === 0) return null
  const weighted = controls.reduce((s, c) => s + (parseFloat(c.value) || 0) * c.percent, 0)
  return weighted / totalPercent
}

const getScoreColor = (score) => {
  if (score >= 16) return "#34d399"
  if (score >= 14) return "#4f8ef7"
  if (score >= 10) return "#fb923c"
  return "#ef4444"
}

// ─── PercentPill ────────────────────────────────────────────────────────────────
function PercentPill({ value, onChange, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <input
        type="number"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Math.max(0, Math.min(100, Number(e.target.value))))}
        style={{
          width: "52px",
          padding: "3px 6px",
          borderRadius: "8px",
          border: `1px solid ${color}55`,
          background: `${color}18`,
          color,
          fontWeight: 700,
          fontSize: "0.78rem",
          textAlign: "center",
          outline: "none",
        }}
      />
      <span style={{ color, fontSize: "0.75rem", fontWeight: 600 }}>%</span>
    </div>
  )
}

// ─── TypeSelector ───────────────────────────────────────────────────────────────
function TypeSelector({ value, onChange }) {
  const info = getTypeInfo(value)
  const [open, setOpen] = useState(false)
  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "5px 10px",
          borderRadius: "8px",
          border: `1px solid ${info.color}55`,
          background: info.bg,
          color: info.color,
          fontWeight: 700,
          fontSize: "0.8rem",
          cursor: "pointer",
          whiteSpace: "nowrap",
          transition: "all 0.2s",
        }}
      >
        {info.abbr} <span style={{ fontSize: "0.6rem", opacity: 0.7 }}>▼</span>
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            zIndex: 99,
            background: "#1a1f3a",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "12px",
            padding: "6px",
            display: "flex",
            flexDirection: "column",
            gap: "3px",
            minWidth: "200px",
            boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
          }}
        >
          {CONTROL_TYPES.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => { onChange(t.key); setOpen(false) }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 12px",
                borderRadius: "8px",
                border: "none",
                background: value === t.key ? t.bg : "transparent",
                color: value === t.key ? t.color : "var(--text-secondary)",
                fontWeight: value === t.key ? 700 : 500,
                fontSize: "0.85rem",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "28px",
                  height: "20px",
                  borderRadius: "5px",
                  background: t.bg,
                  color: t.color,
                  fontSize: "0.72rem",
                  fontWeight: 800,
                }}
              >
                {t.abbr}
              </span>
              {t.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── ModuleCard ─────────────────────────────────────────────────────────────────
function ModuleCard({ module, idx, onChange }) {
  const { controls } = module
  const totalPercent = controls.reduce((s, c) => s + c.percent, 0)
  const percentOk = totalPercent === 100
  const allFilled = controls.every((c) => c.value !== "")
  const avg = computeAverage(controls)

  const updateControl = useCallback((id, field, val) => {
    onChange(module.id, controls.map((c) => c.id === id ? { ...c, [field]: val } : c))
  }, [controls, module.id, onChange])

  const addControl = () => {
    if (controls.length >= 6) return
    onChange(module.id, [...controls, { id: crypto.randomUUID(), type: "CI", percent: 0, value: "" }])
  }

  const removeControl = (id) => {
    if (controls.length <= 1) return
    onChange(module.id, controls.filter((c) => c.id !== id))
  }

  return (
    <div
      className="glass-card animate-slide-up"
      style={{
        padding: "22px 24px",
        animationDelay: `${idx * 0.06}s`,
        borderColor: allFilled && percentOk ? "rgba(79,142,247,0.28)" : "rgba(255,255,255,0.08)",
        background: allFilled && percentOk ? "rgba(79,142,247,0.05)" : "rgba(255,255,255,0.03)",
        cursor: "default",
        transform: "none",
      }}
    >
      {/* Module header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px", gap: "12px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: allFilled && percentOk
                ? "linear-gradient(135deg, #4f8ef7, #22d3ee)"
                : "rgba(255,255,255,0.07)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.8rem",
              fontWeight: 800,
              color: allFilled && percentOk ? "white" : "var(--text-muted)",
              flexShrink: 0,
              transition: "all 0.3s",
            }}
          >
            {allFilled && percentOk ? "✓" : `M${module.id}`}
          </div>
          <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#f0f4ff" }}>{module.name}</h3>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Percent indicator */}
          <div
            style={{
              padding: "5px 12px",
              borderRadius: "100px",
              background: percentOk ? "rgba(52,211,153,0.12)" : "rgba(239,68,68,0.12)",
              border: `1px solid ${percentOk ? "rgba(52,211,153,0.35)" : "rgba(239,68,68,0.35)"}`,
              color: percentOk ? "#34d399" : "#ef4444",
              fontWeight: 700,
              fontSize: "0.8rem",
              transition: "all 0.3s",
            }}
          >
            Σ {totalPercent}%{!percentOk && <span style={{ marginLeft: "4px" }}>⚠</span>}
          </div>

          {/* Average badge */}
          {avg !== null && (
            <div
              style={{
                padding: "5px 14px",
                borderRadius: "100px",
                background: `${getScoreColor(avg)}20`,
                border: `1px solid ${getScoreColor(avg)}44`,
                color: getScoreColor(avg),
                fontWeight: 800,
                fontSize: "0.88rem",
                transition: "all 0.3s",
              }}
            >
              Moy: {avg.toFixed(2)}/20
            </div>
          )}
        </div>
      </div>

      {/* Controls grid */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "14px" }}>
        {controls.map((ctrl, ci) => {
          const info = getTypeInfo(ctrl.type)
          return (
            <div
              key={ctrl.id}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                gap: "10px",
                alignItems: "center",
                padding: "10px 14px",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                transition: "all 0.2s",
              }}
            >
              {/* Left: type + percent */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <TypeSelector value={ctrl.type} onChange={(val) => updateControl(ctrl.id, "type", val)} />
                <PercentPill
                  value={ctrl.percent}
                  onChange={(val) => updateControl(ctrl.id, "percent", val)}
                  color={info.color}
                />
              </div>

              {/* Middle: note input */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <label style={{ fontSize: "0.78rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                  {info.label}
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  step="0.25"
                  value={ctrl.value}
                  onChange={(e) => updateControl(ctrl.id, "value", e.target.value)}
                  placeholder="0–20"
                  className="grade-input"
                  style={{
                    flex: 1,
                    minWidth: "80px",
                    maxWidth: "130px",
                    borderColor: ctrl.value !== "" ? `${info.color}55` : undefined,
                  }}
                />
              </div>

              {/* Right: delete */}
              <button
                type="button"
                onClick={() => removeControl(ctrl.id)}
                disabled={controls.length <= 1}
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px",
                  border: "1px solid rgba(239,68,68,0.25)",
                  background: "rgba(239,68,68,0.08)",
                  color: controls.length <= 1 ? "rgba(239,68,68,0.25)" : "#ef4444",
                  cursor: controls.length <= 1 ? "not-allowed" : "pointer",
                  fontSize: "0.9rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                  flexShrink: 0,
                }}
              >
                ×
              </button>
            </div>
          )
        })}
      </div>

      {/* Add control button */}
      {controls.length < 6 && (
        <button
          type="button"
          onClick={addControl}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "7px 14px",
            borderRadius: "10px",
            border: "1px dashed rgba(79,142,247,0.4)",
            background: "rgba(79,142,247,0.06)",
            color: "#4f8ef7",
            fontWeight: 600,
            fontSize: "0.82rem",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          <span style={{ fontSize: "1rem" }}>+</span> Ajouter un contrôle
        </button>
      )}
    </div>
  )
}

// ─── GradesForm ─────────────────────────────────────────────────────────────────
export default function GradesForm({ year, semester, onSubmit }) {
  const modules = coursesData[Number(year)]?.[Number(semester)] || []

  const [modulesState, setModulesState] = useState(() =>
    modules.map((m) => ({
      id: m.id,
      name: m.name,
      // Use each module's own defaultControls, with fresh UUIDs
      controls: makeControls(m.defaultControls || [
        { type: "CI", percent: 25, value: "" },
        { type: "CC", percent: 25, value: "" },
        { type: "CF", percent: 50, value: "" },
      ]),
    }))
  )

  const handleControlsChange = useCallback((moduleId, newControls) => {
    setModulesState((prev) =>
      prev.map((m) => (m.id === moduleId ? { ...m, controls: newControls } : m))
    )
  }, [])

  // Validation
  const moduleStatuses = modulesState.map((m) => {
    const totalPercent = m.controls.reduce((s, c) => s + c.percent, 0)
    const allFilled = m.controls.every((c) => c.value !== "")
    return { percentOk: totalPercent === 100, allFilled, ready: totalPercent === 100 && allFilled }
  })

  const completedCount = moduleStatuses.filter((s) => s.ready).length
  const isComplete = completedCount === modulesState.length
  const progress = modulesState.length > 0 ? (completedCount / modulesState.length) * 100 : 0

  const handleSubmit = () => {
    const finalData = modulesState.map((m) => {
      const avg = computeAverage(m.controls) ?? 0
      return {
        name: m.name,
        controls: m.controls.map((c) => ({
          type: c.type,
          label: getTypeInfo(c.type).label,
          percent: c.percent,
          value: parseFloat(c.value) || 0,
        })),
        average: avg,
        // Legacy compat
        note1: { name: getTypeInfo(m.controls[0]?.type).label, value: parseFloat(m.controls[0]?.value) || 0, percent: m.controls[0]?.percent || 0 },
        note2: { name: getTypeInfo(m.controls[1]?.type).label, value: parseFloat(m.controls[1]?.value) || 0, percent: m.controls[1]?.percent || 0 },
      }
    })
    onSubmit(finalData)
  }

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "40px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Orbs */}
      <div className="orb orb-blue" style={{ width: "350px", height: "350px", top: "-80px", right: "-80px", opacity: 0.2 }} />
      <div className="orb orb-purple" style={{ width: "300px", height: "300px", bottom: "0", left: "-60px", opacity: 0.12 }} />

      <div style={{ maxWidth: "900px", width: "100%", position: "relative", zIndex: 1 }}>

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

        {/* Legend */}
        <div className="animate-slide-up glass-card" style={{ padding: "14px 20px", marginBottom: "20px" }}>
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "10px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            Types de contrôles disponibles
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {CONTROL_TYPES.map((t) => (
              <span
                key={t.key}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 10px",
                  borderRadius: "8px",
                  background: t.bg,
                  border: `1px solid ${t.color}33`,
                  color: t.color,
                  fontSize: "0.78rem",
                  fontWeight: 600,
                }}
              >
                <strong>{t.abbr}</strong> – {t.label}
              </span>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="animate-slide-up-delay-1 glass-card" style={{ padding: "20px 24px", marginBottom: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-secondary)" }}>
              Progression
            </span>
            <span style={{ fontSize: "0.875rem", fontWeight: 700, color: isComplete ? "var(--accent-green)" : "var(--accent-blue)" }}>
              {completedCount} / {modulesState.length} modules complétés
            </span>
          </div>
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{
                width: `${progress}%`,
                background: isComplete ? "linear-gradient(135deg, #34d399, #06b6d4)" : undefined,
              }}
            />
          </div>
          {/* Per-module status dots */}
          <div style={{ display: "flex", gap: "6px", marginTop: "10px", flexWrap: "wrap" }}>
            {moduleStatuses.map((s, i) => (
              <div
                key={i}
                title={modulesState[i].name}
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: s.ready ? "#34d399" : s.percentOk ? "#fb923c" : "#ef444466",
                  transition: "all 0.3s",
                  cursor: "default",
                }}
              />
            ))}
          </div>
        </div>

        {/* Modules */}
        <div className="animate-slide-up-delay-2" style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "24px" }}>
          {modulesState.map((m, idx) => (
            <ModuleCard key={m.id} module={m} idx={idx} onChange={handleControlsChange} />
          ))}
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
              <span>
                Complétez toutes les notes pour continuer ({completedCount}/{modulesState.length})
                {moduleStatuses.some((s) => !s.percentOk) && " · Vérifiez que Σ% = 100 pour chaque module"}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
