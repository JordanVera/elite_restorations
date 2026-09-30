import Image from "next/image";

import type { Img } from "@/lib/images";
import { cn } from "@/lib/utils";

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
      quality={quality}
      unoptimized={unoptimized}
      className={cn("object-cover", className)}
    />
  );
}
