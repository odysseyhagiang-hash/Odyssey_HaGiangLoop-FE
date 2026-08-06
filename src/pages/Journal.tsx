import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSeo } from '../hooks/useSeo';
import { images } from '../lib/data';
import { apiGetPosts } from '../lib/api';
import { formatDate } from '../lib/utils';
import { PageHero } from '../components/layout/PageHero';
import { PostCard } from '../components/cards/PostCard';
import { LazyImage } from '../components/ui/LazyImage';
import { Reveal, Stagger } from '../components/ui/Reveal';
import { Container, Section, SectionHeading } from '../components/ui/Section';
import { CtaBanner } from '../components/sections/CtaBanner';
import { BlogPost } from '../lib/types';

export function Journal() {
  useSeo({
    title: 'Blog',
    description:
      'Field notes from our guides in Ha Giang — weather windows, packing lists, highland culture and the case for staying an extra night.',
    image: images.blogHero
  });

  const [postsList, setPostsList] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGetPosts().then((posts) => {
      setPostsList(posts);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <main id="main" className="w-full bg-canvas">
        <PageHero
          eyebrow="Blog"
          title="Field notes from the north"
          description="Written by the guides who ride these roads weekly. Practical where it needs to be, unhurried everywhere else."
          image={images.blogHero}
          imageAlt="Ha Giang Loop scenery" />
        <Section tone="canvas">
          <Container className="text-center py-20">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-forest-900 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![rect(0,0,0,0)]">Loading...</span>
            </div>
          </Container>
        </Section>
      </main>
    );
  }

  if (postsList.length === 0) {
    return (
      <main id="main" className="w-full bg-canvas">
        <PageHero
          eyebrow="Blog"
          title="Field notes from the north"
          description="Written by the guides who ride these roads weekly. Practical where it needs to be, unhurried everywhere else."
          image={images.blogHero}
          imageAlt="Ha Giang Loop scenery" />
        <Section tone="canvas">
          <Container className="text-center py-20">
            <h2 className="font-display text-2xl">No articles published yet</h2>
          </Container>
        </Section>
      </main>
    );
  }

  const [lead, ...rest] = postsList;

  return (
    <main id="main" className="w-full bg-canvas">
      <PageHero
        eyebrow="Blog"
        title="Field notes from the north"
        description="Written by the guides who ride these roads weekly. Practical where it needs to be, unhurried everywhere else."
        image={images.blogHero}
        imageAlt="Scenic mountain pass in Ha Giang Loop" />


      <Section tone="canvas">
        <Container>
          <Reveal>
            <article className="group grid gap-8 overflow-hidden rounded-5xl border border-ink/[0.07] bg-white transition-shadow duration-700 ease-editorial hover:shadow-lift lg:grid-cols-2">
              <LazyImage
                src={lead.cover}
                alt={lead.title}
                priority
                wrapperClassName="block aspect-[16/11] w-full lg:aspect-auto lg:h-full"
                className="transition-transform duration-[1600ms] ease-editorial group-hover:scale-105"
                sizes="(min-width: 1024px) 50vw, 100vw" />

              <div className="relative flex flex-col justify-center p-8 sm:p-12">
                <p className="text-[11px] uppercase tracking-widest2 text-forest-500">
                  Latest · {lead.category}
                </p>
                <h2 className="mt-5 font-display text-[1.9rem] leading-tight sm:text-[2.5rem]">
                  <Link to={`/blog/${lead.slug}`} className="after:absolute after:inset-0 after:content-['']">
                    {lead.title}
                  </Link>
                </h2>
                <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-ink-soft">{lead.excerpt}</p>
                <p className="mt-8 text-xs text-ink-muted">
                  {formatDate(lead.date)} · {lead.readingTime}
                </p>
              </div>
            </article>
          </Reveal>

          <SectionHeading className="mt-24" eyebrow="More writing" title="From the archive" />

          <Stagger className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) =>
              <PostCard key={post.slug} post={post} />
            )}
          </Stagger>
        </Container>
      </Section>

      <CtaBanner
        eyebrow="Letters"
        title="Four emails a year, no more"
        description="Season openings, weather windows and route notes. Subscribe at the bottom of any page." />

    </main>);

}