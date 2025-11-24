"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/Header"
import ResultsCard from "@/components/ResultsCard"

export default function ResultsPage() {
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

      const totalWeighted = decodedGrades.reduce((sum, g) => sum + g.grade * g.coefficient, 0)
      const totalCoefficient = decodedGrades.reduce((sum, g) => sum + g.coefficient, 0)
      const avg = totalWeighted / totalCoefficient
      setAverage(avg.toFixed(2))
    }
  }, [gradesParam])

  return (
    <div className="min-h-screen flex flex-col bg-gray-800">
      <Header title="Vos résultats" />
      <ResultsCard year={year} semester={semester} grades={grades} average={average} />
    </div>
  )
}
