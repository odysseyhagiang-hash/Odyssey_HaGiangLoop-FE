import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckIcon, XIcon } from 'lucide-react';
import { useSeo } from '../hooks/useSeo';
import { tours } from '../lib/data';
import type { Tour, TourPricing } from '../lib/types';
import { cn } from '../lib/utils';
import { PageHero } from '../components/layout/PageHero';
import { Button } from '../components/ui/Button';
import { Reveal, Stagger, staggerItem } from '../components/ui/Reveal';
import { Container, Section } from '../components/ui/Section';
import { NotFound } from './NotFound';

// ─── Constants ────────────────────────────────────────────────────────────────

const TOPIC: Record<string, string> = {
  Private: 'book-private-tour',
  Group: 'book-group-tour',
  Car: 'book-car-tour',
  Jeep: 'book-jeep-tour',
  Expedition: 'book-hagiang-caobang-tour',
};

const STYLE_COLOR: Record<string, string> = {
  Private: 'bg-forest-500',
  Group: 'bg-blue-600',
  Car: 'bg-slate-600',
  Jeep: 'bg-amber-600',
  Expedition: 'bg-emerald-600',
};

const ACTIVE_TAB: Record<string, string> = {
  Private: 'bg-forest-600 text-white',
  Group: 'bg-blue-600 text-white',
  Car: 'bg-slate-600 text-white',
  Jeep: 'bg-amber-600 text-white',
  Expedition: 'bg-emerald-600 text-white',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatVND(amount: number): string {
  return amount.toLocaleString('vi-VN') + ' VND';
}

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

// ─── Pricing Tables ───────────────────────────────────────────────────────────

function RidingPricingTable({
  pricing,
  style,
  activeIdx,
  onChangeIdx,
  hideTabs = false,
}: {
  pricing: TourPricing[];
  style: Tour['style'];
  activeIdx: number;
  onChangeIdx: (i: number) => void;
  hideTabs?: boolean;
}) {
  const row = pricing[activeIdx];

  return (
    <div>
      {!hideTabs && pricing.length > 1 && (
        <div className="flex gap-1.5 mb-4">
          {pricing.map((p, i) => (
            <button
              key={p.duration}
              type="button"
              onClick={() => onChangeIdx(i)}
              className={cn(
                'rounded-full px-4 py-1.5 text-[12px] font-semibold uppercase tracking-wide transition-colors duration-200',
                i === activeIdx ? ACTIVE_TAB[style] : 'bg-ink/8 text-ink-soft hover:bg-ink/15'
              )}
            >
              {p.duration}
            </button>
          ))}
        </div>
      )}
      <div className="rounded-2xl overflow-hidden border border-ink/[0.08] text-sm">
        <div className="grid grid-cols-3 bg-forest-900 text-white/80 text-[11px] uppercase tracking-wider">
          <span className="px-4 py-3">Behind easyrider</span>
          <span className="px-4 py-3 border-x border-white/10">Self-Drive</span>
          <span className="px-4 py-3">Behind partner</span>
        </div>
        <div className="grid grid-cols-3 bg-white">
          {row.behindEasyrider !== undefined && (
            <span className="px-4 py-3 font-medium text-forest-700">{formatVND(row.behindEasyrider)}</span>
          )}
          {row.selfDrive !== undefined && (
            <span className="px-4 py-3 font-medium text-forest-700 border-x border-ink/[0.06]">{formatVND(row.selfDrive)}</span>
          )}
          {row.behindPartner !== undefined && (
            <span className="px-4 py-3 font-medium text-forest-700">{formatVND(row.behindPartner)}</span>
          )}
        </div>
      </div>

      {/* Upgrades — shown if current duration has any */}
      {row.upgrades && row.upgrades.length > 0 && (
        <div className="mt-3 rounded-2xl border border-gold-300/30 bg-gold-50 divide-y divide-gold-300/20 overflow-hidden">
          <p className="px-4 py-2 text-[10px] font-semibold uppercase tracking-widest text-gold-600">
            Optional upgrades
          </p>
          {row.upgrades.map((u) => (
            <div key={u.label} className="flex items-center justify-between px-4 py-2.5 text-[12px]">
              <span className="text-ink-soft">{u.label}</span>
              <span className="font-semibold text-gold-600">+ {formatVND(u.price)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const PRICE_COLOR: Record<string, string> = {
  Private: 'text-forest-700',
  Group: 'text-blue-700',
  Car: 'text-slate-700',
  Jeep: 'text-amber-600',
  Expedition: 'text-emerald-700',
};

function PerPersonPricingTable({
  pricing,
  style,
  activeIdx,
  onChangeIdx,
  hideTabs = false,
}: {
  pricing: TourPricing[];
  style: Tour['style'];
  activeIdx: number;
  onChangeIdx: (i: number) => void;
  hideTabs?: boolean;
}) {
  const row = pricing[activeIdx];

  return (
    <div>
      {!hideTabs && pricing.length > 1 && (
        <div className="flex gap-1.5 mb-4">
          {pricing.map((p, i) => (
            <button
              key={p.duration}
              type="button"
              onClick={() => onChangeIdx(i)}
              className={cn(
                'rounded-full px-4 py-1.5 text-[12px] font-semibold uppercase tracking-wide transition-colors duration-200',
                i === activeIdx ? ACTIVE_TAB[style] : 'bg-ink/8 text-ink-soft hover:bg-ink/15'
              )}
            >
              {p.duration}
            </button>
          ))}
        </div>
      )}
      <div className="rounded-2xl overflow-hidden border border-ink/[0.08] divide-y divide-ink/[0.06]">
        {(row.perPerson ?? []).map(({ persons, price }) => (
          <div key={persons} className="flex items-center justify-between bg-white px-5 py-3 text-sm">
            <span className="text-ink-soft">{persons} {persons === 1 ? 'person' : 'persons'}</span>
            <span className={cn('font-semibold', PRICE_COLOR[style] ?? 'text-forest-700')}>{formatVND(price)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FlatPricingTable({
  pricing,
  style,
  activeIdx,
  onChangeIdx,
}: {
  pricing: TourPricing[];
  style: Tour['style'];
  activeIdx: number;
  onChangeIdx: (i: number) => void;
}) {
  const row = pricing[activeIdx];

  return (
    <div>
      {pricing.length > 1 && (
        <div className="flex gap-1.5 mb-4">
          {pricing.map((p, i) => (
            <button
              key={p.duration}
              type="button"
              onClick={() => onChangeIdx(i)}
              className={cn(
                'rounded-full px-4 py-1.5 text-[12px] font-semibold uppercase tracking-wide transition-colors duration-200',
                i === activeIdx ? ACTIVE_TAB[style] : 'bg-ink/8 text-ink-soft hover:bg-ink/15'
              )}
            >
              {p.duration}
            </button>
          ))}
        </div>
      )}
      <div className="rounded-2xl overflow-hidden border border-ink/[0.08] divide-y divide-ink/[0.06]">
        <div className="flex items-center justify-between bg-white px-5 py-3 text-sm">
          <span className="font-semibold text-ink">{row.duration}</span>
          {row.perPersonPrice !== undefined && (
            <span className="font-semibold text-slate-600">
              {formatVND(row.perPersonPrice)}
              <span className="ml-1 text-[11px] font-normal text-ink-muted">/ person</span>
            </span>
          )}
          {row.flatPrice !== undefined && (
            <span className="font-semibold text-slate-600">{formatVND(row.flatPrice)}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function TourDetail() {
  const { slug } = useParams<{ slug: string }>();
  const tour = tours.find((t) => t.slug === slug);

  useSeo({
    title: tour ? tour.name : 'Tour not found',
    description: tour ? tour.summary : 'This tour could not be found.',
    image: tour?.image,
    type: 'article',
  });

  const [activeDurationIdx, setActiveDurationIdx] = useState(0);

  if (!tour) return <NotFound />;

  const minPrice = getMinPrice(tour);
  const hasRiding = tour.pricing[0]?.behindEasyrider !== undefined;
  const hasPerPerson = tour.pricing[0]?.perPerson !== undefined;
  const hasFlat = tour.pricing[0]?.flatPrice !== undefined || tour.pricing[0]?.perPersonPrice !== undefined;

  const activeItinerary = tour.pricing[activeDurationIdx]?.itinerary ?? tour.itinerary;

  return (
    <main id="main" className="w-full bg-canvas">

      {/* ── Hero ── */}
      <PageHero
        eyebrow={`${tour.style} tour`}
        title={tour.name}
        titleClassName="max-w-5xl sm:whitespace-nowrap sm:text-[3rem] lg:text-[3.6rem]"
        description={tour.tagline}
        image={tour.image}
        imageAlt={`${tour.name} — ${tour.tagline}`}
      >
        <span className={cn('inline-block rounded-full px-4 py-1.5 text-[12px] font-semibold uppercase tracking-wide text-white', STYLE_COLOR[tour.style])}>
          {tour.style} Tour
        </span>
      </PageHero>

      {/* ── Main content ── */}
      <Section tone="canvas" className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_360px] lg:gap-16 xl:gap-20">

            {/* ── Left column ── */}
            <div className="min-w-0">

              {/* About */}
              <Reveal>
                <h2 className="font-display text-[1.75rem] leading-snug text-ink sm:text-[2.25rem]">
                  About this tour
                </h2>
                <p className="mt-5 text-[15px] leading-[1.8] text-ink-soft">{tour.summary}</p>
              </Reveal>

              {/* Included / Excluded */}
              <div className="mt-14 grid gap-6 sm:grid-cols-2">
                <Reveal className="rounded-4xl bg-parchment p-8">
                  <h3 className="font-display text-xl text-ink">What's included</h3>
                  <ul className="mt-5 space-y-3">
                    {tour.inclusions.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                        <CheckIcon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-forest-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={0.08} className="rounded-4xl border border-ink/[0.08] p-8">
                  <h3 className="font-display text-xl text-ink">Not included</h3>
                  <ul className="mt-5 space-y-3">
                    {tour.exclusions.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                        <XIcon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>

              {/* Pricing */}
              <Reveal className="mt-14">
                <h2 className="font-display text-[1.75rem] leading-snug text-ink sm:text-[2.25rem]">
                  Pricing
                </h2>
                <div className="mt-6">
                  {/* Shared duration tabs when multiple table types exist */}
                  {(hasRiding && hasPerPerson) && tour.pricing.length > 1 && (
                    <div className="flex gap-1.5 mb-6">
                      {tour.pricing.map((p, i) => (
                        <button
                          key={p.duration}
                          type="button"
                          onClick={() => setActiveDurationIdx(i)}
                          className={cn(
                            'rounded-full px-4 py-1.5 text-[12px] font-semibold uppercase tracking-wide transition-colors duration-200',
                            i === activeDurationIdx ? ACTIVE_TAB[tour.style] : 'bg-ink/8 text-ink-soft hover:bg-ink/15'
                          )}
                        >
                          {p.duration}
                        </button>
                      ))}
                    </div>
                  )}

                  {hasRiding && (
                    <div className={cn(hasPerPerson && 'mb-6')}>
                      {hasPerPerson && (
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2.5 flex items-center gap-1.5">
                          <span>🏍️</span> Motorbike Tour (per person)
                        </h4>
                      )}
                      <RidingPricingTable
                        pricing={tour.pricing}
                        style={tour.style}
                        activeIdx={activeDurationIdx}
                        onChangeIdx={setActiveDurationIdx}
                        hideTabs={hasPerPerson}
                      />
                    </div>
                  )}

                  {hasPerPerson && (
                    <div>
                      {hasRiding && (
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2.5 flex items-center gap-1.5">
                          <span>🚗</span> Private Car Tour
                        </h4>
                      )}
                      <PerPersonPricingTable
                        pricing={tour.pricing}
                        style={tour.style}
                        activeIdx={activeDurationIdx}
                        onChangeIdx={setActiveDurationIdx}
                        hideTabs={hasRiding}
                      />
                    </div>
                  )}

                  {hasFlat && (
                    <FlatPricingTable
                      pricing={tour.pricing}
                      style={tour.style}
                      activeIdx={activeDurationIdx}
                      onChangeIdx={setActiveDurationIdx}
                    />
                  )}
                </div>
                {tour.priceNote && (
                  <div className="mt-4 flex items-center gap-2 rounded-2xl bg-forest-50 border border-forest-500/15 px-4 py-3">
                    <span aria-hidden="true" className="shrink-0">ℹ️</span>
                    <ul className="space-y-1">
                      {tour.priceNote.map((note, i) => (
                        <li key={i} className="text-[12px] leading-relaxed text-forest-700">{note}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </Reveal>

              {/* Itinerary */}
              <div className="mt-14">
                <Reveal>
                  <h2 className="font-display text-[1.75rem] leading-snug text-ink sm:text-[2.25rem]">
                    Day by day itinerary
                    <span className="ml-3 text-[1rem] font-normal text-ink-muted italic">
                      — {tour.pricing[activeDurationIdx]?.duration ?? ''}
                    </span>
                  </h2>
                </Reveal>

                {/* key forces full remount when duration changes → shows correct days */}
                <Stagger key={activeDurationIdx} className="mt-8 relative">
                  {/* Vertical connector line */}
                  <div
                    aria-hidden="true"
                    className="absolute left-[1.875rem] top-12 bottom-12 w-px bg-ink/[0.08] hidden sm:block"
                  />

                  {activeItinerary.map((day) => (
                    <motion.article
                      key={`${activeDurationIdx}-${day.day}`}
                      variants={staggerItem}
                      className="relative flex gap-6 pb-8 last:pb-0"
                    >
                      {/* Day number bubble */}
                      <div className="hidden sm:flex flex-col items-center flex-shrink-0">
                        <span className="font-display text-4xl text-gold-400 leading-none w-[3.75rem] text-center z-10 bg-canvas">
                          {String(day.day).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Content card */}
                      <div className="flex-1 min-w-0 rounded-4xl border border-ink/[0.08] bg-white p-6 sm:p-8 transition-all duration-700 ease-editorial hover:-translate-y-0.5 hover:shadow-soft">
                        {/* Mobile day label */}
                        <span className="sm:hidden font-display text-3xl text-gold-400 leading-none block mb-3">
                          {String(day.day).padStart(2, '0')}
                        </span>
                        <h3 className="font-display text-lg leading-snug text-ink sm:text-xl">
                          {day.title}
                        </h3>
                        {day.distance && (
                          <span className="mt-2 inline-block rounded-full bg-forest-50 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-forest-700">
                            {day.distance}
                          </span>
                        )}
                        <p className="mt-3 text-sm leading-relaxed text-ink-soft whitespace-pre-line">{day.summary}</p>
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {day.highlights.map((h) => (
                            <li
                              key={h}
                              className="rounded-full border border-ink/10 px-3 py-1 text-xs text-ink-soft"
                            >
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.article>
                  ))}
                </Stagger>
              </div>
            </div>

            {/* ── Right sticky sidebar ── */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Reveal className="rounded-5xl border border-ink/[0.08] bg-white p-8 shadow-soft">
                <p className="text-[10px] uppercase tracking-widest text-ink-muted">From</p>
                <p className="mt-2 font-display text-4xl text-forest-500">{formatVND(minPrice)}</p>
                <p className="mt-1 text-xs text-ink-muted">per traveller · all inclusions listed</p>

                <ul className="mt-7 space-y-3 border-t border-ink/8 pt-7 text-sm text-ink-soft">
                  <li className="flex justify-between gap-4">
                    <span>Duration</span>
                    <span className="font-medium text-ink">{tour.duration}</span>
                  </li>
                  <li className="flex justify-between gap-4">
                    <span>Group size</span>
                    <span className="font-medium text-ink">{tour.groupSize}</span>
                  </li>
                  <li className="flex justify-between gap-4">
                    <span>Difficulty</span>
                    <span className="font-medium text-ink">{tour.difficulty}</span>
                  </li>
                </ul>

                <Button
                  to={`/contact?topic=${TOPIC[tour.style]}`}
                  size="lg"
                  className="mt-8 w-full"
                >
                  Book now
                </Button>
                <Button
                  to="/contact"
                  variant="outline"
                  className="mt-3 w-full"
                >
                  Ask a question
                </Button>
                <p className="mt-5 text-center text-xs leading-relaxed text-ink-muted">
                  No payment taken online. A guide confirms availability before anything is charged.
                </p>
              </Reveal>

              {/* Back to tours */}
              <div className="mt-6 text-center">
                <Link
                  to="/journeys"
                  className="text-sm font-medium text-forest-500 underline-offset-4 hover:underline"
                >
                  ← View all tours
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </main>
  );
}
