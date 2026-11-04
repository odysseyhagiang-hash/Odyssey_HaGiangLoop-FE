import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from 'lucide-react';
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

interface Placed {
  item: GalleryItem;
  /** CSS grid-column / grid-row values for the 3-column desktop grid */
  col: number;
  row: string;
}

/**
 * Packs photos into gap-free blocks of 3 columns × 2 rows.
 * Each block column holds either one tall (portrait) photo or two stacked
 * square photos. The number of photos shown tall is chosen so the total cell
 * count is an exact multiple of 6, then photos are poured into columns in
 * order — a square always completes a half-filled column before a new column
 * opens — so every block, including the last one, is completely filled.
 */
function packGallery(items: GalleryItem[]): Placed[] {
  const n = items.length;
  const portraits = items.filter((i) => i.span === 'tall').length;
  let tallCount = -1;
  for (let t = portraits; t >= 0; t--) {
    if ((n + t) % 6 === 0) { tallCount = t; break; }
  }
  // Fallback (too few portraits to square the grid): keep natural shapes.
  if (tallCount < 0) tallCount = portraits;

  let tallLeft = tallCount;
  let nextCol = 0; // index of the next empty column (block-major)
  let halfCol = -1; // column with one square already placed, waiting for a second
  const place = (colIndex: number, top: number, span: number) => ({
    col: (colIndex % 3) + 1,
    row: `${Math.floor(colIndex / 3) * 2 + top} / span ${span}`
  });

  return items.map((item) => {
    if (item.span === 'tall' && tallLeft > 0) {
      tallLeft--;
      return { item, ...place(nextCol++, 1, 2) };
    }
    if (halfCol >= 0) {
      const c = halfCol;
      halfCol = -1;
      return { item, ...place(c, 2, 1) };
    }
    halfCol = nextCol++;
    return { item, ...place(halfCol, 1, 1) };
  });
}

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

  const packed = useMemo(() => packGallery(visible), [visible]);

  const activeIndex = visible.findIndex((item) => item.id === active?.id);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeIndex > 0) {
      setActive(visible[activeIndex - 1]);
    } else {
      setActive(visible[visible.length - 1]);
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeIndex < visible.length - 1) {
      setActive(visible[activeIndex + 1]);
    } else {
      setActive(visible[0]);
    }
  };

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null);
      if (event.key === 'ArrowLeft') {
        const idx = visible.findIndex((item) => item.id === active.id);
        if (idx > 0) {
          setActive(visible[idx - 1]);
        } else {
          setActive(visible[visible.length - 1]);
        }
      }
      if (event.key === 'ArrowRight') {
        const idx = visible.findIndex((item) => item.id === active.id);
        if (idx < visible.length - 1) {
          setActive(visible[idx + 1]);
        } else {
          setActive(visible[0]);
        }
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active, visible]);

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
            className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:auto-rows-[260px]">
            {packed.map(({ item, col, row }) =>
              <motion.figure
                key={item.id}
                variants={staggerItem}
                style={{ '--gc': col, '--gr': row } as React.CSSProperties}
                className="group relative aspect-[4/3] overflow-hidden rounded-4xl sm:aspect-auto sm:[grid-column:var(--gc)] sm:[grid-row:var(--gr)]">

                <button
                  type="button"
                  onClick={() => setActive(item)}
                  className="block h-full w-full text-left"
                  aria-label={`Open photograph`}>

                  <LazyImage
                    src={item.src}
                    alt={item.alt}
                    wrapperClassName="h-full w-full"
                    className="transition-transform duration-[1600ms] ease-editorial group-hover:scale-105"
                    sizes="(min-width: 640px) 33vw, 100vw" />
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
            aria-label={active.caption || active.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-forest-900/95 p-5 sm:p-10"
            onClick={() => setActive(null)}>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close photograph"
              className="absolute right-5 top-5 z-[70] grid h-12 w-12 place-items-center rounded-full border border-white/25 text-white transition-colors hover:border-gold-300 hover:text-gold-300">

              <XIcon className="h-5 w-5" />
            </button>

            {/* Prev Button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous photograph"
              className="absolute left-4 sm:left-10 z-[70] grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white transition-all hover:bg-white/10 hover:border-white/40 hover:scale-105 active:scale-95">

              <ChevronLeftIcon className="h-6 w-6" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next photograph"
              className="absolute right-4 sm:right-10 z-[70] grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white transition-all hover:bg-white/10 hover:border-white/40 hover:scale-105 active:scale-95">

              <ChevronRightIcon className="h-6 w-6" />
            </button>

            <motion.figure
              key={active.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-full w-full max-w-4xl px-12"
              onClick={(event) => event.stopPropagation()}>

              <img
                src={active.src}
                alt={active.alt}
                className="max-h-[78vh] w-full rounded-4xl object-contain mx-auto" />
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