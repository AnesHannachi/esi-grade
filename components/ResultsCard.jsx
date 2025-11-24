"use client"

import { useRouter } from "next/navigation"

export default function ResultsCard({ year, semester, grades, average }) {
  const router = useRouter()

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full border-t-4 border-blue-500">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-500 mb-2 font-sans">Vos Résultats</h1>
          <p className="text-gray-600 font-sans">
            Année {year} - Semestre {semester}
          </p>
        </div>

        <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-6 mb-8 text-center">
          <p className="text-gray-600 mb-2 font-sans">Moyenne Générale</p>
          <p className="text-5xl font-bold text-blue-500 font-sans">{average}/20</p>
        </div>

        <div className="space-y-3 mb-8">
          {grades.map((grade, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-800 font-sans">{grade.name}</p>
                <p className="text-sm text-gray-600 font-sans">Coefficient: {grade.coefficient}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-500 font-sans">{grade.grade}</p>
                <p className="text-xs text-gray-500 font-sans">/20</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => router.push("/semesters")}
            className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg transition-all font-sans"
          >
            Retour Semestres
          </button>
          <button
            onClick={() => router.push("/")}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all font-sans"
          >
            Accueil
          </button>
        </div>
      </div>
    </div>
  )
}
