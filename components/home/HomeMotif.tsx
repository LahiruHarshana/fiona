export default function HomeMotif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" fill="none">
      <circle cx="100" cy="100" r="78" stroke="currentColor" strokeWidth="0.55" />
      <circle cx="100" cy="100" r="48" stroke="currentColor" strokeWidth="0.4" />
      <path
        d="M100 26c16 26 16 52 0 78-16-26-16-52 0-78Zm0 148c-16-26-16-52 0-78 16 26 16 52 0 78Z"
        stroke="currentColor"
        strokeWidth="0.45"
      />
    </svg>
  );
}
