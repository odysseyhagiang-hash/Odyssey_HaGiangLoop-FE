import { useSeo } from '../hooks/useSeo';
import { destinations, images } from '../lib/data';
import { PageHero } from '../components/layout/PageHero';
import { DestinationCard } from '../components/cards/DestinationCard';
import { CtaBanner } from '../components/sections/CtaBanner';
import { Stagger } from '../components/ui/Reveal';
import { Container, Section, SectionHeading } from '../components/ui/Section';

export function Destinations() {
  useSeo({
    title: 'Destinations',
    description:
      'Fourteen places we return to across the Ha Giang plateau, including the Nho Que river, Ma Pi Leng pass, Lung Cu flag tower, and historic villages.',
    image: images.canyon
  });

  return (
    <main id="main" className="w-full bg-canvas">
      <PageHero
        eyebrow="Where we go"
        title="The plateau, place by place"
        description="A geopark the size of a small country, and fourteen corners of it we know well enough to time to the hour."
        image={images.canyon}
        imageAlt="Emerald river canyon between vertical limestone cliffs in northern Vietnam" />


      <Section tone="canvas">
        <Container>
          <SectionHeading
            eyebrow="Fourteen destinations"
            title={
              <>
                Each one earns its place on an <span className="italic text-forest-500">itinerary</span>
              </>
            }
            description="We visit every stay and every stop before each season. If somewhere stops being worth the detour, it comes off the route." />

          <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) =>
              <DestinationCard key={destination.slug} destination={destination} />
            )}
          </Stagger>
        </Container>
      </Section>

      <CtaBanner
        eyebrow="Build your route"
        title="Choose the places, we will connect them"
        description="Send us the three or four destinations you care most about and we will draft a route that links them without a single wasted hour on the road." />

    </main>);

}