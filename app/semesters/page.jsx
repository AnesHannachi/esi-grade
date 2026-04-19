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
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header title="Sélection" />
      <SemesterCard onContinue={handleContinue} />
    </div>
  )
}
