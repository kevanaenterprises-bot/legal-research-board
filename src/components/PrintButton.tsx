import { Printer } from 'lucide-react'

export function PrintButton({ targetId }: { targetId: string }) {
  const handlePrint = () => {
    const element = document.getElementById(targetId)
    if (!element) {
      console.error(`Element with id "${targetId}" not found`)
      return
    }

    const printWindow = window.open('', '', 'width=800,height=600')
    if (!printWindow) {
      console.error('Could not open print window')
      return
    }

    const content = element.innerHTML
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Letter</title>
          <style>
            body {
              font-family: Georgia, serif;
              line-height: 1.6;
              margin: 40px;
              color: #000;
            }
            pre {
              white-space: pre-wrap;
              word-wrap: break-word;
              font-family: Georgia, serif;
            }
            @media print {
              body { margin: 0.5in; }
            }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.focus()
    printWindow.print()
    printWindow.close()
  }

  return (
    <button
      onClick={handlePrint}
      className="inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-3 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-700"
      title="Print the letter"
    >
      <Printer className="h-4 w-4" />
      <span className="hidden sm:inline">Print</span>
    </button>
  )
}
