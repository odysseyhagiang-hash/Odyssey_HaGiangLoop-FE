import { motion } from 'framer-motion';
import { experienceSteps, images } from '../../lib/data';
import { LazyImage } from '../ui/LazyImage';
import { Reveal, Stagger, staggerItem } from '../ui/Reveal';
import { Container, Section } from '../ui/Section';
import { SectionDivider } from '../ui/SectionDivider';
import { Button } from '../ui/Button';

export function TravelExperience() {
  return (
    <Section
      tone="forest"
      aria-labelledby="experience-title"
      style={{
        backgroundImage: "url('/backgrounds_section/background-TravelExperience.webp')",
        backgroundSize: 'auto 100%',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
      }}>
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <Reveal className="relative">
            <div className="overflow-hidden rounded-5xl">
              <motion.div
                initial={{ scale: 1.18 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}>

                <LazyImage
                  src={images.experience}
                  alt="A candlelit dinner table set on a wooden homestay balcony overlooking misty mountains"
                  wrapperClassName="block aspect-[4/5] w-full sm:aspect-[3/2] lg:aspect-[4/5]"
                  sizes="(min-width: 1024px) 45vw, 100vw" />

              </motion.div>
            </div>
            <div className="glass-panel-dark absolute -bottom-8 left-6 hidden max-w-[240px] rounded-4xl border border-white/15 p-6 sm:block">
              <p className="font-display text-3xl text-gold-300">82%</p>
              <p className="mt-2 text-xs leading-relaxed text-white/70">
                of every trip budget is spent with families and cooperatives inside the province.
              </p>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-[11px] uppercase tracking-widest2 text-gold-300">The experience</p>
              <h2
                id="experience-title"
                className="mt-5 max-w-lg font-display text-[2rem] leading-[1.12] text-white sm:text-[2.6rem]">

                How a journey with us actually unfolds
              </h2>
            </Reveal>

            <Stagger className="mt-12 space-y-px overflow-hidden rounded-4xl border border-white/10 bg-white/10">
              {experienceSteps.map((step) =>
                <motion.div
                  key={step.id}
                  variants={staggerItem}
                  className="group flex gap-6 bg-forest-900 p-7 transition-colors duration-700 ease-editorial hover:bg-forest-800 sm:p-8">

                  <span className="font-display text-lg text-gold-300/70 transition-colors duration-500 group-hover:text-gold-300">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-white">{step.title}</h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-white/65">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              )}
            </Stagger>

            <Reveal delay={0.1}>
              <Button to="/contact" variant="gold" className="mt-10">
                Start with a conversation
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
      <SectionDivider variant="mist" toColor="#F7F5F2" />
    </Section>);

}