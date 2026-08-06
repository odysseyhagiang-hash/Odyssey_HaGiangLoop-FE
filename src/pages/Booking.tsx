import React, { useMemo, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRightIcon, MapPinIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useSeo } from '../hooks/useSeo';
import { PageHero } from '../components/layout/PageHero';
import { Container, Section } from '../components/ui/Section';

interface BusScheduleOption {
  type: string;
  times: string; // semicolon separated text exactly as image
  price: string; // dot-separated string exactly as image
}

interface BusRoute {
  title: string;
  subTitle?: string;
  durationText: string;
  options: BusScheduleOption[];
  dropOff: string;
}

const BUS_ROUTES: BusRoute[] = [
  {
    title: 'HA GIANG - HANOI',
    subTitle: 'HA GIANG - NOI BAI AIRPORT',
    durationText: '7 HOURS / 6 HOURS',
    dropOff: 'Hanoi Old Quarter',
    options: [
      { type: 'Limousine', times: '06:45; 16:00', price: '300.000' },
      { type: 'Royal Cabin Bus', times: '06:45; 09:00; 11:00; 14:00; 17:00; 19:00; 21:00; 22:00', price: '350.000' },
      { type: 'Hotel Sleeping Bus', times: '09:00; 18:00; 21:00', price: '300.000' }
    ]
  },
  {
    title: 'HA GIANG - SAPA',
    durationText: '7 HOURS',
    dropOff: 'Sapa Bus Station',
    options: [
      { type: 'Limousine', times: '07:30; 14:00; 16:00', price: '320.000' },
      { type: 'Royal Cabin Bus', times: '18:00', price: '350.000' },
      { type: 'Hotel Sleeping Bus', times: '18:00; 19:00', price: '320.000' }
    ]
  },
  {
    title: 'HA GIANG - NINH BINH',
    durationText: '8 HOURS',
    dropOff: 'Tam Coc Center',
    options: [
      { type: 'Regular Sleeping Bus', times: '20:00', price: '300.000' },
      { type: 'Royal Cabin Bus', times: '20:00', price: '450.000' }
    ]
  },
  {
    title: 'HA GIANG - HA LONG',
    durationText: '9 HOURS',
    dropOff: 'Bai Chay Bus Station',
    options: [
      { type: 'Regular Sleeping Bus', times: '19:00', price: '400.000' },
      { type: 'Royal Cabin Bus', times: '19:00', price: '550.000' }
    ]
  },
  {
    title: 'HA GIANG - CAT BA',
    durationText: '11 HOURS',
    dropOff: 'Cat Ba Island Center',
    options: [
      { type: 'Hotel Sleeping Bus', times: '20:00', price: '550.000' },
      { type: 'Royal Cabin Bus', times: '19:00', price: '700.000' }
    ]
  },
  {
    title: 'HA GIANG - CAO BANG',
    durationText: '7 HOURS',
    dropOff: 'Homestay',
    options: [
      { type: 'Limousine', times: '08:00', price: '450.000' }
    ]
  }
];

interface BusTypeShowcase {
  name: string;
  image: string;
}

const BUS_TYPES: BusTypeShowcase[] = [
  {
    name: 'LIMOUSINE',
    image: 'https://res.cloudinary.com/bs1csiim/image/upload/v1785911012/Limousine_fxllrp.jpg'
  },
  {
    name: 'REGULAR SLEEPING BUS',
    image: 'https://res.cloudinary.com/bs1csiim/image/upload/v1785911012/regular_xlxtid.jpg'
  },
  {
    name: 'ROYAL CABIN BUS (CABIN 24)',
    image: 'https://res.cloudinary.com/bs1csiim/image/upload/v1785911012/Royal_cabin_bus_gw1gjw.jpg'
  },
  {
    name: 'HOTEL SLEEPING BUS (CABIN 34)',
    image: 'https://res.cloudinary.com/bs1csiim/image/upload/v1785911013/Hotel_sleeping_bus_tbtph2.jpg'
  }
];

interface RoomCard {
  name: string;
  price: string;
  priceSub: string;
  image: string;
  images?: string[];
  link?: string;
}

interface HostelOverview {
  tagline: string;
  description: string;
  bookingUrl?: string;
}

interface Hostel {
  id: string;
  label: string;
  address: string;
  overview: HostelOverview;
  rooms: RoomCard[];
  images: [string, string];
}

const HOSTELS: Hostel[] = [
  {
    id: 'odyssey-1',
    label: 'Odyssey Hostel',
    address: 'No 11, Lane 29, Group 18, Nguyen Trai Ward, Ha Giang City',
    images: [
      'https://res.cloudinary.com/bs1csiim/image/upload/v1785911093/c%C6%A1_s%E1%BB%9F_1_2_qehqwg.jpg',
      'https://res.cloudinary.com/bs1csiim/image/upload/v1785983596/C%C6%A1_s%E1%BB%9F_1_opgg9m.jpg',
    ],
    overview: {
      tagline: 'A UNIQUE RELAXATION SPACE AT ODYSSEY GUEST HOUSE',
      description:
        'Odyssey Guest House is a unique guest house with stunning architecture, including stilt houses and brick houses, offering guests a complete experience from the coziness of a family home to the elegance and cleanliness of a three-star hotel. We also offer a second facility called Odyssey Hotel 2, with fully equipped spaces. This is the ideal place to relax after a long, tiring day. We have relaxation areas such as a tea room, swimming pool, billiards room, etc.',
      bookingUrl: undefined,
    },
    rooms: [
      {
        name: 'VIP Double Room',
        price: '580000',
        priceSub: 'per room / night',
        image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/758867632.jpg?k=96f6c8dfa55d1bb7e038059283827b9fd78a4a2167cea99b0434f867b6e94af1&o=',
        link: 'https://www.booking.com/hotel/vn/odyssey-ha-giang-hostel.vi.html',
      },
      {
        name: 'Twin Room',
        price: '460000',
        priceSub: 'per room / night',
        image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/585015775.jpg?k=4b7b1cfd86b0625271aa39ea412e1d353b9996019c306e0fa905d9a5ce410e25&o=',
        link: 'https://www.booking.com/hotel/vn/odyssey-ha-giang-hostel.vi.html',
      },
      {
        name: 'Bamboo Room (Dormitory)',
        price: '150000',
        priceSub: 'per person / night',
        image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/465894506.jpg?k=33a01a81b1afc35ebc978f8727bbc257343e40a19e70fedbf99d2c714996d4e1&o=',
        link: 'https://www.booking.com/hotel/vn/odyssey-ha-giang-hostel.vi.html',
      },
      {
        name: 'Bungalow Sky View',
        price: '950000',
        priceSub: 'per room / night',
        image: 'https://res.cloudinary.com/bs1csiim/image/upload/v1785989452/1785939100853_7647185241213986356_7647185241213986356_b6701b175904630fdbfa9cbae22256e9_spsd10.jpg',
        images: [
          'https://res.cloudinary.com/bs1csiim/image/upload/v1785989452/1785939100853_7647185241213986356_7647185241213986356_b6701b175904630fdbfa9cbae22256e9_spsd10.jpg',
          'https://res.cloudinary.com/bs1csiim/image/upload/v1785983652/1785939100901_7647185241213986356_7647185241213986356_f98e8f28cce9c3aa5380ade75b6ff94c_vpjpsm.jpg',
          'https://res.cloudinary.com/bs1csiim/image/upload/v1785983650/1785939100891_7647185241213986356_7647185241213986356_9ffac162547b01a334908c8b8c4f48fe_nx6aoa.jpg',
        ],
        link: 'https://www.booking.com/hotel/vn/odyssey-ha-giang-hostel.vi.html',
      },
      {
        name: 'King Room',
        price: '650000',
        priceSub: 'per room / night',
        image: 'https://res.cloudinary.com/bs1csiim/image/upload/v1785983636/king_room_qwa6gy.jpg',
        link: 'https://www.booking.com/hotel/vn/odyssey-ha-giang-hostel.vi.html',
      },
    ],
  },
  {
    id: 'odyssey-2',
    label: 'Odyssey Hostel 2',
    address: 'No 88, Nguyen Trai Ward, Ha Giang City',
    images: [
      'https://res.cloudinary.com/bs1csiim/image/upload/v1786007847/1786007727449_5692166649656267231_g2276650073979578041_1115bb6594efd34b81ec2cdb875a4392_jlkgbx.jpg',
      'https://res.cloudinary.com/bs1csiim/image/upload/v1785911086/c%C6%A1_s%E1%BB%9F_1-2_yxa9gt.jpg',
    ],
    overview: {
      tagline: 'MODERN COMFORT MEETS HIGHLAND CHARM AT ODYSSEY HOSTEL 2',
      description:
        'Odyssey Hostel 2 is our newest property, thoughtfully designed with modern amenities while preserving the warm, welcoming atmosphere of a true Ha Giang guesthouse. Located right in the heart of Ha Giang City with stunning river views, it offers a wide range of rooms from cozy dormitories to spacious deluxe king rooms — perfect for every type of traveller.',
      bookingUrl: undefined,
    },
    rooms: [
      {
        name: 'Twin Room',
        price: '500.000',
        priceSub: 'per room / night',
        image: 'https://w.ladicdn.com/s700x600/5c7362c6c417ab07e5196b05/anh-man-hinh-2026-02-04-luc-100009-20260204030135-lpkzb.png',
        link: 'https://www.booking.com/hotel/vn/odyssey-2-tours-amp-motorbikes-rental.vi.html',
      },
      {
        name: 'Double Superior Room',
        price: '520.000',
        priceSub: 'per room / night',
        image: 'https://w.ladicdn.com/s700x600/5c7362c6c417ab07e5196b05/anh-man-hinh-2026-02-04-luc-100458-20260204030649-_w5p-.png',
        link: 'https://www.booking.com/hotel/vn/odyssey-2-tours-amp-motorbikes-rental.vi.html',
      },
      {
        name: 'Double Standard Room',
        price: '450.000',
        priceSub: 'per room / night',
        image: 'https://w.ladicdn.com/s750x600/5c7362c6c417ab07e5196b05/anh-man-hinh-2026-02-04-luc-101035-20260204031322-hrtb4.png',
        link: 'https://www.booking.com/hotel/vn/odyssey-2-tours-amp-motorbikes-rental.vi.html',
      },
      {
        name: 'Deluxe Twin Room',
        price: '600.000',
        priceSub: 'per room / night',
        image: 'https://w.ladicdn.com/s700x600/5c7362c6c417ab07e5196b05/anh-man-hinh-2026-02-04-luc-104420-20260204034658-dcgix.png',
        link: 'https://www.booking.com/hotel/vn/odyssey-2-tours-amp-motorbikes-rental.vi.html',
      },
      {
        name: 'Triple Room',
        price: '550.000',
        priceSub: 'per room / night',
        image: 'https://w.ladicdn.com/s750x600/5c7362c6c417ab07e5196b05/anh-man-hinh-2026-02-04-luc-105106-20260204035228-94r6c.png',
        link: 'https://www.booking.com/hotel/vn/odyssey-2-tours-amp-motorbikes-rental.vi.html',
      },
      {
        name: 'Double Superior Room, River View',
        price: '650.000',
        priceSub: 'per room / night',
        image: 'https://w.ladicdn.com/s750x600/5c7362c6c417ab07e5196b05/anh-man-hinh-2026-02-04-luc-105601-20260204035716-jlgba.png',
        link: 'https://www.booking.com/hotel/vn/odyssey-2-tours-amp-motorbikes-rental.vi.html',
      },
      {
        name: 'Deluxe King Room, River View',
        price: '850.000',
        priceSub: 'per room / night',
        image: 'https://w.ladicdn.com/s750x600/5c7362c6c417ab07e5196b05/anh-man-hinh-2026-02-04-luc-105920-20260204040149-gz0p8.png',
        link: 'https://www.booking.com/hotel/vn/odyssey-2-tours-amp-motorbikes-rental.vi.html',
      },
      {
        name: 'Bed in Dormitory',
        price: '180.000',
        priceSub: 'per person / night',
        image: 'https://w.ladicdn.com/s700x600/5c7362c6c417ab07e5196b05/anh-man-hinh-2026-02-04-luc-003106-20260203173115-efhl5.png',
        link: 'https://www.booking.com/hotel/vn/odyssey-2-tours-amp-motorbikes-rental.vi.html',
      },
    ],
  },
];

/* ─── Hostel Overview Component ─────────────────────────────────────── */
interface HostelOverviewBlockProps {
  images: [string, string];
}

const HostelOverviewBlock = React.memo(function HostelOverviewBlock({ images }: HostelOverviewBlockProps) {
  return (
    <div className="py-6 sm:py-8">
      {/* Two blob images */}
      <div className="grid grid-cols-2 gap-6 sm:gap-10 max-w-2xl mx-auto">
        {images.map((src, i) => (
          <div key={i} className="relative group">
            <div
              className={[
                'overflow-hidden aspect-[4/3] shadow-md transition-transform duration-700 ease-editorial group-hover:scale-[1.03]',
                i === 0
                  ? 'rounded-[40%_60%_60%_40%_/_40%_40%_60%_60%]'
                  : 'rounded-[60%_40%_40%_60%_/_60%_60%_40%_40%]',
              ].join(' ')}
            >
              <img
                src={src}
                alt={`Odyssey Hostel — photo ${i + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div
              className={[
                'absolute -z-10 inset-[-10px] opacity-15 blur-md',
                i === 0
                  ? 'rounded-[40%_60%_60%_40%_/_40%_40%_60%_60%] bg-forest-400'
                  : 'rounded-[60%_40%_40%_60%_/_60%_60%_40%_40%] bg-forest-300',
              ].join(' ')}
            />
          </div>
        ))}
      </div>
    </div>
  );
});

/* ─── Room Item Component ───────────────────────────────────────────── */
function RoomItem({ room }: { room: RoomCard }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const hasMultipleImages = Array.isArray(room.images) && room.images.length > 1;
  const imagesList = hasMultipleImages ? room.images! : [room.image];
  const currentImage = imagesList[currentIdx];

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx((prev) => (prev > 0 ? prev - 1 : imagesList.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx((prev) => (prev < imagesList.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    if (!hasMultipleImages) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev < imagesList.length - 1 ? prev + 1 : 0));
    }, 4500);

    return () => clearInterval(interval);
  }, [currentIdx, hasMultipleImages, imagesList.length]);

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-4xl border border-ink/[0.07] bg-white transition-all duration-700 ease-editorial hover:-translate-y-2 hover:shadow-lift"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[4/3] bg-parchment">
        <img
          src={currentImage}
          alt={room.name}
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-editorial group-hover:scale-105"
        />

        {/* Carousel controls if there are multiple images */}
        {hasMultipleImages && (
          <>
            {/* Left Button */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 border border-ink/5 text-ink shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:scale-105 active:scale-95 opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>

            {/* Right Button */}
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 border border-ink/5 text-ink shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:scale-105 active:scale-95 opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col justify-between p-7 sm:p-8">
        {/* Title */}
        <h3 className="font-display text-2xl leading-tight text-ink font-bold">
          {room.name}
        </h3>

        {/* Pricing Block */}
        <div className="mt-6 flex items-end justify-between gap-4 border-t border-ink/5 pt-5">
          <div>
            <p className="text-[10px] uppercase tracking-widest2 text-ink-muted font-sans">Rate</p>
            {room.price === '—' ? (
              <p className="font-display text-base font-semibold text-ink-soft italic">Contact for rate</p>
            ) : (
              <>
                <p className="font-display text-2xl font-bold text-forest-600">{room.price} đ</p>
                <p className="text-[11px] text-ink-muted font-sans mt-0.5">{room.priceSub}</p>
              </>
            )}
          </div>

          {/* Arrow circle — links to Booking.com if available */}
          {room.link ? (
            <a
              href={room.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View details for ${room.name} on Booking.com`}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/10 text-ink transition-all duration-500 ease-editorial hover:border-forest-500 hover:bg-forest-500 hover:text-white"
            >
              <ArrowRightIcon aria-hidden="true" className="h-4 w-4" />
            </a>
          ) : (
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/10 text-ink transition-all duration-500 ease-editorial group-hover:border-forest-500 group-hover:bg-forest-500 group-hover:text-white">
              <ArrowRightIcon aria-hidden="true" className="h-4 w-4" />
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export function Booking() {
  const [activeHostel, setActiveHostel] = useState<string>('odyssey-1');

  useSeo({
    title: 'Booking Bus & Room',
    description:
      'Daily a bus schedules, VIP cabin coach details, and pricing for room accommodations at Odyssey Hostels in Ha Giang City.',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80'
  });

  const currentHostel = HOSTELS.find((h) => h.id === activeHostel) ?? HOSTELS[0];

  // Performance Optimization: Memoize the entirely static bus schedules section.
  // This avoids re-rendering and diffing this large DOM tree when switching hostels.
  const busSchedulesSection = useMemo(() => (
    <Section tone="canvas" className="py-12 sm:py-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr]">

          {/* LEFT COLUMN: BUS SCHEDULE (TABLE ON DESKTOP, CARDS ON MOBILE) */}
          <div className="space-y-6 min-w-0">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-hidden rounded-3xl border border-ink/[0.08] bg-white shadow-soft">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] border-collapse text-left">
                  <thead>
                    <tr className="bg-forest-700 text-white uppercase text-[12px] font-semibold tracking-widest2">
                      <th className="py-4 px-5 w-[25%] text-center font-sans">Type</th>
                      <th className="py-4 px-4 w-[35%] text-center font-sans">Time</th>
                      <th className="py-4 px-4 w-[20%] text-center font-sans">Price</th>
                      <th className="py-4 px-5 w-[20%] text-center border-l border-white/10 font-sans">Drop Off</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/[0.06] text-ink font-sans">
                    {BUS_ROUTES.map((route, routeIdx) => (
                      <React.Fragment key={routeIdx}>
                        {/* Route Span Header Row */}
                        <tr className="bg-ink/[0.02]">
                          <td colSpan={4} className="py-3.5 px-5 text-center font-sans text-[12.5px] font-bold tracking-wider text-forest-600 border-y border-ink/[0.08] uppercase">
                            {route.title} ({route.durationText})
                            {route.subTitle && (
                              <span className="block mt-0.5 text-[10.5px] text-forest-600/80 uppercase font-sans font-bold tracking-wider">
                                {route.subTitle}
                              </span>
                            )}
                          </td>
                        </tr>

                        {/* Options Rows */}
                        {route.options.map((opt, optIdx) => (
                          <tr key={optIdx} className="hover:bg-ink/[0.005] transition-colors text-[13.5px]">
                            {/* TYPE CELL */}
                            <td className="py-4 px-5 font-medium text-center border-r border-ink/[0.06]">
                              {opt.type}
                            </td>

                            {/* TIME CELL */}
                            <td className="py-4 px-4 border-r border-ink/[0.06]">
                              <div className="flex flex-wrap justify-center gap-1.5 max-w-[280px] mx-auto">
                                {opt.times.split(';').map((time, tIdx) => (
                                  <span
                                    key={tIdx}
                                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-forest-50 text-forest-700 border border-forest-500/10 font-mono shadow-sm"
                                  >
                                    {time.trim()}
                                  </span>
                                ))}
                              </div>
                            </td>

                            {/* PRICE CELL */}
                            <td className="py-4 px-4 text-center border-r border-ink/[0.06] font-semibold text-ink">
                              {opt.price}
                            </td>

                            {/* DROP OFF CELL (Row-spanned) */}
                            {optIdx === 0 && (
                              <td
                                rowSpan={route.options.length}
                                className="py-4 px-5 text-center text-ink-soft bg-white align-middle font-medium border-l border-ink/[0.06]"
                              >
                                <div className="flex flex-col items-center justify-center gap-1">
                                  <MapPinIcon className="h-4 w-4 text-forest-500 shrink-0" />
                                  <span className="text-xs sm:text-[13px]">{route.dropOff}</span>
                                </div>
                              </td>
                            )}
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards View */}
            <div className="block md:hidden space-y-4">
              {BUS_ROUTES.map((route, routeIdx) => (
                <div key={routeIdx} className="bg-white rounded-3xl border border-ink/[0.08] p-5 shadow-soft space-y-4">
                  {/* Route Header */}
                  <div className="border-b border-ink/[0.06] pb-3">
                    <span className="text-[10px] font-bold tracking-widest2 text-forest-500 uppercase block mb-1">Route</span>
                    <h3 className="font-sans text-[15px] font-extrabold text-ink leading-tight uppercase">
                      {route.title}
                    </h3>
                    {route.subTitle && (
                      <p className="text-[11px] text-ink-soft font-semibold mt-0.5 uppercase">
                        {route.subTitle}
                      </p>
                    )}
                    <div className="mt-2.5 flex flex-wrap gap-2 items-center justify-between text-[11px] text-ink-muted">
                      <span className="font-medium bg-ink/[0.04] px-2 py-0.5 rounded-md">
                        {route.durationText}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPinIcon className="h-3.5 w-3.5 text-forest-500 shrink-0" />
                        <span className="font-medium">{route.dropOff}</span>
                      </span>
                    </div>
                  </div>

                  {/* Options List */}
                  <div className="space-y-3">
                    {route.options.map((opt, optIdx) => (
                      <div key={optIdx} className="bg-ink/[0.01] rounded-2xl p-3.5 border border-ink/[0.03] space-y-2.5">
                        <div className="flex justify-between items-center">
                          <span className="font-sans font-bold text-[13px] text-ink-soft">{opt.type}</span>
                          <span className="font-sans font-extrabold text-[13.5px] text-forest-600">{opt.price} đ</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {opt.times.split(';').map((time, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-forest-50 text-forest-700 border border-forest-500/10 font-mono shadow-sm"
                            >
                              {time.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: BUS MODELS VISUAL SHOWCASE */}
          <div className="flex flex-col gap-6 lg:gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-8">
              {BUS_TYPES.map((bus) => (
                <div key={bus.name} className="flex flex-col gap-2 group text-center">
                  <div className="overflow-hidden rounded-2xl border border-ink/[0.08] bg-parchment aspect-[16/10] shadow-sm">
                    <img
                      src={bus.image}
                      alt={bus.name}
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-sans text-[11px] font-bold tracking-wider text-ink-soft uppercase mt-1.5 leading-tight">
                    {bus.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </Section>
  ), []);

  return (
    <main id="main" className="w-full bg-canvas">
      <PageHero
        eyebrow="Transport & Stays"
        title="Bus schedules & Room rates"
        description="Daily a bus schedules and detailed room rates at Odyssey Hostels in Ha Giang City."
        image="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=80"
        imageAlt="Premium coach bus traveling on scenic mountain road in Ha Giang"
      />

      {busSchedulesSection}



      {/* SECTION 2: ACCOMMODATION & ROOMS */}
      <Section tone="parchment" className="py-12 sm:py-16 border-t border-ink/5">
        <Container>
          <div className="space-y-10">

            {/* SECTION HEADER */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-50 border border-forest-500/10 text-xs font-semibold text-forest-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5"
                >
                  <path d="M2 22v-3a10 10 0 0 1 20 0v3"></path>
                  <path d="M9 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
                  <path d="M19 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
                </svg>
                Odyssey Hostels
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-ink font-bold">
                Our Accommodation
              </h2>
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                Two branches in Ha Giang City — choose the one that fits your style and budget.
              </p>
            </div>

            {/* TAB SWITCHER */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-1 rounded-2xl bg-white border border-ink/[0.08] p-1.5 shadow-soft">
                {HOSTELS.map((hostel) => (
                  <button
                    key={hostel.id}
                    type="button"
                    onClick={() => setActiveHostel(hostel.id)}
                    className={[
                      'relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ease-editorial',
                      activeHostel === hostel.id
                        ? 'bg-forest-600 text-white shadow-md'
                        : 'text-ink-soft hover:text-ink hover:bg-parchment',
                    ].join(' ')}
                  >
                    {hostel.label}
                  </button>
                ))}
              </div>
            </div>

            {/* HOSTEL INFO BAR */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentHostel.id + '-meta'}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="flex items-center justify-center gap-2 text-xs text-ink-muted"
              >
                <MapPinIcon className="h-3.5 w-3.5 text-forest-500 shrink-0" aria-hidden="true" />
                <span>{currentHostel.address}</span>
              </motion.div>
            </AnimatePresence>

            {/* HOSTEL OVERVIEW BLOCK — dynamic, based on current hostel */}
            <HostelOverviewBlock images={currentHostel.images} />

            {/* ROOM CARDS GRID */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentHostel.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
              >
                {currentHostel.rooms.map((room) => (
                  <RoomItem key={room.name} room={room} />
                ))}
              </motion.div>
            </AnimatePresence>

          </div>
        </Container>
      </Section>


    </main>
  );
}