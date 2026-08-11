import React from 'react';
import { cn } from '../../lib/utils';
import { Reveal } from './Reveal';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: 'canvas' | 'parchment' | 'forest' | 'transparent';
  'aria-labelledby'?: string;
  style?: React.CSSProperties;
}

const tones: Record<NonNullable<SectionProps['tone']>, string> = {
  canvas: 'bg-canvas',
  parchment: 'bg-parchment texture-grain',
  forest: 'bg-forest-900 text-white',
  transparent: ''
};

export function Section({ children, className, id, tone = 'canvas', style, ...rest }: SectionProps) {
  return (
    <section
      id={id}
      style={style}
      className={cn(
        'relative w-full py-10 md:py-14 lg:py-18',
        tones[tone],
        className
      )}
      {...rest}>
      
      {children}
    </section>);

}

export function Container({
  children,
  className



}: {children: React.ReactNode;className?: string;}) {
  return <div className={cn('mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10', className)}>{children}</div>;
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
  inverted?: boolean;
  id?: string;
  className?: string;
  action?: React.ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  inverted = false,
  id,
  className,
  action
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-6 md:flex-row md:items-end md:justify-between',
        align === 'center' && 'md:flex-col md:items-center md:justify-center',
        className
      )}>
      
      <Reveal className={cn('max-w-2xl', align === 'center' && 'text-center')}>
        {eyebrow &&
        <p
          className={cn(
            'mb-5 text-[11px] font-medium uppercase tracking-widest2',
            inverted ? 'text-gold-300' : 'text-forest-500'
          )}>
          
            {eyebrow}
          </p>
        }
        <h2
          id={id}
          className={cn(
            'font-display text-[2rem] leading-[1.12] tracking-[-0.01em] sm:text-[2.6rem] lg:text-[3.1rem]',
            inverted ? 'text-white' : 'text-ink'
          )}>
          
          {title}
        </h2>
        {description &&
        <p
          className={cn(
            'mt-6 max-w-xl text-[15px] leading-relaxed sm:text-base',
            align === 'center' && 'mx-auto',
            inverted ? 'text-white/70' : 'text-ink-soft'
          )}>
          
            {description}
          </p>
        }
      </Reveal>
      {action && <Reveal delay={0.12}>{action}</Reveal>}
    </div>);

}