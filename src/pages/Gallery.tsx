import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { useSeo } from '../hooks/useSeo';
import { gallery, images } from '../lib/data';
import type { GalleryItem } from '../lib/types';
import { cn } from '../lib/utils';
import { PageHero } from '../components/layout/PageHero';
import { LazyImage } from '../components/ui/LazyImage';
import { Stagger, staggerItem } from '../components/ui/Reveal';
import { Container, Section } from '../components/ui/Section';
import { CtaBanner } from '../components/sections/CtaBanner';

const categories: (GalleryItem['category'] | 'All')[] = ['All', 'Landscape', 'Culture', 'Stays', 'Road'];

const spans: Record<GalleryItem['span'], string> = {
  wide: 'aspect-[4/3] sm:col-span-2 sm:row-span-1 sm:aspect-auto',
  tall: 'aspect-[4/3] sm:col-span-1 sm:row-span-2 sm:aspect-auto',
  square: 'aspect-[4/3] sm:col-span-1 sm:row-span-1 sm:aspect-auto'
};

export function Gallery() {
  useSeo({
    title: 'Gallery',
    description:
      'Photographs from recent departures across the Ha Giang plateau — landscapes, highland culture, our stays and the roads between them.',
    image: images.pass
  });

  const [category, setCategory] = useState<(typeof categories)[number]>('All');
  const [active, setActive] = useState<GalleryItem | null>(null);

  const visible = useMemo(
    () => category === 'All' ? gallery : gallery.filter((item) => item.category === category),
    [category]
  );

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active]);

  return (
    <main id="main" className="w-full bg-canvas">
      <PageHero
        eyebrow="Gallery"
        title="The plateau, as we found it"
        description="Photographed by our guides and travellers between October and June. Nothing borrowed, nothing staged."
        image={images.pass}
        imageAlt="Sea of clouds rolling over a mountain pass at sunrise" />


      <Section tone="canvas">
        <Container>
          <div role="group" aria-label="Filter photographs" className="flex flex-wrap gap-2">
            {categories.map((item) =>
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
                className={cn(
                  'rounded-full border px-5 py-2.5 text-[13px] font-medium transition-all duration-500 ease-editorial',
                  category === item ?
                    'border-forest-500 bg-forest-500 text-white' :
                    'border-ink/12 text-ink-soft hover:border-forest-500/40 hover:text-ink'
                )}>

                {item}
              </button>
            )}
          </div>

          <Stagger
            key={category}
            className={cn(
              'mt-12 grid grid-cols-1 sm:grid-cols-3',
              category === 'All' ? 'gap-4 sm:auto-rows-[260px]' : 'gap-6'
            )}>
            {visible.map((item) =>
              <motion.figure
                key={item.id}
                variants={staggerItem}
                className={cn(
                  'group relative overflow-hidden rounded-4xl',
                  category === 'All' ? spans[item.span] : 'aspect-[4/3] w-full'
                )}>

                <button
                  type="button"
                  onClick={() => setActive(item)}
                  className="block h-full w-full text-left"
                  aria-label={`Open photograph: ${item.caption}`}>

                  <LazyImage
                    src={item.src}
                    alt={item.alt}
                    wrapperClassName="h-full w-full"
                    className="transition-transform duration-[1600ms] ease-editorial group-hover:scale-105"
                    sizes="(min-width: 640px) 33vw, 100vw" />

                  <figcaption className="absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-forest-900/85 to-transparent p-5 text-sm text-white opacity-0 transition-all duration-500 ease-editorial group-hover:translate-y-0 group-hover:opacity-100">
                    {item.caption}
                  </figcaption>
                </button>
              </motion.figure>
            )}
          </Stagger>
        </Container>
      </Section>

      <AnimatePresence>
        {active &&
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={active.caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-forest-900/95 p-5 sm:p-10"
            onClick={() => setActive(null)}>

            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close photograph"
              className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full border border-white/25 text-white transition-colors hover:border-gold-300 hover:text-gold-300">

              <XIcon className="h-5 w-5" />
            </button>
            <motion.figure
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-full w-full max-w-4xl"
              onClick={(event) => event.stopPropagation()}>

              <img
                src={active.src}
                alt={active.alt}
                className="max-h-[78vh] w-full rounded-4xl object-contain" />

              <figcaption className="mt-5 text-center text-sm text-white/70">
                {active.caption} · {active.category}
              </figcaption>
            </motion.figure>
          </motion.div>
        }
      </AnimatePresence>

      <CtaBanner
        eyebrow="Your own frames"
        title="Every traveller leaves with an edited gallery"
        description="Your guide photographs the journey as it happens and sends a curated, edited set within ten days of your return. No watermarks, no upsell." />

    </main>);

}