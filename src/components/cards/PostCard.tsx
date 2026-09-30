import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { BlogPost } from '../../lib/types';
import { formatDate } from '../../lib/utils';
import { LazyImage } from '../ui/LazyImage';
import { staggerItem } from '../ui/Reveal';

export function PostCard({ post }: {post: BlogPost;}) {
  return (
    <motion.article
      variants={staggerItem}
      className="group relative flex h-full flex-col overflow-hidden rounded-4xl border border-ink/[0.07] bg-white transition-all duration-700 ease-editorial hover:-translate-y-2 hover:shadow-lift">
      
      <LazyImage
        src={post.cover}
        alt={post.title}
        wrapperClassName="block aspect-[16/10] w-full"
        className="transition-transform duration-[1400ms] ease-editorial group-hover:scale-105"
        sizes="(min-width: 1024px) 33vw, 100vw" />
      
      <div className="flex flex-1 flex-col p-7">
        <p className="text-[11px] uppercase tracking-[0.18em] text-forest-500">{post.category}</p>
        <h3 className="mt-3 font-display text-xl leading-snug sm:text-2xl">
          <Link to={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">{post.excerpt}</p>
        <p className="mt-auto pt-7 text-xs text-ink-muted">
          {formatDate(post.date)} · {post.readingTime}
        </p>
      </div>
    </motion.article>);

}