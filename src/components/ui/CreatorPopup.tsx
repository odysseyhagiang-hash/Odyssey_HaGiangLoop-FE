import { useEffect, useState, useCallback } from 'react';
import { X, Compass, Camera, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
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
  'Xin chào Odyssey Hà Giang! Tôi là người sáng tạo nội dung và muốn hợp tác cùng bạn.'
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

/* ============================================================================
   ACTIVE VARIANT 1: APPROVED 2-COLUMN SIDE-BY-SIDE LAYOUT
   ============================================================================ */
export function CreatorPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Show popup immediately on site visit, once per session
    const hasDismissed = sessionStorage.getItem('odyssey_creator_popup_dismissed');
    if (!hasDismissed) {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    // Listen for custom manual open event
    const handleManualOpen = () => setIsOpen(true);
    window.addEventListener('open-creator-popup', handleManualOpen);
    return () => window.removeEventListener('open-creator-popup', handleManualOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') handleClose();
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, currentIndex]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % POPUP_IMAGES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + POPUP_IMAGES.length) % POPUP_IMAGES.length);
  }, []);

  // Auto-slide every 2 seconds unless hovered
  useEffect(() => {
    if (!isOpen || isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 2000);
    return () => clearInterval(interval);
  }, [isOpen, isPaused, nextSlide]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('odyssey_creator_popup_dismissed', 'true');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="creator-popup-title"
    >
      {/* Backdrop Blur Overlay */}
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-ink/75 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Container: Approved 2-Column Side-by-Side Layout */}
      <div className="relative z-10 flex w-full max-w-[1080px] max-h-[92vh] flex-col overflow-hidden rounded-3xl sm:rounded-[2.5rem] border border-white/30 bg-white shadow-lift md:flex-row">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Đóng popup"
          className="absolute right-4 top-4 z-30 grid h-10 w-10 place-items-center rounded-full bg-white/80 text-ink-soft backdrop-blur-md border border-ink/10 shadow-sm transition-all duration-200 hover:bg-forest-500 hover:text-white hover:border-forest-500 hover:scale-105 focus:outline-none"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left Column: Interactive Image Carousel / Slideshow */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative w-full overflow-hidden bg-forest-950 md:w-1/2 flex flex-col justify-between h-[280px] xs:h-[340px] sm:h-[400px] md:h-auto md:min-h-[480px] lg:min-h-[520px]"
        >
          {/* Main Slide Image Stack (Pure CSS Cross-Fade) */}
          <div className="relative h-full w-full overflow-hidden">
            {POPUP_IMAGES.map((imgUrl, idx) => (
              <img
                key={idx}
                src={imgUrl}
                alt={`Odyssey Ha Giang Creator Slide ${idx + 1}`}
                className={cn(
                  'absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-300 ease-in-out',
                  idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                )}
                loading="eager"
              />
            ))}

            {/* Gradient Overlays for contrast & legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-transparent to-forest-950/20 pointer-events-none" />

            {/* Top Badge: Photo Tag */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-full bg-black/40 backdrop-blur-md px-3.5 py-1.5 border border-white/20 text-white text-xs font-semibold">
              <Camera className="h-3.5 w-3.5 text-gold-300" />
              <span>Odyssey Experience</span>
            </div>

            {/* Navigation Arrows */}
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Ảnh trước"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 grid h-10 w-10 place-items-center rounded-full bg-black/30 backdrop-blur-md text-white border border-white/20 transition-all duration-200 hover:bg-forest-600 hover:border-forest-400 hover:scale-110 focus:outline-none"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Ảnh tiếp theo"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 grid h-10 w-10 place-items-center rounded-full bg-black/30 backdrop-blur-md text-white border border-white/20 transition-all duration-200 hover:bg-forest-600 hover:border-forest-400 hover:scale-110 focus:outline-none"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Bottom Dot Indicators Row */}
          <div className="absolute bottom-4 inset-x-0 z-20 flex items-center justify-center gap-1.5 px-4 pointer-events-none">
            {POPUP_IMAGES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Chuyển đến ảnh ${idx + 1}`}
                className={cn(
                  'pointer-events-auto h-2 rounded-full transition-all duration-300',
                  idx === currentIndex
                    ? 'w-7 bg-gold-300 shadow-sm'
                    : 'w-2 bg-white/40 hover:bg-white/70'
                )}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Editorial Content Panel */}
        <div className="relative flex w-full md:w-1/2 flex-col justify-center gap-6 sm:gap-8 bg-gradient-to-br from-parchment/90 via-white to-forest-50/40 p-7 sm:p-9 md:p-11 overflow-hidden text-left">
          {/* Header Row: Compass Icon Box + Pill Badge */}
          <div className="flex items-center gap-3">
            <div className="grid h-13 w-13 sm:h-15 sm:w-15 shrink-0 place-items-center rounded-2xl bg-forest-950 text-white shadow-md shadow-forest-950/20">
              <Compass className="h-6.5 w-6.5 sm:h-7 sm:w-7 stroke-[2] text-gold-300" />
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full bg-forest-50 border border-forest-200/70 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-forest-800">
              <span className="h-1.5 w-1.5 rounded-full bg-forest-600" />
              <span>CREATOR PROGRAM</span>
            </div>
          </div>

          {/* Title */}
          <h2
            id="creator-popup-title"
            className="font-display text-xl sm:text-2xl lg:text-[28px] xl:text-[32px] font-extrabold text-ink leading-snug tracking-tight"
          >
            Bạn có phải là{' '}
            <span className="text-forest-600 font-black">
              người sáng tạo nội dung
            </span>{' '}
            không?
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base leading-relaxed text-ink-soft font-normal">
            Kết nối với chúng tôi để cùng hợp tác và tạo ra những nội dung đặc biệt!
          </p>

          {/* Action WhatsApp CTA Button (Tightly Grouped & Centered) */}
          <div className="flex justify-center w-full pt-1">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:bg-[#1ebe5d] hover:shadow-xl hover:shadow-emerald-500/35 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
            >
              <WhatsAppIcon className="h-6 w-6 shrink-0 transition-transform duration-300 group-hover:scale-110" />

              <span className="font-semibold tracking-wide whitespace-nowrap">
                Liên hệ qua WhatsApp
              </span>

              <ArrowRight className="h-5 w-5 shrink-0 opacity-80 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
