import { cn } from "@/lib/utils";

type Segment = { text: string; emphasis?: boolean };

/**
 * The sentence is in the HTML. The scroll-linked fill used to pull the
 * animation library into the first load, so the words render as text.
 */
export function ScrollWords({
  segments,
  className,
  as: Tag = "p",
  id,
}: {
  segments: Segment[];
  className?: string;
  as?: "p" | "h2";
  id?: string;
}) {
  return (
    <Tag id={id} className={className}>
      {segments.map((segment, index) => (
        <span key={index} className={cn(segment.emphasis && "italic text-accent-ink")}>
          {segment.text}{" "}
        </span>
      ))}
    </Tag>
  );
}
