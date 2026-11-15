export function RoofLinework({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 300"
      fill="none"
      aria-hidden
      focusable="false"
      className={className}
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    >
      {[
        "M10 290 240 30l230 260H10Z",
        "M62 290 240 92l178 198",
        "M114 290 240 154l126 136",
        "M332 92V30h44v106",
      ].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
