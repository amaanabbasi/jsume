'use client'

import { FiDownload } from 'react-icons/fi'

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="bg-surface text-ink border-line hover:bg-surface-2 inline-flex items-center gap-2 border rounded-lg px-3 py-1.5 text-sm font-medium transition-colors"
    >
      <FiDownload className="size-4" aria-hidden />
      Save as PDF
    </button>
  )
}
