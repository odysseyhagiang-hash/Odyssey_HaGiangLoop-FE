import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useSeo } from '../hooks/useSeo';
import { apiGetPostBySlug, apiGetPosts } from '../lib/api';
import { formatDate } from '../lib/utils';
import { PageHero } from '../components/layout/PageHero';
import { PostCard } from '../components/cards/PostCard';
import { Reveal, Stagger } from '../components/ui/Reveal';
import { Container, Section, SectionHeading } from '../components/ui/Section';
import { NotFound } from './NotFound';
import { BlogPost } from '../lib/types';

/** Nếu body chứa markdown (## headings, **bold**, v.v.) → join và render qua ReactMarkdown.
 *  Ngược lại render như plain paragraphs như cũ. */
function isMarkdownBody(body: string[]): boolean {
  return body.some((p) => /^#{1,3}\s|^\*\*|^-\s|\[.+\]\(/.test(p));
}

export function JournalPost() {
  const { slug } = useParams<{ slug: string; }>();
  const [post, setPost] = useState<BlogPost | undefined>(undefined);
  const [postsList, setPostsList] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    Promise.all([apiGetPostBySlug(slug), apiGetPosts()]).then(([foundPost, allPosts]) => {
      setPost(foundPost);
      setPostsList(allPosts);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, [slug]);

  useSeo({
    title: post ? post.title : 'Article not found',
    description: post ? post.excerpt : 'This article could not be found.',
    image: post?.cover,
    type: 'article'
  });

  if (loading) {
    return (
      <main id="main" className="w-full bg-canvas animate-pulse">
        <Section tone="canvas">
          <Container className="text-center py-40">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-forest-900 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![rect(0,0,0,0)]">Loading article...</span>
            </div>
          </Container>
        </Section>
      </main>
    );
  }

  if (!post) return <NotFound />;

  const related = postsList.filter((item) => item.slug !== post.slug).slice(0, 3);
  const useMarkdown = isMarkdownBody(post.body);

  return (
    <main id="main" className="w-full bg-canvas">
      <PageHero
        eyebrow={`${post.category} · ${post.readingTime}`}
        title={post.title}
        description={post.excerpt}
        image={post.cover}
        imageAlt={post.title} />

      <Section tone="canvas">
        <Container className="max-w-[760px]">
          <Reveal>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-forest-500">
              <ArrowLeftIcon aria-hidden="true" className="h-4 w-4" />
              All blog posts
            </Link>

            <p className="mt-8 border-b border-ink/10 pb-8 text-xs uppercase tracking-[0.16em] text-ink-muted">
              Published on {formatDate(post.date)}
            </p>
          </Reveal>

          {useMarkdown ? (
            <Reveal className="mt-10">
              <ReactMarkdown
                components={{
                  h2: ({ children }) => (
                    <h2 className="mt-12 mb-4 font-display text-[1.5rem] leading-snug text-ink sm:text-[1.8rem]">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="mt-8 mb-3 font-display text-xl leading-snug text-ink">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-6 text-[16px] leading-[1.9] text-ink-soft">{children}</p>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-ink">{children}</strong>
                  ),
                  ul: ({ children }) => (
                    <ul className="mb-6 space-y-2 pl-5">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="mb-6 space-y-2 pl-5 list-decimal">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-[15px] leading-relaxed text-ink-soft before:mr-2 before:text-forest-500 before:content-['–']">
                      {children}
                    </li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="my-8 border-l-2 border-gold-300 pl-6 font-display text-xl italic text-ink/70">
                      {children}
                    </blockquote>
                  ),
                  hr: () => (
                    <hr className="my-10 border-ink/10" />
                  ),
                  a: ({ href, children }) => (
                    <a href={href} className="text-forest-500 underline underline-offset-2 transition-colors hover:text-forest-700">
                      {children}
                    </a>
                  ),
                }}
              >
                {post.body.join('\n\n')}
              </ReactMarkdown>
            </Reveal>
          ) : (
            <div className="mt-10 space-y-7">
              {post.body.map((paragraph, index) => (
                <Reveal key={index} delay={index * 0.04}>
                  <p
                    className={
                      index === 0
                        ? 'font-display text-xl leading-[1.65] text-ink sm:text-[1.5rem]'
                        : 'text-[16px] leading-[1.9] text-ink-soft'
                    }>
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          )}


        </Container>
      </Section>

      <Section tone="parchment">
        <Container>
          <SectionHeading eyebrow="Keep reading" title="More from the blog" />
          <Stagger className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <PostCard key={item.slug} post={item} />
            ))}
          </Stagger>
        </Container>
      </Section>
    </main>
  );
}