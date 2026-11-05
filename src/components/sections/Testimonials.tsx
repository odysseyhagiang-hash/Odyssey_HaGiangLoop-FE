import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, XIcon } from 'lucide-react';
import { googleReviews, tripAdvisorReviews } from '../../lib/data';
import type { GoogleReview, TripAdvisorReview } from '../../lib/types';
import { cn } from '../../lib/utils';
import { Container, Section, SectionHeading } from '../ui/Section';
import { useResponsivePerPage } from '../../hooks/useResponsivePerPage';
import { formatRating, formatReviewCount, useReviewStats } from '../../hooks/useReviewStats';

// ─── helpers ─────────────────────────────────────────────────────────────────

function initials(name: string) {
  // Google: first letter of first name only
  return name.trim()[0]?.toUpperCase() ?? '?';
}

const AVATAR_COLORS = [
  'bg-emerald-500', 'bg-sky-500', 'bg-violet-500',
  'bg-rose-500', 'bg-amber-500', 'bg-teal-500',
];
function avatarColor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffff;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

function TaDefaultAvatar({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  const sz = size === 'sm' ? 'h-9 w-9' : 'h-11 w-11';
  return (
    <span className={`inline-flex items-center justify-center rounded-full bg-[#e8f4f0] shrink-0 ${sz}`}>
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#00aa6c]" aria-hidden="true">
        <circle cx="12" cy="8" r="4" fill="currentColor" opacity="0.7" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      </svg>
    </span>
  );
}
export const TA_PAGE_URL = 'https://www.tripadvisor.com/Attraction_Review-g1544599-d26321485-Reviews-Ha_Giang_Odyssey_Hostel_Tours_Motorbike_Rental-Ha_Giang_Ha_Giang_Province.html';
export const GOOGLE_MAPS_URL = 'https://www.google.com/maps/place/Ha+Giang+Odyssey+Hostel,+Tours+%26+Motorbikes+Rental/@22.8093443,104.9830724,6924m/data=!3m1!1e3!4m22!1m12!3m11!1s0x36cc79e737b9cf5f:0x7a88a0de402c48b0!2sHa+Giang+Odyssey+Hostel,+Tours+%26+Motorbikes+Rental!5m2!4m1!1i2!8m2!3d22.805793!4d104.9779149!9m1!1b1!16s%2Fg%2F11t_rxn70s!3m8!1s0x36cc79e737b9cf5f:0x7a88a0de402c48b0!5m2!4m1!1i2!8m2!3d22.805793!4d104.9779149!16s%2Fg%2F11t_rxn70s?hl=vi&entry=ttu';

function Avatar({
  name, src, size = 'md', taFallback = false,
}: {
  name: string; src?: string; size?: 'sm' | 'md'; taFallback?: boolean;
}) {
  const sz = size === 'sm' ? 'h-9 w-9 text-xs' : 'h-11 w-11 text-sm';
  if (src) return <img src={src} alt={name} className={cn('rounded-full object-cover shrink-0', sz)} />;
  // TripAdvisor no-avatar: generic user icon (not another reviewer's photo)
  if (taFallback) return <TaDefaultAvatar size={size} />;
  // Google: single first-letter initial with color
  return (
    <span className={cn('inline-flex items-center justify-center rounded-full font-bold text-white shrink-0', avatarColor(name), sz)}>
      {initials(name)}
    </span>
  );
}

function TaStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-[3px]" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
          <circle cx="12" cy="12" r="12" fill={i < rating ? '#34e0a1' : '#d1d5db'} />
        </svg>
      ))}
    </div>
  );
}

function GoogleStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            fill={i < rating ? '#FBBC04' : '#E5E7EB'}
          />
        </svg>
      ))}
    </div>
  );
}

const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

// ─── Modal ────────────────────────────────────────────────────────────────────

function Modal({ open, onClose, children }: {
  open: boolean; onClose: () => void; children: React.ReactNode;
}) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog" aria-modal="true"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-ink/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            /* On mobile: full-width bottom sheet. On sm+: centered card */
            className="relative w-full sm:max-w-2xl bg-white
                       rounded-t-3xl sm:rounded-3xl
                       px-5 pt-5 pb-6 sm:p-8
                       shadow-lift
                       max-h-[90vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* drag handle on mobile */}
            <div className="sm:hidden w-10 h-1 rounded-full bg-ink/15 mx-auto mb-4 shrink-0" />
            <button
              type="button" onClick={onClose} aria-label="Close"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-ink/10 text-ink-muted hover:border-ink/30 hover:text-ink transition-colors shrink-0"
            >
              <XIcon className="h-4 w-4" aria-hidden="true" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── TripAdvisor card ─────────────────────────────────────────────────────────

const TaCard = React.memo(function TaCard({ review, onReadMore }: {
  review: TripAdvisorReview; onReadMore: (r: TripAdvisorReview) => void;
}) {
  return (
    <article className="flex h-full w-full flex-col rounded-2xl border border-ink/[0.09] bg-white p-5">
      <div className="flex items-center gap-2.5 min-w-0">
        <Avatar name={review.name} src={review.avatar} size="sm" taFallback />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-ink truncate">{review.name}</p>
          <p className="text-[11px] text-ink-muted truncate">
            {review.location ? `${review.location} · ` : ''}{review.contributions > 0 ? `${review.contributions} contributions` : ''}
          </p>
        </div>
      </div>
      <div className="mt-3"><TaStars rating={review.rating} /></div>
      <p className="mt-3 text-sm leading-relaxed text-ink/90 line-clamp-6 flex-1">{review.quote}</p>
      <button type="button" onClick={() => onReadMore(review)}
        className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#00aa6c] underline underline-offset-2 hover:text-[#007a4d] focus-visible:outline-none">
        Read more <ChevronDownIcon className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
      <a href={TA_PAGE_URL} target="_blank" rel="noopener noreferrer"
        className="mt-2 text-xs text-[#00aa6c] underline underline-offset-2 leading-snug hover:text-[#007a4d]">
        Review of: {review.reviewOf}
      </a>
      <div className="mt-3 pt-3 border-t border-ink/5 space-y-0.5 text-xs text-ink-muted">
        <p>Visited <span className="font-semibold text-ink">{review.visitedMonth}</span></p>
        <p>Traveled <span className="font-semibold text-ink">{review.travelType}</span></p>
        <p className="pt-1">Written {review.writtenDate}</p>
      </div>
    </article>
  );
});

// ─── TripAdvisor modal ────────────────────────────────────────────────────────

function TaModalContent({ review }: { review: TripAdvisorReview }) {
  return (
    <>
      <div className="flex items-center gap-3 pb-4 border-b border-ink/8 shrink-0 pr-8">
        <Avatar name={review.name} src={review.avatar} taFallback />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-ink">{review.name}</p>
          {review.contributions > 0 && <p className="text-xs text-ink-muted">{review.contributions} contributions</p>}
        </div>
      </div>
      <div className="overflow-y-auto mt-4 pr-1" style={{ scrollbarWidth: 'thin' }}>
        <TaStars rating={review.rating} />
        <h3 className="mt-2 font-semibold text-ink">{review.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink/90">{review.fullQuote}</p>
        {review.photos && review.photos.length > 0 && (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {review.photos.map((src, i) => (
              <img key={i} src={src} alt={`Photo ${i + 1}`} className="h-24 w-36 shrink-0 rounded-xl object-cover" />
            ))}
          </div>
        )}
        <div className="mt-4 pt-3 border-t border-ink/5 text-xs text-ink-muted space-y-0.5">
          <p>Visited <span className="font-semibold text-ink">{review.visitedMonth}</span> · Traveled <span className="font-semibold text-ink">{review.travelType}</span></p>
          <p>Written {review.writtenDate}</p>
        </div>
      </div>
    </>
  );
}

// ─── Google card ──────────────────────────────────────────────────────────────

const GoogleCard = React.memo(function GoogleCard({ review, onReadMore }: {
  review: GoogleReview; onReadMore: (r: GoogleReview) => void;
}) {
  return (
    <article className="flex h-full w-full flex-col rounded-2xl border border-ink/[0.09] bg-white p-5">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <Avatar name={review.name} src={review.avatar} size="sm" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink truncate">{review.name}</p>
            {review.writtenDate && <p className="text-[11px] text-ink-muted">{review.writtenDate}</p>}
          </div>
        </div>
        <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" aria-label="View on Google Maps" className="shrink-0 mt-0.5">
          <GoogleLogo />
        </a>
      </div>
      <div className="mt-3"><GoogleStars rating={review.rating} /></div>
      <p className="mt-3 text-sm leading-relaxed text-ink/90 line-clamp-6 flex-1">{review.quote}</p>
      <button type="button" onClick={() => onReadMore(review)}
        className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#4285F4] hover:underline focus-visible:outline-none">
        Read more <ChevronDownIcon className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </article>
  );
});

// ─── Google modal ─────────────────────────────────────────────────────────────

function GoogleModalContent({ review }: { review: GoogleReview }) {
  return (
    <>
      <div className="flex items-center gap-3 pb-4 border-b border-ink/8 shrink-0 pr-8">
        <Avatar name={review.name} src={review.avatar} />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-ink">{review.name}</p>
          {review.writtenDate && <p className="text-xs text-ink-muted">{review.writtenDate}</p>}
        </div>
      </div>
      <div className="overflow-y-auto mt-4 pr-1" style={{ scrollbarWidth: 'thin' }}>
        <GoogleStars rating={review.rating} />
        <p className="mt-3 text-sm leading-relaxed text-ink/90 whitespace-pre-line">{review.fullQuote}</p>
        {review.photos && review.photos.length > 0 && (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {review.photos.map((src, i) => (
              <img key={i} src={src} alt={`Photo ${i + 1}`} className="h-24 w-36 shrink-0 rounded-xl object-cover" />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

// ─── Carousel ─────────────────────────────────────────────────────────────────
// Strategy: use index-based rendering (no scroll API).
// Show `perPage` cards at a time. Arrow clicks change the index.
// Mobile=1, tablet(sm)=2, desktop(lg)=3.

function ReviewCarousel<T extends { id: string }>({
  items,
  perPage,
  renderCard,
}: {
  items: T[];
  perPage: number;    // caller passes the correct value for the current breakpoint
  renderCard: (item: T) => React.ReactNode;
}) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(items.length / perPage);

  useEffect(() => {
    if (page >= totalPages && totalPages > 0) {
      setPage(totalPages - 1);
    }
  }, [totalPages, page]);

  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  const visible = items.slice(page * perPage, page * perPage + perPage);

  const arrowCls = 'shrink-0 grid h-10 w-10 place-items-center rounded-full bg-white border border-ink/12 shadow-soft text-ink transition-colors hover:border-forest-500 hover:text-forest-500 disabled:opacity-30 disabled:pointer-events-none';

  return (
    <div>
      <div className="flex items-center gap-3">
        {/* prev */}
        <button type="button" onClick={() => setPage(p => p - 1)} disabled={!canPrev}
          aria-label="Previous" className={arrowCls}>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* cards */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-4"
              style={{ gridTemplateColumns: `repeat(${perPage}, minmax(0, 1fr))` }}
            >
              {visible.map(item => (
                <div key={item.id} className="flex">
                  {renderCard(item)}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* next */}
        <button type="button" onClick={() => setPage(p => p + 1)} disabled={!canNext}
          aria-label="Next" className={arrowCls}>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* dot indicators */}
      {totalPages > 1 && (
        <div className="mt-5 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button key={i} type="button" onClick={() => setPage(i)}
              aria-label={`Page ${i + 1}`}
              className={cn(
                'rounded-full transition-all duration-300',
                i === page ? 'w-6 h-1.5 bg-forest-500' : 'w-1.5 h-1.5 bg-ink/20 hover:bg-ink/40'
              )} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Responsive wrapper — picks perPage by viewport ──────────────────────────

function ResponsiveCarousel<T extends { id: string }>({
  items, renderCard,
}: { items: T[]; renderCard: (item: T) => React.ReactNode }) {
  const perPage = useResponsivePerPage();
  return <ReviewCarousel items={items} perPage={perPage} renderCard={renderCard} />;
}

// ─── Main section ─────────────────────────────────────────────────────────────

type Tab = 'tripadvisor' | 'google';

export function Testimonials() {
  const [tab, setTab] = useState<Tab>('tripadvisor');
  const [taModal, setTaModal] = useState<TripAdvisorReview | null>(null);
  const [gModal, setGModal] = useState<GoogleReview | null>(null);
  const reviewStats = useReviewStats();

  return (
    <Section tone="parchment" aria-labelledby="testimonials-title">
      <Container>

        <SectionHeading
          id="testimonials-title"
          eyebrow="Real Travellers · Real Reviews"
          title={<>What guests say <span className="italic text-forest-500">after the ride</span></>}
          align="center"
        />

        {/* tab switcher */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-2xl bg-white border border-ink/[0.08] p-1.5 shadow-soft">
            <button type="button" onClick={() => setTab('tripadvisor')}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300',
                tab === 'tripadvisor' ? 'bg-[#34e0a1] text-[#00393a] shadow-md' : 'text-ink-soft hover:text-ink hover:bg-parchment'
              )}>
              <img src="/tripadvisor.webp" alt="" className="h-4 w-4 object-contain" aria-hidden="true" />
              TripAdvisor
              <span className={cn('text-xs font-normal', tab === 'tripadvisor' ? 'text-[#00393a]/70' : 'text-ink-muted')}>{formatRating(reviewStats.tripadvisor.rating)} · {formatReviewCount(reviewStats.tripadvisor.count)}</span>
            </button>
            <button type="button" onClick={() => setTab('google')}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300',
                tab === 'google' ? 'bg-white shadow-md border border-ink/10 text-ink' : 'text-ink-soft hover:text-ink hover:bg-parchment'
              )}>
              <GoogleLogo />
              Google
              <span className={cn('text-xs font-normal', 'text-ink-muted')}>{formatRating(reviewStats.google.rating)} · {formatReviewCount(reviewStats.google.count)}</span>
            </button>
          </div>
        </div>

        {/* carousels */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            {tab === 'tripadvisor' ? (
              <motion.div key="ta"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
                <ResponsiveCarousel
                  items={tripAdvisorReviews}
                  renderCard={r => <TaCard review={r} onReadMore={setTaModal} />}
                />
              </motion.div>
            ) : (
              <motion.div key="google"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
                <ResponsiveCarousel
                  items={googleReviews}
                  renderCard={r => <GoogleCard review={r} onReadMore={setGModal} />}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </Container>

      <Modal open={taModal !== null} onClose={() => setTaModal(null)}>
        {taModal && <TaModalContent review={taModal} />}
      </Modal>
      <Modal open={gModal !== null} onClose={() => setGModal(null)}>
        {gModal && <GoogleModalContent review={gModal} />}
      </Modal>
    </Section>
  );
}
