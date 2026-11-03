import type { Tour } from './types';

/** Lowest bookable price across every pricing row of a tour (shown as "From …"). */
export function getMinPrice(tour: Tour): number {
  let min = tour.price || Infinity;
  for (const p of tour.pricing) {
    if (p.behindPartner !== undefined) min = Math.min(min, p.behindPartner);
    if (p.selfDrive !== undefined) min = Math.min(min, p.selfDrive);
    if (p.behindEasyrider !== undefined) min = Math.min(min, p.behindEasyrider);
    if (p.perPersonPrice !== undefined) min = Math.min(min, p.perPersonPrice);
    if (p.flatPrice !== undefined) min = Math.min(min, p.flatPrice);
    if (p.perPerson) {
      for (const item of p.perPerson) {
        min = Math.min(min, item.price);
      }
    }
  }
  return min === Infinity ? tour.price : min;
}
