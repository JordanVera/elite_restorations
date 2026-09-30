import { ScrollWords } from '@/components/home/scroll-words';
import { ImageReveal, Parallax, Reveal } from '@/components/motion';
import { Photo } from '@/components/photo';
import { img } from '@/lib/images';
import Image from 'next/image';

const plank = img(
  '/images/projects/bathrooms/freestanding-tub-window.jpg',
  'Bathroom remodel',
);
const tile = img(
  '/images/projects/bathrooms/matte-black-tub-and-shower.jpg',
  'Matte black tub and shower',
);

const principles = [
  {
    n: 'i.',
    title: 'Restore first.',
    body: 'If it can be saved, we save it. Dry the structure, repair the roof, keep what is sound. Replacement is the last answer, not the first.',
    offset: 'lg:mt-0',
  },
  {
    n: 'ii.',
    title: 'Rebuild honestly.',
    body: 'You get a clear scope, a clear price, and a team that picks up the phone, from the first walkthrough to the last.',
    offset: 'lg:mt-24',
  },
  {
    n: 'iii.',
    title: 'Remodel with intent.',
    body: 'Every material, every seam, every trim line is a decision. We help you make them, then we build them cleanly.',
    offset: 'lg:mt-10',
  },
];

export function HomeManifesto() {
  return (
    <section
      id="manifesto"
      aria-labelledby="manifesto-heading"
      className="relative scroll-mt-20 overflow-clip py-32 md:py-48"
    >
      <div className="gutter mx-auto max-w-[120rem]">
        <div className="grid gap-y-16 lg:grid-cols-12">
          <div className="lg:col-span-2">
            <Reveal>
              <p
                id="manifesto-heading"
                className="eyebrow text-muted-foreground"
              >
                How we work
              </p>
              <Image
                src={'/images/logo/elite-restorations-logo.png'}
                alt="Manifesto"
                width={300}
                height={300}
                className="w-full mt-6"
              />
              {/* <p aria-hidden className="font-display mt-6 text-[7rem] leading-none text-accent-ink/80">
                &sect;
              </p> */}
            </Reveal>
          </div>

          <div className="relative lg:col-span-9 lg:col-start-4">
            <ScrollWords
              className="relative z-30 t-lg text-[clamp(2rem,4.9vw,4.9rem)]! leading-[1.04]!"
              segments={[
                {
                  text: 'Some jobs start with a storm. Others start with a stubborn cabinet and a good idea. Either way, the same family shows up. We',
                },
                { text: 'restore', emphasis: true },
                { text: 'what should stay,' },
                { text: 'rebuild', emphasis: true },
                { text: 'what cannot, and' },
                { text: 'remodel', emphasis: true },
                {
                  text: 'what deserves better, and we stay until the last drawer closes.',
                },
              ]}
            />

            <div className="pointer-events-none absolute -right-4 -top-24 z-10 hidden w-44 lg:block xl:-right-16 xl:w-56">
              <ImageReveal from="top" className="aspect-[3/4]">
                <Parallax offset={40} className="size-full">
                  <div className="relative size-full">
                    <Photo image={plank} sizes="14vw" />
                  </div>
                </Parallax>
              </ImageReveal>
            </div>
          </div>
        </div>

        <div className="relative mt-24 grid items-start gap-16 lg:mt-40 lg:grid-cols-12">
          <div className="relative z-10 hidden lg:col-span-3 lg:col-start-1 lg:block">
            <ImageReveal from="left" className="aspect-[4/5]">
              <Parallax offset={50} className="size-full" scale={1.12}>
                <div className="relative size-full">
                  <Photo image={tile} sizes="24vw" />
                </div>
              </Parallax>
            </ImageReveal>
            <p className="eyebrow mt-4 text-muted-foreground">
              Detail, matte black tub and shower
            </p>
          </div>

          <ul className="relative z-30 grid gap-x-10 gap-y-16 lg:col-span-9 lg:col-start-4 lg:grid-cols-3">
            {principles.map((item, i) => (
              <li key={item.title} className={item.offset}>
                <Reveal delay={i * 0.12}>
                  <div className="border-t border-foreground/40 pt-6">
                    <p className="font-display text-5xl italic text-accent-ink">
                      {item.n}
                    </p>
                    <h3 className="t-md mt-6">{item.title}</h3>
                    <p className="mt-4 text-muted-foreground">{item.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
