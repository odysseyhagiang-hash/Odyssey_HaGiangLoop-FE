export interface ItineraryDay {
  day: number;
  title: string;
  distance?: string;
  summary: string;
  highlights: string[];
}

/** Giá theo riding style cho một duration */
export interface TourPricing {
  duration: '2D1N' | '3D2N' | '4D3N' | '5D4N' | '6D5N' | string;
  behindEasyrider?: number;   // VND
  selfDrive?: number;          // VND
  behindPartner?: number;      // VND
  /** Giá theo số người */
  perPerson?: { persons: number; price: number }[];
  /** Dùng cho Car tour / Jeep tour: giá per người (áp dụng từ 2 người trở lên) */
  perPersonPrice?: number;
  /** Dùng cho Car tour legacy: giá cố định cả xe */
  flatPrice?: number;
  /** Tuỳ chọn nâng cấp thêm cho duration này */
  upgrades?: { label: string; price: number }[];
  /** Lịch trình riêng cho duration này. Nếu có sẽ override tour.itinerary khi tab được chọn */
  itinerary?: ItineraryDay[];
}

export interface Tour {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  duration: string;
  groupSize: string;
  difficulty: 'Gentle' | 'Balanced' | 'Adventurous';
  /** Giá thấp nhất để hiển thị "From ..." */
  price: number;
  rating: number;
  reviews: number;
  style: 'Private' | 'Group' | 'Car' | 'Jeep' | 'Expedition' | string;
  summary: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  /** Ghi chú điều kiện áp dụng giá, hiển thị dưới bảng giá */
  priceNote?: string[];
  pricing: TourPricing[];
  itinerary: ItineraryDay[];
}

export interface Destination {
  slug: string;
  name: string;
  region: string;
  image: string;
  elevation: string;
  bestSeason: string;
  blurb: string;
  description: string;
  experiences: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  origin: string;
  tour: string;
  rating: number;
}

export interface TripAdvisorReview {
  id: string;
  name: string;
  location: string;
  contributions: number;
  avatar?: string;          // URL — nếu không có sẽ dùng initials fallback
  rating: number;           // 1–5
  title: string;
  quote: string;            // preview text (bị cắt trong card)
  fullQuote: string;        // full text hiển thị trong modal
  visitedMonth: string;     // e.g. "March 2026"
  travelType: string;       // e.g. "as a couple"
  writtenDate: string;      // e.g. "March 28, 2026"
  reviewOf: string;         // e.g. "Ha Giang Odyssey Hostel, Tours & Motorbike Rental"
  photos?: string[];        // optional photo URLs shown in modal
}

export interface GoogleReview {
  id: string;
  name: string;
  avatar?: string;          // URL — nếu không có sẽ dùng initials
  rating: number;           // 1–5
  quote: string;            // preview text
  fullQuote: string;        // full text in modal
  writtenDate: string;      // e.g. "April 12, 2026"
  photos?: string[];        // optional photos in modal
}

export interface FaqItem {
  id: string;
  category: 'Planning' | 'On the road' | 'Booking';
  question: string;
  answer: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: 'Landscape' | 'Culture' | 'Stays' | 'Road';
  span: 'wide' | 'tall' | 'square';
}

export interface BlogPost {
  _id?: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Mỗi phần tử là một đoạn text thuần hoặc một chuỗi markdown đầy đủ.
   *  Nếu phần tử đầu tiên bắt đầu bằng '#' hoặc chứa '##', toàn bộ body
   *  sẽ được join và render qua ReactMarkdown. */
  body: string[];
  cover: string;
  date: string;
  readingTime: string;
  category: 'Guides' | 'Culture' | 'Journal' | 'Destinations';
}

export interface Vehicle {
  id: string;
  name: string;
  category: string;
  image: string;
  images?: string[];
  engine: string;
  bestFor: string;
  dailyRate: number;
  specs: {label: string;value: string;}[];
  notes: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ExperienceStep {
  id: string;
  step: string;
  title: string;
  description: string;
}