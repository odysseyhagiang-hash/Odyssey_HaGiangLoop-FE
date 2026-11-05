import { useEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { PlayIcon, Star } from "lucide-react";
import { GOOGLE_MAPS_URL, TA_PAGE_URL } from "./Testimonials";
import { heroVideo, images } from "../../lib/data";
import { VideoBackground } from "../ui/VideoBackground";
import { Button } from "../ui/Button";
import { Container } from "../ui/Section";
import { SectionDivider } from "../ui/SectionDivider";
import { formatRating, formatReviewCount, useReviewStats } from "../../hooks/useReviewStats";

const ease = [0.22, 1, 0.36, 1] as const;


const routePath =
  "M0 40 C 45 40, 60 6, 110 6 S 170 66, 225 58 S 280 8, 335 20 S 390 70, 445 48 S 515 10, 560 28";

function MotorbikeIcon() {
  return (
    <g transform="translate(-10,-10)">
      <circle cx="4" cy="14" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="18" cy="14" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M4 14 L8 8 H14 L18 14 M8 8 L11 3 H14 M14 8 L18 14"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </g>
  );
}

export function Hero() {
  const reviewStats = useReviewStats();
  const reviewBadges = [
    { label: "Google", rating: formatRating(reviewStats.google.rating), count: `${formatReviewCount(reviewStats.google.count)}+`, href: GOOGLE_MAPS_URL },
    { label: "TripAdvisor", rating: formatRating(reviewStats.tripadvisor.rating), count: `${formatReviewCount(reviewStats.tripadvisor.count)}+`, href: TA_PAGE_URL },
  ];
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const overlayOpacity = useTransform(scrollY, [0, 500], [1, 0.7]);
  const playing = !reduceMotion;
  const routeDuration = reduceMotion ? 0 : 1.2;
  const pathRef = useRef<SVGPathElement>(null);
  const bikeRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const path = pathRef.current;
    const bike = bikeRef.current;
    if (!path || !bike) return;

    const total = path.getTotalLength();
    let start: number | null = null;
    let raf: number;
    const duration = 5000;

    const animate = (time: number) => {
      if (!start) start = time;
      const progress = ((time - start) % duration) / duration;
      const current = path.getPointAtLength(progress * total);
      const next = path.getPointAtLength(Math.min(progress * total + 1, total));
      const angle = (Math.atan2(next.y - current.y, next.x - current.x) * 180) / Math.PI;
      bike.setAttribute("transform", `translate(${current.x},${current.y}) rotate(${angle})`);
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion]);

  return (
    <section className="relative isolate z-10 flex min-h-[100svh] w-full flex-col justify-between overflow-hidden">
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <motion.div className="h-full w-full scale-105">
          <VideoBackground
            src={heroVideo}
            poster={images.hero}
            posterAlt="Aerial view of a winding mountain road threading between limestone karst peaks at golden hour"
            playing={playing}
          />
        </motion.div>
      </div>

      <motion.div
        aria-hidden="true"
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-900 via-forest-900/50 to-forest-900/30"
      />

      {/* Stamp toạ độ — góc trên phải, chỉ desktop */}
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.9, ease }}
        className="absolute right-6 top-28 z-10 hidden flex-col items-end gap-1 text-right text-white/60 lg:flex"
      >
        <span className="font-mono text-[11px] tracking-wider">23°16&apos;N&nbsp;&nbsp;104°59&apos;E</span>
        <span className="font-mono text-[11px] tracking-wider">ĐÈO MÃ PÍ LÈNG · 1.500M</span>
      </motion.div>

      <div className="relative z-20 flex flex-1 flex-col justify-center pt-28 pb-32 sm:pt-32 sm:pb-36 lg:pt-36 lg:pb-40">
        <motion.div>
          <Container className="text-center lg:text-left">

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
              className="text-[11px] uppercase tracking-widest2 text-gold-300"
            >
              Northern Vietnam · Small group & private
            </motion.p>

            {/*
              Wrapper dùng inline-flex để tự co lại đúng bằng nội dung.
              - mobile/tablet: mx-auto để căn giữa
              - desktop: mx-0 để căn trái
              SVG bên trong dùng w-full → tự khớp chiều rộng wrapper = chiều rộng text
            */}
            <div className="mt-4 sm:mt-6 inline-flex flex-col items-stretch mx-auto lg:mx-0 lg:items-start">
              <h1
                className="
                  font-display leading-[1.06] text-white
                  text-[2.1rem] sm:text-[3.2rem] md:text-[3.8rem]
                  lg:text-[4.6rem] xl:text-[5.2rem] 2xl:text-[5.6rem]
                  text-center lg:text-left
                "
              >
                <motion.span
                  className="block pb-[0.12em]"
                  initial={{ opacity: 0, y: 44 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.1, ease }}
                >
                  ODYSSEY HA GIANG
                </motion.span>
                {["Stay for the night.", "Leave with a story"].map((line, index) => (
                  <motion.span
                    key={line}
                    className="block italic text-gold-300"
                    initial={{ opacity: 0, y: 44 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 + index * 0.1, ease }}
                  >
                    {line}
                  </motion.span>
                ))}
              </h1>

              {/* SVG w-full → khớp đúng chiều rộng wrapper = heading */}
              <motion.svg
                viewBox="0 0 560 80"
                preserveAspectRatio="none"
                className="mt-4 sm:mt-5 lg:mt-6 h-10 sm:h-10 lg:h-11 w-full text-gold-300/80"
                fill="none"
                aria-hidden="true"
              >
                <motion.path
                  d={routePath}
                  ref={pathRef}
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: routeDuration, delay: 0.5, ease: "easeInOut" }}
                />
                {!reduceMotion && (
                  <g ref={bikeRef} className="text-white">
                    <MotorbikeIcon />
                  </g>
                )}
              </motion.svg>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease }}
              className="
                mx-auto mt-4 sm:mt-5 lg:mt-6 lg:mx-0
                max-w-md
                text-center lg:text-left
                text-sm sm:text-base leading-relaxed text-white/75
              "
            >
              More than just a place to stop, Odyssey is where your journey
              begins, where unforgettable experiences unfold and the pristine
              beauty of Ha Giang becomes a lifelong memory.
            </motion.p>

            {/* Review badges: Google + TripAdvisor */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.65, ease }}
              className="mt-7 sm:mt-8 lg:mt-10 flex flex-wrap justify-center gap-3 lg:justify-start"
            >
              {reviewBadges.map((badge) => (
                <a
                  key={badge.label}
                  href={badge.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Rated ${badge.rating} from ${badge.count} ${badge.label} reviews`}
                  className="
                    inline-flex items-center gap-3 rounded-full
                    border border-white/15 bg-black/40 backdrop-blur-md
                    px-4 py-2 sm:px-5 sm:py-2.5
                    transition-colors hover:border-gold-300/50 hover:bg-black/50
                  "
                >
                  <span className="flex items-center gap-0.5" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-gold-300 text-gold-300 sm:h-4 sm:w-4" />
                    ))}
                  </span>
                  <span className="text-sm font-semibold text-white sm:text-base">{badge.rating}</span>
                  <span aria-hidden="true" className="h-4 w-px bg-white/25" />
                  <span className="text-sm text-white/85 underline decoration-white/40 underline-offset-4 sm:text-base">
                    {badge.count} {badge.label} reviews
                  </span>
                </a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.75, ease }}
              className="
                mt-6 sm:mt-7
                flex flex-col items-center gap-3
                sm:flex-row sm:justify-center
                lg:justify-start
              "
            >
              <Button to="/contact?topic=book-private-tour" size="lg" variant="gold">
                BOOK TOUR NOW
              </Button>
              <Button to="/rentalbikes" size="lg" variant="glass">
                <PlayIcon aria-hidden="true" className="h-4 w-4" />
                GET A MOTORBIKE
              </Button>
            </motion.div>

          </Container>
        </motion.div>
      </div>
      <SectionDivider variant="mist" toColor="#FAFAF8" />
    </section>
  );
}
