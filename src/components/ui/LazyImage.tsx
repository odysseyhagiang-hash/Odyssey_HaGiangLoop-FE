import { useState } from 'react';
import { cn } from '../../lib/utils';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  priority?: boolean;
  sizes?: string;
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
  sizes = '100vw'
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span className={cn('relative block overflow-hidden bg-parchment', wrapperClassName)}>
      {!loaded && <span aria-hidden="true" className="absolute inset-0 shimmer" />}
      <img
        src={src}
        alt={alt}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={cn(
          'h-full w-full object-cover transition-[opacity,transform,filter] duration-[1200ms] ease-editorial',
          loaded ? 'scale-100 opacity-100 blur-0' : 'scale-105 opacity-0 blur-md',
          className
        )} />
      
    </span>);

}