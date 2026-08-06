import { useSeo } from '../hooks/useSeo';
import { images } from '../lib/data';
import { Hero } from '../components/sections/Hero';
import { PopularTours } from '../components/sections/PopularTours';
import { WhyChooseUs } from '../components/sections/WhyChooseUs';
import { FeaturedDestinations } from '../components/sections/FeaturedDestinations';
import { Testimonials } from '../components/sections/Testimonials';
import { GalleryPreview } from '../components/sections/GalleryPreview';
import { FaqSection } from '../components/sections/FaqSection';
import { CtaBanner } from '../components/sections/CtaBanner';
import { VideoSection } from '../components/sections/VideoSection';

export function Home() {
  useSeo({
    title: 'Odyssey Ha Giang | Small Group & Private Ha Giang Loop Tours',
    description:
      'Small group and private guided journeys across the Ha Giang plateau — Eleven travellers maximum, local guides, curated stays and time to actually stop.',
    image: images.hero,
    disableSuffix: true
  });

  return (
    <main id="main" className="w-full bg-canvas">
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          "name": "Odyssey Ha Giang",
          "image": "https://www.odysseyhagiangloop.com/logo/logo.webp",
          "@id": "https://www.odysseyhagiangloop.com/#agency",
          "url": "https://www.odysseyhagiangloop.com/",
          "telephone": "+84357292323",
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Ha Giang City",
            "addressLocality": "Ha Giang",
            "addressRegion": "Ha Giang Province",
            "postalCode": "29000",
            "addressCountry": "VN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 22.82333,
            "longitude": 104.98333
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday"
            ],
            "opens": "00:00",
            "closes": "23:59"
          },
          "sameAs": [
            "https://www.facebook.com/odysseyhostel/",
            "https://www.instagram.com/odyssey.hagiangloop/",
            "https://www.tripadvisor.com/Attraction_Review-g1544599-d26321485-Reviews-Ha_Giang_Odyssey_Hostel_Tours_Motorbike_Rental-Ha_Giang_Ha_Giang_Province.html"
          ]
        })}
      </script>
      <Hero />
      <PopularTours />
      <VideoSection />
      <WhyChooseUs />
      <FeaturedDestinations />
      <Testimonials />
      <GalleryPreview />
      <FaqSection />
      <CtaBanner />
    </main>
  );
}