import { faqs } from '../../lib/data';
import { Accordion } from '../ui/Accordion';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { Container, Section } from '../ui/Section';

export function FaqSection() {
  const preview = faqs.slice(0, 5);

  return (
    <Section tone="parchment" aria-labelledby="faq-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <p className="text-[11px] uppercase tracking-widest2 text-forest-500">Good to know</p>
            <h2 id="faq-title" className="mt-5 font-display text-[2rem] leading-[1.12] sm:text-[2.6rem]">
              Questions we are asked before every departure
            </h2>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-ink-soft">
              If yours is not here, write to us and a real person answers, usually within a few hours.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/faq" variant="outline">
                Read all answers
              </Button>
              <Button to="/contact" variant="ghost">
                Ask us directly
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Accordion items={preview} defaultOpenId={preview[0]?.id} />
          </Reveal>
        </div>
      </Container>
    </Section>);

}