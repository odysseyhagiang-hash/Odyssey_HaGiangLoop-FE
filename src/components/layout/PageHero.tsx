import React from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { LazyImage } from '../ui/LazyImage';
import { Container } from '../ui/Section';
import { cn } from '../../lib/utils';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
  children?: React.ReactNode;
  className?: string;
  titleClassName?: string;
}

/** Compact editorial hero used on every interior page. */
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  children,
  className,
  titleClassName
}: PageHeroProps) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, reduceMotion ? 0 : 70]);

  return (
    <section className={cn('relative isolate flex min-h-[62vh] items-end overflow-hidden pb-16 pt-40 md:min-h-[70vh] md:pb-24', className)}>
      <motion.div style={{ y }} className="absolute inset-0 -z-10 scale-110">
        <LazyImage src={image} alt={imageAlt} priority wrapperClassName="h-full w-full" />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-900 via-forest-900/60 to-forest-900/25" />
      

      <Container>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-[11px] uppercase tracking-widest2 text-gold-300">
          
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'mt-5 max-w-4xl font-display text-[2.2rem] leading-[1.05] text-white sm:text-[3.2rem] lg:text-[4rem]',
            titleClassName
          )}>
          
          {title}
        </motion.h1>
        {description &&
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/75 sm:text-base">
          
            {description}
          </motion.p>
        }
        {children &&
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10">
          
            {children}
          </motion.div>
        }
      </Container>
    </section>);

}