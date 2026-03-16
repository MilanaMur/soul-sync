export const romanticColors = {
  rose: '#ff4d6d', // Rose Velvet
  wine: '#a4133c', // Wine
  dusty: '#d88c9a', // Dusty Pink
  plum: '#7b2cbf', // Plum
  gold: '#c6a75e', // Deep Gold
} as const

export type RomanticColorKey = keyof typeof romanticColors

