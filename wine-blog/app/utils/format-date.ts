const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-GB', DATE_OPTIONS)
}
