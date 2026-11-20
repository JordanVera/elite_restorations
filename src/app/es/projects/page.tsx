import type { Metadata } from 'next';

import { CtaBand } from '@/components/cta-band';
import { PageHero } from '@/components/page-hero';
import { ProjectsBrowser, type BrowserPhoto } from '@/components/projects-browser';
import { projectCategories, projects } from '@/lib/projects';
import { languageAlternates, pageMetadata } from '@/lib/seo';

const categoryNames: Record<string, string> = {
  Kitchens: 'Cocinas',
  Bathrooms: 'Baños',
  Floors: 'Pisos',
  Details: 'Detalles',
  'Roof & exterior': 'Techo y exterior',
  Recovery: 'Restauración',
};

export const metadata: Metadata = pageMetadata({
  title: 'Fotos de proyectos en Houston',
  description:
    'Cocinas, baños, pisos, techos y restauración por tormenta de Elite Restorations en Houston. Fotos de trabajos en el área.',
  path: '/es/projects',
  locale: 'es',
  image: '/images/projects/kitchens/coffered-ceiling-island.jpg',
  languages: languageAlternates('/projects', '/es/projects'),
});

export default function SpanishProjectsPage() {
  const photos: BrowserPhoto[] = projects.flatMap((project) =>
    project.gallery.map((image) => ({
      id: image.src,
      category: categoryNames[project.category] ?? project.category,
      image,
    })),
  );

  return (
    <>
      <PageHero
        eyebrow="Proyectos"
        title={['Trabajo elegido,', 'por el cuarto.']}
        lede="Fotos de cocinas, baños, pisos, detalles, exteriores y restauración por tormenta en el área de Houston. Somos una empresa familiar y servimos a Houston desde 1993. Salimos de nuestra oficina en el oeste de Houston (77082)."
        homeCrumb={{ name: 'Inicio', path: '/es' }}
        crumbs={[{ name: 'Proyectos', path: '/es/projects' }]}
      />
      <section aria-label="Fotos de proyectos" className="py-14 md:py-20">
        <div className="gutter mx-auto max-w-[120rem]">
          <ProjectsBrowser
            photos={photos}
            categories={projectCategories.map((category) => categoryNames[category] ?? category)}
            locale="es"
          />
        </div>
      </section>
      <CtaBand
        title="¿Tiene un cuarto en mente?"
        body="Mándenos fotos, un dibujo o una frase. Le ayudamos a ver qué se puede hacer. Llame al (713) 909-0034."
        href="/es/contact"
        buttonLabel="Pedir un estimado"
        textLabel="Envíanos un texto"
        sectionLabel="Pedir un estimado"
      />
    </>
  );
}
