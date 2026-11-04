/**
 * Luxury Tour Ha Giang — content source: "LUXURY TOUR HÀ GIANG" document.
 * Detailed itineraries are copied verbatim (English in source).
 * Intro, highlights, route summary and pricing were Vietnamese in the source
 * and are translated to English without adding or removing content.
 *
 * Colours: the page only uses theme tokens (forest-*, gold-*, ink-*), so it
 * follows whichever palette the branch ships with (green on main, blue on
 * feature/blue-theme).
 */
import type { Tour } from './types';

interface LuxuryExperience {
  name: string;
  text: string;
}

export interface LuxuryDay {
  day: number;
  title: string;
  intro: string[];
  experiencesLead: string;
  experiences: LuxuryExperience[];
  closing: { heading: string; paragraphs: string[] };
  signoff: string[];
  /** Photos of the stay for this day */
  gallery: string[];
}

interface LuxuryPrice {
  label: string;
  price: number;
  unit?: string;
}

export interface LuxuryOption {
  id: '3D2N' | '4D3N';
  label: string;
  /** Short route summary per day (only where the document provides one to show) */
  routeSummary?: string[];
  prices: LuxuryPrice[];
  days: LuxuryDay[];
}

const gallery = (folder: string, count: number) =>
  Array.from({ length: count }, (_, i) => `/luxury/${folder}/${String(i + 1).padStart(2, '0')}.webp`);

/** Photo folders: Day 0 → day-1, Day 1 → day-2, Day 2 → day-3, Day 3 → day-4 */
const photos = {
  day1: gallery('day-1', 11),
  day2: gallery('day-2', 13),
  day3: gallery('day-3', 10),
  day4: gallery('day-4', 14),
};

export const luxuryHeroImage = '/luxury/day-4/01.webp';

export const luxuryContent = {
  title: 'LUXURY TOUR HA GIANG',
  subtitle: 'Discover untouched beauty, enjoy a journey of distinction',
  intro:
    'Experience Ha Giang in a different way with a privately designed journey, where the majestic beauty of the mountains blends with authentic local cultural experiences and premium resort services. Every road and every stop is meticulously curated, offering a private, relaxing trip with a strong personal touch.',
  highlightsTitle: 'HIGHLIGHTS',
  highlights: [
    {
      title: 'Private and flexible journey',
      text: 'Each journey is designed around your own preferences, needs and pace. Explore freely, enjoy things your way and experience Ha Giang on your own terms, without being limited by fixed schedules.',
    },
    {
      title: 'Unique routes, conquer majestic beauty',
      text: 'Discover breathtaking roads across the stone plateau, endless mountain ranges and destinations that remain wild and untouched. Leave the crowds of conventional tourist routes behind to fully feel the original beauty of Ha Giang.',
    },
    {
      title: 'Authentic local cultural exchange',
      text: 'Visit peaceful villages, meet local people and learn about distinctive customs, practices and traditional cultural values. Every experience is an opportunity to connect more deeply with the people and life of the far North.',
    },
    {
      title: 'Luxury relaxation amid nature',
      text: 'Enjoy carefully selected accommodation with impressive views and premium amenities. After each day of exploration, unwind amid peaceful mountain scenery and enjoy moments of complete rest.',
    },
    {
      title: 'High quality motorbikes, smooth on every road',
      text: 'The journey uses high quality motorbikes, chosen to provide comfort, stable performance and a smooth riding experience on mountain roads. Every trip combines the thrill of conquest, the freedom of exploration and the enjoyment of natural scenery.',
    },
    {
      title: 'A professional, dedicated team',
      text: 'Travel with an experienced team of local guides and drivers who know the terrain, culture and local life well. Good English communication, a dedicated service style and attention to every detail help make the journey safe, convenient and memorable.',
    },
    {
      title: 'Exclusive experiences, a signature made just for you',
      text: 'From the itinerary and services to the special stops, every detail is carefully considered and refined. Personalised experiences make the difference, delivering a sense of exclusivity and value worthy of every trip.',
    },
    {
      title: 'At ease on every road',
      text: 'No rush, no time pressure. Enjoy Ha Giang at a leisurely pace, stop whenever you come across a beautiful view, listen to the breath of the mountains and feel the peace amid majestic nature. Because the value of a luxury journey lies not only in the places you go, but in how you enjoy every moment.',
    },
  ],
  tagline: 'Not just a trip, but a journey to enjoy distinctive values.',
  pillars: 'Private in experience. Premium in service. Authentic in discovery.',
  minGroupNote: 'Tours are organised for groups of 2 people or more.',
  priceNote:
    'The reason the with driver price and the self drive price are the same is that all self driving guests use the XR 150.',
};

const day1Intro3 = [
  'Your adventure begins at our hotel in Ha Giang. Start the morning by completing your check out, settling any remaining payments and getting your luggage ready for the journey. Before departure, your tour guide will introduce the itinerary, explain the highlights of the route and share some useful information about the places you\'ll visit.',
  'And now, the Ha Giang Loop adventure officially begins!',
  'Before hitting the road, enjoy a special breakfast featuring Vietnamese Pho served in a hot stone bowl. This unique twist on traditional Vietnamese Pho is served in a stone bowl heated to approximately 300°C, keeping the delicious broth bubbling hot throughout your meal. After breakfast, enjoy a cup of traditional Ha Giang tea and experience a little taste of local life.',
];

export const luxuryOptions: LuxuryOption[] = [
  {
    id: '3D2N',
    label: '3 Days 2 Nights',
    routeSummary: [
      'Day 1: Khau Lan Waterfall – Twin Mountains – Duong Thuong – Weaving Village – Lung Ho – Du Gia',
      'Day 2: Du Gia – Ngoc Long River (arranged for eating and playing on the bamboo raft) – Lung Phin – Ma Pi Leng Pass – Sky Walk – Dong Van',
      'Day 3: Dong Van – Vuong Family Mansion – Lao Xa Silver Village – Lao Chai – Ha Giang',
    ],
    prices: [
      { label: 'With driver', price: 13500000, unit: '/ person' },
      { label: 'Self drive', price: 13500000, unit: '/ person' },
      { label: '2 people sharing one motorbike', price: 24850000 },
    ],
    days: [
      {
        day: 1,
        title: 'HA GIANG – KHAU LAN WATERFALL – DU GIA',
        intro: day1Intro3,
        experiencesLead: "Today's journey includes some wonderful experiences:",
        experiences: [
          { name: 'Khau Lan Waterfall', text: 'Discover a peaceful natural paradise surrounded by majestic mountains. Take a refreshing swim, relax by the water and enjoy the beauty of this tranquil setting.' },
          { name: 'Lunch with a Local Family', text: "Enjoy a traditional homemade meal at a local family's house. Experience genuine hospitality and discover the authentic flavours of Ha Giang." },
          { name: 'Quan Ba Twin Mountains', text: "Stop at one of Ha Giang's most iconic viewpoints. Capture beautiful photos and admire the spectacular mountain scenery." },
          { name: 'Traditional Handwoven Textile Village', text: 'Visit a traditional weaving village with a history of more than 100 years. Meet local artisans and learn about the traditional weaving techniques and craftsmanship carefully preserved through generations.' },
          { name: 'Du Gia Waterfall', text: 'Explore one of the beautiful natural attractions in the Du Gia area. Enjoy the fresh mountain air, stunning scenery and peaceful atmosphere surrounded by nature.' },
        ],
        closing: {
          heading: 'Overnight in Du Gia',
          paragraphs: [
            "After a day filled with adventure and discovery, we'll arrive at a carefully selected local homestay in Du Gia. Take time to relax, enjoy the warm hospitality of the local people and experience the authentic atmosphere of village life in the mountains.",
          ],
        },
        signoff: ['A perfect ending to your first day on the Ha Giang Loop!'],
        gallery: photos.day1,
      },
      {
        day: 2,
        title: 'DU GIA – NGOC LONG RIVER – LUNG PHIN – MA PI LENG PASS – DONG VAN',
        intro: [
          "Day two promises an unforgettable combination of breathtaking landscapes, unique local experiences and exciting adventures. Today, we'll explore some of the most spectacular scenery in Ha Giang, discovering hidden natural wonders along the way.",
        ],
        experiencesLead: "Today's journey includes some exceptional experiences:",
        experiences: [
          { name: 'Bamboo Boat Trip on Ngoc Long River', text: 'Enjoy a relaxing journey aboard a traditional bamboo boat, surrounded by magnificent limestone mountains and beautiful natural scenery. Take in the peaceful atmosphere and admire the untouched beauty of the river.' },
          { name: 'Natural Cave Exploration & Swimming', text: 'Continue your adventure by discovering a fascinating natural cave. Explore its hidden beauty and enjoy a refreshing swim in the crystal clear water.' },
          { name: 'Lunch on a Bamboo Boat', text: 'Experience something truly special with lunch served aboard a bamboo boat. Enjoy delicious food while taking in the peaceful surroundings and spectacular river scenery.' },
          { name: 'Discover Lung Phin Village', text: 'Experience the authentic charm of local village life. Discover the culture, traditions and everyday lifestyle of the local communities along the route.' },
          { name: 'Ma Pi Leng Pass', text: "Ride along one of Vietnam's most spectacular mountain passes. Marvel at the dramatic limestone mountains, winding roads and breathtaking views overlooking the famous Nho Que River." },
          { name: 'Ma Pi Leng Sky Walk', text: 'For those seeking an extra adventure, take on the Sky Walk experience. Enjoy incredible panoramic views from above and appreciate the magnificent mountain landscapes from a different perspective.' },
          { name: 'Dong Van Ancient Town', text: 'Arrive in Dong Van and explore its charming old streets, traditional architecture and unique atmosphere. This historic town is a wonderful place to discover the cultural character of the Ha Giang region.' },
        ],
        closing: {
          heading: 'An Evening of Relaxation in Dong Van',
          paragraphs: [
            "Tonight, we'll stay at a carefully selected five star hotel in Dong Van, offering a comfortable and relaxing experience after a full day of exploration.",
            "In the evening, enjoy a specially arranged dinner at a local restaurant in the Old Quarter. After dinner, take some time to explore the charming streets, soak up the atmosphere and discover the town's evening life.",
            "To finish the day, enjoy a traditional therapeutic massage performed by local practitioners. It's the perfect opportunity to relax, recharge and experience another aspect of local culture before continuing your Ha Giang adventure tomorrow.",
          ],
        },
        signoff: ['A day filled with breathtaking scenery, authentic experiences, adventure and well deserved relaxation.'],
        gallery: photos.day2,
      },
      {
        day: 3,
        title: "DONG VAN – HMONG KING'S PALACE – THAM MA PASS – LAO CHAI – LAO XA – HA GIANG",
        intro: [
          "On the final day of your Ha Giang Loop adventure, we'll continue exploring the region's fascinating history, traditional culture and spectacular mountain scenery before making our way back to Ha Giang City.",
          "Although it's the last day of the journey, there are still plenty of wonderful experiences waiting for us along the way.",
        ],
        experiencesLead: "Today's highlights include:",
        experiences: [
          { name: "Hmong King's Palace (Vuong Family Mansion)", text: "Step back in time as we visit the historic residence of the Vuong family, also known as the Hmong King's Palace. Discover its fascinating history, admire the unique architectural design and learn about the powerful family who once ruled this region." },
          { name: 'Tham Ma Pass', text: "Stop at one of Ha Giang's most famous mountain passes. Capture some memorable photos and admire the spectacular winding road surrounded by dramatic mountain landscapes." },
          { name: 'Lao Chai Village', text: 'Discover the traditional culture and everyday lifestyle of the Hmong people. Learn more about their customs, local traditions and the way of life that has been preserved through generations.' },
          { name: 'Lao Xa Village: Traditional Silver Craftsmanship', text: 'Visit this charming traditional village, known for its long standing silver making heritage. Meet local artisans and discover the intricate techniques behind their traditional silver jewellery and handcrafted products.' },
        ],
        closing: {
          heading: 'Return to Ha Giang City: The Journey Comes to an End',
          paragraphs: [
            "After three days of incredible scenery, cultural discoveries and unforgettable experiences, we'll make our way back to Ha Giang City.",
            'Our journey concludes at Odyssey Hostel, where you can relax, collect your belongings and look back on the wonderful memories made along the Ha Giang Loop.',
          ],
        },
        signoff: [
          'Three days, countless beautiful moments and memories that will stay with you long after the journey ends.',
          'Thank you for choosing Odyssey to be part of your adventure!',
        ],
        gallery: photos.day3,
      },
    ],
  },
  {
    id: '4D3N',
    label: '4 Days 3 Nights',
    prices: [
      { label: 'With driver', price: 18000000, unit: '/ person' },
      { label: 'Self drive', price: 18000000, unit: '/ person' },
      { label: '2 people sharing one motorbike', price: 32800000 },
    ],
    days: [
      {
        day: 1,
        title: 'KHAU LAN WATERFALL – QUAN BA TWIN MOUNTAINS – TRADITIONAL WEAVING VILLAGE – DUONG THUONG – HMONG VILLAGE',
        intro: [
          'Your adventure begins at our hotel in Ha Giang. Start the morning by completing your check out, settling any remaining payments and preparing your luggage for the journey. Before departure, your tour guide will introduce the itinerary and highlight the special experiences awaiting you along the way.',
          'And now, your Ha Giang adventure officially begins!',
          'Before hitting the road, enjoy a special breakfast featuring Vietnamese Pho served in a hot stone bowl. This unique twist on traditional Vietnamese Pho is served in a stone bowl heated to approximately 300°C, keeping the delicious broth bubbling hot throughout your meal. After breakfast, enjoy a cup of traditional Ha Giang tea and experience the authentic flavours of our region.',
        ],
        experiencesLead: "Today's journey includes a wonderful collection of natural and cultural experiences:",
        experiences: [
          { name: 'Khau Lan Waterfall', text: 'Discover a peaceful natural retreat surrounded by majestic mountains. Take a refreshing swim, relax by the water and enjoy the beauty of this tranquil destination.' },
          { name: 'Lunch with a Local Family', text: "Experience genuine local hospitality with a traditional homemade meal at a local family's house. Enjoy authentic regional dishes and discover the culinary traditions of Ha Giang." },
          { name: 'Quan Ba Twin Mountains', text: "Stop at one of Ha Giang's most iconic viewpoints. Capture memorable photos and admire the spectacular limestone mountains and surrounding landscapes." },
          { name: 'Traditional Handwoven Textile Village', text: 'Visit a traditional weaving village with a history spanning more than 100 years. Meet local artisans and discover the intricate weaving techniques and craftsmanship carefully preserved through generations.' },
          { name: 'Duong Thuong Valley', text: 'Continue through the beautiful landscapes of Duong Thuong, where winding mountain roads, peaceful valleys and traditional villages offer a glimpse into the quieter side of Ha Giang.' },
          { name: "H'Mong Village", text: "Discover the traditional lifestyle, local architecture and cultural heritage of the H'Mong people. Experience the simplicity of village life and learn more about the traditions that make this region so special." },
        ],
        closing: {
          heading: 'Overnight in Quan Ba: A Premium Mountain Resort Experience',
          paragraphs: [
            "After a day of exploration, we'll arrive at a carefully selected premium resort in Quan Ba.",
            "Combining distinctive H'Mong inspired architecture with modern comforts and high quality facilities, this special accommodation offers a unique balance between traditional local culture and contemporary luxury.",
            'Take time to relax, enjoy the peaceful mountain surroundings and immerse yourself in the local atmosphere.',
          ],
        },
        signoff: ['A beautiful first day combining adventure, cultural discovery and a touch of luxury in the heart of Ha Giang.'],
        gallery: photos.day1,
      },
      {
        day: 2,
        title: "H'MONG VILLAGE – THAM MA PASS – LAO XA SILVER VILLAGE – LUNG CU FLAG TOWER – DONG VAN",
        intro: [
          "Day two brings another exciting chapter of your Ha Giang adventure, taking you through breathtaking mountain landscapes, traditional H'Mong villages and some of the region's most remarkable cultural and historical landmarks.",
          "Today, you'll discover the stories, traditions and natural beauty that make Ha Giang such a unique destination.",
        ],
        experiencesLead: "Today's journey includes some unforgettable experiences:",
        experiences: [
          { name: "H'Mong Village", text: "Begin the day by exploring the traditional village and discovering the daily life, unique architecture and cultural traditions of the H'Mong people." },
          { name: 'Tham Ma Pass', text: "Ride along one of Ha Giang's most iconic mountain passes. Admire its famous winding roads, dramatic mountain scenery and spectacular viewpoints." },
          { name: 'Lao Xa Silver Village', text: "Visit a traditional H'Mong village renowned for its generations old silver craftsmanship. Meet local artisans, discover the intricate process of handmade silver jewellery and learn about a valuable cultural tradition passed down through generations." },
          { name: 'Lung Cu Flag Tower', text: "Visit one of Vietnam's most significant national landmarks, located in the northernmost region of the country. Climb to the flag tower and enjoy panoramic views of the surrounding mountains and villages." },
          { name: 'Dong Van Ancient Town', text: 'Continue to Dong Van, a charming historic town surrounded by spectacular limestone mountains. Explore its traditional architecture, narrow streets and distinctive local atmosphere.' },
        ],
        closing: {
          heading: 'A Luxury Evening in Dong Van',
          paragraphs: [
            'After a full day of exploration, enjoy a relaxing overnight stay at a carefully selected five star hotel in Dong Van. Unwind in a comfortable setting and enjoy premium hospitality surrounded by the beautiful mountain scenery.',
            "In the evening, we'll enjoy a specially arranged dinner at a local restaurant in Dong Van Ancient Town. Afterwards, take a leisurely stroll through the historic streets and discover the charming atmosphere of this mountain town.",
            'To make your evening even more special, indulge in a traditional therapeutic massage performed by local practitioners. Let yourself relax and recharge after a day on the road while experiencing a unique aspect of local wellness culture.',
          ],
        },
        signoff: ['A perfect combination of adventure, cultural discovery and luxury relaxation in the heart of Ha Giang.'],
        gallery: photos.day2,
      },
      {
        day: 3,
        title: 'DONG VAN – MA PI LENG PASS – SKY WALK – NHO QUE RIVER – DU GIA WATERFALL',
        intro: [
          "Get ready for another spectacular day on the Ha Giang Loop! Today, we'll travel through some of the most breathtaking landscapes in northern Vietnam, combining thrilling mountain adventures with peaceful moments surrounded by nature.",
        ],
        experiencesLead: "Today's highlights include:",
        experiences: [
          { name: 'Ma Pi Leng Pass', text: "Begin the day by riding along one of Vietnam's most legendary mountain passes. Admire the dramatic limestone mountains, winding roads and breathtaking views that make this route one of the highlights of the Ha Giang Loop." },
          { name: 'Ma Pi Leng Sky Walk', text: "For those looking for an extra adventure, experience the famous Sky Walk. Follow the spectacular mountain trail and enjoy incredible panoramic views from above. It's an unforgettable opportunity to appreciate the grandeur of the surrounding landscapes." },
          { name: 'Nho Que River', text: 'Discover the stunning beauty of the emerald green Nho Que River, winding its way through towering limestone cliffs. Enjoy the magnificent scenery and capture some incredible photos of this natural wonder.' },
          { name: 'Du Gia Waterfall', text: 'Continue your journey towards Du Gia and visit its beautiful waterfall, a peaceful natural retreat surrounded by lush mountains. Take a refreshing swim, relax by the water and enjoy the fresh mountain air after an exciting day of exploration.' },
        ],
        closing: {
          heading: 'Overnight in Du Gia',
          paragraphs: [
            'After a day filled with breathtaking views and memorable adventures, arrive in Du Gia and settle into a carefully selected local accommodation.',
            'Enjoy the peaceful mountain atmosphere, experience the warm hospitality of the local community and take time to relax before the final day of your journey.',
          ],
        },
        signoff: ['A perfect blend of adventure, natural beauty and relaxation!'],
        gallery: photos.day3,
      },
      {
        day: 4,
        title: 'DU GIA – NGOC LONG RIVER – THAI AN – PO LY CAVE – HA GIANG',
        intro: [
          'On the final day of your Ha Giang adventure, slow down and enjoy a completely different side of the region. After several days of exploring spectacular mountain roads and traditional villages, today is all about peaceful river journeys, natural wonders and unique experiences.',
        ],
        experiencesLead: "Today's journey includes some special experiences:",
        experiences: [
          { name: 'Bamboo Boat Trip on Ngoc Long River', text: 'Enjoy a relaxing journey aboard a traditional bamboo boat along the beautiful Ngoc Long River. Surrounded by lush mountains and stunning natural scenery, this peaceful experience offers a wonderful opportunity to appreciate the quieter side of Ha Giang.' },
          { name: 'Natural Cave Exploration & Swimming', text: 'Continue your adventure by discovering a fascinating natural cave along the river. Explore its unique formations and enjoy a refreshing swim in the crystal clear water.' },
          { name: 'Lunch on a Bamboo Boat', text: 'Enjoy a special lunch served aboard a bamboo boat while taking in the peaceful river scenery. A memorable dining experience surrounded by nature, away from the busy roads and crowds.' },
          { name: 'Po Ly Cave', text: 'Continue to explore Po Ly Cave, a fascinating natural attraction in the area. Discover its impressive cave formations and enjoy one last opportunity to connect with the natural beauty of Ha Giang.' },
        ],
        closing: {
          heading: 'Return to Ha Giang City: The End of Your Journey',
          paragraphs: [
            "After a relaxing morning filled with river adventures and natural discoveries, we'll make our way back to Ha Giang City.",
            'Our four day adventure officially concludes at Odyssey Hostel, where you can collect your belongings, freshen up and take a moment to look back on the incredible experiences shared throughout the journey.',
          ],
        },
        signoff: [
          'Four days of breathtaking landscapes, authentic local culture, unforgettable adventures and special moments.',
          "Thank you for choosing Odyssey. We hope the memories you've made in Ha Giang will stay with you long after you've returned home!",
        ],
        gallery: photos.day4,
      },
    ],
  },
];

/** Card entry so the tour appears in /journeys and the home page tour list. */
export const luxuryTourCard: Tour = {
  slug: 'luxury-tour',
  name: 'Luxury Tour Ha Giang',
  tagline: luxuryContent.subtitle,
  image: luxuryHeroImage,
  duration: '3–4 days',
  groupSize: 'From 2 people',
  difficulty: 'Gentle',
  price: 13500000,
  rating: 5,
  reviews: 0,
  style: 'Luxury',
  summary: luxuryContent.intro,
  highlights: luxuryContent.highlights.slice(0, 4).map((h) => h.title),
  inclusions: [],
  exclusions: [],
  pricing: luxuryOptions.map((o) => ({
    duration: o.id,
    behindEasyrider: o.prices[0].price,
    selfDrive: o.prices[1].price,
  })),
  itinerary: [],
};
