import { useMemo, useState } from 'react';
import { useSeo } from '../hooks/useSeo';
import { images, tours } from '../lib/data';
import type { Tour } from '../lib/types';
import { cn } from '../lib/utils';
import { PageHero } from '../components/layout/PageHero';
import { TourCard } from '../components/cards/TourCard';
import { CtaBanner } from '../components/sections/CtaBanner';
import { Stagger } from '../components/ui/Reveal';
import { Container, Section } from '../components/ui/Section';

const styles: (Tour['style'] | 'All')[] = ['All', 'Private', 'Group', 'Car'];

export function Tours() {
  useSeo({
    title: 'Journeys',
    description:
      'Four guided tour types across the Ha Giang Loop: Private Tour, Group Tour, and Car Tour.',
    image: images.tourClassic
  });

  const [filter, setFilter] = useState<(typeof styles)[number]>('All');
  const visible = useMemo(
    () => filter === 'All' ? tours : tours.filter((tour) => tour.style === filter),
    [filter]
  );

  return (
    <main id="main" className="w-full bg-canvas">
      <PageHero
        eyebrow="Our journeys"
        title="Three ways to cross the plateau"
        description="Every itinerary shares the same guides, the same fleet and the same refusal to hurry. What changes is the pace, the privacy and the rooms you sleep in."
        image={images.tourClassic}
        imageAlt="A rider on a narrow cliffside road above a river canyon in northern Vietnam" />


      <Section tone="canvas">
        <Container>
          <div
            role="group"
            aria-label="Filter journeys by style"
            className="flex flex-wrap gap-2 border-b border-ink/10 pb-8">

            {styles.map((style) =>
              <button
                key={style}
                type="button"
                onClick={() => setFilter(style)}
                aria-pressed={filter === style}
                className={cn(
                  'rounded-full border px-5 py-2.5 text-[13px] font-medium transition-all duration-500 ease-editorial',
                  filter === style ?
                    'border-forest-500 bg-forest-500 text-white' :
                    'border-ink/12 text-ink-soft hover:border-forest-500/40 hover:text-ink'
                )}>

                {style}
              </button>
            )}
          </div>

          <p className="mt-8 text-sm text-ink-muted" role="status">
            Showing {visible.length} {visible.length === 1 ? 'journey' : 'journeys'}
          </p>

          <Stagger key={filter} className="mt-8 grid gap-8 lg:grid-cols-2">
            {visible.map((tour) =>
              <TourCard key={tour.slug} tour={tour} />
            )}
          </Stagger>

          {visible.length === 0 &&
            <p className="mt-16 rounded-4xl border border-dashed border-ink/15 p-12 text-center text-sm text-ink-soft">
              No journeys in this style right now. Try another filter, or ask us to build one.
            </p>
          }
        </Container>
      </Section>

      <CtaBanner
        eyebrow="Not quite right?"
        title="We build private routes from scratch"
        description="Tell us how long you have, how far you want to ride and what you would rather skip. We will draft an itinerary within three days." />

    </main>);

}