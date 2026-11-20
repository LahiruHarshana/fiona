export const homeEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function splitHeadline(headline: string) {
  return headline
    .split(". ")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => (line.endsWith(".") ? line : `${line}.`));
}
