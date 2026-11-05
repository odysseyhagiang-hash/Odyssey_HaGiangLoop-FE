import { useEffect, useState } from 'react';
import { fetchReviewStats, type ReviewStats } from '../lib/api';

// Giá trị mặc định hiển thị ngay khi load trang (và khi API lỗi)
export const DEFAULT_REVIEW_STATS: ReviewStats = {
  google: { rating: 5.0, count: 2670 },
  tripadvisor: { rating: 5.0, count: 2093 },
};

// Dùng chung 1 request cho mọi component (Hero + Testimonials) trong 1 lần load trang
let cached: ReviewStats | null = null;
let pending: Promise<ReviewStats | null> | null = null;

export function useReviewStats(): ReviewStats {
  const [stats, setStats] = useState<ReviewStats>(cached ?? DEFAULT_REVIEW_STATS);

  useEffect(() => {
    if (cached) return;
    let alive = true;
    pending = pending ?? fetchReviewStats();
    pending.then((data) => {
      if (!data) {
        pending = null; // cho phép thử lại ở lần mount sau
        return;
      }
      cached = data;
      if (alive) setStats(data);
    });
    return () => {
      alive = false;
    };
  }, []);

  return stats;
}

export const formatReviewCount = (n: number) => n.toLocaleString('en-US');
export const formatRating = (r: number) => r.toFixed(1);
