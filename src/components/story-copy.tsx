import Link from "next/link";
import type { ReactNode } from "react";

const linkPattern = /\[([^\]]+)\]\((\/[^)\s]+)\)/g;

/** Renders a paragraph that may contain internal markdown links. */
export function StoryCopy({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let last = 0;

  for (const match of text.matchAll(linkPattern)) {
    const index = match.index ?? 0;
    if (index > last) {
      nodes.push(<span key={`t-${last}`}>{text.slice(last, index)}</span>);
    }
    nodes.push(
      <Link
        key={`l-${index}`}
        href={match[2]}
        className="underline decoration-foreground/30 underline-offset-[0.35em] transition-colors hover:text-accent-ink hover:decoration-accent-ink"
      >
        {match[1]}
      </Link>,
    );
    last = index + match[0].length;
  }

  if (last < text.length) {
    nodes.push(<span key={`t-${last}`}>{text.slice(last)}</span>);
  }

  return <>{nodes}</>;
}
