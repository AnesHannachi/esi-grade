"use client"

import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Header from "@/components/Header"

function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const year = searchParams.get("year")
  const semester = searchParams.get("semester")
  const gradesParam = searchParams.get("grades")

  let grades = []
  let average = "0.00"
  let dataError = null

  if (!year || !semester || !gradesParam) {
    dataError = "Les données du tableau de bord sont incomplètes. Relancez un calcul pour afficher vos résultats."
  } else {
    try {
      const base64 = gradesParam.replace(/ /g, "+").replace(/-/g, "+").replace(/_/g, "/")
      const paddedBase64 = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=")
      const binary = atob(paddedBase64)
      const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0))
      const decodedGrades = JSON.parse(new TextDecoder().decode(bytes))
      const validGrades = Array.isArray(decodedGrades) && decodedGrades.length > 0 && decodedGrades.every((grade) => {
        const score = Number(grade?.average ?? grade?.grade)
        const coefficient = Number(grade?.coefficient ?? 1)
        return grade && typeof grade.name === "string" && Number.isFinite(score) && score >= 0 && score <= 20 &&
          Number.isFinite(coefficient) && coefficient > 0
      })

      if (!validGrades) throw new Error("Invalid grade payload")
      grades = decodedGrades.map((grade) => ({
        ...grade,
        grade: Number(grade.average ?? grade.grade),
        coefficient: Number(grade.coefficient ?? 1),
      }))

      const totalWeighted = grades.reduce((sum, grade) => sum + grade.grade * grade.coefficient, 0)
      const totalCoefficients = grades.reduce((sum, grade) => sum + grade.coefficient, 0)
      average = (totalCoefficients > 0 ? totalWeighted / totalCoefficients : 0).toFixed(2)
    } catch {
      dataError = "Les données des notes sont illisibles ou invalides. Relancez un calcul pour réessayer."
    }
  }

  const score = Number(average)
  const scoreColor = score >= 16 ? "#34d399" : score >= 14 ? "#60a5fa" : score >= 10 ? "#fbbf24" : "#fb7185"

  return (
    <div className="dashboard-page">
      <Header title="Tableau de bord" />
      {dataError ? (
        <main className="results-error" role="alert">
          <div className="glass-card results-error-card">
            <h1>Tableau de bord indisponible</h1>
            <p>{dataError}</p>
            <button className="btn-primary" onClick={() => router.push("/semesters")}>Recommencer un calcul</button>
          </div>
        </main>
      ) : (
        <main className="dashboard-content">
          <header className="dashboard-heading">
            <p className="badge">Résultats du semestre</p>
            <h1>Tableau de bord</h1>
            <p>Année {year} · Semestre {semester} · {grades.length} modules</p>
          </header>

          <section className="dashboard-summary" aria-labelledby="dashboard-average-heading">
            <div>
              <h2 id="dashboard-average-heading">Moyenne générale</h2>
              <p>Calculée selon les coefficients des modules</p>
            </div>
            <strong style={{ color: scoreColor }}>{average}<span>/20</span></strong>
          </section>

          <section className="dashboard-modules" aria-labelledby="dashboard-modules-heading">
            <div className="dashboard-section-heading">
              <div className="section-marker" aria-hidden="true" />
              <h2 id="dashboard-modules-heading">Détail par module</h2>
            </div>
            <ul>
              {grades.map((grade, index) => {
                const gradeColor = grade.grade >= 16 ? "#34d399" : grade.grade >= 14 ? "#60a5fa" : grade.grade >= 10 ? "#fbbf24" : "#fb7185"
                return (
                  <li key={`${grade.name}-${index}`} className="dashboard-module">
                  <div className="dashboard-module-heading">
                    <div>
                      <h3>{grade.name}</h3>
                      <p>Coefficient : {grade.coefficient}</p>
                    </div>
                    <strong>{grade.grade.toFixed(2)}<span>/20</span></strong>
                  </div>
                  <div className="dashboard-grade-track" role="meter" aria-label={`Moyenne de ${grade.name}`} aria-valuemin={0} aria-valuemax={20} aria-valuenow={grade.grade}>
                    <div style={{ width: `${(grade.grade / 20) * 100}%`, background: gradeColor }} />
                  </div>
                  </li>
                )
              })}
            </ul>
          </section>

          <button className="btn-secondary dashboard-back" onClick={() => router.push("/semesters")}>
            Recommencer avec une autre année ou un autre semestre
          </button>
        </main>
      )}
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<main className="page-loading" role="status" aria-live="polite"><span className="loading-spinner" aria-hidden="true" />Chargement du tableau de bord…</main>}>
      <DashboardContent />
    </Suspense>
  )
}
