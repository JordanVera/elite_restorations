import { ImageReveal, Reveal } from '@/components/motion';
import { Photo } from '@/components/photo';
import { FocusCards } from '@/components/ui/focus-cards';
import type { Img } from '@/lib/images';
import { team, type TeamMember } from '@/lib/team';
import { cn } from '@/lib/utils';

function withPhoto(person: TeamMember): person is TeamMember & { photo: Img } {
  return person.photo !== undefined;
}

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
          {team
            .filter(withPhoto)
            .map((person, index) => (
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

        {team
          .filter((person) => !person.photo)
          .map((person) => (
            <article
              key={person.name}
              className="mt-16 grid gap-6 border-t border-border pt-10 md:grid-cols-12"
            >
              <div className="md:col-span-5">
                <h3 className="font-display text-4xl leading-tight md:text-5xl">
                  {person.name}
                </h3>
                <p className="eyebrow mt-3 text-accent-ink">{person.role}</p>
              </div>
              <p className="max-w-[48ch] text-lg leading-relaxed text-muted-foreground md:col-span-6">
                {person.body}
              </p>
            </article>
          ))}
      </div>
    </section>
  );
}
