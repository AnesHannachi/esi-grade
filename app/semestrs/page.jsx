"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import SemesterCard from "@/components/SemesterCard"

export default function SemestersPage() {
  const router = useRouter()
  const [selectedYear, setSelectedYear] = useState(null)
  const [selectedSemester, setSelectedSemester] = useState(null)

  const years = [
    { id: 1, label: "1ère Année", color: "bg-blue-500" },
    { id: 2, label: "2ème Année", color: "bg-purple-500" },
    { id: 3, label: "3ème Année", color: "bg-green-500" },
  ]

  const semesters = [
    { id: 1, label: "Semestre 1", color: "bg-yellow-400" },
    { id: 2, label: "Semestre 2", color: "bg-orange-400" },
  ]

  const handleContinue = (year, semester) => {
    router.push(`/grades?year=${year}&semester=${semester}`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-800">
      <Header title="Sélection année/semestre" />
      <SemesterCard
        onContinue={handleContinue}
        years={years}
        semesters={semesters}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedSemester={selectedSemester}
        setSelectedSemester={setSelectedSemester}
      />
    </div>
  )
}
