"use client"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import SemesterCard from "@/components/SemesterCard"

export default function SemestersPage() {
  const router = useRouter()

  const handleContinue = (year, semester) => {
    router.push(`/grades?year=${year}&semester=${semester}`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-800 font-sans">
      <Header title="Sélection année/semestre" />
      <SemesterCard onContinue={handleContinue} />
    </div>
  )
}
