import { imageManifest } from "@/lib/image-manifest";

export type Img = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** True when the asset is a stand-in that must be replaced with real photography. */
  placeholder?: boolean;
};

export function img(src: string, alt: string): Img {
  const dims = imageManifest[src];
  if (!dims) {
    throw new Error(`Image not found in manifest: ${src}. Run "npm run images:manifest".`);
  }
  return { src, alt, ...dims };
}

export function placeholderImg(src: string, alt: string, width: number, height: number): Img {
  return { src, alt, width, height, placeholder: true };
}

export function humanize(filename: string) {
  const base = filename.replace(/\.[a-z0-9]+$/i, "").replace(/-/g, " ");
  return base.charAt(0).toUpperCase() + base.slice(1);
}

export function aspectOf(image: Img) {
  return image.width / image.height;
}
