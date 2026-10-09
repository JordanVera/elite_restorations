import { ImageReveal, Reveal } from '@/components/motion';
import { Photo } from '@/components/photo';
import { FocusCards } from '@/components/ui/focus-cards';
import { img, type Img } from '@/lib/images';
import { cn } from '@/lib/utils';

const team: {
  name: string;
  role: string;
  body: string;
  photo: Img;
  tall?: boolean;
  imageClassName?: string;
}[] = [
  {
    name: 'George Rodriguez',
    role: 'Owner',
    body: 'Started in construction at 17, working beside his father, and took over the company when his father retired. His son, George III, now works alongside him.',
    photo: img(
      '/images/about/george_softball_2.webp',
      'George Rodriguez with a teammate at a softball field',
    ),
    tall: true,
  },
  {
    name: 'Michael Hanson',
    role: 'Lead Estimator',
    body: 'Walks the job, measures, and puts together the scope, cost and timeline so clients understand the project before it begins.',
    photo: img('/images/about/michael_hanson.webp', 'Michael Hanson, lead estimator'),
  },
  {
    name: 'Daniela',
    role: 'Office Operator Manager',
    body: 'Handles client support, scheduling, documentation and coordination with the crews.',
    photo: img('/images/about/daniela.webp', 'Daniela, office operator manager'),
  },
  {
    name: 'Norma',
    role: 'Office Operator Project Manager',
    body: "Organizes project timelines and communication, and schedules every installation around the team's capacity and your expectations.",
    photo: img('/images/about/norma.webp', 'Norma, office operator project manager'),
    imageClassName: 'object-[center_22%]',
  },
];

export function TeamGrid() {
  return (
    <section aria-labelledby="team-heading" className="py-20 md:py-28">
      <div className="gutter mx-auto max-w-[120rem]">
        <Reveal className="max-w-[40rem]">
          <p className="eyebrow text-accent-ink">The team</p>
          <h2 id="team-heading" className="font-display t-lg mt-4">
            Who you will talk to.
          </h2>
          <p className="mt-6 max-w-[38ch] text-lg leading-relaxed text-muted-foreground">
            A small office and experienced crews, so your project has a name
            and a number attached to it from the first call to the final
            walkthrough.
          </p>
        </Reveal>

        <FocusCards className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2 md:gap-y-20">
          {team.map((person, index) => (
            <article key={person.name}>
              <ImageReveal
                delay={index * 0.06}
                className={cn(
                  'relative aspect-[3/4] bg-surface',
                  person.tall ? 'md:aspect-[3/4]' : 'md:aspect-[5/6]',
                )}
              >
                <Photo
                  image={person.photo}
                  sizes="(min-width: 768px) 46vw, 92vw"
                  className={person.imageClassName}
                />
              </ImageReveal>
              <div className="mt-6 max-w-[42ch]">
                <h3 className="font-display text-4xl leading-tight md:text-5xl">
                  {person.name}
                </h3>
                <p className="eyebrow mt-3 text-accent-ink">{person.role}</p>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  {person.body}
                </p>
              </div>
            </article>
          ))}
        </FocusCards>
      </div>
    </section>
  );
}
