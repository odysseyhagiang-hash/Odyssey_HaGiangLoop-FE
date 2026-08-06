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
  const preview = gallery.slice(0, 6);

  return (
    <Section
      tone="transparent"
      aria-labelledby="gallery-title"
      style={{
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


        <Stagger className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:auto-rows-[minmax(0,1fr)]">
          {preview.map((item) =>
            <motion.figure
              key={item.id}
              variants={staggerItem}
              className={`group relative overflow-hidden rounded-4xl ${spans[item.span]}`}>

              <LazyImage
                src={item.src}
                alt={item.alt}
                wrapperClassName="h-full w-full"
                className="transition-transform duration-[1600ms] ease-editorial group-hover:scale-105"
                sizes="(min-width: 640px) 33vw, 100vw" />

              <figcaption className="absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-forest-900/85 to-transparent p-5 text-sm text-white opacity-0 transition-all duration-500 ease-editorial group-hover:translate-y-0 group-hover:opacity-100">
                {item.caption}
              </figcaption>
            </motion.figure>
          )}
        </Stagger>
      </Container>
    </Section>);

}