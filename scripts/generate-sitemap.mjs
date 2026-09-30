import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://www.odysseyhagiangloop.com';
const API_URL = process.env.VITE_API_URL || process.env.API_URL || 'http://localhost:5000/api';

const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/journeys', priority: '0.9', changefreq: 'weekly' },
  { path: '/journeys/private-tour', priority: '0.8', changefreq: 'weekly' },
  { path: '/journeys/group-tour', priority: '0.8', changefreq: 'weekly' },
  { path: '/journeys/car-tour', priority: '0.8', changefreq: 'weekly' },
  { path: '/journeys/jeep-tour', priority: '0.8', changefreq: 'weekly' },
  { path: '/journeys/ha-giang-cao-bang', priority: '0.8', changefreq: 'weekly' },
  { path: '/destinations', priority: '0.9', changefreq: 'weekly' },
  { path: '/destinations/nho-que-canyon', priority: '0.7', changefreq: 'monthly' },
  { path: '/destinations/ma-pi-leng-pass', priority: '0.7', changefreq: 'monthly' },
  { path: '/destinations/quan-ba-heavens-gate', priority: '0.7', changefreq: 'monthly' },
  { path: '/destinations/lung-khuy-cave', priority: '0.7', changefreq: 'monthly' },
  { path: '/destinations/khau-lan-waterfall', priority: '0.7', changefreq: 'monthly' },
  { path: '/destinations/lung-tam-weaving-village', priority: '0.7', changefreq: 'monthly' },
  { path: '/destinations/yen-minh-town', priority: '0.7', changefreq: 'monthly' },
  { path: '/destinations/tham-ma-pass', priority: '0.7', changefreq: 'monthly' },
  { path: '/destinations/hmong-kings-palace', priority: '0.7', changefreq: 'monthly' },
  { path: '/destinations/lung-cu-flag-point', priority: '0.7', changefreq: 'monthly' },
  { path: '/destinations/vietnam-north-point', priority: '0.7', changefreq: 'monthly' },
  { path: '/destinations/dong-van-ancient-town', priority: '0.7', changefreq: 'monthly' },
  { path: '/destinations/ban-an-stream-ngoc-long', priority: '0.7', changefreq: 'monthly' },
  { path: '/destinations/du-gia-valley', priority: '0.7', changefreq: 'monthly' },
  { path: '/destinations/du-gia-waterfall', priority: '0.7', changefreq: 'monthly' },
  { path: '/gallery', priority: '0.6', changefreq: 'monthly' },
  { path: '/rentalbikes', priority: '0.8', changefreq: 'weekly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/faq', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/booking', priority: '0.9', changefreq: 'weekly' },
];

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe).replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

function formatDate(date) {
  if (!date) return new Date().toISOString().split('T')[0];
  const d = new Date(date);
  return isNaN(d.getTime()) ? new Date().toISOString().split('T')[0] : d.toISOString().split('T')[0];
}

async function fetchDynamicBlogs() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(`${API_URL}/blogs?limit=500&status=published`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`[sitemap] API returned status ${res.status}, generating without dynamic blogs.`);
      return [];
    }

    const data = await res.json();
    if (data.success && Array.isArray(data.data?.blogs)) {
      return data.data.blogs;
    }
    return [];
  } catch (err) {
    console.warn('[sitemap] Could not connect to API server. Using static pages only.', err.message);
    return [];
  }
}

const FALLBACK_BLOGS = [
  { slug: 'first-timers-guide-ha-giang-loop', updatedAt: '2026-09-07' },
  { slug: 'packing-for-ha-giang-what-to-bring', updatedAt: '2026-09-07' },
  { slug: 'the-case-for-staying-an-extra-night', updatedAt: '2026-09-07' },
  { slug: 'ma-pi-leng-pass-complete-guide', updatedAt: '2026-09-07' },
  { slug: 'dong-van-sunday-market-guide', updatedAt: '2026-09-07' },
  { slug: 'hoang-su-phi-terraces-harvest-season', updatedAt: '2026-09-07' },
];

async function generateSitemap() {
  const fetchedBlogs = await fetchDynamicBlogs();
  const blogs = fetchedBlogs.length > 0 ? fetchedBlogs : FALLBACK_BLOGS;
  const today = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Static routes
  for (const route of STATIC_ROUTES) {
    const loc = `${SITE_URL}${route.path}`;
    xml += `  <url>\n`;
    xml += `    <loc>${escapeXml(loc)}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  // Dynamic blogs
  if (blogs.length > 0) {
    xml += `  <!-- Dynamic published blog posts -->\n`;
    for (const blog of blogs) {
      const loc = `${SITE_URL}/blog/${escapeXml(blog.slug)}`;
      const lastmod = formatDate(blog.updatedAt || blog.publishedAt || blog.createdAt);
      xml += `  <url>\n`;
      xml += `    <loc>${loc}</loc>\n`;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += `  </url>\n`;
    }
  }

  xml += `</urlset>\n`;

  const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf8');
  console.log(`[sitemap] Successfully generated sitemap with ${STATIC_ROUTES.length + blogs.length} URLs at ${outputPath}`);
}

generateSitemap().catch(err => {
  console.error('[sitemap] Failed to generate sitemap:', err);
  process.exit(1);
});
