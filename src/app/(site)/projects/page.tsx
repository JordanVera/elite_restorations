import type { Metadata } from 'next';

import { CtaBand } from '@/components/cta-band';
import { PageHero } from '@/components/page-hero';
import {
  ProjectsBrowser,
  type BrowserPhoto,
} from '@/components/projects-browser';
import { projectCategories, projects } from '@/lib/projects';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Projects',
  description:
    'Kitchens, bathrooms, floors, details and exterior work from Elite Restorations across Greater Houston, plus a look at storm and water recovery.',
  path: '/projects',
  image: '/images/projects/kitchens/coffered-ceiling-island.jpg',
});

export default function ProjectsPage() {
  const photos: BrowserPhoto[] = projects.flatMap((p) =>
    p.gallery.map((image) => ({
      id: image.src,
      category: p.category,
      image,
    })),
  );

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title={['Selected work,', 'by the room.']}
        lede="Photographs from kitchens, bathrooms, floors, details, exteriors and recovery work across Greater Houston."
        crumbs={[{ name: 'Projects', path: '/projects' }]}
      />
      <section aria-label="Project photos" className="py-14 md:py-20">
        <div className="gutter mx-auto max-w-[120rem]">
          <ProjectsBrowser photos={photos} categories={projectCategories} />
        </div>
      </section>
      <CtaBand
        title="Have a room in mind?"
        body="Send us photos, a sketch or just a sentence. We will help you work out what is possible."
      />
    </>
  );
}
