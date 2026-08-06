import { useEffect, useState } from 'react';

/**
 * Returns the number of columns/items to show in a carousel
 * based on Tailwind breakpoints (sm: 640px, lg: 1024px)
 */
export function useResponsivePerPage(defaultVal = 3): number {
  const [perPage, setPerPage] = useState(() => {
    if (typeof window === 'undefined') return defaultVal;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newPerPage = 3;
      if (width < 640) {
        newPerPage = 1;
      } else if (width < 1024) {
        newPerPage = 2;
      }
      setPerPage((prev) => (prev !== newPerPage ? newPerPage : prev));
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return perPage;
}
