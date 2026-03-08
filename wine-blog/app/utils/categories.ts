export const categoryMap: Record<string, string> = {
  'wine-review': 'Wine Review',
  travel: 'Travel',
  personal: 'Personal',
  education: 'Education',
}

export function categoryLabel(category: string): string {
  return categoryMap[category] ?? category
}
