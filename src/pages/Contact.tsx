import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2Icon, ClockIcon, MailIcon, PhoneIcon } from 'lucide-react';
import { useSeo } from '../hooks/useSeo';
import { brand, images } from '../lib/data';
import { PageHero } from '../components/layout/PageHero';
import { Button } from '../components/ui/Button';
import { SelectField, TextAreaField, TextField } from '../components/ui/Field';
import { Reveal } from '../components/ui/Reveal';
import { Container, Section } from '../components/ui/Section';

import { apiSaveContact } from '../lib/api';

type Status = 'idle' | 'submitting' | 'sent';

interface FormState {
  name: string;
  email: string;
  whatsapp: string;
  arrivalDate: string;
  guests: string;
  topic: string;
  message: string;
}

const topics = [
  { value: 'book-private-tour', label: 'Book Private Tour' },
  { value: 'book-group-tour', label: 'Book Group Tour' },
  { value: 'book-car-tour', label: 'Book Car Tour' },
  { value: 'get-a-motorbike', label: 'Get A Motorbike' },
  { value: 'book-a-room', label: 'Book a Room' },
  { value: 'book-bus', label: 'Book Bus' },
];


export function Contact() {
  useSeo({
    title: 'Contact',
    description:
      'Talk to a guide in Ha Giang City about dates, private journeys or an existing booking. A real person replies, usually within a few hours.',
    image: images.experience
  });

  const [searchParams] = useSearchParams();
  const formRef = useRef<HTMLDivElement>(null);

  const initialTopic = (() => {
    const t = searchParams.get('topic') ?? '';
    return topics.some((o) => o.value === t) ? t : 'book-private-tour';
  })();

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    whatsapp: '',
    arrivalDate: '',
    guests: '1',
    topic: initialTopic,
    message: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>('idle');

  /* Scroll form into view when arriving with a ?topic= param */
  useEffect(() => {
    if (searchParams.get('topic') && formRef.current) {
      setTimeout(() => {
        const element = formRef.current;
        if (element) {
          const yOffset = -110; // Leaves space for the sticky header and top margin
          const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 900);
    }
  }, [searchParams]);

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    // Name validation
    if (!form.name.trim()) {
      nextErrors.name = 'Please tell us your name.';
    } else if (form.name.trim().length < 2) {
      nextErrors.name = 'Name must be at least 2 characters.';
    }

    // Email validation
    if (!form.email.trim()) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }

    // WhatsApp validation
    if (form.whatsapp.trim()) {
      if (!/^\+?[0-9]+$/.test(form.whatsapp.trim())) {
        nextErrors.whatsapp = "WhatsApp number must only contain '+' and digits.";
      } else {
        const digitsOnly = form.whatsapp.replace(/\+/g, '');
        if (digitsOnly.length < 7 || digitsOnly.length > 15) {
          nextErrors.whatsapp = 'WhatsApp number must be between 7 and 15 digits.';
        }
      }
    }

    // Arrival Date validation
    if (!form.arrivalDate.trim()) {
      nextErrors.arrivalDate = 'Please select your arrival date.';
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const chosen = new Date(form.arrivalDate);
      if (chosen < today) {
        nextErrors.arrivalDate = 'Arrival date cannot be in the past.';
      }
    }

    // Guests validation
    if (!form.guests.trim()) {
      nextErrors.guests = 'Please specify number of guests.';
    } else {
      const num = parseInt(form.guests, 10);
      if (isNaN(num) || num < 1) {
        nextErrors.guests = 'Please specify at least 1 guest.';
      } else if (num > 50) {
        nextErrors.guests = 'For groups larger than 50, please contact us directly.';
      }
    }

    // Message validation
    if (!form.message.trim()) {
      nextErrors.message = 'Please enter your message.';
    } else if (form.message.trim().length < 12) {
      nextErrors.message = 'A sentence or two (at least 12 characters) helps us reply properly.';
    } else if (form.message.trim().length > 2000) {
      nextErrors.message = 'Message cannot exceed 2000 characters.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('submitting');
    apiSaveContact({
      name: form.name,
      email: form.email,
      whatsapp: form.whatsapp,
      arrivalDate: form.arrivalDate,
      guests: form.guests,
      topic: form.topic,
      message: form.message
    }).then(() => setStatus('sent'));
    window.setTimeout(() => setStatus('sent'), 1100);
  };



  return (
    <main id="main" className="w-full bg-canvas">
      <PageHero
        eyebrow="Contact"
        title="Talk to someone who rides these roads"
        description="Our office sits two streets from the start of the loop. Write, call, or ask us for a fifteen-minute video call."
        image={images.experience}
        imageAlt="Candlelit dinner table on a wooden balcony overlooking misty mountains"
      />

      <Section tone="canvas">
        <Container>
          <div ref={formRef} className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <Reveal>
              <h2 className="font-display text-[1.9rem] leading-snug sm:text-[2.4rem]">
                Send us a note
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
                Every enquiry is read by a guide, not a call centre. Expect a reply within a few
                hours during office hours in Vietnam.
              </p>

              {status === 'sent' ? (
                <div
                  role="status"
                  className="mt-10 rounded-4xl border border-forest-500/20 bg-forest-50 p-10 text-center"
                >
                  <CheckCircle2Icon aria-hidden="true" className="mx-auto h-9 w-9 text-forest-500" />
                  <h3 className="mt-5 font-display text-2xl">Your message is on its way</h3>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
                    Thank you, {form.name.split(' ')[0]}. We have your note and will reply to{' '}
                    {form.email} shortly.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-8"
                    onClick={() => {
                      setForm({
                        name: '',
                        email: '',
                        whatsapp: '',
                        arrivalDate: '',
                        guests: '1',
                        topic: 'book-private-tour',
                        message: ''
                      });
                      setStatus('idle');
                    }}
                  >
                    Write another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <TextField
                      label="Your name"
                      required
                      value={form.name}
                      error={errors.name}
                      onChange={(event) => update('name', event.target.value)}
                      placeholder="Elena Marchetti"
                      autoComplete="name" />

                    <TextField
                      label="Email"
                      type="email"
                      required
                      value={form.email}
                      error={errors.email}
                      onChange={(event) => update('email', event.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email" />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <TextField
                      label="WhatsApp number"
                      type="tel"
                      value={form.whatsapp}
                      error={errors.whatsapp}
                      onChange={(event) => {
                        const val = event.target.value;
                        const clean = val.replace(/[^0-9+]/g, '');
                        const hasPlus = clean.startsWith('+');
                        const digits = clean.replace(/\+/g, '');
                        const finalVal = (hasPlus ? '+' : '') + digits;
                        update('whatsapp', finalVal);
                      }}
                      placeholder="+1 234 567 890"
                      hint="Please include your country code (e.g., +1)"
                      autoComplete="tel" />

                    <TextField
                      label="Day arrival"
                      type="date"
                      required
                      value={form.arrivalDate}
                      error={errors.arrivalDate}
                      onChange={(event) => update('arrivalDate', event.target.value)}
                      placeholder="" />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <TextField
                      label="Number per booking"
                      type="number"
                      min="1"
                      required
                      value={form.guests}
                      error={errors.guests}
                      onChange={(event) => update('guests', event.target.value)}
                      placeholder="1" />

                    <SelectField
                      label="What is this about?"
                      options={topics}
                      value={form.topic}
                      onChange={(event) => update('topic', event.target.value)} />
                  </div>

                  <TextAreaField
                    label="Message"
                    required
                    value={form.message}
                    error={errors.message}
                    onChange={(event) => update('message', event.target.value)}
                    placeholder="Tell us roughly when you would like to travel and how many of you there are."
                    hint="The more context you give, the more useful our first reply will be." />

                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === 'submitting'}
                    className="w-full sm:w-auto">

                    {status === 'submitting' ? 'Sending…' : 'Send message'}
                  </Button>
                </form>
              )}
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-5xl bg-parchment p-8 sm:p-10">
                <h2 className="font-display text-xl mb-8">Find us</h2>

                <div className="space-y-8">
                  {/* Branch 1 */}
                  <div className="border-b border-ink/10 pb-6 last:border-0 last:pb-0">
                    <h3 className="text-[11px] font-semibold uppercase tracking-widest2 text-forest-600">Odyssey Hostel 1</h3>
                    <p className="mt-3 font-display text-lg text-ink leading-snug">
                      No 11, Lane 29, Group 18, Nguyen Trai Ward, Ha Giang City
                    </p>
                    <div className="mt-4 space-y-2 text-sm text-ink-soft">
                      <p className="flex items-center gap-2.5">
                        <PhoneIcon className="h-4 w-4 text-forest-500" />
                        <a href="tel:+84357292323" className="hover:text-forest-600 transition-colors">+84 357292323</a>
                      </p>
                      <p className="flex items-center gap-2.5">
                        <MailIcon className="h-4 w-4 text-forest-500" />
                        <a href="mailto:odyssey.hagiang@gmail.com" className="hover:text-forest-600 transition-colors">odyssey.hagiang@gmail.com</a>
                      </p>
                    </div>
                  </div>

                  {/* Branch 2 */}
                  <div className="border-b border-ink/10 pb-6 last:border-0 last:pb-0">
                    <h3 className="text-[11px] font-semibold uppercase tracking-widest2 text-forest-600">Odyssey Hostel 2</h3>
                    <p className="mt-3 font-display text-lg text-ink leading-snug">
                      No 88, Nguyen Trai Ward, Ha Giang City
                    </p>
                    <div className="mt-4 space-y-2 text-sm text-ink-soft">
                      <p className="flex items-center gap-2.5">
                        <PhoneIcon className="h-4 w-4 text-forest-500" />
                        <a href="tel:+84377622323" className="hover:text-forest-600 transition-colors">+84 377622323</a>
                      </p>
                      <p className="flex items-center gap-2.5">
                        <MailIcon className="h-4 w-4 text-forest-500" />
                        <a href="mailto:odysseyhotel2.hagiang@gmail.com" className="hover:text-forest-600 transition-colors">odysseyhotel2.hagiang@gmail.com</a>
                      </p>
                    </div>
                  </div>

                  {/* Opening Hours */}
                  <div>
                    <h3 className="text-[11px] font-semibold uppercase tracking-widest2 text-ink-muted">Opening hours</h3>
                    <p className="mt-2 text-sm text-ink-soft flex items-center gap-2.5">
                      <ClockIcon className="h-4 w-4 text-forest-500" />
                      <span>{brand.hours}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-9 rounded-4xl bg-forest-900 p-7 text-white">
                  <h3 className="font-display text-lg">Arriving from Ha Noi, Ninh Binh, Ha Long, Cat Ba, Sapa, Cao Bang?</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">
                    We book the overnight sleeper or a private car, and hold any luggage you would
                    rather not carry on the loop — at no charge.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </main>);

}