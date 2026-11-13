'use client';

import dynamic from 'next/dynamic';
import * as React from 'react';

import type { LightboxImage } from '@/components/project-lightbox';
import { cn } from '@/lib/utils';

const ProjectLightbox = dynamic(
  () => import('@/components/project-lightbox').then((mod) => mod.ProjectLightbox),
  { ssr: false },
);

type GalleryContextValue = {
  openAt: (index: number) => void;
};

const ProjectGalleryContext = React.createContext<GalleryContextValue | null>(null);

function preloadProjectLightbox() {
  void import('@/components/project-lightbox');
}

function useProjectLightbox(images: readonly LightboxImage[]) {
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [activated, setActivated] = React.useState(false);

  const openAt = React.useCallback(
    (next: number) => {
      if (images.length === 0) return;
      const last = images.length - 1;
      setIndex(Math.min(Math.max(next, 0), last));
      setActivated(true);
      setOpen(true);
    },
    [images.length],
  );

  const lightbox = activated ? (
    <ProjectLightbox
      open={open}
      index={index}
      images={images}
      onClose={() => setOpen(false)}
    />
  ) : null;

  return { openAt, lightbox };
}

export function ProjectGallery({
  images,
  children,
}: {
  images: readonly LightboxImage[];
  children: React.ReactNode;
}) {
  const gallery = useProjectLightbox(images);
  const value = React.useMemo(() => ({ openAt: gallery.openAt }), [gallery.openAt]);

  return (
    <ProjectGalleryContext.Provider value={value}>
      {children}
      {gallery.lightbox}
    </ProjectGalleryContext.Provider>
  );
}

export function ProjectPhotoButton({
  index,
  alt,
  className,
  children,
}: {
  index: number;
  alt: string;
  className?: string;
  children: React.ReactNode;
}) {
  const gallery = React.useContext(ProjectGalleryContext);

  if (!gallery) {
    return <div className={className}>{children}</div>;
  }

  return (
    <button
      type="button"
      className={cn(
        'block w-full cursor-zoom-in border-0 bg-transparent p-0 text-inherit',
        'focus-visible:outline-offset-[-3px]',
        className,
      )}
      aria-haspopup="dialog"
      aria-label={`View larger photo: ${alt}`}
      onPointerDown={preloadProjectLightbox}
      onFocus={preloadProjectLightbox}
      onClick={() => gallery.openAt(index)}
    >
      {children}
    </button>
  );
}
