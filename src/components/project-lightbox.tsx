'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Lightbox, {
  isImageSlide,
  type RenderSlideProps,
  type SlideImage,
} from 'yet-another-react-lightbox';
import Counter from 'yet-another-react-lightbox/plugins/counter';

import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/counter.css';
import './project-lightbox.css';

/**
 * Largest width next/image will emit. Matches `images.deviceSizes` in
 * next.config.ts. Wider originals are requested as the file itself.
 */
const OPTIMIZED_IMAGE_MAX = 2560;

export type LightboxImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type ProjectLightboxProps = {
  open: boolean;
  index: number;
  images: readonly LightboxImage[];
  onClose: () => void;
};

function fittedSize(rect: { width: number; height: number }, image: SlideImage) {
  const sourceWidth = image.width ?? rect.width;
  const sourceHeight = image.height ?? rect.height;
  const width = Math.round(
    Math.min(rect.width, (rect.height / sourceHeight) * sourceWidth),
  );
  const height = Math.round(
    Math.min(rect.height, (rect.width / sourceWidth) * sourceHeight),
  );
  return { width: Math.max(width, 1), height: Math.max(height, 1) };
}

function LightboxSlide({ slide, offset, rect }: RenderSlideProps) {
  if (!isImageSlide(slide) || !slide.width || !slide.height) return undefined;
  if (rect.width < 2 || rect.height < 2) return <span />;

  const { width, height } = fittedSize(rect, slide);
  // The image optimizer will not emit a width above deviceSizes, so a wider
  // original would be downscaled. Those files are already the highest
  // resolution in the repo, and they are only fetched once the lightbox opens.
  const useOriginal = slide.src.endsWith('.svg') || slide.width > OPTIMIZED_IMAGE_MAX;

  return (
    <div style={{ position: 'relative', width, height }}>
      <Image
        fill
        src={slide.src}
        alt={slide.alt ?? ''}
        sizes={`${Math.max(slide.width, slide.height)}px`}
        quality={85}
        unoptimized={useOriginal}
        priority={offset === 0}
        draggable={false}
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
}

const FOCUSABLE =
  'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])';

function useLightboxFocusTrap(open: boolean) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const dialog = document.querySelector<HTMLElement>('.project-lightbox');
      if (!dialog) return;
      const focusable = [...dialog.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (element) => element.tabIndex >= 0,
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      const inside = active instanceof Node && dialog.contains(active);

      if (event.shiftKey) {
        if (!inside || active === first) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (!inside || active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
  }, [open]);
}

function useLightboxPadding() {
  const [padding, setPadding] = useState<'12px' | '48px'>(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches
      ? '12px'
      : '48px',
  );

  useEffect(() => {
    const media = window.matchMedia('(max-width: 639px)');
    const apply = () => setPadding(media.matches ? '12px' : '48px');
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, []);

  return padding;
}

export function ProjectLightbox({ open, index, images, onClose }: ProjectLightboxProps) {
  useLightboxFocusTrap(open);
  const padding = useLightboxPadding();

  return (
    <Lightbox
      open={open}
      close={onClose}
      index={index}
      slides={images}
      plugins={[Counter]}
      className="project-lightbox"
      carousel={{ finite: false, preload: 1, padding, imageFit: 'contain' }}
      controller={{
        closeOnBackdropClick: true,
        closeOnEscape: true,
        focus: true,
      }}
      animation={{ fade: 200, swipe: 280 }}
      labels={{
        Lightbox: 'Project photos',
        Previous: 'Previous photo',
        Next: 'Next photo',
        Close: 'Close gallery',
        Carousel: 'Gallery',
        Slide: 'Photo',
        'Photo gallery': 'Project photos',
        '{index} of {total}': 'Photo {index} of {total}',
      }}
      render={{ slide: LightboxSlide }}
      styles={{
        container: { backgroundColor: '#0a0a0b' },
      }}
    />
  );
}
