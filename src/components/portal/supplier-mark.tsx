import type { PortalResource } from "@/lib/selections/resources";
import { cn } from "@/lib/utils";

function initials(name: string, slug: string): string {
  const fromName = name
    .split(/[\s&-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
  return fromName || slug.slice(0, 2).toUpperCase();
}

export function SupplierMark({
  resource,
  className,
}: {
  resource: Pick<PortalResource, "name" | "slug" | "logoPath">;
  className?: string;
}) {
  const src = resource.logoPath?.trim() || "";
  return (
    <span
      className={cn(
        "flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-border bg-white",
        className,
      )}
    >
      {src ? (
        // Logos are mixed SVG/PNG from suppliers and admin uploads; next/image is awkward with SVG.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="size-full object-contain p-1.5" />
      ) : (
        <span className="text-[0.65rem] font-semibold tracking-wide text-muted-foreground">
          {initials(resource.name, resource.slug)}
        </span>
      )}
    </span>
  );
}
