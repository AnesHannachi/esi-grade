"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { exportToExcel, exportToPDF } from "@/lib/exportUtils"

/* ── helpers ── */
const getScoreColor = (s) => s >= 16 ? "#34d399" : s >= 14 ? "#4f8ef7" : s >= 10 ? "#fb923c" : "#ef4444"
const getScoreLabel = (s) => s >= 16 ? "Excellent 🏆" : s >= 14 ? "Très Bien ⭐" : s >= 10 ? "Passable" : "Insuffisant ⚠️"
const getScoreGrad = (s) => s >= 16
  ? "linear-gradient(135deg,#34d399,#06b6d4)"
  : s >= 14
    ? "linear-gradient(135deg,#4f8ef7,#22d3ee)"
    : s >= 10
      ? "linear-gradient(135deg,#fb923c,#fbbf24)"
      : "linear-gradient(135deg,#ef4444,#f97316)"

/* SVG donut ring */
function DonutRing({ value, max = 20, size = 180, color }) {
  const r = 54
  const circ = 2 * Math.PI * r          // ≈ 339.3
  const pct = Math.min(value / max, 1)
  const dash = circ * (1 - pct)
  const [offset, setOffset] = useState(circ)

  useEffect(() => {
    const t = setTimeout(() => setOffset(dash), 120)
    return () => clearTimeout(t)
  }, [dash])

  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      {/* track */}
      <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="12" />
      {/* glow */}
      <circle cx="60" cy="60" r={r} fill="none" stroke={color} strokeWidth="12"
        strokeOpacity="0.15" />
      {/* fill */}
      <circle cx="60" cy="60" r={r} fill="none"
        stroke={color} strokeWidth="12" strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={offset}
        style={{ transform: "rotate(-90deg)", transformOrigin: "60px 60px", transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }}
      />
      {/* center text */}
      <text x="60" y="56" textAnchor="middle" fill="white" fontSize="20" fontWeight="800" fontFamily="Inter,sans-serif">
        {value}
      </text>
      <text x="60" y="72" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="Inter,sans-serif">
        / 20
      </text>
    </svg>
  )
}

/* Horizontal bar for grade distribution */
function HBar({ label, count, total, color, delay = 0 }) {
  const pct = total > 0 ? (count / total) * 100 : 0
  const [w, setW] = useState(0)
  useEffect(() => { const t = setTimeout(() => setW(pct), 200 + delay); return () => clearTimeout(t) }, [pct, delay])
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
      <div style={{ width: "90px", fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", flexShrink: 0 }}>{label}</div>
      <div style={{ flex: 1, height: "8px", background: "rgba(255,255,255,0.07)", borderRadius: "100px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${w}%`, background: color, borderRadius: "100px", transition: `width 1s ${delay}ms cubic-bezier(0.4,0,0.2,1)` }} />
      </div>
      <div style={{ width: "32px", fontSize: "0.8rem", fontWeight: 700, color: "var(--text-secondary)", textAlign: "right" }}>{count}</div>
    </div>
  )
}

/* Vertical bar chart for per-module averages */
function BarChart({ grades }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { const t = setTimeout(() => setMounted(true), 300); return () => clearTimeout(t) }, [])

  if (!grades || grades.length === 0) return null
  const maxH = 100

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: `${maxH + 28}px`, padding: "0 4px" }}>
      {grades.map((g, i) => {
        const pct = g.average / 20
        const barH = mounted ? Math.max(pct * maxH, 6) : 0
        const color = getScoreColor(g.average)
        const short = g.name.split(" ").map(w => w[0]).join("").slice(0, 3).toUpperCase()
        return (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", justifyContent: "flex-end", height: "100%" }}>
            <div style={{ fontSize: "0.65rem", fontWeight: 700, color, marginBottom: "2px" }}>{g.average.toFixed(1)}</div>
            <div
              style={{
                width: "100%", borderRadius: "6px 6px 2px 2px",
                height: `${barH}px`,
                background: color,
                boxShadow: `0 0 12px ${color}55`,
                transition: `height 0.9s ${i * 80}ms cubic-bezier(0.4,0,0.2,1)`,
                position: "relative", overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(255,255,255,0.18),transparent)" }} />
            </div>
            <div style={{ fontSize: "0.6rem", color: "var(--text-muted)", textAlign: "center", fontWeight: 600, marginTop: "2px" }}>{short}</div>
          </div>
        )
      })}
    </div>
  )
}

/* Radar polygon chart */
function RadarChart({ grades, size = 180 }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { const t = setTimeout(() => setMounted(true), 400); return () => clearTimeout(t) }, [])

  if (!grades || grades.length < 3) return null
  const n = grades.length
  const cx = size / 2
  const cy = size / 2
  const maxR = size / 2 - 20
  const levels = [0.25, 0.5, 0.75, 1]

  const angleOf = (i) => (2 * Math.PI * i) / n - Math.PI / 2
  const point = (r, i) => {
    const a = angleOf(i)
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
  }

  const levelPolygon = (ratio) =>
    grades.map((_, i) => { const p = point(maxR * ratio, i); return `${p.x},${p.y}` }).join(" ")

  const dataPolygon = () =>
    grades.map((g, i) => {
      const r = mounted ? (Math.min(g.average, 20) / 20) * maxR : 0
      const p = point(r, i)
      return `${p.x},${p.y}`
    }).join(" ")

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: "visible" }}>
      {/* grid */}
      {levels.map((lv, li) => (
        <polygon key={li} points={levelPolygon(lv)}
          fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      ))}
      {/* axes */}
      {grades.map((_, i) => {
        const p = point(maxR, i)
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      })}
      {/* data area */}
      <polygon points={dataPolygon()}
        fill="rgba(79,142,247,0.2)" stroke="#4f8ef7" strokeWidth="2" strokeLinejoin="round"
        style={{ transition: "all 1.1s cubic-bezier(0.4,0,0.2,1)" }}
      />
      {/* dots */}
      {grades.map((g, i) => {
        const r = mounted ? (Math.min(g.average, 20) / 20) * maxR : 0
        const p = point(r, i)
        return (
          <circle key={i} cx={p.x} cy={p.y} r="4"
            fill="#4f8ef7" stroke="rgba(10,15,30,0.8)" strokeWidth="2"
            style={{ transition: `all 1.1s ${i * 60}ms cubic-bezier(0.4,0,0.2,1)` }}
          />
        )
      })}
      {/* labels */}
      {grades.map((g, i) => {
        const p = point(maxR + 14, i)
        const short = g.name.split(" ").slice(0, 1).join("").slice(0, 8)
        return (
          <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle"
            fill="rgba(255,255,255,0.55)" fontSize="7.5" fontFamily="Inter,sans-serif" fontWeight="600">
            {short}
          </text>
        )
      })}
    </svg>
  )
}

/* ══════════════════════════════════════════ MAIN COMPONENT ══════════════════════════════════════════ */
export default function ResultsCard({ year, semester, grades, average }) {
  const router = useRouter()
  const avg = Number(average) || 0
  const color = getScoreColor(avg)
  const grad = getScoreGrad(avg)
  const label = getScoreLabel(avg)

  const [exporting, setExporting] = useState(null) // 'excel' | 'pdf' | null
  const [exportDone, setExportDone] = useState(null)

  const handleExport = async (type) => {
    setExporting(type)
    try {
      const payload = { year, semester, grades, average }
      if (type === "excel") await exportToExcel(payload)
      else await exportToPDF(payload)
      setExportDone(type)
      setTimeout(() => setExportDone(null), 2500)
    } catch (err) {
      console.error("Export error:", err)
    } finally {
      setExporting(null)
    }
  }

  /* derived stats */
  const best = grades.length ? grades.reduce((b, g) => g.average > b.average ? g : b, grades[0]) : null
  const worst = grades.length ? grades.reduce((b, g) => g.average < b.average ? g : b, grades[0]) : null
  const above10 = grades.filter(g => g.average >= 10).length
  const below10 = grades.filter(g => g.average < 10).length

  /* grade distribution buckets */
  const dist = [
    { label: "≥ 16 (Exc.)", count: grades.filter(g => g.average >= 16).length, color: "#34d399" },
    { label: "14–15 (TB)", count: grades.filter(g => g.average >= 14 && g.average < 16).length, color: "#4f8ef7" },
    { label: "12–13 (Bien)", count: grades.filter(g => g.average >= 12 && g.average < 14).length, color: "#a78bfa" },
    { label: "10–11 (Pass)", count: grades.filter(g => g.average >= 10 && g.average < 12).length, color: "#fb923c" },
    { label: "< 10 (Insuf)", count: grades.filter(g => g.average < 10).length, color: "#ef4444" },
  ]

  return (
    <div style={{ flex: 1, padding: "36px 20px 60px", position: "relative", overflow: "hidden" }}>
      {/* ambient orbs */}
      <div className="orb orb-blue" style={{ width: "500px", height: "500px", top: "-180px", left: "-120px", opacity: 0.2, animationDelay: "0s" }} />
      <div className="orb orb-purple" style={{ width: "400px", height: "400px", bottom: "-80px", right: "-80px", opacity: 0.15, animationDelay: "2s" }} />
      <div className="orb orb-green" style={{ width: "300px", height: "300px", top: "40%", right: "5%", opacity: 0.1, animationDelay: "4s" }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── Hero banner ── */}
        <div className="animate-slide-up" style={{ textAlign: "center", marginBottom: "36px" }}>
          <div className="badge animate-bounce-subtle" style={{ marginBottom: "16px", display: "inline-flex" }}>
            📊 Résultats Finaux
          </div>
          <h1 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "#f0f4ff", marginBottom: "6px" }}>
            Votre <span className="gradient-text">Tableau de Bord</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
            Année {year} · Semestre {semester} · {grades.length} modules
          </p>
        </div>

        {/* ── Top row: big score card + stat chips ── */}
        <div className="animate-slide-up-delay-1" style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "16px", marginBottom: "16px" }}>

          {/* Score card */}
          <div className="glass-card" style={{ padding: "32px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", background: "rgba(255,255,255,0.04)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: grad, opacity: 0.06, borderRadius: "20px" }} />
            <DonutRing value={avg} color={color} size={170} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "6px" }}>Moyenne Générale</div>
              <div
                style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  background: color + "22", border: `1px solid ${color}55`,
                  color: color, borderRadius: "100px", padding: "5px 16px",
                  fontSize: "0.9rem", fontWeight: 800,
                }}
              >
                {label}
              </div>
            </div>
          </div>

          {/* Stat chips grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: "12px" }}>
            <div className="stat-chip">
              <div style={{ fontSize: "2rem", fontWeight: 900, background: "linear-gradient(135deg,#34d399,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {best ? best.average.toFixed(2) : "–"}
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", fontWeight: 600 }}>🏆 Meilleure note</div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "2px" }}>{best?.name ?? ""}</div>
            </div>
            <div className="stat-chip">
              <div style={{ fontSize: "2rem", fontWeight: 900, background: "linear-gradient(135deg,#f472b6,#ef4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {worst ? worst.average.toFixed(2) : "–"}
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", fontWeight: 600 }}>📉 Note la plus basse</div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "2px" }}>{worst?.name ?? ""}</div>
            </div>
            <div className="stat-chip">
              <div style={{ fontSize: "2rem", fontWeight: 900, color: "#34d399" }}>{above10}</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", fontWeight: 600 }}>✅ Modules validés (≥10)</div>
            </div>
            <div className="stat-chip">
              <div style={{ fontSize: "2rem", fontWeight: 900, color: "#ef4444" }}>{below10}</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", fontWeight: 600 }}>❌ Modules non validés</div>
            </div>
          </div>
        </div>

        {/* ── Middle row: Bar chart + Radar ── */}
        <div className="animate-slide-up-delay-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>

          {/* Bar chart */}
          <div className="glass-card" style={{ padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
              <div style={{ width: "4px", height: "18px", borderRadius: "2px", background: "linear-gradient(135deg,#4f8ef7,#22d3ee)" }} />
              <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "#f0f4ff" }}>Notes par module</span>
            </div>
            <BarChart grades={grades} />
          </div>

          {/* Radar chart */}
          <div className="glass-card" style={{ padding: "24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", width: "100%" }}>
              <div style={{ width: "4px", height: "18px", borderRadius: "2px", background: "linear-gradient(135deg,#a78bfa,#ec4899)" }} />
              <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "#f0f4ff" }}>Profil académique</span>
            </div>
            <RadarChart grades={grades} size={200} />
          </div>
        </div>

        {/* ── Bottom row: Distribution + Module details ── */}
        <div className="animate-slide-up-delay-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>

          {/* Distribution */}
          <div className="glass-card" style={{ padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
              <div style={{ width: "4px", height: "18px", borderRadius: "2px", background: "linear-gradient(135deg,#fb923c,#fbbf24)" }} />
              <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "#f0f4ff" }}>Distribution des notes</span>
            </div>
            {dist.map((d, i) => (
              <HBar key={i} label={d.label} count={d.count} total={grades.length} color={d.color} delay={i * 100} />
            ))}
          </div>

          {/* Module detail list */}
          <div className="glass-card" style={{ padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
              <div style={{ width: "4px", height: "18px", borderRadius: "2px", background: "linear-gradient(135deg,#34d399,#06b6d4)" }} />
              <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "#f0f4ff" }}>Détail par module</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "230px", overflowY: "auto" }}>
              {grades.map((g, i) => {
                const c = getScoreColor(g.average)
                const pct = (g.average / 20) * 100
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ flexShrink: 0, width: "6px", height: "6px", borderRadius: "50%", background: c, boxShadow: `0 0 6px ${c}` }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px", gap: "6px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", minWidth: 0 }}>
                          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#f0f4ff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "130px" }}>{g.name}</span>
                          {g.coefficient && (
                            <span style={{ flexShrink: 0, fontSize: "0.68rem", fontWeight: 700, color: "#a78bfa", background: "rgba(167,139,250,0.15)", border: "1px solid rgba(167,139,250,0.3)", borderRadius: "100px", padding: "1px 7px" }}>
                              ×{g.coefficient}
                            </span>
                          )}
                        </div>
                        <span style={{ fontSize: "0.8rem", fontWeight: 800, color: c, flexShrink: 0 }}>{g.average.toFixed(2)}</span>
                      </div>
                      <div style={{ height: "4px", background: "rgba(255,255,255,0.07)", borderRadius: "100px", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: c, borderRadius: "100px", transition: `width 1s ${i * 80}ms cubic-bezier(0.4,0,0.2,1)` }} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="animate-slide-up-delay-4" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Export panel */}
          <div className="glass-card" style={{ padding: "20px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <div style={{ width: "4px", height: "18px", borderRadius: "2px", background: "linear-gradient(135deg,#a78bfa,#4f8ef7)" }} />
              <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "#f0f4ff" }}>Exporter les résultats</span>
            </div>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>

              {/* Excel button */}
              <button
                onClick={() => handleExport("excel")}
                disabled={!!exporting}
                style={{
                  flex: 1, minWidth: "180px",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                  padding: "14px 20px",
                  borderRadius: "14px",
                  border: "1px solid rgba(52,211,153,0.35)",
                  background: exportDone === "excel" ? "rgba(52,211,153,0.2)" : "rgba(52,211,153,0.1)",
                  color: exportDone === "excel" ? "#34d399" : "#34d399",
                  fontWeight: 700, fontSize: "0.95rem",
                  cursor: exporting ? "not-allowed" : "pointer",
                  opacity: exporting && exporting !== "excel" ? 0.5 : 1,
                  transition: "all 0.3s",
                  position: "relative", overflow: "hidden",
                }}
              >
                {exporting === "excel" ? (
                  <><span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⏳</span> Export en cours…</>
                ) : exportDone === "excel" ? (
                  <><span>✅</span> Téléchargé !</>
                ) : (
                  <>
                    <span style={{ fontSize: "1.3rem" }}>📊</span>
                    <div style={{ textAlign: "left" }}>
                      <div>Exporter en Excel</div>
                      <div style={{ fontSize: "0.72rem", fontWeight: 500, opacity: 0.7 }}>Format .xlsx · 3 feuilles détaillées</div>
                    </div>
                  </>
                )}
              </button>

              {/* PDF button */}
              <button
                onClick={() => handleExport("pdf")}
                disabled={!!exporting}
                style={{
                  flex: 1, minWidth: "180px",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                  padding: "14px 20px",
                  borderRadius: "14px",
                  border: "1px solid rgba(239,68,68,0.35)",
                  background: exportDone === "pdf" ? "rgba(239,68,68,0.2)" : "rgba(239,68,68,0.08)",
                  color: "#ef4444",
                  fontWeight: 700, fontSize: "0.95rem",
                  cursor: exporting ? "not-allowed" : "pointer",
                  opacity: exporting && exporting !== "pdf" ? 0.5 : 1,
                  transition: "all 0.3s",
                }}
              >
                {exporting === "pdf" ? (
                  <><span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⏳</span> Génération PDF…</>
                ) : exportDone === "pdf" ? (
                  <><span>✅</span> Téléchargé !</>
                ) : (
                  <>
                    <span style={{ fontSize: "1.3rem" }}>📄</span>
                    <div style={{ textAlign: "left" }}>
                      <div>Exporter en PDF</div>
                      <div style={{ fontSize: "0.72rem", fontWeight: 500, opacity: 0.7 }}>Format A4 · Mise en page premium</div>
                    </div>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Navigation buttons */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button onClick={() => router.push("/semesters")} className="btn-secondary" style={{ flex: 1, minWidth: "160px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              ← Retour semestres
            </button>
            <button onClick={() => router.push("/grades")} className="btn-secondary" style={{ flex: 1, minWidth: "160px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              ↺ Nouveau calcul
            </button>
            <button onClick={() => router.push("/")} className="btn-primary" style={{ flex: 1, minWidth: "160px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              🏠 Accueil
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
