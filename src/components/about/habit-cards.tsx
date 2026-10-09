import { Reveal } from '@/components/motion';
import { TiltCard } from '@/components/ui/tilt-card';

const values = [
  {
    title: 'Show up.',
    body: 'A first call that gets answered, a walkthrough that happens when we said, and a crew that arrives ready to work.',
  },
  {
    title: 'Say it plainly.',
    body: 'Clear scopes, straightforward pricing conversations and honest advice, including when the answer is to repair rather than replace.',
  },
  {
    title: 'Finish properly.',
    body: 'Grout lines, trim joints, cleanup. The details people notice last are the ones we check first.',
  },
];

export function HabitCards() {
  return (
    <section
      aria-labelledby="values-heading"
      className="border-y border-border bg-surface py-20 md:py-28"
    >
      <div className="gutter mx-auto max-w-[120rem]">
        <Reveal>
          <p className="eyebrow text-accent-ink">How we work</p>
          <h2 id="values-heading" className="font-display t-lg mt-4">
            Three habits we hold onto.
          </h2>
        </Reveal>
        <ol className="mt-14 grid gap-5 md:grid-cols-3 md:gap-6">
          {values.map((value, index) => (
            <li key={value.title} className="min-h-full">
              <TiltCard className="h-full p-8 md:p-10">
                <span className="font-display text-6xl text-accent-ink">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display mt-12 text-4xl md:text-5xl">{value.title}</h3>
                <p className="mt-4 max-w-[32ch] text-lg leading-relaxed text-muted-foreground">
                  {value.body}
                </p>
              </TiltCard>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
