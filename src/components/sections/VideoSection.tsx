import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { PlayIcon, Volume2Icon } from 'lucide-react';
import { Container, Section } from '../ui/Section';
import { Reveal } from '../ui/Reveal';
import { SectionDivider } from '../ui/SectionDivider';

/** YouTube video ID — replace with the actual ID from the video URL */
const YOUTUBE_ID = 'lh9lbSNs3c4';

export function VideoSection() {
  // 'idle'  → thumbnail shown
  // 'muted' → autoplayed muted (scroll-triggered)
  // 'sound' → user clicked, unmuted
  const [mode, setMode] = useState<'idle' | 'muted' | 'sound'>('idle');

  /* Sentinel div inside the section — triggers autoplay when 35% visible */
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sentinelRef, { once: true, amount: 0.35 });

  /* Fire muted autoplay the first time the section comes into view */
  useEffect(() => {
    if (isInView && mode === 'idle') {
      setMode('muted');
    }
  }, [isInView, mode]);

  const thumbnailUrl = `https://img.youtube.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`;

  const iframeSrc =
    mode === 'sound'
      ? `https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&mute=0&rel=0&modestbranding=1`
      : `https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=${YOUTUBE_ID}`;

  return (
    <Section
      id="video-intro"
      tone="forest"
      aria-labelledby="video-intro-title"
      /* Generous bottom padding so the mist divider flows cleanly below the video */
      className="pb-40 md:pb-52 lg:pb-60"
      style={{
        backgroundImage: "url('/backgrounds_section/background-TravelExperience.webp')",
        backgroundSize: 'auto 100%',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Sentinel — invisible, used only for IntersectionObserver via useInView */}
      <div ref={sentinelRef} aria-hidden="true" className="absolute inset-0 pointer-events-none" />

      <Container>
        {/* Heading */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] uppercase tracking-widest2 text-gold-300">
            See it for yourself
          </p>
          <h2
            id="video-intro-title"
            className="mt-5 font-display text-[2rem] leading-[1.12] text-white sm:text-[2.6rem]"
          >
            The loop, in{' '}
            <span className="italic text-gold-300">four minutes</span>
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-white/65 sm:text-base">
            Passes, canyons, homestay kitchens and the kind of light you only
            find this far north. Everything that is difficult to put into words.
          </p>
        </Reveal>

        {/* Video player */}
        <Reveal delay={0.12} className="mx-auto mt-12 max-w-4xl sm:mt-14">
          <div className="group relative overflow-hidden rounded-5xl shadow-2xl shadow-black/40">
            <div className="relative aspect-video w-full bg-forest-900">

              {/* Thumbnail — fades out once playing starts */}
              <img
                src={thumbnailUrl}
                alt="Ha Giang Loop introduction video thumbnail"
                className={`
                  absolute inset-0 h-full w-full object-cover
                  transition-opacity duration-700
                  ${mode !== 'idle' ? 'pointer-events-none opacity-0' : 'opacity-100'}
                `}
              />

              {/* Dark gradient on thumbnail */}
              {mode === 'idle' && (
                <div className="absolute inset-0 bg-gradient-to-t from-forest-900/70 via-forest-900/20 to-transparent" />
              )}

              {/* iframe — mounted once autoplay or manual play kicks in */}
              {mode !== 'idle' && (
                <iframe
                  key={mode}
                  className="absolute inset-0 h-full w-full"
                  src={iframeSrc}
                  title="Introduce Ha Giang Loop with Odyssey"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}

              {/* "Tap to unmute" pill — shown while autoplaying muted */}
              {mode === 'muted' && (
                <div className="absolute bottom-5 left-5">
                  <button
                    onClick={() => setMode('sound')}
                    aria-label="Play video with sound"
                    className="
                      flex items-center gap-2
                      rounded-full border border-white/30
                      bg-black/50 backdrop-blur-sm
                      px-4 py-2
                      text-[12px] text-white/85
                      transition-colors duration-200
                      hover:bg-white/20 hover:text-white
                    "
                  >
                    <Volume2Icon aria-hidden="true" className="h-3.5 w-3.5" />
                    Tap to unmute
                  </button>
                </div>
              )}

              {/* Manual play button — only on idle */}
              {mode === 'idle' && (
                <button
                  onClick={() => setMode('sound')}
                  aria-label="Play Ha Giang Loop introduction video"
                  className="
                    absolute inset-0 flex items-center justify-center
                    focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-gold-300 focus-visible:ring-offset-2
                    focus-visible:ring-offset-forest-900
                  "
                >
                  <motion.span
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="
                      flex h-20 w-20 items-center justify-center
                      rounded-full
                      border-2 border-white/30
                      bg-white/15 backdrop-blur-sm
                      text-white shadow-xl
                      transition-colors duration-300
                      hover:bg-white/25 hover:border-white/50
                      sm:h-24 sm:w-24
                    "
                  >
                    <PlayIcon
                      aria-hidden="true"
                      className="h-8 w-8 translate-x-0.5 sm:h-10 sm:w-10"
                      fill="currentColor"
                      stroke="none"
                    />
                  </motion.span>
                </button>
              )}

            </div>
          </div>
        </Reveal>
      </Container>

      <SectionDivider variant="mist" toColor="#FAFAF8" />
    </Section>
  );
}
