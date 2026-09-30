import { motion } from 'framer-motion';
import { gallery } from '../../lib/data';
import { LazyImage } from '../ui/LazyImage';
import { Button } from '../ui/Button';
import { Stagger, staggerItem } from '../ui/Reveal';
import { Container, Section, SectionHeading } from '../ui/Section';

const spans: Record<string, string> = {
  wide: 'sm:col-span-2 aspect-[16/10]',
  tall: 'sm:row-span-2 aspect-[3/4] sm:aspect-auto',
  square: 'aspect-square'
};

export function GalleryPreview() {
  const preview = gallery.slice(0, 8);

  return (
    <Section
      tone="transparent"
      aria-labelledby="gallery-title"
      style={{
        backgroundColor: '#fefdf7',
        backgroundImage: "url('/backgrounds_section/background-GalleryPreview.webp')",
        backgroundSize: 'auto 100%',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container>
        <SectionHeading
          id="gallery-title"
          eyebrow="Gallery"
          title={
            <>
              Frames from the <span className="italic text-forest-500">last season</span>
            </>
          }
          description="Photographed by our guides and travellers on recent departures. No stock imagery, no borrowed skies."
          action={
            <Button to="/gallery" variant="outline">
              Open the gallery
            </Button>
          } />


        <Stagger className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {preview.map((item, index) => {
            let gridClass = '';
            if (index === 0) gridClass = 'sm:col-start-1 sm:row-start-1';
            else if (index === 1) gridClass = 'sm:col-start-3 sm:row-start-1';
            else if (index === 2) gridClass = 'sm:col-start-1 sm:row-start-2';
            else if (index === 3) gridClass = 'sm:col-start-2 sm:row-start-2';
            else if (index === 4) gridClass = 'sm:col-start-1 sm:row-start-3';
            else if (index === 5) gridClass = 'sm:col-start-2 sm:row-start-3';
            else if (index === 6) gridClass = 'sm:col-start-1 sm:row-start-4';
            else if (index === 7) gridClass = 'sm:col-start-2 sm:row-start-4';
            return (
              <motion.figure
                key={item.id}
                variants={staggerItem}
                className={`group relative overflow-hidden rounded-4xl ${spans[item.span]} ${gridClass}`}>

                <LazyImage
                  src={item.src}
                  alt={item.alt}
                  wrapperClassName="h-full w-full"
                  className="transition-transform duration-[1600ms] ease-editorial group-hover:scale-105"
                  sizes="(min-width: 640px) 33vw, 100vw" />
              </motion.figure>
            );
          })}
        </Stagger>
      </Container>
    </Section>);

}