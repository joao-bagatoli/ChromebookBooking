const DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
})

export function formatDate(rawDate?: string | Date | null): string {
  if (!rawDate) return '-'

  let date: Date

  if (rawDate instanceof Date) {
    date = rawDate
  } else {
    const dateOnly = DATE_ONLY.exec(rawDate.trim())

    date = dateOnly
      ? new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]))
      : new Date(rawDate)
  }

  if (isNaN(date.getTime())) return '-'

  return dateFormatter.format(date)
}
