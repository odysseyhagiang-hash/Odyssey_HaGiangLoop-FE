import { useEffect } from 'react';
import { brand } from '../lib/data';

export interface SeoConfig {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  disableSuffix?: boolean;
  canonical?: string;
}

function upsertMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/** Applies document title, description and Open Graph / Twitter metadata for a route. */
export function useSeo({ title, description, image, type = 'website', disableSuffix, canonical }: SeoConfig): void {
  useEffect(() => {
    const fullTitle = disableSuffix ? title : `${title} · ${brand.name}`;
    document.title = fullTitle;

    upsertMeta('meta[name="description"]', 'name', 'description', description);
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', description);
    upsertMeta('meta[property="og:type"]', 'property', 'og:type', type);
    upsertMeta('meta[property="og:site_name"]', 'property', 'og:site_name', brand.name);
    upsertMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    if (image) {
      upsertMeta('meta[property="og:image"]', 'property', 'og:image', image);
      upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', image);
    }

    const canonicalHref = canonical || (typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : '');
    if (canonicalHref) {
      upsertCanonical(canonicalHref);
    }
  }, [title, description, image, type, disableSuffix, canonical]);
}