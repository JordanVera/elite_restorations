import { ImageReveal, Reveal } from '@/components/motion';
import { Photo } from '@/components/photo';
import { FocusCards } from '@/components/ui/focus-cards';
import { team } from '@/lib/team';
import { cn } from '@/lib/utils';

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
            A small office and experienced crews, so your project has a name and
            a number attached to it from the first call to the final
            walkthrough.
          </p>
        </Reveal>

        <FocusCards className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2 md:gap-y-20">
          {team.map((person, index) => (
            <article key={person.name}>
              {person.photo ? (
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
              ) : (
                <div
                  className={cn(
                    'relative flex aspect-[3/4] flex-col justify-end bg-surface p-8',
                    person.tall ? 'md:aspect-[3/4]' : 'md:aspect-[5/6]',
                  )}
                >
                  <p className="eyebrow text-accent-ink">Team</p>
                  <p className="font-display mt-4 max-w-[12ch] text-4xl leading-tight md:text-5xl">
                    {person.role}
                  </p>
                </div>
              )}
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
