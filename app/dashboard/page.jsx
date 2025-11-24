"use client"

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Header from "@/components/Header"

function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const year = searchParams.get("year")
  const semester = searchParams.get("semester")
  const gradesParam = searchParams.get("grades")

  const [grades, setGrades] = useState(() => {
    try {
      return gradesParam ? JSON.parse(atob(gradesParam)) : []
    } catch {
      return []
    }
  })

  const calculateAverage = () => {
    if (grades.length === 0) return 0
    const totalWeighted = grades.reduce((sum, g) => sum + g.grade * g.coefficient, 0)
    const totalCoefficients = grades.reduce((sum, g) => sum + g.coefficient, 0)
    return (totalWeighted / totalCoefficients).toFixed(2)
  }

  const average = calculateAverage()

  const getPerformanceColor = (avg) => {
    if (avg >= 16) return "bg-green-500"
    if (avg >= 14) return "bg-blue-500"
    if (avg >= 12) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-800">
      <Header />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full border-t-4 border-blue-500">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Tableau de Bord</h1>
            <p className="text-gray-600">
              Année {year} - Semestre {semester}
            </p>
          </div>

          <div className={`${getPerformanceColor(average)} text-white rounded-lg p-6 mb-8 text-center`}>
            <p className="text-lg font-semibold mb-2">Votre moyenne générale</p>
            <p className="text-5xl font-bold">{average}/20</p>
          </div>

          <div className="space-y-3 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Détail par module</h2>
            {grades.map((grade, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-800">{grade.name}</p>
                  <p className="text-sm text-gray-600">Coefficient: {grade.coefficient}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(grade.grade / 20) * 100}%` }}
                    ></div>
                  </div>
                  <span className="font-bold text-gray-800 w-12 text-right">{grade.grade}/20</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => router.push("/semesters")}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
          >
            Changer d'année/semestre
          </button>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <DashboardContent />
    </Suspense>
  )
}
