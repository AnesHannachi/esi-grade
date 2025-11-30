"use client"

import { useRouter } from "next/navigation"

export default function WelcomeCard() {
  const router = useRouter()

  const handleContinue = () => {
    router.push("/semesters")
  }

  return (
    

      <div className="bg-white rounded-lg shadow-lg p-8   h-full w-full ">
        <h1 className="text-5xl font-extrabold  mb-6 mt-15 text-center font-sans ">
          📚 <span className="bg-gradient-to-r from-[#4FC3F7] to-[#0288D1] bg-clip-text text-transparent">Prenez le contrôle de votre parcours académique !</span>
        </h1>

        <p className="text-gray-800 text-center mt-10 mb-6 font-sans font-bold text-4xl">
          Bienvenue sur ESI-Moyenne, votre assistant intelligent pour calculer vos moyennes et suivre votre progression
          tout au long de votre scolarité à l'ESI.
        </p>

        <div className="mb-8 space-y-3 font-sans pl-12 mt-12">
          <p className="text-gray-700 mb-7  font-semibold text-xl">
            Que vous soyez en 1re année ou en Master, cette plateforme vous permet en quelques clics de
          </p>
          <div className="space-y-2 ">
            <div className="flex items-center gap-2 mb-4 font-semibold text-xl">
              <span className="text-yellow-500">🏅</span>
              <span className="text-gray-700 font-semibold text-xl ">
                Choisir votre <strong>📅année</strong> et <strong>🍂semestre</strong> d'étude
              </span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-xl mb-4">
              <span className="text-yellow-500">🏅</span>
              <span className="text-gray-700">
                Entrer vos <strong>✏️notes</strong> de CI, CF.TP... pour chaque <strong>📘modules</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 mb-4 font-semibold text-xl">
              <span className="text-yellow-500">🏅</span>
              <span className="text-gray-700">Obtenir instantanément votre moyenne semestrielle 📊</span>
            </div>
            <div className="flex items-center gap-2 mb-4 font-semibold text-xl">
              <span className="text-yellow-500">🏅</span>
              <span className="text-gray-700">Visualiser votre performance et évoluer sereinement</span>
            </div>
          </div>
        </div>
      <div className="flex justify-center mt-14">
        <button
          onClick={handleContinue}
          className="w-[450px] flex justify-center bg-gradient-to-r from-[#0288D1] to-[#4FC3F7] hover:from-[#4FC3F7] hover:to-[#0288D1] transition duration-700 hover:scale-101 text-white font-bold py-4 px-6 rounded-xl font-sans text-2xl"
        >
          Continue pour calculer
        </button>
        </div>
      </div>
    
  )
}
