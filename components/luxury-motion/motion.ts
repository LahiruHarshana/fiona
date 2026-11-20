export const luxuryEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function splitHeadline(headline: string) {
  if (!headline.includes(". ")) {
    return [headline];
  }

  return headline
    .split(". ")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => (line.endsWith(".") ? line : `${line}.`));
}
