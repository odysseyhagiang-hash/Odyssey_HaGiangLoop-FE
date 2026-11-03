import { useId } from 'react';
import { cn } from '../../lib/utils';

/**
 * Watercolour mist drawn with SVG noise (no image file):
 *  - a pale cream wash drifting through the upper part,
 *  - darker sepia clouds gathering along the bottom edge,
 *  - a faint paper grain over everything.
 */
export function MistBackground({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, '');
  const id = (name: string) => `${name}-${uid}`;

  return (
    <svg aria-hidden="true" className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}>
      <defs>
        {/* blotchy clouds: noise → alpha threshold, tinted */}
        <filter id={id('light')} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.0035 0.006" numOctaves="5" seed="11" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.99  0 0 0 0 0.96  0 0 0 0 0.9  2.4 0 0 0 -1.2" />
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id={id('dark')} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.005 0.009" numOctaves="6" seed="4" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.55  0 0 0 0 0.42  0 0 0 0 0.22  2.6 0 0 0 -1.3" />
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
        <filter id={id('grain')} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="2" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.4  0 0 0 0 0.3  0 0 0 0 0.15  0 0 0 0.6 -0.25" />
        </filter>

        {/* where each layer shows */}
        <linearGradient id={id('fade-light')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="0.85" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id('fade-dark')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.8" stopColor="#fff" stopOpacity="0.7" />
          <stop offset="1" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id={id('mask-light')}>
          <rect width="100%" height="100%" fill={`url(#${id('fade-light')})`} />
        </mask>
        <mask id={id('mask-dark')}>
          <rect width="100%" height="100%" fill={`url(#${id('fade-dark')})`} />
        </mask>
      </defs>

      <rect width="100%" height="100%" filter={`url(#${id('light')})`} mask={`url(#${id('mask-light')})`} opacity="0.35" />
      <rect width="100%" height="100%" filter={`url(#${id('dark')})`} mask={`url(#${id('mask-dark')})`} opacity="0.4" />
      <rect width="100%" height="100%" filter={`url(#${id('grain')})`} opacity="0.18" />
    </svg>
  );
}
