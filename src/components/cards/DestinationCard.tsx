import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRightIcon, MountainIcon } from 'lucide-react';
import type { Destination } from '../../lib/types';
import { cn } from '../../lib/utils';
import { LazyImage } from '../ui/LazyImage';
import { staggerItem } from '../ui/Reveal';

interface DestinationCardProps {
  destination: Destination;
  className?: string;
}

export function DestinationCard({ destination, className }: DestinationCardProps) {
  return (
    <motion.article
      variants={staggerItem}
      className={cn(
        'group relative isolate flex min-h-[420px] flex-col justify-end overflow-hidden rounded-4xl transition-transform duration-700 ease-editorial hover:-translate-y-2',
        className
      )}>
      
      <LazyImage
        src={destination.image}
        alt={`${destination.name}, ${destination.region}`}
        wrapperClassName="absolute inset-0 -z-10 h-full w-full"
        className="transition-transform duration-[1600ms] ease-editorial group-hover:scale-110"
        sizes="(min-width: 1024px) 33vw, 100vw" />
      
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-900/90 via-forest-900/25 to-transparent" />
      

      <div className="p-7">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-gold-300">
          <MountainIcon aria-hidden="true" className="h-3.5 w-3.5" />
          {destination.region}
        </div>
        <h3 className="mt-3 font-display text-2xl text-white sm:text-[1.75rem]">
          <Link to={`/destinations/${destination.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {destination.name}
          </Link>
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">{destination.blurb}</p>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/15 pt-5">
          <p className="text-[11px] uppercase tracking-[0.16em] text-white/55">
            Best · {destination.bestSeason}
          </p>
          <span className="grid h-10 w-10 place-items-center rounded-full border border-white/25 text-white transition-all duration-500 ease-editorial group-hover:border-gold-300 group-hover:bg-gold-400 group-hover:text-forest-900">
            <ArrowUpRightIcon aria-hidden="true" className="h-4 w-4" />
          </span>
        </div>
      </div>
    </motion.article>);

}