"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

const steps = [
  { href: "/semesters", label: "Année et semestre" },
  { href: "/grades", label: "Saisie des notes" },
  { href: "/results", label: "Résultats" },
]

export default function Header({ title = "ESI-Grade" }) {
  const pathname = usePathname()
  const activeStep = steps.findIndex((step) => pathname === step.href || pathname.startsWith(`${step.href}/`))

  return (
    <header className="app-header">
      <div className="app-header-inner">
        <Link href="/" className="app-brand" aria-label="ESI-Grade, accueil">
          <Image
            src="/esi-grade-logo.png"
            alt=""
            width={350}
            height={132}
            priority
          />
        </Link>

        <span className="app-page-title">{title}</span>

        {activeStep >= 0 && (
          <nav className="flow-progress" aria-label="Progression du calcul">
            <ol>
              {steps.map((step, index) => {
                const isActive = index === activeStep
                const isComplete = index < activeStep
                return (
                  <li key={step.href} className={isActive ? "is-active" : isComplete ? "is-complete" : ""} aria-current={isActive ? "step" : undefined}>
                    <span className="flow-step-marker" aria-hidden="true">{isComplete ? "✓" : index + 1}</span>
                    <span className="flow-step-label">{step.label}</span>
                  </li>
                )
              })}
            </ol>
          </nav>
        )}
      </div>
    </header>
  )
}
