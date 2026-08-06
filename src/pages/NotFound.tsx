import { Link } from 'react-router-dom';
import { useSeo } from '../hooks/useSeo';
import { images } from '../lib/data';
import { LazyImage } from '../components/ui/LazyImage';
import { Container } from '../components/ui/Section';
import { ArrowLeftIcon, CompassIcon, MapIcon } from 'lucide-react';

export function NotFound() {
  useSeo({
    title: 'Lost in the Clouds | Page Not Found',
    description: 'The pass you are looking for is currently covered in fog. Let us guide you back to the loop.'
  });

  return (
    <main id="main" className="relative isolate flex min-h-screen w-full items-center justify-center bg-[#04291d] py-32 overflow-hidden">
      
      {/* Immersive Misty Mountain Background with brightness filter to eliminate center glare */}
      <LazyImage
        src={images.canyon || "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1600&q=80"}
        alt="Misty Dong Van Karst Plateau Canyon"
        wrapperClassName="absolute inset-0 -z-10 h-full w-full opacity-35 select-none pointer-events-none"
        className="object-cover h-full w-full filter brightness-[0.22] contrast-[1.1]"
      />

      {/* Floating Blur Blobs */}
      <div className="absolute -left-1/4 top-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-forest-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute -right-1/4 bottom-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />

      <Container className="relative z-10 flex flex-col items-center text-center">
        
        {/* Compass Badge */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold-300/20 bg-white/5 text-gold-300 backdrop-blur-md shadow-lg">
          <CompassIcon className="h-7 w-7 stroke-[1.25]" />
        </div>

        {/* Elegant "404" Title */}
        <div className="mt-8 select-none">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.35em] text-gold-300/80 font-bold block mb-1">
            Lost in the Clouds
          </span>
          <h1 className="font-display text-[7.5rem] sm:text-[11rem] leading-none font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gold-100 via-gold-300 to-forest-950 filter drop-shadow-[0_2px_15px_rgba(205,168,105,0.1)]">
            404
          </h1>
        </div>

        {/* Secondary Title */}
        <h2 className="mt-6 font-display text-2xl sm:text-4xl text-white font-normal max-w-xl leading-snug">
          This mountain pass is not on our map
        </h2>

        {/* Detailed Explanation */}
        <p className="mt-4 max-w-md text-xs sm:text-sm leading-relaxed text-white/60">
          Even the most experienced riders take a wrong turn in the deep mist of the Dong Van plateau. 
          Let us guide you back to the main loop.
        </p>

        {/* Responsive Control Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <Link 
            to="/" 
            className="flex items-center justify-center gap-2.5 w-full sm:w-auto rounded-full bg-gold-300 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-forest-950 transition-all duration-300 hover:bg-gold-200 hover:-translate-y-0.5 active:translate-y-0 shadow-md shadow-gold-900/10"
          >
            <ArrowLeftIcon className="h-3.5 w-3.5" />
            Base Camp (Home)
          </Link>
          <Link 
            to="/journeys" 
            className="flex items-center justify-center gap-2.5 w-full sm:w-auto rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:-translate-y-0.5 active:translate-y-0"
          >
            <MapIcon className="h-3.5 w-3.5 text-gold-300" />
            Explore Journeys
          </Link>
        </div>

      </Container>
    </main>
  );
}