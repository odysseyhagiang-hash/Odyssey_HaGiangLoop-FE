import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Tour } from '../../lib/types';
import { cn } from '../../lib/utils';
import { LazyImage } from '../ui/LazyImage';
import { staggerItem } from '../ui/Reveal';

interface TourCardProps {
  tour: Tour;
}

function formatVND(amount: number): string {
  return amount.toLocaleString('vi-VN') + ' VND';
}

const STYLE_BADGE: Record<string, string> = {
  Private: 'bg-forest-500 text-white',
  Group:   'bg-blue-600 text-white',
  Car:     'bg-slate-600 text-white',
  Jeep:    'bg-amber-600 text-white',
  Expedition: 'bg-emerald-600 text-white',
};

const TOPIC: Record<string, string> = {
  Private: 'book-private-tour',
  Group:   'book-group-tour',
  Car:     'book-car-tour',
  Jeep:    'book-jeep-tour',
  Expedition: 'book-hagiang-caobang-tour',
};

function getMinPrice(tour: Tour): number {
  let min = tour.price || Infinity;
  for (const p of tour.pricing) {
    if (p.behindPartner !== undefined) min = Math.min(min, p.behindPartner);
    if (p.selfDrive !== undefined) min = Math.min(min, p.selfDrive);
    if (p.behindEasyrider !== undefined) min = Math.min(min, p.behindEasyrider);
    if (p.perPersonPrice !== undefined) min = Math.min(min, p.perPersonPrice);
    if (p.flatPrice !== undefined) min = Math.min(min, p.flatPrice);
    if (p.perPerson) {
      for (const item of p.perPerson) {
        min = Math.min(min, item.price);
      }
    }
  }
  return min === Infinity ? tour.price : min;
}

export function TourCard({ tour }: TourCardProps) {
  const minPrice = getMinPrice(tour);

  return (
    <motion.article
      variants={staggerItem}
      className="group flex h-full flex-col overflow-hidden rounded-4xl border border-ink/[0.07] bg-white transition-all duration-700 ease-editorial hover:-translate-y-1 hover:shadow-lift"
    >
      {/* ── Image ── */}
      <div className="relative overflow-hidden flex-shrink-0">
        <LazyImage
          src={tour.image}
          alt={`${tour.name} — ${tour.tagline}`}
          wrapperClassName="block w-full aspect-[16/7]"
          className="transition-transform duration-[1400ms] ease-editorial group-hover:scale-105"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        <div className="absolute left-5 top-5">
          <span className={cn('rounded-full px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wide', STYLE_BADGE[tour.style])}>
            {tour.style}
          </span>
        </div>
      </div>

      {/* ── 4 Highlights — 2×2 grid ── */}
      <div className="grid grid-cols-2 border-b border-ink/[0.06] flex-shrink-0">
        {tour.highlights.slice(0, 4).map((h, i) => (
          <div
            key={h}
            className={cn(
              'flex items-start px-4 py-3 text-[11px] leading-snug text-ink-soft min-h-[68px] text-left [text-wrap:pretty]',
              i % 2 === 0 ? 'border-r border-ink/[0.06]' : '',
              i >= 2 ? 'border-t border-ink/[0.06]' : ''
            )}
          >
            <span className="mt-0.5 mr-2 h-1 w-1 rounded-full bg-ink/25 flex-shrink-0" />
            <span>{h}</span>
          </div>
        ))}
      </div>

      {/* ── Body ── */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-sm leading-relaxed text-ink-soft text-left [text-wrap:pretty]">{tour.tagline}</p>

        <div className="mt-4">
          <p className="text-[10px] uppercase tracking-widest text-ink-muted">From</p>
          <p className="mt-1 font-display text-2xl text-forest-500">{formatVND(minPrice)}</p>
        </div>

        {/* CTA buttons — pinned to bottom */}
        <div className="mt-auto pt-6 flex flex-wrap gap-3">
          <Link
            to={`/journeys/${tour.slug}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-forest-500/30 px-5 py-2.5 text-[13px] font-semibold text-forest-700 transition-colors duration-300 hover:border-forest-500 hover:bg-forest-50"
          >
            View details
          </Link>
          <Link
            to={`/contact?topic=${TOPIC[tour.style]}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-forest-500 px-5 py-2.5 text-[13px] font-semibold text-white transition-colors duration-300 hover:bg-forest-600"
          >
            Book now
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
