import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MenuIcon, XIcon } from 'lucide-react';
import { useScrolled } from '../../hooks/useScrolled';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';

const links = [
  { to: '/about', label: 'About' },
  { to: '/journeys', label: 'Journeys' },
  { to: '/destinations', label: 'Destinations' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/rentalbikes', label: 'Rental Bikes' },
  { to: '/blog', label: 'Blog' },
  { to: '/faq', label: 'FAQ' },
  { to: '/terms', label: 'Terms & Conditions' },
  { to: '/contact', label: 'Contact' },
];

export function Navbar() {
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-editorial',
          solid ? 'glass-panel border-b border-ink/[0.07] py-3 shadow-soft' : 'border-b border-white/[0.08] py-6'
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex w-full max-w-[1240px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10"
        >
          <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="Odyssey home">
            {/* Solid navbar → coloured logo (logo.webp) cropped to circle
                Transparent navbar (dark hero) → no-background logo with thin circular border */}
            {solid ? (
              <img
                src="/logo/logo.webp"
                alt="Odyssey logo"
                className="h-12 w-12 rounded-full object-cover transition-opacity duration-500"
              />
            ) : (
              <span className="grid h-12 w-12 place-items-center rounded-full border border-white/50 transition-colors duration-500">
                <img
                  src="/logo/logo-nobackground.webp"
                  alt="Odyssey logo"
                  className="h-full w-full rounded-full object-cover"
                />
              </span>
            )}
            <span className="leading-tight">
              <span
                className={cn(
                  'block font-display text-lg tracking-tight transition-colors duration-500',
                  solid ? 'text-ink' : 'text-white'
                )}
              >
                Odyssey{" "}
              </span>
              <span
                className={cn(
                  'block font-mono text-[10px] uppercase tracking-widest2 transition-colors duration-500',
                  solid ? 'text-ink-muted' : 'text-white/60'
                )}
              >
                Ha Giang
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-0.5 xl:flex">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      'relative rounded-full px-2.5 2xl:px-3.5 py-2 text-[13px] 2xl:text-[14px] font-medium tracking-wide transition-colors duration-300',
                      solid
                        ? isActive
                          ? 'text-forest-500'
                          : 'text-ink-soft hover:text-ink'
                        : isActive
                          ? 'text-white'
                          : 'text-white/75 hover:text-white'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className={cn(
                            'absolute inset-x-2.5 2xl:inset-x-3.5 -bottom-0.5 h-px',
                            solid ? 'bg-forest-500' : 'bg-gold-300'
                          )}
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Button to="/booking" size="sm" variant={solid ? 'primary' : 'glass'} className="hidden sm:inline-flex text-[14px]">
              Booking Bus & Room
            </Button>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className={cn(
                'grid h-11 w-11 place-items-center rounded-full border transition-colors duration-500 xl:hidden',
                solid ? 'border-ink/12 text-ink' : 'border-white/35 text-white'
              )}
            >
              {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-canvas pb-16 pt-28 xl:hidden"
          >
            <nav aria-label="Mobile" className="mx-auto w-full max-w-[1240px] px-5 sm:px-8">
              <ul className="flex flex-col divide-y divide-ink/8 border-y border-ink/8">
                {links.map((link, index) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + index * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        cn('flex items-center justify-between py-5 font-display text-[18px]', isActive ? 'text-forest-500' : 'text-ink')
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
              <Button to="/booking" size="lg" className="mt-8 w-full sm:hidden">
                Booking Bus & Room
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}