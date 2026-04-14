/** LabSys brand color constants — use these for dynamic inline styles only.
 *  For static styling, prefer Tailwind utility classes (bg-primary, text-primary-mid, …).
 */

export const COLORS = {
  // Primary palette (teal/green)
  primary: '#0C5044',
  primaryMid: '#1D9E75',
  primaryLight: '#5DCAA5',
  primaryBg: '#E1F5EE',

  // Neutral palette
  textMain: '#1A1A1A',
  textMuted: '#5F5E5A',
  surface: '#F5F5F3',
  white: '#FFFFFF',
} as const

export type ColorKey = keyof typeof COLORS
