/**
 * Scroll / reveal effects for the Luxury Tour page, modelled on the reference
 * product page (GSAP SplitText ripple, data-parallax, data-img-clip, Lenis).
 */
import { useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties, ElementType, ReactNode } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils';

const EASE_OUT_3: [number, number, number, number] = [0.33, 1, 0.68, 1];
const STAGGER = 0.05; // 50ms between items, like the reference
const DURATION = 0.5;

// ─── Ripple text ──────────────────────────────────────────────────────────────

interface RippleTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
  /** chars (default) or lines */
  type?: 'chars' | 'lines';
  /** where the stagger starts */
  from?: 'first' | 'center';
}

/**
 * Splits text and lets each piece rise out of a clip mask
 * (opacity 0 → 1, translateY 105% → 0, 500ms, ease-out, 50ms stagger)
 * once the element reaches 82% of the viewport height.
 */
export function RippleText({ text, as: Tag = 'span', className, id, type = 'chars', from = 'first' }: RippleTextProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -18% 0px' });
  const reduce = useReducedMotion();
  const [lineOf, setLineOf] = useState<number[] | null>(null);

  const words = text.split(/\s+/).filter(Boolean);

  // For "lines": group words by their rendered line (offsetTop) before animating
  useLayoutEffect(() => {
    if (type !== 'lines' || !ref.current) return;
    const spans = Array.from(ref.current.querySelectorAll<HTMLElement>('[data-word]'));
    const tops: number[] = [];
    setLineOf(
      spans.map((s) => {
        const top = s.offsetTop;
        let idx = tops.findIndex((t) => Math.abs(t - top) < 4);
        if (idx === -1) {
          tops.push(top);
          idx = tops.length - 1;
        }
        return idx;
      })
    );
  }, [type, text]);

  if (reduce) {
    return <Tag id={id} className={className}>{text}</Tag>;
  }

  const chars = words.join(' ').replace(/\s/g, '').length;
  const centre = (chars - 1) / 2;
  const delayFor = (i: number) => (from === 'center' ? Math.abs(i - centre) : i) * STAGGER;

  const piece = (content: string, delay: number, key: string | number, extra?: CSSProperties) => (
    <span key={key} className="inline-block overflow-clip pb-[0.08em] align-bottom" style={extra}>
      <motion.span
        className="inline-block will-change-transform"
        initial={{ opacity: 0, y: '105%' }}
        animate={inView ? { opacity: 1, y: '0%' } : undefined}
        transition={{ duration: DURATION, ease: EASE_OUT_3, delay }}
      >
        {content}
      </motion.span>
    </span>
  );

  let charIndex = 0;

  return (
    <Tag ref={ref} id={id} className={className} aria-label={text}>
      <span aria-hidden="true">
        {words.map((w, wi) => {
          const space = wi < words.length - 1 ? ' ' : '';
          if (type === 'lines') {
            const line = lineOf?.[wi] ?? 0;
            return (
              <span key={wi} data-word>
                {piece(w, line * STAGGER, wi)}
                {space}
              </span>
            );
          }
          return (
            <span key={wi} className="inline-block whitespace-nowrap">
              {Array.from(w).map((c, ci) => piece(c, delayFor(charIndex++), `${wi}-${ci}`))}
              {space && <span className="inline-block">&nbsp;</span>}
            </span>
          );
        })}
      </span>
    </Tag>
  );
}

// ─── Parallax (+ optional clip reveal) ────────────────────────────────────────

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** image travel in %, reference default is 10 */
  amount?: number;
  /** reveal with clip-path inset(100% 0 0) → inset(0) while entering */
  clip?: boolean;
}

/**
 * Wraps an image: the inner layer is taller than the frame and drifts
 * from -amount% to +amount% while the frame crosses the viewport.
 */
export function Parallax({ children, className, amount = 10, clip = false }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-amount}%`, `${amount}%`]);
  const clipPath = useTransform(enter, [0, 1], ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)']);
  const pad = amount + 5;

  return (
    <motion.div
      ref={ref}
      className={cn('relative overflow-hidden', className)}
      style={clip && !reduce ? { clipPath } : undefined}
    >
      <motion.div
        className="absolute inset-x-0"
        style={reduce ? { top: 0, bottom: 0 } : { top: `${-pad}%`, height: `${100 + pad * 2}%`, y }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
