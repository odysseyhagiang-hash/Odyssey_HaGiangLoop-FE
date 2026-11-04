import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useSeo } from '../hooks/useSeo';
import { images } from '../lib/data';
import { cn } from '../lib/utils';
import { PageHero } from '../components/layout/PageHero';
import { LazyImage } from '../components/ui/LazyImage';
import { Reveal, Stagger, staggerItem } from '../components/ui/Reveal';
import { Container, Section, SectionHeading } from '../components/ui/Section';
import { CtaBanner } from '../components/sections/CtaBanner';

const values = [
  {
    title: 'Pay properly, all year',
    text: 'Our guides are on annual salaries, not per-trip fees, so nobody has to push a group through weather they should sit out.'
  },
  {
    title: 'Stay smaller than we could',
    text: 'We cap group departures at eight and turn away roughly a third of the enquiries we receive in peak season.'
  },
  {
    title: 'Leave the road better',
    text: 'A percentage of every booking funds road-side waste collection and the school transport fund in two communes.'
  }];


const timeline = [
  {
    year: '2023',
    title: 'The birth of Odyssey',
    text: 'Duc and Linh officially launch Odyssey in June, turning years of dreams into reality on the Ha Giang roads.'
  },
  {
    year: '2024',
    title: 'Community partnerships',
    text: 'Partnering with the first local families to upgrade homestay rooms and securing a fleet of safety-tested bikes.'
  },
  {
    year: '2025',
    title: 'A growing family',
    text: 'Welcoming more dedicated local guides and hosts who share our vision of honest, ethical travel.'
  },
  {
    year: '2026',
    title: 'Deliberately small',
    text: 'Growing our presence across the province while keeping our group size strictly capped at eight travelers.'
  }
];

const differentiators = [
  {
    title: 'Our People',
    desc: 'Attentive, experienced local guides and drivers who care for you like family.'
  },
  {
    title: 'Quality Motorcycles',
    desc: 'Powerful 150cc bikes, regularly inspected and meticulously maintained before every departure.'
  },
  {
    title: 'Premium Protective Gear',
    desc: 'Fully provided top-tier body protective guards to keep you safe on the road.'
  },
  {
    title: 'High-Quality Helmets',
    desc: 'Comfortable, safety-certified helmets that fit securely for maximum protection.'
  }
];

const galleryImages = [
  {
    id: 'g1',
    src: '/Aboutpic/1785766572904_7647185241213986356_7647185241213986356_82225e506f616a5854379925f064efa3.webp',
    alt: 'Travellers taking a break and looking at the scenic valley in Ha Giang',
    caption: 'Scenic rest stop on the loop',
    span: 'square'
  },
  {
    id: 'g2',
    src: '/Aboutpic/1785766572897_7647185241213986356_7647185241213986356_0ab02287220381ef80d916e698d93ac7.webp',
    alt: 'Winding road through rocky limestone karsts in northern Vietnam',
    caption: 'Winding mountain pass roads',
    span: 'wide'
  },
  {
    id: 'g3',
    src: '/Aboutpic/1785766572884_7647185241213986356_7647185241213986356_95bcbda3a0083d54af810a1860bbba60.webp',
    alt: 'Group of riders navigating the high mountain passes in Ha Giang',
    caption: 'Riders conquering the heights',
    span: 'square'
  },
  {
    id: 'g4',
    src: '/Aboutpic/1785766572877_7647185241213986356_7647185241213986356_ac70c9d9e27e171a82a6d051dc9913b4.webp',
    alt: 'Local guide standing beside a motorcycle overlooking the deep canyons',
    caption: 'Stunning canyon view overlooking the river',
    span: 'tall'
  },
  {
    id: 'g5',
    src: '/Aboutpic/1785766572787_7647185241213986356_7647185241213986356_ea726a5f8a4dcd38a36ba53fa6720c99.webp',
    alt: 'Scenic overlook of lush green valleys and towering karst peaks',
    caption: 'Lush highland vistas',
    span: 'square'
  },
  {
    id: 'g6',
    src: '/Aboutpic/1785766572850_7647185241213986356_7647185241213986356_dfdebb517141da2d4a3c0f5c226bb1bb.webp',
    alt: 'Rustic homestay in a quiet valley surrounded by mountains',
    caption: 'Cosy local homestay stay',
    span: 'square'
  },
  {
    id: 'g7',
    src: '/Aboutpic/1785766572861_7647185241213986356_7647185241213986356_ceedcb9da07284e2181f8119c9ca2609.webp',
    alt: 'Motorcycles parked along the scenic cliffs of the Ma Pi Leng pass',
    caption: 'Motorcycles parked on the pass edge',
    span: 'wide'
  },
  {
    id: 'g8',
    src: '/Aboutpic/1785766572870_7647185241213986356_7647185241213986356_33aa8c4c45235ab2c12729102ac02895.webp',
    alt: 'Close-up of traditional woven fabric and local garments',
    caption: 'Traditional ethnic weaving texture',
    span: 'square'
  },
  {
    id: 'g9',
    src: '/Aboutpic/1785766572839_7647185241213986356_7647185241213986356_9c61e2755fa6890b28f23d85818785b6.webp',
    alt: 'Clear emerald river water cutting through steep limestone cliffs',
    caption: 'Turquoise water of the canyon river',
    span: 'square'
  },
  {
    id: 'g12',
    src: '/gallery/g14.webp',
    alt: 'A group of travellers posing beside a Vietnamese flag above a winding mountain road',
    caption: 'Group stop at the flag viewpoint',
    span: 'square'
  },
  {
    id: 'g10',
    src: '/Aboutpic/1785766572825_7647185241213986356_7647185241213986356_eb0dc5e9ef27a6a1f965570b1c5de9e3.webp',
    alt: 'Spectacular sunset over the mountains of Ha Giang',
    caption: 'Golden mountain sunset',
    span: 'wide'
  },
  {
    id: 'g11',
    src: '/gallery/g17.webp',
    alt: 'Travellers with a crowd of smiling children outside a wooden village school',
    caption: 'Visiting the village school',
    span: 'square'
  }
];

const itemStyles = [
  // Block 1 (4 images)
  { span: 'sm:col-span-2 aspect-[16/10]', sizes: '(min-width: 1024px) 66vw, 100vw' },
  { span: 'sm:col-span-1 sm:row-span-2 sm:aspect-auto aspect-[16/10]', sizes: '(min-width: 1024px) 33vw, 100vw' },
  { span: 'sm:col-span-1 aspect-[16/10]', sizes: '(min-width: 1024px) 33vw, 100vw' },
  { span: 'sm:col-span-1 aspect-[16/10]', sizes: '(min-width: 1024px) 33vw, 100vw' },

  // Block 2 (4 images)
  { span: 'sm:col-span-1 sm:row-span-2 sm:aspect-auto aspect-[16/10]', sizes: '(min-width: 1024px) 33vw, 100vw' },
  { span: 'sm:col-span-2 aspect-[16/10]', sizes: '(min-width: 1024px) 66vw, 100vw' },
  { span: 'sm:col-span-1 aspect-[16/10]', sizes: '(min-width: 1024px) 33vw, 100vw' },
  { span: 'sm:col-span-1 aspect-[16/10]', sizes: '(min-width: 1024px) 33vw, 100vw' },

  // Block 3 (4 images): same pattern as block 1, fully filled
  { span: 'sm:col-span-2 aspect-[16/10]', sizes: '(min-width: 1024px) 66vw, 100vw' },
  { span: 'sm:col-span-1 sm:row-span-2 sm:aspect-auto aspect-[16/10]', sizes: '(min-width: 1024px) 33vw, 100vw' },
  { span: 'sm:col-span-1 aspect-[16/10]', sizes: '(min-width: 1024px) 33vw, 100vw' },
  { span: 'sm:col-span-1 aspect-[16/10]', sizes: '(min-width: 1024px) 33vw, 100vw' }
];

export function About() {
  useSeo({
    title: 'About',
    description:
      'A small, locally owned operator in Ha Giang province — eleven years of guiding, salaried local guides, and 82% of every trip budget spent inside the province.',
    image: images.village
  });

  const [activePhoto, setActivePhoto] = useState<{ id: string; src: string; alt: string; caption: string } | null>(null);

  const activeIdx = activePhoto ? galleryImages.findIndex((img) => img.id === activePhoto.id) : -1;

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeIdx > 0) {
      setActivePhoto(galleryImages[activeIdx - 1]);
    } else {
      setActivePhoto(galleryImages[galleryImages.length - 1]);
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeIdx < galleryImages.length - 1) {
      setActivePhoto(galleryImages[activeIdx + 1]);
    } else {
      setActivePhoto(galleryImages[0]);
    }
  };

  useEffect(() => {
    if (!activePhoto) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActivePhoto(null);
      if (event.key === 'ArrowLeft') {
        const idx = galleryImages.findIndex((img) => img.id === activePhoto.id);
        if (idx > 0) {
          setActivePhoto(galleryImages[idx - 1]);
        } else {
          setActivePhoto(galleryImages[galleryImages.length - 1]);
        }
      }
      if (event.key === 'ArrowRight') {
        const idx = galleryImages.findIndex((img) => img.id === activePhoto.id);
        if (idx < galleryImages.length - 1) {
          setActivePhoto(galleryImages[idx + 1]);
        } else {
          setActivePhoto(galleryImages[0]);
        }
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [activePhoto]);

  return (
    <main id="main" className="w-full bg-canvas">
      <PageHero
        eyebrow="Our story"
        title="Locally owned, deliberately small"
        description="We are eleven people based in Ha Giang City. Everything we know about this plateau we learned by living on it."
        image={images.village}
        imageAlt="Traditional stone-walled village houses on a highland plateau in northern Vietnam" />


      <Section tone="canvas">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
            <Reveal>
              <p className="text-[11px] uppercase tracking-widest2 text-forest-500">About Us</p>
              <h2 className="mt-5 font-display text-[2rem] leading-[1.14] sm:text-[2.6rem]">
                Every great journey begins with a story.
              </h2>
              <div className="mt-8 space-y-6 text-[15px] leading-[1.85] text-ink-soft">
                <p>
                  Odyssey was founded by the two of us, husband and wife – Duc and Linh. The name
                  Odyssey was officially born in June 2023, but the dream behind it had been
                  nurtured for many years before.
                </p>
                <p>
                  When we started, we didn't dream of building the largest travel company. What we
                  wanted was much simpler: to create a place where every traveler feels welcomed,
                  cared for like a friend, and able to explore Ha Giang in an authentic, safe, and
                  memorable way.
                </p>
                <p>
                  We believe that a great trip is not only made of majestic roads or famous
                  destinations. What makes a journey truly special is the people you meet, the
                  stories you hear, and the feeling of being genuinely cared for in every single
                  moment.
                </p>
                <p>
                  Therefore, every decision at Odyssey begins with a single question: "Will this
                  bring a better experience to our customers?"
                </p>
                <p>
                  We always choose the path of honesty and ethics. We only recommend what we truly
                  believe in, remain transparent in all information, and never compromise safety or
                  quality just to cut costs or increase profits.
                </p>
                <p>
                  To us, every guest is not just a booking or a night's stay. They are a friend who
                  has trusted Odyssey to accompany them on a part of their journey to discover
                  Vietnam.
                </p>
                <p>
                  That is also why our team always goes the extra mile every day – from preparing a
                  safe motorcycle, selecting quality homestays, sharing off-the-beaten-path
                  locations, to always being ready to support guests whenever needed.
                </p>
                <p>
                  We believe that success is not measured by the number of guests we serve, but by
                  the number of people who leave Ha Giang with a smile, beautiful memories, and a
                  desire to return.
                </p>
                <p>
                  Thank you for visiting Odyssey.
                </p>
                <p>
                  We look forward to accompanying you on the journey to explore one of the most
                  beautiful regions in Vietnam.
                </p>
              </div>
            </Reveal>

            <div className="lg:sticky lg:top-24 lg:self-start">
              <Reveal delay={0.1} className="overflow-hidden rounded-5xl">
                <motion.div
                  initial={{ scale: 1.15 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}>

                  <LazyImage
                    src="/Aboutpic/1785766572810_7647185241213986356_7647185241213986356_71e6e25fc8bfa001be45d0166b57013f.webp"
                    alt="Beautiful winding mountain path landscape in Ha Giang"
                    wrapperClassName="block aspect-[3/4] w-full"
                    sizes="(min-width: 1024px) 40vw, 100vw" />

                </motion.div>
              </Reveal>
            </div>
          </div>

          <div className="mt-20">
            <Reveal>
              <p className="text-[11px] text-center uppercase tracking-widest2 text-forest-500 mb-5">Our team & guests</p>
            </Reveal>
            <Stagger className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {galleryImages.map((item, idx) => {
                const style = itemStyles[idx] || { span: 'aspect-[16/10]', sizes: '100vw' };
                return (
                  <motion.figure
                    key={item.id}
                    variants={staggerItem}
                    className={cn(
                      'group relative overflow-hidden rounded-[2rem] border border-ink/[0.08] shadow-sm transition-all duration-500 hover:shadow-md bg-canvas',
                      style.span
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setActivePhoto(item)}
                      className="block h-full w-full text-left"
                      aria-label={`Open photograph: ${item.caption}`}
                    >
                      <div className="relative overflow-hidden w-full h-full">
                        <LazyImage
                          src={item.src}
                          alt={item.alt}
                          wrapperClassName="h-full w-full"
                          className="transition-transform duration-[1200ms] ease-editorial group-hover:scale-105 object-cover h-full w-full"
                          sizes={style.sizes}
                        />
                      </div>
                    </button>
                  </motion.figure>
                );
              })}
            </Stagger>
          </div>
        </Container>
      </Section>

      <Section tone="parchment">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
            <Reveal>
              <p className="text-[11px] uppercase tracking-widest2 text-forest-500">Why choose us</p>
              <h2 className="mt-5 font-display text-[2rem] leading-[1.14] sm:text-[2.6rem]">
                Why travel with Odyssey?
              </h2>
              <div className="mt-8 space-y-6 text-[15px] leading-[1.85] text-ink-soft">
                <p>
                  You’re probably not here looking for the wildest party or the cheapest tour—you’re here for a truly memorable experience.
                  That’s exactly what we offer. At Odyssey, we keep things simple: seamless booking, incredible routes, knowledgeable local
                  guides who genuinely care, and a relaxed, welcoming atmosphere.
                </p>
                <p>
                  Our days are filled with breathtaking landscapes, hidden gems, and authentic cultural experiences. By evening, most guests
                  are ready to unwind, not party. That’s why we naturally attract travelers who value meaningful experiences over nightlife— and
                  we wouldn’t have it any other way.
                </p>
                <p>
                  Most of our guests are in their 20s and 30s. If you're looking for an unforgettable adventure with a safe, reliable team,
                  you’ll feel right at home with us.
                </p>
              </div>
            </Reveal>

            <div className="flex flex-col justify-center">
              <p className="font-display text-lg text-ink mb-6">Here is what sets us apart:</p>
              <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {differentiators.map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={staggerItem}
                    className="flex gap-4 rounded-3xl border border-ink/[0.08] bg-canvas p-6 transition-all hover:bg-white hover:shadow-soft"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-50 text-sm font-semibold text-forest-600">
                      {idx + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-base text-ink">{item.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-ink-soft">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </Stagger>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="canvas" className="border-t border-ink/5">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_2fr] lg:gap-20">
            <Reveal>
              <p className="text-[11px] uppercase tracking-widest2 text-forest-500">Preparation</p>
              <h2 className="mt-5 font-display text-[2rem] leading-[1.14] sm:text-[2.4rem]">
                What to pack for your journey
              </h2>
              <div className="mt-6 rounded-3xl bg-white p-6 border border-ink/[0.06] text-sm leading-relaxed text-ink-soft space-y-4">
                <p>
                  Ha Giang's weather ranges from freezing winter temperatures of <strong>0°C</strong> to scorching summer days up to <strong>40°C</strong>. Please pack appropriate clothing for your trip.
                </p>
                <p className="text-xs text-ink-muted italic border-t border-ink/5 pt-3">
                  You can store your excess luggage at our hostel for free!
                </p>
                <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                  <div>
                    <span className="font-bold text-ink block">Winter (Dec – Mar)</span>
                    <span className="text-ink-muted">Cold, can drop to 0°C</span>
                  </div>
                  <div>
                    <span className="font-bold text-ink block">Summer (Jun – Aug)</span>
                    <span className="text-ink-muted">Hot, can rise to 40°C</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="font-display text-lg font-bold text-ink mb-4 border-b border-ink/10 pb-2">Essential Items</h3>
                <ul className="space-y-3">
                  {[
                    "Backpack (40L or smaller)",
                    "Driving license (if self-driving)",
                    "Travel insurance (highly recommended)",
                    "Charger & power bank",
                    "Waterproof gear / raincoat",
                    "Sunscreen",
                    "Cash (small notes for toilets, e.g. 3k–5k VND)",
                    "Sunglasses",
                    "Camera / phone & earphones",
                    "Comfortable shoes"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-ink-soft">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-forest-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-display text-lg font-bold text-ink mb-4 border-b border-ink/10 pb-2">Personal Gear</h3>
                <ul className="space-y-3">
                  {[
                    "3 to 4 T-shirts",
                    "2 pairs of trousers / shorts",
                    "Warm sweater / jacket / gloves / scarf",
                    "Towel (for swimming; homestays provide them at night)",
                    "Personal medicine & toiletries",
                    "Toilet paper (some public toilets do not provide it)",
                    "Swimwear (for year-round swimming opportunities)"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-ink-soft">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-forest-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="parchment" id="impact">
        <Container>
          <SectionHeading
            eyebrow="What we hold to"
            title="Three commitments we do not negotiate"
            description="They are the reason our prices are not the lowest in the province, and the reason our team is so dedicated and committed." />

          <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
            {values.map((value) =>
              <motion.article
                key={value.title}
                variants={staggerItem}
                className="rounded-4xl border border-ink/[0.08] bg-canvas p-8 transition-all duration-700 ease-editorial hover:-translate-y-1.5 hover:bg-white hover:shadow-soft">

                <h3 className="font-display text-xl leading-snug">{value.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">{value.text}</p>
              </motion.article>
            )}
          </Stagger>
        </Container>
      </Section>

      <Section tone="canvas">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Reveal>
              <p className="text-[11px] uppercase tracking-widest2 text-forest-500">Milestones</p>
              <h2 className="mt-5 font-display text-[2rem] leading-[1.14] sm:text-[2.4rem]">
                From a dream to reality
              </h2>
            </Reveal>
            <Stagger className="border-l border-ink/10">
              {timeline.map((entry) =>
                <motion.div key={entry.year} variants={staggerItem} className="relative pb-12 pl-8 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-gold-400" />

                  <p className="font-display text-lg text-forest-500">{entry.year}</p>
                  <h3 className="mt-2 font-display text-xl">{entry.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft">{entry.text}</p>
                </motion.div>
              )}
            </Stagger>
          </div>
        </Container>
      </Section>



      <CtaBanner
        eyebrow="Come and see"
        title="We would rather show you than explain"
        description="Send us your dates and we will tell you honestly whether this is the right trip for you — including when it is not." />

      <AnimatePresence>
        {activePhoto && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={activePhoto.caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-forest-900/95 p-5 sm:p-10"
            onClick={() => setActivePhoto(null)}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              aria-label="Close photograph"
              className="absolute right-5 top-5 z-[70] grid h-12 w-12 place-items-center rounded-full border border-white/25 text-white transition-colors hover:border-gold-300 hover:text-gold-300"
            >
              <XIcon className="h-5 w-5" />
            </button>

            {/* Prev Button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous photograph"
              className="absolute left-4 sm:left-10 z-[70] grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white transition-all hover:bg-white/10 hover:border-white/40 hover:scale-105 active:scale-95"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next photograph"
              className="absolute right-4 sm:right-10 z-[70] grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white transition-all hover:bg-white/10 hover:border-white/40 hover:scale-105 active:scale-95"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>

            <motion.figure
              key={activePhoto.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-full w-full max-w-4xl px-12"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={activePhoto.src}
                alt={activePhoto.alt}
                className="max-h-[78vh] w-full rounded-4xl object-contain mx-auto"
              />
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );

}