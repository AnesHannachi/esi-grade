"use client"

import { useState } from "react"

export default function SemesterCard({ onContinue }) {
  const [selectedYear, setSelectedYear] = useState(null)
  const [selectedSemester, setSelectedSemester] = useState(null)

  const years = [
    { id: 1, label: "1ère Année", color: "bg-blue-500" },
    { id: 2, label: "2ème Année", color: "bg-purple-500" },
    { id: 3, label: "3ème Année", color: "bg-green-500" },
    { id: 4, label: "4ème Année", color: "bg-indigo-500" },
  ]

  const semesters = [
    { id: 1, label: "Semestre 1", color: "bg-yellow-400" },
    { id: 2, label: "Semestre 2", color: "bg-orange-400" },
  ]

  const handleClick = () => {
    if (selectedYear && selectedSemester) {
      onContinue(selectedYear, selectedSemester)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gray-800">
      <div className="bg-white rounded-lg shadow-2xl p-12 max-w-4xl w-full border-t-4 border-blue-500">
        <h1 className="text-3xl font-bold text-gray-800 mb-12 text-center font-sans">
          Bienvenue sur ESI-Moyenne. <span className="text-blue-500">Sélectionnez votre année et semestre</span>
        </h1>

        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-700 mb-6 font-sans">Années d'étude</h2>
          <div className="grid grid-cols-4 gap-4">
            {years.map((year) => (
              <button
                key={year.id}
                onClick={() => setSelectedYear(year.id)}
                className={`py-4 px-6 rounded-lg font-bold text-white transition-all transform hover:scale-105 font-sans text-lg ${
                  selectedYear === year.id
                    ? `${year.color} ring-4 ring-offset-2 ring-gray-800 shadow-lg`
                    : `${year.color} hover:opacity-90`
                }`}
              >
                {year.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-700 mb-6 font-sans">Semestres</h2>
          <div className="grid grid-cols-2 gap-4">
            {semesters.map((semester) => (
              <button
                key={semester.id}
                onClick={() => setSelectedSemester(semester.id)}
                className={`py-4 px-6 rounded-lg font-bold text-gray-800 transition-all transform hover:scale-105 font-sans text-lg ${
                  selectedSemester === semester.id
                    ? `${semester.color} ring-4 ring-offset-2 ring-gray-800 shadow-lg`
                    : `${semester.color} hover:opacity-90`
                }`}
              >
                {semester.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleClick}
          disabled={!selectedYear || !selectedSemester}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition-all font-sans text-lg"
        >
          Continuer pour remplir les notes
        </button>
      </div>
    </div>
  )
}
