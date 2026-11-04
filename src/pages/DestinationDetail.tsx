import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CalendarIcon, MapPinIcon, MountainSnowIcon } from 'lucide-react';
import { useSeo } from '../hooks/useSeo';
import { destinations } from '../lib/data';
import { PageHero } from '../components/layout/PageHero';
import { DestinationCard } from '../components/cards/DestinationCard';
import { Reveal, Stagger } from '../components/ui/Reveal';
import { Container, Section, SectionHeading } from '../components/ui/Section';
import { NotFound } from './NotFound';

export function DestinationDetail() {
  const { slug } = useParams<{ slug: string; }>();
  const destination = destinations.find((item) => item.slug === slug);

  // Scroll to top when slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  useSeo({
    title: destination ? destination.name : 'Destination not found',
    description: destination ? destination.description : 'This destination could not be found.',
    image: destination?.image,
    type: 'article'
  });

  if (!destination) return <NotFound />;

  const others = destinations.filter((item) => item.slug !== destination.slug).slice(0, 3);

  const facts = [
    { icon: MapPinIcon, label: 'Region', value: destination.region },
    { icon: MountainSnowIcon, label: 'Elevation', value: destination.elevation },
    { icon: CalendarIcon, label: 'Best season', value: destination.bestSeason }];


  return (
    <main id="main" key={slug} className="w-full bg-canvas">
      <PageHero
        eyebrow={destination.region}
        title={destination.name}
        description={destination.blurb}
        image={destination.image}
        imageAlt={`${destination.name}, ${destination.region}`} />


      <Section tone="canvas">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
            <Reveal>
              <h2 className="font-display text-[1.75rem] leading-snug sm:text-[2.25rem]">
                Why we come here
              </h2>
              <p className="mt-6 text-[15px] leading-[1.85] text-ink-soft">{destination.description}</p>

              <h3 className="mt-12 font-display text-xl">What you can do</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {destination.experiences.map((experience) =>
                  <li
                    key={experience}
                    className="rounded-3xl border border-ink/[0.08] bg-white px-5 py-4 text-sm text-ink-soft">

                    {experience}
                  </li>
                )}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="divide-y divide-ink/8 rounded-4xl bg-parchment p-8">
                {facts.map((fact) =>
                  <div key={fact.label} className="flex items-start gap-4 py-5 first:pt-0 last:pb-0">
                    <fact.icon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-forest-500" />
                    <div>
                      <dt className="text-[10px] uppercase tracking-widest2 text-ink-muted">
                        {fact.label}
                      </dt>
                      <dd className="mt-1 text-sm font-medium">{fact.value}</dd>
                    </div>
                  </div>
                )}
              </dl>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="parchment">
        <Container>
          <SectionHeading eyebrow="Nearby" title="Other places on the plateau" />
          <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {others.map((item) =>
              <DestinationCard key={item.slug} destination={item} />
            )}
          </Stagger>
        </Container>
      </Section>

    </main>);

}