import { useEffect, useState, useCallback } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

const POPUP_IMAGES = [
  '/Popup/1788398635846_7647185241213986356_7647185241213986356_6fa6e1f80b4f5cfcae586da337328fc9.webp',
  '/Popup/1788398635866_7647185241213986356_7647185241213986356_a082d74f2a9aeee24c0f17ace9cbe4db.webp',
  '/Popup/1788398635883_7647185241213986356_7647185241213986356_56050347771216db63466a666a7f4985.webp',
  '/Popup/1788398635896_7647185241213986356_7647185241213986356_60da959ce17776fb77aaf4f837edcd13.webp',
  '/Popup/1788398635907_7647185241213986356_7647185241213986356_2ccd3c76be078ff86449ecb2ecd3e3cd.webp',
  '/Popup/1788398635917_7647185241213986356_7647185241213986356_94ed72d744cfca9011feec7decf4d3e7.webp',
  '/Popup/1788398635923_7647185241213986356_7647185241213986356_9525dba940fb02009280e66fdc5e5fe6.webp',
  '/Popup/1788398635929_7647185241213986356_7647185241213986356_1e2c4e705c0d93a295f9c62db32345db.webp',
  '/Popup/1788398635935_7647185241213986356_7647185241213986356_d4689f269249cbfb28dd313012acd529.webp',
  '/Popup/1788398635940_7647185241213986356_7647185241213986356_45257294d3660790392c02e52076a5cc.webp',
];

const WHATSAPP_NUMBER = '84357292323';
const WHATSAPP_TEXT = encodeURIComponent(
  'Hello Odyssey Ha Giang! I am a content creator and would love to collaborate with you.'
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`;

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function CreatorPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const hasDismissed = sessionStorage.getItem('odyssey_creator_popup_dismissed');
    if (!hasDismissed) {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    const handleManualOpen = () => setIsOpen(true);
    window.addEventListener('open-creator-popup', handleManualOpen);
    return () => window.removeEventListener('open-creator-popup', handleManualOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') handleClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % POPUP_IMAGES.length);
  }, []);

  useEffect(() => {
    if (!isOpen || isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 2800);
    return () => clearInterval(interval);
  }, [isOpen, isPaused, nextSlide]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('odyssey_creator_popup_dismissed', 'true');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="creator-popup-title"
    >
      {/* Backdrop Overlay */}
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Modal Container: Compact height on mobile */}
      <div className="relative z-10 flex w-full max-w-[880px] h-[58vh] xs:h-[62vh] sm:h-[82vh] max-h-[420px] xs:max-h-[460px] sm:max-h-[640px] min-h-[350px] xs:min-h-[380px] sm:min-h-[560px] flex-col overflow-hidden rounded-3xl bg-[#f4f6f8] shadow-2xl border border-black/5">
        {/* Right Photo Container: Shifted rightwards so image watermark is fully visible */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="absolute inset-y-0 right-0 w-[60%] sm:w-[64%] h-full overflow-hidden pointer-events-none"
          style={{
            WebkitMaskImage: 'radial-gradient(ellipse 95% 100% at 100% 50%, #000 45%, rgba(0, 0, 0, 0.6) 70%, transparent 98%)',
            maskImage: 'radial-gradient(ellipse 95% 100% at 100% 50%, #000 45%, rgba(0, 0, 0, 0.6) 70%, transparent 98%)',
          }}
        >
          {POPUP_IMAGES.map((imgUrl, idx) => (
            <img
              key={idx}
              src={imgUrl}
              alt={`Odyssey Ha Giang Slide ${idx + 1}`}
              className={cn(
                'absolute inset-0 h-full w-full object-cover object-[52%_top] sm:object-[55%_center] transition-opacity duration-700 ease-in-out',
                idx === currentIndex ? 'opacity-100' : 'opacity-0'
              )}
              loading="eager"
            />
          ))}
        </div>

        {/* Top Header Row: Official Logo */}
        <div className="relative z-30 flex items-center justify-between p-3.5 xs:p-4 sm:p-7">
          {/* Official Odyssey Logo */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <img
              src="/logo/logo.webp"
              alt="Odyssey Logo"
              className="h-8 w-8 sm:h-12 sm:w-12 rounded-full object-cover shrink-0 shadow-sm border border-forest-900/10"
            />
            <div className="flex flex-col">
              <span className="font-display text-sm sm:text-xl font-extrabold tracking-tight text-[#1b432a] leading-none">
                Odyssey
              </span>
              <span className="font-mono text-[8px] sm:text-[9.5px] uppercase tracking-widest text-forest-800/80 mt-0.5 sm:mt-1">
                Ha Giang
              </span>
            </div>
          </div>
        </div>

        {/* Close Button: Positioned absolute top-right */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close popup"
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-40 grid h-9.5 w-9.5 sm:h-10.5 sm:w-10.5 place-items-center rounded-full bg-white/85 text-gray-900 shadow-md backdrop-blur-md border border-white/60 transition-all duration-200 hover:bg-white hover:scale-110 active:scale-95 focus:outline-none"
        >
          <X className="h-5 w-5 sm:h-5.5 sm:w-5.5" />
        </button>

        {/* Content Area */}
        <div className="relative z-30 flex flex-1 flex-col justify-center px-3.5 pb-4 sm:px-8 sm:pb-10 max-w-[145px] xs:max-w-[165px] sm:max-w-[330px]">
          {/* Headline */}
          <h2
            id="creator-popup-title"
            className="font-sans text-[1.2rem] xs:text-[1.38rem] sm:text-[2.6rem] leading-[1.04] font-light tracking-wide text-gray-900 uppercase"
          >
            CREATOR<br />
            PROGRAM
          </h2>

          {/* Primary Subtext */}
          <p className="mt-3 sm:mt-6 font-sans text-[11px] xs:text-xs sm:text-base text-gray-900 font-normal leading-snug break-words">
            Are you a{' '}
            <span className="text-[#1b432a] font-bold">content creator</span>?
          </p>

          {/* Secondary Subtext */}
          <p className="mt-2 sm:mt-2.5 font-sans text-[10px] xs:text-[11px] sm:text-sm text-gray-600 leading-relaxed break-words">
            Partner with us to create extraordinary content and unique stories in Ha Giang!
          </p>

          {/* CTA Button */}
          <div className="mt-3.5 sm:mt-7">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 sm:gap-2.5 rounded-full bg-[#1b432a] px-3 py-2 xs:px-3.5 xs:py-2.5 sm:px-6 sm:py-3.5 text-white shadow-md shadow-[#1b432a]/20 transition-all duration-300 hover:bg-[#143420] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] focus:outline-none"
            >
              <WhatsAppIcon className="h-4 w-4 sm:h-5 sm:w-5 fill-current text-white shrink-0" />

              <span className="font-sans font-medium text-[10px] xs:text-[11px] sm:text-sm tracking-wide leading-none whitespace-nowrap">
                <span className="sm:hidden">WhatsApp</span>
                <span className="hidden sm:inline">Chat with us on WhatsApp</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
