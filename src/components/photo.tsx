import Image from "next/image";

import type { Img } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * Width of a photo that fills `.gutter.mx-auto.max-w-[120rem]`.
 * Padding is clamp(1.25rem, 4vw, 4rem) on each side, so the photo is
 * 100vw minus clamp(2.5rem, 8vw, 8rem), and 112rem once the column caps.
 */
export const bleedPhotoSizes =
  "(min-width: 120rem) 112rem, calc(100vw - clamp(2.5rem, 8vw, 8rem))";

type PhotoProps = {
  image: Img;
  sizes: string;
  priority?: boolean;
  className?: string;
  quality?: number;
  /** Renders at intrinsic aspect ratio instead of filling a sized parent. */
  intrinsic?: boolean;
};

export function Photo({ image, sizes, priority, className, quality = 78, intrinsic }: PhotoProps) {
  const unoptimized = image.src.endsWith(".svg");

  if (intrinsic) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
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
      fetchPriority={priority ? "high" : undefined}
      quality={quality}
      unoptimized={unoptimized}
      className={cn("object-cover", className)}
    />
  );
}
