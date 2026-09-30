import { destinations } from '../../lib/data';
import { DestinationCard } from '../cards/DestinationCard';
import { Button } from '../ui/Button';
import { Stagger } from '../ui/Reveal';
import { Container, Section, SectionHeading } from '../ui/Section';

export function FeaturedDestinations() {
  const featured = destinations.slice(0, 3);

  return (
    <Section
      tone="canvas"
      aria-labelledby="destinations-title"
      style={{
        backgroundImage: "url('/backgrounds_section/87892495-47db-4d2c-aa37-03b9c37e975c.webp')",
        backgroundSize: '100% auto',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
      }}>
      <Container>
        <SectionHeading
          id="destinations-title"
          eyebrow="Featured destinations"
          title={
            <>
              Six places we return to, <span className="italic text-forest-500">season after season</span>
            </>
          }
          description="The plateau is small enough to cross in two days and deep enough to spend a decade in. These are the corners we build every itinerary around."
          action={
            <Button to="/destinations" variant="outline">
              All destinations
            </Button>
          } />


        <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((destination, index) =>
            <DestinationCard
              key={destination.slug}
              destination={destination}
              className={index === 0 ? 'md:min-h-[520px]' : undefined} />

          )}
        </Stagger>
      </Container>
    </Section>);

}