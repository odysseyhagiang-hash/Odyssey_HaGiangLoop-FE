import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { FloatingActions } from './components/layout/FloatingActions';
import { ErrorBoundary } from './components/layout/ErrorBoundary';
import { RouteLoader } from './components/layout/RouteLoader';
import { CreatorPopup } from './components/ui/CreatorPopup';

const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const Tours = lazy(() => import('./pages/Tours').then((m) => ({ default: m.Tours })));
const TourDetail = lazy(() => import('./pages/TourDetail').then((m) => ({ default: m.TourDetail })));
const Destinations = lazy(() =>
  import('./pages/Destinations').then((m) => ({ default: m.Destinations }))
);
const DestinationDetail = lazy(() =>
  import('./pages/DestinationDetail').then((m) => ({ default: m.DestinationDetail }))
);
const Fleet = lazy(() => import('./pages/Fleet').then((m) => ({ default: m.Fleet })));
const Gallery = lazy(() => import('./pages/Gallery').then((m) => ({ default: m.Gallery })));
const Journal = lazy(() => import('./pages/Journal').then((m) => ({ default: m.Journal })));
const JournalPost = lazy(() =>
  import('./pages/JournalPost').then((m) => ({ default: m.JournalPost }))
);
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const Faq = lazy(() => import('./pages/Faq').then((m) => ({ default: m.Faq })));
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));
const Booking = lazy(() => import('./pages/Booking').then((m) => ({ default: m.Booking })));
const Terms = lazy(() => import('./pages/Terms').then((m) => ({ default: m.Terms })));
const Admin = lazy(() => import('./pages/Admin').then((m) => ({ default: m.Admin })));
const Login = lazy(() => import('./pages/Login').then((m) => ({ default: m.Login })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin') || location.pathname.startsWith('/login');

  return (
    <div className="flex min-h-screen w-full flex-col bg-canvas">
      {!isAdmin && (
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[70] focus:rounded-full focus:bg-forest-500 focus:px-5 focus:py-3 focus:text-sm focus:text-white">
          Skip to content
        </a>
      )}
      {!isAdmin && <Navbar />}
      <ErrorBoundary>
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/journeys" element={<Tours />} />
            <Route path="/journeys/:slug" element={<TourDetail />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:slug" element={<DestinationDetail />} />
            <Route path="/rentalbikes" element={<Fleet />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/blog" element={<Journal />} />
            <Route path="/blog/:slug" element={<JournalPost />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
      {!isAdmin && <Footer />}
      {!isAdmin && <FloatingActions />}
      {!isAdmin && <CreatorPopup />}
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>);

}