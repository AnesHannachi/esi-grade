"use client"

import { useState } from "react"
import Image from "next/image"

export default function SemesterCard({ onContinue }) {
  const [selectedYear, setSelectedYear] = useState(null)
  const [selectedSemester, setSelectedSemester] = useState(null)

  const years = [
    { id: 1, label: "1ère Année", color: "bg-gradient-to-r from-[#3B82F6] to-[#5EA6FF]", icon: "/frame.svg" },
    { id: 2, label: "2ème Année", color: "bg-gradient-to-r from-[#22c55e] to-[#75e59c]", icon: "/frame1.svg" },
    { id: 3, label: "3ème Année", color: "bg-gradient-to-r from-[#a855f7] to-[#cea2ff]", icon: "/frame2.svg" },
    { id: 4, label: "4ème Année", color: "bg-gradient-to-r from-[#ef4444] to-[#ff8a8a] ", icon: "/vector4.svg" },
  ]

  const semesters = [
    { id: 1, label: "Semestre 1", color: "bg-yellow-400", description: "Première moitié de l’année universitaire" },
    { id: 2, label: "Semestre 2", color: "bg-orange-400" , description: "deuxieme moitié de l’année universitaire"},
  ]

  const handleClick = () => {
    if (selectedYear && selectedSemester) {
      onContinue(selectedYear, selectedSemester)
    }
  }

  return (
    
      <div className="bg-white rounded-lg shadow-2xl p-12 h-full w-full border-t-4 border-blue-500">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-[#121212] to-[#f6f6f6] bg-clip-text text-transparent mb-12 text-center font-sans">
          Bienvenue sur ESI-Moyenne. 
        </h1>
         <p className="text-center"><span className="text-4xl font-sans font-semibold text-gray-700">Calculez facilement votre moyenne et suivez vos progrès académiques tout au long de votre parcours à l'ESI.</span></p>
        <div className="w-full max-w-[1192px] mb-15 mt-12 pb-9 shadow-lg p-6 rounded-xl border-t border-gray-200 mx-auto"> 
         <div className="mb-6 text-center" >
           <h2 className="text-3xl font-semibold text-gray-700  font-sans flex items-center justify-center">
            <Image src="/div.svg" alt="décoration" width={64} height={64} className="mr-4" />
            <span>Sélectionnez votre année académique</span>
           </h2>
           <h3 className="text-lg font-sans text-gray-400">               Choisissez l’année que vous êtes en train d’étudier.</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {years.map((year) => (
              <button
                key={year.id}
                onClick={() => setSelectedYear(year.id)}
                className={`py-4 px-6 pl-12 rounded-lg font-bold text-white transition-all transform hover:scale-105 font-sans text-lg relative flex items-center justify-center ${
                  selectedYear === year.id
                    ? `${year.color} ring-4 ring-offset-2 ring-gray-800 shadow-lg`
                    : `${year.color} `
                }`}
              >
                <Image src={year.icon} alt="icon" width={20} height={20} className="absolute left-3 top-1/2 -translate-y-1/2" />
                <span>{year.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-12">
          
          <div className="w-full max-w-[1192px] mb-15 mt-12 pb-9 shadow-lg p-6 rounded-xl border-t border-gray-200 mx-auto"> 
         <div className="mb-6 text-center" >
           <h2 className="text-3xl font-semibold text-gray-700  font-sans flex items-center justify-center">
            <Image src="/div2.svg" alt="décoration" width={64} height={64} className="mr-6" />
            <span>Sélectionnez votre semestre</span>
           </h2>
           <h3 className="text-lg font-sans text-gray-400">Sélectionnez le semestre que vous souhaitez calculer.</h3>
          </div>
            <div className="w-[940px] mx-auto  ">
              <div className="grid grid-cols-2 gap-10">
                {semesters.map((semester) => (
                  <button
                    key={semester.id}
                    onClick={() => setSelectedSemester(semester.id)}
                    className={`py-4 px-6 pl-12 rounded-lg font-bold text-gray-800 transition-all transform hover:scale-102 font-sans text-lg relative flex items-center justify-center ${
                      selectedSemester === semester.id
                        ? `${semester.color} ring-4 ring-offset-2 hadow-lg`
                        : `${semester.color} `
                    }`}
                  >
                   <div className="flex flex-col items-center">
                    <span className="text-xl">{semester.label}</span>
                    <span className="text-sm font-medium">{semester.description}</span>
                   </div>
                  </button>
                ))}
              </div>
             
            </div>
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
  )
}
