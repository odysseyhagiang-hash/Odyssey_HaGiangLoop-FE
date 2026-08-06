import { useSeo } from '../hooks/useSeo';
import { faqs, images } from '../lib/data';
import type { FaqItem } from '../lib/types';
import { PageHero } from '../components/layout/PageHero';
import { Accordion } from '../components/ui/Accordion';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { Container, Section } from '../components/ui/Section';

const groups: { id: string; label: FaqItem['category']; blurb: string; }[] = [
  { id: 'planning', label: 'Planning', blurb: 'Before you commit to dates' },
  { id: 'on-the-road', label: 'On the road', blurb: 'What the days are actually like' },
  { id: 'booking', label: 'Booking', blurb: 'Deposits, changes and logistics' }];


export function Faq() {
  useSeo({
    title: 'FAQ',
    description:
      'Everything travellers ask before a Ha Giang journey — riding experience, seasons, accommodation, dietary needs, deposits and transport from Hanoi.',
    image: images.tourPhoto
  });

  return (
    <main id="main" className="w-full bg-canvas">
      <PageHero
        eyebrow="Good to know"
        title="Questions, answered plainly"
        description="No small print games. If something here is unclear, a guide will answer you directly — usually the same day."
        image={images.tourPhoto}
        imageAlt="Photographer standing on a rocky overlook above a river gorge" />


      <Section tone="canvas">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.62fr_1.38fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <nav aria-label="FAQ sections" className="space-y-2">
                  {groups.map((group) =>
                    <a
                      key={group.id}
                      href={`#${group.id}`}
                      className="block rounded-3xl border border-ink/[0.08] bg-white px-6 py-5 transition-all duration-500 ease-editorial hover:-translate-y-0.5 hover:border-forest-500/40 hover:shadow-soft">

                      <span className="font-display text-lg">{group.label}</span>
                      <span className="mt-1 block text-xs text-ink-muted">{group.blurb}</span>
                    </a>
                  )}
                </nav>

                <div className="mt-8 rounded-4xl bg-forest-900 p-8 text-white">
                  <h2 className="font-display text-xl">Still unsure?</h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">
                    Fifteen minutes on a call usually settles more than an hour of reading.
                  </p>
                  <Button to="/contact" variant="gold" size="sm" className="mt-6">
                    Book a call
                  </Button>
                </div>
              </Reveal>
            </div>

            <div className="space-y-16">
              {groups.map((group) => {
                const items = faqs.filter((faq) => faq.category === group.label);
                return (
                  <section key={group.id} id={group.id} aria-labelledby={`${group.id}-title`}>
                    <Reveal>
                      <h2
                        id={`${group.id}-title`}
                        className="font-display text-[1.75rem] leading-snug sm:text-[2.15rem]">

                        {group.label}
                      </h2>
                    </Reveal>
                    <Reveal delay={0.06}>
                      <Accordion className="mt-7" items={items} defaultOpenId={items[0]?.id} />
                    </Reveal>
                  </section>);

              })}
            </div>
          </div>
        </Container>
      </Section>
    </main>);

}