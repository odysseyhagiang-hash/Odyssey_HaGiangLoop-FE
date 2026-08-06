import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRightIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { brand } from '../../lib/data';
import { Button } from '../ui/Button';
import { TextField } from '../ui/Field';

import { apiAddSubscriber } from '../../lib/api';



const columns = [
  {
    title: 'Journeys',
    links: [
      { to: '/journeys', label: 'All journeys' },
      { to: '/journeys/private-tour', label: 'Private tour' },
      { to: '/journeys/group-tour', label: 'Group tour' },
      { to: '/journeys/car-tour', label: 'Car tour' },
      { to: '/rentalbikes', label: 'Rental bikes' }
    ]
  },
  {
    title: 'Explore',
    links: [
      { to: '/destinations', label: 'Destinations' },
      { to: '/gallery', label: 'Gallery' },
      { to: '/blog', label: 'Blog' },
      { to: '/faq', label: 'FAQ' }]

  },
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'Our story' },
      { to: '/about#impact', label: 'Impact' },
      { to: '/contact', label: 'Contact' },
      { to: '/booking', label: 'Booking Bus & Room' }]

  }];


export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="w-full bg-ink text-white" style={{ borderTop: '3px solid #B99450' }}>
      <div className="mx-auto w-full max-w-[1240px] px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="text-[11px] uppercase tracking-widest2 text-gold-300">Letters from the north</p>
            <h2 className="mt-5 max-w-md font-display text-3xl leading-tight sm:text-[2.5rem]">
              One considered email each season.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65">
              Route notes, weather windows and the two or three departures we think are worth
              rearranging a calendar for. Never more than four a year.
            </p>

            <form
              className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:items-end"
              onSubmit={(event) => {
                event.preventDefault();
                if (email.trim()) {
                  apiAddSubscriber(email.trim());
                  setSubscribed(true);
                  setEmail('');
                }
              }}>

              <TextField
                label="Email address"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="flex-1 [&_label]:text-white/50 [&_input]:border-white/15 [&_input]:bg-white/5 [&_input]:text-white" />

              <Button variant="gold" type="submit" className="h-[52px] shrink-0">
                Subscribe
              </Button>
            </form>
            {subscribed &&
              <p role="status" className="mt-3 text-sm text-gold-300">
                Thank you — we will write to you before the next season opens.
              </p>
            }
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {columns.map((column) =>
              <nav key={column.title} aria-label={column.title}>
                <h3 className="text-[11px] uppercase tracking-widest2 text-white/40">{column.title}</h3>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) =>
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="group inline-flex items-center gap-1 text-sm text-white/75 transition-colors duration-300 hover:text-gold-300">

                        {link.label}
                        <ArrowUpRightIcon className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            )}
          </div>
        </div>

        <div className="mt-16 grid gap-10 border-t border-white/10 pt-10 md:grid-cols-2">
          {/* Hostel 1 */}
          <div className="space-y-4">
            <h4 className="font-display text-base text-gold-300">ODYSSEY HOSTEL, TOURS & MOTORBIKES RENTAL</h4>
            <div className="space-y-2 text-sm">
              <p className="flex items-start gap-3 text-white/65">
                <MapPinIcon aria-hidden="true" className="mt-[3px] h-4 w-4 shrink-0 text-gold-300" />
                <span>No 11, Lane 29, Group 18, Nguyen Trai Ward, Ha Giang City</span>
              </p>
              <p className="flex items-start gap-3">
                <PhoneIcon aria-hidden="true" className="mt-[3px] h-4 w-4 shrink-0 text-gold-300" />
                <a href="tel:+84357292323" className="text-white/65 hover:text-white transition-colors">Hotline/WhatsApp: +84 357292323</a>
              </p>
              <p className="flex items-start gap-3">
                <MailIcon aria-hidden="true" className="mt-[3px] h-4 w-4 shrink-0 text-gold-300" />
                <a href="mailto:odyssey.hagiang@gmail.com" className="text-white/65 hover:text-white transition-colors">Email: odyssey.hagiang@gmail.com</a>
              </p>
            </div>
          </div>

          {/* Hostel 2 */}
          <div className="space-y-4">
            <h4 className="font-display text-base text-gold-300">ODYSSEY HOSTEL 2, TOURS & MOTORBIKES RENTAL</h4>
            <div className="space-y-2 text-sm">
              <p className="flex items-start gap-3 text-white/65">
                <MapPinIcon aria-hidden="true" className="mt-[3px] h-4 w-4 shrink-0 text-gold-300" />
                <span>No 88, Nguyen Trai Ward, Ha Giang City</span>
              </p>
              <p className="flex items-start gap-3">
                <PhoneIcon aria-hidden="true" className="mt-[3px] h-4 w-4 shrink-0 text-gold-300" />
                <a href="tel:+84377622323" className="text-white/65 hover:text-white transition-colors">Hotline/WhatsApp: +84 377622323</a>
              </p>
              <p className="flex items-start gap-3">
                <MailIcon aria-hidden="true" className="mt-[3px] h-4 w-4 shrink-0 text-gold-300" />
                <a href="mailto:odysseyhotel2.hagiang@gmail.com" className="text-white/65 hover:text-white transition-colors">Email: odysseyhotel2.hagiang@gmail.com</a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {brand.name}. Licensed inbound operator, Ha Giang province.
          </p>
          <div className="flex items-center gap-5 sm:gap-6">
            <a
              href="https://www.airbnb.com.vn/rooms/1270105021365508062?search_mode=regular_search&adults=1&check_in=2026-08-06&check_out=2026-08-11&children=0&infants=0&pets=0&source_impression_id=p3_1785751016_P3P-uC-LF5e_L0Yl&previous_page_section_name=1000&federated_search_id=7874c54e-cb6f-41ac-a9b4-1514f13228b7"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Airbnb"
              className="opacity-80 hover:opacity-100 transition-opacity duration-300">
              <img src="/Airbnb_Logo.svg.webp" alt="Airbnb" className="h-[28px] w-auto object-contain" />
            </a>
            <a
              href="https://www.booking.com/hotel/vn/odyssey-ha-giang-hostel.vi.html"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Booking.com"
              className="opacity-80 hover:opacity-100 transition-opacity duration-300">
              <img src="/Booking.com_Icon_2022.svg" alt="Booking.com" className="h-[28px] w-auto object-contain" />
            </a>
            <a
              href="https://www.facebook.com/odysseyhostel/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="opacity-80 hover:opacity-100 transition-opacity duration-300">
              <img src="/Facebook_Logo_(2019).webp" alt="Facebook" className="h-[28px] w-auto object-contain" />
            </a>
            <a
              href="https://www.instagram.com/odyssey.hagiangloop/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="opacity-80 hover:opacity-100 transition-opacity duration-300">
              <img src="/Instagram_logo_2022.svg" alt="Instagram" className="h-[28px] w-auto object-contain" />
            </a>
            <a
              href="https://www.tripadvisor.com/Attraction_Review-g1544599-d26321485-Reviews-Ha_Giang_Odyssey_Hostel_Tours_Motorbike_Rental-Ha_Giang_Ha_Giang_Province.html"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TripAdvisor"
              className="opacity-80 hover:opacity-100 transition-opacity duration-300">
              <img src="/tripadvisor.webp" alt="TripAdvisor" className="h-[28px] w-auto object-contain" />
            </a>
          </div>
        </div>
      </div>
    </footer>);

}