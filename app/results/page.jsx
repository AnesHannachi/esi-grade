"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/Header"
import ResultsCard from "@/components/ResultsCard"

function ResultsContent() {
  const searchParams = useSearchParams()
  const year = searchParams.get("year")
  const semester = searchParams.get("semester")
  const gradesParam = searchParams.get("grades")

  let grades = []
  let average = "0.00"
  let dataError = null

  if (!year || !semester || !gradesParam) {
    dataError = "Les résultats sont incomplets. Revenez à la saisie des notes pour démarrer un calcul."
  } else {
    try {
      const base64 = gradesParam.replace(/-/g, "+").replace(/_/g, "/")
      const paddedBase64 = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=")
      const binary = atob(paddedBase64)
      const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0))
      const decodedGrades = JSON.parse(new TextDecoder().decode(bytes))
      const validGrades = Array.isArray(decodedGrades) && decodedGrades.length > 0 && decodedGrades.every((grade) => {
        const controlsValid = grade?.controls == null || (
          Array.isArray(grade.controls) && grade.controls.length > 0 && grade.controls.every((control) =>
            control && Number.isFinite(Number(control.value)) && Number(control.value) >= 0 && Number(control.value) <= 20 &&
            Number.isFinite(Number(control.percent)) && Number(control.percent) >= 0 && Number(control.percent) <= 100
          )
        )
        return grade && typeof grade.name === "string" && grade.name.trim().length > 0 && Number.isFinite(Number(grade.average)) &&
          Number(grade.average) >= 0 && Number(grade.average) <= 20 &&
          Number.isFinite(Number(grade.coefficient ?? 1)) && Number(grade.coefficient ?? 1) > 0 && controlsValid
      })
      if (!validGrades) throw new Error("Invalid grade payload")
      grades = decodedGrades
      const totalWeighted = grades.reduce((sum, grade) => sum + Number(grade.average) * Number(grade.coefficient ?? 1), 0)
      const totalCoeff = grades.reduce((sum, grade) => sum + Number(grade.coefficient ?? 1), 0)
      average = (totalCoeff > 0 ? totalWeighted / totalCoeff : 0).toFixed(2)
    } catch {
      dataError = "Les données des notes sont illisibles ou invalides. Revenez à la saisie et réessayez."
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header title="Résultats" />
      {dataError ? (
        <main className="results-error" role="alert">
          <div className="glass-card results-error-card">
            <h1>Résultats indisponibles</h1>
            <p>{dataError}</p>
            <a className="btn-primary results-error-link" href="/semesters">Recommencer un calcul</a>
          </div>
        </main>
      ) : <ResultsCard year={year} semester={semester} grades={grades} average={average} />}
    </div>
  )
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <main className="page-loading" role="status" aria-live="polite"><span className="loading-spinner" aria-hidden="true" />Chargement des résultats…</main>
    }>
      <ResultsContent />
    </Suspense>
  )
}
