import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  tone?: 'forest' | 'gold' | 'neutral' | 'light';
  className?: string;
}

const tones: Record<NonNullable<BadgeProps['tone']>, string> = {
  forest: 'bg-forest-50 text-forest-700 border-forest-500/15',
  gold: 'bg-gold-50 text-gold-700 border-gold-400/30',
  neutral: 'bg-ink/[0.04] text-ink-soft border-ink/10',
  light: 'glass-panel text-white border-white/30'
};

export function Badge({ children, tone = 'forest', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em]',
        tones[tone],
        className
      )}>
      
      {children}
    </span>);

}