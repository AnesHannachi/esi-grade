"use client"

import { useState } from "react"

export default function GradesForm({ year, semester, onSubmit }) {
  const [modules, setModules] = useState([
    { id: 1, name: "Mathématiques", grade: "", coefficient: 3 },
    { id: 2, name: "Physique", grade: "", coefficient: 2 },
    { id: 3, name: "Informatique", grade: "", coefficient: 4 },
    { id: 4, name: "Chimie", grade: "", coefficient: 2 },
  ])

  const handleGradeChange = (id, value) => {
    setModules(modules.map((m) => (m.id === id ? { ...m, grade: value } : m)))
  }

  const handleSubmit = () => {
    const gradesData = modules.map((m) => ({
      name: m.name,
      grade: Number.parseFloat(m.grade) || 0,
      coefficient: m.coefficient,
    }))
    onSubmit(gradesData)
  }

  const isComplete = modules.every((m) => m.grade !== "")

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full border-t-4 border-blue-500">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2 font-sans">Remplissez vos notes</h1>
          <p className="text-gray-600 font-sans">
            Année {year} - Semestre {semester}
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {modules.map((module) => (
            <div key={module.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="font-semibold text-gray-800 font-sans">{module.name}</p>
                <p className="text-sm text-gray-600 font-sans">Coefficient: {module.coefficient}</p>
              </div>
              <input
                type="number"
                min="0"
                max="20"
                step="0.5"
                value={module.grade}
                onChange={(e) => handleGradeChange(module.id, e.target.value)}
                placeholder="Note /20"
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isComplete}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all font-sans"
        >
          Voir mon tableau de bord
        </button>
      </div>
    </div>
  )
}
