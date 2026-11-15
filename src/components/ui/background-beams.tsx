import { cn } from "@/lib/utils";

const PATH_COUNT = 26;

function pathFor(i: number) {
  const dx = i * 14;
  const dy = i * -16;
  return `M${-380 + dx} ${-189 + dy}C${-380 + dx} ${-189 + dy} ${-312 + dx} ${216 + dy} ${152 + dx} ${343 + dy}C${616 + dx} ${470 + dy} ${684 + dx} ${875 + dy} ${684 + dx} ${875 + dy}`;
}

// Deterministic pseudo-random values keep server and client renders identical.
function seeded(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

const paths = Array.from({ length: PATH_COUNT }, (_, i) => ({
  d: pathFor(i),
  duration: 12 + seeded(i, 1) * 10,
  delay: seeded(i, 2) * 8,
  end: 93 + seeded(i, 3) * 8,
}));

export function BackgroundBeams({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 flex size-full items-center justify-center", className)}
    >
      <svg
        className="absolute z-0 size-full"
        width="100%"
        height="100%"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths.map((path, index) => (
          <path
            key={`base-${index}`}
            d={path.d}
            stroke="currentColor"
            strokeOpacity="0.09"
            strokeWidth="0.5"
          />
        ))}
      </svg>
    </div>
  );
}
