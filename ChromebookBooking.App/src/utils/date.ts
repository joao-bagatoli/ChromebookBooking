export function formatDate(rawDate?: string | Date | null): string {
  if (!rawDate) return '-'

  const date = rawDate instanceof Date ? rawDate : new Date(rawDate)

  if (isNaN(date.getTime())) return '-'

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date)
}
