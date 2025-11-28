"use client"

import { useRouter } from "next/navigation"

export default function ResultsCard({ year, semester, grades, average }) {
  const router = useRouter()

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gray-800">
      <div className="bg-white rounded-lg shadow-2xl p-12 max-w-6xl w-full border-t-4 border-blue-500">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-500 mb-2 font-sans">Vos Résultats</h1>
          <p className="text-gray-600 font-sans text-lg">
            Année {year} - Semestre {semester}
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-8 mb-12 text-center shadow-lg">
          <p className="text-white mb-2 font-sans text-lg">Moyenne Générale</p>
          <p className="text-6xl font-bold text-white font-sans">{average}/20</p>
        </div>

        <div className="space-y-4 mb-12 max-h-96 overflow-y-auto">
          {grades.map((grade, idx) => (
            <div
              key={idx}
              className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border-l-4 border-blue-500"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800 text-lg font-sans">{grade.name}</h3>
                <p className="text-3xl font-bold text-blue-500 font-sans">{grade.average.toFixed(2)}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded border border-blue-200">
                  <p className="text-sm text-gray-600 font-sans">
                    {grade.note1.name} ({grade.note1.percent}%)
                  </p>
                  <p className="text-2xl font-bold text-blue-500 font-sans">{grade.note1.value}/20</p>
                </div>
                <div className="bg-white p-3 rounded border border-blue-200">
                  <p className="text-sm text-gray-600 font-sans">
                    {grade.note2.name} ({grade.note2.percent}%)
                  </p>
                  <p className="text-2xl font-bold text-blue-500 font-sans">{grade.note2.value}/20</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => router.push("/semesters")}
            className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-4 px-6 rounded-lg transition-all font-sans text-lg"
          >
            Retour Semestres
          </button>
          <button
            onClick={() => router.push("/")}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg transition-all font-sans text-lg"
          >
            Accueil
          </button>
        </div>
      </div>
    </div>
  )
}
