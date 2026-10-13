import { useState } from 'react';
import { cn } from '../../lib/utils';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  priority?: boolean;
  sizes?: string;
  /** Shown instead when `src` is empty or fails to load. */
  fallbackSrc?: string;
}

/**
 * Lazy-loaded image with a shimmering placeholder and a soft scale/blur reveal
 * once the bitmap has decoded.
 */
export function LazyImage({
  src,
  alt,
  className,
  wrapperClassName,
  priority = false,
  sizes = '100vw',
  fallbackSrc
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const resolved = failed || !src ? fallbackSrc ?? src : src;

  return (
    <span className={cn('relative block overflow-hidden bg-parchment', wrapperClassName)}>
      {!loaded && <span aria-hidden="true" className="absolute inset-0 shimmer" />}
      <img
        src={resolved}
        alt={alt}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (fallbackSrc && !failed) setFailed(true);
        }}
        className={cn(
          'h-full w-full object-cover transition-[opacity,transform,filter] duration-[1200ms] ease-editorial',
          loaded ? 'scale-100 opacity-100 blur-0' : 'scale-105 opacity-0 blur-md',
          className
        )} />
      
    </span>);

}