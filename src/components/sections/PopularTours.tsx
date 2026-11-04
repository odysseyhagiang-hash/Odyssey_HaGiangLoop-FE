import { tours } from '../../lib/data';
import { TourCard } from '../cards/TourCard';
import { Button } from '../ui/Button';
import { Stagger } from '../ui/Reveal';
import { Container, Section, SectionHeading } from '../ui/Section';

export function PopularTours() {
  return (
    <Section
      id="popular-tours"
      aria-labelledby="popular-tours-title"
      tone="transparent"
      className="
        relative 
        overflow-hidden
        bg-cover 
        bg-center
        bg-no-repeat
        before:absolute
        before:inset-0
        before:bg-white/50
        before:backdrop-blur-[2px]
      "
      style={{
        backgroundImage: "url('/backgrounds_section/background-PopularTours.webp')",
        backgroundSize: 'auto 100%',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container className="relative z-10">
        <SectionHeading
          id="popular-tours-title"
          eyebrow="Our tours"
          title={
            <>
              Curated ways to explore the{" "}
              <span className="italic text-forest-500">
                Ha Giang Loop & Northern Highlands
              </span>
            </>
          }
          description="Whether you prefer a private guide, a group adventure, an open-top Jeep, a comfortable car, or an extended grand loop to Cao Bang, there's a perfect journey for every traveller."
          action={
            <Button to="/journeys" variant="outline">
              All journeys
            </Button>
          }
        />

        <Stagger className="mt-14 grid gap-8 lg:grid-cols-2">
          {tours.map((tour) => (
            <TourCard
              key={tour.slug}
              tour={tour}
            />
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}