"use client"

import { useRouter } from "next/navigation"

export default function WelcomeCard() {
  const router = useRouter()

  const handleContinue = () => {
    router.push("/semesters")
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-gray-800">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full border-t-4 border-blue-500">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center font-sans">
          📚 <span className="text-blue-500">Prenez le contrôle de votre parcours académique !</span>
        </h1>

        <p className="text-gray-800 text-center mb-6 font-sans">
          Bienvenue sur ESI-Moyenne, votre assistant intelligent pour calculer vos moyennes et suivre votre progression
          tout au long de votre scolarité à l'ESI.
        </p>

        <div className="mb-8 space-y-3 font-sans">
          <p className="text-gray-700 mb-4">
            Que vous soyez en 1re année ou en Master, cette plateforme vous permet en quelques clics de
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">✓</span>
              <span className="text-gray-700">
                Choisir votre <strong>année</strong> et <strong>semestre</strong> d'étud
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">✓</span>
              <span className="text-gray-700">
                Entrer vos <strong>notes</strong> de CI, CF.TP... pour chaque <strong>modules</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">✓</span>
              <span className="text-gray-700">Obtenir instantanément votre moyenne semestrielle 📊</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">✓</span>
              <span className="text-gray-700">Visualiser votre performance et évoluer sereinement</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleContinue}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all font-sans"
        >
          Continue pour calculer
        </button>
      </div>
    </div>
  )
}
