import { motion } from "framer-motion";
import {
  BedDoubleIcon,
  CalendarCheckIcon,
  CompassIcon,
  LeafIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "lucide-react";
import { features } from "../../lib/data";
import { Stagger, staggerItem } from "../ui/Reveal";
import { Container, Section, SectionHeading } from "../ui/Section";
const iconMap: Record<string, any> = {
  compass: CompassIcon,
  users: UsersIcon,
  bed: BedDoubleIcon,
  shield: ShieldCheckIcon,
  leaf: LeafIcon,
  calendar: CalendarCheckIcon,
};
export function WhyChooseUs() {
  return (
    <Section
      tone="transparent"
      aria-labelledby="why-title"
    >
      <Container>
        <SectionHeading
          id="why-title"
          eyebrow="Why travel with us"
          title={
            <>
              The difference is in what we{" "}
              <span className="italic text-forest-500">refuse</span> to rush
            </>
          }
          description="We run fewer departures than we could, with more staff than we need. Everything below is a consequence of that one decision."
        />

        <Stagger className="mt-14 grid gap-px overflow-hidden rounded-4xl border border-ink/[0.08] bg-ink/[0.08] sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon] ?? CompassIcon;
            return (
              <motion.article
                key={feature.id}
                variants={staggerItem}
                className="group bg-canvas p-8 transition-colors duration-700 ease-editorial hover:bg-white lg:p-10"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-forest-500/15 bg-forest-50 text-forest-500 transition-all duration-500 ease-editorial group-hover:bg-forest-500 group-hover:text-white">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="mt-6 font-display text-xl leading-snug">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {feature.description}
                </p>
              </motion.article>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}
