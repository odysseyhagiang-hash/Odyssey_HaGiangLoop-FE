import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRightIcon,
  BedDoubleIcon,
  BikeIcon,
  CalendarDaysIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  InfoIcon,
  LandmarkIcon,
  LeafIcon,
  MapIcon,
  MoonIcon,
  MountainIcon,
  RouteIcon,
  StarIcon,
  UsersIcon,
  WaypointsIcon,
  XIcon,
} from 'lucide-react';
import { useSeo } from '../hooks/useSeo';
import { luxuryContent, luxuryHeroImage, luxuryOptions } from '../lib/luxuryTour';
import { tours } from '../lib/data';
import { apiGetPosts } from '../lib/api';
import type { BlogPost, Tour } from '../lib/types';
import { blogFallbackImage } from '../lib/utils';
import { getMinPrice } from '../lib/tourPrice';
import type { LuxuryDay, LuxuryOption } from '../lib/luxuryTour';
import { cn } from '../lib/utils';
import { LazyImage } from '../components/ui/LazyImage';
import { Reveal } from '../components/ui/Reveal';
import { Container } from '../components/ui/Section';
import { Parallax, RippleText } from '../components/luxury/effects';
import { setLenisPaused, useLenis } from '../components/luxury/lenis';

/*
 * Layout modelled on the reference product page:
 *   banner (title · breadcrumb · glass highlights box · price + CTA)
 *   → sticky tour nav → tour overview (info pills + 2 photo marquees)
 *   → itinerary (day tabs · photo slider left / info boxes right)
 *   → pricing & inclusion (white cards on a warm band).
 * Colours only use theme tokens (forest-*, gold-*, ink-*) so the page follows
 * the green or blue palette of whichever branch it ships on.
 */

const BOOK_LINK = '/contact?topic=book-luxury-tour';

const NAV = [
  { id: 'tour-overview', label: 'Tour overview' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'itinerary', label: 'Luxury tour itinerary' },
  { id: 'pricing', label: 'Pricing' },
];

const allPhotos = luxuryOptions[1].days.flatMap((d) => d.gallery);

/** H'Mong brocade inspired tile used as a mask, so it can be painted in any theme colour. */
const BROCADE_MASK: React.CSSProperties = {
  maskImage: 'url(/luxury/decor/hmong-pattern.svg)',
  WebkitMaskImage: 'url(/luxury/decor/hmong-pattern.svg)',
  maskSize: '150px 150px',
  WebkitMaskSize: '150px 150px',
  maskRepeat: 'repeat',
  WebkitMaskRepeat: 'repeat',
  maskPosition: 'center',
  WebkitMaskPosition: 'center',
};
/** Keeps the pattern on the edges and clears the middle where the content sits. */
const TOPO_EDGE_FADE: React.CSSProperties = {
  maskImage: 'radial-gradient(ellipse at center, transparent 38%, black 82%)',
  WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 38%, black 82%)',
};

/** Icon per highlight card, in the same order as luxuryContent.highlights. */
const HIGHLIGHT_ICONS = [MountainIcon, RouteIcon, LandmarkIcon, LeafIcon, BikeIcon, UsersIcon, StarIcon, WaypointsIcon];

/** Background photo per highlight card (picked to match each theme). */
const HIGHLIGHT_IMAGES = [
  '/luxury/day-4/07.webp', // private & flexible — bungalows among the peaks
  '/luxury/day-4/04.webp', // unique routes — valley from above
  '/luxury/day-2/01.webp', // local culture — wooden homestay under the mountains
  '/luxury/day-3/06.webp', // luxury relaxation — infinity pool facing the hills
  '/luxury/day-4/03.webp', // motorbikes — winding paths across the slope
  '/luxury/day-3/07.webp', // dedicated team — restaurant & service
  '/luxury/day-1/05.webp', // exclusive experiences — rooftop pool at night
  '/luxury/day-4/12.webp', // at ease — window seat over the valley
];
const marqueeLeft = allPhotos.filter((_, i) => i % 2 === 0);
const marqueeRight = allPhotos.filter((_, i) => i % 2 === 1);

function formatVND(amount: number): string {
  return amount.toLocaleString('vi-VN') + ' VND';
}

const minPrice = Math.min(...luxuryOptions.flatMap((o) => o.prices.map((p) => p.price)));

// ─── Shared bits ──────────────────────────────────────────────────────────────

function CtaButton({
  to,
  children,
  tone = 'gold',
  className,
}: {
  to: string;
  children: ReactNode;
  tone?: 'gold' | 'forest' | 'outline';
  className?: string;
}) {
  const isHash = to.startsWith('#');
  const cls = cn(
    'group inline-flex h-12 items-center gap-3 rounded-full pl-6 pr-2 text-[13px] font-bold uppercase tracking-wide transition-colors duration-300',
    tone === 'gold' && 'bg-gold-400 text-forest-900 hover:bg-gold-300',
    tone === 'forest' && 'bg-forest-700 text-white hover:bg-forest-800',
    tone === 'outline' && 'bg-white text-forest-800 shadow-soft hover:bg-gold-50',
    className
  );
  const inner = (
    <>
      <span>{children}</span>
      <span
        className={cn(
          'grid h-8 w-8 place-items-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5',
          tone === 'gold' ? 'bg-forest-900/10' : tone === 'forest' ? 'bg-white/15' : 'bg-forest-800 text-white'
        )}
      >
        <ArrowRightIcon aria-hidden="true" className="h-4 w-4" />
      </span>
    </>
  );
  return isHash ? <a href={to} className={cls}>{inner}</a> : <Link to={to} className={cls}>{inner}</Link>;
}

/** Section heading with the reference "ripple" reveal (chars rise out of a mask). */
function Heading0({ text, id, center = false, className }: { text: string; id?: string; center?: boolean; className?: string }) {
  return (
    <RippleText
      as="h2"
      id={id}
      text={text}
      from={center ? 'center' : 'first'}
      className={cn(
        'font-display text-[2.2rem] font-bold uppercase leading-[1.05] text-forest-800 sm:text-[2.8rem] lg:text-[3.2rem]',
        center && 'text-center',
        className
      )}
    />
  );
}

// ─── Lightbox ────────────────────────────────────────────────────────────────

function Lightbox({
  images,
  index,
  onClose,
  onIndex,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const prev = useCallback(() => onIndex((index - 1 + images.length) % images.length), [index, images.length, onIndex]);
  const next = useCallback(() => onIndex((index + 1) % images.length), [index, images.length, onIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setLenisPaused(true);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      setLenisPaused(false);
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, prev, next]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-forest-900/95 p-4"
      onClick={onClose}
    >
      <button type="button" aria-label="Close" onClick={onClose} className="absolute right-4 top-4 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20">
        <XIcon className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Previous photo"
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-2 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 sm:left-6"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      <img
        key={images[index]}
        src={images[index]}
        alt={`Photo ${index + 1} of ${images.length}`}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] max-w-full rounded-2xl object-contain"
      />
      <button
        type="button"
        aria-label="Next photo"
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-2 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 sm:right-6"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>
      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs tracking-widest text-white/70">
        {index + 1} / {images.length}
      </p>
    </motion.div>
  );
}

// ─── Photo slider (itinerary left column) ─────────────────────────────────────

function PhotoSlider({ images, onOpen }: { images: string[]; onOpen: (i: number) => void }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || images.length < 2) return;
    const t = window.setInterval(() => setIdx((i) => (i + 1) % images.length), 4000);
    return () => window.clearInterval(t);
  }, [paused, images.length]);

  const go = (d: number) => setIdx((i) => (i + d + images.length) % images.length);

  return (
    <div
      className="relative overflow-hidden rounded-[18px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[3/5] sm:aspect-[4/3] lg:aspect-[516/480]">
        {/* reference: data-parallax + data-img-clip on the itinerary thumbs */}
        <Parallax clip className="absolute inset-0">
          <AnimatePresence initial={false}>
            <motion.button
              key={images[idx]}
              type="button"
              aria-label={`Open photo ${idx + 1}`}
              onClick={() => onOpen(idx)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <img src={images[idx]} alt="" className="h-full w-full object-cover" />
            </motion.button>
          </AnimatePresence>
        </Parallax>
      </div>
      <div className="pointer-events-none absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between">
        <button
          type="button"
          aria-label="Previous photo"
          onClick={() => go(-1)}
          className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full bg-white/85 text-forest-800 shadow-soft transition-colors hover:bg-gold-400"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next photo"
          onClick={() => go(1)}
          className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full bg-white/85 text-forest-800 shadow-soft transition-colors hover:bg-gold-400"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {images.map((src, i) => (
          <span key={src} className={cn('h-1.5 rounded-full transition-all duration-300', i === idx ? 'w-5 bg-white' : 'w-1.5 bg-white/50')} />
        ))}
      </div>
    </div>
  );
}

// ─── Luxury car (rides along the day tabs) ───────────────────────────────────

function LuxuryCar() {
  return (
    <svg viewBox="0 0 120 54" aria-hidden="true" className="block h-auto w-full drop-shadow-[0_4px_6px_rgba(0,0,0,0.18)]">
      {/* cabin */}
      <path d="M24 26 L36 9 Q38 6 42 6 L84 6 Q89 6 92 9 L106 26 Z" className="fill-gold-500" />
      {/* tinted windows */}
      <path d="M31 25 L40 11 Q41 10 43 10 L55 10 L55 25 Z" className="fill-forest-900/85" />
      <path d="M59 10 L74 10 L74 25 L59 25 Z" className="fill-forest-900/85" />
      <path d="M78 10 L85 10 Q88 10 90 12 L100 25 L78 25 Z" className="fill-forest-900/85" />
      <path d="M43 12 L47 12 L41 23 L37 23 Z" className="fill-white/25" />
      {/* roof rails */}
      <rect x="44" y="3" width="38" height="2.4" rx="1.2" className="fill-forest-900/70" />
      {/* body */}
      <path d="M8 27 Q8 24 12 24 L104 24 Q112 24 114 30 L115 38 Q115 42 111 42 L9 42 Q6 42 6 39 L6 31 Q6 27 8 27 Z" className="fill-gold-400" />
      {/* lower trim + chrome line */}
      <path d="M6 37 L115 37 L115 39 Q115 42 111 42 L9 42 Q6 42 6 39 Z" className="fill-gold-600" />
      <rect x="10" y="31" width="100" height="1.6" rx="0.8" className="fill-white/70" />
      {/* doors + handles */}
      <path d="M57 25 L57 37 M76 25 L76 37" className="stroke-gold-600" strokeWidth="1" />
      <rect x="48" y="28" width="5" height="1.4" rx="0.7" className="fill-gold-600" />
      <rect x="67" y="28" width="5" height="1.4" rx="0.7" className="fill-gold-600" />
      {/* lights */}
      <path d="M108 27 L113 28.5 L113 31 L108 31 Z" className="fill-amber-50" />
      <rect x="6" y="27.5" width="3.5" height="4.5" rx="1" className="fill-red-500" />
      {/* wheels */}
      {[30, 92].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="43" r="10" className="fill-canvas" />
          <circle cx={cx} cy="43" r="8.5" className="fill-forest-900" />
          <circle cx={cx} cy="43" r="4.2" className="fill-gold-200" />
          <circle cx={cx} cy="43" r="1.6" className="fill-forest-900" />
        </g>
      ))}
    </svg>
  );
}

// ─── Itinerary day panel ──────────────────────────────────────────────────────

/** Horizontal tab transition (reference: data-tab-animate data-direction="horizontal"). */
const dayVariants = {
  enter: (dir: number) => ({ opacity: 0, x: 60 * dir }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: -60 * dir }),
};

function DayPanel({ day, onOpenPhoto }: { day: LuxuryDay; onOpenPhoto: (i: number) => void }) {
  return (
    <motion.div
      variants={dayVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.45, ease: [0.33, 1, 0.68, 1] }}
      className="grid gap-8 lg:grid-cols-[37%_minmax(0,1fr)] lg:gap-14"
    >
      <div className="lg:sticky lg:top-40 lg:self-start">
        <PhotoSlider key={day.title} images={day.gallery} onOpen={onOpenPhoto} />
      </div>

      <div>
        <h3 className="font-display text-[1.25rem] font-bold leading-tight text-forest-800 sm:text-[1.45rem]">
          DAY {day.day}: {day.title}
        </h3>

        <div className="mt-6 flex flex-col gap-4">
          {/* Content box (grey) */}
          <div className="rounded-[18px] bg-ink/[0.06] p-5 sm:p-6">
            <div className="space-y-4 text-[15px] leading-[1.7] text-ink-soft [text-wrap:pretty]">
              {day.intro.map((p) => <p key={p}>{p}</p>)}
              <p className="font-semibold text-ink">{day.experiencesLead}</p>
              <ul className="list-disc space-y-3 pl-5 marker:text-gold-500">
                {day.experiences.map((exp) => (
                  <li key={exp.name}>
                    <strong className="font-semibold text-ink">{exp.name}:</strong> {exp.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Note box (warm) */}
          <div className="rounded-[18px] bg-gold-50 p-5 text-forest-800 sm:p-6">
            <p className="flex items-center gap-2 font-display text-[1.05rem] font-bold text-forest-800">
              <MoonIcon aria-hidden="true" className="h-4 w-4 text-gold-600" />
              {day.closing.heading}
            </p>
            <div className="mt-3 space-y-3 text-[15px] leading-[1.7] [text-wrap:pretty]">
              {day.closing.paragraphs.map((p) => <p key={p} className="text-forest-800/85">{p}</p>)}
            </div>
            <div className="mt-4 space-y-1 border-t border-forest-800/10 pt-4">
              {day.signoff.map((s) => (
                <p key={s} className="font-display text-[1.05rem] italic leading-relaxed text-forest-800">{s}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Pricing card ─────────────────────────────────────────────────────────────

function PriceCard({ option }: { option: LuxuryOption }) {
  return (
    <div className="h-full rounded-[18px] bg-white px-6 py-6 sm:px-8 sm:py-7">
      <p className="flex items-center gap-2.5 font-display text-[1.25rem] font-bold uppercase text-forest-800">
        <CalendarDaysIcon aria-hidden="true" className="h-5 w-5 text-gold-500" />
        {option.label}
      </p>
      <ul className="mt-4 divide-y divide-ink/[0.07]">
        {option.prices.map((p) => (
          <li key={p.label} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3 text-[15px]">
            <span className="text-ink-soft">{p.label}</span>
            <span className="font-display text-xl font-bold text-forest-700">
              {formatVND(p.price)}
              {p.unit && <span className="ml-1 font-sans text-xs font-normal text-ink-muted">{p.unit}</span>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Tour picture carousel ───────────────────────────────────────────────────

function TourPicture({ images, onOpen }: { images: string[]; onOpen: (i: number) => void }) {
  const track = useRef<HTMLDivElement>(null);

  const next = () => {
    const el = track.current;
    if (!el) return;
    const item = el.querySelector<HTMLElement>('[data-slide]');
    const step = item ? item.offsetWidth + 24 : el.clientWidth * 0.8;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
    el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + step, behavior: 'smooth' });
  };

  return (
    <section aria-labelledby="tour-picture-title" className="relative isolate overflow-hidden bg-gold-50 py-16 lg:py-20">
      {/* faint ink-wash mountains, spilling past both sides of the text column */}
      <img
        src="/luxury/decor/ink-mountains.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute -left-[8%] bottom-0 -z-10 w-[120%] max-w-none select-none opacity-45 sm:w-[85%] lg:w-[58%]"
      />
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-12">
          <Reveal className="flex flex-col items-start gap-7 lg:pt-2">
            <Heading0 id="tour-picture-title" text="Tour picture" />
            <button
              type="button"
              onClick={next}
              className="inline-flex h-14 items-center gap-2.5 rounded-full border border-forest-800 px-8 font-display text-[15px] font-bold uppercase text-forest-800 transition-colors duration-300 hover:bg-forest-800 hover:text-white"
            >
              Next
              <ArrowRightIcon aria-hidden="true" className="h-5 w-5" />
            </button>
          </Reveal>

          {/* Track bleeds past the container to the right edge of the screen */}
          <div className="-mr-5 lg:-mr-[50vw]">
            <div
              ref={track}
              className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  data-slide
                  onClick={() => onOpen(i)}
                  aria-label={`Open photo ${i + 1}`}
                  className="group relative aspect-[3/5] w-[240px] shrink-0 snap-start overflow-hidden rounded-[24px] sm:w-[300px] lg:w-[320px]"
                >
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-105"
                  />
                </button>
              ))}
              <div aria-hidden="true" className="w-px shrink-0 lg:w-[50vw]" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ─── Generic carousel with side arrows ───────────────────────────────────────

function Carousel({ children, label }: { children: ReactNode; label: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update, children]);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const item = el.firstElementChild as HTMLElement | null;
    const step = item ? item.offsetWidth + 40 : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const arrow = (dir: 1 | -1, disabled: boolean) => (
    <button
      type="button"
      aria-label={dir === -1 ? 'Previous' : 'Next'}
      onClick={() => go(dir)}
      disabled={disabled}
      className={cn(
        'absolute top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full shadow-soft transition-colors duration-300',
        // sit in the page gutter (max 6rem out) but never past the screen edge
        dir === -1
          ? 'left-[max(-6rem,calc((100%_-_100vw)/2_+_0.5rem))]'
          : 'right-[max(-6rem,calc((100%_-_100vw)/2_+_0.5rem))]',
        disabled ? 'cursor-default bg-gold-200/80 text-white' : 'bg-forest-800 text-white hover:bg-forest-700'
      )}
    >
      {dir === -1 ? <ChevronLeftIcon className="h-6 w-6" /> : <ChevronRightIcon className="h-6 w-6" />}
    </button>
  );

  return (
    <div className="relative" role="region" aria-label={label}>
      {arrow(-1, edges.start)}
      <div
        ref={track}
        onScroll={update}
        className="flex snap-x snap-mandatory gap-10 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      {arrow(1, edges.end)}
    </div>
  );
}

// ─── "Ha Giang loop we offer" tour card ──────────────────────────────────────

function OfferCard({ tour }: { tour: Tour }) {
  const rows = [
    { icon: CalendarDaysIcon, label: 'Duration', value: tour.duration },
    { icon: UsersIcon, label: 'Group size', value: tour.groupSize },
    { icon: BikeIcon, label: 'Tour type', value: `${tour.style} tour` },
  ];
  const price = formatVND(getMinPrice(tour));
  const [open, setOpen] = useState(false);
  // reference: name + price slide up (0.5s linear), overlay rises and fades in, tags/button fade in
  const slide = { duration: 0.5, ease: 'linear' as const };

  return (
    <Link
      to={`/journeys/${tour.slug}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      className="group relative block aspect-[4/5] w-[85%] shrink-0 snap-start overflow-hidden rounded-[28px] sm:aspect-[680/390] lg:w-[calc(50%-20px)]"
    >
      <Parallax className="absolute inset-0">
        <img src={tour.image} alt={tour.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] ease-editorial group-hover:scale-105" />
      </Parallax>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-forest-900/80"
        initial={false}
        animate={open ? { opacity: 1, y: '0%' } : { opacity: 0, y: '45%' }}
        transition={slide}
      />

      <div className="absolute inset-0 flex flex-col gap-4 p-5 sm:flex-row sm:justify-between sm:p-6">
        <div className={cn('flex min-w-0 flex-1 flex-col gap-4', open ? 'justify-between' : 'justify-end')}>
          <motion.h3 layout="position" transition={slide} className="max-w-[90%] font-display text-xl font-bold uppercase leading-tight text-white sm:text-[1.6rem]">
            {tour.name}
          </motion.h3>
          <AnimatePresence>
            {open && (
              <motion.ul
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="flex flex-col items-start gap-2"
              >
                {rows.map(({ icon: Icon, label, value }) => (
                  <li key={label} className="flex items-center gap-2.5 rounded-full border border-white/25 px-4 py-1.5 text-[14px] text-white backdrop-blur-[40px]">
                    <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
                    <span className="text-white"><strong className="font-bold">{label}:</strong> {value}</span>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <div className="flex shrink-0 flex-col items-start justify-end gap-3 sm:items-end">
          <motion.div layout="position" transition={slide} className="sm:text-right">
            <p className="text-[13px] text-white">From</p>
            <p className="font-display text-3xl font-bold leading-none text-white sm:text-[2.4rem]">{price}</p>
          </motion.div>
          <AnimatePresence>
            {open && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-6 py-2.5 font-display text-[14px] font-bold uppercase text-forest-900"
              >
                View more <ArrowRightIcon aria-hidden="true" className="h-4 w-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Link>
  );
}

// ─── "What's new" blog card ──────────────────────────────────────────────────

function NewsCard({ post }: { post: BlogPost }) {
  const [open, setOpen] = useState(false);
  // reference: the cream info box grows upward over the image and reveals the excerpt
  const grow = { duration: 0.5, ease: [0.33, 1, 0.68, 1] as [number, number, number, number] };

  return (
    <Link
      to={`/blog/${post.slug}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      className="relative block aspect-[440/560] w-[80%] shrink-0 snap-start overflow-hidden rounded-[40px] sm:w-[calc(50%-20px)] lg:w-[calc((100%-80px)/3)]"
    >
      <LazyImage
        src={post.cover}
        fallbackSrc={blogFallbackImage(post.slug)}
        alt={post.title}
        wrapperClassName="absolute inset-0 h-full w-full"
        className={cn('transition-transform duration-[1400ms] ease-editorial', open && 'scale-105')}
        sizes="(min-width: 1024px) 33vw, 80vw"
      />

      <div className="absolute inset-x-0 bottom-0 bg-gold-50 px-5 py-5 sm:px-6 sm:py-6">
        <RippleText
          as="h3"
          text={post.title}
          className={cn(
            'line-clamp-3 font-display text-[1.2rem] font-bold uppercase leading-snug transition-colors duration-500',
            open ? 'text-forest-600' : 'text-forest-900'
          )}
        />
        <motion.div
          initial={false}
          animate={open ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={grow}
          className="overflow-hidden"
        >
          <p className="line-clamp-[8] pt-3 text-[15px] leading-[1.6] text-ink-soft">{post.excerpt}</p>
        </motion.div>
      </div>
    </Link>
  );
}

const offerTours = tours.filter((t) => t.slug !== 'luxury-tour');

// ─── Highlights bento ────────────────────────────────────────────────────────

/**
 * Bento layout per tile index — desktop 4 cols × 3 rows, tablet 2 cols,
 * mobile 1 col. Every breakpoint fills its grid completely.
 */
const BENTO_SPANS = [
  'sm:col-span-2 lg:row-span-2',   // 01 feature tile
  '',                              // 02
  '',                              // 03
  'sm:col-span-2',                 // 04 wide
  '', '', '', '',                  // 05–08
];

/**
 * Photo tiles that show only icon, number and title; the full description
 * slides up on hover (desktop) or on tap (touch), so the section reads light
 * while keeping every word.
 */
function HighlightsBento() {
  const items = luxuryContent.highlights;
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="mt-10 grid auto-rows-[18rem] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[17.5rem]">
      {items.map((h, i) => {
        const Icon = HIGHLIGHT_ICONS[i];
        const isOpen = open === i;
        const big = i === 0;
        return (
          <Reveal key={h.title} delay={(i % 4) * 0.05} className={cn('h-full', BENTO_SPANS[i])}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="group relative isolate block h-full w-full overflow-hidden rounded-[26px] text-left shadow-[0_18px_40px_-26px_rgba(0,0,0,0.6)]"
            >
              <img
                src={HIGHLIGHT_IMAGES[i]}
                alt=""
                loading="lazy"
                className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-[1400ms] ease-editorial group-hover:scale-110"
              />
              <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              {/* resting state: icon, number, title */}
              <span className={cn('absolute inset-x-0 bottom-0 block p-5 sm:p-6', big && 'lg:p-8')}>
                <span className="flex items-center gap-2.5">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 text-white backdrop-blur">
                    <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <span className="text-sm font-semibold text-gold-300">{String(i + 1).padStart(2, '0')}</span>
                </span>
                <span className={cn(
                  'mt-3 block font-display font-bold leading-snug text-white [text-wrap:balance]',
                  big ? 'text-[1.5rem] lg:text-[2.1rem]' : 'text-[1.2rem]'
                )}>
                  {h.title}
                </span>
              </span>

              {/* reveal: full description slides up (bottom-aligned, scrolls if ever too long) */}
              <span
                className={cn(
                  'absolute inset-0 flex flex-col overflow-y-auto bg-forest-900/90 p-5 backdrop-blur-[2px] transition-transform duration-500 ease-editorial [scrollbar-width:none] sm:p-6',
                  big && 'lg:p-8',
                  isOpen ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0 group-focus-visible:translate-y-0'
                )}
              >
                <span className="mt-auto block">
                  {big && (
                    <span className="mb-3 flex items-center gap-2.5">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 text-white">
                        <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
                      </span>
                      <span className="text-sm font-semibold text-gold-300">{String(i + 1).padStart(2, '0')}</span>
                    </span>
                  )}
                  <span className={cn('block font-display font-bold leading-snug text-white', big ? 'text-[1.5rem] lg:text-[2.1rem]' : 'text-[1.1rem]')}>
                    {big ? h.title : <><span className="mr-2 font-sans text-sm text-gold-300">{String(i + 1).padStart(2, '0')}</span>{h.title}</>}
                  </span>
                  <span className={cn('mt-2 block leading-[1.6] text-white/85', big ? 'text-[15px] lg:text-base' : 'text-[13.5px]')}>
                    {h.text}
                  </span>
                </span>
              </span>
            </button>
          </Reveal>
        );
      })}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function LuxuryTour() {
  useSeo({
    title: 'Luxury Tour Ha Giang',
    description: luxuryContent.intro,
    image: luxuryHeroImage,
    type: 'article',
  });
  useLenis();

  const [optionIdx, setOptionIdx] = useState(0);
  const [dayIdx, setDayIdx] = useState(0);
  const [carFacing, setCarFacing] = useState<1 | -1>(1);
  const [viewer, setViewer] = useState<{ images: string[]; index: number } | null>(null);
  const [activeNav, setActiveNav] = useState(NAV[0].id);
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    let alive = true;
    apiGetPosts()
      .then((list) => { if (alive) setPosts(list.slice(0, 8)); })
      .catch(() => setPosts([]));
    return () => { alive = false; };
  }, []);

  const option = luxuryOptions[optionIdx];
  const day = option.days[Math.min(dayIdx, option.days.length - 1)];

  const selectOption = (i: number) => {
    setOptionIdx(i);
    setCarFacing(-1);
    setDayIdx(0);
  };

  const selectDay = (i: number) => {
    if (i !== dayIdx) setCarFacing(i < dayIdx ? -1 : 1);
    setDayIdx(i);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActiveNav(visible[0].target.id);
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <main id="main" className="w-full bg-canvas">
      {/* ── Banner ── */}
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden pb-12 pt-36 md:pb-16">
        <div className="absolute inset-0 -z-10">
          <LazyImage src={luxuryHeroImage} alt="Mountain resort on the Ha Giang Loop" priority wrapperClassName="h-full w-full" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-900/90 via-forest-900/40 to-forest-900/30" />

        <Container>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl font-display text-[2.4rem] font-bold uppercase leading-[1.05] text-white sm:text-[3.4rem] lg:text-[4.2rem]"
          >
            {luxuryContent.title}
          </motion.h1>
          <p className="mt-3 max-w-2xl text-[15px] text-white/80 sm:text-base">{luxuryContent.subtitle}</p>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mt-6 border-b border-white/70">
            <p className="flex h-11 items-center overflow-x-auto whitespace-nowrap text-sm text-white/75">
              <Link to="/" className="hover:text-white">Home</Link>
              <span aria-hidden="true" className="mx-2.5 text-lg leading-none">|</span>
              <Link to="/journeys" className="hover:text-white">Journeys</Link>
              <span aria-hidden="true" className="mx-2.5 text-lg leading-none">|</span>
              <span className="text-white">{luxuryContent.title}</span>
            </p>
          </nav>

          <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-10">
            {/* Glass highlights box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 rounded-[18px] border border-white/20 bg-forest-900/45 p-6 backdrop-blur-[40px] sm:p-7"
            >
              <p className="font-display text-xl font-bold text-white sm:text-2xl">{luxuryContent.highlightsTitle}</p>
              <ul className="mt-3 grid list-disc gap-x-8 gap-y-1.5 pl-5 text-[15px] leading-snug text-white marker:text-white sm:grid-cols-2">
                {luxuryContent.highlights.map((h) => (
                  <li key={h.title} className="text-white"><strong className="font-semibold">{h.title}</strong></li>
                ))}
              </ul>
            </motion.div>

            {/* Price + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="flex shrink-0 flex-col items-start"
            >
              <p className="text-[15px] text-white">From</p>
              <p className="mt-1 font-display text-[2.6rem] font-bold leading-none text-white sm:text-[3rem]">
                {formatVND(minPrice)}
              </p>
              <CtaButton to={BOOK_LINK} className="mt-5">Book now</CtaButton>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Sticky tour nav ── */}
      <nav aria-label="On this page" className="sticky top-[72px] z-30 bg-forest-800 py-3">
        <Container>
          <div className="overflow-x-auto [scrollbar-width:none]">
          <ul className="mx-auto flex w-max items-center gap-6 sm:gap-10">
            {NAV.map((n) => (
              <li key={n.id} className="shrink-0">
                <a
                  href={`#${n.id}`}
                  className={cn(
                    'font-display text-[14.5px] font-semibold uppercase tracking-wide transition-colors duration-500 sm:text-[15.5px]',
                    activeNav === n.id ? 'text-gold-400' : 'text-white hover:text-gold-400'
                  )}
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li className="shrink-0">
              <Link to={BOOK_LINK} className="font-display text-[14.5px] font-semibold uppercase tracking-wide text-white transition-colors duration-500 hover:text-gold-400 sm:text-[15.5px]">
                Booking now
              </Link>
            </li>
          </ul>
          </div>
        </Container>
      </nav>

      {/* ── Tour overview ── */}
      <section id="tour-overview" className="scroll-mt-32 bg-gold-50 py-16 lg:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-10">
            <Reveal className="flex flex-col justify-center gap-7">
              <Heading0 text="Tour overview" />
              <p className="text-[15px] leading-[1.8] text-ink-soft [text-wrap:pretty]">{luxuryContent.intro}</p>

              <ul className="flex flex-col items-start gap-3">
                {[
                  { icon: CalendarDaysIcon, label: 'Duration:', value: luxuryOptions.map((o) => o.label).join(' / ') },
                  { icon: UsersIcon, label: 'Tour style:', value: luxuryContent.highlights[0].title },
                  { icon: BikeIcon, label: 'Transportation:', value: luxuryContent.highlights[4].title },
                  { icon: BedDoubleIcon, label: 'Accommodation:', value: luxuryContent.highlights[3].title },
                ].map(({ icon: Icon, label, value }) => (
                  <li key={label} className="flex flex-wrap items-center gap-x-2 gap-y-0.5 rounded-[22px] bg-white px-5 py-2 text-[15px] sm:rounded-full">
                    <span className="flex items-center gap-2 font-bold text-forest-800">
                      <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
                      {label}
                    </span>
                    <span className="text-ink-soft">{value}</span>
                  </li>
                ))}
              </ul>

              <div className="border-l-2 border-gold-400 pl-4">
                <p className="font-display text-lg italic leading-relaxed text-forest-800">{luxuryContent.tagline}</p>
                <p className="mt-1 text-[12px] font-semibold uppercase tracking-widest text-gold-600">{luxuryContent.pillars}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <CtaButton to={BOOK_LINK}>Book now</CtaButton>
                <CtaButton to="/contact" tone="forest">Request a quote</CtaButton>
              </div>
            </Reveal>

            {/* Two vertical photo marquees */}
            <div aria-hidden="true" className="grid h-[480px] grid-cols-2 sm:h-[600px] lg:h-[640px]">
              {[marqueeLeft, marqueeRight].map((col, c) => (
                <div
                  key={c}
                  className={cn(
                    'overflow-hidden border-r border-ink/15 px-3 sm:px-5 [&:hover>div]:[animation-play-state:paused]',
                    c === 0 ? 'border-l pb-10' : 'pt-10'
                  )}
                >
                  <div className={cn('flex flex-col gap-4', c === 0 ? 'animate-marquee-up' : 'animate-marquee-down')}>
                    {[...col, ...col].map((src, i) => (
                      <div key={`${src}-${i}`} className="aspect-[4/5] shrink-0 overflow-hidden rounded-xl">
                        <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Highlights ── */}
      <section id="highlights" className="relative isolate scroll-mt-32 overflow-hidden bg-forest-600 py-16 lg:py-20">
        {/* gold H'Mong brocade motif around the edges, fading out towards the centre */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={TOPO_EDGE_FADE}>
          <div className="h-full w-full bg-gold-400 opacity-60" style={BROCADE_MASK} />
        </div>
        <Container>
          <Heading0 center text={luxuryContent.highlightsTitle} className="text-white" />
          <HighlightsBento />
        </Container>
      </section>

      {/* ── Itinerary ── */}
      <section id="itinerary" className="scroll-mt-32 border-t border-ink/[0.06] pb-24 pt-16 sm:pb-28 lg:pb-36 lg:pt-20">
        <Container>
          <Heading0 center text="Luxury tour itinerary" />

          {/* Duration switch */}
          <div className="mt-7 flex justify-center">
            <div role="tablist" aria-label="Tour duration" className="inline-flex rounded-full bg-gold-50 p-1">
              {luxuryOptions.map((o, i) => (
                <button
                  key={o.id}
                  type="button"
                  role="tab"
                  aria-selected={i === optionIdx}
                  onClick={() => selectOption(i)}
                  className={cn(
                    'rounded-full px-5 py-2 font-display text-[14px] font-bold uppercase transition-colors duration-300',
                    i === optionIdx ? 'bg-forest-800 text-white' : 'text-forest-800 hover:bg-white'
                  )}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          {option.routeSummary && (
            <div className="mx-auto mt-6 max-w-3xl rounded-[18px] bg-gold-50 px-6 py-5 text-forest-800">
              <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest">
                <MapIcon aria-hidden="true" className="h-4 w-4" />
                Route at a glance
              </p>
              <ul className="mt-3 space-y-1.5 text-sm leading-relaxed">
                {option.routeSummary.map((r) => <li key={r} className="text-forest-800">{r}</li>)}
              </ul>
            </div>
          )}

          {/* Day tabs */}
          <div className="mt-6">
            <div className="relative">
              {/* road line — sits right under the car's wheels */}
              <div aria-hidden="true" className="absolute inset-x-0 top-[3.25rem] h-0.5 bg-gradient-to-r from-transparent via-ink/15 to-transparent sm:top-[3.75rem]" />
              <ul role="tablist" aria-label="Itinerary days" className="flex overflow-x-auto pt-[3.375rem] [scrollbar-width:none] sm:pt-[3.875rem]">
                {option.days.map((d, i) => {
                  const active = d === day;
                  return (
                    <li key={`${option.id}-${d.day}`} className="relative min-w-[28%] flex-1 sm:min-w-0">
                      {active && (
                        <motion.div
                          layoutId="luxury-car"
                          transition={{ type: 'spring', stiffness: 90, damping: 16 }}
                          className="pointer-events-none absolute bottom-[calc(100%+2px)] left-1/2 -ml-[46px] w-[92px] sm:-ml-[54px] sm:w-[108px]"
                        >
                          <motion.div
                            animate={{ scaleX: carFacing, y: [0, -1.5, 0] }}
                            transition={{ scaleX: { duration: 0.3 }, y: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' } }}
                          >
                            <LuxuryCar />
                          </motion.div>
                        </motion.div>
                      )}
                      <button
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => selectDay(i)}
                        className={cn(
                          'flex w-full items-center justify-center gap-2 p-2.5 font-display text-[1.3rem] font-bold uppercase transition-colors duration-300 sm:text-[1.6rem]',
                          active ? 'text-gold-400' : 'text-ink-muted hover:text-forest-800'
                        )}
                      >
                        {active && <CheckIcon aria-hidden="true" className="h-6 w-6" />}
                        Day {d.day}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="mt-8 lg:mt-10">
            <AnimatePresence mode="wait" custom={carFacing}>
              <DayPanel key={`${option.id}-${day.day}`} day={day} onOpenPhoto={(i) => setViewer({ images: day.gallery, index: i })} />
            </AnimatePresence>
          </div>
        </Container>
      </section>

      {/* ── Pricing & inclusion ── */}
      <section id="pricing" className="relative scroll-mt-32 bg-gold-400 py-16 lg:py-24">
        {/* curved top edge: the warm band bulges up into the section above */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 bottom-[calc(100%-1px)] block h-10 w-full sm:h-16 lg:h-24"
        >
          <path d="M0 100 Q720 -100 1440 100 Z" className="fill-gold-300" />
        </svg>
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-gold-300 to-transparent" />
        {/* topographic / wood-grain contour lines */}
        <img
          src="/luxury/decor/topo-lines.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover opacity-25"
        />
        <Container className="relative">
          <div className="mx-auto max-w-5xl">
            <Heading0 center text="Pricing" className="text-forest-900" />
            <div className="mt-10 flex flex-col gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                {luxuryOptions.map((o) => <PriceCard key={o.id} option={o} />)}
              </div>

              <div className="flex items-start gap-3 rounded-[18px] bg-white px-6 py-5 sm:px-10">
                <InfoIcon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-forest-700" />
                <p className="text-[15px] leading-relaxed text-ink-soft [text-wrap:pretty]">{luxuryContent.priceNote}</p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <CtaButton to={BOOK_LINK} tone="forest">Book now</CtaButton>
              <CtaButton to="/contact" tone="outline">Request a quote</CtaButton>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Tour picture ── */}
      <TourPicture images={allPhotos} onOpen={(i) => setViewer({ images: allPhotos, index: i })} />

      {/* ── Ha Giang loop we offer ── */}
      <section aria-labelledby="we-offer-title" className="bg-white py-16 lg:py-20">
        <Container>
          <Heading0 id="we-offer-title" text="Ha Giang loop we offer" />
          <div className="mt-10">
            <Carousel label="Other tours">
              {offerTours.map((t) => <OfferCard key={t.slug} tour={t} />)}
            </Carousel>
          </div>
        </Container>
      </section>

      {/* ── What's new ── */}
      {posts.length > 0 && (
        <section aria-labelledby="whats-new-title" className="bg-canvas py-16 lg:py-20">
          <Container>
            <Heading0 center id="whats-new-title" text="What's new" />
            <div className="mt-10">
              <Carousel label="Latest articles">
                {posts.map((p) => <NewsCard key={p.slug} post={p} />)}
              </Carousel>
            </div>
          </Container>
        </section>
      )}

      <AnimatePresence>
        {viewer && (
          <Lightbox
            images={viewer.images}
            index={viewer.index}
            onClose={() => setViewer(null)}
            onIndex={(i) => setViewer((v) => (v ? { ...v, index: i } : v))}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
