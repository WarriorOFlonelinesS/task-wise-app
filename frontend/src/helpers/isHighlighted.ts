export const isHighlighted = (unique: string[], part: string) =>
  unique.some((u) => part.toLowerCase() === u.toLowerCase());
