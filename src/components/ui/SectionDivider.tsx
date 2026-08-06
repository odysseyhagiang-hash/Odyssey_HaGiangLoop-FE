import { cn } from '../../lib/utils';

interface SectionDividerProps {
  /** Màu nền section phía trên */
  fromColor?: string;
  /** Màu nền section phía dưới */
  toColor?: string;
  /** Flip wave ngược lại */
  flip?: boolean;
  /** Variant: 'wave' (mặc định) | 'fade' | 'cloud' | 'mist' */
  variant?: 'wave' | 'fade' | 'cloud' | 'mist';
  className?: string;
}

export function SectionDivider({
  fromColor = '#f8f7f4',
  toColor = '#ffffff',
  flip = false,
  variant = 'wave',
  className,
}: SectionDividerProps) {
  if (variant === 'fade') {
    return (
      <div
        className={cn('h-24 w-full', className)}
        style={{
          background: `linear-gradient(to bottom, ${fromColor}, ${toColor})`,
        }}
      />
    );
  }

  if (variant === 'mist') {
    const safeColorId = toColor.replace('#', '');
    return (
      <div
        className={cn('absolute left-0 right-0 z-10 w-full overflow-visible pointer-events-none', className)}
        style={{
          bottom: '-5px',
          height: flip ? '120px' : '150px',
        }}
      >
        <svg
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          className="w-full h-full overflow-visible"
          style={{ transform: flip ? 'scaleY(-1)' : undefined }}
        >
          <defs>
            <filter id="mist-blur-filter" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="15" />
            </filter>
            <linearGradient id={`mist-grad-${safeColorId}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={toColor} stopOpacity="0" />
              <stop offset="30%" stopColor={toColor} stopOpacity="0.3" />
              <stop offset="65%" stopColor={toColor} stopOpacity="0.8" />
              <stop offset="100%" stopColor={toColor} stopOpacity="1" />
            </linearGradient>
          </defs>

          <rect x="0" y="0" width="1440" height="200" fill={`url(#mist-grad-${safeColorId})`} />

          <path
            d="M0,100 C360,50 540,150 900,80 C1260,10 1350,110 1440,90 L1440,200 L0,200 Z"
            fill={toColor}
            opacity="0.35"
            filter="url(#mist-blur-filter)"
          />

          <path
            d="M0,120 C270,70 630,160 990,110 C1260,75 1350,130 1440,120 L1440,200 L0,200 Z"
            fill={toColor}
            opacity="0.55"
            filter="url(#mist-blur-filter)"
          />

          <path
            d="M0,140 C450,100 810,180 1170,130 L1440,150 L1440,200 L0,200 Z"
            fill={toColor}
            opacity="0.8"
            filter="url(#mist-blur-filter)"
          />

          <rect x="0" y="180" width="1440" height="30" fill={toColor} />
        </svg>
      </div>
    );
  }

  if (variant === 'cloud') {
    return (
      <div className={cn('relative h-20 w-full overflow-hidden', className)}>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `linear-gradient(to bottom, ${fromColor} 0%, ${toColor} 100%)`,
          }}
        />
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ transform: flip ? 'scaleY(-1)' : undefined }}
        >
          <path
            d="M0,50 Q150,20 300,50 T600,50 T900,50 T1200,50 L1200,120 L0,120 Z"
            fill={toColor}
            opacity="0.3"
          />
          <path
            d="M0,70 Q200,40 400,70 T800,70 T1200,70 L1200,120 L0,120 Z"
            fill={toColor}
            opacity="0.5"
          />
          <path
            d="M0,90 Q250,60 500,90 T1000,90 T1200,90 L1200,120 L0,120 Z"
            fill={toColor}
          />
        </svg>
      </div>
    );
  }

  // Wave variant (default)
  return (
    <div className={cn('relative h-16 w-full', className)}>
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{ transform: flip ? 'scaleY(-1)' : undefined }}
      >
        <path
          d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"
          fill={toColor}
        />
      </svg>
    </div>
  );
}
