"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/Header"
import ResultsCard from "@/components/ResultsCard"

function ResultsContent() {
  const searchParams = useSearchParams()
  const year = searchParams.get("year")
  const semester = searchParams.get("semester")
  const gradesParam = searchParams.get("grades")

  const [grades, setGrades] = useState([])
  const [average, setAverage] = useState(0)

  useEffect(() => {
    if (gradesParam) {
      const decodedGrades = JSON.parse(atob(gradesParam))
      setGrades(decodedGrades)
      const totalWeighted = decodedGrades.reduce((sum, g) => sum + g.average * (g.coefficient ?? 1), 0)
      const totalCoeff    = decodedGrades.reduce((sum, g) => sum + (g.coefficient ?? 1), 0)
      const totalAverage  = totalCoeff > 0 ? totalWeighted / totalCoeff : 0
      setAverage(totalAverage.toFixed(2))
    }
  }, [gradesParam])

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header title="Résultats" />
      <ResultsCard year={year} semester={semester} grades={grades} average={average} />
    </div>
  )
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
        Chargement…
      </div>
    }>
      <ResultsContent />
    </Suspense>
  )
}
