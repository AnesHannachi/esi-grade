"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const steps = [
  { href: "/", label: "Accueil", step: 0 },
  { href: "/semesters", label: "Sélection", step: 1 },
  { href: "/grades", label: "Notes", step: 2 },
  { href: "/results", label: "Résultats", step: 3 },
]

export default function Header({ title = "ESI-Moyenne", currentStep = -1 }) {
  const pathname = usePathname()

  const activeStep = steps.findIndex((s) => pathname === s.href || pathname.startsWith(s.href + "?"))
  const displayStep = currentStep >= 0 ? currentStep : activeStep

  return (
    <header
      style={{
        background: "rgba(10, 15, 30, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #4f8ef7, #22d3ee)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              boxShadow: "0 4px 16px rgba(79,142,247,0.4)",
            }}
          >
            📚
          </div>
          <span
            style={{
              fontWeight: 800,
              fontSize: "1.1rem",
              background: "linear-gradient(135deg, #4f8ef7, #22d3ee)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.01em",
            }}
          >
            ESI-Moyenne
          </span>
        </Link>

        {/* Step indicators */}
        {displayStep >= 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {steps.slice(1).map((s, i) => {
              const stepIdx = i + 1
              const isDone = displayStep > stepIdx
              const isActive = displayStep === stepIdx
              return (
                <div key={s.href} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div
                    style={{
                      height: "8px",
                      width: isActive ? "24px" : "8px",
                      borderRadius: "4px",
                      background: isActive
                        ? "linear-gradient(135deg, #4f8ef7, #22d3ee)"
                        : isDone
                        ? "#34d399"
                        : "rgba(255,255,255,0.15)",
                      transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
                      boxShadow: isActive ? "0 0 12px rgba(79,142,247,0.6)" : "none",
                    }}
                  />
                </div>
              )
            })}
          </div>
        )}

        {/* Current page label */}
        <span
          style={{
            fontSize: "0.8rem",
            color: "rgba(255,255,255,0.4)",
            fontWeight: 500,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            display: "none",
          }}
          className="md-show"
        >
          {title}
        </span>
      </div>
    </header>
  )
}
