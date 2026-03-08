export function stemToSlug(stem: string | undefined): string {
  return stem?.split('/').pop() ?? ''
}
