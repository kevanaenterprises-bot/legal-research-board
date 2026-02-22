export interface LetterInputs {
  stateName: string
  issueDescription: string
  senderName: string
  senderAddress: string
  senderEmail: string
  senderPhone: string
  recipientName: string
  recipientAddress: string
  subject: string
  facts: string
  demands: string
  deadlineDays: number
}

export interface Letter {
  text: string
}

export function buildCeaseAndDesistLetter(inputs: LetterInputs): Letter {
  const today = new Date()
  const dateStr = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const deadline = new Date(today)
  deadline.setDate(deadline.getDate() + inputs.deadlineDays)
  const deadlineStr = deadline.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const text = `${dateStr}

${inputs.senderName}
${inputs.senderAddress}
${inputs.senderEmail}
${inputs.senderPhone}

${inputs.recipientName}
${inputs.recipientAddress}

Re: ${inputs.subject}

Dear ${inputs.recipientName}:

This letter is to demand that you immediately cease and desist from the unlawful conduct described below. Please pay close attention to the facts, legal basis, and demands outlined herein.

FACTS:

${inputs.facts}

LEGAL BASIS:

The conduct described above violates applicable law in ${inputs.stateName}, including but not limited to protections against unlawful conduct. You have no legal right to continue this behavior, and doing so exposes you to legal liability, including potential damages and attorney's fees.

DEMANDS:

${inputs.demands}

You must take the actions demanded above on or before ${deadlineStr}. Failure to comply will result in further legal action without additional notice.

This letter is sent in good faith to resolve this matter. Should you wish to discuss a resolution, please contact me immediately.

Sincerely,

${inputs.senderName}`

  return { text }
}
