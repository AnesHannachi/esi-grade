// ─── exportUtils.js ─────────────────────────────────────────────────────────
// Exports grades data to Excel (.xlsx) or PDF using jsPDF + jspdf-autotable

/* ══════════════════════════════════════════════════════════
   EXCEL EXPORT
══════════════════════════════════════════════════════════ */
export async function exportToExcel({ year, semester, grades, average }) {
  const XLSX = await import("xlsx")

  const wb = XLSX.utils.book_new()

  // ── Sheet 1 : Résumé ────────────────────────────────────
  const summaryRows = [
    ["ESIGRADE – Relevé de Notes"],
    [],
    ["Année", `${year}ère/ème Année`],
    ["Semestre", `Semestre ${semester}`],
    ["Nombre de modules", grades.length],
    ["Moyenne Générale", Number(average).toFixed(2)],
    ["Mention", getMention(average)],
    [],
    ["Modules validés (≥10)", grades.filter((g) => g.average >= 10).length],
    ["Modules non validés (<10)", grades.filter((g) => g.average < 10).length],
  ]
  const wsSummary = XLSX.utils.aoa_to_sheet(summaryRows)
  wsSummary["!cols"] = [{ wch: 28 }, { wch: 22 }]
  XLSX.utils.book_append_sheet(wb, wsSummary, "Résumé")

  // ── Sheet 2 : Détail des notes ──────────────────────────
  const headerRow = ["Module", "Contrôle", "Type", "Pondération (%)", "Note /20", "Moyenne Module", "Mention"]
  const detailRows = [headerRow]

  grades.forEach((g) => {
    const controls = g.controls || [
      { label: g.note1?.name || "Note 1", type: "–", percent: g.note1?.percent ?? 0, value: g.note1?.value ?? 0 },
      { label: g.note2?.name || "Note 2", type: "–", percent: g.note2?.percent ?? 0, value: g.note2?.value ?? 0 },
    ]
    controls.forEach((c, i) => {
      detailRows.push([
        i === 0 ? g.name : "",         // Module name only on first row
        c.label || c.type,
        c.type || "–",
        `${c.percent}%`,
        Number(c.value).toFixed(2),
        i === 0 ? Number(g.average).toFixed(2) : "",
        i === 0 ? getMention(g.average) : "",
      ])
    })
    // blank separator row
    detailRows.push(["", "", "", "", "", "", ""])
  })

  // Total row
  detailRows.push([
    "MOYENNE GÉNÉRALE", "", "", "", "", Number(average).toFixed(2), getMention(average),
  ])

  const wsDetail = XLSX.utils.aoa_to_sheet(detailRows)
  wsDetail["!cols"] = [
    { wch: 28 }, { wch: 28 }, { wch: 10 }, { wch: 18 }, { wch: 12 }, { wch: 18 }, { wch: 18 },
  ]
  XLSX.utils.book_append_sheet(wb, wsDetail, "Détail des Notes")

  // ── Sheet 3 : Classement ────────────────────────────────
  const sorted = [...grades].sort((a, b) => b.average - a.average)
  const rankRows = [
    ["Classement", "Module", "Moyenne /20", "Mention"],
    ...sorted.map((g, i) => [i + 1, g.name, Number(g.average).toFixed(2), getMention(g.average)]),
  ]
  const wsRank = XLSX.utils.aoa_to_sheet(rankRows)
  wsRank["!cols"] = [{ wch: 12 }, { wch: 30 }, { wch: 14 }, { wch: 18 }]
  XLSX.utils.book_append_sheet(wb, wsRank, "Classement")

  // ── Download ────────────────────────────────────────────
  XLSX.writeFile(wb, `ESIGRADE_Année${year}_S${semester}.xlsx`)
}

/* ══════════════════════════════════════════════════════════
   PDF EXPORT
══════════════════════════════════════════════════════════ */
export async function exportToPDF({ year, semester, grades, average }) {
  const { default: jsPDF } = await import("jspdf")
  const { default: autoTable } = await import("jspdf-autotable")

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" })
  const pageW = doc.internal.pageSize.getWidth()

  // ── Color palette ───────────────────────────────────────
  const C = {
    dark:    [10,  15,  40],
    blue:    [79,  142, 247],
    cyan:    [34,  211, 238],
    green:   [52,  211, 153],
    orange:  [251, 146, 60],
    red:     [239, 68,  68],
    purple:  [167, 139, 250],
    white:   [240, 244, 255],
    muted:   [120, 130, 160],
    cardBg:  [22,  28,  60],
  }

  const scoreColor = (s) =>
    s >= 16 ? C.green : s >= 14 ? C.blue : s >= 10 ? C.orange : C.red

  // ── Header banner ───────────────────────────────────────
  doc.setFillColor(...C.dark)
  doc.rect(0, 0, pageW, 42, "F")

  // Gradient bar accent
  doc.setFillColor(...C.blue)
  doc.rect(0, 0, pageW, 3, "F")

  doc.setTextColor(...C.white)
  doc.setFontSize(22)
  doc.setFont("helvetica", "bold")
  doc.text("ESIGRADE", 14, 16)

  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(...C.muted)
  doc.text("Relevé de Notes Académiques", 14, 23)

  doc.setFontSize(9)
  doc.text(`Année ${year}  ·  Semestre ${semester}  ·  ${grades.length} modules`, 14, 30)
  doc.text(`Généré le ${new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}`, 14, 36)

  // ── Average badge (top right) ────────────────────────────
  const col = scoreColor(average)
  doc.setFillColor(...col)
  doc.roundedRect(pageW - 54, 8, 40, 26, 4, 4, "F")
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(18)
  doc.setFont("helvetica", "bold")
  doc.text(Number(average).toFixed(2), pageW - 34, 22, { align: "center" })
  doc.setFontSize(8)
  doc.setFont("helvetica", "normal")
  doc.text(getMention(average), pageW - 34, 29, { align: "center" })

  let yPos = 50

  // ── Summary stats row ────────────────────────────────────
  const above10 = grades.filter((g) => g.average >= 10).length
  const below10 = grades.length - above10
  const best    = grades.reduce((b, g) => (g.average > b.average ? g : b), grades[0])
  const worst   = grades.reduce((b, g) => (g.average < b.average ? g : b), grades[0])

  const chips = [
    { label: "Modules validés", value: `${above10}`, color: C.green },
    { label: "Non validés",     value: `${below10}`, color: C.red },
    { label: "Meilleure note",  value: best?.average.toFixed(2) ?? "–", color: C.cyan },
    { label: "Note la + basse", value: worst?.average.toFixed(2) ?? "–", color: C.orange },
  ]

  const chipW = (pageW - 28 - 9) / 4
  chips.forEach((chip, i) => {
    const x = 14 + i * (chipW + 3)
    doc.setFillColor(...C.cardBg)
    doc.roundedRect(x, yPos, chipW, 18, 3, 3, "F")
    doc.setFillColor(...chip.color)
    doc.roundedRect(x, yPos, 3, 18, 1, 1, "F")
    doc.setTextColor(...chip.color)
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text(chip.value, x + 10, yPos + 10)
    doc.setTextColor(...C.muted)
    doc.setFontSize(7)
    doc.setFont("helvetica", "normal")
    doc.text(chip.label, x + 10, yPos + 15)
  })

  yPos += 26

  // ── Module detail table ──────────────────────────────────
  doc.setTextColor(...C.white)
  doc.setFontSize(11)
  doc.setFont("helvetica", "bold")
  doc.text("Détail des notes par module", 14, yPos)
  yPos += 5

  const tableBody = []
  grades.forEach((g) => {
    const controls = g.controls || [
      { label: g.note1?.name || "Note 1", type: "–", percent: g.note1?.percent ?? 0, value: g.note1?.value ?? 0 },
      { label: g.note2?.name || "Note 2", type: "–", percent: g.note2?.percent ?? 0, value: g.note2?.value ?? 0 },
    ]
    controls.forEach((c, ci) => {
      tableBody.push({
        module:  ci === 0 ? g.name : "",
        type:    c.type || c.label || "–",
        percent: `${c.percent}%`,
        note:    Number(c.value).toFixed(2),
        avg:     ci === 0 ? Number(g.average).toFixed(2) : "",
        mention: ci === 0 ? getMention(g.average) : "",
        _avg:    g.average,
        _first:  ci === 0,
      })
    })
  })

  autoTable(doc, {
    startY: yPos,
    head: [["Module", "Type", "Pond.", "Note /20", "Moy. /20", "Mention"]],
    body: tableBody.map((r) => [r.module, r.type, r.percent, r.note, r.avg, r.mention]),
    theme: "plain",
    styles: {
      font: "helvetica",
      fontSize: 8.5,
      cellPadding: { top: 3, right: 4, bottom: 3, left: 4 },
      textColor: C.white,
      fillColor: C.dark,
    },
    headStyles: {
      fillColor: C.blue,
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 8.5,
    },
    alternateRowStyles: { fillColor: C.cardBg },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 52 },
      1: { cellWidth: 30 },
      2: { cellWidth: 18, halign: "center" },
      3: { cellWidth: 20, halign: "center" },
      4: { cellWidth: 22, halign: "center", fontStyle: "bold" },
      5: { cellWidth: 28, halign: "center" },
    },
    didParseCell(data) {
      if (data.column.index === 4 && data.section === "body") {
        const row = tableBody[data.row.index]
        if (row?._first && row._avg !== undefined) {
          data.cell.styles.textColor = scoreColor(row._avg)
        }
      }
    },
    didDrawPage(data) {
      // Footer on each page
      const pCount = doc.internal.getNumberOfPages()
      doc.setFontSize(7)
      doc.setTextColor(...C.muted)
      doc.text(
        `ESIGRADE · Page ${data.pageNumber} / ${pCount}`,
        pageW / 2,
        doc.internal.pageSize.getHeight() - 6,
        { align: "center" }
      )
    },
  })

  // ── Final average row ────────────────────────────────────
  const finalY = doc.lastAutoTable.finalY + 4
  if (finalY < doc.internal.pageSize.getHeight() - 20) {
    doc.setFillColor(...scoreColor(average))
    doc.roundedRect(14, finalY, pageW - 28, 12, 3, 3, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(10)
    doc.setFont("helvetica", "bold")
    doc.text(`Moyenne Générale : ${Number(average).toFixed(2)} / 20  –  ${getMention(average)}`, pageW / 2, finalY + 7.5, { align: "center" })
  }

  // ── Download ────────────────────────────────────────────
  doc.save(`ESIGRADE_Année${year}_S${semester}.pdf`)
}

/* ── Mention helper ─────────────────────────────────────── */
function getMention(score) {
  const s = Number(score)
  if (s >= 16) return "Excellent"
  if (s >= 14) return "Très Bien"
  if (s >= 12) return "Bien"
  if (s >= 10) return "Passable"
  return "Insuffisant"
}
