import type {
  BlogPost,
  Destination,
  ExperienceStep,
  FaqItem,
  Feature,
  GalleryItem,
  GoogleReview,
  Testimonial,
  TripAdvisorReview,
  Tour,
  Vehicle
} from
  './types';

export const images = {
  hero: "/de0f5d36-05b7-4559-bee0-506bdbfebc80.webp",
  tourClassic: "/1785766209044_7647185241213986356_7647185241213986356_ba8afa444fcf8adf9fca751ed95f66bd.webp",
  tourLuxury: "/1785766209035_7647185241213986356_7647185241213986356_52e725fe1e33ce63d3c694ac298a6f55.webp",
  tourPhoto: "/1785766208918_7647185241213986356_7647185241213986356_eca7997beaec8762a6717bc3cb251f4b.webp",
  canyon: "/a2bb3ebc-e48c-4b3d-9344-243d50a37d5f.webp",
  terraces: "/24688cd8-1340-4eb3-95ce-6d875dbaeebc.webp",
  village: "/c61ef9d6-c30b-414a-a8dc-279814141893.webp",
  experience: "/26365bbb-62f0-4ca3-945e-f697bbf1954b.webp",
  market: "/1785766225036_7647185241213986356_7647185241213986356_2c5ef16bfc0db67306a888e11cb98583.webp",
  blogHero: "/1785766208939_7647185241213986356_7647185241213986356_ce17fbdaf1864733dd3fb5ba21acc205.webp",
  galleryCliffRoad: "/1785766209135_7647185241213986356_7647185241213986356_0d50e4860e58636b30ad3b2bf5db108b.webp",
  pass: "/b14b27e9-d3fc-4d19-a0fa-a6b39dfd0b99.webp",
  fleetHero: "/9314b2e7-25ab-41b4-9d49-f1673a7633c7.webp",
  workshop: "/c792873e-3e7c-4bf5-980c-d1231f0e0735.webp",
  bikeSemi: "/honda-blade.webp",
  bikeManual: "/winner.webp",
  bikeDualSport: "/honda-xr.webp",
  bikeYmhWr: "/ymh-wr.webp",
};

/** Home hero background film. Swap this URL for your own MP4 — the hero falls back
 *  to the poster image automatically if the file is unavailable. */
export const heroVideo =
  'https://res.cloudinary.com/dvmuk0u4e/video/upload/v1785467471/175358-853243447_szxv6i.mp4';

export const brand = {
  name: 'Odyssey Ha Giang Loop',
  tagline: 'Slow journeys through the northern highlands of Vietnam',
  email: 'odyssey.hagiang@gmail.com',
  phone: '+84 357292323',
  address: 'No 11, Lane 29, Group 18, Nguyen Trai Ward, Ha Giang City',
  hours: 'Every day · 07:00 – 23:00 (ICT)'
};

export const tours: Tour[] = [
  // ─── PRIVATE TOUR ────────────────────────────────────────────────────────────
  {
    slug: 'private-tour',
    name: 'Private Tour',
    tagline: 'Personalized Ha Giang experience with private guide & easy rider',
    image: images.tourLuxury,
    duration: '2–4 days',
    groupSize: 'Private group',
    difficulty: 'Gentle',
    price: 3550000,
    rating: 5,
    reviews: 86,
    style: 'Private',
    summary:
      'Your own certified English-speaking guide, your own easy rider, and a private room every night. Built for travellers who want the highlands without compromising on comfort or pace.',
    highlights: [
      'Personalize your experience with private services',
      'Professional English-speaking tour guide, attentive to introduce the features, interesting and impressive points',
      'Easy Rider for each person, ensuring safety and freedom to admire the landscape',
      'Rest comfortably with your own space in Single/Double Private room',
    ],
    inclusions: [
      'English-speaking tour guide',
      'Easy Rider (Optional)',
      'High Quality of Accommodation: Private Ensuite room (Double Bed or Twin Bed)',
      'Local Specialties',
      'Gasoline',
      'Entrance Tickets',
    ],
    exclusions: ['Tip for drivers', 'Drinks', 'Border pass fee: 260,000 VND / person'],
    priceNote: [
      'Border pass fee: 260.000 VND / person — not included',
    ],
    pricing: [
      {
        duration: '2D1N',
        behindEasyrider: 4240000,
        selfDrive: 3900000,
        behindPartner: 3550000,
        itinerary: [
          {
            day: 1,
            title: 'Ha Giang → Quan Ba Heaven\'s Gate → Tham Ma Pass → H\'Mong King Palace → Dong Van Ancient Town',
            summary: '09:00: Start from Ha Giang City\n10:30: Visit Quan Ba Heaven\'s Gate\n11:30: Have lunch in Yen Minh, take rest\n14:00: Visit Tham Ma Pass\n15:30: Visit H\'Mong King Palace\n17:00: Go to Dong Van center town, check in & have dinner at homestay',
            highlights: ['Quan Ba Heaven\'s Gate', 'Tham Ma Pass', 'H\'Mong King Palace', 'Dong Van Ancient Town'],
          },
          {
            day: 2,
            title: 'Dong Van Ancient Town → Ma Pi Leng Pass → Nho Que River → Ha Giang City',
            summary: '07:30: Have breakfast at homestay\n08:00: Go to Ma Pi Leng Pass\n09:30: Go on boat trip on Nho Que River\n12:00: Have lunch at Meo Vac\n13:00: Start go back to Ha Giang city\n16:00: In Ha Giang city, take rest. End of the tour.',
            highlights: ['Ma Pi Leng Pass', 'Nho Que River', 'Meo Vac'],
          },
        ],
      },
      {
        duration: '3D2N',
        behindEasyrider: 5650000,
        selfDrive: 4900000,
        behindPartner: 4500000,
        itinerary: [
          {
            day: 1,
            title: 'Ha Giang → Quan Ba → 181 Road → Du Gia',
            summary: '09:00: Start from Ha Giang City\n10:30: Visit Quan Ba Heaven\'s Gate\n12:00: Visit Khau Lan Waterfall and have lunch with local villagers\n16:00: Go to Du Gia\n18:00: Check in & have dinner at homestay in Du Già',
            highlights: ['Quan Ba Heaven\'s Gate', 'Khau Lan Waterfall', 'Du Gia'],
          },
          {
            day: 2,
            title: 'Du Gia → Ban An Stream/Nho Que River → Ma Pi Leng Pass → Dong Van Ancient Town',
            summary: '07:30: Have breakfast at homestay\n08:00: Go to Ma Pi Leng Pass\n09:30: Go on boat trip on Nho Que River/Ban An Stream\n12:00: Have lunch in Mau Due road/Lunch experience on a raft\n13:00: Go to Dong Van Ancient Town\n17:00: Check in homestay at Dong Van\n18:00: Have dinner at Homestay',
            highlights: ['Ma Pi Leng Pass', 'Nho Que River', 'Ban An Stream', 'Dong Van Ancient Town'],
          },
          {
            day: 3,
            title: 'Dong Van Ancient Town → H\'Mong King Place → Ha Giang City',
            summary: '08:00: Have breakfast at homestay\n09:00: Start go back to Ha Giang city\n10:00: Visit H\'Mong King Place\n11:00: Tham Ma Pass\n12:00: Have lunch at Yen Minh town\n16:00: In Ha Giang city, take rest. End of the tour.',
            highlights: ['H\'Mong King Place', 'Tham Ma Pass', 'Yen Minh'],
          },
        ],
      },
      {
        duration: '4D3N',
        behindEasyrider: 7050000,
        selfDrive: 6540000,
        behindPartner: 5800000,
        itinerary: [
          {
            day: 1,
            title: 'Ha Giang → Quan Ba → 181 Road → Du Gia',
            summary: '09:00: Start from Ha Giang City\n10:30: Visit Quan Ba Heaven\'s Gate\n12:00: Visit Khau Lan Waterfall and have lunch with local villagers\n16:00: Go to Du Gia\n18:00: Check in & have dinner at homestay in Du Già',
            highlights: ['Quan Ba Heaven\'s Gate', 'Khau Lan Waterfall', 'Du Gia'],
          },
          {
            day: 2,
            title: 'Du Gia → Nho Que River/Ban An Stream → Ma Pi Leng Pass → Dong Van Ancient Town',
            summary: '07:30: Have breakfast at homestay\n09:30: Go on boat trip on Nho Que River/Ban An Stream\n12:00: Have lunch in Mau Due road/Lunch experience on a raft\n13:00: Go to Ma Pi Leng Pass\n16:00: Go to Dong Van center town, check in & have dinner at homestay',
            highlights: ['Nho Que River', 'Ban An Stream', 'Ma Pi Leng Pass', 'Dong Van Ancient Town'],
          },
          {
            day: 3,
            title: 'Dong Van Ancient Town → Lung Cu Flag Point → H\'Mong King Place → Tham Ma Pass → Yen Minh',
            summary: '07:30: Have breakfast at homestay\n08:00: Visit Lung Cu Flag Point\n12:00: Have lunch in Lung Cu\n13:00: Visit H\'Mong King Place\n14:00: Tham Ma Pass\n16:00: Check in homestay at Yen Minh',
            highlights: ['Lung Cu Flag Point', 'H\'Mong King Place', 'Tham Ma Pass', 'Yen Minh'],
          },
          {
            day: 4,
            title: 'Yen Minh → Lung Tam Weaving Village → Lung Khuy Cave → Ha Giang City',
            summary: '08:00: Have breakfast at homestay\n09:00: Start go back to Ha Giang city\n10:00: Visit Lung Tam Weaving Village\n11:00: Lung Khuy Cave\n12:00: Have lunch at Thai An Road\n16:30: In Ha Giang city, take rest. End of the tour.',
            highlights: ['Lung Tam Weaving Village', 'Lung Khuy Cave', 'Thai An Road'],
          },
        ],
      },
    ],
    itinerary: [
      {
        day: 1,
        title: 'Ha Giang → Quan Ba Heaven\'s Gate → Tham Ma Pass → H\'Mong King Palace → Dong Van Ancient Town',
        summary: 'Start from Ha Giang City. Visit Quan Ba Heaven\'s Gate, take rest. Have lunch in Yen Minh. Visit Tham Ma Pass and H\'Mong King Palace. Check in & have dinner at homestay in Dong Van.',
        highlights: ['Quan Ba Heaven\'s Gate', 'Tham Ma Pass', 'H\'Mong King Palace', 'Dong Van Ancient Town'],
      },
      {
        day: 2,
        title: 'Dong Van → Ma Pi Leng Pass → Nho Que River → Meo Vac → Ha Giang',
        summary: 'Breakfast at homestay. Ride to Ma Pi Leng Pass — one of the four greatest passes in Vietnam. Boat on Nho Que River. Lunch at Meo Vac. Return to Ha Giang City.',
        highlights: ['Ma Pi Leng Pass', 'Nho Que River boat', 'Meo Vac market'],
      },
      {
        day: 3,
        title: 'Odyssey → Waterfall Khan Lan → Have lunch Khau Lan → Twin Mountains Quan Ba → Du Già',
        summary: 'Start from Odyssey. Visit Waterfall Khan Lan. Lunch at Khau Lan. See Twin Mountains Quan Ba. End the day in Du Già valley.',
        highlights: ['Waterfall Khan Lan', 'Twin Mountains Quan Ba', 'Du Già valley'],
      },
      {
        day: 4,
        title: 'Du Già → Lung Khuy Cave → Hoang Su Phi Terraces → Ha Giang',
        summary: 'Morning at Du Già. Visit Lung Khuy Cave. See Hoang Su Phi rice terraces. Return to Ha Giang for farewell.',
        highlights: ['Lung Khuy Cave', 'Hoang Su Phi Terraces', 'Farewell lunch'],
      },
    ],
  },

  // ─── GROUP TOUR ──────────────────────────────────────────────────────────────
  {
    slug: 'group-tour',
    name: 'Group Tour',
    tagline: 'The most budget-friendly way to ride the loop with fellow travellers',
    image: images.tourClassic,
    duration: '3–4 days',
    groupSize: 'Small group',
    difficulty: 'Balanced',
    price: 3050000,
    rating: 4.9,
    reviews: 214,
    style: 'Group',
    summary:
      'The most cost-efficient option — share the loop with travellers from around the world, enjoy lively evenings and make friends that last long after the ride.',
    highlights: [
      'The cost is optimized and saved the most',
      'Many interesting night activities (party, karaoke, happy water)',
      'Connect more companions with new passions',
      'Have the opportunity to exchange culture with many tourists from different countries',
    ],
    inclusions: [
      'Accommodation (Bunk Bed in homestay, can be upgraded to private room)',
      'Easy rider (optional)',
      'Daily Meals',
      'Gasoline',
      'Entrance Fee',
      'Motorbike & insurance of motorbike',
    ],
    exclusions: ['Tip for drivers', 'Drinks', 'Border pass fee: 260,000 VND / person'],
    priceNote: [
      'Border pass fee: 260.000 VND / person — not included',
    ],
    pricing: [
      {
        duration: '3D2N',
        behindEasyrider: 4450000,
        selfDrive: 3550000,
        behindPartner: 3050000,
        upgrades: [
          { label: 'Upgrade to private room', price: 1000000 },
        ],
        itinerary: [
          {
            day: 1,
            title: 'Ha Giang → Quan Ba → 181 Road → Du Gia',
            summary: '09:00: Start from Ha Giang City\n10:30: Visit Quan Ba Heaven\'s Gate\n12:00: Visit Khau Lan Waterfall and have lunch with local villagers\n16:00: Go to Du Gia\n18:00: Check in & have dinner at homestay in Du Già',
            highlights: ['Quan Ba Heaven\'s Gate', 'Khau Lan Waterfall', 'Du Gia'],
          },
          {
            day: 2,
            title: 'Du Gia → Ban An Stream/Nho Que River → Ma Pi Leng Pass → Dong Van Ancient Town',
            summary: '07:30: Have breakfast at homestay\n08:00: Go to Ma Pi Leng Pass\n09:30: Go on boat trip on Nho Que River/Ban An Stream\n12:00: Have lunch in Mau Due road/Lunch experience on a raft\n13:00: Go to Dong Van Ancient Town\n17:00: Check in homestay at Dong Van\n18:00: Have dinner at Homestay',
            highlights: ['Ma Pi Leng Pass', 'Nho Que River', 'Ban An Stream', 'Dong Van Ancient Town'],
          },
          {
            day: 3,
            title: 'Dong Van Ancient Town → H\'Mong King Place → Ha Giang City',
            summary: '08:00: Have breakfast at homestay\n09:00: Start go back to Ha Giang city\n10:00: Visit H\'Mong King Place\n11:00: Tham Ma Pass\n12:00: Have lunch at Yen Minh town\n16:00: In Ha Giang city, take rest. End of the tour.',
            highlights: ['H\'Mong King Place', 'Tham Ma Pass', 'Yen Minh'],
          },
        ],
      },
      {
        duration: '4D3N',
        behindEasyrider: 5550000,
        selfDrive: 4650000,
        behindPartner: 4150000,
        upgrades: [
          { label: 'Upgrade to private room', price: 1400000 },
        ],
        itinerary: [
          {
            day: 1,
            title: 'Ha Giang → Quan Ba → 181 Road → Du Gia',
            summary: '09:00: Start from Ha Giang City\n10:30: Visit Quan Ba Heaven\'s Gate\n12:00: Visit Khau Lan Waterfall and have lunch with local villagers\n16:00: Go to Du Gia\n18:00: Check in & have dinner at homestay in Du Già',
            highlights: ['Quan Ba Heaven\'s Gate', 'Khau Lan Waterfall', 'Du Gia'],
          },
          {
            day: 2,
            title: 'Du Gia → Nho Que River/Ban An Stream → Ma Pi Leng Pass → Dong Van Ancient Town',
            summary: '07:30: Have breakfast at homestay\n09:30: Go on boat trip on Nho Que River/Ban An Stream\n12:00: Have lunch in Mau Due road/Lunch experience on a raft\n13:00: Go to Ma Pi Leng Pass\n16:00: Go to Dong Van center town, check in & have dinner at homestay',
            highlights: ['Nho Que River', 'Ban An Stream', 'Ma Pi Leng Pass', 'Dong Van Ancient Town'],
          },
          {
            day: 3,
            title: 'Dong Van Ancient Town → Lung Cu Flag Point → H\'Mong King Place → Tham Ma Pass → Yen Minh',
            summary: '07:30: Have breakfast at homestay\n08:00: Visit Lung Cu Flag Point\n12:00: Have lunch in Lung Cu\n13:00: Visit H\'Mong King Place\n14:00: Tham Ma Pass\n16:00: Check in homestay at Yen Minh',
            highlights: ['Lung Cu Flag Point', 'H\'Mong King Place', 'Tham Ma Pass', 'Yen Minh'],
          },
          {
            day: 4,
            title: 'Yen Minh → Lung Tam Weaving Village → Lung Khuy Cave → Ha Giang City',
            summary: '08:00: Have breakfast at homestay\n09:00: Start go back to Ha Giang city\n10:00: Visit Lung Tam Weaving Village\n11:00: Lung Khuy Cave\n12:00: Have lunch at Thai An Road\n16:30: In Ha Giang city, take rest. End of the tour.',
            highlights: ['Lung Tam Weaving Village', 'Lung Khuy Cave', 'Thai An Road'],
          },
        ],
      },
    ],
    itinerary: [
      {
        day: 1,
        title: 'Ha Giang → Quan Ba Heaven\'s Gate → Tham Ma Pass → H\'Mong King Palace → Dong Van Ancient Town',
        summary: 'Start from Ha Giang City. Visit Quan Ba Heaven\'s Gate, take rest. Have lunch in Yen Minh. Visit Tham Ma Pass and H\'Mong King Palace. Check in & have dinner at homestay in Dong Van.',
        highlights: ['Quan Ba Heaven\'s Gate', 'Tham Ma Pass', 'H\'Mong King Palace', 'Dong Van Ancient Town'],
      },
      {
        day: 2,
        title: 'Dong Van → Ma Pi Leng Pass → Nho Que River → Meo Vac → Ha Giang',
        summary: 'Breakfast at homestay. Ride Ma Pi Leng Pass. Boat on Nho Que River. Lunch at Meo Vac. Group activities in the evening.',
        highlights: ['Ma Pi Leng Pass', 'Nho Que River', 'Group evening activities'],
      },
      {
        day: 3,
        title: 'Odyssey → Waterfall Khan Lan → Lunch Khau Lan → Twin Mountains Quan Ba → Du Già',
        summary: 'Depart Odyssey. Visit Waterfall Khan Lan. Lunch at Khau Lan. See Twin Mountains Quan Ba. Arrive Du Già valley.',
        highlights: ['Waterfall Khan Lan', 'Twin Mountains Quan Ba', 'Du Già valley'],
      },
      {
        day: 4,
        title: 'Du Già → Lung Khuy Cave → Return Ha Giang',
        summary: 'Morning at Du Già. Lung Khuy Cave. Return to Ha Giang for farewell dinner.',
        highlights: ['Du Già morning', 'Lung Khuy Cave', 'Farewell'],
      },
    ],
  },

  // ─── CAR TOUR ────────────────────────────────────────────────────────────────
  {
    slug: 'car-tour',
    name: 'Car Tour',
    tagline: 'All the scenery, maximum comfort — by private air-conditioned car',
    image: images.tourPhoto,
    duration: '2–4 days',
    groupSize: 'Up to 7 guests',
    difficulty: 'Gentle',
    price: 6000000,
    rating: 4.8,
    reviews: 57,
    style: 'Car',
    summary:
      'See every highlight of the Ha Giang Loop from a private, air-conditioned car with a professional guide. Perfect for families, seniors, or anyone who prefers four wheels.',
    highlights: [
      'The cost is optimized and saved the most',
      'Many interesting night activities (party, karaoke, happy water)',
      'Connect more companions with new passions',
      'Have the opportunity to exchange culture with many tourists from different countries',
    ],
    inclusions: [
      'English-speaking tour guide',
      'Private air-conditioned car & driver',
      'Local Specialties',
      'Gasoline',
      'Entrance Tickets',
      '1 private room before the tour starts',
    ],
    exclusions: ['Tip for drivers', 'Drinks', 'Border pass fee: 260,000 VND / person'],
    priceNote: [
      'Price per person · Minimum 2 people · Includes 1 private room the night before departure',
      'Border pass fee: 260.000 VND / person — not included',
    ],
    pricing: [
      {
        duration: '2D1N',
        perPersonPrice: 6000000,
        itinerary: [
          {
            day: 1,
            title: 'Ha Giang → Quan Ba Heaven\'s Gate → Tham Ma Pass → H\'Mong King Palace → Dong Van Ancient Town',
            summary: '09:00: Start from Ha Giang City\n10:30: Visit Quan Ba Heaven\'s Gate\n11:30: Have lunch in Yen Minh, take rest\n14:00: Visit Tham Ma Pass\n15:30: Visit H\'Mong King Palace\n17:00: Go to Dong Van center town, check in & have dinner at homestay',
            highlights: ['Quan Ba Heaven\'s Gate', 'Tham Ma Pass', 'H\'Mong King Palace', 'Dong Van Ancient Town'],
          },
          {
            day: 2,
            title: 'Dong Van Ancient Town → Ma Pi Leng Pass → Nho Que River → Ha Giang City',
            summary: '07:30: Have breakfast at homestay\n08:00: Go to Ma Pi Leng Pass\n09:30: Go on boat trip on Nho Que River\n12:00: Have lunch at Meo Vac\n13:00: Start go back to Ha Giang city\n16:00: In Ha Giang city, take rest. End of the tour.',
            highlights: ['Ma Pi Leng Pass', 'Nho Que River', 'Meo Vac'],
          },
        ],
      },
      {
        duration: '3D2N',
        perPersonPrice: 7800000,
        itinerary: [
          {
            day: 1,
            title: 'Ha Giang → Quan Ba → 181 Road → Du Gia',
            summary: '09:00: Start from Ha Giang City\n10:30: Visit Quan Ba Heaven\'s Gate\n12:00: Visit Khau Lan Waterfall and have lunch with local villagers\n16:00: Go to Du Gia\n18:00: Check in & have dinner at homestay in Du Già',
            highlights: ['Quan Ba Heaven\'s Gate', 'Khau Lan Waterfall', 'Du Gia'],
          },
          {
            day: 2,
            title: 'Du Gia → Ban An Stream/Nho Que River → Ma Pi Leng Pass → Dong Van Ancient Town',
            summary: '07:30: Have breakfast at homestay\n08:00: Go to Ma Pi Leng Pass\n09:30: Go on boat trip on Nho Que River/Ban An Stream\n12:00: Have lunch in Mau Due road/Lunch experience on a raft\n13:00: Go to Dong Van Ancient Town\n17:00: Check in homestay at Dong Van\n18:00: Have dinner at Homestay',
            highlights: ['Ma Pi Leng Pass', 'Nho Que River', 'Ban An Stream', 'Dong Van Ancient Town'],
          },
          {
            day: 3,
            title: 'Dong Van Ancient Town → H\'Mong King Place → Ha Giang City',
            summary: '08:00: Have breakfast at homestay\n09:00: Start go back to Ha Giang city\n10:00: Visit H\'Mong King Place\n11:00: Tham Ma Pass\n12:00: Have lunch at Yen Minh town\n16:00: In Ha Giang city, take rest. End of the tour.',
            highlights: ['H\'Mong King Place', 'Tham Ma Pass', 'Yen Minh'],
          },
        ],
      },
      {
        duration: '4D3N',
        perPersonPrice: 9000000,
        itinerary: [
          {
            day: 1,
            title: 'Ha Giang → Quan Ba → 181 Road → Du Gia',
            summary: '09:00: Start from Ha Giang City\n10:30: Visit Quan Ba Heaven\'s Gate\n12:00: Visit Khau Lan Waterfall and have lunch with local villagers\n16:00: Go to Du Gia\n18:00: Check in & have dinner at homestay in Du Già',
            highlights: ['Quan Ba Heaven\'s Gate', 'Khau Lan Waterfall', 'Du Gia'],
          },
          {
            day: 2,
            title: 'Du Gia → Nho Que River/Ban An Stream → Ma Pi Leng Pass → Dong Van Ancient Town',
            summary: '07:30: Have breakfast at homestay\n09:30: Go on boat trip on Nho Que River/Ban An Stream\n12:00: Have lunch in Mau Due road/Lunch experience on a raft\n13:00: Go to Ma Pi Leng Pass\n16:00: Go to Dong Van center town, check in & have dinner at homestay',
            highlights: ['Nho Que River', 'Ban An Stream', 'Ma Pi Leng Pass', 'Dong Van Ancient Town'],
          },
          {
            day: 3,
            title: 'Dong Van Ancient Town → Lung Cu Flag Point → H\'Mong King Place → Tham Ma Pass → Yen Minh',
            summary: '07:30: Have breakfast at homestay\n08:00: Visit Lung Cu Flag Point\n12:00: Have lunch in Lung Cu\n13:00: Visit H\'Mong King Place\n14:00: Tham Ma Pass\n16:00: Check in homestay at Yen Minh',
            highlights: ['Lung Cu Flag Point', 'H\'Mong King Place', 'Tham Ma Pass', 'Yen Minh'],
          },
          {
            day: 4,
            title: 'Yen Minh → Lung Tam Weaving Village → Lung Khuy Cave → Ha Giang City',
            summary: '08:00: Have breakfast at homestay\n09:00: Start go back to Ha Giang city\n10:00: Visit Lung Tam Weaving Village\n11:00: Lung Khuy Cave\n12:00: Have lunch at Thai An Road\n16:30: In Ha Giang city, take rest. End of the tour.',
            highlights: ['Lung Tam Weaving Village', 'Lung Khuy Cave', 'Thai An Road'],
          },
        ],
      },
    ],
    itinerary: [
      {
        day: 1,
        title: 'Ha Giang → Quan Ba → Yen Minh → Dong Van',
        summary: 'Depart Ha Giang by car. Stop at Quan Ba Heaven\'s Gate. Lunch Yen Minh. Visit Dong Van Ancient Town.',
        highlights: ['Quan Ba Heaven\'s Gate', 'Tham Ma Pass', 'Dong Van Ancient Town'],
      },
      {
        day: 2,
        title: 'Dong Van → Ma Pi Leng Pass → Nho Que → Return',
        summary: 'Drive Ma Pi Leng Pass. Optional boat on Nho Que River. Lunch Meo Vac. Return Ha Giang.',
        highlights: ['Ma Pi Leng Pass', 'Nho Que River', 'Meo Vac'],
      },
      {
        day: 3,
        title: 'Ha Giang → Du Già → Twin Mountains → Return',
        summary: 'Visit Du Già waterfall and Twin Mountains Quan Ba.',
        highlights: ['Du Già waterfall', 'Twin Mountains', 'Local lunch'],
      },
      {
        day: 4,
        title: 'Lung Khuy Cave & Hoang Su Phi Terraces',
        summary: 'Explore Lung Khuy Cave and the famous rice terraces of Hoang Su Phi.',
        highlights: ['Lung Khuy Cave', 'Hoang Su Phi Terraces', 'Farewell'],
      },
    ],
  },
];


export const destinations: Destination[] = [
  {
    slug: 'nho-que-canyon',
    name: 'Nho Que River',
    region: 'Meo Vac',
    image: 'https://res.cloudinary.com/bs1csiim/image/upload/v1785913293/nho_que_river_nrfiza.jpg',
    elevation: '320 m',
    bestSeason: 'October – April',
    blurb: 'A ribbon of jade water between thousand-metre limestone walls.',
    description:
      'The Nho Que River is a stunning natural attraction in Ha Giang, known for its serene emerald waters that flow through the dramatic landscapes of the region. It originates from China and enters Vietnam at Seo Lung village, offering a unique boating experience through the Tu San Canyon and along the Ma Pi Leng Pass. The river is not only a picturesque site but also an essential part of local life, supporting fishing and agriculture. A boat trip on the Nho Que River allows visitors to fully immerse themselves in the tranquil beauty of Ha Giang’s nature.',
    experiences: ['Private boat charter', 'Tu San Canyon boating', 'Emerald water swim']
  },
  {
    slug: 'ma-pi-leng-pass',
    name: 'Ma Pi Leng Pass',
    region: 'Between Dong Van & Meo Vac',
    image: 'https://res.cloudinary.com/bs1csiim/image/upload/v1785913901/ma_pi_leng_pass_kz3rqi.png',
    elevation: '1,500 m',
    bestSeason: 'March – May',
    blurb: 'Twenty kilometres of cliff road cut by hand across the sky.',
    description:
      'Ma Pi Leng Pass is a 20-km-long mountain pass that connects Dong Van and Meo Vac districts. It is considered one of the most dangerous and beautiful roads in Vietnam, with steep cliffs, winding curves and breathtaking views of the Nho Que River and the karst landscape.',
    experiences: ['Sunrise ride', 'Sky path walk', 'Cloud sea viewpoint']
  },
  {
    slug: 'quan-ba-heavens-gate',
    name: "Quan Ba Heaven's Gate",
    region: 'Quan Ba',
    image: 'https://res.cloudinary.com/bs1csiim/image/upload/v1785913301/quan_ba_heaven_s_gate_cig6wo.png',
    elevation: '1,500 m',
    bestSeason: 'All year',
    blurb: 'A tranquil mountain pass blending folklore legends with Twin Mountains views.',
    description:
      'Quan Ba Heaven’s Gate captivates travelers with its Twin Mountains, a symbol of folklore and natural beauty. With the Fairy Breast Mountains standing as local legends. This scenic spot offers a tranquil escape, blending cultural richness with the splendor of Vietnam’s landscapes.',
    experiences: ['Twin Mountains view', "Heaven's Gate climb", 'Local coffee stop']
  },
  {
    slug: 'lung-khuy-cave',
    name: 'Lung Khuy Cave',
    region: 'Quan Ba',
    image: 'https://res.cloudinary.com/bs1csiim/image/upload/v1785913292/lung_khuy_cave_v5ydwd.jpg',
    elevation: '1,200 m',
    bestSeason: 'All year',
    blurb: "The largest cave in Ha Giang's karst landscape, featuring natural stalactite galleries.",
    description:
      'Lung Khuy Cave, the biggest cave in Ha Giang’s karst landscape, beckons adventurers with its otherworldly beauty. Discovered by locals, this subterranean marvel is adorned with intricate stalactites and stalagmites, sculpted over millennia into a natural art gallery. Just 10 km from Quan Ba, the cave’s ethereal chambers are a silent witness to the region’s geological history, offering a serene retreat from the world above.',
    experiences: ['Stalactite path walk', 'Subterranean photography', 'Geological guided tour']
  },
  {
    slug: 'lung-tam-weaving-village',
    name: 'Lung Tam Weaving Village',
    region: 'Quan Ba',
    image: 'https://res.cloudinary.com/bs1csiim/image/upload/v1785913298/lung_tam_weaving_village_hfrmwa.png',
    elevation: '900 m',
    bestSeason: 'All year',
    blurb: "A vibrant tapestry of traditional H'Mong handwoven linen craftsmanship.",
    description:
      'Lung Tam Weaving Village, nestled in the heart of Ha Giang’s Quản Bạ valley, is a vibrant tapestry of culture and tradition. Here, the H’Mong people’s artistry comes alive in every handwoven linen piece, reflecting a heritage rich with color and texture. Visitors can witness the meticulous 41-step process that transforms flax into exquisite fabrics, a testament to the community’s dedication to preserving their ancestral craft. With products ranging from clothing to decorative items, each creation embodies the spirit of Lung Tam, making it a must-visit destination for those seeking to experience the authentic essence of Vietnam’s highland craftsmanship.',
    experiences: ['Loom weaving workshop', 'Flax processing demo', 'Handicraft shopping']
  },
  {
    slug: 'yen-minh-town',
    name: 'Yen Minh Town',
    region: 'Yen Minh',
    image: 'https://res.cloudinary.com/bs1csiim/image/upload/v1785913297/yen_minh_town_zsz027.jpg',
    elevation: '800 m',
    bestSeason: 'All year',
    blurb: 'A tranquil pine-forested valley stop untouched by heavy tourism.',
    description:
      'Yen Minh Town, a quaint stop on the Ha Giang Loop, is a gateway to the stunning landscapes and rich ethnic tapestry of Vietnam’s northern frontier. While the town itself is modest, it’s celebrated for its authentic vibe and delicious local cuisine. The surrounding areas, like the Na Khe Pine Forest—often called the “Da Lat of the North”—and Du Gia National Park, offer breathtaking natural beauty and a glimpse into the lives of the region’s diverse ethnic communities. Whether you’re exploring the serene pine forests or joining the locals for a game of football, Yen Minh provides a slice of rural Vietnamese life untouched by tourism.',
    experiences: ['Pine forest stroll', 'Local food tasting', 'Ethnic village homestay']
  },
  {
    slug: 'tham-ma-pass',
    name: 'Tham Ma Pass',
    region: 'Dong Van',
    image: 'https://res.cloudinary.com/bs1csiim/image/upload/v1785913300/tham_ma_pass_ny60xl.png',
    elevation: '1,500 m',
    bestSeason: 'All year',
    blurb: "The iconic S-shaped zigzag pass historically used to test horses' strength.",
    description:
      'Tham Ma Pass, with its iconic s-shaped curves, is a breathtaking feature of Ha Giang’s landscape. This 5 km stretch of road winds through the Dong Van district, offering stunning views of the surrounding karst formations. At an altitude of 1500 meters, it’s not the highest pass in the region, but its unique zigzagging path provides a thrilling ride for travelers. Historically, locals tested their horses’ strength here, a tradition that adds to the pass’s rich cultural tapestry.',
    experiences: ['S-curve scenic ride', 'Mountain-top photography', 'Local H\'Mong children greeting']
  },
  {
    slug: 'hmong-kings-palace',
    name: "H'Mong King's Palace",
    region: 'Dong Van',
    image: 'https://res.cloudinary.com/bs1csiim/image/upload/v1785913294/h_mong_king_s_pallace_z5zdid.png',
    elevation: '1,400 m',
    bestSeason: 'All year',
    blurb: 'A unique stone and wood architectural jewel from the French colonial era.',
    description:
      'This is a unique and beautiful architecture of this plateau. The entrance to the palace is just sloping, paved with large square stone. The palace is surrounded by two walls built of stone, about 60cm up to 3m high. Now his house was opened for tourists. If you like history, you can listen and learn so much history of this building, the life of Hmong people in Dong Van in the French colonial period. It’s also interesting Ha Giang attractions.',
    experiences: ['Historical courtyard walk', 'French colonial tour', 'Ornate wood carvings study']
  },
  {
    slug: 'lung-cu-flag-point',
    name: 'Lung Cu Flag Point',
    region: 'Dong Van',
    image: 'https://res.cloudinary.com/bs1csiim/image/upload/v1785913293/lung_cu_flag_point_nkx0ca.png',
    elevation: '1,470 m',
    bestSeason: 'All year',
    blurb: 'The historic monument marking the northernmost point of Vietnam.',
    description:
      'A monument that marks the northernmost point of Vietnam. It is located on Lung Cu peak, 1,470 meters above sea level, in Dong Van district. The monument consists of a 30-meter-high tower on the summit of the peak. The tower is topped with a large Vietnamese flag that represents the 54 ethnic groups in Vietnam. It is located near the Chinese border and offers a panoramic view of the border area. It has 839 stone steps that lead to the top of the tower, divided into three parts. Visitors can climb 200 steps to reach the flagpole. It is surrounded by a beautiful landscape of mountains, valleys and villages. You can see the rice terraces, corn fields and buckwheat flowers along the way.',
    experiences: ['Stone steps climb', 'Panoramic border views', 'Lo Lo Chai village visit']
  },
  {
    slug: 'vietnam-north-point',
    name: "Vietnam's North Point",
    region: 'Dong Van',
    image: 'https://res.cloudinary.com/bs1csiim/image/upload/v1785913295/Viet_Nam_the_north_point_vlacz5.jpg',
    elevation: '1,400 m',
    bestSeason: 'All year',
    blurb: 'A place of profound national pride overlooking the Nho Que River.',
    description:
      'Vietnam’s North Point is a place of profound national pride and natural splendor. Located in Lung Cu, Dong Van District, this northernmost tip of Vietnam is marked by a flag tower on a peak overlooking the Nho Que River. The site offers panoramic views that stretch across the border into China, symbolizing the sovereignty and unity of the Vietnamese nation. It’s a must-visit for travelers seeking to experience the geographical and cultural extremities of Vietnam.',
    experiences: ['Border overlook hike', 'Nho Que river views', 'National sovereignty landmark']
  },
  {
    slug: 'dong-van-ancient-town',
    name: 'Dong Van Ancient Town',
    region: 'Dong Van',
    image: 'https://res.cloudinary.com/bs1csiim/image/upload/v1785913292/dong_van_ancient_town_ppkxby.png',
    elevation: '1,410 m',
    bestSeason: 'All year',
    blurb: 'A historical mosaic of heritage houses, cafes, and ethnic markets.',
    description:
      'Dong Van Ancient Town, nestled in the heart of Ha Giang’s Dong Van Karst Plateau, is a historical jewel. With over a century of history, this small town is a mosaic of cultural heritage and natural beauty. The town’s old quarter is lined with houses that are nearly 200 years old, offering a glimpse into a bygone era. Visitors can explore the market, enjoy local cuisine at quaint cafes, and stay in homestays that preserve the town’s rustic charm. Dong Van is not just a place but an experience, where the past and present of Vietnam’s northern highlands converge.',
    experiences: ['Old quarter cafe hopping', 'Clay-tiled house tour', 'Sunday market exchange']
  },
  {
    slug: 'ban-an-stream-ngoc-long',
    name: 'Ban An Stream, Ngoc Long',
    region: 'Meo Vac',
    image: 'https://res.cloudinary.com/bs1csiim/image/upload/v1785913288/ban_an_stream_boujcn.jpg',
    elevation: '500 m',
    bestSeason: 'April – September',
    blurb: 'A serene, undiscovered stream of green waters and mountain forests.',
    description:
      'Ban An Stream in Ngoc Long commune is a serene and picturesque destination in Ha Giang. Known for its green waters and tranquil atmosphere, the stream is surrounded by majestic mountains and lush forests. It’s a relatively undiscovered spot, offering a peaceful retreat and a chance to immerse in nature’s beauty. Visitors can rent a traditional boat for a small fee to explore the stream and swim in the stream.',
    experiences: ['Bamboo raft boating', 'Freshwater stream swim', 'Undiscovered jungle trek']
  },
  {
    slug: 'du-gia-valley',
    name: 'Du Gia Village',
    region: 'Yen Minh',
    image: 'https://res.cloudinary.com/bs1csiim/image/upload/v1785913299/du_gia_village_jgydzr.png',
    elevation: '760 m',
    bestSeason: 'April – September',
    blurb: 'A green bowl of rice fields, waterfalls and slow evenings.',
    description:
      'Du Gia Village, a serene haven in Ha Giang, is a picturesque locale that’s perfect for relaxation during the Ha Giang loop. This charming village is nestled alongside a river and is encircled by lush hills, offering an idyllic setting for travelers. It’s a place where you can immerse yourself in the peaceful beauty of nature, explore the surrounding rice fields and rolling hills, and experience the warmth of the local hospitality. With a variety of homestays and local eateries, Du Gia provides a delightful glimpse into rural Vietnamese life and culture.',
    experiences: ['Waterfall swim', 'Homestay supper', 'Rice field cycling']
  },
  {
    slug: 'du-gia-waterfall',
    name: 'Du Gia Waterfall',
    region: 'Yen Minh',
    image: 'https://res.cloudinary.com/bs1csiim/image/upload/v1785913294/du_gia_waterfall_umep3a.png',
    elevation: '750 m',
    bestSeason: 'April – September',
    blurb: 'A hidden natural oasis cascading into clear swimmable pools.',
    description:
      'Du Gia Waterfall, a serene oasis in Ha Giang, is a natural masterpiece tucked away in the mountains. This tranquil spot is perfect for those seeking a refreshing escape into nature. The waterfall cascades from a height of about 6 meters, creating a picturesque scene amid the lush greenery. During summer, the clear waters at the base are ideal for a cool dip or a picnic. To reach this hidden gem, visitors can take a scenic ride from Ha Giang City along TL176, with the journey itself offering stunning views and photo opportunities. Whether you’re an avid trekker or simply looking to unwind, Du Gia Waterfall promises a memorable experience in the heart of Ha Giang’s pristine beauty.',
    experiences: ['Waterfall plunge pool swim', 'Scenic mountain ride', 'Rockside picnic']
  }
];


export const vehicles: Vehicle[] = [
  {
    id: 'semi-110',
    name: 'Honda Blade',
    category: 'Semi-Automatic 110cc',
    image: images.bikeSemi,
    engine: '110cc semi-automatic',
    bestFor: 'First-time riders and anyone who prefers not to think about a clutch',
    dailyRate: 180000,
    specs: [
      { label: 'Price (per day - VND)', value: '180.000 VND' },
      { label: 'Price + Insurance', value: '250.000 VND' }],

    notes:
      'Light, forgiving and quick to learn. Serviced after every departure and retired from the fleet at 20,000 km.'
  },
  {
    id: 'manual-150',
    name: 'Winner, Exciter',
    category: 'Manual / Clutch Motorbike 150cc',
    image: images.bikeManual,
    engine: '150cc manual',
    bestFor: 'Experienced riders who want power and agility on the mountain roads',
    dailyRate: 350000,
    specs: [
      { label: 'Price (per day - VND)', value: '350.000 VND' },
      { label: 'Price + Insurance', value: '450.000 VND' }],

    notes:
      'Powerful and responsive for experienced riders. Great handling on the winding mountain passes of Ha Giang.'
  },
  {
    id: 'dualsport-150',
    name: 'Yamaha WR 155, Honda XR',
    category: 'Manual / Clutch Motorbike 150cc',
    image: images.bikeYmhWr,
    images: [images.bikeYmhWr, images.bikeDualSport],
    engine: '150cc manual dual-sport',
    bestFor: 'Experienced riders who want the steep detours and unsealed tracks',
    dailyRate: 550000,
    specs: [
      { label: 'Price (per day - VND)', value: '550.000 VND' },
      { label: 'Price + Insurance', value: '800.000 VND' }],

    notes:
      'Long-travel suspension and proper ground clearance for the rough sections west of Dong Van. Prior manual experience required.'
  }];


export const features: Feature[] = [
  {
    id: 'guides',
    title: 'Guides who grew up here',
    description:
      'Every journey is led by a local guide from the province, trained in first aid and paid a career wage — not a seasonal one.',
    icon: 'compass'
  },
  {
    id: 'small',
    title: 'Small by design',
    description:
      'Eight travellers maximum on group departures. Small enough to fit around one dinner table and one village courtyard.',
    icon: 'users'
  },
  {
    id: 'stays',
    title: 'Stays worth arriving to',
    description:
      'Hand-picked homestays and two boutique lodges, each visited by our team every season before it goes on the itinerary.',
    icon: 'bed'
  }];


export const experienceSteps: ExperienceStep[] = [
  {
    id: 'talk',
    step: '01',
    title: 'A conversation, not a form',
    description:
      'We start with a call. What you want from a week away matters more than which itinerary you clicked on.'
  },
  {
    id: 'design',
    step: '02',
    title: 'Your route, drafted',
    description:
      'Within three days you receive a day-by-day route with stays, distances and the two or three decisions still open.'
  },
  {
    id: 'ride',
    step: '03',
    title: 'The days themselves',
    description:
      'You ride or you are driven. Either way your guide carries the logistics and you carry nothing but a camera.'
  },
  {
    id: 'after',
    step: '04',
    title: 'What you take home',
    description:
      'An edited gallery from your guide, the recipes you asked about, and a standing invitation to come back in a different season.'
  }];


export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'I have travelled a lot and rarely felt so unmanaged and so looked after at the same time. The pacing was the whole trick — we were never rushing towards the next photograph.',
    name: 'Elena Marchetti',
    origin: 'Milan, Italy',
    tour: 'The Northern Arc',
    rating: 5
  },
  {
    id: 't2',
    quote:
      'Our guide Sung stopped the group at a bend for no reason other than the light. Twenty minutes later the valley cleared. That is the difference between a tour and a trip.',
    name: 'James Okonkwo',
    origin: 'London, UK',
    tour: 'Light & Limestone',
    rating: 5
  },
  {
    id: 't3',
    quote:
      'We booked the private itinerary for our anniversary and it was faultless — beautiful rooms, extraordinary food, and not a single moment of feeling like a customer.',
    name: 'Marie & Theo Aubert',
    origin: 'Lyon, France',
    tour: 'The Private Plateau',
    rating: 5
  },
  {
    id: 't4',
    quote:
      'Seven days and I only rode about four hours a day. I came home rested, which has never once happened to me on an adventure holiday.',
    name: 'Priya Raghavan',
    origin: 'Singapore',
    tour: 'The Long Week',
    rating: 5
  }];

export const tripAdvisorReviews: TripAdvisorReview[] = [
  {
    id: 'ta1',
    name: 'Yvonne A',
    location: 'Netherlands',
    contributions: 31,
    avatar: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/f6/e8/24/default-avatar-2020-60.jpg?w=100&h=-1&s=1',
    rating: 5,
    title: 'Private tour with Odyssey is highly recommended!',
    quote: 'We had booked a four-day private tour from in the Netherlands with Odyssey. The Ha Giang run with Odyssey was, in a word, a great experience! From the first moment, the moment with Odyssey via whatsapp was pleasant and fast. The staff is friendly, helpful and very...',
    fullQuote: 'We had booked a four-day private tour from in the Netherlands with Odyssey. The Ha Giang run with Odyssey was, in a word, a great experience! From the first moment, the moment with Odyssey via whatsapp was pleasant and fast. The staff is friendly, helpful and very flexible. Even the last minute rebooking of the tour (1 day before the tour would start) to avoid the rain was no problem and quickly arranged via whatsapp. So very nice! Our riders Tom and Liam were very friendly, sociable and very experienced. We have felt very safe all days at the back of the engine. Even on most narrow roads and bumpy roads they knew how to maneuver well. Very handsome! Tom speaks good English and knew a lot about the sights and customs of the region. He has taken excellent care of us these four days as driver and guide. He showed us many special places and also knew how to time the spots well so that we often avoided the large groups and we were regularly "alone". We also drove with the private tour extra beautiful / narrow parts of the Ha Giang loop that are avoided by groups which made this tour extra special. The organization was also excellent. What we really liked was that this organization does not focus on partying young people but on smaller groups and private tours. It is recommended to stay one night in the hostel or hotel (200 m away) prior to the tour. During the tour itself we stayed in very neat/nice accommodations and also the places for lunch and dinner were above expectations (because we had booked a private tour we also had extra nice rooms and sometimes better stops for food). On day 4 we arrived at the hostel on time and were allowed to use the showers of the hostel (see and very neat) to catch the bus back to Hanoi an hour later. Odyssey is highly recommended for a Ha Giang tour!',
    visitedMonth: 'March 2026',
    travelType: 'as a couple',
    writtenDate: 'March 28, 2026',
    reviewOf: 'Ha Giang Odyssey Hostel, Tours & Motorbike Rental',
    photos: [
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/ce/60/79/caption.jpg?w=400&h=200&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/ce/60/78/caption.jpg?w=400&h=200&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/ce/60/77/caption.jpg?w=400&h=200&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/ce/60/76/caption.jpg?w=400&h=200&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/ce/60/75/caption.jpg?w=400&h=200&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/ce/60/74/caption.jpg?w=400&h=200&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/ce/60/73/caption.jpg?w=400&h=200&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/ce/60/72/caption.jpg?w=400&h=200&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/ce/60/71/caption.jpg?w=400&h=200&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/ce/60/70/caption.jpg?w=400&h=200&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/ce/60/69/caption.jpg?w=400&h=200&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/ce/60/68/caption.jpg?w=400&h=200&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/ce/60/67/caption.jpg?w=400&h=200&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/ce/60/66/caption.jpg?w=400&h=200&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/ce/60/65/caption.jpg?w=400&h=200&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/ce/60/64/caption.jpg?w=400&h=200&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/ce/60/63/caption.jpg?w=400&h=200&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/ce/60/62/caption.jpg?w=400&h=200&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/ce/60/61/caption.jpg?w=400&h=200&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/ce/60/60/caption.jpg?w=400&h=200&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/ce/60/5f/caption.jpg?w=400&h=200&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/ce/60/5e/caption.jpg?w=400&h=200&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/ce/60/5d/caption.jpg?w=400&h=200&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/ce/60/5c/caption.jpg?w=400&h=200&s=1',
    ],
  },
  {
    id: 'ta2',
    name: 'David Vaaknin',
    location: 'Jerusalem, Israel',
    contributions: 14,
    avatar: undefined,
    rating: 5,
    title: 'Review of our Private Car Tour 4D3N',
    quote: 'We took Odyssey Hostel\'s 4 day, 3 nights private car tour of the Ha Giang loop with Linh, our wonderful guide, and Buong, our trusty driver. Overall, the tour was well organized by Odyssey Hostel, and if you are considering taking a similar tour, we...',
    fullQuote: 'We took Odyssey Hostel\'s 4 day, 3 nights private car tour of the Ha Giang loop with Linh, our wonderful guide, and Buong, our trusty driver. Overall, the tour was well organized by Odyssey Hostel, and if you are considering taking a similar tour, we would like to recommend opting for a private car tour. While this type of tour costs a bit more than a regular easy rider tour, the value for money is significantly higher in our view. Firstly, a car felt much safer than a motorcycle, especially since Buong did a great job of navigating the often-treacherous road. Secondly, the car was certainly more comfortable than a motorcycle, a view shared by many of the younger people we met on the road, who felt the same. Lastly, we got to spend our nights in private rooms, whereas most of the people who did the easy rider version of the loop slept in dorms. In fact, on our second night, Odyssey Hostel organized a really good hotel for us to stay as a couple in a private room, separately from the hostel\'s easy rider group which stayed in a dorm-only hostel. This allowed for a quieter night. Whereas doing the loop with a motorcycle is surely more exhilarating, we did not feel that we missed much in terms of sightseeing, if at all. We got to most of the viewpoints the easy riders get to, albeit a bit slower, and we even got to do the Sky Path trail on foot, which is a great experience that we understood most easy rider tours skip. Our guide, Linh, is quite the character, she is highly energetic and enthusiastic, and has a lot of knowledge to share about the area. We especially appreciated the knowledge she shared regarding the qualities of herbs, fruits, and vegetables that we encountered on the Sky Path trail. Linh took really good care of us, made us feel safe, and on top of everything, she took some really nice pictures and videos of us throughout the trip. A note for less-younger travelers (like us): Even if you are taking the private tour, you will probably spend most of the nights in hostels where easy rider groups party and drink until around 10pm. While this was mostly fun for us, not everyone will welcome loud karaoke parties after a full day of touring.',
    visitedMonth: 'April 2026',
    travelType: 'as a couple',
    writtenDate: 'April 25, 2026',
    reviewOf: 'Ha Giang Odyssey Hostel, Tours & Motorbike Rental',
    photos: [
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/33/0f/63/3e/caption.jpg?w=400&h=200&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/33/0f/63/3f/caption.jpg?w=400&h=200&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/33/0f/63/40/caption.jpg?w=400&h=200&s=1',
    ],
  },
  {
    id: 'ta3',
    name: 'Kristina G',
    location: '',
    contributions: 6,
    avatar: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/f6/e6/ea/default-avatar-2020-54.jpg?w=100&h=-1&s=1',
    rating: 5,
    title: 'Ha Giang loop with Odyssey',
    quote: 'Couldn\'t ask for the better experience. Enjoyed from the beginning to the end. Our drivers were very experienced and prioritized our safety above all. Tom was great leader, everything was well organized, well timed because we avoided crowds most of the time. Oft...',
    fullQuote: 'Couldn\'t ask for the better experience. Enjoyed from the beginning to the end. Our drivers were very experienced and prioritized our safety above all. Tom was great leader, everything was well organized, well timed because we avoided crowds most of the time. Often we were only group on the road. Homestays were nice, especially the first one had an incredible views. Food was delicious. I appreciated all the stops and amazing views. Definitely a highlight of my trip.',
    visitedMonth: 'May 2026',
    travelType: 'with friends',
    writtenDate: 'May 22, 2026',
    reviewOf: 'Ha Giang Odyssey Hostel, Tours & Motorbike Rental',
    photos: [
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/33/4e/b9/12/caption.jpg?w=400&h=200&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/33/4e/b9/11/caption.jpg?w=400&h=200&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/33/4e/b8/bb/caption.jpg?w=400&h=-1&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/33/4e/b8/ba/caption.jpg?w=400&h=-1&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/33/4e/b8/b9/caption.jpg?w=400&h=200&s=1',
    ],
  },
  {
    id: 'ta4',
    name: 'Klaudia R',
    location: '',
    contributions: 0,
    avatar: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/f6/e2/a7/default-avatar-2020-44.jpg?w=100&h=-1&s=1',
    rating: 5,
    title: '10000% Recommend',
    quote: 'BEST EXPERIENCE EVER! I am 22, 13 of my girl friends and I booked a private tour with Odyssey and I couldn\'t recommend more!! More people need to know about Odyssey!! We all felt very spoilt the whole time! The accommodation and food was all above what we...',
    fullQuote: 'BEST EXPERIENCE EVER! I am 22, 13 of my girl friends and I booked a private tour with Odyssey and I couldn\'t recommend more!! More people need to know about Odyssey!! We all felt very spoilt the whole time! The accommodation and food was all above what we expected and is pictured! A perfect mix from fun with kareoke and happy water to beautiful culture. Our tour guide Tom was extremely accommodating and fun. He was informative and always asked if we needed anything, at our requests he would help instantly with a smile on his face :) My driver was Lun, he was so amazing!!! Always helping me and checking if I was okay and comfortable. Very safe driver and he didn\'t want me to lift a finger it was truely a memorable experience! Ask for Tom and Lun if you do this trip they will make it so amazing and always go above and beyond!',
    visitedMonth: 'April 2026',
    travelType: 'with friends',
    writtenDate: 'April 24, 2026',
    reviewOf: 'Ha Giang Odyssey Hostel, Tours & Motorbike Rental',
    photos: [
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/33/0d/55/ae/caption.jpg?w=400&h=200&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/33/0d/55/ad/caption.jpg?w=400&h=200&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/33/0d/55/ac/caption.jpg?w=400&h=200&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/33/0d/55/ab/caption.jpg?w=400&h=200&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/33/0d/55/aa/caption.jpg?w=400&h=200&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/33/0d/54/dc/caption.jpg?w=400&h=200&s=1',
    ],
  },
  {
    id: 'ta5',
    name: 'Jonathan S',
    location: '',
    contributions: 0,
    avatar: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/f6/de/e7/default-avatar-2020-37.jpg?w=100&h=-1&s=1',
    rating: 5,
    title: 'Top Tour with Top Groupleader Thao',
    quote: 'The tour with Odyssey was really nice. Thao as a groupleader was super organized, prudent and committed. If you have any questions, we could always contact him. My ride with Sinh was good, even though some overtaking maneuvers were very risky...',
    fullQuote: 'The tour with Odyssey was really nice. Thao as a groupleader was super organized, prudent and committed. If you have any questions, we could always contact him. My ride with Sinh was good, even though some overtaking maneuvers were very risky in my eyes. Odyssey as an organizer has picked out the top spots and if possible not approached the overflowing viewpoints. In the meantime, I found the ride a bit hectic, I would have liked it if we hadn\'t driven quite so fast and had more time at some spots. Accommodation and food were great and the trip overall a great experience. The landscape is unique.',
    visitedMonth: 'March 2026',
    travelType: 'as a couple',
    writtenDate: 'March 31, 2026',
    reviewOf: 'Ha Giang Odyssey Hostel, Tours & Motorbike Rental',
    photos: [],
  },
  {
    id: 'ta6',
    name: 'Navigate04501049911',
    location: '',
    contributions: 0,
    avatar: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/f6/df/99/default-avatar-2020-40.jpg?w=100&h=-1&s=1',
    rating: 5,
    title: 'The Odyssey Team Turned the Ha Giang Loop Into Pure Legend 🚵‍♂️🔥',
    quote: 'If you\'re thinking about doing the Ha Giang Loop, stop thinking and just go with Odyssey — these legends don\'t just organize a trip, they create an epic movie where you\'re the main character. From the first crazy turn...',
    fullQuote: 'If you\'re thinking about doing the Ha Giang Loop, stop thinking and just go with Odyssey — these legends don\'t just organize a trip, they create an epic movie where you\'re the main character. From the first crazy turn on the motorbike to the last karaoke night that no one will ever forget (and some wish they could), everything was absolutely perfect. The guides are part stunt driver, part comedian, and part therapist — somehow managing to keep you safe, fed, and laughing even after 8 hours of mountain roads. The food? Amazing. The views? Unreal The vibes? 100% chaotic good. By the end, we weren\'t just travelers — we were a family of dust-covered lunatics living our best lives. If Odyssey ever starts a cult, I\'m joining. 🏍️💨 TAVALOOOOO GUYS 🤗✨',
    visitedMonth: 'October 2025',
    travelType: 'with family',
    writtenDate: 'October 29, 2025',
    reviewOf: 'Ha Giang Odyssey Hostel, Tours & Motorbike Rental',
    photos: [
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/31/97/c0/5e/caption.jpg?w=400&h=-1&s=1',
    ],
  },
];

export const googleReviews: GoogleReview[] = [
  {
    id: 'g1',
    name: 'Chiara Lazzaroli',
    avatar: undefined,
    rating: 5,
    quote: 'My boyfriend and I had a great private 3 days 2 nights tour with our two drivers Dô and Vang! The tour itself has many beautiful spots and landscapes but what really made this trip stand out was the extra effort our drivers made...',
    fullQuote: 'My boyfriend and I had a great private 3 days 2 nights tour with our two drivers Dô and Vang! The tour itself has many beautiful spots and landscapes but what really made this trip stand out was the extra effort our drivers made to make it a memorable experience, from finding alternative beautiful spots when the "original" ones were too crowded, to driving us on scenic roads through local villages and giving us information on the places we passed and their history. We also stayed at great overnight locations with beautiful views (our favourite in the three weeks we spent in Vietnam!). We would definitely recommend Odyssey to anyone wanting to do the Ha Giang Loop.',
    writtenDate: '',
  },
  {
    id: 'g2',
    name: 'Esther Lee',
    avatar: undefined,
    rating: 5,
    quote: 'We did the Ha Giang Loop over 4 days and 3 nights, and it was an absolutely excellent experience. We chose a private tour just for my brother and me, which made the whole trip feel very relaxed and personalised...',
    fullQuote: 'We did the Ha Giang Loop over 4 days and 3 nights, and it was an absolutely excellent experience. We chose a private tour just for my brother and me, which made the whole trip feel very relaxed and personalised.\n\nThe accommodation exceeded our expectations - comfortable, clean, and great quality throughout the trip. We also really enjoyed trying local Vietnamese food, including a delicious hot pot dinner one evening, which was a highlight.\n\nOur easy riders, Lucky and Chung, were fantastic. They took us to some truly breathtaking viewpoints, rode safely and smoothly throughout the loop, and were always happy to help us find the best spots for photos, making sure we captured the scenery properly rather than rushing through.\n\nOverall, the tour was incredibly well organised, scenic, and memorable. If you\'re considering the Ha Giang Loop, I couldn\'t recommend Odyssey more, especially as a private tour.',
    writtenDate: '',
    photos: ['https://lh3.googleusercontent.com/grass-cs/ACvplmPbWkoVi4pLTXQdRm2cw--F5GVHL-FRcBodFY99-OVblQfubN8ZoDKKqv_Va9GPSPJNRNt74jZbmWQ3mpTUHtei875CvM4ssaIFc7h7MisjPeOq7xgQUAoR1w0fJsB3YPxa57agP1yHWRc=w750-h563-p-k-no'],
  },
  {
    id: 'g3',
    name: 'Carolina Lopez',
    avatar: undefined,
    rating: 5,
    quote: 'Doing the Ha Giang Loop was one of the best experiences of my life. The drivers were fantastic — super professional, kind, and always making sure everyone felt safe and comfortable...',
    fullQuote: 'Doing the Ha Giang Loop was one of the best experiences of my life. The drivers were fantastic — super professional, kind, and always making sure everyone felt safe and comfortable. My driver, Dên, was amazing and I couldn\'t have asked for a better person to do the loop with. The vibe throughout the whole trip was amazing, lots of laughs and great energy every day. And the food… honestly spectacular! Everything was also arranged really easily and fast, and the staff were always ready to help with anything. Highly recommend this tour!',
    writtenDate: '',
  },
];


export const faqs: FaqItem[] = [
  {
    id: 'f1',
    category: 'Planning',
    question: 'What is an easy rider?',
    answer:
      'An easy rider is someone who will drive the bike for you.'
  },
  {
    id: 'f2',
    category: 'Planning',
    question: 'Can I drive myself?',
    answer:
      'If you are not an experienced driver, we strongly advise against driving yourself. The Ha Giang Loop can be dangerous and unpredictable, with difficult road conditions, sharp mountain roads, traffic, weather changes, and inexperienced riders all sharing the road.\n\nTo legally self-drive in Vietnam, you must hold both:\n• A valid International Driving Permit under the 1968 Convention with the motorcycle stamp\n• Your matching motorcycle license from your home country'
  },
  {
    id: 'f3',
    category: 'Planning',
    question: 'What should I pack?',
    answer:
      'Pack a small backpack and leave your larger bag(s) at our hostel. Bring sunblock, warm clothes, swimwear and small notes.'
  },
  {
    id: 'f4',
    category: 'Planning',
    question: 'Do I need to bring money on the tour?',
    answer:
      'Most things are included on the tour, but having some extra cash for drinks, snacks, souvenirs, or personal purchases along the way is definitely recommended.\n\nAround 1,000,000 VND should be more than enough for most people during the trip.'
  },
  {
    id: 'f5',
    category: 'Planning',
    question: "What's the difference between 3 day and 4 day tour?",
    answer:
      "The 3 day trip gives you enough time to see pretty much the entire Ha Giang Loop, but the schedule is more tight and you won't have enough time to fully enjoy some of the best activities and stops along the way.\n\nAt the moment we offer 2 different itinerary options for our 4 day trips, which allow for a more relaxed pace and more time to experience the Loop properly. Please check out the itinerary page to learn more about the differences between each route."
  },
  {
    id: 'f6',
    category: 'Planning',
    question: 'When is the best time of year to travel?',
    answer:
      'October to April brings the clearest skies and the famous cloud seas, with cold mornings on the plateau. September is terrace harvest in the west. June to August is lush and green with warm afternoon rain — quieter roads, softer light, and lower prices.'
  },
  {
    id: 'f7',
    category: 'On the road',
    question: 'When does the tour finish?',
    answer:
      'Around 4-5pm on your last day.'
  },
  {
    id: 'f8',
    category: 'On the road',
    question: 'What are the accommodations actually like?',
    answer:
      'A mixture. Most nights are in family homestays that we have upgraded together with the owners — private or twin rooms, real mattresses, hot showers and good coffee. One or two nights on longer trips are in boutique lodges with valley views.'
  },
  {
    id: 'f9',
    category: 'Booking',
    question: 'Do you arrange transport from Hanoi?',
    answer:
      'Yes. We book the overnight sleeper bus or a private car with a driver, and we hold luggage you do not want to carry on the loop at our office in Ha Giang City at no charge.'
  },
  {
    id: 'f10',
    category: 'Booking',
    question: 'What happens if the weather is too bad to ride?',
    answer:
      'Safety is our priority. If extreme weather warnings (e.g., severe landslides or storms) occur, we will offer to reschedule or adapt the route. If the tour must be canceled entirely by us, you will receive a full refund for any unused services.'
  }
];


export const gallery: GalleryItem[] = [
  {
    id: 'g1',
    src: images.hero,
    alt: 'Aerial view of a winding mountain road between limestone karst peaks at golden hour',
    caption: 'The plateau road at first light',
    category: 'Landscape',
    span: 'wide'
  },
  {
    id: 'g2',
    src: images.canyon,
    alt: 'Emerald river canyon between vertical limestone cliffs',
    caption: 'Nho Que, from the water',
    category: 'Landscape',
    span: 'tall'
  },
  {
    id: 'g3',
    src: "/1785766225036_7647185241213986356_7647185241213986356_2c5ef16bfc0db67306a888e11cb98583.webp",
    alt: 'Highland market stalls with indigo textiles and woven baskets',
    caption: 'Sunday trade, Dong Van',
    category: 'Culture',
    span: 'square'
  },
  {
    id: 'g4',
    src: images.terraces,
    alt: 'Golden terraced rice fields cascading down misty mountainsides',
    caption: 'Harvest in the west',
    category: 'Landscape',
    span: 'square'
  },
  {
    id: 'g5',
    src: images.experience,
    alt: 'Candlelit dinner table on a wooden balcony overlooking misty mountains',
    caption: 'Supper above the valley',
    category: 'Stays',
    span: 'tall'
  },
  {
    id: 'g6',
    src: images.pass,
    alt: 'Sea of clouds rolling over a mountain pass at sunrise',
    caption: 'Cloud sea, Ma Pi Leng',
    category: 'Road',
    span: 'wide'
  },
  {
    id: 'g7',
    src: images.village,
    alt: 'Stone-walled village houses with clay tile roofs on a highland plateau',
    caption: 'Stone houses, Lung Cam',
    category: 'Culture',
    span: 'square'
  },
  {
    id: 'g8',
    src: "/1785766209135_7647185241213986356_7647185241213986356_0d50e4860e58636b30ad3b2bf5db108b.webp",
    alt: 'Boutique mountain lodge terrace overlooking rice terraces at sunrise',
    caption: 'The lodge, before anyone wakes',
    category: 'Stays',
    span: 'square'
  },
  {
    id: 'g9',
    src: "/1785766265624_7647185241213986356_7647185241213986356_5e8ce7ed3e2a9b31e1cdeda2da9909e4.webp",
    alt: 'A rider on a narrow cliffside road above a river canyon',
    caption: 'The cliff road',
    category: 'Road',
    span: 'square'
  },
  {
    id: 'g10',
    src: 'https://res.cloudinary.com/bs1csiim/image/upload/v1785990610/1785766385695_7647185241213986356_7647185241213986356_23eb27041d30d4aa9ac8f8a8c90770d5_csmhfr.jpg',
    alt: 'Traveler photographing the panoramic mountains of the Ha Giang Loop',
    caption: 'Capturing the endless green ridges of Ha Giang',
    category: 'Landscape',
    span: 'square'
  },
  {
    id: 'g11',
    src: 'https://res.cloudinary.com/bs1csiim/image/upload/v1785990613/1785766385751_7647185241213986356_7647185241213986356_b04b7caa9b71d7146b8b098e81923d71_pfuije.jpg',
    alt: 'Mountain village nestled among limestone peaks in Ha Giang Loop, Vietnam',
    caption: 'A peaceful village hidden beneath the misty mountains',
    category: 'Culture',
    span: 'tall'
  },
  {
    id: 'g12',
    src: "/1785766224985_7647185241213986356_7647185241213986356_30203b1a484d3f6ecde23b932e4e9d42.webp",
    alt: 'Photographer standing on a rocky overlook above a river gorge',
    caption: 'Waiting for the gap in the cloud',
    category: 'Road',
    span: 'wide'
  }
];


export const posts: BlogPost[] = [
  {
    slug: 'reading-the-weather-on-the-plateau',
    title: 'Reading the weather on the plateau',
    excerpt:
      'Cloud seas, cold snaps and the two-hour window that makes the difference between a grey morning and the photograph you came for.',
    cover: images.pass,
    date: '2026-06-18',
    readingTime: '7 min read',
    category: 'Guides',
    body: [
      'The plateau makes its own weather. A valley two kilometres away can sit under cloud all morning while the ridge you are standing on holds clear blue sky, and the reverse is just as common. After a decade of guiding here, our team has stopped trying to predict the day and started reading the hour.',
      'The most reliable pattern is the inversion. On cold, still nights between October and March, dense air settles into the gorges and by dawn the valleys are filled edge to edge with white. From the pass it reads as an ocean. It burns off between eight and ten, which is why our sunrise departures leave at four.',
      'Rain in the green season is rarely a problem for a whole day. It arrives in the afternoon, hard and short, and the two hours afterwards are the best light of the entire trip — saturated, clean and empty of traffic. We plan our long stops around it rather than against it.',
      'What we do take seriously is cold. At 1,500 metres in January the wind will find every gap in your jacket. We carry spare layers on every departure, and the single most common piece of feedback we give before a trip is to bring gloves you would wear at home in winter.']

  },
  {
    slug: 'a-short-history-of-indigo',
    title: 'A short history of indigo',
    excerpt:
      'How a plant, a clay vat and eleven dips became the visual signature of the northern highlands.',
    cover: images.market,
    date: '2026-05-02',
    readingTime: '9 min read',
    category: 'Culture',
    body: [
      'Walk any highland market before eight in the morning and the first thing you notice is the colour: a blue so deep it reads as black until it catches the light. It is the product of a plant grown a few hundred metres from where it is sold, and a process that has barely changed in three hundred years.',
      'The leaves are fermented in water for several days until the liquid turns green, then aerated and mixed with lime until the pigment settles. Cloth is dipped, dried in the sun, and dipped again. Eleven cycles is considered the minimum for a garment that will last a lifetime.',
      'The dyers we visit are mostly women in their fifties and sixties, and most of them will tell you their daughters are not learning. What has changed the arithmetic slightly is travellers who buy directly, at a price that reflects three weeks of work rather than an afternoon of it.',
      'If you visit a workshop with us, come with clean hands and leave with blue ones. The stain lasts about four days, which is a reasonable souvenir.']

  },
  {
    slug: 'what-to-pack-for-four-days',
    title: 'What to pack for four days on the loop',
    excerpt:
      'A short, tested list — and the four things almost everyone brings and never once uses.',
    cover: images.tourClassic,
    date: '2026-04-11',
    readingTime: '5 min read',
    category: 'Guides',
    body: [
      'Everything you need fits into a thirty-litre bag. Anything larger stays in our office in Ha Giang City, and you will be glad it did the first time you carry your own luggage up a homestay staircase.',
      'The essentials: two pairs of long trousers, three t-shirts, one warm mid-layer, a proper rain shell, closed shoes with grip, a swimsuit, and gloves between November and March. A headtorch is worth its weight twice over.',
      'What people bring and never use: a hairdryer, formal shoes, a laptop, and more than one book. Evenings are shorter than you think and the conversation is better than the reading.',
      'One genuine recommendation: bring a small dry bag even though we provide one. The extra is always useful for wet swimwear, camera batteries or the market purchase you did not plan on.']

  },
  {
    slug: 'the-case-for-staying-an-extra-night',
    title: 'The case for staying an extra night',
    excerpt:
      'Why the travellers who add a day to Du Gia almost never regret it, and what happens when you stop moving.',
    cover: images.experience,
    date: '2026-03-06',
    readingTime: '6 min read',
    category: 'Journal',
    body: [
      'There is a version of this journey that fits into three days. People do it, and they see the pass and the canyon and the market, and they leave with a camera roll that looks exactly like everyone else\'s.',
      'The alternative costs one more night. On the second evening in the same village something shifts — you are recognised at breakfast, the children stop performing, and someone asks you a question instead of selling you something.',
      'What happens on the extra day is mostly nothing. A swim, a long lunch, an hour in a hammock, a walk to the next hamlet with no particular purpose. It is the part of the trip our travellers describe most often when they write to us afterwards.',
      'We build a rest day into every itinerary longer than five days for exactly this reason. If you are on a shorter trip, add the night in Du Gia. It is the cheapest upgrade we offer and the one we recommend most.']

  },
  {
    slug: 'ma-pi-leng-pass-complete-guide',
    title: 'Ma Pi Leng Pass: the complete guide for first-time riders',
    excerpt:
      'Everything you need to know before you ride the most celebrated road in northern Vietnam — distance, difficulty, best time of day, and what to do when you get there.',
    cover: images.pass,
    date: '2026-07-14',
    readingTime: '11 min read',
    category: 'Destinations',
    body: [
      `## What is Ma Pi Leng Pass?

Ma Pi Leng — literally "the nose of a horse" in the Hmong language — is a 20-kilometre mountain road cut by hand between 1959 and 1965 across the face of the Dong Van limestone plateau. At its highest point it sits at **1,500 metres above sea level**, overlooking the Nho Que River gorge more than 800 metres below.

It is consistently listed among the most scenic roads in Southeast Asia, and for riders approaching from Dong Van the first view of the canyon from the sky path is still — after hundreds of crossings — the moment our guides go quiet.

## The road itself

The pass begins on the Dong Van side and descends to Meo Vac over roughly two hours of riding at a comfortable pace. The tarmac is well-maintained for the most part, though several sections narrow to a single lane against the cliff face. Passing oncoming trucks requires patience and a reliable horn.

**Key stats:**
- Total distance: 20 km
- Elevation at the summit viewpoint: 1,500 m
- Riding time (unhurried): 1.5 – 2.5 hours
- Road surface: asphalt, patched sections near Meo Vac

## When to ride it

The pass is open year-round, but the experience changes significantly by season.

**October – March** brings the clearest air and the famous cloud inversions. On still nights, dense mist fills the canyon below and by dawn the gorge looks like a white ocean. The inversion burns off between 8 and 10am — arrive before sunrise for the best chance of catching it.

**April – June** offers blooming buckwheat and wildflowers on the karst, softer light in the afternoons, and fewer coaches. Temperatures at the summit are pleasant without being cold.

**July – September** is the green season. The plateau turns vivid and the rice terraces west of Dong Van begin to fill. Afternoon rain is common but rarely lasts more than an hour. The road stays passable; the light afterwards is exceptional.

## The sky path walk

About 3 kilometres from the Dong Van side, a trail branches off the road and follows the cliff edge on foot for roughly 400 metres. This is the sky path — a section blasted from the rock face and wide enough for one person.

The view from here is different from the road: quieter, closer to the edge, and with the full depth of the gorge visible beneath your feet. We build 45 minutes into every itinerary for this stop.

> "The sky path is where most people stop speaking. Not from fear — just from the scale of it."
> — Ha Nguyen, guide

## Getting there

Ma Pi Leng sits between Dong Van town (to the east) and Meo Vac (to the west). Nearly all visitors approach it as part of the Ha Giang Loop, which runs as a circuit from Ha Giang City.

**By motorbike from Ha Giang City:** 3 – 4 hours to Dong Van, depending on stops. Most riders spend a night in Dong Van and tackle the pass in the early morning.

**By car:** The road is passable by car but the narrowest sections require slow, careful navigation. Coaches are not permitted on the sky path trail.

## What to bring

- A warm layer — the summit sits at altitude and the wind off the canyon is sharp even in summer
- Water and a small snack; there is one vendor near the viewpoint but nothing reliable along the road
- A fully charged camera battery; the light changes fast on the descent
- Cash in small denominations for the viewpoint entrance (10,000 VND per person as of 2026)

## Practical notes

The pass is busiest between 9am and 2pm when day-trip coaches arrive from Ha Giang City. Riding it before 8am or after 4pm almost always means having it to yourself. We time all our group departures accordingly.

There is no petrol station between Dong Van and Meo Vac. Fill your tank in Dong Van town before you leave.`
    ]
  },
  {
    slug: 'dong-van-sunday-market-guide',
    title: 'Dong Van Sunday market: what to expect and when to arrive',
    excerpt:
      'The highland market that still runs on barter and buckwheat wine. A practical guide to getting there early, what to look for, and how to buy without an interpreter.',
    cover: images.village,
    date: '2026-07-01',
    readingTime: '8 min read',
    category: 'Culture',
    body: [
      `## Why the Dong Van market is different

Most markets on the Ha Giang Loop have shifted toward tourism over the past decade. Dong Van on a Sunday morning has not — at least not before eight o'clock. The first hour belongs to the traders: buffalo sellers from Meo Vac, hemp merchants from Lung Cu, women carrying loads that left their villages before dawn.

If you arrive at nine you will find a pleasant market. If you arrive at six you will find something else.

## What is sold here

The market divides roughly into four zones, though the boundaries shift week by week.

**Livestock and produce** occupy the lower end of the old quarter, where the smell arrives before the stalls do. Buffalo, goat and the occasional pig are traded here. The produce section — chilli, medicinal herbs, mountain vegetables — runs alongside it.

**Textiles and silver** fill the narrow lanes near the old French administrative building. Hmong women sell embroidered panels, indigo cloth and hand-beaten silver jewellery. The quality varies considerably; the pieces worn by the sellers themselves are usually the best guide to authenticity.

**Food stalls** run along the main street from about 5:30am. Look for:
- *Thắng cố* — a slow-cooked mountain stew served in clay bowls, eaten standing
- Fresh rice paper with herbs and pork
- Buckwheat pancakes, sold from cast-iron griddles
- *Rượu ngô* — corn wine, often pressed on the vendors into your hand before you have agreed to anything

**Craft tools and hardware** occupy a quiet corner near the car park — hand-forged knives, wooden farming tools, baskets that take a week to weave. These are not sold for tourists; they are sold to people who need them.

## How to buy

Most vendors do not speak English, and calculator bargaining is not the custom here. Prices on everyday goods are typically fixed; on textiles and jewellery there is usually room to negotiate politely.

The most useful thing you can carry is small denominations: 10,000 and 20,000 VND notes. Vendors rarely have change for 500,000.

Photographing sellers directly — particularly the older Hmong women — requires a moment of eye contact and a gesture before you raise the camera. Most will agree if you ask; a few will not, and that is the correct answer to accept.

## Getting there

Dong Van town is approximately 150 kilometres from Ha Giang City by the main plateau road. The drive takes three to four hours with reasonable stops.

**If you are staying in Dong Van:** the market is a ten-minute walk from any guesthouse in the old quarter. Leave by 6am to see the livestock section before it disperses.

**If you are day-tripping:** leave Ha Giang City by 4am to arrive before the coaches. This is early — but it is the difference between the market and a photograph of the market.

## A note on respect

Dong Van market is a working weekly trade event, not a cultural performance. The families selling here have driven hours before dawn to be there. Being a considerate guest means: buy something if you are going to photograph; do not block the paths between stalls; and eat breakfast from the food stalls rather than bringing your own.

The market runs regardless of weather. Bring a rain shell in any season.`
    ]
  },
  {
    slug: 'hoang-su-phi-terraces-harvest-season',
    title: 'Hoang Su Phi in harvest season: what nobody tells you before you go',
    excerpt:
      'The golden terraces of western Ha Giang are one of the most photographed landscapes in Vietnam. Here is what the images leave out — and how to experience the harvest properly.',
    cover: images.terraces,
    date: '2026-06-05',
    readingTime: '10 min read',
    category: 'Destinations',
    body: [
      `## The harvest window

Hoang Su Phi's rice terraces turn gold for a narrow window each year — typically late September through mid-October, depending on elevation and rainfall. The lower terraces at around 800 metres ripen first; the upper fields at 1,100 metres follow two to three weeks later.

This stagger is useful for photographers and inconvenient for planners. A single day's visit in the first week of October might catch one elevation at peak colour and another still green. Staying for two nights — moving between villages at different altitudes — is the reliable approach.

## What the photographs don't show

The images that circulate online tend to be taken from the same three viewpoints on clear mornings, with the mist still in the lower valleys. They are accurate, in the sense that those conditions exist. They omit:

**The mud.** Harvest season coincides with the end of the rainy season. The field paths between terraces are narrow, wet and sloped. Proper shoes — not sandals, not trainers — are essential for walking between fields.

**The noise and movement.** A terrace during harvest is a working site. Extended families cut and thresh together; water buffalo pull carts along the paths; children run between rows collecting the fallen grain. It is loud, warm and nothing like the silent panoramic images suggest.

**The smell.** Cut rice in the sun has a particular sweetness. It is one of the things our travellers mention most often when describing the place, and one of the things that cannot be conveyed in a photograph at all.

## Staying with a Dao family

We arrange stays with Red Dao families in Thong Nguyen commune, where the home-stay culture is mature enough to be comfortable without being staged. Rooms are simple: a wooden sleeping platform, a mosquito net, blankets that smell of woodsmoke. Hot water comes from a wood-fired boiler.

Dinner is cooked by the family and eaten at a communal table. If you are there in harvest time you will almost certainly eat rice that was in the field that morning.

The herbal bath is worth building an evening around. Red Dao families prepare a hot bath using a mixture of medicinal herbs and bark that varies by household — a recipe usually held by the oldest woman in the family and not written down. The bath takes about 30 minutes and the sleep afterwards is the deepest of the entire trip.

## Getting to Hoang Su Phi

Hoang Su Phi lies west of Ha Giang City, roughly 60 kilometres by the main road. The drive takes about two hours without stops, but the road through Nam Ty and Thong Nguyen is itself one of the reasons to go: a sequence of passes and valleys that most visitors miss entirely by taking the faster highway.

**From Ha Giang City by motorbike:** take the road west through Bac Quang and turn north at Viet Quang. The last 20 kilometres climb steadily. Allow three hours.

**Combined with the main loop:** Hoang Su Phi is not on the standard Ha Giang Loop. We add it as a western extension — two nights in the terraces before or after the plateau circuit — which adds two days to the itinerary and changes the character of the trip considerably.

## Practical details

- **Best time to visit:** last week of September to second week of October for the full gold. Mid-September for partial colour and far fewer visitors.
- **What to wear:** long trousers for the field paths, waterproof shoes, a light rain layer.
- **Photography:** the light is best between 6 and 9am, when mist sits in the lower valleys and the upper terraces catch direct sun. Bring a wide lens and patience.
- **Budget:** homestay costs roughly 250,000 – 400,000 VND per night including dinner and breakfast. The herbal bath is typically included.`
    ]
  }];