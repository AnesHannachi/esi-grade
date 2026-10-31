"use client"

import { useRouter, useSearchParams } from "next/navigation"
import Header from "@/components/Header"
import GradesForm from "@/components/GradesForm"

export default function GradesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const year = searchParams.get("year")
  const semester = searchParams.get("semester")

  const handleSubmit = (gradesData) => {
    const bytes = new TextEncoder().encode(JSON.stringify(gradesData))
    const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("")
    const encodedGrades = btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "")
    router.push(`/results?year=${year}&semester=${semester}&grades=${encodedGrades}`)
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header title="Saisie des notes" />
      <GradesForm year={year} semester={semester} onSubmit={handleSubmit} />
    </div>
  )
}
