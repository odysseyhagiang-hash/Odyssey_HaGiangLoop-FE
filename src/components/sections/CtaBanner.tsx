import { images } from '../../lib/data';
import { LazyImage } from '../ui/LazyImage';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { Container, Section } from '../ui/Section';

interface CtaBannerProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  image?: string;
}

export function CtaBanner({
  eyebrow = 'Departures open',
  title = 'The next good window is October',
  description = 'Clear skies, cloud seas in the valleys and the last of the harvest still standing in the west. Six group departures remain, and private dates are open all season.',
  image = images.pass
}: CtaBannerProps) {
  return (
    <Section
      tone="transparent"
      className="relative isolate overflow-hidden py-24 md:py-32 lg:py-40"
      aria-labelledby="cta-title"
    >
      {/* Background image full */}
      <LazyImage
        src={image}
        alt="Sea of clouds rolling over a mountain pass at sunrise"
        wrapperClassName="absolute inset-0 -z-20 h-full w-full"
        className="object-cover"
        sizes="100vw"
      />

      {/* Overlay gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-900/95 via-forest-900/75 to-forest-900/40"
      />

      {/* Content */}
      <Container>
        <Reveal className="max-w-2xl">
          <p className="text-[11px] uppercase tracking-widest2 text-gold-300">{eyebrow}</p>
          <h2 id="cta-title" className="mt-5 font-display text-[2.2rem] leading-[1.08] text-white sm:text-[3rem] lg:text-[3.5rem]">
            {title}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-[17px]">{description}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button to="/booking" variant="gold" size="lg">
              Check availability
            </Button>
            <Button to="/contact" variant="glass" size="lg">
              Talk to a guide
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}