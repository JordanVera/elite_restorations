import Image from "next/image";

import type { Img } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * Width of a photo that fills `.gutter.mx-auto.max-w-[120rem]`.
 * Padding is clamp(1.25rem, 4vw, 4rem) on each side, and 112rem once the
 * column caps. The sizes attribute does not use clamp(), which some browsers
 * drop, and it names an 8vw token so the candidate list stays a known length.
 */
export const bleedPhotoSizes =
  "(min-width: 120rem) 112rem, (min-width: 40rem) calc(100vw - 8vw), calc(100vw - 2.5rem)";

type PhotoProps = {
  image: Img;
  sizes: string;
  priority?: boolean;
  className?: string;
  quality?: number;
  decoding?: "async" | "sync" | "auto";
  /** Renders at intrinsic aspect ratio instead of filling a sized parent. */
  intrinsic?: boolean;
};

export function Photo({
  image,
  sizes,
  priority,
  className,
  quality = 78,
  decoding,
  intrinsic,
}: PhotoProps) {
  const unoptimized = image.src.endsWith(".svg");
  // The hero is the LCP image. Decode it immediately so paint is not waiting
  // on an async decode after the bytes arrive. Other photos stay async.
  const decodingMode = decoding ?? (priority ? "sync" : "async");

  if (intrinsic) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={priority}
        fetchPriority={priority ? "high" : "low"}
        loading={priority ? "eager" : "lazy"}
        decoding={decodingMode}
        quality={quality}
        unoptimized={unoptimized}
        className={cn("h-auto w-full", className)}
      />
    );
  }

  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes={sizes}
      priority={priority}
      fetchPriority={priority ? "high" : "low"}
      loading={priority ? "eager" : "lazy"}
      decoding={decodingMode}
      quality={quality}
      unoptimized={unoptimized}
      className={cn("object-cover", className)}
    />
  );
}
