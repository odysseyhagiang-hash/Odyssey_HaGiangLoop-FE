import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, GaugeIcon, ShieldCheckIcon, WrenchIcon } from 'lucide-react';
import { useSeo } from '../hooks/useSeo';
import { images, vehicles } from '../lib/data';

import { PageHero } from '../components/layout/PageHero';
import { LazyImage } from '../components/ui/LazyImage';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Reveal, Stagger, staggerItem } from '../components/ui/Reveal';
import { Container, Section, SectionHeading } from '../components/ui/Section';
import { CtaBanner } from '../components/sections/CtaBanner';

const care = [
  {
    icon: WrenchIcon,
    title: 'Serviced after every trip',
    text: 'Our own workshop and two full-time mechanics. Brakes, chain, tyres and lights checked between every departure — not every season.'
  },
  {
    icon: GaugeIcon,
    title: 'Retired early, on purpose',
    text: 'We refresh our vehicles every two years on a regular basis. Nothing you ride will be older than two seasons.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Kitted out properly',
    text: 'Helmet 3/4, leg/arm protective guards, rain coat, boots, and big nylon backpack wrappers come with every bike at no extra cost.'
  }];

import type { Vehicle } from '../lib/types';
import { AnimatePresence } from 'framer-motion';

function VehicleImage({ vehicle }: { vehicle: Vehicle }) {
  const imgs = vehicle.images ?? [vehicle.image];
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    if (imgs.length <= 1) return;
    const timer = setInterval(() => setIdx((i) => (i + 1) % imgs.length), 3000);
    return () => clearInterval(timer);
  }, [imgs.length]);

  return (
    <div className="relative flex items-center justify-center bg-white p-6 lg:p-10 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={imgs[idx]}
          src={imgs[idx]}
          alt={vehicle.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="max-h-[220px] w-auto object-contain mix-blend-multiply brightness-[1.12]"
        />
      </AnimatePresence>
      {imgs.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {imgs.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-2 w-2 rounded-full transition-colors ${i === idx ? 'bg-forest-500' : 'bg-ink/20'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Fleet() {
  const [activeSlide, setActiveSlide] = React.useState(0);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev === 0 ? 1 : 0));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useSeo({
    title: 'Rental Bikes',
    description:
      'The motorbikes we ride in Ha Giang — semi-automatic 110s and manual 150 dual-sports, maintained to the highest standards.',
    image: images.fleetHero
  });

  return (
    <main id="main" className="w-full bg-canvas">
      <PageHero
        eyebrow="Our fleet"
        title="Machines we would put our own family on"
        description="Motorbikes maintained in our own workshop, retired early and kitted out before you ever see them."
        image={images.fleetHero}
        imageAlt="A row of adventure motorbikes parked at a viewpoint overlooking misty limestone mountains" />


      <Section tone="canvas">
        <Container>
          <SectionHeading
            eyebrow="What you will ride"
            title="Choose the right motorbike for your journey"
            description="We provide well-maintained semi-automatic and manual clutch motorbikes for self-driving or pillion riding behind our professional Easy Riders." />


          <Stagger className="mt-14 space-y-8">
            {vehicles.map((vehicle) =>
              <motion.article
                key={vehicle.id}
                variants={staggerItem}
                className="group grid overflow-hidden rounded-5xl border border-ink/[0.07] bg-white transition-shadow duration-700 ease-editorial hover:shadow-lift lg:grid-cols-[2fr_3fr]">

                <VehicleImage vehicle={vehicle} />

                <div className="flex flex-col justify-center p-8 sm:p-12">
                  <Badge tone="forest">{vehicle.category}</Badge>
                  <h3 className="mt-5 font-display text-[1.75rem] leading-tight sm:text-[2.15rem]">
                    {vehicle.name}
                  </h3>

                  <dl className="mt-8 grid gap-px overflow-hidden rounded-3xl border border-ink/[0.08] bg-ink/[0.08] grid-cols-2">
                    {vehicle.specs.map((spec) =>
                      <div key={spec.label} className="bg-white px-6 py-5 text-center">
                        <dt className="text-[10px] uppercase tracking-widest2 text-ink-muted">
                          {spec.label}
                        </dt>
                        <dd className="mt-1.5 font-display text-xl font-bold text-forest-600">{spec.value}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              </motion.article>
            )}
          </Stagger>
        </Container>
      </Section>

      <Section tone="parchment">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <Reveal className="overflow-hidden rounded-5xl relative w-full aspect-[4/3] lg:aspect-auto lg:h-full">
              <motion.div
                initial={{ scale: 1.15 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full w-full"
              >
                <div className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: activeSlide === 0 ? 1 : 0 }}>
                  <LazyImage
                    src="/xe1.webp"
                    alt="Odyssey motorbike fleet - Black bikes"
                    wrapperClassName="w-full h-full"
                    className="w-full h-full object-cover"
                    sizes="(min-width: 1024px) 45vw, 100vw" />
                </div>
                <div className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: activeSlide === 1 ? 1 : 0 }}>
                  <LazyImage
                    src="/xe2.webp"
                    alt="Odyssey motorbike fleet - Red bikes"
                    wrapperClassName="w-full h-full"
                    className="w-full h-full object-cover"
                    sizes="(min-width: 1024px) 45vw, 100vw" />
                </div>
              </motion.div>
            </Reveal>

            <div>
              <Reveal>
                <p className="text-[11px] uppercase tracking-widest2 text-forest-500">The workshop</p>
                <h2 className="mt-5 max-w-md font-display text-[2rem] leading-[1.14] sm:text-[2.5rem]">
                  Nothing leaves the yard unchecked
                </h2>
              </Reveal>

              <Stagger className="mt-10 space-y-6">
                {care.map((item) =>
                  <motion.div key={item.title} variants={staggerItem} className="flex gap-5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-forest-500/15 bg-canvas text-forest-500">
                      <item.icon aria-hidden="true" className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg">{item.title}</h3>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft">{item.text}</p>
                    </div>
                  </motion.div>
                )}
              </Stagger>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="canvas">
        <Container>
          <div className="grid gap-12 rounded-5xl bg-forest-900 p-10 text-white sm:p-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <Reveal>
              <p className="text-[11px] uppercase tracking-widest2 text-gold-300">Every rental includes</p>
              <h2 className="mt-5 font-display text-[1.9rem] leading-[1.14] sm:text-[2.4rem]">
                No deposits held, no fuel surcharges
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/65">
                Whether you're joining one of our guided tours or planning to explore Ha Giang on your own, our motorbike
                rental service has you covered. No matter how you choose to experience the loop, we have the right option
                to get you on the road with confidence.
              </p>
              <Button to="/contact?topic=get-a-motorbike" variant="gold" className="mt-9">
                Reserve a bike with your dates
              </Button>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-base font-bold text-gold-300">Including:</h3>
                  <ul className="mt-3 space-y-2.5">
                    <li className="flex gap-3 text-sm text-white/75">
                      <CheckIcon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                      <span>Helmet 3/4</span>
                    </li>
                    <li className="flex gap-3 text-sm text-white/75">
                      <CheckIcon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                      <span>Knee & elbow pads for protection</span>
                    </li>
                    <li className="flex gap-3 text-sm text-white/75">
                      <CheckIcon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                      <span>Plastic raincoat & shoes cover</span>
                    </li>
                    <li className="flex gap-3 text-sm text-white/75">
                      <CheckIcon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                      <span>Straps, nylon bags for wrapping backpacks</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <h3 className="font-display text-base font-bold text-gold-300">Insurance Cover:</h3>
                  <p className="mt-1 text-sm text-white/75 leading-relaxed">
                    <strong>External Damage:</strong> Shell, Mirror, Brake, Light System,...
                  </p>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <h3 className="font-display text-base font-bold text-gold-300">Insurance NOT Cover:</h3>
                  <p className="mt-1 text-sm text-white/75 leading-relaxed">
                    <strong>Internal Damage:</strong> Engine, Machinery,...
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBanner
        eyebrow="Not sure which bike?"
        title="Tell us what you have ridden before"
        description="Two questions on a call and we will tell you honestly whether to take the 150, the 110, or the seat behind a guide." />

    </main>);

}