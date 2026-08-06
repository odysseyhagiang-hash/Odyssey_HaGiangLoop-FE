import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

type Variant = 'primary' | 'gold' | 'outline' | 'ghost' | 'glass';
type Size = 'sm' | 'md' | 'lg';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsButton extends BaseProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> {
  to?: undefined;
  href?: undefined;
}

interface ButtonAsLink extends BaseProps {
  to: string;
  href?: undefined;
  'aria-label'?: string;
}

interface ButtonAsAnchor extends BaseProps {
  href: string;
  to?: undefined;
  'aria-label'?: string;
}

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

const variants: Record<Variant, string> = {
  primary: 'bg-forest-500 text-white hover:bg-forest-600 shadow-soft',
  gold: 'bg-gold-400 text-forest-900 hover:bg-gold-300 shadow-soft',
  outline: 'border border-forest-500/30 text-forest-700 hover:border-forest-500 hover:bg-forest-50',
  ghost: 'text-ink hover:bg-ink/5',
  glass: 'glass-panel text-white border border-white/30 hover:bg-white/25'
};

const sizes: Record<Size, string> = {
  sm: 'h-10 px-5 text-[13px]',
  md: 'h-12 px-7 text-sm',
  lg: 'h-14 px-9 text-sm'
};

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children, ...rest } = props as BaseProps &
  Record<string, unknown>;
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const counter = useRef(0);

  const addRipple = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const id = counter.current++;
    setRipples((prev) => [...prev, { id, x: event.clientX - rect.left, y: event.clientY - rect.top }]);
    window.setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 650);
  }, []);

  const classes = cn(
    'group relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-wide',
    'transition-all duration-500 ease-editorial active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    sizes[size],
    className
  );

  const inner =
  <>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      {ripples.map((ripple) =>
    <span
      key={ripple.id}
      aria-hidden="true"
      className="pointer-events-none absolute z-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/25 opacity-0"
      style={{
        left: ripple.x,
        top: ripple.y,
        animation: 'ripple-out 600ms cubic-bezier(0.22, 1, 0.36, 1) forwards'
      }} />

    )}
      <style>{`@keyframes ripple-out{0%{transform:translate(-50%,-50%) scale(0);opacity:.55}100%{transform:translate(-50%,-50%) scale(1);opacity:0}}`}</style>
    </>;


  if ('to' in props && props.to) {
    const { to, ...linkRest } = rest as {to: string;};
    return (
      <Link to={to} className={classes} onPointerDown={addRipple} {...linkRest as object}>
        {inner}
      </Link>);

  }

  if ('href' in props && props.href) {
    const { href, ...anchorRest } = rest as {href: string;};
    return (
      <a href={href} className={classes} onPointerDown={addRipple} {...anchorRest as object}>
        {inner}
      </a>);

  }

  return (
    <button
      type="button"
      className={classes}
      onPointerDown={addRipple}
      {...rest as React.ButtonHTMLAttributes<HTMLButtonElement>}>
      
      {inner}
    </button>);

}