"use client"

import { useState } from "react"
import { coursesData } from "@/lib/coursesData"

export default function GradesForm({ year, semester, onSubmit }) {
  const modules = coursesData[Number(year)]?.[Number(semester)] || []

  const [gradesData, setGradesData] = useState(
    modules.map((m) => ({
      id: m.id,
      name: m.name,
      note1Value: "",
      note1Name: m.note1,
      note1Percent: m.percent1,
      note2Value: "",
      note2Name: m.note2,
      note2Percent: m.percent2,
    })),
  )

  const handleNoteChange = (id, field, value) => {
    setGradesData(gradesData.map((g) => (g.id === id ? { ...g, [field]: value } : g)))
  }

  const handleSubmit = () => {
    const finalData = gradesData.map((g) => ({
      name: g.name,
      note1: { name: g.note1Name, value: Number.parseFloat(g.note1Value) || 0, percent: g.note1Percent },
      note2: { name: g.note2Name, value: Number.parseFloat(g.note2Value) || 0, percent: g.note2Percent },
      average:
        ((Number.parseFloat(g.note1Value) || 0) * g.note1Percent +
          (Number.parseFloat(g.note2Value) || 0) * g.note2Percent) /
        100,
    }))
    onSubmit(finalData)
  }

  const isComplete = gradesData.every((g) => g.note1Value !== "" && g.note2Value !== "")

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gray-800">
      <div className="bg-white rounded-lg shadow-2xl p-12 max-w-6xl w-full border-t-4 border-blue-500">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 font-sans">Remplissez vos notes</h1>
          <p className="text-gray-600 font-sans text-lg">
            Année {year} - Semestre {semester}
          </p>
        </div>

        <div className="space-y-6 mb-8 max-h-96 overflow-y-auto">
          {gradesData.map((module) => (
            <div
              key={module.id}
              className="p-6 bg-gradient-to-r from-blue-50 to-gray-50 rounded-lg border border-blue-200"
            >
              <h3 className="font-bold text-gray-800 text-lg mb-4 font-sans">{module.name}</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-sans">
                    {module.note1Name} ({module.note1Percent}%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    step="0.5"
                    value={module.note1Value}
                    onChange={(e) => handleNoteChange(module.id, "note1Value", e.target.value)}
                    placeholder="Note /20"
                    className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-sans">
                    {module.note2Name} ({module.note2Percent}%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    step="0.5"
                    value={module.note2Value}
                    onChange={(e) => handleNoteChange(module.id, "note2Value", e.target.value)}
                    placeholder="Note /20"
                    className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isComplete}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition-all font-sans text-lg"
        >
          Voir mon tableau de bord
        </button>
      </div>
    </div>
  )
}
