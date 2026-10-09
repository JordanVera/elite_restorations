import { DriftPhoto } from '@/components/about/drift-photo';
import { ImageReveal, Reveal } from '@/components/motion';
import { Photo } from '@/components/photo';
import { img } from '@/lib/images';

const wendy = img(
  '/images/about/gearge_and_wendy.jpeg',
  'George Rodriguez with Wendy',
);
const fruit = img(
  '/images/about/fruits.webp',
  'Peaches, cherry tomatoes, and blackberries on a kitchen counter',
);
const basket = img(
  '/images/about/fruits_2.webp',
  'A basket of peaches, blackberries, and cherry tomatoes',
);
const tilman = img(
  '/images/about/george_and_tilman.jpeg',
  'George Rodriguez with Tilman Fertitta',
);

const frames = [
  { image: wendy, offset: 2.5, delay: 0, className: 'aspect-[3/4]' },
  {
    image: fruit,
    offset: 4,
    delay: 0.08,
    className: 'aspect-[3/4] md:ml-[14%] md:w-[86%]',
  },
  {
    image: basket,
    offset: 3,
    delay: 0.12,
    className: 'aspect-[3/4] md:w-[80%]',
  },
];

export function FamilyEssay() {
  return (
    <section aria-labelledby="story-heading" className="pb-20 md:pb-28">
      <div className="gutter mx-auto grid max-w-[120rem] gap-14 lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-5 lg:self-start xl:sticky xl:top-28">
          <Reveal>
            <p className="eyebrow text-accent-ink">Our story</p>
            <h2 id="story-heading" className="font-display t-lg mt-4 max-w-[16ch]">
              Learned on job sites, passed down.
            </h2>
          </Reveal>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted-foreground">
            <Reveal>
              <p className="measure">
                George Rodriguez began working in construction at 17, alongside
                his father. Years of hands-on work and mentorship followed, and
                when his father retired, George took over the company and kept
                it going.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="measure">
                Today his son, George III, works in the business too. That
                continuity shows up in how we work: the same values, the same
                attention to the unglamorous parts of a job, and a long view of
                every relationship with a client.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="measure">
                We began as remodelers and grew into restoration because the
                two are closely related. Knowing how a house goes together
                makes us better at repairing it after a storm or a leak, and
                knowing how it fails makes us better at building it back.
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="space-y-6 md:space-y-10 lg:col-span-6 lg:col-start-7">
          {frames.map((frame) => (
            <li key={frame.image.src}>
              <DriftPhoto
                image={frame.image}
                offset={frame.offset}
                delay={frame.delay}
                sizes="(min-width: 1024px) 38vw, 92vw"
                className={frame.className}
              />
            </li>
          ))}
        </ul>
      </div>

      <figure className="gutter mx-auto mt-16 grid max-w-[120rem] md:mt-28 lg:grid-cols-12">
        <ImageReveal className="relative aspect-[3/4] lg:col-span-6 lg:col-start-7">
          <Photo
            image={tilman}
            sizes="(min-width: 1024px) 42vw, 92vw"
            className="object-[center_20%]"
          />
        </ImageReveal>
      </figure>
    </section>
  );
}
